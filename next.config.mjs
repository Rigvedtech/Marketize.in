/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd && isGithubPages ? '/Marketize.in' : '',
  assetPrefix: isProd && isGithubPages ? '/Marketize.in/' : '',
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
