import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";
import PositionCarouselRepositories from "@/repositories/position-carousel.repository";

import mvCarouselService from "@/services/mv-carousel.service";

import { ICadPositionCarousel } from "ts";

async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<any> {
  const PositionCarousels = await PositionCarouselRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return PositionCarousels;
}

async function findByUUID(uuid: string): Promise<ICadPositionCarousel | {}> {
  const PositionCarousel: ICadPositionCarousel =
    await PositionCarouselRepositories.findByUUID(uuid);
  return PositionCarousel;
}

async function create(
  dataValues: ICadPositionCarousel
): Promise<ICadPositionCarousel | {}> {
  try {
    const PositionCarouselExists = await PositionCarouselRepositories.findAll(
      dataValues.position
    );

    if (PositionCarouselExists.data.length > 0) {
      throw registerAlreadyExistsError();
    }

    const PositionCarousel: ICadPositionCarousel =
      await PositionCarouselRepositories.create(dataValues);
    return PositionCarousel;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function update(
  uuid: string,
  dataValues: ICadPositionCarousel
): Promise<ICadPositionCarousel | {}> {
  try {
    const PositionCarouselExists =
      await PositionCarouselRepositories.findByUUID(uuid);

    if (!PositionCarouselExists) {
      throw registerNotExistsError();
    }

    const PositionCarousel: ICadPositionCarousel =
      await PositionCarouselRepositories.update(
        PositionCarouselExists._id,
        dataValues
      );
    return PositionCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

async function deleteOne(uuid: string): Promise<ICadPositionCarousel | {}> {
  try {
    const PositionCarouselExists =
      await PositionCarouselRepositories.findByUUID(uuid);

    if (!PositionCarouselExists) {
      throw registerNotExistsError();
    }

    const PositionCarousel = await PositionCarouselRepositories.deleteOne(
      PositionCarouselExists._id
    );

    const carousel = await mvCarouselService.findByIdPosition(
      PositionCarouselExists._id
    );

    if (carousel) {
      await mvCarouselService.deleteOne(carousel.uuid);
    }

    return PositionCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const PositionCarouselService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default PositionCarouselService;
