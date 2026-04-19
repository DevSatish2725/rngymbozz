import { profileApi } from "@/config/api/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const profileThunk = createAsyncThunk(
  "profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi();
      console.log("response data", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile details.",
      );
    }
  },
);
