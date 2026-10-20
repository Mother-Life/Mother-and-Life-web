import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const newPath = pathname.replace(/^\/fr/, '') || '/'
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  if (!pathname.startsWith('/en')) {
    const url = request.nextUrl.clone()
    url.pathname = `/fr${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
