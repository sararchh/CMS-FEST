import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import inLiveRepositories from "@/repositories/in-live.repository";

import { ICadInLive } from "ts";

export async function findAll(): Promise<ICadInLive[] | []> {
  const inLives: ICadInLive[] = await inLiveRepositories.findAll()
  return inLives;
}

export async function findByUUID(uuid: string): Promise<ICadInLive | {}> {
  const inLive: ICadInLive = await inLiveRepositories.findByUUID(uuid);
  return inLive;
}

export async function create(dataValues: ICadInLive): Promise<ICadInLive | {}> {
  try {
    const inLiveExists = await inLiveRepositories.findByUUID(dataValues.uuid);

    if (inLiveExists) {
      throw registerAlreadyExistsError();
    }

    const inLive: ICadInLive = await inLiveRepositories.create(dataValues);
    return inLive;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

export async function update(
  uuid: string,
  dataValues: ICadInLive
): Promise<ICadInLive | {}> {
  try {
    const inLiveExists = await inLiveRepositories.findByUUID(uuid);

    if (!inLiveExists) {
      throw registerNotExistsError();
    }

    const inLive: ICadInLive = await inLiveRepositories.update(
      inLiveExists._id,
      dataValues
    );
    return inLive;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOne(
  uuid: string,
): Promise<ICadInLive | {}> {
  try {
    const inLiveExists = await inLiveRepositories.findByUUID(uuid);

    if (!inLiveExists) {
      throw registerNotExistsError();
    }

    const inLive = await inLiveRepositories.deleteOne(
      inLiveExists._id,
    );
    return inLive;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const inLiveService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne
};

export default inLiveService;
