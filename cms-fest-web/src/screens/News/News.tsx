import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import PATHS from '@/routes/paths';
import toast from 'react-hot-toast';

import styles from './News.module.css';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { Button } from '@/components/atoms/Button/Button';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';

import { NewsRepository } from '@/repositories/newsRepository/newsRepository';
import { INews } from '@/repositories/newsRepository/newsRepository.types';
import { Card } from '@/components/atoms/Card/Card';
import { ThreeDots } from 'react-loader-spinner';

export const News: React.FC = () => {
  const newsRepository = new NewsRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);

  const [news, setNews] = useState<INews[]>([]);
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<INews['uuid']>();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await newsRepository.listAll();
      setNews(data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar Notícias');
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      setDialogConfirmIsOpen(false);
      await newsRepository?.delete(uuidItemToDelete);
      toast.success('Registro excluído com sucesso.');
      loadData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setLoadingActions(false);
      setUUIDItemToDelete(null);
    }
  };

  return (
    <MainTemplate>
      <DialogConfirm
        isOpen={dialogConfirmIsOpen}
        loading={loadingActions}
        title={'Deseja realmente excluir esse registro?'}
        alert={'Ao excluir esse registro o tipo será excluído'}
        onConfirm={handleDeleteRegister}
        customCssContainer={{ minHeight: 250, height: 'auto' }}
        className={'sm:h-[300px]'}
        onClose={() => {
          setDialogConfirmIsOpen(false);
        }}
      />
      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3> Notícias</h3>
          <NavLink to={PATHS?.news?.create}>
            <Button className="w-52 sm:w-12">
              <FiPlus size={24} color="#F8F8FF" />
              <span className="sm:hidden"> Adicionar Notícia</span>
            </Button>
          </NavLink>
        </div>
      </section>

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
          {Boolean(news?.length) &&
            news.map((item: INews, index) => (
              <Card customCssContainer={{ marginBottom: 12}}>
                <div key={index} className={styles['list-item']}>
                  <h2>{item.title}</h2>
                  <div className={styles['list-item-option']}>
                    <NavLink to={PATHS?.news?.edit + '/' + item.slug}>
                      <Button>
                        <FiEdit size={20} color="#383d49" />
                      </Button>
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
    </MainTemplate>
  );
};
