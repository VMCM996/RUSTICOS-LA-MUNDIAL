'use client';

import { useState, useEffect } from 'react';

export default function FinanceCalculator({
  vehicles,
  selectedVehicle,
  onSendToContact,
}) {
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [downPaymentPercent, setDownPaymentPercent] = useState(40);
  const [termMonths, setTermMonths] = useState(24);
  const [buyerProfile, setBuyerProfile] = useState('Persona Natural / Particular');

  useEffect(() => {
    if (selectedVehicle) {
      setVehicleId(selectedVehicle.id);
    }
  }, [selectedVehicle]);

  const currentVehicle = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

  return (
    <section id="financiamiento" className="section finance-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Planes a tu Medida en Maracaibo</span>
          <h2 className="section-title">Configura tu Solicitud de Financiamiento</h2>
          <p className="section-subtitle">
            Selecciona el modelo de tu interés, porcentaje de inicial deseada y plazo en
            meses para consultar tu propuesta personalizada con un asesor.
          </p>
        </div>

        <div className="finance-grid">
          <div className="finance-card">
            <div style={{ display: 'grid', gap: '1.35rem' }}>
              <div className="field-group">
                <label htmlFor="calc-vehicle" className="field-label">
                  Seleccionar Modelo Disponible
                </label>
                <select
                  id="calc-vehicle"
                  className="field-select"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} ({v.year}) — Consultar
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="calc-profile" className="field-label">
                  Perfil del Solicitante
                </label>
                <select
                  id="calc-profile"
                  className="field-select"
                  value={buyerProfile}
                  onChange={(e) => setBuyerProfile(e.target.value)}
                >
                  <option value="Persona Natural / Particular">
                    Persona Natural / Particular
                  </option>
                  <option value="Persona Jurídica / Empresa">
                    Persona Jurídica / Empresa
                  </option>
                  <option value="Flota Comercial / Agroindustrial">
                    Flota Comercial / Agroindustrial
                  </option>
                </select>
              </div>

              <div className="field-group">
                <div className="range-header">
                  <label htmlFor="calc-downpayment" className="field-label">
                    Porcentaje de Inicial Estimada
                  </label>
                  <span className="range-value">{downPaymentPercent}% de Inicial</span>
                </div>
                <input
                  id="calc-downpayment"
                  type="range"
                  min="30"
                  max="75"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                />
              </div>

              <div className="field-group">
                <div className="range-header">
                  <label htmlFor="calc-term" className="field-label">
                    Plazo Deseado de Financiamiento
                  </label>
                  <span className="range-value">{termMonths} meses</span>
                </div>
                <div className="category-pills">
                  {[12, 18, 24, 36, 48].map((months) => (
                    <button
                      key={months}
                      type="button"
                      className={`pill-btn ${termMonths === months ? 'active' : ''}`}
                      onClick={() => setTermMonths(months)}
                    >
                      {months} meses
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="finance-summary">
            <div>
              <span className="card-brand">
                Resumen de Solicitud •{' '}
                {currentVehicle
                  ? `${currentVehicle.brand} ${currentVehicle.model}`
                  : 'Personalizado'}
              </span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '0.25rem' }}>
                Cotización Personalizada
              </h3>

              <div className="monthly-quote-box">
                <div className="monthly-amount" style={{ fontSize: '1.75rem' }}>
                  Consultar con Asesor
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                  Nuestro equipo en Calle 72, Tierra Negra te enviará la propuesta exacta
                  según tu inicial del {downPaymentPercent}% y plazo de {termMonths} meses.
                </p>
              </div>

              <div className="breakdown-list">
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Modelo seleccionado</span>
                  <strong>
                    {currentVehicle?.brand} {currentVehicle?.model} ({currentVehicle?.year})
                  </strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Valor del vehículo</span>
                  <strong>Consultar</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Inicial propuesta</span>
                  <strong>{downPaymentPercent}%</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Plazo solicitado</span>
                  <strong>{termMonths} meses</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Modalidad</span>
                  <strong>{buyerProfile}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() =>
                onSendToContact(
                  currentVehicle,
                  `Deseo consultar precio y plan de financiamiento para ${currentVehicle?.brand} ${currentVehicle?.model} (${currentVehicle?.year}): Inicial del ${downPaymentPercent}% a ${termMonths} meses (${buyerProfile}).`
                )
              }
            >
              Consultar este Plan con un Asesor →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
