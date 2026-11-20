import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cx(
        'h-9 rounded-control-sm border px-3.5 text-support font-medium transition-colors',
        selected ? 'border-ink bg-ink text-white' : 'border-line-strong bg-surface text-ink hover:bg-raised',
        className,
      )}
      {...props}
    />
  )
}
