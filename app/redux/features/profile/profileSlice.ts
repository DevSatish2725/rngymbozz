import { createSlice } from "@reduxjs/toolkit";
import { profileThunk } from "./profileThunks";

const initialState = {
  loading: false,
  details: {},
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(profileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(profileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile details.";
      });
  },
});

export const getProfileDetail = (state) => state.profile.details;
export const getLoading = (state) => state.profile.loading;

export default profileSlice.reducer;
