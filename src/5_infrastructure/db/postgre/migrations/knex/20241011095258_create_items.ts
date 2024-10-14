import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("items", (table) => {
    table.string("market_hash_name").primary();
    table.string("currency").notNullable();
    table.float("suggested_price").nullable();
    table.string("item_page").notNullable();
    table.string("market_page").notNullable();
    table.float("min_price").nullable();
    table.float("max_price").nullable();
    table.float("mean_price").nullable();
    table.float("median_price").nullable();
    table.integer("quantity").notNullable().defaultTo(0);
    table.bigInteger("created_at").notNullable();
    table.bigInteger("updated_at").notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists("items");
};
