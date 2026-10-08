import React from 'react';
import { ProductCategory } from '@/types/sales';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

export interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  className,
}) => {
  const categories: ProductCategory[] = ['All', 'Technology', 'Furniture', 'Office Supplies'];

  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60',
        className
      )}
    >
      <div className="flex items-center px-2 py-1 text-slate-400 dark:text-slate-500">
        <Filter className="w-3.5 h-3.5 mr-1" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden lg:inline">Category:</span>
      </div>
      <div className="flex items-center gap-1">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer',
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-900/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
