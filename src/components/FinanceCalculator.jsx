'use client';

import { useState, useEffect, useMemo } from 'react';

export default function FinanceCalculator({
  vehicles,
  selectedVehicle,
  onSendToContact,
}) {
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [customPrice, setCustomPrice] = useState(vehicles[0]?.price || 58900);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [termMonths, setTermMonths] = useState(48);
  const [annualRate, setAnnualRate] = useState(9.5);

  useEffect(() => {
    if (selectedVehicle) {
      setVehicleId(selectedVehicle.id);
      setCustomPrice(selectedVehicle.price);
    }
  }, [selectedVehicle]);

  const handleVehicleChange = (e) => {
    const id = e.target.value;
    setVehicleId(id);
    const found = vehicles.find((v) => v.id === id);
    if (found) {
      setCustomPrice(found.price);
    }
  };

  const calculation = useMemo(() => {
    const price = Number(customPrice) || 0;
    const downPayment = Math.round((price * downPaymentPercent) / 100);
    const loanAmount = Math.max(price - downPayment, 0);
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment = 0;
    if (loanAmount > 0 && termMonths > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / termMonths;
      } else {
        monthlyPayment =
          (loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
          (Math.pow(1 + monthlyRate, termMonths) - 1);
      }
    }

    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = Math.max(totalPayment - loanAmount, 0);

    return {
      price,
      downPayment,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [customPrice, downPaymentPercent, termMonths, annualRate]);

  const currentVehicle = vehicles.find((v) => v.id === vehicleId);

  return (
    <section id="financiamiento" className="section finance-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Simulador Financiero</span>
          <h2 className="section-title">Calculadora de Financiamiento y Cuotas</h2>
          <p className="section-subtitle">
            Personaliza tu cuota inicial, plazo en meses y tasa referencial para estimar el
            plan de pagos de tu próximo 4x4, SUV o Pick-up.
          </p>
        </div>

        <div className="finance-grid">
          <div className="finance-card">
            <div style={{ display: 'grid', gap: '1.35rem' }}>
              <div className="field-group">
                <label htmlFor="calc-vehicle" className="field-label">
                  Seleccionar Vehículo del Inventario
                </label>
                <select
                  id="calc-vehicle"
                  className="field-select"
                  value={vehicleId}
                  onChange={handleVehicleChange}
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} ({v.year}) — ${v.price.toLocaleString('en-US')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="calc-price" className="field-label">
                  Valor del Vehículo (USD)
                </label>
                <input
                  id="calc-price"
                  type="number"
                  min="10000"
                  max="200000"
                  step="500"
                  className="field-input"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                />
              </div>

              <div className="field-group">
                <div className="range-header">
                  <label htmlFor="calc-downpayment" className="field-label">
                    Cuota Inicial ({downPaymentPercent}%)
                  </label>
                  <span className="range-value">
                    ${calculation.downPayment.toLocaleString('en-US')} USD
                  </span>
                </div>
                <input
                  id="calc-downpayment"
                  type="range"
                  min="15"
                  max="70"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                />
              </div>

              <div className="field-group">
                <div className="range-header">
                  <label htmlFor="calc-term" className="field-label">
                    Plazo del Crédito
                  </label>
                  <span className="range-value">{termMonths} meses</span>
                </div>
                <div className="category-pills">
                  {[12, 24, 36, 48, 60, 72].map((months) => (
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

              <div className="field-group">
                <div className="range-header">
                  <label htmlFor="calc-rate" className="field-label">
                    Tasa de Interés Anual Estimada (TEA)
                  </label>
                  <span className="range-value">{annualRate.toFixed(1)}%</span>
                </div>
                <input
                  id="calc-rate"
                  type="range"
                  min="5.5"
                  max="18.0"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="finance-summary">
            <div>
              <span className="card-brand">
                Resumen de Cotización •{' '}
                {currentVehicle
                  ? `${currentVehicle.brand} ${currentVehicle.model}`
                  : 'Personalizado'}
              </span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '0.25rem' }}>
                Cuota Mensual Estimada
              </h3>

              <div className="monthly-quote-box">
                <div className="monthly-amount">
                  ${calculation.monthlyPayment.toLocaleString('en-US')}{' '}
                  <span style={{ fontSize: '1rem', fontWeight: 500 }}>/ mes</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Durante {termMonths} meses con una tasa anual de {annualRate.toFixed(1)}%
                </p>
              </div>

              <div className="breakdown-list">
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Precio del vehículo</span>
                  <strong>${calculation.price.toLocaleString('en-US')} USD</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Inicial ({downPaymentPercent}%)
                  </span>
                  <strong>${calculation.downPayment.toLocaleString('en-US')} USD</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Monto a financiar</span>
                  <strong>${calculation.loanAmount.toLocaleString('en-US')} USD</strong>
                </div>
                <div className="breakdown-row">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Intereses totales estimados
                  </span>
                  <strong>${calculation.totalInterest.toLocaleString('en-US')} USD</strong>
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
                  `Pre-aprobación: Inicial $${calculation.downPayment.toLocaleString(
                    'en-US'
                  )} (${downPaymentPercent}%) a ${termMonths} meses (Cuota aprox. $${calculation.monthlyPayment.toLocaleString(
                    'en-US'
                  )}/mes).`
                )
              }
            >
              Solicitar Pre-Aprobación con este Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
