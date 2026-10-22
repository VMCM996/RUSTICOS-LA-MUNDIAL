'use client';

import BrandLogo from './BrandLogo';

export default function PromoBanners({ onSelectBrand }) {
  const handleBannerAction = (brand) => {
    onSelectBrand(brand);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="promociones" className="diagonal-banners">
      <div className="diagonal-grid">
        {/* Panel 1: JEEP */}
        <article className="diagonal-panel panel-jeep">
          <div className="diagonal-panel-bg">
            <img
              src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=75"
              alt="Promoción Jeep Wrangler Aventura Sin Límites 4x4"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="Jeep" variant="light" size="sm" />
            <h3 className="diagonal-title">
              AVENTURA
              <br />
              SIN LÍMITES
            </h3>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() => handleBannerAction('Jeep')}
            >
              <span>DESCUBRE MÁS</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Panel 2: DODGE */}
        <article className="diagonal-panel panel-dodge">
          <div className="diagonal-panel-bg">
            <img
              src="https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=800&q=75"
              alt="Promoción Dodge SRT Desempeño Que Impacta"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="Dodge" variant="light" size="sm" />
            <h3 className="diagonal-title">
              DESEMPEÑO
              <br />
              QUE IMPACTA
            </h3>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() => handleBannerAction('Dodge')}
            >
              <span>DESCUBRE MÁS</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Panel 3: RAM */}
        <article className="diagonal-panel panel-ram">
          <div className="diagonal-panel-bg">
            <img
              src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=75"
              alt="Promoción RAM 1500 Fuerza En Cada Trabajo"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="RAM" variant="light" size="sm" />
            <h3 className="diagonal-title">
              FUERZA
              <br />
              EN CADA TRABAJO
            </h3>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() => handleBannerAction('RAM')}
            >
              <span>DESCUBRE MÁS</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
