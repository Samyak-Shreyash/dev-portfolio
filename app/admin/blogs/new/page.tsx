import { BlogPostForm } from "@/components/blog-post-form";

export default function AddNewBlog() {
    return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-xl md:text-3xl sm:text-2xl font-bold tracking-tight md:tracking-normal">Create New Post</h1>
        <BlogPostForm />
    </div>
)
}