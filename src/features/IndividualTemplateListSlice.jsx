import { createSlice } from '@reduxjs/toolkit';

export const IndividualTemplateListSlice = createSlice({
    name: 'individualTemplateList',
    initialState: {value: null},
    reducers: {
        setIndividualTemplateList: (state, action) => {        
            state.value = action.payload;
        }
    }
})

export const {setIndividualTemplateList} = IndividualTemplateListSlice.actions;
export default IndividualTemplateListSlice.reducer;