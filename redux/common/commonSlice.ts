import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    showPlanWarning: true,
}

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        closePlanWarning: (state) => {
            state.showPlanWarning = false;
        }
    }
});

export const { closePlanWarning } = commonSlice.actions;

export const showPlanWarningStateFn = (state: RootState) => state.common.showPlanWarning;

export default commonSlice.reducer;