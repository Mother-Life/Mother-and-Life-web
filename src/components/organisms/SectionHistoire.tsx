import type { HomeContent } from '@/lib/content/types'
import { LienFleche } from '../atoms/LienFleche'
import { Surtitre } from '../atoms/Surtitre'

/**
 * S6 · Histoire mise en avant « Appartenance ». Uniquement une histoire réelle
 * dont le consentement est vérifié : sans elle, la section ne s'affiche pas.
 */
export function SectionHistoire({ histoire }: { histoire: HomeContent['histoire'] }) {
  if (!histoire.histoire) return null
  const { citation, prenom, role } = histoire.histoire
  return (
    <section aria-labelledby="histoire-titre" className="relative isolate overflow-hidden bg-fond section-py">
      <figure className="contenu flex max-w-[51.25rem] flex-col items-center gap-5 text-center" data-revele>
        <Surtitre className="justify-center">
          <span id="histoire-titre">{histoire.surtitre}</span>
        </Surtitre>
        <svg viewBox="0 0 51 40" width="51" height="40" aria-hidden="true" className="text-pigment-rose">
          <path
            fill="currentColor"
            d="M11.2 39.62q-5.74 0-8.54-3.64Q0 32.33 0 26.74q0-4.9 2.1-9.52a34 34 0 0 1 6.02-9.1A47 47 0 0 1 17.5 0l1.68 2.24q-5.74 4.48-8.26 9.24A22 22 0 0 0 8.4 21h3.78q3.36 0 5.46 1.12a6.3 6.3 0 0 1 3.08 2.94 8 8 0 0 1 1.12 4.2q0 4.34-3.08 7.42-2.94 2.94-7.56 2.94m28.42 0q-5.74 0-8.54-3.64-2.66-3.65-2.66-9.24 0-4.9 2.1-9.52a37 37 0 0 1 6.16-9.1A49 49 0 0 1 45.92 0l1.82 2.24q-5.88 4.48-8.4 9.24A22 22 0 0 0 36.82 21h3.78q3.36 0 5.46 1.12a6.2 6.2 0 0 1 3.22 2.94 8 8 0 0 1 1.12 4.2q0 4.34-3.08 7.42-2.94 2.94-7.7 2.94"
          />
        </svg>
        <blockquote className="font-serif text-citation font-semibold text-texte italic">
          <p>{citation}</p>
        </blockquote>
        <figcaption className="flex items-center gap-4 text-start">
          <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true" className="shrink-0 text-vert-clair">
            <path
              fill="currentColor"
              d="M0 21.29C0 6.57 13.77-1.94 35.63.38 38.06 22.06 28.34 36 13.77 36 5.67 36 0 30.58 0 21.29"
            />
          </svg>
          <span className="flex flex-col gap-0.5">
            <span className="text-normal font-semibold text-texte">{prenom}</span>
            {role && <span className="text-petit text-texte-doux">{role}</span>}
          </span>
        </figcaption>
        <LienFleche href={histoire.lien.href} ton="accent">
          {histoire.lien.libelle}
        </LienFleche>
      </figure>
    </section>
  )
}
