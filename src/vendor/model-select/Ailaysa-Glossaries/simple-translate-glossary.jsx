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
import { setSimpleTranslateGlossaryModal } from '../../../features/SimpleTranslateGlossaryModalSlice';
import Config from '../../Config';

export const SimpleTranslateGlossaryModal = (props) => {

    let { documentDetails, defaultGlossDetailsRef, getDefaultGlossDetails, glossTaskId } = props

    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const showSimpleTranslateGlossaryModal = useSelector(state => state.showSimpleTranslateGlossaryModal.value)

    const [activeScreen, setActiveScreen] = useState(1);
    const [glossaryList, setGlossaryList] = useState([])
    const [defaultGlossDetails, setDefaultGlossDetails] = useState(null);
    const [selectedGlossaryList, setSelectedGlossaryList] = useState([])
    const projectFilesListRef = useRef([])
    const [selectedTaskId, setSelectedTaskId] = useState(null)

    useEffect(() => {
        if(showSimpleTranslateGlossaryModal && documentDetails){
            setActiveScreen(1)
        }
    }, [showSimpleTranslateGlossaryModal, documentDetails])

    useEffect(() => {
        if(glossTaskId){
            setSelectedTaskId(glossTaskId)
        }
    }, [glossTaskId])

    useEffect(() => {
        if(showSimpleTranslateGlossaryModal){
            setTimeout(() => {
                getDefaultGlossDetails()
            }, 1000);
        }
    }, [showSimpleTranslateGlossaryModal])

    
    useEffect(() => {
        if(showSimpleTranslateGlossaryModal){
            setDefaultGlossDetails(defaultGlossDetailsRef?.current)
            getGlossaryList()
            getSelectedGlossaries()
            getProjectFiles()
        }
    }, [defaultGlossDetailsRef?.current, showSimpleTranslateGlossaryModal])
    
    /**
     * This method used to close the glossary modal popup update the state value.
     */
    const closeGlossaryModal = () => {
        dispatch(setSimpleTranslateGlossaryModal(false))
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

    const getGlossaryList = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossaries/${documentDetails.project}/?option=glossary&task=${documentDetails.task_id}`,
            auth: true,
            success: (response) => {
                let res = response.data?.filter(each => each.glossary_id != defaultGlossDetailsRef?.current?.gloss_id)
                setGlossaryList(res)
            },
            error: (err) => {
                // setisGlossaryListLoading(false)
            }
        });
    };

    const getProjectFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${documentDetails.project}/?task=${documentDetails.task_id}`,
            auth: true,
            success: (response) => {
                try {
                    // exclude the pdf files from the list - pdf files can't be used for term extraction
                    let list = response.data.files.filter(each => each.filename.split('.')[1].toLowerCase() !== 'pdf')
                    projectFilesListRef.current = list
                } catch(e) {
                    console.log(e)
                }
            },
        });
    }

    return (
        <>
            {showSimpleTranslateGlossaryModal && (
                <Rodal
                    className="prompt-library-modal" 
                    visible={showSimpleTranslateGlossaryModal} 
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
                                    glossTaskId={defaultGlossDetails ? defaultGlossDetails?.gloss_task_id
                                        : documentDetails && documentDetails.task_id ? documentDetails.task_id : selectedTaskId}
                                    isFrom = 'Simple_Glossary'
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
                                    excludedTermsOption={[2]}
                                    defaultActiveImportTab={1}
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
