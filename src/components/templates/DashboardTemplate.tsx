import React from 'react';

export interface DashboardTemplateProps {
  header: React.ReactNode;
  banner?: React.ReactNode;
  filterSection: React.ReactNode;
  kpiSection: React.ReactNode;
  mainChartSection: React.ReactNode;
  sideChartsSection: React.ReactNode;
  dataTableSection: React.ReactNode;
  footer?: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  header,
  banner,
  filterSection,
  kpiSection,
  mainChartSection,
  sideChartsSection,
  dataTableSection,
  footer,
}) => {
  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Level 4: Header Slot */}
      {header}

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner Slot */}
        {banner && <div>{banner}</div>}

        {/* Filter / Threshold Input Slot */}
        <div>{filterSection}</div>

        {/* KPI Grid Slot */}
        <div>{kpiSection}</div>

        {/* Primary Chart Slot (Sales Velocity Trends) */}
        <div>{mainChartSection}</div>

        {/* Auxiliary Multi-Chart Breakdown (Category Pie & Regional Bars) */}
        <div>{sideChartsSection}</div>

        {/* Full Tabular Data Breakdown Slot */}
        <div>{dataTableSection}</div>
      </main>

      {/* Footer */}
      {footer}
    </div>
  );
};
