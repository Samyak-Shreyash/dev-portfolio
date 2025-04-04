import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlogPost } from "./types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortBlogs = (blogs: BlogPost[]) => {
  return blogs
    .slice()
    .sort((a, b) =>
      (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    );
};