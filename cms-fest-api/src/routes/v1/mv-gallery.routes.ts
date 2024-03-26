import { Router } from "express";
import multer from "multer";
import {
  mvGalleryUUID
} from "@/schemas";
import { checkjwt, filesPayloadExists, validationSchemaMiddleware } from "@/middlewares";
import multerConfig from "@/config/multer.config";
const uploadFile = multer(multerConfig);
import {
  mvGalleryGetByUUID,
  mvGalleryGetAll,
  mvGalleryCreateImage,
  mvGalleryOneURL
} from "@/controllers/mv-gallery.controller";

const mvGallery = Router();

mvGallery
  .get("/mv-gallery", mvGalleryGetAll)
  .get(
    "/mv-gallery/:uuid",
    [checkjwt, validationSchemaMiddleware(mvGalleryUUID)],
    mvGalleryGetByUUID
  )
  .post(
    "/mv-gallery/url",
    [
      checkjwt,
      uploadFile.single("image"),
      filesPayloadExists,
    ],
    mvGalleryCreateImage
  )
  .delete(
    "/mv-gallery/url/:uuid",
    [checkjwt, validationSchemaMiddleware(mvGalleryUUID)],
    mvGalleryOneURL
  );

export default mvGallery;
