import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { LiveRepository } from '@/repositories/liveRepository/liveRepository';
import { ILive } from '@/repositories/liveRepository/liveRepository.types';

import styles from './Live.module.css';
import { Button } from '@/components/atoms/Button/Button';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';

import { Input } from '@/components/atoms/Input/Input';
import { isValidUrl } from '@/utils/urlValid';
import { ThreeDots } from 'react-loader-spinner';
import { Card } from '@/components/atoms/Card/Card';
import { Spinner } from '@/components/atoms/Spinner/Spinner';

export const Live: React.FC = () => {
  const liveRepository = new LiveRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState<boolean>();
  const [isNew, setIsNew] = useState<boolean>(true);

  const [lives, setLives] = useState<ILive[]>([]);
  const [live, setLive] = useState<ILive>();
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<ILive['uuid']>();

  const [valueTitle, setValueTitle] = useState<string>();
  const [valueURL, setValueURL] = useState<string>();
  const [valueDate, setValueDate] = useState<string>();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await liveRepository.listAll();
      setLives(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar Lives');
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleEditConfirm = (value: ILive) => {
    setValueURL(value.url_live);
    setValueTitle(value.title);
    setValueDate(new Date(value.date).toISOString().slice(0, 16));
    setLive(value);
    setIsNew(false);
    setModalCreateIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      setDialogConfirmIsOpen(false);
      await liveRepository?.delete(uuidItemToDelete);
      toast.success('Registro excluído com sucesso.');
      loadData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setLoadingActions(false);
      setUUIDItemToDelete(null);
    }
  };

  const handleRegisterLive = async () => {
    try {
      setLoadingActions(false);

      if (!valueURL || !valueDate || !valueTitle) return toast.error('Preencha os campos');

      if (!isValidUrl(valueURL)) {
        return toast.error('Digite uma URL válida');
      }

      const obj = {
        title: valueTitle,
        date: valueDate,
        url_live: valueURL,
      };

      await liveRepository.create(obj);
      setValueURL('');
      setValueDate('');
      setValueTitle('');
      setModalCreateIsOpen(false);
      toast.success('Registro criado com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel criar live');
    } finally {
      setLoadingActions(false);
    }
  };

  const handleEditLive = async () => {
    try {
      if (!valueURL || !valueDate || !live.uuid || !valueTitle) return toast.error('Preencha os campos');

      if (!isValidUrl(valueURL)) {
        return toast.error('Digite uma URL válida');
      }

      const obj = {
        title: valueTitle,
        date: valueDate,
        url_live: valueURL,
      };

      await liveRepository.update(live.uuid, obj);

      setModalCreateIsOpen(false);
      setLoading(true);
      setValueURL('');
      setValueDate('');
      setValueTitle('');
      setIsNew(true);

      toast.success('Registro atualizado com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel atualizar live');
    } finally {
      setLoadingActions(false);
    }
  };

  return (
    <MainTemplate>
      <DialogConfirm
        isOpen={dialogConfirmIsOpen}
        loading={loadingActions}
        title={'Deseja realmente excluir esse registro?'}
        alert={'Ao excluir esse registro a live será excluída'}
        className={'sm:h-[300px]'}
        onConfirm={handleDeleteRegister}
        customCssContainer={{ minHeight: 250, height: 'auto' }}
        onClose={() => {
          setDialogConfirmIsOpen(false);
        }}
      />
      <DialogConfirm
        customCssContainer={{ height: 380 }}
        isOpen={modalCreateIsOpen}
        title={isNew ? 'Cadastrar Live' : 'Editar Live'}
        loading={loadingActions}
        onConfirm={isNew ? handleRegisterLive : handleEditLive}
        onClose={() => {
          setModalCreateIsOpen(false);
          setIsNew(true);
          setValueURL('');
          setValueDate('');
          setValueTitle('');
        }}
      >
        <div className={styles['header-dialog']}>
          <h2> {isNew ? 'CADASTRAR LIVE' : 'EDITAR LIVE'}</h2>
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valueTitle}
            onChange={({ target }) => setValueTitle(target.value)}
            placeholder="Titulo da Live"
            label="Titulo"
          />
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valueURL}
            onChange={({ target }) => setValueURL(target.value)}
            placeholder="Digite a URL"
            label="URL"
          />
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="datetime-local"
            value={valueDate}
            onChange={({ target }) => setValueDate(target.value)}
            placeholder="Escolha a Data"
            label="Escolha a Data"
          />

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
            onClick={isNew ? handleRegisterLive : handleEditLive}
          >
            {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => {
              setModalCreateIsOpen(false);
              setIsNew(true);
              setValueURL('');
              setValueDate('');
              setValueTitle('');
            }}
          >
            Voltar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Lives</h3>
          <Button className="w-48 sm:w-12" onClick={() => setModalCreateIsOpen(true)}>
            <FiPlus size={24} color="#F8F8FF" />
            <span className="sm:hidden"> Adicionar Live</span>
          </Button>
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
          {Boolean(lives?.length) &&
            lives.map((item: ILive, index) => (
              <Card customCssContainer={{ marginBottom: 12 }}>
                <div key={index} className={styles['list-item']}>
                  <span className="flex flex-col">
                    <h2>{item.title}</h2>
                    <p>
                      {new Date(item.date)
                        .toLocaleString('pt-BR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                        .replace(/\//g, '-')
                        .replace(',', '')}
                    </p>
                  </span>
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
    </MainTemplate>
  );
};
