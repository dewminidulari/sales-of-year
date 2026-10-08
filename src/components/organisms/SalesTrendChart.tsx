'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import { MonthlySalesRecord, ChartType } from '@/types/sales';
import { ChartTypeSwitch } from '@/components/molecules/ChartTypeSwitch';
import { Badge } from '@/components/atoms/Badge';
import { formatCurrency } from '@/lib/utils';
import { BarChart2, TrendingUp, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export interface SalesTrendChartProps {
  data: MonthlySalesRecord[];
  threshold: number;
  year: number;
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({
  data,
  threshold,
  year,
  chartType,
  onChartTypeChange,
}) => {
  // Custom styled Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0].payload as MonthlySalesRecord;
      const isAbove = current.sales >= threshold;

      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs min-w-[210px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="font-semibold text-sm text-slate-100">{current.month} {year}</span>
            <Badge variant={isAbove ? 'success' : 'neutral'} size="sm">
              {isAbove ? 'Above Target' : 'Below Target'}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Sales:</span>
              <span className="font-bold text-blue-400 text-sm">
                {formatCurrency(current.sales)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Net Profit:</span>
              <span className="font-medium text-emerald-400">
                {formatCurrency(current.profit)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Target Goal:</span>
              <span className="font-medium text-amber-400">
                {formatCurrency(current.target)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Orders:</span>
              <span className="font-medium text-slate-200">{current.orders.toLocaleString()}</span>
            </div>
          </div>

          {threshold > 0 && (
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Threshold Variance:</span>
              <span
                className={`font-semibold ${
                  isAbove ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {current.sales >= threshold ? '+' : ''}
                {formatCurrency(current.sales - threshold)}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Monthly Sales Velocity & Dynamics
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              FY {year}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare monthly revenue against your customizable threshold reference line (${threshold.toLocaleString()})
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ChartTypeSwitch currentType={chartType} onChange={onChartTypeChange} />
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[360px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="barAbove" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="barBelow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#64748b" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis
                dataKey="monthShort"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCurrency(val, true)}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold > 0 && (
                <ReferenceLine
                  y={threshold}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  label={{
                    value: `Threshold: ${formatCurrency(threshold, true)}`,
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
              )}
              <Bar dataKey="sales" name="Sales" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.sales >= threshold ? 'url(#barAbove)' : 'url(#barBelow)'}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis
                dataKey="monthShort"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCurrency(val, true)}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold > 0 && (
                <ReferenceLine
                  y={threshold}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  label={{
                    value: `Threshold: ${formatCurrency(threshold, true)}`,
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
              )}
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="areaSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="areaProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis
                dataKey="monthShort"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCurrency(val, true)}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold > 0 && (
                <ReferenceLine
                  y={threshold}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />
              )}
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#areaSales)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#areaProfit)"
              />
            </AreaChart>
          ) : (
            <ComposedChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="compBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis
                dataKey="monthShort"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCurrency(val, true)}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold > 0 && (
                <ReferenceLine
                  y={threshold}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />
              )}
              <Bar dataKey="sales" name="Sales Revenue" fill="url(#compBar)" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="profit"
                name="Net Profit"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#10b981' }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target Benchmark"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer legend indicators */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" />
            <span>Sales Revenue</span>
          </div>
          {chartType === 'area' || chartType === 'composed' ? (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
              <span>Net Profit</span>
            </div>
          ) : null}
          {chartType === 'line' || chartType === 'composed' ? (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-400 inline-block border-dashed border-b-2" />
              <span>Sales Target</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500 inline-block border-dashed border-b-2" />
            <span>Threshold Line ({formatCurrency(threshold, true)})</span>
          </div>
        </div>

        <span className="font-mono text-[11px] text-slate-400">
          Source: Kaggle Retail Superstore Dataset
        </span>
      </div>
    </div>
  );
};
