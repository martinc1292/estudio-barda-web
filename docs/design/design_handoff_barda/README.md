# Handoff: Barda Arquitectura — Sitio web (Identidad oficial v3)

## Overview
Sitio web de una sola página (single-page) para **Estudio Barda — Arquitectura**, basado en su Manual de Identidad Visual 2026. Incluye: hero interactivo con planos reactivos al mouse, strip de estadísticas, grid filtrable de proyectos (con vista lista), overlay de detalle de proyecto, sección modular, y conmutador de temas (light / stone / dark). Bilingüe ES/EN gestionado por estado (no por rutas).

---

## ⚠️ Sobre los archivos de este paquete (LÉEME PRIMERO)
Los archivos incluidos (`index.html`, `styles-v3.css`, `app-v3.jsx`, `data.js`) son una **referencia de diseño construida en HTML + React (CDN/Babel)** — un prototipo que muestra el aspecto e interacción finales, **no código de producción para copiar tal cual**.

La tarea es **recrear este diseño dentro del entorno del codebase de destino** (Next.js, Vite/React, Astro, etc.) usando sus patrones y librerías establecidos. Si todavía no existe un codebase, elige el framework más apropiado (recomendado: **Next.js o Vite + React**, ya que el prototipo ya es React) e impleméntalo allí.

**Cómo abrir el prototipo tal cual:** sírvelo con un servidor estático desde la carpeta del paquete (p. ej. `npx serve design_handoff_barda` y abre `index.html`). No abrir con `file://` — las fuentes y `fetch` de Babel fallarán.

---

## Fidelidad
**Alta fidelidad (hifi).** Colores, tipografía, espaciados, animaciones e interacciones son finales y están pensados al detalle. Reproducir pixel-perfect usando las librerías/patrones del codebase de destino. Las imágenes de proyecto son placeholders generados por CSS (gradientes tintados) — sustituir por fotografía real cuando esté disponible.

---

## Estructura del prototipo
- **`index.html`** — punto de entrada. Carga `styles-v3.css`, `data.js` y `app-v3.jsx` (este último vía Babel `text/babel`).
- **`styles-v3.css`** — sistema completo de estilos: `@font-face` locales, variables CSS por tema, layout y componentes (~910 líneas).
- **`app-v3.jsx`** — toda la lógica React en un archivo (~690 líneas): logo system, hero, grid, overlay, temas, i18n.
- **`data.js`** — datos bilingües de proyectos (`PROJECTS`) y textos (`COPY`), expuestos como globals.
- **`uploads/`** — fuentes `.ttf` locales (Neue Haas Display + IBM Plex Mono). Rutas relativas referenciadas desde `styles-v3.css`.
- **`assets/`** — PNGs de logo vertical/horizontal (negro y ladrillo).
- **`Manual de identidad visual - Barda.pdf`** — fuente de verdad de marca.

---

## Design tokens

### Colores oficiales (Manual 2026)
| Rol | Nombre | Hex | Oklch |
|-----|--------|-----|-------|
| Primario | Ladrillo | `#E24F05` | `oklch(0.56 0.26 35)` |
| Primario desaturado | Ladrillo Desat | `#DD7845` | `oklch(0.60 0.18 40)` |
| Fondo claro | Arena | `#F8F0E5` | `oklch(0.95 0.015 85)` |
| Gris neutral | Gris Piedra | `#949491` | `oklch(0.60 0.02 80)` |
| Gris oscuro | Hormigón | `#6B6B6E` | `oklch(0.45 0.01 75)` |
| Negro | Hierro | `#0F0F10` | `oklch(0.06 0.01 300)` |

Las variables CSS reales (`--bg`, `--ink`, `--ladrillo`, `--rule`, etc.) viven en `styles-v3.css` y se **redefinen por tema** (ver Temas). Tomar los valores exactos de ahí; no inventar.

