import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import PATHS from '@/routes/paths';
import toast from 'react-hot-toast';

import styles from './Sponsors.module.css';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { Button } from '@/components/atoms/Button/Button';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';

import { SponsorsRepository } from '@/repositories/sponsorRepository/sponsorRepository';
import { ISponsors } from '@/repositories/sponsorRepository/sponsorRepository.types';
import { Card } from '@/components/atoms/Card/Card';
import { ThreeDots } from 'react-loader-spinner';

export const Sponsors: React.FC = () => {
  const sponsorsRepository = new SponsorsRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);

  const [sponsors, setSponsors] = useState<ISponsors[]>([]);
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<ISponsors['uuid']>();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await sponsorsRepository.listAll();
      setSponsors(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar Tipos');
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
      await sponsorsRepository?.delete(uuidItemToDelete);
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
          <h3> Patrocinadores</h3>
          <NavLink to={PATHS?.sponsor?.create}>
            <Button className="w-64 sm:w-12">
              <FiPlus size={24} color="#F8F8FF" />
              <span className="sm:hidden">  Adicionar Patrocinador</span>
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
          {Boolean(sponsors?.length) &&
            sponsors.map((item: ISponsors, index) => (
              <Card customCssContainer={{ marginBottom: 12}}>
                <div key={index} className={styles['list-item']}>
                  <h2>{item.name}</h2>
                  <div className={styles['list-item-option']}>
                    <NavLink to={PATHS?.sponsor?.edit + '/' + item.uuid}>
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
