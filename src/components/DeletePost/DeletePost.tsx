import React, { useContext, useEffect, useState } from "react";
import Post from "../../models/Post";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { apiDelete, apiSearchGet } from "../../Services/Service";
import { toastAlert } from "../../Utils/toastAlert";

function DeletePost() {
  const [post, setPost] = useState<Post>({} as Post);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
    try {
      await apiSearchGet(`/posts/${id}`, setPost, {
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

  function back() {
    navigate("/post");
  }

  async function deletePost() {
    try {
      await apiDelete(`/post/${id}`, { headers: { Authorization: token } });
      toastAlert("Post deletado com sucesso", "sucess");
    } catch (e: any) {
      toastAlert('Erro ao deletar post', 'error')
    }

    back();
  }

  return (
    <section className="p-10 flex flex-col justify-center items-center">
      <h2 className="text-2xl text-lime-400 font-Gilroy-Black m-10">
        Deseja deletar este post?
      </h2>
      <div className="w-[20vw] relative group overflow-hidden p-8 rounded-xl bg-gray-800  dark:bg-gray-900">
        <div
          aria-hidden="true"
          className="inset-0 absolute aspect-video rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-lime-500 to-lime-200 dark:from-white dark:to-white blur-2xl opacity-30 dark:opacity-5 dark:group-hover:opacity-10"
        ></div>
        <div className="relative">
          <div className="mt-6 pb-6">
            <h3 className="text-lime-400 text-2xl text-center font-Gilroy-Black">
              Tema
            </h3>
            <p className="text-white text-lg text-center font-Gilroy-Black">
              {post.title}
            </p>
          </div>
          <button
            className="m-3 text-center text-white bg-red-600 h-[3rem] w-[5rem] rounded-lg font-Gilroy-Black"
            onClick={back}
          >
            Não
          </button>
          <button
            className="m-3 text-center text-white bg-lime-400 h-[3rem] w-[5rem] rounded-lg font-Gilroy-Black"
            onClick={deletePost}
          >
            Sim
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeletePost;
