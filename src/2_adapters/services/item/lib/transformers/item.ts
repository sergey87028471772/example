import { Item, PurchaseItem } from "~3_domain";

import { snakeToCamel } from "~4_lib";

import { KnexRepository } from "~5_infrastructure";

export const enrichItem = async (
  purchaseItems: PurchaseItem[],
  itemsRepository: KnexRepository
): Promise<boolean> => {
  for (const purchaseItem of purchaseItems) {
    const item = await itemsRepository.findItem(purchaseItem.marketHashName);

    if (!item) {
      return false;
    }

    const snakedItem = snakeToCamel(item) as Item;

    purchaseItem.suggestedPrice = snakedItem.suggestedPrice;
    purchaseItem.quantity = snakedItem.quantity;
  }

  return true;
};
