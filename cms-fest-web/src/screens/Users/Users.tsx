/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { NavLink, useLocation } from 'react-router-dom';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import PATHS from '@/routes/paths';

import { Button } from '@/components/atoms/Button/Button';
import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { ThreeDots } from 'react-loader-spinner';

import { UserRepository } from '@/repositories/userRepository/UserRepository';
import { UserProps } from '@/repositories/userRepository/UserRepository.types';

import styles from './Users.module.css';
import toast from 'react-hot-toast';
import { Card } from '@/components/atoms/Card/Card';

export const Users: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const userRepository = new UserRepository();

  const [loading, setLoading] = useState(true);
  const [listUsers, setListUsers] = useState<UserProps[]>([]);
  const [infoPages, setInfoPages] = useState({} as any);

  const [modalDialogConfirmIsOpen, setModalDialogConfirmIsOpen] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [idItemToDelete, setIdItemToDelete] = useState<string | any>(null);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getListData = async () => {
    try {
      const data = await userRepository.listAll('', pageQuery || '1');
      setListUsers(data?.data);
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
    setIdItemToDelete(id);
    setModalDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await userRepository?.delete(idItemToDelete);
      toast.success('Registro excluído com sucesso.');
      getListData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setModalDialogConfirmIsOpen(false);
      setLoadingActions(false);
      setIdItemToDelete(null);
    }
  };

  return (
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
          <h3>Usuários Cadastrados</h3>
          <NavLink to={PATHS?.users?.create}>
            <Button className="sm:w-12">
              <FiPlus size={24} color="#F8F8FF" />
              <span className="sm:hidden"> Adicionar Usuário </span>
            </Button>
          </NavLink>
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
            {listUsers.map((user: UserProps, index) => (
              <Card customCssContainer={{ marginBottom: 12 }}>
                <div key={index} className={styles['list-item']}>
                  <h2>{user?.name}</h2>
                  <div className={styles['list-item-option']}>
                    <NavLink to={PATHS?.users?.edit + `/${user?._id}`}>
                      <FiEdit size={20} color="#383d49" />
                    </NavLink>
                    <Button onClick={() => handleDeleteConfirm(user?._id)}>
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
