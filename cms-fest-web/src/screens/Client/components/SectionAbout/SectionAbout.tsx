import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './SectionAbout.module.css';
import toast from 'react-hot-toast';

import { IDataOwner } from '@/repositories/ownerRepository/OwnerRepository.types';
import { OwnerRepository } from '@/repositories/ownerRepository/OwnerRepository';

export const SectionAbout: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const ownerRepository = new OwnerRepository();

  const [dataOwner, setDataOwner] = useState<IDataOwner>();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await ownerRepository.list();
      setDataOwner(data);
    } catch (error) {
      toast.error('Erro ao listar Descrição');
    }
  };

  return (
    <section id="about" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={200} height={30} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <SkeletonBase>
            <Skeleton width={500} height={20} style={{}} />
            <Skeleton width={620} height={20} style={{ marginTop: 10 }} />
            <Skeleton width={580} height={20} style={{ marginTop: 10 }} />
            <Skeleton width={570} height={20} style={{ marginTop: 10 }} />
            <Skeleton width={620} height={20} style={{ marginTop: 10 }} />
          </SkeletonBase>
        </>
      )}
      {!loading && (
        <>
          <h1 data-aos="fade-up" className="text-3xl md:text-5xl font-medium">
            A Festa
          </h1>
          <div className={styles['content-about']}>
            <p data-aos="fade-up" className="text-lg md:text-2xl font-medium text-center">
              {dataOwner?.description}
            </p>
          </div>
        </>
      )}
    </section>
  );
};
