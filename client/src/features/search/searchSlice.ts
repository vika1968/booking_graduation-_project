
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
interface DateRange {
    startDate: Date;
    endDate: Date;
}
interface SearchItem {
    city: string | undefined;
    dates: DateRange[];
    options: {
        minPrice: number | 0;
        maxPrice: number | 1000000;
        adult: number | 1;
        children: number | 0;
        room: number | 1;
    };
}
export interface SearchState {
    value: SearchItem | null;
}

const initialState: SearchState = {
    value: null,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearch: (state, action) => {
            state.value = action.payload
        },  
        updateSearch: (state, action) => {                
            state.value!.city = action.payload                 
        },      
        resetSearch: (state) => {
            state.value = null;
        },
    },
});

export const { addSearch, updateSearch, resetSearch } = searchSlice.actions;
export const searchSelector = (state: RootState) => state.search.value;
export default searchSlice.reducer;








