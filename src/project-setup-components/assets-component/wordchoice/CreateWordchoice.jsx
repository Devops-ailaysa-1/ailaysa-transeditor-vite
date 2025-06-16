import React, { createRef, useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../Breadcrumbs';
import Config from '../../../vendor/Config';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Select, { components } from "react-select";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Button from '@mui/material/Button';
import DragandDrop from "../../../vendor/DragandDrop";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { SaveButtonLoader } from '../../../loader/CommonSaveBtnLoader';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SourceLanguage from '../../../vendor/lang-modal/Sourcelanguage';
import TargetLanguage from '../../../vendor/lang-modal/Targetlanguage';
import { ButtonLoader } from '../../../loader/CommonBtnLoader';
import { useSelector } from 'react-redux';
import FilesUpload from "../../../assets/images/new-ui-icons/upload-folder.svg";
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg";
import LinkPin from "../../../assets/images/new-ui-icons/link-pin.svg";
import InsuffientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg";
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg";
import FileErrorIcon from "../../../assets/images/new-ui-icons/file-error.png";
import ArrowRightGreyColor from "../../../assets/images/new-create-hub/arrow_right_grey_color.svg";

const CreateWordchoice = (props) => {
    const {
        setSidebarActiveTab
    } = props
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    /* State constants - start */
    const params = useParams();
    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value);
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [didMount, setDidMount] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [files, setFiles] = useState([]);
    const [tmxFiles, setTMXFiles] = useState([]);
    const [tbxFiles, setTBXFiles] = useState([]);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [subjectFieldOptions, setSubjectFieldOptions] = useState(null);
    const [contentTypeOptions, setContentTypeOptions] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectType, setProjectType] = useState(10);
    const [mtpeEngines, setMtpeEngines] = useState([]);
    const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
    const [selectedMTEngine, setSelectedMTEngine] = useState({});
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState([]);
    const [subjectField, setSubjectField] = useState([]);
    const [contentType, setContentType] = useState([]);
    const [deadline, setDeadline] = useState("");
    const [mtEnable, setMtEnable] = useState(true);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);
    // const [preTranslate, setPreTranslate] = useState(false);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [createdGlossaryProject, setCreatedGlossaryProjects] = useState(false);
    const [fileError, setFileError] = useState("");
    const [fileUrlError, setFileUrlError] = useState("");
    const [projectNameError, setProjectNameError] = useState("");
    const [sourceLanguageError, setSourceLanguageError] = useState("");
    const [targetLanguageError, setTargetLanguageError] = useState("");
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [openedProjectId, setOpenedProjectId] = useState(null);
    const [createdTasks, setCreatedTasks] = useState({ files: [], jobs: [] });
    const [supportFileExtensions, setSupportFileExtensions] = useState(['.docx', '.pdf', '.txt']);
    const [supportedTMXFileExtensions, setSupportedTMXFileExtensions] = useState([ ".tmx",]);
    const [supportedTBXFileExtensions, setSupportedTBXFileExtensions] = useState([ ".tbx", ]);
    const [paginationContent, setPaginationContent] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [clickedOpenButton, setClickedOpenButton] = useState(null);
    const [showSettings, setshowSettings] = useState(false);
    const [showWordCount, setshowWordCount] = useState(false);
    const [showAssignManageModal, setShowAssignManageModal] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [fileUploadTabActive, setFileUploadTabActive] = useState(1);
    const [selectedProjectFilesCount, setSelectedProjectFilesCount] = useState(1);
    const [selectedProjectFiles, setSelectedProjectFiles] = useState([]);
    const [machineLangTranslationChange, setmachineLangTranslationChange] = useState(null);
    const [editProjectId, setEditProjectId] = useState(null);
    const [sourceLanguageDisable, setSourceLanguageDisable] = useState(false);
    const [editFiles, setEditFiles] = useState([]);
    const [glossaryEditFiles, setGlossaryEditFiles] = useState([]);
    const [editJobs, setEditJobs] = useState([]);
    const [editSubjects, setEditSubjects] = useState([]);
    const [editContents, setEditContents] = useState([]);
    // const [selectedSteps, setSelectedSteps] = useState([]);
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [sourceLabel, setSourceLabel] = useState("");
    const [targetLabel, setTargetLabel] = useState("");
    const [projectWordCount, setProjectWordCount] = useState(0);
    const [projectCharCount, setProjectCharCount] = useState(0);
    const [projectSegmentCount, setProjectSegmentCount] = useState(0);
    const [selectedProjectAnalysis, setSelectedProjectAnalysis] = useState(null);
    const [showListingLoader, setShowListingLoader] = useState(false);
    const [showCreateLoader, setShowCreateLoader] = useState(false);
    const [showUpdateLoader, setShowUpdateLoader] = useState(false);
    const [showWordCountLoader, setShowWordCountLoader] = useState(false);
    const [addonCredit, setAddonCredit] = useState(0);
    const [subscriptionCredit, setSubscriptionCredit] = useState(0);
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [teamSelect, setTeamSelect] = useState("");
    const [trojectSelect, setProjectSelect] = useState("");
    const [jobSelect, setJobSelect] = useState("");
    const [vendorSelect, setVendorSelect] = useState("");
    const [draweractiveTab, setDrawerActiveTab] = useState(1);
    const [CurrencySelect, setCurrencySelect] = useState("");
    const [UnitTypeSelect, setUnitTypeSelect] = useState("");
    const [orderField, setOrderField] = useState(null);
    const [teamOptions, setTeamOptions] = useState();
    const [teamSelectError, setTeamSelectError] = useState("");
    const [assignedTaskId, setAssignedTaskId] = useState(null);
    const [assignProjectId, setAssignProjectId] = useState(null);
    const [projectAvailalbility, setProjectAvailalbility] = useState(null);
    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [projectSearchTerm, setProjectSearchTerm] = useState("");
    const [userSubscriptionPlan, setUserSubscriptionPlan] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTeamEdit, setShowTeamEdit] = useState(false);
    const [instructionText, setInstructionText] = useState(null);
    const [instructionFile, setInstructionFile] = useState(null);
    const [taskAssignInfoId, setTaskAssignInfoId] = useState(null);
    const [showVersionControlModal, setShowVersionControlModal] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [integrationPlatform, setIntegrationPlatform] = useState(null);
    const [integrationFiles, setIntegrationFiles] = useState([]);
    const [tourStepIndex, setTourStepIndex] = useState(0);
    const [isProductTourSeen, setIsProductTourSeen] = useState(true);
    const [postEditStep, setPostEditStep] = useState(true);
    const [proofReadStep, setProofReadStep] = useState(false);
    const [allLangDetailsList, setAllLangDetailsList] = useState(null);
    const [sourceTargetValidation, setSourceTargetValidation] = useState({
        source: false,
        target: false,
    })
    const [preTranslate, setPreTranslate] = useState(false);
    const [translationByPage, setTranslationByPage] = useState(true);
    // steps related states
    const [steps, setSteps] = useState([]);
    const [stepOptions, setStepOptions] = useState([]);
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [stepsFromApi, setstepsFromApi] = useState([]);
    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
    const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
    const [
        detailsOfPrimaryGlossarySourceName,
        setDetailsOfPrimaryGlossarySourceName,
    ] = useState("");
    const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
    const [glossaryLicense, setGlossaryLicense] = useState("");
    const [selectedUsagePermission, setSelectedUsagePermission] = useState({
        value: 1,
        label: t("private"),
    });
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([] );
    const [isEdit, setIsEdit] = useState(false);
    const [commonTarValue, setCommonTarValue] = useState(null);
    const [commonSrcValue, setCommonSrcValue] = useState(null);
    const [commonMtpeEngine, setCommonMtpeEngine] = useState(null);
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const [revisionStepEdit, setRevisionStepEdit] = useState(null);
    const [selectedMTFromAPI, setSelectedMTFromAPI] = useState({});
    const [pdfIdFromToolkit, setPdfIdFromToolkit] = useState(null);
    const [recentlyUsedLangs, setRecentlyUsedLangs] = useState([]);
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [showmodelwarning, setShowmodelwarning] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const { pathname } = useLocation();
    const [navigationModalVisible, setNavigationModalVisible] = useState(false);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [hasTeam, setHasTeam] = useState(null);
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);
    const [isProjectDeleting, setIsProjectDeleting] = useState(false);
    const [showDocumentOpeingModal, setshowDocumentOpeingModal] = useState(false);
    const [showTranslateAndDownloadBtn, setShowTranslateAndDownloadBtn] = useState(false);
    const [projectTaskList, setProjectTaskList] = useState([]);
    const [translateDownloadBtnLoader, setTranslateDownloadBtnLoader] = useState(false);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [checkchangenav, setCheckchangenav] = useState(false);
    const [axiosFileTranslateAbortController, setAxiosFileTranslateAbortController] = useState(null);
    const [isDownloading, setIsDownloading] = useState(null);
    const [showFileErrorModal, setShowFileErrorModal] = useState(false);
    const [formValidation, setFormValidation] = useState({
        source: false,
        target: false
    });   
    /* State constants - end */

    /* Ref constants - start */
    const searchAreaRef = useRef(null);
    const mtEngineOptionRef = useRef(null);
    const fileUploadTop = createRef();
    const sourceLanguageLabel = createRef();
    const targetLanguageLabel = createRef();
    const projectNameRef = useRef("");
    const sourceLanguageModal = useRef();
    const projectsPerPage = useRef(20);
    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const deletedSubjectIds = useRef([]);
    const deletedContentIds = useRef([]);
    // const allowedFileLength = useRef(10);
    // const fileLengthErrMsg = useRef(`Only ${allowedFileLength.current} files are allowed in a project`);
    // const allowedTargetLanguageLength = useRef(20);
    // const allowedFileSize = useRef(100); //In MB
    // const fileSizeErrMsg = useRef(`Exceeds the file(s) size limit of ${allowedFileSize.current} MB`);
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const projectIdToSelect = useRef(null);
    const targetLanguageOptionsRef = useRef([]);
    const subjectFieldOptionsRef = useRef([]);
    const contentTypeOptionsRef = useRef([]);
    const stepOptionsRef = useRef([]);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const projectEditable = useRef(false);
    const contentprojectNameRef = useRef();
    const [hasFocus, setHasFocus] = useState(false);
    const prevPageInfo = useRef(null);
    const sourceLangRef = useRef(null);
    const projectDataFromApi = useRef(null);
    const translateDownloadCeleryTaskListRef = useRef([]);
    const createdProjectIdRef = useRef(null);
    const projectTaskListRef = useRef(null);
    const inputFileUploadRef = useRef(null);
    const fileTranslatingTaskListRef = useRef([]);
    /* Ref constants - end */

    const customMtSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#3C4043" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                // borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            marginTop: '8px',
            width: "100%",
            boxShadow: 0,
            height: 39,
            "&:hover": {
                background: "#EBEBEB"
            },
        }),
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: () => console.log(''),
    };

    const modaloptions = {
        closeMaskOnClick: false,
        width: navigationModalVisible ? 520 : null,
        height: navigationModalVisible ? 240 : null,
        onClose: () => console.log(''),
    };

    useEffect(() => {
        if(languageOptionsList?.length){
            setSourceLanguageOptions(languageOptionsList);
            setTargetLanguageOptions(languageOptionsList);
            if (location.search === '') {
                recentlyUsedLanguage();
            }
        }
    }, [languageOptionsList, location.search]);

    useEffect(() => {
        if(sourceLanguage !== ''){
            setTargetLanguageOptions(languageOptionsList?.filter(lang => lang.id !== sourceLanguage));
            setTargetLanguage(targetLanguage?.filter(each => each.id !== sourceLanguage));
            setFormValidation({...formValidation, source: false});
        }
    }, [sourceLanguage]);

    useEffect(() => {
        if (targetLanguage?.length !== 0) {
            setFormValidation({...formValidation, target : false});
            let a = [];
            editJobs?.forEach((each) => {
                if (each?.target_language !== null) {
                    targetLanguage?.map((b) => {
                        if (b?.id === each?.target_language) {
                            a.push(each?.id);
                        }
                    });
                }
            });
            let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
            setTargetLangListToRemove(targetLangToRemove);
        }
    }, [targetLanguage])

    useEffect(() => {
        let projectParam = URL_SEARCH_PARAMS.get('project');
        if(projectParam && languageOptionsList?.length !== 0){
            setEditProjectId(projectParam);
            createdProjectIdRef.current = projectParam;
            getProjectData(projectParam);
        }
    }, [URL_SEARCH_PARAMS.get('project'), languageOptionsList]);
    
    const getProjectData = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let {
                    data,
                } = response;
                let editSourceLanguage = languageOptionsList?.find(
                    (element) => element.id == data.jobs[0].source_language
                );
                deletedJobIds.current = [];
                deletedEditFileIds.current = [];
                setFiles([]);
                // setEditFiles(data.files);
                setEditJobs(data.jobs);
                let tar = [];
                let tarID = [];
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setHasTeam(data?.team);
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                setMtEnable(data?.mt_enable);
                setPreTranslate(data?.pre_translate);
                setTranslationByPage(data?.get_mt_by_page);
                setSourceLanguage(editSourceLanguage?.id);
                setSourceLabel(editSourceLanguage?.language);
                setSourceLanguageDisable(true);
                let deadlineLocal = Config.convertUTCToLocal(data?.project_deadline);
                setDeadline(deadlineLocal);
                console.log(languageOptionsList);
                let editTargetLanguages = [];
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            languageOptionsList?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });
                setTimeout(() => {
                    setProjectName(data.project_name);
                    setRevisionStepEdit(data?.revision_step_edit);
                    contentprojectNameRef.current.innerText = data.project_name;
                    setTargetLanguage(editTargetLanguages);
                    setSelectedSteps(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)));
                    setstepsFromApi(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)));
                    // setIsLoading(false)
                }, 80);
            },
        });
    } 

    const isFormValid = () => {
        if(sourceLanguage === '' || targetLanguage?.length === 0){
            setFormValidation({
                source: sourceLanguage === '' ? true : false,
                target: targetLanguage?.length === 0 ? true : false
            });
            return false;
        }
        return true;
    } 
    
    const handleBlockedNavigation = nextLocation => {
        if (files.length > 0) {
            setShowmodelwarning(true);
        }
        else {
            setShowmodelwarning(false);
        }
        if (!confirmedNavigation && pathname) {
            setLastLocation(nextLocation);
            if (nextLocation.hash != "#!" && nextLocation.pathname != "/file-upload" && !nextLocation.pathname?.includes('/translations') && !nextLocation.pathname?.includes('/workspace')) {
                setNavigationModalVisible(true);
                return false;
            }
            if (nextLocation.state === null && nextLocation.pathname == "/file-upload" && !nextLocation.pathname?.includes('/translations') && !nextLocation.pathname?.includes('/workspace')) {
                setNavigationModalVisible(true);
                return false;
            }
        }
        return true;
    }

    const handleConfirmNavigationClick = () => {
        setNavigationModalVisible(false);
        setConfirmedNavigation(true);
    }

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        /* let elements = document.getElementsByClassName('list selected')
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('selected')
            }
            e.target.classList.add("selected") */
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            source: false,
        });
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
            targetLanguageTemp = Config.removeItemFromArray(
                targetLanguageTemp,
                value
            );
            if (editProjectId != null) {
                let thisJob = editJobs.find(
                    (element) => element.target_language == value?.id
                );
                if (thisJob?.id != null) deletedJobIds.current.push(thisJob?.id);
            }
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
            targetLanguageTemp.push(value);
        }
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            target: false,
        });
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /* Handling all the project creation form */
    const handleChange = (e) => {
        // e.target.files[0].name.length
        for (let i = 0; i < (e.target.files).length; i++) {
            if ((e.target.files[i]?.name).length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return;
            }
        }
        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;
                // let fileList = JSON.parse(JSON.stringify(files));
                let fileList = [...files];
                Object.keys(thisFiles).map((eachKey) => {
                    if (isSupportedFile(thisFiles[eachKey])) {
                        // Check for supprted file types
                        // if (editFiles.length + fileList.length < allowedFileLength.current)
                        if (
                            thisFiles[eachKey].size / 1024 / 1024 <=
                            allowedSingleFileSize.current
                        )
                            fileList.push(thisFiles[eachKey]);
                        else Config.toast(singleFileSizeError.current, "error");
                        // else
                        // Config.toast(fileLengthErrMsg.current, 'error');
                    }
                });
                setFiles(fileList);
                // setFiles(prevState => [...prevState, e.target.files]);
                break;
            }
            case "projectName": {
                if (e.target.value == "") setProjectNameError(t("enter_proj_name"));
                else setProjectNameError("");
                setProjectName(e.target.value);
                break;
            }
            default: {
                break;
            }
        }
    };

    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        //Also check handleChange
        for (let i = 0; i < (filesTemp).length; i++) {
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return;
            }
        }
        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if (!request && isSupportedFile(filesTemp[eachKey])) {
                // if (editFiles.length + fileList.length < allowedFileLength.current);
                if (
                    filesTemp[eachKey].size / 1024 / 1024 <=
                    allowedSingleFileSize.current
                )
                    fileList.push(filesTemp[eachKey]);
                else Config.toast(singleFileSizeError.current, "error");
                // else
                // Config.toast(fileLengthErrMsg.current, 'error');
            } else if (request !== null) {
                if (
                    (request === "tmx" && isSupportedFile(filesTemp[eachKey], request)) ||
                    (request === "tbx" && isSupportedFile(filesTemp[eachKey], request))
                ) {
                    if (
                        filesTemp[eachKey].size / 1024 / 1024 <=
                        allowedSingleFileSize.current
                    )
                        fileList.push(filesTemp[eachKey]);
                    else Config.toast(singleFileSizeError.current, "error");
                }
            }
        });
        if (request === "tmx") setTMXFiles(fileList);
        else if (request === "tbx") setTBXFiles(fileList);
        else setFiles(fileList);
        setShowFileUpload(false);
        // setFiles(prevState => [...prevState, fileList]);
    };

    /* Removed dragged files */
    const removeFile = (e, index) => {
        let filesTemp = files;
        delete filesTemp[index];
        let isFilesEmpty = true;
        let finalFiles = [];
        Object.keys(filesTemp).map((eachKey) => {
            if (filesTemp[eachKey] != null) {
                isFilesEmpty = false;
                finalFiles.push(filesTemp[eachKey]);
            }
        });
        if (isFilesEmpty) filesTemp = [];
        setFiles(finalFiles);
        inputFileUploadRef.current.value = '';
    };

    /* Delete files when editing */
    const deleteEditFile = (e, canDelete = false, editFileId) => {
        if (canDelete) {
            /* Config.axios({
                       url: `${Config.BASE_URL}/workspace/project/quick/setup/${editProjectId}/?file_delete_ids=${editFileId}`,
                       method: 'PUT',
                       auth: true,
                       success: (response) => {*/
            let editFilesTemp = editFiles;
            let deleteValue = editFiles.find((element) => element.id == editFileId);
            setEditFiles(Config.removeItemFromArray(editFilesTemp, deleteValue));
            let deletedEditFileIdsTemp = deletedEditFileIds.current;
            deletedEditFileIdsTemp.push(editFileId);
            deletedEditFileIds.current = deletedEditFileIdsTemp;
            /*}
              })*/
        } else Config.toast(t("file_progress_cannot_deleted"), "warning");
    };

    /* Check the file is a supprt file type */
    const isSupportedFile = (file, request = null) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (!request && supportFileExtensions.indexOf(ext?.toLowerCase()) == -1) {
            Config.toast(t("file_format_not_support"), 'warning');
            return false;
        } else if (
            request === "tmx" &&
            supportedTMXFileExtensions.indexOf(ext) == -1
        ) {
            Config.toast(t("file_format_not_support"), 'warning');
            return false;
        } else if (
            request === "tbx" &&
            supportedTBXFileExtensions.indexOf(ext) == -1
        ) {
            Config.toast(t("file_format_not_support"), 'warning');
            return false;
        }
        return true;
    };

    const recentlyUsedLanguage = () => {
        var list;
        Config.axios({
            url: Config.BASE_URL + "/workspace/default_detail/",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.recent_pairs?.map(each => {
                    list = (<span>{languageOptionsList.find(eachlang => eachlang.id === each.src)?.language}</span> + <span>{each.tar?.length > 1 ? each.tar.map(eachTar => languageOptionsList.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : languageOptionsList.find(eachlang => eachlang.id === each.tar[0])?.language}</span>);
                    options.push({
                        value: `${each.src}->${each.tar.join(',')}`,
                        label: `${languageOptionsList.find(eachlang => eachlang.id === each.src)?.language}`,
                        customAbbreviation: `${each.tar?.length > 1 ? each.tar.map(eachTar => languageOptionsList.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : languageOptionsList.find(eachlang => eachlang.id === each.tar[0])?.language
                            }`
                    });
                })
                setRecentlyUsedLangs(options);
            },
        });
    }

    const handleRecentLangClick = (clickedLang) => {
        let src = clickedLang.value.split('->')[0];
        let tar = clickedLang.value.split('->')[1]?.split(',');
        setSourceLabel(languageOptionsList?.find((element) => element.id == src).language);
        setSourceLanguage(src);
        let selectedTar = [];
        tar?.map(eachTar => {
            selectedTar.push(languageOptionsList?.find((element) => element.id == eachTar))
        });
        setTargetLanguageOptions(languageOptionsList?.filter(lang => lang.id != src));
        setTargetLanguage([...new Set(selectedTar?.filter(each => each.id != src))]);
        setFormValidation({source: false, target: false});
    }

    const formatOptionLabel = ({ value, label, customAbbreviation }) => (
        <div style={{ display: "flex" }}>
            <div className="pairlang__src">{label}
                <img className="pairlang__arrow" src={ArrowRightGreyColor} alt="" />
            </div>
            <div className="pairlang__tar">
                {customAbbreviation}
            </div>
        </div>
    );

    const focusSourceLangDiv = () => {
        if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if(!isFormValid()) return;
        formData.append("source_language", sourceLanguage);
        targetLanguage.map((eachTargetLanguage) => {
            formData.append("target_languages", eachTargetLanguage?.id);
        });
        formData.append("project_type", "10");
        // let deadlineUTC = Config.convertLocalToUTC(deadline);
        // deadline && formData.append("project_deadline", deadlineUTC);
        // formData.append("mt_enable", mtEnable);
        // formData.append("pre_translate", preTranslate);
        // selectedSteps?.map(eachStep => {
        //     formData.append("steps", eachStep?.value);
        // });
        if (projectName !== null && projectName?.trim() !== "") {
            formData.append("project_name", projectName);
        } 
        setShowCreateLoader(true);
        
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                createdProjectIdRef.current = response.data.id;
                // Config.toast("Project created successfully");
                if(files?.length !== 0){
                    updateFilesInProject();
                }else{
                    history(`/wordchoice-workspace/${response.data.id}`);
                }
                // history(`/translations?page=1&open-project=${response.data.id}`);
            },
            error: (err) => {
                Config.toast("Something went wrong", 'warning');
                setShowCreateLoader(false);
            }
        });
    } 
    
    const handleUpdate = (e) => {
        e.preventDefault();        
        let formData = new FormData();        
        if(!isFormValid()) return;
        formData.append("project_name", projectName);        
        formData.append("source_language", sourceLanguage);
        let updatedTargetLanguageArr = [];
        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            ){
                updatedTargetLanguageArr.push(eachTargetLanguage);
                formData.append("target_languages", eachTargetLanguage?.id);
            }
        });
        // let deadlineUTC = Config.convertLocalToUTC(deadline);
        // deadline && formData.append("project_deadline", deadlineUTC);
        // formData.append("mt_enable", mtEnable);     
        let list = "";
        targetLangListToRemove?.map((each, index) => {
            list += `${each.id}${index !== targetLangListToRemove.length - 1 ? "," : ""
                }`;
        });
        formData.append("project_type", projectType);
        // if (projectAvailalbility === "team") formData.append("team", true);
        // else 
        formData.append("team", hasTeam);
        let url = `${
                Config.BASE_URL
            }/workspace/project/quick/setup/${editProjectId}/?file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${list}&project_type_id=10`;        
        setShowUpdateLoader(true);

        Config.axios({
            url: url,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {                
                if(files?.length !== 0 || updatedTargetLanguageArr?.length !== 0){
                    updateFilesInProject(updatedTargetLanguageArr);
                }else{
                    Config.toast("Project updated successfully");
                    projectIdToSelect.current = response.data.id;
                    setShowUpdateLoader(false);
                    history(`/assets?type=wordchoices&page=${prevPageInfo.current?.pageNo != undefined ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy != undefined ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${response.data.id}`);
                }
                // history(`/wordchoice-workspace/${response.data.id}`);              
            },
            error: (error) => {
                Config.log(error);
            },
        });
    } 

    const deleteProject = (projectId) => {
        setIsProjectDeleting(true);
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                setIsProjectDeleting(false);
                history("/assets?type=wordchoices&page=1");
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowTaskDeleteAlert(true);
                    setShowDeleteConfirmationModal(false);
                    setIsProjectDeleting(false);
                }
                setIsProjectDeleting(false);
            }
        });
    } 

    const updateFilesInProject = (updatedTargetLanguageArr) => {
        let formData = new FormData();        
        formData.append("proj_id", createdProjectIdRef.current);
        for (let x = 0; x < files.length; x++) {
            if (typeof files[x] != "undefined") formData.append("file", files[x]);
        }
        if(updatedTargetLanguageArr?.length !== 0){
            updatedTargetLanguageArr?.forEach(each => {
                formData.append("language_id", each.id);
            })
        }        

        Config.axios({
            url: `${Config.BASE_URL}/glex/get_terminology`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                history(`/wordchoice-workspace/${createdProjectIdRef.current}`);

            },
            error: (err) => {
                Config.toast("Something went wrong", 'warning');
                setShowCreateLoader(false);
            }
        });
    }

    const handleProjectNamechange = (e) => {
        if (e.target.innerText == "") setProjectNameError(t("enter_proj_name"));
        else setProjectNameError("");
        setProjectName(e.target.innerText);
    };

    const handleHideIcon = () => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    };

    const executeProposalScroll = () => {
        contentprojectNameRef.current.scrollTo(0, 0);
    }

    const handleProjectEnter = (e) => {
        if(e.which === 13) {
            e.target.blur();
        } else {
            e.target.focus();
        }
    };
    
    return (
        <React.Fragment>
            <div className="ai-working-area-glb-wrapper">
                <div className="file-trans-breadcrumbs-section">
                    <Breadcrumbs />
                    <div className={"project-input-wrap "}>
                        <div
                            ref={contentprojectNameRef}
                            suppressContentEditableWarning={true}
                            contentEditable={projectTaskList?.length === 0 ? true : false}
                            onClick={() => projectTaskList?.length === 0 && handleHideIcon()}
                            onBlur={() => projectTaskList?.length === 0 && executeProposalScroll()}
                            data-placeholder={t("untitled_wordchoice")}
                            onKeyUp={(e) => projectTaskList?.length === 0 && handleProjectNamechange(e)}
                            onKeyDown={(e) => projectTaskList?.length === 0 && handleProjectEnter(e)}
                            className="project-box"
                            tabIndex={0}
                        ></div>
                    </div>
                </div>
                <div className={"ai-translate-file-wrapper " + (projectTaskList?.length !== 0 ? "behind-overlay" : "")} style={(showCreateLoader || translateDownloadBtnLoader) ? {pointerEvents: 'none'} : {}}>
                    <div>
                    {isLoading ? (
                        <React.Fragment>
                            <div className="col-xs-12 mt-4">
                                <div className="d-flex">
                                    <Skeleton animation="wave" width={85} height={50} />
                                    <Skeleton
                                        className="ml-2"
                                        animation="wave"
                                        width={110}
                                        height={50}
                                    />
                                </div>
                            </div>
                            <div className="fileupload-global-tab-wrapper mt-3">
                                {Array(4)
                                    .fill(null)
                                    .map((value, key) => (
                                        <div
                                            key={key}
                                            className="pt-2 pb-2 d-flex justify-content-between align-items-center file-list-bot-border"
                                        >
                                            <div className="d-flex">
                                                <Skeleton
                                                    animation="wave"
                                                    variant="circle"
                                                    width={20}
                                                    height={20}
                                                />
                                                <Skeleton
                                                    className="ml-2"
                                                    animation="wave"
                                                    width={140}
                                                    height={24}
                                                />
                                            </div>
                                            <Skeleton
                                                animation="wave"
                                                variant="circle"
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                    ))}
                            </div>
                            <div className="col-xs-12 mt-3">
                                <div className="d-flex">
                                    <Skeleton
                                        animation="wave"
                                        variant="circle"
                                        width={20}
                                        height={20}
                                    />
                                    <Skeleton
                                        className="ml-2"
                                        animation="wave"
                                        width={120}
                                        height={15}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 mt-2">
                                <Skeleton animation="wave" width={100} height={60} />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {isLoading ? (
                                <React.Fragment>
                                    {Array(4)
                                        .fill(null)
                                        .map((value, key) => (
                                            <div className="project-setup-forms" key={key}>
                                                <div className="input-form-field">
                                                    <div className="form-group">
                                                        <Skeleton
                                                            className="mb-2"
                                                            animation="wave"
                                                            width={180}
                                                            height={20}
                                                        />
                                                        <Skeleton
                                                            animation="wave"
                                                            width={470}
                                                            height={40}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </React.Fragment>
                            ) : (
                                <div className="project-setup-forms new-file-proj-setup-wrapper file-upload-form create-wordchoice-form">
                                    {editProjectId &&
                                        projectAvailalbility &&
                                        !Config.userState?.is_internal_member &&
                                        (userSubscriptionPlan === "Business" || userSubscriptionPlan === "Pay-As-You-Go") &&
                                        showTeamEdit && (
                                            <div className="form-checkbox-align form-setup-section">
                                                <div className="form-group form-check files-space-align">
                                                    <input
                                                        type="radio"
                                                        name="self_project"
                                                        className="form-check-input"
                                                        id="self-project"
                                                        value="self"
                                                        checked={projectAvailalbility === "self"}
                                                        onChange={(e) => setProjectAvailalbility("self")}
                                                    />
                                                    <label
                                                        className="form-radio-label"
                                                        htmlFor="self-project"
                                                    >
                                                        {t("self")}
                                                    </label>
                                                </div>
                                                <div className="form-group form-check ">
                                                    <input
                                                        type="radio"
                                                        name="team_project"
                                                        className="form-check-input"
                                                        id="team-project"
                                                        value="team"
                                                        checked={projectAvailalbility === "team"}
                                                        onChange={(e) => setProjectAvailalbility("team")}
                                                    />
                                                    <label
                                                        className="form-radio-label"
                                                        htmlFor="team-project"
                                                    >
                                                        {t("team")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                    <div className="d-flex gap-3 files-space-align ">
                                        <div className="form-fields">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlFile1">
                                                    {t("source_language")}<span className="asterik-symbol">*</span>
                                                </label>
                                                <div
                                                    ref={sourceLangRef}
                                                    className={
                                                        sourceLanguageDisable
                                                            ? "ai-lang-select disabled"
                                                            : "ai-lang-select"
                                                    }
                                                    onClick={() => { sourceLanguageDisable ? setshowSrcLangModal(false) : setshowSrcLangModal(true) }}
                                                >
                                                    {(sourceLabel === "") ? (
                                                        <span className="placeholder">{t("select_source_language")}</span>
                                                    ) : (
                                                        <span>{sourceLabel}</span>
                                                    )}
                                                    <i
                                                        style={{ color: "#8c8c8c" }}
                                                        className="fas fa-caret-down"
                                                    />
                                                </div>
                                                {(location.search === "" && recentlyUsedLangs?.length !== 0) &&
                                                    <Select
                                                        // menuIsOpen={true}
                                                        className='recently-used-pair'
                                                        options={recentlyUsedLangs}
                                                        isSearchable={false}
                                                        classNamePrefix="mt-select"
                                                        value={null}
                                                        formatOptionLabel={formatOptionLabel}
                                                        styles={customMtSelectStyles}
                                                        onChange={handleRecentLangClick}
                                                        placeholder={t("recently_used_pairs")}
                                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                    />
                                                }
                                                {formValidation.source && <small className="text-danger">{t("select_source_language")}</small>}
                                            </div>
                                        </div>
                                        <div className="form-fields">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlFile1">
                                                    {t("target_languages")}<span className="asterik-symbol">*</span>
                                                </label>
                                                <Tooltip
                                                    arrow
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                bgcolor: '#2A2A2A',
                                                                '& .MuiTooltip-arrow': {
                                                                    color: '#2A2A2A',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    title={`${targetLanguageListTooltip}`} placement="top"
                                                >
                                                    <div
                                                        style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                                        className="ai-lang-select"
                                                        onClick={() => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }}
                                                    >
                                                        {targetLanguage?.length == 0 ? (
                                                            <span className="placeholder">
                                                                {t("select_target_language-1")}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {targetLanguage.length +
                                                                    " " +
                                                                    (targetLanguage.length > 1 ? t("languages") : t("language")) +
                                                                    " " + t("selected")}
                                                            </span>
                                                        )}
                                                        <i
                                                            style={{ color: "#8c8c8c" }}
                                                            className="fas fa-caret-down"
                                                        />
                                                    </div>
                                                </Tooltip>
                                                {formValidation.target && <small className="text-danger">{t("target_validation_note")}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="fileupload-global-tab-wrapper wordchoice-file-upload-sec">
                                <p className="upload-area-title">{t("upload_files")}<span className="optional-txt">({t("optional")})</span></p>
                                {projectType === 2 && (
                                    <Nav tabs className="fileupload-tab-row">
                                        <NavItem
                                            className={
                                                "fileupload-tab-list " +
                                                classnames({ active: fileUploadTabActive == 1 })
                                            }
                                            // onClick={() => {
                                            //     fileUploadTabToggle(1);
                                            // }}
                                        >
                                            <NavLink className="fileupload-tab-link">{t("files")}</NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={
                                                "fileupload-tab-list " +
                                                classnames({ active: fileUploadTabActive == 2 })
                                            }
                                            // onClick={() => {
                                            //     fileUploadTabToggle(2);
                                            // }}
                                        >
                                            <NavLink className="fileupload-tab-link">
                                                {t("integrations")}
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                )}
                                <TabContent activeTab={fileUploadTabActive}>
                                    <TabPane tabId={1}>
                                        {fileError != "" && (
                                            <span className="text-danger mb-2">{fileError}</span>
                                        )}
                                        {
                                            <>
                                                <div
                                                    className={
                                                            (!showFileUpload && files.length > 0)
                                                            ? "dropfile-area"
                                                            : "col-xs-12 mt-3"
                                                    }
                                                >
                                                    <DragandDrop handleDrop={handleDrop}>
                                                        <div className={files.length > 0 ? "button-wrap fileloaded h-25" : "button-wrap sa"} >
                                                            <div className="draganddrop-align">
                                                                <img className={(files.length > 0) ? 'img' : ''}
                                                                    src={FilesUpload}
                                                                    alt="folder"
                                                                />

                                                                {Object.keys(files).map((eachKey) => {
                                                                    return (
                                                                        <div
                                                                            key={eachKey + files[eachKey].name}
                                                                            className="file-name-list"
                                                                        >
                                                                            <div className="filename">
                                                                                {
                                                                                    <img
                                                                                        src={
                                                                                            import.meta.env.PUBLIC_URL +
                                                                                            "/assets/images/document.svg"
                                                                                        }
                                                                                        alt="document"
                                                                                    />
                                                                                }{" "}
                                                                                {files[eachKey].name}
                                                                            </div>
                                                                            <span
                                                                                data-file-index={eachKey}
                                                                                onClick={(e) => removeFile(e, eachKey)}
                                                                            >
                                                                                <i className="far fa-trash-alt"></i>
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                })}
                                                                <div style={{marginBottom: "10px"}}>
                                                                    <div className="file-upload-align">
                                                                        <p className="upload-text">
                                                                            {t("drop_your_files_here_or")}{" "}
                                                                        </p>
                                                                        <div className="upload-link-wrapper">
                                                                            <label htmlFor="files">{t("browse")}</label>
                                                                            <input
                                                                                ref={inputFileUploadRef}
                                                                                type="file"
                                                                                name="files"
                                                                                className="form-control-file"
                                                                                id="files"
                                                                                accept={supportFileExtensions.join(",")}
                                                                                onChange={handleChange}
                                                                                multiple
                                                                                hidden
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <p className="upload-text">
                                                                        {t("supported_file_formats")}: {supportFileExtensions?.join(' | ')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DragandDrop>
                                                </div>

                                                <div
                                                    className={
                                                        integrationFiles.length ||
                                                            (editProjectId == null &&
                                                                !showFileUpload &&
                                                                files.length == 0 && pdfIdFromToolkit == null)
                                                            ? "d-none"
                                                            : "col-xs-12"
                                                    }
                                                >
                                                    <div className="button-wrap-file-list">
                                                        <div className="file-list-align">
                                                            <div className="file-list">
                                                                {editFiles?.map((editFile) => (
                                                                    <div
                                                                        key={editFile.id}
                                                                        className="file-name-list"
                                                                    >
                                                                        <div className="filename" style={{ width: '100%' }}>
                                                                            {
                                                                                <img
                                                                                    src={
                                                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                                                        editFile.filename.split(".").pop()
                                                                                    }
                                                                                    alt="document"
                                                                                />
                                                                            }
                                                                            <span className="filename-length">
                                                                                {editFile.filename
                                                                                    .split(".")
                                                                                    .slice(0, -1)
                                                                                    .join(".")}
                                                                            </span>
                                                                            <span className="extension">
                                                                                {"." +
                                                                                    editFile.filename.split(".").pop()}
                                                                            </span>
                                                                        </div>
                                                                        <span
                                                                            className="upload-file-delete"
                                                                            onClick={(e) =>
                                                                                deleteEditFile(
                                                                                    e,
                                                                                    editFile?.can_delete,
                                                                                    editFile.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={CloseBlack}
                                                                                alt="delete"
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                ))}

                                                                {Object.keys(files).map((eachKey) => {
                                                                    return (
                                                                        <div
                                                                            key={eachKey + files[eachKey].name}
                                                                            className="file-name-list"
                                                                        >
                                                                            <div className="filename" style={{ width: '90%' }}>
                                                                                {
                                                                                    <img
                                                                                        src={
                                                                                            `${Config.BASE_URL}/app/extension-image/` +
                                                                                            files[eachKey].name
                                                                                                .split(".")
                                                                                                .pop()
                                                                                        }
                                                                                        alt="document"
                                                                                    />
                                                                                }
                                                                                <span className="filename-length">
                                                                                    {files[eachKey].name
                                                                                        .split(".")
                                                                                        .slice(0, -1)
                                                                                        .join(".")}
                                                                                </span>
                                                                                <span className="extension">
                                                                                    {"." +
                                                                                        files[eachKey].name
                                                                                            .split(".")
                                                                                            .pop()}
                                                                                </span>
                                                                            </div>
                                                                            <span
                                                                                className="upload-file-delete"
                                                                                data-file-index={eachKey}
                                                                                onClick={(e) =>
                                                                                    removeFile(e, eachKey)
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={CloseBlack}
                                                                                    alt="delete"
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div
                                                                className={
                                                                    "d-none " +
                                                                    (integrationFiles.length ? " d-none" : "d-none")
                                                                }
                                                            >
                                                                <input
                                                                    type="file"
                                                                    name="files"
                                                                    id="files-drag"
                                                                    onChange={(e) => handleChange(e)}
                                                                    multiple
                                                                    hidden
                                                                />
                                                                <label
                                                                    className="form-control-file"
                                                                    htmlFor="files-drag"
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={LinkPin}
                                                                            alt="link-pin"
                                                                        />
                                                                    </span>{" "}
                                                                    {t("add_more")}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        integrationFiles.length === 0
                                                            ? "d-none"
                                                            : "col-xs-12 mt-3"
                                                    }
                                                >
                                                    <DragandDrop handleDrop={handleDrop}>
                                                        <div className="button-wrap-file-list">
                                                            <div className="file-list-align">
                                                                <div className="file-list">
                                                                    {integrationFiles.map((integrationFile) => {
                                                                        return (
                                                                            <div
                                                                                key={integrationFile.id}
                                                                                className="file-name-list"
                                                                            >
                                                                                <div className="filename" style={{ width: '90%' }}>
                                                                                    {
                                                                                        <img
                                                                                            src={
                                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                                integrationFile.filename
                                                                                                    .split(".")
                                                                                                    .pop()
                                                                                            }
                                                                                            alt="document"
                                                                                        />
                                                                                    }
                                                                                    <span className="filename-length">
                                                                                        {integrationFile.filename
                                                                                            .split(".")
                                                                                            .slice(0, -1)
                                                                                            .join(".")}
                                                                                    </span>
                                                                                    <span className="extension">
                                                                                        {"." +
                                                                                            integrationFile.filename
                                                                                                .split(".")
                                                                                                .pop()}
                                                                                    </span>
                                                                                </div>
                                                                                <span
                                                                                    className="upload-file-delete"
                                                                                    // onClick={(e) =>
                                                                                    //     selectIntegrationFile(
                                                                                    //         false,
                                                                                    //         integrationFile.id,
                                                                                    //         integrationFile.filename
                                                                                    //     )
                                                                                    // }
                                                                                >
                                                                                    <img
                                                                                        src={CloseBlack}
                                                                                        alt="delete"
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    })}

                                                                    {Object.keys(files).map((eachKey) => {
                                                                        return (
                                                                            <div
                                                                                key={eachKey + files[eachKey].name}
                                                                                className="file-name-list"
                                                                            >
                                                                                <div className="filename" style={{ width: '90%' }}>
                                                                                    {
                                                                                        <img
                                                                                            src={
                                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                                files[eachKey].name
                                                                                                    .split(".")
                                                                                                    .pop()
                                                                                            }
                                                                                            alt="document"
                                                                                        />
                                                                                    }
                                                                                    <span className="filename-length">
                                                                                        {files[eachKey].name
                                                                                            .split(".")
                                                                                            .slice(0, -1)
                                                                                            .join(".")}
                                                                                    </span>
                                                                                    <span className="extension">
                                                                                        {"." +
                                                                                            files[eachKey].name
                                                                                                .split(".")
                                                                                                .pop()}
                                                                                    </span>
                                                                                </div>
                                                                                <span
                                                                                    className="upload-file-delete"
                                                                                    data-file-index={eachKey}
                                                                                    onClick={(e) =>
                                                                                        removeFile(e, eachKey)
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        src={CloseBlack}
                                                                                        alt="delete"
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                                <div
                                                                    className={
                                                                        "file-upload-align new-drag-n-drp-align" +
                                                                        (integrationFiles.length ? " d-none" : "")
                                                                    }
                                                                >
                                                                    <input
                                                                        type="file"
                                                                        name="files"
                                                                        id="files-drag"
                                                                        onChange={(e) => handleChange(e)}
                                                                        multiple
                                                                        hidden
                                                                    />
                                                                    <label
                                                                        className="form-control-file"
                                                                        htmlFor="files-drag"
                                                                    >
                                                                        <span>
                                                                            <img
                                                                                src={LinkPin}
                                                                                alt="link-pin"
                                                                            />
                                                                        </span>{" "}
                                                                        {t("add_more")}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DragandDrop>
                                                </div>
                                            </>
                                        }
                                    </TabPane>
                                    {/* <TabPane tabId={2}>
                                        <GitHubBox onClick={handleShowVersionControlModal} />
                                    </TabPane> */}
                                </TabContent>
                            </div>
                            
                            <div className="col-xs-12">
                                <div className="new-btn-grp">
                                    {editProjectId != null ? (
                                        showUpdateLoader ? (
                                            <React.Fragment>
                                                <button className="convert-pdf-list-UploadProjectButton" type="submit">
                                                    <span className="fileupload-new-btn">
                                                        <SaveButtonLoader />
                                                        {t("updating")}
                                                    </span>
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <button className="convert-pdf-list-UploadProjectButton"
                                                    type="submit"
                                                    onMouseUp={(e) => handleUpdate(e)}
                                                >
                                                    <span className="fileupload-new-btn">{t("update")}</span>
                                                </button>
                                                {editProjectId && (
                                                    <div
                                                        onClick={() => setShowDeleteConfirmationModal(true)}
                                                        className={
                                                            projectType === 3
                                                                ? "edit-delete-btn glossary-btn-wrap"
                                                                : "edit-delete-btn "
                                                        }
                                                    >
                                                        <ButtonBase>
                                                            <div className="edit-delete-btn-cont">
                                                                <div className="delete-icon"></div>
                                                                {t("delete_project")}
                                                            </div>
                                                        </ButtonBase>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )
                                    ) : showCreateLoader ? (
                                        <React.Fragment>
                                            <button className="convert-pdf-list-UploadProjectButton" type="submit">
                                                <span className="fileupload-new-btn">
                                                    <SaveButtonLoader />
                                                    {t("creating")}
                                                </span>
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <button className="convert-pdf-list-UploadProjectButton"
                                                type="submit"
                                                onMouseUp={(e) => handleSubmit(e)}
                                            >
                                                <span className="fileupload-new-btn">
                                                    {t("create")}
                                                    <ArrowForwardIcon
                                                        style={{
                                                            fontSize: 15,
                                                            color: "#FFFFFF",
                                                        }}
                                                    />
                                                </span>
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    </div>
                </div>
                
                {/* <div className="file-upload-instruction">
                    <div className="supp-file-format">
                        <div>
                            <div className="supp-file-format-list">
                                <p>{supportFileExtensions.join(" ")}</p>
                            </div>
                            <span className="imp-icon-img">
                                <img
                                    src={
                                        Config.HOST_URL +
                                        "assets/images/new-ui-icons/imp-icon-file.svg"
                                    }
                                    alt="imp-icon-file"
                                />
                            </span>
                            <span className="supported-file-tooltip">
                                {t(("supported_file_formats"))}
                            </span>
                        </div>
                    </div>
                    <div className="file-upload_instruct-row">
                        <span className="max-word-note">
                            {t("file_upload_condition_note_1")}: <span>50,000</span>
                        </span>
                        <span className="max-file-note">
                            {t("file_upload_condition_note_2")}: <span>100 MB</span>
                        </span>
                    </div>
                </div> */}
            </div>
            {showSrcLangModal && (<Rodal
                visible={showSrcLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-lang-select-modal"
            >
                <div className="lang-modal-wrapper">
                    <span
                        className="modal-close-btn lang-close"
                        onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false) }}
                    >
                        <img
                            src={CloseBlack}
                            alt="close_black"
                        />
                    </span>
                    {showSrcLangModal &&
                        <SourceLanguage
                            sourceLanguage={sourceLanguage}
                            showSrcLangModal={showSrcLangModal}
                            setshowSrcLangModal={setshowSrcLangModal}
                            sourceLanguageOptions={sourceLanguageOptions}
                            handleSourceLangClick={handleSourceLangClick}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                        />}
                </div>
            </Rodal>)}
            {showTarLangModal && (
                <Rodal
                    visible={showTarLangModal}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-tar-lang-select-modal"
                >
                    <div className="lang-modal-wrapper">
                        {/* <h1>Select one or more target language(s)</h1> */}
                        <span
                            className="modal-close-btn lang-close"
                            onClick={(e) => { setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false) }}
                        >
                            <img
                                src={CloseBlack}
                                alt="close_black"
                            />
                        </span>
                        <TargetLanguage
                            targetLanguage={targetLanguage}
                            targetLanguageOptions={targetLanguageOptions}
                            setTargetLanguageOptions={setTargetLanguageOptions}
                            handleTargetLangClick={handleTargetLangClick}
                            showTarLangModal={showTarLangModal}
                            setshowTarLangModal={setshowTarLangModal}
                            alreadySelectedTarLang={alreadySelectedTarLang}
                            alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                            editFilteredTargetLang={editFilteredTargetLang}
                            isEdit={isEdit}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                        />
                    </div>
                </Rodal>
            )}
            {showDeleteConfirmationModal && (<Rodal
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
                                onClick={() => !isProjectDeleting && deleteProject(editProjectId)}
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
            {showTaskDeleteAlert && (<Rodal
                visible={showTaskDeleteAlert}
                {...modaloptions}
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

            {/* change nav to display model */}
            {/* <Prompt
                when={checkchangenav}
                message={handleBlockedNavigation}
            /> */}


            {navigationModalVisible && (<Rodal
                visible={navigationModalVisible}
                {...modaloptions}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setNavigationModalVisible(false) }}><CloseIcon /></span></div>
                        <div>{t("leave_page_confirm_head")}</div>
                        <div>{t("leave_page_confirm_para")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setNavigationModalVisible(false) }}>{t("stay")}</Button>
                            <Button onClick={handleConfirmNavigationClick} variant="contained">{t("leave")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}

            

            {showCreditAlertModal && (
                <Rodal 
                    className="ts-rodal-mask" 
                    visible={showCreditAlertModal} 
                    closeMaskOnClick={false}
                    width={528}
                    height="auto"
                    onClose={() => console.log()} 
                    showCloseButton={false}
                >
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="credits-text-cont">
                        <React.Fragment>
                            <img src={InsuffientIcon} alt="insuffient-icon" />
                            <div className="insuffient-txt-align">
                                <span>
                                    <img src={RemoveCircleRed} alt="remove_circle" />
                                </span>
                                <p>{t("insufficient_credits")}</p>
                            </div>
                            <p className="insuffient-desc">{t("insufficient_credits_note")}</p>
                            {!Config.userState?.is_internal_member && (
                                <div className="mt-3">
                                    <ButtonBase>
                                        <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                            {t("buy_credits")}
                                        </a>
                                    </ButtonBase>
                                </div>
                            )}
                        </React.Fragment>
                    </div>
                </Rodal>
            )}

            {showFileErrorModal && (
                <Rodal 
                    className="ts-rodal-mask" 
                    visible={showFileErrorModal} 
                    closeMaskOnClick={false}
                    width={528}
                    height="auto"
                    onClose={() => console.log()} 
                    showCloseButton={false}
                >
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowFileErrorModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="credits-text-cont">
                        <React.Fragment>
                            <img src={FileErrorIcon} alt="insuffient-icon" />
                            <div className="insuffient-txt-align">
                                <span>
                                    <img src={RemoveCircleRed} alt="remove_circle" />
                                </span>
                                <p>{t("file_error")}</p>
                            </div>
                            <p className="insuffient-desc text-center">{t("file_err_note")}</p>
                            <div className="mt-3">
                                <p className="insuffient-desc" style={{fontSize: '12px'}} dangerouslySetInnerHTML={{__html: t("translate_edit_foot_note")}}></p>
                            </div>
                        </React.Fragment>
                    </div>
                </Rodal>
            )}

        </React.Fragment>
    )
}

export default CreateWordchoice;