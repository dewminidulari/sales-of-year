import { SalesApiResponse, SalesYear, ProductCategory } from '@/types/sales';

export interface FetchSalesParams {
  year: SalesYear;
  threshold?: number;
  category?: ProductCategory;
}

export async function fetchSalesData(params: FetchSalesParams): Promise<SalesApiResponse> {
  const query = new URLSearchParams();
  query.set('year', params.year.toString());
  if (params.threshold !== undefined) {
    query.set('threshold', params.threshold.toString());
  }
  if (params.category && params.category !== 'All') {
    query.set('category', params.category);
  }

  const res = await fetch(`/api/sales?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sales data: ${res.statusText}`);
  }

  return res.json();
}
