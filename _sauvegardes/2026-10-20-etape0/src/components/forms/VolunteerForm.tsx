'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export function VolunteerForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const isFr = locale === 'fr'
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        data.set('type', 'benevolat')
        startTransition(async () => {
          const res = await fetch('/api/candidature', { method: 'POST', body: data })
          setStatus(res.ok ? 'success' : 'error')
        })
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="nom" label={isFr ? 'Nom' : 'Name'} required />
        <Input name="email" type="email" label="Email" required />
        <Input name="telephone" label={isFr ? 'Téléphone' : 'Phone'} />
        <Input name="ville" label={isFr ? 'Ville' : 'City'} />
      </div>
      <Input name="disponibilite" label={isFr ? 'Disponibilité' : 'Availability'} className="mt-4" />
      <div className="mt-4">
        <label className="mb-1.5 block font-medium">{isFr ? 'Compétences' : 'Skills'}</label>
        <textarea name="competences" rows={3} className="w-full rounded-[8px] border border-hairline px-4 py-3" />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block font-medium">{isFr ? 'Motivation' : 'Motivation'}</label>
        <textarea name="motivation" required rows={4} className="w-full rounded-[8px] border border-hairline px-4 py-3" />
      </div>
      <Button type="submit" className="mt-6" disabled={pending}>
        {pending ? dict.common.processing : isFr ? 'Envoyer ma candidature' : 'Submit application'}
      </Button>
      {status === 'success' && <p className="mt-4 text-vert-700">{dict.common.thankYou}</p>}
    </form>
  )
}
