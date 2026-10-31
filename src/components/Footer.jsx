import Link from 'next/link';
import BrandLogo from './BrandLogo';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584125554440';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-bar">
          {/* Left: Brand Logos (Jeep | RAM) */}
          <div className="footer-brands">
            <BrandLogo brand="Jeep" variant="light" size="md" />
            <span className="footer-divider" aria-hidden="true" />
            <BrandLogo brand="RAM" variant="light" size="md" />
          </div>

          {/* Right: Location, WhatsApp, Social Icons */}
          <div className="footer-contact-items">
            <a href="#ubicacion" className="footer-meta-item footer-wa-link">
              <svg
                width="16"
                height="16"
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

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20el%20inventario%20Jeep%20y%20RAM%20en%20Maracaibo`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-meta-item footer-wa-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Contáctanos por WhatsApp</span>
            </a>

            <div className="footer-socials" aria-label="Redes sociales oficiales">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram oficial"
              >
                <svg
                  width="17"
                  height="17"
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
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Facebook oficial"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar canal de YouTube oficial"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>
            © 2026 Rústicos La Mundial, C.A. (RIF: J-50777406-4) — Concesionario Oficial Jeep | RAM en Maracaibo.
          </span>

          <div className="footer-legal-links">
            <Link href="/privacidad">Política de Privacidad</Link>
            <span aria-hidden="true">•</span>
            <Link href="/terminos">Términos y Condiciones</Link>
            <span aria-hidden="true">•</span>
            <a href="/sitemap.xml">Mapa del Sitio</a>
          </div>

          <span>Juntos en cada camino.</span>
        </div>
      </div>
    </footer>
  );
}
