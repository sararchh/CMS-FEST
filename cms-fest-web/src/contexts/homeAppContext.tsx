/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { FullScreenLoading } from '@/components/atoms/FullScreenLoading/FullScreenLoading';
import React, { useEffect } from 'react';

interface HomeAppContextData {
  loading: boolean;
}

interface HomeAppProviderProps {
  children: React.ReactNode;
}

const HomeAppContext = React.createContext({} as HomeAppContextData);

function HomeAppProvider({ children }: HomeAppProviderProps) {
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const inicialize = async () => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1200);
    };

    inicialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <HomeAppContext.Provider
      value={{
        loading,
      }}
    >
      <div className="relative">
        {loading && <FullScreenLoading />}
        {children}
      </div>
    </HomeAppContext.Provider>
  );
}

export { HomeAppContext, HomeAppProvider };
