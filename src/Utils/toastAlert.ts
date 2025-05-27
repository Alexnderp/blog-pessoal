import { Flip, toast } from "react-toastify";

export function toastAlert(mensagem: string, type: string) {
  switch (type) {
    case "sucess":
      toast.success(mensagem, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
        transition: Flip,
      });
      break;

    case "info":
      toast.info(mensagem, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
        transition: Flip,
      });
      break;

    case "error":
      toast.error(mensagem, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
        transition: Flip,
      });
      break;

    default:
      toast.info(mensagem, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
        transition: Flip,
      });
      break;
  }
}
