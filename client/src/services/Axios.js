import axios from "axios";
import { getToken } from "../utils/Token.js";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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