'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'rusticos_cookie_consent_v1';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleConsent = (level) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ level, updatedAt: new Date().toISOString() })
      );
      window.dispatchEvent(
        new CustomEvent('cookie-consent-updated', { detail: { level } })
      );
    } catch {
      // Fallback silencioso si el navegador bloquea localStorage
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className="cookie-banner"
      role="region"
      aria-label="Consentimiento de uso de cookies"
    >
      <div className="container cookie-banner-inner">
        <div className="cookie-text">
          <strong>Privacidad y Uso de Cookies</strong>
          <p>
            Utilizamos cookies propias y analíticas (Google Analytics 4) para mejorar tu
            experiencia en nuestro concesionario, recordar tus preferencias y medir el
            rendimiento del catálogo. Consulta nuestra{' '}
            <Link href="/privacidad" className="cookie-link">
              Política de Privacidad
            </Link>{' '}
            y{' '}
            <Link href="/terminos" className="cookie-link">
              Términos y Condiciones
            </Link>
            .
          </p>
        </div>

        <div className="cookie-actions">
          <button
            type="button"
            className="btn-cookie-secondary"
            onClick={() => handleConsent('essential')}
          >
            Solo Esenciales
          </button>
          <button
            type="button"
            className="btn-cookie-primary"
            onClick={() => handleConsent('all')}
          >
            Aceptar Todas
          </button>
        </div>
      </div>
    </aside>
  );
}
