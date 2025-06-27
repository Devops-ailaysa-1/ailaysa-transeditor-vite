import React, { useState, useEffect, createRef, useRef } from 'react'
import Config from '../Config'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import generateKey from './../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from '../../features/FileDownloadingListSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import FileDownloadBlack from "../../assets/images/file_download_black.svg"

function InstructionModal(props) {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1)

    const activeToggle = tab => {
        if (activeTab != tab)
            setActiveTab(tab)
    }

    const downloadInstructionFile = async(file_id, file_name, ext) => {
        let url = `${Config.BASE_URL}/workspace/instruction_file_download/${file_id}`
        let uniqueKey = generateKey()

        dispatch(addDownloadingFiles({id: uniqueKey, file_name: file_name, ext: ext, status: 1}))
        
        const response = await Config.downloadFileFromApi(url);
        if(response !== undefined){
            // update the list once download completed
            dispatch(updateDownloadingFile({id: uniqueKey, status: 2}))
            
            Config.downloadFileInBrowser(response)
            
            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({id: uniqueKey}))
            }, 5000);
        }
    } 

    return (
        <React.Fragment>
            <div className="assign-manage-tabs-cont">
                <Nav className="assign-manage-tabs" tabs>
                    <NavItem className="assign-manage-tab-item">
                        <NavLink className={classnames({ active: activeTab == 1 })} onClick={() => { activeToggle(1) }}>
                            {t("instructions")}
                        </NavLink>
                    </NavItem>
                    <NavItem className="assign-manage-tab-item">
                        <NavLink className={classnames({ active: activeTab == 2 })}onClick={() => { activeToggle(2) }}>
                            {t("additional_files")}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        {
                            props.instructionText ?
                            <div className="instruct-box">
                                <p>{props.instructionText}</p>
                            </div>
                            :
                            <div className="no-additional-files-box">
                                <p>{t("no_instruct_avail")}</p>
                            </div>
                        }
                    </TabPane>
                    <TabPane tabId={2}>
                        {
                            props.instructionFile?.length !== 0 ? (
                                <div className="additional-files-box">
                                    <ul>
                                        {
                                            props.instructionFile?.map(file => {
                                                return (
                                                    <li>
                                                        <div className="file-wrap">
                                                            <span className="doc-img">
                                                                <img src={`${Config.BASE_URL}/app/extension-image/${file.filename?.split('.').pop()}`} alt=""/>
                                                            </span>
                                                            <span className="files">
                                                                <span className="name">{file.filename.split('.').slice(0, -1).join('.')}</span><span className="extension">{`.${file.filename.split('.').pop()}`}</span>
                                                            </span>
                                                        </div>
                                                        <div className="file-download-wrap">
                                                            <span className="file-download-img" onClick={e => downloadInstructionFile(file.id, file.filename, file.filename?.split('.').pop())}>
                                                                <img src={FileDownloadBlack} alt="download"/>
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            ) : (
                                <div className="no-additional-files-box">
                                    <p>{t('no_add_file_avail')}</p>
                                </div>
                            )
                        }
                    </TabPane>
                </TabContent>
            </div>
        </React.Fragment>
    );
}

export default InstructionModal