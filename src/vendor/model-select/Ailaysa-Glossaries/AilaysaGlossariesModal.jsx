import React, { useRef, useState } from 'react'
import './ailaysa_glossaries.css'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import AilaysaNewGlossEditingArea from '../../project-type-selection/wordchoice-workspace/AilaysaNewGlossEditingArea';
import { ImportTerms } from './sub-components/ImportTerms';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const AilaysaGlossariesModal = (props) => {

    const {t} = useTranslation()
    
    const [openAilaysaGlossaryModal, setOpenAilaysaGlossaryModal] = useState(true);
    const [glossaryOpen, setGlossaryOpen] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const [searchTerm, setSearchTerm] = useState(false);
    const [activeScreen, setActiveScreen] = useState(1);

    const glossaryAnchorRef = useRef(null)
    const searchTermCloseOutside = useRef(null)
    
    const handleDrpDownClose = (event) => {
        if (glossaryAnchorRef.current && glossaryAnchorRef.current.contains(event.target)) {
            return;
        }
        setGlossaryOpen(false);
    };

    return (
        <>
            <div 
                ref={glossaryAnchorRef} 
                className="download-grp-wrapper cursor-pointer" 
                onClick={() => setGlossaryOpen(!glossaryOpen)}
            >
                <button className="download-main text-black border-none bg-transparent" style={{padding: '4px 12px'}}>
                    Glossary
                </button>
                <span className="border-line"></span>
                <button className="navbar-DrpDownArrowButton"
                    size="small"
                    aria-controls={glossaryOpen ? 'download-dropdown' : undefined}
                    aria-expanded={glossaryOpen ? 'true' : undefined}
                    aria-haspopup="menu"
                    ref={props.downloadTrigger}
                >   
                    <span className="arrow-wrap">
                        <KeyboardArrowDownOutlinedIcon className="workspace-arrow-dwnload" />
                    </span>
                </button>
            </div>
            <Popper id="download-dropdown" placement="bottom" open={glossaryOpen} anchorEl={glossaryAnchorRef.current} role={undefined} transition disablePortal className="drop-down-width-small">
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom', }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleDrpDownClose}>
                                <MenuList
                                    className="menu-list-wrapper"
                                >
                                    <MenuItem className="menu-list-item">
                                        {t("add_to_glossary")}
                                    </MenuItem>
                                    <MenuItem className="menu-list-item">
                                        {t("open_glossary")}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <Rodal
                className="prompt-library-modal" 
                visible={openAilaysaGlossaryModal} 
                onClose={() => setOpenAilaysaGlossaryModal(false)}
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
                        <span className="close-btn" onClick={() => setOpenAilaysaGlossaryModal(false)}>
                            <CloseIcon className="header-close"  />
                        </span>
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
        </>
    )
}
