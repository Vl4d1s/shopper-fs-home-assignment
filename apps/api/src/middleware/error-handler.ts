import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  res.status(404).json({ error: "Not Found" });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  console.error(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};
