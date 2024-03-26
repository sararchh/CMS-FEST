/* eslint-disable @typescript-eslint/no-explicit-any */
import PATHS from './paths';
import { Routes, Route } from 'react-router-dom';

import { SignIn } from '@/screens/SignIn/SignIn';
import { NotFound } from '@/screens/NotFound/NotFound';

import { AuthGuardRoutes } from '@/guards/AuthGuardRoutes';

import { HomeClient } from '@/screens/Client/Home/HomeClient';
import { NewsClient } from '@/screens/Client/NewsScreen/NewsClient';
import { GalleryClient } from '@/screens/Client/GalleryScreen/GalleryClient';

import {
  liveRoutes,
  dashboardRoutes,
  activitiesRoutes,
  carouselRoutes,
  appsRoutes,
  menuRoutes,
  positionCarouselRoutes,
  profileRoutes,
  usersRoutes,
  contactRoutes,
  scheduleRoutes,
  typeSponsorsRoutes,
  sponsorRoutes,
  galleryRoutes,
  newsRoutes,
   registrationsRoutes
} from '@/routes/routesGroup';

const routesPrivateMap = [
  ...dashboardRoutes,
  ...profileRoutes,
  ...positionCarouselRoutes,
  ...activitiesRoutes,
  ...usersRoutes,
  ...appsRoutes,
  ...carouselRoutes,
  ...menuRoutes,
  ...liveRoutes,
  ...contactRoutes,
  ...scheduleRoutes,
  ...typeSponsorsRoutes,
  ...sponsorRoutes,
  ...galleryRoutes,
  ...newsRoutes,
  ...registrationsRoutes
];

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path={PATHS?.index} element={<HomeClient />} />
      <Route path={PATHS?.auth.index} element={<SignIn />} />
      <Route path={PATHS?.client.news} element={<NewsClient />} />
      <Route path={PATHS?.client.gallery} element={<GalleryClient />} />

      {routesPrivateMap.map((route: any, index: number) => {
        const Component = route?.component;
        return (
          <Route
            key={index}
            path={route.path}
            //  element={route.component}
            element={
              <AuthGuardRoutes>
                <Component />
              </AuthGuardRoutes>
            }
          />
        );
      })}
      {/* <Route path="*" element={handleNotFound} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
