import { Request, Response } from "express";

import { ItemService } from "../../services";

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  setItems = async (_: Request, res: Response): Promise<Response> => {
    const result = await this.itemService.setItems();

    return await res.status(200).json({ result });
  };

  getItems = async (req: Request, res: Response): Promise<Response> => {
    const { limit, offset } = req.query;

    const items = await this.itemService.fetchItems(
      Number(limit),
      Number(offset)
    );

    return await res.status(200).json(items);
  };

  buyItems = async (req: Request, res: Response): Promise<Response> => {
    const purchase = req.body;

    const result = await this.itemService.addPurchase(purchase);

    return await res.status(200).json({ result });
  };
}
