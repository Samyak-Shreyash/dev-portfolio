import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/lib/types";
import { WithId, Document } from "mongodb";
import { NextResponse } from "next/server";
import readingTime from "reading-time";

// The GET handler for fetching a blog post by slug
export async function GET(
  _req: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  if (!slug || slug.length === 0) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase("blog");
    const post = await db.collection("posts").findOne({ slug }) as WithId<Document> | null;

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(postMapper(post));
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// Helper to map DB result to BlogPost
function postMapper(post: WithId<Document>): BlogPost {
  const typed = post as WithId<Document> & BlogPost;

  return {
    _id: typed._id.toString(),
    title: typed.title,
    slug: typed.slug,
    excerpt: typed.excerpt,
    content: typed.content,
    coverImage: typed.coverImage?.toString(),
    published: typed.published,
    createdAt: typed.createdAt,
    updatedAt: typed.updatedAt,
    readingTime: readingTime(typed.content).text,
  };
}