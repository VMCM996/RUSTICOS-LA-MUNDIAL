export default function TrustBar() {
  return (
    <section className="trust-bar-v2" aria-label="Beneficios del concesionario">
      <div className="container trust-grid-v2">
        <div className="trust-item-v2">
          <span className="trust-icon-v2" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <div className="trust-copy-v2">
            <h3>
              Financiamiento
              <br />a tu medida
            </h3>
            <p>Te ayudamos a encontrar el plan perfecto para ti.</p>
          </div>
        </div>

        <div className="trust-item-v2">
          <span className="trust-icon-v2" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <div className="trust-copy-v2">
            <h3>
              Servicio técnico
              <br />
              especializado
            </h3>
            <p>Personal certificado y repuestos originales Mopar®.</p>
          </div>
        </div>

        <div className="trust-item-v2">
          <span className="trust-icon-v2" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </span>
          <div className="trust-copy-v2">
            <h3>
              Unidades 0 km y
              <br />
              Test Drive oficial
            </h3>
            <p>Garantía de fábrica y entrega inmediata en Maracaibo.</p>
          </div>
        </div>

        <div className="trust-item-v2">
          <span className="trust-icon-v2" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <div className="trust-copy-v2">
            <h3>
              Visítanos en
              <br />
              nuestra concesionaria
            </h3>
            <p>Calle 72, sector Tierra Negra. Estamos listos para atenderte.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
