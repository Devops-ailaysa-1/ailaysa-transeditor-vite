import { createSlice } from '@reduxjs/toolkit'

export const BlogCreationSlice = createSlice({
    name: 'blogCreationResponse',
    initialState: {value: null},
    reducers: {
        setBlogCreationResponse: (state, action) => {
            // console.log(state)
            state.value = action.payload
        }
    }
})

export const {setBlogCreationResponse} = BlogCreationSlice.actions;
export default BlogCreationSlice.reducer;