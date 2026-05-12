import axiosInstance from "../config/axios";
import { LoginPayload, SignupPayload } from "../types/auth";

const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response;
};

const signup = async (payload: SignupPayload) => {
  return axiosInstance.post("/auth/signup", payload);
};

const authApi = {
  login,
  signup,
};

export default authApi;
