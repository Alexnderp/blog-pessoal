import axios from "axios";

const api = axios.create({
  baseURL: "https://generation-blog-pessoal.onrender.com",
});

export const apiPostAuth = async (
  url: string,
  data: Object,
  setData: Function
) => {
  const response = await api.post(url, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  setData(response.data);
};

export const apiPostLogin = async (
  url: string,
  data: Object,
  setData: Function
) => {
  const response = await api.post(url, data, {});
  setData(response.data);
  console.log(response.data);
};

export const apiSearchGet = async (
  url: string,
  setData: Function,
  header: Object
) => {
  const response = await api.get(url, header);
  setData(response.data);
};

export const apiPost = async (
  url: string,
  data: Object,
  setData: Function,
  header: Object
) => {
  const response = await api.post(url, data, header);
  setData(response.data);
};

export const apiUpdate = async (
  url: string,
  data: Object,
  setData: Function,
  header: Object
) => {
  const response = await api.put(url, data, header);
  setData(response.data);
};

export const apiDelete = async (url: string, header: Object) => {
  await api.delete(url, header);
};

export const generatePostWithIA = async (
  url: string,
  data: Object,
  header: Object
) => {
  console.log(data);

  const response = await api.post(url, data, header);
  return response;
};
