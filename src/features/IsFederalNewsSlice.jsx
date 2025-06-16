import { createSlice } from '@reduxjs/toolkit';

export const IsFederalNewsSlice = createSlice({
    name: 'isFederalNews',
    initialState: {value: false},
    reducers: {
        setIsFederalNews: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setIsFederalNews} = IsFederalNewsSlice.actions;
export default IsFederalNewsSlice.reducer;