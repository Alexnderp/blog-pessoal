import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Theme from "../../models/Theme";
import Post from "../../models/Post";
import {
  apiPost,
  apiSearchGet,
  apiUpdate,
  generatePostWithIA,
} from "../../Services/Service";
import { toastAlert } from "../../Utils/toastAlert";
import { ThreeDots } from "react-loader-spinner";

function FormPost() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [themes, setThemes] = useState<Theme[]>([]);

  const [theme, setTheme] = useState<Theme>({
    id: "",
    description: "",
  });

  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    text: "",
    date: "",
    theme,
    user,
  });

  async function searchPostById(id: string) {
    try {
      await apiSearchGet(`/posts/${id}`, setPost, {
        headers: { Authorization: token },
      });
    } catch (e: any) {
      if (e.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function searchThemeById(id: string) {
    try {
      await apiSearchGet(`/themes/${id}`, setTheme, {
        headers: { Authorization: token },
      });
    } catch (e: any) {
      if (e.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function searchThemes() {
    try {
      await apiSearchGet("/themes", setThemes, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e: any) {
      if (e.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toastAlert("Favor efutue o login", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    searchThemes();
    if (id !== undefined) {
      searchPostById(id);
    }
  }, [id]);

  useEffect(() => {
    setPost({ ...post, theme: theme });
  }, [theme]);

  function updateState(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      theme: {
        id: theme.id,
        description: theme.description,
      },
      user,
    });
  }

  function back() {
    navigate("/");
  }

  async function newPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    console.log(post);

    if (id !== undefined) {
      try {
        await apiUpdate("/posts", post, setPost, {
          headers: { Authorization: token },
        });

        toastAlert("Post atualizado com sucesso", "sucess");
      } catch (e: any) {
        if (e.toString().includes(403)) {
          toastAlert("Erro ao atualizar post", "error");
          handleLogout();
        }
      }
    } else {
      try {
        await apiPost("/posts", post, setPost, {
          headers: { Authorization: token },
        });

        toastAlert("Post cadastrado com sucesso", "sucess");
      } catch (e: any) {
        if (e.toString().includes(403)) {
          toastAlert("Sessão expirada, efutue login novamente", "info");
          handleLogout();
          back();
        } else {
          toastAlert("Erro ao criar post", "error");
        }
      }
    }
    setIsLoading(false);
    back();
  }

  const LoadingTheme = theme.description === "";

  async function handleGeneratePostIA() {
    setIsLoading(true);
    try {
      const generatedPost = await generatePostWithIA(
        "/posts/ia",
        { title: post.title, theme: post.theme },
        { headers: { Authorization: token } }
      );
      console.log(generatedPost.data);

      setPost({ ...post, text: generatedPost.data });
      toastAlert("Post gerado com sucesso pela IA!", "success");
    } catch (error: any) {
      console.error("Erro ao gerar post com IA:", error);
      toastAlert("Erro ao gerar post com IA.", "error");
      if (error.toString().includes("403")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-600 p-8 rounded-lg shadow-md">
        <form onSubmit={newPost}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lime-400 text-sm font-bold mb-2"
            >
              Titulo:
            </label>
            <input
              className="w-full mb-[1rem] border-[.15rem] rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-lime-400"
              type="text"
              placeholder="Digite o título do post"
              name="title"
              value={post.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              required
            />
            <label
              htmlFor="text"
              className="block text-lime-400 text-sm font-bold mb-2"
            >
              Texto:
            </label>
            <textarea
              name="text"
              value={post.text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateState(e)}
              required
              className="w-full border-[.15rem] rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-lime-400"
              placeholder="Digite aqui o seu post"
            ></textarea>
            <select
              className="mt-[1rem] border-[.15rem] rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-lime-400"
              name="theme"
              id="theme"
              value={theme.id}
              onChange={(e) => searchThemeById(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione um tema
              </option>
              {themes.map((theme) => (
                <>
                  <option key={theme.id} value={theme.id}>
                    {theme.description}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={LoadingTheme}
              type="submit"
              className="flex justify-center items-center bg-lime-400 hover:bg-lime-300 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                id="send"
                fill="#fff"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
              </svg>
              {isLoading ? (
                <ThreeDots
                  color="white"
                  visible={true}
                  height={8}
                  width={65}
                  radius={3}
                />
              ) : id !== undefined ? (
                "Editar"
              ) : (
                "Cadastrar"
              )}
            </button>
            <button
              type="submit"
              className={`flex justify-center items-center bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white py-2 px-4 rounded-md transition duration-300 gap-2 border-2 border-blue-500 shadow-md`}
              style={{
                boxShadow: `
        0 0 0.2rem #fff,
        0 0 0.4rem #fff,
        0 0 1rem #0bf,
        0 0 1.5rem #0bf,
        0 0 2rem #0bf,
        0 0 2.5rem #0bf,
        0 0 3rem #0bf;
      `,
                borderColor: "#0bf",
              }}
              onClick={handleGeneratePostIA}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                id="send"
                fill="#fff"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
              </svg>
              {isLoading ? (
                <ThreeDots
                  color="white"
                  visible={true}
                  height={8}
                  width={65}
                  radius={3}
                />
              ) : (
                "Gerar post com IA"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default FormPost;
