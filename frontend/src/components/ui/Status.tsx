import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Clock, Info, type LucideIcon } from 'lucide-react'
import { cx } from '../../lib/cx'

export type StatusKind = 'ok' | 'warn' | 'danger' | 'info' | 'neutral'

const kinds: Record<StatusKind, { className: string; Icon?: LucideIcon }> = {
  ok: { className: 'text-ok', Icon: CircleCheck },
  warn: { className: 'text-warn', Icon: Clock },
  danger: { className: 'text-danger', Icon: CircleAlert },
  info: { className: 'text-ink-2', Icon: Info },
  neutral: { className: 'text-ink-3' },
}

export function Status({ kind, children }: { kind: StatusKind; children: ReactNode }) {
  const { className, Icon } = kinds[kind]
  return (
    <span className={cx('inline-flex items-center gap-1.5 text-caption font-medium', className)}>
      {Icon && <Icon size={14} strokeWidth={2.25} />}
      {children}
    </span>
  )
}
