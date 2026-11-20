import { Link } from 'react-router'
import logo from '../assets/logo.svg'
import { AppLayout } from '../components/layout/AppLayout'
import { paths } from '../routes/paths'

interface EmConstrucaoProps {
  title: string
  breadcrumb?: string
  area?: 'app' | 'publica' // app = com sidebar; publica = antes do login
}

// Tela provisória para rotas que ainda não têm layout
export function EmConstrucao({ title, breadcrumb, area = 'app' }: EmConstrucaoProps) {
  const message = 'Esta tela ainda está sendo construída.'

  if (area === 'app') {
    return (
      <AppLayout breadcrumb={breadcrumb} title={title}>
        <p className="text-body text-ink-2">{message}</p>
      </AppLayout>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <img src={logo} alt="OrbiVet" className="h-7.5" />
      <h1 className="font-tag text-[64px] leading-none text-brand-deep uppercase">{title}</h1>
      <p className="text-body text-ink-2">{message}</p>
      <Link to={paths.criarConta} className="text-support font-bold text-brand-deep underline">
        Voltar para o cadastro
      </Link>
    </main>
  )
}
