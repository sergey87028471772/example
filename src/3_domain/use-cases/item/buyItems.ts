import { snakeToCamel } from "~4_lib";

import { KnexRepository } from "~5_infrastructure";

import { Item, PurchaseItem } from "../../entities";

import { isLowBalance, isWrongCount } from "./lib";

export const buyItems = async (
  userId: string,
  userBalance: number,
  purchaseItems: PurchaseItem[]
): Promise<string> => {
  const itemsRepository = new KnexRepository("items");
  const userRepository = new KnexRepository("users");
  const purchasesRepository = new KnexRepository("purchases");
  const purchaseItemsRepository = new KnexRepository("purchase_items");

  for (const purchaseItem of purchaseItems) {
    const item = snakeToCamel(
      await itemsRepository.findItem(purchaseItem.marketHashName)
    ) as Item;

    purchaseItem.suggestedPrice = item.suggestedPrice;
    purchaseItem.quantity = item.quantity;
  }

  const totalPrice: number = purchaseItems.reduce(
    (sum: number, el: PurchaseItem) => {
      return (sum += el.count * (el.suggestedPrice ?? 0));
    },
    0
  );

  if (isLowBalance(totalPrice, userBalance)) {
    return "Не хватает средств на балансе";
  }

  if (isWrongCount(purchaseItems)) {
    return "Не хватает товара";
  }

  await KnexRepository.client.transaction(async (trx) => {
    const purchase = await purchasesRepository.createPurchase(userId, trx);

    for (const purchaseItem of purchaseItems) {
      const { marketHashName } = purchaseItem;

      await purchaseItemsRepository.addPurchaseItem(
        purchase.id,
        marketHashName,
        trx
      );

      const newQuantity = (purchaseItem.quantity ?? 0) - purchaseItem.count;

      await itemsRepository.updateItemQuantity(
        marketHashName,
        newQuantity,
        trx
      );

      const newBalance = userBalance - totalPrice;

      await userRepository.updateUserBalance(userId, newBalance, trx);
    }
  });

  return "Покупка зарегистрирована";
};
