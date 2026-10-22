'use client';

import BrandLogo from './BrandLogo';

const LINEUP_BRANDS = [
  {
    brand: 'Jeep',
    tagline: 'LIBERTAD EN CADA RUTA',
    altText: 'Jeep Wrangler 4x4 todo terreno superando ruta rocosa',
    image:
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=75',
    btnClass: 'btn-lineup-jeep',
  },
  {
    brand: 'Dodge',
    tagline: 'ACTITUD SIN LÍMITES',
    altText: 'Deportivo Dodge Charger SRT rojo en autopista urbana',
    image:
      'https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=800&q=75',
    btnClass: 'btn-lineup-dark',
  },
  {
    brand: 'RAM',
    tagline: 'FUERZA QUE TRABAJA CONTIGO',
    altText: 'Camioneta Pick-up RAM 1500 negra en ruta de montaña',
    image:
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=75',
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
            Desde la aventura sin límites hasta la fuerza del trabajo, pasando por el
            rendimiento en cada camino.{' '}
            <strong>Aquí tienes todo lo que necesitas.</strong>
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
