/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import ImageViewer from 'react-simple-image-viewer';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './SectionMenuProd.module.css';

import { MenuRepository } from '@/repositories/menuRepository/menuRepository';
import { IMenu } from '@/repositories/menuRepository/menuRepository.types';

export const SectionMenuProd: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const menuRepository = new MenuRepository();

  const [menus, setMenus] = useState<IMenu[]>([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await menuRepository.list();
      setMenus(data);
    } catch (error) {
      toast.error('Erro ao listar Menu');
    }
  };

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <section id="menu" className={styles['container']}>
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
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-3xl md:text-5xl font-medium text-white">
              Cardápio
            </h1>
            <div className={styles['content-about']}>
              {Boolean(menus?.length > 0) &&
                menus.map((item: IMenu, index) => (
                  <>
                    <button key={index} className={styles['button-thumb']} onClick={() => openImageViewer(index)}>
                      <img
                        data-aos="fade-up"
                        data-aos-delay="400"
                        width={200}
                        height={300}
                        className={styles['thumb-menu']}
                        alt="image-menu"
                        src={item?.url}
                      />
                    </button>
                  </>
                ))}
            </div>
          </>
        )}
      </section>
      {isViewerOpen && (
        <ImageViewer
          src={menus?.map((i) => i?.url)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
};
