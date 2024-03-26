import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { IMvGallery } from "ts";

const mvGallerySchema = new Schema<IMvGallery>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    url: { type: String, required: true },
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

export const mvGalleryModel = model<IMvGallery>("mv_gallery", mvGallerySchema);
