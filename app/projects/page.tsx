import BlogLoading from "@/components/BlogLoading";
import { ProjectCard } from "@/components/project-card";
import { siteURL } from "@/lib/constants";
import { Project } from "@/lib/types";
import { Suspense } from "react";
// Use server-side rendering
export const dynamic = "force-dynamic";

async function fetchProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? siteURL + "/api";
  const response = await fetch(`${apiUrl}/project`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await response.json();
  if (!data) {
    throw new Error("Failed to fetch projects");
  }
  return data;
}

export default async function ProjectPage() {
  const projects = await fetchProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Development Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<BlogLoading />}>
          {projects.map((project: Project) => (
            <ProjectCard key={project._id?.toString()} project={project} />
          ))}
        </Suspense>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No Projects Online yet. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}

