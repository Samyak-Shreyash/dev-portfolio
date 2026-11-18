import { isAdmin } from "@/lib/auth";
import { revalidateProjects } from "@/lib/cached-data";
import { ProjectDBService } from "@/lib/mongodb";
import { projectSchema } from "@/lib/utils";
import { NextResponse } from "next/server";

// This is a route handler for the /api/project endpoint
export async function GET() {
    // Connect to the database
    try {
      const project = await ProjectDBService.getAllProjects()
      return NextResponse.json(project)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
}

// POST a new project (admin only)
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = projectSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }

  try {
    if (parsed.data.slug && await ProjectDBService.getProjectBySlug(parsed.data.slug)) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const result = await ProjectDBService.addNewProject(parsed.data)
    revalidateProjects()
    return NextResponse.json({ message: "Project saved successfully", projectId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error saving project:", error)
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
}
