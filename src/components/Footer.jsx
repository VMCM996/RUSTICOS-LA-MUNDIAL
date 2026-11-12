import Link from 'next/link';
import BrandLogo from './BrandLogo';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584125554440';

export default function Footer() {
  return (
    <footer className="site-footer-v2">
      <div className="container">
        <div className="footer-grid-v2">
          {/* Columna 1: Logos Oficiales */}
          <div className="footer-brand-col">
            <div className="footer-brands">
              <BrandLogo brand="Jeep" variant="light" size="sm" />
              <span className="footer-divider" aria-hidden="true" />
              <BrandLogo brand="RAM" variant="light" size="sm" />
              <span className="footer-divider" aria-hidden="true" />
              <BrandLogo brand="Dodge" variant="light" size="sm" />
            </div>
            <p className="footer-company-caption">
              Rústicos La Mundial, C.A. (RIF: J-50777406-4) — Concesionario Oficial
              Autorizado en Maracaibo, Estado Zulia.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Navegación</h3>
            <ul className="footer-nav-links">
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#catalogo">Vehículos</a>
              </li>
              <li>
                <a href="#promociones">Ofertas</a>
              </li>
              <li>
                <a href="#financiamiento">Financiamiento</a>
              </li>
              <li>
                <a href="#eventos">Eventos</a>
              </li>
              <li>
                <a href="#ubicacion">Ubicación</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contáctanos */}
          <div className="footer-contact-col">
            <h3 className="footer-col-title">Contáctanos</h3>
            <ul className="footer-contact-list">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20el%20inventario%20Jeep,%20Dodge%20y%20RAM%20en%20Maracaibo`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+58 (412) 555-4440</span>
                </a>
              </li>
              <li>
                <a href="mailto:ventas@rusticosmotors.com">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>ventas@rusticosmotors.com</span>
                </a>
              </li>
              <li>
                <a href="#ubicacion">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Calle 72, local 12-38, Tierra Negra, Maracaibo</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Síguenos */}
          <div className="footer-social-col">
            <h3 className="footer-col-title">Síguenos</h3>
            <div className="footer-socials-v2" aria-label="Redes sociales oficiales">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram oficial"
                title="Instagram"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar canal de YouTube oficial"
                title="YouTube"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar TikTok oficial"
                title="TikTok"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-v2">
          <span>
            © 2026 Rústicos La Mundial, C.A. — Concesionario Jeep | RAM | Dodge. Todos los
            derechos reservados.
          </span>

          <div className="footer-legal-v2">
            <Link href="/terminos">Términos y condiciones</Link>
            <span aria-hidden="true">|</span>
            <Link href="/privacidad">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
