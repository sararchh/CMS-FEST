/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import PATHS from "@/routes/paths";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Logo } from "@/components/atoms/Logo/Logo";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Spinner } from "@/components/atoms/Spinner/Spinner";

import { AuthContext } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import styles from "./SignIn.module.css";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { signInRequest } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Deve ser um email").required("O E-mail é obrigatório"),
    password: Yup.string().required("A Senha é obrigatória"),
    // password: Yup.string().min(8, "Senha tem que ter pelo menos 8 caracteres").required("A Senha é obrigatória"),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async ({ email, password }) => {
    // e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response: any = await signInRequest(email, password);

      if (response) {
        toast.success("Login realizado com sucesso!");
        navigate(PATHS?.dashboard?.index);
      }
      setLoading(false);
    } catch (error) {
      // console.log("error: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | CMS</title>
        <link rel="icon" href="/assets/images/logo.png" />
        <meta name="description" content="Sign in to access your account cms" />

        <meta property="og:title" content="Login | CMS" />
        <meta property="og:description" content="Sign in to access your account cms" />
        <meta property="og:image" content="/assets/images/logo.png" />
      </Helmet>

      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["container-logo"]}>
            <Logo />
          </div>
          <h2>Bem Vindo!</h2>

          <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["main-container"]}>
              <Input
                {...register("email")}
                helperText={errors?.email ? errors?.email.message : null}
                customCssContainer={{ marginBottom: 30 }}
                type="text"
                value={getValues("email")}
                onChange={({ target }) => setValue("email", target.value)}
                placeholder="Digite seu e-mail"
                label="E-mail"
              />

              <Input
                {...register("password")}
                helperText={errors?.password ? errors?.password.message : null}
                customCssContainer={{ marginBottom: 30 }}
                type={showPass ? "rext" : "password"}
                value={getValues("password")}
                onChange={({ target }) => setValue("password", target.value)}
                placeholder="Digite sua senha"
                label="Senha"
                endAddorment={
                  <Button className={styles["button-addorment"]} onClick={() => setShowPass(!showPass)}>
                    {showPass ? "hide" : "show"}
                  </Button>
                }
              />
            </div>
            <Button submit className={styles["button-submit"]}>
              {loading ? <Spinner /> : "Entrar"}
            </Button>
          </form>

          {/* {error && <Error>Algum erro ocorreu, tente novamente.</Error>} */}
          <a className={styles["forget-password"]} href="">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </>
  );
};
