import PATHS from "../paths";
import { Carousel } from "@/screens/Carousel/Carousel";
import { CarouselEdit } from "@/screens/Carousel/form/CarouselEdit";

export const carouselRoutes = [
  {
    path: PATHS?.carousel?.index,
    component: Carousel,
  },
  // {
  //   path: PATHS?.carousel?.create,
  //   component: UsersCreateEdit,
  // },
  {
    path: PATHS?.carousel?.edit + "/:uuid",
    component: CarouselEdit,
  },
];
