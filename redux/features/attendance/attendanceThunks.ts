import { getAllClients } from "@/services/attendance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const allClientsThunk = createAsyncThunk(
  "attendance/clients",
  async () => {
    const response = await getAllClients();
    return response.data;
  },
);
