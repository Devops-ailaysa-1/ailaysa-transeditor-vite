import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setShowAilaysaGlossaryModal } from '../../../../features/ShowAilaysaGlossaryModalSlice';
import { setShowGlossTermAddForm } from '../../../../features/ai-glossary/ToggleGlossTermAddFormSlice';
import Config from '../../../Config';

export const GlossaryMenuDrpDown = (props) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    
    const menuList = [
        {id: 2, name: t("open_glossary")},
        {id: 1, name: t("add_to_glossary")},
    ]

    const [glossaryOpen, setGlossaryOpen] = useState(false);
    const glossaryAnchorRef = useRef(null)

    const handleDrpDownClose = (event) => {
        if (glossaryAnchorRef.current && glossaryAnchorRef.current.contains(event.target)) {
            return;
        }
        setGlossaryOpen(false);
    };

    const handleMenuItemClick = (menuItemId) => {
        if(menuItemId === 1){
            if(window.getSelection().toString()?.trim() === ""){
                Config.toast(t("select_word_to_add"), "warning")
                return
            }
            dispatch(setShowGlossTermAddForm(true))
            setGlossaryOpen(false)
        }else if(menuItemId === 2) {
            dispatch(setShowAilaysaGlossaryModal(true))
            setGlossaryOpen(false)
        }
    } 

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
                                    {menuList.map(each => (
                                        <MenuItem 
                                            key={each.id}
                                            className="menu-list-item"
                                            onClick={() => handleMenuItemClick(each.id)}
                                        >
                                            {each.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
