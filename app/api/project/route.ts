import { connectToDatabase } from "@/lib/mongodb";
import { projectSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"


// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const { db } = await connectToDatabase()
  
      const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()
  
      return NextResponse.json(projects)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

// POST a new blog
export async function POST(req: Request) {
  
  const project = await req.json();

  
  const validatedData = projectSchema.parse(project);

  try {
    const { db } = await connectToDatabase();
  // Check if slug already exists
  const existingPost = await db.collection("projects").findOne({ _id: project._id }); 
  if (existingPost) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
  }

  // Insert the new blog post into the database
  
  const result = await db.collection("projects").insertOne({
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

