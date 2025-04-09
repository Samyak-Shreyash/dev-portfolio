import { BlogPostForm } from "@/components/blog-post-form";
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function AddNewBlog() {
    const currentUser = await getCurrentUser();
    
        if (!currentUser) {
            redirect('/blog');
        }
    
    return (
    <div className="container mx-auto py-12 px-8 md:px-20 sm:py-12 ">
        <h1 className="text-xl md:text-3xl sm:text-2xl font-bold tracking-tight md:tracking-normal mb-8">Create New Post</h1>
        <BlogPostForm />
    </div>
)
}