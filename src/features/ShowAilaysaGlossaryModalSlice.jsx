import { createSlice } from '@reduxjs/toolkit';

export const ShowAilaysaGlossaryModalSlice = createSlice({
    name: 'ShowAilaysaGlossaryModalSlice',
    initialState: {value: false},
    reducers: {
        setShowAilaysaGlossaryModal: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setShowAilaysaGlossaryModal} = ShowAilaysaGlossaryModalSlice.actions;
export default ShowAilaysaGlossaryModalSlice.reducer;