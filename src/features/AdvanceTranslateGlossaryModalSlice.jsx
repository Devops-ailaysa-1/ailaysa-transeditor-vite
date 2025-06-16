/**
 * Redux slice to manage the visiblity state of the Advance Translate Glossary Modal.
 * This modal is used in the translation UI to show glossary-related information.
 * 
 * @author Padmabharathi Subiramanian 
 * @since  APR 22 2025
 */
import { createSlice } from '@reduxjs/toolkit';

export const AdvanceTranslateGlossaryModalSlice = createSlice({
    name: 'SimpleTranslateGlossaryModalSlice',
    initialState: {value: false},
    reducers: {
        setAdvanceTranslateGlossaryModal: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setAdvanceTranslateGlossaryModal} = AdvanceTranslateGlossaryModalSlice.actions;
export default AdvanceTranslateGlossaryModalSlice.reducer;