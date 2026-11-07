-- ============================================================================
-- ESQUEMA SUPABASE PARA RÚSTICOS LA MUNDIAL, C.A. (MARACAIBO — JEEP | DODGE | RAM)
-- Instrucciones: Copia y pega este script en el "SQL Editor" de tu proyecto
-- en Supabase (https://supabase.com/dashboard) y presiona "Run".
-- ============================================================================

-- 1. TABLA DE VEHÍCULOS (INVENTARIO)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY,
  brand TEXT NOT NULL CHECK (brand IN ('Jeep', 'Dodge', 'RAM')),
  model TEXT NOT NULL,
  trim TEXT,
  year INTEGER NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  category TEXT NOT NULL,
  drivetrain TEXT NOT NULL,
  transmission TEXT NOT NULL,
  engine TEXT NOT NULL,
  mileage INTEGER DEFAULT 0,
  condition TEXT NOT NULL DEFAULT 'Nuevo' CHECK (condition IN ('Nuevo', 'Seminuevo Certificado')),
  fuel TEXT DEFAULT 'Gasolina',
  color TEXT,
  seats INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  badge TEXT,
  short_description TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABLA DE EVENTOS MULTIMEDIA (VIDEOS, GALERÍA DE FOTOS Y RESEÑAS)
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Lanzamientos', 'Rutas 4x4', 'Exhibición VIP')),
  event_date TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Showroom Oficial Maracaibo',
  featured BOOLEAN DEFAULT false,
  has_video BOOLEAN DEFAULT false,
  video_url TEXT, -- Acepta URL de Supabase Storage (.mp4) o link de YouTube
  video_duration TEXT,
  cover_image TEXT NOT NULL,
  summary TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABLA DE LEADS (SOLICITUDES DE TEST DRIVE, COTIZACIÓN Y FINANCIAMIENTO)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  vehicle_id TEXT REFERENCES public.vehicles(id) ON DELETE SET NULL,
  request_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  comments TEXT,
  status TEXT NOT NULL DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'contactado', 'agendado', 'cerrado', 'descartado')),
  client_ip TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger automático para mantener updated_at al día en public.vehicles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_vehicles_updated_at ON public.vehicles;
CREATE TRIGGER set_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública únicamente para vehículos y eventos publicados
CREATE POLICY "Lectura publica de vehiculos publicados"
  ON public.vehicles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Administradores gestionan vehiculos"
  ON public.vehicles FOR ALL
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role');

CREATE POLICY "Lectura publica de eventos publicados"
  ON public.events FOR SELECT
  USING (is_published = true);

CREATE POLICY "Administradores gestionan eventos"
  ON public.events FOR ALL
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- Políticas para Leads: Inserción desde API / público, pero LECTURA BLOQUEADA al público
-- (Solo administradores autenticados del concesionario o service_role pueden ver/editar leads)
CREATE POLICY "Insercion publica de leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Solo administradores leen leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role');

CREATE POLICY "Solo administradores editan leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- ============================================================================
-- SUPABASE STORAGE: BUCKETS PARA IMÁGENES Y VIDEOS CORTOS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'vehicles-media',
    'vehicles-media',
    true,
    10485760, -- Límite 10 MB por foto (recomendado WebP/AVIF)
    ARRAY['image/webp', 'image/avif', 'image/jpeg', 'image/png']
  ),
  (
    'events-media',
    'events-media',
    true,
    26214400, -- Límite 25 MB (fotos de eventos y clips cortos MP4)
    ARRAY['image/webp', 'image/avif', 'image/jpeg', 'image/png', 'video/mp4', 'video/webm']
  )
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Acceso publico de lectura a vehicles-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vehicles-media');

CREATE POLICY "Solo autenticados suben a vehicles-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicles-media');

CREATE POLICY "Solo autenticados actualizan en vehicles-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicles-media');

CREATE POLICY "Solo autenticados borran en vehicles-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicles-media');

CREATE POLICY "Acceso publico de lectura a events-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'events-media');

CREATE POLICY "Solo autenticados suben a events-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'events-media');

CREATE POLICY "Solo autenticados actualizan en events-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'events-media');

CREATE POLICY "Solo autenticados borran en events-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'events-media');
