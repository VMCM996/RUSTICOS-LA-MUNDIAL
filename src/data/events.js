export const EVENT_CATEGORIES = [
  'Todos',
  'Lanzamientos',
  'Rutas 4x4',
  'Exhibición VIP',
  'Videos',
];

export const EVENTS = [
  {
    id: 'recepcion-flota-2026-maracaibo',
    title: 'Arribo de Nuevas Unidades 2026 a Rústicos La Mundial — Sede Maracaibo',
    category: 'Lanzamientos',
    date: 'Octubre, 2026',
    location: 'Showroom Oficial Rústicos La Mundial — Maracaibo, Edo. Zulia',
    featured: true,
    hasVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-off-road-car-driving-in-the-desert-41566-large.mp4',
    videoDuration: '01:45',
    coverImage: '/images/showroom/fachada-atardecer.jpg',
    summary:
      'Descarga oficial de nuestro nuevo lote de vehículos 0 km Jeep Renegade, Jeep Compass, Grand Cherokee y gama RAM directamente en nuestra sede de Maracaibo para entrega inmediata.',
    highlights: [
      'Recepción en niñera de unidades 0 km con garantía oficial de fábrica en Venezuela',
      'Inspección pre-entrega certificada por nuestro equipo técnico en Maracaibo',
      'Disponibilidad inmediata de colores y versiones en piso de ventas',
    ],
    gallery: [
      '/images/showroom/fachada-atardecer.jpg',
      '/images/showroom/recepcion-unidades.jpg',
      '/images/showroom/sede-la-mundial.jpg',
    ],
  },
  {
    id: 'jornada-test-drive-jeep-maracaibo',
    title: 'Jornada Exclusiva de Test Drive Jeep Renegade & Compass en Maracaibo',
    category: 'Rutas 4x4',
    date: 'Septiembre, 2026',
    location: 'Sede Rústicos La Mundial, C.A. — Maracaibo',
    featured: true,
    hasVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-city-at-night-41569-large.mp4',
    videoDuration: '02:10',
    coverImage: '/images/showroom/fachada-test-drive.jpg',
    summary:
      'Nuestros clientes vivieron la experiencia de manejo real al volante de las unidades DEMO Test Drive de Jeep Renegade Turbo T270 y Compass en circuito urbano y prueba dinámica.',
    highlights: [
      'Unidades DEMO rotuladas y habilitadas para pruebas de manejo personalizadas',
      'Demostración del motor 1.3L Turbo T270, techo panorámico y conectividad Uconnect',
      'Atención personalizada y planes de financiamiento directo en el Estado Zulia',
    ],
    gallery: [
      '/images/showroom/fachada-test-drive.jpg',
      '/images/showroom/test-drive-lateral.jpg',
      '/images/vehicles/Sahara2027/SaharaOut1.webp',
    ],
  },
  {
    id: 'exhibicion-ram-heavy-duty-hurricane-zulia',
    title: 'Exhibición Corporativa RAM 1500 Lone Star Hurricane & RAM 3500 Heavy Duty',
    category: 'Exhibición VIP',
    date: 'Septiembre, 2026',
    location: 'Showroom Oficial Maracaibo — Sector Norte',
    featured: false,
    hasVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-red-sports-car-driving-on-a-highway-41563-large.mp4',
    videoDuration: '01:20',
    coverImage: '/images/vehicles/RAM1500/Ram1500Out2.webp',
    summary:
      'Presentación en piso de exhibición para el sector agroindustrial, petrolero y empresarial zuliano de la nueva RAM 1500 con motor Hurricane Twin-Turbo y la imponente RAM 3500 Heavy Duty 4x4.',
    highlights: [
      'Exhibición del nuevo motor 3.0L Hurricane Twin-Turbo de la RAM 1500 Lone Star',
      'Presentación de la RAM 3500 Heavy Duty Chasis Cabina 4x4 para trabajo pesado',
      'Asesoría de flotas corporativas y repuestos originales Mopar',
    ],
    gallery: [
      '/images/vehicles/RAM1500/Ram1500Out2.webp',
      '/images/vehicles/RAM1500/Ram1500Out1.webp',
      '/images/vehicles/RAM1500/Ram1500Inside1.webp',
    ],
  },
];
