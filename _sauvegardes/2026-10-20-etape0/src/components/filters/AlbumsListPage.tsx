'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Picture } from '@/components/media/Picture'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Kicker } from '@/components/ui/Kicker'
import { sampleAlbums } from '@/data/defaults'
import { getAlbumImage } from '@/lib/assets/images'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export function AlbumsListPage({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const dict = getDictionary(locale)
  const prefix = locale === 'fr' ? '' : '/en'
  const [pilier, setPilier] = useState('')
  const [annee, setAnnee] = useState('')
  const [search, setSearch] = useState('')

  const annees = useMemo(() => [...new Set(sampleAlbums.map((a) => a.annee))].sort((a, b) => b - a), [])

  const filtered = sampleAlbums.filter((album) => {
    const matchPilier = !pilier || album.pilier === pilier
    const matchAnnee = !annee || album.annee === Number(annee)
    const matchSearch = !search || album.titre.toLowerCase().includes(search.toLowerCase())
    return matchPilier && matchAnnee && matchSearch
  })

  const totalPhotos = sampleAlbums.reduce((sum, a) => sum + a.nbPhotos, 0)

  return (
    <Section bg="white">
      <Container>
        <Kicker>{dict.nav.albums}</Kicker>
        <Heading level={1} className="mb-2">
          {isFr ? "Galerie d'activit\u00e9s" : 'Activity gallery'}
        </Heading>
        <p className="mb-8 text-gris-600">
          {sampleAlbums.length} albums, {totalPhotos} photos, depuis 2021
        </p>

        <div
          className="sticky top-[72px] z-10 mb-8 flex flex-wrap gap-3 rounded-[12px] border border-hairline bg-white p-4"
          role="search"
        >
          <input
            type="search"
            aria-label={isFr ? 'Rechercher un album' : 'Search albums'}
            placeholder={isFr ? 'Rechercher...' : 'Search...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-[8px] border border-hairline px-3 py-2"
          />
          <select
            aria-label={isFr ? "Filtrer par axe d'intervention" : 'Filter by pillar'}
            value={pilier}
            onChange={(e) => setPilier(e.target.value)}
            className="rounded-[8px] border border-hairline px-3 py-2"
          >
            <option value="">{isFr ? 'Tous les axes' : 'All pillars'}</option>
            <option value="prevenir">{isFr ? 'Pr\u00e9venir' : 'Prevent'}</option>
            <option value="accompagner">{isFr ? 'Accompagner' : 'Accompany'}</option>
            <option value="autonomie">{isFr ? 'Autonomie' : 'Autonomy'}</option>
          </select>
          <select
            aria-label={isFr ? 'Filtrer par ann\u00e9e' : 'Filter by year'}
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="rounded-[8px] border border-hairline px-3 py-2"
          >
            <option value="">{isFr ? 'Toutes les ann\u00e9es' : 'All years'}</option>
            {annees.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          {(pilier || annee || search) && (
            <button
              type="button"
              onClick={() => { setPilier(''); setAnnee(''); setSearch('') }}
              className="text-[14px] font-semibold text-rose-700"
            >
              {dict.common.resetFilters}
            </button>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} {isFr ? 'album(s)' : 'album(s)'}
        </p>

        {filtered.length === 0 ? (
          <p className="text-gris-600">{dict.common.noResults}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((album) => {
              const image = getAlbumImage(album.slug)
              return (
                <Link
                  key={album.slug}
                  href={`${prefix}/albums/${album.slug}`}
                  className="group overflow-hidden rounded-[12px] border border-hairline shadow-[var(--shadow-card)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gris-100">
                    <Picture
                      src={image.src}
                      alt={image.alt[locale]}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[12px] font-semibold uppercase text-rose-700">{album.pilier}</span>
                    <h2 className="mt-1 text-[18px] font-semibold group-hover:text-rose-700">{album.titre}</h2>
                    <p className="mt-1 text-[14px] text-gris-600">{album.resume}</p>
                    <p className="mt-2 text-[13px] text-gris-600">{album.annee} · {album.nbPhotos} photos</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </Container>
    </Section>
  )
}
