import PATHS from "../paths";
import { Schedule } from "@/screens/Schedule/Schedule";
import { ScheduleCreateEdit } from "@/screens/Schedule/form/ScheduleCreateEdit";

export const scheduleRoutes = [
  {
    path: PATHS?.schedule?.index,
    component: Schedule,
  },
  {
    path: PATHS?.schedule?.create,
    component: ScheduleCreateEdit,
  },
  {
    path: PATHS?.schedule?.edit + "/:id",
    component: ScheduleCreateEdit,
  },
];
