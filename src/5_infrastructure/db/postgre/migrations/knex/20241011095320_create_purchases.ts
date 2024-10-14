import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("purchases", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("user_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("purchase_items", (table) => {
    table.uuid("purchase_id").notNullable();
    table.string("item_market_hash_name").notNullable();

    table
      .foreign("purchase_id")
      .references("id")
      .inTable("purchases")
      .onDelete("CASCADE");
    table
      .foreign("item_market_hash_name")
      .references("market_hash_name")
      .inTable("items")
      .onDelete("CASCADE");

    table.primary(["purchase_id", "item_market_hash_name"]);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists("purchase_items");
  await knex.schema.dropTableIfExists("purchases");
};
