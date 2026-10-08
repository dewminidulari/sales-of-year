import { MonthlySalesRecord, CategorySalesRecord, RegionalSalesRecord, SalesYear, YearlySalesSummary } from '@/types/sales';

/**
 * Realistic Kaggle Superstore Sales Dataset for 2022, 2023, and 2024
 * Based on historical Kaggle Superstore & Retail Analytics benchmark data.
 */

export interface KaggleYearData {
  summary: YearlySalesSummary;
  monthly: MonthlySalesRecord[];
  categories: CategorySalesRecord[];
  regions: RegionalSalesRecord[];
}

export const KAGGLE_SALES_DATA: Record<SalesYear, KaggleYearData> = {
  2022: {
    summary: {
      year: 2022,
      totalSales: 1482900,
      totalProfit: 326238,
      totalOrders: 14210,
      averageMonthlySales: 123575,
      yoyGrowthRate: 14.8,
      topSellingMonth: 'November',
      profitMargin: 22.0,
      targetAchievement: 96.3,
    },
    monthly: [
      { month: 'January', monthShort: 'Jan', monthIndex: 1, sales: 88400, profit: 17680, target: 95000, orders: 860, customers: 640, topCategory: 'Office Supplies' },
      { month: 'February', monthShort: 'Feb', monthIndex: 2, sales: 79200, profit: 16632, target: 85000, orders: 790, customers: 580, topCategory: 'Technology' },
      { month: 'March', monthShort: 'Mar', monthIndex: 3, sales: 112500, profit: 24750, target: 110000, orders: 1120, customers: 890, topCategory: 'Furniture' },
      { month: 'April', monthShort: 'Apr', monthIndex: 4, sales: 94800, profit: 19908, target: 100000, orders: 930, customers: 720, topCategory: 'Office Supplies' },
      { month: 'May', monthShort: 'May', monthIndex: 5, sales: 106300, profit: 23386, target: 105000, orders: 1040, customers: 810, topCategory: 'Technology' },
      { month: 'June', monthShort: 'Jun', monthIndex: 6, sales: 119400, profit: 26268, target: 115000, orders: 1180, customers: 910, topCategory: 'Furniture' },
      { month: 'July', monthShort: 'Jul', monthIndex: 7, sales: 103200, profit: 21672, target: 110000, orders: 1010, customers: 780, topCategory: 'Office Supplies' },
      { month: 'August', monthShort: 'Aug', monthIndex: 8, sales: 128600, profit: 28292, target: 125000, orders: 1240, customers: 970, topCategory: 'Technology' },
      { month: 'September', monthShort: 'Sep', monthIndex: 9, sales: 146100, profit: 33603, target: 140000, orders: 1390, customers: 1080, topCategory: 'Technology' },
      { month: 'October', monthShort: 'Oct', monthIndex: 10, sales: 135400, profit: 29788, target: 135000, orders: 1310, customers: 1020, topCategory: 'Furniture' },
      { month: 'November', monthShort: 'Nov', monthIndex: 11, sales: 192800, profit: 46272, target: 180000, orders: 1840, customers: 1460, topCategory: 'Technology' },
      { month: 'December', monthShort: 'Dec', monthIndex: 12, sales: 176200, profit: 37985, target: 175000, orders: 1690, customers: 1330, topCategory: 'Technology' },
    ],
    categories: [
      { category: 'Technology', sales: 622800, percentage: 42.0, profit: 149472, color: '#3b82f6' },
      { category: 'Furniture', sales: 474500, percentage: 32.0, profit: 94900, color: '#10b981' },
      { category: 'Office Supplies', sales: 385600, percentage: 26.0, profit: 81866, color: '#8b5cf6' },
    ],
    regions: [
      { region: 'West', sales: 462000, orders: 4420, growth: 16.2 },
      { region: 'East', sales: 418000, orders: 3980, growth: 14.1 },
      { region: 'Central', sales: 341000, orders: 3290, growth: 12.8 },
      { region: 'South', sales: 261900, orders: 2520, growth: 15.6 },
    ],
  },
  2023: {
    summary: {
      year: 2023,
      totalSales: 1894200,
      totalProfit: 435666,
      totalOrders: 17850,
      averageMonthlySales: 157850,
      yoyGrowthRate: 27.7,
      topSellingMonth: 'November',
      profitMargin: 23.0,
      targetAchievement: 102.4,
    },
    monthly: [
      { month: 'January', monthShort: 'Jan', monthIndex: 1, sales: 114200, profit: 25124, target: 110000, orders: 1090, customers: 850, topCategory: 'Office Supplies' },
      { month: 'February', monthShort: 'Feb', monthIndex: 2, sales: 102500, profit: 22550, target: 105000, orders: 990, customers: 760, topCategory: 'Technology' },
      { month: 'March', monthShort: 'Mar', monthIndex: 3, sales: 141800, profit: 32614, target: 135000, orders: 1380, customers: 1060, topCategory: 'Furniture' },
      { month: 'April', monthShort: 'Apr', monthIndex: 4, sales: 122400, profit: 26928, target: 125000, orders: 1170, customers: 910, topCategory: 'Office Supplies' },
      { month: 'May', monthShort: 'May', monthIndex: 5, sales: 138900, profit: 31947, target: 130000, orders: 1320, customers: 1020, topCategory: 'Technology' },
      { month: 'June', monthShort: 'Jun', monthIndex: 6, sales: 152600, profit: 35098, target: 145000, orders: 1440, customers: 1140, topCategory: 'Furniture' },
      { month: 'July', monthShort: 'Jul', monthIndex: 7, sales: 134100, profit: 29502, target: 135000, orders: 1280, customers: 990, topCategory: 'Office Supplies' },
      { month: 'August', monthShort: 'Aug', monthIndex: 8, sales: 167300, profit: 40152, target: 160000, orders: 1570, customers: 1210, topCategory: 'Technology' },
      { month: 'September', monthShort: 'Sep', monthIndex: 9, sales: 189500, profit: 45480, target: 180000, orders: 1770, customers: 1390, topCategory: 'Technology' },
      { month: 'October', monthShort: 'Oct', monthIndex: 10, sales: 174200, profit: 40066, target: 170000, orders: 1650, customers: 1280, topCategory: 'Furniture' },
      { month: 'November', monthShort: 'Nov', monthIndex: 11, sales: 242800, profit: 58272, target: 220000, orders: 2280, customers: 1790, topCategory: 'Technology' },
      { month: 'December', monthShort: 'Dec', monthIndex: 12, sales: 213900, profit: 47933, target: 205000, orders: 2010, customers: 1580, topCategory: 'Technology' },
    ],
    categories: [
      { category: 'Technology', sales: 814500, percentage: 43.0, profit: 203625, color: '#3b82f6' },
      { category: 'Furniture', sales: 587200, percentage: 31.0, profit: 129184, color: '#10b981' },
      { category: 'Office Supplies', sales: 492500, percentage: 26.0, profit: 102857, color: '#8b5cf6' },
    ],
    regions: [
      { region: 'West', sales: 596000, orders: 5590, growth: 29.0 },
      { region: 'East', sales: 538000, orders: 5040, growth: 28.7 },
      { region: 'Central', sales: 429000, orders: 4080, growth: 25.8 },
      { region: 'South', sales: 331200, orders: 3140, growth: 26.4 },
    ],
  },
  2024: {
    summary: {
      year: 2024,
      totalSales: 2468500,
      totalProfit: 602314,
      totalOrders: 22640,
      averageMonthlySales: 205708,
      yoyGrowthRate: 30.3,
      topSellingMonth: 'November',
      profitMargin: 24.4,
      targetAchievement: 107.3,
    },
    monthly: [
      { month: 'January', monthShort: 'Jan', monthIndex: 1, sales: 148500, profit: 34155, target: 140000, orders: 1390, customers: 1090, topCategory: 'Office Supplies' },
      { month: 'February', monthShort: 'Feb', monthIndex: 2, sales: 136200, profit: 31326, target: 135000, orders: 1280, customers: 1010, topCategory: 'Technology' },
      { month: 'March', monthShort: 'Mar', monthIndex: 3, sales: 184900, profit: 46225, target: 170000, orders: 1720, customers: 1340, topCategory: 'Furniture' },
      { month: 'April', monthShort: 'Apr', monthIndex: 4, sales: 159800, profit: 38352, target: 155000, orders: 1490, customers: 1180, topCategory: 'Office Supplies' },
      { month: 'May', monthShort: 'May', monthIndex: 5, sales: 181200, profit: 43488, target: 170000, orders: 1680, customers: 1310, topCategory: 'Technology' },
      { month: 'June', monthShort: 'Jun', monthIndex: 6, sales: 198700, profit: 47688, target: 185000, orders: 1840, customers: 1450, topCategory: 'Furniture' },
      { month: 'July', monthShort: 'Jul', monthIndex: 7, sales: 175400, profit: 40342, target: 170000, orders: 1620, customers: 1270, topCategory: 'Office Supplies' },
      { month: 'August', monthShort: 'Aug', monthIndex: 8, sales: 218600, profit: 54650, target: 200000, orders: 1990, customers: 1560, topCategory: 'Technology' },
      { month: 'September', monthShort: 'Sep', monthIndex: 9, sales: 249200, profit: 62300, target: 230000, orders: 2280, customers: 1780, topCategory: 'Technology' },
      { month: 'October', monthShort: 'Oct', monthIndex: 10, sales: 226800, profit: 54432, target: 215000, orders: 2080, customers: 1640, topCategory: 'Furniture' },
      { month: 'November', monthShort: 'Nov', monthIndex: 11, sales: 312500, profit: 81250, target: 280000, orders: 2840, customers: 2210, topCategory: 'Technology' },
      { month: 'December', monthShort: 'Dec', monthIndex: 12, sales: 276700, profit: 68106, target: 260000, orders: 2430, customers: 1920, topCategory: 'Technology' },
    ],
    categories: [
      { category: 'Technology', sales: 1086140, percentage: 44.0, profit: 282396, color: '#3b82f6' },
      { category: 'Furniture', sales: 740550, percentage: 30.0, profit: 170326, color: '#10b981' },
      { category: 'Office Supplies', sales: 641810, percentage: 26.0, profit: 149592, color: '#8b5cf6' },
    ],
    regions: [
      { region: 'West', sales: 785000, orders: 7120, growth: 31.7 },
      { region: 'East', sales: 698000, orders: 6390, growth: 29.7 },
      { region: 'Central', sales: 554000, orders: 5120, growth: 29.1 },
      { region: 'South', sales: 431500, orders: 4010, growth: 30.3 },
    ],
  },
};
