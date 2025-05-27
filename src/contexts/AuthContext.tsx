import { createContext, ReactNode, useState } from "react";
import ResponseModel from "../models/ResponseModel";
import { apiPostLogin } from "../Services/Service";
import { toastAlert } from "../Utils/toastAlert";

interface AuthContextProps {
  user: ResponseModel;
  handleLogout(): void;
  handleLogin(user: ResponseModel): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ResponseModel>({
    id: "",
    name: "",
    email: "",
    password: "",
    photo: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: ResponseModel) {
    setIsLoading(true);
    try {
      await apiPostLogin(`/auth/login`, userLogin, setUser);

      toastAlert("Login efetuado com sucesso", "sucess");
    } catch (e) {
      console.log(e);
      toastAlert("Email e/ou senha incorretos", "error");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUser({
      id: "",
      name: "",
      email: "",
      password: "",
      photo: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
