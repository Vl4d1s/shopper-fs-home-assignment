import { Router } from "express";

export const metricsRouter: Router = Router();

metricsRouter.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default metricsRouter;
