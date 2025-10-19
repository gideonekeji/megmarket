import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "megmarket.africa",
        pathname: "/assets/images/users_images/**",
      },
      {
        protocol: "https",
        hostname: "megmarket.africa",
        pathname: "/assets/images/service_images/**",
      },
      {
        protocol: "https",
        hostname: "megmarket.africa",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "nlytical.online",
        pathname: "/assets/images/users_images/**",
      },
      {
        protocol: "https",
        hostname: "web.nlytical.online",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "nlyticalapp.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
