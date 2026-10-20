/**
 * Pictos dessinés des portes et des axes (trait 2,28 px sur 56 px).
 * Provisoires dans la maquette : ils seront redessinés à la main, et seul ce
 * fichier changera. Couleur héritée (`currentColor`).
 */
const pictos = {
  enceinte:
    'M12.25 47.25c7-5.25 24.5-5.25 31.5 0M28 12.25c7 0 12.25 5.25 12.25 12.25 0 10.5-7 19.25-12.25 19.25S15.75 35 15.75 24.5c0-7 5.25-12.25 12.25-12.25',
  aider:
    'M8.75 35c7-5.25 14-5.25 19.25-1.75h10.5c3.5 0 3.5 5.25 0 5.25H26.25m-17.5 7H21c8.75 0 17.5-3.5 26.25-12.25 3.5-3.5 0-7-3.5-5.25L35 33.25m-1.75-24.5V21m-6.12-6.12h12.25',
  engager:
    'M7 47.25C8.75 38.5 15.75 35 24.5 35S40.25 38.5 42 47.25m-5.25-28c3.5 0 7 3.5 7 7s-3.5 5.25-5.25 5.25M42 35c5.25 1.75 7 5.25 7 10.5M17.5 22.75c0-5.25 3.5-8.75 7-8.75s7 3.5 7 8.75-3.5 8.75-7 8.75-7-3.5-7-8.75',
  accompagner:
    'M8.75 35C14 43.75 21 47.25 28 47.25S42 43.75 47.25 35m-31.5 3.5Q10.5 33.25 10.5 28m29.75 10.5Q45.5 33.25 45.5 28M28 10.5a8.77 8.77 0 0 1 8.75 8.75c0 4.38-3.5 7.88-8.75 7.88s-8.75-3.5-8.75-7.88 3.5-8.75 8.75-8.75',
  prevenir:
    'M17.5 22.75h19.25m-19.25 7h14M8.75 14h31.5q5.25 0 5.25 5.25v14q0 5.25-5.25 5.25H24.5l-8.75 8.75V38.5h-3.5c-1.75 0-3.5-1.75-3.5-5.25z',
  autonomie:
    'M28 49V24.5m0 8.75c-8.75 0-15.75-7-15.75-15.75C21 17.5 28 24.5 28 33.25m0-7c8.75 0 15.75-7 15.75-15.75C35 10.5 28 17.5 28 26.25',
} as const

export type NomPicto = keyof typeof pictos

export function Picto({ nom, taille = 56, className }: { nom: NomPicto; taille?: number; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" width={taille} height={taille} aria-hidden="true" focusable="false" className={className}>
      <path
        d={pictos[nom]}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.28}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="picto-trace"
      />
    </svg>
  )
}
