import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

type SanityWebhookBody = {
  _type?: string
  type?: string
  slug?: string | { current?: string }
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const url = new URL(request.url)
  const providedSecret =
    request.headers.get('x-sanity-secret') ??
    request.headers.get('x-revalidate-secret') ??
    url.searchParams.get('secret')

  if (!secret || providedSecret !== secret) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 })
  }

  let body: SanityWebhookBody = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const documentType = body._type ?? body.type
  const slug = typeof body.slug === 'string' ? body.slug : body.slug?.current
  const paths = pathsForDocument(documentType, slug)

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: true,
    type: documentType ?? 'unknown',
    paths,
  })
}

function pathsForDocument(documentType?: string, slug?: string) {
  switch (documentType) {
    case 'proyecto':
      return ['/', '/proyectos', ...(slug ? [`/proyectos/${slug}`] : [])]
    case 'servicio':
      return ['/', '/sobre-nosotros']
    case 'configuracion':
      return ['/', '/proyectos', '/sobre-nosotros', '/proceso', '/contacto']
    default:
      return ['/', '/proyectos', '/sobre-nosotros', '/proceso', '/contacto']
  }
}
