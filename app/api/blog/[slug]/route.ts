import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/lib/types";
import { WithId } from "mongodb";
import { NextResponse } from "next/server";
import readingTime from "reading-time";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    // Connect to the database
    const { db } = await connectToDatabase("blog");
    // Get the collection of blog posts
    const { slug: paramsSlug } = params;
    console.log("Fetching blog post by slug:", paramsSlug);
    if (!paramsSlug || paramsSlug === undefined || paramsSlug.length === 0) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    // Find the post by slug
    const collection = db.collection("posts");
    try {
        const post = await collection.findOne({ slug: paramsSlug }) as WithId<Document> | null;
        return NextResponse.json(postMapper(post));
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
    
}


function postMapper(Post: WithId<Document> | null): BlogPost | null {
  if (!Post)
    return null;
const typedPost = Post as WithId<Document> & BlogPost
  // Check if the post is published
  return {
    _id: typedPost._id?.toString(),
    title: typedPost.title,
    slug: typedPost.slug,
    excerpt: typedPost.excerpt,
    content: typedPost.content,
    coverImage: typedPost.coverImage?.toString(),
    published: typedPost.published,
    createdAt: typedPost.createdAt,
    updatedAt: typedPost.updatedAt,
    readingTime: readingTime(typedPost.content).text
  } as BlogPost; 
}

