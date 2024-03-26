import express, { Request, Response } from "express";

import authRoutes from "./v1/auth.routes";
import dataOwnerRoutes from "./v1/data-owner.routes";
import PositionCarouselsRoutes from "./v1/position-carousel.routes";
import mvCarouselsRoutes from "./v1/mv-carousel.routes";
import mvSchedulesRoutes from "./v1/mv-schedule.routes";
import menuRoutes from "./v1/menu.routes";
import inLiveRoutes from "./v1/in-live.routes";
import newsRoutes from "./v1/news.routes";
import typeSponsorsRoutes from "./v1/type-sponsors.routes";
import sponsorsRoutes from "./v1/sponsors.routes";
import mvContatosRoutes from "./v1/mv-contato.routes";
import userRoutes from "./v1/user.routes";
import galleryRoutes from "./v1/mv-gallery.routes";
import registerRoutes from "./v1/registrations.routes";

const routes = express.Router();

routes.get("/", (_req: Request, res: Response) =>
  res.send("Server running success! 🟢 🚀")
);

routes.use(authRoutes);
routes.use(dataOwnerRoutes);
routes.use(PositionCarouselsRoutes);
routes.use(mvCarouselsRoutes);
routes.use(mvSchedulesRoutes);
routes.use(menuRoutes);
routes.use(inLiveRoutes);
routes.use(newsRoutes);
routes.use(typeSponsorsRoutes);
routes.use(sponsorsRoutes);
routes.use(mvContatosRoutes);
routes.use(userRoutes);
routes.use(galleryRoutes);
routes.use(registerRoutes);

export default routes;
