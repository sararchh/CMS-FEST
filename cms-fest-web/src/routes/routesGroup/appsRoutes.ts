import PATHS from "../paths";
import { AppsCreate } from "@/screens/Apps/create/AppsCreate";
import { AppsEdit } from "@/screens/Apps/edit/AppsEdit";

export const appsRoutes = [
  {
    path: PATHS?.apps?.create,
    component: AppsCreate,
  },
  {
    path: PATHS?.apps?.edit,
    component: AppsEdit,
  },
];
