import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/fluakademi",
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
