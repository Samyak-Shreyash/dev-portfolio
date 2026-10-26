import { BlogDBService } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const blog = await BlogDBService.getAllBlogs()
      return NextResponse.json(blog)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
}
