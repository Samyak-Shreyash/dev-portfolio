
import { BlogDBService } from "@/lib/mongodb";
import { blogSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// PUT a new Message
export async function PUT(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
 ) {
    const blog = blogSchema.parse(await _req.json());
    console.log("In PUT /blog")
    console.log(blog);
    try {
        const { id } = await context.params;
        const existingBlog = await BlogDBService.getBlogById(id);
        if(existingBlog){
            const result = await BlogDBService.addNewBlog(blog);
            return NextResponse.json(
                {
                message: "BlogPost Saved successfully",
                BlogId: result.insertedId,
                },
                { status: 201 },
            )
        }
        else {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ error: error.errors }, { status: 400 })
            }
            console.error("Error creating post:", error)
            return NextResponse.json({ error: "Failed to save blog" }, { status: 500 })
            }
    }

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Delete the blog using the BlogDBService
    await BlogDBService.deleteBlog(id);

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}