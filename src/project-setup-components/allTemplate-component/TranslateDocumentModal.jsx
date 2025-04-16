import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { setShowTranslateDocumentModal } from '../../features/ShowTranslateDocumentModalSlice';
import { WidthFull } from '@mui/icons-material';
import Config from '../../Config';
import new_translate from '../../assets/images/translateicon.svg'

export const TranslateDocumentModal = (props) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const history = useNavigate();
    
    const showTranslateDocumentModal = useSelector(state => state.showTranslateDocumentModal.value)

    const closeTranslateDocumentModal = () => {
        dispatch(setShowTranslateDocumentModal(false))
    }

    const transTabList = [{
        id: 1,
        lable: 'Simple File Translator',
        description: 'Easily translate documents with a single click.',
        url: '/create/translate/translate-files'
    }, {
        id: 2,
        lable: 'Advanced CAT Editor',
        description: 'Leverage advanced tools for precise, collaborative, and context-aware translations.',
        url: '/create/translate/files/translate-files'
    }];

    const [activeTab, setActiveTab] = useState(transTabList[0]);

    const handleTranslateBtn = () => {
        history(activeTab.url, {
            state: {
                isFromView: 'DOCUMENT_MODAL'
            }
        });
    }

    const onSelectList = (item) => {
        setActiveTab(item);
    }

    return (
        <>
            {showTranslateDocumentModal && (
                <Rodal
                    className="prompt-library-modal translate-container-custom-rodal"
                    visible={showTranslateDocumentModal}
                    onClose={closeTranslateDocumentModal}
                    showCloseButton={false}
                >
                    <div className="prompt-library-wrapper">
                        <div className="file-list-assign-manage-header d-flex justify-between items-center">
                            <h3 className="title flex items-center gap-3">Translate documents</h3>
                            <IconButton onClick={closeTranslateDocumentModal}>
                                <CloseIcon className="header-close" /> 
                            </IconButton>
                        </div>
                        <hr className="-ml-6 -mr-6" />
                        <div className="flex space-x-4">
                            {transTabList.map(item => {
                                return (
                                    <>
                                    <div key={item.id}
                                        className={`translate-container ${
                                            item.id === activeTab.id ? 'translate-container-active' : ''}`}
                                            onClick={() => onSelectList(item)}
                                        >
                                            <div className="flex items-start mb-3">
                                            <img  src={new_translate} alt="img"/>
                                                <input
                                                    type="radio"
                                                    name="translator"
                                                    className="ml-auto"
                                                    checked={item.id === activeTab.id}
                                                    readOnly
                                                />
                                            </div>
                                            <h3 className="font-semibold">{item.lable}</h3>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                        <div className="overall_container_button">
                            <button className="go-to-workspace-btn " onClick={handleTranslateBtn}>
                                    Translate now
                            </button>
                       </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
