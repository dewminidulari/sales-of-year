'use client';

import React, { useState } from 'react';
import { MonthlySalesRecord } from '@/types/sales';
import { Badge } from '@/components/atoms/Badge';
import { formatCurrency } from '@/lib/utils';
import { Table, ArrowUpDown, CheckCircle, XCircle, Search } from 'lucide-react';

export interface MonthlyDataTableProps {
  monthlyData: MonthlySalesRecord[];
  threshold: number;
  year: number;
}

export const MonthlyDataTable: React.FC<MonthlyDataTableProps> = ({
  monthlyData,
  threshold,
  year,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'monthIndex' | 'sales' | 'profit' | 'orders'>('monthIndex');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: 'monthIndex' | 'sales' | 'profit' | 'orders') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for metrics
    }
  };

  const filtered = monthlyData
    .filter((m) =>
      m.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topCategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortAsc ? 1 : -1;
      return (a[sortField] > b[sortField] ? 1 : -1) * mult;
    });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Monthly Performance Breakdown Table
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              FY {year}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Detailed ledger of sales figures, profit margins, and threshold fulfillment status
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search month or category..."
            className="w-full h-9 pl-8 pr-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('monthIndex')}
              >
                <div className="flex items-center gap-1">
                  <span>Month</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center gap-1">
                  <span>Revenue Sales</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('profit')}
              >
                <div className="flex items-center gap-1">
                  <span>Net Profit</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Margin</th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('orders')}
              >
                <div className="flex items-center gap-1">
                  <span>Orders</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Top Category</th>
              <th className="py-3 px-3">Target Variance</th>
              <th className="py-3 px-3 text-right">Threshold Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((item) => {
              const isQualified = item.sales >= threshold;
              const margin = item.sales > 0 ? (item.profit / item.sales) * 100 : 0;
              const targetVariance = item.sales - item.target;

              return (
                <tr
                  key={item.month}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {item.month}
                  </td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(item.sales)}
                  </td>
                  <td className="py-3 px-3 font-medium text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(item.profit)}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {margin.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                    {item.orders.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.topCategory}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span
                      className={`inline-block font-medium ${
                        targetVariance >= 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {targetVariance >= 0 ? '+' : ''}
                      {formatCurrency(targetVariance, true)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant={isQualified ? 'success' : 'neutral'} size="sm">
                      {isQualified ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-0.5 text-emerald-500" />
                          Qualified
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-0.5 text-slate-400" />
                          Below
                        </>
                      )}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
