import { useId, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  title: string
  subtitle?: string
  onClose?: () => void
  footer?: ReactNode
  children: ReactNode
}

export function Modal({ open, title, subtitle, onClose, footer, children }: ModalProps) {
  const titleId = useId()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-160 rounded-panel bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h2 id={titleId} className="text-h2 font-bold text-brand-deep">{title}</h2>
            {subtitle && <p className="text-support text-ink-3">{subtitle}</p>}
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-control-sm bg-raised text-ink-2 hover:bg-line"
          >
            <X size={18} />
          </button>
        </header>

        <div className="px-6 py-5">{children}</div>

        {footer && <footer className="flex justify-end gap-2 border-t border-line px-6 py-4">{footer}</footer>}
      </div>
    </div>
  )
}
