
import type { BlogPost, ContactMsg, Project } from "@/lib/types"
import { config } from "./config"

const ApiService= {
    /**
   * Get API headers with authentication
   */
    getHeaders(): HeadersInit {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }
  
      // Add API key if available
      if (process.env.API_KEY) {
        headers["Authorization"] = `Bearer ${process.env.API_KEY}`
      }
  
      return headers
    },
}
/**
 * Service for interacting with the blog API
 */
export const BlogApiService = {
  /**
   * Get all blogs
   */
  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      // During build time, if we can't access the API, return empty array
      if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "build") {
        console.warn("Building in production without API access, returning empty blogs array")
        return []
      }
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogs}`, {
        headers: ApiService.getHeaders(),
        // Add cache: 'no-store' to avoid caching during development
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
      })

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        // Return empty array instead of throwing during build
        return []
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching blogs:", error)
      // Return empty array instead of throwing during build
      return []
    }
  },

  /**
   * Get a blog by slug
   */
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogBySlug(slug)}`, {
        headers: ApiService.getHeaders(),
      })

      if (response.status === 404) {
        return null
      }

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        return null
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching blog with slug ${slug}:`, error)
      return null
    }
  },

  /**
   * Get a blog by ID
   */
  async getBlogById(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogById(id)}`, {
        headers: ApiService.getHeaders(),
      })

      if (response.status === 404) {
        return null
      }

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        return null
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching blog with id ${id}:`, error)
      return null
    }
  },

  /**
   * Create a new blog
   */
  async createBlog(blogData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">): Promise<{ blogId: string }> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogs}`, {
        method: "POST",
        headers: ApiService.getHeaders(),
        body: JSON.stringify(blogData),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to create blog: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error creating blog:", error)
      throw error
    }
  },

  /**
   * Update an existing blog
   */
  async updateBlog(id: string, blogData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">): Promise<void> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogById(id)}`, {
        method: "PUT",
        headers: ApiService.getHeaders(),
        body: JSON.stringify(blogData),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to update blog: ${response.status}`)
      }
    } catch (error) {
      console.error(`Error updating blog with id ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete a blog
   */
  async deleteBlog(id: string): Promise<void> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.blogById(id)}`, {
        method: "DELETE",
        headers: ApiService.getHeaders(),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete blog: ${response.status}`)
      }
    } catch (error) {
      console.error(`Error deleting blog with id ${id}:`, error)
      throw error
    }
  },
}


export const ContactApiService = {
  async getAllMessages(): Promise<ContactMsg[]> {
    try {
      // During build time, if we can't access the API, return empty array
      if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "build") {
        console.warn("Building in production without API access, returning empty blogs array")
        return []
      }

      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.messages}`, {
        headers: ApiService.getHeaders(),
        // Add cache: 'no-store' to avoid caching during development
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
      })

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        // Return empty array instead of throwing during build
        return []
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching messages:", error)
      // Return empty array instead of throwing during build
      return []
    }
  },
  /**
   * Create a new blog
   */
  async createMessage(msgData: Omit<ContactMsg, "_id" | "createdAt">): Promise<{ msgId: string }> {
    console.log(msgData)
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.messages}`, {
        method: "POST",
        headers: ApiService.getHeaders(),
        body: JSON.stringify(msgData),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to Submit Message: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error Submitting Message:", error)
      throw error
    }
  },
    /**
   * Delete a Message
   */
    async deleteMessage(id: string): Promise<void> {
      try {
        const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.msgById(id)}`, {
          method: "DELETE",
          headers: ApiService.getHeaders(),
        })
  
        if (response.status === 401) {
          throw new Error("API authentication failed. Check your API_KEY environment variable.")
        }
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to delete this Message: ${response.status}`)
        }
      } catch (error) {
        console.error(`Error deleting Message with id ${id}:`, error)
        throw error
      }
    },
}

export const ProjectApiService = {
  async getAllProjects(): Promise<Project[]> {
    try {
      // During build time, if we can't access the API, return empty array
      if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "build") {
        console.warn("Building in production without API access, returning empty blogs array")
        return []
      }

      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.projects}`, {
        headers: ApiService.getHeaders(),
        // Add cache: 'no-store' to avoid caching during development
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
      })

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        // Return empty array instead of throwing during build
        return []
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch Projects: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching blogs:", error)
      // Return empty array instead of throwing during build
      return []
    }
  },
  /**
   * Create a new Project
   */
  async createProject(blogData: Omit<Project, "_id" | "createdAt">): Promise<{ msgId: string }> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.projects}`, {
        method: "POST",
        headers: ApiService.getHeaders(),
        body: JSON.stringify(blogData),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to Submit Project: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error Submitting Project:", error)
      throw error
    }
  },
    /**
   * Delete a blog
   */
    async deleteProject(id: string): Promise<void> {
      try {
        const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.projectById(id)}`, {
          method: "DELETE",
          headers: ApiService.getHeaders(),
        })
  
        if (response.status === 401) {
          throw new Error("API authentication failed. Check your API_KEY environment variable.")
        }
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to delete this Project: ${response.status}`)
        }
      } catch (error) {
        console.error(`Error deleting Project with id ${id}:`, error)
        throw error
      }
    },
}

export const UserApiService = {
  /**
   * Get a blog by ID
   */
  async getUserByEmail(_data: { email: string; password: string }) {
    try {
      const response: Response = await fetch(`${config.api.baseUrl}${config.api.endpoints.user}`, {
        method: "POST",
        headers: ApiService.getHeaders(),
        body: JSON.stringify(_data),
      })

      if (response.status === 404) {
        return null
      }

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        return null
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch email: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching User with email ${_data.email}:`, error)
      return null
    }
  },
}