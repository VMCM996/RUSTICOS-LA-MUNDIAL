'use client';

import Image from 'next/image';
import BrandLogo from './BrandLogo';

export default function PromoBanners({ onSelectPromoAction }) {
  const scrollTo = (id, presetNote, requestType) => {
    if (onSelectPromoAction && presetNote) {
      onSelectPromoAction({ note: presetNote, requestType });
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="promociones" className="diagonal-banners">
      <div className="diagonal-grid">
        {/* Promoción 1: Plan Financiero */}
        <article className="diagonal-panel panel-jeep">
          <div className="diagonal-panel-bg">
            <Image
              src="/images/showroom/fachada-atardecer.jpg"
              alt="Plan de Financiamiento Directo en Rústicos La Mundial Maracaibo"
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="Jeep" variant="light" size="sm" />
            <span className="promo-kicker-tag">CRÉDITO EJECUTIVO ZULIA</span>
            <h3 className="diagonal-title">
              PLAN FINANCIERO
              <br />
              ENTREGA INMEDIATA
            </h3>
            <p className="promo-banner-desc">
              Inicial desde el 30% y plazos de 12 a 48 meses con atención personalizada en
              nuestra sede de Maracaibo.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() => scrollTo('financiamiento')}
            >
              <span>CONSULTAR FINANCIAMIENTO</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Promoción 2: Agendar Test Drive */}
        <article className="diagonal-panel panel-dodge">
          <div className="diagonal-panel-bg">
            <Image
              src="/images/showroom/fachada-test-drive.jpg"
              alt="Unidad de Test Drive en Rústicos La Mundial Maracaibo"
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
              style={{ objectPosition: 'center 70%' }}
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="Dodge" variant="light" size="sm" />
            <span className="promo-kicker-tag">EXPERIENCIA DE MANEJO</span>
            <h3 className="diagonal-title">
              DESPUÉS DE MANEJARLA,
              <br />
              LA VAS A QUERER
            </h3>
            <p className="promo-banner-desc">
              Reserva tu prueba de manejo en nuestra sede de Calle 72, sector Tierra Negra,
              Maracaibo.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() =>
                scrollTo(
                  'test-drive',
                  'Deseo agendar una prueba de manejo (Test Drive) en la sede de Rústicos La Mundial Maracaibo.',
                  'Test Drive Presencial'
                )
              }
            >
              <span>AGENDAR TEST DRIVE</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Promoción 3: Servicio Postventa Mopar con imagen RAM */}
        <article className="diagonal-panel panel-ram">
          <div className="diagonal-panel-bg">
            <Image
              src="/images/vehicles/RAM700/Ram700Out2.webp"
              alt="Camioneta RAM — Centro de Servicio Autorizado Mopar en Maracaibo"
              fill
              sizes="(max-width: 860px) 100vw, 33vw"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="RAM" variant="light" size="sm" />
            <span className="promo-kicker-tag">GARANTÍA Y POSTVENTA</span>
            <h3 className="diagonal-title">
              SERVICIO OFICIAL
              <br />Y REPUESTOS MOPAR®
            </h3>
            <p className="promo-banner-desc">
              Diagnóstico computarizado original, mantenimiento preventivo y accesorios
              instalados en nuestra sede de Maracaibo.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() =>
                scrollTo(
                  'test-drive',
                  'Deseo agendar cita para Servicio Técnico / Repuestos Mopar en la sede de Maracaibo.',
                  'Servicio Técnico / Repuestos Mopar'
                )
              }
            >
              <span>AGENDAR SERVICIO</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
