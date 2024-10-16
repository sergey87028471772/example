import { KnexRepository } from "~5_infrastructure";

import { User } from "../../entities";

export const addUser = async (userName: string): Promise<User> => {
  const userRepository = new KnexRepository("users");

  const user = await userRepository.findUser(userName);

  if (!user) {
    const newUser = await userRepository.createUser(userName);

    return newUser[0];
  }

  return user;
};
