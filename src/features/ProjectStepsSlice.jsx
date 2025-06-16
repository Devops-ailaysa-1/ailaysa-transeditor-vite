import { createSlice } from '@reduxjs/toolkit';

export const ProjectStepsSlice = createSlice({
    name: 'steps',
    initialState: {value: null},
    reducers: {
        setSteps: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setSteps} = ProjectStepsSlice.actions;
export default ProjectStepsSlice.reducer;