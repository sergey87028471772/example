import { Knex } from "knex";

import path from "path";

const PG_DB_HOST = process.env.PG_DB_HOST || "localhost";
const PG_DB_PORT = parseInt(process.env.DB_PORT || "45432");
const PG_DB_NAME = process.env.PG_DB_NAME || "example-db";
const PG_DB_USER = process.env.PG_DB_USER || "admin";
const PG_DB_PASSWORD = process.env.PG_DB_PASSWORD || "admin";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: PG_DB_HOST,
    port: PG_DB_PORT,
    database: PG_DB_NAME,
    user: PG_DB_USER,
    password: PG_DB_PASSWORD,
  },
  pool: {
    async afterCreate(conn: any, done: (err: Error | null, conn: any) => void) {
      try {
        await conn.query("CREATE SCHEMA IF NOT EXISTS knex");

        done(null, conn);
      } catch (e) {
        done(e as Error, conn);
      }
    },
  },
  migrations: {
    schemaName: "knex",
    directory: path.join(__dirname, "../migrations/knex"),
    extension: "ts",
  },
};

export default knexConfig;
