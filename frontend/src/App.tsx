import { AppLayout } from './components/layout/AppLayout'

export default function App() {
  return (
    <AppLayout breadcrumb="Pets / Thor" title="Thor">
      <div className="rounded-panel bg-surface p-6">Conteúdo da página</div>
    </AppLayout>
  )
}
