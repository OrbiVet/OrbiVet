import type { LucideIcon } from 'lucide-react'

interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  badge?: number
}

export function NavItem({ icon: Icon, label, active, badge }: NavItemProps) {
  return (
    <a
      href="#"
      className={`flex h-10 items-center gap-3 rounded-control px-3 text-support transition-colors ${
        active ? 'bg-brand-light font-semibold text-brand-deep' : 'text-ink-2 hover:bg-raised'
      }`}
    >
      <Icon size={20} strokeWidth={1.75} />
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-full bg-missing px-2 py-0.5 text-caption font-bold text-ink">{badge}</span>
      ) : null}
    </a>
  )
}
