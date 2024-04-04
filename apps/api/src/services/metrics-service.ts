import type { Database } from "sqlite";
import { getDatabaseConnection } from "../config/database-connection";

interface Metric {
  date: string;
  product_views: number;
  revenue: number;
  units_sold: number;
}

interface ServiceResponse {
  data?: Metric[];
  error?: Error;
}

export class MetricsService {
  async getAll(startDate?: string, endDate?: string): Promise<ServiceResponse> {
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
      const data: Metric[] = await db.all(query, params);
      await db.close();
      return { data };
    } catch (error) {
      await db.close();
      return { error };
    }
  }
}
