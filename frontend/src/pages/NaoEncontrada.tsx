import { Link } from 'react-router'
import logo from '../assets/logo.svg'
import { paths } from '../routes/paths'

export function NaoEncontrada() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <img src={logo} alt="OrbiVet" className="h-7.5" />
      <h1 className="font-tag text-[64px] leading-none text-brand-deep uppercase">Página não encontrada</h1>
      <p className="text-body text-ink-2">O endereço que você abriu não existe.</p>
      <Link to={paths.inicio} className="text-support font-bold text-brand-deep underline">
        Ir para o início
      </Link>
    </main>
  )
}
