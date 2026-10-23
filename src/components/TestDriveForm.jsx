'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackGAEvent } from './GoogleAnalytics';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s()-]{8,18}$/;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584125554440';

function getLocalTodayStr() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
}

export default function TestDriveForm({
  vehicles,
  preselectedVehicle,
  prefilledNote,
}) {
  const [todayStr, setTodayStr] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicleId: vehicles[0]?.id || '',
    requestType: 'Test Drive Presencial',
    preferredDate: '',
    comments: '',
    acceptTerms: false,
    website_url: '', // Honeypot anti-SPAM (debe permanecer vacío)
  });

  const [formLoadedAt, setFormLoadedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  useEffect(() => {
    setFormLoadedAt(Date.now());
    setTodayStr(getLocalTodayStr());
  }, []);

  useEffect(() => {
    if (preselectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        vehicleId: preselectedVehicle.id,
      }));
    }
  }, [preselectedVehicle]);

  useEffect(() => {
    if (prefilledNote) {
      setFormData((prev) => ({
        ...prev,
        requestType: 'Cotización y Financiamiento',
        comments: prefilledNote,
      }));
    }
  }, [prefilledNote]);

  const validateForm = () => {
    const newErrors = {};
    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Ingresa tu nombre y apellido completo (mín. 3 caracteres).';
    }
    if (!PHONE_REGEX.test(formData.phone.trim())) {
      newErrors.phone = 'Ingresa un teléfono válido (ej. +58 412 555 4440).';
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Selecciona una fecha para tu cita.';
    } else if (formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'La fecha de la cita no puede ser anterior a hoy.';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        'Debes aceptar la Política de Privacidad y los Términos y Condiciones.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formLoadedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setServerError(data.error || 'No se pudo procesar tu solicitud.');
        setIsSubmitting(false);
        return;
      }

      const chosen = vehicles.find((v) => v.id === formData.vehicleId);
      trackGAEvent('generate_lead', {
        vehicle_brand: chosen?.brand,
        vehicle_model: chosen?.model,
        request_type: formData.requestType,
        value: chosen?.price || 0,
        currency: 'USD',
      });

      const vehicleTitle = chosen
        ? `${chosen.brand} ${chosen.model} (${chosen.year})`
        : 'Vehículo seleccionado';

      const waMessage = encodeURIComponent(
        `Hola equipo de Rústicos Motors Maracaibo, acabo de registrar la solicitud *${data.leadId}*:\n` +
          `• Nombre: ${formData.fullName}\n` +
          `• Solicitud: ${formData.requestType}\n` +
          `• Vehículo: ${vehicleTitle}\n` +
          `• Fecha preferida: ${formData.preferredDate}\n` +
          (formData.comments ? `• Nota: ${formData.comments}` : '')
      );

      setSubmittedLead({
        leadId: data.leadId,
        fullName: formData.fullName,
        requestType: formData.requestType,
        vehicleName: vehicleTitle,
        waUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
      });
    } catch {
      setServerError('Error de conexión. Verifica tu red e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="test-drive" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Atención Oficial en Venezuela</span>
          <h2 className="section-title">Agenda tu Test Drive o Solicita Cotización</h2>
          <p className="section-subtitle">
            Pon a prueba la potencia de nuestras unidades Jeep, Dodge y RAM o solicita
            evaluación para entregar tu vehículo actual a cuenta.
          </p>
        </div>

        <div className="contact-grid">
          <div className="info-card">
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                Showroom &amp; Centro de Servicio Autorizado
              </h3>
              <p style={{ color: 'var(--ram-chrome)', fontSize: '0.94rem' }}>
                Atención personalizada para ventas particulares, flotas corporativas,
                financiamiento a medida y repuestos originales Mopar®.
              </p>
            </div>

            <div className="info-item">
              <div className="info-badge">01</div>
              <div>
                <strong>Única Sede Oficial — Maracaibo</strong>
                <p style={{ color: 'var(--ram-chrome)', fontSize: '0.9rem' }}>
                  Av. 2 (El Milagro), Sector Norte, Showroom Oficial Jeep | Dodge | RAM,
                  Maracaibo, Estado Zulia, Venezuela.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-badge">02</div>
              <div>
                <strong>Horario de Atención</strong>
                <p style={{ color: 'var(--ram-chrome)', fontSize: '0.9rem' }}>
                  Lunes a Viernes: 8:30 AM – 6:00 PM <br />
                  Sábados: 9:00 AM – 4:00 PM
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-badge">03</div>
              <div>
                <strong>Canales Directos</strong>
                <p style={{ color: 'var(--ram-chrome)', fontSize: '0.9rem' }}>
                  WhatsApp Oficial:{' '}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20el%20inventario%20Jeep%20Dodge%20RAM`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--jeep-gold)', textDecoration: 'underline' }}
                  >
                    +58 (412) 555-4440
                  </a>
                  <br />
                  ventas@rusticosmotors.com
                </p>
              </div>
            </div>
          </div>

          <div className="form-card">
            {submittedLead && (
              <div className="alert-success" role="status">
                <strong>
                  ¡Solicitud confirmada! (Código: {submittedLead.leadId})
                </strong>
                <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Gracias, <strong>{submittedLead.fullName}</strong>. Nuestro equipo en
                  Maracaibo se comunicará contigo para coordinar tu{' '}
                  <strong>{submittedLead.requestType}</strong> del{' '}
                  <strong>{submittedLead.vehicleName}</strong>.
                </p>
                {submittedLead.waUrl && (
                  <a
                    href={submittedLead.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: '0.75rem', width: '100%' }}
                  >
                    Enviar Ficha Directo al WhatsApp de Ventas Maracaibo →
                  </a>
                )}
              </div>
            )}

            {serverError && (
              <div className="alert-error" role="alert">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Campo Honeypot Anti-SPAM (invisible para humanos) */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website_url">No llenar este campo</label>
                <input
                  id="website_url"
                  name="website_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid-2">
                <div className="field-group">
                  <label htmlFor="fullName" className="field-label">
                    Nombre y Apellido *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.fullName)}
                    className={`field-input ${errors.fullName ? 'input-error' : ''}`}
                    placeholder="Ej. Víctor Rodríguez"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <span className="field-error-msg" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="phone" className="field-label">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    aria-invalid={Boolean(errors.phone)}
                    className={`field-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="Ej. +58 412 555 4440"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="field-error-msg" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field-group">
                  <label htmlFor="email" className="field-label">
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    className={`field-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="field-error-msg" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="requestType" className="field-label">
                    Tipo de Solicitud
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    className="field-select"
                    value={formData.requestType}
                    onChange={handleChange}
                  >
                    <option value="Test Drive Presencial">
                      Agendar Test Drive (Prueba de Manejo)
                    </option>
                    <option value="Cotización y Financiamiento">
                      Cotización y Plan de Financiamiento
                    </option>
                    <option value="Retoma de Vehículo">
                      Entregar mi vehículo a cuenta
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field-group">
                  <label htmlFor="vehicleId" className="field-label">
                    Vehículo de Interés
                  </label>
                  <select
                    id="vehicleId"
                    name="vehicleId"
                    className="field-select"
                    value={formData.vehicleId}
                    onChange={handleChange}
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.brand} {v.model} ({v.year}) — ${v.price.toLocaleString('en-US')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="preferredDate" className="field-label">
                    Fecha Preferida de Cita *
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={todayStr}
                    required
                    aria-invalid={Boolean(errors.preferredDate)}
                    className={`field-input ${errors.preferredDate ? 'input-error' : ''}`}
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                  {errors.preferredDate && (
                    <span className="field-error-msg" role="alert">
                      {errors.preferredDate}
                    </span>
                  )}
                </div>
              </div>

              <div className="field-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="comments" className="field-label">
                  Comentarios o detalles de financiamiento
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="3"
                  maxLength={500}
                  className="field-textarea"
                  placeholder="Indica tu horario preferido o si deseas evaluar un vehículo como parte de pago..."
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>

              <div className="consent-check-group">
                <label className="consent-label">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <span>
                    He leído y acepto la{' '}
                    <Link href="/privacidad" className="legal-inline-link">
                      Política de Privacidad
                    </Link>{' '}
                    y los{' '}
                    <Link href="/terminos" className="legal-inline-link">
                      Términos y Condiciones
                    </Link>
                    . *
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="field-error-msg" role="alert">
                    {errors.acceptTerms}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.85rem' }}
              >
                {isSubmitting
                  ? 'Procesando Solicitud Segura...'
                  : 'Confirmar Solicitud y Agendar Cita →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
