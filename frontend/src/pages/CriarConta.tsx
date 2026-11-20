import { useState } from 'react'
import { HandHeart, Lock, PawPrint, Stethoscope, Store, type LucideIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import heroImg from '../assets/criar-conta.jpg'
import logo from '../assets/logo.svg'
import { TextField } from '../components/ui'
import { cx } from '../lib/cx'
import { paths } from '../routes/paths'

const roles: { label: string; Icon: LucideIcon }[] = [
  { label: 'Tutor', Icon: PawPrint },
  { label: 'Profissional', Icon: Stethoscope },
  { label: 'Empresa', Icon: Store },
  { label: 'ONG', Icon: HandHeart },
]

export function CriarConta() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Tutor') // só visual: destaca o perfil escolhido

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/70 to-transparent" />
        <span className="absolute top-10 left-12 rounded-full bg-surface px-4.5 py-3">
          <img src={logo} alt="OrbiVet" className="h-7.5" />
        </span>
        <p className="absolute right-12 bottom-14 left-12 font-tag text-[104px] leading-[0.92] text-white uppercase">
          Seu primeiro pet começa aqui.
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <form
          className="flex w-full max-w-115 flex-col gap-4.5"
          onSubmit={(e) => {
            e.preventDefault()
            // Ainda não envia nada: depois do cadastro o tutor já cadastra o primeiro pet
            navigate(paths.novoPet)
          }}
        >
          <header>
            <h1 className="font-tag text-[64px] leading-none text-brand-deep uppercase">Criar conta</h1>
            <p className="mt-4 text-body text-ink-2">Pedimos só o necessário para começar.</p>
          </header>

          <fieldset>
            <legend className="mb-2 text-caption font-semibold text-ink">Eu sou</legend>
            <div className="grid grid-cols-4 gap-2">
              {roles.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={role === label}
                  onClick={() => setRole(label)}
                  className={cx(
                    'flex h-19 flex-col items-start justify-between rounded-panel border p-3.5 text-support font-medium transition-colors',
                    role === label
                      ? 'border-brand-deep bg-brand-deep text-white'
                      : 'border-line-strong bg-surface text-ink hover:bg-raised',
                  )}
                >
                  <Icon size={22} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <TextField pill label="Nome completo" placeholder="Marina Rocha" autoComplete="name" />

          <div className="grid grid-cols-2 gap-3">
            <TextField pill label="E-mail" type="email" placeholder="marina.rocha@gmail.com" autoComplete="email" />
            <TextField pill label="Celular" type="tel" placeholder="(44) 99812-3456" autoComplete="tel" />
          </div>

          <TextField
            pill
            label="Senha"
            type="password"
            icon={<Lock size={20} />}
            hint="8 caracteres ou mais, com um número."
            autoComplete="new-password"
          />

          <label className="flex items-center gap-2.5 text-support text-ink-2">
            <input type="checkbox" defaultChecked className="size-5.5 accent-brand-deep" />
            <span>
              Li e aceito os <Link to={paths.termos} className="text-ink underline">Termos</Link> e a{' '}
              <Link to={paths.politicaPrivacidade} className="text-ink underline">Política de Privacidade</Link>.
            </span>
          </label>

          <button
            type="submit"
            className="h-14.5 rounded-full bg-brand-deep text-body font-semibold text-white transition-colors hover:bg-brand"
          >
            Criar conta
          </button>

          <p className="text-center text-support text-ink-2">
            Já tem conta? <Link to={paths.entrar} className="font-bold text-brand-deep underline">Entrar</Link>
          </p>
        </form>
      </main>
    </div>
  )
}
