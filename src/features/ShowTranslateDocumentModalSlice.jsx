import { createSlice } from '@reduxjs/toolkit';

export const ShowTranslateDocumentModalSlice = createSlice({
    name: 'ShowTranslateDocumentModalSlice',
    initialState: {value: false},
    reducers: {
        setShowTranslateDocumentModal: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setShowTranslateDocumentModal} = ShowTranslateDocumentModalSlice.actions;
export default ShowTranslateDocumentModalSlice.reducer;