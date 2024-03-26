import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify"; 

import { ICadDataOwner } from 'ts';

const cadDataOwnerSchema = new Schema<ICadDataOwner>(
  {
    uuid: { type: String, default: () => uuidv4(), required: true }, 
    slug: { type: String },
    name: { type: String, required: true },
    fullname: { type: String, required: true },
    responsible: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    address01: { type: String, required: true },
    number: { type: Number, required: true },
    address02: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    cep: { type: String, required: true },
    logo: { type: String },
    favicon: { type: String },
    title: { type: String },
    description: { type: String },
    youtube: { type: String, default: "https://www.youtube.com/" },
    instagram: { type: String, default: "https://www.instagram.com/" },
    facebook: { type: String, default: "https://pt-br.facebook.com/" },
  },
  { timestamps: true }
);

cadDataOwnerSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,      
      strict: true,    
      remove: /[*+~.()'"!:@]/g 
    });
  }
  next();
});

export const cadDataOwnerModel = model<ICadDataOwner>(
  'cad_dataowner',
  cadDataOwnerSchema
);