import { ProjectDBService } from "@/lib/mongodb";
import { projectSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"


// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const projects = await ProjectDBService.getAllProjects()
  
      return NextResponse.json(projects)
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

// POST a new blog
export async function POST(req: Request) {
  
  const project = await req.json();

  
  const validatedData = projectSchema.parse(project);
  try {
  
    const result = await ProjectDBService.addNewProject({
      ...validatedData,
      link: validatedData.link ?? "", // Provide a default empty string if link is undefined
    });

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


export async function DELETE(req: Request) {
  const project = await req.json()
  try {
    // Check if Blog exists
    const existingBlog = await ProjectDBService.getProjectById(project._id)
    if (!existingBlog) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    await ProjectDBService.deleteProject(project._id)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting Project:", error)
    return NextResponse.json({ error: "Failed to delete Project" }, { status: 500 })
  }
}

