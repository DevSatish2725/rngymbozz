import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileThunk } from "./profileThunks";
import { error, profileDetails, screenState } from "./profileTypes";

const initialState = {
  loading: false,
  details: {},
  error: "",
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    updateProfileDetail: (state, action) => {
      state.details = action.payload
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(profileThunk.pending, (state: screenState) => {
        state.loading = true;
      })
      .addCase(
        profileThunk.fulfilled,
        (state: screenState, action: PayloadAction<profileDetails>) => {
          state.loading = false;
          state.details = action.payload;
        },
      )
      .addCase(
        profileThunk.rejected,
        (state: screenState, action: PayloadAction<error>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch profile details.";
        },
      );
  },
});

export const { updateProfileDetail } = profileSlice.actions;
export const getProfileDetail = (state: { profile: screenState }) =>
  state.profile.details;
export const getLoading = (state: { profile: screenState }) =>
  state.profile.loading;

export default profileSlice.reducer;
