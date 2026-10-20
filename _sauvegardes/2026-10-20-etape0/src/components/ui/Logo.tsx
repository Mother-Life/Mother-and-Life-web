import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  showText?: boolean
  className?: string
  href?: string
}

export function Logo({ showText = false, className, href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2.5 no-underline', className)}
      aria-label="Mother & Life — accueil"
    >
      <Image
        src="/assets/logo.svg"
        alt=""
        width={showText ? 180 : 44}
        height={showText ? 44 : 44}
        unoptimized
        priority
        className={cn('h-9 w-auto', showText && 'h-10')}
        aria-hidden={showText}
      />
      {showText && (
        <span className="sr-only">Mother & Life</span>
      )}
    </Link>
  )
}
