'use client';

import Image from 'next/image';

export default function Hero({ vehicles, onInspectVehicle }) {
  const leftHero =
    vehicles.find((v) => v.id === 'jeep-renegade-sahara-2027') || vehicles[0];
  const centerHero =
    vehicles.find((v) => v.id === 'jeep-grand-cherokee-limited-2026') ||
    vehicles[1] ||
    vehicles[0];
  const rightHero =
    vehicles.find((v) => v.id === 'ram-700-slt-2026') ||
    vehicles.find((v) => v.brand === 'RAM') ||
    vehicles[2] ||
    vehicles[0];

  const handleKeyActivate = (e, vehicle) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onInspectVehicle(vehicle);
    }
  };

  return (
    <section id="inicio" className="hero-panoramic">
      <div className="hero-sky-overlay" />

      <div className="container hero-center-content">
        <p className="hero-kicker">AVENTURA Y FUERZA EN UN SOLO LUGAR.</p>

        <h1 className="hero-trinity-title">
          <span className="trinity-jeep">JEEP</span>
          <span className="trinity-slash">/</span>
          <span className="trinity-dodge">DODGE</span>
          <span className="trinity-slash">/</span>
          <span className="trinity-ram">RAM</span>
        </h1>

        <p className="hero-subkicker">
          CAPACIDAD 4X4 <span>/</span> POTENCIA <span>/</span> PRESTIGIO
        </p>

        <p className="hero-lead">
          En Rústicos La Mundial unimos la libertad todoterreno de Jeep, el carácter de
          Dodge y la fuerza imparable de RAM para brindarte respaldo oficial en Maracaibo.
        </p>

        <div className="hero-cta-wrap">
          <a href="#catalogo" className="btn-dark-pill">
            <span>CONOCE NUESTRO INVENTARIO</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#test-drive" className="btn-light-pill">
            <span>CONSULTAR CON UN ASESOR</span>
          </a>
        </div>
      </div>

      {/* Tri-Vehicle Stage over Mountain/City Panorama */}
      <div className="container hero-trio-stage">
        <div
          className="trio-vehicle-card trio-left"
          onClick={() => onInspectVehicle(leftHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, leftHero)}
          aria-label={`Ver detalles de ${leftHero.brand} ${leftHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <Image
              src={leftHero.heroImage || leftHero.images[0]}
              alt={`${leftHero.brand} ${leftHero.model} en exhibición en Maracaibo`}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-jeep">
              {leftHero.brand.toUpperCase()} {leftHero.model}
            </span>
          </div>
        </div>

        <div
          className="trio-vehicle-card trio-center"
          onClick={() => onInspectVehicle(centerHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, centerHero)}
          aria-label={`Ver detalles de ${centerHero.brand} ${centerHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <Image
              src={centerHero.heroImage || centerHero.images[0]}
              alt={`${centerHero.brand} ${centerHero.model} disponible en Maracaibo`}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 36vw"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-jeep">
              {centerHero.brand.toUpperCase()} {centerHero.model}
            </span>
          </div>
        </div>

        <div
          className="trio-vehicle-card trio-right"
          onClick={() => onInspectVehicle(rightHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, rightHero)}
          aria-label={`Ver detalles de ${rightHero.brand} ${rightHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <Image
              src={rightHero.heroImage || rightHero.images[0]}
              alt={`Camioneta Pick-up ${rightHero.brand} ${rightHero.model} en Maracaibo`}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-ram">
              {rightHero.brand.toUpperCase()} {rightHero.model}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-asphalt-floor" />
    </section>
  );
}
