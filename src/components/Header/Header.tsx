import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import ResponseModel from "../../models/ResponseModel";
import { AuthContext } from "../../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";
import { toastAlert } from "../../Utils/toastAlert";

function Header() {
  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<ResponseModel>(
    {} as ResponseModel
  );

  const { user, handleLogin, handleLogout } = useContext(AuthContext);

  const token = user.token;

  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (token !== "") {
      navigate("/home");
    }
  }, [user]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(userLogin);
  }

  function logout() {
    handleLogout();
    toastAlert("Usuario deslogado com sucesso", "info");
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <Login open={open} onClose={() => setOpen(false)}>
        <div className="h-[30vh] w-[20vw]">
          <h2 className="text-lime-400 text-2xl font-Gilroy-Black text-center">
            Login:
          </h2>
          <form onSubmit={login} method="post" className="flex flex-col">
            <label htmlFor="email" className="text-lg text-lime-400">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={userLogin.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              className="border-2 border-lime-400 rounded-md"
            />
            <label htmlFor="password" className="text-lg text-lime-400">
              Senha:
            </label>
            <input
              type="password"
              name="password"
              value={userLogin.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              className="border-2 border-lime-400 rounded-md"
            />

            <p className="text-white text-md p-1">
              Ainda não possui conta?
              <Link to={"/register"}>
                <span
                  className="text-lime-400 text-lg hover:text-white cursor-pointer ml-1"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cadastre-se
                </span>
              </Link>
            </p>
            <button
              type="submit"
              className="text-xl bg-lime-400 w-[4rem] h-[2rem] rounded-lg mt-3 mx-[7rem] font-Gilroy-Black text-white hover:bg-gray-50 hover:text-lime-400"
              onClick={() => {
                isLoading ? setOpen(true) : setOpen(false);
              }}
            >
              {isLoading ? (
                <ThreeDots
                  color="white"
                  visible={true}
                  height={8}
                  width={65}
                  radius={3}
                />
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>
        </div>
      </Login>
      <header className="bg-gradient-to-r from-slate-900 to-slate-700 h-[12vh] border-b-2 border-lime-500 flex items-center">
        <div className="flex ">
          <img
            src="https://i.ibb.co/9hBTMDR/Captura-de-tela-2024-08-08-163750-removebg-preview.png"
            alt=""
            className="w-[10rem] ml-5 p-2"
          />
          {token === "" ? (
            <button
              className="h-[9.2vh] w-[6vw] absolute right-4 rounded-lg text-center text-lime-500 text-[1.4em] font-Gilroy-Black border-2 border-lime-500 duration-300 hover:border-white hover:text-white"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Link to={"/"}> Login</Link>
            </button>
          ) : (
            <button
              className="h-[9.2vh] w-[6vw] absolute right-4 rounded-lg text-center text-lime-500 text-[1.4em] font-Gilroy-Black border-2 border-lime-500 duration-300 hover:border-white hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
