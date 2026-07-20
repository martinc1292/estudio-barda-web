import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

// `createClient` tira al construir si `projectId` es vacío (@sanity/client v7).
// En el CI no existen las env de Sanity, así que solo instanciamos el cliente
// cuando hay projectId; sin él, `safeFetch` devuelve null y el build no explota.
// En producción la env está definida, así que el cliente es el real.
export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!client) return null
  try {
    return await client.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity] fetch error:', err)
    return null
  }
}
