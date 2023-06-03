import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import orderSlice from '../components/Orders/orderSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    order: orderSlice
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
