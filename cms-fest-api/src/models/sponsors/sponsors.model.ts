import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadSponsors } from "ts";

const cadSponsorsSchema = new Schema<ICadSponsors>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    name: { type: String, required: true },
    id_type: { type: Schema.Types.ObjectId, ref: "cad_type_sponsors" },
    thumb: { type: String },
    url_site: { type: String },
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

export const cadSponsorsModel = model<ICadSponsors>(
  "cad_sponsors",
  cadSponsorsSchema
);
