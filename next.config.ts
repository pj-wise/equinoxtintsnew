import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [70, 80, 90],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The previous site was a single page ("/") with in-page anchors
  // (#home, #services, #portfolio, #contact), which the new homepage keeps.
  // These catch common guessed/legacy paths and send them to the new pages.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/gallery", permanent: true },
      { source: "/our-work", destination: "/gallery", permanent: true },
      { source: "/tint", destination: "/services/window-tint", permanent: true },
      { source: "/window-tint", destination: "/services/window-tint", permanent: true },
      { source: "/window-tinting", destination: "/services/window-tint", permanent: true },
      { source: "/ceramic-coating", destination: "/services/ceramic-coating", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/quote", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
