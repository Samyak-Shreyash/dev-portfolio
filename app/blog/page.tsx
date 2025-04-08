
export const dynamic = "force-dynamic"

import { BlogCard } from "@/components/blog-card";
import BlogLoading from "@/components/BlogLoading";
import { BlogApiService } from "@/lib/api-services";
import { BlogPost } from "@/lib/types";
import { Suspense } from "react";

export default async function BlogsPage() {
  const posts = await BlogApiService.getAllBlogs()
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<BlogLoading />}>
          {posts.map((post: BlogPost) => (
            post.published &&
            <BlogCard key={post._id?.toString()} post={post} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
