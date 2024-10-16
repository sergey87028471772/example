import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable("purchase_items", (table) => {
    table.integer("count").notNullable().defaultTo(0);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable("purchase_items", (table) => {
    table.dropColumn("count");
  });
};
