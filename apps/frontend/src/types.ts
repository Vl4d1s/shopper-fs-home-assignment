export interface ApiDataType {
  date?: string;
  category_name?: string;
  product_views: number;
  revenue: number;
  units_sold: number;
  cvr?: number;
}

export interface TimeAggregatedMetric {
  date: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
}

export interface CategoryAggregatedMetric {
  categoryName: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
  cvr: number;
}

export type AggregatedMetric = TimeAggregatedMetric | CategoryAggregatedMetric;

export enum Metrics {
  ProductViews = "productViews",
  Revenue = "revenue",
  UnitsSold = "unitsSold",
}
