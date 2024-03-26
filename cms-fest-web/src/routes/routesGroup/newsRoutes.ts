import PATHS from '../paths';

import { News } from '@/screens/News/News';
import { NewsCreateEdit } from '@/screens/News/NewsCreateEdit/NewsCreateEdit';

export const newsRoutes = [
  {
    path: PATHS?.news?.index,
    component: News,
  },
  {
    path: PATHS?.news?.create,
    component: NewsCreateEdit,
  },
  {
    path: PATHS?.news?.edit + '/:slug',
    component: NewsCreateEdit,
  },
];
