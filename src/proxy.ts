import { NextResponse, type NextRequest } from 'next/server'
import { buildCsp, createNonce } from '@/lib/security/csp'

/**
 * 1. Langue : le français est servi sans préfixe (/), l'anglais sous /en.
 *    /fr/... redirige vers l'adresse sans préfixe pour éviter le contenu dupliqué.
 * 2. Sécurité : chaque page publique reçoit un nonce neuf et sa CSP.
 *    Le nonce est transmis au rendu par l'en-tête de requête `x-nonce`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/fr/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  const nonce = createNonce()
  const csp = buildCsp(nonce, { dev: process.env.NODE_ENV === 'development' })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('content-security-policy', csp)

  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const response = isEnglish
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : (() => {
        const url = request.nextUrl.clone()
        url.pathname = `/fr${pathname === '/' ? '' : pathname}`
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
      })()

  response.headers.set('content-security-policy', csp)
  return response
}

export const config = {
  // Pages publiques uniquement : ni admin, ni API, ni fichiers statiques.
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|actualites/rss.xml|.*\\.[a-z0-9]+$).*)',
  ],
}
