import { Request, Response } from "express";

export const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response
): void => {
  console.error(err.stack);

  res.status(500).json({ errorMessage: "Something went wrong!" });
};
