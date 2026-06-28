# HANDOFF: Barda — Identidad Oficial
## Implementación de sitio web | Especificaciones técnicas y de diseño

**Proyecto:** Estudio Barda — Arquitectura  
**Fecha:** 2026  
**Contacto:** hola@estudiobarda.ar  

---

## 🎯 OBJETIVO

Implementar un sitio web totalmente funcional y responsive basado en el sistema de identidad visual de Barda. El sitio es una **arquitectura de información bilingüe** (ES/EN), con navegación multicanal, grid dinámico de proyectos, y un sistema de planos modulares como leitmotiv visual.

---

## 📐 SISTEMA DE IDENTIDAD VISUAL

### Colores oficiales (manual 2026)

| Rol | Nombre | Hex | Oklch | Uso |
|-----|--------|-----|-------|-----|
| **Primario** | Ladrillo | `#E24F05` | `oklch(0.56 0.26 35)` | Accents, CTA, detalles |
| **Primario desat.** | Ladrillo Desat | `#DD7845` | `oklch(0.60 0.18 40)` | Isotipo superior, variantes |
| **Fondo claro** | Arena | `#F8F0E5` | `oklch(0.95 0.015 85)` | Bg light mode |
| **Gris neutral** | Gris Piedra | `#949491` | `oklch(0.60 0.02 80)` | Elemento modular, texto soft |
| **Gris oscuro** | Hormigón | `#6B6B6E` | `oklch(0.45 0.01 75)` | Elemento modular, texto |
| **Negro puro** | Hierro | `#0F0F10` | `oklch(0.06 0.01 300)` | Bg oscuro, tipografía principal |

### Tipografía

- **Sans (Inter):** headings, body, UI
  - Pesos: 300 (light), 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold), 800 (extra-bold)
  - Letter-spacing: `-0.035em` a `-0.05em` en headings
  - Line-height: `0.9` a `1.0` en headings, `1.45` a `1.55` en body

- **Mono (IBM Plex Mono):** labels, nav, utilidades
  - Pesos: 300, 400, 500
  - Font-size: `9.5px` a `11px` típicamente
  - Letter-spacing: `0.04em` a `0.16em`
  - Text-transform: uppercase

### Composición espacial

- **Padding horizontal:** `clamp(20px, 3vw, 56px)` (responsive, mobile to desktop)
- **Gap entre columnas:** `24px` (flex/grid)
- **Divisores:** `1px solid rgba(15,15,16,0.14)` (light mode), `rgba(248,240,229,0.14)` (dark)

---

## 🏗️ ARQUITECTURA DE CONTENIDO

### Rutas principales (React/Single-page)

1. **`/` (index)**
   - Hero manifestático con composición interactiva de planos (mouse-reactive)
   - Stats strip (4 columnas: 47+, 8yr, 12, 6.4km²)
   - Grid dinámico de proyectos (filtrable, 2/3/4 cols, list view)
   - Sección modular (diagrama + sistema)
   - Footer

2. **`/studio`**
   - Sección Modular (expandida)
   - 6 servicios en grid (Vivienda, Refacción, Comercial, Cultural, Concursos, Urbano)
   - Footer

3. **`/process`**
   - 4 fases: Escucha → Anteproyecto → Proyecto → Obra
   - Cada fase como card con título + descripción

4. **`/contact`**
   - Héroe tipo "llamada a acción"
   - Contacto: email, teléfono, Instagram, ubicación

### Detalle de proyecto (overlay modal)

- Abre al hacer click en una card
- Hero image full-width (70vh)
- Specs grid (2 cols)
- Gallery de 6 tiles modulares
- Next bar (siguiente proyecto)
- Esc para cerrar

---

## 🎨 COMPONENTES CLAVE

### 1. Logo System (Isotipo)

```
Construcción modular:
┌──────────┐
│ TOP      │  Ladrillo Desat (#DD7845) — plano superior derecha
└──────────┘
             [gap = visibilidad de fondo]
┌──────────┐
│          │  Ladrillo (#E24F05) — plano inferior full
└──────────┘

ViewBox: 20×12 (ratio ≈ 5:3)
```

