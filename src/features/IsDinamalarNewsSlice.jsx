import { createSlice } from '@reduxjs/toolkit';

export const IsDinamalarNewsSlice = createSlice({
    name: 'isDinamalarNews',
    initialState: {value: false},
    reducers: {
        setIsDinamalarNews: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setIsDinamalarNews} = IsDinamalarNewsSlice.actions;
export default IsDinamalarNewsSlice.reducer;