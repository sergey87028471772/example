export const isWrongCount = <T extends { quantity?: number; count: number }>(
  purchaseItems: T[]
): boolean => {
  for (const item of purchaseItems) {
    if (item.count > (item.quantity ?? 0)) {
      return true;
    }
  }

  return false;
};
