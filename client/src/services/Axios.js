import axios from "axios";
import dotenv from "dotenv";
import { getToken } from "../utils/Token.js";

dotenv.config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
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