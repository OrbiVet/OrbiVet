import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string
  action?: ReactNode
}

export function Card({ title, action, className, children, ...props }: CardProps) {
  return (
    <section className={cx('rounded-panel bg-surface p-5', className)} {...props}>
      {(title || action) && (
        <header className="mb-3 flex items-center justify-between gap-4">
          {title && <h2 className="text-h3 font-semibold text-brand-deep">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
