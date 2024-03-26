import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import registrationsService from "@/services/registrations.service";

export async function registrationGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await registrationsService.findAll();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function registrationGetById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const result = await registrationsService.findById(id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function registrationCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await registrationsService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function registrationUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const result = await registrationsService.update(id, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function registrationDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await registrationsService.deleteOne(id);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
