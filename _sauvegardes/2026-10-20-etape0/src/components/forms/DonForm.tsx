'use client'

import { useState, useTransition } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { donPaliers } from '@/data/defaults'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

type Step = 'montant' | 'affectation' | 'canal' | 'declaration' | 'confirmation'

export function DonForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const isFr = locale === 'fr'
  const [step, setStep] = useState<Step>('montant')
  const [montant, setMontant] = useState<number | null>(null)
  const [affectation, setAffectation] = useState('general')
  const [canal, setCanal] = useState('momo')
  const [pending, startTransition] = useTransition()

  const affectations = [
    { value: 'general', label: isFr ? 'Général' : 'General' },
    { value: 'grossesse', label: isFr ? 'Grossesse' : 'Pregnancy' },
    { value: 'education', label: isFr ? 'Éducation' : 'Education' },
    { value: 'autonomie', label: isFr ? 'Autonomie' : 'Autonomy' },
  ]

  const canaux = [
    { value: 'momo', label: 'MTN MoMo', actif: false },
    { value: 'om', label: 'Orange Money', actif: false },
    { value: 'virement', label: isFr ? 'Virement' : 'Bank transfer', actif: false },
    { value: 'especes', label: isFr ? 'Espèces (antennes)' : 'Cash (branches)', actif: true },
  ]

  const canauxActifs = canaux.filter((c) => c.actif)

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="mb-8">{isFr ? 'Faire un don' : 'Donate'}</Heading>

        {step === 'montant' && (
          <div>
            <p className="mb-6 text-gris-600">{isFr ? 'Choisissez un montant' : 'Choose an amount'}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {donPaliers.map((palier) => (
                <button
                  key={palier.libelle}
                  type="button"
                  onClick={() => { setMontant(palier.montant); setStep('affectation') }}
                  className={cn(
                    'rounded-[12px] border border-hairline p-5 text-left hover:border-rose-700',
                    montant === palier.montant && 'border-rose-700 bg-rose-050',
                  )}
                >
                  <div className="font-semibold">{palier.libelle}</div>
                  <div className="mt-1 text-[14px] text-gris-600">{palier.equivalence}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'affectation' && (
          <div>
            <p className="mb-4 text-gris-600">{isFr ? 'Affectation du don' : 'Donation allocation'}</p>
            <div className="space-y-2">
              {affectations.map((a) => (
                <label key={a.value} className="flex items-center gap-2">
                  <input type="radio" name="affectation" value={a.value} checked={affectation === a.value} onChange={() => setAffectation(a.value)} />
                  {a.label}
                </label>
              ))}
            </div>
            <Button className="mt-6" onClick={() => setStep('canal')}>{isFr ? 'Continuer' : 'Continue'}</Button>
          </div>
        )}

        {step === 'canal' && (
          <div>
            {canauxActifs.length === 0 ? (
              <p className="text-gris-600">
                {isFr
                  ? 'Les canaux de paiement seront disponibles prochainement. Contactez-nous via WhatsApp.'
                  : 'Payment channels will be available soon. Contact us via WhatsApp.'}
              </p>
            ) : (
              <>
                <p className="mb-4 text-gris-600">{isFr ? 'Choisissez un canal' : 'Choose a channel'}</p>
                {canauxActifs.map((c) => (
                  <label key={c.value} className="mb-2 flex items-center gap-2">
                    <input type="radio" value={c.value} checked={canal === c.value} onChange={() => setCanal(c.value)} />
                    {c.label}
                  </label>
                ))}
              </>
            )}
            <Button className="mt-6" onClick={() => setStep('declaration')}>
              {isFr ? 'J\'ai effectue mon transfert' : 'I have made my transfer'}
            </Button>
          </div>
        )}

        {step === 'declaration' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              data.set('montant', String(montant ?? 0))
              data.set('affectation', affectation)
              data.set('canal', canal)
              startTransition(async () => {
                await new Promise((r) => setTimeout(r, 500))
                await fetch('/api/don', { method: 'POST', body: data })
                setStep('confirmation')
              })
            }}
          >
            <Input name="donateurNom" label={isFr ? 'Nom (ou anonyme)' : 'Name (or anonymous)'} />
            <Input name="donateurEmail" type="email" label="Email" className="mt-4" />
            <Input name="donateurTéléphone" label={isFr ? 'Téléphone' : 'Phone'} className="mt-4" />
            <Input name="reference" label={isFr ? 'Reference transaction' : 'Transaction reference'} className="mt-4" />
            <label className="mt-4 flex items-center gap-2">
              <input type="checkbox" name="anonyme" value="true" />
              {isFr ? 'Don anonyme' : 'Anonymous donation'}
            </label>
            <Button type="submit" className="mt-6" disabled={pending}>
              {pending ? dict.common.processing : isFr ? 'Declarer mon don' : 'Declare my donation'}
            </Button>
          </form>
        )}

        {step === 'confirmation' && (
          <div className="text-center">
            <p className="text-[20px] font-semibold text-vert-700">{dict.common.thankYou}</p>
          </div>
        )}
      </Container>
    </Section>
  )
}
