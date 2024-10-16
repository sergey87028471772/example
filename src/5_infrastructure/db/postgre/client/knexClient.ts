import knex from "knex";
import * as pgTypes from "pg-types";

import { knexConfig } from "../config";

// Return columns with DATE type as regular strings.
pgTypes.setTypeParser(1082, (value: string) => value);

export const errorHandler = async (query: Promise<any>): Promise<any> => {
  try {
    return await query;
  } catch (error) {
    console.error("DB Error:", error);

    return null;
  }
};

export default knex(knexConfig);
