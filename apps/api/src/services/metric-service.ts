import type { Database } from "sqlite";
import { getDatabaseConnection } from "../config/database-connection";
import type { MetricsSummary } from "../types";

interface MetricResponse {
  success: boolean;
  data?: MetricsSummary[];
  error?: string;
}

interface MetricsSummaryByCategory {
  category: string;
  product_views: number;
  revenue: number;
  units_sold: number;
  cvr: number;
}

export class MetricService {
  async aggregateMetricsByTime(
    startDate?: string,
    endDate?: string
  ): Promise<MetricResponse> {
    const db: Database = await getDatabaseConnection();

    let query = `
      SELECT date,
             SUM(product_views) AS product_views,
             SUM(revenue) AS revenue,
             SUM(units_sold) AS units_sold
      FROM metrics
    `;
    const params: string[] = [];

    if (startDate && endDate) {
      query += " WHERE date BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    query += " GROUP BY date ORDER BY date ASC";

    try {
      const data: MetricsSummary[] = await db.all(query, params);
      await db.close();
      return { data, error: "", success: true };
    } catch (error) {
      await db.close();
      return { error: error.message, success: false };
    }
  }

  async aggregateMetricsByCategory(): Promise<MetricResponse> {
    const db: Database = await getDatabaseConnection();

    const query = `
      SELECT category_name,
      SUM(product_views) AS product_views,
      SUM(revenue) AS revenue,
      SUM(units_sold) AS units_sold,
      ROUND(
          CASE
              WHEN SUM(product_views) > 0 THEN
                  (SUM(units_sold) * 1.0) / SUM(product_views)
              ELSE
                  0
          END * 100, 2
      ) AS cvr
      FROM metrics
      GROUP BY category_name
      ORDER BY category_name ASC
  `;

    try {
      const data: MetricsSummaryByCategory[] = await db.all(query);

      await db.close();
      return { data, error: "", success: true };
    } catch (error) {
      await db.close();
      return { error: error.message, success: false };
    }
  }
}
