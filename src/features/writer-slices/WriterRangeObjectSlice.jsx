import { createSlice } from '@reduxjs/toolkit';

export const WriterRangeObjectSlice = createSlice({
    name: 'writerRangeObject',
    initialState: {value: {range: null}},
    reducers: {
        setWriterRangeObject: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setWriterRangeObject} = WriterRangeObjectSlice.actions;
export default WriterRangeObjectSlice.reducer;