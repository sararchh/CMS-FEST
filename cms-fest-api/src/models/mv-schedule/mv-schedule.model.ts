import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { IMvSchedule } from "ts";

const mvScheduleSchema = new Schema<IMvSchedule>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    day: { type: String, required: true },
    order: { type: Number, required: true },
    items: [
      {
        time: { type: String },
        title: { type: String },
        locale: { type: String },
        description: { type: String },
        status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
      },
    ],
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

export const mvScheduleModel = model<IMvSchedule>(
  "mv_schedule",
  mvScheduleSchema
);
