import { createSlice } from '@reduxjs/toolkit'

export const symbolDialogSlice = createSlice({
    name: 'showWriterAudioPDFDialog',
    initialState: {value: false},
    reducers: {
        toggleDialogDisplay: (state, action) => {
            console.log('state: ' + state)
            state.value = action.payload
        }
    }
})


export const {toggleDialogDisplay} = symbolDialogSlice.actions;

export default symbolDialogSlice.reducer;