**Variantes:**
- `color`: default (ladrillo/desat)
- `mono-dark`: sobre fondo claro (hormigón/hierro)
- `mono-light`: sobre fondo oscuro (blanco/gris piedra)
- `mono-white`: sobre ladrillo (dos claros)
- `mono-black`: 1-color sólido

**Logotipo horizontal:**
Isotipo + "BARDA" (Inter 800) + "ARQUITECTURA" (Inter 700) apilado

### 2. Hero interactivo

- Lado izquierdo: Manifiesto (h1 balanceado, meta, stats)
- Lado derecho: 5 planos flotantes (`p1–p5`)
  - Responden a mouse (parallax)
  - Respiran en idle (animaciones keyframe)
  - Colores: ladrillo, desat, piedra, hierro, outline
  - Positions: específicas (ej. p1: 12% left, 14% top, 28% width, 44% height)
  - Profundidades: `--depth` de 6 a 32 (parallax factor)

### 3. Grid de proyectos

**Card (grid view):**
- Meta top: índice + año | ubicación
- Frame: imagen placeholder con gradient + línea ladrillo
- Corner badge: tipo
- Pin: dot ladrillo
- Body: nombre + arrows hover, meta (superficie, estado)
- BG: paleta tintada (arena, desat, piedra, hormigón, ladrillo, arena)

**List row:**
- Columns: idx (60px) | nombre (1.4fr) | tipo/lugar (1fr) | superficie (0.8fr) | año/estado (0.8fr) | arrow (60px)
- Hover: light bg shift

**Filtros:**
- 8 tipos: Todos, Residencial, Refacción, Comercial, Cultural, Concurso, Ampliación, Remodelación

### 4. Sección Modular (Sistema de planos)

Dos columnas:
- **Texto:** h3 + 2 párrafos + grid de 6 valores (bullets ladrillo)
- **Diagrama:** grid 12×12 con 5 planos posicionados + grid-bg sutil

### 5. Detail overlay

- Full-screen, scrollable
- Detail bar sticky (← Índice | Title/Year | Siguiente →)
- Hero image (70vh)
- Body: 2 cols (h2, lede, specs grid)
- Gallery: 6 tiles (spans variables: 3, 3, 2, 4, 3, 3)
- Next bar con CTA

---

## 🎛️ MODOS / TEMAS

Botones en bottom-left (fijo):

| Theme | Body class | BG | Ink | Uso |
|-------|------------|----|----|-----|
| **Light** | *(default)* | `#F8F0E5` | `#0F0F10` | Arena |
| **Stone** | `.theme-stone` | `#949491` | `#F8F0E5` | Piedra |
| **Dark** | `.theme-dark` | `#0F0F10` | `#F8F0E5` | Hierro |

CSS variables adaptables por tema (revisar `styles-v2.css` líneas 12–52).

---

## 📱 RESPONSIVE

- **Mobile:** 1 columna
- **Tablet (600–900px):** 2 columnas (cols-3/4 → cols-2)
- **Desktop:** 2, 3, o 4 columnas (configurable)

---

## 📊 DATOS DE PROYECTOS

**12 proyectos placeholder** en `data.js`:

```javascript
{
  id: "casa-patagones",
  name: "Casa Patagones",
  nameEn: "Patagones House",
  year: "2025",
  location: "Río Negro, AR",
  type: "Residencial",
  typeEn: "Residential",
  status: "En obra",
  statusEn: "In construction",
  surface: "180 m²",
  bg: "oklch(0.62 0.05 65)",
  accent: "oklch(0.45 0.08 40)",
  desc: "...",
  descEn: "..."
}
```

**Campos obligatorios:** id, name, nameEn, year, location, type, typeEn, status, statusEn, surface, bg, desc, descEn

---

## 🔧 STACK TÉCNICO ACTUAL

