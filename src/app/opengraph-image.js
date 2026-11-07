import { ImageResponse } from 'next/og';

export const alt = 'Rústicos La Mundial — Concesionario Oficial Jeep | Dodge | RAM en Maracaibo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050506 0%, #1e2124 55%, #1e2514 100%)',
          color: '#f3f4f6',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.28em',
            color: '#d4af37',
            marginBottom: 20,
            fontWeight: 700,
          }}
        >
          AVENTURA Y FUERZA EN UN SOLO LUGAR.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            fontSize: 86,
            fontWeight: 900,
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#6b8e23' }}>JEEP</span>
          <span style={{ color: '#8a929a' }}>/</span>
          <span style={{ color: '#dc2626' }}>DODGE</span>
          <span style={{ color: '#8a929a' }}>/</span>
          <span style={{ color: '#f3f4f6' }}>RAM</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#d1d5db',
            maxWidth: 860,
          }}
        >
          Rústicos La Mundial, C.A. — Calle 72, Sector Tierra Negra, Maracaibo
        </div>
      </div>
    ),
    { ...size }
  );
}
