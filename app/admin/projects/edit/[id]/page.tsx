import { ProjectForm } from "@/components/project-form";
import { isAdmin } from "@/lib/auth";
import { ProjectDBService } from "@/lib/mongodb";
import { mapProject } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { notFound, redirect } from "next/navigation";

export const metadata = { title: "Edit Project" }

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) {
    redirect('/login');
  }

  const { id } = await params;
  const project = ObjectId.isValid(id) ? mapProject(await ProjectDBService.getProjectById(id)) : null;
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
