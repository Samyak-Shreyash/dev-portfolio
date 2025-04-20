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
    <Card className="overflow-hidden group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image?.toString() ?? "/placeholder.svg"}
          alt={project.title}
          height={400}
          width={600}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.online && <div className="absolute inset-0 bg-[hsl(var(--foreground))]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
          <Button asChild variant="secondary" size="sm">
            <Link
              href={project.demoUrl?.toString() ?? ""}
              target="_none"
              className="text-sm text-primary hover:underline"
            >
             View Project <ExternalLink className="ml-2 size-4" /> 
            </Link>
          </Button>
        </div>}
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
        <Link href={project.demoUrl} className="hover:underline">
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">
          {project.description ?? ""}
        </p>
      </CardContent>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <Badge
              key={index}
              className="bg-hsl(var(--primary-foreground)) border-outline text-hsl(var(--secondary-foreground)) hover:bg-hsl(var(--secondary))/80"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter className="flex flex-row-reverses">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="bg-[hsl(var(--primary))/50]"
        >
          <Link
            href={project.githubLink?.toString() ?? ""}
            target="_blank"
            className="text-sm font-medium text-primary hover:underline"
          >
            <Github className="text-primary" /> Code
          </Link>
        </Button>
      </CardFooter> */}
    </Card>
  );
}
