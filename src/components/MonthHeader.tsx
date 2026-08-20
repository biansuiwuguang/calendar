interface MonthHeaderProps {
  month: number
  year: number
  monthLabels: readonly string[]
  t: (key: string) => string
  onPrev: () => void
  onNext: () => void
}

export default function MonthHeader({
  month,
  year,
  monthLabels,
  t,
  onPrev,
  onNext,
}: MonthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-between mb-6">
<div>
<h1 className="text-base text-center font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {t(monthLabels[month])} {year}
      </h1>

    <div className="flex">
              <button
          onClick={onPrev}
          aria-label={t('prev_month')}
          className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          aria-label={t('next_month')}
          className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
        >
          ›
        </button>
	</div>
	</div>

    </div>
  )
}
