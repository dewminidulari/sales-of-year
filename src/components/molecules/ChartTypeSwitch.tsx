import React from 'react';
import { ChartType } from '@/types/sales';
import { cn } from '@/lib/utils';
import { BarChart3, LineChart, AreaChart, Layers } from 'lucide-react';

export interface ChartTypeSwitchProps {
  currentType: ChartType;
  onChange: (type: ChartType) => void;
  className?: string;
}

export const ChartTypeSwitch: React.FC<ChartTypeSwitchProps> = ({
  currentType,
  onChange,
  className,
}) => {
  const options: { type: ChartType; label: string; icon: React.ReactNode }[] = [
    { type: 'bar', label: 'Bar', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { type: 'line', label: 'Line', icon: <LineChart className="w-3.5 h-3.5" /> },
    { type: 'area', label: 'Area', icon: <AreaChart className="w-3.5 h-3.5" /> },
    { type: 'composed', label: 'Composed', icon: <Layers className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60',
        className
      )}
    >
      {options.map(({ type, label, icon }) => {
        const isActive = currentType === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer',
              isActive
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            )}
            title={`Switch to ${label} Chart`}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
