import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'white' | 'outline'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-rose-700 text-white hover:bg-rose',
  ghost: 'bg-transparent text-white border border-white/60 hover:bg-white/10',
  white: 'bg-white text-nuit hover:bg-rose-050',
  outline: 'bg-transparent text-encre border border-hairline hover:border-encre',
}

type ButtonProps = {
  variant?: ButtonVariant
  href?: string
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  variant = 'primary',
  href,
  className,
  children,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-[8px] px-[26px] py-[13px] text-[15px] font-semibold transition-colors',
    variants[variant],
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
