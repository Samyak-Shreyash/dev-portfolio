import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlogPost } from "./types";
import { WithId } from "mongodb";
import readingTime from "reading-time";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortBlogs = (blogs: BlogPost[]) => {
  if(blogs && blogs.length <2) return blogs;
  return blogs
    .slice()
    .sort((a, b) =>
      (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    );
};

export function MapPost(Post: WithId<Document> | null): BlogPost | null {
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