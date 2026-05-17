import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import clientsReducer from "./features/clients/clientsSlice";
import profileReducer from "./features/profile/profileSlice";
import attendanceReducer from "./features/attendance/attendanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    clients: clientsReducer,
    attendance: attendanceReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
