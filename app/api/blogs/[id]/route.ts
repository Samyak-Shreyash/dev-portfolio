import { BlogDBService } from "@/lib/mongodb";
import { postSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET( _req: NextRequest, { params }: {params: Promise<{ id: string }> })  : Promise<NextResponse>
{
  const { id } = await params;
  
  try {
    const blog = await BlogDBService.getBlogById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching Blog:", error);
    return NextResponse.json({ error: "Failed to fetch Blog" }, { status: 500 });
  }
}

// PUT: Update a Blog by ID
export async function PUT(request: NextRequest, { params }: {params: Promise<{ id: string }> })  : Promise<NextResponse>
{
  try {
    const data = await request.json();

    const validatedData = postSchema.parse(data);

    // Check if slug already exists for a different blog
    const existingBlog = await BlogDBService.getBlogBySlug(validatedData.slug);
    const { id } = await params
    if (existingBlog && existingBlog._id.toString() !== id) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 });
    }

    await BlogDBService.updateBlog({
      ...validatedData,
      createdAt: data.createdAt,
      _id: data._id,
    });

    const updatedBlog = await BlogDBService.getBlogById(id);

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error updating Blog:", error);
    return NextResponse.json({ error: "Failed to update Blog" }, { status: 500 });
  }
}

// DELETE: Delete a Blog by ID
export async function DELETE(_request: NextRequest,  { params }: {params: Promise<{ id: string }> })  : Promise<NextResponse>
{
  const { id } = await params;
  try {
    const existingBlog = await BlogDBService.getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await BlogDBService.deleteBlog(id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting Blog:", error);
    return NextResponse.json({ error: "Failed to delete Blog" }, { status: 500 });
  }
}
