import { KnexRepository } from "~5_infrastructure";

import { User } from "../../entities";

export const addUser = async (userName: string): Promise<User> => {
  const userRepository = new KnexRepository("users");

  const user = await userRepository.findUser(userName);

  if (!user) {
    return await userRepository.createUser(userName);
  }

  return user;
};
