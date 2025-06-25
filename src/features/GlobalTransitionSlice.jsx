import { createSlice } from '@reduxjs/toolkit';

export const GlobalTransitionSlice = createSlice({
    name: 'editorSettingAlertModal',
    initialState: {value: false},
    reducers: {
        setShowGlobalTransition: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setShowGlobalTransition} = GlobalTransitionSlice.actions;
export default GlobalTransitionSlice.reducer;