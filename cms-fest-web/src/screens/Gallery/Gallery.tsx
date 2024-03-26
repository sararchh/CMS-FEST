import { useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { ImFolderUpload } from 'react-icons/im';

import styles from './Gallery.module.css';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Button } from '@/components/atoms/Button/Button';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';

import { CardImage } from '@/components/molecules/CardImage/CardImage';
import { IGallery, IGalleryprops } from '@/repositories/galleryRepository/galleryRepository.types';
import { GalleryRepository } from '@/repositories/galleryRepository/galleryRepository';
import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';
import { Card } from '@/components/atoms/Card/Card';

import ImageViewer from 'react-simple-image-viewer';

export const Gallery: React.FC = () => {
  const galleryRepository = new GalleryRepository();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [modalDialogConfirmIsOpen, setModalDialogConfirmIsOpen] = useState<boolean>(false);

  const [infoPages, setInfoPages] = useState({} as Partial<IGalleryprops>);

  const [images, setImages] = useState<IGallery[]>([]);
  const [image, setImage] = useState<IGallery>(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getData = async () => {
    try {
      const data = await galleryRepository.listAll('', pageQuery || '1');
      setImages(data.data);
      setInfoPages({
        total: data?.total,
        pages: data?.pages,
        current_page: data?.current_page,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (item: IGallery) => {
    setImage(item);
    setModalDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await galleryRepository?.deleteImage(image.uuid);
      toast.success('Registro excluído com sucesso.');
      getData();
      setImage(null);
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setModalDialogConfirmIsOpen(false);
      setLoadingActions(false);
      setImage(null);
    }
  };

  const handleUpdateImage = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      await galleryRepository.createImage(formData);
      getData();
      setFileToUpload(null);
      toast.success('Imagem atualizada com sucesso.');
    } catch (error) {
      toast.error('Falha ao atualizar imagem.');
    }
    setLoading(false);
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
      <MainTemplate>
        <DialogConfirm
          isOpen={modalDialogConfirmIsOpen}
          loading={loadingActions}
          title={'Deseja realmente excluir esse registro?'}
          onConfirm={handleDeleteRegister}
          onClose={() => setModalDialogConfirmIsOpen(false)}
        />
        <section className={styles['container']}>
          <div className={styles['header-content']}>
            <h3> Galeria</h3>
          </div>
          {loading && (
            <div className={`${styles['list-item']} + border-dashed border-2 border-sky-500`}>
              <div className="center-screen">
                <ThreeDots
                  visible={loading}
                  height="80"
                  width="80"
                  color="#2e7afb"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          )}
          {!loading && (
            <div className={`${styles['list-item']} + border-dashed border-2 border-sky-500`}>
              <DropZoneImage
                hasFile={fileToUpload}
                handleFile={(file) => setFileToUpload(file)}
                titleHasNotFile={
                  <div className={styles['container-dronzone']}>
                    <ImFolderUpload />
                    <h3>Clique aqui ou arraste uma imagem para upload</h3>
                    <p>Arquivos recomendados .JPG e .PNG.</p>
                    <p>LEMBRE-SE DE OTIMIZAR AS IMAGENS ANTES DE ENVIAR</p>
                  </div>
                }
              />
              {fileToUpload && (
                <>
                  <Button
                    className={styles['button-item-form'] + ' bg-yellow-500 w-72'}
                    onClick={() => handleUpdateImage(fileToUpload)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <p className="text-lg font-extrabold uppercase text-white text-center">
                        {image?.url ? 'ENVIAR' : 'ENVIAR'}
                      </p>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          <h2 className="text-2xl mt-14 mb-7">Imagens ({images?.length || 0})</h2>

          <div className={styles['container-images']}>
            {images?.length > 0 &&
              images.map((item: IGallery, index: number) => (
                <Card className={styles['card-image']}>
                  <CardImage
                    className={styles['img-list']}
                    key={index}
                    image={item.url}
                    onClick={() => handleDeleteConfirm(item)}
                    onClickImage={() => openImageViewer(index)}
                  />
                </Card>
              ))}
          </div>

          <div className={styles['footer-table']}>
            <span>
              <NavPagination
                infoPages={{ total: infoPages?.total, pages: infoPages?.pages }}
                currentPage={infoPages?.current_page}
              />
            </span>
          </div>
        </section>
      </MainTemplate>
      {isViewerOpen && (
        <ImageViewer
        src={images?.map((i) => i?.url)}
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
