import { createSlice } from '@reduxjs/toolkit'

export const FileDownloadingListSlice = createSlice({
    name: 'fileDownloadingList',
    initialState: { value: [] },
    reducers: {
        addDownloadingFiles: (state, action) => {
            state.value.unshift(action.payload)
        },
        updateDownloadingFile: (state, action) => {
            state.value.map(obj => {
                if(obj.id === action.payload.id){
                    obj.status = action.payload.status
                }
            })
        },
        deleteDownloadingFile: (state, action) => {
            state.value = state.value.filter(each => each.id !== action.payload.id)
        },
        clearAllFiles: (state, action) => {
            state.value = []
        }
    }
})

export const { addDownloadingFiles, updateDownloadingFile, deleteDownloadingFile, clearAllFiles } = FileDownloadingListSlice.actions;
export default FileDownloadingListSlice.reducer; 