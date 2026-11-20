import {
  Bell, Calendar, HandHeart, HeartPulse, House, Map, PawPrint, Plus, Settings, ShieldCheck, Siren,
} from 'lucide-react'
import { Link, NavLink } from 'react-router'
import logo from '../../assets/logo.svg'
import { counts, pets } from '../../data/mock'
import { cx } from '../../lib/cx'
import { paths } from '../../routes/paths'
import { PetAvatar } from '../ui/PetAvatar'
import { NavItem } from './NavItem'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-62 flex-col border-r border-line bg-surface px-4 pt-6 pb-5">
      <div className="flex h-14 items-start px-2.5 pt-1">
        <Link to={paths.inicio} aria-label="Ir para o início">
          <img src={logo} alt="OrbiVet" className="h-7" />
        </Link>
      </div>

      <button className="mt-0.5 mb-4 flex h-11 items-center justify-center gap-2 rounded-control bg-brand font-semibold text-white hover:bg-brand-deep">
        <Plus size={18} /> Registrar
      </button>

      <nav className="flex flex-col gap-0.5">
        <NavItem icon={House} label="Início" to={paths.inicio} />
        <NavItem icon={PawPrint} label="Pets" to={paths.pets} />
        <NavItem icon={HeartPulse} label="Saúde" to={paths.saude} />
        <NavItem icon={Calendar} label="Agenda" to={paths.agenda} />
        <NavItem icon={Map} label="Mapa Pet" to={paths.mapaPet} />
        <NavItem icon={Siren} label="Alertas" to={paths.alertas} badge={counts.alerts} />
        <NavItem icon={HandHeart} label="Causa animal" to={paths.causaAnimal} />
      </nav>

      <p className="mt-5 mb-1 px-3 text-caption text-ink-3">Seus pets</p>
      <ul className="flex flex-col gap-0.5">
        {pets.map((pet) => (
          <li key={pet.id}>
            <NavLink
              to={paths.pet(pet.id)}
              className={({ isActive }) =>
                cx('flex h-11 items-center gap-2.5 rounded-control px-2 hover:bg-raised', isActive && 'bg-raised')
              }
            >
              <PetAvatar pet={pet} />
              <span className="text-support font-semibold text-ink">{pet.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-2.5">
        <NavItem icon={Bell} label="Notificações" to={paths.notificacoes} badge={counts.notifications} />
        <NavItem icon={ShieldCheck} label="Privacidade" to={paths.privacidade} />
        <NavItem icon={Settings} label="Configurações" to={paths.configuracoes} />
      </div>
    </aside>
  )
}
