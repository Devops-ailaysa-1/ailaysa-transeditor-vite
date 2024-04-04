import { createSlice } from '@reduxjs/toolkit'

export const ModalConfirmationUserDecisionSlice = createSlice({
    name: 'modalConfirmationUserDecision',
    initialState: {value: null},
    reducers: {
        setModalConfirmationUserDecision: (state, action) => {
            // console.log('state: ' + state)
            state.value = action.payload
        }
    }
})

export const {setModalConfirmationUserDecision} = ModalConfirmationUserDecisionSlice.actions;
export default ModalConfirmationUserDecisionSlice.reducer;