import { createSlice } from '@reduxjs/toolkit'

export const CurrencyOptionSlice = createSlice({
    name: 'currencyOptions',
    initialState: {value: null},
    reducers: {
        setCurrencyOptions: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setCurrencyOptions} = CurrencyOptionSlice.actions;
export default CurrencyOptionSlice.reducer;