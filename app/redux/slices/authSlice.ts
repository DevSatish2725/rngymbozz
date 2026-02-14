import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}

interface SignupUser extends User{
  ownerName: string;
  gymName: string;
  phoneNumber: string;
  address: string;
}

interface AuthState {
  user: User | null;
  signupUser: SignupUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  signupUser: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signup: (state, action: PayloadAction<SignupUser>) => {
      state.signupUser = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loading, login, signup, logout } = authSlice.actions;
export const loadingState = (state: { auth: AuthState }) => state.auth.loading;
export const user = (state: { auth: AuthState }) => state.auth.user;
export const signupUser = (state: { auth: AuthState }) => state.auth.signupUser;
export default authSlice.reducer;
