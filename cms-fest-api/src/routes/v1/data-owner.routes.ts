import { Router } from "express";
import multer from "multer";

import {
  dataOwnerSchema,
  dataOwnerSlug,
  dataOwnerUpdateSchema,
} from "@/schemas";

import {
  checkjwt,
  validationSchemaMiddleware,
  filesPayloadExists,
} from "@/middlewares";

import multerConfig from "@/config/multer.config";

const uploadFile = multer(multerConfig);

import {
  dataOwnerCreate,
  dataOwnerGetBySlug,
  dataOwnerGetAll,
  dataOwnerUpdate,
  dataOwnerUpdateLogo,
} from "@/controllers/data-owner.controller";

const dataOwner = Router();

dataOwner
  .get("/data-owner", dataOwnerGetAll)
  .get(
    "/data-owner/:slug",
    [checkjwt, validationSchemaMiddleware(dataOwnerSlug)],
    dataOwnerGetBySlug
  )
  .post(
    "/data-owner",
    [validationSchemaMiddleware(dataOwnerSchema), checkjwt],
    dataOwnerCreate
  )
  .post(
    "/data-owner/logo/:id",
    [checkjwt, uploadFile.single("image"), filesPayloadExists],
    dataOwnerUpdateLogo
  )
  .put(
    "/data-owner/:id",
    [validationSchemaMiddleware(dataOwnerUpdateSchema), checkjwt],
    dataOwnerUpdate
  );

export default dataOwner;
