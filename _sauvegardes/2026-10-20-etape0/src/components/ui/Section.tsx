import { cn } from '@/lib/utils'

type SectionBg = 'white' | 'gray' | 'rose' | 'bleu' | 'vert' | 'night'

const bgMap: Record<SectionBg, string> = {
  white: 'bg-white',
  gray: 'bg-gris-100',
  rose: 'bg-rose-050',
  bleu: 'bg-bleu-050',
  vert: 'bg-vert-050',
  night: 'bg-nuit text-white',
}

type SectionProps = {
  id?: string
  bg?: SectionBg
  children: React.ReactNode
  className?: string
  padding?: boolean
}

export function Section({ id, bg = 'white', children, className, padding = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(bgMap[bg], padding && 'py-16 md:py-24', className)}
    >
      {children}
    </section>
  )
}
