import writerWordCountReducer from '../writer-slices/WriterWordCountSlice'
import writerSelectionCountReducer from '../writer-slices/WriterSelectionCountSlice'
import writerRangeObjectReducer from '../writer-slices/WriterRangeObjectSlice'
import bookLevelOptionReducer from '../writer-slices/BookLevelOptionSlice'
import bookGenreOptionReducer from '../writer-slices/BookGenreOptionSlice'
import bookFrontMatterOptionReducer from '../writer-slices/BookFrontMatterOptionSlice'
import bookBackMatterOptionReducer from '../writer-slices/BookBackMatterOptionSlice'
import bookContentLossAlertModalReducer from '../writer-slices/BookContentLossAlertModalSlice'
import modalConfirmationUserDecisionreducer from '../writer-slices/ModalConfirmationUserDecisionSlice'
import bookCreationResponseReducer from '../writer-slices/BookCreationResponseSlice'

export const writerReducers = {
    writerWordCounts: writerWordCountReducer,
    writerSelectionCount: writerSelectionCountReducer,
    writerRangeObeject: writerRangeObjectReducer,
    bookLevelOption: bookLevelOptionReducer,
    bookGenreOption: bookGenreOptionReducer,
    bookFrontMatterOption: bookFrontMatterOptionReducer,
    bookBackMatterOption: bookBackMatterOptionReducer,
    bookContentLossAlertModal: bookContentLossAlertModalReducer,
    modalConfirmationUserDecision: modalConfirmationUserDecisionreducer,
    bookCreationResponse: bookCreationResponseReducer
}