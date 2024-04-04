import type { Request, Response } from "express";
import { MetricsService } from "../services/metrics-service";

const metricsService = new MetricsService();

export async function getMetrics(req: Request, res: Response): Promise<void> {
  const startDate: string = req.query.startDate as string;
  const endDate: string = req.query.endDate as string;

  const { data, error } = await metricsService.getAll(startDate, endDate);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
}

export const metricsController = { getMetrics };
