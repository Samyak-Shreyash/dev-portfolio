import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Blog } from "./types";
import { WithId } from "mongodb";
import readingTime from "reading-time";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapBlog(Post: WithId<Document> | Blog | null): Blog | null {
  if (!Post)
    return null;

  const typedPost = Post as WithId<Document> & Blog
  return {
    _id: typedPost._id?.toString(),
    title: typedPost.title,
    slug: typedPost.slug,
    tags: typedPost.tags,
    excerpt: typedPost.excerpt,
    content: typedPost.content,
    coverImage: typedPost.coverImage?.toString(),
    published: typedPost.published,
    createdAt: typedPost.createdAt,
    updatedAt: typedPost.updatedAt,
    readingTime: readingTime(typedPost.content).text
  } as Blog; 
}

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  tags: z.array(z.string()),
  content: z.string().min(1, "Content is required").transform((val) =>val.trim()),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false)
})

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  demoUrl: z.string().url("Invalid URL").optional(),
  repoUrl: z.string().url("Invalid URL").min(1, "Github Link is required"),
  technologies: z.array(z.string()),
  image: z.string().optional(),
  category:  z.string().min(1, "Category is required"),
  online: z.boolean().default(false),
})

export const messageSchema = z.object({
  name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    subject: z.string().min(5, {
      message: "Subject must be at least 5 characters.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }).transform((val) =>val.trim()),

})

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
}
