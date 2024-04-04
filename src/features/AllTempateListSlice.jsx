import { createSlice } from '@reduxjs/toolkit'

export const AllTempateListSlice = createSlice({
    name: 'allTemplateList',
    initialState: {value: null},
    reducers: {
        setAllTemplateList: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setAllTemplateList} = AllTempateListSlice.actions;
export default AllTempateListSlice.reducer;