import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type TagKind = 'missing' | 'active' | 'pending'

const kinds: Record<TagKind, string> = {
  missing: 'bg-missing text-ink',
  active: 'bg-ink text-white',
  pending: 'bg-warn-bg text-warn',
}

export function Tag({ kind, children }: { kind: TagKind; children: ReactNode }) {
  return (
    <span className={cx('inline-flex items-center rounded-tag px-1.5 py-0.5 font-tag text-caption uppercase tracking-wide', kinds[kind])}>
      {children}
    </span>
  )
}
