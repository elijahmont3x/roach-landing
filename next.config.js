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
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Set base path for production builds
  basePath: process.env.NODE_ENV === 'production' ? '/roach-landing' : '',
  
  // Configure asset prefix for production (optional, if different from basePath)
  assetPrefix: process.env.NODE_ENV === 'production' ? '/roach-landing' : '',
};

module.exports = nextConfig;
