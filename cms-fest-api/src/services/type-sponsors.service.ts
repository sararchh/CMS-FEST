import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";
import typeSponsorsRepositories from "@/repositories/types-sponsors.repository";

import { ICadTypeSponsors } from "ts";

async function findAll(): Promise<ICadTypeSponsors[] | []> {
  const typeSponsors: ICadTypeSponsors[] =
    await typeSponsorsRepositories.findAll();
  return typeSponsors;
}

async function findByUUID(uuid: string): Promise<ICadTypeSponsors | {}> {
  const TypeSponsors: ICadTypeSponsors =
    await typeSponsorsRepositories.findByUUID(uuid);
  return TypeSponsors;
}

async function create(
  dataValues: ICadTypeSponsors
): Promise<ICadTypeSponsors | {}> {
  try {
    const typeSponsorsExists = await typeSponsorsRepositories.findByUUID(
      dataValues.uuid
    );

    if (typeSponsorsExists) {
      throw registerAlreadyExistsError();
    }

    const typeSponsors: ICadTypeSponsors =
      await typeSponsorsRepositories.create(dataValues);
    return typeSponsors;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function update(
  uuid: string,
  dataValues: ICadTypeSponsors
): Promise<ICadTypeSponsors | {}> {
  try {
    const typeSponsorsExists = await typeSponsorsRepositories.findByUUID(uuid);

    if (!typeSponsorsExists) {
      throw registerNotExistsError();
    }

    const typeSponsors: ICadTypeSponsors =
      await typeSponsorsRepositories.update(typeSponsorsExists._id, dataValues);
    return typeSponsors;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

async function deleteOne(uuid: string): Promise<ICadTypeSponsors | {}> {
  try {
    const typeSponsorsExists = await typeSponsorsRepositories.findByUUID(uuid);

    if (!typeSponsorsExists) {
      throw registerNotExistsError();
    }

    const typeSponsors = await typeSponsorsRepositories.deleteOne(
      typeSponsorsExists._id
    );
    return typeSponsors;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const typeSponsorsService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne
};

export default typeSponsorsService;
