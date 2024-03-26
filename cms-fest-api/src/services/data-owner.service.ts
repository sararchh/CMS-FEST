import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";
import dataOwnerRepositories from "@/repositories/data-owner.repository";

import { ICadDataOwner } from "ts";

export type DataOwnerInParams = Pick<ICadDataOwner, "email">;

export async function findAll(): Promise<ICadDataOwner[] | []> {
  const dataOwner: ICadDataOwner[] = await dataOwnerRepositories.findAll();
  return dataOwner;
}

export async function findBySlug(slug: string): Promise<ICadDataOwner | {}> {
  const dataOwner: ICadDataOwner = await dataOwnerRepositories.findBySlug(slug);
  return dataOwner;
}

export async function findById(id: string): Promise<ICadDataOwner | {}> {
  const dataOwner: ICadDataOwner = await dataOwnerRepositories.findById(id);
  return dataOwner;
}

export async function findByEmail(email: string): Promise<ICadDataOwner> {
  const dataOwner: ICadDataOwner = await dataOwnerRepositories.findByEmail(
    email
  );
  return dataOwner;
}

export async function create(
  dataValues: ICadDataOwner
): Promise<ICadDataOwner | {}> {
  try {
    const dataOwnerExists =
      (await dataOwnerRepositories.findByEmail(dataValues.email)) ||
      (await dataOwnerRepositories.findBySlug(dataValues.slug));

    if (dataOwnerExists) {
      throw registerAlreadyExistsError();
    }

    const dataOwner: ICadDataOwner = await dataOwnerRepositories.create(
      dataValues
    );
    return dataOwner;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

export async function update(
  _id: string,
  dataValues: Partial<ICadDataOwner> | any
): Promise<ICadDataOwner | {}> {
  try {
    const dataOwnerExists = await dataOwnerRepositories.findById(_id);

    if (!dataOwnerExists) {
      throw registerNotExistsError();
    }

    const dataOwner: ICadDataOwner = await dataOwnerRepositories.update(
      _id,
      dataValues
    );
    return dataOwner;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const dataOwnerService = {
  findBySlug,
  findByEmail,
  findById,
  findAll,
  create,
  update,
};

export default dataOwnerService;
