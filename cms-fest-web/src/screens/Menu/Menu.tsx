import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Button } from '@/components/atoms/Button/Button';

import { IMenu } from '@/repositories/menuRepository/menuRepository.types';
import { MenuRepository } from '@/repositories/menuRepository/menuRepository';

import styles from './Menu.module.css';
import { CardImage } from '@/components/molecules/CardImage/CardImage';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Card } from '@/components/atoms/Card/Card';

import ImageViewer from 'react-simple-image-viewer';

export const Menu: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const menuRepository = new MenuRepository();

  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);

  const [listMenu, setListMenu] = useState<IMenu[]>([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<string | null>(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getListData = async () => {
    try {
      const data = await menuRepository.list();
      setListMenu(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCreateMenu = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      await menuRepository.create(formData);
      setFileToUpload(null);
      getListData();
      toast.success('Menu criado com sucesso.');
    } catch (error) {
      if (error.response.data.name == 'fileSizeError') {
        return toast.error('Tamanho do arquivo é maior que o permitido');
      }
      toast.error('Falha ao criar menu.');
    }
    setLoading(false);
  };

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await menuRepository?.delete(uuidItemToDelete);
      toast.success('Registro excluído com sucesso.');
      getListData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setDialogConfirmIsOpen(false);
      setLoadingActions(false);
      setUUIDItemToDelete(null);
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
      <MainTemplate>
        <DialogConfirm
          isOpen={dialogConfirmIsOpen}
          loading={loadingActions}
          title={'Deseja realmente excluir esse registro?'}
          onConfirm={handleDeleteRegister}
          onClose={() => {
            setDialogConfirmIsOpen(false);
          }}
        />
        <section className={styles['container']}>
          <div className={styles['header-content']}>
            <h3>Cardápios</h3>
          </div>

          <>
            <div className={styles['container-images']}>
              <div className={styles['list-item']}>
                <DropZoneImage
                  className={styles['dropzone']}
                  hasFile={fileToUpload}
                  handleFile={(file) => setFileToUpload(file)}
                />
                {fileToUpload && (
                  <div>
                    <Button
                      className={styles['button-item-form'] + ' bg-green-500'}
                      onClick={() => handleCreateMenu(fileToUpload)}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <p className="text-sm font-bold uppercase text-white ml-2 text-center">
                          {fileToUpload ? 'Enviar Imagem' : 'Enviar Imagem'}
                        </p>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <Card
                customCssContainer={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  gap: 15,
                  justifyContent: 'center',
                  minHeight: 348,
                  width: '100%'
                }}
              >
                {!loading &&
                  listMenu.length > 0 &&
                  listMenu.map((item: IMenu, index) => (
                    <CardImage
                      className={styles['img-list']}
                      key={index}
                      image={item.url}
                      onClick={() => handleDeleteConfirm(item.uuid)}
                      onClickImage={() => openImageViewer(index)}
                    />
                  ))}

                {!loading && !listMenu.length && <p className="flex items-center">Não existe cardápio cadastrado.</p>}

                {loading && (
                  <div className={styles['center-screen']}>
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
                )}
              </Card>
            </div>
          </>
        </section>
      </MainTemplate>
      {isViewerOpen && (
        <ImageViewer
          src={listMenu?.map((i) => i?.url)}
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
