'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SalesApiResponse, SalesYear, ProductCategory, ChartType } from '@/types/sales';
import { fetchSalesData } from '@/lib/api';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { DatasetMetaCard } from '@/components/organisms/DatasetMetaCard';
import { ThresholdFilter } from '@/components/molecules/ThresholdFilter';
import { KPIGrid } from '@/components/organisms/KPIGrid';
import { SalesTrendChart } from '@/components/organisms/SalesTrendChart';
import { CategoryPieChart } from '@/components/organisms/CategoryPieChart';
import { RegionalBarChart } from '@/components/organisms/RegionalBarChart';
import { MonthlyDataTable } from '@/components/organisms/MonthlyDataTable';
import { Skeleton } from '@/components/atoms/Skeleton';
import { AlertCircle, RefreshCw, Layers, Database } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<SalesYear>(2024);
  const [threshold, setThreshold] = useState<number>(150000);
  const [category, setCategory] = useState<ProductCategory>('All');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const [salesData, setSalesData] = useState<SalesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sales data from API route (/api/sales)
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSalesData({
        year: selectedYear,
        threshold,
        category,
      });
      setSalesData(data);
    } catch (err: unknown) {
      console.error('Error fetching sales data:', err);
      const message = err instanceof Error ? err.message : 'Failed to load sales data from API endpoint.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear, threshold, category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Loading Skeleton State
  if (isLoading && !salesData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <Skeleton className="h-96 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error State with Retry
  if (error && !salesData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to Load Data
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <Button variant="primary" onClick={loadData} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry API Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DashboardTemplate
      header={
        <DashboardHeader
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          selectedCategory={category}
          onSelectCategory={setCategory}
          isLoading={isLoading}
          onRefresh={loadData}
        />
      }
      banner={<DatasetMetaCard />}
      filterSection={
        <ThresholdFilter
          threshold={threshold}
          onThresholdChange={setThreshold}
          monthsAboveCount={salesData?.thresholdStats.monthsAboveThreshold ?? 0}
          totalMonths={salesData?.thresholdStats.totalMonths ?? 12}
        />
      }
      kpiSection={
        salesData ? (
          <KPIGrid
            summary={salesData.summary}
            threshold={threshold}
            monthsAboveThreshold={salesData.thresholdStats.monthsAboveThreshold}
            totalMonths={salesData.thresholdStats.totalMonths}
            salesAboveThreshold={salesData.thresholdStats.salesAboveThreshold}
          />
        ) : null
      }
      mainChartSection={
        salesData ? (
          <SalesTrendChart
            data={salesData.monthly}
            threshold={threshold}
            year={selectedYear}
            chartType={chartType}
            onChartTypeChange={setChartType}
          />
        ) : null
      }
      sideChartsSection={
        salesData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryPieChart data={salesData.categories} year={selectedYear} />
            <RegionalBarChart data={salesData.regions} year={selectedYear} />
          </div>
        ) : null
      }
      dataTableSection={
        salesData ? (
          <MonthlyDataTable
            monthlyData={salesData.monthly}
            threshold={threshold}
            year={selectedYear}
          />
        ) : null
      }
      footer={
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 mt-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                SalesPulse Intelligence
              </span>
              <span>•</span>
              <span>Built with Next.js 15, TypeScript & Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                Atomic Design Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                Kaggle Superstore Dataset
              </span>
            </div>
          </div>
        </footer>
      }
    />
  );
}
