import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable("items", (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
  });

  await knex("items").update({ id: knex.raw("gen_random_uuid()") });

  await knex.schema.alterTable("purchase_items", (table) => {
    table.uuid("item_id");
  });

  await knex.raw(`
    UPDATE purchase_items
    SET item_id = items.id
    FROM items
    WHERE purchase_items.item_market_hash_name = items.market_hash_name;
  `);

  await knex.schema.alterTable("purchase_items", (table) => {
    table.dropPrimary();
    table.dropForeign("item_market_hash_name");
    table.dropColumn("item_market_hash_name");
  });

  await knex.schema.alterTable("items", (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable("items", (table) => {
    table.string("market_hash_name").notNullable().alter();
    table.primary(["id"]);
  });

  await knex.schema.alterTable("purchase_items", (table) => {
    table
      .foreign("item_id")
      .references("id")
      .inTable("items")
      .onDelete("CASCADE");
    table.primary(["purchase_id", "item_id"]);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable("purchase_items", (table) => {
    table.string("item_market_hash_name");
  });

  await knex.raw(`
    UPDATE purchase_items
    SET item_market_hash_name = items.market_hash_name
    FROM items
    WHERE purchase_items.item_id = items.id
  `);

  await knex.schema.alterTable("purchase_items", (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable("purchase_items", (table) => {
    table.string("item_market_hash_name").notNullable().alter();
    table.primary(["purchase_id", "item_market_hash_name"]);
  });

  await knex.schema.alterTable("purchase_items", (table) => {
    table.dropColumn("item_id");
  });

  await knex.schema.alterTable("items", (table) => {
    table.dropPrimary();
  });

  await knex.schema.alterTable("items", (table) => {
    table.dropColumn("id");
    table.primary(["market_hash_name"]);
  });

  await knex.schema.alterTable("purchase_items", (table) => {
    table
      .foreign("item_market_hash_name")
      .references("market_hash_name")
      .inTable("items")
      .onDelete("CASCADE");
  });
};