### Tipografía
- **Sans — "Neue Haas Display"** (local, `uploads/*.ttf`): headings, body, UI. Pesos usados: 100/200/300/400/500/700/900 + italics 400/500.
  - Headings: `font-weight: 500`, `letter-spacing` negativo, `line-height` ~0.9–1.0.
  - Tamaños fluidos: `clamp(40px, 5.4vw, 88px)` (h1 hero), `clamp(28px, 3vw, 44px)` (h2/h3), `clamp(40px, 6vw, 92px)` (footer big).
- **Mono — "IBM Plex Mono"** (local, `uploads/*.ttf`): labels, nav, utilidades. Pesos 300/400/500/600.
  - `font-size` 9.5–11px, `letter-spacing` 0.04–0.16em, `text-transform: uppercase`.

> Nota de licencia: IBM Plex Mono es OFL (libre). **Neue Haas Display es comercial** — el cliente debe poseer la licencia web para producción; el dev debe confirmar el derecho de uso o sustituir por la alternativa licenciada antes de publicar.

### Espaciado y reglas
- Padding horizontal global: `--pad-x: clamp(20px, 3vw, 56px)`.
- Gap entre columnas: `24px`.
- Divisores: `--rule` = `1px solid rgba(15,15,16,0.14)` en light (se adapta por tema).

---

## Temas
Botones fijos abajo-izquierda. Se aplican como clase en `<body>`:
| Theme | Body class | BG | Ink |
|-------|-----------|----|----|
| Light (default) | — | Arena `#F8F0E5` | Hierro `#0F0F10` |
| Stone | `.theme-stone` | Piedra `#949491` | Arena |
| Dark | `.theme-dark` | Hierro `#0F0F10` | Arena |

El logo de la TopBar cambia según tema: `assets/logo-v-negro.png` en light, `assets/logo-v-ladrillo.png` en stone/dark. Cada tema redefine el bloque de variables CSS en `styles-v3.css` (`:root` y `.theme-*`).

---

## Screens / Views

### 1. Hero (interactivo)
- **Layout:** 2 columnas. Izquierda = manifiesto (tag mono + h1 fluido balanceado + meta). Derecha = composición de **5 planos flotantes** (`p1`–`p5`).
- **Interacción:** los planos hacen parallax siguiendo el mouse (cada uno con `--depth` 6–32 como factor) y "respiran" en idle con keyframes. Posiciones absolutas específicas por plano (ej. p1: left 12%, top 14%, width 28%, height 44%). Colores: ladrillo, desat, piedra, hierro, outline.
- **Implementación:** usar `requestAnimationFrame` + custom properties CSS. **No** D3/Three.js. Respetar `prefers-reduced-motion` (desactivar parallax/breathing).

### 2. Stats strip
- 4 columnas con divisores verticales. Valor grande (sans 500, `clamp(32px,3.4vw,52px)`) + label mono uppercase. Datos: ej. `47+`, `8yr`, `12`, `6.4km²`.

### 3. Grid de proyectos
- **Header de sección:** número índice mono + h2 + meta + controles (filtros y toggle grid/list).
- **Filtros:** 8 tipos (Todos, Residencial, Refacción, Comercial, Cultural, Concurso, Ampliación, Remodelación). Filtran `PROJECTS` por `type`.
- **View toggle:** grid (2/3/4 cols configurable, responsive) ↔ list.
- **Card (grid):** meta top (índice+año | ubicación) · frame con placeholder (gradient tintado por proyecto + línea ladrillo) · corner badge (tipo) · pin dot ladrillo · body (nombre + arrows en hover, meta: superficie/estado). Click → abre overlay de detalle.
- **List row:** columnas `idx 60px | nombre 1.4fr | tipo·lugar 1fr | superficie 0.8fr | año·estado 0.8fr | arrow 60px`. Hover: shift de fondo, arrow → ladrillo.

