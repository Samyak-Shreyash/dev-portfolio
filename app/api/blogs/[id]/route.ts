import { BlogDBService } from "@/lib/mongodb";
import { postSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// The GET handler for fetching a  Blog by slug
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  
  try {
    const Blog = await BlogDBService.getBlogById(params.id)
    
    if (!Blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(Blog)
  } catch (error) {
    console.error("Error fetching Blog:", error)
    return NextResponse.json({ error: "Failed to fetch Blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const validatedData = postSchema.parse(data)

    // Check if slug already exists for a different Blog
    const existingBlog = await BlogDBService.getBlogBySlug(validatedData.slug);
    if (existingBlog?._id?.toString() === params?.id) {
      return NextResponse.json({ error: "A Blog with this slug already exists" }, { status: 400 })
    }
    const result = await BlogDBService.updateBlog({
      ...validatedData, createdAt: data.createdAt,
      _id: data._id
    });
    
    return NextResponse.json({ message: "Blog updated successfully" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error updating Blog:", error)
    return NextResponse.json({ error: "Failed to update Blog" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if Blog exists
    const existingBlog = await BlogDBService.getBlogById(params.id)
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    await BlogDBService.deleteBlog(params.id)

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting Blog:", error)
    return NextResponse.json({ error: "Failed to delete Blog" }, { status: 500 })
  }
}
