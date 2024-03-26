import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { FiChevronLeft, FiEdit, FiSave } from 'react-icons/fi';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';

import styles from './Profile.module.css';

import { IDataOwner } from '@/repositories/ownerRepository/OwnerRepository.types';
import { OwnerRepository } from '@/repositories/ownerRepository/OwnerRepository';

import * as Yup from 'yup';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatPhoneNumber } from '@/utils/format';

import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';

export const Profile: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const dataOwnerRepository = new OwnerRepository();

  const [loading, setLoading] = useState(true);
  const [dataOwner, setDataOwner] = useState<IDataOwner>();
  const [editMode, setEditMode] = useState(false);

  const [fileToUpload, setFileToUpload] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    fullname: Yup.string().required('O Nome Completo é obrigatório'),
    responsible: Yup.string().required('O Responsável é obrigatório'),
    email: Yup.string().email('Deve ser um email').required('O E-mail é obrigatório'),
    phone: Yup.string().required('O Telefone é obrigatório'),
    whatsapp: Yup.string().required('O Whatsapp é obrigatório'),
    address01: Yup.string().required('O Endereço é obrigatório'),
    address02: Yup.string(),
    number: Yup.number().required('O Número é obrigatório'),
    city: Yup.string().required('A Cidade é obrigatório'),
    state: Yup.string().required('O Estado é obrigatório'),
    cep: Yup.string().required('O CEP é obrigatório'),
    title: Yup.string().required('O Título é obrigatório'),
    description: Yup.string().required('O Descrição é obrigatório'),
    youtube: Yup.string(),
    instagram: Yup.string(),
    facebook: Yup.string(),
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
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getListData = async () => {
    try {
      const data = await dataOwnerRepository.list();
      setDataOwner(data);
      populateForm(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const populateForm = (data: IDataOwner) => {
    setValue('name', data?.name);
    setValue('fullname', data?.fullname);
    setValue('responsible', data?.responsible);
    setValue('email', data?.email);
    setValue('phone', formatPhoneNumber(data?.phone));
    setValue('whatsapp', formatPhoneNumber(data?.whatsapp));
    setValue('address01', data?.address01);
    setValue('address02', data?.address02);
    setValue('number', data?.number);
    setValue('city', data?.city);
    setValue('state', data?.state);
    setValue('cep', data?.cep);
    setValue('title', data?.title);
    setValue('description', data?.description);
    setValue('youtube', data?.youtube);
    setValue('instagram', data?.instagram);
    setValue('facebook', data?.facebook);
  };

  const onSubmit = async (values: IDataOwner) => {
    if (loading) return;
    try {
      setLoading(true);
      await dataOwnerRepository.update(dataOwner?._id, values);
      toast.success('Perfil atualizado com sucesso!');
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Falha ao atualizar registro.');
    }
  };

  const handleUpdateLogo = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await dataOwnerRepository.updateLogo(dataOwner?._id, formData);
      setDataOwner(response);

      toast.success('Imagem atualizada com sucesso.');
    } catch (error) {
      if (error.response.data.name == 'fileSizeError') {
        return toast.error('Tamanho do arquivo é maior que o permitido');
      }
      toast.error('Falha ao atualizar imagem.');
    }
    setLoading(false);
  };

  return (
    <MainTemplate>
      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Perfil</h3>
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
          <div className={styles['container-itens']}>
            <div className={styles['list-item']}>
              <DropZoneImage hasFile={dataOwner?.logo} handleFile={(file) => setFileToUpload(file)} />
              {fileToUpload && (
                <div>
                  <Button
                    className={styles['button-item-form'] + ' bg-green-500'}
                    onClick={() => handleUpdateLogo(fileToUpload)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <p className="text-sm font-bold uppercase text-white ml-2 text-center">
                        {dataOwner?.logo ? 'Atualizar Imagem' : 'Salvar Imagem'}
                      </p>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className={styles['list-data']}>
              <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <FiEdit size={20} color="#383d49" onClick={() => setEditMode(true)} />
                <div className={styles['wrapper-inputs']}>
                  <Input
                    {...register('name')}
                    helperText={errors?.name ? errors?.name.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('name')}
                    onChange={({ target }) => setValue('name', target.value)}
                    placeholder="Nome"
                    label="Nome"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('fullname')}
                    helperText={errors?.fullname ? errors?.fullname.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('fullname')}
                    onChange={({ target }) => setValue('fullname', target.value)}
                    placeholder="Nome Completo"
                    label="Nome Completo"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('responsible')}
                    helperText={errors?.responsible ? errors?.responsible.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('responsible')}
                    onChange={({ target }) => setValue('responsible', target.value)}
                    placeholder="Responsável"
                    label="Responsável"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('email')}
                    helperText={errors?.email ? errors?.email.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('email')}
                    onChange={({ target }) => setValue('email', target.value)}
                    placeholder="E-mail"
                    label="E-mail"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('phone')}
                    helperText={errors?.phone ? errors?.phone.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('phone')}
                    onChange={({ target }) => setValue('phone', formatPhoneNumber(target.value))}
                    placeholder="Telefone"
                    label="Telefone"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('whatsapp')}
                    helperText={errors?.whatsapp ? errors?.whatsapp.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('whatsapp')}
                    onChange={({ target }) => setValue('whatsapp', formatPhoneNumber(target.value))}
                    placeholder="Whatsapp"
                    label="Whatsapp"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('address01')}
                    helperText={errors?.address01 ? errors?.address01.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('address01')}
                    onChange={({ target }) => setValue('address01', target.value)}
                    placeholder="Endereço"
                    label="Endereço"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('number')}
                    helperText={errors?.number ? errors?.number.message : null}
                    customCssContainer={{ marginBottom: 30, width: 50 }}
                    type="number"
                    value={getValues('number')}
                    onChange={({ target }) => setValue('number', Number(target.value))}
                    placeholder="Número"
                    label="Número"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('address02')}
                    helperText={errors?.address02 ? errors?.address02.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('address02')}
                    onChange={({ target }) => setValue('address02', target.value)}
                    placeholder="Endereço Secundário"
                    label="Endereço Secundário"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('state')}
                    helperText={errors?.state ? errors?.state.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('state')}
                    onChange={({ target }) => setValue('state', target.value)}
                    placeholder="Estado"
                    label="Estado"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('city')}
                    helperText={errors?.city ? errors?.city.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('city')}
                    onChange={({ target }) => setValue('city', target.value)}
                    placeholder="Cidade"
                    label="Cidade"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('cep')}
                    helperText={errors?.cep ? errors?.cep.message : null}
                    customCssContainer={{ marginBottom: 30, width: 250 }}
                    type="text"
                    value={getValues('cep')}
                    onChange={({ target }) => setValue('cep', target.value)}
                    placeholder="CEP"
                    label="CEP"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('title')}
                    helperText={errors?.title ? errors?.title.message : null}
                    customCssContainer={{ marginBottom: 30, width: 300 }}
                    type="text"
                    value={getValues('title')}
                    onChange={({ target }) => setValue('title', target.value)}
                    placeholder="Título"
                    label="Título"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('description')}
                    helperText={errors?.description ? errors?.description.message : null}
                    customCssContainer={{ marginBottom: 30, width: 300 }}
                    type="text"
                    value={getValues('description')}
                    onChange={({ target }) => setValue('description', target.value)}
                    placeholder="Descrição"
                    label="Descrição"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('youtube')}
                    helperText={errors?.youtube ? errors?.youtube.message : null}
                    customCssContainer={{ marginBottom: 30, width: 300 }}
                    type="text"
                    value={getValues('youtube')}
                    onChange={({ target }) => setValue('youtube', target.value)}
                    placeholder="YouTube"
                    label="YouTube"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('instagram')}
                    helperText={errors?.instagram ? errors?.instagram.message : null}
                    customCssContainer={{ marginBottom: 30, width: 300 }}
                    type="text"
                    value={getValues('instagram')}
                    onChange={({ target }) => setValue('instagram', target.value)}
                    placeholder="Instagram"
                    label="Instagram"
                    disabled={editMode ? false : true}
                  />

                  <Input
                    {...register('facebook')}
                    helperText={errors?.facebook ? errors?.facebook.message : null}
                    customCssContainer={{ marginBottom: 30, width: 300 }}
                    type="text"
                    value={getValues('facebook')}
                    onChange={({ target }) => setValue('facebook', target.value)}
                    placeholder="Facebook"
                    label="Facebook"
                    disabled={editMode ? false : true}
                  />
                </div>

                {editMode && (
                  <div className={styles['buttons-form']}>
                    <Button className={styles['button-item-form'] + ' bg-green-500'} submit>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          <FiSave size={24} color="#F8F8FF" />
                          <p className="text-white ml-2">Atualizar</p>
                        </>
                      )}
                    </Button>
                    <Button className={styles['button-item-form'] + ' bg-gray-500'} onClick={() => setEditMode(false)}>
                      <FiChevronLeft size={24} color="#F8F8FF" />
                      <p className="text-white ml-2">Cancelar</p>
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </section>
    </MainTemplate>
  );
};
