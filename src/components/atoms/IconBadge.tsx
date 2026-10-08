import React from 'react';
import { cn } from '@/lib/utils';

export interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md' | 'lg';
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className,
  ...props
}) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  };

  const sizeStyles = {
    sm: 'w-7 h-7 rounded-md p-1.5',
    md: 'w-10 h-10 rounded-xl p-2.5',
    lg: 'w-12 h-12 rounded-2xl p-3',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0 transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
