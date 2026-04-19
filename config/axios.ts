import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API_URL from "./api";
import storage from "./storage";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  // const token = await SecureStore.getItemAsync("token");

  //   const token = tokenManager.getToken();
  const token = await storage.getItem("token");
  if (
    token &&
    (!config.url?.includes("/login") || config.url?.includes("/signup"))
  ) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Request interceptor - config:", config);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      (!originalRequest.url?.includes("/login") ||
        !originalRequest.url?.includes("/signup"))
    ) {
      await SecureStore.deleteItemAsync("token");
      // dispatch logout here
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
