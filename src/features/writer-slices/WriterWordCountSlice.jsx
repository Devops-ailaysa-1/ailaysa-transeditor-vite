import { createSlice } from '@reduxjs/toolkit'

export const WriterWordCountSlice = createSlice({
    name: 'writerWordCount',
    initialState: {value: {char: 0, word: 0}},
    reducers: {
        setWriterWordCount: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setWriterWordCount} = WriterWordCountSlice.actions;
export default WriterWordCountSlice.reducer;