import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import mvContatoService from "@/services/mv-contato.service";

export async function mvContatoGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      parbusca = null,
      page = "1",
      limit = "10",
      order = "date",
      orderType = "ASC",
    } = req.query;

    const result = await mvContatoService.findAll(
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

export async function mvContatoGetByUUID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvContatoService.findByUUID(uuid);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvContatoCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await mvContatoService.create(req.body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvContatoUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    const result = await mvContatoService.update(uuid, req.body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "registerIsNotActiveError")
      return res.status(httpStatus.NOT_FOUND).send(error);

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function mvContatoDeleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uuid } = req.params;

    await mvContatoService.deleteOne(uuid);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
