import authApi from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "../../../types/auth";

const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
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
    const response = await authApi.signup(payload);
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
