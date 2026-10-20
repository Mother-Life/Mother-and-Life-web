import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  narrow?: boolean
  className?: string
}

export function Container({ children, narrow, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-12',
        narrow ? 'max-w-[720px]' : 'max-w-[1200px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
