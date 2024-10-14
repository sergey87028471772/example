import {
  KnexRepository,
  RedisRepository,
  getSkinportData,
} from "~5_infrastructure";

import { Item } from "../../entities";

export const setItems = async (): Promise<string> => {
  const itemsRepository = new KnexRepository("items");

  const redisRepository = new RedisRepository();

  const items = await getSkinportData();

  await itemsRepository.insertMany<Item>(items);

  await redisRepository.flushAll();

  return "done";
};
