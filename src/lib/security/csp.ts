/**
 * Politique de sécurité du contenu (CSP) du site public.
 *
 * Stratégie « nonce + strict-dynamic » recommandée par Next.js : seuls les
 * scripts portant le nonce de la requête (ceux de Next lui-même) s'exécutent,
 * et ils peuvent charger leurs propres morceaux. Aucun script en ligne arbitraire,
 * aucun domaine tiers. Les styles en ligne restent permis : React s'en sert pour
 * les propriétés personnalisées (`style={{ '--i': 2 }}`) et ils ne permettent pas
 * d'exécuter du code.
 *
 * L'admin Payload (/admin) n'est pas couvert ici : son interface a besoin de
 * scripts en ligne. Il reçoit les autres en-têtes de next.config.ts.
 */

const MEDIA_ORIGIN = process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? 'https://media.motherandlife.org'

export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary)
}

export function buildCsp(nonce: string, { dev = false }: { dev?: boolean } = {}): string {
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", ...(dev ? ["'unsafe-eval'"] : [])],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:', MEDIA_ORIGIN],
    'media-src': ["'self'", MEDIA_ORIGIN],
    'font-src': ["'self'"],
    'connect-src': ["'self'", ...(dev ? ['ws:', 'wss:'] : [])],
    'frame-src': ["'none'"],
    'worker-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    // L'aperçu en direct de l'admin affiche le site dans un iframe du même domaine.
    'frame-ancestors': ["'self'"],
  }

  const policy = Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(' ')}`)
    .join('; ')

  return dev ? policy : `${policy}; upgrade-insecure-requests`
}
