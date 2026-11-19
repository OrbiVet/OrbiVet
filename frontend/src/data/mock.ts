import type { Pet } from '../types/pet'
import thor from '../assets/pets/thor.jpg'
import mel from '../assets/pets/mel.jpg'

export const pets: Pet[] = [
  { id: 1, name: 'Thor', collar: 'laranja', photo: thor },
  { id: 2, name: 'Mel', collar: 'cobalto', photo: mel },
]

export const currentUser = { initials: 'MR', name: 'Marina Rocha' }
export const counts = { alerts: 1, notifications: 3 }