import React, { useState, useEffect }from 'react'
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import RightArrowIcon from "../styles-svg/RightArrow";
import Config from '../Config';
import { useSelector, useDispatch } from 'react-redux';
import generateKey from './../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from '../../features/FileDownloadingListSlice';
import { useTranslation } from "react-i18next";
import FileDownloadBlack from "../../assets/images/file_download_black.svg"

export const AssignmentReferenceInfo = (props) => {
    let {
        showAssignmentInfoModal,
        setShowAssignmentInfoModal,
        allTaskListRef,
        convertTaskListToJobThenFileStructure
    } = props

    let dispatch = useDispatch();

    const { t } = useTranslation();


    const stepOption = useSelector((state) => state.projectSteps.value)
	const currencyOption = useSelector((state) => state.currencyOptions.value)
	const unitTypeOption = useSelector((state) => state.unitTypeOptions.value)

    const [allTaskList, setAllTaskList] = useState(convertTaskListToJobThenFileStructure(allTaskListRef.current))
    const [eachStepData, setEachStepData] = useState(null)
    
    useEffect(() => {
        if(allTaskList){
            let data = allTaskList[0].list[0]?.task_assign_info[0]
            setEachStepData(data)
        }
    }, [allTaskList])
    
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

    const selectedTaskRole = (task_id, role) => {
        setEachStepData(role)
    } 

    return (
        <>
            {showAssignmentInfoModal && 
            (<Rodal 
                className="assignment-reference-inner-modal" 
                visible={showAssignmentInfoModal} 
                // onClose={() => setShowAssignmentInfoModal(false)} 
                showCloseButton={false}
            >
            
                <div className="assignment-reference-modal-header">
                    <h1 className="title">{t("assignment_ref_info")}</h1>
                    <span className="close-btn" onClick={() => setShowAssignmentInfoModal(false)}>
                        <CloseIcon className="header-close" />
                    </span>
                </div>
                <div className="assigment-reference-modal-body">
                    <div className="assignment-job-list">
                        <div className="assignment-table-header-wrapper">
                            <div className="file-header-item">
                                <span>{t("project_name")}</span>
                            </div>
                            <div className="file-header-item">
                                <span>{t("step")}</span>
                            </div>
                            <div className="file-header-item">
                                <span>{t("unit_type")}</span>
                            </div>
                            <div className="file-header-item">
                                <span>{t("unit_rate")}</span>
                            </div>
                            <div className="file-header-item">
                                <span>{t("deadline")}</span>
                            </div>
                        </div>
                        <div className="assignment-table-body-wrapper">
                            {allTaskList?.length !== 0 && (
                                allTaskList?.map((item) => {
                                    let {pair, list} = item
                                    let [sourceLang, targetLang] = pair?.split('->')
                                    return(
                                        <>
                                            <div key={item?.job_id} className="assignment-reference-body-main-item">
                                                <div className="lang-pair-main-wrapper">
                                                    <div className="lang-pair">
                                                        <span>{sourceLang}</span>
                                                        <RightArrowIcon />
                                                        <span>{targetLang}</span>
                                                    </div>
                                                </div>
                                                {
                                                    list?.map(task => {
                                                        return(
                                                            <div key={task.id} className="assignment-reference-body-inner-row-wrapper">
                                                                {
                                                                    task?.task_assign_info?.map(eachRole => {
                                                                        return (
                                                                            <div 
                                                                                key={eachRole.id} 
                                                                                // style={eachStepData?.id === eachRole.id ? {backgroundColor: '#0078d424'} : {}} 
                                                                                className={"assignment-reference-body-inner-row " + (eachStepData?.id === eachRole.id  && "selected") }
                                                                                onClick={() => selectedTaskRole(task.id, eachRole)}
                                                                            >
                                                                                <div className="file-body-item">
                                                                                    <div className="project-name-wrap">
                                                                                        <img src={Config.BASE_URL + `/app/extension-image/${task?.filename?.split(".")?.pop()}`} alt="file" />
                                                                                        <p>{task.filename}</p>
                                                                                        <span>{task.task_word_count} W</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="file-body-item">
                                                                                    <span className="value">{stepOption?.find(each => eachRole?.task_assign_detail.step === parseInt(each.id))?.name}</span>
                                                                                </div>
                                                                                {/* <div className="file-body-item">
                                                                                    <span className="value">{unitTypeOption?.find(each => eachRole?.mtpe_count_unit === each.id)?.unit}</span>
                                                                                </div> */}
                                                                                <div className="file-body-item">
                                                                                    <span className="value">
                                                                                        {`${unitTypeOption?.find(each => eachRole?.mtpe_count_unit === each.value)?.label} 
                                                                                        ${(eachRole?.mtpe_count_unit !== 3 && eachRole?.mtpe_count_unit !== 4) ? (eachRole.account_raw_count ? `(${t("raw")})` : `(${t("weighted")})`) : ''}`}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="file-body-item">
                                                                                    <span className="value">
                                                                                        {`${currencyOption?.find(each => eachRole?.currency === each.value)?.label.replace(/-.*/, "")} ${eachRole?.mtpe_rate}`}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="file-body-item">
                                                                                    <span className="value">{Config.getProjectCreatedDate(eachRole?.deadline)}</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <div className="assignment-additional-info-wrapper">
                        <div className="assigment-additional-inner-wrap">
                            {eachStepData?.instruction !== '' && (
                                <div className="additional-info-wrapper">
                                    <p className="title">{t("instructions")}</p>
                                    <div className="text-area">{eachStepData?.instruction}</div>
                                </div>
                            )}
                            {eachStepData?.instruction_files?.length !== 0 && (
                                <div className="additional-info-wrapper">
                                    <p className="title">{t("reference_file")}</p>
                                    {eachStepData?.instruction_files?.map(file => {
                                        return (
                                            <div className="additional-file-list-wrap">
                                                <img src={Config.BASE_URL + `/app/extension-image/${file?.filename?.split(".")?.pop()}`} alt="file" />
                                                <p className="proj-name">{file.filename?.split(".")?.slice(0, -1)?.join(".")}</p>
                                                <p className="extension">{"." + file?.filename?.split(".")?.pop()}</p>
                                                <div className="file-download-wrap">
                                                    <span className="file-download-img" onClick={e => downloadInstructionFile(file.id, file.filename, file.filename?.split('.').pop())}>
                                                        <img src={FileDownloadBlack} alt="download"/>
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            <div className="additional-info-wrapper">
                                <p className="title">{t("assigned_by")}</p>
                                <div className="editor-info-wrap">
                                    {
                                        (eachStepData?.assigned_by_details?.avatar) ?
                                            <img src={`${Config.BASE_URL}${eachStepData?.assigned_by_details?.avatar}`} alt="profile-pic" />
                                        :
                                            <div className="no-avatar">{eachStepData?.assigned_by_details?.name?.charAt(0).toUpperCase()}</div>

                                    }
                                    <p className="profile-name">{eachStepData?.assigned_by_details?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Rodal>)}
        </>
    )
}
