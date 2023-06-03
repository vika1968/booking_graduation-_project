import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "./userModel";
import { getUserByCookieMain } from "./userAPI";


export enum Status {
  LOADING = "loading",
  IDLE = "idle",
  FAILED = "failed",
}

export interface UserState {
  value: User | null;
  status: Status;
}

const initialState: UserState = {
  value: null,
  status: Status.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.value = null;
      state.status = Status.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByCookieMain.pending, (state) => {
        state.status = Status.LOADING;     
      })
      .addCase(getUserByCookieMain.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;       
      })
      .addCase(getUserByCookieMain.rejected, (state) => {
        state.status = Status.FAILED;
      })
  },
});

export const { resetUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user.value;
export const userStatusSelector = (state: RootState) => state.user.status;

export default userSlice.reducer;