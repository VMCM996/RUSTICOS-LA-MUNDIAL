/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/RUSTICOS-LA-MUNDIAL',
  assetPrefix: '/RUSTICOS-LA-MUNDIAL',
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;