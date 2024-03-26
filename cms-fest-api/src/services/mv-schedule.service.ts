import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import mvScheduleRepositories from "@/repositories/mv-schedule.repository";

import { IMvSchedule } from "ts";

async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<any> {
  const mvSchedule = await mvScheduleRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return mvSchedule;
}

async function findByUUID(uuid: string): Promise<IMvSchedule | {}> {
  const mvCarousel: IMvSchedule = await mvScheduleRepositories.findByUUID(uuid);
  return mvCarousel;
}

async function create(dataValues: IMvSchedule): Promise<IMvSchedule | {}> {
  try {
    const mvCarouselExists = await mvScheduleRepositories.findByUUID(
      dataValues.uuid
    );

    if (mvCarouselExists) {
      throw registerAlreadyExistsError();
    }

    const mvCarousel: IMvSchedule = await mvScheduleRepositories.create(
      dataValues
    );
    return mvCarousel;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function update(
  uuid: string,
  dataValues: IMvSchedule
): Promise<IMvSchedule | {}> {
  try {
    const mvCarouselExists = await mvScheduleRepositories.findByUUID(uuid);

    if (!mvCarouselExists) {
      throw registerNotExistsError();
    }

    const mvCarousel: IMvSchedule = await mvScheduleRepositories.update(
      mvCarouselExists._id,
      dataValues
    );
    return mvCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

async function deleteOne(uuid: string): Promise<IMvSchedule | {}> {
  try {
    const mvCarouselExists = await mvScheduleRepositories.findByUUID(uuid);

    if (!mvCarouselExists) {
      throw registerNotExistsError();
    }

    const mvCarousel = await mvScheduleRepositories.deleteOne(
      mvCarouselExists._id
    );
    return mvCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const mvScheduleService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default mvScheduleService;
