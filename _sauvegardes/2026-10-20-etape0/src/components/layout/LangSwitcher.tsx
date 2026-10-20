'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n/config'
import { localeLabels } from '@/lib/i18n/config'

export function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  const switchTo = locale === 'fr' ? 'en' : 'fr'
  const newPath =
    switchTo === 'en'
      ? pathname === '/' ? '/en' : `/en${pathname}`
      : pathname.replace(/^\/en/, '') || '/'

  return (
    <Link
      href={newPath}
      className="rounded-[6px] border border-hairline px-2.5 py-1 text-[13px] font-semibold text-encre hover:border-rose-700"
      aria-label={switchTo === 'en' ? 'Switch to English' : 'Passer en français'}
    >
      {localeLabels[switchTo]}
    </Link>
  )
}
