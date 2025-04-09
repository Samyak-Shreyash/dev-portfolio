import { siteURL } from "./constants";

/**
 * Application configuration
 */
export const config = {
    /**
     * API configuration
     */
    api: {
      /**
       * Base URL for the API
       * This should be set in the environment variables
       */
      baseUrl: process.env.NEXT_PUBLIC_API_URL || `${siteURL}/api`,
  
      /**
       * API endpoints
       */
      endpoints: {
        blogs: "/blogs",
        projects: "/project",
        messages: "/contact",
        blogBySlug: (slug: string) => `/blogs/slug/${slug}`,
        blogById: (id: string) => `/blogs/${id}`,
        msgById: (id: string) => `/contact/${id}`,
        projectById: (id: string) => `/project/${id}`,
        user: "/login",
      },
  
      /**
       * Authentication settings
       */
      auth: {
        /**
         * Whether to use authentication
         */
        enabled: !!process.env.API_KEY,
  
        /**
         * API key
         */
        apiKey: process.env.API_KEY,
      },
    },
  }
  
  