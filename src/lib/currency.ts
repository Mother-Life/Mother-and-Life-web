import type { Locale } from '@/lib/i18n/config'

/**
 * Conversion FCFA → euro. Le franc CFA est arrimé à l'euro à taux fixe :
 * les montants en euros sont toujours calculés, jamais saisis dans l'admin.
 */
export const XAF_PAR_EUR = 655.957

const intlLocale: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB' }

export function fcfaVersEuro(montantFcfa: number): number {
  return Math.round(montantFcfa / XAF_PAR_EUR)
}

export function formaterNombre(valeur: number, locale: Locale = 'fr'): string {
  return new Intl.NumberFormat(intlLocale[locale], { maximumFractionDigits: 0 }).format(valeur)
}

/** « 40 000 FCFA » (fr) · « 40,000 FCFA » (en) */
export function formaterFcfa(montant: number, locale: Locale = 'fr'): string {
  return `${formaterNombre(montant, locale)}\u00a0FCFA`
}

/** « ≈ 61 € » (fr) · « ≈ €61 » (en) */
export function formaterEquivalentEuro(montantFcfa: number, locale: Locale = 'fr'): string {
  const euros = formaterNombre(fcfaVersEuro(montantFcfa), locale)
  return locale === 'fr' ? `≈\u00a0${euros}\u00a0€` : `≈\u00a0€${euros}`
}
