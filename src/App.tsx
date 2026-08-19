import { useState } from 'react'
import { useI18n } from './hooks/i18n'
import MonthHeader from './components/MonthHeader'
import CalendarGrid from './components/CalendarGrid'
import LangSwitcher from './components/LangSwitcher'

const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
] as const

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function dayOfWeek(date: Date) {
  const d = date.getDay()
  return d === 0 ? 7 : d
}

function App() {
  const today = new Date()
  const { t, setLocale, getLocale } = useI18n()
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })

  const daysInMonth = getDaysInMonth(view.year, view.month)
  const firstDow = dayOfWeek(new Date(view.year, view.month, 1))
  const leadingEmpty = firstDow - 1

  const prev = () => {
    if (view.month === 0) setView({ year: view.year - 1, month: 11 })
    else setView({ ...view, month: view.month - 1 })
  }

  const next = () => {
    if (view.month === 11) setView({ year: view.year + 1, month: 0 })
    else setView({ ...view, month: view.month + 1 })
  }

  return (
    <div className="min-w-screen min-h-screen relative flex items-center justify-center bg-white dark:bg-slate-900 transition-colors">
      {/* Language switcher — top-left corner, standalone */}
      <LangSwitcher setLocale={setLocale} getLocale={getLocale} />

      {/* Main card */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-[420px] p-6">
        {/* Month/year header with prev/next navigation */}
        <MonthHeader
          month={view.month}
          year={view.year}
          monthLabels={MONTH_KEYS}
          t={t}
          onPrev={prev}
          onNext={next}
        />

        {/* Calendar grid with weekday labels and day cells */}
        <CalendarGrid
          today={today}
          view={view}
          daysInMonth={daysInMonth}
          leadingEmpty={leadingEmpty}
          weekdayKeys={WEEKDAY_KEYS}
          t={t}
          locale={getLocale()}
        />
      </div>
    </div>
  )
}

export default App
