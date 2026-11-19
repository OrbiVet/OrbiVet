import type { ReactNode } from 'react'

interface ListRowProps {
  leading?: ReactNode
  title: string
  subtitle?: ReactNode
  trailing?: ReactNode
}

export function ListRow({ leading, title, subtitle, trailing }: ListRowProps) {
  return (
    <div className="flex items-center gap-4 border-t border-line py-3 first:border-t-0">
      {leading}
      <div className="min-w-0 flex-1">
        <p className="text-support font-semibold text-ink">{title}</p>
        {subtitle && <div className="text-caption text-ink-3">{subtitle}</div>}
      </div>
      {trailing}
    </div>
  )
}
