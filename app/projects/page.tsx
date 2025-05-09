export const dynamic = "force-dynamic"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectApiService } from "@/lib/api-services"
import { ProjectCard } from "@/components/project-card"

export const metadata = {
  title: "Projects - Samyak Shreyash",
  description:
    "Explore the portfolio of projects developed by Samyak Shreyash, showcasing expertise in web development and software engineering.",
}

export default async function ProjectsPage() {
    const projects = await ProjectApiService.getAllProjects()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge className="inline-block" variant="outline">
                My Work
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projects</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A collection of my work, side projects, and open-source contributions.
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="open-source">Open Source</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="web" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project) => project.category === "web")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="mobile" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project) => project.category === "mobile")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="open-source" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((project) => project.category === "open-source")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Collaboration</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Have a project in mind?</h2>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Let&apos;s Work Together</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
