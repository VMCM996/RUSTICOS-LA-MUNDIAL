'use client';

import { useState } from 'react';
import Image from 'next/image';

const MARACAIBO_COORDS = {
  lat: 10.6695,
  lng: -71.6136,
  query: 'Calle 72, local comercial 12-38, sector Tierra Negra, Maracaibo, estado Zulia',
  address: 'Estamos ubicados en la Calle 72, local comercial 12-38, sector Tierra Negra, Maracaibo, estado Zulia.',
};

export default function LocationMapSection() {
  const [mapMode, setMapMode] = useState('m'); // 'm' = mapa estándar, 'k' = satélite

  const encodedQuery = encodeURIComponent(MARACAIBO_COORDS.query);
  const embedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=${mapMode}&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="ubicacion" className="section location-map-section">
      <div className="container">
        <div className="location-header-row">
          <div>
            <span className="section-eyebrow">Única Sede Oficial en el Zulia</span>
            <h2 className="section-title" style={{ marginTop: '0.4rem' }}>
              UBICACIÓN Y MAPA INTERACTIVO — MARACAIBO
            </h2>
            <p className="section-subtitle" style={{ marginTop: '0.35rem' }}>
              Visítanos en nuestro Showroom y Centro de Servicio Mopar® en Calle 72, Sector
              Tierra Negra, Maracaibo. Explora el mapa interactivo o inicia tu ruta con GPS.
            </p>
          </div>

          <div className="map-mode-switcher" role="group" aria-label="Modo de visualización del mapa">
            <button
              type="button"
              className={`pill-btn ${mapMode === 'm' ? 'active' : ''}`}
              onClick={() => setMapMode('m')}
            >
              🗺️ Mapa de Calles
            </button>
            <button
              type="button"
              className={`pill-btn ${mapMode === 'k' ? 'active' : ''}`}
              onClick={() => setMapMode('k')}
            >
              🛰️ Vista Satelital
            </button>
          </div>
        </div>

        <div className="location-stage-grid">
          <div className="map-frame-card">
            <iframe
              title="Mapa interactivo de la Sede Oficial Rústicos La Mundial en Calle 72, Tierra Negra, Maracaibo"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', width: '100%', height: '100%', minHeight: '440px', flex: 1 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <aside className="location-details-card">
            <div
              style={{
                position: 'relative',
                height: '165px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '0.9rem',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <Image
                src="/images/showroom/fachada-atardecer.jpg"
                alt="Fachada Oficial Rústicos La Mundial, C.A. en Maracaibo"
                fill
                sizes="(max-width: 1080px) 100vw, 480px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="card-brand" style={{ color: 'var(--jeep-gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Rústicos La Mundial, C.A. • RIF J-50777406-4
              </span>
              <h3 style={{ fontSize: '1.45rem', marginTop: '0.35rem' }}>
                Showroom Jeep | Dodge | RAM
              </h3>
              <p style={{ color: 'var(--ram-chrome)', fontSize: '0.92rem', marginTop: '0.45rem' }}>
                Contamos con exhibición climatizada, unidades de Test Drive, taller certificado Mopar®
                y estacionamiento privado con vigilancia para nuestros clientes en Maracaibo.
              </p>
            </div>

            <div className="location-detail-list">
              <div className="info-item">
                <div className="info-badge">📍</div>
                <div>
                  <strong>Dirección en Maracaibo</strong>
                  <p style={{ color: 'var(--ram-chrome)', fontSize: '0.88rem' }}>
                    {MARACAIBO_COORDS.address}
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-badge">🕒</div>
                <div>
                  <strong>Horario de Atención</strong>
                  <p style={{ color: 'var(--ram-chrome)', fontSize: '0.88rem' }}>
                    Lunes a Viernes: 8:00 AM – 5:00 PM
                    <br />
                    Sábados: 8:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
