import Link from 'next/link'
import type { Article } from '@/lib/content/types'
import type { Ui } from '@/lib/i18n/ui'
import { Photo } from '../atoms/Photo'

/** Article en ligne : vignette, catégorie, titre ; toute la ligne est cliquable. */
export function LigneArticle({ article, ui }: { article: Article; ui: Ui }) {
  return (
    <article className="group relative flex items-center gap-6 border-b border-filet py-6">
      <div className="relative h-[6.875rem] w-[9.375rem] shrink-0 overflow-hidden rounded-panneau bg-sable">
        <Photo
          image={article.image}
          sizes="150px"
          className="transition-transform duration-500 ease-[var(--ease-sortie)] group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        {article.categorie && (
          <p className="text-surtitre font-semibold text-texte-doux uppercase">{article.categorie}</p>
        )}
        <h3 className="text-h4 font-semibold text-texte">
          <Link href={article.href} className="lien-etendu lien-encre">
            <span className="lien-encre__texte">{article.titre}</span>
          </Link>
        </h3>
        <p aria-hidden="true" className="text-petit text-texte">
          {ui.lire} <span className="fleche">→</span>
        </p>
      </div>
    </article>
  )
}
