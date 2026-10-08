import { NextRequest, NextResponse } from 'next/server';
import { KAGGLE_SALES_DATA } from '@/data/kaggleSalesDataset';
import { SalesApiResponse, SalesYear, ProductCategory } from '@/types/sales';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query params
    const yearParam = searchParams.get('year');
    const thresholdParam = searchParams.get('threshold');
    const categoryParam = searchParams.get('category');

    const year: SalesYear = (yearParam === '2022' || yearParam === '2023' || yearParam === '2024')
      ? (parseInt(yearParam, 10) as SalesYear)
      : 2024;

    const threshold = thresholdParam ? Math.max(0, parseInt(thresholdParam, 10)) : 150000;
    const category: ProductCategory = (categoryParam as ProductCategory) || 'All';

    // Retrieve dataset for requested year
    const yearData = KAGGLE_SALES_DATA[year];
    if (!yearData) {
      return NextResponse.json({ error: 'Year data not found' }, { status: 404 });
    }

    // Category weighting factor if filtering by a single category
    const categoryWeights: Record<string, number> = {
      Technology: 0.44,
      Furniture: 0.30,
      'Office Supplies': 0.26,
    };

    const multiplier = category !== 'All' && categoryWeights[category] ? categoryWeights[category] : 1;

    // Process monthly data with category adjustments
    const processedMonthly = yearData.monthly.map((m) => {
      const adjustedSales = Math.round(m.sales * multiplier);
      const adjustedProfit = Math.round(m.profit * multiplier);
      const adjustedTarget = Math.round(m.target * multiplier);

      return {
        ...m,
        sales: adjustedSales,
        profit: adjustedProfit,
        target: adjustedTarget,
      };
    });

    // Compute threshold statistics
    const monthsAbove = processedMonthly.filter((m) => m.sales >= threshold);
    const salesAboveThreshold = monthsAbove.reduce((acc, curr) => acc + curr.sales, 0);

    const thresholdStats = {
      threshold,
      monthsAboveThreshold: monthsAbove.length,
      totalMonths: processedMonthly.length,
      salesAboveThreshold,
      thresholdAchievementRate: processedMonthly.length > 0 
        ? Math.round((monthsAbove.length / processedMonthly.length) * 100) 
        : 0,
    };

    // Calculate adjusted summary
    const totalSales = processedMonthly.reduce((sum, item) => sum + item.sales, 0);
    const totalProfit = processedMonthly.reduce((sum, item) => sum + item.profit, 0);
    const averageMonthlySales = Math.round(totalSales / processedMonthly.length);

    // Find top selling month
    const topMonth = [...processedMonthly].sort((a, b) => b.sales - a.sales)[0]?.month || 'November';

    const adjustedSummary = {
      ...yearData.summary,
      totalSales,
      totalProfit,
      averageMonthlySales,
      topSellingMonth: topMonth,
      profitMargin: totalSales > 0 ? parseFloat(((totalProfit / totalSales) * 100).toFixed(1)) : 0,
    };

    const responsePayload: SalesApiResponse = {
      year,
      summary: adjustedSummary,
      monthly: processedMonthly,
      categories: yearData.categories,
      regions: yearData.regions,
      thresholdStats,
      metadata: {
        source: 'https://www.kaggle.com/datasets/vivek46/superstore-dataset-final',
        datasetName: 'Kaggle Superstore Global Retail Sales Benchmark',
        generatedAt: new Date().toISOString(),
        cached: false,
      },
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API Error /api/sales:', error);
    return NextResponse.json({ error: 'Internal server error processing sales data' }, { status: 500 });
  }
}
