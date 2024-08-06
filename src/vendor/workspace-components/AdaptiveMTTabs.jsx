import React, { useState } from 'react'
import { AITab } from '../../components/AITabs/AITab'
import { useSelector } from 'react-redux'
import Config from '../Config'

export const AdaptiveMTTabs = (props) => {

    let {
        segmentId,
        updateTranslatedResponseSegment,
        updateSegmentStatus,
        changeEditedStatus,
        updateTranslationById,
        focusedDivIdRef,
        setIsSegmentDataLoading,
        forcedLoaderRef
    } = props
    
    const segmentChoiceList = useSelector(state => state.segmentChoiceList.value)
    const [activeSegChoice, setActiveSegChoice] = useState(1)


    const handleOptionChange = (selectedOption) => {
        setActiveSegChoice(selectedOption.value)
        
        setIsSegmentDataLoading(true)
        forcedLoaderRef.current = true

        Config.axios({
            url: Config.BASE_URL + `/workspace/get_segment_choice?segment_id=${segmentId}&seg_choice_id=${selectedOption.value}`,
            auth: true,
            success: (response) => {
                updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", response.data.result + response.data.tag);
                updateSegmentStatus(focusedDivIdRef.current, 103);
                // changeEditedStatus(focusedDivIdRef.current, "unsaved");
                setTimeout(() => {
                    updateTranslationById(null, focusedDivIdRef.current, true, { forceUpdate: true });
                }, 200);
                setIsSegmentDataLoading(false)
                forcedLoaderRef.current = false
            },
            error: (err) => {
                setIsSegmentDataLoading(false)
                forcedLoaderRef.current = false
            }
        });
    }

    return (
        <div className='flex-1'>
            <AITab 
                onChange={handleOptionChange}
                activeTab={activeSegChoice}
                dataList={segmentChoiceList}
                innerTabClass="text-sm"
                customClass="w-4/5"
            />

        </div>
    )
}
