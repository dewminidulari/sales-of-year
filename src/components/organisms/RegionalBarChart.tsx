'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { RegionalSalesRecord } from '@/types/sales';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Globe2 } from 'lucide-react';

export interface RegionalBarChartProps {
  data: RegionalSalesRecord[];
  year: number;
}

interface CustomRegionalTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: RegionalSalesRecord;
    value: number;
  }>;
}

export const RegionalBarChart: React.FC<RegionalBarChartProps> = ({ data, year }) => {
  const CustomRegionalTooltip = ({ active, payload }: CustomRegionalTooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs">
          <p className="font-semibold text-slate-100 text-sm mb-1">{item.region} Division</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Sales:</span>
              <span className="font-bold text-emerald-400">{formatCurrency(item.sales)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Orders:</span>
              <span className="font-medium text-slate-200">{item.orders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">YoY Expansion:</span>
              <span className="font-medium text-blue-400">{formatPercent(item.growth)}</span>
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
            <Globe2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Territory & Regional Volume
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            FY {year}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Regional fulfillment hubs from Kaggle superstore logs
        </p>
      </div>

      <div className="w-full h-[220px] relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.6} />
            <XAxis
              type="number"
              stroke="#94a3b8"
              fontSize={11}
              tickFormatter={(v) => formatCurrency(v, true)}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="region"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomRegionalTooltip />} />
            <Bar dataKey="sales" fill="#10b981" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        {data.map((reg) => (
          <div key={reg.region} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <div className="flex justify-between items-center mb-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{reg.region}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                {formatPercent(reg.growth)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{formatCurrency(reg.sales, true)}</span>
              <span>{reg.orders.toLocaleString()} orders</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
