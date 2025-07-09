/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  images: {
    domains: ['drive.usercontent.google.com', "drive.google.com", 'i.imgur.com', 'imgur.com', 'lh3.googleusercontent.com', 'drive.google.com'],
  
  },
}

export default nextConfig
