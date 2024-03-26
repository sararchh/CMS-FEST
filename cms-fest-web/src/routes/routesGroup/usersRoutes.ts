import PATHS from "../paths";
import { Users } from "@/screens/Users/Users";
import { UsersCreateEdit } from "@/screens/Users/form/UsersCreateEdit";

export const usersRoutes = [
  {
    path: PATHS?.users?.index,
    component: Users,
  },
  {
    path: PATHS?.users?.create,
    component: UsersCreateEdit,
  },
  {
    path: PATHS?.users?.edit + "/:id",
    component: UsersCreateEdit,
  },
];
