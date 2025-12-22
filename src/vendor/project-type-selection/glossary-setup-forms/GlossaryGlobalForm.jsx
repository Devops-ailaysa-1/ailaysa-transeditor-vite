import React, { useState, Fragment, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddNewGlossaryForm from "./AddNewGlossaryForm";
import TermDataForm from "./TermDataForm";
import Config from "../../Config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ButtonBase from '@mui/material/ButtonBase';
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useTranslation } from "react-i18next";
import Skeleton from '@mui/material/Skeleton';
import { glossaryContext } from './../../context-api/Context';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonLoader } from './../../../loader/CommonBtnLoader';
import { useSelector } from "react-redux";


const GROSSARY_PIB_TABS = [{
    id: 1,
    value: 'standard',
    label: 'Standard',
    isEnabled: true,
}, {
    id: 2,
    value: 'pib-news-glossary',
    label: 'Stories/Press releases',
    isEnabled: true,
}];

const GlossaryGlobalForm = (props) => {
    const { t } = useTranslation();

    const {
        projectName,
        setProjectName,
        setProjectType,
        sourceLanguage,
        targetLanguage,
        modaloption,
        editProjectId,
        isLoading,
        handleSubmit,
        handleUpdate,
        supportFileExtensions,
        glossaryProjectCreationResponse,
        createdGlossaryProject,
        setCreatedGlossaryProjects,
        activeToggle,
        isEditable,
        goBackCreateBtn,
        setGoBackCreateBtn,
        goBackEditBtn,
        setGoBackEditBtn,
        editGlossaryProject,
        contentprojectNameRef,
        handleHideIcon,
        handleProjectEnter,
        handleProjectNamechange,
        prevPageInfo,
        setSelectedTab,
        selectedTab,
        selectedMinistryDepartment
    } = useContext(glossaryContext)

    let {
        page,
        setPage,
    } = props;

    const history = useNavigate();
    const [glossaryBucket, setGlossaryBucket] = useState([]);
    const [requirementSatisfied, setRequirementSatisfied] = useState(true);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [uploadBucket, setUploadBucket] = useState([]);
    const [unsupportedFile, setUnsupportedFile] = useState(false)
    const [glossaryProjectCount, setGlossaryProjectCount] = useState(null)
    const [required, setrequired] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false)
    const [isProjectDeleting, setIsProjectDeleting] = useState(false)
    const isPIBNews = useSelector((state) => state.isPIBNews.value);

    const projectTypeHeader = (
        <div className="header-align d-flex">
            <p className="section-header">Project Setup</p>
            <div className="custom-dashboard-links" onClick={() => setProjectType(null)}>
                Back
            </div>
        </div>
    );

    // function to display component based on the page no.
    const showGlossaryForms = () => {
        if (page === 0)
            return (
                <Fragment>
                    <AddNewGlossaryForm
                        required={required}
                        selectedtab={selectedTab}
                    />
                </Fragment>
            );
        else
            return (
                <Fragment>
                    <TermDataForm
                        uploadBucket={uploadBucket}
                        setUploadBucket={setUploadBucket}
                        glossaryBucket={glossaryBucket}
                        setGlossaryBucket={setGlossaryBucket}
                        unsupportedFile={unsupportedFile}
                    />
                </Fragment>
            );
    };

    const handlePreviousButton = () => {
        setGoBackEditBtn(!goBackEditBtn)
        setGoBackCreateBtn(true)
        setPage((currPage) => currPage - 1);
    };

    const validateAddGlossaryForm = () => {
        if (sourceLanguage === "" || targetLanguage == "" || (selectedMinistryDepartment?.value === undefined && isPIBNews && selectedTab?.value === 'pib-news-glossary')) {
            setRequirementSatisfied(false);
            return false;
        } else {
            setRequirementSatisfied(true);
            return true;
        }
    };

    const handleNextButton = (e) => {
        e.preventDefault();
        if (page !== 1) {
            if (sourceLanguage === "" || targetLanguage == "" || (selectedMinistryDepartment?.value === undefined && isPIBNews && selectedTab?.value === 'pib-news-glossary')) {
                setrequired(true);
            }else {
                setrequired(false);
            }
            let processNext = validateAddGlossaryForm();
            if (processNext) {
                if (isEditable || goBackCreateBtn) {
                    handleUpdate(e, "glossary-submission");
                } else {
                    handleSubmit(e, "glossary-submission");
                }
            }
            setPage((currPage) => (processNext ? currPage + 1 : currPage));
        }
    };

    const listGlossaryProjects = () => {
        let list = [];
        
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/?filter=glossary`,
            auth: true,
            success: (response) => {
                list = response?.data?.results?.filter((each) => each?.assign_enable === true);
                setGlossaryProjectCount(list?.length);
            },
        });
    }

    useEffect(() => {
        setSelectedTab(GROSSARY_PIB_TABS[1]);
        listGlossaryProjects();
    }, []);

    const handleGlossaryFileUpload = (e, params) => {
        // Add an API call to save glossary files
        e.preventDefault();
        let lengthOfBucket = glossaryBucket?.length;
        let projectIdFromResponse = null;
        let errCounter = 0;
        let successCounter = 0;
        let bucketLength = 0;
        setIsUpdating(true)
        glossaryBucket?.map((each, index) => {
            if (each?.thisJobsFileList?.length !== 0) {
                let formData = new FormData();
                bucketLength++
                each.thisJobsFileList.map((eachFile) => {
                    formData.append("glossary_file", eachFile);
                });
                formData.append("job", each.thisJobId);
                
                Config.axios({
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
                    },
                    url: Config.BASE_URL + "/glex/glossary_file_upload/",
                    method: "POST",
                    data: formData,
                    auth: true,
                    success: (response) => {
                        ++successCounter;
                        if (successCounter == bucketLength) {
                            setCreatedGlossaryProjects(!createdGlossaryProject);
                            activeToggle(1);
                            if (!isEditable) {
                                history(`/assets?page=1${glossaryProjectCreationResponse?.id !== undefined ? `&open-project=${glossaryProjectCreationResponse?.id}` : ''}`, {state: { isFirst: glossaryProjectCount == 0 ? true : false }});
                                Config.toast(t("project_created_success"));
                            } else {
                                if (prevPageInfo.current?.fromProjectList) {
                                    history(`/file-upload?page=${prevPageInfo.current?.pageNo}&order_by=${prevPageInfo.current?.orderBy}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${prevPageInfo.current?.projectId}`)
                                } else {
                                    history(`/assets?page=1${glossaryProjectCreationResponse?.id !== undefined ? `&open-project=${glossaryProjectCreationResponse?.id}` : ''}`);
                                }
                                Config.toast(t("project_updated_success"));
                            }
                        }
                        setIsUpdating(false)
                        // projectIdFromResponse = response.data?.length ? response.data[0]?.project : null;
                    },
                    error: (err) => {
                        if (err?.response?.status == 400) {
                            setIsUpdating(false)
                            errCounter++
                            // editGlossaryProject(editProjectId)
                            if (errCounter === 1) {
                                Config.toast(t("gloss_file_not_support"), 'warning')
                                editGlossaryProject(editProjectId)
                            }
                            setUnsupportedFile(!unsupportedFile) //remove the uploaded files(because it does no contain supported data)
                        } else if (err?.response?.status == 500) {
                            Config.toast(t("gloss_file_not_support"), 'warning')
                            setIsUpdating(false)
                        }
                    }
                });
            }
        })

        if (bucketLength === 0) {
            setCreatedGlossaryProjects(!createdGlossaryProject);
            activeToggle(1);
            if (!isEditable) {
                history(`/assets?page=1&open-project=${glossaryProjectCreationResponse?.id}`, {state: { isFirst: glossaryProjectCount == 0 ? true : false }});
                Config.toast(t("project_created_success"));
            } else {
                history(`/assets?page=1&open-project=${glossaryProjectCreationResponse?.id}`);
                Config.toast(t("project_updated_success"));
            }
        }
    };

    /* Delete a project by id */
    const deleteGlossaryProject = (projectId, isConfirmed = false) => {
        // if (isConfirmed)
        // If confirmed
        setIsProjectDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast("Project deleted");
                // listProjects();
                // activeToggle(1);
                setIsProjectDeleting(false)
                history(`/assets?page=1`);
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowTaskDeleteAlert(true)
                    setIsProjectDeleting(false)
                    setShowDeleteConfirmationModal(false)
                }
                setIsProjectDeleting(false)
            }
        });
        // else Config.confirm(deleteProject, [projectId, true], "Delete project permanently?", ["Delete", "Cancel"]); //Ask user confirmation
    };


    const removebrtag = () => {
        let rem = document.querySelector('.project-box')
        var var1 = rem.getElementsByTagName('br');

        for (var i = var1.length; i--;) {
            var1[i].parentNode.removeChild(var1[i]);
        }
    }

    document.querySelector('[contenteditable]')?.addEventListener('paste', function pasteAsPlainText(event) {
        event.preventDefault();
        event.target.innerText = event.clipboardData.getData("text/plain");
        removebrtag()
    });


    const executeProposalScroll = () => {
        contentprojectNameRef.current.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            {page === 0 &&
                <>
                    {/* <div className={"project-input-wrap " + ((!requirementSatisfied && projectName.length == 0) && "error-focus")}> */}
                    <div className={"project-input-wrap"}>
                        <div
                            ref={contentprojectNameRef}
                            // onInput={projectName}
                            suppressContentEditableWarning={true}
                            contentEditable="true"
                            onClick={handleHideIcon}
                            onBlur={executeProposalScroll}
                            data-placeholder={`${t("untitled_gloss")}`}
                            onKeyUp={(e) => handleProjectNamechange(e)}
                            onKeyDown={handleProjectEnter}
                            className="project-box"
                            tabIndex={0}
                        ></div>
                    </div>
                    {isPIBNews && 
                        <div className="projects-list-wrap-header mt-[26px]">
                            <div className="project-setup-tabs">
                                <div className='flex add-story-nav'>
                                    {GROSSARY_PIB_TABS.map(tab => (tab.isEnabled && (
                                        <div className={"add-story-nav-item " + (selectedTab.id == tab.id ? 'active' : '')} onClick={() => setSelectedTab(tab)}>
                                            <span className='add-story-nav-text'>{tab.label}</span>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            <div className="glossary-global-setup-wrapper">
                {showGlossaryForms()}
                <div className={"d-flex " + ((isEditable && page === 0) ? "justify-between" : "justify-end")}>
                    {(isEditable && page === 0) && (
                        <button
                            className="glossaryglobalform-StepCancelButton"
                            onClick={() => history(-1)}
                        >
                            <span className="prev-btn">
                                {t("cancel")}
                            </span>
                        </button>
                    )}
                    <div className={page == 0 ? "glossary-bottom-btn-align" : "glossary-bottom-btn-align-new"}>
                        <button className={page == 0 ? "d-none" : "glossaryglobalform-StepCancelButton"} onClick={handlePreviousButton}>
                            <span className="prev-btn">
                                <span className="prev-icon-align">
                                    <i className="fas fa-arrow-left"></i>
                                </span>{" "}
                                {t("go_back")}
                            </span>
                        </button>

                        {page === 0 ? (
                            isLoading ?
                                (
                                    <div className="d-flex">
                                        <div className="edit-delete-btn mr-4">
                                            <Skeleton animation="wave" width={120} height={40} />
                                        </div>
                                        <Skeleton animation="wave" width={90} height={40} />
                                    </div>
                                )
                                :
                                (
                                    <div className="d-flex">
                                        {(goBackCreateBtn || isEditable) &&
                                            <div onClick={() => setShowDeleteConfirmationModal(true)} className="edit-delete-btn mr-4">
                                                <ButtonBase>
                                                    <div className="edit-delete-btn-cont">
                                                        <div className="delete-icon"></div>
                                                        {t("delete_project")}
                                                    </div>
                                                </ButtonBase>
                                            </div>
                                        }
                                        <button className="globalform-StepProcessButton" onMouseUp={(e) => handleNextButton(e)}>
                                            <span className="version-ctrl-btn-txt-1">
                                                {t("next")}{" "}
                                                <span className="icon-align">
                                                    <i className="fas fa-arrow-right"></i>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                )
                        ) : page === 1 ? (
                            <div className="glossary-save-btn-wrapper">
                                {
                                    isUpdating ? (
                                        <button className="globalform-StepProcessButton">
                                            <span className="version-ctrl-btn-txt-1"><ButtonLoader /> {isEditable ? `${t("updating")}` : `${t("finishing")}`}</span>
                                        </button>
                                    ) : (
                                        <button className="globalform-StepProcessButton" onMouseUp={(e) => handleGlossaryFileUpload(e)}>
                                            <span className="version-ctrl-btn-txt-1">{isEditable ? `${t("update")}` : `${t("finish")}`}</span>
                                        </button>
                                    )
                                }

                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {showDeleteConfirmationModal &&
                (<Rodal
                    visible={showDeleteConfirmationModal}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowDeleteConfirmationModal(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>{t("delete_project_note")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowDeleteConfirmationModal(false) }}>{t("discard")}</Button>
                                <Button
                                    style={isProjectDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                    onClick={() => !isProjectDeleting && deleteGlossaryProject(glossaryProjectCreationResponse?.id !== undefined ? glossaryProjectCreationResponse?.id : editProjectId)}
                                    variant="contained"
                                >
                                    {isProjectDeleting ? (
                                        <>
                                            <ButtonLoader />
                                            {t("deleting")}
                                        </>
                                    ) : (
                                        t("delete")
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Rodal>)}
            {showTaskDeleteAlert &&
                (<Rodal
                    visible={showTaskDeleteAlert}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-mark-confirm-box Assign-task-deletion-rodal"
                >
                    <div className="confirmation-warning-wrapper Assign-task-deletion-model">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowTaskDeleteAlert(false); }}><CloseIcon /></span></div>
                            <div className="model_title_"><span className="indicate_icon__rodal"></span>{t("task_assigned")}!</div>
                            <div className="model_discription_">{t("task_assigned_note")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button style={{ opacity: 0 }}>{t("discard")}</Button>
                                <Button className="assign_task_del_btn" onClick={() => { setShowTaskDeleteAlert(false); }}>{t("close")}</Button>
                            </div>
                        </div>
                    </div>
                </Rodal>)}
        </React.Fragment>
    );
};

export default GlossaryGlobalForm;
