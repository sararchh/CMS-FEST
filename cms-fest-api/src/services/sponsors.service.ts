import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import sponsorsRepositories from "@/repositories/sponsors.repository";

import { ICadSponsors } from "ts";

async function findAll(): Promise<ICadSponsors[] | []> {
  const sponsors: ICadSponsors[] = await sponsorsRepositories.findAll()
  return sponsors;
}

async function findByUUID(uuid: string): Promise<ICadSponsors | null> {
  const sponsors: ICadSponsors = await sponsorsRepositories.findByUUID(uuid);
  return sponsors;
}

async function create(dataValues: ICadSponsors): Promise<ICadSponsors | {}> {
  try {
    const sponsorsExists = await sponsorsRepositories.findByUUID(
      dataValues.uuid
    );

    if (sponsorsExists) {
      throw registerAlreadyExistsError();
    }

    const sponsors: ICadSponsors = await sponsorsRepositories.create(
      dataValues
    );
    return sponsors;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function update(
  uuid: string,
  dataValues: Partial<ICadSponsors>
): Promise<ICadSponsors | {}> {
  try {
    const sponsorsExists = await sponsorsRepositories.findByUUID(uuid);

    if (!sponsorsExists) {
      throw registerNotExistsError();
    }

    const sponsors: ICadSponsors = await sponsorsRepositories.update(
      sponsorsExists.id,
      dataValues
    );
    return sponsors;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

async function deleteOne(uuid: string): Promise<ICadSponsors | {}> {
  try {
    const sponsorsExists = await sponsorsRepositories.findByUUID(uuid);

    if (!sponsorsExists) {
      throw registerNotExistsError();
    }

    const sponsors = await sponsorsRepositories.deleteOne(sponsorsExists.id);
    return sponsors;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const sponsorsService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default sponsorsService;
