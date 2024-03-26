import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadInLive } from "ts";

const cadInLiveSchema = new Schema<ICadInLive>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    title: { type: String, required: true },
    date: { type: Date, required: true },
    url_live: { type: String, required: true },
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

export const cadInLiveModel = model<ICadInLive>("cad_in_live", cadInLiveSchema);
