import { useEffect } from 'react';
import { HomeAppProvider } from '@/contexts/homeAppContext';
import { NewsScreen } from './NewsScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const NewsClient: React.FC = () => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });

    // window.addEventListener('load', AOS.refresh)
    // if (document.readyState == "complete") AOS.refresh();
  }, []);

  return (
    <HomeAppProvider>
      <NewsScreen />
    </HomeAppProvider>
  );
};
