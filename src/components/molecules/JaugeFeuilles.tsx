const PAR_LIGNE = 25
const PAS = 22

/**
 * Jauge de la campagne : une feuille par unité (ex. 100 feuilles = 100 paniers).
 * Les feuilles financées s'allument d'un balayage quand la jauge entre à
 * l'écran. Au-delà de 200 unités, une feuille représente plusieurs unités.
 */
export function JaugeFeuilles({
  financees,
  objectif,
  libelle,
}: {
  financees: number
  objectif: number
  libelle: string
}) {
  const parFeuille = Math.max(1, Math.ceil(objectif / 200))
  const total = Math.ceil(objectif / parFeuille)
  const allumees = Math.min(total, Math.floor(financees / parFeuille))
  const lignes = Math.ceil(total / PAR_LIGNE)
  const toutes = Array.from({ length: total }, (_, i) => i)

  return (
    <svg
      role="img"
      aria-label={libelle}
      viewBox={`0 0 ${PAR_LIGNE * PAS} ${lignes * PAS}`}
      className="jauge-feuilles block h-auto w-full max-w-[34.5rem] overflow-visible"
    >
      <path d={feuilles(toutes)} fill="none" className="stroke-argile" strokeWidth={1.4} />
      {allumees > 0 && (
        <path
          d={feuilles(toutes.slice(0, allumees))}
          className="jauge-allumees fill-pigment-vert stroke-pigment-vert"
          strokeWidth={1.4}
        />
      )}
    </svg>
  )
}

/** Feuille de la jauge (tracé Figma 18 × 18), déplacée en (x, y). */
function feuille(x: number, y: number): string {
  const n = (v: number) => Number(v.toFixed(2))
  return `M${n(x + 0.7)} ${n(y + 10.16)}C${n(x + 0.7)} ${n(y + 3.62)} ${n(x + 6.82)} ${n(y - 0.16)} ${n(x + 16.53)} ${n(y + 0.87)}C${n(x + 17.61)} ${n(y + 10.5)} ${n(x + 13.3)} ${n(y + 16.7)} ${n(x + 6.82)} ${n(y + 16.7)}C${n(x + 3.22)} ${n(y + 16.7)} ${n(x + 0.7)} ${n(y + 14.29)} ${n(x + 0.7)} ${n(y + 10.16)}Z`
}

function feuilles(indices: number[]): string {
  return indices.map((i) => feuille((i % PAR_LIGNE) * PAS + 2, Math.floor(i / PAR_LIGNE) * PAS + 2)).join('')
}
