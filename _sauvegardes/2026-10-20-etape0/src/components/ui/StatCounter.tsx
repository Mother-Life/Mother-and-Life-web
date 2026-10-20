'use client'

import { useEffect, useRef } from 'react'

type StatCounterProps = {
  value: number
  suffix?: string
  duration?: number
}

export function StatCounter({ value, suffix = '', duration = 1400 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.textContent = value.toLocaleString('fr-FR') + suffix
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const t0 = performance.now()
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1)
            const v = Math.round(value * (1 - Math.pow(1 - p, 3)))
            el.textContent = v.toLocaleString('fr-FR') + suffix
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.unobserve(el)
        })
      },
      { threshold: 0.6 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, suffix, duration])

  return <span ref={ref}>0</span>
}
