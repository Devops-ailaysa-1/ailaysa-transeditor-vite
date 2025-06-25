import { createSlice } from "@reduxjs/toolkit";

export const MtEngineOptionSlice = createSlice({
    name: 'mtEngineOption',
    initialState: {value: []},
    reducers: {
        setMtEngineOption: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setMtEngineOption} = MtEngineOptionSlice.actions;
export default MtEngineOptionSlice.reducer;