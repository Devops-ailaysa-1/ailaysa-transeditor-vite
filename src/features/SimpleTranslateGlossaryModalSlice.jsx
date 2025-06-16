/**
 * Redux slice to manage the visiblity state of the Simple Translate Glossary Modal.
 * This modal is used in the translation UI to show glossary-related information.
 * 
 * @author Padmabharathi Subiramanian 
 * @since  APR 09 2025
 */
import { createSlice } from '@reduxjs/toolkit';

export const SimpleTranslateGlossaryModalSlice = createSlice({
    name: 'SimpleTranslateGlossaryModalSlice',
    initialState: {value: false},
    reducers: {
        setSimpleTranslateGlossaryModal: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setSimpleTranslateGlossaryModal} = SimpleTranslateGlossaryModalSlice.actions;
export default SimpleTranslateGlossaryModalSlice.reducer;