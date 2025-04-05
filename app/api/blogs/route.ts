import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  author: z.string().optional(),
})


// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const { db } = await connectToDatabase()
  
      const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray()
  
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
    const { db } = await connectToDatabase();
  // Check if slug already exists
  const existingPost = await db.collection("posts").findOne({ slug: blog.slug }); 
  if (existingPost) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
  }

  // Insert the new blog post into the database
  
  const result = await db.collection("posts").insertOne({
    ...validatedData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

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

