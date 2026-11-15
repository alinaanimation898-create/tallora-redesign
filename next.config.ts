import type { NextConfig } from "next";

// GitHub Pages build: static HTML export served from /<repo-name>.
// Enabled only when GITHUB_PAGES=true so `npm run dev` keeps working as before.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH ?? "/tallora-redesign" : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    // Static export has no image-optimisation server.
    unoptimized: isPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // PPR / Cache Components need a server, so they are off for the static Pages export.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
