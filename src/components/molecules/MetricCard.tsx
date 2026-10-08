import React from 'react';
import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/atoms/IconBadge';
import { Badge } from '@/components/atoms/Badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string;
  change?: number; // percentage change
  changeLabel?: string;
  icon: React.ReactNode;
  iconVariant?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'slate';
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';
  subtitle?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs. prior period',
  icon,
  iconVariant = 'blue',
  badgeText,
  badgeVariant = 'neutral',
  subtitle,
  className,
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        'relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 group',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <IconBadge variant={iconVariant} className="group-hover:scale-105 transition-transform">
          {icon}
        </IconBadge>
      </div>

      <div className="mt-3.5 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
        {change !== undefined ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-semibold text-xs',
                isPositive && 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
                isNegative && 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
                !isPositive && !isNegative && 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400'
              )}
            >
              {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
              {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
              {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
              {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-slate-500 dark:text-slate-400">{changeLabel}</span>
          </div>
        ) : subtitle ? (
          <span className="text-slate-500 dark:text-slate-400">{subtitle}</span>
        ) : null}

        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
      </div>
    </div>
  );
};
