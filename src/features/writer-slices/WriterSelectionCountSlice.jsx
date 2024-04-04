import { createSlice } from '@reduxjs/toolkit'

export const WriterSelectionCountSlice = createSlice({
    name: 'writerSelectionCount',
    initialState: {value: {char: 0, word: 0}},
    reducers: {
        setWriterSelectionWordCount: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setWriterSelectionWordCount} = WriterSelectionCountSlice.actions;
export default WriterSelectionCountSlice.reducer;