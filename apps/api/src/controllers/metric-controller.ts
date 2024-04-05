import type { Request, Response, NextFunction } from "express";
import { MetricService } from "../services/metric-service";

const metricService = new MetricService();

export const aggregateMetricsByTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await metricService.aggregateMetricsByTime();
    if (response.error) throw new Error(response.error);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

export const aggregateMetricsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await metricService.aggregateMetricsByCategory();
    if (response.error) throw new Error(response.error);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

export const metricsController = {
  aggregateMetricsByTime,
  aggregateMetricsByCategory,
};
