export interface MetricSummary {
  date?: string;
  category?: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
  cvr?: number;
}

export interface ApiDataType {
  date?: string;
  category?: string;
  product_views: number;
  revenue: number;
  units_sold: number;
  cvr?: number;
}

export enum Metrics {
  ProductViews = "productViews",
  Revenue = "revenue",
  UnitsSold = "unitsSold",
}
