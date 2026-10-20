import Link from 'next/link'
import pinceauAlbum from '@/assets/decor/album-pinceau.svg'
import vagues from '@/assets/decor/news-waves.svg'
import type { HomeContent } from '@/lib/content/types'
import type { Ui } from '@/lib/i18n/ui'
import { vars } from '@/lib/style'
import { Illustration } from '../atoms/Illustration'
import { LienFleche } from '../atoms/LienFleche'
import { Photo } from '../atoms/Photo'
import { Surtitre } from '../atoms/Surtitre'
import { LigneArticle } from '../molecules/LigneArticle'

/** S8 · Actualités et album phare « Vie ». */
export function SectionActualites({ actualites, ui }: { actualites: HomeContent['actualites']; ui: Ui }) {
  const { album, articles } = actualites
  return (
    <section aria-labelledby="actualites-titre" className="relative isolate overflow-hidden bg-fond section-py">
      <Illustration
        src={vagues}
        derive
        className="absolute right-[-7.5rem] bottom-[-1rem] -z-10 hidden h-[22rem] w-auto -scale-x-100 lg:block"
      />
      <div className="contenu flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4" data-revele>
          <div className="flex flex-col gap-4">
            <Surtitre ton="bleu">{actualites.surtitre}</Surtitre>
            <h2 id="actualites-titre" className="text-h1 font-semibold text-texte">
              {actualites.titre}
            </h2>
          </div>
          <LienFleche href={actualites.lienTous.href}>{actualites.lienTous.libelle}</LienFleche>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,41.25rem)_1fr]">
          {album && (
            <article className="group relative flex flex-col items-start gap-4" data-revele>
              <p className="rounded-full bg-bleu-050 px-2.5 py-1 text-surtitre font-semibold text-axe-bleu uppercase">
                {ui.albumPhare}
              </p>
              <div className="relative w-full">
                <div className="relative aspect-[660/420] w-full overflow-hidden rounded-porte bg-sable">
                  <Photo
                    image={album.image}
                    sizes="(min-width: 1024px) 660px, 92vw"
                    className="transition-transform duration-700 ease-[var(--ease-sortie)] group-hover:scale-[1.03]"
                  />
                </div>
                {/* Bord peint Craie qui « déchire » le haut de la photo */}
                <Illustration
                  src={pinceauAlbum}
                  encre="gauche"
                  className="absolute top-[-4.25rem] left-[31.5%] h-auto w-[77.2%] max-w-none"
                />
              </div>
              <h3 className="text-h2 font-semibold text-texte">
                <Link href={album.href} className="lien-etendu lien-encre">
                  <span className="lien-encre__texte">{album.titre}</span>
                </Link>
              </h3>
              {album.resume && <p className="text-normal text-texte-doux">{album.resume}</p>}
              <p aria-hidden="true" className="text-normal font-semibold text-axe-bleu">
                {ui.voirAlbum} <span className="fleche">→</span>
              </p>
            </article>
          )}

          {articles.length > 0 && (
            <ul className="flex flex-col">
              {articles.map((article, i) => (
                <li key={article.href} data-revele style={vars({ '--i': i })}>
                  <LigneArticle article={article} ui={ui} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
