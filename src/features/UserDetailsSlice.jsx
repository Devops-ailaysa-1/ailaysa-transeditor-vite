import { createSlice } from '@reduxjs/toolkit';

export const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {value: null},
    reducers: {
        setUserDetails: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setUserDetails} = UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;