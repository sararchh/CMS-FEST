import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { ICadUser } from "ts";

const cadUserSchema = new Schema<ICadUser>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password_hash: { type: String, required: true },
    status: { type: Number, enum: [0, 1, 2], default: 1 }, //Inativo, Ativo, Deletado
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const cadUsersModel = model<ICadUser>("cad_users", cadUserSchema);
