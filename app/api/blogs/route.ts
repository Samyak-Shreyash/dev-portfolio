import { BlogDBService } from "@/lib/mongodb";
import { postSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"

// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const posts = await BlogDBService.getAllBlogs();
      return NextResponse.json(posts)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

// POST a new blog
export async function POST(req: Request) {
  
  const blog = await req.json();

  
  const validatedData = postSchema.parse(blog);

  try {
  const existingPost = await BlogDBService.getBlogBySlug(blog.slug ); 
  if (existingPost) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
  }

  // Insert the new blog post into the database
  
  const result = await BlogDBService.addNewBlog(validatedData);

  return NextResponse.json(
    {
      message: "Post created successfully",
      postId: result.insertedId,
    },
    { status: 201 },
  )
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 })
  }

  console.error("Error creating post:", error)
  return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
}
}

