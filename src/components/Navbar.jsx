'use client';

import { useState } from 'react';
import BrandLogo from './BrandLogo';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584125554440';

export default function Navbar({ onSelectBrandFilter }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBrandClick = (brand) => {
    if (onSelectBrandFilter) {
      onSelectBrandFilter(brand);
    }
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReloadPage = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <header className="site-header">
      {/* Top Tier Bar */}
      <div className="header-top">
        <div className="container header-top-inner">
          {/* Left: Logo Oficial Rústicos La Mundial (Recarga la página) + Ubicación */}
          <div className="header-left-group">
            <a
              href="/"
              onClick={handleReloadPage}
              className="rusticos-navbar-logo-link"
              title="Rústicos La Mundial — Recargar página"
              aria-label="Rústicos La Mundial — Recargar página de inicio"
            >
              <img
                src="/images/logos/rusticos-la-mundial.svg"
                alt="Logo Oficial Rústicos La Mundial"
                width="148"
                height="48"
                className="rusticos-navbar-logo-img"
              />
            </a>

            <span className="brand-divider" aria-hidden="true" />

            <a
              href="#ubicacion"
              className="header-location"
              title="Ver ubicación de nuestra sede única en Calle 72, Sector Tierra Negra, Maracaibo"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span className="location-fixed-badge">
                <strong>Maracaibo, Zulia</strong>
              </span>
            </a>
          </div>

          {/* Center Multi-Brand Logos (Jeep | Dodge | RAM) */}
          <div className="header-brands" aria-label="Marcas oficiales">
            <button
              type="button"
              className="header-brand-btn"
              onClick={() => handleBrandClick('Jeep')}
              title="Filtrar por modelos Jeep"
            >
              <BrandLogo brand="Jeep" size="md" />
            </button>
            <span className="brand-divider" aria-hidden="true" />
            <button
              type="button"
              className="header-brand-btn"
              onClick={() => handleBrandClick('Dodge')}
              title="Marca oficial Dodge"
            >
              <BrandLogo brand="Dodge" size="md" />
            </button>
            <span className="brand-divider" aria-hidden="true" />
            <button
              type="button"
              className="header-brand-btn"
              onClick={() => handleBrandClick('RAM')}
              title="Filtrar por modelos RAM"
            >
              <BrandLogo brand="RAM" size="md" />
            </button>
          </div>

          {/* Right: WhatsApp + Mobile Menu */}
          <div className="header-actions">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20deseo%20consultar%20sobre%20los%20modelos%20Jeep%20y%20RAM%20disponibles%20en%20Maracaibo`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-header-cta"
              aria-label="Contáctanos por WhatsApp oficial en Maracaibo"
            >
              <span className="wa-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <span className="wa-text">
                <strong>Contáctanos</strong>
                <small>por WhatsApp</small>
              </span>
            </a>

            <button
              type="button"
              className="hamburger-btn"
              aria-label="Alternar menú de navegación"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tier Navigation */}
      <nav
        className={`header-nav ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Navegación principal"
      >
        <div className="container">
          <ul className="header-nav-list">
            <li>
              <a
                href="#inicio"
                className="active"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </a>
            </li>
            <li>
              <a href="#catalogo" onClick={() => setMobileMenuOpen(false)}>
                Vehículos
              </a>
            </li>
            <li>
              <a href="#promociones" onClick={() => setMobileMenuOpen(false)}>
                Promociones
              </a>
            </li>
            <li>
              <a href="#eventos" onClick={() => setMobileMenuOpen(false)}>
                Eventos
              </a>
            </li>
            <li>
              <a href="#financiamiento" onClick={() => setMobileMenuOpen(false)}>
                Financiamiento
              </a>
            </li>
            <li>
              <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)}>
                Ubicación (Mapa)
              </a>
            </li>
            <li>
              <a href="#test-drive" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
