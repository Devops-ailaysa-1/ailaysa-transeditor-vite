import { createSlice } from '@reduxjs/toolkit'

export const ToggleGlossTermAddFormSlice = createSlice({
    name: 'toggleGlossTermAddForm',
    initialState: {value: false},
    reducers: {
        setShowGlossTermAddForm: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setShowGlossTermAddForm} = ToggleGlossTermAddFormSlice.actions;
export default ToggleGlossTermAddFormSlice.reducer;