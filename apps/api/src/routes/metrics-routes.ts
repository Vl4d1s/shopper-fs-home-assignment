import { Router } from "express";
import { metricsController } from "../controllers/metrics-controller";

export const metricsRouter: Router = Router();

metricsRouter.get("/time", metricsController.getMetrics);

export default metricsRouter;
