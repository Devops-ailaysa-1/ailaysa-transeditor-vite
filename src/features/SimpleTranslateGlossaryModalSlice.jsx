import { createSlice } from '@reduxjs/toolkit'

export const SimpleTranslateGlossaryModalSlice = createSlice({
    name: 'SimpleTranslateGlossaryModalSlice',
    initialState: {value: false},
    reducers: {
        setSimpleTranslateGlossaryModal: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setSimpleTranslateGlossaryModal} = SimpleTranslateGlossaryModalSlice.actions;
export default SimpleTranslateGlossaryModalSlice.reducer;