import { Request, Response, NextFunction } from "express";

import debugLib from "debug";

const log = debugLib("backend:server:api");

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";

export const debugLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    log(`${req.method} ${req.url} ${GREEN}duration ${duration}ms${RESET}`);
  });

  next();
};
