import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Calendar, Camera } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, Modal, SelectField, TextField } from '../components/ui'
import { pets } from '../data/mock'
import {
  formatMesAno, novoPetInicial, ordemCampos, validarFoto, validarNovoPet,
  type NovoPetErros, type NovoPetForm,
} from '../forms/novoPet'
import { collarBg } from '../lib/collar'
import { cx } from '../lib/cx'
import { paths } from '../routes/paths'
import type { CollarColor } from '../types/pet'

const allColors: CollarColor[] = ['laranja', 'cobalto', 'mostarda', 'magenta', 'turquesa']
const lista = new Intl.ListFormat('pt-BR', { type: 'conjunction' })
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Cores já usadas pelos pets da casa não aparecem para escolha
const usedColors = pets.map((pet) => pet.collar)
const available = allColors.filter((color) => !usedColors.includes(color))
const coresEmUso = pets.length
  ? `${capitalize(lista.format(usedColors))} já estão com ${lista.format(pets.map((pet) => pet.name))}`
  : ''

// Abre por cima da tela de Pets (rota /pets/novo); fechar volta para /pets
export function NovoPet() {
  const navigate = useNavigate()
  const close = () => navigate(paths.pets)
  const fotoInput = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<NovoPetForm>(() => novoPetInicial(available[0] ?? ''))
  const [erros, setErros] = useState<NovoPetErros>({})
  const [tentouEnviar, setTentouEnviar] = useState(false)

  // Prévia da foto escolhida; o endereço temporário é liberado quando troca, remove ou fecha
  const [fotoUrl, setFotoUrl] = useState<string | null>(null)
  useEffect(() => () => { if (fotoUrl) URL.revokeObjectURL(fotoUrl) }, [fotoUrl])

  function atualizar<K extends keyof NovoPetForm>(campo: K, valor: NovoPetForm[K]) {
    const novo = { ...form, [campo]: valor }
    setForm(novo)
    if (tentouEnviar) setErros(validarNovoPet(novo))
  }

  function escolherFoto(file: File | null) {
    const erro = validarFoto(file)
    if (erro) {
      setErros((atual) => ({ ...atual, foto: erro })) // não troca a foto se a nova for inválida
      return
    }
    setErros((atual) => ({ ...atual, foto: undefined }))
    setFotoUrl(file ? URL.createObjectURL(file) : null)
    atualizar('foto', file)
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encontrados = validarNovoPet(form)
    setErros(encontrados)
    setTentouEnviar(true)

    const primeiroErro = ordemCampos.find((campo) => encontrados[campo])
    if (primeiroErro) {
      const alvo = primeiroErro === 'foto' ? fotoInput.current : e.currentTarget.elements.namedItem(primeiroErro)
      ;(alvo as HTMLElement | null)?.focus()
      return
    }

    // Ainda não salva (não há endpoint de pets no backend): só mostra o que foi capturado
    console.info('Pet capturado:', {
      ...form,
      nome: form.nome.trim(),
      foto: form.foto ? { nome: form.foto.name, tamanho: form.foto.size } : null,
    })
    close()
  }

  return (
    <Modal
      open
      onClose={close}
      title="Novo pet"
      subtitle="Você completa a saúde depois"
      footer={
        <>
          <Button variant="secondary" onClick={close}>Cancelar</Button>
          <Button type="submit" form="novo-pet">Criar pet</Button>
        </>
      }
    >
      <form id="novo-pet" className="flex flex-col gap-5" noValidate onSubmit={enviar}>
        <div className="flex items-start gap-5">
          <div className="flex shrink-0 flex-col items-center gap-1.5">
            <button
              type="button"
              aria-label={form.foto ? 'Trocar foto' : 'Adicionar foto'}
              onClick={() => fotoInput.current?.click()}
              className={cx(
                'grid size-24 place-items-center overflow-hidden rounded-full border-2 border-dashed text-ink-2 hover:bg-raised',
                erros.foto ? 'border-danger' : 'border-line-strong',
                fotoUrl && 'border-solid',
              )}
            >
              {fotoUrl ? <img src={fotoUrl} alt="" className="size-full object-cover" /> : <Camera size={22} />}
            </button>
            <input
              ref={fotoInput}
              type="file"
              name="foto"
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) escolherFoto(file)
                e.target.value = '' // permite escolher o mesmo arquivo de novo
              }}
            />
            {form.foto && (
              <button type="button" onClick={() => escolherFoto(null)} className="text-caption text-ink-2 underline">
                Remover
              </button>
            )}
          </div>
          <TextField
            label="Nome"
            name="nome"
            placeholder="Paçoca"
            maxLength={60}
            value={form.nome}
            onChange={(e) => atualizar('nome', e.target.value)}
            error={erros.nome}
            className="flex-1 pt-3"
          />
        </div>
        {erros.foto && <p className="-mt-3 text-caption text-danger">{erros.foto}</p>}

        <div className="grid grid-cols-3 gap-3">
          <SelectField
            label="Espécie"
            name="especie"
            value={form.especie}
            onChange={(e) => atualizar('especie', e.target.value as NovoPetForm['especie'])}
            error={erros.especie}
          >
            <option value="" disabled>Selecione</option>
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </SelectField>
          <TextField
            label="Nascimento (opcional)"
            name="nascimento"
            placeholder="MM/AAAA"
            inputMode="numeric"
            icon={<Calendar size={18} />}
            value={form.nascimento}
            onChange={(e) => atualizar('nascimento', formatMesAno(e.target.value))}
            error={erros.nascimento}
          />
          <SelectField
            label="Sexo"
            name="sexo"
            value={form.sexo}
            onChange={(e) => atualizar('sexo', e.target.value as NovoPetForm['sexo'])}
            error={erros.sexo}
          >
            <option value="" disabled>Selecione</option>
            <option value="macho">Macho</option>
            <option value="femea">Fêmea</option>
          </SelectField>
        </div>

        <fieldset>
          <legend className="mb-2 text-caption font-semibold text-ink">Cor da coleira</legend>
          <div className="flex items-center gap-2">
            {available.map((color, i) => (
              <button
                key={color}
                type="button"
                name={i === 0 ? 'coleira' : undefined}
                aria-label={capitalize(color)}
                aria-pressed={form.coleira === color}
                onClick={() => atualizar('coleira', color)}
                className={cx('size-11 rounded-control', collarBg[color], form.coleira === color && 'ring-2 ring-ink ring-offset-2')}
              />
            ))}
            {coresEmUso && <p className="ml-2 text-caption text-ink-2">{coresEmUso}</p>}
          </div>
          {erros.coleira && <p className="mt-2 text-caption text-danger">{erros.coleira}</p>}
        </fieldset>

        {/* Prévia de como o pet aparece na lista */}
        <div className="flex items-center gap-2.5 border-b border-line pb-3 pl-3 text-support font-semibold text-ink">
          <span className={cx('size-2.5 rounded-full', form.coleira ? collarBg[form.coleira] : 'bg-line')} />
          {form.nome.trim() || <span className="font-normal text-ink-3">Nome do pet</span>}
        </div>
      </form>
    </Modal>
  )
}
