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
  const [selectedYear, setSelectedYear] = useState('');
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    if (!externalBrandFilter) return;

    if (typeof externalBrandFilter === 'object') {
      if (externalBrandFilter.brand) {
        setSelectedBrand(externalBrandFilter.brand);
      }
      if (externalBrandFilter.category) {
        setSelectedCategory(externalBrandFilter.category);
      }
      if (externalBrandFilter.model !== undefined) {
        setSearchQuery(externalBrandFilter.model);
      }
      if (externalBrandFilter.year !== undefined) {
        setSelectedYear(externalBrandFilter.year);
      }
      setShowAll(true);
      setPageOffset(0);
    } else if (typeof externalBrandFilter === 'string') {
      setSelectedBrand(externalBrandFilter);
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
      const matchesYear = !selectedYear || String(v.year) === String(selectedYear);

      return matchesQuery && matchesBrand && matchesCategory && matchesYear;
    });
  }, [vehicles, searchQuery, selectedBrand, selectedCategory, selectedYear]);

  const hasActiveFilters =
    selectedBrand !== 'Todas' ||
    selectedCategory !== 'Todas' ||
    Boolean(searchQuery.trim()) ||
    Boolean(selectedYear);

  const visibleVehicles = useMemo(() => {
    if (showAll || hasActiveFilters) return filteredVehicles;
    const start = pageOffset % Math.max(filteredVehicles.length, 1);
    const slice = filteredVehicles.slice(start, start + 4);
    if (slice.length < 4 && filteredVehicles.length > 4) {
      return [...slice, ...filteredVehicles.slice(0, 4 - slice.length)];
    }
    return slice;
  }, [filteredVehicles, showAll, hasActiveFilters, pageOffset]);

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
    setSelectedYear('');
    setPageOffset(0);
  };

  return (
    <section id="catalogo" className="featured-catalog-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <span className="featured-eyebrow">VEHÍCULOS DESTACADOS</span>
            <h2 className="featured-title">LOS MÁS BUSCADOS</h2>
          </div>

          <button
            type="button"
            className="view-all-link"
            onClick={() => {
              if (hasActiveFilters) {
                handleResetFilters();
                setShowAll(true);
              } else {
                setShowAll((prev) => !prev);
              }
            }}
          >
            <span>
              {showAll && !hasActiveFilters
                ? 'VER VISTA COMPACTA (4 DESTACADOS)'
                : 'VER TODO EL INVENTARIO'}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Barra de Filtros Interactiva (Visible al desplegar todo el inventario o filtrar) */}
        {(showAll || hasActiveFilters) && (
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
                  {brand === 'Todas' ? 'Todos' : brand.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="catalog-quick-controls">
              <input
                type="search"
                className="catalog-search-input"
                placeholder="Buscar modelo o motor..."
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

              {hasActiveFilters && (
                <button
                  type="button"
                  className="brand-tab-btn"
                  onClick={handleResetFilters}
                >
                  Limpiar filtros ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Carrusel / Grid de 4 Tarjetas Editoriales */}
        {visibleVehicles.length > 0 ? (
          <div className="carousel-stage">
            {!showAll && !hasActiveFilters && filteredVehicles.length > 4 && (
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

            {!showAll && !hasActiveFilters && filteredVehicles.length > 4 && (
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
            <p>
              {selectedBrand === 'Dodge'
                ? 'De momento no contamos con unidades Dodge disponibles en nuestro Showroom de Maracaibo. Explora nuestras unidades Jeep y RAM de entrega inmediata.'
                : 'No se encontraron modelos con los criterios seleccionados.'}
            </p>
            <button
              type="button"
              className="btn-dark-pill"
              onClick={handleResetFilters}
            >
              Ver todos los modelos disponibles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
