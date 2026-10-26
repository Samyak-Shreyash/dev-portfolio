import { isAdmin } from "@/lib/auth";
import { MessageDBService } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
    }

    const result = await MessageDBService.deleteMessage(id);
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
