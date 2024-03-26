/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './SectionSponsors.module.css';
import { TypesSponsorsRepository } from '@/repositories/typeSponsorRepository/typeSponsorsRepository';
import { ITypeSponsors } from '@/repositories/typeSponsorRepository/typeSponsorsRepository.types';
import toast from 'react-hot-toast';


export const SectionSponsors: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const typesSponsorsRepository = new TypesSponsorsRepository();

  const [dataSponsors, setDataSponsors] = useState<ITypeSponsors[]>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await typesSponsorsRepository.listAll();
      setDataSponsors(data);
    } catch (error) {
      toast.error('Erro ao listar Patrocinadores!');
    }
  };

  return (
    <section id="sponsors" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <div className="flex flex-row">
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
          <div className="flex flex-row mt-4">
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={200} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
        </>
      )}
      {!loading && (
        <>
          <div className={styles['content-about']}>
            {dataSponsors
              .sort((a, b) => a.order - b.order)
              .map((data: ITypeSponsors, index: number) => (
                <div key={index} className={index == 0 ? "w-screen" : "w-[100%] md:w-[50%]"}>
                  <h3 data-aos="fade-up" data-aos-delay="200" className="text-3xl md:text-4xl font-medium mb-10">
                    {data.name}
                  </h3>

                <div className={styles["item-content"]}>
                  {data?.items?.map((item: ITypeSponsors["items"][0], key: number) => (
                    <NavLink key={key} className={styles['button-thumb']} to={item?.url_site} target='_blank'>
                      <img
                        data-aos="fade-up"
                        data-aos-delay="400"
                        width="auto"
                        height="auto"
                        className={styles['thumb-menu']}
                        alt="image-menu"
                        src={item?.thumb}
                      />
                    </NavLink>
                  ))}
                </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
};
