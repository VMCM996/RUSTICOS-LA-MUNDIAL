import { NextResponse } from 'next/server';
import { VEHICLES } from '@/data/vehicles';
import { insertLeadToSupabase } from '@/lib/supabase';

// Control de Rate-Limiting en memoria con limpieza automática y límite de entradas
const rateLimitMap = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 4;
const MAX_TRACKED_IPS = 1000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s()-]{8,18}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const ALLOWED_REQUEST_TYPES = new Set([
  'Test Drive Presencial',
  'Cotización y Financiamiento',
  'Servicio Técnico / Repuestos Mopar',
  'Retoma de Vehículo',
]);
const ALLOWED_VEHICLE_IDS = new Set(VEHICLES.map((v) => v.id));

function isValidFutureOrTodayDate(dateStr) {
  if (!DATE_REGEX.test(dateStr)) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return false;
  }

  // Permitimos desde la fecha actual en huso horario de Venezuela (UTC-4)
  const nowVe = new Date(Date.now() - 4 * 60 * 60 * 1000);
  const todayVeStr = nowVe.toISOString().split('T')[0];
  return dateStr >= todayVeStr;
}

function cleanupExpiredRateLimits(now) {
  for (const [key, val] of rateLimitMap.entries()) {
    if (now - val.startTime > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
  while (rateLimitMap.size >= MAX_TRACKED_IPS) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (!oldestKey) break;
    rateLimitMap.delete(oldestKey);
  }
}

export async function POST(request) {
  try {
    const now = Date.now();
    cleanupExpiredRateLimits(now);

    const ip =
      request.headers.get('x-real-ip')?.trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'local-client';

    const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > WINDOW_MS) {
      record.count = 0;
      record.startTime = now;
    }

    record.count += 1;
    rateLimitMap.set(ip, record);

    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Has enviado demasiadas solicitudes en poco tiempo. Por favor espera un minuto.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      vehicleId,
      requestType,
      preferredDate,
      comments,
      acceptTerms,
      website_url, // Campo Honeypot anti-bots
      formLoadedAt, // Marca de tiempo anti-bots obligatoria
    } = body;

    // 1. Protección SPAM Honeypot: si el campo oculto tiene valor, descartamos silenciosamente
    if (website_url && String(website_url).trim().length > 0) {
      return NextResponse.json({ ok: true, spamFiltered: true }, { status: 200 });
    }

    // 2. Protección SPAM por velocidad de envío (< 1.5 segundos o timestamp ausente/inválido)
    const loadedTimestamp = Number(formLoadedAt);
    if (!Number.isFinite(loadedTimestamp) || now - loadedTimestamp < 1500) {
      return NextResponse.json(
        { ok: false, error: 'Envío automatizado detectado. Intenta nuevamente.' },
        { status: 400 }
      );
    }

    // 3. Validaciones estrictas de campos en servidor
    const cleanName = String(fullName || '').trim();
    const cleanPhone = String(phone || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanDate = String(preferredDate || '').trim();

    if (cleanName.length < 3 || cleanName.length > 90) {
      return NextResponse.json(
        { ok: false, error: 'Por favor ingresa un nombre y apellido válido.' },
        { status: 400 }
      );
    }

    if (!PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Ingresa un número telefónico válido (mínimo 9 dígitos).',
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: 'Ingresa un correo electrónico válido.' },
        { status: 400 }
      );
    }

    if (!isValidFutureOrTodayDate(cleanDate)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Selecciona una fecha preferida válida (hoy o posterior) para tu cita.',
        },
        { status: 400 }
      );
    }

    if (acceptTerms !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Debes aceptar la Política de Privacidad y los Términos y Condiciones.',
        },
        { status: 400 }
      );
    }

    const safeVehicleId = ALLOWED_VEHICLE_IDS.has(vehicleId)
      ? vehicleId
      : VEHICLES[0]?.id;
    const safeRequestType = ALLOWED_REQUEST_TYPES.has(requestType)
      ? requestType
      : 'Test Drive Presencial';
    const cleanComments = String(comments || '').trim().slice(0, 500);
    const leadId = `LEAD-${now.toString(36).toUpperCase()}`;

    // Persistencia en Supabase (con fallback seguro si aún no está configurado)
    let supabaseResult = { persisted: false };
    try {
      supabaseResult = await insertLeadToSupabase({
        lead_code: leadId,
        full_name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        vehicle_id: safeVehicleId,
        request_type: safeRequestType,
        preferred_date: cleanDate,
        comments: cleanComments || null,
        client_ip: ip,
      });
    } catch {
      supabaseResult = { persisted: false, reason: 'network_error' };
    }

    const hasCrmSecret = Boolean(process.env.CRM_WEBHOOK_SECRET_KEY);

    return NextResponse.json(
      {
        ok: true,
        leadId,
        persisted: supabaseResult.persisted,
        crmConnected: hasCrmSecret,
        summary: {
          fullName: cleanName,
          vehicleId: safeVehicleId,
          requestType: safeRequestType,
          preferredDate: cleanDate,
          comments: cleanComments,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Error procesando la solicitud. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}
