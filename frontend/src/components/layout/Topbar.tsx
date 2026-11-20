import type { ReactNode } from 'react'
import { Bell, Search } from 'lucide-react'
import { currentUser } from '../../data/mock'

interface TopbarProps {
  breadcrumb?: string
  title: string
  actions?: ReactNode // se não passar nada, mostra busca + sino + avatar
}

export function Topbar({ breadcrumb, title, actions }: TopbarProps) {
  return (
    <header className="flex h-21 items-center justify-between px-10">
      <div>
        {breadcrumb && <p className="text-support text-ink-3">{breadcrumb}</p>}
        <h1 className="text-h1 font-bold text-brand-deep">{title}</h1>
      </div>

      {actions ?? (
        <div className="flex items-center gap-2.5">
          <label className="flex h-11 w-80 items-center gap-2.5 rounded-full border border-line bg-surface px-4 text-ink-3">
            <Search size={18} />
            <input placeholder="Buscar" className="flex-1 bg-transparent text-support outline-none placeholder:text-ink-3" />
          </label>
          <button className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink-2" aria-label="Notificações">
            <Bell size={20} />
          </button>
          <span className="grid size-11 place-items-center rounded-full bg-brand-deep text-support font-bold text-white">
            {currentUser.initials}
          </span>
        </div>
      )}
    </header>
  )
}
