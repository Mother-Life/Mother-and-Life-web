import type { Porte } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { LienFleche } from '../atoms/LienFleche'
import { Pinceau } from '../atoms/Pinceau'
import { Picto, type NomPicto } from '../atoms/Picto'

const pictos: Record<Porte['icone'], NomPicto> = { accompagnee: 'enceinte', don: 'aider', rejoindre: 'engager' }

/**
 * Porte d'entrée : une carte entièrement cliquable par public.
 * `principale` : la porte des bénéficiaires, en rose (une seule impulsion rose).
 */
export function CartePorte({ porte, principale = false }: { porte: Porte; principale?: boolean }) {
  return (
    <article
      className={cn(
        'group relative flex w-full flex-col gap-3.5 overflow-hidden rounded-porte p-8 transition-[translate,box-shadow] duration-300 ease-[var(--ease-sortie)] hover:-translate-y-1 hover:shadow-flottant focus-within:-translate-y-1',
        principale ? 'bg-axe-rose text-craie' : 'bg-craie text-texte',
      )}
    >
      <Picto nom={pictos[porte.icone]} className={principale ? 'text-craie' : 'text-encre'} />
      <h3 className="text-h2 font-semibold">{porte.titre}</h3>
      <p className={cn('flex-1 text-normal', principale ? 'text-craie' : 'text-texte-doux')}>{porte.texte}</p>
      <LienFleche
        href={porte.lien.href}
        etendu
        ton={principale ? 'craie' : porte.icone === 'rejoindre' ? 'bleu' : 'texte'}
        className="mt-2 hover:no-underline"
      >
        {porte.lien.libelle}
      </LienFleche>
      <Pinceau className="porte-pinceau pointer-events-none absolute -right-5 -bottom-[1.9rem] h-[3.25rem] w-[11.5rem] fill-pigment-vert" />
    </article>
  )
}
