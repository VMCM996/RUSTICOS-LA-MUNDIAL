import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export const metadata = {
  title: 'Política de Privacidad | Concesionario Jeep • Dodge • RAM Venezuela',
  description:
    'Conoce cómo protegemos y tratamos tus datos personales en las solicitudes de cotización, financiamiento y pruebas de manejo (Test Drive).',
};

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <div className="legal-header">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <BrandLogo brand="Jeep" size="sm" />
            <BrandLogo brand="Dodge" size="sm" />
            <BrandLogo brand="RAM" size="sm" />
          </div>
          <span className="lineup-eyebrow">DOCUMENTACIÓN LEGAL</span>
          <h1 className="legal-title">Política de Privacidad y Protección de Datos</h1>
          <p className="legal-updated">Última actualización: Octubre 2026</p>
        </div>

        <div className="legal-body">
          <section>
            <h2>1. Responsable del Tratamiento</h2>
            <p>
              <strong>Rústicos Motors C.A. (Concesionario Oficial Jeep | Dodge | RAM)</strong>, con
              domicilio principal y sede única en <strong>Maracaibo, Estado Zulia, Venezuela</strong>,
              es responsable del tratamiento de los datos personales recopilados a través de este
              portal web.
            </p>
          </section>

          <section>
            <h2>2. Datos que Recopilamos</h2>
            <p>
              Únicamente solicitamos los datos estrictamente necesarios para procesar tu solicitud
              comercial:
            </p>
            <ul>
              <li>Nombre y apellido.</li>
              <li>Número telefónico de contacto / WhatsApp.</li>
              <li>Dirección de correo electrónico.</li>
              <li>Modelo de interés, parámetros de simulación financiera y fecha preferida de cita.</li>
              <li>Datos técnicos anónimos de navegación (cookies analíticas previo consentimiento).</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidad del Uso de la Información</h2>
            <p>Los datos suministrados se utilizan exclusivamente para:</p>
            <ul>
              <li>Agendar pruebas de manejo (Test Drive) en nuestra sede oficial de Maracaibo.</li>
              <li>Elaborar cotizaciones formales y pre-evaluaciones de financiamiento automotriz.</li>
              <li>Atender consultas de servicio técnico especializado o retoma de vehículos.</li>
            </ul>
          </section>

          <section>
            <h2>4. Confidencialidad y Seguridad</h2>
            <p>
              No vendemos, alquilamos ni cedemos tus datos personales a terceros ajenos a nuestro
              concesionario. Todas las comunicaciones se transmiten de forma cifrada mediante el
              protocolo seguro <strong>HTTPS (TLS)</strong>.
            </p>
          </section>

          <section>
            <h2>5. Derechos del Usuario (Acceso, Rectificación y Eliminación)</h2>
            <p>
              Puedes solicitar en cualquier momento el acceso, actualización o eliminación definitiva
              de tus datos escribiendo a <strong>privacidad@rusticosmotors.com</strong>.
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
