import {
  Item,
  Purchase,
  getItems,
  buyItems,
  setItems,
  addUser,
} from "~3_domain";

import { snakeToCamel } from "~4_lib";

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

    const { id: userId, balance: userBalance } = await addUser(userName);

    return await buyItems(userId, userBalance, purchaseItems);
  };
}
