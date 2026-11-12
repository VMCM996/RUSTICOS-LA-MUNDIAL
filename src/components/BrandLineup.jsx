'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import BrandLogo from './BrandLogo';
import { VEHICLES, CATEGORIES } from '@/data/vehicles';
import { withBasePath } from '../lib/basePath';

const QUICK_BRANDS = ['Todas', 'Jeep', 'RAM'];

const LINEUP_BRANDS = [
  {
    brand: 'Jeep',
    tagline: 'LIBERTAD EN CADA CAMINO',
    altText: 'Jeep Renegade, Compass y Grand Cherokee en Maracaibo',
    image: withBasePath('/images/vehicles/Sahara2027/SaharaOut1.webp'),
  },
  {
    brand: 'RAM',
    tagline: 'TRABAJO DURO. SIN LÍMITES.',
    altText: 'Camioneta Pick-up RAM 1500 Lone Star y RAM 700 en Maracaibo',
    image: withBasePath('/images/vehicles/RAM1500/Ram1500Out2.webp'),
  },
];

export default function BrandLineup({ onSelectBrand }) {
  const [quickBrand, setQuickBrand] = useState('Todas');
  const [quickCategory, setQuickCategory] = useState('Todas');
  const [quickModel, setQuickModel] = useState('Todos');
  const [quickYear, setQuickYear] = useState('Todos');
  const [quickPlan, setQuickPlan] = useState('Todos');

  const availableModels = useMemo(() => {
    const filtered = VEHICLES.filter((v) => {
      const matchBrand = quickBrand === 'Todas' || v.brand === quickBrand;
      const matchCat = quickCategory === 'Todas' || v.category === quickCategory;
      return matchBrand && matchCat;
    });
    return Array.from(new Set(filtered.map((v) => v.model)));
  }, [quickBrand, quickCategory]);

  const handleQuickBrandTab = (brand) => {
    setQuickBrand(brand);
    setQuickModel('Todos');
  };

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (onSelectBrand) {
      onSelectBrand({
        brand: quickBrand,
        category: quickCategory,
        model: quickModel === 'Todos' ? '' : quickModel,
        year: quickYear === 'Todos' ? '' : quickYear,
      });
    }
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChooseBrandPoster = (brand) => {
    if (onSelectBrand) {
      onSelectBrand({
        brand,
        category: 'Todas',
        model: '',
        year: '',
      });
    }
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Barra de Búsqueda Rápida Oscura (Solo Jeep y RAM en selector de vehículos) */}
      <section id="buscador" className="quick-finder-bar" aria-label="Buscador rápido de inventario">
        <div className="container">
          <div className="quick-finder-tabs" role="tablist" aria-label="Filtrar búsqueda por marca">
            {QUICK_BRANDS.map((brand) => (
              <button
                key={brand}
                type="button"
                role="tab"
                aria-selected={quickBrand === brand}
                className={`quick-finder-tab ${quickBrand === brand ? 'active' : ''}`}
                onClick={() => handleQuickBrandTab(brand)}
              >
                {brand === 'Todas' ? 'Todos' : brand}
              </button>
            ))}
          </div>

          <form className="quick-finder-box" onSubmit={handleQuickSearchSubmit}>
            <div className="quick-finder-field">
              <label htmlFor="qf-category">Tipo de vehículo</label>
              <select
                id="qf-category"
                value={quickCategory}
                onChange={(e) => {
                  setQuickCategory(e.target.value);
                  setQuickModel('Todos');
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'Todas' ? 'Todos' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="quick-finder-field">
              <label htmlFor="qf-model">Modelo</label>
              <select
                id="qf-model"
                value={quickModel}
                onChange={(e) => setQuickModel(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {availableModels.map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
            </div>

            <div className="quick-finder-field">
              <label htmlFor="qf-year">Año</label>
              <select
                id="qf-year"
                value={quickYear}
                onChange={(e) => setQuickYear(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="2027">2027</option>
                <option value="2026">2026</option>
              </select>
            </div>

            <div className="quick-finder-field">
              <label htmlFor="qf-plan">Disponibilidad</label>
              <select
                id="qf-plan"
                value={quickPlan}
                onChange={(e) => setQuickPlan(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Entrega Inmediata">Entrega Inmediata</option>
                <option value="Financiamiento Disponible">Financiamiento Disponible</option>
                <option value="Flotas Corporativas">Flotas Corporativas</option>
              </select>
            </div>

            <button type="submit" className="btn-quick-finder-submit">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>BUSCAR</span>
            </button>
          </form>
        </div>
      </section>

      {/* Pósters Fotográficos de Marca para Escoger Vehículos (Jeep | RAM) */}
      <section id="lineas" className="lineup-posters-section">
        <div className="container">
          <div className="lineup-posters-grid lineup-posters-grid-2">
            {LINEUP_BRANDS.map((item) => (
              <article
                key={item.brand}
                className="brand-poster-card"
                onClick={() => handleChooseBrandPoster(item.brand)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChooseBrandPoster(item.brand);
                  }
                }}
                aria-label={`Ver modelos ${item.brand}`}
              >
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className="brand-poster-img"
                />
                <div className="brand-poster-overlay" />

                <div className="brand-poster-content">
                  <div className="brand-poster-logo">
                    <BrandLogo brand={item.brand} variant="light" size="lg" />
                  </div>
                  <p className="brand-poster-tagline">{item.tagline}</p>
                  <span className="btn-poster-outline">
                    <span>VER MODELOS {item.brand.toUpperCase()}</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
