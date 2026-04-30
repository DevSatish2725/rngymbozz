import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/clients";
import { allClientsThunk } from "./clientsThunk";

const initialState: InitialState = {
  loading: false,
  allClients: [],
  error: "",
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(allClientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(allClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allClients = action.payload;
        console.log("action payload clients", action.payload);
      })
      .addCase(allClientsThunk.rejected, (state, action) => {
        state.loading = false;
        console.log("action payload clients error", action.payload);
      }),
});

export const loadingStateFn = (state: any) => state.clients.loading;
export const allClientsStateFn = (state: any) => state.clients.allClients;

export default clientsSlice.reducer;
