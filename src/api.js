import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 请求拦截器：在每次请求发送前，检查并添加 Authorization 标头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理服务器返回的错误，特别是 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 令牌过期或无效，清理本地存储并跳转到登录页
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const anonApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;