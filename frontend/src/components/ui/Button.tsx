import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cx } from '../../lib/cx'

type Variant = 'primary' | 'secondary' | 'alert' | 'danger' | 'text'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep disabled:bg-line disabled:text-ink-3',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-raised disabled:border-line disabled:bg-line disabled:text-ink-3',
  alert: 'bg-missing text-ink hover:brightness-95 disabled:bg-line disabled:text-ink-3', // só para pet desaparecido
  danger: 'bg-danger text-white hover:brightness-90 disabled:bg-line disabled:text-ink-3',
  text: 'text-ink hover:bg-raised disabled:text-ink-3',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-4',
  lg: 'h-13 px-6',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  loading?: boolean
}

export function Button({
  variant = 'primary', size = 'md', icon, loading, className, children, type = 'button', ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-control text-support font-semibold transition-colors disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        loading && 'pointer-events-none',
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle size={18} className="animate-spin" /> : icon}
      {children}
    </button>
  )
}
