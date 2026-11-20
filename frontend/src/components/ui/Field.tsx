import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cx } from '../../lib/cx'

interface FieldShellProps {
  id: string
  label: string
  hint?: string
  error?: string
  disabled?: boolean
  icon?: ReactNode
  pill?: boolean
  className?: string
  children: ReactNode
}

function FieldShell({ id, label, hint, error, disabled, icon, pill, className, children }: FieldShellProps) {
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-caption font-semibold text-ink">{label}</label>
      <div
        className={cx(
          'relative flex items-center gap-2 border transition-colors',
          pill ? 'h-14 rounded-full px-5' : 'h-11 rounded-control px-3.5',
          error
            ? 'border-danger bg-surface'
            : disabled
              ? 'border-line bg-raised text-ink-3'
              : 'border-line-strong bg-surface focus-within:border-brand focus-within:ring-1 focus-within:ring-brand',
        )}
      >
        {icon && <span className="shrink-0 text-ink-3">{icon}</span>}
        {children}
      </div>
      {error ? (
        <p className="text-caption text-danger">{error}</p>
      ) : hint ? (
        <p className="text-caption text-ink-3">{hint}</p>
      ) : null}
    </div>
  )
}

const control =
  'h-full w-full min-w-0 bg-transparent text-support text-ink outline-none placeholder:text-ink-3 disabled:cursor-not-allowed disabled:text-ink-3'

interface CommonProps {
  label: string
  hint?: string
  error?: string
  icon?: ReactNode
  pill?: boolean
}

export function TextField({
  label, hint, error, icon, pill, className, id, disabled, ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldShell id={inputId} label={label} hint={hint} error={error} icon={icon} pill={pill} disabled={disabled} className={className}>
      <input id={inputId} disabled={disabled} aria-invalid={!!error} className={control} {...props} />
    </FieldShell>
  )
}

export function SelectField({
  label, hint, error, icon, pill, className, id, disabled, children, ...props
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <FieldShell id={selectId} label={label} hint={hint} error={error} icon={icon} pill={pill} disabled={disabled} className={className}>
      <select id={selectId} disabled={disabled} aria-invalid={!!error} className={cx(control, 'appearance-none pr-6')} {...props}>
        {children}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-3.5 text-ink-2" />
    </FieldShell>
  )
}
