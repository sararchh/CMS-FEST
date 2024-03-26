/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import ImageViewer from 'react-simple-image-viewer';
// config
import { appConfig } from '@/config/appConfig';
// components
import { SimplePageTemplate } from '@/components/templates/SimplePageTemplate/SimplePageTemplate';
// repositories
import { GalleryRepository } from '@/repositories/galleryRepository/galleryRepository';
import { IGallery } from '@/repositories/galleryRepository/galleryRepository.types';
// styles
import styles from './GalleryScreen.module.css';

export const GalleryScreen = () => {
  const galleryRepository = new GalleryRepository();

  const [galleryList, setGalleryList] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await galleryRepository.listAll();
      // console.log('data: ', data);
      setGalleryList(data?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao listar Galeris');
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
    <SimplePageTemplate title="Galeria">
      <Helmet>
        <title>{`Galeria | ${appConfig?.name}`}</title>
      </Helmet>

      <div className="w-full h-full p-8 flex flex-col items-center">
        {loading && (
          <div className={'flex flex-col items-center scale-[400%]'}>
            <ThreeDots
              visible={loading}
              height="120"
              width="120"
              color="#16664e"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {Boolean(galleryList.length > 0) && !loading && (
          <div className='flex flex-row flex-wrap gap-[20px]'>
            {galleryList.map((image: IGallery, index: number) => (
              <button key={index} className={styles['button-thumb']} onClick={() => openImageViewer(index)}>
                <img
                  data-aos="fade-up"
                  data-aos-delay="400"
                  width={200}
                  height={300}
                  className={styles['thumb-menu']}
                  alt="image-menu"
                  src={image?.url}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={galleryList?.map((i) => i?.url)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
          closeOnClickOutside={true}
        />
      )}
    </SimplePageTemplate>
  );
};
