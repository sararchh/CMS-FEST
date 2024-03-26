import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import typeSponsorsService from "@/services/type-sponsors.service";

export async function typeSponsorsGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await typeSponsorsService.findAll();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function typeSponsorsGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await typeSponsorsService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function typeSponsorsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await typeSponsorsService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function typeSponsorsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await typeSponsorsService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

      return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function typeSponsorsDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await typeSponsorsService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}