import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { IMvCarousels } from "ts";

const mvCarouselsSchema = new Schema<IMvCarousels>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    slug: { type: String },
    id_position: { type: Schema.Types.ObjectId, ref: "cad_position_carousel" },
    url: [{ type: String }],
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

export const mvCarouselsModel = model<IMvCarousels>("mv_carousel", mvCarouselsSchema);
