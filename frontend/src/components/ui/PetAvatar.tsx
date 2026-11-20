import type { Pet } from '../../types/pet'
import { collarBg, collarBorder } from '../../lib/collar'
import { cx } from '../../lib/cx'

interface PetAvatarProps {
  pet: Pet
  size?: 'sm' | 'lg'
}

export function PetAvatar({ pet, size = 'sm' }: PetAvatarProps) {
  const large = size === 'lg'
  return (
    <span
      className={cx(
        'relative grid shrink-0 place-items-center rounded-full border-2',
        collarBorder[pet.collar],
        large ? 'size-28' : 'size-9',
      )}
    >
      <img src={pet.photo} alt={pet.name} className={cx('rounded-full object-cover', large ? 'size-23' : 'size-6.5')} />
      {large && (
        <span className={cx('absolute top-2.5 right-2.5 size-4 rounded-full border-2 border-surface', collarBg[pet.collar])} />
      )}
    </span>
  )
}
