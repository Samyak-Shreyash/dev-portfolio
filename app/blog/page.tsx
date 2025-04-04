import { BlogCard } from "@/components/blog-card"
import { getBlogPosts } from "@/lib/blog"
import { sortBlogs } from "@/lib/utils";
  
// export const metadata: Metadata = {
//     title: `Blogs | ${DEV_NAME}`,
//     keywords: ['Samyak Shreyash', 'Software Engineer', 'Full Stack Developer', 'Portfolio'],
//     description: DEV_TITLE,
//     authors: [{ name: DEV_NAME, url: siteURL}],
//     openGraph: {
//       title: `Blogs | ${DEV_NAME}`,
//       description:
//         'Read my latest blog posts about technology, design, and more.',
//       url: 'https://samyak-shreyash.vercel.app/blogs',
//       siteName: 'Samyak Shreyash Portfolio',
//       images: [
//         {
//           url: `${siteURL}/uploads/${DEV_IMAGE}`, // Place the image in /public
//           width: 1200,
//           height: 630,
//           alt: `${DEV_NAME} Portfolio OG Image`,
//         },
//       ],
//       locale: 'en_IN',
//       type: 'article',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title:  `Blogs | ${DEV_NAME}`,
//       site: '@Samyak_shreyash',
//       description:
//         'Read my latest blog posts about technology, design, and more.',
//       images: ['/og-image.png'],
//       creator: '@Samyak_shreyash', // Optional Twitter handle
//     },
//   };
export default async function BlogsPage() {
    const posts = sortBlogs(await getBlogPosts())
    
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