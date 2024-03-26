import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerIdPositionAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import FileS3UploadService from "@/services/file-s3-upload.service";
import mvCarouselRepositories from "@/repositories/mv-carousel.repository";

import { IMvCarousels } from "ts";

export async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<any> {
  const mvCarousels = await mvCarouselRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return mvCarousels;
}

export async function findByUUID(uuid: string): Promise<IMvCarousels | {}> {
  const mvCarousel: IMvCarousels = await mvCarouselRepositories.findByUUID(
    uuid
  );
  return mvCarousel;
}

export async function findByIdPosition(id_position: string): Promise<IMvCarousels | any> {
  const mvCarousel: IMvCarousels = await mvCarouselRepositories.findByIdPosition(
    id_position
  );
  return mvCarousel;
}

export async function create(
  dataValues: IMvCarousels
): Promise<IMvCarousels | {}> {
  try {
    const mvCarouselExists = await mvCarouselRepositories.findByIdPosition(
      dataValues.id_position as string
    );

    if (mvCarouselExists) {
      throw registerIdPositionAlreadyExistsError();
    }
    

    const mvCarousel: IMvCarousels = await mvCarouselRepositories.create(
      dataValues
    );
    return mvCarousel;
  } catch (error) {
    if(error.name === "registerAlreadyExistsError") throw registerIdPositionAlreadyExistsError();
    throw UnableToCreateRegister();
  }
}

export async function update(
  uuid: string,
  dataValues: IMvCarousels
): Promise<IMvCarousels | {}> {
  try {
    const mvCarouselExists = await mvCarouselRepositories.findByUUID(uuid);

    if (!mvCarouselExists) {
      throw registerNotExistsError();
    }

    const mvCarousel: IMvCarousels = await mvCarouselRepositories.update(
      mvCarouselExists._id,
      dataValues
    );
    return mvCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOne(uuid: string): Promise<IMvCarousels | {}> {
  try {
    const mvCarouselExists = await mvCarouselRepositories.findByUUID(uuid);

    if (!mvCarouselExists) {
      throw registerNotExistsError();
    }

    if (mvCarouselExists?.url) {
      for (const url of mvCarouselExists?.url) {
        if (!url) continue;
        let nameFile = url.split(".com/")[1];
        await FileS3UploadService.deleteFileAwsS3(nameFile);
      }
    }

    const mvCarousel = await mvCarouselRepositories.deleteOne(
      mvCarouselExists._id
    );
    return mvCarousel;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOneURL(
  uuid: string,
  url: string
): Promise<boolean> {
  try {
    const mvCarouselExists = await mvCarouselRepositories.findByUUID(uuid);

    if (!mvCarouselExists) {
      throw registerNotExistsError();
    }

    if (!mvCarouselExists?.url.includes(url)) {
      throw registerNotExistsError();
    }

    let nameFile = url.split(".com/")[1];
    await FileS3UploadService.deleteFileAwsS3(nameFile);

    await mvCarouselRepositories.deleteURLFromCarousel(
      mvCarouselExists._id,
      url
    );

    return true;
  } catch (error) {
    throw registerNotExistsError();
  }
}

const mvCarouselService = {
  findByUUID,
  findByIdPosition,
  findAll,
  create,
  update,
  deleteOne,
  deleteOneURL,
};

export default mvCarouselService;
