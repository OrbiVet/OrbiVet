import { useState } from 'react'
import { cx } from './lib/cx'
import { CriarConta } from './pages/CriarConta'
import { NovoPet } from './pages/NovoPet'

const screens = { 'Criar conta': CriarConta, 'Novo pet': NovoPet }
type Screen = keyof typeof screens

export default function App() {
  const [screen, setScreen] = useState<Screen>('Criar conta')
  const Current = screens[screen]

  return (
    <>
      <Current />
      {/* Seletor temporário de telas: o roteamento entra em outro card */}
      <div className="fixed right-4 bottom-4 z-60 flex gap-1 rounded-full bg-ink p-1 shadow-lg">
        {(Object.keys(screens) as Screen[]).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setScreen(name)}
            className={cx(
              'rounded-full px-3 py-1.5 text-caption font-semibold',
              name === screen ? 'bg-surface text-ink' : 'text-white',
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  )
}
