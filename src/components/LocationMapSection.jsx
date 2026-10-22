'use client';

import { useState } from 'react';

const MARACAIBO_COORDS = {
  lat: 10.6666,
  lng: -71.6124,
  address: 'Av. 2 (El Milagro), Sector Norte, Showroom Oficial Jeep | Dodge | RAM, Maracaibo, Edo. Zulia',
};

export default function LocationMapSection() {
  const [mapMode, setMapMode] = useState('m'); // 'm' = mapa estándar, 'k' = satélite

  const embedUrl = `https://maps.google.com/maps?q=${MARACAIBO_COORDS.lat},${MARACAIBO_COORDS.lng}&t=${mapMode}&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${MARACAIBO_COORDS.lat},${MARACAIBO_COORDS.lng}`;
  const wazeExternalUrl = `https://waze.com/ul?ll=${MARACAIBO_COORDS.lat},${MARACAIBO_COORDS.lng}&navigate=yes`;

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
              Visítanos en nuestro Showroom y Centro de Servicio Mopar® en Maracaibo. Explora el
              mapa interactivo o inicia tu ruta directa con GPS.
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
              title="Mapa interactivo de la Sede Oficial Rústicos Motors en Maracaibo, Estado Zulia"
              src={embedUrl}
              width="100%"
              height="440"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <aside className="location-details-card">
            <div>
              <span className="card-brand" style={{ color: 'var(--jeep-gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Sede Exclusiva Maracaibo
              </span>
              <h3 style={{ fontSize: '1.45rem', marginTop: '0.35rem' }}>
                Showroom Jeep | Dodge | RAM
              </h3>
              <p style={{ color: 'var(--ram-chrome)', fontSize: '0.92rem', marginTop: '0.45rem' }}>
                Contamos con exhibición climatizada, pista de prueba 4x4, taller certificado Mopar®
                y estacionamiento privado con vigilancia para nuestros clientes.
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
                  <strong>Horario Corrido</strong>
                  <p style={{ color: 'var(--ram-chrome)', fontSize: '0.88rem' }}>
                    Lunes a Viernes: 8:30 AM – 6:00 PM
                    <br />
                    Sábados: 9:00 AM – 4:00 PM
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-badge">🛡️</div>
                <div>
                  <strong>Servicios en Sede</strong>
                  <p style={{ color: 'var(--ram-chrome)', fontSize: '0.88rem' }}>
                    Ventas de vehículos nuevos y seminuevos certificados, repuestos Mopar® y
                    servicio postventa especializado en el Zulia.
                  </p>
                </div>
              </div>
            </div>

            <div className="location-gps-actions">
              <a
                href={googleMapsExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Abrir Ruta en Google Maps →
              </a>
              <a
                href={wazeExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Navegar con Waze
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
