import { Plus } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui'
import { pets } from '../data/mock'
import { paths } from '../routes/paths'

export function Pets() {
  const navigate = useNavigate()

  return (
    <AppLayout
      breadcrumb={`${pets.length} pets na sua casa`}
      title="Pets"
      actions={<Button icon={<Plus size={18} />} onClick={() => navigate(paths.novoPet)}>Novo pet</Button>}
    >
      <p className="text-body text-ink-2">A lista de pets ainda está sendo construída.</p>
      {/* /pets/novo abre o modal aqui */}
      <Outlet />
    </AppLayout>
  )
}
