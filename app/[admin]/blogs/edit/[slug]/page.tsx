import { BlogPostForm } from "@/components/blog-post-form";
import BlogLoading from "@/components/BlogLoading";
import { BlogApiService } from "@/lib/api-services";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { JSX, Suspense } from "react";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element>  {

  const post = await BlogApiService.getBlogBySlug((await params).slug)

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Post</h1>
      <Suspense fallback={<BlogLoading />}>
      <BlogPostForm post={post} />
       </Suspense>
    </div>
  );
}
