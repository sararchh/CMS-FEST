import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadTypeSponsors } from "ts";

const cadTypeSponsorsSchema = new Schema<ICadTypeSponsors>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export const cadTypeSponsorsModel = model<ICadTypeSponsors>(
  "cad_type_sponsors",
  cadTypeSponsorsSchema
);
