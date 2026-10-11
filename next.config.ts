import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Anciennes ancres services → pages SEO
      {
        source: "/services/domotique",
        destination: "/installation-domotique",
        permanent: true,
      },
      {
        source: "/services/cameras",
        destination: "/installation-camera-surveillance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
