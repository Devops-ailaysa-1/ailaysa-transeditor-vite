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
import { setShowAilaysaGlossaryModal } from '../../../features/ShowAilaysaGlossaryModalSlice';
import Config from '../../Config';

export const AilaysaGlossariesModal = (props) => {

    let { documentDetails, defaultGlossDetailsRef, getDefaultGlossDetails } = props

    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const showAilaysaGlossaryModal = useSelector(state => state.showAilaysaGlossaryModal.value)

    const [activeScreen, setActiveScreen] = useState(1);
    const [defaultGlossDetails, setDefaultGlossDetails] = useState(null);
    const [glossaryList, setGlossaryList] = useState([])
    const [selectedGlossaryList, setSelectedGlossaryList] = useState([])
    const projectFilesListRef = useRef([])

    useEffect(() => {
        if(showAilaysaGlossaryModal && documentDetails){
            setActiveScreen(1)
        }
    }, [showAilaysaGlossaryModal, documentDetails])

    useEffect(() => {
        if(showAilaysaGlossaryModal){
            setDefaultGlossDetails(defaultGlossDetailsRef?.current)
            getGlossaryList()
            getSelectedGlossaries()
            getProjectFiles()
        }
    }, [defaultGlossDetailsRef?.current, showAilaysaGlossaryModal])
    
    useEffect(() => {
        if(showAilaysaGlossaryModal){
            setTimeout(() => {
                getDefaultGlossDetails()
            }, 1000);
        }
    }, [showAilaysaGlossaryModal])
    

    const closeGlossaryModal = () => {
        dispatch(setShowAilaysaGlossaryModal(false))
    } 

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

    const getSelectedGlossaries = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${documentDetails.project}&option=glossary`,
            auth: true,
            success: (response) => {
                let res = response.data?.filter(each => each.glossary != defaultGlossDetailsRef?.current?.gloss_id);
                setSelectedGlossaryList(res);
            },
        });
    };

    const getProjectFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${documentDetails.project}/?task=${documentDetails.task_id}`,
            auth: true,
            success: (response) => {
                try {
                    // exclude the pdf files from the list - pdf files can't be used for term extraction
                    let list = response.data.files.filter(each => each.filename.split('.')[1].toLowerCase() !== 'pdf');
                    projectFilesListRef.current = list;
                } catch(e) {
                    console.error(e);
                }
            },
        });
    }

    return (
        <>
            {showAilaysaGlossaryModal && (
                <Rodal
                    className="prompt-library-modal" 
                    visible={showAilaysaGlossaryModal} 
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
                                    glossTaskId={defaultGlossDetails ? defaultGlossDetails?.gloss_task_id : documentDetails.task_id}
                                />
                            ) : (
                                <ImportTerms 
                                    glossaryList={glossaryList}
                                    selectedGlossaryList={selectedGlossaryList}
                                    projectFilesListRef={projectFilesListRef}
                                    projectId={documentDetails.project}
                                    taskId={documentDetails.task_id}
                                    showExtractTermsOption={[17]?.includes(documentDetails.source_language_id )  ? true : false}
                                    getSelectedGlossaries={getSelectedGlossaries}
                                    setActiveScreen={setActiveScreen}
                                    defaultGlossDetailsRef={defaultGlossDetailsRef}
                                    excludedTermsOption={[[17]?.includes(documentDetails.source_language_id )  ? 0 : 2]}
                                />
                            )}
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
