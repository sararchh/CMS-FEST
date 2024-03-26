/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft, FiSave } from 'react-icons/fi';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { SelectComponent } from '@/components/atoms/Select';
import { sanitizeNumber } from '@/utils/string';
import { formatPhoneNumber } from '@/utils/format';
import { UserRepository } from '@/repositories/userRepository/UserRepository';
import { UserProps } from '@/repositories/userRepository/UserRepository.types';
import { AuthContext } from '@/contexts/authContext';
import styles from './UsersCreateEdit.module.css';
import { Card } from '@/components/atoms/Card/Card';

export const UsersCreateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userRepository = new UserRepository();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [registerEdit, setRegisterEdit] = useState<UserProps | any>({} as any);

  const { user } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    email: Yup.string().email('Deve ser um email').required('O E-mail é obrigatório'),
    phone: Yup.string().required('O Telefone é obrigatório'),
    isAdmin: Yup.string(),
    password: editMode
      ? Yup.string()
      : Yup.string().min(8, 'Senha tem que ter pelo menos 8 caracteres').required('A Senha é obrigatória'),
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
      const data = await userRepository.listOne(id);
      setRegisterEdit(data);
      populateForm(data);
      setLoading(false);
    } catch (error) {
      // console.log("error: ", error);
      setLoading(false);
    }
  };

  const populateForm = (data: UserProps) => {
    setValue('name', data?.name);
    setValue('email', data?.email);
    setValue('phone', formatPhoneNumber(data?.phone));
    setValue('password', '');

    if (user?.isAdmin) {
      setValue('isAdmin', data?.isAdmin ? '1' : '0');
    }
  };

  const clearForm = () => {
    setValue('name', '');
    setValue('email', '');
    setValue('phone', '');
    setValue('password', '');
  };

  const onSubmit = async ({ name, email, phone, password, isAdmin }) => {
    if (loading) return;
    try {
      setLoading(true);
      const values = {
        name,
        email,
        phone: sanitizeNumber(phone),
        password,
      };

      if (isAdmin == '1') {
        values['isAdmin'] = true;
      }

      if (editMode) {
        await userRepository.update(registerEdit?._id, values);
        toast.success('Usuário atualizado com sucesso!');
        navigate(-1);
      } else {
        await userRepository.create(values);
        toast.success('Usuário cadastrado com sucesso!');
        navigate(-1);
      }

      clearForm();
      setLoading(false);
    } catch (error) {
      // console.log("error: ", error);
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

  return (
    <MainTemplate>
      <section className={styles['container']}>
        <Card>
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-10">{editMode ? 'Editar Usuário' : 'Cadastro de Usuário'}</h2>
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
              {...register('email')}
              helperText={errors?.email ? errors?.email.message : null}
              customCssContainer={{ marginBottom: 30, width: 250 }}
              type="text"
              value={getValues('email')}
              onChange={({ target }) => setValue('email', target.value)}
              placeholder="E-mail"
              label="E-mail"
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
            />

            <Input
              {...register('password')}
              helperText={errors?.password ? errors?.password.message : null}
              customCssContainer={{ marginBottom: 30, width: 250 }}
              type="password"
              value={getValues('password')}
              onChange={({ target }) => setValue('password', target.value)}
              placeholder="Senha"
              label="Senha"
            />

            {user?.isAdmin && (
              <SelectComponent
                helperText={null}
                className="min-w-[250px] mr-2 mb-6"
                name={'isAdmin'}
                label="Admin"
                value={getValues('isAdmin')}
                options={[
                  { value: '0', text: 'Não' },
                  { value: '1', text: 'Sim' },
                ]}
                onChange={(value: string) => {
                  setValue('isAdmin', value);
                }}
              />
            )}
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
        </form>
        </Card>
      </section>
    </MainTemplate>
  );
};
