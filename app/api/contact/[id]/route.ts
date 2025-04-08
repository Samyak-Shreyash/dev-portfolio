import { MessageDBService } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

//DELETE Message
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string}> }) {
    try {
      // Check if Blog exists
      const deletedMsg = await MessageDBService.getMessageById((await params).id)
      if (!deletedMsg) {
        return NextResponse.json({ error: "Message not found" }, { status: 404 })
      }
  
      await MessageDBService.deleteMessage((await params).id)
  
      return NextResponse.json({ message: "Message deleted successfully" })
    } catch (error) {
      console.error("Error deleting Message:", error)
      return NextResponse.json({ error: "Failed to delete Message" }, { status: 500 })
    }
  }
  