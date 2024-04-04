import React, { useState, useEffect, useRef } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import RightArrowIcon from "../styles-svg/RightArrow";
import Config from "../Config";
import { ButtonBase } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { useSelector } from 'react-redux';
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import { BlueButtonLoader } from './../../loader/BlueButtonLoader';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"

const ConformPOModal = (props) => {
    let {
        showPOConfirmModal,
        setShowPOConfirmModal,
        projectIdForPOModal,
        targetLanguageOptionsRef,
        listFiles,
        projectTypeForPOModal
    } = props

    const stepOptions = useSelector((state) => state.projectSteps.value)
    const unitTypeOption = useSelector((state) => state.unitTypeOptions.value)
    const currencyOption = useSelector((state) => state.currencyOptions.value)
    const { t } = useTranslation();

    const [confirmPoData, setConfirmPoData] = useState([])
    const [checkedTaskPos, setCheckedTaskPos] = useState([])
    const [isAccepting, setIsAccepting] = useState(false)
    const [changeRequestReasonText, setChangeRequestReasonText] = useState("")
    const [showChangeRequestReasonModal, setShowChangeRequestReasonModal] = useState(false)
    const [isChangeRequestSending, setIsChangeRequestSending] = useState(false)


    const allTaskPoData = useRef([])
    const acceptAllDict = useRef(null)
    const taskDetailsRef = useRef(null)

    useEffect(() => {
        if (projectIdForPOModal.current) {
            getPOAssignInfomation()
        }
    }, [projectIdForPOModal.current])

    // reset the change request modal text when change request modal is closed
    useEffect(() => {
        if (!showChangeRequestReasonModal) {
            setChangeRequestReasonText("")
        }
    }, [showChangeRequestReasonModal])


    const getLanguageNameFromId = (id) => {
        return targetLanguageOptionsRef.current?.find(each => each.id == id)?.language
    }

    // convert the task list containing all tasks into job -> file format suitable for displaying in UI
    const convertTaskListToJobThenFileStructure = (list) => {
        // group values by job
        const groups = list?.reduce((groups, item) => {
            const group = (groups[item.job] || []);
            group.push(item);
            groups[item.job] = group;
            return groups;
        }, {});

        // seperate language pair from group
        let mappingValue = Object.keys(groups)?.map(each => (getLanguageNameFromId(list.find(task => task.job == each)?.source_language) + "->" + getLanguageNameFromId(list.find(task => task.job == each)?.target_language)))

        // re-arrange then as list of lang-pair and task-list
        // group the list inside each appropriate language pair with respective job_ids
        let modifiedList = []
        mappingValue.map((pair, index) => {
            Object.values(groups)?.find((task, ind) => {
                if (index === ind) modifiedList.push({ job_id: parseInt(Object.keys(groups)?.find((each, i) => i === ind)), pair: pair, list: task })
            })
        })

        return modifiedList
    }

    // Handler for the task po checkboxes  
    const handleTaskPoCheckbox = (event, task_id, job_id, step_id, reassigned, assign_status) => {
        if (event.target.checked) {
            setCheckedTaskPos([...checkedTaskPos, { task_id, job_id, step_id, reassigned, assign_status }])
        } else if (event.target.checked === false) {
            setCheckedTaskPos(checkedTaskPos.filter(item => item.task_id !== task_id || item?.step_id !== step_id))
        }
    }

    // Handler for job checkboxes
    const handleJobCheckbox = (event, job_id) => {
        if (event.target.checked) {
            let jobFilteredList = allTaskPoData.current?.filter(each => each.job === job_id)
            let compare = jobFilteredList?.filter(each => !checkedTaskPos?.some(item => item.task_id === each.task_id && item?.step_id === each.step))
            let filter_accpeted_and_change_req = compare?.filter(each => each?.assign_status === null)
            let list = filter_accpeted_and_change_req?.map(each => {
                return {
                    task_id: each.task_id,
                    job_id: each.job,
                    step_id: each.step,
                    reassigned: each?.reassigned,
                    assign_status: each?.assign_status
                }
            })
            console.log(filter_accpeted_and_change_req);
            setCheckedTaskPos([...checkedTaskPos, ...list])
        } else if (event.target.checked === false) {
            setCheckedTaskPos(checkedTaskPos.filter(item => item.job_id !== job_id))
        }
    }

    // Handler for top level checkbox to select all
    const handleCheckAll = (event) => {
        if (event.target.checked) {
            let list = allTaskPoData.current?.filter(each => each?.assign_status === null)?.map(each => {
                return {
                    task_id: each?.task_id,
                    job_id: each.job,
                    step_id: each?.step,
                    reassigned: each?.reassigned,
                    assign_status: each?.assign_status
                }
            })
            console.log(list);
            setCheckedTaskPos([...list])
        } else if (event.target.checked === false) {
            setCheckedTaskPos([])
        }
    }

    const getPOAssignInfomation = () => {
        Config.axios({
            url: `${Config.BASE_URL}/aipay/po-assign-info/?project_id=${projectIdForPOModal.current}`,
            auth: true,
            success: (response) => {
                allTaskPoData.current = response.data
                setConfirmPoData(convertTaskListToJobThenFileStructure(response.data))
            },
        });
    }

    const handleTaskActionButtons = (targetValue, task_id, step_id, reassign, job_id) => {
        taskDetailsRef.current = { targetValue, task_id, step_id, reassign, job_id }
        if (targetValue === 'change_request') {
            setShowChangeRequestReasonModal(true)
        } else {
            taskAssignUpdate()
        }
    }

    // task accept api 
    const taskAssignUpdate = () => {
        let { targetValue, task_id, step_id, reassign, job_id } = taskDetailsRef.current

        if (targetValue === 'change_request') {
            setIsChangeRequestSending(true)
        }

        var formdata = new FormData();
        formdata.append("task_ven_status", targetValue);
        formdata.append("task", task_id);
        formdata.append("step", step_id);
        if (targetValue === 'change_request') formdata.append("change_request_reason", changeRequestReasonText);

        if (reassign) {
            formdata.append("reassigned", 'True')
        }

        const newArr = confirmPoData?.map(obj => {
            if (obj.job_id === job_id) {
                return {
                    ...obj,
                    list: obj.list.map(task => {
                        if (task.task_id === task_id && task?.step === step_id) {
                            return {
                                ...task,
                                isAccepting: true,
                                targetValue
                            }
                        }
                        return task;
                    })
                }
            }
            return obj;
        });
        // console.log(newArr)
        setConfirmPoData(newArr)
        setIsAccepting(true)

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            auth: true,
            method: "PUT",
            data: formdata,
            success: (response) => {
                const newArr = confirmPoData?.map(obj => {
                    if (obj.job_id === job_id) {
                        return {
                            ...obj,
                            list: obj.list.map(task => {
                                if (task.task_id === task_id && task?.step === step_id) {
                                    return {
                                        ...task,
                                        assign_status: targetValue,
                                        isAccepting: false
                                    }
                                }
                                return task;
                            })
                        }
                    }
                    return obj;
                });
                console.log(newArr)
                setConfirmPoData(newArr)
                listFiles(projectIdForPOModal.current)
                setIsChangeRequestSending(false)
                setShowChangeRequestReasonModal(false)
                setIsAccepting(false)
                setChangeRequestReasonText("")
                // if(response.status === 200){
                // }else{
                //     setIsChangeRequestSending(false)
                //     Config.toast(`Something went wrong`, 'error')
                // }
            },
            error: (err) => {
                setIsChangeRequestSending(false)
                setShowChangeRequestReasonModal(false)
                setChangeRequestReasonText("")
                setIsAccepting(false)
            }
        });
    }

    const acceptAllTasks = () => {
        setIsAccepting(true)
        var formdata = new FormData();

        formdata.append("task_accept_detail", JSON.stringify(acceptAllDict.current));

        Config.axios({
            url: `${Config.BASE_URL}/workspace/bulk_task_accept/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    getPOAssignInfomation()
                    setCheckedTaskPos([])
                    listFiles(projectIdForPOModal.current)
                    setShowPOConfirmModal(false)
                    setIsAccepting(false)
                } else {
                    Config.toast(t("something_went_wrong"), 'error')
                    setIsAccepting(false)
                }
            },
            error: (err) => {
                setIsAccepting(false)
            }
        });
    }



    useEffect(() => {
        console.log(checkedTaskPos);
        acceptAllDict.current = checkedTaskPos?.map(each => {
            return {
                task: each?.task_id,
                step: each.step_id,
                reassigned: each?.reassigned ? "True" : "False"
            }
        })
    }, [checkedTaskPos])



    return (
        <>
            {showPOConfirmModal && (
                <Rodal className="project-list-po-confirm-main-wrapper" visible={showPOConfirmModal} showCloseButton={false}>
                    <div className="conform-po-manage-header">
                        <h1 className="title">{t("confirm_po")}</h1>
                        <span className="close-btn" onClick={() => setShowPOConfirmModal(false)}>
                            <CloseIcon className="header-close" />
                        </span>
                    </div>
                    <div className="conform-po-manage-body" style={isAccepting ? { pointerEvents: 'none' } : {}}>
                        <div className="conform-table-wrapper">
                            <div className="conform-table-header-wrapper">
                                <div className="file-header-item">
                                    <Checkbox
                                        size="small"
                                        id='select-all'
                                        checked={allTaskPoData.current?.filter(each => each.assign_status === null)?.length === checkedTaskPos?.length ? true : false}
                                        onClick={(e) => handleCheckAll(e)}
                                    />
                                </div>
                                <label htmlFor="select-all" className="file-header-item">
                                    <span>{t("tasks")}</span>
                                </label>
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
                                    <span>{t("total_units")}</span>
                                </div>
                                <div className="file-header-item">
                                    <span>{t("amount")}</span>
                                </div>
                                <div className="file-header-item">
                                    <span>{t("action")}</span>
                                </div>
                            </div>
                            <div className="conform-table-body-wrapper" style={isAccepting ? { pointerEvents: 'none' } : {}}>
                                {
                                    confirmPoData.map((item) => {
                                        let { pair, list } = item
                                        let [sourceLang, targetLang] = pair?.split('->')

                                        return (
                                            <div key={item.job_id} className="conform-po-body-main-item">
                                                <div className="lang-pair-main-wrapper">
                                                    <Checkbox
                                                        size="small"
                                                        id={`job-${item?.job_id}`}
                                                        checked={
                                                            (item?.list?.filter(each => each.assign_status === null)?.length === checkedTaskPos?.filter(each => each?.job_id === item?.job_id)?.length)
                                                                ? true : false
                                                        }
                                                        onClick={(e) => handleJobCheckbox(e, item?.job_id)}
                                                    />
                                                    <label htmlFor={`job-${item?.job_id}`} className="lang-pair">
                                                        <span>{sourceLang}</span>
                                                        <RightArrowIcon />
                                                        <span>{targetLang}</span>
                                                    </label>
                                                </div>
                                                {
                                                    list?.map((task) => {

                                                        return (
                                                            <div key={`${task?.task_id}-step${task?.step}`} className="conform-po-body-inner-row-item">
                                                                <div className="file-body-item">
                                                                    <Checkbox
                                                                        size="small"
                                                                        checked={checkedTaskPos?.find(each => each.task_id === task?.task_id && each?.step_id === task?.step) ? true : false}
                                                                        onClick={(e) => handleTaskPoCheckbox(e, task?.task_id, item?.job_id, task?.step, task?.reassigned, task?.assign_status)}
                                                                        disabled={task?.assign_status !== null ? true : false}
                                                                        style={task?.assign_status !== null ? { opacity: 0.4 } : {}}
                                                                    />
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <div className="project-name-wrap">
                                                                        <img src={Config.BASE_URL + `/app/extension-image/${task?.file_name?.split(".")?.pop()}`} alt="file" />
                                                                        <p>{projectTypeForPOModal.current == 3 ? t("glossary_proj") : projectTypeForPOModal.current == 6 ? t("designer_file") : task?.file_name}</p>
                                                                        {task?.word_count !== null && <span>{task?.word_count} W</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <span className="value">{stepOptions?.find(each => parseInt(each.id) === task?.step)?.name}</span>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <span className="value">{unitTypeOption?.find(each => each.value === task?.unit_type)?.label}</span>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <span className="value">{task?.unit_type !== 4 ? task?.unit_price : '-'}</span>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <span className="value">
                                                                        {task?.unit_type === 1 ? `${task?.word_count} (${t('words_lm')})` : task?.unit_type === 2 ? `${task?.char_count} (${t('chars_lm')})` :
                                                                            task?.unit_type === 3 ? `${task?.estimated_hours} (${t("estimate_hrs")})` : task?.unit_type === 4 && '-'}
                                                                    </span>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    <span className="value">
                                                                        {`${currencyOption?.find(each => task?.currency === each.value)?.label?.replace(/-.*/, "")} ${task?.total_amount}`}
                                                                    </span>
                                                                </div>
                                                                <div className="file-body-item">
                                                                    {
                                                                        task?.assign_status === null ? (
                                                                            <div className="inside-btn-wrapper">
                                                                                <ButtonBase className="accept-btn-wrapper" onClick={() => handleTaskActionButtons('task_accepted', task?.task_id, task?.step, task?.reassigned, item?.job_id)}>
                                                                                    {(task?.targetValue === 'task_accepted' && task?.isAccepting) && <ButtonLoader />}
                                                                                    {t("accept")}
                                                                                </ButtonBase>
                                                                                <ButtonBase style={(task?.isAccepting) ? { padding: '6.5px 5px', display: 'flex', alignItems: 'baseline' } : {}} className="req-change-btn-wrapper" onClick={() => handleTaskActionButtons('change_request', task?.task_id, task?.step, task?.reassigned, item?.job_id)}>
                                                                                    {(task?.targetValue === 'change_request' && task?.isAccepting) && <BlueButtonLoader />}
                                                                                    {t("change_request")}
                                                                                </ButtonBase>
                                                                            </div>
                                                                        ) : task?.assign_status === 'task_accepted' ? (
                                                                            <div className="inside-action-info-wrapper">
                                                                                <div className="accepted">
                                                                                    <CheckCircleIcon className="accept-icon" />
                                                                                    <span>{t("accepted")}</span>
                                                                                </div>
                                                                            </div>
                                                                        ) : task?.assign_status === 'change_request' && (
                                                                            <div className="inside-action-info-wrapper">
                                                                                <div className="pending">
                                                                                    <PendingOutlinedIcon className="pending-icon" />
                                                                                    <span>{t("request_sent")}</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
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
                        </div>
                        <div className="conform-po-manage-footer">
                            <div className="conform-po-manage-button-row">
                                {/* {checkedTaskPos?.length >= 1 && (
                                    <ButtonBase className="deselect-btn-wrapper" onClick={() => setCheckedTaskPos([])}>
                                        {t("deselect")}
                                    </ButtonBase>
                                )} */}
                                {checkedTaskPos?.length > 1 && (
                                    <ButtonBase
                                        className="accept-all-btn-wrapper"
                                        onClick={() => !isAccepting && acceptAllTasks()}
                                    >
                                        {isAccepting && <ButtonLoader />} {t("accept-all")}
                                    </ButtonBase>
                                )}
                            </div>
                        </div>
                    </div>
                </Rodal>
            )}
            {showChangeRequestReasonModal && (
                <Rodal
                    visible={showChangeRequestReasonModal}
                    showCloseButton={false}
                    onClose={() => setShowChangeRequestReasonModal(false)}
                    className="reason-modal-wrapper"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowChangeRequestReasonModal(false) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("change_request_reason")}</div>
                            <textarea
                                row="50"
                                placeholder={t("change_request_reason_placeholder")}
                                value={changeRequestReasonText}
                                maxLength={200}
                                className="reason-modal-textarea"
                                onChange={(e) => setChangeRequestReasonText(e.target.value)}
                            ></textarea>
                            <small className="note">{changeRequestReasonText?.length}/200</small>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowChangeRequestReasonModal(false) }}>{t("discard")}</ButtonBase>
                            <ButtonBase
                                className="success-blue-btn"
                                onClick={() => !isChangeRequestSending && taskAssignUpdate()}
                                // variant="contained"
                                style={changeRequestReasonText?.trim() === '' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                            >
                                {isChangeRequestSending && <ButtonLoader />} {t("send")}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}

export default ConformPOModal