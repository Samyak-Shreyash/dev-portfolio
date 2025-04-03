import { DEV_NAME } from "@/lib/constants";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/project";

export const metadata = {
    title: `Projects of ${DEV_NAME}`,
    description: "Checkout my latest Web-development, Data and other Projects ",
  }
  
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