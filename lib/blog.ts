import { connectToDatabase } from "@/lib/mongodb"
import { Document, ObjectId, WithId } from "mongodb"
import type { BlogPost } from "@/lib/types"
import readingTime from "reading-time";

function postMapper(Post: WithId<Document> | null): BlogPost | null {
  if (!Post)
    return null;
  return {
    _id: Post._id?.toString(),
    title: Post.title,
    slug: Post.slug,
    excerpt: Post.excerpt,
    content: Post.content,
    coverImage: Post.coverImage?.toString(),
    published: Post.published,
    createdAt: Post.createdAt,
    updatedAt: Post.updatedAt,
    readingTime: readingTime(Post.content).text
  } as BlogPost; 
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { db } = await connectToDatabase()

  const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray()

  return posts.map(post => postMapper(post)) as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { db } = await connectToDatabase()

  const post = postMapper(await db.collection("posts").findOne({ slug }))
  return post;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { db } = await connectToDatabase()

  const post = postMapper(await db.collection("posts").findOne({ _id: new ObjectId(id) }))
  return post;
}

