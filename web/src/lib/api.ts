import axios from "axios";
import { getRefreshToken, setAccessToken, setRefreshToken } from "./auth";

function resolveBaseURL() {
  const envURL = process.env.NEXT_PUBLIC_API_URL;
  if (envURL) {
    // Quando a aplicação estiver rodando localmente, o host 'api' não é resolvido.
    if (typeof window !== "undefined") {
      const { hostname } = window.location;
      if (
        (hostname === "localhost" || hostname === "127.0.0.1") &&
        envURL.includes("api:3333")
      ) {
        return "http://localhost:3333/api/v1";
      }
    }
    return envURL;
  }

  // Fallback padrão baseado no ambiente de execução
  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return "http://api:3333/api/v1";
    }
  }

  return "http://localhost:3333/api/v1";
}

const BASE_URL = resolveBaseURL();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const res = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se o refresh falhar, força o logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redireciona para o login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
