import React, { useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Config from '../vendor/Config';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import EditIcon from "../assets/images/new-ui-icons/pencil-edit-new.svg";
import BlueRightArrow from "../assets/images/new-ui-icons/arrow_right_alt_color.svg";
import { Collapse } from 'reactstrap';
import { ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '../vendor/styles-svg/DeleteIcon';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Cookies from "js-cookie";
import axios from "axios";

const FILE_STATUS_MAP = {
    'In Progress': {
        label: 'In Progress',
        className: 'status-indicator-in-progress-color',
    },
    'Completed': {
        label: 'Submitted',
        className: 'status-indicator-completed',
    },
    'Yet to start': {
        label: 'Yet to Start',
        className: 'status-indicator-created',
    },
    'Return Request': {
        label: 'Declined',
        className: 'status-indicator-created',
    },
};

const StoryList = (props) => {
    const {storyList, targetLanguageOptionsRef, deleteProject, openEditProjectModel} = props;
    const { t } = useTranslation();
    const location = useLocation();
    const history = useNavigate();

    const [openedProjectId, setOpenedProjectId] = useState(null);
    const [selectedProjectFiles, setSelectedProjectFiles] = useState([]);
    const [moreEl, setMoreEl] = useState(null);
    const [openedMoreOption, setOpenedMoreOption] = useState(null);    
    const [isTaskDeleting, setIsTaskDeleting] = useState(false);
    
    const moreOptionOutside = useRef();
    const taskDeleteParam = useRef(null);

    useEffect(() => {
        if (storyList && storyList.length > 0) {
            const story = storyList[0];
            setOpenedProjectId(story.id);
            fetchProjectDetails(story.id);
        }
    }, [storyList]);

    const editProject = (e, project) => {
        e.stopPropagation();
        openEditProjectModel(e, project);
    }

    /**
     * This method used to fetch the story project details based on the project id.
     * @param {*} projectId 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const fetchProjectDetails = (projectId) => {
        const controller = new AbortController();
        let url = Config.BASE_URL + "/workspace/vendor/dashboard/" + projectId;

        let params = {
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                setSelectedProjectFiles(response?.data || []);
            },
            error: (error) => {
                Config.log(error);
            }
        };
        Config.axios(params);
    }

    /**
     * This method used to open the selected project from the list.
     * @param {*} projectId 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const selectProject = (projectId) => {
        if (openedProjectId === projectId) {
            setOpenedProjectId(null);
            setSelectedProjectFiles([]);
        } else {
            setOpenedProjectId(projectId);
            fetchProjectDetails(projectId);
        }
    }

    /**
     * This method used to get the status class name based on the project status.
     * @param {*} selectedProjectFile 
     * @returns 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     * 
     */
    const getStatusClassName = (selectedProjectFile) => {
        if (selectedProjectFile == null) return 'status-indicator-created';
        else if (selectedProjectFile.task_assign_info != null && FILE_STATUS_MAP[selectedProjectFile.task_assign_info] != null)
            return FILE_STATUS_MAP?.[staselectedProjectFile.task_assign_info]?.className || '';
        return 'status-indicator-created';
    }
    
    /**
     * This method used to get the status label based on the project status
     * @param {*} selectedProjectFile 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const getStatusLabel = (selectedProjectFile) => {
        if (selectedProjectFile == null) return 'Yet to Start';
        else if (selectedProjectFile.task_assign_info != null && FILE_STATUS_MAP[selectedProjectFile.task_assign_info] != null)
            return FILE_STATUS_MAP?.[staselectedProjectFile.task_assign_info]?.label || '';
        return 'Yet to Start';
    }

    /**
     * This mehtod used to show the more option for the story project.
     * @param {*} e 
     * @param {*} id 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const handleMoreVertOption = (e, id) => {
        e.stopPropagation();
        setMoreEl(true);
        setOpenedMoreOption(id);
    }

    /**
     * This method used to hide the sub download options.
     * @param {*} e 
     * @param {*} id 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 2 Nov 2025
     */
    const handleSubDownloadOptioHide = (e, id) => {
        e.stopPropagation();
        setMoreEl(false);
        setOpenedMoreOption(false);
    }

    /**
     * This method used to provide the more option template for the story project.
     * @param {*} props 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const MoreOptionsIcon = (props) => {
        let { project, selectedProjectFile } = props;

        const moreOptions = [{
            id: 1,
            code: 'DOWNLOAD',
            icon: <FileDownloadOutlinedIcon className="file-download" />,
            arrow_icon: <KeyboardArrowRightOutlinedIcon className="right-arrow" />,
            label: t("download_as"),
            isEnabled: false,
            action: () => { }
        }, {
            id: 2,
            code: 'DELETE',
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
            isEnabled: true,
            action: (project, fileId) => handleTaskDeleteButton(project, fileId)
        }];

        return (
            <div className="more-options-wrap">
                <ButtonBase onMouseUp={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                    <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                        <ul>
                            {moreOptions?.filter(each => each.isEnabled)?.map((item) => {
                                return (
                                    <li key={item.id} className="list-item" onClick={(e) => item.action(project,selectedProjectFile?.id)}>
                                        <div className="item-wrap">
                                            <span className="icon">{item.icon}</span>
                                            <span className="text">{item.label}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                }
            </div>
        )
    }

    /**
     * This method used download the story project file.
     * @param {*} url 
     * @param {*} type 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const downloadDifferentFile = async (url, type) => {
            // throw new Error("uncomment this line to mock failure of API");
            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );
            let token = userCacheData != null ? userCacheData?.token : "";
    
            try {
                return await axios.get(
                    url,
                    {
                        responseType: "blob",
                        headers: {
                            "Access-Control-Expose-Headers": "Content-Disposition",
                            "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                        },
                    }
                );
            } catch (err) {
                let responseObj = JSON.parse(await err.response.data.text());
                if (err.response.status === 401) {
                    if (responseObj?.msg?.includes('Conversion is going')) {
                        setCeleryId(responseObj?.celery_id);
                        Cookies.set(
                            "audio_celery_data",
                            JSON.stringify({
                                celery_id: responseObj?.celery_id,
                                document_id: props.documentId
                            }),
                            { domain: Config.COOKIE_DOMAIN }
                        );
                    } else {
                        Config.toast('File under process, please wait.', 'warning');
                    }
                } else if (err.response.status === 400) {
                    // celery for mt-raw file
                    if (responseObj?.celery_id) {
                        // mtRawCeleryCheck(responseObj?.celery_id);
                    } else {
                        if (responseObj?.msg?.includes('under process')) {
                            Config.toast('File is under process, please try again after sometime', 'warning');
                        } else {
                            Config.toast('Download failed', 'error');
                        }
                    }
                } else if (err.response.status === 409) {
                    Config.toast('Something went wrong with file processing', 'warning');
                }
            }
    };

    /**
     * This mehtod used to handle the download the file in browser.
     * @param {*} selectedProjectFile 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const handleFileDownload = async(selectedProjectFile)  => {
        let url = Config.BASE_URL + "/workspace_okapi/download_pib_file/" + `?task_id=${selectedProjectFile.id}`;
        url = url + "&output_type=" + 'ORIGINAL';
        const response = await downloadDifferentFile(url);
        if (response !== undefined) {
            Config.downloadFileInBrowser(response);
        }
    }

    /**
     * This method used to trigger the delete action.
     * @param {*} project 
     * @param {*} taskId 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const handleTaskDeleteButton = (project, taskId) => {
        setMoreEl(false);
        taskDeleteParam.current = {
            project_id: project.id,
            taskId: taskId
        };
        taskDeleteFunction();
    }

    /**
     * This method used to delted the current task from the list.
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const taskDeleteFunction = () => {
        setIsTaskDeleting(true);
        Config.axios({
            url: `${Config.BASE_URL}/workspace/tasks/${taskDeleteParam.current?.taskId}/`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                setIsTaskDeleting(false);
                if (selectedProjectFiles?.length === 1) {
                    Config.toast(t("deleted_success"));
                } else {
                    Config.toast(t("task_deleted_success"));
                }
                setSelectedProjectFiles(selectedProjectFiles?.filter(each => each.id !== taskDeleteParam.current?.taskId));
                if (deleteProject) deleteProject(taskDeleteParam.current?.project_id);
            },
            error: (err) => {
                setIsTaskDeleting(false);
            }
        });
    }

    /**
     * This method used to navigate to the transeditor workspace for the respective task.
     * @param {*} e 
     * @param {*} selectedProjectFile 
     * @param {*} type 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 26 Nov 2025
     */
    const handleViewStoryClick = (e, selectedProjectFile, type) => {
        if (e) e.stopPropagation();
        const open_as = 'editor';
        // location(`/pibnews-workspace/${selectedProjectFile?.document_id}`, { state: { open_as: type === "src" ? "editor" : "reviewer", from: "my-stories" } });
        // Config.axios({
        //     url: Config.BASE_URL + selectedProjectFile.document_url,
        //     method: "GET",
        //     auth: true,
        //     success: (response) => {
                // setClickedOpenButton(null);
                setTimeout(() => {
                    history(`/pibnews-workspace/${selectedProjectFile.id}`, {state: {
                        prevPath: location.pathname + location.search,
                        open_as
                    }});
                });
        //     },
        //     error: (err) => {
        //         setClickedOpenButton(null);
        //     }
        // });
    }

    return (
        <>
        <div>
            {storyList.map((project, index) => (
                <div key={index}
                    className={openedProjectId == project.id
                        ? "file-edit-list-table-row focused-proj-row federal-news my-stories"
                        : project.progress?.toLowerCase() == "yet to start"
                            ? "file-edit-list-table-row unopened-focus-proj-row"
                            : "file-edit-list-table-row"
                    }
                >
                    <div onClick={(e) => selectProject(project?.id, project)}
                        className="file-edit-list-table-cell-wrap">
                        <div className="file-edit-list-table-cell" data-key={project.id}>
                            <span className="arrow-icon">
                                {openedProjectId == project.id
                                    ? <KeyboardArrowUpIcon className="proj-list-arrow-up" />
                                    : <KeyboardArrowDownIcon className="proj-list-arrow-down" />
                                }
                            </span>
                            <div className={"proj-title-list-container " + (project?.get_project_type === 4 ? "speech-proj" : "")}>
                                <div className="proj-type-icon-wrap">
                                </div>
                                <div className="proj-list-info">
                                    <div className="proj-information">
                                        <Tooltip TransitionComponent={Zoom} title={project.project_name} placement="top" arrow>
                                            <span className="file-edit-proj-txt-tmx">
                                                {project.project_name}

                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="file-edit-list-table-cell">
                            <div className="file-edit-translation-txt word-count">
                                <span>{Config.getProjectCreatedDate(project.created_at)}</span>
                            </div>
                        </div>
                        <div className="file-edit-list-table-cell">
                            <div className="project-edit-tools" onClick={(e) => editProject(e, project)}>
                                <Tooltip title={t("edit")} placement="top">
                                    <span>
                                        <img
                                            src={EditIcon}
                                            alt="pencil-edit-new"
                                            should-open-files="dont-open"
                                        />
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <Collapse isOpen={openedProjectId == project.id} className="selected-file-row">
                        {openedProjectId == project.id && selectedProjectFiles.length > 0 ? (
                            selectedProjectFiles.map((selectedProjectFile, fileIndex) => (
                                <div key={fileIndex} className="file-edit-inner-table p-[23px]">
                                    <div className="pib-language language-file-row justify-start">
                                        <span onClick={(e) => handleViewStoryClick(e, selectedProjectFile, "src")}>
                                            {targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.source_language)?.language}
                                        </span>
                                        <img src={BlueRightArrow}/>
                                        <span onClick={(e) => handleViewStoryClick(e, selectedProjectFile, "tar")}>
                                            {targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language)?.language}
                                        </span>
                                    </div>
                                    <div className="file-edit-list-inner-table-row">
                                        <div className="file-edit-list-table-cell pl-0">
                                            <div className="file-edit-file-name-txt flex flex-col gap-[12px]">
                                                <span className='pib-headline'>
                                                    {selectedProjectFile?.pib_story_details?.headline}
                                                </span>
                                                {selectedProjectFile?.pib_story_details?.ministry_department && 
                                                    <span className='pib-ministry-badge'>{selectedProjectFile?.pib_story_details?.ministry_department}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="file-edit-list-table-cell">
                                            <div className="status-conditions-part dont-open-list">
                                                <span className="pib-status-badge">
                                                    <div className={getStatusClassName(selectedProjectFile)}></div>
                                                    {getStatusLabel(selectedProjectFile)}
                                                </span>
                                                <span className='more-icon-empty'></span>
                                            </div>
                                        </div>
                                        <div className="file-edit-list-table-cell">
                                            <div className="pib-project-list-action-wrap">
                                                <button type="button" className="workspace-files-OpenProjectButton" onClick={() => handleViewStoryClick(null, selectedProjectFile, "tar")}>
                                                    <span className="fileopen-new-btn">{t("open")}</span>
                                                </button>
                                                <button type="button" className="workspace-files-OpenProjectButton" onClick={() => handleFileDownload(selectedProjectFile)}>
                                                    <span className="fileopen-new-btn">{t("download")}</span>
                                                </button>
                                                <MoreOptionsIcon project={project} selectedProjectFile={selectedProjectFile} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-files-in-proj-txt">
                                {t("no_files_in_this_project")}
                            </div>
                        )}
                    </Collapse>
                </div>
            ))}
        </div>
        </>
    );
}
export default StoryList;
