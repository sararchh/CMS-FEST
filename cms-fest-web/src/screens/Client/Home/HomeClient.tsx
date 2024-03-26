import React, { useEffect } from 'react';
import { HomeApp } from './HomeApp';
import AOS from 'aos';
import 'aos/dist/aos.css';


import { HomeAppProvider } from '@/contexts/homeAppContext';

export const HomeClient: React.FC = () => {
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
      <HomeApp />
    </HomeAppProvider>
  );
};
