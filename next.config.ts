import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Blog images uploaded to Vercel Blob
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
  async rewrites() {
    return {
      // Only when no portfolio route matches, so /projects itself stays the portfolio page.
      // Each project app is deployed with its base path set to /projects/<slug>/.
      fallback: [
        {
          source: "/projects/:slug/:path*",
          destination: "https://projects.samyakshreyash.in/projects/:slug/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
