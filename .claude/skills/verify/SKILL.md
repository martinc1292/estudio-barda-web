---
name: verify
description: How to verify UI changes in estudio-barda-web by driving the running app
---

# Verificación runtime — estudio-barda-web

## Handle

- Dev server: `next dev` en `http://localhost:3000`. Suele estar ya corriendo
  (chequear con `netstat -ano | grep :3000` antes de levantar otro).
- Si no corre: `npm run dev` desde la raíz.

## Drive

- Browser via playwright-skill (plugin): escribir script en el scratchpad y
  ejecutar `node run.js <script>` desde el directorio del skill
  (`~/.claude/plugins/cache/playwright-skill/playwright-skill/<ver>/skills/playwright-skill`).
- La home tiene un intro/overlay al cargar: esperar ~4s tras `networkidle`
  antes de interactuar.
- Temas: los botones `.theme-switcher button` togglean clases `theme-stone` /
  `theme-dark` en `<body>` (default arena = sin clase).
- `/studio` (Sanity embebido) oculta navbar/footer/switcher — sirve para
  probar renders condicionales.

## Gotcha: favicon.ico debe llevar PNGs RGBA

El decoder ICO de Turbopack rechaza PNGs embebidos sin canal alfa
("The PNG is not in RGBA format!") y la home entera pasa a servir la
página de error. Los screenshots de Playwright de páginas opacas salen
RGB; renderizar vía `<canvas>.toDataURL('image/png')` siempre da RGBA.
Chequear con `file app/favicon.ico` que diga "RGBA".

## Gotcha: HMR de globals.css

El watcher de `next dev` en Windows a veces NO recompila `app/globals.css`
tras una edición (el TSX sí se recarga). Síntoma: el CSS servido en
`/_next/static/chunks/app_*.css` no refleja el cambio. Fix: forzar otro
cambio de contenido en el archivo (append + guardar, luego revertir).
Verificar con `curl` al chunk CSS que la regla nueva esté presente antes de
culpar al código.
