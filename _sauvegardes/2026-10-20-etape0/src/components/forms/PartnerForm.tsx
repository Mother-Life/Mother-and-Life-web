'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export function PartnerForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const isFr = locale === 'fr'
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        data.set('type', 'partenaire')
        startTransition(async () => {
          const res = await fetch('/api/candidature', { method: 'POST', body: data })
          setStatus(res.ok ? 'success' : 'error')
        })
      }}
    >
      <Input name="organisation" label={isFr ? 'Organisation' : 'Organization'} required />
      <Input name="nom" label={isFr ? 'Contact' : 'Contact name'} required className="mt-4" />
      <Input name="email" type="email" label="Email" required className="mt-4" />
      <div className="mt-4">
        <label className="mb-1.5 block font-medium">{isFr ? 'Message' : 'Message'}</label>
        <textarea name="motivation" required rows={5} className="w-full rounded-[8px] border border-hairline px-4 py-3" />
      </div>
      <Button type="submit" className="mt-6" disabled={pending}>
        {pending ? dict.common.processing : isFr ? 'Proposer un partenariat' : 'Propose partnership'}
      </Button>
      {status === 'success' && <p className="mt-4 text-vert-700">{dict.common.thankYou}</p>}
    </form>
  )
}
