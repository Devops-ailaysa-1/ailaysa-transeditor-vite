import React, { useState, useRef } from "react";
// import { useParams, Redirect } from "react-router-dom";
import AssignManage from "../vendor/assign-tabs/AssignManage";
import Navbar from "../vendor/Navbar";
// import SideBar from "./SideBar";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from "../vendor/Config";
import CloseBlack from "../assets/images/new-ui-icons/close_black.svg";
import ErrorBlackWarn from "../assets/images/new-ui-icons/error_black_warn.svg";

const ProjectManagement = (props) => {
    let URL_SEARCH_PARAMS = new URLSearchParams(props.history.location.search);

    const [showDurationAlertModal, setShowDurationAlertModal] = useState(false);
    const [showEditorAlreadyAssignedModal, setShowEditorAlreadyAssignedModal] = useState(false);
    const [fromEditorOrReviewer, setFromEditorOrReviewer] = useState("");

    const isEditable = useRef(null);
    
    const hideAlertModal = () => {
        setShowDurationAlertModal(false);
    }

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideAlertModal,
    };

    const projectId = URL_SEARCH_PARAMS.get("project");
    const taskId = URL_SEARCH_PARAMS.get("task");
    const jobIdParam = URL_SEARCH_PARAMS.get("job");
    const editorId = URL_SEARCH_PARAMS.get("editor");
    const reviewerid = URL_SEARCH_PARAMS.get("reviewer");
    isEditable.current = URL_SEARCH_PARAMS.get("_edit");
    const editRole = URL_SEARCH_PARAMS.get("_step");
    const withIn = URL_SEARCH_PARAMS.get("within");

    return (
        <>
            <Navbar />
            <div className="ai-new-project-setup-wrapper">
                <div className="ai-working-col-wrapper setup-container assign-manage-container">
                    <AssignManage 
                        showDurationAlertModal={showDurationAlertModal} 
                        setShowDurationAlertModal={setShowDurationAlertModal} 
                        hideAlertModal={hideAlertModal} 
                        projectId={projectId} 
                        assignedTaskId={taskId}
                        jobIdParam={jobIdParam}
                        isEditable={isEditable}
                        setFromEditorOrReviewer={setFromEditorOrReviewer}
                        setShowEditorAlreadyAssignedModal={setShowEditorAlreadyAssignedModal}
                        editRole={editRole}
                        withIn={withIn}
                    />
                </div>
            </div>
            <Rodal 
                className="ai-large-file-alert-modal"
                visible={showDurationAlertModal} 
                {...modaloption} 
                showCloseButton={false} 
                closeOnEsc={true} 
            >
                <span className="prompt-close-btn" onClick={() => setShowDurationAlertModal(false)}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="alert-content-wrap">
                    <img src={ErrorBlackWarn} alt="error-icon"/>
                    <div>
                        <h2 className="title-txt">Select job(s) to assign</h2>
                    </div>
                </div>
            </Rodal>
            {showEditorAlreadyAssignedModal &&(<Rodal 
                className="ai-large-file-alert-modal"
                visible={showEditorAlreadyAssignedModal}
                {...modaloption} 
                closeOnEsc={true}
                showCloseButton={false} 
             >
                <span className="prompt-close-btn" onClick={() => setShowEditorAlreadyAssignedModal(false)}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="alert-content-wrap">
                    <img src={ErrorBlackWarn} alt="error-icon"/>
                    <div>
                        <h5 className="title-txt">{`This editor has been assigned as ${fromEditorOrReviewer} for one of the selected tasks.`}</h5>
                    </div>
                </div>
            </Rodal>)}

        </>
    );
};

export default ProjectManagement;
