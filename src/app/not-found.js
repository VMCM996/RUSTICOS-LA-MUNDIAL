import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export const metadata = {
  title: 'Página no encontrada (404) | Rústicos La Mundial Jeep • Dodge • RAM',
  description: 'La ruta solicitada no existe. Regresa a nuestro catálogo oficial de vehículos en Maracaibo.',
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-box">
        <div className="not-found-brands">
          <BrandLogo brand="Jeep" variant="light" size="md" />
          <span className="footer-divider" />
          <BrandLogo brand="Dodge" variant="light" size="md" />
          <span className="footer-divider" />
          <BrandLogo brand="RAM" variant="light" size="md" />
        </div>

        <span className="not-found-code">404</span>
        <h1 className="not-found-title">FUERA DE RUTA</h1>
        <p className="not-found-text">
          Incluso nuestros 4x4 más capaces saben cuándo regresar al camino principal. La página que
          buscas no existe o fue trasladada.
        </p>

        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            Volver al Inicio →
          </Link>
          <Link href="/#catalogo" className="btn btn-danger">
            Explorar Vehículos
          </Link>
        </div>
      </div>
    </main>
  );
}
