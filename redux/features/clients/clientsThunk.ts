import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewClients,
  getAllClients,
  updateClient,
} from "../../../services/clients";

export const allClientsThunk = createAsyncThunk("clients/get", async () => {
  const response = await getAllClients();
  return response.data;
});

export const addNewClientThunk = createAsyncThunk(
  "clients/add",
  async ({ payload }: any) => {
    const response = await addNewClients(payload);
    return response.data;
  },
);

export const updateClientThunk = createAsyncThunk(
  "clients/update",
  async ({ payload, clientId }: any) => {
    console.log("update thunk");
    const response = await updateClient(payload, clientId);
    return response.data;
  },
);
