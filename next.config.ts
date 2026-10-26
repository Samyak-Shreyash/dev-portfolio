import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Blog images uploaded to Vercel Blob
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
};

export default nextConfig;
