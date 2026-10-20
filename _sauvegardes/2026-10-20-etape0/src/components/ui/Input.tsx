import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[15px] font-medium text-encre">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'rounded-[8px] border border-hairline bg-white px-4 py-3 text-[15px] text-encre placeholder:text-gris-600 focus:border-rose-700 focus:outline-none',
          error && 'border-rose-700',
          className,
        )}
        {...props}
      />
      {error && <p className="text-[13px] text-rose-700">{error}</p>}
    </div>
  )
}
