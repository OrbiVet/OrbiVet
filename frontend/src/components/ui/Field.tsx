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
  className?: string
  children: ReactNode
}

function FieldShell({ id, label, hint, error, disabled, icon, className, children }: FieldShellProps) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-caption font-semibold text-ink">{label}</label>
      <div
        className={cx(
          'relative flex h-11 items-center gap-2 rounded-control border px-3.5 transition-colors',
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
}

export function TextField({
  label, hint, error, icon, className, id, disabled, ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldShell id={inputId} label={label} hint={hint} error={error} icon={icon} disabled={disabled} className={className}>
      <input id={inputId} disabled={disabled} aria-invalid={!!error} className={control} {...props} />
    </FieldShell>
  )
}

export function SelectField({
  label, hint, error, icon, className, id, disabled, children, ...props
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <FieldShell id={selectId} label={label} hint={hint} error={error} icon={icon} disabled={disabled} className={className}>
      <select id={selectId} disabled={disabled} aria-invalid={!!error} className={cx(control, 'appearance-none pr-6')} {...props}>
        {children}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-3.5 text-ink-2" />
    </FieldShell>
  )
}
