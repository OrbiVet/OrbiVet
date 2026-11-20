import { cx } from '../../lib/cx'

interface TabsProps {
  items: string[]
  active: string
  onChange?: (item: string) => void
}

export function Tabs({ items, active, onChange }: TabsProps) {
  return (
    <div role="tablist" className="inline-flex gap-1 rounded-control bg-surface p-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={item === active}
          onClick={() => onChange?.(item)}
          className={cx(
            'h-9 rounded-control-sm px-3.5 text-support font-medium transition-colors',
            item === active ? 'bg-brand-deep text-white' : 'text-ink-2 hover:bg-raised',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
