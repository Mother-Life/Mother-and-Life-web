'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Picture } from '@/components/media/Picture'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Kicker } from '@/components/ui/Kicker'
import { sampleNews } from '@/data/defaults'
import { getNewsImage } from '@/lib/assets/images'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export function NewsListPage({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const dict = getDictionary(locale)
  const prefix = locale === 'fr' ? '' : '/en'
  const [search, setSearch] = useState('')
  const [categorie, setCategorie] = useState('')

  const categories = useMemo(() => [...new Set(sampleNews.map((n) => n.categorie))], [])

  const filtered = sampleNews.filter((article) => {
    const matchSearch =
      !search ||
      article.titre.toLowerCase().includes(search.toLowerCase()) ||
      article.extrait.toLowerCase().includes(search.toLowerCase())
    const matchCat = !categorie || article.categorie === categorie
    return matchSearch && matchCat
  })

  return (
    <Section bg="white">
      <Container>
        <Kicker>{isFr ? 'Actualités' : 'News'}</Kicker>
        <Heading level={1} className="mb-8">{isFr ? 'Actualités & événements' : 'News & events'}</Heading>

        <div className="mb-8 flex flex-wrap gap-4" role="search">
          <input
            type="search"
            aria-label={isFr ? 'Rechercher une actualit\u00e9' : 'Search news'}
            placeholder={isFr ? 'Rechercher...' : 'Search...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-[8px] border border-hairline px-4 py-2.5"
          />
          <select
            aria-label={isFr ? 'Filtrer par cat\u00e9gorie' : 'Filter by category'}
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="rounded-[8px] border border-hairline px-4 py-2.5"
          >
            <option value="">{isFr ? 'Toutes les catégories' : 'All categories'}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} {isFr ? 'r\u00e9sultat(s)' : 'result(s)'}
        </p>

        {filtered.length === 0 ? (
          <p className="text-gris-600">{dict.common.noResults}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => {
              const image = getNewsImage(article.slug)
              return (
                <article key={article.slug} className="overflow-hidden rounded-[12px] border border-hairline bg-white">
                  <div className="aspect-video overflow-hidden bg-gris-100">
                    <Picture
                      src={image.src}
                      alt={image.alt[locale]}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[13px] text-gris-600">
                      {article.categorie}
                      {' \u00b7 '}
                      {article.date}
                    </p>
                    <h2 className="mt-2 text-[20px] font-semibold">{article.titre}</h2>
                    <p className="mt-2 text-[15px] text-gris-600">{article.extrait}</p>
                    <Link href={`${prefix}/actualites/${article.slug}`} className="mt-4 inline-block font-semibold text-rose-700">
                      {isFr ? 'Lire' : 'Read'}
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Container>
    </Section>
  )
}
