import { KnexRepository } from "~5_infrastructure";

import { PurchaseItem } from "../../entities";

export const buyItems = async (
  userId: string,
  userBalance: number,
  totalPrice: number,
  purchaseItems: PurchaseItem[]
): Promise<string> => {
  const itemsRepository = new KnexRepository("items");
  const userRepository = new KnexRepository("users");
  const purchasesRepository = new KnexRepository("purchases");
  const purchaseItemsRepository = new KnexRepository("purchase_items");

  const result = await KnexRepository.client
    .transaction(async (trx) => {
      const purchase = await purchasesRepository.createPurchase(userId, trx);

      for (const purchaseItem of purchaseItems) {
        const { id: itemId } = purchaseItem;

        await purchaseItemsRepository.addPurchaseItem(
          purchase[0].id,
          itemId,
          trx
        );

        const newQuantity = purchaseItem.quantity - purchaseItem.count;

        await itemsRepository.updateItemQuantity(itemId, newQuantity, trx);

        const newBalance = userBalance - totalPrice;

        await userRepository.updateUserBalance(userId, newBalance, trx);
      }

      return "Покупка зарегистрирована";
    })
    .catch((err) => {
      console.error(err);

      return "Ошибка при регистрации покупки";
    });

  return result;
};
