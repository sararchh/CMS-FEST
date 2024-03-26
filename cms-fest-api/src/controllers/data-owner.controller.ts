import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import fs from "fs";

import dataOwnerService from "@/services/data-owner.service";
import FileS3UploadService from "@/services/file-s3-upload.service";

import { FileUploadError, fileNotFoundError } from "@/errors";

export async function dataOwnerGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [result] = await dataOwnerService.findAll();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function dataOwnerGetBySlug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { slug } = req.params;

    const result = await dataOwnerService.findBySlug(slug);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function dataOwnerCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await dataOwnerService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function dataOwnerUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const result = await dataOwnerService.update(id, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function dataOwnerUpdateLogo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    const { id } = req.params;
    const hasDataOwner: any = await dataOwnerService.findById(id);
    if (!hasDataOwner) throw fileNotFoundError();

    if (hasDataOwner?.logo) {
      let nameFile = hasDataOwner?.logo.split(".com/")[1];
      await FileS3UploadService.deleteFileAwsS3(nameFile);
    }

    const upload = await FileS3UploadService.uploadBanner(file);

    if (!upload) throw FileUploadError();

    await dataOwnerService.update(id, { logo: upload });

    fs.unlinkSync(file.path);

    const updatedDataOwner = await dataOwnerService.findById(id);
    return res.status(httpStatus.CREATED).send(updatedDataOwner);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
