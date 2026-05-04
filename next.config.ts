import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/emotional-vet',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
