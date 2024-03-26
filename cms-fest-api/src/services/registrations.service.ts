import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import registrationsRepositories from "@/repositories/registrations.repository";

import { IRegistration } from "ts";

export async function findAll(): Promise<IRegistration[] | []> {
  const registrations: IRegistration[] = await registrationsRepositories.findAll()
  return registrations;
}

export async function findById(_id: string): Promise<IRegistration | {}> {
  const registrations: IRegistration = await registrationsRepositories.findById(_id);
  return registrations;
}

export async function create(dataValues: IRegistration): Promise<IRegistration | {}> {
  try {
    const registrationsExists = await registrationsRepositories.findById(dataValues._id);

    if (registrationsExists) {
      throw registerAlreadyExistsError();
    }

    const registrations: IRegistration = await registrationsRepositories.create(dataValues);
    return registrations;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

export async function update(
  _id: string,
  dataValues: IRegistration
): Promise<IRegistration | {}> {
  try {
    const registrationsExists = await registrationsRepositories.findById(_id);

    if (!registrationsExists) {
      throw registerNotExistsError();
    }

    const registrations: IRegistration = await registrationsRepositories.update(
      registrationsExists._id,
      dataValues
    );
    return registrations;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOne(
  _id: string,
): Promise<IRegistration | {}> {
  try {
    const registrationsExists = await registrationsRepositories.findById(_id);

    if (!registrationsExists) {
      throw registerNotExistsError();
    }

    const registrations = await registrationsRepositories.deleteOne(
      registrationsExists._id,
    );
    return registrations;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const registrationservice = {
  findById,
  findAll,
  create,
  update,
  deleteOne
};

export default registrationservice;
