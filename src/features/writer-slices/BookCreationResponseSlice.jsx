import { createSlice } from '@reduxjs/toolkit'

export const BookCreationResponseSlice = createSlice({
    name: 'bookCreationResponse',
    initialState: {value: []},
    reducers: {
        setBookCreationResponse: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setBookCreationResponse} = BookCreationResponseSlice.actions;
export default BookCreationResponseSlice.reducer;