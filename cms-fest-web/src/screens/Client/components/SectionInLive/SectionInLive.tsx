/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';
import styles from './SectionInLive.module.css';
import { ILive } from '@/repositories/liveRepository/liveRepository.types';
import toast from 'react-hot-toast';
import { LiveRepository } from '@/repositories/liveRepository/liveRepository';

export const SectionInLive: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const [liveSelected, setLiveSelected] = useState<ILive>(null);
  const [lives, setLives] = useState<ILive[]>([]);

  const livesRepository = new LiveRepository();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await livesRepository.listAll();
      setLives(data);
      setLiveSelected(data[0]);
    } catch (error) {
      toast.error('Erro ao listar Lives!');
    }
  };

  return (
    <section id="in-live" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <div className="flex flex-row">
            <SkeletonBase>
              <Skeleton width={400} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
          <div className="flex flex-row mt-12">
            <SkeletonBase>
              <Skeleton width={280} height={180} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={280} height={180} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={280} height={180} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
        </>
      )}
      {!loading && (
        <>
          <img
            data-aos="fade-up"
            data-aos-delay="400"
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
            alt="image-menu"
            src={'/assets/images/logo.png'}
          />
          <h1 data-aos="fade-up" data-aos-delay="200" className="text-3xl md:text-5xl font-medium text-white mt-2">
            Assista Ao Vivo
          </h1>

          <div className="w-[100%] flex flex-col items-center mb-12">
            <h3 className="text-white text-3xl my-2 text-center">{liveSelected?.title}</h3>
            <div
              className={styles['content-video-selected']}
              dangerouslySetInnerHTML={{
                __html: `<iframe width="560" height="315" src=${String(
                  liveSelected?.url_live,
                )} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
              }}
            />
          </div>
          <div className={styles['content-about']}>
            {Boolean(lives.length > 0) &&
              lives.map((item: ILive, index) => (
                <button key={index} className={styles['button-thumb']} onClick={() => setLiveSelected(item)}>
                  <div
                    className={styles['content-video-item']}
                    dangerouslySetInnerHTML={{
                      __html: `<iframe width="560" height="315" src=${item?.url_live} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                    }}
                  />
                  <p className="text-white text-md my-2">Live {new Date(item?.date).toLocaleDateString('pt-BR')}</p>
                </button>
              ))}
          </div>
        </>
      )}
    </section>
  );
};
