import ContactIcons from "@/components/contact-icons";
import { Button } from "@/components/ui/button";
import { CURR_IMG, DEV_NAME, TECH_STACK } from "@/lib/constants";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { format } from "date-fns";
import { sortBlogs } from "@/lib/utils";
import { Suspense } from "react";
import BlogLoading from "@/components/BlogLoading";
import { Project } from "@/lib/types";


async function fetchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  if (!response.ok) {
      throw new Error('Failed to fetch posts')
  }
  const data = await response.json()
  return data;
}

async function fetchProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
  if (!response.ok) {
      throw new Error('Failed to fetch projects')
  }
  const data = await response.json()
  return data;
}

export default async function Home() {
  const projects = (await fetchProjects()).slice(0, 3); // Get only the latest 3 projects
  const blogs = sortBlogs(await fetchPosts()).slice(0, 2); // Get only the latest 2 posts
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hi, I&apos;m <span className="text-primary">{DEV_NAME}</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Senior Software Developer specializing in building exceptional
                  digital experiences that make people&#39;s lives simpler.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/projects">
                  <Button className="inline-flex items-center gap-2">
                    View My Work <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Get In Touch</Button>
                </Link>
              </div>
              <ContactIcons />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square overflow-hidden rounded-full border-8 border-muted">
                <Image
                  src={CURR_IMG}
                  alt={DEV_NAME}
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[hsl(var(--muted))]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
                My Tech Stack
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/related lg:text-base/relaxed xl:text-xl/relaxed">
                I work with a variety of technologies to create robust and scalable applications.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-8">
              {TECH_STACK.map((tech) => {
                return (
                  <div
                    className="flex flex-col items-center gap-2"
                    key={tech.tech}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--background))]">
                      <Image
                        src={`https://icon.icepanel.io/Technology/svg/${tech.icon}.svg`}
                        alt={tech.tech}
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className="font-medium">{tech.tech}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of my recent work.
              </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Suspense fallback={<BlogLoading />}>
                 {projects
                 .sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) // Sort by date (newest first)
                 .map((project: Project) => (
                  <div
                  key={project._id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 text-left shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-xl font-bold text-center">{project.title}</h3>
                      <p className="text-muted-foreground">{project.excerpt}</p>
                      <div className="pt-4 text-sm text-muted-foreground">{project.specs?.join(", ")}</div>
                    </div>
                    <Link
                    href={project.link??project.github??"/projects"}
                    className="absolute inset-0 rounded-lg focus:outline-none focus:[hsl(var(--ring))]-2 focus:[hsl(var(--ring))] focus:[hsl(var(--ring))]-offset-2"
                    >
                      <span className="sr-only">View {project.title}</span>
                    </Link>
                  </div>
                 ))}
                 </Suspense>
          </div>
          {projects.length>2 && <div className="mt-8">
                <Link href="/projects">
                  <Button variant="outline" className="inline-flex items-center gap-2">
                    View All Projects <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>}
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-[hsl(var(--muted))]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Blog Posts</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Thoughts, insights, and tutorials on software development.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Suspense fallback={<BlogLoading />}>
                {blogs
                .map((post) => (
                  <div
                  key={post?._id}
                  className="group relative overflow-hidden rounded-lg border bg-[hsl(var(--background))] p-6 text-left shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm text-muted-foreground">{format(new Date(post.createdAt), "MMM d, yyyy")}</div>
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <span className="sr-only">Read {post.title}</span>
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
    </div>
  );
}
