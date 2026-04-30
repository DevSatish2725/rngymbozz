import authApi from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "./authTypes";

const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    console.log("login response thunk");
    const response = await authApi.login(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const signup = createAsyncThunk<
  SignupResponse,
  SignupPayload,
  { rejectValue: string }
>("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    console.log("Signup payload in thunk:", payload);
    const response = await authApi.signup(payload);
    console.log("Signup response in thunk:", response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

const authThunks = {
  login,
  signup,
};

export default authThunks;
