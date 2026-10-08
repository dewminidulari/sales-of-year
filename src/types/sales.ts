export type SalesYear = 2022 | 2023 | 2024;

export type ChartType = 'bar' | 'line' | 'area' | 'composed';

export type ProductCategory = 'All' | 'Technology' | 'Furniture' | 'Office Supplies';

export interface MonthlySalesRecord {
  month: string;
  monthShort: string;
  monthIndex: number;
  sales: number;
  profit: number;
  target: number;
  orders: number;
  customers: number;
  topCategory: string;
}

export interface CategorySalesRecord {
  category: string;
  sales: number;
  percentage: number;
  profit: number;
  color: string;
}

export interface RegionalSalesRecord {
  region: string;
  sales: number;
  orders: number;
  growth: number;
}

export interface YearlySalesSummary {
  year: SalesYear;
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  averageMonthlySales: number;
  yoyGrowthRate: number; // percentage
  topSellingMonth: string;
  profitMargin: number; // percentage
  targetAchievement: number; // percentage
}

export interface SalesApiResponse {
  year: SalesYear;
  summary: YearlySalesSummary;
  monthly: MonthlySalesRecord[];
  categories: CategorySalesRecord[];
  regions: RegionalSalesRecord[];
  thresholdStats: {
    threshold: number;
    monthsAboveThreshold: number;
    totalMonths: number;
    salesAboveThreshold: number;
    thresholdAchievementRate: number;
  };
  metadata: {
    source: string;
    datasetName: string;
    generatedAt: string;
    cached: boolean;
  };
}

export interface FilterOptions {
  year: SalesYear;
  threshold: number;
  category: ProductCategory;
  chartType: ChartType;
}
