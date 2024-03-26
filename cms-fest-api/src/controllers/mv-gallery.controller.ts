import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

import mvGalleryService from "@/services/mv-gallery.service";
import FileS3UploadService from "@/services/file-s3-upload.service";

import { IMvGallery } from "@/ts";
import { FileUploadError } from "@/errors";

export async function mvGalleryGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      parbusca = null,
      page = "1",
      limit = "20",
      order = "url",
      orderType = "ASC",
    } = req.query;

    const result = await mvGalleryService.findAll(
      parbusca,
      Number(page),
      Number(limit),
      String(order),
      String(orderType)
    );
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvGalleryGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvGalleryService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvGalleryCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await mvGalleryService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvGalleryUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvGalleryService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvGalleryCreateImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    fs.unlinkSync(file.path);

    const obj: IMvGallery = {
      url: upload,
    };
    const result = await mvGalleryService.create(obj);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvGalleryOneURL(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await mvGalleryService.deleteURL(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

