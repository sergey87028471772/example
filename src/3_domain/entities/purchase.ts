export type PurchaseItem = {
  id: string;
  count: number;
  suggestedPrice: number;
  quantity: number;
};

export type Purchase = {
  userName: string;
  purchaseItems: PurchaseItem[];
};
