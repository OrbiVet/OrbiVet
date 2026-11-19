import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from 'lucide-react'
import { cx } from '../../lib/cx'

type NoticeKind = 'info' | 'warn' | 'danger' | 'ok'

const kinds: Record<NoticeKind, { className: string; Icon: LucideIcon }> = {
  info: { className: 'bg-raised text-ink-2', Icon: Info },
  warn: { className: 'bg-warn-bg text-warn', Icon: TriangleAlert },
  danger: { className: 'bg-danger-bg text-danger', Icon: CircleAlert },
  ok: { className: 'bg-ok-bg text-ok', Icon: CircleCheck },
}

interface NoticeProps {
  kind: NoticeKind
  children: ReactNode
  className?: string
}

export function Notice({ kind, children, className }: NoticeProps) {
  const { className: colors, Icon } = kinds[kind]
  return (
    <div className={cx('inline-flex items-start gap-2 rounded-control-sm px-3 py-1.5 text-caption font-medium', colors, className)}>
      <Icon size={16} className="mt-px shrink-0" />
      <span>{children}</span>
    </div>
  )
}
