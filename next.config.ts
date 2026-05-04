import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/editorial-vet',
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
