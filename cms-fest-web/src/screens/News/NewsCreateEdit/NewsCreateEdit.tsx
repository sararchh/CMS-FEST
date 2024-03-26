/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { ThreeDots } from 'react-loader-spinner';
import { FiChevronLeft, FiSave } from 'react-icons/fi';

import { NewsRepository } from '@/repositories/newsRepository/newsRepository';
import { INews } from '@/repositories/newsRepository/newsRepository.types';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Input } from '@/components/atoms/Input/Input';
import { SelectComponent } from '@/components/atoms/Select';
import { Card } from '@/components/atoms/Card/Card';

import styles from './NewsCreateEdit.module.css';
import PATHS from '@/routes/paths';

export const NewsCreateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const newsRepository = new NewsRepository();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [registerEdit, setRegisterEdit] = useState<INews | any>({} as any);

  const [fileToUpload, setFileToUpload] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O Título é obrigatório'),
    description: Yup.string().required('A Descrição é obrigatório'),
    date: Yup.string().required('A Data é obrigatório'),
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
    if (slug) {
      setEditMode(true);
      getDataBySlug();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const getDataBySlug = async () => {
    try {
      setLoading(true);
      const data = await newsRepository.listOne(slug);
  
      const dateObj = new Date(data.date);
  
      const formattedDate = dateObj.toISOString().split('T')[0];
  
      data.date = formattedDate;
  
      setRegisterEdit(data);
      populateForm(data);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };
  

  const populateForm = (data: INews) => {
    setValue('title', data?.title);
    setValue('description', data?.description);
    setValue('status', data?.status);
    setValue('date', data?.date);
  };

  const clearForm = () => {
    setValue('title', '');
    setValue('description', '');
    setValue('date', '');
    setValue('status', 0);
  };

  const onSubmit = async ({ title, description, status, date }) => {
    if (loading) return;
    try {
      setLoading(true);
      const values = {
        title,
        description,
        status,
        date,
      };


      if (editMode) {
        const news = await newsRepository.update(registerEdit?.uuid, values);
        setRegisterEdit(news);
        populateForm(news);
        navigate(PATHS.news.index);
        toast.success('Notícia atualizada com sucesso!');
      } else {
        const news = await newsRepository.create(values);
        setRegisterEdit(news);
        navigate(PATHS.news.edit + '/' + news?.slug);
        toast.success('Notícia cadastrada com sucesso!');
      }

      clearForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.title == 'registerAlreadyExistsError') {
        toast.error('Já existe um registro com esse titulo.');
        return;
      }
      if (editMode) {
        toast.error('Falha ao atualizar registro.');
      } else {
        toast.error('Falha ao cadastrar registro.');
      }
    }
  };

  const handleUpdateThumb = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await newsRepository.updateThumb(registerEdit?.uuid, formData);
      setRegisterEdit(response);

      toast.success('Imagem atualizada com sucesso.');
    } catch (error) {
      toast.error('Falha ao atualizar imagem.');
    }
    setLoading(false);
  };

  return (
    <MainTemplate>
      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>{editMode ? 'Atualizar Notícia' : 'Cadastrar Notícia'}</h3>
        </div>

        <div className={styles['container-itens']}>
          <Card
            customCssContainer={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className={!registerEdit._id && styles['card-img']}
          >
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
                <DropZoneImage hasFile={registerEdit?.thumb} handleFile={(file) => setFileToUpload(file)} />
                {fileToUpload && (
                  <div>
                    <Button
                      className={styles['button-item-form'] + ' bg-green-500'}
                      onClick={() => handleUpdateThumb(fileToUpload)}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <p className="text-sm font-bold uppercase text-white ml-2 text-center">
                          {registerEdit?.thumb ? 'Atualizar Imagem' : 'Salvar Imagem'}
                        </p>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </Card>

          <div className={styles['list-data']}>
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
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
                  <div className={styles['wrapper-inputs']}>
                    <Input
                      {...register('title')}
                      helperText={errors?.title ? errors?.title.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('title')}
                      onChange={({ target }) => setValue('title', target.value)}
                      placeholder="Título"
                      label="Título"
                    />

                    <Input
                      {...register('description')}
                      helperText={errors?.description ? errors?.description.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('description')}
                      onChange={({ target }) => setValue('description', target.value)}
                      placeholder="Descrição"
                      label="Descrição"
                    />

                    <Input
                      {...register('date')}
                      helperText={errors?.date ? errors?.date.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="date"
                      value={getValues('date')}
                      onChange={({ target }) => setValue('date', target.value)}
                      placeholder="Data"
                      label="Data"
                    />

                    <SelectComponent
                      helperText={null}
                      className="min-w-[250px] mr-2 mb-6 sm:min-w-[200px]"
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
                  </div>

                  <div className={styles['buttons-form']}>
                    <Button className={styles['button-item-form'] + ' bg-green-500'} submit>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          <FiSave size={24} color="#F8F8FF" />
                          <p className="text-white ml-2">{editMode ? 'Atualizar' : 'Cadastrar'}</p>
                        </>
                      )}
                    </Button>
                    <Button
                      className={styles['button-item-form'] + ' bg-gray-500'}
                      onClick={() => navigate(PATHS.news.index)}
                    >
                      <FiChevronLeft size={24} color="#F8F8FF" />
                      <p className="text-white ml-2">Cancelar</p>
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
};
