'use client';

import Image from 'next/image';
import { withBasePath } from '../lib/basePath';

export default function PromoBanners({ onSelectPromoAction }) {
  const scrollTo = (id, presetNote, requestType) => {
    if (onSelectPromoAction && presetNote) {
      onSelectPromoAction({ note: presetNote, requestType });
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="promociones" className="promo-panoramic-banner">
      <div className="promo-panoramic-bg" aria-hidden="true">
        <Image
          src={withBasePath('/images/vehicles/RAM1500/Ram1500Out2.webp')}
          alt="Promociones Especiales Rústicos La Mundial Maracaibo"
          fill
          sizes="100vw"
          className="promo-panoramic-img"
        />
        <div className="promo-panoramic-gradient" />
      </div>

      <div className="container promo-panoramic-inner">
        <div className="promo-panoramic-content">
          <span className="promo-panoramic-eyebrow">PROMOCIONES ESPECIALES</span>
          <h2 className="promo-panoramic-title">
            TU PRÓXIMO VEHÍCULO
            <br />
            TE ESTÁ ESPERANDO
          </h2>
          <p className="promo-panoramic-desc">
            Descubre nuestras unidades de entrega inmediata y aprovecha las mejores
            condiciones de financiamiento, Test Drive y servicio oficial Mopar® en
            Maracaibo.
          </p>

          <div className="promo-panoramic-actions">
            <button
              type="button"
              className="btn-promo-white"
              onClick={() => scrollTo('financiamiento')}
            >
              <span>VER OFERTAS</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="btn-promo-ghost"
              onClick={() =>
                scrollTo(
                  'test-drive',
                  'Deseo agendar una prueba de manejo (Test Drive) o cita de Servicio Oficial Mopar en la sede de Rústicos La Mundial Maracaibo.',
                  'Test Drive Presencial'
                )
              }
            >
              <span>AGENDAR TEST DRIVE / MOPAR®</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
