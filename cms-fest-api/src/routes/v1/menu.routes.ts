import { Router } from "express";

import { menuSchema, menuURL, menuUUID, menuUpdateSchema } from "@/schemas";

import {
  checkjwt,
  validationSchemaMiddleware,
  filesPayloadExists,
} from "@/middlewares";

import multerConfig from "@/config/multer.config";

const uploadFile = multer(multerConfig);

import {
  menuCreate,
  menuGetByUUID,
  menuGetAll,
  menuUpdate,
  menuDeleteOne,
} from "@/controllers/menu.controller";
import multer from "multer";

const menu = Router();

menu
  .get("/menu", menuGetAll)
  .get(
    "/menu/:uuid",
    [checkjwt, validationSchemaMiddleware(menuUUID)],
    menuGetByUUID
  )
  .post(
    "/menu",
    [
      checkjwt,
      uploadFile.single("image"),
      filesPayloadExists,
    ],
    menuCreate
  )
  .put(
    "/menu/:uuid",
    [validationSchemaMiddleware(menuUpdateSchema), checkjwt],
    menuUpdate
  )
  .delete(
    "/menu/:uuid",
    [validationSchemaMiddleware(menuUpdateSchema), checkjwt],
    menuDeleteOne
  );

export default menu;
