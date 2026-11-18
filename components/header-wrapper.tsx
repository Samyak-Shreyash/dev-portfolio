import { getCachedProjects, getCachedPublishedBlogs } from "@/lib/cached-data";
import { NAV_LINK } from "@/lib/constants";
import { SiteHeader } from "./site-header";

export default async function HeaderWrapper() {
    let navLink = NAV_LINK
    const blogs = await getCachedPublishedBlogs()?? [];
    const projects = await getCachedProjects()?? [];

    navLink = blogs.length!=0?navLink: navLink.filter(item => item.name !== "Blogs");
    navLink = projects.length!=0?navLink: navLink.filter(item => item.name !== "Projects");
    return (< SiteHeader navLink = {navLink}/>)
} 