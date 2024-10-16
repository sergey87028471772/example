import { PurchaseItem } from "~3_domain";

export const isWrongCount = (purchaseItems: PurchaseItem[]): boolean => {
  for (const item of purchaseItems) {
    if (item.count > item.quantity) {
      return true;
    }
  }

  return false;
};
