import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string
  footer?: ReactNode
}

export function StatCard({ label, value, footer }: StatCardProps) {
  return (
    <Card className="p-4">
      <p className="text-caption text-ink-3">{label}</p>
      <p className="mt-1 text-h1 font-bold text-brand-deep">{value}</p>
      {footer && <div className="mt-1">{footer}</div>}
    </Card>
  )
}
