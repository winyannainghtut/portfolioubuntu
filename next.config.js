/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  
  // Image optimization is disabled for static export
  // For dynamic hosting (Vercel), you can enable optimization
  images: {
    unoptimized: true
  },
  
  // Uncomment these lines if your site will be served from a subdirectory
  // basePath: '/portfolioubuntu',
  // assetPrefix: '/portfolioubuntu/',
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Compiler options for production
  compiler: {
    // Remove console.log in production (keep errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

module.exports = nextConfig
