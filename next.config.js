/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Required for static site export (GitHub Pages)
  trailingSlash: true, // Recommended for GitHub Pages
  images: {
    unoptimized: true, // Required for static site export
  },
  
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Asset handling for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/roach-landing' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/roach-landing/' : '',
  
  // Make path info available to components
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/roach-landing' : '',
  },
};

module.exports = nextConfig;
