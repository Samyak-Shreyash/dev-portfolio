import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/project";
    
// export const metadata: Metadata = {
//   title: `Blogs | ${DEV_NAME}`,
//   keywords: ['Samyak Shreyash', 'Software Engineer', 'Full Stack Developer', 'Portfolio'],
//   description: DEV_TITLE,
//   authors: [{ name: DEV_NAME, url: siteURL}],
//   openGraph: {
//     title: `Blogs | ${DEV_NAME}`,
//     description:
//       'Checkout my latest Web-development, Data and other Projects.',
//     url: 'https://samyak-shreyash.vercel.app/projects',
//     siteName: 'Samyak Shreyash Portfolio',
//     images: [
//       {
//         url: `${siteURL}/uploads/${DEV_IMAGE}`, // Place the image in /public
//         width: 1200,
//         height: 630,
//         alt: `${DEV_NAME} Portfolio OG Image`,
//       },
//     ],
//     locale: 'en_IN',
//     type: 'article',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title:  `Blogs | ${DEV_NAME}`,
//     site: '@Samyak_shreyash',
//     description:
//       'Checkout my latest Web-development, Data and other Projects ',
//     images: ['/og-image.png'],
//     creator: '@Samyak_shreyash', // Optional Twitter handle
//   },
// };
export default async function ProjectPage() {
    const projects = await getProjects()
  
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Development Projects</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id?.toString()} project={project} />
          ))}
        </div>
  
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Projects Online yet. Check back later!</p>
          </div>
        )}
      </div>
    )
  }