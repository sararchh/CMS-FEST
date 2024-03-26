import toast from 'react-hot-toast';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import { Button } from '@/components/atoms/Button/Button';

import styles from './Registrations.module.css';

import { RegistrationsRepository } from '@/repositories/registrationsRepository/registrationsRepository';
import { IRegistration } from '@/repositories/registrationsRepository/registrationsRepository.types';

import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Input } from '@/components/atoms/Input/Input';
import { Card } from '@/components/atoms/Card/Card';
import { ThreeDots } from 'react-loader-spinner';

export const Registrations: React.FC = () => {
  const registrationRepository = new RegistrationsRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);

  const [registrations, setRegistrations] = useState<IRegistration[]>([]);
  const [registration, setRegistration] = useState<IRegistration>();
  const [idItemToDelete, setIDItemToDelete] = useState<IRegistration['_id']>();

  const [valueTitle, setValueTitle] = useState<string>();
  const [valueLink, setValueLink] = useState<string>();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await registrationRepository.listAll();
      setRegistrations(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar Incrições');
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleEditConfirm = (value: IRegistration) => {
    setValueTitle(value.title);
    setValueLink(value.link);
    setRegistration(value);
    setIsNew(false);
    setModalIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      setDialogConfirmIsOpen(false);
      await registrationRepository?.delete(idItemToDelete);
      toast.success('Registro excluído com sucesso.');
      loadData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setLoadingActions(false);
      setIDItemToDelete(null);
    }
  };

  const handleRegister = async () => {
    try {
      setLoadingActions(false);

      if (!valueTitle) return toast.error('Preencha o campo Titulo');
      if (!valueLink) return toast.error('Preencha o campo Link');

      await registrationRepository.create({ title: valueTitle, link: valueLink});
      setValueTitle('');
      setValueLink('');
      setModalIsOpen(false);
      toast.success('Registro criado com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel criar a Incrição');
    } finally {
      setLoadingActions(false);
    }
  };

  const handleEdit = async () => {
    try {
      if (!valueTitle) return toast.error('Preencha o campo Titulo');

      await registrationRepository.update(registration._id, { title: valueTitle, link: valueLink});

      setValueTitle('');
      setValueLink('');
      setModalIsOpen(false);
      setLoading(true);
      setIsNew(true);

      toast.success('Incrição atualizada com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel atualizar a Incrição');
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
        onConfirm={handleDeleteRegister}
        customCssContainer={{ height: 250 }}
        onClose={() => {
          setDialogConfirmIsOpen(false);
        }}
      />
      <DialogConfirm
        customCssContainer={{ height: 280 }}
        isOpen={modalIsOpen}
        title={isNew ? 'Cadastrar Incrição' : 'Editar Incrição'}
        loading={loadingActions}
        onConfirm={isNew ? handleRegister : handleEdit}
        onClose={() => {
          setModalIsOpen(false);
          setIsNew(true);
          setValueTitle('');
          setValueLink('');
        }}
      >
        <div className={styles['header-dialog']}>
          <h2> {isNew ? 'CADASTRAR INSCRIÇÃO' : 'EDITAR INSCRIÇÃO'}</h2>
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valueTitle}
            onChange={({ target }) => setValueTitle(target.value)}
            placeholder="Título"
            label="Título"
          />
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valueLink}
            onChange={({ target }) => setValueLink(target.value)}
            placeholder="Link"
            label="Link"
          />

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
            onClick={isNew ? handleRegister : handleEdit}
          >
            {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => {
              setModalIsOpen(false);
              setIsNew(true);
              setValueTitle('');
              setValueLink('');
            }}
          >
            Voltar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Inscrições</h3>
          <Button
            className="w-54 sm:w-12"
            onClick={() => {
              setIsNew(true), setModalIsOpen(true);
            }}
          >
            <FiPlus size={24} color="#F8F8FF" />
            <span className="sm:hidden"> Adicionar Inscrição </span>
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
          {Boolean(registrations?.length) &&
            registrations.map((item: IRegistration, index) => (
              <Card customCssContainer={{ marginBottom: 12 }}>
                <div key={index} className={styles['list-item']}>
                    <h2>{item.title}</h2>
                  <div className={styles['list-item-option']}>
                    <Button onClick={() => handleEditConfirm(item)}>
                      <FiEdit size={20} color="#383d49" />
                    </Button>
                    <Button onClick={() => handleDeleteConfirm(item?._id)}>
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
