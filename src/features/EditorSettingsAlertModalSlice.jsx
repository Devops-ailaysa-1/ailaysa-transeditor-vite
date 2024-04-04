import { createSlice } from '@reduxjs/toolkit'

export const EditorSettingsAlertModalSlice = createSlice({
    name: 'editorSettingAlertModal',
    initialState: {value: false},
    reducers: {
        setEditorSettingAlertModal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setEditorSettingAlertModal} = EditorSettingsAlertModalSlice.actions;
export default EditorSettingsAlertModalSlice.reducer;