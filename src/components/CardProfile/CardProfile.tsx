import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function CardProfile() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.token === "") {
      alert("Favor efetuar login");
      navigate("/login");
    }
  }, [user.token, user.photo]);


  return (
    <div className="flex justify-center p-10">
      <div className="rounded-3xl p-px bg-gradient-to-b from-lime-400 to-lime-200 w-[20rem]">
        <div className="flex flex-col items-center rounded-[calc(1.5rem-1px)] mx-auto p-4 bg-gray-500 bg-clip-border shadow-3xl shadow-shadow-500">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img
              src="https://www.iiconsortium.org/wp-content/uploads/sites/2/2023/04/slider-joi-april-2023.jpg"
              className="flex h-32 w-full justify-center rounded-xl bg-cover"
            />
            <div className="absolute -bottom-12 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-[4px]">
              <img
                className="h-full w-full rounded-full"
                src={
                  user.photo ||
                  "https://cdn.dj.org.br/wp-content/uploads/2020/01/perfil_vazio.png"
                }
                alt="Foto do usuario"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-Gilroy-Black text-lime-400 ">
              {user.name}
            </h4>
            <p className="text-base font-normal text-white">{user.email}</p>
          </div>
          <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-white">{}</p>
              <p className="text-sm font-bold text-white">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
