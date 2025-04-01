import { connectToDatabase } from "@/lib/mongodb"
import { Document, ObjectId, WithId } from "mongodb"
import type { Project } from "@/lib/types"

function postMapper(Project: WithId<Document> | null): Project | null {
  if (!Project)
    return null;
  return {
    _id: Project._id.toString(),
    title: Project.title,
    slug: Project.slug,
    excerpt: Project.excerpt,
    link: Project.online? Project.link : Project.github,
    github: Project.github,
    specs : Project.specs,
    coverImage: Project.coverImage.toString(),
    online: Project.online,
    createdAt: Project.createdAt,
    updatedAt: Project.updatedAt
  } as Project; 
}

export async function getProjects(): Promise<Project[]> {
  const { db } = await connectToDatabase()

  const posts = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()

  return posts.map(post => postMapper(post)) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { db } = await connectToDatabase()

  const post = postMapper(await db.collection("projects").findOne({ slug }))
  return post;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { db } = await connectToDatabase()

  const post = postMapper(await db.collection("projects").findOne({ _id: new ObjectId(id) }))
  return post;
}

