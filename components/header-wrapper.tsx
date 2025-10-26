import { BlogDBService, ProjectDBService } from "@/lib/mongodb";
import { NAV_LINK } from "@/lib/constants";
import { SiteHeader } from "./site-header";

export default async function HeaderWrapper() {
    let navLink = NAV_LINK
    const blogs = await BlogDBService.getAllBlogs()?? [];
    const projects = await ProjectDBService.getAllProjects()?? [];

    navLink = blogs.length!=0?navLink: navLink.filter(item => item.name !== "Blogs");
    navLink = projects.length!=0?navLink: navLink.filter(item => item.name !== "Projects");
    return (< SiteHeader navLink = {navLink}/>)
} 