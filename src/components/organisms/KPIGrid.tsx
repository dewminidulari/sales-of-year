import React from 'react';
import { MetricCard } from '@/components/molecules/MetricCard';
import { YearlySalesSummary } from '@/types/sales';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, Award, CalendarCheck, Wallet } from 'lucide-react';

export interface KPIGridProps {
  summary: YearlySalesSummary;
  threshold: number;
  monthsAboveThreshold: number;
  totalMonths: number;
  salesAboveThreshold: number;
}

export const KPIGrid: React.FC<KPIGridProps> = ({
  summary,
  threshold,
  monthsAboveThreshold,
  totalMonths,
  salesAboveThreshold,
}) => {
  const complianceRate = totalMonths > 0 ? Math.round((monthsAboveThreshold / totalMonths) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Annual Sales"
        value={formatCurrency(summary.totalSales)}
        change={summary.yoyGrowthRate}
        changeLabel="YoY growth"
        icon={<DollarSign className="w-5 h-5" />}
        iconVariant="blue"
        badgeText={`FY ${summary.year}`}
        badgeVariant="info"
      />

      <MetricCard
        title="Monthly Average"
        value={formatCurrency(summary.averageMonthlySales)}
        subtitle={`Top: ${summary.topSellingMonth}`}
        icon={<CalendarCheck className="w-5 h-5" />}
        iconVariant="purple"
        badgeText={`Top Month`}
        badgeVariant="purple"
      />

      <MetricCard
        title="Total Net Profit"
        value={formatCurrency(summary.totalProfit)}
        subtitle={`${summary.profitMargin}% profit margin`}
        icon={<Wallet className="w-5 h-5" />}
        iconVariant="emerald"
        badgeText={`${summary.totalOrders.toLocaleString()} Orders`}
        badgeVariant="success"
      />

      <MetricCard
        title="Threshold Qualifying"
        value={`${monthsAboveThreshold} / ${totalMonths}`}
        subtitle={`${formatCurrency(salesAboveThreshold, true)} above ${formatCurrency(threshold, true)} threshold`}
        icon={<Award className="w-5 h-5" />}
        iconVariant={complianceRate >= 50 ? 'emerald' : 'amber'}
        badgeText={`${complianceRate}% Met`}
        badgeVariant={complianceRate >= 50 ? 'success' : 'warning'}
      />
    </div>
  );
};
