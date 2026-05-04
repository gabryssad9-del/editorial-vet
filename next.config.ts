import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/editorial-vet',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
