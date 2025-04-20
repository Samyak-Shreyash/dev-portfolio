export const dynamic = "force-dynamic"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github } from "lucide-react"
import { Project } from "@/lib/types"
import { ProjectApiService } from "@/lib/api-services"

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
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Let's Work Together</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.demoUrl && (
            <Button variant="secondary" size="sm" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Code
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}
