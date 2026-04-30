import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllClients } from "../../../services/clients";

export const allClientsThunk = createAsyncThunk("clients/get", async () => {
  const response = await getAllClients();
  return response.data;
});
