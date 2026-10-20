/** Feuille-goutte du logo : puce des surtitres, avatar des histoires, jauge. */
export const CHEMIN_FEUILLE = 'M0 8.28C0 2.56 5.35-.76 13.86.15 14.8 8.58 11.02 14 5.35 14 2.2 14 0 11.89 0 8.28'

export function Feuille({ taille = 14, className }: { taille?: number; className?: string }) {
  return (
    <svg viewBox="0 0 14 14" width={taille} height={taille} aria-hidden="true" focusable="false" className={className}>
      <path d={CHEMIN_FEUILLE} fill="currentColor" />
    </svg>
  )
}
