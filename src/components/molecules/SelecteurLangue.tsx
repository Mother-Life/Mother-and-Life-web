'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/cn'

const libelles: Record<Locale, { court: string; long: string }> = {
  fr: { court: 'FR', long: 'Français' },
  en: { court: 'EN', long: 'English' },
}

/** Bascule FR | EN vers la même page dans l'autre langue. */
export function SelecteurLangue({
  locale,
  libelle,
  className,
}: {
  locale: Locale
  libelle: string
  className?: string
}) {
  const pathname = usePathname() ?? '/'
  const chemin = pathname.replace(/^\/en(?=\/|$)/, '') || '/'

  return (
    <nav aria-label={libelle} className={cn('flex items-center gap-1', className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true">|</span>}
          <Link
            href={l === 'fr' ? chemin : `/en${chemin === '/' ? '' : chemin}`}
            hrefLang={l}
            lang={l}
            aria-label={libelles[l].long}
            aria-current={l === locale ? 'true' : undefined}
            className={cn('rounded-sm px-0.5 hover:underline', l === locale ? 'font-bold' : 'opacity-80')}
          >
            {libelles[l].court}
          </Link>
        </span>
      ))}
    </nav>
  )
}
