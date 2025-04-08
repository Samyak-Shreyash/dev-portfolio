
import { BlogDBService } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// The GET handler for fetching a blog post by slug
export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string}> }) {
  const { slug } = await params;

    const post = await BlogDBService.getBlogBySlug(slug);
     try{
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
