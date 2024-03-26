import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import positionCarouselService from "@/services/position-carousel.service";

export async function PositionCarouselGetAll(
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

    const result = await positionCarouselService.findAll(
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

export async function PositionCarouselGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await positionCarouselService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function PositionCarouselDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await positionCarouselService.deleteOne(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function PositionCarouselCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await positionCarouselService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function PositionCarouselUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await positionCarouselService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function positionCarouselDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await positionCarouselService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
