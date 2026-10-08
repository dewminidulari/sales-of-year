import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefixIcon, suffixText, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-10 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs disabled:cursor-not-allowed disabled:opacity-50',
              prefixIcon && 'pl-9',
              suffixText && 'pr-12',
              error && 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500',
              className
            )}
            {...props}
          />
          {suffixText && (
            <div className="absolute right-3 text-xs font-medium text-slate-400 dark:text-slate-500 pointer-events-none">
              {suffixText}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
