import { createSlice } from '@reduxjs/toolkit'

export const BookFrontMatterOptionSlice = createSlice({
    name: 'bookFrontMatterOption',
    initialState: {value: []},
    reducers: {
        setBookFrontMatterOption: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setBookFrontMatterOption} = BookFrontMatterOptionSlice.actions;
export default BookFrontMatterOptionSlice.reducer;