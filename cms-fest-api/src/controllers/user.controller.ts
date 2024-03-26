import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import userService from "@/services/user.service";
import {
  NotFoundUserRequestError,
  deleteUserError,
  listUserRequestError,
  uploadUserError,
} from "@/errors";

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      parbusca = null,
      page = "1",
      limit = "20",
      order = "name",
      orderType = "ASC",
      isAdmin = "0",
    } = req.query;

    const result = await userService.findAllUsers(
      parbusca,
      Number(page),
      Number(limit),
      String(order),
      String(orderType),
      Boolean(isAdmin == "1")
    );
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error?.name == "listUserRequestError")
      return res.status(httpStatus.BAD_REQUEST).send(listUserRequestError());
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const user = await userService.findById(id);
    if (!user) throw NotFoundUserRequestError();

    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(NotFoundUserRequestError());
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await userService.updateUser(id, req.body);
    const updatedUser = await userService.findById(id);

    return res.status(httpStatus.OK).send(updatedUser);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(uploadUserError());
  }
}

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const dataToUpdate = {
      status: 2,
      deleted_at: new Date(),
    };

    await userService.updateUser(id, dataToUpdate);
    return res.status(httpStatus.OK).send({});
  } catch (error) {
    if (error?.name == "NotFoundUserRequestError")
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(NotFoundUserRequestError());
    return res.status(httpStatus.BAD_REQUEST).send(deleteUserError());
  }
}
