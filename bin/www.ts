#!/usr/bin/env node
import "module-alias/register";

import http from "http";
import debugLib from "debug";

import { AddressInfo } from "net";

import { app } from "../src/0_app";

const debug = debugLib("backend:server");

const port = normalizePort(process.env.PORT || "3001");

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.setTimeout(1000 * 60 * 30);

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(value: string): number | false {
  const port = Number(value);

  if (Number.isInteger(port) && port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = "Port " + port;

  switch (error.code) {
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = `port ${addr?.port}`;

  debug(`Listening on ${bind}`);
}
