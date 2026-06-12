import axios from "axios";
import { getToken } from "../utils/Token.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;