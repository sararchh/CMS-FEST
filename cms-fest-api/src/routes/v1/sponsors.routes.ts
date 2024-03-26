import { Router } from "express";
import multer from 'multer';

import multerConfig from '@/config/multer.config';

const uploadFile = multer(multerConfig);

import {
  sponsorsSchema,
  sponsorsUUID,
  sponsorsUpdateSchema,
} from "@/schemas";

import { checkjwt, filesPayloadExists, validationSchemaMiddleware } from "@/middlewares";

import {
  sponsorsCreate,
  sponsorsGetByUUID,
  sponsorsGetAll,
  sponsorsUpdate,
  sponsorsDeleteOne,
  createThumb,
} from "@/controllers/sponsors.controller";

const sponsors = Router();

sponsors
  .get("/sponsors", sponsorsGetAll)
  .get(
    "/sponsors/:uuid",
    [checkjwt, validationSchemaMiddleware(sponsorsUUID)],
    sponsorsGetByUUID
  )
  .post(
    "/sponsors",
    [validationSchemaMiddleware(sponsorsSchema), checkjwt],
    sponsorsCreate
  )
  .post(
    "/sponsors/thumb/:uuid",
    [checkjwt, uploadFile.single('image'), filesPayloadExists],
    createThumb
  )
  .put(
    "/sponsors/:uuid",
    [validationSchemaMiddleware(sponsorsUpdateSchema), checkjwt],
    sponsorsUpdate
  )
  .delete(
    "/sponsors/:uuid",
    [validationSchemaMiddleware(sponsorsUpdateSchema), checkjwt],
    sponsorsDeleteOne
  );

export default sponsors;
