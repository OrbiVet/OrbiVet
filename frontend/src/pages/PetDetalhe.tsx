import { useParams } from 'react-router'
import { pets } from '../data/mock'
import { EmConstrucao } from './EmConstrucao'
import { NaoEncontrada } from './NaoEncontrada'

export function PetDetalhe() {
  const { petId } = useParams()
  const pet = pets.find((p) => String(p.id) === petId)

  if (!pet) return <NaoEncontrada />
  return <EmConstrucao breadcrumb="Pets" title={pet.name} />
}
