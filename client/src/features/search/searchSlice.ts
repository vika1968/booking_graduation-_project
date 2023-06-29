
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
        adult: number | undefined;
        children: number | undefined;
        room: number | undefined;
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
        resetSearch: (state) => {
            state.value = null;
        },
    },
});

export const { addSearch, resetSearch } = searchSlice.actions;
export const searchSelector = (state: RootState) => state.search.value;
export default searchSlice.reducer;








