export const brandTokens = {
  rose: '#FF0099',
  rose700: '#C4007A',
  rose050: '#FFE5F4',
  bleu: '#00AAFF',
  bleu700: '#0077C2',
  bleu050: '#E0F4FF',
  vert: '#08C577',
  vert700: '#037A4A',
  vert050: '#E2FAF0',
  encre: '#1E1E1E',
  nuit: '#101828',
  gris600: '#5A6272',
  gris100: '#F4F5F7',
  hairline: '#E8EAEE',
  shadow: '0 2px 12px rgba(16,24,40,.06)',
} as const

export type PillarSlug = 'prevenir' | 'accompagner' | 'autonomie'

export const pillarColors: Record<PillarSlug, { main: string; accessible: string; bg: string }> = {
  prevenir: { main: brandTokens.bleu, accessible: brandTokens.bleu700, bg: brandTokens.bleu050 },
  accompagner: { main: brandTokens.rose, accessible: brandTokens.rose700, bg: brandTokens.rose050 },
  autonomie: { main: brandTokens.vert, accessible: brandTokens.vert700, bg: brandTokens.vert050 },
}
