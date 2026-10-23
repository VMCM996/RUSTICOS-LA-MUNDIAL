/**
 * Cliente ligero para Supabase REST API (Zero-dependency).
 * Funciona automáticamente al definir NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
 * en .env.local, manteniendo fallback seguro a los datos locales si aún no están configurados.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes('tu-proyecto.supabase.co')
  );
}

/**
 * Inserta un lead en la tabla `public.leads` de Supabase desde el servidor.
 */
export async function insertLeadToSupabase(leadPayload) {
  if (!isSupabaseConfigured()) {
    return { persisted: false, reason: 'supabase_not_configured' };
  }

  const apiKey = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
  const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/leads`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(leadPayload),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => 'Unknown error');
    return { persisted: false, reason: errText };
  }

  return { persisted: true };
}

/**
 * Obtiene la URL pública de un archivo alojado en un bucket de Supabase Storage.
 * Ejemplo: getSupabaseStorageUrl('events-media', 'ruta-lago-2026/portada.webp')
 */
export function getSupabaseStorageUrl(bucket, filePath) {
  if (!SUPABASE_URL) return filePath;
  const cleanBase = SUPABASE_URL.replace(/\/$/, '');
  const cleanPath = String(filePath).replace(/^\//, '');
  return `${cleanBase}/storage/v1/object/public/${bucket}/${cleanPath}`;
}
