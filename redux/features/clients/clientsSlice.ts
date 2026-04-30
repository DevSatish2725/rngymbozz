import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/clients";
import {
  addNewClientThunk,
  allClientsThunk,
  updateClientThunk,
} from "./clientsThunk";

const initialState: InitialState = {
  loading: false,
  allClients: [],
  error: "",
  newClientData: {},
  updateClientData: {},
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearState: (state) => {
      state.newClientData = {};
      state.updateClientData = {};
    },
  },
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
      })
      .addCase(addNewClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newClientData = action.payload;
      })
      .addCase(addNewClientThunk.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload
      })
      .addCase(updateClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.updateClientData = action.payload;
      })
      .addCase(updateClientThunk.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload
      }),
});

export const loadingStateFn = (state: any) => state.clients.loading;
export const allClientsStateFn = (state: any) => state.clients.allClients;
export const newClientDataStateFn = (state: any) => state.clients.newClientData;
export const updateClientDataStateFn = (state: any) =>
  state.clients.updateClientData;

export const { clearState } = clientsSlice.actions;

export default clientsSlice.reducer;
