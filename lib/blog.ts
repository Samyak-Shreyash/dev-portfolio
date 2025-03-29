import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { BlogPost } from "@/lib/types"

function postMapper(BlogPost: any): BlogPost | null {
  if (!BlogPost)
    return null;
  return {
    _id: BlogPost._id.toString(),
    title: BlogPost.title,
    slug: BlogPost.slug,
    content: BlogPost.content,
    coverImage: BlogPost.coverImage.toString(),
    published: BlogPost.published,
    createdAt: BlogPost.createdAt,
    updatedAt: BlogPost.updatedAt
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

