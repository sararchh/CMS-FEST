import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadMenu } from "ts";

const cadMenuSchema = new Schema<ICadMenu>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export const cadMenuModel = model<ICadMenu>("cad_menu", cadMenuSchema);
