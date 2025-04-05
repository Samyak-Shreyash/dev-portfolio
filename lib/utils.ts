import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlogPost } from "./types";
import { WithId } from "mongodb";
import readingTime from "reading-time";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function MapPost(Post: WithId<Document> | BlogPost | null): BlogPost | null {
  if (!Post)
    return null;

  const typedPost = Post as WithId<Document> & BlogPost
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

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  author: z.string().optional(),
})

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
      excerpt: z.string().optional(),
      link: z.string().optional(),
      github: z.string().min(1, "Github Link is required"),
      specs: z.array(z.string()),
      coverImage: z.string().optional(),
      online: z.boolean().default(false),
})