export interface CategoryMetrics {
  category_name: string;
  date: string;
  product_views: number;
  revenue: number;
  units_sold: number;
}

export interface AggregatedCategoryMetrics {
  date: string;
  product_views_total: number;
  revenue_total: number;
  units_sold_total: number;
}

export enum Metrics {
  ProductViews = "product_views",
  Revenue = "revenue",
  UnitsSold = "units_sold",
}
