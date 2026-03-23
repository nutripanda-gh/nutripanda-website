import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED = ['/', '/api']

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Preview mode: ?preview=true sets cookie, ?preview=false clears it
  const previewParam = searchParams.get('preview')
  if (previewParam === 'true') {
    const res = NextResponse.next()
    res.cookies.set('preview', 'true', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
    return res
  }
  if (previewParam === 'false') {
    const res = NextResponse.redirect(new URL('/', request.url))
    res.cookies.delete('preview')
    return res
  }

  // If preview cookie exists, allow all routes
  if (request.cookies.get('preview')?.value === 'true') {
    return NextResponse.next()
  }

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
