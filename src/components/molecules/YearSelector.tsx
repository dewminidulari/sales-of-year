import React from 'react';
import { SalesYear } from '@/types/sales';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export interface YearSelectorProps {
  selectedYear: SalesYear;
  onSelectYear: (year: SalesYear) => void;
  className?: string;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onSelectYear,
  className,
}) => {
  const years: { year: SalesYear; label: string; badge: string }[] = [
    { year: 2024, label: 'FY 2024', badge: '+30.3% YoY' },
    { year: 2023, label: 'FY 2023', badge: '+27.7% YoY' },
    { year: 2022, label: 'FY 2022', badge: 'Base Year' },
  ];

  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-inner',
        className
      )}
    >
      <div className="flex items-center px-2 py-1 text-slate-400 dark:text-slate-500">
        <Calendar className="w-4 h-4 mr-1.5" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Year:</span>
      </div>
      <div className="flex items-center gap-1">
        {years.map(({ year, label, badge }) => {
          const isSelected = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              onClick={() => onSelectYear(year)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer',
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              )}
            >
              <span>{label}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-md font-mono hidden md:inline',
                  isSelected
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'bg-slate-200/60 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                )}
              >
                {badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
