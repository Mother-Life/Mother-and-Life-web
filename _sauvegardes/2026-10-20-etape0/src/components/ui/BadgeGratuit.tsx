import { cn } from '@/lib/utils'

export function BadgeGratuit({ label = 'Gratuit', className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[6px] bg-vert-050 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide text-vert-700',
        className,
      )}
    >
      {label}
    </span>
  )
}
