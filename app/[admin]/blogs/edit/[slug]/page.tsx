import { BlogPostForm } from "@/components/blog-post-form"
import { BlogApiService } from "@/lib/api-services"
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation"

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const currentUser = await getCurrentUser();
        
    if (!currentUser) {
        redirect('/login');
    }
        
    const post = await BlogApiService.getBlogBySlug(params.slug)
    if (!post) {
      notFound()
    }
  
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Post</h1>
        <BlogPostForm post={post} />
      </div>
    )
  }