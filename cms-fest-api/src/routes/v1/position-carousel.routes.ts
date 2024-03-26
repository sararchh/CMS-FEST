import { Router } from "express";

import {
  PositionCarouselSchema,
  PositionCarouselUUID,
  PositionCarouselUpdateSchema,
} from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  PositionCarouselCreate,
  PositionCarouselGetByUUID,
  PositionCarouselGetAll,
  PositionCarouselUpdate,
  PositionCarouselDelete
} from "@/controllers/position-carousel.controller";

const PositionCarousels = Router();

PositionCarousels
  .get("/position-carousel", [checkjwt], PositionCarouselGetAll)
  .get(
    "/position-carousel/:uuid",
    [checkjwt, validationSchemaMiddleware(PositionCarouselUUID)],
    PositionCarouselGetByUUID
  )
  .post(
    "/position-carousel",
    [validationSchemaMiddleware(PositionCarouselSchema), checkjwt],
    PositionCarouselCreate
  )
  .put(
    "/position-carousel/:uuid",
    [validationSchemaMiddleware(PositionCarouselUpdateSchema), checkjwt],
    PositionCarouselUpdate
  )
  .delete(
    "/position-carousel/:uuid",
    [checkjwt, validationSchemaMiddleware(PositionCarouselUUID)],
    PositionCarouselDelete
  )

export default PositionCarousels;
