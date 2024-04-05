import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import metricRoutes from "./routes/metric-routes";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api/v1/metrics/", metricRoutes)
    .use(notFoundHandler)
    .use(errorHandler);

  return app;
};
