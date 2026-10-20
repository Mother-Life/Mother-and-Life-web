'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { upcomingEventBanner } from '@/data/hero'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'
import { pillarColors } from '@/styles/tokens'
import { cn } from '@/lib/utils'

function daysUntil(isoDate: string): number | null {
  const target = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(target.getTime())) return null
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target.getTime() - now.getTime()) / 86_400_000)
  return diff > 0 ? diff : null
}

type Props = {
  locale: Locale
}

export function UpcomingEventBanner({ locale }: Props) {
  const config = upcomingEventBanner
  const isFr = locale === 'fr'
  const [dismissed, setDismissed] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!config.enabled) return
    if (!config.dismissible) {
      setDismissed(false)
      return
    }
    const hidden = sessionStorage.getItem(config.storageKey) === '1'
    setDismissed(hidden)
  }, [config.dismissible, config.enabled, config.storageKey])

  if (!config.enabled || !mounted || dismissed) return null

  const days = daysUntil(config.event.date)
  const pillar = pillarColors[config.event.pillar]
  const href = getLocalizedPath(config.event.cta.path, locale)

  const countdown =
    days === null
      ? null
      : days === 1
        ? isFr
          ? 'Demain'
          : 'Tomorrow'
        : isFr
          ? `Dans ${days} jours`
          : `In ${days} days`

  return (
    <div
      className="sticky top-[72px] z-[99] overflow-hidden border-b border-white/10 bg-nuit text-white"
      role="region"
      aria-label={isFr ? 'Prochain \u00e9v\u00e9nement' : 'Upcoming event'}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(105deg, ${pillar.main}55 0%, transparent 45%, ${pillar.accessible}44 100%)`,
        }}
        aria-hidden="true"
      />
      <div className="event-banner-shimmer pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-12">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: `${pillar.main}33`, color: pillar.main }}
          >
            <span className="event-banner-pulse h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pillar.main }} />
            {isFr ? 'Prochain \u00e9v\u00e9nement' : 'Upcoming event'}
          </span>
          {countdown && (
            <span className="text-[12px] font-semibold text-white/80">{countdown}</span>
          )}
          <p className="min-w-0 text-[14px] leading-snug md:text-[15px]">
            <strong className="font-semibold text-white">{config.event.title[locale]}</strong>
            <span className="hidden text-white/75 sm:inline"> {' \u2014 '}</span>
            <span className="block text-white/75 sm:inline">{config.event.subtitle[locale]}</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={href}
            className={cn(
              'rounded-[8px] px-4 py-2 text-[13px] font-semibold transition-colors',
              'bg-white text-nuit hover:bg-rose-050',
            )}
          >
            {config.event.cta.label[locale]}
          </Link>
          {config.dismissible && (
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem(config.storageKey, '1')
                setDismissed(true)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-white/60 hover:bg-white/10 hover:text-white"
              aria-label={isFr ? 'Fermer la banni\u00e8re' : 'Close banner'}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
