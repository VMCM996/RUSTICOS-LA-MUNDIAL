import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export const metadata = {
  title: 'Términos y Condiciones | Rústicos La Mundial Jeep • Dodge • RAM Maracaibo',
  description:
    'Términos de uso del portal web de Rústicos La Mundial, C.A., condiciones de precios referenciales, solicitud de financiamiento y agendamiento de citas.',
};

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <div className="legal-header">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <BrandLogo brand="Jeep" size="sm" />
            <BrandLogo brand="Dodge" size="sm" />
            <BrandLogo brand="RAM" size="sm" />
          </div>
          <span className="lineup-eyebrow">CONDICIONES COMERCIALES</span>
          <h1 className="legal-title">Términos y Condiciones de Uso</h1>
          <p className="legal-updated">Última actualización: Octubre 2026</p>
        </div>

        <div className="legal-body">
          <section>
            <h2>1. Aceptación de los Términos</h2>
            <p>
              El acceso y uso de este sitio web implica la aceptación plena de los presentes Términos
              y Condiciones. Si no estás de acuerdo con alguno de estos puntos, te recomendamos
              abstenerte de utilizar el portal.
            </p>
          </section>

          <section>
            <h2>2. Precios, Inventario y Especificaciones</h2>
            <p>
              Los precios expresados en dólares estadounidenses (USD), fotografías y fichas técnicas de
              los vehículos <strong>Jeep®, Dodge® y RAM®</strong> tienen carácter informativo y
              referencial. La disponibilidad de colores, versiones (trims) e impuestos aplicables se
              confirman en la cotización formal emitida por un asesor autorizado.
            </p>
          </section>

          <section>
            <h2>3. Simulador de Financiamiento</h2>
            <p>
              Los cálculos generados por la Calculadora de Financiamiento (cuota inicial, plazo en
              meses y tasa anual TEA) constituyen una estimación orientativa y no representan una
              oferta vinculante de crédito hasta completar el análisis crediticio correspondiente.
            </p>
          </section>

          <section>
            <h2>4. Agendamiento de Test Drive</h2>
            <p>
              Para realizar una prueba de manejo presencial, el solicitante deberá ser mayor de 21
              años, presentar licencia de conducir vigente y cédula de identidad o pasaporte al
              momento de acudir al concesionario.
            </p>
          </section>

          <section>
            <h2>5. Propiedad Intelectual</h2>
            <p>
              Las marcas, logotipos y nombres de modelos <strong>Jeep, Dodge, RAM, SRT, Rubicon y TRX</strong>{' '}
              son marcas registradas de sus respectivos propietarios y se utilizan con fines de
              exhibición comercial autorizada.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link href="/" className="btn-dark-pill">
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
