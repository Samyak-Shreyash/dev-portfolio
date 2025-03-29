import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { DEV_IMAGE } from "@/utils/constants"

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const param = await params
  const post = await getBlogPostBySlug(param.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist",
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const param = await params
  const post = await getBlogPostBySlug(param.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {post.coverImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 mb-8 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={DEV_IMAGE} height={32} width={32} alt="Author" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">{format(new Date(post.createdAt), "MMMM d, yyyy")}</div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

