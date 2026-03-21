import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED = ['/', '/api']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (ALLOWED.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack|assets|fonts|favicon.ico).*)',
  ],
}
