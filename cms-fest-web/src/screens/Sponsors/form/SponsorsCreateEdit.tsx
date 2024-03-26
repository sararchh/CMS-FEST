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

import { SponsorsRepository } from '@/repositories/sponsorRepository/sponsorRepository';
import { ISponsors } from '@/repositories/sponsorRepository/sponsorRepository.types';
import { TypesSponsorsRepository } from '@/repositories/typeSponsorRepository/typeSponsorsRepository';
import { ITypeSponsors } from '@/repositories/typeSponsorRepository/typeSponsorsRepository.types';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { DropZoneImage } from '@/components/atoms/DropZoneImage/DropZoneImage';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Input } from '@/components/atoms/Input/Input';
import { SelectComponent } from '@/components/atoms/Select';
import { Card } from '@/components/atoms/Card/Card';

import styles from './SponsorsCreateEdit.module.css';
import PATHS from '@/routes/paths';

export const SponsorsCreateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sponsorsRepository = new SponsorsRepository();
  const typesSponsorsRepository = new TypesSponsorsRepository();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [registerEdit, setRegisterEdit] = useState<ISponsors | any>({} as any);
  const [typesSponsors, setTypesSponsors] = useState<ITypeSponsors[] | []>([]);

  const [fileToUpload, setFileToUpload] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    id_type: Yup.string(),
    status: Yup.number(),
    url_site: Yup.string().required('A URL é obrigatória'),
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
    getTypesSponsors();

    if (id) {
      setEditMode(true);
      getDataByid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getDataByid = async () => {
    try {
      setLoading(true);
      const data = await sponsorsRepository.listOne(id);
      setRegisterEdit(data);
      populateForm(data);
      setLoading(false);
    } catch (error) {
      // console.log("error: ", error);
      setLoading(false);
    }
  };

  const getTypesSponsors = async () => {
    try {
      setLoading(true);
      const data = await typesSponsorsRepository.listAll();
      setTypesSponsors(data);
      setLoading(false);
    } catch (error) {
      // console.log("error: ", error);
      setLoading(false);
    }
  };

  const populateForm = (data: ISponsors) => {
    setValue('name', data?.name);
    setValue('id_type', data?.id_type);
    setValue('status', data?.status);
    setValue('url_site', data?.url_site);
  };

  const clearForm = () => {
    setValue('name', '');
    setValue('id_type', '');
    setValue('url_site', '');
  };

  const onSubmit = async ({ name, id_type, status, url_site }) => {
    if (loading) return;
    try {
      setLoading(true);
      const values = {
        name,
        id_type,
        status,
        url_site,
      };

      if (editMode) {
        const sponsor = await sponsorsRepository.update(registerEdit?.uuid, values);
        setRegisterEdit(sponsor);
        populateForm(sponsor);
        navigate(PATHS.sponsor.index);
        toast.success('Patrocinador atualizado com sucesso!');
      } else {
        const sponsor = await sponsorsRepository.create(values);
        setRegisterEdit(sponsor);
        navigate(PATHS.sponsor.edit + '/' + sponsor?.uuid);
        toast.success('Patrocinador cadastrado com sucesso!');
      }

      clearForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.name == 'registerAlreadyExistsError') {
        toast.error('Já existe um registro com esse email.');
        return;
      }
      if (editMode) {
        toast.error('Falha ao atualizar registro.');
      } else {
        toast.error('Falha ao cadastrar registro.');
      }
    }
  };

  const handleUpdateLogo = async (file) => {
    if (loading) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await sponsorsRepository.updateThumb(registerEdit?.uuid, formData);
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
          <h3>{editMode ? 'Atualizar Patrocinador' : 'Cadastrar Patrocinador'}</h3>
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
                      onClick={() => handleUpdateLogo(fileToUpload)}
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
                      {...register('name')}
                      helperText={errors?.name ? errors?.name.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('name')}
                      onChange={({ target }) => setValue('name', target.value)}
                      placeholder="Nome"
                      label="Nome"
                    />

                    <Input
                      {...register('url_site')}
                      helperText={errors?.url_site ? errors?.url_site.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('url_site')}
                      onChange={({ target }) => setValue('url_site', target.value)}
                      placeholder="URL Site"
                      label="URL Site"
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
                    <SelectComponent
                      helperText={null}
                      className="min-w-[300px] mr-2 mb-6 sm:min-w-[250px]"
                      name={'id_type'}
                      label="Tipo"
                      value={getValues('id_type')?.toString()}
                      options={typesSponsors.map((i: ITypeSponsors) => ({
                        value: i._id,
                        text: i.name,
                      }))}
                      onChange={(value: string) => setValue('id_type', value)}
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
                      onClick={() => navigate(PATHS.sponsor.index)}
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
