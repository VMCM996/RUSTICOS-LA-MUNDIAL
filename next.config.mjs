/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita la generación de HTML estático para GitHub Pages
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    unoptimized: true, // Obligatorio para exportación estática
    formats: ['image/avif', 'image/webp'],
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
  // Si tu web se publica en https://tu-usuario.github.io/RUSTICOS-LA-MUNDIAL
  // descomenta la siguiente línea para que no se rompan las rutas de estilos e imágenes:
  // basePath: '/RUSTICOS-LA-MUNDIAL',
};

export default nextConfig;