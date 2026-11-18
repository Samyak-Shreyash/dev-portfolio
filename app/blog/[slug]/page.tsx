import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import { DEV_IMAGE, DEV_NAME, siteMetaData } from "@/lib/constants"
import type { Metadata } from "next"
import { JSX, Suspense } from "react"
import readingTime from "reading-time";
import Link from "next/link"
import { BlogDBService } from "@/lib/mongodb"
import { mapBlog } from "@/lib/utils"
import { isAdmin } from "@/lib/auth"
import PageLoading from "@/components/ui/page-loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const dynamic = "force-dynamic"

// Drafts are visible only to the logged-in admin (for previewing)
async function getPost(slug: string) {
  const blog = await BlogDBService.getBlogBySlug(slug)
  if (!blog || (!blog.published && !(await isAdmin()))) return null
  return mapBlog(blog)
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await (params)
  const blog = await getPost(slug)

  if (!blog) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist",
    }
  }

  let imageList = [siteMetaData.socialBanner];
  // imageList = blog.images ? [...imageList, ...blog.images] : imageList;
  imageList = blog.coverImage ? [...imageList, blog.coverImage] : imageList;

  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetaData.siteUrl + img };
  });

  return {
    title: blog.title,
    description: blog.excerpt?? siteMetaData.description,
    alternates: { canonical: `/blog/${blog.slug}` },
    // Drafts are only visible to the admin; keep them out of search results
    robots: blog.published ? undefined : { index: false, follow: false },
    // keywords: blog.tags.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.excerpt?? siteMetaData.description,
      url: `${siteMetaData.siteUrl}/blog/${blog.slug}`,
      images: ogImages,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: [siteMetaData.author],
      siteName: siteMetaData.title,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt?? siteMetaData.description,
      images: ogImages, // Must be an absolute URL
    }
}
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element>  {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || !post._id) {
    return notFound()
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": new Date(post.createdAt).toISOString(),
      "dateModified": new Date(post.updatedAt).toISOString(),
      ...(post.coverImage && { "image": post.coverImage }),
      "author": {
        "@type": "Person",
        "name": DEV_NAME,
        "url": siteMetaData.siteUrl
      },
      "url": `${siteMetaData.siteUrl}/blog/${post.slug}`,
      "mainEntityOfPage": `${siteMetaData.siteUrl}/blog/${post.slug}`,
    }),
  }}
/>
    <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="text-sm text-muted-foreground hover:underline mb-6 inline-block">&larr; All posts</Link>
        {post.coverImage && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image 
                className="object-cover"
                src={post.coverImage ?? "/placeholder.svg" } 
                alt={`Cover image for ${post.title}`} 
                fill
                sizes="(min-width: 896px) 896px, 100vw"
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
            {post.createdAt && <div className="text-sm">{format(new Date(post.createdAt), "MMMM d, yyyy")}</div>}
            <div className="items-end">{readingTime(post.content).text}</div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {/* The post title is the page's only h1, so headings inside the content start at h2 */}
          <MDXRemote source={post?.content} components={{ h1: (props) => <h2 {...props} /> }} />
    </div>
    </article>
    </Suspense>
  )}