import userRepository from "@/repositories/user.repository";

import { ICadDataOwner, ICadUser } from "ts";

import { GetUserOrFailResult } from "./auth.service";

import {
  NotFoundUserRequestError,
  listUserRequestError,
  uploadUserError,
} from "@/errors";

export type DataOwnerInParams = Pick<ICadDataOwner, "email">;

async function findById(id: string): Promise<GetUserOrFailResult | any> {
  const user: any = await userRepository.findOneWithRelations(id);
  if (!user && !Boolean(user.length)) throw NotFoundUserRequestError();
  return user;
}

export async function findAllUsers(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string,
  isAdmin: boolean
): Promise<any> {
  const listUsers = await userRepository.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType,
    isAdmin
  );

  return listUsers;
}

async function updateUser(
  id: string,
  dataValues: ICadUser | any
): Promise<Boolean> {
  let userUpdated = await userRepository.updateUser(id, dataValues);
  if (!Boolean(userUpdated.email)) throw uploadUserError();

  return true;
}

const userService = {
  findById,
  findAllUsers,
  updateUser,
};
export default userService;
