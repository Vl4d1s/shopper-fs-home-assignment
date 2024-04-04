export interface MetricSummary {
  date?: string;
  category?: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
  cvr?: number;
}

export enum Metrics {
  ProductViews = "productViews",
  Revenue = "revenue",
  UnitsSold = "unitsSold",
}
