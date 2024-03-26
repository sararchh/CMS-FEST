import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadPositionCarousel } from "ts";

const positionCarouselSchema = new Schema<ICadPositionCarousel>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    position: { type: String, required: true },
  },
  { timestamps: true }
);


export const positionCarouselsModel = model<ICadPositionCarousel>(
  "cad_position_carousel",
  positionCarouselSchema
);
