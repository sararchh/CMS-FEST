/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import { IRegistration } from '@/repositories/registrationsRepository/registrationsRepository.types';
import { RegistrationsRepository } from '@/repositories/registrationsRepository/registrationsRepository';

import styles from './SectionSubscription.module.css';
import toast from 'react-hot-toast';

export const SectionSubscription: React.FC = () => {
  const { loading } = useContext(HomeAppContext);
  
  const registrationRepository = new RegistrationsRepository();

  const [registration, setRegistration] = useState<IRegistration>();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      const [data] = await registrationRepository.listAll();
      setRegistration(data);
    } catch (error) {
      toast.error('Erro ao buscar Incrições');
    }
  };

  return (
    <section id="subscription" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <div className="flex flex-row">
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
          <div className="mt-12">
            <SkeletonBase>
              <Skeleton width={200} height={45} style={{}} />
            </SkeletonBase>
          </div>
        </>
      )}
      {!loading && (
        <>
          <h1 data-aos="fade-up" data-aos-delay="200" className="text-3xl md:text-5xl font-medium">
            {`Inscrições ${registration?.title}`}
          </h1>
          <div className={styles['content-about']}>
            <div className={styles['div-thumb']} >
              <img
                data-aos="fade-up"
                data-aos-delay="400"
                width={400}
                height={200}
                className={styles['thumb-art']}
                alt="image-subscription"
                src={'/assets/images/mock_subscription.jpg'}
              />
            </div>
          </div>

          <NavLink className="flex justify-center mt-[20px]" data-aos="fade-up" data-aos-delay="200" to={registration?.link} target="_blank">
            <button 
            className="w-[200px] h-[50px] bgc-primary hover:bg-green-900 text-white font-bold py-2 px-4 rounded-3xl transition-all duration-800 hover:scale-110">
              Cadastre-se Aqui
            </button>
          </NavLink>
        </>
      )}
    </section>
  );
};
