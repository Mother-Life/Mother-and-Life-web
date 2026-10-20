import { notFound } from 'next/navigation'
import { HeroDeclaration } from '@/components/sections/HeroDeclaration'
import { MissionTrio } from '@/components/sections/MissionTrio'
import { StatsBand } from '@/components/sections/StatsBand'
import { ZigzagPillars } from '@/components/sections/ZigzagPillars'
import { CampaignBand } from '@/components/sections/CampaignBand'
import { QuoteBlock } from '@/components/sections/QuoteBlock'
import { NewsGrid } from '@/components/sections/NewsGrid'
import { ChaineImpact } from '@/components/sections/ChaineImpact'
import { buildMetadata, buildNgoJsonLd } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'P\u00e9rinatalit\u00e9 sociale au Cameroun' : 'Social perinatality in Cameroon',
    description: isFr
      ? 'Mother & Life accompagne gratuitement les femmes enceintes vuln\u00e9rables du Cameroun.'
      : 'Mother & Life provides free support to vulnerable pregnant women in Cameroon.',
    locale: lang as Locale,
    path: '/',
  })
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const isFr = locale === 'fr'

  const jsonLd = buildNgoJsonLd()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroDeclaration locale={locale} />
      <MissionTrio locale={locale} />
      <StatsBand />
      <ZigzagPillars locale={locale} />
      <CampaignBand locale={locale} />
      <ChaineImpact locale={locale} />
      <QuoteBlock
        citation={
          isFr
            ? "Malgr\u00e9 les difficult\u00e9s, nos actions ont permis de r\u00e9duire la mortalit\u00e9 maternelle et infantile et d'apporter espoir \u00e0 de nombreuses familles."
            : 'Despite challenges, our actions have helped reduce maternal and infant mortality and brought hope to many families.'
        }
        auteur="R\u00e9gine Flore"
        fonction={isFr ? 'Sage-femme, pr\u00e9sidente & cofondatrice' : 'Midwife, president & co-founder'}
      />
      <NewsGrid locale={locale} />
      <QuoteBlock
        citation={
          isFr
            ? "Votre aide m'a permis d'avoir l'esprit tranquille pendant toute ma grossesse. Aujourd'hui mon fils a deux ans, et moi j'ai un m\u00e9tier."
            : 'Your help allowed me to have peace of mind throughout my pregnancy. Today my son is two, and I have a trade.'
        }
        auteur="A\u00efcha*"
        fonction={isFr ? 'Maman accompagn\u00e9e \u00e0 B\u00e9panda \u2014 *pr\u00e9nom modifi\u00e9' : 'Supported mother in B\u00e9panda \u2014 *name changed'}
        varianteRose
      />
    </>
  )
}
