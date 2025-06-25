import { createSlice } from '@reduxjs/toolkit';

export const BookGenreOptionSlice = createSlice({
    name: 'genreOption',
    initialState: {value: []},
    reducers: {
        setGenreOption: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setGenreOption} = BookGenreOptionSlice.actions;
export default BookGenreOptionSlice.reducer;