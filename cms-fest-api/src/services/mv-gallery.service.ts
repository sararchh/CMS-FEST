import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import mvGalleryRepositories from "@/repositories/mv-gallery.repository";
import FileS3UploadService from "@/services/file-s3-upload.service";

import { IGalleryprops, IMvGallery } from "ts";

export async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<IGalleryprops[] | []> {
  const mvGallerys: IGalleryprops[] | any = await mvGalleryRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return mvGallerys;
}

export async function findByUUID(uuid: string): Promise<IMvGallery | {}> {
  const mvGallery: IMvGallery = await mvGalleryRepositories.findByUUID(uuid);
  return mvGallery;
}

export async function create(dataValues: IMvGallery): Promise<IMvGallery | {}> {
  try {
    const mvGalleryExists = await mvGalleryRepositories.findByUUID(
      dataValues.uuid
    );

    if (mvGalleryExists) {
      throw registerAlreadyExistsError();
    }

    const mvGallery: IMvGallery = await mvGalleryRepositories.create(
      dataValues
    );
    return mvGallery;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

export async function update(
  uuid: string,
  dataValues: IMvGallery
): Promise<IMvGallery | {}> {
  try {
    const mvGalleryExists = await mvGalleryRepositories.findByUUID(uuid);

    if (!mvGalleryExists) {
      throw registerNotExistsError();
    }

    const mvGallery: IMvGallery = await mvGalleryRepositories.update(
      mvGalleryExists._id,
      dataValues
    );
    return mvGallery;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteURL(
  uuid: string
): Promise<boolean> {
  try {
    const galleryExists = await mvGalleryRepositories.findByUUID(uuid);

    if (!galleryExists) {
      throw registerNotExistsError();
    }

    let nameFile = galleryExists.url.split(".com/")[1];
    await FileS3UploadService.deleteFileAwsS3(nameFile);

    await mvGalleryRepositories.deleteOne(galleryExists._id);

    return true;
  } catch (error) {
    console.log("🚀 ~ error:", error)
    throw registerNotExistsError();
  }
}

const mvGalleryService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteURL,
};

export default mvGalleryService;
