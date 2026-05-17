import { RootState } from "@/redux/store";
import { InitialState } from "@/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileThunk } from "./profileThunks";

const initialState: InitialState = {
  loading: false,
  details: {
    ownerName: "",
    gymName: "",
    id: 0,
    subscriptionPlan: "",
    subscriptionStatus: "Active",
    address: "",
    phone: "",
    trialEndDate:""
  },
  error: "",
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    updateProfileDetail: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(profileThunk.pending, (state: InitialState) => {
        state.loading = true;
      })
      .addCase(
        profileThunk.fulfilled,
        (
          state: InitialState,
          action: PayloadAction<InitialState["details"]>,
        ) => {
          state.loading = false;
          state.details = action.payload;
        },
      )
      .addCase(
        profileThunk.rejected,
        (state: InitialState, action: PayloadAction<InitialState["error"]>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch profile details.";
        },
      );
  },
});

export const { updateProfileDetail } = profileSlice.actions;
export const getProfileDetail = (state: RootState) => state.profile.details;
export const getLoading = (state: RootState) => state.profile.loading;

export default profileSlice.reducer;