- **HTML5** (canonical form, explicit closes)
- **React 18** (CDN UMD + Babel)
- **CSS3** (variables, grid, flex, animations, keyframes)
- **Fuentes:** Google Fonts (Inter, IBM Plex Mono)

**Archivo HTML:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Barda · Arquitectura — Identidad oficial</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="..."></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="..."></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="..."></script>
</head>
<body style="font-family: Inter">
  <div id="root"></div>
  <script src="data.js"></script>
  <script type="text/babel" src="app.jsx"></script>
</body>
</html>
```

---

## 🚀 TAREAS PRIORITARIAS PARA IMPLEMENTACIÓN

### Fase 1: Fundamentos
- [ ] Refactorizar CSS en módulos (reset, vars, layout, components, theme)
- [ ] Crear componentes React base (Isotipo, Logo, UtilityBar, TopBar, Footer)
- [ ] Sistema de rutas (simple state-based o Router)
- [ ] Datos en estructura limpia (data.js)

### Fase 2: Vistas principales
- [ ] Página index completa (Hero, Stats, Grid, Modular)
- [ ] Studio, Process, Contact routes
- [ ] Detail overlay (modal de proyecto)
- [ ] Filtrado dinámico + view toggle

### Fase 3: Interactividad
- [ ] Mouse-reactive hero (planos parallax + proximity)
- [ ] Tema switcher (light/stone/dark)
- [ ] Hover states (cards, nav, CTAs)
- [ ] Scroll behaviors

### Fase 4: Polish & SEO
- [ ] Meta tags (title, description, OG, favicon)
- [ ] Accessibility (aria labels, focus states, keyboard nav)
- [ ] Performance (lazy loading images, font optimization)
- [ ] Print styles (detail view)

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] HTML válido (W3C)
- [ ] CSS no tiene !important excepto overrides intencionales
- [ ] Fuentes cargan sin FOUT
- [ ] Grid responsive funciona en 320px–2560px
- [ ] Temas (light/stone/dark) aplican correctamente
- [ ] Overlay detail abre/cierra sin saltos
- [ ] Nav es bilingüe (ES/EN) y sincroniza
- [ ] Hero interactivo funciona en mouse + reduce-motion respeta
- [ ] Performance: Lighthouse 90+

---

## 📎 ARCHIVOS ENTREGADOS

1. `Barda - Identidad Oficial.html` — Punto de entrada (current dev)
2. `styles-v2.css` — Sistema completo de estilos (900+ líneas)
3. `app-v2.jsx` — Lógica React (687 líneas)
4. `data.js` — Datos bilingües de proyectos (254 líneas)
5. **HANDOFF_CLAUDE_CODE.md** — Este documento

---

## 💬 PREGUNTAS / DECISIONES ABIERTAS

1. **Backend / CMS:** ¿Integración con Strapi, Contentful, o datos static?
2. **Imágenes:** ¿Placeholder SVGs o esperando assets reales?
3. **Hosting:** Vercel, Netlify, servidor propio?
4. **Analytics:** GA4, Segment, custom?
5. **Formulario de contacto:** Integration con nodemailer, Formspree, etc.?

---

## 🎓 NOTAS PARA EL DESARROLLADOR

- **Diseño no es responsive "por casualidad":** cada breakpoint, cada espaciado ha sido pensado. Revisar `styles-v2.css` líneas 28–30 y media queries líneas 680–690.
- **Paleta limitada, intencional:** los colores no son random. Cada uno viene del manual 2026.
- **Sistema de planos es una metáfora:** los rectángulos flotantes, los grids, las modulaciones son el ADN visual de Barda. Mantener esa coherencia en cualquier expansión.
- **Bilingüismo es transparente:** revisar cómo React maneja `lang` state en lugar de rutas `/es/` y `/en/`.
- **Performance > perfección gráfica:** hero interactivo usa RAF + custom properties, no D3 ni Three.js. Mantener esa filosofía.

---

**Listo para implementación. ¿Preguntas?**
