# Estudio Barda — Web

Sitio web del estudio de arquitectura **Estudio Barda / Joaquín Licera Vidal**.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS
- Sanity CMS (`next-sanity`)
- `next-intl` (i18n: ES / EN)
- Framer Motion
- Lucide React

## Comandos

```bash
npm run dev      # Desarrollo en localhost:3000
npm run build    # Build de producción
npm run start    # Servidor de producción
```

## Variables de entorno

Copiar `.env.local` y completar con los datos del proyecto en [sanity.io](https://sanity.io):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=""      # ID del proyecto Sanity
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

## Panel de administración

El panel de Sanity está embebido en `/studio` (solo visible en desarrollo o con autenticación).

## Estructura del proyecto

```
app/[locale]/          → Páginas (home, proyectos, estudio, servicios, contacto)
app/studio/            → Panel Sanity embebido
components/            → Componentes reutilizables
sanity/schemas/        → Schemas de contenido
sanity/lib/            → Cliente, queries GROQ, helper de imágenes
messages/              → Traducciones ES / EN
i18n/                  → Configuración de next-intl
```
