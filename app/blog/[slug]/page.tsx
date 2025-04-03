import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'
import { DEV_IMAGE, DEV_NAME } from "@/lib/constants"
import type { Metadata } from "next"
import { JSX } from "react"

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await (params)

  if (!slug) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist",
    }
  }

  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist",
    }
  }

  return {
    title: `${post.title} by ${DEV_NAME}`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element>  {
  const { slug } = await params

  if (!slug) {
    return notFound()
  }

  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
        {post.coverImage && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image 
                className="object-cover"
                src={post.coverImage ?? "/placeholder.svg" } 
                alt={post.title} 
                fill
                priority
                />
            </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage 
                        src={DEV_IMAGE}
                        alt={DEV_NAME}
                        height={32}
                        width={32}
                    />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
            </div>
            <div className="text-sm">{format(new Date(post.createdAt ?? Date.now()), "MMMM d, yyyy")}</div>
            <div className="items-end">{post.readingTime}</div>
        </div>

        <div className="max-w-none prose prose-lg dark:prose-invert">
            <MDXRemote source={post.content} />
        </div>
    </article>
  )
}