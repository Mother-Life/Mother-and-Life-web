import { NextResponse } from 'next/server'
import { limiterDebit } from './debit'

/**
 * Garde commune des routes de formulaire public (`/api/contact`, `/api/don`,
 * `/api/candidature`). Dans l'ordre, avant toute lecture du corps :
 *
 * 1. Origine : la requête doit venir du site lui-même (protection CSRF, et un
 *    robot qui poste depuis ailleurs est refusé).
 * 2. Taille : corps limité, pour qu'un envoi géant ne monopolise pas la fonction.
 * 3. Débit : quelques envois par adresse IP et par fenêtre de temps.
 *
 * Les refus restent volontairement vagues : on ne dit pas à un robot pourquoi.
 */

const TAILLE_MAX = 32 * 1024

export function originesAutorisees(): string[] {
  const urls = [
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ]
  const origines = new Set<string>()
  for (const url of urls) {
    if (!url) continue
    try {
      origines.add(new URL(url).origin)
    } catch {
      // Variable mal formée : ignorée plutôt que de casser le site.
    }
  }
  return [...origines]
}

export function adresseIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'inconnue'
}

const refus = (status: number) => NextResponse.json({ ok: false }, { status })

function origineValide(origine: string, hote: string | null): boolean {
  try {
    if (hote && new URL(origine).host === hote) return true
  } catch {
    return false
  }
  return originesAutorisees().includes(origine)
}

/** Renvoie une réponse de refus, ou `null` si la requête peut être traitée. */
export function garderFormulaire(
  request: Request,
  action: string,
  { max = 5, fenetreMs = 10 * 60_000 }: { max?: number; fenetreMs?: number } = {},
): NextResponse | null {
  const origine = request.headers.get('origin')
  const hote = request.headers.get('host')
  if (!origine || !origineValide(origine, hote)) return refus(403)

  const taille = Number(request.headers.get('content-length') ?? 0)
  if (!Number.isFinite(taille) || taille > TAILLE_MAX) return refus(413)

  if (!limiterDebit(`${action}:${adresseIp(request)}`, { max, fenetreMs })) return refus(429)

  return null
}

/** Pot de miel : champ invisible pour un humain. Rempli, c'est un robot. */
export function estUnRobot(form: FormData, champ = 'site'): boolean {
  const valeur = form.get(champ)
  return typeof valeur === 'string' && valeur.length > 0
}

/** Réponse identique au succès, pour ne rien apprendre au robot. */
export const reponseNeutre = () => NextResponse.json({ ok: true })
