import { BlogCard } from "@/components/blog-card"
import { getBlogPosts } from "@/lib/blog"
import { DEV_NAME } from "@/lib/constants"

export const metadata = {
    title: `Blogs by ${DEV_NAME}`,
    description: "Read my latest blog posts about technology, design, and more.",
  }
  
export default async function BlogsPage() {
    const posts = await getBlogPosts()
    
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) =>(
                    <BlogCard key={post._id?.toString()} post={post} />
                ))}
            </div>
        </div>
    )
}