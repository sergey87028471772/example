import { Knex } from "knex";

import { knex, errorHandler } from "./client";

export class KnexRepository {
  private tableName: string;

  public static readonly client: Knex = knex;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getRows(limit: number, offset: number) {
    return await errorHandler(
      knex(this.tableName)
        .select()
        .orderBy("market_hash_name")
        .limit(limit)
        .offset(offset)
    );
  }

  async insertMany<T>(items: T[], batchSize: number = 1000) {
    const batches: T[][] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    await errorHandler(
      knex.transaction(async (trx) => {
        for (const batch of batches) {
          await trx(this.tableName)
            .insert(batch)
            .onConflict("market_hash_name")
            .merge();
        }
      })
    );
  }

  async findUser(userName: string) {
    return await errorHandler(
      knex(this.tableName).where({ user_name: userName }).first()
    );
  }

  async createUser(userName: string) {
    return await errorHandler(
      knex(this.tableName)
        .insert({ user_name: userName, balance: 1000 })
        .returning(["id", "balance"])
    );
  }

  async findItem(itemId: string) {
    return await errorHandler(
      knex(this.tableName).where({ id: itemId }).first()
    );
  }

  async createPurchase(userId: string, trx: Knex.Transaction) {
    return await trx(this.tableName)
      .insert({ user_id: userId })
      .returning("id");
  }

  async addPurchaseItem(
    purchaseId: string,
    itemId: string,
    count: number,
    trx: Knex.Transaction
  ) {
    await trx(this.tableName).insert({
      purchase_id: purchaseId,
      item_id: itemId,
      count,
    });
  }

  async updateItemQuantity(
    itemId: string,
    quantity: number,
    trx: Knex.Transaction
  ) {
    return await trx(this.tableName).where({ id: itemId }).update({ quantity });
  }

  async updateUserBalance(
    userId: string,
    balance: number,
    trx: Knex.Transaction
  ) {
    return await trx(this.tableName).where({ id: userId }).update({ balance });
  }
}
