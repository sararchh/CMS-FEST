import { Router } from "express";
import multer from 'multer';

import multerConfig from '@/config/multer.config';

const uploadFile = multer(multerConfig);

import {
  newsSchema,
  newsSlug,
  newsUpdateSchema,
} from "@/schemas";

import { checkjwt, filesPayloadExists, validationSchemaMiddleware } from "@/middlewares";

import {
  newsCreate,
  newsGetBySlug,
  newsGetAll,
  newsUpdate,
  newsDeleteOne,
  createThumb
} from "@/controllers/news.controller";

const news = Router();

news
  .get("/news", newsGetAll)
  .get(
    "/news/:slug",
    [checkjwt, validationSchemaMiddleware(newsSlug)],
    newsGetBySlug
  )
  .post(
    "/news",
    [validationSchemaMiddleware(newsSchema), checkjwt],
    newsCreate
  )
  .post(
    "/news/thumb/:uuid",
    [checkjwt, uploadFile.single('image'), filesPayloadExists],
    createThumb
  )
  .put(
    "/news/:uuid",
    [validationSchemaMiddleware(newsUpdateSchema), checkjwt],
    newsUpdate
  )
  .delete(
    "/news/:uuid",
    [validationSchemaMiddleware(newsUpdateSchema), checkjwt],
    newsDeleteOne
  );

export default news;
