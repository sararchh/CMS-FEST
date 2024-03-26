import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import fs from "fs";

import mvCarouselService from "@/services/mv-carousel.service";
import FileS3UploadService from "@/services/file-s3-upload.service";

import { FileUploadError } from "@/errors";
import { IMvCarousels } from "@/ts";

export async function mvCarouselGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      parbusca = null,
      page = "1",
      limit = "20",
      order = "position",
      orderType = "ASC",
    } = req.query;

    const result = await mvCarouselService.findAll(
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

export async function mvCarouselGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvCarouselService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvCarouselCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await mvCarouselService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvCarouselCreateBanner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;
    const { uuid } = req.params;
    const { id_position } = req.body as unknown as IMvCarousels;

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    fs.unlinkSync(file.path);

    const obj: IMvCarousels = {
      uuid,
      id_position,
      url: [upload],
    };
    const result = await mvCarouselService.update(uuid, obj);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvCarouselUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvCarouselService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvCarouselDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await mvCarouselService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvCarouselOneURL(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;
    const { url } = req.body;

    await mvCarouselService.deleteOneURL(uuid, url);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
