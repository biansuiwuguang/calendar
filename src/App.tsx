import { useState } from 'react'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// 1 = Monday … 7 = Sunday; convert JS day (0=Sun) → this scheme
function dayOfWeek(date: Date) {
  const d = date.getDay()
  return d === 0 ? 7 : d
}

function App() {
  const today = new Date()
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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 transition-colors">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-[420px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {MONTHS[view.month]} {view.year}
          </h1>
          <div className="flex gap-1">
            <button
              onClick={prev}
              aria-label="Previous month"
              className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next month"
              className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              ›
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] font-medium text-slate-400 dark:text-slate-500 py-2 uppercase tracking-widest"
            >
              {d}
            </div>
          ))}

          {Array.from({ length: leadingEmpty }, (_, i) => (
            <div key={`e-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const d = new Date(view.year, view.month, day)
            const dow = dayOfWeek(d)
            const isWeekend = dow >= 6
            const isToday =
              day === today.getDate() &&
              view.month === today.getMonth() &&
              view.year === today.getFullYear()
            return (
              <div
                key={day}
                className={[
                  'aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors',
                  isToday
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
                  isWeekend && !isToday ? 'text-slate-400 dark:text-slate-500' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {day}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          {today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  )
}

export default App
