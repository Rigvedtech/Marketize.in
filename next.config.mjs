/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'
const isStatic = process.env.BUILD_STATIC === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProduction ? '/Marketize.in' : '',
  assetPrefix: isProduction ? '/Marketize.in/' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
