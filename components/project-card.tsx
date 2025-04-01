import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import type { Project } from "@/lib/types"
import { DEV_GITHUB } from "@/utils/constants"

interface ProjectProps {
  project: Project
}

export function ProjectCard({ project }: ProjectProps) {
  return (
    
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={project.coverImage?.toString() ?? "/placeholder.svg?height=192&width=384/placeholder.svg?height=192&width=384"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">{format(new Date(project.createdAt), "MMM d, yyyy")}</div>
          {!project.online && <Badge variant="outline">In-Development</Badge>}
        </div>
        <Link href={project.link} className="hover:underline">
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        
        <p className="text-muted-foreground line-clamp-3">{project.excerpt?? ""}</p>
        <div className="flex items-center justify-between">
        {project.specs.map((spec, id) => (
              <Badge 
                variant="secondary"
                key={id}>
                {spec}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={project.link?? project.github ?? DEV_GITHUB} target="_none" className="text-sm font-medium text-primary hover:underline">
          {project.online ? "Check It Out" : "Github-Link"}
        </Link>
      </CardFooter>
    </Card>
  )
}

