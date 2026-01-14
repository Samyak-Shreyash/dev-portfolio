import { Button } from "@/components/ui/button";
import { TECH_STACK } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Suspense } from "react";
import PageLoading from "@/components/ui/page-loading";
import { Blog, Project } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HeroSection } from "@/components/hero-section";
import { BlogDBService, ProjectDBService } from "@/lib/mongodb";

export const dynamic = "force-dynamic"

// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "Person",
//   "name": DEV_NAME,
//   "url": siteURL,
//   "sameAs": [
//     DEV_GITHUB,
//     DEV_LINKEDIN
//   ],
//   "jobTitle": DEV_TITLE,
//   "worksFor": {
//     "@type": "Organization",
//     "name": "Mphasis"
//   },
//   "knowsAbout": ["Java", "SQL", "Web Development", "React", "Next.js", "Kafka"],
// };




export default async function Home() {
  
const blogs = await BlogDBService.getAllBlogs();
const projects = await ProjectDBService.getAllProjects();

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      {/* Tech Stack */}
        <TechSection />
      {/* What I work */}
          <WorkSection />
      {/* Project Section */}
      {
      projects.length>0 &&
        <ProjectSection projects = {projects}  muted = {true} />
      }
      {/* Blogs Section */}
      {
        blogs.length>0 && (projects.length>0?
      <BlogSection blogs = {blogs} muted = {false}/> :
      <BlogSection blogs = {blogs} muted = {true}/>    
    )
      }
      {/* Contact Section */}
      {
      projects.length>0 ?
        blogs.length>0 ?
      <ContactSection muted = {true}/> :
      <ContactSection muted = {false}/> :
      blogs.length>0 ?
      <ContactSection muted = {false}/> :
      <ContactSection muted = {true}/>
      }
    </main>
  );
}


function TechSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
      <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
          My Tech Stack
        </h2>
        <p className="max-w-225 text-muted-foreground md:text-xl/related lg:text-base/relaxed xl:text-xl/relaxed">
          I work with a variety of technologies to create robust and scalable applications
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
        <TooltipProvider>
          {TECH_STACK.map((tech) => {
            return (
              <Tooltip key={tech.tech}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center gap-2"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/60">
                    <Image 
                      src={`https://icon.icepanel.io/Technology/svg/${tech.icon}.svg`}
                      alt={tech.tech}
                      width={40}
                      height={40} />
                  </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="font-medium">{tech.tech}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  </div>
    </section>
  )
  }

function WorkSection() {
  return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container space-y-12">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <Badge variant="outline">Skills & Expertise</Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">What I Do</h2>
        <p className="max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
          I leverage modern technologies to build scalable, user-friendly applications.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col p-6 space-y-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-primary"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">Frontend Development</h3>
          <p className="text-sm text-muted-foreground text-pretty">
            Creating responsive, accessible, and performant user interfaces with modern frameworks.
          </p>
        </div>
      </Card>
      <Card className="flex flex-col p-6 space-y-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-primary"
          >
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
            <path d="M8 16h.01" />
            <path d="M8 20h.01" />
            <path d="M12 18h.01" />
            <path d="M12 22h.01" />
            <path d="M16 16h.01" />
            <path d="M16 20h.01" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">Backend Development</h3>
          <p className="text-sm text-muted-foreground text-pretty">
            Building robust APIs and server-side applications with scalable architecture.
          </p>
        </div>
      </Card>
      <Card className="flex flex-col p-6 space-y-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h10" />
            <path d="M7 12h10" />
            <path d="M7 17h10" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">AI/ML</h3>
          <p className="text-sm text-muted-foreground text-pretty">
            Designing intuitive models which shows more than the data had to offer.
          </p>
        </div>
      </Card>
    </div>
  </div>
        </section>
  ) 
}

interface ProjectSectionProp {
  projects: Project[],
  muted: boolean
}
function ProjectSection({ projects, muted }: ProjectSectionProp) { 
  return(
    <section className={`w-full py-12 md:py-24 lg:py-32 ${muted ? "bg-muted" : ""}`} >
      <div className="container space-y-12 px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Featured Projects
        </h2>
        <p className="max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Check out some of my latest work and contributions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Suspense fallback={<PageLoading />}>
          {projects
            .slice(0, 3)
            .sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) // Sort by date (newest first)
            .map((project: Project) => (
              <ProjectCard key={project._id?.toString()} project={project} />
            ))}
        </Suspense>
      </div>
      {projects.length > 2 && <div className="mt-8">
        <Link href="/projects">
          <Button variant="outline" className="inline-flex items-center gap-2">
            View All Projects <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>}
    </div>
  </div>
    </section>
  );
}
interface BlogSectionProp {
  blogs: Blog[],
  muted: boolean
}
function BlogSection({blogs, muted}: BlogSectionProp) {
  return(
    <section className={`w-full py-12 md:py-24 lg:py-32 ${muted ? "bg-muted" : ""}`} >
      <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Blog Posts</h2>
        <p className="max-w-225 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Thoughts, insights, and tutorials on software development.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Suspense fallback={<PageLoading />}>
          {blogs
            .slice(0, 2)
            .map((blog: Blog) => (
              <div
                key={blog?._id}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-left shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col space-y-2">
                  <div className="text-sm text-muted-foreground">{format(new Date(blog.createdAt), "MMM d, yyyy")}</div>
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className="text-muted-foreground">{blog.excerpt}</p>
                </div>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ringimary focus:ring-offset-2"
                >
                  <span className="sr-only">Read {blog.title}</span>
                </Link>
              </div>
            ))}
        </Suspense>
      </div>
      <div className="mt-8">
        <Link href="/blog">
          <Button variant="outline" className="inline-flex items-center gap-2">
            Read All Posts <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
    </section>
  ) 
}

interface ContactSectionProp {
muted: boolean
}
function ContactSection({ muted }: ContactSectionProp) {
  return (
        <section className={`w-full py-12 md:py-24 lg:py-32 ${muted ? "bg-muted" : ""}`} >
      <div className="container">
    <div className="mx-auto max-w-3xl space-y-8 text-center">
      <div className="space-y-2">
        <Badge variant="outline">Get In Touch</Badge>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
          Let&apos;s Work Together
        </h2>
        <p className="max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
        <Button asChild>
          <Link href="/contact">
            Contact Me <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`mailto:{DEV_EMAIL}`}>Send Email</Link>
        </Button>
      </div>
    </div>
  </div>
    </section>
  )
}




