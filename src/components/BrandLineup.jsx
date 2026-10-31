'use client';

import BrandLogo from './BrandLogo';

const LINEUP_BRANDS = [
  {
    brand: 'Jeep',
    tagline: 'LIBERTAD EN CADA RUTA',
    altText: 'Jeep Renegade, Compass y Grand Cherokee en Maracaibo',
    image: '/images/vehicles/renegade-hero.jpg',
    btnClass: 'btn-lineup-jeep',
  },
  {
    brand: 'RAM',
    tagline: 'FUERZA QUE TRABAJA CONTIGO',
    altText: 'Camioneta Pick-up RAM 700 y RAM 1500 Lone Star en Maracaibo',
    image: '/images/vehicles/ram700-hero.jpg',
    btnClass: 'btn-lineup-dark',
  },
];

export default function BrandLineup({ onSelectBrand }) {
  const handleChooseBrand = (brand) => {
    onSelectBrand(brand);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="lineas" className="lineup-section">
      <div className="container">
        <div className="lineup-header">
          <div>
            <span className="lineup-eyebrow">EXPLORA NUESTRA LÍNEA</span>
            <h2 className="lineup-title">
              ENCUENTRA EL VEHÍCULO
              <br />
              PERFECTO PARA TI
            </h2>
          </div>

          <p className="lineup-description">
            Desde la aventura sin límites hasta la fuerza del trabajo pesado.{' '}
            <strong>Aquí tienes todo lo que necesitas en Maracaibo.</strong>
          </p>
        </div>

        <div className="lineup-grid">
          {LINEUP_BRANDS.map((item) => (
            <article key={item.brand} className="lineup-column">
              <div className="lineup-logo-wrap">
                <BrandLogo brand={item.brand} size="lg" />
              </div>
              <p className="lineup-tagline">{item.tagline}</p>

              <div className="lineup-photo">
                <img
                  src={item.image}
                  alt={item.altText}
                  width="380"
                  height="195"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <button
                type="button"
                className={`btn-lineup ${item.btnClass}`}
                onClick={() => handleChooseBrand(item.brand)}
              >
                <span>VER MODELOS {item.brand.toUpperCase()}</span>
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
