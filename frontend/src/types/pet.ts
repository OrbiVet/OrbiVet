export type CollarColor = 'laranja' | 'cobalto' | 'mostarda' | 'magenta' | 'turquesa'

export interface Pet {
  id: number
  name: string
  collar: CollarColor
  photo: string
}
