import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import sponsorsService from "@/services/sponsors.service";
import fs from "fs";

import FileS3UploadService from "@/services/file-s3-upload.service";
import { FileUploadError, fileNotFoundError } from "@/errors";
import { ICadSponsors } from "@/ts";

export async function sponsorsGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await sponsorsService.findAll();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function sponsorsGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await sponsorsService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function sponsorsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await sponsorsService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function sponsorsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await sponsorsService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

      return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function sponsorsDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await sponsorsService.deleteOne(uuid);
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
    const sponsor: ICadSponsors | null = await sponsorsService.findByUUID(uuid);
    if (!sponsor) throw fileNotFoundError();

    if (sponsor?.thumb) {
      let nameFile = sponsor?.thumb.split(".com/")[1];
      await FileS3UploadService.deleteFileAwsS3(nameFile);
    }

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    await sponsorsService.update(uuid, { thumb: upload });

    fs.unlinkSync(file.path);

    const updatedSponsor = await sponsorsService.findByUUID(uuid);
    return res.status(httpStatus.CREATED).send(updatedSponsor);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
