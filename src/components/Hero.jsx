'use client';

export default function Hero({ vehicles, onInspectVehicle }) {
  const jeepHero = vehicles.find((v) => v.brand === 'Jeep') || vehicles[0];
  const dodgeHero = vehicles.find((v) => v.brand === 'Dodge') || vehicles[1];
  const ramHero = vehicles.find((v) => v.brand === 'RAM') || vehicles[2];

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
        <p className="hero-kicker">TRES LEYENDAS. UN SOLO DESTINO.</p>

        <h1 className="hero-trinity-title">
          <span className="trinity-jeep">JEEP</span>
          <span className="trinity-slash">/</span>
          <span className="trinity-dodge">DODGE</span>
          <span className="trinity-slash">/</span>
          <span className="trinity-ram">RAM</span>
        </h1>

        <p className="hero-subkicker">
          PODER <span>/</span> ESTILO <span>/</span> CAPACIDAD
        </p>

        <p className="hero-lead">
          En nuestro concesionario, las tres marcas más icónicas del mundo se unen para
          ofrecerte la mejor experiencia en Venezuela.
        </p>

        <div className="hero-cta-wrap">
          <a href="#catalogo" className="btn-dark-pill">
            <span>CONOCE NUESTRO INVENTARIO</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#test-drive" className="btn-light-pill">
            <span>AGENDAR TEST DRIVE</span>
          </a>
        </div>
      </div>

      {/* Tri-Vehicle Stage over Mountain/City Panorama */}
      <div className="container hero-trio-stage">
        <div
          className="trio-vehicle-card trio-left"
          onClick={() => onInspectVehicle(jeepHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, jeepHero)}
          aria-label={`Ver detalles de ${jeepHero.brand} ${jeepHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <img
              src={jeepHero.images[0]}
              alt="Jeep Wrangler Rubicon 4x4 color verde militar en exhibición"
              width="420"
              height="235"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-jeep">JEEP WRANGLER RUBICON</span>
          </div>
        </div>

        <div
          className="trio-vehicle-card trio-center"
          onClick={() => onInspectVehicle(dodgeHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, dodgeHero)}
          aria-label={`Ver detalles de ${dodgeHero.brand} ${dodgeHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <img
              src={dodgeHero.images[0]}
              alt="Dodge Charger SRT color rojo de alto desempeño frontal"
              width="450"
              height="235"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-dodge">DODGE CHARGER SRT</span>
          </div>
        </div>

        <div
          className="trio-vehicle-card trio-right"
          onClick={() => onInspectVehicle(ramHero)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyActivate(e, ramHero)}
          aria-label={`Ver detalles de ${ramHero.brand} ${ramHero.model}`}
        >
          <div className="trio-vehicle-frame">
            <img
              src={ramHero.images[0]}
              alt="Camioneta Pick-up RAM 1500 Night Edition color negro"
              width="420"
              height="235"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="trio-caption">
            <span className="trio-tag trio-tag-ram">RAM 1500 NIGHT EDITION</span>
          </div>
        </div>
      </div>

      <div className="hero-asphalt-floor" />
    </section>
  );
}
