import { createSlice } from '@reduxjs/toolkit';

export const BookBackMatterOptionSlice = createSlice({
    name: 'bookBackMatterOption',
    initialState: {value: []},
    reducers: {
        setBookBackMatterOption: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setBookBackMatterOption} = BookBackMatterOptionSlice.actions;
export default BookBackMatterOptionSlice.reducer;