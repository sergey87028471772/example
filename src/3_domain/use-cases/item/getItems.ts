import { RedisRepository, KnexRepository } from "~5_infrastructure";

import { Item } from "../../entities";

export const getItems = async (
  limit: number = 0,
  offset: number = 10
): Promise<Item[]> => {
  const itemsRepository = new KnexRepository("items");

  const redisRepository = new RedisRepository();

  const key = `items-${limit}-${offset}`;

  const cachedItems = await redisRepository.get(key);

  if (cachedItems) {
    return cachedItems;
  }

  const result = await itemsRepository.getRows(limit, offset);

  await redisRepository.set(key, result, 3600);

  return result;
};
