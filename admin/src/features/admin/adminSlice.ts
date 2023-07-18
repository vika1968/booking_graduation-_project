import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Admin } from "./adminModel";
import { getAdminBySession } from "./adminAPI";

export enum Status {
  LOADING = "loading",
  IDLE = "idle",
  FAILED = "failed",
}
export interface AdminState {
  value: Admin | null;
  status: Status;
}

const initialState: AdminState = {
  value: null,
  status: Status.IDLE,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.value = null;
      state.status = Status.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminBySession.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAdminBySession.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;

      })
      .addCase(getAdminBySession.rejected, (state) => {
        state.status = Status.FAILED;
      })
  },
});

export const { resetAdmin } = adminSlice.actions;
export const adminSelector = (state: RootState) => state.admin.value;
export const adminStatusSelector = (state: RootState) => state.admin.status;

export default adminSlice.reducer;