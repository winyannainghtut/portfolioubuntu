/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Uncomment these lines if your site will be served from a subdirectory
  // basePath: '/portfolioubuntu',
  // assetPrefix: '/portfolioubuntu/',
}

module.exports = nextConfig
