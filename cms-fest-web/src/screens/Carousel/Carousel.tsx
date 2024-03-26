import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Button } from '@/components/atoms/Button/Button';
import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';
import { InputSelect } from '@/components/atoms/InputSelect/InputSelect';

import { MvBannerRepository } from '@/repositories/mvCarouselRepository/mvCarouselRepository';
import { IMVCarouselProps, IMvCarousels } from '@/repositories/mvCarouselRepository/mvCarouselRepository.types';
import { IMvPositionCarousels } from '@/repositories/mvPositionCarouselRepository/mvPositionCarouselRepository.types';
import { MvPositionCarouselRepository } from '@/repositories/mvPositionCarouselRepository/mvPositionCarouselRepository';

import PATHS from '@/routes/paths';
import styles from './Carousel.module.css';
import { Card } from '@/components/atoms/Card/Card';

export const Carousel: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const mvCarouselRepository = new MvBannerRepository();
  const mvPositionCarouselRepository = new MvPositionCarouselRepository();

  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState<boolean>(false);

  const [infoPages, setInfoPages] = useState({} as Partial<IMVCarouselProps>);
  const [listCarousels, setListCarousels] = useState<IMvCarousels[]>([]);
  const [listPositionCarousels, setListPositionCarousels] = useState<IMvPositionCarousels[]>([]);
  const [valuePosition, setValuePosition] = useState<string | null>(null);
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  useEffect(() => {
    if (modalCreateIsOpen) {
      getListPositionCarouselsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCreateIsOpen]);

  const getListData = async () => {
    try {
      const data = await mvCarouselRepository.listAll('', pageQuery || '1');
      setListCarousels(data?.data);
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

  const getListPositionCarouselsData = async () => {
    try {
      const data = await mvPositionCarouselRepository.listAll();
      setListPositionCarousels(data?.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await mvCarouselRepository?.deleteCarousel(uuidItemToDelete);
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

  const handleRegisterCarousel = async () => {
    try {
      setLoadingActions(true);
      setModalCreateIsOpen(false);

      if (valuePosition == 'Selecione') return;

      await mvCarouselRepository.create(valuePosition);

      setLoadingActions(false);
      toast.success('Registro criado com sucesso.');
      getListData();
    } catch (error) {
      if (error.response.data.name === 'registerAlreadyExistsError') {
        toast.error('Não é possivel criar vários carousels para mesma posição');
      }
    } finally {
      setDialogConfirmIsOpen(false);
      setLoadingActions(false);
    }
  };

  return (
    <MainTemplate>
      <DialogConfirm
        isOpen={dialogConfirmIsOpen}
        loading={loadingActions}
        title={'Deseja realmente excluir esse registro?'}
        onConfirm={handleDeleteRegister}
        onClose={() => setDialogConfirmIsOpen(false)}
      />

      <DialogConfirm
        isOpen={modalCreateIsOpen}
        title={'Cadastrar Carousel'}
        loading={loadingActions}
        onConfirm={handleRegisterCarousel}
        onClose={() => setModalCreateIsOpen(false)}
      >
        <div className={styles['header-dialog']}>
          <h2>CADASTRAR CAROUSEL</h2>
          <InputSelect
            customCssContainer={{ marginBottom: 25, marginTop: 10 }}
            dataArray={listPositionCarousels}
            value={valuePosition}
            onChange={({ target }) => setValuePosition(target.value)}
          />
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Carousels</h3>
          <Button className="w-56 sm:w-12" onClick={() => setModalCreateIsOpen(true)}>
            <FiPlus size={24} color="#F8F8FF" />
            <span className="sm:hidden">Adicionar Carousel</span>
          </Button>
        </div>

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
        {!loading && (
          <div className={styles['list-data']}>
            {listCarousels.map((item: IMvCarousels, index) => (
              <Card key={index}>
                <div className={styles['list-item']}>
                  <h2>{item?.id_position?.position}</h2>
                  <div className={styles['list-item-option']}>
                    <NavLink to={PATHS?.carousel?.edit + `/${item?.uuid}`}>
                      <FiEdit size={20} color="#383d49" />
                    </NavLink>
                    <Button onClick={() => handleDeleteConfirm(item?.uuid)}>
                      <FiTrash size={20} color="#c2272c" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className={styles['footer-table']}>
          <span>
            <NavPagination
              infoPages={{ total: infoPages?.total, pages: infoPages?.pages }}
              currentPage={infoPages?.current_page}
            />
          </span>
        </div>
        <div style={{ height: 200 }} />
      </section>
    </MainTemplate>
  );
};
