import { createSlice } from '@reduxjs/toolkit';

export const EditorSettingStatusSlice = createSlice({
    name: 'editorSettingStatus',
    initialState: {value: false},
    reducers: {
        setEditorSettingStatus: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setEditorSettingStatus} = EditorSettingStatusSlice.actions;
export default EditorSettingStatusSlice.reducer;