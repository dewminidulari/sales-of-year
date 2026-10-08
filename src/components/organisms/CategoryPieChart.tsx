'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { CategorySalesRecord } from '@/types/sales';
import { formatCurrency } from '@/lib/utils';
import { PieChart as PieIcon } from 'lucide-react';

export interface CategoryPieChartProps {
  data: CategorySalesRecord[];
  year: number;
}

const CATEGORY_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

interface CustomPieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CategorySalesRecord;
    value: number;
  }>;
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data, year }) => {
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);

  const CustomPieTooltip = ({ active, payload }: CustomPieTooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs">
          <p className="font-semibold text-slate-100 text-sm mb-1">{item.category}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Sales:</span>
              <span className="font-bold text-blue-400">{formatCurrency(item.sales)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Share:</span>
              <span className="font-medium text-emerald-400">{item.percentage}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Est. Profit:</span>
              <span className="font-medium text-slate-200">{formatCurrency(item.profit)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Category Distribution
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            FY {year}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Kaggle product catalog breakdown by gross revenue
        </p>
      </div>

      {/* Donut Chart */}
      <div className="w-full h-[220px] relative my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="sales"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={entry.color || CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total
          </span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(totalSales, true)}
          </span>
        </div>
      </div>

      {/* Category breakdown pills */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {data.map((cat, idx) => (
          <div
            key={cat.category}
            className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: cat.color || CATEGORY_COLORS[idx] }}
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">{cat.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatCurrency(cat.sales, true)}
              </span>
              <span className="text-[11px] font-mono text-slate-400">({cat.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
