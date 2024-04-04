import React, { useEffect, useState } from 'react'
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from "../vendor/Config";
import { ButtonBase } from '@mui/material'
import { useTranslation } from "react-i18next";
import { ButtonLoader } from '../loader/CommonBtnLoader';
import CircularProgress from '@mui/material/CircularProgress';
// import { IOSSwitch } from '../vendor/custom-component/IOSSwitch';
import DocViewer , { DocViewerRenderers }from "@cyntler/react-doc-viewer";
import BlackCloseIcon from "../assets/images/new-ui-icons/close_black.svg"

const StorySingleViewModal = (props) => {
    let { 
        isViewStoryModal,
        setIsViewStoryModal,
        selectedStoryDetails,
        setSelectedStoryDetails
    } = props
    const { t } = useTranslation();
    // const history = useHistory()
    const [storyDetails, setStoryDetails] = useState(null)
    const [langtoggle, setLangtoggle] = useState('src')
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFileDisplay, setIsFileDisplay] = useState(false)

    const changeDateFormat = (date) => {
        if(date === null || date === undefined) return ""
        let dateObj = new Date(date);
        return dateObj.toDateString() + ", " + dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } 

    useEffect(() => {

        let storyData = selectedStoryDetails?.data !== undefined ? 
        (
            selectedStoryDetails?.open === 'src' ? 
            (
                Object?.keys(selectedStoryDetails?.data?.source_json)?.length !== 0 ? 
                selectedStoryDetails?.data?.source_json :
                (selectedStoryDetails?.data?.source_file_path !== null ? selectedStoryDetails?.data?.source_file_path : {})
            ) : (
                Object?.keys(selectedStoryDetails?.data?.target_json)?.length !== 0 ?
                selectedStoryDetails?.data?.target_json :
                (selectedStoryDetails?.data?.target_file_path !== null ? selectedStoryDetails?.data?.target_file_path : {})
            )
        ) :
        selectedStoryDetails

        if(selectedStoryDetails?.open === 'src'){
            if(
                selectedStoryDetails?.data !== undefined && 
                Object?.keys(selectedStoryDetails?.data?.source_json)?.length === 0 &&
                selectedStoryDetails?.data?.source_file_path !== null
            ){
                setIsFileDisplay(true)
            }else setIsFileDisplay(false)
        }else{
            if(
                selectedStoryDetails?.data !== undefined && 
                Object?.keys(selectedStoryDetails?.data?.target_json)?.length === 0 &&
                selectedStoryDetails?.data?.target_file_path !== null
            ){
                setIsFileDisplay(true)
            }else setIsFileDisplay(false)
        }
        
        setStoryDetails(storyData)

        setLangtoggle(selectedStoryDetails?.open)
    }, [selectedStoryDetails])
    

    const switchLang = (value) => {
        setLangtoggle(value)
        let storyData = null
        if(value === 'src'){
            storyData = Object?.keys(selectedStoryDetails?.data?.source_json)?.length !== 0 ? 
            selectedStoryDetails?.data?.source_json :
            (selectedStoryDetails?.data?.source_file_path !== null ? selectedStoryDetails?.data?.source_file_path : {})
            setStoryDetails(storyData)
            if(
                selectedStoryDetails?.data !== undefined && 
                Object?.keys(selectedStoryDetails?.data?.source_json)?.length === 0 &&
                selectedStoryDetails?.data?.source_file_path !== null
            ){
                setIsFileDisplay(true)
            }else setIsFileDisplay(false)
        }else{
            storyData = Object?.keys(selectedStoryDetails?.data?.target_json)?.length !== 0 ? 
            selectedStoryDetails?.data?.target_json :
            (selectedStoryDetails?.data?.target_file_path !== null ? selectedStoryDetails?.data?.target_file_path : {})
            setStoryDetails(storyData)
            if(
                selectedStoryDetails?.data !== undefined && 
                Object?.keys(selectedStoryDetails?.data?.target_json)?.length === 0 &&
                selectedStoryDetails?.data?.target_file_path !== null
            ){
                setIsFileDisplay(true)
            }else setIsFileDisplay(false)
        }
    }

    return (
        <>
            {isViewStoryModal && (
                <Rodal className="view-story-modal-wrapper" visible={isViewStoryModal} showCloseButton={false} onClose={() => console.log()}>
                    <div className="view-story-modal-inner-wrapper">
                        <div className='view-story-header'>
                            <h1 className="title mr-1">Story view</h1>
                            {selectedStoryDetails?.pair !== undefined && (
                                <div className="analyse-word-character-toggle-wrapper story-view-modal-lang-wrapper">
                                    <span onClick={() => switchLang('src')} className={"toggle-tag " + (langtoggle === 'src' ? "active" : "")}>
                                        {selectedStoryDetails?.pair?.split("->")[0]}
                                    </span>
                                    <span onClick={() => switchLang('tar')} className={"toggle-tag " + (langtoggle === 'tar' ? "active" : "")}>
                                        {selectedStoryDetails?.pair?.split("->")[1]}
                                    </span>
                                </div>
                            )}
                            <span className="close-btn" onClick={() => { setIsViewStoryModal(false); setSelectedStoryDetails(null) }}>
                                <img src={BlackCloseIcon} alt="close_black" />
                            </span>
                        </div>
                        <div className="story-main-wrapper">
                            {storyDetails === null ? (
                                <div className='story-loading-wrapper'>
                                    <CircularProgress sx={{ color: '#0074d3' }} style={{height: '60px', width: '60px'}} />
                                </div>
                            ) : (Object.keys(storyDetails)?.length !== 0 && !isFileDisplay) ? (
                                <>
                                    {storyDetails?.mediaId && (
                                        <div className={"story-img-wrapper " + (!imageLoaded ? "skeleton-box" : "")}>
                                            <img 
                                                src={storyDetails?.mediaId} 
                                                style={{display: imageLoaded ? 'block' : 'none' }}
                                                onLoad={(e) => setImageLoaded(true)} 
                                                alt="story-imh"
                                            />
                                        </div>
                                    )}
                                    <div className="story-main-content">
                                        {storyDetails?.image_caption && (
                                            <p className='story-excerpt'>{storyDetails?.image_caption}</p>
                                        )}
                                        {storyDetails?.maincat_name && (
                                            <ul className='story-category-list'>
                                                <li className="cate-item">{storyDetails?.maincat_name}</li>
                                            </ul>
                                        )}
                                        
                                        <div className='story-title-wrap'>
                                            <h1 className='title'>{storyDetails?.heading}</h1>
                                            <p className='main-excerpt'>{storyDetails?.description}</p>
                                        </div>
                                        <div className='author-wrapper'>
                                            <h1 className='author-name'>{storyDetails?.authorName}</h1>
                                            <p className='author-date-and-item'>{changeDateFormat(storyDetails?.date_created)}</p>
                                        </div>
                                        <div className='story-body-wrap' dangerouslySetInnerHTML={{__html: storyDetails?.story?.replace(/\n/g, "<br />")}}>
                                        </div>
                                        <ul className='story-category-list'>
                                            {storyDetails?.news_tags?.map((tag, ind) => {
                                                return (
                                                    <li key={ind} className="cate-item">{tag?.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </>
                            ) : isFileDisplay ? (
                                <>
                                    <DocViewer documents={[
                                        { uri: Config.BASE_URL + storyDetails }
                                    ]} pluginRenderers={DocViewerRenderers} />
                                </>
                            ) : (
                                <div className='story-loading-wrapper'>
                                    <p style={{opacity: 0.7}}>Translation not yet completed.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}

export default StorySingleViewModal