import { onlyDigits } from '../lib/phone'

export type Perfil = 'tutor' | 'profissional' | 'empresa' | 'ong'

export interface CriarContaForm {
  perfil: Perfil
  nome: string
  email: string
  celular: string
  senha: string
  aceitouTermos: boolean
}

export type CriarContaErros = Partial<Record<keyof CriarContaForm, string>>

export const criarContaInicial: CriarContaForm = {
  perfil: 'tutor',
  nome: '',
  email: '',
  celular: '',
  senha: '',
  aceitouTermos: false, // LGPD: o aceite precisa ser marcado pela pessoa
}

// Ordem dos campos na tela, para levar o foco ao primeiro com erro
export const ordemCampos: (keyof CriarContaForm)[] = ['nome', 'email', 'celular', 'senha', 'aceitouTermos']

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Mesmas regras do CreateUsuarioRequest do backend, mais as que a tela pede
export function validarCriarConta(form: CriarContaForm): CriarContaErros {
  const erros: CriarContaErros = {}

  const nome = form.nome.trim()
  if (!nome) erros.nome = 'Informe seu nome.'
  else if (nome.length > 150) erros.nome = 'Use até 150 caracteres.'

  const email = form.email.trim()
  if (!email) erros.email = 'Informe seu e-mail.'
  else if (!EMAIL.test(email)) erros.email = 'E-mail inválido.'
  else if (email.length > 150) erros.email = 'Use até 150 caracteres.'

  // Celular é opcional, mas se preencher precisa estar completo
  const celular = onlyDigits(form.celular)
  if (celular && celular.length < 10) erros.celular = 'Celular incompleto.'

  if (!form.senha) erros.senha = 'Crie uma senha.'
  else if (form.senha.length < 8) erros.senha = 'Use 8 caracteres ou mais.'
  else if (form.senha.length > 72) erros.senha = 'Use até 72 caracteres.'
  else if (!/\d/.test(form.senha)) erros.senha = 'Inclua pelo menos um número.'

  if (!form.aceitouTermos) erros.aceitouTermos = 'Aceite os Termos e a Política de Privacidade para continuar.'

  return erros
}

// Corpo do POST /api/usuarios (CreateUsuarioRequest). Perfil e celular ainda não existem no backend.
export function paraCreateUsuarioRequest(form: CriarContaForm) {
  return {
    nome: form.nome.trim(),
    email: form.email.trim(),
    senha: form.senha,
  }
}
