# Plan de Desarrollo — Estudio Barda

Web del estudio de arquitectura de Joaquín Licera Vidal.
Stack: **Next.js 15 + TypeScript + Tailwind + Sanity CMS + next-intl + Framer Motion**, deploy en **Vercel**.

Cada fase es **autocontenida**: copiá el prompt al inicio de la fase en Claude Code, ejecutalo, verificá el resultado y recién ahí pasá a la siguiente.

---

## Contexto general (referencia)

**Cliente:** Estudio Barda / Joaquín Licera Vidal
**Ubicación:** CABA + zona norte GBA
**Email:** bardaarquitectura@gmail.com
**WhatsApp:** +54 9 221 571 8737 → `https://wa.me/5492215718737`
**Instagram:** @estudio_barda

**Estética:** minimalista, mucho espacio en blanco, imágenes protagonistas, textos cortos.
**Referencias:** biomaestudio.com, arquitetosassociados.arq.br, irarquitectura.com

**Idiomas:** Español (default) + Inglés
**Imágenes:** se cargan al final, usar placeholders.

---

## Fase 0 — Setup inicial del proyecto

**Objetivo:** Crear el proyecto Next.js, instalar dependencias, dejar el repo listo para empezar.

### Prompt para Claude Code

```
Iniciá un proyecto Next.js para el sitio web de "Estudio Barda" (estudio de arquitectura).

Setup:
1. Crear proyecto con: `npx create-next-app@latest barda-web --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"`
2. Instalar dependencias:
   - `npm install next-sanity @sanity/client @sanity/image-url @sanity/vision sanity`
   - `npm install next-intl`
   - `npm install framer-motion`
   - `npm install lucide-react` (para íconos)

3. Crear esta estructura de carpetas vacías (con archivos .gitkeep):
   - app/[locale]/proyectos
   - app/[locale]/proyectos/[slug]
   - app/[locale]/estudio
   - app/[locale]/servicios
   - app/[locale]/contacto
   - app/studio/[[...tool]]
   - components
   - sanity/schemas
   - sanity/lib
   - messages
   - i18n

4. Crear .env.local con variables placeholder:
   - NEXT_PUBLIC_SANITY_PROJECT_ID=""
   - NEXT_PUBLIC_SANITY_DATASET="production"
   - NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

5. Crear README.md con:
   - Nombre del proyecto
   - Stack
   - Comandos básicos (dev, build, start)
   - Variables de entorno necesarias

6. Hacer commit inicial con mensaje "chore: initial setup"

No crear contenido todavía, solo dejar la base limpia y funcionando con `npm run dev`.
```

### Verificación
- [ ] `npm run dev` levanta sin errores en localhost:3000
- [ ] Todas las carpetas creadas
- [ ] `.env.local` existe (vacío con placeholders)

---

## Fase 1 — Configuración de Sanity CMS

**Objetivo:** Dejar el CMS funcionando con los schemas definidos y panel embebido en `/studio`.

### Pasos previos (manual del usuario)
1. Crear cuenta en https://sanity.io (gratis)
2. Crear nuevo proyecto, copiar el `Project ID`
3. Pegar el ID en `.env.local` → `NEXT_PUBLIC_SANITY_PROJECT_ID`

### Prompt para Claude Code

```
Configurá Sanity CMS embebido en este proyecto Next.js de Estudio Barda.

1. Crear sanity.config.ts en raíz con configuración básica (projectId desde env, dataset "production", plugins: structureTool, visionTool).

2. Crear schemas en sanity/schemas/:

   a) proyecto.ts — Document con campos:
      - titulo (string, required)
      - slug (slug, source: titulo, required)
      - ciudad (string)
      - anio (number)
      - tipo (string, list: casa, departamento, refaccion, local, trabajo, cultural, otro)
      - categoria (string, list: principal, secundario)
      - destacadoEnHome (boolean, default false)
      - orden (number, para ordenamiento manual)
      - descripcionCorta (text, max 200 chars)
      - descripcionLarga (array of blocks - portable text)
      - imagenPrincipal (image, con alt text obligatorio y hotspot)
      - galeria (array of images, cada una con alt text)
      - titulo_en, descripcionCorta_en, descripcionLarga_en (campos en inglés, opcionales)

   b) servicio.ts — Document con campos:
      - titulo (string)
      - descripcion (text)
      - tipo (string, list: principal, complementario)
      - orden (number)
      - titulo_en, descripcion_en (opcionales)

   c) configuracion.ts — Singleton con:
      - nombreEstudio (string)
      - lema (string)
      - bioEstudio (text)
      - bioArquitecto (text)
      - email (string)
      - whatsapp (string)
      - instagram (string)
      - fotoArquitecto (image con alt)
      - bioEstudio_en, bioArquitecto_en, lema_en (opcionales)

