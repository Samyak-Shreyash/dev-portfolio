import { BlogDBService } from "@/lib/mongodb";
import { mapBlog } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    // Get the blog using the BlogDBService
    const result = await BlogDBService.getBlogBySlug(slug);

     if (!result) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(mapBlog(result));
    } catch (error) {
    console.error("Error fetching Blog:", error);
    return NextResponse.json({ error: "Failed to fetch Blog" }, { status: 500 });
  }
}