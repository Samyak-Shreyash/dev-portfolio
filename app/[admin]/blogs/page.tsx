import { DeletePostButton } from "@/components/delete-post-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogApiService } from "@/lib/api-services";
import { BlogPost } from "@/lib/types";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Link from "next/link";
// import { getCurrentUser } from "@/lib/auth"
// import { redirect } from "next/navigation";

export default async function BlogsDashBoard() 
{ 
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //     redirect('/blog');
    // }

    const blogs = await BlogApiService.getAllBlogs()
    return (
        <div className="container mx-auto px-6 md:px-12 sm:px-8 py-12 ">
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" >Blog Dashboard</h1>
                <Button asChild>
                    <Link href="/admin/blogs/new">Create Post</Link>
                    </Button>
            </div>
            <div className="border border-[hsl(var(--muted))]/50 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[hsl(var(--muted))]">
                        <tr>
                            <th className="text-left font-medium p-2">Title</th>
                            <th className="text-left font-medium py-2 px-8">Date</th>
                            <th className="text-center font-medium p-2">Status</th>
                            <th className="text-right font-medium p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((post: BlogPost) =>(
                            <tr
                            key={post._id}
                            className="font-base hover:bg-[hsl(var(--muted))]/50 px-4 py-4"
                            >
                                <td className="hover:text-primary"><Link href={`/blog/${post.slug.toString()}`}>{post.title}</Link></td>
                                <td className="text-muted-foreground p-4">{format(new Date(post.createdAt), "MMM d, yyyy")}</td>
                                <td className="text-center font-base p-2">
                                    <Badge variant="secondary" className=
                                    {`${post.published ? "hover:bg-green-700 text-green-700 hover:text-[hsl(var(--background))]" : "text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--background))]"}`}>
                                        {post.published?"Published": "Draft"}
                                        </Badge>
                                    </td>
                                <td className="text-right font-base p-2">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild size="sm" variant="ghost" className="text-green-700 hover:bg-green-500 hover:text-[hsl(var(--background))]">
                                            <Link href={`/admin/blogs/edit/${post.slug}`}>
                                            <Edit className="h-4 w-4 mr1" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <DeletePostButton postId={post?._id.toString()} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}