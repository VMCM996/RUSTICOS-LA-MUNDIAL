# Rústicos Motors — Concesionario Oficial Jeep | Dodge | RAM

Portal web desarrollado con **Next.js (App Router)**, **React 18** y **CSS Moderno Nativo** (Variables CSS, CSS Grid, Flexbox, `clamp()` y diseño responsivo sin dependencias de frameworks CSS externos).

## Características Principales

1. **Catálogo Multimarca Interactivo (`Jeep`, `Dodge`, `RAM`)**:
   - Buscador en tiempo real por marca, modelo, versión (trim), tracción o motor.
   - Filtros combinables por marca, categoría (`4x4 Todo Terreno`, `Muscle & Performance`, `Camioneta Pick-up`, `SUV Familiar`) y rango de precio máximo.
   - Sincronización directa con los accesos rápidos de marca en el Header, sección de líneas y banners promocionales.
2. **Modal de Vista Detallada de Vehículo**:
   - Galería interactiva con miniaturas intercambiables.
   - Ficha técnica completa (motor, tracción, capacidad de remolque, altura libre al suelo, garantía oficial y equipamiento destacado).
   - Accesibilidad con cierre mediante tecla `Escape`, bloqueo de scroll de fondo y conexión directa con la calculadora de financiamiento o agendamiento de Test Drive.
3. **Calculadora de Financiamiento y Cuotas**:
   - Simulación en tiempo real seleccionando cualquier vehículo del inventario o ingresando un monto personalizado.
   - Ajuste de porcentaje de cuota inicial (15% a 70%), plazo (12 a 72 meses) y tasa de interés anual estimada (TEA).
   - Envío directo del plan calculado al formulario de contacto.
4. **Formulario de Contacto y Agendamiento de Test Drive (`/api/lead`)**:
   - Validación en cliente y servidor con protección anti-spam (Honeypot + control de velocidad de envío + Rate-Limiting por IP).
   - Consentimiento de Políticas de Privacidad y Términos y Condiciones, e integración de eventos con Google Analytics 4 bajo Consent Mode (`CookieBanner`).

## Estructura del Proyecto

```text
RUSTICOS/
├── .env.example
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── README.md
└── src/
    ├── app/
    │   ├── api/lead/route.js
    │   ├── privacidad/page.js
    │   ├── terminos/page.js
    │   ├── globals.css
    │   ├── icon.svg
    │   ├── layout.js
    │   ├── not-found.js
    │   ├── opengraph-image.js
    │   ├── page.js
    │   ├── robots.js
    │   └── sitemap.js
    ├── components/
    │   ├── BrandLineup.jsx
    │   ├── BrandLogo.jsx
    │   ├── CatalogSection.jsx
    │   ├── CookieBanner.jsx
    │   ├── FinanceCalculator.jsx
    │   ├── Footer.jsx
    │   ├── GoogleAnalytics.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── PromoBanners.jsx
    │   ├── TestDriveForm.jsx
    │   ├── TrustBar.jsx
    │   ├── VehicleCard.jsx
    │   └── VehicleModal.jsx
    └── data/
        └── vehicles.js
```

## Cómo ejecutar el proyecto

1. Abre una terminal en la carpeta del proyecto:
   ```bash
   cd C:\Users\VICTOR\Desktop\RUSTICOS
   ```
2. Copia el archivo `.env.example` a `.env.local` y configura tus variables:
   ```bash
   cp .env.example .env.local
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
