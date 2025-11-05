import { MessageDBService } from "@/lib/mongodb";
import { messageSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"

// POST a new Message
export async function POST(req: Request) {
  
  const msg = messageSchema.parse(await req.json());
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
    return NextResponse.json({ error: error.issues }, { status: 400 })
  }

  console.error("Error creating Message: ", error)
  return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
}
}