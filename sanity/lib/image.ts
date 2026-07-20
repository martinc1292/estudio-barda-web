import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// El builder de URLs solo necesita projectId/dataset (no el cliente entero), así
// que lo armamos desde las env directamente. Con projectId vacío (p.ej. en CI sin
// secrets) genera URLs inválidas pero NO tira, que es lo que necesita el build.
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
