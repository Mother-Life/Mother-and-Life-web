'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Picture } from '@/components/media/Picture'
import { Kicker } from '@/components/ui/Kicker'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { heroCarouselConfig, type HeroSlide } from '@/data/hero'
import { siteImages } from '@/lib/assets/images'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

type Props = {
  locale: Locale
  slides: HeroSlide[]
}

export function HeroCarousel({ locale, slides }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  // Les diapositives ne sont montees qu'au fur et a mesure : monter les cinq
  // images d'emblee couterait environ 470 Ko au premier rendu.
  const [mounted, setMounted] = useState<number[]>(() => (slides.length > 1 ? [0, 1] : [0]))
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const remainingRef = useRef(heroCarouselConfig.autoplayMs)
  const startedAtRef = useRef(0)
  const count = slides.length
  const isFr = locale === 'fr'

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count)
    },
    [count],
  )

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    setMounted((current) => {
      const upcoming = (active + 1) % count
      if (current.includes(active) && current.includes(upcoming)) return current
      return [...new Set([...current, active, upcoming])]
    })
  }, [active, count])

  // Remet le compte a rebours a zero a chaque changement de diapositive.
  // Doit rester declare avant l'effet d'autoplay ci-dessous.
  useEffect(() => {
    remainingRef.current = heroCarouselConfig.autoplayMs
  }, [active])

  // Un seul minuteur par diapositive, au lieu d'un rendu toutes les 50 ms.
  // La barre de progression est animee en CSS, sans etat React.
  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return
    startedAtRef.current = Date.now()
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), remainingRef.current)
    return () => {
      window.clearTimeout(id)
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current))
    }
  }, [active, count, paused, reducedMotion])

  // Les fleches ne pilotent le carrousel que si le focus est a l'interieur,
  // pour ne pas intercepter la navigation clavier du reste de la page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const node = containerRef.current
      if (!node || !document.activeElement || !node.contains(document.activeElement)) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const slide = slides[active]

  const resolveHref = (path: string) => {
    if (path.startsWith('#')) return path
    return getLocalizedPath(path, locale)
  }

  return (
    <div
      ref={containerRef}
      className="rv relative mt-10 md:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current
        const end = e.changedTouches[0]?.clientX
        touchStartX.current = null
        if (start == null || end == null) return
        const delta = end - start
        if (Math.abs(delta) > 48) {
          if (delta < 0) next()
          else prev()
        }
      }}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-gris-600">
          {isFr ? '\u00c0 la une' : 'Featured'}
        </p>
        <p className="text-[13px] tabular-nums text-gris-600" aria-live="polite">
          {active + 1} / {count}
        </p>
      </div>

      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-nuit sm:aspect-[21/9] sm:min-h-[300px] md:min-h-[380px]"
        role="region"
        aria-roledescription="carousel"
        aria-label={isFr ? 'Activit\u00e9s et \u00e9v\u00e9nements' : 'Activities and events'}
      >
        {slides.map((s, i) => {
          const img = siteImages[s.imageKey]
          const isActive = i === active
          return (
            <div
              key={s.id}
              className={cn(
                'absolute inset-0 transition-[opacity,transform] ease-out',
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0',
              )}
              style={{
                transitionDuration: reducedMotion ? '0ms' : `${heroCarouselConfig.transitionMs}ms`,
              }}
              aria-hidden={!isActive}
            >
              <div
                className={cn(
                  'absolute inset-[-4%] h-[108%] w-[108%]',
                  isActive && !reducedMotion && 'animate-hero-ken-burns',
                )}
              >
                {mounted.includes(i) && (
                  <Picture
                    src={img.src}
                    alt={img.alt[locale]}
                    width={img.width}
                    height={img.height}
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          )
        })}

        <div
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-nuit via-nuit/50 to-nuit/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-nuit/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-8 md:p-10">
          <div key={slide.id} className={cn('max-w-[52ch]', !reducedMotion && 'animate-hero-content-in')}>
            <Kicker pillar={slide.pillar} className="!text-white/90">
              {slide.kicker[locale]}
            </Kicker>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.12] text-white">
              {slide.title[locale]}
            </h2>
            <p className="mt-2 max-w-[48ch] text-[15px] text-white/85 sm:text-[17px]">
              {slide.description[locale]}
            </p>
            {slide.cta && (
              <div className="mt-4">
                {slide.cta.path.startsWith('#') ? (
                  <ArrowLink href={slide.cta.path} className="!text-white hover:!text-rose-050">
                    {slide.cta.label[locale]}
                  </ArrowLink>
                ) : (
                  <Link
                    href={resolveHref(slide.cta.path)}
                    className="inline-flex items-center gap-1 text-[16px] font-semibold text-white hover:text-rose-050"
                  >
                    {slide.cta.label[locale]}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-nuit/40 text-white backdrop-blur-sm transition hover:bg-nuit/70 sm:flex"
              aria-label={isFr ? 'Diapositive pr\u00e9c\u00e9dente' : 'Previous slide'}
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-nuit/40 text-white backdrop-blur-sm transition hover:bg-nuit/70 sm:flex"
              aria-label={isFr ? 'Diapositive suivante' : 'Next slide'}
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 z-40 flex gap-1 px-5 pb-3 sm:px-8 sm:pb-4">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/25"
              aria-label={
                isFr
                  ? `Aller \u00e0 la diapositive ${i + 1} : ${s.title.fr}`
                  : `Go to slide ${i + 1}: ${s.title.en}`
              }
              aria-current={i === active ? 'true' : undefined}
            >
              {i === active && !reducedMotion ? (
                <span
                  key={active}
                  className="absolute inset-y-0 left-0 w-0 rounded-full bg-white animate-hero-progress"
                  style={{
                    animationDuration: `${heroCarouselConfig.autoplayMs}ms`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              ) : (
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-300 ease-linear',
                    i < active || (i === active && reducedMotion) ? 'w-full' : 'w-0',
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
