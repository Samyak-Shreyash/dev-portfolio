import { DeleteProjectButton } from "@/components/admin-buttons";
import { AdminNav } from "@/components/admin-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectDBService } from "@/lib/mongodb";
import { isAdmin } from "@/lib/auth";
import { getProjectDemoUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Edit } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Project Dashboard" }

export default async function ProjectsDashBoard()
{
    if (!(await isAdmin())) {
        redirect('/login');
    }

    const projects = await ProjectDBService.getAllProjects()
    return (
        <div className="container mx-auto px-6 md:px-12 sm:px-8 py-12 ">
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" >Project Dashboard</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <AdminNav />
                    <Button asChild>
                        <Link href="/admin/projects/new">Add Project</Link>
                    </Button>
                </div>
            </div>
            <div className="border border-muted rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[hsl(var(--muted))]">
                        <tr>
                            <th className="text-left font-medium p-2">Title</th>
                            <th className="text-left font-medium py-2 px-8">Category</th>
                            <th className="text-left font-medium p-2">Live Demo</th>
                            <th className="text-center font-medium p-2">Status</th>
                            <th className="text-right font-medium p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => {
                            const demoUrl = getProjectDemoUrl(project)
                            return (
                            <tr
                            key={project._id.toString()}
                            className="font-base hover:bg-[hsl(var(--muted))]/50 px-4 py-4"
                            >
                                <td className="p-2">{project.title}</td>
                                <td className="text-muted-foreground py-2 px-8">{project.category}</td>
                                <td className="text-muted-foreground p-2">
                                    {demoUrl ? <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{demoUrl.replace(/^https?:\/\//, "")}</a> : "None"}
                                </td>
                                <td className="text-center font-base p-2">
                                    <Badge variant="secondary">{project.online ? "Online" : "Offline"}</Badge>
                                </td>
                                <td className="text-right font-base p-2">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild size="sm" variant="ghost" className="text-green-700 hover:bg-green-500 hover:text-[hsl(var(--background))]">
                                            <Link href={`/admin/projects/edit/${project._id.toString()}`}>
                                            <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <DeleteProjectButton projectId={project._id.toString()} />
                                    </div>
                                </td>
                            </tr>
                            )
                        })}
                        {projects.length === 0 && (
                            <tr><td colSpan={5} className="text-center text-muted-foreground p-8">No projects yet. Add your first one!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
