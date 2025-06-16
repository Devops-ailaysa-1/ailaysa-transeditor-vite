import { createSlice } from '@reduxjs/toolkit';

export const UnitTypeOptionSlice = createSlice({
    name: 'unitTypeOptions',
    initialState: {value: null},
    reducers: {
        setUnitTypeOptions: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setUnitTypeOptions} = UnitTypeOptionSlice.actions;
export default UnitTypeOptionSlice.reducer;