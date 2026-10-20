import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

const pageContent: Record<string, { fr: { title: string; body: string }; en: { title: string; body: string } }> = {
  'raison-d-etre': {
    fr: {
      title: "Raison d'être",
      body: "Depuis 2021, Mother & Life réduit la mortalité maternelle et néonatale au Cameroun. Association déclarée en 2022, active depuis 2021. Six professionnels de santé sur dix membres — une association fondée et dirigée par des sages-femmes.",
    },
    en: {
      title: 'Our purpose',
      body: 'Since 2021, Mother & Life has worked to reduce maternal and neonatal mortality in Cameroon. Registered in 2022, active since 2021. Six health professionals out of ten members — an association founded and led by midwives.',
    },
  },
  'perinatalite-sociale': {
    fr: {
      title: 'La périnatalité sociale',
      body: "Mère + enfant + communauté. Six dimensions : santé, nutrition, conditions de vie, soutien psychosocial, éducation, solidarité. C'est la thèse du site et le cœur de notre action.",
    },
    en: {
      title: 'Social perinatality',
      body: 'Mother + child + community. Six dimensions: health, nutrition, living conditions, psychosocial support, education, solidarity.',
    },
  },
  equipe: {
    fr: {
      title: 'Équipe & partenaires',
      body: "10 membres, dont 6 professionnels de santé : 2 sages-femmes, 1 maïeuticien, 2 infirmières, 1 médecin généraliste. Comptabilité, ingénierie biologique, droit et design complètent l'équipe.",
    },
    en: {
      title: 'Team & partners',
      body: '10 members, including 6 health professionals: 2 midwives, 1 obstetrician, 2 nurses, 1 general practitioner.',
    },
  },
  impacts: {
    fr: {
      title: 'Impacts & transparence',
      body: '75 femmes suivies, 36 naissances accompagnées, 12 000+ interventions communautaires. 71 % des dépenses vont directement aux programmes.',
    },
    en: {
      title: 'Impact & transparency',
      body: '75 women supported, 36 births accompanied, 12,000+ community interventions. 71% of expenses go directly to programs.',
    },
  },
}

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = Object.keys(pageContent)
  const langs = ['fr', 'en']
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang) || !pageContent[slug]) return {}
  const content = pageContent[slug][lang as Locale]
  return buildMetadata({
    title: content.title,
    description: content.body,
    locale: lang as Locale,
    path: `/a-propos/${slug}`,
  })
}

export default async function AboutPage({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()

  if (slug === 'pourquoi-agir') {
    const { PourquoiAgir } = await import('@/components/sections/PourquoiAgir')
    const { ChaineImpact } = await import('@/components/sections/ChaineImpact')
    const { TransparenceBand } = await import('@/components/sections/TransparenceBand')
    return (
      <>
        <PourquoiAgir locale={lang as Locale} />
        <ChaineImpact locale={lang as Locale} />
        <TransparenceBand locale={lang as Locale} />
      </>
    )
  }

  const content = pageContent[slug]
  if (!content) notFound()
  const page = content[lang as Locale]

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="rv mb-6">{page.title}</Heading>
        <p className="rv text-gris-600">{page.body}</p>
        {slug === 'impacts' && (
          <>
            <div className="mt-12">
              <ChaineImpactSection locale={lang as Locale} />
            </div>
            <TransparenceSection locale={lang as Locale} />
          </>
        )}
      </Container>
    </Section>
  )
}

async function ChaineImpactSection({ locale }: { locale: Locale }) {
  const { ChaineImpact } = await import('@/components/sections/ChaineImpact')
  return <ChaineImpact locale={locale} />
}

async function TransparenceSection({ locale }: { locale: Locale }) {
  const { TransparenceBand } = await import('@/components/sections/TransparenceBand')
  return <TransparenceBand locale={locale} />
}
