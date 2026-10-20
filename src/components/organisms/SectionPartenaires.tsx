import NextImage from 'next/image'
import type { HomeContent } from '@/lib/content/types'
import { Surtitre } from '../atoms/Surtitre'

/** S9 · Partenaires « Confiance ». Seuls les partenaires à l'accord signé apparaissent. */
export function SectionPartenaires({ partenaires }: { partenaires: HomeContent['partenaires'] }) {
  if (partenaires.logos.length === 0) return null
  return (
    <section aria-labelledby="partenaires-titre" className="bg-fond pt-14 pb-24">
      <div className="contenu flex flex-col items-center gap-14 border-t border-filet pt-10">
        <Surtitre ton="doux" puce={false}>
          <span id="partenaires-titre">{partenaires.surtitre}</span>
        </Surtitre>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {partenaires.logos.map(({ nom, logo, href }) => {
            const image = (
              <NextImage
                src={logo.src}
                alt={nom}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                className="h-12 w-auto object-contain"
              />
            )
            return (
              <li key={nom}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity hover:opacity-80"
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
