import type { Database } from "sqlite";
import { getDatabaseConnection } from "../config/database-connection";
import type {
  CategoryAggregatedMetric,
  MetricResponse,
  TimeAggregatedMetric,
} from "../types";

export class MetricService {
  async aggregateMetricsByTime(): Promise<MetricResponse> {
    const db: Database = await getDatabaseConnection();
    const query = `
      SELECT date,
             SUM(product_views) AS product_views,
             SUM(revenue) AS revenue,
             SUM(units_sold) AS units_sold
      FROM metrics
      GROUP BY date ORDER BY date ASC
    `;

    try {
      const data: TimeAggregatedMetric[] = await db.all(query);
      await db.close();
      return { data, error: "", success: true };
    } catch (error: unknown) {
      await db.close();
      return { error: (error as Error).message, success: false };
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
      const data: CategoryAggregatedMetric[] = await db.all(query);

      await db.close();
      return { data, error: "", success: true };
    } catch (error) {
      await db.close();
      return { error: (error as Error).message, success: false };
    }
  }
}
