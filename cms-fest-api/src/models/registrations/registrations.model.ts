import { IRegistration } from "@/ts";
import mongoose, { Schema, Document } from "mongoose";

const RegistrationSchema: Schema = new Schema<IRegistration>({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

export const registrationModel = mongoose.model<IRegistration>(
  "Registration",
  RegistrationSchema
);


