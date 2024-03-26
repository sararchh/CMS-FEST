import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

import FileS3UploadService from "@/services/file-s3-upload.service";

import newsService from "@/services/news.service";
import { FileUploadError, fileNotFoundError } from "@/errors";
import { ICadNews } from "@/ts";

export async function newsGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const {
      parbusca = null,
      page = "1",
      limit = "0",
      order = "date",
      orderType = "ASC",
    } = req.query;

    const result = await newsService.findAll(
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

export async function newsGetBySlug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { slug } = req.params;

    const result = await newsService.findBySlug(slug);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function newsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await newsService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function newsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await newsService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

      return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function newsDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await newsService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function createThumb(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    const { uuid } = req.params;
    const news: ICadNews | null = await newsService.findByUUID(uuid);
    if (!news) throw fileNotFoundError();

    if (news?.thumb) {
      let nameFile = news?.thumb.split(".com/")[1];
      await FileS3UploadService.deleteFileAwsS3(nameFile);
    }

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    await newsService.update(uuid, { thumb: upload });

    fs.unlinkSync(file.path);

    const updatedNews = await newsService.findByUUID(uuid);
    return res.status(httpStatus.CREATED).send(updatedNews);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}