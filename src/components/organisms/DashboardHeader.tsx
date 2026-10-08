'use client';

import React from 'react';
import { SalesYear, ProductCategory } from '@/types/sales';
import { YearSelector } from '@/components/molecules/YearSelector';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { ApiStatusBadge } from '@/components/molecules/ApiStatusBadge';
import { BarChart3, Sparkles, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export interface DashboardHeaderProps {
  selectedYear: SalesYear;
  onSelectYear: (year: SalesYear) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedYear,
  onSelectYear,
  selectedCategory,
  onSelectCategory,
  isLoading,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-4">
          {/* Brand & Title */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    SalesPulse
                  </h1>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    Next.js 15
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Atomic Sales Intelligence Platform
                </p>
              </div>
            </Link>

            <div className="flex md:hidden">
              <ApiStatusBadge isLoading={isLoading} onRefresh={onRefresh} />
            </div>
          </div>

          {/* Central Controls: Year and Category Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <YearSelector selectedYear={selectedYear} onSelectYear={onSelectYear} />
            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            <ApiStatusBadge isLoading={isLoading} onRefresh={onRefresh} />
            <a
              href="https://www.kaggle.com/datasets/vivek46/superstore-dataset-final"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 transition-colors"
            >
              <span>Kaggle Data</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
