
export const dynamic = "force-dynamic"

import { BlogCard } from "@/components/blog-card";
import PageLoading from "@/components/ui/page-loading";
import { BlogDBService } from "@/lib/mongodb";
import { Blog } from "@/lib/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function BlogsPage() {
  const blogs = await BlogDBService.getAllBlogs()
   if (!blogs || blogs.length==0) {
        redirect('/');
   }
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{blogs.length==0 && "No "}Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<PageLoading />}>
          {blogs.map((blog: Blog) => (
            blog.published &&
            <BlogCard key={blog._id?.toString()} blog={blog} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
