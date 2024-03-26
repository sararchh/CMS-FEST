/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';

import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './SectionContact.module.css';

import { OwnerRepository } from '@/repositories/ownerRepository/OwnerRepository';
import { IDataOwner } from '@/repositories/ownerRepository/OwnerRepository.types';
import { ContactsRepository } from '@/repositories/contactRepository/contactRepository';

import { Card } from '@/components/atoms/Card/Card';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { BiMailSend } from 'react-icons/bi';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMvContato } from '@/repositories/contactRepository/contactRepository.types';
import { Input } from '@/components/atoms/Input/Input';
import { TextArea } from '@/components/atoms/Textarea/Textarea';

export const SectionContact: React.FC = () => {
  const { loading } = useContext(HomeAppContext);

  const ownerRepository = new OwnerRepository();
  const contactRepository = new ContactsRepository();

  const [dataOwner, setDataOwner] = useState<IDataOwner>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    email: Yup.string().email().required('O Email é obrigatório'),
    phone: Yup.string().required('O Telefone é obrigatório'),
    subject: Yup.string().required('O Assunto é obrigatório'),
    message: Yup.string().required('A Mensagem é obrigatório'),
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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await ownerRepository.list();
      setDataOwner(data);
    } catch (error) {
      toast.error('Erro ao listar Contato');
    }
  };

  const formatAddress = (dataOwner: IDataOwner) => {
    const { address01, address02, city, cep } = dataOwner || {};
    return [address01, address02, city, cep].filter((part) => part).join(', ');
  };

  const redirectWhatsapp = (whatsapp: string) => {
    whatsapp = whatsapp.replace(/\D/g, '');
    whatsapp = `55${whatsapp}`;
    window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_blank');
  };

  const clearForm = () => {
    setValue('name', '');
    setValue('email', '');
    setValue('phone', '');
    setValue('subject', '');
    setValue('message', '');
  };

  const onSubmit = async ({ name, email, message, phone, subject }: IMvContato) => {
    if (loading) return;

    await contactRepository.create({ name, email, message, phone, subject, date: new Date() });
    toast.success('Mensagem enviada.');
    try {
      clearForm();
    } catch (error) {
      toast.error('Falha ao enviar mensagem.');
    }
  };

  return (
    <section id="contact" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={250} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <div className="flex flex-row">
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
            <SkeletonBase>
              <Skeleton width={220} height={300} style={{ marginRight: 30 }} />
            </SkeletonBase>
          </div>
          <div className="mt-12">
            <SkeletonBase>
              <Skeleton width={200} height={45} style={{}} />
            </SkeletonBase>
          </div>
        </>
      )}
      {!loading && (
        <>
          <h1 data-aos="fade-up" data-aos-delay="200" className="text-3xl md:text-5xl font-medium text-white">
            Contato
          </h1>
          <div className={styles['container-infos']}>
            <div className={styles['content-about']}>
              <div className={styles['content-logo']}>
                <img
                  data-aos="fade-up"
                  data-aos-delay="400"
                  width={200}
                  height={250}
                  className={styles['thumb-logo']}
                  alt="image-menu"
                  src={dataOwner?.logo}
                />
              </div>
              <div className="flex flex-col w-80 mr-10 sm:mr-0">
                <div className={styles['content-infos' + 'flex-col']}>
                  <div className="flex flex-row w-full gap-10 mb-8">
                    <div>
                      <h3 className="text-md md:text-xl font-bold text-white">Localização</h3>
                      <p className="text-[14px] md:text-lg text-white max-w-[350px] break-words">
                        {formatAddress(dataOwner)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row w-full gap-5">
                    <div>
                      <h3 className="text-md md:text-xl font-bold text-white">Telefone</h3>
                      <p className="text-[14px] md:text-lg text-white">{dataOwner?.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-md md:text-xl font-bold text-white">WhatsApp</h3>
                      <button
                        className="text-[14px] md:text-lg text-white"
                        onClick={() => redirectWhatsapp(dataOwner?.whatsapp)}
                      >
                        {dataOwner?.whatsapp}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles['content-infos'] + ' mt-12'}>
                  <Link to={dataOwner?.youtube} target="_blank">
                    <div className="w-[60px] h=[80px] flex flex-row justify-center rounded-full shadow-md bg-green-800 hover:bg-green-900 p-2 transition-all duration-200 hover:scale-105 cursor-pointer">
                      <FaYoutube size={35} color={'#fff'} />
                    </div>
                  </Link>
                  <Link to={dataOwner?.instagram} target="_blank">
                    <div className="w-[60px] h=[80px] flex flex-row justify-center rounded-full shadow-md bg-green-800 hover:bg-green-900 p-2 transition-all duration-200 hover:scale-105 cursor-pointer">
                      <FaInstagram size={35} color={'#fff'} />
                    </div>
                  </Link>
                  <Link to={dataOwner?.facebook} target="_blank">
                    <div className="w-[60px] h=[80px] flex flex-row justify-center rounded-full shadow-md bg-green-800 hover:bg-green-900 p-2 transition-all duration-200 hover:scale-105 cursor-pointer">
                      <FaFacebook size={35} color={'#fff'} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles['content-form']}>
              <Card className={styles['card-form']}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles['wrapper-inputs']}>
                    <Input
                      {...register('name')}
                      helperText={errors?.name ? errors?.name.message : null}
                      customCssContainer={{
                        marginBottom: 30,
                        width: 250,
                      }}
                      type="text"
                      value={getValues('name')}
                      onChange={({ target }) => setValue('name', target.value)}
                      placeholder="Digite o Nome"
                      label="Nome"
                    />

                    <Input
                      {...register('email')}
                      helperText={errors?.email ? errors?.email.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="email"
                      value={getValues('email')}
                      onChange={({ target }) => setValue('email', target.value)}
                      placeholder="Digite o Email"
                      label="Email"
                    />

                    <Input
                      {...register('phone')}
                      helperText={errors?.phone ? errors?.phone.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('phone')}
                      onChange={({ target }) => setValue('phone', target.value)}
                      placeholder="Digite o Telefone"
                      label="Telefone"
                    />

                    <Input
                      {...register('subject')}
                      helperText={errors?.subject ? errors?.subject.message : null}
                      customCssContainer={{ marginBottom: 30, width: 250 }}
                      type="text"
                      value={getValues('subject')}
                      onChange={({ target }) => setValue('subject', target.value)}
                      placeholder="Digite o Assunto"
                      label="Assunto"
                    />

                    <TextArea
                      {...register('message')}
                      helperText={errors?.message ? errors?.message.message : null}
                      className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
                      value={getValues('message')}
                      onChange={({ target }) => setValue('message', target.value)}
                      placeholder="Digite a Mensagem"
                      label="Mensagem"
                    />
                  </div>

                  <Button className={styles['button-item-form'] + ' bg-green-500'} submit>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        <BiMailSend size={24} color="#F8F8FF" />
                        <p className="text-white ml-2">Enviar</p>
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
