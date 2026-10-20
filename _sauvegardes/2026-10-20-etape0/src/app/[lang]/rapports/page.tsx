import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'Rapports' : 'Reports',
    description: isFr ? 'Rapports annuels et financiers.' : 'Annual and financial reports.',
    locale: lang as Locale,
    path: '/rapports',
  })
}

export default async function RapportsPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const isFr = lang === 'fr'

  const rapports = [
    { titre: 'Rapport financier 2024-2025', exercice: '2024-2025', type: 'financier' },
    { titre: 'Rapport annuel 2023-2024', exercice: '2023-2024', type: 'annuel' },
    { titre: 'Rapport financier 2022-2023', exercice: '2022-2023', type: 'financier' },
  ]

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="mb-8">
          {isFr ? 'Rapports & transparence' : 'Reports & transparency'}
        </Heading>
        <div className="space-y-4">
          {rapports.map((rapport) => (
            <div key={rapport.exercice} className="rounded-[12px] border border-hairline p-6">
              <p className="text-[13px] font-semibold uppercase text-rose-700">{rapport.type}</p>
              <h2 className="mt-1 text-[20px] font-semibold">{rapport.titre}</h2>
              <p className="mt-2 text-[14px] text-gris-600">
                {isFr ? 'PDF à télécharger — à importer via le CMS' : 'PDF download — to be imported via CMS'}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
