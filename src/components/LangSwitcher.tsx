import { useEffect, useRef, useState } from 'react'

interface LangSwitcherProps {
  setLocale: (locale: 'en' | 'zh' | 'ja' | 'ru') => void
  getLocale: () => 'en' | 'zh' | 'ja' | 'ru'
}

const locales: Array<{ key: 'en' | 'zh' | 'ja' | 'ru', label: string }> = [
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
  { key: 'ja', label: '日本語' },
  { key: 'ru', label: 'Русский' },
]

export default function LangSwitcher({ setLocale, getLocale }: LangSwitcherProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const current = getLocale()
  const currentIdx = locales.findIndex(l => l.key === current)
  const [open, setOpen] = useState(false)

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        (menuRef.current && !menuRef.current.contains(target)) &&
        (btnRef.current && !btnRef.current.contains(target))
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1"
      >
        <span>{locales[currentIdx].label}</span>
        <svg className="w-3 h-3 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: open ? 'rotate(180deg)' : '' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`${open ? '' : 'hidden'} absolute top-full mt-1 left-0 min-w-[120px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50`}
      >
        {locales.map(l => (
          <button
            key={l.key}
            onClick={() => { setLocale(l.key); setOpen(false) }}
            className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2 ${
              l.key === current
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {l.key === current && (
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}
