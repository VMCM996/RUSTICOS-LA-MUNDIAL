'use client';

import BrandLogo from './BrandLogo';

export default function VehicleCard({ vehicle, onSelectDetail, onSelectFinance }) {
  const handleKeyActivate = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectDetail(vehicle);
    }
  };

  return (
    <article
      id={`vehiculo-${vehicle.id}`}
      className="studio-card"
      data-brand={vehicle.brand}
    >
      <div className="studio-card-top">
        <div>
          <div className="studio-brand-wrap">
            <BrandLogo brand={vehicle.brand} size="sm" />
          </div>
          <h3 className="studio-model">{vehicle.model}</h3>
          <span className="studio-year">{vehicle.year}</span>
        </div>

        <span className="studio-price-pill">Consultar</span>
      </div>

      <div
        className="studio-image-box"
        onClick={() => onSelectDetail(vehicle)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyActivate}
        aria-label={`Ver ficha técnica de ${vehicle.brand} ${vehicle.model}`}
      >
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          width="320"
          height="145"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="studio-specs-mini">
        <span>{vehicle.drivetrain}</span>
        <span>•</span>
        <span>{vehicle.specs.potencia}</span>
      </div>

      <div className="studio-card-footer">
        <button
          type="button"
          className="studio-detail-link"
          onClick={() => onSelectDetail(vehicle)}
        >
          <span>Ver detalles</span>
          <span aria-hidden="true">→</span>
        </button>

        <button
          type="button"
          className="studio-quote-btn"
          onClick={() => onSelectFinance(vehicle)}
          title="Consultar disponibilidad y financiamiento para este modelo"
        >
          Consultar
        </button>
      </div>
    </article>
  );
}
