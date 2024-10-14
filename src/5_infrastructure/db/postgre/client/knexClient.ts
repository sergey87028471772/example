import knex from "knex";
import * as pgTypes from "pg-types";

import { knexConfig } from "../config";

// Return columns with DATE type as regular strings.
pgTypes.setTypeParser(1082, (value: string) => value);

export default knex(knexConfig);
