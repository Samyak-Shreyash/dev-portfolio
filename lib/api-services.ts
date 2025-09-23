
import type { BlogPost, ContactMsg, Project } from "@/lib/types"
import { config } from "./config"
import { BlogDBService, ProjectDBService } from "./mongodb"
import { IntegerType } from "mongodb";

/**
 * Service for interacting with the blog API
 */
export const BlogApiService = {

  async getBlogCount() : Promise<Number> {
    return await BlogDBService.getBlogCount();
  },
  /**
   * Get all blogs
   */
  async getAllBlogs(): Promise<BlogPost[]> {
    const docs = await BlogDBService.getAllBlogs();
    const posts: BlogPost[] = docs.map((doc: any) => ({
    _id: doc._id.toString(),
    title: doc.title,
    coverImage: doc.coverImage.toString(),
    slug: doc.slug,
    content: doc.content,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    // add other BlogPost fields as needed
  }));
  return posts;
  },

  /**
   * Get a blog by slug
   */
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const doc = await BlogDBService.getBlogBySlug(slug);
    if (!doc) return null;
    const post: BlogPost = {
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      published: doc.published,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      // add other BlogPost fields as needed
    };
    return post;
  },

  /**
   * Get a blog by ID
   */
  async getBlogById(id: string): Promise<BlogPost | null> {
    const doc = await BlogDBService.getBlogById(id);
    if (!doc) return null;
    const post: BlogPost = {
      _id: doc._id.toString(),
      coverImage: doc.coverImage.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      published: doc.published,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      // add other BlogPost fields as needed
    };
    return post;
  },

}


export const ProjectApiService = {

  async getProjectCount() : Promise<Number> {
    return await ProjectDBService.getProjectCount();
  },
  /**
   * Get all Projects
   */
  async getAllProjects(): Promise<Project[]> {
    const docs = await ProjectDBService.getAllProjects();
    const projects: Project[] = docs.map((doc: any) => ({
    _id: doc._id.toString(),
    title: doc.title,
    image: doc.image.toString(),
    description: doc.description,
    demoUrl: doc.demoUrl,
    repoUrl: doc.repoUrl,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    technologies: doc.technologies,
    category: doc.category, // ensure this exists in your DB or provide a default value
    online: doc.online,     // ensure this exists in your DB or provide a default value
  }));
  return projects;
  },

  /**
   * Get a Project by ID
   */
  async getProjectById(id: string): Promise<Project | null> {
    const doc = await ProjectDBService.getProjectById(id);
    if (!doc) return null;
    const post: Project = {
    _id: doc._id.toString(),
    title: doc.title,
    image: doc.image.toString(),
    description: doc.description,
    demoUrl: doc.demoUrl,
    repoUrl: doc.repoUrl,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    technologies: doc.technologies,
    category: doc.category, // ensure this exists in your DB or provide a default value
    online: doc.online,     // ensure this exists in your DB or provide a default value
      // add other Project fields as needed
    };
    return post;
  },

}