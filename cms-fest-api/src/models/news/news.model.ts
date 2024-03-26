import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify"; 

const cadNewsSchema = new Schema(
  {
    uuid: { type: String, default: uuidv4, required: true },
    slug: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    thumb: { type: String },
    status: { type: Number, enum: [0, 1, 2], default: 1 }, // Inativo, Ativo, Deletado
  },
  { timestamps: true }
);

cadNewsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,      
      strict: true,    
      remove: /[*+~.()'"!:@]/g 
    });
  }
  next();
});

export const cadNewsModel = model("cad_news", cadNewsSchema);
