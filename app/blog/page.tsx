
export const dynamic = "force-dynamic"

import { BlogCard } from "@/components/blog-card";
import BlogLoading from "@/components/BlogLoading";
import { siteURL } from "@/lib/constants";
import { BlogPost } from "@/lib/types";
import { Suspense } from "react";

async function fetchPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? siteURL + "/api";
  const response = await fetch(`${apiUrl}/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  if (!data) {
    throw new Error("Failed to fetch posts");
  }
  return data;
}
export default async function BlogsPage() {
  const posts = await fetchPosts();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<BlogLoading />}>
          {posts.map((post: BlogPost) => (
            <BlogCard key={post._id?.toString()} post={post} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
