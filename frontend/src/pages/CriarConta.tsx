import { useState, type FormEvent } from 'react'
import { HandHeart, Lock, PawPrint, Stethoscope, Store, type LucideIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import heroImg from '../assets/criar-conta.jpg'
import logo from '../assets/logo.svg'
import { TextField } from '../components/ui'
import {
  criarContaInicial, ordemCampos, paraCreateUsuarioRequest, validarCriarConta,
  type CriarContaErros, type CriarContaForm, type Perfil,
} from '../forms/criarConta'
import { cx } from '../lib/cx'
import { formatPhone } from '../lib/phone'
import { paths } from '../routes/paths'

const roles: { value: Perfil; label: string; Icon: LucideIcon }[] = [
  { value: 'tutor', label: 'Tutor', Icon: PawPrint },
  { value: 'profissional', label: 'Profissional', Icon: Stethoscope },
  { value: 'empresa', label: 'Empresa', Icon: Store },
  { value: 'ong', label: 'ONG', Icon: HandHeart },
]

export function CriarConta() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CriarContaForm>(criarContaInicial)
  const [erros, setErros] = useState<CriarContaErros>({})
  const [tentouEnviar, setTentouEnviar] = useState(false)

  // Depois da primeira tentativa de envio, os erros se atualizam enquanto a pessoa corrige
  function atualizar<K extends keyof CriarContaForm>(campo: K, valor: CriarContaForm[K]) {
    const novo = { ...form, [campo]: valor }
    setForm(novo)
    if (tentouEnviar) setErros(validarCriarConta(novo))
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encontrados = validarCriarConta(form)
    setErros(encontrados)
    setTentouEnviar(true)

    const primeiroErro = ordemCampos.find((campo) => encontrados[campo])
    if (primeiroErro) {
      ;(e.currentTarget.elements.namedItem(primeiroErro) as HTMLElement | null)?.focus()
      return
    }

    // Ainda não chama a API: só mostra o que foi capturado
    console.info('Cadastro capturado:', {
      ...paraCreateUsuarioRequest(form),
      senha: '••••••••',
      perfil: form.perfil,
      celular: form.celular,
    })
    navigate(paths.novoPet) // depois do cadastro o tutor já cadastra o primeiro pet
  }

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
        <form className="flex w-full max-w-115 flex-col gap-4.5" noValidate onSubmit={enviar}>
          <header>
            <h1 className="font-tag text-[64px] leading-none text-brand-deep uppercase">Criar conta</h1>
            <p className="mt-4 text-body text-ink-2">Pedimos só o necessário para começar.</p>
          </header>

          <fieldset>
            <legend className="mb-2 text-caption font-semibold text-ink">Eu sou</legend>
            <div className="grid grid-cols-4 gap-2">
              {roles.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={form.perfil === value}
                  onClick={() => atualizar('perfil', value)}
                  className={cx(
                    'flex h-19 flex-col items-start justify-between rounded-panel border p-3.5 text-support font-medium transition-colors',
                    form.perfil === value
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

          <TextField
            pill
            label="Nome completo"
            name="nome"
            placeholder="Marina Rocha"
            autoComplete="name"
            maxLength={150}
            value={form.nome}
            onChange={(e) => atualizar('nome', e.target.value)}
            error={erros.nome}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextField
              pill
              label="E-mail"
              name="email"
              type="email"
              placeholder="marina.rocha@gmail.com"
              autoComplete="email"
              maxLength={150}
              value={form.email}
              onChange={(e) => atualizar('email', e.target.value)}
              error={erros.email}
            />
            <TextField
              pill
              label="Celular (opcional)"
              name="celular"
              type="tel"
              inputMode="numeric"
              placeholder="(44) 99812-3456"
              autoComplete="tel-national"
              value={form.celular}
              onChange={(e) => atualizar('celular', formatPhone(e.target.value))}
              error={erros.celular}
            />
          </div>

          <TextField
            pill
            label="Senha"
            name="senha"
            type="password"
            icon={<Lock size={20} />}
            hint="8 caracteres ou mais, com um número."
            autoComplete="new-password"
            maxLength={72}
            value={form.senha}
            onChange={(e) => atualizar('senha', e.target.value)}
            error={erros.senha}
          />

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2.5 text-support text-ink-2">
              <input
                type="checkbox"
                name="aceitouTermos"
                checked={form.aceitouTermos}
                onChange={(e) => atualizar('aceitouTermos', e.target.checked)}
                aria-invalid={!!erros.aceitouTermos}
                aria-describedby={erros.aceitouTermos ? 'termos-erro' : undefined}
                className="size-5.5 accent-brand-deep"
              />
              <span>
                {/* Abrem em outra aba para não perder o que já foi preenchido */}
                Li e aceito os <Link to={paths.termos} target="_blank" className="text-ink underline">Termos</Link> e a{' '}
                <Link to={paths.politicaPrivacidade} target="_blank" className="text-ink underline">
                  Política de Privacidade
                </Link>.
              </span>
            </label>
            {erros.aceitouTermos && (
              <p id="termos-erro" className="text-caption text-danger">{erros.aceitouTermos}</p>
            )}
          </div>

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
