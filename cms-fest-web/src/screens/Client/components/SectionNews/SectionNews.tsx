/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './SectionNews.module.css';
import { NavLink } from 'react-router-dom';
import { INews } from '@/repositories/newsRepository/newsRepository.types';
import { NewsRepository } from '@/repositories/newsRepository/newsRepository';
import toast from 'react-hot-toast';
import PATHS from '@/routes/paths';
import { CardNews } from '@/components/atoms/CardNews/CardNews';

export const SectionNews: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const newsRepository = new NewsRepository();

  const [newsList, setNewsList] = useState<INews[]>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await newsRepository.listAll();
      setNewsList(data.data);
    } catch (error) {
      toast.error('Erro ao listar Notícias');
    }
  };

  return (
    <section id="news" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <div className="flex flex-row">
            <SkeletonBase>
              <Skeleton width={350} height={120} style={{ marginRight: 80 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={350} height={120} style={{}} />
            </SkeletonBase>
          </div>
          <div className="flex flex-row mt-8">
            <SkeletonBase>
              <Skeleton width={350} height={120} style={{ marginRight: 80 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={350} height={120} style={{}} />
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
            Notícias
          </h1>
          <div className={styles['content-about'] + ' w-[100%] flex flex-row'}>
            {Boolean(newsList?.length > 0) &&
              newsList
                .slice(0, 2)
                .map((news: INews, index: number) => (
                  <CardNews
                    key={index}
                    path={PATHS.client.news}
                    width="450px"
                    height="auto"
                    date={news?.date}
                    title={news?.title}
                    description={news?.description}
                  />
                ))}
          </div>

          <NavLink
            to={PATHS.client.news}
            className="flex justify-center mt-[20px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <button className="w-[200px] h-[50px] bgc-primary hover:bg-green-800 text-white font-bold py-2 px-4 rounded-3xl transition-all">
              Ver Todas
            </button>
          </NavLink>
        </>
      )}
    </section>
  );
};
