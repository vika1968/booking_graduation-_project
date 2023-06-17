import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminSlice from '../features/admin/adminSlice';
import  darkModeSlice  from '../features/darkMode/darkModeSlicve';
//import adminSlice from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    darkMode: darkModeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

