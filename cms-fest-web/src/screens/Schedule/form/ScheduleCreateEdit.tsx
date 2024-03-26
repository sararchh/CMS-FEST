/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft, FiSave } from 'react-icons/fi';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { ScheduleRepository } from '@/repositories/scheduleRepository/scheduleRepository';
import { ISchedule } from '@/repositories/scheduleRepository/scheduleRepository.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { Input } from '@/components/atoms/Input/Input';
import { SelectComponent } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Card } from '@/components/atoms/Card/Card';
import styles from './ScheduleCreateEdit.module.css';
// import { normalizeStringWithSpecialCaracteres } from '@/utils/string';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';

export const ScheduleCreateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mvScheduleRepository = new ScheduleRepository();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingActions] = useState(false);

  const [registerEdit, setRegisterEdit] = useState<ISchedule | any>({} as any);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);

  const validationSchema = Yup.object().shape({
    day: Yup.string().required('O dia é obrigatório'),
    order: Yup.number().required('A ordem é obrigatória'),
    status: Yup.number(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm(formOptions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watch = useWatch({
    control,
  });

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getDataByid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getDataByid = async () => {
    try {
      setLoading(true);
      const data = await mvScheduleRepository.listOne(id);

      const [day, month, year] = data.day.split('/');
      data.day = `${year}-${month}-${day}`;

      setRegisterEdit(data);
      populateForm(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const populateForm = (data: ISchedule) => {
    setValue('day', data.day);
    setValue('order', data.order);
    setValue('status', data?.status);
    setItems(data.items);
  };

  const clearForm = () => {
    setValue('day', '');
    setValue('order', 0);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    let finalString;

    // const regex = /^(\d{2})(\d{2})\s*([A-Za-z0-9 ]+)$/;
    // const regex = /^(\d{2})(\d{2})\s*([\p{L}\p{N} ]+)$/u;
    const regex = /^(\d{2})(\d{2})\s*([\p{L}\p{N} ]+)-([\p{L}\p{N} ]+)-([\p{L}\p{N} ]+)$/u;

    const match = value.match(regex);

    if (match) {
      const hour = match[1];
      const minute = match[2];
      const title = match[3];
      const locale = match[4];
      const description = match[5];

      finalString = `${hour}:${minute} - ${title} - ${locale} - ${description}`;
    }

    setItem(finalString);
  };

  const handleAddItem = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value;
      const [time, title, locale, description] = value.split('-');
      if (time && title && locale && description) {
        setItems((currentItems) => [...currentItems, { time, title, locale, description }]);
        setItem('');
      }
    }
  };

  const formatDate = (inputDate: string) => {
    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (values) => {
    if (loading) return;
    try {
      setLoading(true);

      if (items.length === 0) {
        setLoading(false);
        return toast.error('Preencha todos os campos');
      }

      values.day = formatDate(values.day);

      if (editMode) {
        await mvScheduleRepository.update(registerEdit?.uuid, { ...values, items });
        toast.success('Programação atualizada com sucesso!');
      } else {
        await mvScheduleRepository.create({ ...values, items });
        toast.success('Programação cadastrada com sucesso!');
      }

      clearForm();
      navigate(-1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Ocorreu um erro ao registrar');
    }
  };

  const removeItem = (indexToRemove) => {
    if (indexToRemove == '-1') {
      indexToRemove = 0;
    }
    setItems((currentItems) => currentItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <MainTemplate>
      <DialogConfirm
        isOpen={modalIsOpen}
        title={'Items'}
        loading={loadingActions}
        customCssContainer={{ height: 'auto' }}
        className={styles['dialog-items']}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className={styles['dialog']}>
          <h2>ITENS</h2>

          <div>
            {Boolean(items?.length) &&
              items.map((item, index) => (
                <div key={index} className={styles['chip']}>
                  <span>
                  {item?.time} - {item?.title} - {item?.locale} - {item?.description}
                  </span>
                  <button onClick={() => removeItem(index)}>X</button>
                </div>
              ))}
          </div>

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 w-36 bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => setModalIsOpen(false)}
          >
            Fechar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <Card>
          <h2 className="text-2xl font-bold mb-5 ml-6 mt-3">
            {editMode ? 'Editar Programação do Evento' : 'Cadastrar de Programação do Evento'}
          </h2>
          <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['wrapper-inputs']}>
              <Input
                {...register('day')}
                helperText={errors?.day ? errors?.day.message : null}
                customCssContainer={{ marginBottom: 30, width: 250 }}
                type="date"
                value={getValues('day')}
                onChange={({ target }) => setValue('day', target.value)}
                placeholder="Data"
                label="Data"
              />
              <Input
                {...register('order')}
                helperText={errors?.order ? errors?.order.message : null}
                customCssContainer={{ marginBottom: 30, width: 250 }}
                type="number"
                value={getValues('order')}
                onChange={({ target }) => setValue('order', Number(target.value))}
                placeholder="Ordem"
                label="Ordem"
              />
              <SelectComponent
                helperText={null}
                className="min-w-[250px] mr-2 mb-6"
                name={'status'}
                label="Status"
                value={getValues('status')?.toString()}
                options={[
                  { value: '1', text: 'Ativo' },
                  { value: '0', text: 'Inativo' },
                  { value: '2', text: 'Deletado' },
                ]}
                onChange={(value: string) => {
                  setValue('status', Number(value));
                }}
              />

              <div>
                <Input
                  customCssContainer={{ marginBottom: 10, width: 308 }}
                  type="text"
                  value={item}
                  onChange={handleChange}
                  onKeyDown={handleAddItem}
                  placeholder="Ex: 10:54-Título-Local-Descrição"
                  label="Itens"
                />

                <div className={styles['items-chips']}>
                  {Boolean(items?.length) &&
                    items.slice(-2).map((item: ISchedule['items'][0], index) => (
                      <div key={index} className={styles['chip']}>
                        <span>
                          {item?.time} - {item?.title}
                        </span>
                        <button type="button" onClick={() => removeItem(items.length - 2 + index)}>
                          X
                        </button>
                      </div>
                    ))}
                  {items?.length > 2 && (
                    <Button
                      className="bg-transparent w-20 p-0 text-green-600 text-sm"
                      onClick={() => setModalIsOpen(true)}
                    >
                      Ver mais
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles['buttons-form']}>
                <Button className={styles['button-item-form'] + ' bg-green-500'} submit>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <FiSave size={24} color="#F8F8FF" />
                      <p className="text-white ml-2">{editMode ? 'Atualizar' : 'Salvar'}</p>
                    </>
                  )}
                </Button>
                <Button className={styles['button-item-form'] + ' bg-gray-500'} onClick={() => navigate(-1)}>
                  <FiChevronLeft size={24} color="#F8F8FF" />
                  <p className="text-white ml-2">Voltar</p>
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </section>
    </MainTemplate>
  );
};
