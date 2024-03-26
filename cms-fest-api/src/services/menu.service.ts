import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import FileS3UploadService from "@/services/file-s3-upload.service";

import menuRepositories from "@/repositories/menu.repository";

import { ICadMenu } from "ts";

export async function findAll(): Promise<ICadMenu[] | []> {
  const menus: ICadMenu[] = await menuRepositories.findAll();
  return menus;
}

export async function findByUUID(uuid: string): Promise<ICadMenu | {}> {
  const menu: ICadMenu = await menuRepositories.findByUUID(uuid);
  return menu;
}

export async function create(dataValues: Partial<ICadMenu>): Promise<ICadMenu | {}> {
  try {
    const menuExists = await menuRepositories.findByUUID(dataValues.uuid);

    if (menuExists) {
      throw registerAlreadyExistsError();
    }

    const menu: ICadMenu = await menuRepositories.create(dataValues);
    return menu;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

export async function update(
  uuid: string,
  dataValues: ICadMenu
): Promise<ICadMenu | {}> {
  try {
    const menuExists = await menuRepositories.findByUUID(uuid);

    if (!menuExists) {
      throw registerNotExistsError();
    }

    const menu: ICadMenu = await menuRepositories.update(
      menuExists._id,
      dataValues
    );
    return menu;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOne(uuid: string): Promise<ICadMenu | {}> {
  try {
    const menuExists = await menuRepositories.findByUUID(uuid);

    if (!menuExists) {
      throw registerNotExistsError();
    }

    if (menuExists?.url) {
      const url = menuExists.url;
      let nameFile = url.split(".com/")[1];
      await FileS3UploadService.deleteFileAwsS3(nameFile);
    }

    const menu = await menuRepositories.deleteOne(menuExists._id);

    return menu;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const menuService = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default menuService;
