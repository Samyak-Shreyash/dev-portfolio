import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { randomUUID } from "crypto"
import { isAdmin } from "@/lib/auth"

const VALID_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}
// Vercel functions reject request bodies over 4.5MB
const MAX_SIZE = 4 * 1024 * 1024

// Upload a blog image to Vercel Blob (admin only)
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const ext = VALID_TYPES[file.type]
    if (!ext) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." },
        { status: 400 },
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 4MB limit" }, { status: 400 })
    }

    // The store's token was created with a custom prefix, so it isn't the default BLOB_READ_WRITE_TOKEN
    const blob = await put(`blog/${randomUUID()}.${ext}`, file, {
      access: "public",
      contentType: file.type,
      token: process.env.samyak_shreyash_blogs_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
