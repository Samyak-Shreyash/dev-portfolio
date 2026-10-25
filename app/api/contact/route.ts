import { MessageDBService } from "@/lib/mongodb";
import { messageSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { resolveMx } from "dns/promises";

const MIN_FILL_MS = 3000 // humans can't fill the form faster than this
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_IP = 3 // per WINDOW_MS
const MAX_PER_EMAIL = 3
const MAX_LINKS = 2

// False only when DNS says the domain doesn't exist or has no mail server.
// Lookup failures/timeouts return true so real visitors are never blocked by flaky DNS.
async function domainAcceptsMail(email: string) {
  const domain = email.split("@").pop()!
  try {
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000))
    const records = await Promise.race([resolveMx(domain), timeout])
    return records.some((r) => r.exchange && r.exchange !== ".") // "." is a null MX (RFC 7505)
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    return code !== "ENOTFOUND" && code !== "ENODATA"
  }
}

// POST a new Message
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  // Bots fill the hidden honeypot field or submit instantly: pretend success so they don't retry
  // elapsedMs is measured entirely on the client's clock, so server/client clock skew can't affect it
  const elapsedMs = Number(body.elapsedMs)
  if (body.website || !elapsedMs || elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ message: "Message Saved successfully" }, { status: 201 })
  }

  const parsed = messageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }
  const msg = parsed.data

  const links = (`${msg.subject} ${msg.message}`.match(/https?:\/\/|www\./gi) || []).length
  if (links > MAX_LINKS) {
    return NextResponse.json({ error: "Too many links in message" }, { status: 400 })
  }

  if (!(await domainAcceptsMail(msg.email))) {
    return NextResponse.json({ error: "This email domain doesn't accept mail. Please check the address." }, { status: 400 })
  }

  try {
    // Store a salted hash, not the raw IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
    const ipHash = createHash("sha256").update(ip + (process.env.MONGODB_URI ?? "")).digest("hex")

    const { byIp, byEmail } = await MessageDBService.countRecentMessages(ipHash, msg.email, new Date(Date.now() - WINDOW_MS))
    if (byIp >= MAX_PER_IP || byEmail >= MAX_PER_EMAIL) {
      return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 })
    }

    const result = await MessageDBService.pushMessage({
      ...msg,
      ipHash,
      userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? "",
    });

    return NextResponse.json(
      {
        message: "Message Saved successfully",
        messageId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating Message: ", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
