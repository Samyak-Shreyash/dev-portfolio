import { BlogCard } from "@/components/blog-card"
import BlogLoading from "@/components/BlogLoading";
import { BlogPost } from "@/lib/types";
import { Suspense } from "react";

async function fetchPosts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    const data = await response.json()
    return data;
}
export default async function BlogsPage() {
    const posts = await fetchPosts();
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense fallback={<BlogLoading />}>
                {posts.map((post: BlogPost) =>(
                    <BlogCard key={post._id?.toString()} post={post} />
                ))}
                </Suspense>
            </div>
        </div>
    )
}