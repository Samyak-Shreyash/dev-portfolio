import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type tParams = Promise<{ slug: string[] }>;
// The GET handler for fetching a blog post by slug
export async function GET(_request: NextRequest, { params }: { params: tParams }) {
  const { slug } = await params;

  try {
    const { db } = await connectToDatabase()

    const post = await db.collection("posts").findOne({
      slug: slug,
    })
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
