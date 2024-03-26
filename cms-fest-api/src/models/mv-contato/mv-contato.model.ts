import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { IMvContato } from "ts";

const mvContatoSchema = new Schema<IMvContato>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const mvContatoModel = model<IMvContato>("mv_contato", mvContatoSchema);
