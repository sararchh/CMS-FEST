/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './CarrouselHeader.module.css';
import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';
import Skeleton from 'react-loading-skeleton';
import { IMvCarousels } from '@/repositories/mvCarouselRepository/mvCarouselRepository.types';
import { MvBannerRepository } from '@/repositories/mvCarouselRepository/mvCarouselRepository';
import toast from 'react-hot-toast';

export const CarrouselHeader: React.FC = () => {
  const mvCarouselRepository = new MvBannerRepository();

  const { loading } = useContext(HomeAppContext);

  const [carouselList, setCarouselList] = useState<IMvCarousels>();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const { data } = await mvCarouselRepository.listAll('TOPO');
      setCarouselList(data[0]);
    } catch (error) {
      toast.error('Erro ao listar o banner');
    }
  };

  return (
    <div className={styles['container']}>
      {loading && (
        <SkeletonBase>
          <div className={styles['loading-desk']}>
            <Skeleton
              width={'100%'}
              height={600}
              // style={{ marginRight: 0 }}
            />
          </div>
          <div className={styles['loading-mob']}>
            <Skeleton
              width={'100%'}
              height={400}
              // style={{ marginRight: 0 }}
            />
          </div>
        </SkeletonBase>
      )}
      {!loading && (
        <Swiper
          cssMode={true}
          navigation={true}
          autoplay={{ delay: 5000 }}
          pagination={false}
          mousewheel={false}
          keyboard={false}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper"
          loop={true}
        >
          {carouselList?.url?.length > 0 &&
            carouselList?.url.map((item: any, key: number) => (
              <SwiperSlide key={key}>
                <img
                  className={styles['img-carrousel'] + ` object-cover`}
                  src={item}
                  width={'auto'}
                  height={'auto'}
                  alt="image"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};
