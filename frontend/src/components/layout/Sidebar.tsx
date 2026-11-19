import {
  Bell, Calendar, HandHeart, HeartPulse, House, Map, PawPrint, Plus, Settings, ShieldCheck, Siren,
} from 'lucide-react'
import logo from '../../assets/logo.svg'
import { counts, pets } from '../../data/mock'
import { PetAvatar } from '../ui/PetAvatar'
import { NavItem } from './NavItem'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-62 flex-col border-r border-line bg-surface px-4 pt-6 pb-5">
      <div className="flex h-14 items-start px-2.5 pt-1">
        <img src={logo} alt="OrbiVet" className="h-7" />
      </div>

      <button className="mt-0.5 mb-4 flex h-11 items-center justify-center gap-2 rounded-control bg-brand font-semibold text-white hover:bg-brand-deep">
        <Plus size={18} /> Registrar
      </button>

      <nav className="flex flex-col gap-0.5">
        <NavItem icon={House} label="Início" />
        <NavItem icon={PawPrint} label="Pets" active />
        <NavItem icon={HeartPulse} label="Saúde" />
        <NavItem icon={Calendar} label="Agenda" />
        <NavItem icon={Map} label="Mapa Pet" />
        <NavItem icon={Siren} label="Alertas" badge={counts.alerts} />
        <NavItem icon={HandHeart} label="Causa animal" />
      </nav>

      <p className="mt-5 mb-1 px-3 text-caption text-ink-3">Seus pets</p>
      <ul className="flex flex-col gap-0.5">
        {pets.map((pet) => (
          <li key={pet.id}>
            <a href="#" className="flex h-11 items-center gap-2.5 rounded-control px-2 hover:bg-raised">
              <PetAvatar pet={pet} />
              <span className="text-support font-semibold text-ink">{pet.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-2.5">
        <NavItem icon={Bell} label="Notificações" badge={counts.notifications} />
        <NavItem icon={ShieldCheck} label="Privacidade" />
        <NavItem icon={Settings} label="Configurações" />
      </div>
    </aside>
  )
}
