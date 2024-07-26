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

    let { documentDetails } = props

    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const showAilaysaGlossaryModal = useSelector(state => state.showAilaysaGlossaryModal.value)

    const [activeScreen, setActiveScreen] = useState(1);
    const [defaultGlossDetails, setDefaultGlossDetails] = useState(null);

    const glossaryListRef = useRef([])
    const selectedGlossaryListRef = useRef([])
    const projectFilesListRef = useRef([])
    const defaultGlossDetailsRef = useRef(null)

    useEffect(() => {
        if(showAilaysaGlossaryModal && documentDetails){
            setActiveScreen(1)
            getDefaultGlossDetails()
        }
    }, [showAilaysaGlossaryModal, documentDetails])
    

    const closeGlossaryModal = () => {
        dispatch(setShowAilaysaGlossaryModal(false))
    } 

    const getDefaultGlossDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/get_default_gloss?trans_project_id=${documentDetails.project}&task=${documentDetails.task_id}`,
            auth: true,
            success: (response) => {
                defaultGlossDetailsRef.current = response.data
                setDefaultGlossDetails(response.data)
                getGlossaryList()
                getSelectedGlossaries()
                getProjectFiles()
            },
            error: (err) => {
                // setisGlossaryListLoading(false)
            }
        });
    } 

    const getGlossaryList = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossaries/${documentDetails.project}/?option=glossary`,
            auth: true,
            success: (response) => {
                glossaryListRef.current = response.data?.filter(each => each.glossary_id != defaultGlossDetailsRef.current.gloss_id)
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
                selectedGlossaryListRef.current = response.data?.filter(each => each.id != defaultGlossDetailsRef.current.gloss_id)
                
            },
        });
    };

    const getProjectFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${documentDetails.project}/`,
            auth: true,
            success: (response) => {
                projectFilesListRef.current = response.data.files
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
                                
                                <span className={[activeScreen === 1 ? "-ml-10" : "opacity-50"].join(" ")}>
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
                                    glossTaskId={defaultGlossDetails?.gloss_task_id}
                                />
                            ) : (
                                <ImportTerms 
                                    glossaryListRef={glossaryListRef}
                                    selectedGlossaryListRef={selectedGlossaryListRef}
                                    projectFilesListRef={projectFilesListRef}
                                    projectId={documentDetails.project}
                                    taskId={documentDetails.task_id}
                                    getGlossaryList={getGlossaryList}
                                    getSelectedGlossaries={getSelectedGlossaries}
                                    setActiveScreen={setActiveScreen}
                                />
                            )}
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
