import { BlogPost, ContactMsg, Project } from "./types"

export const ContactApiService = {
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api/blog'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,

/**
   * Create a new message
   */
  async createMessage(msgData: Omit<ContactMsg, "_id" | "createdAt">): Promise<{ msgId: string }> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
      })
      if (!response.ok) {
        let errorMessage = `Failed to Submit Message: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData?.error || errorMessage
        } catch (parseError) {
          /* non-json error body */
          errorMessage += ` (Failed to parse error: ${parseError})`;
        }
        throw new Error(errorMessage)
      }

      // Expecting { message: string, messageId: <id> }
      interface MessageResponse {
        messageId?: string;
        msgId?: string;
        id?: string;
        message?: string;
      }
      
      const data = await response.json().catch(() => ({})) as MessageResponse
      const msgId = data?.messageId ?? data?.msgId ?? data?.id
      return { msgId: msgId?.toString() ?? "" }
    } catch (error) {
      console.error("Error Submitting Message:", error)
      throw error
    }
  },

    async getAllMessages(): Promise<ContactMsg[]> {
    try {
      // During build time, if we can't access the API, return empty array
      if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "build") {
        console.warn("Building in production without API access, returning empty blogs array")
        return []
      }
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // headers: ApiService.getHeaders(),
        // Add cache: 'no-store' to avoid caching during development
        // cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
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
   * Delete a Message
   */
    async deleteMessage(id: string): Promise<void> {
      try {
        const response = await fetch(this.baseUrl, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
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

/**
 * Service for interacting with the project API
 */
export const ProjectApiService = {
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api/project'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,

  /**
   * Get all blogs
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      // During build time, if we can't access the API, return empty array
      if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "build") {
        console.warn("Building in production without API access, returning empty blogs array")
        return []
      }
      const response = await fetch(this.baseUrl, {
        // headers: ApiService.getHeaders(),
        // Add cache: 'no-store' to avoid caching during development
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
      })

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        // Return empty array instead of throwing during build
        return []
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching projects:", error)
      // Return empty array instead of throwing during build
      return []
    }
  },

  /**
   * Get a blog by ID
   */
  async getProjectyById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        // headers: ApiService.getHeaders(),
      })

      if (response.status === 404) {
        return null
      }

      if (response.status === 401) {
        console.error("API authentication failed. Check your API_KEY environment variable.")
        return null
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error)
      return null
    }
  },

  /**
   * Create a new blog
   */
  async createProject(project: Omit<Project, "_id" | "createdAt" | "updatedAt">): Promise<{ blogId: string }> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        // headers: ApiService.getHeaders(),
        body: JSON.stringify(project),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to create project: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error creating project:", error)
      throw error
    }
  },

  /**
   * Update an existing project
   */
  async updateProject(id: string, project: Omit<Project, "_id" | "createdAt" | "updatedAt">): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        // headers: ApiService.getHeaders(),
        body: JSON.stringify(project),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to update project: ${response.status}`)
      }
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        // headers: ApiService.getHeaders(),
      })

      if (response.status === 401) {
        throw new Error("API authentication failed. Check your API_KEY environment variable.")
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete project: ${response.status}`)
      }
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error)
      throw error
    }
  },
}

/**
 * Service for interacting with the blog API
 */
export const BlogApiService = {
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api/blog'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,

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
      const response = await fetch(this.baseUrl, {
        // headers: ApiService.getHeaders(),
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
      const response = await fetch(`${this.baseUrl}/slug/${slug}`, {
        // headers: ApiService.getHeaders(),
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
      const response = await fetch(`${this.baseUrl}/${id}`, {
        // headers: ApiService.getHeaders(),
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
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        // headers: ApiService.getHeaders(),
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
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        // headers: ApiService.getHeaders(),
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
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        // headers: ApiService.getHeaders(),
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