3. Crear sanity/schemas/index.ts que exporte el array con los 3 schemas.

4. Crear app/studio/[[...tool]]/page.tsx con NextStudio para embeber el panel admin.

5. Crear sanity/lib/client.ts con createClient (sanityClient) y sanity/lib/image.ts con urlForImage helper.

6. Crear sanity/lib/queries.ts con queries GROQ:
   - allProjectsQuery: todos los proyectos ordenados por "orden" asc, luego "anio" desc
   - featuredProjectsQuery: proyectos con destacadoEnHome=true
   - projectBySlugQuery: proyecto individual por slug
   - allServicesQuery: servicios ordenados por orden
   - configQuery: documento de configuración (singleton)

7. Configurar el singleton de "configuracion" usando structure de Sanity (que solo se pueda crear uno).

Probar que `localhost:3000/studio` cargue el panel correctamente.

Hacer commit "feat: sanity cms setup with schemas".
```

### Verificación
- [ ] `/studio` carga el panel de Sanity
- [ ] Aparecen los 3 tipos de documento (Proyecto, Servicio, Configuración)
- [ ] Puedo crear un proyecto de prueba y guardarlo
- [ ] El singleton de Configuración solo permite un documento

---

## Fase 2 — i18n + Layout base (Header/Footer)

**Objetivo:** Dejar la estructura de internacionalización funcionando con header y footer responsive en ES/EN.

### Prompt para Claude Code

```
Configurá internacionalización (next-intl) y los componentes de layout para Estudio Barda.

CONTEXTO:
- Idiomas: español (default) e inglés
- Header: logo "BARDA" (texto por ahora), navegación, selector idioma, botón WhatsApp
- Footer: contacto, redes, copyright
- Diseño: minimalista, blanco, tipografía sans-serif moderna

TAREAS:

1. Configurar next-intl:
   - Crear i18n/routing.ts con locales ['es', 'en'], defaultLocale 'es'
   - Crear i18n/request.ts para cargar mensajes
   - Crear middleware.ts en raíz para detección de idioma
   - Modificar next.config.ts para integrar next-intl plugin

2. Crear messages/es.json y messages/en.json con keys:
   - nav: { home, proyectos, estudio, servicios, contacto }
   - cta: { hablemos, contactar, verProyecto, verTodos }
   - footer: { derechos, contacto }
   - common: { cargando, error }

3. Crear app/[locale]/layout.tsx que:
   - Use NextIntlClientProvider
   - Cargue fuente Inter desde next/font/google
   - Importe Header y Footer
   - Tenga metadata base con título "Estudio Barda — Arquitectura"

