import React, { useRef, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import Config from '../Config';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ButtonBase from '@mui/material/ButtonBase';
import { ButtonLoader } from '../../loader/CommonBtnLoader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlackCloseIcon from '../../assets/images/new-ui-icons/close_black.svg'

const TaskAssignActionButtons = (props) => {
    let {clientResponseDataRef, setShowTaskAssignActionBtn, prevPathRef} = props
    const history = useNavigate()

    const { t } = useTranslation();
    const [customerTaskReworkReasonText, setCustomerTaskReworkReasonText] = useState('')
    const [showTaskReworkReasonModal, setShowTaskReworkReasonModal] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const [isReworkSending, setIsReworkSending] = useState(false)
    
    // function for customer side so that customer can approve or reject the task
    const clientSideTaskResponseUpdate = (response) => {
        let { task_id, step, reassign } = clientResponseDataRef.current
        if (response === 2 && customerTaskReworkReasonText?.trim() === '') {
            setShowTaskReworkReasonModal(true)
            return;
        }
        var formdata = new FormData();
        formdata.append("task", task_id);
        formdata.append("step", step);
        formdata.append("client_response", response);
        if (response === 2) {
            formdata.append("client_reason", customerTaskReworkReasonText);
        }

        if (reassign) {
            formdata.append("reassigned", 'True')
        }

        if (response === 1) setIsApproving(true)

        setIsReworkSending(true)
        // console.log(clientResponseDataRef.current);
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            auth: true,
            method: "PUT",
            data: formdata,
            success: (api_response) => {
                if (api_response.status === 200) {
                    clientResponseDataRef.current = null
                    setIsApproving(false)
                    if (response === 1) {
                        Config.toast(`${t('work_approved')}`)
                        setTimeout(() => {
                            toast.dismiss();
                            try{
                                const URL_SEARCH_PARAMS = new URLSearchParams(`?${prevPathRef.current?.split('?')[1]}`);
                                URL_SEARCH_PARAMS.set('filter', 'submitted')
                                prevPathRef.current = prevPathRef.current?.split('?')[0] + '?' + URL_SEARCH_PARAMS.toString()
                                console.log(prevPathRef.current)
                                history(prevPathRef.current ? prevPathRef.current : "/my-stories?page=1&filter=submitted")
                            }catch(e) {
                                console.log(prevPathRef.current)
                                history(prevPathRef.current ? prevPathRef.current : "/my-stories?page=1&filter=submitted")
                                console.log(e)
                            }

                        }, 900);
                    } else if (response === 2) {
                        Config.toast(`${t("rework_initiate")}`)
                    }
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
                setIsReworkSending(false)
                setShowTaskReworkReasonModal(false)
                setShowTaskAssignActionBtn(false)
            },
            error: (err) => {
                setIsApproving(false)
                setIsReworkSending(false)
            }
        });
    }

    const handleModalCloseButton = () => {
        setShowTaskReworkReasonModal(false) 
        setCustomerTaskReworkReasonText("")
    } 

    return (
        <>
            {(clientResponseDataRef.current?.assign_info?.task_assign_detail?.client_response !== 'Approved' && clientResponseDataRef.current?.assign_info?.task_assign_detail?.client_response !== 'Close' && clientResponseDataRef.current?.assign_info?.task_assign_detail?.task_status !== 'Return Request') && (
                <Tooltip title={t("approve")} arrow placement="bottom">
                    <button className="workspace-files-nav-OpenProjectButton nav-item nav-drp-down active" onClick={(e) => !isApproving && clientSideTaskResponseUpdate(1)}>
                        <span className="fileopen-new-btn">
                            {isApproving && <ButtonLoader />} {t("approve")}
                        </span>
                    </button>
                </Tooltip>
            )}
            {(clientResponseDataRef.current?.assign_info?.task_assign_detail?.client_response !== 'Rejected' && clientResponseDataRef.current?.assign_info?.task_assign_detail?.client_response !== 'Close' &&  clientResponseDataRef.current?.assign_info?.task_assign_detail?.client_response !== 'Approved') && (
                <Tooltip title={t("rework")} arrow placement="bottom">
                    <button className="workspace-files-nav-OpenProjectButton nav-item nav-drp-down active" style={{ backgroundColor: '#E4E9EF', marginRight: '18px' }} onClick={() => clientSideTaskResponseUpdate(2)}>
                        <span className="fileopen-new-btn" style={{ color: "#001D35" }}>{t('rework_join')}</span>
                    </button>
                </Tooltip>
            )}

            {showTaskReworkReasonModal && (
                <Rodal
                    visible={showTaskReworkReasonModal}
                    showCloseButton={false}
                    onclose={() => setShowTaskReworkReasonModal(false)}
                    className="reason-modal-wrapper"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={handleModalCloseButton}>
                            <img src={BlackCloseIcon} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("rework_reason")}</div>
                            <textarea
                                row="50"
                                placeholder={t("placeholder_rework")}
                                value={customerTaskReworkReasonText}
                                maxLength={200}
                                className="reason-modal-textarea"
                                onChange={(e) => setCustomerTaskReworkReasonText(e.target.value)}
                            ></textarea>
                            <small className="note">{customerTaskReworkReasonText?.length}/200</small>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={handleModalCloseButton}> {t("discard")}</ButtonBase>
                            <ButtonBase
                                onClick={() => !isReworkSending && clientSideTaskResponseUpdate(2)}
                                className="success-blue-btn"
                                style={customerTaskReworkReasonText?.trim() === '' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                            >
                                {isReworkSending && <ButtonLoader />} {t('send')}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}

export default TaskAssignActionButtons