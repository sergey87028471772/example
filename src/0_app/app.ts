import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { itemRoutes } from "~1_endpoints";
import { debugLogger, globalErrorHandler } from "~2_adapters";

import { swaggerOptions } from "./config";

const app = express();

app.use(debugLogger);

app.use(express.json({ limit: "100mb" }));

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/items", itemRoutes);

app.use(globalErrorHandler);

export default app;
