import { isAdmin } from "@/lib/auth";
import { BlogDBService } from "@/lib/mongodb";
import { blogSchema } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> }

async function authorizedId(context: Context) {
  if (!(await isAdmin())) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  const { id } = await context.params
  if (!ObjectId.isValid(id)) {
    return { error: NextResponse.json({ error: "Invalid post id" }, { status: 400 }) }
  }
  return { id }
}

// Update an existing blog post (admin only)
export async function PUT(req: NextRequest, context: Context) {
  const { id, error } = await authorizedId(context)
  if (error) return error

  const parsed = blogSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }

  try {
    const sameSlug = await BlogDBService.getBlogBySlug(parsed.data.slug)
    if (sameSlug && sameSlug._id.toString() !== id) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    }

    const result = await BlogDBService.updateBlog(id, parsed.data)
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "BlogPost updated successfully" })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 })
  }
}

// Delete a blog post (admin only)
export async function DELETE(_req: NextRequest, context: Context) {
  const { id, error } = await authorizedId(context)
  if (error) return error

  try {
    const result = await BlogDBService.deleteBlog(id)
    if (!result) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
