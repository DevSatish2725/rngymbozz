// Payload sent to API
export interface LoginPayload {
  email: string;
  password: string;
}

export interface ThunkLoginPayload {
  payload: LoginPayload;
}

// Data returned from backend
export interface LoginResponse {
  gymId: number;
  subscriptionStatus: string;
  token: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  ownerName: string;
  gymName: string;
  phone: string;
  address: string;
}

export interface ThunkSignupPayload {
  payload: SignupPayload;
}

export interface SignupResponse {
  message: string;
}

// Redux state
export interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signupUser: SignupResponse | null;
}