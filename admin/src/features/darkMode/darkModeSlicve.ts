import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
  darkMode: boolean;
}

type DarkModeAction =
  | { type: "LIGHT" }
  | { type: "DARK" }
  | { type: "TOGGLE" };

const INITIAL_STATE: DarkModeState = {
  darkMode: false,  
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: INITIAL_STATE,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;


// export const { resetAdmin } = adminSlice.actions;
// export const adminSelector = (state: RootState) => state.admin.value;
// export const adminStatusSelector = (state: RootState) => state.admin.status;


// import { useDispatch, useSelector } from "react-redux";
// import { setDarkMode, toggleDarkMode } from "./darkModeSlice";

// const MyComponent = () => {
//   const dispatch = useDispatch();
//   const darkMode = useSelector((state) => state.darkMode.darkMode);

//   const handleToggleDarkMode = () => {
//     dispatch(toggleDarkMode());
//   };

//   const handleSetDarkMode = (value) => {
//     dispatch(setDarkMode(value));
//   };

//   return (
//     <div>
//       <h1>Dark Mode: {darkMode ? "On" : "Off"}</h1>
//       <button onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
//       <button onClick={() => handleSetDarkMode(true)}>Enable Dark Mode</button>
//       <button onClick={() => handleSetDarkMode(false)}>Disable Dark Mode</button>
//     </div>
//   );
// };

// export default MyComponent;
