import type { MetadataRoute } from "next"
import { siteMetaData } from "@/lib/constants"
import { BlogDBService } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteMetaData.siteUrl
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ]

  // A database outage shouldn't take the sitemap down with it
  const blogs = await BlogDBService.getPublishedBlogs().catch(() => [])
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${base}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt ?? blog.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
