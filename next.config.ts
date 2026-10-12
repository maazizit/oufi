import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cuwtknywzfyvhuuvvrpd.supabase.co",
      },
    ],
  },
  async headers() {
    // HTTPS + cert Let's Encrypt OK on amanplanet.com (2026-10-11)
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
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
