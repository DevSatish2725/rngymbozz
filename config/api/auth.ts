import {
  LoginPayload,
  SignupPayload,
} from "../../app/redux/features/auth/authTypes";
import axiosInstance from "../axios";

const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  console.log("Login response from API:", response);
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
