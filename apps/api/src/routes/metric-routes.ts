import { Router } from "express";
import { metricsController } from "../controllers/metric-controller";

export const metricsRouter: Router = Router();

metricsRouter.get("/time", metricsController.aggregateMetricsByTime);
metricsRouter.get("/category", metricsController.aggregateMetricsByCategory);

export default metricsRouter;
