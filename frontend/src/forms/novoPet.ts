import { onlyDigits } from '../lib/phone'
import type { CollarColor } from '../types/pet'

export type Especie = 'cao' | 'gato' | 'outro'
export type Sexo = 'macho' | 'femea'

export interface NovoPetForm {
  foto: File | null
  nome: string
  especie: Especie | ''
  nascimento: string // MM/AAAA, opcional
  sexo: Sexo | ''
  coleira: CollarColor | ''
}

export type NovoPetErros = Partial<Record<keyof NovoPetForm, string>>

export function novoPetInicial(coleira: CollarColor | ''): NovoPetForm {
  return { foto: null, nome: '', especie: '', nascimento: '', sexo: '', coleira }
}

export const ordemCampos: (keyof NovoPetForm)[] = ['foto', 'nome', 'especie', 'nascimento', 'sexo', 'coleira']

const FOTO_MAX_MB = 5

// Máscara MM/AAAA enquanto digita
export function formatMesAno(value: string) {
  const d = onlyDigits(value).slice(0, 6)
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`
}

export function validarFoto(foto: File | null): string | undefined {
  if (!foto) return undefined
  if (!foto.type.startsWith('image/')) return 'Escolha uma imagem.'
  if (foto.size > FOTO_MAX_MB * 1024 * 1024) return `A foto pode ter até ${FOTO_MAX_MB} MB.`
}

export function validarNovoPet(form: NovoPetForm, hoje = new Date()): NovoPetErros {
  const erros: NovoPetErros = {}

  const foto = validarFoto(form.foto)
  if (foto) erros.foto = foto

  const nome = form.nome.trim()
  if (!nome) erros.nome = 'Informe o nome do pet.'
  else if (nome.length > 60) erros.nome = 'Use até 60 caracteres.'

  if (!form.especie) erros.especie = 'Escolha a espécie.'
  if (!form.sexo) erros.sexo = 'Escolha o sexo.'

  // Nascimento é opcional (nem sempre se sabe), mas se preencher precisa ser um mês válido
  if (form.nascimento) {
    const [mes, ano] = form.nascimento.split('/').map(Number)
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() + 1
    if (!/^\d{2}\/\d{4}$/.test(form.nascimento) || mes < 1 || mes > 12) {
      erros.nascimento = 'Use o formato MM/AAAA.'
    } else if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
      erros.nascimento = 'A data não pode ser no futuro.'
    } else if (ano < anoAtual - 40) {
      erros.nascimento = 'Confira o ano.'
    }
  }

  if (!form.coleira) erros.coleira = 'Escolha uma cor de coleira.'

  return erros
}