### 4. Detail overlay (modal de proyecto)
- Full-screen scrollable. Barra sticky superior: `← Índice | Título/Año | Siguiente →`. **Esc cierra.**
- Hero image full-width (70vh). Body 2 cols: h2 + lede + specs grid. Gallery de 6 tiles modulares (spans variables: 3,3,2,4,3,3). Next-bar con CTA al siguiente proyecto.

### 5. Sección Modular
- 2 columnas. Texto: h3 + 2 párrafos + grid 6 valores con bullets ladrillo. Diagrama: grid 12×12 con 5 planos posicionados sobre un grid-bg sutil. Es el leitmotiv visual de la marca (mantener coherencia).

### 6. Footer
- "Big" wordmark (sans 500, `clamp(40px,6vw,92px)`) + columnas mono (contacto, social, ubicación). Email: `hola@estudiobarda.ar`.

---

## Logo system (en `app-v3.jsx`)
Construido como SVG inline además de los PNGs. Isotipo = dos planos rectangulares desplazados (inferior ladrillo `#E24F05`, superior desat `#DD7845`, con gap). ViewBox 20×12 (~5:3). Variantes de color en el objeto `BD_VARIANTS`:
- `color` (top desat / bot ladrillo), `mono-dark`, `mono-light`, `mono-white`, `mono-black`.
- Logotipo horizontal = isotipo + "BARDA" (sans 800) + "ARQUITECTURA" (sans 700). Versión vertical también disponible.

Reproducir el isotipo como componente vectorial (no rasterizar) para que escale y herede color por tema.

---

## State & datos
Estado principal (en el componente raíz de `app-v3.jsx`):
- `lang` ("es"/"en") — i18n por estado, textos en `COPY` y campos `*En` de cada proyecto.
- `theme` ("light"/"stone"/"dark").
- `filter` (tipo activo), `view` ("grid"/"list"), `cols` (2/3/4).
- `openProject` (id o null) — controla el overlay; `Esc` lo cierra; calcula "siguiente".
- `mouse` (x,y) para el parallax del hero.

**Modelo de proyecto** (`data.js`, 12 placeholders):
```js
{
  id, name, nameEn, year, location,
  type, typeEn, status, statusEn, surface,
  bg, accent,        // oklch() para el placeholder tintado
  desc, descEn
}
```

---

## Responsive
- Mobile: 1 columna. Tablet (600–900px): 2 columnas. Desktop: 2/3/4 cols configurable. `--pad-x` fluido. Verificar 320px–2560px.

---

## Interacciones / animaciones a portar
- Hero parallax + breathing (RAF + custom props, respeta reduce-motion).
- Theme switcher (3 temas, persiste opcionalmente en `localStorage`).
- Filtrado + toggle grid/list/cols sin recarga.
- Overlay de detalle: abrir/cerrar suave, navegación a siguiente, `Esc`.
- Hover states en cards, nav, CTAs, list rows.

---

## Decisiones abiertas (confirmar con cliente)
1. Backend/CMS: estático vs. headless (Strapi/Contentful/Sanity) para proyectos.
2. Imágenes reales vs. placeholders.
3. Hosting (Vercel/Netlify/propio) y formulario de contacto (Formspree/serverless).
4. Licencia web de **Neue Haas Display** para producción.
5. Bilingüismo: mantener por estado o pasar a rutas `/es` `/en` (+ hreflang/SEO).

---

## Checklist de validación
- [ ] Fuentes locales cargan sin FOUT (preload de las críticas).
- [ ] 3 temas aplican correctamente todas las variables.
- [ ] Grid responsive 320–2560px; filtros y toggles OK.
- [ ] Overlay abre/cierra sin saltos; `Esc` y "siguiente" funcionan.
- [ ] Hero interactivo OK con mouse y respeta `prefers-reduced-motion`.
- [ ] i18n ES/EN consistente en toda la UI.
- [ ] Accesibilidad: foco visible, aria-labels, navegación por teclado.
- [ ] Meta/SEO/OG/favicon.
