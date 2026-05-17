import { RootState } from "@/redux/store";
import { AttendanceMember, InitialState } from "@/types/attendance";
import { AllClientsData } from "@/types/clients";
import { createSlice } from "@reduxjs/toolkit";
import { allClientsThunk } from "./attendanceThunks";

const initialState: InitialState = {
  isLoading: false,
  allClientsAttendance: [],
  error: "",
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    updateAllClientsAttendance: (state, action) => {
      const matchedIndex = state.allClientsAttendance.findIndex(
        (data: AttendanceMember) => data.id === action.payload,
      );
      const attendanceActionType =
        state.allClientsAttendance[matchedIndex]["action"] === "check-in"
          ? "check-out"
          : state.allClientsAttendance[matchedIndex]["action"];
      state.allClientsAttendance[matchedIndex]["action"] = attendanceActionType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allClientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allClientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allClientsAttendance = action.payload.map(
          (client: AllClientsData) => ({
            id: client.id,
            name: client.name,
            plan: client.plan,
            action: "check-in",
          }),
        );
      })
      .addCase(allClientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        //   state.error = action.payload;
      });
  },
});


export const isLoadingStateFn = (state: RootState) => state.attendance.isLoading;
export const allClientsAttendanceStateFn = (state: RootState) =>
  state.attendance.allClientsAttendance;

export const { updateAllClientsAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
