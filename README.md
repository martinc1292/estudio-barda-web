# Estudio Barda - Web

Sitio web de **Barda Arquitectura / Joaquin Licera Vidal**.

## Estado

V1 monolingue en espanol. Rutas publicas:

- `/`
- `/proyectos`
- `/proyectos/[slug]`
- `/sobre-nosotros`
- `/proceso`
- `/contacto`
- `/studio` en desarrollo

## Stack

- Next.js 16 + App Router + TypeScript
- React 19
- Tailwind CSS 4
- Sanity CMS (`next-sanity`, `@sanity/client`)
- React Compiler

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
NEXT_PUBLIC_SITE_URL="https://estudio-barda.com"
SANITY_REVALIDATE_SECRET="change_me"
```

## Contenido en Sanity

El panel esta embebido en `/studio`, accesible tanto en desarrollo como en produccion. El acceso lo protege el login de Sanity: solo los miembros invitados al proyecto pueden editar contenido.

Tipos principales:

- `configuracion`: datos del estudio, contacto, bio y foto.
- `servicio`: servicios principales/complementarios.
- `proyecto`: obras, imagen principal, galeria, ficha y textos.

Para que el sitio muestre obras, cargar proyectos con `slug`, `imagenPrincipal`, `descripcionCorta` y marcar algunos con `destacadoEnHome`.

## Deploy

En Vercel configurar las mismas variables de entorno. `NEXT_PUBLIC_SITE_URL` se usa para sitemap, canonical y Open Graph.

Para revalidar contenido desde Sanity, crear un webhook `POST` a:

```text
https://<dominio>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
```

Payload minimo recomendado:

```json
{
  "_type": "proyecto",
  "slug": { "current": "nombre-del-proyecto" }
}
```

Tambien se acepta el secreto en el header `x-sanity-secret`.

## Estructura

```text
app/
  api/revalidate/route.ts
  components/
  contacto/page.tsx
  proceso/page.tsx
  proyectos/page.tsx
  proyectos/[slug]/page.tsx
  sobre-nosotros/page.tsx
  studio/[[...tool]]/page.tsx
sanity/
  lib/
  schemas/
docs/
  plan-desarrollo-barda.md
  guia-pruebas.md
  guia-carga-contenido.html
```
