'use client';

import { useState, useMemo, useEffect } from 'react';
import { BRANDS, CATEGORIES } from '@/data/vehicles';
import VehicleCard from './VehicleCard';

export default function CatalogSection({
  vehicles,
  externalBrandFilter,
  onSelectDetail,
  onSelectFinance,
}) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedCondition, setSelectedCondition] = useState('Todas');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    const nextBrand =
      typeof externalBrandFilter === 'object'
        ? externalBrandFilter?.brand
        : externalBrandFilter;
    if (nextBrand) {
      setSelectedBrand(nextBrand);
      setShowAll(true);
      setPageOffset(0);
    }
  }, [externalBrandFilter]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesQuery =
        `${v.brand} ${v.model} ${v.trim || ''} ${v.drivetrain} ${v.engine}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());

      const matchesBrand = selectedBrand === 'Todas' || v.brand === selectedBrand;
      const matchesCategory =
        selectedCategory === 'Todas' || v.category === selectedCategory;
      const matchesCondition =
        selectedCondition === 'Todas' || v.condition === selectedCondition;
      const matchesPrice = v.price <= maxPrice;

      return (
        matchesQuery &&
        matchesBrand &&
        matchesCategory &&
        matchesCondition &&
        matchesPrice
      );
    });
  }, [
    vehicles,
    searchQuery,
    selectedBrand,
    selectedCategory,
    selectedCondition,
    maxPrice,
  ]);

  const visibleVehicles = useMemo(() => {
    if (showAll) return filteredVehicles;
    const start = pageOffset % Math.max(filteredVehicles.length, 1);
    const slice = filteredVehicles.slice(start, start + 4);
    if (slice.length < 4 && filteredVehicles.length > 4) {
      return [...slice, ...filteredVehicles.slice(0, 4 - slice.length)];
    }
    return slice;
  }, [filteredVehicles, showAll, pageOffset]);

  const handlePrev = () => {
    setPageOffset((prev) =>
      prev - 1 < 0 ? Math.max(filteredVehicles.length - 1, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setPageOffset((prev) => (prev + 1) % Math.max(filteredVehicles.length, 1));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('Todas');
    setSelectedCategory('Todas');
    setSelectedCondition('Todas');
    setMaxPrice(100000);
    setPageOffset(0);
  };

  return (
    <section id="catalogo" className="featured-catalog-section">
      <div className="container">
        <div className="featured-header">
          <h2 className="featured-title">VEHÍCULOS DESTACADOS</h2>

          <button
            type="button"
            className="view-all-link"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span>
              {showAll
                ? 'Ver vista compacta (4 destacados)'
                : 'Ver todos los vehículos y filtros'}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Barra de Filtros Interactiva */}
        <div className="catalog-filter-strip">
          <div className="brand-filter-tabs" role="group" aria-label="Filtrar por marca">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                type="button"
                className={`brand-tab-btn ${selectedBrand === brand ? 'active' : ''}`}
                data-brand-tab={brand}
                onClick={() => {
                  setSelectedBrand(brand);
                  setPageOffset(0);
                }}
              >
                {brand === 'Todas' ? 'Todas las Marcas' : brand.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="catalog-quick-controls">
            <input
              type="search"
              className="catalog-search-input"
              placeholder="Buscar Wrangler, Charger, 1500, Hellcat..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(true);
              }}
              aria-label="Buscar vehículo por nombre o motor"
            />

            <select
              className="catalog-select-input"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setShowAll(true);
              }}
              aria-label="Filtrar por categoría"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todas' ? 'Todas las Categorías' : cat}
                </option>
              ))}
            </select>

            <select
              className="catalog-select-input"
              value={selectedCondition}
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                setShowAll(true);
              }}
              aria-label="Filtrar por condición del vehículo"
            >
              <option value="Todas">Todas las Condiciones</option>
              <option value="Nuevo">Nuevos (0 km)</option>
              <option value="Seminuevo Certificado">Seminuevos Certificados</option>
            </select>

            <div className="catalog-price-range">
              <label htmlFor="max-price-slider">
                Máx: <strong>${maxPrice.toLocaleString('en-US')}</strong>
              </label>
              <input
                id="max-price-slider"
                type="range"
                min="50000"
                max="100000"
                step="2500"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setShowAll(true);
                }}
              />
            </div>
          </div>
        </div>

        {/* Carrusel / Grid de Tarjetas Estudio */}
        {visibleVehicles.length > 0 ? (
          <div className="carousel-stage">
            {!showAll && filteredVehicles.length > 4 && (
              <button
                type="button"
                className="carousel-arrow carousel-arrow-left"
                onClick={handlePrev}
                aria-label="Vehículo anterior"
              >
                ‹
              </button>
            )}

            <div className="studio-cards-grid">
              {visibleVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelectDetail={onSelectDetail}
                  onSelectFinance={onSelectFinance}
                />
              ))}
            </div>

            {!showAll && filteredVehicles.length > 4 && (
              <button
                type="button"
                className="carousel-arrow carousel-arrow-right"
                onClick={handleNext}
                aria-label="Siguiente vehículo"
              >
                ›
              </button>
            )}
          </div>
        ) : (
          <div className="empty-catalog-box">
            <p>No se encontraron modelos con los criterios seleccionados.</p>
            <button
              type="button"
              className="btn-dark-pill"
              onClick={handleResetFilters}
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
