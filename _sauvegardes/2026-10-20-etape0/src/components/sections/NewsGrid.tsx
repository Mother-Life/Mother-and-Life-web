import Link from 'next/link'
import { Picture } from '@/components/media/Picture'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { Heading } from '@/components/ui/Heading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { sampleNews } from '@/data/defaults'
import { getNewsImage } from '@/lib/assets/images'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'

export function NewsGrid({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const prefix = locale === 'fr' ? '' : '/en'

  return (
    <Section id="actus" bg="gray">
      <Container>
        <div className="rv mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>{isFr ? 'Actualités' : 'News'}</Kicker>
            <Heading level={2}>{isFr ? 'Sur le terrain, en ce moment.' : 'On the ground, right now.'}</Heading>
          </div>
          <ArrowLink href={getLocalizedPath('/actualites', locale)}>
            {isFr ? 'Toutes les actualités' : 'All news'}
          </ArrowLink>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {sampleNews.map((article) => {
            const image = getNewsImage(article.slug)
            return (
              <article
                key={article.slug}
                className="rv flex flex-col overflow-hidden rounded-[12px] border border-hairline bg-white shadow-[var(--shadow-card)]"
              >
                <div className="aspect-video overflow-hidden bg-gris-100">
                  <Picture
                    src={image.src}
                    alt={image.alt[locale]}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <p className="text-[13px] text-gris-600">
                    <b className="font-semibold text-rose-700">{article.categorie}</b>{' · '}{article.date}
                  </p>
                  <h3 className="text-[20px] leading-[1.3] font-semibold">{article.titre}</h3>
                  <p className="flex-1 text-[15px] text-gris-600">{article.extrait}</p>
                  <Link href={`${prefix}/actualites/${article.slug}`} className="text-[16px] font-semibold text-rose-700 hover:underline">
                    {isFr ? 'Lire' : 'Read'}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
