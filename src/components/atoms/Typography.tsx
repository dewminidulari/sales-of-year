import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, className, children, ...props }) => {
  const styles = {
    1: 'text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white',
    2: 'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white',
    3: 'text-lg sm:text-xl font-semibold text-slate-900 dark:text-white',
    4: 'text-base font-semibold text-slate-800 dark:text-slate-100',
  };

  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      className: cn(styles[level], className),
      ...props,
    },
    children
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'muted' | 'body' | 'small' | 'caption';
}

export const Text: React.FC<TextProps> = ({ variant = 'body', className, children, ...props }) => {
  const styles = {
    body: 'text-sm text-slate-700 dark:text-slate-300 leading-relaxed',
    muted: 'text-sm text-slate-500 dark:text-slate-400',
    small: 'text-xs text-slate-600 dark:text-slate-400',
    caption: 'text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500',
  };

  return (
    <p className={cn(styles[variant], className)} {...props}>
      {children}
    </p>
  );
};
