import React, { useContext, useEffect, useState } from "react";
import CardTheme from "../CardTheme/CardTheme";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { apiSearchGet } from "../../Services/Service";
import Theme from "../../models/Theme";
import { toastAlert } from "../../Utils/toastAlert";
import FormTheme from "../FormTheme/FormTheme";

function ThemesList() {
  const [themes, setThemes] = useState<Theme[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchThemes() {
    try {
      await apiSearchGet("/themes", setThemes, {
        headers: { Authorization: token },
      });
    } catch (e: any) {
      if (e.toString().includes("403")) {
        toastAlert("Sessão expirada, efutue login novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toastAlert("Favor efutue login", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    searchThemes();
  }, [themes.length]);

  return (
    <>
      {themes.length === 0 ? (
        <FormTheme />
      ) : (
        <div className="flex justify-center w-full py-4 bg-gray-800 h-[70vh]">
          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {themes.map((theme) => (
                <>
                  <CardTheme key={theme.id} theme={theme} />
                  <div className="flex items-center justify-center">
                    <Link to={"/registerTheme"}>
                      <button className="bg-lime-400 rounded-md m-1 p-2 absolute top-[8rem] right-[8rem] text-white">
                        Nova Categoria
                      </button>
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThemesList;
