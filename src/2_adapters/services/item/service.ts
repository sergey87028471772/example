import {
  Item,
  Purchase,
  getItems,
  buyItems,
  setItems,
  addUser,
} from "~3_domain";

import { snakeToCamel } from "~4_lib";

import { KnexRepository } from "~5_infrastructure";

import { isLowBalance, isWrongCount } from "./lib";

export class ItemService {
  setItems = async (): Promise<string> => {
    return await setItems();
  };

  fetchItems = async (limit: number, offset: number): Promise<Item[]> => {
    const items = await getItems(limit, offset);

    return items.map((el: Item) => snakeToCamel(el) as Item);
  };

  addPurchase = async (purchase: Purchase): Promise<string> => {
    const { userName, purchaseItems } = purchase;

    const itemsRepository = new KnexRepository("items");

    const { id: userId, balance: userBalance } = await addUser(userName);

    let totalPrice = 0;

    for (const purchaseItem of purchaseItems) {
      const item = snakeToCamel(
        await itemsRepository.findItem(purchaseItem.marketHashName)
      ) as Item;

      purchaseItem.suggestedPrice = item.suggestedPrice;
      purchaseItem.quantity = item.quantity;

      totalPrice += purchaseItem.count * (purchaseItem.suggestedPrice ?? 0);
    }

    if (isLowBalance(totalPrice, userBalance)) {
      return "Не хватает средств на балансе";
    }

    if (isWrongCount(purchaseItems)) {
      return "Не хватает товара";
    }

    return await buyItems(userId, userBalance, totalPrice, purchaseItems);
  };
}