4. Crear components/Header.tsx:
   - Logo "BARDA" (texto, font-weight bold, tracking wide) que linkea a home
   - Nav horizontal en desktop con links a las 5 páginas
   - Selector ES/EN (toggle simple)
   - Botón "Hablemos" (verde WhatsApp #25D366) que linkea a wa.me
   - Mobile: hamburger menu con drawer/overlay
   - Sticky top, fondo blanco, border-bottom muy sutil
   - Padding generoso

5. Crear components/Footer.tsx:
   - Email, WhatsApp, Instagram (con íconos lucide-react)
   - Copyright con año dinámico
   - Diseño minimalista, fondo blanco o gris muy claro
   - Mobile: stack vertical, Desktop: 3 columnas

6. Crear components/WhatsAppButton.tsx:
   - Variante "inline" (para usar en CTAs dentro de páginas)
   - Variante "floating" (fixed bottom-right, solo mobile)
   - Link: https://wa.me/5492215718737
   - Ícono de WhatsApp + texto "Hablemos" / "Let's talk"

7. Crear app/[locale]/page.tsx temporal con un h1 "Home" para probar.

8. Configurar Tailwind con:
   - colors custom: barda-black (#1a1a1a), barda-gray (#666), whatsapp-green (#25D366)
   - container con padding responsive
   - extend fontFamily con la fuente Inter

Probar que /es y /en funcionen, que el cambio de idioma navegue correctamente, y que el header sea responsive.

Commit: "feat: i18n setup and layout components".
```

### Verificación
- [ ] `/es` y `/en` cargan
- [ ] Cambio de idioma funciona
- [ ] Header responsive (mobile + desktop)
- [ ] Botón WhatsApp abre el chat correctamente
- [ ] Footer muestra datos de contacto

---

## Fase 3 — Home

**Objetivo:** Página principal con hero, proyectos destacados y CTAs.

### Prompt para Claude Code

```
Implementá la página Home de Estudio Barda en app/[locale]/page.tsx.

CONTEXTO:
- Estética minimalista, mucho espacio en blanco, imágenes protagonistas
- Datos vienen de Sanity (configuracion + proyectos destacados)
- Animaciones sutiles con Framer Motion (fade-in al scroll)

ESTRUCTURA DE LA PÁGINA:

1. **Hero (full viewport height aprox)**
   - Imagen full-bleed de fondo (placeholder: usar /public/placeholder-hero.jpg, o gradient gris si no existe)
   - Overlay sutil oscuro para legibilidad
   - Texto centrado o alineado: nombre del estudio grande + lema debajo
   - Texto desde Sanity (configuracion.nombreEstudio, configuracion.lema)
   - Scroll indicator sutil abajo

2. **Sección "Proyectos destacados"**
   - Título: "Proyectos" / "Projects"
   - Grilla de proyectos con destacadoEnHome=true (máx 6)
   - Layout: 1 col mobile, 2 cols tablet, 3 cols desktop
   - Cada card: imagen principal, nombre, ciudad + año (sutil)
   - Hover: scale sutil de la imagen, overlay con descripción corta
   - Link a /proyectos/[slug]
   - Botón "Ver todos los proyectos" debajo

3. **Sección "Sobre el estudio"**
   - Título corto + 2-3 líneas de bioEstudio (desde Sanity)
   - Link a /estudio
   - Layout: texto alineado, mucho espacio en blanco

4. **Sección CTA final**
   - Título grande: "¿Tenés un proyecto en mente?" / "Have a project in mind?"
   - Botón WhatsApp prominente (variante inline)
   - Fondo de color (gris muy claro, #f5f5f5) o blanco con borders

TAREAS TÉCNICAS:

1. Crear components/ProjectCard.tsx (reutilizable):
   - Recibe: proyecto (con imagen, titulo, ciudad, anio, slug, descripcionCorta)
   - Imagen con next/image y aspect ratio fijo (4:3 o 3:2)
   - Texto debajo o sobre la imagen al hover
   - Animación con framer-motion (fade-in al entrar en viewport)

2. Crear components/Hero.tsx (puede ser específico de home).

3. Crear components/SectionCTA.tsx reutilizable.

4. Fetchear datos en server component:
   - configQuery para datos generales
   - featuredProjectsQuery para destacados

5. Si no hay datos en Sanity todavía, mostrar:
   - Hero con texto placeholder ("Estudio Barda — Arquitectura real")
   - Grilla vacía con mensaje "Próximamente"

6. Metadata SEO:
   - title: "Estudio Barda — Arquitectura"
   - description: descripción del estudio
   - openGraph básico

7. Animaciones Framer Motion:
   - Fade-in + translate-y al hacer scroll en cada sección
   - Stagger en la grilla de proyectos

Asegurate que sea totalmente responsive y se vea bien sin imágenes (placeholders elegantes).

Commit: "feat: home page".
```

### Verificación
- [ ] Home carga en `/es` y `/en`
- [ ] Si no hay proyectos en Sanity, hay fallback elegante
- [ ] Hero responsive
- [ ] Grilla de proyectos responsive
- [ ] Animaciones suaves al scrollear

---

## Fase 4 — Listado y detalle de Proyectos

**Objetivo:** Página `/proyectos` con grilla filtrable y página `/proyectos/[slug]` con galería.

### Prompt para Claude Code

```
Implementá las páginas de Proyectos para Estudio Barda.

PÁGINAS A CREAR:

### A) app/[locale]/proyectos/page.tsx — Listado

ESTRUCTURA:
1. Header de página: título "Proyectos" + subtítulo corto
2. Filtros (chips/botones horizontales):
   - "Todos", "Casas", "Departamentos", "Refacciones", "Locales", "Espacios de trabajo", "Culturales", "Otros"
   - Estado activo visualmente diferenciado (subrayado o background)
   - Filtrado client-side
3. Grilla de proyectos:
   - 1 col mobile, 2 cols tablet, 3 cols desktop
   - Usar el ProjectCard de la fase anterior
   - Si filtro no tiene resultados: mensaje "No hay proyectos en esta categoría"
4. Animación: fade-in cuando cambia el filtro

TAREAS:
- Server component carga todos los proyectos con allProjectsQuery
- Convertir a client component el bloque de filtros + grilla (use client)
- Estado local con el filtro activo
- Tipos TypeScript para Project (definir en sanity/types.ts)

### B) app/[locale]/proyectos/[slug]/page.tsx — Detalle

ESTRUCTURA:
1. **Header del proyecto**
   - Imagen principal full-bleed (60-70vh), con next/image y priority
   - Título del proyecto debajo o sobre la imagen

2. **Ficha técnica + Descripción** (layout 2 columnas en desktop, stack en mobile)
   - Columna izquierda (1/3): ficha técnica
     - Ubicación (ciudad)
     - Año
     - Tipo
     - Categoría
   - Columna derecha (2/3): descripción larga (renderizar portable text)

3. **Galería de imágenes**
   - Grid responsive: 1 col mobile, 2 cols desktop
   - Imágenes con aspect ratios variables (algunas más altas, otras horizontales)
   - Click → lightbox simple (modal con imagen ampliada y prev/next)
   - Lazy loading con next/image

4. **Navegación entre proyectos**
   - Al final: "Proyecto anterior" / "Siguiente proyecto"
   - Mostrar mini-card con imagen + título

5. **CTA final**
   - "¿Te gusta este enfoque? Hablemos" + botón WhatsApp

TAREAS:
- Generar generateStaticParams para todos los slugs
- Usar projectBySlugQuery
- Crear components/ProjectGallery.tsx con lightbox (puede ser un componente client simple con state)
- Crear components/PortableText.tsx wrapper para renderizar el block content de Sanity
- generateMetadata dinámica con título y descripción del proyecto + OG image (usar urlForImage)
- Si el proyecto no existe: notFound() de Next.js

Animaciones:
- Fade-in en cada sección
- Imágenes de galería con stagger al cargar

Commit: "feat: projects listing and detail pages".
```

### Verificación
- [ ] `/proyectos` muestra grilla de todos los proyectos
- [ ] Filtros funcionan
- [ ] `/proyectos/[slug]` muestra el detalle correctamente
- [ ] Galería + lightbox funcionan
- [ ] Navegación anterior/siguiente funciona
- [ ] Si proyecto no existe → 404

---

## Fase 5 — Estudio

**Objetivo:** Página `/estudio` con bio del arquitecto y enfoque del estudio.

### Prompt para Claude Code

```
Implementá la página /estudio para Estudio Barda en app/[locale]/estudio/page.tsx.

CONTENIDO (desde Sanity, configuracion):
- bioEstudio: enfoque del estudio
- bioArquitecto: bio personal de Joaquín
- fotoArquitecto: imagen del arquitecto

ESTRUCTURA:

1. **Hero de sección** (no full screen, más compacto)
   - Título: "Sobre el estudio" / "About the studio"
   - Subtítulo opcional

2. **Sobre el estudio** (sección)
   - Texto bioEstudio
   - Layout: máx 65ch de ancho, centrado o alineado
   - Tipografía cómoda de leer (line-height generoso)

3. **Sobre Joaquín** (sección con foto)
   - Layout 2 columnas en desktop:
     - Columna izquierda: foto del arquitecto (aspect ratio 3:4, retrato)
     - Columna derecha: bio + formación
   - Mobile: stack (foto arriba, texto abajo)
   - Bio: texto bioArquitecto desde Sanity
   - Formación (hardcoded por ahora):
     - "Arquitecto — Universidad Nacional de La Plata (UNLP)"
     - "Cursando Maestría en Desarrollo Territorial y Urbano — UNQ"
     - "Trabajando como arquitecto desde 2018"

4. **Enfoque / Valores** (sección opcional)
   - 3 puntos clave con título corto + 1-2 líneas
   - Hardcoded:
     - "Proceso, no solo resultado" — acompañamiento en todas las etapas
     - "Materiales honestos" — arquitectura clara y duradera
     - "Pensada para las personas" — desde el contexto y la escala humana
   - Layout: 3 columnas desktop, stack mobile

5. **CTA final**
   - "¿Trabajamos juntos?" + botón WhatsApp

TAREAS:
- Server component que carga configuracion
- Si no hay foto, usar placeholder elegante (silueta o gradient)
- Animaciones: fade-in por sección
- generateMetadata con título "Estudio — Barda" y descripción

Commit: "feat: studio page".
```

### Verificación
- [ ] `/estudio` carga con la bio
- [ ] Foto + texto se ven bien en mobile y desktop
- [ ] Funciona sin foto cargada (placeholder)

---

## Fase 6 — Servicios

**Objetivo:** Página `/servicios` con servicios principales y complementarios.

### Prompt para Claude Code

```
Implementá la página /servicios para Estudio Barda en app/[locale]/servicios/page.tsx.

CONTENIDO (desde Sanity, allServicesQuery):
Servicios cargados desde el CMS, separados por tipo (principal/complementario).

ESTRUCTURA:

1. **Hero de sección**
   - Título: "Servicios" / "Services"
   - Subtítulo: "Acompañamiento integral en cada etapa del proyecto"

2. **Servicios principales**
   - Título de sección: "Principales"
   - Grid 3 columnas desktop, 1 columna mobile
   - Cada servicio: número grande (01, 02, 03) + título + descripción
   - Tipografía cuidada, mucho espacio entre items

3. **Servicios complementarios**
   - Título de sección: "Complementarios"
   - Lista vertical o grid 2 columnas
   - Diseño más sutil que los principales

4. **CTA final**
   - "¿No estás seguro de qué necesitás?"
   - Texto: "Contame tu proyecto y vemos juntos cómo abordarlo"
   - Botón WhatsApp

TAREAS:
1. Crear components/ServiceCard.tsx:
   - Variantes: "principal" (más grande, con número) y "complementario" (más sutil)
   - Animación fade-in al scroll

2. Si no hay servicios cargados en Sanity, mostrar fallback hardcoded:
   - Principales:
     - "Proyecto arquitectónico" — desarrollo de proyectos de vivienda desde la idea hasta planos completos
     - "Refacciones y remodelaciones" — diseño y reorganización de espacios existentes
     - "Dirección y ejecución de obra" — seguimiento y control de obra
   - Complementarios:
     - "Asesoramiento pre-compra" — análisis de propiedad para entender posibilidades de reforma
     - "Diseño interior" — optimización de espacios, iluminación, materiales
     - "Trámites municipales" — planos, permisos y habilitación de obra

3. Server component con fetch de servicios.
4. generateMetadata con título "Servicios — Estudio Barda".

Commit: "feat: services page".
```

### Verificación
- [ ] `/servicios` muestra principales y complementarios
- [ ] Funciona con datos de Sanity y con fallback
- [ ] Responsive

---

## Fase 7 — Contacto

**Objetivo:** Página `/contacto` con datos y CTA principal a WhatsApp.

### Prompt para Claude Code

```
Implementá la página /contacto para Estudio Barda en app/[locale]/contacto/page.tsx.

CONTEXTO: El medio principal de contacto es WhatsApp. No hay formulario, todo dirige a WhatsApp.

ESTRUCTURA:

1. **Hero de sección**
   - Título grande: "Hablemos" / "Let's talk"
   - Subtítulo: "Contame tu proyecto" / "Tell me about your project"

2. **Datos de contacto**
   - Layout: centrado o 2 columnas
   - WhatsApp: botón grande con ícono + número visible (clickeable)
   - Email: clickeable (mailto:bardaarquitectura@gmail.com)
   - Instagram: @estudio_barda (link)
   - Tipografía generosa, mucho espacio entre items

3. **Zona de trabajo**
   - Texto: "Trabajamos en CABA, zona norte del GBA, y desarrollamos proyectos en otras provincias del país (Río Negro, Neuquén, Misiones, entre otras)."
   - Mapa estático opcional (placeholder por ahora, simple imagen o iconografía)

4. **Tiempos de respuesta** (opcional, sutil)
   - "Respondo personalmente cada consulta. Tiempo de respuesta habitual: 24-48hs"

TAREAS:
- Datos desde Sanity (configuracion: email, whatsapp, instagram)
- Botón de WhatsApp grande, prominente, animado sutilmente
- Animaciones de entrada
- generateMetadata con título "Contacto — Estudio Barda"

Diseño minimalista, mucho espacio en blanco, foco en el botón de WhatsApp.

Commit: "feat: contact page".
```

### Verificación
- [ ] `/contacto` muestra todos los datos
- [ ] Botón WhatsApp funciona
- [ ] Email y Instagram clickeables

---

## Fase 8 — Pulido: SEO, performance y accesibilidad

**Objetivo:** Dejar el sitio listo para producción.

### Prompt para Claude Code

```
Pulido final del sitio de Estudio Barda. Foco en SEO, performance y accesibilidad.

TAREAS:

1. **SEO**
   - Crear app/sitemap.ts dinámico (incluir todas las páginas + slugs de proyectos en ambos idiomas)
   - Crear app/robots.ts
   - Verificar que cada página tenga generateMetadata correcta:
     - title específico
     - description
     - openGraph (title, description, image, locale)
     - alternates con hreflang ES/EN
   - Crear OG image default en /public/og-default.jpg (placeholder por ahora)

2. **Performance**
   - Verificar todas las imágenes usen next/image
   - Lazy loading correcto (priority solo en above-the-fold)
   - Revisar que las queries a Sanity usen revalidate (ISR, ej: revalidate: 3600)
   - Comprimir/optimizar imágenes placeholder

3. **Accesibilidad**
   - Verificar contraste de colores (WCAG AA)
   - Alt text en todas las imágenes (advertir si faltan en Sanity)
   - Aria labels en botones de íconos
   - Focus states visibles
   - Skip-to-content link en el header
   - Estructura semántica (h1 único por página, nav, main, footer correctos)

4. **404 personalizado**
   - app/[locale]/not-found.tsx con diseño coherente
   - Mensaje breve + link a home

5. **Loading states**
   - app/[locale]/loading.tsx con skeleton simple
   - Loading state para la página de detalle de proyecto

6. **Error boundary**
   - app/[locale]/error.tsx con mensaje amigable

7. **Analytics (opcional)**
   - Dejar configurado un placeholder para Vercel Analytics o Plausible
   - Comentado, listo para activar

8. **Revisión cross-browser y mobile**
   - Probar en Chrome, Safari, Firefox
   - Probar viewport mobile real (Chrome DevTools)
   - Verificar que el botón flotante de WhatsApp no tape contenido importante

9. **Documentación**
   - Actualizar README.md con:
     - Comandos
     - Cómo cargar contenido en Sanity
     - Cómo desplegar en Vercel
     - Estructura del proyecto

Commit: "chore: SEO, accessibility and performance polish".
```

### Verificación
- [ ] Lighthouse score >90 en Performance, Accessibility, SEO
- [ ] Sitemap.xml accesible
- [ ] 404 personalizado
- [ ] Sin errores en consola
- [ ] Funciona bien en mobile

---

## Fase 9 — Deploy a Vercel

**Objetivo:** Sitio en producción.

### Pasos manuales del usuario

1. **Push del repo a GitHub** (si no lo hiciste antes)

2. **Crear cuenta en Vercel** y conectar GitHub

3. **Importar el repo** en Vercel

4. **Configurar variables de entorno** en Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

5. **Deploy** (Vercel detecta Next.js automáticamente)

6. **Configurar dominio custom** cuando esté definido

7. **Configurar webhook de Sanity → Vercel** para revalidar cuando se edite contenido:
   - En Sanity: crear webhook que apunte a `https://[tu-dominio].vercel.app/api/revalidate`
   - Crear endpoint en `app/api/revalidate/route.ts` que use `revalidatePath`

### Prompt para Claude Code (solo el endpoint de revalidación)

```
Crear endpoint de revalidación para Sanity → Next.js en app/api/revalidate/route.ts.

- Recibir POST con body de Sanity webhook
- Verificar secret (SANITY_REVALIDATE_SECRET en env)
- Llamar revalidatePath para las rutas afectadas según el tipo de documento:
  - Si es "proyecto": revalidar /, /proyectos, /proyectos/[slug]
  - Si es "servicio": revalidar /servicios
  - Si es "configuracion": revalidar todo
- Retornar JSON con status

Documentar en README cómo configurar el webhook en Sanity.

Commit: "feat: sanity revalidation webhook".
```

### Verificación
- [ ] Sitio accesible en `[proyecto].vercel.app`
- [ ] Editar en Sanity → cambios visibles en producción (con webhook o ISR)
- [ ] Dominio custom funcionando (cuando se compre)

---

## Fase 10 — Carga de contenido real

**Objetivo:** Reemplazar placeholders con contenido real del cliente.

### Tareas (manuales, hace Joaquín en Sanity Studio)

1. Cargar configuración general (bio, lema, contacto, foto del arquitecto)
2. Cargar todos los proyectos:
   - Imagen principal de cada uno (alta calidad)
   - Galería completa
   - Descripciones cortas y largas
   - Marcar destacados para home
   - Asignar orden de aparición
3. Cargar servicios (si se quiere cambiar el contenido del fallback)
4. Traducir todo al inglés en los campos `_en`

### Capacitación
- Walkthrough breve del panel de Sanity
- Cómo subir imágenes (consejos: nombrarlas, alt text, hotspot)
- Cómo marcar destacados
- Cómo reordenar

---

## Checklist final pre-lanzamiento

- [ ] Todos los proyectos cargados con imágenes finales
- [ ] Bio del arquitecto + foto profesional
- [ ] Logo definitivo (reemplazar texto "BARDA" por SVG)
- [ ] Lema definitivo elegido
- [ ] Traducciones EN completas
- [ ] Dominio comprado y configurado
- [ ] Lighthouse >90 en todas las métricas
- [ ] Probado en iOS Safari, Android Chrome, desktop
- [ ] WhatsApp button funciona desde mobile (abre app)
- [ ] Webhook Sanity → Vercel funcionando
- [ ] Backup del proyecto en Sanity (export dataset)

---

## Estructura final del proyecto

```
barda-web/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── proyectos/
│   │   │   ├── page.tsx                # Listado
│   │   │   └── [slug]/page.tsx         # Detalle
│   │   ├── estudio/page.tsx
│   │   ├── servicios/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── not-found.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── studio/[[...tool]]/page.tsx     # Sanity Studio
│   ├── api/revalidate/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGallery.tsx
│   ├── ServiceCard.tsx
│   ├── WhatsAppButton.tsx
│   ├── PortableText.tsx
│   └── SectionCTA.tsx
├── sanity/
│   ├── schemas/
│   │   ├── proyecto.ts
│   │   ├── servicio.ts
│   │   ├── configuracion.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── queries.ts
│   └── types.ts
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── es.json
│   └── en.json
├── public/
├── middleware.ts
├── sanity.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Notas importantes para el desarrollo

- **No avanzar a la siguiente fase sin verificar la actual.** Cada fase asume que la anterior funciona bien.
- **Las imágenes son lo último.** Todo el desarrollo se hace con placeholders.
- **El logo definitivo se reemplaza al final** (por ahora texto "BARDA").
- **Si Claude Code se desvía o agrega cosas no pedidas**, frenarlo y volver al alcance de la fase.
- **Hacer commits por fase** para poder revertir si algo se rompe.
