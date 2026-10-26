import { BlogPostForm } from "@/components/blog-post-form";
import { isAdmin } from "@/lib/auth";
import { BlogDBService } from "@/lib/mongodb";
import { mapBlog } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export const metadata = { title: "Edit Post" }

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdmin())) {
    redirect('/login');
  }

  const post = mapBlog(await BlogDBService.getBlogBySlug((await params).slug));
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Post</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
