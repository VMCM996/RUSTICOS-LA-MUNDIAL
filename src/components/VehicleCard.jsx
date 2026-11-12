'use client';

import { useState } from 'react';
import Image from 'next/image';

function formatBrandModel(brand, model) {
  if (!model) return brand;
  const formattedModel = model
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bSl\b/i, 'SLT')
    .replace(/\bSlt\b/i, 'SLT');
  return `${brand} ${formattedModel}`;
}

export default function VehicleCard({ vehicle, onSelectDetail, onSelectFinance }) {
  const [liked, setLiked] = useState(false);

  const handleKeyActivate = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectDetail(vehicle);
    }
  };

  const coverSrc = vehicle.heroImage || vehicle.images?.[0];

  return (
    <article
      id={`vehiculo-${vehicle.id}`}
      className="editorial-vehicle-card"
      data-brand={vehicle.brand}
    >
      {/* Top Full-Bleed Action Photo + Favorite/Save Icon */}
      <div
        className="editorial-card-media"
        onClick={() => onSelectDetail(vehicle)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyActivate}
        aria-label={`Ver ficha técnica de ${vehicle.brand} ${vehicle.model}`}
      >
        <Image
          src={coverSrc}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 25vw"
          className="editorial-card-img"
        />

        <button
          type="button"
          className={`editorial-fav-btn ${liked ? 'is-liked' : ''}`}
          aria-label={`Destacar ${vehicle.brand} ${vehicle.model}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Bottom Clean Editorial Body (Reference Image 2) */}
      <div className="editorial-card-body">
        <div
          className="editorial-card-main-info"
          onClick={() => onSelectDetail(vehicle)}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyActivate}
        >
          <div>
            <h3 className="editorial-card-title">
              {formatBrandModel(vehicle.brand, vehicle.model)}
            </h3>
            <span className="editorial-card-year">{vehicle.year}</span>
          </div>

          <span className="editorial-card-chevron" aria-hidden="true">
            ›
          </span>
        </div>

        <div className="editorial-card-bottom">
          <button
            type="button"
            className="editorial-card-price-btn"
            onClick={() => onSelectDetail(vehicle)}
          >
            Consultar
          </button>

          <button
            type="button"
            className="editorial-card-quote-link"
            onClick={() => onSelectFinance(vehicle)}
            title="Configurar plan de financiamiento"
          >
            Financiar →
          </button>
        </div>
      </div>
    </article>
  );
}
