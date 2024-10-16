import { PurchaseItem } from "~3_domain";

export const getTotalPrice = (purchaseItems: PurchaseItem[]): number => {
  return purchaseItems.reduce((sum: number, el: PurchaseItem) => {
    return (sum += el.count * el.suggestedPrice);
  }, 0);
};
