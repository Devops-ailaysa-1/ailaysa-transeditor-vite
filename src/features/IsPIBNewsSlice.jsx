import { createSlice } from '@reduxjs/toolkit';

export const IsPIBNewsSlice = createSlice({
    name: 'isPIBNews',
    initialState: {value: false},
    reducers: {
        setIsPIBNews: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setIsPIBNews} = IsPIBNewsSlice.actions;
export default IsPIBNewsSlice.reducer;