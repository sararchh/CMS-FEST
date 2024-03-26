import dotenv from "dotenv";
import { environment } from "./environment.config";
dotenv.config();

export default {
  secret: environment.JWT_SECRET,
  refreshSecret: environment.JWT_REFRESH_SECRET,
  expiresIn: environment.JWT_EXPIRES,
};
