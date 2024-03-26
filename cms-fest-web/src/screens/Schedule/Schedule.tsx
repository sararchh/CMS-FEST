import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Button } from '@/components/atoms/Button/Button';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { Card } from '@/components/atoms/Card/Card';
import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';

import { ThreeDots } from 'react-loader-spinner';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import { ScheduleRepository } from '@/repositories/scheduleRepository/scheduleRepository';
import { ISchedule, IScheduleProps } from '@/repositories/scheduleRepository/scheduleRepository.types';

import styles from './Schedule.module.css';
import PATHS from '@/routes/paths';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import toast from 'react-hot-toast';

export const Schedule = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const mvScheduleRepository = new ScheduleRepository();

  const [loading, setLoading] = useState(true);
  const [infoPages, setInfoPages] = useState({} as Partial<IScheduleProps>);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  const [modalDialogConfirmIsOpen, setModalDialogConfirmIsOpen] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [uuidItemToDelete, setUuidItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const handleDeleteConfirm = (id: string) => {
    setUuidItemToDelete(id);
    setModalDialogConfirmIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      await mvScheduleRepository?.delete(uuidItemToDelete);
      toast.success('Registro excluído com sucesso.');
      getListData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setModalDialogConfirmIsOpen(false);
      setLoadingActions(false);
      setUuidItemToDelete(null);
    }
  };

  const getListData = async () => {
    try {
      const data = await mvScheduleRepository.listAll('', pageQuery || '1');
      setSchedules(data?.data);
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
          <h3>Programações do Evento</h3>
          <NavLink to={PATHS?.schedule?.create}>
            <Button className='sm:w-12'>
              <FiPlus size={24} color="#F8F8FF" />
              <span className="sm:hidden"> Adicionar Evento </span>
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
          <>
            <div className={styles['list-data']}>
              {Boolean(schedules?.length) &&
                schedules.map((item: ISchedule, index) => (
                  <Card customCssContainer={{ marginBottom: 12 }}>
                    <div key={index} className={styles['list-item']}>
                      <h2>{item.day}</h2>
                      <div className={styles['list-item-option']}>
                        <NavLink to={PATHS?.schedule?.edit + `/${item?.uuid}`}>
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
          </>
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
