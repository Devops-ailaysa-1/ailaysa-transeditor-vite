import { createSlice } from "@reduxjs/toolkit";

export const SegmentChoiceListSlice = createSlice({
    name: 'segmentChoiceList',
    initialState: {value: []},
    reducers: {
        setSegmentChoiceList: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setSegmentChoiceList} = SegmentChoiceListSlice.actions;
export default SegmentChoiceListSlice.reducer;