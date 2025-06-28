import { createSlice } from '@reduxjs/toolkit';

export const ShowAdaptiveTransIntroModalSlice = createSlice({
    name: 'showAdaptiveTransIntroModal',
    initialState: {value: false},
    reducers: {
        setShowAdaptiveMTIntroModal: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setShowAdaptiveMTIntroModal} = ShowAdaptiveTransIntroModalSlice.actions;
export default ShowAdaptiveTransIntroModalSlice.reducer;