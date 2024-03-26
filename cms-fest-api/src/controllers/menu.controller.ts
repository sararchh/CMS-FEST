import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import fs from "fs";

import FileS3UploadService from "@/services/file-s3-upload.service";

import menuService from "@/services/menu.service";
import { ICadMenu } from "@/ts";
import { FileUploadError } from "@/errors";

export async function menuGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await menuService.findAll();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function menuGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await menuService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function menuCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    fs.unlinkSync(file.path);

    const obj: Partial<ICadMenu> = {
      url: upload,
    };
    const result = await menuService.create(obj);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function menuUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await menuService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function menuDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await menuService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
