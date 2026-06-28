import { NextResponse } from 'next/server'

export function proxy() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
