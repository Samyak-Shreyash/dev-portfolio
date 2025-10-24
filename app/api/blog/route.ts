import { BlogDBService } from "@/lib/mongodb";
import { blogSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"

// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const msg = await BlogDBService.getAllBlogs()
      return NextResponse.json(msg)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
}

// POST a new Message
export async function POST(req: Request) {
  
  const blog = blogSchema.parse(await req.json());
  try {
    const result = await BlogDBService.addNewBlog(blog);
  return NextResponse.json(
    {
      message: "BlogPost Saved successfully",
      BlogId: result.insertedId,
    },
    { status: 201 },
  )
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 })
  }

  console.error("Error creating post:", error)
  return NextResponse.json({ error: "Failed to save blog" }, { status: 500 })
}
}