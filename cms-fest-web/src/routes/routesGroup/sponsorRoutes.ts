import {Sponsors} from "@/screens/Sponsors/Sponsors";
import PATHS from "../paths";
import {SponsorsCreateEdit} from "@/screens/Sponsors/form/SponsorsCreateEdit";

export const sponsorRoutes = [
  {
    path: PATHS?.sponsor?.index,
    component: Sponsors,
  },
  {
    path: PATHS?.sponsor?.create,
    component: SponsorsCreateEdit,
  },
  {
    path: PATHS?.sponsor?.edit + "/:id",
    component: SponsorsCreateEdit,
  },
];
