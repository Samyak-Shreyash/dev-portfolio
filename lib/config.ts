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
        blogs: "/post",
        projects: "/projects",
        messages: "/contact",
        blogBySlug: (slug: string) => `/post/${slug}`,
        blogById: (id: string) => `/post/id/${id}`,
        msgById: (id: string) => `/contact/${id}`,
        projectById: (id: string) => `/projects/${id}`,
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
  
  