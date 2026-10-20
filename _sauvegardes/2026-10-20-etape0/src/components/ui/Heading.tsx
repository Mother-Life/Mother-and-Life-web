import { cn } from '@/lib/utils'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3'
  level?: 1 | 2 | 3
  children: React.ReactNode
  className?: string
}

const levelStyles = {
  1: 'text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.15] tracking-[-0.015em]',
  2: 'text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] tracking-[-0.01em]',
  3: 'text-[23px] leading-[1.3]',
}

export function Heading({ as, level = 2, children, className }: HeadingProps) {
  const Tag = as ?? (`h${level}` as 'h1' | 'h2' | 'h3')
  return <Tag className={cn('font-display font-semibold', levelStyles[level], className)}>{children}</Tag>
}
