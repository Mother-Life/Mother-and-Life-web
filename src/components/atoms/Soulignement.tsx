import { cn } from '@/lib/cn'

/**
 * Soulignement peint de la maquette (vecteur 299 × 24). Il s'étire sous le mot
 * souligné et se peint de gauche à droite à l'apparition.
 */
export function Soulignement({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 299 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'pointer-events-none absolute -bottom-[0.18em] -left-[0.04em] h-[0.3em] w-[104%] rotate-[1.5deg]',
        className,
      )}
    >
      <path
        fill="var(--color-pigment-rose)"
        opacity=".85"
        d="m4.68 5 .13-5 20.57 1.44 20.65 2.14 20.64-1.26 20.65 2.04 20.61.04 20.68.84 20.65-1.46 20.56 1.64 20.7.24L211.1 6.9l20.78-2.85 20.51 3.53 20.73-.75 20.57 1.33c7.95 2.26 5.66 13.19-.39 15l-20.56-1.64-20.71-.04-20.58-1.04-20.73.76-20.56-1.74-20.65-2.04-20.67 2.16-20.54-2.24-20.74 1.16-20.59-.74-20.72.45-20.57-1.33-20.66-1.65-20.68 2.46C-1.6 15.52-1.4 7.84 4.68 5"
      />
    </svg>
  )
}
