import { Types } from "mongoose";
export interface IMvCarousels {
  _id?: string;
  uuid: string;
  slug?: string;
  id_position: string | Types.ObjectId;
  url?: string[] ;
  status?: number;
}
