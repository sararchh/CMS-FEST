/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import ImageViewer from 'react-simple-image-viewer';
import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';
import styles from './SectionGallery.module.css';
import { IMenu } from '@/repositories/menuRepository/menuRepository.types';
import { GalleryRepository } from '@/repositories/galleryRepository/galleryRepository';
import { IGallery } from '@/repositories/galleryRepository/galleryRepository.types';
import { NavLink } from 'react-router-dom';
import PATHS from '@/routes/paths';

export const SectionGallery: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const galleryRepository = new GalleryRepository();

  const [galleryData, setGalleryData] = useState<IGallery[]>([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await galleryRepository.listAll("", "1", "4"); 
      setGalleryData(data?.data);
    } catch (error) {
      toast.error('Erro ao listar galeria de imagens');
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
      <section id="gallery" className={styles['container']}>
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
              Galeria
            </h1>
            <div className={styles['content-about']}>
              {Boolean(galleryData?.length > 0) &&
                galleryData.map((item: IMenu, index) => (
                  <>
                    <button key={index} className={styles['button-thumb']} onClick={() => openImageViewer(index)}>
                      <img
                        data-aos="fade-up"
                        data-aos-delay="400"
                        width={100}
                        height={150}
                        className={styles['thumb-style']}
                        alt="image-menu"
                        src={item?.url}
                      />
                    </button>
                  </>
                ))}
            </div>

            <NavLink
              to={PATHS.client.gallery}
              className="flex justify-center mt-[20px]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button className="w-[220px] h-[50px] bgc-primary hover:bg-green-800 text-white font-bold py-2 px-4 rounded-3xl transition-all">
                Ver Todas Imagens
              </button>
            </NavLink>
          </>
        )}
      </section>
      {isViewerOpen && (
        <ImageViewer
          src={galleryData?.map((i) => i?.url)}
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
