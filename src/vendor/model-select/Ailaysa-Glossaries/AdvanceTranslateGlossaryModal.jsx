import React, { useEffect, useRef, useState } from 'react'
import './ailaysa_glossaries.css'
import { useTranslation } from 'react-i18next'
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import AilaysaNewGlossEditingArea from '../../project-type-selection/wordchoice-workspace/AilaysaNewGlossEditingArea';
import { ImportTerms } from './sub-components/ImportTerms';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Config from '../../Config';
import { setAdvanceTranslateGlossaryModal } from '../../../features/AdvanceTranslateGlossaryModalSlice';

export const AdvanceTranslateGlossaryModal = (props) => {

    let { documentDetails, defaultGlossDetailsRef, getDefaultGlossDetails, glossTaskId } = props

    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const showAdvanceTranslateGlossaryModal = useSelector(state => state.showAdvanceTranslateGlossaryModal.value)

    const [activeScreen, setActiveScreen] = useState(1);
    const [glossaryList, setGlossaryList] = useState([])
    const [selectedGlossaryList, setSelectedGlossaryList] = useState([])
    const projectFilesListRef = useRef([])
    const [selectedTaskId, setSelectedTaskId] = useState(null)

    useEffect(() => {
        if(showAdvanceTranslateGlossaryModal && documentDetails){
            setActiveScreen(1)
        }
    }, [showAdvanceTranslateGlossaryModal, documentDetails])

    useEffect(() => {
        if(glossTaskId){
            setSelectedTaskId(glossTaskId)
        }
    }, [glossTaskId])

    useEffect(() => {
        if(showAdvanceTranslateGlossaryModal){
            setTimeout(() => {
                getDefaultGlossDetails()
            }, 1000);
        }
    }, [showAdvanceTranslateGlossaryModal])
    
    /**
     * This method used to close the glossary modal popup update the state value.
     */
    const closeGlossaryModal = () => {
        dispatch(setAdvanceTranslateGlossaryModal(false))
    } 

    const getSelectedGlossaries = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${documentDetails.project}&option=glossary`,
            auth: true,
            success: (response) => {
                console.log("selected gloss")
                console.log(response.data)
                console.log("default gloss")
                console.log(defaultGlossDetailsRef?.current)
                let res = response.data?.filter(each => each.glossary != defaultGlossDetailsRef?.current?.gloss_id)
                console.log("default gloss removed")
                console.log(res)
                setSelectedGlossaryList(res)
            },
        });
    };


    return (
        <>
            {showAdvanceTranslateGlossaryModal && (
                <Rodal
                    className="prompt-library-modal" 
                    visible={showAdvanceTranslateGlossaryModal} 
                    onClose={closeGlossaryModal}
                    showCloseButton={false}
                >
                    <div className="prompt-library-wrapper">
                        <div className="file-list-assign-manage-header d-flex justify-between items-center">
                            <h3 className="title flex items-center gap-3">
                                <IconButton
                                    className={[activeScreen === 1 ? "invisible" : "visible"].join(' ')} 
                                    onClick={() => setActiveScreen(1)}
                                >
                                    <ArrowBackOutlinedIcon />
                                </IconButton>
                                
                                <span 
                                    className={[
                                        activeScreen === 1 ? "-ml-10" : "opacity-50",
                                        activeScreen === 2 && "hover:underline hover:cursor-pointer"
                                    ].join(" ")}
                                    onClick={() => activeScreen === 2 && setActiveScreen(1)}
                                >
                                    {t("ailaysa_glossaries")}
                                </span>
                                {activeScreen === 2 && (
                                    <>
                                        <ArrowForwardIosOutlinedIcon style={{fontSize: '16px'}} />
                                        {t("import_terms")}
                                    </>
                                )}
                            </h3>
                            <IconButton onClick={closeGlossaryModal}>
                                <CloseIcon className="header-close" /> 
                            </IconButton>
                        </div>
                        <hr className="-ml-6 -mr-6" />
                        <div className="prompt-lib-modal-body glossary-view-modal">
                            {activeScreen === 1 ? (
                                <AilaysaNewGlossEditingArea 
                                    setActiveScreen={setActiveScreen}
                                    glossTaskId={selectedTaskId} //{defaultGlossDetails ? defaultGlossDetails?.gloss_task_id : documentDetails.task_id}
                                />
                            ) : (
                                <ImportTerms 
                                    glossaryList={glossaryList}
                                    selectedGlossaryList={selectedGlossaryList}
                                    projectFilesListRef={projectFilesListRef}
                                    projectId={documentDetails.project}
                                    taskId={defaultGlossDetailsRef?.current?.gloss_job_id} //{documentDetails.task_id}
                                    showExtractTermsOption={[17]?.includes(documentDetails.source_language_id )  ? true : false}
                                    getSelectedGlossaries={getSelectedGlossaries}
                                    setActiveScreen={setActiveScreen}
                                    defaultGlossDetailsRef={defaultGlossDetailsRef}
                                    excludedTermsOption={[1,2]}
                                    defaultActiveImportTab={3}
                                    isFrom = {"simpleGlossary"}
                                />
                            )}
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
