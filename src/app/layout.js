import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rusticosmotors.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Concesionario Jeep | Dodge | RAM Maracaibo — Tres Leyendas. Un Solo Destino.',
    template: '%s | Concesionario Jeep • Dodge • RAM Maracaibo',
  },
  description:
    'Concesionario oficial Jeep, Dodge y RAM en Maracaibo, Estado Zulia, Venezuela. Explora nuestro inventario de 4x4 Wrangler, Grand Cherokee, Charger SRT y Pick-ups RAM 1500/2500 con financiamiento y garantía de fábrica.',
  keywords: [
    'Concesionario Jeep Maracaibo',
    'Dodge Maracaibo',
    'RAM 1500 Venezuela',
    'Jeep Wrangler Rubicon 2025',
    'Financiamiento de vehículos Maracaibo Zulia',
    'Rústicos 4x4 Maracaibo',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: siteUrl,
    siteName: 'Rústicos Motors Maracaibo — Jeep | Dodge | RAM',
    title: 'Tres Leyendas. Un Solo Destino: Jeep | Dodge | RAM en Maracaibo',
    description:
      'Poder, estilo y capacidad. Conoce nuestro inventario, simula tu plan de financiamiento y agenda tu Test Drive en nuestra única sede en Maracaibo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concesionario Oficial Jeep | Dodge | RAM Maracaibo',
    description:
      'Explora el inventario de Jeep Wrangler, Dodge Charger SRT y RAM 1500 en Maracaibo, Estado Zulia. Garantía oficial y planes de financiamiento a tu medida.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
