import { createSlice } from '@reduxjs/toolkit';

export const BookContentLossAlertModalSlice = createSlice({
    name: 'showBookContentLossAlertModal',
    initialState: {value: false},
    reducers: {
        setShowBookContentLossAlertModal: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setShowBookContentLossAlertModal} = BookContentLossAlertModalSlice.actions;
export default BookContentLossAlertModalSlice.reducer;