import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Picture } from '@/components/media/Picture'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { sampleNews } from '@/data/defaults'
import { getNewsImage } from '@/lib/assets/images'
import { buildArticleJsonLd, buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  const langs = ['fr', 'en']
  return langs.flatMap((lang) => sampleNews.map((article) => ({ lang, slug: article.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) return {}
  const article = sampleNews.find((a) => a.slug === slug)
  if (!article) return {}
  return buildMetadata({
    title: article.titre,
    description: article.extrait,
    locale: lang as Locale,
    path: `/actualites/${slug}`,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()
  const article = sampleNews.find((a) => a.slug === slug)
  if (!article) notFound()
  const prefix = lang === 'fr' ? '' : '/en'
  const locale = lang as Locale
  const image = getNewsImage(slug)

  const jsonLd = buildArticleJsonLd({
    title: article.titre,
    description: article.extrait,
    path: `/actualites/${slug}`,
    locale,
    image: image.src,
    section: article.categorie,
  })

  return (
    <Section bg="white">
      <Container narrow>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mb-8 overflow-hidden rounded-[12px] bg-gris-100">
          <Picture
            src={image.src}
            alt={image.alt[locale]}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        <p className="text-[13px] text-gris-600">
          {article.categorie}
          {' \u00b7 '}
          {article.date}
        </p>
        <Heading level={1} className="mt-4 mb-6">{article.titre}</Heading>
        <p className="text-gris-600">{article.extrait}</p>
        <p className="mt-6 text-gris-600">
          {locale === 'fr' ? 'Contenu complet à venir via le CMS Payload.' : 'Full content coming via Payload CMS.'}
        </p>
        <Link href={`${prefix}/actualites`} className="mt-8 inline-block font-semibold text-rose-700">
          ← {locale === 'fr' ? 'Retour aux actualités' : 'Back to news'}
        </Link>
      </Container>
    </Section>
  )
}
