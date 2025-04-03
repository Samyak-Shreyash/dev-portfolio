import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { Project } from "@/lib/types";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={
            project.coverImage?.toString() ??
            "/placeholder.svg?height=192&width=384"
          }
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">
            {format(new Date(project.createdAt), "MMM d, yyyy")}
          </div>
          {!project.online ? (
            <Badge variant="outline" className="bg-[hsl(var(--secondary))]/40">
              In-Development
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-[hsl(var(--primary))]/40">
              Online
            </Badge>
          )}
        </div>
        <Link href={project.link} className="hover:underline">
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">
          {project.excerpt ?? ""}
        </p>
      </CardContent>
      <CardContent>
      <div className="flex flex-wrap gap-2">
                    {project.specs.map((tech, index) => (
                      <Badge 
                      key={index}
                      className="bg-hsl(var(--primary-foreground)) border-outline text-hsl(var(--secondary-foreground)) hover:bg-hsl(var(--secondary))/80"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
      </CardContent>
      <CardFooter className="flex flex-row-reverse justify-between">
        <Button asChild variant="outline" size="sm" className="bg-[hsl(var(--primary))/50]">
              <Link href={project.github} target="_none" className="text-sm font-medium text-primary hover:underline">
                  <Github className="text-primary" /> Code
              </Link>
              </Button>
             {project.online &&
             <Button asChild variant="outline" size="sm">
             <Link 
             href={project.link} 
             target="_none" 
             className="text-sm font-medium text-primary hover:underline">
                 <ExternalLink className="text-primary" /> Demo
             </Link>
             </Button>
              }
            </CardFooter>
    </Card>
  );
}
