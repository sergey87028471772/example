import { Request, Response } from "express";

export const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: Function
): void => {
  console.error("GLOBAL ERROR HANDLER", err.stack);

  res.status(500).json({ errorMessage: "Something went wrong!" });
};
