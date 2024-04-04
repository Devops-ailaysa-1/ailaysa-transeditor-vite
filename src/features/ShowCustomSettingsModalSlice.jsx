import { createSlice } from '@reduxjs/toolkit'

export const ShowCustomSettingsModalSlice = createSlice({
    name: 'showCustomSettingsModal',
    initialState: {value: false},
    reducers: {
        setShowCustomSettingsModal: (state, action) => {
            // console.log('state: ' + state)
            state.value = action.payload
        }
    }
})

export const {setShowCustomSettingsModal} = ShowCustomSettingsModalSlice.actions;
export default ShowCustomSettingsModalSlice.reducer;