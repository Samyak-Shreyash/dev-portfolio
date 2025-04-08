
import { ContactApiService } from "@/lib/api-services";
import { MessageDBService } from "@/lib/mongodb";
import { messageSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"


// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const msg = await MessageDBService.getAllMessages()
  
      return NextResponse.json(msg)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

// POST a new Message
export async function POST(req: Request) {
  
  const msg = messageSchema.parse(await req.json());
  console.log(msg);
  try {
    
    const result = await MessageDBService.pushMessage(msg);

  return NextResponse.json(
    {
      message: "Message Saved successfully",
      messageId: result.insertedId,
    },
    { status: 201 },
  )
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 })
  }

  console.error("Error creating post:", error)
  return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
}
}
