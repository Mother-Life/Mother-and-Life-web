import filigraneClair from '@/assets/decor/axis-watermark-active.svg'
import filigrane from '@/assets/decor/axis-watermark.svg'
import type { CarteAxe as CarteAxeType } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { Illustration } from '../atoms/Illustration'
import { LienFleche } from '../atoms/LienFleche'
import { Picto } from '../atoms/Picto'
import { Pinceau } from '../atoms/Pinceau'

const tonLien = { accompagner: 'accent', prevenir: 'bleu', autonomie: 'vert' } as const

/**
 * Carte d'un axe d'action. La carte mise en avant prend l'aplat rose et une
 * seconde carte verte inclinée derrière elle ; les autres restent sur Craie.
 * Toute la carte est cliquable ; le picto se redessine au survol.
 */
export function CarteAxe({ carte, enAvant }: { carte: CarteAxeType; enAvant: boolean }) {
  return (
    <div className="relative flex h-full">
      {enAvant && (
        <div aria-hidden="true" className="axe-dos absolute inset-0 -z-10 -rotate-10 rounded-porte bg-pigment-vert" />
      )}
      <article
        className={cn(
          'group relative flex w-full flex-col items-center gap-4 overflow-hidden rounded-porte px-5 py-10 text-center shadow-flottant transition-transform duration-300 ease-[var(--ease-sortie)] hover:-translate-y-1 sm:px-9',
          enAvant ? 'bg-axe-rose text-craie' : 'bg-craie text-texte',
        )}
      >
        <Illustration
          src={enAvant ? filigraneClair : filigrane}
          className="absolute top-1/2 left-1/2 h-[15.75rem] w-auto -translate-x-1/2 -translate-y-1/2"
        />
        <span
          className={cn(
            'relative grid size-[4.625rem] place-items-center rounded-full',
            enAvant ? 'bg-pigment-vert text-craie' : 'bg-[#1a685b] text-craie',
          )}
        >
          <Picto nom={carte.axe} />
        </span>
        <h3 className="relative text-h2 font-semibold">{carte.titre}</h3>
        <p className={cn('relative flex-1 text-normal', enAvant ? 'text-craie' : 'text-texte-doux')}>
          {carte.description}
        </p>
        <LienFleche
          href={carte.lien.href}
          etendu
          ton={enAvant ? 'craie' : tonLien[carte.axe]}
          className="relative mt-6 hover:no-underline"
        >
          {carte.lien.libelle}
        </LienFleche>
        <Pinceau
          className={cn(
            'axe-pinceau pointer-events-none absolute -right-6 -bottom-6 h-[3.25rem] w-[11.5rem]',
            enAvant ? 'fill-pigment-vert' : 'fill-encre',
          )}
        />
      </article>
    </div>
  )
}
