import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { cx } from '../../lib/cx'

interface NavItemProps {
  icon: LucideIcon
  label: string
  to: string
  badge?: number
}

// Fica ativo sozinho quando a URL está nessa rota (ou numa rota filha, ex.: /pets/novo)
export function NavItem({ icon: Icon, label, to, badge }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          'flex h-10 items-center gap-3 rounded-control px-3 text-support transition-colors',
          isActive ? 'bg-brand-light font-semibold text-brand-deep' : 'text-ink-2 hover:bg-raised',
        )
      }
    >
      <Icon size={20} strokeWidth={1.75} />
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-full bg-missing px-2 py-0.5 text-caption font-bold text-ink">{badge}</span>
      ) : null}
    </NavLink>
  )
}
