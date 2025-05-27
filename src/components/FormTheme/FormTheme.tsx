import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Theme from "../../models/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { apiPost, apiSearchGet, apiUpdate } from "../../Services/Service";
import { toastAlert } from "../../Utils/toastAlert";

function FormTheme() {
  const [theme, setTheme] = useState<Theme>({} as Theme);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
    try {
      await apiSearchGet(`/themes/${id}`, setTheme, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e: any) {
      if (e.toString().includes(403)) {
        toastAlert("Sessão expirada, efutue login novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      searchById(id);
    }
  }, [id]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setTheme({
      ...theme,
      [e.target.name]: e.target.value,
    });
    console.log(JSON.stringify(theme));
  }

  async function newTheme(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await apiUpdate(`/themes`, theme, setTheme, {
          headers: { Authorization: token },
        });

        toastAlert("Tema atualizado com sucesso", "sucess");
      } catch (e: any) {
        if (e.toString().includes(403)) {
          toastAlert("Sessão expirada, efutue login novamente", "info");
          handleLogout();
        }
      }
    } else {
      try {
        await apiPost(`/themes`, theme, setTheme, {
          headers: { Authorization: token },
        });
        toastAlert("Tema cadastrado", "sucess");
      } catch (e: any) {
        if (e.toString().includes(403)) {
          toastAlert("Sessão expirada, efutue login novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao cadastrar tema", "error");
        }
      }
    }

    back();
  }

  function back() {
    navigate("/");
  }

  useEffect(() => {
    if (token === "") {
      alert("Favor efetue o login");
      navigate("/");
    }
  }, [token]);

  return (
    <div className="p-[6rem] flex justify-center">
      <div className="bg-gray-600 w-[40rem] rounded-lg h-[20rem]">
        <h2 className="text-3xl text-center py-8 font-Gilroy-Black text-lime-400">
          {id === undefined ? "Cadastre um novo Tema" : "Editar Tema"}
        </h2>

        <form
          className="flex flex-col gap-4 justify-center items-center mb-5"
          onSubmit={newTheme}
        >
          <div className="flex flex-col gap-2 items-center">
            <label
              htmlFor="description"
              className="text-xl font-Gilroy-Black text-white mb-5"
            >
              Descrição:
            </label>
            <input
              type="text"
              placeholder=" Descrição do Tema"
              name="description"
              value={theme.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              required
              className="rounded-md border-[.2rem] border-lime-400 w-[25rem]"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-lime-400 w-[6rem] h-[2.5rem] text-white font-Gilroy-Black mt-5 duration-200 hover:bg-white hover:text-lime-400 "
          >
            {id === undefined ? "Cadastrar" : "Editar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormTheme;
