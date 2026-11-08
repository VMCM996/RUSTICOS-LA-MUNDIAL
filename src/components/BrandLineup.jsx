'use client';

import Image from 'next/image';
import BrandLogo from './BrandLogo';
import { withBasePath } from '../lib/basePath';

const LINEUP_BRANDS = [
  {
    brand: 'Jeep',
    tagline: 'LIBERTAD EN CADA RUTA',
    altText: 'Jeep Renegade, Compass y Grand Cherokee en Maracaibo',
    image: withBasePath('/images/vehicles/Sahara2027/SaharaOut1.webp'),
    btnClass: 'btn-lineup-jeep',
  },
  {
    brand: 'Dodge',
    tagline: 'ACTITUD SIN LÍMITES',
    altText: 'Showroom Oficial Dodge en Rústicos La Mundial Maracaibo',
    image: withBasePath('/images/showroom/sede-la-mundial.jpg'),
    btnClass: 'btn-lineup-dark',
  },
  {
    brand: 'RAM',
    tagline: 'FUERZA QUE TRABAJA CONTIGO',
    altText: 'Camioneta Pick-up RAM 700 y RAM 1500 Lone Star en Maracaibo',
    image: withBasePath('/images/vehicles/RAM1500/Ram1500Out2.webp'),
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
            Desde la aventura sin límites hasta la fuerza del trabajo pesado, pasando por el
            carácter deportivo en cada camino.{' '}
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
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
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
