import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';

import { Button } from '@/components/atoms/Button/Button';

import styles from './TypeSponsors.module.css';

import { TypesSponsorsRepository } from '@/repositories/typeSponsorRepository/typeSponsorsRepository';
import { ITypeSponsors } from '@/repositories/typeSponsorRepository/typeSponsorsRepository.types';
import toast from 'react-hot-toast';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Input } from '@/components/atoms/Input/Input';
import { Card } from '@/components/atoms/Card/Card';
import { ThreeDots } from 'react-loader-spinner';

const TypeSponsors: React.FC = () => {
  const typesSponsorsRepository = new TypesSponsorsRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [dialogConfirmIsOpen, setDialogConfirmIsOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);

  const [typesSponsors, setTypesSponsors] = useState<ITypeSponsors[]>([]);
  const [typeSponsor, setTypeSponsor] = useState<ITypeSponsors>();
  const [uuidItemToDelete, setUUIDItemToDelete] = useState<ITypeSponsors['uuid']>();

  const [valueName, setValueName] = useState<string>();
  const [valueOrder, setValueOrder] = useState<number>(0);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await typesSponsorsRepository.listAll();
      setTypesSponsors(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar Tipos');
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setUUIDItemToDelete(id);
    setDialogConfirmIsOpen(true);
  };

  const handleEditConfirm = (value: ITypeSponsors) => {
    setValueName(value.name);
    setValueOrder(value.order);
    setTypeSponsor(value);
    setIsNew(false);
    setModalIsOpen(true);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoadingActions(true);
      setDialogConfirmIsOpen(false);
      await typesSponsorsRepository?.delete(uuidItemToDelete);
      toast.success('Registro excluído com sucesso.');
      loadData();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setLoadingActions(false);
      setUUIDItemToDelete(null);
    }
  };

  const handleRegisterTypesSponsors = async () => {
    try {
      setLoadingActions(false);

      if (!valueName) return toast.error('Preencha o campo Nome');

      await typesSponsorsRepository.create({ name: valueName });
      setValueName('');
      setValueOrder(0);
      setModalIsOpen(false);
      toast.success('Registro criado com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel criar o tipo');
    } finally {
      setLoadingActions(false);
    }
  };

  const handleEditTypesSponsors = async () => {
    try {
      if (!valueName) return toast.error('Preencha o campo Nome');

      await typesSponsorsRepository.update(typeSponsor.uuid, { name: valueName, order: valueOrder});

      setValueName('');
      setValueOrder(0);
      setModalIsOpen(false);
      setLoading(true);
      setIsNew(true);

      toast.success('Registro atualizado com sucesso.');
      loadData();
    } catch (error) {
      toast.error('Não é possivel atualizar o tipo');
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
        alert={'Ao excluir esse registro o tipo será excluído'}
        onConfirm={handleDeleteRegister}
        customCssContainer={{ minHeight: 250, heigth: 'auto'}}
        className={'sm:h-[300px]'}
        onClose={() => {
          setDialogConfirmIsOpen(false);
        }}
      />
      <DialogConfirm
        customCssContainer={{ height: 280 }}
        isOpen={modalIsOpen}
        title={isNew ? 'Cadastrar Tipos de Patrocinadores' : 'Editar Tipos de Patrocinadores'}
        loading={loadingActions}
        onConfirm={isNew ? handleRegisterTypesSponsors : handleEditTypesSponsors}
        onClose={() => {
          setModalIsOpen(false);
          setIsNew(true);
          setValueName('');
          setValueOrder(0);
        }}
      >
        <div className={styles['header-dialog']}>
          <h2> {isNew ? 'CADASTRAR TIPOS DE PATROCINADORES' : 'EDITAR TIPOS DE PATROCINADORES'}</h2>
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="text"
            value={valueName}
            onChange={({ target }) => setValueName(target.value)}
            placeholder="Tipo"
            label="Nome do Tipo"
          />
          <Input
            customCssContainer={{ marginBottom: 15, marginTop: 12 }}
            type="number"
            value={valueOrder}
            onChange={({ target }) => setValueOrder(Number(target.value))}
            placeholder="Ordem"
            label="Ordem"
          />

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
            onClick={isNew ? handleRegisterTypesSponsors : handleEditTypesSponsors}
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
              setValueName('');
              setValueOrder(0);
            }}
          >
            Voltar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Tipos Patrocinadores</h3>
          <Button
            className="w-48 sm:w-12"
            onClick={() => {
              setIsNew(true), setModalIsOpen(true);
            }}
          >
            <FiPlus size={24} color="#F8F8FF" />
            <span className="sm:hidden"> Adicionar Tipo </span>
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
          {Boolean(typesSponsors?.length) &&
            typesSponsors.map((item: ITypeSponsors, index) => (
              <Card customCssContainer={{ marginBottom: 12 }}>
                <div key={index} className={styles['list-item']}>
                    <h2>{item.name}</h2>
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

export default TypeSponsors;
