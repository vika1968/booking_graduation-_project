

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface DarkModeState {
  darkMode: boolean;
}

type DarkModeAction =
  | { type: "IGHT" }
  | { type: "DARK" }
  | { type: "TOGGLE" };

const INITIAL_STATE: DarkModeState = {
  darkMode: false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: INITIAL_STATE,
  reducers: {
    // setDarkMode: (state, action: PayloadAction<boolean>) => {
    //   state.darkMode = action.payload;
    //   console.log('setDarkMode')
    // },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    //  console.log('toggleDarkMode')
    },
  },
  extraReducers: (builder) => {
    builder.addCase("LIGHT", (state) => {
      state.darkMode = false;
    });
    builder.addCase("DARK", (state) => {
      state.darkMode = true;  
    });
    builder.addCase("TOGGLE", (state) => {
      state.darkMode = !state.darkMode;
    });
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export const darkModeSelector = (state: RootState) => state.darkMode.darkMode;
export default darkModeSlice.reducer;

