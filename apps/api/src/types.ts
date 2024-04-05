export interface MetricResponse {
  success: boolean;
  data?: TimeAggregatedMetric[] | CategoryAggregatedMetric[];
  error?: string;
}

export interface TimeAggregatedMetric {
  date: string;
  product_views: number;
  revenue: number;
  units_sold: number;
}

export interface CategoryAggregatedMetric {
  category_name: string;
  product_views: number;
  revenue: number;
  units_sold: number;
  cvr: number;
}

export interface MetricRawData {
  category_name: string;
  date: string;
  product_views: number;
  revenue: number;
  units_sold: number;
}
