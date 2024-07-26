import React, { useRef, useState } from 'react'
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

export const AilaysaGlossariesModal = (props) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const showAilaysaGlossaryModal = useSelector(state => state.showAilaysaGlossaryModal.value)

    const [activeScreen, setActiveScreen] = useState(1);

    const closeGlossaryModal = () => {
        dispatch(setShowAilaysaGlossaryModal(false))
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
                                />
                            ) : (
                                <ImportTerms />
                            )}
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
