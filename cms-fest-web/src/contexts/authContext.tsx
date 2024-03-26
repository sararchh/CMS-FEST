/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PATHS from "@/routes/paths";
import { api } from "@/services/apiClient";
import {
  hasToken,
  hasUserLocalStorage,
  setSession,
  setUserStorage,
} from "@/utils/jwt";

import { UserProps } from "@/repositories/userRepository/UserRepository.types";
import { publicRoutes } from "@/routes/publicRoutes";

interface AuthContextData {
  user: any;
  loading: boolean;
  signInRequest: (email: string, password: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState<UserProps | any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const inicialize = async () => {
      //   setfullLoading(true);
      const pathname: any = location.pathname;
      const token = await hasToken();
      if (!token && !publicRoutes.includes(pathname)) {
        navigate(PATHS?.index);
      }
      const userLocalStorage = hasUserLocalStorage();
      if (token && userLocalStorage) {
        setUser(userLocalStorage);
        setUserStorage(userLocalStorage);

        if (pathname == "/") {
          navigate(PATHS.dashboard?.index);
        }
      }
      //   setTimeout(() => {
      //     setfullLoading(false);
      //   }, 1200);
    };
    inicialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInRequest = async (
    email: string,
    password: string
  ): Promise<any | boolean> => {
    try {
      if (!email || !password) {
        return;
      }
      setLoading(true);

      setSession(null);

      const response = await api.post("/sign-in", {
        email: email,
        password: password,
      });
      // console.log("response", response.data);

      const { user, token, refreshToken } = response.data;

      await setSession(token, refreshToken);

      setTimeout(async () => {
        setUser(user);
        setUserStorage(user);
      }, 1000);

      setLoading(false);

      return user;
    } catch (error: any) {
      setLoading(false);
      //   console.log("error", error?.response.data);
      //   console.log("error", error);
      if (error?.response?.data) {
        if (error?.response.data?.name == "InvalidCredentialsError") {
          toast("Credenciais inválidas.");
        }
        if (error?.response.data?.name == "registerIsNotActiveError") {
          toast("Usuário não está ativo para acesso.");
        }
      } else {
        toast("Falha ao realizar login, tente novamente.");
      }

      return false;
    }
  };

  const signOut = async () => {
    try {
      navigate(PATHS?.index);

      setSession(null);

      setUser(null);
      setUserStorage(null);
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signInRequest,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
