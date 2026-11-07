import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rusticosmotors.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rústicos La Mundial — Concesionario Oficial Jeep | Dodge | RAM en Maracaibo',
    template: '%s | Rústicos La Mundial Jeep • Dodge • RAM Maracaibo',
  },
  description:
    'Concesionario oficial Jeep, Dodge y RAM en Maracaibo, Estado Zulia. Estamos ubicados en la Calle 72, local comercial 12-38, sector Tierra Negra. Conoce Jeep Renegade, Compass, Grand Cherokee, Dodge, RAM 700 y RAM 1500 Lone Star.',
  keywords: [
    'Concesionario Jeep Maracaibo',
    'Dodge Maracaibo',
    'RAM Maracaibo',
    'Rústicos La Mundial',
    'Jeep Renegade 2027 Venezuela',
    'Jeep Compass Longitude 2027',
    'RAM 700 Bighorn Maracaibo',
    'RAM 1500 Lone Star Zulia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: siteUrl,
    siteName: 'Rústicos La Mundial Maracaibo — Jeep | Dodge | RAM',
    title: 'Aventura y Fuerza en un Solo Lugar: Jeep | Dodge | RAM en Maracaibo',
    description:
      'Capacidad 4x4, potencia y prestigio. Visítanos en Calle 72, local comercial 12-38, sector Tierra Negra, Maracaibo, Estado Zulia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rústicos La Mundial — Concesionario Oficial Jeep | Dodge | RAM Maracaibo',
    description:
      'Explora los modelos disponibles Jeep Renegade, Compass, Grand Cherokee, Dodge, RAM 700 y RAM 1500 Lone Star en Maracaibo, Estado Zulia.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdAutoDealer = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'Rústicos La Mundial — Concesionario Oficial Jeep | Dodge | RAM Maracaibo',
  legalName: 'Rústicos La Mundial, C.A.',
  taxID: 'J-50777406-4',
  image: `${siteUrl}/images/showroom/fachada-atardecer.jpg`,
  url: siteUrl,
  telephone: '+58-412-5554440',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 72, local comercial 12-38, sector Tierra Negra',
    addressLocality: 'Maracaibo',
    addressRegion: 'Zulia',
    addressCountry: 'VE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.6695,
    longitude: -71.6136,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  brand: ['Jeep', 'Dodge', 'RAM'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAutoDealer) }}
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
