import { useState } from 'react'
import { Calendar, Camera } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, Modal, SelectField, TextField } from '../components/ui'
import { pets } from '../data/mock'
import { collarBg } from '../lib/collar'
import { cx } from '../lib/cx'
import { paths } from '../routes/paths'
import type { CollarColor } from '../types/pet'

const allColors: CollarColor[] = ['laranja', 'cobalto', 'mostarda', 'magenta', 'turquesa']

// Abre por cima da tela de Pets (rota /pets/novo); fechar volta para /pets
export function NovoPet() {
  const navigate = useNavigate()
  const [collar, setCollar] = useState<CollarColor>('mostarda')
  const close = () => navigate(paths.pets)

  // Cores já usadas pelos pets da casa não aparecem para escolha
  const usedColors = pets.map((pet) => pet.collar)
  const available = allColors.filter((color) => !usedColors.includes(color))

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
      <form
        id="novo-pet"
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          close() // ainda não salva: a captura dos dados entra no card dos formulários
        }}
      >
        <div className="flex items-end gap-5">
          <button
            type="button"
            aria-label="Adicionar foto"
            className="grid size-24 shrink-0 place-items-center rounded-full border-2 border-dashed border-line-strong text-ink-2 hover:bg-raised"
          >
            <Camera size={22} />
          </button>
          <TextField label="Nome" defaultValue="Paçoca" className="flex-1 pb-6" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <SelectField label="Espécie" defaultValue="cao">
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </SelectField>
          <TextField label="Nascimento" placeholder="MM/AAAA" defaultValue="06/2024" icon={<Calendar size={18} />} />
          <SelectField label="Sexo" defaultValue="macho">
            <option value="macho">Macho</option>
            <option value="femea">Fêmea</option>
          </SelectField>
        </div>

        <fieldset>
          <legend className="mb-2 text-caption font-semibold text-ink">Cor da coleira</legend>
          <div className="flex items-center gap-2">
            {available.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                aria-pressed={collar === color}
                onClick={() => setCollar(color)}
                className={cx('size-11 rounded-control', collarBg[color], collar === color && 'ring-2 ring-ink ring-offset-2')}
              />
            ))}
            <p className="ml-2 text-caption text-ink-2">Laranja e cobalto já são do Thor e da Mel</p>
          </div>
        </fieldset>

        <div className="flex items-center gap-2.5 border-b border-line pb-3 pl-3 text-support font-semibold text-ink">
          <span className={cx('size-2.5 rounded-full', collarBg[collar])} />
          Paçoca
        </div>
      </form>
    </Modal>
  )
}
