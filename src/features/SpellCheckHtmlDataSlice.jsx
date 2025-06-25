import { createSlice } from '@reduxjs/toolkit';

export const SpellCheckHtmlDataSlice = createSlice({
    name: 'SpellCheckHtmlDataSlice',
    initialState: {value: ''},
    reducers: {
        setSpellCheckHtmlData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setSpellCheckHtmlData} = SpellCheckHtmlDataSlice.actions;
export default SpellCheckHtmlDataSlice.reducer;