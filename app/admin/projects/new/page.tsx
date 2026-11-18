import { ProjectForm } from "@/components/project-form";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "New Project" }

export default async function AddNewProject() {
    if (!(await isAdmin())) {
        redirect('/login');
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Add Project</h1>
            <ProjectForm />
        </div>
    );
}
