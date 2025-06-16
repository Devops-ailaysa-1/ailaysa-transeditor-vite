import { createSlice } from '@reduxjs/toolkit';

export const BookLevelOptionSlice = createSlice({
    name: 'levelOption',
    initialState: {value: []},
    reducers: {
        setLevelOption: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setLevelOption} = BookLevelOptionSlice.actions;
export default BookLevelOptionSlice.reducer;