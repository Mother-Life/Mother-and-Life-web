'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const isFr = locale === 'fr'
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  return (
    <form
      className="rounded-[12px] border border-hairline bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        startTransition(async () => {
          const res = await fetch('/api/contact', { method: 'POST', body: data })
          setStatus(res.ok ? 'success' : 'error')
        })
      }}
    >
      <Input name="nom" label={isFr ? 'Nom' : 'Name'} required />
      <Input name="email" type="email" label="Email" required className="mt-4" />
      <Input name="telephone" label={isFr ? 'Téléphone' : 'Phone'} className="mt-4" />
      <div className="mt-4">
        <label className="mb-1.5 block text-[15px] font-medium">{isFr ? 'Sujet' : 'Subject'}</label>
        <select name="sujet" required className="w-full rounded-[8px] border border-hairline px-4 py-3">
          <option value="info">{isFr ? 'Information' : 'Information'}</option>
          <option value="benevolat">{isFr ? 'Bénévolat' : 'Volunteering'}</option>
          <option value="partenariat">{isFr ? 'Partenariat' : 'Partnership'}</option>
          <option value="don">{isFr ? 'Don' : 'Donation'}</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-[15px] font-medium">{isFr ? 'Message' : 'Message'}</label>
        <textarea name="message" required rows={5} className="w-full rounded-[8px] border border-hairline px-4 py-3" />
      </div>
      <label className="mt-4 flex items-start gap-2 text-[14px]">
        <input type="checkbox" name="consentement" required value="true" />
        {isFr ? "J'accepte que mes données soient traitées." : 'I agree to data processing.'}
      </label>
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button type="submit" className="mt-6" disabled={pending}>
        {pending ? dict.common.processing : isFr ? 'Envoyer' : 'Send'}
      </Button>
      {status === 'success' && <p className="mt-4 text-vert-700">{dict.common.thankYou}</p>}
      {status === 'error' && <p className="mt-4 text-rose-700">{dict.common.errorField}</p>}
    </form>
  )
}
