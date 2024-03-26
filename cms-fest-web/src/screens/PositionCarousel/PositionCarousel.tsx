import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Button } from '@/components/atoms/Button/Button';
import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';

import {
  IMvPositionCarousels,
  IMvPositionProps,
} from '@/repositories/mvPositionCarouselRepository/mvPositionCarouselRepository.types';
import { MvPositionCarouselRepository } from '@/repositories/mvPositionCarouselRepository/mvPositionCarouselRepository';

import styles from './PositionCarousel.module.css';
import { Input } from '@/components/atoms/Input/Input';
import { Card } from '@/components/atoms/Card/Card';
import { Spinner } from '@/components/atoms/Spinner/Spinner';

export const PositionCarousel: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const mvPositionCarouselRepository = new MvPositionCarouselRepository();

  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState<boolean>(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false);

  const [infoPages, setInfoPages] = useState({} as Partial<IMvPositionProps>);
  const [listPositionCarousels, setListPositionCarousels] = useState<IMvPositionCarousels[]>([]);
  const [positionCarousel, setPositionCarousel] = useState<IMvPositionCarousels>();
  const [valuePosition, setValuePosition] = useState<string | null>();
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getListData = async () => {
    try {
      const data = await mvPositionCarouselRepository.listAll('', pageQuery || '1');
      setListPositionCarousels(data?.data);
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

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleEditConfirm = (value: IMvPositionCarousels) => {
    setValuePosition(value.position);
    setPositionCarousel(value);
    setModalEditIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await mvPositionCarouselRepository?.delete(uuidItemToDelete);
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

  const handleRegisterPosition = async () => {
    try {
      setLoadingActions(true);
      setModalCreateIsOpen(false);

      await mvPositionCarouselRepository.create(valuePosition);

      setValuePosition('');
      setLoadingActions(false);
      toast.success('Registro criado com sucesso.');
      getListData();
    } catch (error) {
      toast.error('Não é possivel criar posição');
    } finally {
      setValuePosition('');
      setDialogConfirmIsOpen(false);
      setLoadingActions(false);
    }
  };

  const handleEditPosition = async () => {
    try {
      setLoadingActions(true);

      positionCarousel.position = valuePosition;

      await mvPositionCarouselRepository.update(positionCarousel.uuid, positionCarousel);

      setValuePosition('');
      setModalEditIsOpen(false);
      setLoadingActions(false);
      toast.success('Registro atualizado com sucesso.');
      getListData();
    } catch (error) {
      toast.error('Não é possivel atualizar posição');
    } finally {
      setValuePosition('');
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
        alert={'Ao excluir esse registro o carousel será excluído'}
        onConfirm={handleDeleteRegister}
        customCssContainer={{ minHeight: 250, heigth: 'auto'}}
        className={'sm:h-[300px]'}
        onClose={() => {
          setDialogConfirmIsOpen(false), setValuePosition('');
        }}
      />

      <DialogConfirm
        isOpen={modalCreateIsOpen}
        title={'Cadastrar Posição'}
        loading={loadingActions}
        onConfirm={handleRegisterPosition}
        onClose={() => {
          setModalCreateIsOpen(false), setValuePosition('');
        }}
      >
        <div className={styles['header-dialog']}>
          <h2>CADASTRAR POSIÇÃO</h2>
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valuePosition}
            onChange={({ target }) => setValuePosition(target.value)}
            placeholder="Digite o nome da posição"
            label="Nome da Posição"
          />

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
            onClick={handleRegisterPosition}
          >
            {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => {
              setModalCreateIsOpen(false), setValuePosition('');
            }}
          >
            Voltar
          </button>
        </div>
      </DialogConfirm>

      <DialogConfirm
        isOpen={modalEditIsOpen}
        title={'Editar Posição'}
        loading={loadingActions}
        onConfirm={handleEditPosition}
        onClose={() => setModalEditIsOpen(false)}
      >
        <div className={styles['header-dialog']}>
          <h2>EDITAR POSIÇÃO</h2>
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valuePosition}
            onChange={({ target }) => setValuePosition(target.value)}
            placeholder="Digite o nome da posição"
            label="Nome da Posição"
          />

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
            onClick={handleEditPosition}
          >
            {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => setModalEditIsOpen(false)}
          >
            Voltar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Posições Carousels</h3>
          <Button className="w-56 sm:w-12" onClick={() => setModalCreateIsOpen(true)}>
            <FiPlus size={24} color="#F8F8FF" />
            <span className="sm:hidden"> Adicionar Posição </span>
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
            {Boolean(listPositionCarousels?.length) &&
              listPositionCarousels.map((item: IMvPositionCarousels, index) => (
                <Card customCssContainer={{ marginBottom: 12 }}>
                  <div key={index} className={styles['list-item']}>
                    <h2>{item.position}</h2>
                    <div className={styles['list-item-option']}>
                      <Button onClick={() => handleEditConfirm(item)}>
                        <FiEdit size={20} color="#383d49" />
                      </Button>
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
