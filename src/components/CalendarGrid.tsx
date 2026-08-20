interface CalendarGridProps {
  today: Date
  view: { year: number; month: number }
  daysInMonth: number
  leadingEmpty: number
  weekdayKeys: readonly string[]
  t: (key: string) => string
  locale: 'en' | 'zh' | 'ja' | 'ru'
  onDayClick?: (day: number) => void
}

export default function CalendarGrid({
  today,
  view,
  daysInMonth,
  leadingEmpty,
  weekdayKeys,
  t,
  locale,
  onDayClick,
}: CalendarGridProps) {
  const isToday = (day: number) =>
    day === today.getDate() &&
    view.month === today.getMonth() &&
    view.year === today.getFullYear()

  const isWeekend = (day: number) => {
    const d = new Date(view.year, view.month, day)
    const dow = d.getDay()
    return dow === 0 || dow === 6
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>
          {today.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'ru' ? 'ru-RU' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {weekdayKeys.map((k) => (
          <div
            key={k}
            className="text-center text-[11px] font-medium text-slate-400 dark:text-slate-500 py-2 uppercase tracking-widest"
          >
            {t(k)}
          </div>
        ))}

        {Array.from({ length: leadingEmpty }, (_, i) => (
          <div key={`e-${i}`} className="aspect-square" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const todayFlag = isToday(day)
          const weekendFlag = isWeekend(day)
          return (
            <div
              key={day}
              onClick={() => onDayClick?.(day)}
              className={[
                'aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors',
                todayFlag
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
                weekendFlag && !todayFlag ? 'text-slate-400 dark:text-slate-500' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {day}
            </div>
          )
        })}
      </div>
    </>
  )
}
