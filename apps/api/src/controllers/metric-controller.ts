import type { Request, Response } from "express";
import { MetricService } from "../services/metric-service";

const metricService = new MetricService();

export async function aggregateMetricsByTime(
  req: Request,
  res: Response
): Promise<void> {
  const { startDate, endDate } = req.query as {
    startDate: string;
    endDate: string;
  };

  const { data, error } = await metricService.aggregateMetricsByTime(
    startDate,
    endDate
  );

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
}

export async function aggregateMetricsByCategory(
  req: Request,
  res: Response
): Promise<void> {
  const { startDate, endDate } = req.query as {
    startDate: string;
    endDate: string;
  };

  const { data, error } = await metricService.aggregateMetricsByCategory();

  console.log("data", data);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
}

export const metricsController = {
  aggregateMetricsByTime,
  aggregateMetricsByCategory,
};
