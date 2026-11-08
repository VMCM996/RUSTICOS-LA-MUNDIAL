'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BrandLogo from './BrandLogo';

export default function VehicleModal({
  vehicle,
  onClose,
  onQuoteFinance,
  onScheduleTestDrive,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    setActiveImage(0);
    if (!vehicle) return undefined;

    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-vehicle-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="modal-content"
        data-brand={vehicle.brand}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-title-group">
            <BrandLogo brand={vehicle.brand} variant="light" size="md" />
            <div>
              <h2 id="modal-vehicle-title" className="modal-vehicle-heading">
                {vehicle.model} {vehicle.trim ? `• ${vehicle.trim}` : ''}
              </h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Año {vehicle.year} • {vehicle.category} • {vehicle.condition}
              </span>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="btn btn-outline modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar ventana de detalles"
          >
            ✕ Cerrar
          </button>
        </div>

        <div className="modal-body">
          <div>
            <div
              className={`gallery-main ${
                !/Out|Inside/i.test(vehicle.images[activeImage]) ? 'is-studio-shot' : ''
              }`}
            >
              <Image
                src={vehicle.images[activeImage]}
                alt={`${vehicle.brand} ${vehicle.model} vista ${activeImage + 1}`}
                fill
                sizes="(max-width: 1080px) 100vw, 520px"
              />
            </div>

            <div className="gallery-thumbs">
              {vehicle.images.map((imgUrl, index) => (
                <button
                  key={imgUrl}
                  type="button"
                  className={`thumb-btn ${activeImage === index ? 'active' : ''} ${
                    !/Out|Inside/i.test(imgUrl) ? 'is-studio-shot' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={imgUrl}
                    alt={`Miniatura ${index + 1} de ${vehicle.model}`}
                    fill
                    sizes="160px"
                  />
                </button>
              ))}
            </div>

            <div className="spec-grid-box">
              <div className="spec-item">
                <div className="spec-item-label">Motor</div>
                <div className="spec-item-value">{vehicle.engine}</div>
              </div>
              <div className="spec-item">
                <div className="spec-item-label">Tracción</div>
                <div className="spec-item-value">{vehicle.drivetrain}</div>
              </div>
              <div className="spec-item">
                <div className="spec-item-label">Transmisión</div>
                <div className="spec-item-value">{vehicle.transmission}</div>
              </div>
              <div className="spec-item">
                <div className="spec-item-label">Altura Libre al Suelo</div>
                <div className="spec-item-value">{vehicle.specs.alturaLibreSuelo}</div>
              </div>
              <div className="spec-item">
                <div className="spec-item-label">Color / Plazas</div>
                <div className="spec-item-value">
                  {vehicle.color} ({vehicle.seats} asientos)
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-item-label">Garantía Oficial</div>
                <div className="spec-item-value">{vehicle.specs.garantia}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '0.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Precio y Condiciones
              </span>
              <span className="card-price" style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}>
                Consultar con un Asesor
              </span>
            </div>

            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
              {vehicle.shortDescription}
            </p>

            <h3 style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>
              Equipamiento Destacado
            </h3>
            <ul className="feature-list">
              {vehicle.features.map((feature) => (
                <li key={feature}>
                  <span className="feature-check">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 'auto',
                display: 'grid',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)',
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onScheduleTestDrive(vehicle)}
              >
                Consultar / Agendar Test Drive de {vehicle.brand} {vehicle.model} →
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onQuoteFinance(vehicle)}
              >
                Consultar Plan de Financiamiento →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
