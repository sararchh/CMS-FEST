import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import mvScheduleService from "@/services/mv-schedule.service";

export async function mvScheduleGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      parbusca = null,
      page = "1",
      limit = "20",
      order = "day",
      orderType = "ASC",
    } = req.query;

    const result = await mvScheduleService.findAll(
      parbusca,
      Number(page),
      Number(limit),
      String(order),
      String(orderType),
    );
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvScheduleGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvScheduleService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvScheduleCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await mvScheduleService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvScheduleUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvScheduleService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

      return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvScheduleDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await mvScheduleService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}