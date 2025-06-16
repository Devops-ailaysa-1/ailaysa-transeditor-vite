import { createSlice } from "@reduxjs/toolkit";

export const LanguageOptionSlice = createSlice({
    name: 'languageOptionList',
    initialState: {value: []},
    reducers: {
        setLanguageOptionsList: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setLanguageOptionsList} = LanguageOptionSlice.actions;
export default LanguageOptionSlice.reducer;