import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/clients";
import {
  addNewClientThunk,
  allClientsThunk,
  deleteClientThunk,
  updateClientThunk,
} from "./clientsThunk";

const initialState: InitialState = {
  loading: false,
  allClients: [],
  error: "",
  newClientData: {},
  clientID: null,
  updateClientData: {},
  deleteClientData: "",
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearState: (state) => {
      state.newClientData = {};
      state.updateClientData = {};
    },
    setClientID: (state, action) => {
      state.clientID = action.payload;
    },
    clearDeleteData: (state) => {
      state.deleteClientData = "";
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
      })
      .addCase(allClientsThunk.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(deleteClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteClientData = action.payload;
        state.allClients = state.allClients.filter(
          (client) => client.id !== state.clientID,
        );
      })
      .addCase(deleteClientThunk.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload
      }),
});

export const loadingStateFn = (state: any) => state.clients.loading;
export const allClientsStateFn = (state: any) => state.clients.allClients;
export const newClientDataStateFn = (state: any) => state.clients.newClientData;
export const updateClientDataStateFn = (state: any) =>
  state.clients.updateClientData;
export const deleteClientDataStateFn = (state: any) =>
  state.clients.deleteClientData;
export const clientIDStateFn = (state: any) => state.clients.clientID;

export const { clearState, setClientID, clearDeleteData } = clientsSlice.actions;

export default clientsSlice.reducer;
