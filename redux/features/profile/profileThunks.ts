import { profileApi } from "@/services/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileDetails } from "./profileTypes";

export const profileThunk = createAsyncThunk<
  profileDetails,
  void,
  { rejectValue: string }
>("profile", async (_, { rejectWithValue }) => {
  try {
    const response = await profileApi();
    console.log("response data", response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to get profile details.",
    );
  }
});
