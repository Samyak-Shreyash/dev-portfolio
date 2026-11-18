import { isAdmin } from "@/lib/auth";
import { revalidateProjects } from "@/lib/cached-data";
import { ProjectDBService } from "@/lib/mongodb";
import { projectSchema } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> }

async function authorizedId(context: Context) {
  if (!(await isAdmin())) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  const { id } = await context.params
  if (!ObjectId.isValid(id)) {
    return { error: NextResponse.json({ error: "Invalid project id" }, { status: 400 }) }
  }
  return { id }
}

// Update an existing project (admin only)
export async function PUT(req: NextRequest, context: Context) {
  const { id, error } = await authorizedId(context)
  if (error) return error

  const parsed = projectSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }

  try {
    const sameSlug = parsed.data.slug ? await ProjectDBService.getProjectBySlug(parsed.data.slug) : null
    if (sameSlug && sameSlug._id.toString() !== id) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const result = await ProjectDBService.updateProject(id, parsed.data)
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    revalidateProjects()
    return NextResponse.json({ message: "Project updated successfully" })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
}

// Delete a project (admin only)
export async function DELETE(_req: NextRequest, context: Context) {
  const { id, error } = await authorizedId(context)
  if (error) return error

  try {
    const result = await ProjectDBService.deleteProject(id)
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    revalidateProjects()
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
