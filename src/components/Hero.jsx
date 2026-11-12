'use client';

import Image from 'next/image';
import BrandLogo from './BrandLogo';
import { withBasePath } from '../lib/basePath';

export default function Hero({ vehicles = [], onInspectVehicle }) {
  const jeepHero =
    vehicles.find((v) => v.id === 'jeep-renegade-sahara-2027') ||
    vehicles.find((v) => v.brand === 'Jeep') ||
    vehicles[0];

  const ramHero =
    vehicles.find((v) => v.id === 'ram-1500-lonestar-2026') ||
    vehicles.find((v) => v.brand === 'RAM') ||
    vehicles[1] ||
    vehicles[0];

  const jeepPhoto =
    jeepHero?.heroImage || withBasePath('/images/vehicles/Sahara2027/SaharaOut1.webp');
  const ramPhoto =
    ramHero?.heroImage || withBasePath('/images/vehicles/RAM1500/Ram1500Out2.webp');

  const handleInspect = (vehicle) => {
    if (onInspectVehicle && vehicle) {
      onInspectVehicle(vehicle);
    }
  };

  return (
    <section id="inicio" className="hero-dual-cover">
      {/* Fondo Dividido con las Dos Fotografías en Atmósfera Oscura */}
      <div className="hero-dual-backdrop" aria-hidden="true">
        <div className="hero-backdrop-half hero-backdrop-left">
          <Image
            src={jeepPhoto}
            alt="Jeep Todo Terreno en Maracaibo"
            fill
            priority
            sizes="50vw"
            className="hero-backdrop-img"
          />
        </div>
        <div className="hero-backdrop-half hero-backdrop-right">
          <Image
            src={ramPhoto}
            alt="RAM Pick-up en Maracaibo"
            fill
            priority
            sizes="50vw"
            className="hero-backdrop-img"
          />
        </div>
        <div className="hero-dual-overlay" />
      </div>

      <div className="container hero-dual-container">
        {/* Columna Izquierda: Tipografía Monumental + Doble CTA (Inspiración Imagen 1 y 2) */}
        <div className="hero-dual-copy">
          <p className="hero-cinematic-kicker">
            CONCESIONARIO AUTORIZADO — MARACAIBO, VENEZUELA
          </p>

          <h1 className="hero-dual-title">
            <span>AVENTURA 4X4 Y</span>
            <span>FUERZA SIN LÍMITES</span>
            <span className="hero-title-accent">EN UN SOLO LUGAR</span>
          </h1>

          <p className="hero-dual-subtitle">
            Descubre el respaldo oficial de <strong>Jeep</strong>, <strong>RAM</strong> y{' '}
            <strong>Dodge</strong> en Rústicos La Mundial. Unidades 0 km de entrega
            inmediata, financiamiento a medida y servicio certificado Mopar® en Calle 72,
            Tierra Negra.
          </p>

          <div className="hero-dual-actions">
            <a href="#test-drive" className="btn-hero-outline">
              AGENDA TU CITA
            </a>
            <a href="#catalogo" className="btn-hero-red">
              VER VEHÍCULOS
            </a>
          </div>
        </div>

        {/* Columna Derecha: Composición Destacada con las Dos Fotos Interactivas (Jeep & RAM) */}
        <div className="hero-two-photos-stage">
          {/* Foto 1: Jeep */}
          <article
            className="hero-photo-card hero-photo-jeep"
            onClick={() => handleInspect(jeepHero)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInspect(jeepHero);
              }
            }}
            aria-label="Explorar Jeep Renegade Sahara 2027"
          >
            <Image
              src={jeepPhoto}
              alt="Jeep Renegade Sahara 2027 en acción todoterreno"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 32vw"
              className="hero-photo-card-img"
            />
            <div className="hero-photo-card-gradient" />
            <div className="hero-photo-card-meta">
              <div className="hero-photo-brand-row">
                <BrandLogo brand="Jeep" variant="light" size="sm" />
                <span className="hero-photo-badge">AVENTURA 4X4</span>
              </div>
              <strong className="hero-photo-model">
                {jeepHero ? `${jeepHero.model} (${jeepHero.year})` : 'RENEGADE SAHARA 2027'}
              </strong>
              <span className="hero-photo-cta">Ver ficha técnica →</span>
            </div>
          </article>

          {/* Foto 2: RAM */}
          <article
            className="hero-photo-card hero-photo-ram"
            onClick={() => handleInspect(ramHero)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInspect(ramHero);
              }
            }}
            aria-label="Explorar RAM 1500 Lone Star 2026"
          >
            <Image
              src={ramPhoto}
              alt="Camioneta RAM 1500 Lone Star Hurricane 4x4"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 32vw"
              className="hero-photo-card-img"
            />
            <div className="hero-photo-card-gradient" />
            <div className="hero-photo-card-meta">
              <div className="hero-photo-brand-row">
                <BrandLogo brand="RAM" variant="light" size="sm" />
                <span className="hero-photo-badge hero-photo-badge-red">
                  HURRICANE 420 HP
                </span>
              </div>
              <strong className="hero-photo-model">
                {ramHero ? `${ramHero.model} (${ramHero.year})` : '1500 LONE STAR 2026'}
              </strong>
              <span className="hero-photo-cta">Ver ficha técnica →</span>
            </div>
          </article>
        </div>
      </div>

      {/* Indicador Inferior DESPLAZA */}
      <a
        href="#buscador"
        className="hero-scroll-indicator"
        aria-label="Desplazar hacia el buscador y catálogo"
      >
        <span className="hero-scroll-text">DESPLAZA</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
