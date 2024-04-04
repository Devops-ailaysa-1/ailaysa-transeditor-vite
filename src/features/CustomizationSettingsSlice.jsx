import { createSlice } from '@reduxjs/toolkit'

export const customizationSettingsSlice = createSlice({
    name: 'defaultSettings',
    initialState: {value: {id : null, mt_engine: null, newline: null, append: null, result_in_modal: true}},
    reducers: {
        setDefaultSettings: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setDefaultSettings} = customizationSettingsSlice.actions;
export default customizationSettingsSlice.reducer;