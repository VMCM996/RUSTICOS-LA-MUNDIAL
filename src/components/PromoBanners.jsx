'use client';

import BrandLogo from './BrandLogo';

export default function PromoBanners({ onSelectPromoAction }) {
  const scrollTo = (id, presetNote) => {
    if (onSelectPromoAction && presetNote) {
      onSelectPromoAction(presetNote);
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
            <img
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=75"
              alt="Plan de Financiamiento Directo en Maracaibo"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
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
              Inicial desde el 30% y plazos de 12 a 48 meses con aprobación rápida en
              nuestra sede de Maracaibo.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() => scrollTo('financiamiento')}
            >
              <span>CALCULAR MI CUOTA</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Promoción 2: Retoma Trade-In */}
        <article className="diagonal-panel panel-dodge">
          <div className="diagonal-panel-bg">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=75"
              alt="Programa de Retoma de Vehículos en Maracaibo"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="diagonal-panel-content">
            <BrandLogo brand="Dodge" variant="light" size="sm" />
            <span className="promo-kicker-tag">PROGRAMA TRADE-IN OFICIAL</span>
            <h3 className="diagonal-title">
              RECIBIMOS TU 4X4
              <br />
              COMO PARTE DE PAGO
            </h3>
            <p className="promo-banner-desc">
              Avalúo transparente y certificado en nuestro Showroom de Av. El Milagro para
              que estrenes modelo hoy.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() =>
                scrollTo(
                  'test-drive',
                  'Solicito avalúo de mi vehículo actual como parte de pago (Plan Retoma Maracaibo).'
                )
              }
            >
              <span>SOLICITAR AVALÚO</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>

        {/* Promoción 3: Servicio Postventa Mopar */}
        <article className="diagonal-panel panel-ram">
          <div className="diagonal-panel-bg">
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=75"
              alt="Centro de Servicio Autorizado Mopar en Maracaibo"
              width="600"
              height="290"
              loading="lazy"
              decoding="async"
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
              off-road instalados en fábrica.
            </p>
            <button
              type="button"
              className="btn-diagonal-outline"
              onClick={() =>
                scrollTo(
                  'test-drive',
                  'Deseo agendar cita para Servicio Técnico / Accesorios Mopar en la sede de Maracaibo.'
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
