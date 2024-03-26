/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import { menuConfig } from '@/config/menuConfig';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './MiddleMenuClient.module.css';

export const MiddleMenuClient: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  return (
    <section className={styles['container']}>
      {loading && (
        <div className={styles['content-desktop']}>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{ marginRight: 10 }} />
            <Skeleton width={250} height={45} style={{ marginRight: 10 }} />
            <Skeleton width={250} height={45} style={{ marginRight: 10 }} />
          </SkeletonBase>
        </div>
      )}
      {!loading && (
        <div className={styles['content-desktop']}>
          {menuConfig.map((menu: any) => {
            if (!menu.middle) return;
            return (
              <a data-aos="fade-up" key={menu?.id} href={menu.link}>
                <p className={styles['text-menu'] + ' text-[15px] md:text-[15px] lg:text-[22px] mx-2'}>{menu.text}</p>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
};
