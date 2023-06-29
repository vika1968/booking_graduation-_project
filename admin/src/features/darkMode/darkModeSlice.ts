

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
interface DarkModeState {
  darkMode: boolean;
}

const INITIAL_STATE: DarkModeState = {
  darkMode: false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;    
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

