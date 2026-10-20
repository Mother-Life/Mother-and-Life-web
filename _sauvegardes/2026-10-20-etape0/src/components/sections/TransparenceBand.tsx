import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import type { Locale } from '@/lib/i18n/config'

const points = [
  'Compte bancaire au nom de l\'association, pas au nom d\'une personne',
  'Trois mandataires, deux signatures minimum pour toute opération',
  'Un commissaire aux comptes distinct du trésorier',
  '71 % des dépenses vont aux programmes',
  'Rapports financiers annuels téléchargeables',
]

const pointsEn = [
  'Bank account in the association\'s name, not an individual\'s',
  'Three signatories, minimum two signatures for any withdrawal',
  'Independent auditor separate from the treasurer',
  '71% of expenses go to programs',
  'Annual financial reports available for download',
]

export function TransparenceBand({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const items = isFr ? points : pointsEn
  return (
    <Section bg="gray">
      <Container narrow>
        <Heading level={2} className="rv mb-6">
          {isFr ? 'Transparence financière' : 'Financial transparency'}
        </Heading>
        <ul className="space-y-3">
          {items.map((point) => (
            <li key={point} className="rv flex items-start gap-3 text-[16px]">
              <span className="mt-1 text-vert-700">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
