/**
 * This modal represents the simple file translation glossary option.
 * 
 * @author Padmabharathi Subiramanian 
 * @since  APR 09 2025
 */
import React, { useEffect, useRef, useState } from 'react';
import './ailaysa_glossaries.css';
import { useTranslation } from 'react-i18next';
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
    let { documentDetails, defaultGlossDetailsRef, getDefaultGlossDetails, glossTaskId, glossaryProjectId } = props;

    const {t} = useTranslation();
    const dispatch = useDispatch();    
    const showSimpleTranslateGlossaryModal = useSelector(state => state.showSimpleTranslateGlossaryModal.value);

    const [activeScreen, setActiveScreen] = useState(1);
    const [glossaryList, setGlossaryList] = useState([]);
    const [defaultGlossDetails, setDefaultGlossDetails] = useState(null);
    const [selectedGlossaryList, setSelectedGlossaryList] = useState([]);
    const projectFilesListRef = useRef([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        if(showSimpleTranslateGlossaryModal && documentDetails){
            setActiveScreen(1);
        }
    }, [showSimpleTranslateGlossaryModal, documentDetails]);

    useEffect(() => {
        if(glossTaskId){
            setSelectedTaskId(glossTaskId);
        }
    }, [glossTaskId]);

    useEffect(() => {
        if(showSimpleTranslateGlossaryModal){
            setTimeout(() => {
                getDefaultGlossDetails();
            }, 1000);
        }
    }, [showSimpleTranslateGlossaryModal]);
    
    useEffect(() => {
        if(showSimpleTranslateGlossaryModal){
            setDefaultGlossDetails(defaultGlossDetailsRef?.current);
            getGlossaryList();
            getSelectedGlossaries();
        }
    }, [defaultGlossDetailsRef?.current, showSimpleTranslateGlossaryModal]);
    
    /**
     * This method used to close the glossary modal popup update the state value.
     * 
     * @author Padmabharathi Subiramanian 
     * @since APR 09 2025
     */
    const closeGlossaryModal = () => {
        dispatch(setSimpleTranslateGlossaryModal(false));
    } 

    /**
     * This method used to get the selected glossary projects for that particular glossary project.
     * 
     * @author Padmabharathi Subiramanian 
     * @sice JUN 18 2025
     */
    const getSelectedGlossaries = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${glossaryProjectId}&option=glossary`,
            auth: true,
            success: (response) => {
                let res = response.data?.filter(each => each.glossary != defaultGlossDetailsRef?.current?.gloss_id);
                setSelectedGlossaryList(res);
            },
        });
    };

    /**
     * This method used to get the glossary project list for the source and target language pair for the simple trnslate project.
     * 
     * @author Padmabharathi Subiramanian 
     * @sice JUN 18 2025
     */
    const getGlossaryList = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossaries/${glossaryProjectId}/?option=glossary`,
            auth: true,
            success: (response) => {
                let res = response.data?.filter(each => each.glossary_id != defaultGlossDetailsRef?.current?.gloss_id);
                setGlossaryList(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    };

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
                                    glossaryProjectId =  {glossaryProjectId}
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
