'use client';

import { useState, useEffect, useRef } from 'react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onSelectBrandFilter }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('#inicio');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (brand) => {
    if (onSelectBrandFilter) {
      onSelectBrandFilter(brand);
    }
    setActiveNav('#catalogo');
    setMobileMenuOpen(false);
    setServicesOpen(false);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (hash) => {
    setActiveNav(hash);
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header site-header-dark">
      <div className="container header-dark-inner">
        {/* Left: Official Brand Logos (Jeep | RAM | DODGE //) */}
        <div className="header-brands-left" aria-label="Marcas oficiales Rústicos La Mundial">
          <button
            type="button"
            className="header-brand-btn"
            onClick={() => handleBrandClick('Jeep')}
            title="Explorar modelos Jeep en Maracaibo"
          >
            <BrandLogo brand="Jeep" variant="light" size="sm" />
          </button>

          <span className="brand-divider-dark" aria-hidden="true" />

          <button
            type="button"
            className="header-brand-btn"
            onClick={() => handleBrandClick('RAM')}
            title="Explorar modelos RAM en Maracaibo"
          >
            <BrandLogo brand="RAM" variant="light" size="sm" />
          </button>

          <span className="brand-divider-dark hide-on-xs" aria-hidden="true" />

          <button
            type="button"
            className="header-brand-btn hide-on-xs"
            onClick={() => handleNavClick('#inicio')}
            title="Concesionario oficial Dodge en Maracaibo"
          >
            <BrandLogo brand="Dodge" variant="light" size="sm" />
          </button>
        </div>

        {/* Center Navigation Links: INICIO | VEHÍCULOS | SERVICIOS v | CONTACTO */}
        <nav
          className={`header-dark-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="header-dark-nav-list">
            <li>
              <a
                href="#inicio"
                className={activeNav === '#inicio' ? 'active' : ''}
                onClick={() => handleNavClick('#inicio')}
              >
                INICIO
              </a>
            </li>

            <li>
              <a
                href="#catalogo"
                className={activeNav === '#catalogo' ? 'active' : ''}
                onClick={() => handleNavClick('#catalogo')}
              >
                VEHÍCULOS
              </a>
            </li>

            <li className="nav-dropdown-item" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-dropdown-trigger ${
                  ['#promociones', '#financiamiento', '#eventos', '#ubicacion'].includes(
                    activeNav
                  )
                    ? 'active'
                    : ''
                }`}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                <span>SERVICIOS</span>
                <svg
                  className={`nav-chevron ${servicesOpen ? 'is-rotated' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {servicesOpen && (
                <ul className="nav-dropdown-menu" role="menu">
                  <li role="none">
                    <a
                      role="menuitem"
                      href="#financiamiento"
                      onClick={() => handleNavClick('#financiamiento')}
                    >
                      Planes de Financiamiento
                    </a>
                  </li>
                  <li role="none">
                    <a
                      role="menuitem"
                      href="#promociones"
                      onClick={() => handleNavClick('#promociones')}
                    >
                      Promociones y Servicio Mopar®
                    </a>
                  </li>
                  <li role="none">
                    <a
                      role="menuitem"
                      href="#eventos"
                      onClick={() => handleNavClick('#eventos')}
                    >
                      Eventos y Expediciones 4x4
                    </a>
                  </li>
                  <li role="none">
                    <a
                      role="menuitem"
                      href="#ubicacion"
                      onClick={() => handleNavClick('#ubicacion')}
                    >
                      Ubicación Sede Maracaibo
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#test-drive"
                className={activeNav === '#test-drive' ? 'active' : ''}
                onClick={() => handleNavClick('#test-drive')}
              >
                CONTACTO
              </a>
            </li>
          </ul>
        </nav>

        {/* Right: White Solid Button AGENDA TU CITA + Mobile Menu Button */}
        <div className="header-dark-actions">
          <a
            href="#test-drive"
            className="btn-header-cta-white"
            onClick={() => handleNavClick('#test-drive')}
          >
            AGENDA TU CITA
          </a>

          <button
            type="button"
            className={`hamburger-btn hamburger-btn-dark ${
              mobileMenuOpen ? 'is-active' : ''
            }`}
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
    </header>
  );
}
