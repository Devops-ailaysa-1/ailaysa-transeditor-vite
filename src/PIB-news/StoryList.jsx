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
import { ButtonBase, Skeleton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '../vendor/styles-svg/DeleteIcon';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Cookies from "js-cookie";
import axios from "axios";
import { ButtonLoader } from '../loader/CommonBtnLoader';

const FILE_STATUS_MAP = {
    'In_Progress': {
        label: 'In Progress',
        status: 'In_Progress',
        className: 'status-indicator-in-progress-color',
        btnLabel: 'View Progress',
        loading: true,
        polling: true
    },
    'COMPLETED': {
        label: 'Completed',
        status: 'COMPLETED',
        className: 'status-indicator-completed',
        btnLabel: 'Open',
        loading: false,
        polling: false
    },
    'YET_TO_START': {
        label: 'Yet to Start',
        status: 'YET_TO_START',
        className: 'status-indicator-created',
        btnLabel: 'Translate',
        loading: false,
        polling: true
    },
    'FAILED': {
        label: 'Failed',
        status: 'FAILED',
        className: 'status-indicator-created',
        btnLabel: '',
        loading: false,
        polling: false
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
    const [inProgressTaskIds, setInProgressTaskIds] = useState([]);
    const [fileListLoading, setFileListLoading] = useState(false);

    const moreOptionOutside = useRef();
    const taskDeleteParam = useRef(null);
    const inProgressProjectId = useRef(null);

    useEffect(() => {
        return () => {
            inProgressProjectId.current = null;
        }
    }, []);

    useEffect(() => {
        if (storyList && storyList.length > 0) {
            const story = storyList[0];
            inProgressProjectId.current = story.id;
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
        setFileListLoading(true);
        let params = {
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                setFileListLoading(false);
                const {data} = response;
                setSelectedProjectFiles(updateFileStatus(data) || []);
                if (!anyFileUpload(data) && anyPending(data)) {
                    inProgressProjectId.current = projectId;
                    progressTask(projectId, getPendingTask(data));
                }
            },
            error: (error) => {
                setFileListLoading(false);
                Config.log(error);
            }
        };
        Config.axios(params);
    }

    const updateFileStatus = (files) => {
        return files.map(file => {
            if (FILE_STATUS_MAP[file?.pib_story_details?.status]) {
                const status = isFileUpload(file) ? {} : FILE_STATUS_MAP[file?.pib_story_details?.status];
                return {
                    ...file,
                    openBtnLabel: status?.btnLabel || null,
                    openBtnLoading: status.loading || null
                }
            }
        })
    }

    /**
     * This method used to open the selected project from the list.
     * @param {*} projectId 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const selectProject = (project) => {
        if (openedProjectId === project?.id) {
            setOpenedProjectId(null);
            setSelectedProjectFiles([]);
            inProgressProjectId.current = null;
        } else {
            inProgressProjectId.current = project?.id;
            setOpenedProjectId(project?.id);
            fetchProjectDetails(project?.id);
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
        else if (selectedProjectFile.pib_story_details != null && selectedProjectFile.pib_story_details?.status && FILE_STATUS_MAP[selectedProjectFile.pib_story_details?.status] != null)
            return FILE_STATUS_MAP?.[selectedProjectFile.pib_story_details?.status]?.className || '';
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
        else if (selectedProjectFile.pib_story_details != null && selectedProjectFile.pib_story_details?.status && FILE_STATUS_MAP[selectedProjectFile.pib_story_details?.status] != null)
            return FILE_STATUS_MAP?.[selectedProjectFile.pib_story_details?.status]?.label || '';
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
        updateDownloadBtnState(selectedProjectFile.pib_story_details.pib_task_uid, 'Downloading', 'ADD');
        let url;
        if(selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload') {
            url = Config.BASE_URL + "/workspace_okapi/document/to/file/" + `${selectedProjectFile.document}?output_type=ORIGINAL`; 
                        
        }else {
            url = Config.BASE_URL + "/workspace_okapi/download_pib_file/" + `?task_id=${selectedProjectFile.id}&output_type=ORIGINAL`;
        }        
        setTimeout(async () => {
            const response = await downloadDifferentFile(url);
            if (response !== undefined) {
                Config.downloadFileInBrowser(response);
                updateDownloadBtnState(selectedProjectFile.pib_story_details.pib_task_uid, 'Downloading');
            }
        }, 300);
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
                if(selectedProjectFiles.length === 1) 
                    if (deleteProject) {
                        deleteProject(taskDeleteParam.current?.project_id)
                    };                               
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
    const handleViewStoryClick = async (e, selectedProjectFile, type, timeOut = 500) => {
        if (e) e.stopPropagation();
        inProgressProjectId.current = null;
        const open_as = 'editor';
        let uriPath = `pibnews-workspace/${selectedProjectFile?.id}`;
        if (selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload') {
            uriPath = 'pibfile-workspace/';
            if (selectedProjectFile?.document)
                uriPath += selectedProjectFile?.document;
            else
                uriPath += await getDocumentId(selectedProjectFile);
            uriPath += '?page=1'
        }
        setTimeout(() => {
            history(`/${uriPath}`, {state: {
                prevPath: location.pathname + location.search,
                open_as
            }});
        }, timeOut);
    }

    const getDocumentId = async (selectedProjectFile) => {
        return new Promise((resolve, reject) => {
            Config.axios({
                url: `${Config.BASE_URL}${selectedProjectFile.document_url}`,
                method: 'GET',
                auth: true,
                success: (response) => {
                    const result = response.data;
                    if (result) {
                        resolve(result.document_id);
                    }
                },
                error: (err) => {
                    console.error(err);
                    if(err?.response?.status === 500) {
                        Config.toast("Something went wrong", "error");
                    }else  {
                        reject(err);
                    }
                }
            });
        })
    }

    const updateDownloadBtnState = (taskId, btnLabel, action = 'remove') => {
        setSelectedProjectFiles(prev =>
            prev.map(file => {
                if (file.pib_story_details.pib_task_uid == taskId) {
                    return {
                        ...file,
                        downloadBtnLabel: action == 'ADD' ? btnLabel : null,
                        downloadBtnLoading: action == 'ADD' ? true : false
                    };
                }
                return file;
            })
        );
    }

    const updateActionBtnState = (taskId, btnLabel, action = 'REMOVE') => {
        setSelectedProjectFiles(prev =>
            prev.map(file => {
                if (file.pib_story_details.pib_task_uid == taskId) {
                    return {
                        ...file,
                        openBtnLabel: action == 'ADD' ? btnLabel : null,
                        openBtnLoading: action == 'ADD' ? true : false
                    };
                }
                return file;
            })
        );
    }

    const handleBtnAction = (e, selectedProjectFile, type) => {
        if (selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload') {
            handleViewStoryClick(e, selectedProjectFile, type);
        } else {
            handleTestUpload(e, selectedProjectFile, type);
        }
    }

    const handleTestUpload = (e, selectedProjectFile, type) => {
        if (FILE_STATUS_MAP[selectedProjectFile?.pib_story_details?.status]) {
            const status = FILE_STATUS_MAP[selectedProjectFile?.pib_story_details?.status];
            if (status.status == 'In_Progress') {
                handleViewStoryClick(e, selectedProjectFile, type);
            } else if (status.polling) {
                inProgressProjectId.current = selectedProjectFile.id;
                updateActionBtnState(selectedProjectFile.pib_story_details.pib_task_uid, 'Translating', 'ADD');
                startTranslation(selectedProjectFile).then(() => {
                    handleViewStoryClick(e, selectedProjectFile, type, 1500);
                })
            } else if (status.status == 'COMPLETED') {
                updateActionBtnState(selectedProjectFile.pib_story_details.pib_task_uid, 'Opening', 'ADD');
                handleViewStoryClick(e, selectedProjectFile, type, 1500);
            }
        }
    }

    const startTranslation = async (selectedProjectFile) => {
        const formData = new FormData();
        formData.append('pib_task_id', selectedProjectFile.id);
        return new Promise((resolve, reject) => {
            Config.axios({
                url: `${Config.BASE_URL}/workspace/stories_pib/translate/`,
                method: 'POST',
                data: formData,
                auth: true,
                success: (response) => {
                    const result = response.data;
                    if (result) {
                        console.log('Translate Started!!!');
                        resolve();
                        // progressTask(selectedProjectFile.id, [selectedProjectFile]);
                    }
                },
                error: (err) => {
                    console.error(err);
                    if(err?.response?.status === 500) {
                        Config.toast("Something went wrong", "error");
                    }else  {
                        reject(err);
                    }
                }
            });
        })
    }

    const prepareTaskIds = (taskList) => {
        if (taskList && taskList.length < 1) return null;
        const taskIds = taskList.map(item => {
            if (item?.pib_story_details && item?.pib_story_details?.pib_task_uid)
                return item?.pib_story_details?.pib_task_uid;
        });
        if (taskIds.length > 0) return taskIds.join(',');
        else return null;
    }

    const progressTask = (projectId, taskList) => {
        const taskIds = prepareTaskIds(taskList);
        if (!taskIds || inProgressProjectId.current != projectId) return;
        taskStatusPolling(projectId, taskIds);
    }

    const taskStatusPolling = (projectId, taskIds) => {
        if (inProgressProjectId.current != projectId) return;
        Config.axios({
            url: `${Config.BASE_URL}/workspace/poll_pib_tasks?task_ids=${taskIds}`,
            method: 'GET',
            auth: true,
            success: (response) => {
                const result = response.data;
                if (result?.length > 0) updateTaskStatus(result);
                if (!allDone(result) && inProgressProjectId.current == projectId) {
                    setTimeout(() => {
                        taskStatusPolling(projectId, taskIds);
                    }, 5000);
                } else {
                    setInProgressTaskIds([]);
                    inProgressProjectId.current = null;
                }
            },
            error: (err) => {
                console.error(err);
                inProgressProjectId.current = null
            }
        });
    }

    const allDone = (result) => result.every(item => isCompleted(item));
    const anyPending = (result) => result.some(item => item?.pib_story_details?.status == "In_Progress");
    const getPendingTask = (result) => result.map(item => {
        if (item?.pib_story_details?.status == "In_Progress") return item;
    });
    const isCompleted = (task) => task.status == "COMPLETED" || task.status == "FAILED";
    const isFileUpload = (file) => file?.pib_story_details && file?.pib_story_details?.story_creation_type == 'file_upload';
    const anyFileUpload = (result) => result.some(file => file?.pib_story_details && file?.pib_story_details?.story_creation_type == 'file_upload');

    const updateTaskStatus = (result) => {
        setSelectedProjectFiles(prev =>
            prev.map(file => {
                const matched = result.find(r => r.pib_task_uid === file.pib_story_details.pib_task_uid);
                setInProgressTaskIds(prev => {
                    const pendingTaskIds = result
                        .filter(item => !(item.status === "COMPLETED" || item.status === "FAILED"))
                        .map(item => item.pib_task_uid);
                    return pendingTaskIds;
                });
                if (matched) {
                    file.openBtnLabel = "View Progressing";
                    return {
                        ...file,
                        openBtnLabel: isCompleted(matched) ? null : file?.openBtnLabel,
                        openBtnLoading: isCompleted(matched) ? null : true,
                        pib_story_details: {
                            ...file.pib_story_details,
                            status: matched.status
                        }
                    };
                }
                return file;
            })
        );
    }

    /**
     * This method used to return the loader for the project list.
     * @param {*} param0 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 27 Nov 2025
     */
    const ListLoader = ({row = 3}) => {
        return (
            <React.Fragment>
                {Array(row)
                    .fill(null)
                    .map((value, key) => (
                        <div className="file-edit-list-table-row" key={key}>
                            <div className="file-edit-list-table-cell">
                                <div className="d-flex align-items-center">
                                    <Skeleton animation="wave" variant="text" width={30} height={35} />
                                    <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={115} />
                                </div>
                            </div>
                            <div className="file-edit-list-table-cell">
                                <Skeleton animation="wave" variant="text" width={50} />
                            </div>
                            <div className="file-edit-list-table-cell gap-[6px]">
                                <Skeleton animation="wave" variant="text" width={50} />
                                <Skeleton animation="wave" variant="text" width={50} />
                                <Skeleton animation="wave" variant="circular" width={25} height={25} />
                            </div>
                        </div>
                    ))}
            </React.Fragment>
        )
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
                    <div onClick={(e) => selectProject(project)}
                        className="file-edit-list-table-cell-wrap">
                        <div className="file-edit-list-table-cell" data-key={project.id}>
                            <span className="arrow-icon">
                                {openedProjectId == project.id
                                    ? <KeyboardArrowUpIcon className="proj-list-arrow-up" />
                                    : <KeyboardArrowDownIcon className="proj-list-arrow-down" />
                                }
                            </span>
                            <div className={"proj-title-list-container !ml-[15px]" + (project?.get_project_type === 4 ? "speech-proj" : "")}>
                                <div className="proj-type-icon-wrap">
                                </div>
                                    <div className="proj-list-info pib-proj-list-info">
                                        {project.story_creation_type === 'file_upload' && 
                                            <span class="proj-type-icon translate-bg">
                                                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium proj-types css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TranslateIcon">
                                                    <path d="m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7 1.62-4.33L19.12 17z"></path>
                                                </svg>
                                            </span>
                                        }
                                        <div>
                                            <div className="proj-information gap-[5.3px]">
                                                <Tooltip TransitionComponent={Zoom} title={project.project_name} placement="top" arrow>
                                                    <span className="file-edit-proj-txt-tmx">
                                                        {project.project_name}
                                                    </span>
                                                </Tooltip>
                                                {project.story_creation_type === 'file_upload' && project?.project_analysis?.proj_word_count &&
                                                    <span className='pib-word-badge'>{`${project?.project_analysis?.proj_word_count} W`}</span>
                                                }
                                            </div>
                                            <div className="pib-priject-type-text">
                                                <span>{project.story_creation_type === 'file_upload' ? 'File' : 'Text'}</span>
                                            </div>
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
                        {openedProjectId == project.id && !fileListLoading && selectedProjectFiles.length > 0 ? (
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
                                                <span className='pib-headline flex items-center gap-[8px]'>
                                                    {selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload' && 
                                                        <div className="block">
                                                            <span className="doc-icon">
                                                                <img src={`${Config.BASE_URL}/app/extension-image/${selectedProjectFile?.filename?.split(".")?.pop()}`} alt="doc-icon" />
                                                            </span>
                                                        </div>
                                                    }
                                                    {selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload'
                                                        ? selectedProjectFile?.filename
                                                        : selectedProjectFile?.pib_story_details?.headline}
                                                    {selectedProjectFile?.pib_story_details && selectedProjectFile?.pib_story_details?.story_creation_type == 'file_upload' && selectedProjectFile?.task_word_count &&
                                                        <span className='pib-word-badge'>{`${selectedProjectFile?.task_word_count} W`}</span>
                                                    }
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
                                                <button type="button" className="workspace-files-OpenProjectButton flex items-center justify-center gap-[6px]"
                                                    onClick={() => handleBtnAction(null, selectedProjectFile, "tar")}
                                                    disabled={selectedProjectFile?.pib_story_details?.status === 'FAILED'}
                                                    >
                                                    {selectedProjectFile && selectedProjectFile.openBtnLoading && <ButtonLoader />}
                                                    <span className="fileopen-new-btn">
                                                        {selectedProjectFile && selectedProjectFile.openBtnLabel
                                                            ? selectedProjectFile.openBtnLabel : t("open")}
                                                    </span>
                                                </button>
                                                <button type="button" className="workspace-files-OpenProjectButton flex items-center justify-center gap-[6px]" 
                                                    disabled={selectedProjectFile?.pib_story_details?.status === 'YET_TO_START'
                                                        || selectedProjectFile?.pib_story_details?.status === 'In_Progress'
                                                        || selectedProjectFile?.pib_story_details?.status === 'FAILED'}
                                                    onClick={() => handleFileDownload(selectedProjectFile)}>
                                                    {selectedProjectFile && selectedProjectFile.downloadBtnLoading && <ButtonLoader />}
                                                    <span className="fileopen-new-btn">
                                                        {selectedProjectFile && selectedProjectFile.downloadBtnLabel
                                                            ? selectedProjectFile.downloadBtnLabel : t("download")}
                                                    </span>
                                                </button>
                                                <MoreOptionsIcon project={project} selectedProjectFile={selectedProjectFile} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : fileListLoading ? (
                            <ListLoader row={2} />
                        ) : (
                            <div className="no-files-in-proj-txt">
                                {/* {t("no_files_in_this_project")} */}
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
