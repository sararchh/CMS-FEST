import { Router } from "express";
import multer from "multer";

import {
  mvCarouselSchema,
  mvCarouselURL,
  mvCarouselUUID,
  mvCarouselUpdateSchema,
} from "@/schemas";

import {
  checkjwt,
  filesPayloadExists,
  validationSchemaMiddleware,
} from "@/middlewares";

import {
  mvCarouselCreate,
  mvCarouselGetByUUID,
  mvCarouselGetAll,
  mvCarouselUpdate,
  mvCarouselCreateBanner,
  mvCarouselDelete,
  mvCarouselOneURL,
} from "@/controllers/mv-carousel.controller";

import multerConfig from "@/config/multer.config";

const uploadFile = multer(multerConfig);

const mvCarousels = Router();

mvCarousels
  .get("/mv-carousel", mvCarouselGetAll)
  .get(
    "/mv-carousel/:uuid",
    [checkjwt, validationSchemaMiddleware(mvCarouselUUID)],
    mvCarouselGetByUUID
  )
  .post(
    "/mv-carousel",
    [checkjwt, validationSchemaMiddleware(mvCarouselSchema)],
    mvCarouselCreate
  )
  .post(
    "/mv-carousel/:uuid",
    [
      checkjwt,
      uploadFile.single("image"),
      filesPayloadExists,
      validationSchemaMiddleware(mvCarouselUpdateSchema),
    ],
    mvCarouselCreateBanner
  )
  .put(
    "/mv-carousel/:uuid",
    [checkjwt, validationSchemaMiddleware(mvCarouselUpdateSchema)],
    mvCarouselUpdate
  )
  .delete(
    "/mv-carousel/:uuid",
    [checkjwt, validationSchemaMiddleware(mvCarouselUUID)],
    mvCarouselDelete
  )
  .delete(
    "/mv-carousel/url/:uuid",
    [checkjwt, validationSchemaMiddleware(mvCarouselURL)],
    mvCarouselOneURL
  );

export default mvCarousels;
