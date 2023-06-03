import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface OrderItem {  
    movieID: number;
    date: string;
    seatNumber: number;    
    userID: number;
}

export interface orderstate {
  orders: OrderItem[];
}

const initialState: orderstate = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,  
  reducers: { 
    Add_Order: (state, action: PayloadAction<OrderItem>) => {
        const isDuplicate = state.orders.some((item) => item.movieID === action.payload.movieID && item.date === action.payload.date && item.seatNumber === action.payload.seatNumber && item.userID === action.payload.userID);
        if (!isDuplicate) {
          const temp = { ...action.payload };
          state.orders.push(temp);
        }
      },
      reset_Orders: (state) => {
        state.orders = []; 
      },
  
  },
});

export const { Add_Order, reset_Orders } = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;
export default orderSlice.reducer;
