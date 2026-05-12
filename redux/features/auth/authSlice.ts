import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authThunks from "./authThunks";
import { AuthState } from "../../../types/auth";

const initialState: AuthState = {
  user: null,
  signupUser: null,
  loading: true,
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.signupUser = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks here if needed
    builder
      .addCase(authThunks.login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(authThunks.login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(authThunks.signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunks.signup.fulfilled, (state, action) => {
        state.loading = false;
        state.signupUser = action.payload;
      })
      .addCase(authThunks.signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const {
  loading,
  setAuthenticated,
  logout,
  finishLoading,
  clearAuthError,
} = authSlice.actions;
export const loadingState = (state: { auth: AuthState }) => state.auth.loading;
export const user = (state: { auth: AuthState }) => state.auth.user;
export const signupUser = (state: { auth: AuthState }) => state.auth.signupUser;
export const authError = (state: { auth: AuthState }) => state.auth.error;
export const isAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export default authSlice.reducer;
