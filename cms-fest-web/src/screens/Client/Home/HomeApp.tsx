import { Helmet } from 'react-helmet';
// config
import { appConfig } from '@/config/appConfig';
// componentes sections
import { HeaderClient } from '../components/HeaderClient/HeaderClient';
import { MiddleMenuClient } from '../components/MiddleMenuClient/MiddleMenuClient';
import { CarrouselHeader } from '../components/CarrouselHeader/CarrouselHeader';
import { SectionAbout } from '../components/SectionAbout/SectionAbout';
import { ScheduleEvent } from '../components/ScheduleEvent/ScheduleEvent';
import { SectionNews } from '../components/SectionNews/SectionNews';
import { SectionMenuProd } from '../components/SectionMenuProd/SectionMenuProd';
import { SectionSponsors } from '../components/SectionSponsors/SectionSponsors';
import { SectionInLive } from '../components/SectionInLive/SectionInLive';
import { SectionSubscription } from '../components/SectionSubscription/SectionSubscription';
import { SectionContact } from '../components/SectionContact/SectionContact';
import { SectionGallery } from '../components/SectionGallery/SectionGallery';

export const HomeApp: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Helmet>
        <title>{appConfig?.name + ' | Home'}</title>
        <meta name="description" content={appConfig?.description} />
      </Helmet>

      <HeaderClient />

      <CarrouselHeader />

      <MiddleMenuClient />

      <SectionAbout />

      <ScheduleEvent />

      <SectionNews />

      <SectionMenuProd />

      <SectionGallery />

      <SectionInLive />

      <SectionSubscription />

      <SectionSponsors />

      <SectionContact />
    </div>
  );
};
