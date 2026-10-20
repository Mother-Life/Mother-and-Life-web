import localFont from 'next/font/local'

/**
 * Polices auto-hébergées, réduites au latin (FR/EN) et aux graisses utilisées :
 * aucune requête vers un service tiers, et ~100 Ko au total.
 * Les métriques de repli évitent le saut de mise en page au chargement.
 */
export const nunito = localFont({
  src: '../assets/fonts/nunito-latin-400-800.woff2',
  weight: '400 800',
  style: 'normal',
  variable: '--font-nunito',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const caveat = localFont({
  src: '../assets/fonts/caveat-latin-700.woff2',
  weight: '700',
  variable: '--font-caveat',
  display: 'swap',
  adjustFontFallback: false,
})

export const literata = localFont({
  src: '../assets/fonts/literata-latin-italic-600.woff2',
  weight: '600',
  style: 'italic',
  variable: '--font-literata',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Times New Roman',
})
