import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import {
  fileExtError,
  fileNotFoundError,
  fileSizeError,
} from "@/errors/invalidDataError";

const maxSize = 1 * 1000 * 1000;
const filetypes = /jpeg|jpg|png|webp/;

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const files = req.files || [req.file];

  if (!files.some((file: File) => !!file)) {
    return res.status(httpStatus.UNAUTHORIZED).json(fileNotFoundError(""));
  }

  try {
    for (const file of files) {
      if (!file) continue; // Pule arquivos nulos

      let mimetype = filetypes.test(file.mimetype);

      if (!mimetype) throw fileExtError();

      if (file.size > maxSize) throw fileSizeError();
    }

    next();
  } catch (error) {
    if (error?.name == "fileExtError")
      return res.status(httpStatus.BAD_REQUEST).json(fileExtError());
    if (error?.name == "fileSizeError")
      return res.status(httpStatus.BAD_REQUEST).json(fileSizeError());

    return res.status(httpStatus.BAD_REQUEST).json(fileNotFoundError());
  }
};
