export type PurchaseItem = {
  marketHashName: string;
  count: number;
  suggestedPrice: number;
  quantity: number;
};

export type Purchase = {
  userName: string;
  purchaseItems: PurchaseItem[];
};
