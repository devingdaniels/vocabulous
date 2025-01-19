import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"], // Add the domain here
  },
  async redirects() {
    return [
      {
        source: "/", // The root path
        destination: "/auth/login", // The desired destination
        permanent: true, // Indicates whether this is a permanent redirect (status code 308)
      },
    ];
  },
};

export default nextConfig;
