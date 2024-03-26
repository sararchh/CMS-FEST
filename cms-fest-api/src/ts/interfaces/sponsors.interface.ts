import { Types } from "mongoose";

export interface ICadSponsors {
  _id?: string;
  uuid: string;
  name: string;
  id_type?: Types.ObjectId;
  thumb: string;
  url_site: string;
  status: number;
}
