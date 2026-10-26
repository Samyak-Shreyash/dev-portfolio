import { BlogPostForm } from "@/components/blog-post-form";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "New Post" }

export default async function AddNewBlog() {
    if (!(await isAdmin())) {
        redirect('/login');
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Create Post</h1>
            <BlogPostForm />
        </div>
    );
}
