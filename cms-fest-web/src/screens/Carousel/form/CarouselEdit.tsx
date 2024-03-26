import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { ImFolderUpload } from 'react-icons/im';

import styles from './CarouselEdit.module.css';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Button } from '@/components/atoms/Button/Button';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';

import { MvBannerRepository } from '@/repositories/mvCarouselRepository/mvCarouselRepository';
import { IMvCarousels } from '@/repositories/mvCarouselRepository/mvCarouselRepository.types';
import { CardImage } from '@/components/molecules/CardImage/CardImage';
import { Card } from '@/components/atoms/Card/Card';

import ImageViewer from 'react-simple-image-viewer';

export const CarouselEdit: React.FC = () => {
  const mvCarouselRepository = new MvBannerRepository();

  const { uuid } = useParams();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [modalDialogConfirmIsOpen, setModalDialogConfirmIsOpen] = useState<boolean>(false);

  const [carousel, setCarousel] = useState<IMvCarousels>();
  const [urlItemToDelete, setURLItemToDelete] = useState<string | null>(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (uuid) {
      setEditMode(true);
      getDataByid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const getDataByid = async () => {
    try {
      const data = await mvCarouselRepository.listOne(uuid);
      setCarousel(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (url: string) => {
    setURLItemToDelete(url);
    setModalDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await mvCarouselRepository?.deleteBanner(carousel.uuid, urlItemToDelete);
      toast.success('Registro excluído com sucesso.');
      getDataByid();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setModalDialogConfirmIsOpen(false);
      setLoadingActions(false);
      setURLItemToDelete(null);
    }
  };

  const handleUpdateLogo = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await mvCarouselRepository.createBanner(uuid, formData);
      setCarousel(response);
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
            <h3>{editMode ? 'Editar Carousel' : 'Cadastro de Carousel'}</h3>
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
                    <p>Proporção recomendado de 1600x800, Arquivos recomendados .JPG e .PNG.</p>
                    <p>LEMBRE-SE DE OTIMIZAR AS IMAGENS ANTES DE ENVIAR</p>
                  </div>
                }
              />
              {fileToUpload && (
                <>
                  <Button
                    className={styles['button-item-form'] + ' bg-yellow-500 w-72'}
                    onClick={() => handleUpdateLogo(fileToUpload)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <p className="text-lg font-extrabold uppercase text-white text-center">
                        {carousel?.url ? 'ENVIAR' : 'ENVIAR'}
                      </p>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          <h2 className="text-2xl mt-14 mb-7">Imagens ({carousel?.url.length || 0})</h2>

          <div className={styles['container-images']}>
            {carousel?.url &&
              carousel.url.length > 0 &&
              carousel.url.map((item: string, index: number) => (
                <Card>
                  <CardImage
                    key={index}
                    image={item}
                    onClick={() => handleDeleteConfirm(item)}
                    onClickImage={() => openImageViewer(index)}
                  />
                </Card>
              ))}
          </div>
        </section>
      </MainTemplate>

      {isViewerOpen && (
          <ImageViewer
            src={carousel.url}
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
