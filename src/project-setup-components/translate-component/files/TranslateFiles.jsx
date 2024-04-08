/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createRef, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Config from "../../../vendor/Config";
import Skeleton from '@mui/material/Skeleton';
// import Navbar from "../../../vendor/Navbar";
import GitHubBox from "../../../vendor/github-integration/GithubBox";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Select, { components } from "react-select";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
// import TourTooltip from "../../../tour/TourTooltip";
import DragandDrop from "../../../vendor/DragandDrop";
import Sourcelanguage from "../../../vendor/lang-modal/Sourcelanguage";
import Targetlanguage from "../../../vendor/lang-modal/Targetlanguage";
import AdvancedProjectType from "../../../vendor/project-type-selection/AdvancedProjectType";
import Breadcrumbs from "../../Breadcrumbs";
import ButtonBase from '@mui/material/ButtonBase';
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SaveButtonLoader } from "../../../loader/CommonSaveBtnLoader";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { ButtonLoader } from "../../../loader/CommonBtnLoader";
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import ProgressAnimateButton from "../../../vendor/button-loader/ProgressAnimateButton";
import { AnalysisLoader } from "../../../loader/AnalysisLoader";
import ArrowRightAltColor from "../../../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import InsuffientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg"
import FileError from "../../../assets/images/new-ui-icons/file-error.png"
import ImpFileIcon from "../../../assets/images/new-ui-icons/imp-icon-file.svg"
import GroupsColor from "../../../assets/images/new-ui-icons/groups_color.svg"
import ArrowRightGreyColor from "../../../assets/images/new-create-hub/arrow_right_grey_color.svg"
import UploadFolder from "../../../assets/images/new-ui-icons/upload-folder.svg"
import LinkPin from "../../../assets/images/new-ui-icons/link-pin.svg"
import sanitizeHtml from 'sanitize-html-react';
import ReactRouterPrompt from 'react-router-prompt'

function TranslateFiles(props) {
    const {
        setSidebarActiveTab
    } = props
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.

    /* State constants - start */
    const params = useParams();
    const history = useNavigate();
    const location = useLocation();

    const { t } = useTranslation();

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
    const [projectType, setProjectType] = useState(null);
    const [mtpeEngines, setMtpeEngines] = useState([]);
    const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
    const [selectedMTEngine, setSelectedMTEngine] = useState({});
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [subjectField, setSubjectField] = useState([]);
    const [contentType, setContentType] = useState([]);
    const [deadline, setDeadline] = useState("");
    const [mtEnable, setMtEnable] = useState(true);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);
    // const [preTranslate, setPreTranslate] = useState(false)
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
    const [supportFileExtensions, setSupportFileExtensions] = useState([]);
    const [supportedTMXFileExtensions, setSupportedTMXFileExtensions] = useState([
        ".tmx",
    ]);
    const [supportedTBXFileExtensions, setSupportedTBXFileExtensions] = useState([
        ".tbx",
    ]);
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
    const [machineLangTranslationChange, setmachineLangTranslationChange] =
        useState(null);
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
    const [preTranslate, setPreTranslate] = useState(false)
    const [translationByPage, setTranslationByPage] = useState(true)
    // steps related states
    const [steps, setSteps] = useState([])
    const [stepOptions, setStepOptions] = useState([])
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [stepsFromApi, setstepsFromApi] = useState([])

    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] =
        useState("");
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
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] =
        useState(null);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState(
        []
    );
    const [isEdit, setIsEdit] = useState(false);
    const [commonTarValue, setCommonTarValue] = useState(null);
    const [commonSrcValue, setCommonSrcValue] = useState(null);
    const [commonMtpeEngine, setCommonMtpeEngine] = useState(null);
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [revisionStepEdit, setRevisionStepEdit] = useState(null)
    const [selectedMTFromAPI, setSelectedMTFromAPI] = useState({})
    const [pdfIdFromToolkit, setPdfIdFromToolkit] = useState(null)
    const [recentlyUsedLangs, setRecentlyUsedLangs] = useState([])

    const [showmodelwarning, setShowmodelwarning] = useState(false)
    const [lastLocation, setLastLocation] = useState(null)
    const [confirmedNavigation, setConfirmedNavigation] = useState(false)
    const { pathname } = useLocation()
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("")

    const [hasTeam, setHasTeam] = useState(null)
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false)
    const [isProjectDeleting, setIsProjectDeleting] = useState(false)

    const [showDocumentOpeingModal, setshowDocumentOpeingModal] = useState(false)
    const [showTranslateAndDownloadBtn, setShowTranslateAndDownloadBtn] = useState(false)
    const [projectTaskList, setProjectTaskList] = useState([])
    const [translateDownloadBtnLoader, setTranslateDownloadBtnLoader] = useState(false)
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [checkchangenav, setCheckchangenav] = useState(false)
    const [axiosFileTranslateAbortController, setAxiosFileTranslateAbortController] = useState(null);
    const [isDownloading, setIsDownloading] = useState(null);
    const [showFileErrorModal, setShowFileErrorModal] = useState(false);

    const searchAreaRef = useRef(null);
    const mtEngineOptionRef = useRef(null)

    /* State constants - end */

    /* Ref constants - start */
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
    // const allowedFileLength = useRef(10)
    // const fileLengthErrMsg = useRef(`Only ${allowedFileLength.current} files are allowed in a project`)
    // const allowedTargetLanguageLength = useRef(20)
    // const allowedFileSize = useRef(100) //In MB
    // const fileSizeErrMsg = useRef(`Exceeds the file(s) size limit of ${allowedFileSize.current} MB`)
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
    const prevPageInfo = useRef(null)
    const sourceLangRef = useRef(null)
    const projectDataFromApi = useRef(null)
    const translateDownloadCeleryTaskListRef = useRef([])
    const createdProjectIdRef = useRef(null)
    const projectTaskListRef = useRef(null)
    const inputFileUploadRef = useRef(null)
    const fileTranslatingTaskListRef = useRef([])
    /* Ref constants - end */

    const open = Boolean(anchorEl); //Assigned task open

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

    useEffect(() => {
        setDidMount(true); //Component mounted
        getSourceLanguages();
        getSubjectFields();
        getContentTypes();
        getSupportFileExtensions();
        getCreditStatus();
        getMtEngines();
        getAllLangDetailsList();
        getSteps();
        getTeamsOptions();

        // runs when the component is unmounted
        return () => {
            var id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
        };
    }, []);

    useEffect(() => {
        if (targetLanguageOptionsRef.current !== null) {
            if (location.search === '') {
                recentlyUsedLanguage()
            }
        }
    }, [targetLanguageOptionsRef.current, location.search])



    useEffect(() => {
        if (files.length > 0) {
            setCheckchangenav(true)
            setConfirmedNavigation(false)
            checkForOfficeFiles(files)
        }
        else {
            setCheckchangenav(false)
        }
    }, [files])



    useEffect(() => {
        if (
            URL_SEARCH_PARAMS.get("get-project-info") &&
            URL_SEARCH_PARAMS.get("type") &&
            targetLanguageOptionsRef.current?.length !== 0 &&
            mtEngineOptionRef.current !== null
        ) {
            let projectId = URL_SEARCH_PARAMS.get("get-project-info");
            let projectType = URL_SEARCH_PARAMS.get("type");
            editProject(projectId, projectType);
            // console.log('from param');
            // console.log(targetLanguageOptionsRef.current);
            // console.log(mtEngineOptionRef.current);
        }
    }, [targetLanguageOptionsRef.current, mtEngineOptionRef.current, URL_SEARCH_PARAMS.get("get-project-info")]);

    useEffect(() => {
        let pdfId = URL_SEARCH_PARAMS.get("pdf")
        if (pdfId && location.state?.filename) {
            setPdfIdFromToolkit(parseInt(pdfId))
            // console.log(didMount);
            let arr = []
            arr.push({
                id: parseInt(pdfId),
                can_delete: true,
                filename: location.state?.filename,
            })
            setEditFiles(arr)
        }
    }, [URL_SEARCH_PARAMS.get("pdf"), location.state])

    useEffect(() => {
        let docId = URL_SEARCH_PARAMS.get("doc")
        if (docId && location.state?.docxFile) {
            let arr = []
            arr.push(location.state?.docxFile)
            setFiles(arr)
        }
    }, [URL_SEARCH_PARAMS.get("doc"), location.state])


    useEffect(() => {
        if (URL_SEARCH_PARAMS.get("get-project-info")) {
            setLoading(true);
        }
    }, [URL_SEARCH_PARAMS.get("get-project-info")])

    useEffect(() => {
        if (location.state?.prevPageInfo) {
            prevPageInfo.current = location.state?.prevPageInfo
        }
    }, [location.state])


    useEffect(() => {
        let translateFilesDiv = document.querySelector('.translate-task-list')
        if(translateFilesDiv){
            translateFilesDiv.scrollIntoView({ behavior: "smooth"})
        }
    }, [document.querySelector('.translate-task-list')])
    

    /* Show / Hide the Github, Gitlab file upload */
    const handleShowVersionControlModal = (image, platform) => {
        setShowVersionControlModal(true);
        setModalImage(image);
        setIntegrationPlatform(platform);
    };

    /* Get current user's purchased credits data */
    const getCreditStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/dashboard_credit_status`,
            auth: true,
            success: (response) => {
                setCreditsAvailable(
                    response?.data?.credits_left?.addon +
                    response?.data?.credits_left?.subscription
                );
                setAddonCredit(response?.data?.credits_left?.addon);
                setSubscriptionCredit(response?.data?.credits_left?.subscription);
            },
        });
    };

    /* Get machine translation engine from system values */
    const getMtEngines = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/mt_engines/`,
            auth: true,
            success: (response) => {
                mtEngineOptionRef.current = response?.data
                setMtpeEngines(response?.data);
            },
        });
    };

    const getSteps = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/steps/`,
            auth: true,
            success: (response) => {
                setSteps(response.data);
            },
        });
    }

    // set steps as stepOptions for react-select
    useEffect(() => {
        let stepList = []
        steps?.map(each => {
            if (each.id === 1) {
                stepList.push({
                    value: each.id,
                    label: each.name,
                    disabled: true
                })
            } else {
                stepList.push({
                    value: each.id,
                    label: each.name,
                })
            }
            stepOptionsRef.current = stepList
            setStepOptions(stepList)
        })
    }, [steps])

    // by default post editing is selected and it can't be removed [mandatory step]
    useEffect(() => {
        setSelectedSteps(stepOptionsRef.current?.filter(each => each.value === 1))
    }, [stepOptions])


    // handler for steps selection
    const handleSelectedSteps = (selected) => {
        setSelectedSteps(selected);
    };



    useEffect(() => {

        let sourceFilter = allLangDetailsList?.filter(each => each?.language == sourceLanguage)

        let srcTranslateFilterRes = sourceFilter?.filter((each) => each?.translate === true);

        let sortedSrcMtpe = srcTranslateFilterRes?.map((each) => {
            return each?.mtpe_engines;
        });

        // console.log(sortedSrcMtpe)

        setCommonSrcValue(sortedSrcMtpe);

        // remove the source language from the target language list
        setTargetLanguageOptions(targetLanguageOptions?.filter(each => each.id !== sourceLanguage))
        if (targetLanguage !== '') {
            setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage))
        }

        //   console.log(allLangDetailsList.find(function(each){each.language === sourceLanguage})
    }, [sourceLanguage]);

    useEffect(() => {
        // console.log(targetLanguage)
        let targetArr = [];
        for (let i = 0; i < targetLanguage?.length; i++) {
            // console.log(targetLanguage[i].id)
            targetArr?.push(
                allLangDetailsList?.filter(
                    (each2) => each2?.language === targetLanguage[i]?.id
                )
            );
        }
        const tarTranslateFilter = targetArr?.map((each) => {
            return each?.filter((eachTargetArr) => eachTargetArr?.translate === true);
        });

        // console.log(tarTranslateFilter)
        let sortedTarMtpe = tarTranslateFilter?.map((each) => {
            return each?.map((each2) => {
                return each2?.mtpe_engines;
            });
        });
        let commonTarMtpeEngine = sortedTarMtpe?.shift()?.filter(function (v) {
            return sortedTarMtpe?.every(function (a) {
                return a?.indexOf(v) !== -1;
            });
        });
        // console.log(commonTarMtpeEngine)
        setCommonTarValue(commonTarMtpeEngine);
    }, [targetLanguage]);

    useEffect(() => {

        // console.log(commonSrcValue)
        const common = commonSrcValue?.filter((value) =>
            commonTarValue?.includes(value)
        );
        // console.log(common)
        setCommonMtpeEngine(common);
    }, [commonSrcValue, commonTarValue]);

    useEffect(() => {
        let engines = [];
        const engine = mtpeEngines?.filter((value) =>
            commonMtpeEngine?.includes(value?.id)
        );
        engine?.map((eachEngine) =>
            engines?.push({
                value: eachEngine?.id,
                label: eachEngine?.name?.replaceAll("_", " "),
            })
        );
        setMtpeEngineOptions(engines);
    }, [commonMtpeEngine]);

    // by default google mt is selected
    useEffect(() => {
        if (!projectEditable.current) {
            setSelectedMTEngine(
                mtpeEngineOptions?.find((each) => each?.value === 1)
            );
        }
    }, [mtpeEngineOptions]);

    useEffect(() => {
        if (projectEditable.current && commonMtpeEngine) {
            let engines = [];
            const engine = mtEngineOptionRef.current?.filter((value) =>
                commonMtpeEngine?.includes(value?.id)
            );
            engine?.map((eachEngine) =>
                engines?.push({
                    value: eachEngine?.id,
                    label: eachEngine?.name?.replaceAll("_", " "),
                })
            );

            if (engines?.filter((each) => each.value === selectedMTEngine?.value)?.length ? false : true) {
                setSelectedMTEngine(mtpeEngineOptions?.find((each) => each?.value === 1))
                // console.log(mtpeEngineOptions?.find((each) => each?.value === 1));
                // console.log('inside if');
            } else if (engines?.length > 1) {
                // console.log('inside else');
                setTimeout(() => {
                    setSelectedMTEngine(selectedMTFromAPI)
                }, 100);
            }
        }
    }, [targetLanguage, commonMtpeEngine])


    /* Handling the team checkbox selection */
    const handleTeamChange = (TeamSelect) => {
        setTeamSelectError("");
        setTeamSelect(TeamSelect);
    };

    const showSettingsModal = () => setshowSettings(true);

    const hideSettingsModal = () => setshowSettings(false);

    const hideAssignManageModal = () => setShowAssignManageModal(false);

    const hideVersionControlModal = () => setShowVersionControlModal(false);

    /* 
          - Get the analysis data if it's not counted already
      */
    const showWordCountModal = (
        e = null,
        projectId = 0,
        isProjectAnalyzed = true
    ) => {
        if (projectId && !isProjectAnalyzed) {
            setShowWordCountLoader(true);
            Config.axios({
                url: `${Config.BASE_URL}/workspace/project_analysis/${projectId}`,
                auth: true,
                success: (response) => {
                    let projectAnalysis = response.data;
                    setCreatedProjects((prevState) =>
                        prevState.map((element) =>
                            element.id == projectId
                                ? {
                                    ...element,
                                    project_analysis: projectAnalysis,
                                    is_proj_analysed: true,
                                }
                                : element
                        )
                    );
                    setProjectWordCount(projectAnalysis.proj_word_count);
                    setProjectCharCount(projectAnalysis.proj_char_count);
                    setProjectSegmentCount(projectAnalysis.proj_seg_count);
                    setShowWordCountLoader(false);
                },
            });
        }
        setshowWordCount(true);
    };

    const hideWordCountModal = () => setshowWordCount(false);

    useEffect(() => {
        if (didMount) {
            if (activeTab !== 2) {
                //Whenever goes to other tabs except Project setup the form should be reset
                resetForm();
                setEditFiles([]);
                setEditJobs([]);
                setSourceLanguageDisable(false);
            } else if (activeTab !== 3) {
                setAssignedTaskId(null);
                setAssignProjectId(null);
            }
            window.scrollTo(0, 0);
        }
    }, [activeTab]);

    /* Set tab change if clicked only other tabs */
    const activeToggle = (tab) => {
        if (activeTab != tab) {
            setActiveTab(tab);
            setProjectType(null);
        }
        projectEditable.current = false;
    };

    /* Select project type if clicked during project creation */
    const selectProjectType = (type = 1) => {
        if (projectType != type) setProjectType(type);
    };

    /* File upload tab change handle */
    const fileUploadTabToggle = (tab) => {
        if (fileUploadTabActive != tab) setFileUploadTabActive(tab);
    };

    /* Get source language options */
    const getSourceLanguages = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setSourceLanguageOptions(response.data);
                setTargetLanguageOptions(response.data);
            },
        };
        Config.axios(params);
    };

    /* Get subject fields options */
    const getSubjectFields = () => {
        let params = {
            url: Config.BASE_URL + "/app/subjectfield/",
            auth: true,
            success: (response) => {
                subjectFieldOptionsRef.current = response.data;
                setSubjectFieldOptions(response.data);
            },
        };
        Config.axios(params);
    };

    // Get all languages stt, tts, translation, mt-engine list
    const getAllLangDetailsList = () => {
        let params = {
            url: Config.BASE_URL + "/app/mt-language-support/",
            auth: true,
            success: (response) => {
                // console.log(response.data)
                setAllLangDetailsList(response.data);
            },
        };
        Config.axios(params);
    };

    /* Get content-type options */
    const getContentTypes = () => {
        let params = {
            url: Config.BASE_URL + "/app/contenttype/",
            auth: true,
            success: (response) => {
                contentTypeOptionsRef.current = response.data;
                setContentTypeOptions(response.data);
            },
        };
        Config.axios(params);
    };

    /* Get support file types labels */
    const getSupportFileExtensions = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/file_extensions/",
            auth: true,
            success: (response) => {
                setSupportFileExtensions(response.data);
            },
        });
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

    /* const filesSizeExceed = () => {
          let allFilesSize = 0
          Object.keys(files).map(eachKey => {
              allFilesSize += parseInt(files[eachKey].size)
          })
          allFilesSize = allFilesSize/1024/1024 //Convert to MB
          if (allFilesSize <= allowedFileSize.current)
              return false
          return true
      } */

    /* Switch to file upload view */
    const switchFileUpload = (e, value) => {
        setShowFileUpload(value);
    };

    /* Show errors when not uploadig files */
    useEffect(() => {
        if (didMount) {
            if (files.length === 0 && fileUrl === "" && editFiles.length === 0)
                setFileError(t("upload_files"));
            else setFileError("");
        }
    }, [files]);

    /* Handling all the project creation form */
    const handleChange = (e) => {
        // e.target.files[0].name.length
        // console.log(e.target.files);
        for (let i = 0; i < (e.target.files).length; i++) {
            if ((e.target.files[i]?.name).length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;
                // let fileList = JSON.parse(JSON.stringify(files))
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
                        // Config.toast(fileLengthErrMsg.current, 'error')
                    }
                });
                setFiles(fileList);
                // setFiles(prevState => [...prevState, e.target.files])
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

    const handleProjectNamechange = (e) => {
        if (e.target.innerText == "") setProjectNameError(t("enter_proj_name"));
        else setProjectNameError("");
        // console.log(e.target.innerText)
        setProjectName(e.target.innerText);
    };

    /* Selected source language should not display on the target language options */
    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(
            targetLanguageOptionsRef.current.filter(
                (element) => element.id !== sourceLanguage
            )
        );
    };

    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);

    useEffect(() => {
        alreadySelecetedTarLangID.length !== 0 &&
            removeAlreadySelectedTargetlanguage();
    }, [alreadySelecetedTarLangID]);

    function getDifference() {
        return targetLanguageOptionsRef.current.filter((object1) => {
            return !alreadySelecetedTarLangID.some((object2) => {
                return object1.id === object2;
            });
        });
    }

    const removeAlreadySelectedTargetlanguage = () => {
        setEditFilteredTargetLang(getDifference());
    };

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
        setSearchInput('')
        setOnFocusWrap(false)
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected")
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
        setSearchInput('')
        setOnFocusWrap(false)
    };


    /* Handling subject field selection */
    const handleSubjectFieldClick = (value, e) => {
        let subjectFieldTemp = subjectField;
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected");
            subjectFieldTemp = Config.removeItemFromArray(subjectFieldTemp, value);

            if (editProjectId != null) {
                let thisSubject = editSubjects.find(
                    (element) => element.subject == value?.id
                );
                if (thisSubject?.id != null)
                    deletedSubjectIds.current.push(thisSubject?.id);
            }
        } else {
            e.target.classList.add("selected");
            subjectFieldTemp.push(value);
        }
        setSubjectField([...new Set(subjectFieldTemp)]);
    };

    /* Handling content type selection */
    const handleContentTypeClick = (value, e) => {
        let contentTypeTemp = contentType;
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected");
            contentTypeTemp = Config.removeItemFromArray(contentTypeTemp, value);
            if (editProjectId != null) {
                let thisContent = editContents.find(
                    (element) => element.content_type == value?.id
                );
                if (thisContent?.id != null)
                    deletedContentIds.current.push(thisContent?.id);
            }
        } else {
            e.target.classList.add("selected");
            contentTypeTemp.push(value);
        }
        setContentType([...new Set(contentTypeTemp)]);
    };

    useEffect(() => {
        removeSelectedSourceFromTarget();
    }, [sourceLanguage]);

    /* Throw errors when there's no target language selected */
    useEffect(() => {
        if (didMount) {
            if (targetLanguage?.length > 0) setTargetLanguageError("");
            else setTargetLanguageError(t("target_validation_note"));
        }
    }, [targetLanguage]);


    useEffect(() => {
        if (targetLanguage) {
            let list = ""
            targetLanguage?.map((each, index) => {
                list += `${each?.language}${index !== targetLanguage?.length - 1 ? ", " : ""
                    }`;
            });
            setTargetLanguageListTooltip(list)
        }
    }, [targetLanguage, targetLanguageOptionsRef.current])


    /* Adding new project */
    const handleSubmit = (e, action) => {

        // console.log(projectName);
        //Also check the handleUpdate
        e.preventDefault();
        let formData = new FormData();
        /* Validation - start */
        if (sourceLanguage == "" && targetLanguage.length < 1 && ((files.length == 0 && pdfIdFromToolkit == null) && fileUrl == "") && params?.menu === "files") {
            // console.log('first if');  
            setSourceTargetValidation({
                source: true,
                target: true,
            });
            setFileError(t("required"));
            setProjectNameError(t("enter_proj_name"));
            contentprojectNameRef.current.scrollIntoView()
            contentprojectNameRef.current.focus();
            setHasFocus(true);
            return;
        }

        if (
            files.length == 0 &&
            fileUrl == "" &&
            pdfIdFromToolkit == null
        ) {
            setFileError(t("upload_files"));
            return;
        }

        if (files?.length === 0 && editFiles?.length === 0) {
            setFileError(t("upload_files"));
            return;
        }


        if (fileError != "") setFileError("");

        for (let x = 0; x < files.length; x++) {
            if (typeof files[x] != "undefined") formData.append("files", files[x]);
        }

        if (pdfIdFromToolkit !== null) {
            formData.append("pdf_obj_id", pdfIdFromToolkit)
        }

        if (sourceLanguage == "") {
            setSourceTargetValidation({
                ...sourceTargetValidation,
                source: true,
            });
            return;
        }
        if (sourceLanguageError != "") setSourceTargetValidation({
            ...sourceTargetValidation,
            source: false,
        });
        if (targetLanguage == null || targetLanguage?.length == 0) {
            setSourceTargetValidation({
                ...sourceTargetValidation,
                target: true,
            });
            return;
        }

        if (targetLanguage?.length > 0) setSourceTargetValidation({
            ...sourceTargetValidation,
            target: false,
        });
        if (fileUrl != "") {
            var regExp =
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = fileUrl.match(regExp);
            if (match && match[2].length == 11) setFileUrlError("");
            else {
                setFileUrlError(t("enter_valid_youtube_url"));
                return;
            }
        }
        /* Validation - end */

        // formData.append("project_type", 2);
        formData.append(
            "mt_engine",
            selectedMTEngine?.value ? selectedMTEngine?.value : 1
        );
        formData.append("source_language", sourceLanguage);

        targetLanguage.map((eachTargetLanguage) => {
            formData.append("target_languages", eachTargetLanguage?.id);
        });

        subjectField?.length > 0 &&
            subjectField?.map((eachSubjectField) => {
                formData.append("subjects", eachSubjectField?.id);
            });
        contentType?.length > 0 &&
            contentType?.map((eachContentType) => {
                formData.append("contents", eachContentType?.id);
            });

        let deadlineUTC = Config.convertLocalToUTC(deadline);
        deadline && formData.append("project_deadline", deadlineUTC);
        formData.append("mt_enable", mtEnable);

        formData.append("pre_translate", preTranslate);
        if(mtEnable) formData.append("get_mt_by_page", translationByPage);

        selectedSteps?.map(eachStep => {
            formData.append("steps", eachStep?.value);
        })

        if (projectName !== null && projectName?.trim() !== "") {
            formData.append("project_name", projectName);
        }

        if(action === 'trans-download') formData.append("file_translate", true); 

        if (fileUrl != "") formData.append("url", fileUrl);
        let url = "";
        if (integrationFiles.length) {
            if (!integrationFiles[0].branchId) {
                // For version control files upload the branch has to be selected
                Config.toast(t("branch_not_selected"), "error");
                return;
            }
            url =
                Config.BASE_URL +
                "/integerations/" +
                integrationPlatform +
                "/repository/branch/contentfile/" +
                integrationFiles[0].branchId;
            integrationFiles.forEach((value) => {
                formData.append("localizable_ids", value.id);
            });
        } else if (fileUrl == "")
            url = Config.BASE_URL + "/workspace/project/quick/setup/";
        else url = Config.BASE_URL + "/srt/fileUpload";

        // button loaders
        if(action === 'trans-download') setTranslateDownloadBtnLoader(true)
        else setShowCreateLoader(true);
        
        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type":
                    "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: url,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                createdProjectIdRef.current = response.data.id

                if(action === 'trans-download'){
                    setProjectName(response.data.project_name);
                    contentprojectNameRef.current.innerText = response.data.project_name;
                    getProjectTaskData(response.data.id, action)
                    return;
                }

                // if(response.data.tasks_count === 1 && !preTranslate){
                    
                //     // first get project analysis status
                //     if(response.data?.project_analysis?.hasOwnProperty('celery_id')){
                //         getProjectAnalysisStatus(response.data.id)
                //         setshowDocumentOpeingModal(true)
                //     }else{
                //         getProjectTaskData(response.data.id)
                //     }
                    
                // }else{
                // }
                Config.toast("Project created successfully");
                // console.log('redirect')
                history(`/translations?page=1&open-project=${response.data.id}`)

            },
            error: (err) => {
                if (err?.response?.data?.files) {
                    Config.toast(t("submitted_file_empty"), 'warning')
                }
                setShowCreateLoader(false);
                setTranslateDownloadBtnLoader(false)
            }
        });
    };


    const getProjectAnalysisStatus = (proj_id) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/word_char/count?project_id=${proj_id}`,
            auth: true,
            success: (analysisResponse) => {
                // console.log(analysisResponse.data?.out[0]?.hasOwnProperty('celery_id'))
                if(analysisResponse.data?.out[0]?.hasOwnProperty('celery_id')){
                    setTimeout(() => {
                        getProjectAnalysisStatus(proj_id)
                    }, 4000);
                }else{
                    getProjectTaskData(proj_id)
                }
            },
            error: (err) => {}
        });
    } 

    const getProjectTaskData = (proj_id, action) => {
        // vendor dashboard
        Config.axios({
            url: `${Config.BASE_URL}/workspace/vendor/dashboard/${proj_id}`,
            auth: true,
            success: (dashboardResponse) => {
                if(action === 'trans-download'){
                    setTranslateDownloadBtnLoader(false);
                    // add isProcessing:falsez key to all the task by default
                    let newArr = dashboardResponse.data?.map(obj => {
                        return {
                            ...obj,
                            isProcessing: true
                        }
                    })
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)

                    getProjectTransDownloadStatus()
                    return;
                }
                // open file/document
                openDocumentFile(dashboardResponse.data[0].document_url, proj_id)
            },
            error: (err) => { }
        });
    } 

    const openDocumentFile = (url, proj_id) => {
        Config.axios({
            url: Config.BASE_URL + url,
            auth: true,
            success: (docOpenResponse) => {
                if (docOpenResponse?.data?.msg === undefined) {
                    history(`/workspace/${docOpenResponse.data?.document_id}?page=1`);
                }
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('Empty')) {    // this error comes when the pre-translate is enabled in create flow
                    Config.toast('Oops ! The file is empty', 'error');
                }
                if(err?.response?.status === 400){
                    if(err?.response?.data?.msg?.toLowerCase()?.includes('analysis')){
                        // console.log(err?.response?.data)
                        history(`/translations?page=1&open-project=${proj_id}`)
                        // setTimeout(() => {
                        //     openDocumentFile(url, proj_id)
                        // }, 4000);
                    }
                }
            },
        });
    }


    /* Reset the project creation form */
    const resetForm = () => {
        contentprojectNameRef.current.innerText = ''
        setEditProjectId(null);
        setProjectName("");
        setTeamSelect("");
        setSourceLanguage('');
        setSourceLanguageDisable(false)
        setTargetLanguageListTooltip('')
        setSourceLabel("");
        setTargetLanguage("");
        setAlreadySelecetedTarLangID([])
        setSubjectField([]);
        // setIsOpen(false)
        setContentType([]);
        setDeadline(null);
        setMtEnable(true);
        setPreTranslate(false);
        setFiles([]);
        setProjectTaskList([])
        setSourceTargetValidation({
            source: false,
            target: false,
        })
        inputFileUploadRef.current.value = ''
        projectTaskListRef.current = null
        setTimeout(() => {
            setSourceLanguageError("");
            setTargetLanguageError("");
            setFileError("");
        }, 100);
    };

    const ValueContainer = ({ children, ...props }) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer {...props}>
                    {!!children && (
                        <span
                            style={{ position: "absolute", left: 0 }}
                            className="team-placeholder-icon-box"
                        >
                            <span></span>
                        </span>
                    )}
                    {children}
                </components.ValueContainer>
            )
        );
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected || state.isDisabled ? "#ededed" : "#ffffff",
            opacity: state.isDisabled ? 0.5 : 1,
            cursor: state.isDisabled ? "context-menu" : "pointer",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: state.isDisabled ? "context-menu" : "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #DBDBDB" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px 11px 0px 13px",
            height: 46,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const customTeamSelectStyles = {
        valueContainer: (base) => ({
            ...base,
            padding: "0 0 0 24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "12px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected
                ? "#ffffff"
                : state.isDisabled
                    ? "#cccccc"
                    : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            padding: "11px 8px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: "0px solid #CED4DA",
            padding: "0",
            transtion: 0.3,
            fontSize: 13,
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused ? "0px solid #0078D4" : "0px solid #CED4DA",
            height: state.isFocused ? 36 : 36,
            "&:hover": {
                cursor: "pointer",
                color: "#0078D4",
            },
        }),
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            color: state.isSelected
                ? "#ffffff"
                : state.isDisabled
                    ? "#cccccc"
                    : "#7E7E7E",
            //   background: state.isSelected ? '#0078D4' : '#E8F0FE',
            padding: 5,
            fontSize: 14,
            "&:hover": {
                background: "#E8F0FE",
                color: "#0078D4",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: "1px solid #CED4DA",
            borderRadius: state.isSelected ? 3 : 3,
            padding: "0px 11px 0px 13px",
            transtion: 0.3,
            fontSize: 14,
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused ? "2px solid #0078D4" : "1px solid #CED4DA",
            height: state.isFocused ? 46 : 46,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const customTargetStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            //   color: state.isSelected ? '#ffffff' : '#7E7E7E',
            //   background: state.isSelected ? '#0078D4' : '#ffffff',
            padding: 5,
            fontSize: 13,
            "&:hover": {
                background: "#E8F0FE",
                color: "#0078D4",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            // width: '65%',
            // maxWidth: '100%',
            border: "1px solid #CED4DA",
            borderRadius: state.isSelected ? 3 : 3,
            transtion: 0.3,
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused ? "2px solid #0078D4" : "1px solid #CED4DA",
            minHeight: state.isFocused ? 36 : "auto",
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    // const Tooltip = withStyles({
    //   tooltip: {
    //     color: "#ffffff !important",
    //     backgroundColor: "#2A2A2A !important",
    //     padding: "7px 12px !important",
    //     fontFamily: "Roboto !important",
    //     fontSize: "12px !important",
    //     lineHeight: 1.4,
    //     fontWeight: "400 !important",
    //     width: "auto !important",
    //     maxWidth: "100%",
    //   },
    //   arrow: {
    //     color: "#2A2A2A",
    //   },
    // })(Tooltip);

    // const AddProjectButton = withStyles((theme) => ({
    //   root: {
    //     backgroundColor: "#0078D4",
    //     borderRadius: "3px",
    //     boxShadow: "none",
    //     textTransform: "none",
    //     padding: "6px 12px",
    //     "&:hover": {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //     },
    //   },
    // }))(Button);

    // const AddNewProjectButton = withStyles((theme) => ({
    //   root: {
    //     backgroundColor: "#0078D4",
    //     borderRadius: "3px",
    //     boxShadow: "none",
    //     textTransform: "none",
    //     padding: "10px 30px",
    //     "&:hover": {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //     },
    //   },
    // }))(Button);

    // const UploadProjectButton = withStyles((theme) => ({
    //   root: {
    //     backgroundColor: "#0078D4",
    //     boxShadow: "none",
    //     borderRadius: "3px",
    //     textTransform: "none",
    //     padding: "12.5px 21px",
    //     "&:hover": {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //     },
    //   },
    // }))(Button);

    // const OpenProjectButton = withStyles((theme) => ({
    //   root: {
    //     backgroundColor: "#0078D4",
    //     boxShadow: "none",
    //     borderRadius: "3px",
    //     textTransform: "none",
    //     padding: "7px 26.625px",
    //     "&:hover": {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //     },
    //   },
    // }))(Button);

    // const OpeningProjectButton = withStyles((theme) => ({
    //   root: {
    //     backgroundColor: "#0078D4",
    //     boxShadow: "none",
    //     borderRadius: "3px",
    //     textTransform: "none",
    //     padding: "7px 13.5px",
    //     "&:hover": {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //     },
    //   },
    // }))(Button);

    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        //Also check handleChange
        for (let i = 0; i < (filesTemp).length; i++) {
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if (!request && isSupportedFile(filesTemp[eachKey])) {
                // if (editFiles.length + fileList.length < allowedFileLength.current)
                if (
                    filesTemp[eachKey].size / 1024 / 1024 <=
                    allowedSingleFileSize.current
                )
                    fileList.push(filesTemp[eachKey]);
                else Config.toast(singleFileSizeError.current, "error");
                // else
                // Config.toast(fileLengthErrMsg.current, 'error')
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
        // setFiles(prevState => [...prevState, fileList])
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
        inputFileUploadRef.current.value = ''
    };

    /* Remove all the droped files */
    const removeAllFiles = () => {
        setFiles([]);
    };

    /* Add file url */
    const addUrl = () => {
        let fileUrl = document.getElementById("file-url").value;
        setFileUrl(fileUrl);
    };

    /* Remove the file url */
    const removeUrl = () => {
        setFileUrl("");
    };

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };

    const assignmanagemodaloption = {
        closeMaskOnClick: false,
        width: 560,
        onClose: hideAssignManageModal,
    };

    const versioncontrolmodaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideVersionControlModal,
    };


    /* Get all the details of a project by id and load into the form */
    const editProject = (projectId, projectType, e = null) => {
        setEditProjectId(projectId);
        setProjectType(projectType);
        setActiveTab(2);
        projectEditable.current = true;
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let {
                    data,
                    data: { glossary },
                } = response;
                let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                    (element) => element.id == data.jobs[0].source_language
                );
                deletedJobIds.current = [];
                deletedEditFileIds.current = [];
                setFiles([]);
                if (pdfIdFromToolkit !== null && pdfIdFromToolkit !== undefined) {
                    data.files?.push({
                        id: parseInt(pdfIdFromToolkit),
                        can_delete: true,
                        filename: location.state?.filename,
                    })
                }
                projectDataFromApi.current = response.data
                setEditFiles(data.files);
                setGlossaryEditFiles(data.glossary_files);
                setEditJobs(data.jobs);
                setEditSubjects(data.subjects);
                setEditContents(data.contents);
                setSelectedSteps(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
                setstepsFromApi(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
                setHasTeam(data.team)
                let tar = [];
                let tarID = [];
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                setIsEdit(true);
                // console.log(mtEngineOptionRef.current);
                let selected_mt = mtEngineOptionRef.current?.find((engine) => engine?.id === data?.mt_engine_id);
                // console.log(selected_mt);
                // console.log(data?.mt_engine_id);


                setShowTeamEdit(data.team_edit);
                setTeamSelect(
                    teamOptions?.find((element) => element.team_id == data.team)
                );

                setSourceLanguage(editSourceLanguage?.id);
                setSourceLabel(editSourceLanguage?.language);
                setSourceLanguageDisable(true);
                setProjectAvailalbility(data?.team ? "team" : "self");
                setMtEnable(data?.mt_enable);
                setPreTranslate(data?.pre_translate)
                setTranslationByPage(data?.get_mt_by_page)
                let deadlineLocal = Config.convertUTCToLocal(data?.project_deadline);
                setDeadline(deadlineLocal);

                let editTargetLanguages = [];
                let editSubjectFields = [];
                let editContentTypes = [];
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionsRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });

                data.subjects?.map((subject) => {
                    editSubjectFields.push(
                        subjectFieldOptionsRef.current?.find(
                            (element) => element.id == subject.subject
                        )
                    );
                });
                data.contents?.map((content) => {
                    editContentTypes.push(
                        contentTypeOptionsRef.current?.find(
                            (element) => element.id == content.content_type
                        )
                    );
                });
                // console.log(editTargetLanguages)
                setTimeout(() => {
                    setProjectName(data.project_name);
                    setRevisionStepEdit(data?.revision_step_edit);
                    contentprojectNameRef.current.innerText = data.project_name;
                    setTargetLanguage(editTargetLanguages);
                    setSubjectField(editSubjectFields);
                    setContentType(editContentTypes);
                    setSelectedMTFromAPI({
                        value: selected_mt?.id,
                        label: selected_mt?.name?.replaceAll("_", " "),
                    })
                    setSelectedMTEngine({
                        value: selected_mt?.id,
                        label: selected_mt?.name?.replaceAll("_", " "),
                    });
                    setLoading(false);
                }, 50);
                setFileError("");
            },
        });
    };

    // useEffect(() => {
    //   console.log(selectedMTEngine);
    // }, [selectedMTEngine])


    // const handleStepSelection = (selectedStepOptions) => {
    //   if (selectedStepOptions?.length === 0) {
    //     setPostEditStep(false);
    //     setProofReadStep(false);
    //   }
    //   if (selectedStepOptions?.length === 1) {
    //     if (selectedStepOptions[0].value === 1) {
    //       setPostEditStep(true);
    //       setProofReadStep(false);
    //     }
    //   }
    //   if (selectedStepOptions?.length === 2) {
    //     if (selectedStepOptions[1].value === 2) setProofReadStep(true);
    //   }
    // };

    // useEffect(() => {
    //   console.log(targetLanguage)
    // }, [targetLanguage])


    /* Update the edited values */
    const handleUpdate = (e, submission) => {
        //Also check handleSubmit
        // targetLangListToRemove.length && removeDeselectedTargetLang()
        e.preventDefault();
        /* Validation start */
        let formData = new FormData();
        if (
            submission !== "glossary-submission" &&
            files.length == 0 &&
            fileUrl == "" &&
            editFiles.length == 0
        ) {
            setFileError(t("upload_files"));
            return;
        }
        if (fileError != "") setFileError("");
        for (let x = 0; x < files.length; x++) {
            if (typeof files[x] != "undefined") formData.append("files", files[x]);
        }
        if (projectName == "") {
            setProjectNameError(t("enter_proj_name"));
            return;
        }
        /* if (teamSelect?.value == null || teamSelect?.value == '') {
                setTeamSelectError('Select a team')
                return
            } */
        if (sourceLanguageError != "") setSourceLanguageError("");
        if (targetLanguage == null || targetLanguage?.length == 0) {
            setTargetLanguageError(t("target_validation_note"));
            return;
        }
        /* if (filesSizeExceed()) {
                Config.toast(fileSizeErrMsg.current, 'error')
                return
            } */
        // if (targetLanguage?.map((e) => e.id)?.indexOf(sourceLanguage) != -1) {
        //   setTargetLanguageError(
        //     "Source language and target language can't be same"
        //   );
        //   return;
        // }
        if (targetLanguage?.length > 0) setTargetLanguageError("");
        if (fileUrl != "") {
            var regExp =
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = fileUrl.match(regExp);
            if (match && match[2].length == 11) setFileUrlError("");
            else {
                setFileUrlError(t("enter_valid_youtube_url"));
                return;
            }
        }
        /* Validation end */
        formData.append("project_name", projectName);
        formData.append("project_type", projectType);
        formData.append(
            "mt_engine",
            selectedMTEngine?.value ? selectedMTEngine?.value : 1
        );
        formData.append("source_language", sourceLanguage);

        if (pdfIdFromToolkit !== null) {
            if (editFiles?.find(each => each.id === pdfIdFromToolkit)) {
                formData.append("pdf_obj_id", pdfIdFromToolkit)
            }
        }


        let targetLanguageArr = [];

        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formData.append("target_languages", eachTargetLanguage?.id);
        });

        subjectField.map((eachSubjectField) => {
            if (
                editSubjects.find(
                    (element) => element.subjects == eachSubjectField.id
                ) == null
            )
                formData.append("subjects", eachSubjectField.id);
        });

        contentType.map((eachContentType) => {
            if (
                editContents.find(
                    (element) => element.content_type == eachContentType.id
                ) == null
            )
                formData.append("contents", eachContentType.id);
        });

        let deadlineUTC = Config.convertLocalToUTC(deadline);

        deadline && formData.append("project_deadline", deadlineUTC);
        formData.append("mt_enable", mtEnable);

        primaryGlossarySourceName &&
            formData.append(
                "primary_glossary_source_name",
                primaryGlossarySourceName
            );
        glossaryCopyrightOwner &&
            formData.append("source_Copyright_owner", glossaryCopyrightOwner);
        detailsOfPrimaryGlossarySourceName &&
            formData.append("details_of_PGS", detailsOfPrimaryGlossarySourceName);
        glossaryGeneralNotes && formData.append("notes", glossaryGeneralNotes);
        selectedUsagePermission?.label &&
            formData.append("usage_permission", selectedUsagePermission?.label);
        glossaryLicense && formData.append("public_license", glossaryLicense);


        if (projectDataFromApi.current?.pre_translate !== preTranslate) {
            formData.append("pre_translate", preTranslate);
        }

        if (projectDataFromApi.current?.get_mt_by_page !== translationByPage) {
            formData.append("get_mt_by_page", translationByPage);
        }


        let stepsToRemoveList = stepOptions?.filter(stepOpt => selectedSteps?.some(each => stepOpt.value !== each.value))

        let deleteIdList = ""
        if (stepsFromApi.length > selectedSteps?.length) {
            stepsToRemoveList?.map((each, index) => {
                deleteIdList += `${each.value}${index !== stepsToRemoveList?.length - 1 ? "," : ""}`
            })
        } else if (stepsFromApi.length < selectedSteps?.length) {
            stepsToRemoveList?.map(each => {
                formData.append("steps", each.value);
            })
        }


        let list = "";
        targetLangListToRemove?.map((each, index) => {
            list += `${each.id}${index !== targetLangListToRemove.length - 1 ? "," : ""
                }`;
        });

        // if (projectAvailalbility === "team") formData.append("team", true);
        // else 
        formData.append("team", hasTeam);

        if (fileUrl != "") formData.append("url", fileUrl);
        let url = "";
        if (fileUrl == "")
            url = `${Config.BASE_URL
                }/workspace/project/quick/setup/${editProjectId}/?step_delete_ids=${deleteIdList}&file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${list}&subject_delete_ids=${deletedSubjectIds.current.join()}&content_delete_ids=${deletedContentIds.current.join()}`;
        // url = `${
        // Config.BASE_URL
        // }/workspace/project/quick/setup/${editProjectId}/?file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${deletedJobIds.current.join()}&subject_delete_ids=${deletedSubjectIds.current.join()}&content_delete_ids=${deletedContentIds.current.join()}0&step_delete_ids=${
        //     !proofReadStep ? 2 : ""
        // }`;
        else url = Config.BASE_URL + "/srt/fileUpload";
        setShowUpdateLoader(true);
        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type":
                    "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: url,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast("Project updated successfully");
                history(`/file-upload?page=${prevPageInfo.current?.pageNo != undefined ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy != undefined ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${response.data.id}`)
                if (submission === "glossary-submission") {
                    setGlossaryProjectCreationResponse(response?.data);
                } else {
                    setShowUpdateLoader(false);
                    /* listProjects()
                          listFiles(editProjectId)
                          editProject(null, editProjectId) */
                    /* List files - start */
                    // if (currentPage == 1) listProjects();
                    // else setCurrentPage(1);
                    // activeToggle(1);
                    /* List files - end */
                    projectIdToSelect.current = response.data.id;
                    // history("/file-upload?page=1&order_by=-id");
                }
            },
            error: (error) => {
                Config.log(error);
            },
        });
        setEditSubjects([]);
        setEditContents([]);
        deletedSubjectIds.current = [];
        deletedContentIds.current = [];
    };

    useEffect(() => {
        if (mtEnable === false) {
            setPreTranslate(false)
        }
    }, [mtEnable])


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

    /* Delete a project by id */
    const deleteProject = (projectId, isConfirmed = false) => {
        // if (isConfirmed)
        // If confirmed
        setIsProjectDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                setIsProjectDeleting(false)
                history("/file-upload?page=1");
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowTaskDeleteAlert(true)
                    setShowDeleteConfirmationModal(false)
                    setIsProjectDeleting(false)
                }
                setIsProjectDeleting(false)
            }
        });
        // else Config.confirm(deleteProject, [projectId, true], "Delete project permanently?", ["Delete", "Cancel"]); //Ask user confirmation
    };

    /* Get teams dropdown options */
    const getTeamsOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/teamlist/`,
            auth: true,
            success: (response) => {
                let teamData = response.data?.team_list;
                let teamOptionsTemp = [];
                teamData.map((value) => {
                    teamOptionsTemp.push({
                        value: value.team_id,
                        label: (
                            <>
                                <div className="team-font-align">
                                    <span>
                                        <img
                                            src={GroupsColor}
                                            alt="grp-color-icon"
                                        />
                                    </span>
                                    <span className="team-select-opt-txt">{value.team}</span>
                                </div>
                            </>
                        ),
                    });
                });
                setTimeout(() => {
                    setTeamOptions(teamOptionsTemp);
                }, 200);
            },
        });
    };

    // const AssignedMemberTooltip = withStyles({
    //   tooltip: {
    //     backgroundColor: "#172B4D",
    //   },
    // })(Tooltip);

    /* Handle MT Engine change */
    const handleMTEngineChange = (selectedOption) => {
        setSelectedMTEngine(selectedOption);
    };

    /* Handle Usage permission option change */
    const handleUsagePermissionChange = (selectedOption) => {
        setSelectedUsagePermission(selectedOption);
    };

    /* Handling the instruction popup */
    const handleInstructionModal = (taskId) => {
        let selectedTask = selectedProjectFiles.find(
            (element) => element.id === taskId
        );
        setInstructionText(selectedTask?.task_assign_info?.instruction);
        setInstructionFile(selectedTask?.task_assign_info?.filename);
        setTaskAssignInfoId(selectedTask?.task_assign_info?.id);
        setShowAssignManageModal(true);
        setAnchorEl(null);
    };

    /* Edit task by id */
    const editTask = (e, projectId, taskId) => {
        setAssignedTaskId(taskId);
        history(`/collaborate?project=${projectId}&task=${taskId}`);
        // setAnchorEl(null);
        // activeToggle(3);
    };

    /* Assinged details if assigned */
    const assignToProject = (e, projectId) => {
        setAssignProjectId(projectId);
        history(`/collaborate?project=${projectId}`);
        // activeToggle(3);
    };

    /* Reset assign and manage */
    const resetAssignManageAndActive = () => {
        setAssignedTaskId(null);
        setAssignProjectId(null);
        activeToggle(3);
    };

    /* Search by keyword */
    // useEffect(() => {
    //     debounce(listProjects);
    // }, [projectSearchTerm]);

    /* Starts when user stops typing */
    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            projectSearchTerm?.length && callback();
        }, 1000);
    };

    /* Version control file upload, file select handling */
    const selectIntegrationFile = (isChecked, fileId, filename, branchId) => {
        let filesTemp = integrationFiles;
        if (isChecked)
            filesTemp.push({ id: fileId, filename: filename, branchId: branchId });
        else filesTemp = filesTemp.filter((f) => f.id !== fileId);
        setTimeout(() => {
            setIntegrationFiles([]);
            setIntegrationFiles(filesTemp);
        }, 100);
    };

    /* Product tour callback handler */
    const handleJoyrideCallback = (data) => {
        let { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            let projectRows = document.getElementsByClassName(
                "file-edit-list-table-row"
            );
            if (projectRows[0]) {
                const isTasksOpened =
                    projectRows[0].classList.contains("focused-proj-row");
                if (index === 0) {
                    if (!isTasksOpened)
                        // If the project is not yet opened
                        projectRows[0]?.click();
                    let openButton = null;
                    const waitForOpenButton = setInterval(() => {
                        // Wait for a particular element to be in the DOM
                        openButton = document.querySelector(
                            ".file-edit-list-inner-table-row button"
                        );
                        if (openButton) {
                            clearInterval(waitForOpenButton);
                            setTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
                            return;
                        }
                    }, 0);
                    return;
                }
            }
            setTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if (
            [STATUS.FINISHED, STATUS.SKIPPED, STATUS.IDLE].includes(status) ||
            action === ACTIONS.CLOSE
        ) {
            // Need to set our running state to false, so we can restart if we click start again.
            setIsProductTourSeen(true); //Tour seen
        }
    };

    const BeaconComponent = React.forwardRef((props, ref) => (
        <div ref={ref} className="d-none"></div>
    ));

    /* Show the tour */
    const showHowToTour = () => {
        setTourStepIndex(0);
        setIsProductTourSeen(false);
    };

    let selectedFilesData = "";
    let isColorClassAdded = false;
    let activeColorTarget = "";
    let editorAssignmentDetails = {};
    let reviewerAssignDetails = {};
    let isAssignedProject = null;

    useEffect(() => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    }, [contentprojectNameRef]);


    const handleHideIcon = () => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    };

    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
    };


    useEffect(() => {
        if (targetLanguage !== "") {
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
            //   console.log(targetLangToRemove)
            setTargetLangListToRemove(targetLangToRemove);
        }
    }, [targetLanguage]);


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

    const handleBlockedNavigation = ({
        currentLocation,
        nextLocation,
        historyAction
      }) => {
        
        if (
            files.length <= 0 || nextLocation.pathname === "/file-upload" ||
            nextLocation.pathname?.includes('/translations') || nextLocation.pathname?.includes('/workspace')
        ) {
            if(projectTaskList?.find(each => each.isProcessing)) {
                return true
            }
            return false
        }
        return true
    }

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            let docParam = URL_SEARCH_PARAMS.get("doc")
            if (lastLocation.search === '' && docParam) { // redirected from new document 
                history(lastLocation.pathname + `?document-id=${docParam}`)
            } else {  //  redirected from already created document - open 
                history(lastLocation.pathname + lastLocation.search)
            }
        }
    }, [confirmedNavigation, history, lastLocation])


    const modaloptions = {
        closeMaskOnClick: false,
        width: navigationModalVisible ? 520 : null,
        height: navigationModalVisible ? 240 : null,
        onClose: hideSettingsModal,
    };


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


    const recentlyUsedLanguage = () => {
        var list;
        Config.axios({
            url: Config.BASE_URL + "/workspace/default_detail/",
            auth: true,
            success: (response) => {
                let options = []
                // console.log(response.data?.recent_pairs);
                response.data?.recent_pairs?.map(each => {
                    list = (<span>{targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.src)?.language}</span> + <span>{each.tar?.length > 1 ? each.tar.map(eachTar => targetLanguageOptionsRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.tar[0])?.language}</span>)
                    // console.log(list);
                    options.push({
                        value: `${each.src}->${each.tar.join(',')}`,
                        label: `${targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.src)?.language}`,
                        customAbbreviation: `${each.tar?.length > 1 ? each.tar.map(eachTar => targetLanguageOptionsRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.tar[0])?.language
                            }`
                    })
                })
                setRecentlyUsedLangs(options)
            },
        });
    }


    const handleRecentLangClick = (clickedLang) => {
        let src = clickedLang.value.split('->')[0]
        let tar = clickedLang.value.split('->')[1]?.split(',')
        setSourceLabel(targetLanguageOptionsRef.current?.find((element) => element.id == src).language)
        setSourceLanguage(src)
        let selectedTar = []
        tar?.map(eachTar => {
            selectedTar.push(targetLanguageOptionsRef.current?.find((element) => element.id == eachTar))
        })
        setTargetLanguage([...new Set(selectedTar)]);
    }

    const focusSourceLangDiv = () => {
        if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    }

    // .docx, .doc, .xlxs, .pptx, .txt
    const checkForOfficeFiles = (files) => {
        // console.log(files)
        let officeFilesExt = ['doc', 'docx', 'pdf', 'pptx', 'xlsx']
        let uploadedFilesExt = []
        files.forEach(file => {
            let name = file.name;
            let lastDot = name.lastIndexOf(".");
            let ext = name.substring(lastDot + 1)?.toLowerCase();
            // console.log(ext)
            uploadedFilesExt.push(ext)
        })
        // console.log(uploadedFilesExt)
        // console.log(uploadedFilesExt?.filter(each => !officeFilesExt?.some(item => item === each)))
        let notOfficeListPresent = uploadedFilesExt?.filter(each => !officeFilesExt?.some(item => item === each))?.length !== 0 ? true : false
        if(notOfficeListPresent) setShowTranslateAndDownloadBtn(false)
        else setShowTranslateAndDownloadBtn(true)
    } 

    // this api will initiate the file translate process and provide the status of each task
    const getProjectTransDownloadStatus = (task_id) => {
        if(createdProjectIdRef.current === null) return;

        if(task_id !== undefined){
            let newArr = projectTaskListRef.current?.map(obj => {
                if(obj.id === task_id){
                    return {
                        ...obj,
                        isProcessing: true,
                    }
                }
                return obj
            })
            // console.log('modified list with isProcessing key')
            // console.log(newArr)
            projectTaskListRef.current = newArr 
            setProjectTaskList(newArr)
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/translate_file/?project=${createdProjectIdRef.current}`,
            auth: true,
            success: (response) => {
                if(response.data?.results !== undefined){
                    let dataList = response.data?.results
                    let newArr = projectTaskListRef.current?.map(obj => {
                        if(obj.id === dataList?.find(each => each.task === obj.id)?.task){
                            let status = dataList?.find(each => each.task === obj.id)?.status
                            return {
                                ...obj,
                                isProcessing: status == 400 ? true : false,
                                status: status
                            }
                        }
                        return obj
                    })
                    // console.log('modified list with isProcessing key')
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)

                    // console.log('isAnyTaskIsProcessing')
                    // console.log(projectTaskListRef.current?.find(each => each.isProcessing === true))
                    
                    let isAnyTaskIsProcessing = projectTaskListRef.current?.find(each => each.status === 400) ? true : false
                    let insuffientCredit = projectTaskListRef.current?.find(each => each.status === 402) ? true : false
                    let isPageNumNotFound = projectTaskListRef.current?.find(each => each.status === 404) ? true : false
                    
                    if(isPageNumNotFound){
                        // Config.toast(`File couldn't process!`, 'error')
                        setShowFileErrorModal(true)
                        let newArr = projectTaskListRef.current?.map(obj => {
                                if(obj.status === 404){
                                return {
                                    ...obj,
                                    isProcessing: false,
                                    status: 402
                                }
                            }
                            return obj
                        })
                        projectTaskListRef.current = newArr 
                        setProjectTaskList(newArr)
                        return
                    }

                    if(insuffientCredit) setShowCreditAlertModal(true)

                    if(isAnyTaskIsProcessing){
                        setTimeout(() => {
                            getProjectTransDownloadStatus()
                        }, 5000);
                    }
                    // translateDownloadCeleryTaskListRef.current = []
                }else if(task_id === undefined){
                    let newArr = projectTaskListRef.current?.map(obj => {
                        return {
                            ...obj,
                            isProcessing: false
                        }
                    })
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)
                }
            },
            error: (err) => {
                if(err?.response?.status === 500){
                    let newArr = projectTaskListRef.current?.map(obj => {
                        return {
                            ...obj,
                            isProcessing: false,
                            status: 402
                        }
                    })
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)
                }
            }
        });
    }

    // this api will initiate the file translate process and provide the status of each task
    const getTaskTransDownloadStatus = (task_id) => {
        if(createdProjectIdRef.current === null) return;

        // it will abort/cancel the ongoing api request
        if (axiosFileTranslateAbortController) {
            axiosFileTranslateAbortController.abort()
        }
    
        const controller = new AbortController();
        setAxiosFileTranslateAbortController(controller);

        let task_list_arr = []

        let alreadyProcessingTask = projectTaskListRef.current?.filter(each => each.isProcessing)
        let alreadyProcessingTaskIds = alreadyProcessingTask?.map(each => each.id)
        // console.log(alreadyProcessingTaskIds)
        if(alreadyProcessingTask?.length !== 0){
            task_list_arr = [...new Set([...alreadyProcessingTaskIds, task_id])]
        }else{
            task_list_arr = [task_id]
        }
        // console.log("taskList: "+task_list_arr?.toString())

        fileTranslatingTaskListRef.current = task_list_arr

        // create task list to process
        let list = ""
        fileTranslatingTaskListRef.current?.map((each, index) => {
            list += `task=${each}${index !== fileTranslatingTaskListRef.current?.length - 1 ? "&" : ""}`;
        });

        // console.log(list)

        // display the button loader as soon as the user clicks the TRANSLATE button
        if(task_id !== undefined){
            let newArr = projectTaskListRef.current?.map(obj => {
                if(obj.id === task_id){
                    return {
                        ...obj,
                        isProcessing: true,
                    }
                }
                return obj
            })
            projectTaskListRef.current = newArr 
            setProjectTaskList(newArr)
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/translate_file/?${list}`,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                // if called with project_id, returns list if task_data
                if(response.data?.results !== undefined){
                    let dataList = response.data?.results
                    let newArr = projectTaskListRef.current?.map(obj => {
                        if(obj.id === dataList?.find(each => each.task === obj.id)?.task){
                            let status = dataList?.find(each => each.task === obj.id)?.status
                            return {
                                ...obj,
                                isProcessing: status == 400 ? true : false,
                                status: status,
                            }
                        }
                        return obj
                    })
                    // console.log('modified list with isProcessing key')
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)

                    // console.log('isAnyTaskIsProcessing')
                    
                    let isAnyTaskIsProcessing = projectTaskListRef.current?.find(each => each.status === 400) ? true : false
                    let insuffientCredit = projectTaskListRef.current?.find(each => each.status === 402) ? true : false
                    let isPageNumNotFound = projectTaskListRef.current?.find(each => each.status === 404) ? true : false
                    
                    if(isPageNumNotFound){
                        // Config.toast(`File couldn't process!`, 'error')
                        setShowFileErrorModal(true)
                        let newArr = projectTaskListRef.current?.map(obj => {
                            if(obj.status === 404){
                                return {
                                    ...obj,
                                    isProcessing: false,
                                }
                            }
                            return obj
                        })
                        projectTaskListRef.current = newArr 
                        setProjectTaskList(newArr)
                        return
                    }

                    if(insuffientCredit) setShowCreditAlertModal(true)

                    if(isAnyTaskIsProcessing){
                        setTimeout(() => {
                            getTaskTransDownloadStatus(task_id)
                        }, 5000);
                    }
                }
            },
            error: (err) => {
                if(err?.response?.status === 500){
                    let newArr = projectTaskListRef.current?.map(obj => {
                        if(fileTranslatingTaskListRef.current?.find(each => each === obj.id)){
                            return {
                                ...obj,
                                isProcessing: false,
                                status: 402
                            }
                        }
                        return obj
                    })
                    // console.log(newArr)
                    projectTaskListRef.current = newArr 
                    setProjectTaskList(newArr)
                }
            }
        });
    }



    const downloadTaskTargetFile = async(task_id) => {
        setIsDownloading(task_id)
        let url = `${Config.BASE_URL}/workspace/download_task_target_file/?task=${task_id}`
        const response = await Config.downloadFileFromApi(url);
        // console.log(response)
        Config.downloadFileInBrowser(response)
        setIsDownloading(null)
    } 

    const downloadAllFiles = async() => {

        let url = `${Config.BASE_URL}/workspace/download/${createdProjectIdRef.current}/`

        const response = await Config.downloadFileFromApi(url);

        Config.downloadFileInBrowser(response)

    } 

    useEffect(() => {
      console.log(projectTaskList)
    }, [projectTaskList])
    
    useEffect(() => {
      console.log(deadline)
    }, [deadline])
    

    return (
        <React.Fragment>
            <div className="ai-working-area-glb-wrapper">
                {/* <div className="ai-proj-set-width">
                    <div ref={projectNameRef} contentEditable={true} data-placeholder="Project name" className="header-title editable"></div>
                </div>
                {projectNameError?.length ? <span className="text-danger d-block  error-bottom">Required</span> : null} */}
                <div className="file-trans-breadcrumbs-section">
                    <Breadcrumbs />
                    <div className={"project-input-wrap "} style={projectTaskList?.length !== 0 ? {pointerEvents: 'none'} : {}}>
                        <div
                            ref={contentprojectNameRef}
                            suppressContentEditableWarning={true}
                            contentEditable={projectTaskList?.length === 0 ? true : false}
                            onClick={() => projectTaskList?.length === 0 && handleHideIcon()}
                            onBlur={() => projectTaskList?.length === 0 && executeProposalScroll()}
                            data-placeholder={t("untitled_project")}
                            onKeyUp={(e) => projectTaskList?.length === 0 && handleProjectNamechange(e)}
                            onKeyDown={() => projectTaskList?.length === 0 && handleProjectEnter}
                            className="project-box"
                            tabIndex={0}
                        ></div>
                        {/* {editBtnReveal && (
              <span className="edit-icon">
                <CreateOutlinedIcon
                  onClick={handleHideIcon}
                  style={{
                    fontSize: 20,
                    color: "#636363",
                  }}
                />
              </span>
            )} */}
                    </div>
                    {/* {projectNameError != "" ? (
            <span className="text-danger">{projectNameError}</span>
          ) : null} */}
                    {/* <div className="project-setup-forms">
                        <div className="input-form-field">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Project Name</label>
                                <input
                                    className="input-select-width"
                                    id="project-name"
                                    name="projectName"
                                    value={projectName}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter project name..."
                                />
                                {projectNameError != "" ? <span className="text-danger">{projectNameError}</span> : null}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className={"ai-translate-file-wrapper " + (projectTaskList?.length !== 0 ? "behind-overlay" : "")} style={(showCreateLoader || translateDownloadBtnLoader) ? {pointerEvents: 'none'} : {}}>
                    <div>
                    {/* <div className="project-setup-heading-new">
                        {isLoading ? (
                            <div className="d-flex">
                                <Skeleton animation="wave" variant="circle" width={20} height={20} />
                                <Skeleton className="ml-2" animation="wave" width={140} height={18} />
                            </div>
                        ) : (
                            <div>
                                <img src={Config.HOST_URL + "assets/images/new-ui-icons/file_upload.svg"} alt="file_upload" />
                                <span>File Translation</span>
                            </div>
                        )}
                        <div className="project-setup-forms">
                            <div className="input-form-field">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Project Name</label>
                                    <input
                                        className="input-select-width"
                                        id="project-name"
                                        name="projectName"
                                        value={projectName}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Enter project name..."
                                    />
                                    {projectNameError != "" ? <span className="text-danger">{projectNameError}</span> : null}
                                </div>
                            </div>
                        </div>
                    </div> */}
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
                            <div className="fileupload-global-tab-wrapper">
                                <p className="upload-area-title">{t("upload_files")}<span className="asterik-symbol">*</span></p>
                                {projectType === 2 && (
                                    <Nav tabs className="fileupload-tab-row">
                                        <NavItem
                                            className={
                                                "fileupload-tab-list " +
                                                classnames({ active: fileUploadTabActive == 1 })
                                            }
                                            onClick={() => {
                                                fileUploadTabToggle(1);
                                            }}
                                        >
                                            <NavLink className="fileupload-tab-link">{t("files")}</NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={
                                                "fileupload-tab-list " +
                                                classnames({ active: fileUploadTabActive == 2 })
                                            }
                                            onClick={() => {
                                                fileUploadTabToggle(2);
                                            }}
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
                                                        integrationFiles.length ||
                                                            editProjectId != null ||
                                                            (!showFileUpload && files.length > 0) || pdfIdFromToolkit !== null
                                                            ? "dropfile-area"
                                                            : "col-xs-12 mt-3"
                                                    }
                                                >
                                                    <DragandDrop handleDrop={handleDrop}>
                                                        <div className={files.length > 0 || editFiles.length > 0 || editProjectId != null ? "button-wrap fileloaded h-25" : "button-wrap sa"} >
                                                            <div className="draganddrop-align">
                                                                <img className={(files.length > 0 || editFiles.length > 0 || editProjectId != null) ? 'img' : ''}
                                                                    src={UploadFolder}
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
                                                    {/* {console.log(editFiles)} */}
                                                    {/* <DragandDrop handleDrop={handleDrop}> */}
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
                                                    {/* </DragandDrop> */}
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
                                                                                    onClick={(e) =>
                                                                                        selectIntegrationFile(
                                                                                            false,
                                                                                            integrationFile.id,
                                                                                            integrationFile.filename
                                                                                        )
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
                                    <TabPane tabId={2}>
                                        <GitHubBox onClick={handleShowVersionControlModal} />
                                    </TabPane>
                                </TabContent>
                            </div>
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
                                <div className="project-setup-forms new-file-proj-setup-wrapper file-upload-form">
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
                                                {sourceTargetValidation.source && <small className="text-danger">{t("select_source_language")}</small>}
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
                                                        {targetLanguage == "" ? (
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

                                                {/* <p>Recently used: &nbsp;
							{
								recentlyUsedLangs?.map((eachLang, index) => {
									if(index < 5){
										return(
											<span className="recent-target-lang" onClick={() => handleRecentLangClick(eachLang)}>{`${eachLang?.language}${index !== 4 ? ", " : ""}`}</span>
										)
									}
								})
							}
						</p> */}
                                                {sourceTargetValidation.target && <small className="text-danger">{t("target_validation_note")}</small>}
                                            </div>
                                        </div>
                                        {/* <div className="form-fields">
                      <div className="form-group mb-2">
                        <label htmlFor="exampleFormControlFile1">
                          Machine translation engine
                        </label>
                        <Select
                          className="select-width"
                          isSearchable={false}
                          name="machine-translation-software"
                          id="machine-translation-software"
                          value={selectedMTEngine}
                          options={mtpeEngineOptions}
                          // isOptionDisabled={(option) => option.disabled}
                          isDisabled={
                            mtpeEngineOptions.length === 0 ? true : false
                          }
                          onChange={handleMTEngineChange}
                          styles={customStepSelectStyles}
                          placeholder={
                            <div className="select-placeholder-text">
                              Select MT
                            </div>
                          }
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: () => null,
                          }}
                        />
                      </div>
                    </div> */}
                                    </div>
                                    {/* {sourceLanguageError !== "" ||
                    (targetLanguageError !== "" && (
                      <div className="d-flex align-items-center gap-3">
                        <div className="form-fields mr-3">
                          <div className="form-group">
                            {sourceLanguageError !== "" ? (
                              <span className="text-danger">
                                {sourceLanguageError}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-fields">
                          <div className="form-group">
                            {targetLanguageError !== "" ? (
                              <span className="text-danger">
                                {targetLanguageError}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))} */}
                                    {/* <div className="d-flex  gap-3 files-space-align w-50 g-30">
                    <div className="form-fields">
                      <div className="form-group mb-2">
                        <label htmlFor="exampleFormControlFile1">
                          Machine translation engine
                        </label>
                        <Select
                          className="select-width"
                          isSearchable={false}
                          name="machine-translation-software"
                          id="machine-translation-software"
                          value={selectedMTEngine}
                          options={mtpeEngineOptions}
                          // isOptionDisabled={(option) => option.disabled}
                          isDisabled={
                            mtpeEngineOptions.length === 0 ? true : false
                          }
                          onChange={handleMTEngineChange}
                          styles={customStepSelectStyles}
                          placeholder={
                            <div className="select-placeholder-text">
                              Select MT
                            </div>
                          }
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: () => null,
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-fields"></div>
                  </div> */}

                                    <AdvancedProjectType
                                        isLoading={isLoading}
                                        projectType={projectType}
                                        subjectField={subjectField}
                                        contentType={contentType}
                                        deadline={deadline}
                                        setDeadline={setDeadline}
                                        mtEnable={mtEnable}
                                        setMtEnable={setMtEnable}
                                        postEditStep={postEditStep}
                                        setPostEditStep={setPostEditStep}
                                        proofReadStep={proofReadStep}
                                        setProofReadStep={setProofReadStep}
                                        subjectFieldOptions={subjectFieldOptions}
                                        contentTypeOptions={contentTypeOptions}
                                        isEditable={projectEditable.current}
                                        handleSubjectFieldClick={handleSubjectFieldClick}
                                        handleContentTypeClick={handleContentTypeClick}
                                        // handleStepSelection={handleStepSelection}
                                        revisionStepEdit={revisionStepEdit}
                                        steps={steps}
                                        selectedSteps={selectedSteps}
                                        setSelectedSteps={setSelectedSteps}
                                        stepOptions={stepOptions}
                                        handleSelectedSteps={handleSelectedSteps}
                                        preTranslate={preTranslate}
                                        setPreTranslate={setPreTranslate}
                                        translationByPage={translationByPage}
                                        setTranslationByPage={setTranslationByPage}
                                        selectedMTEngine={selectedMTEngine}
                                        mtpeEngineOptions={mtpeEngineOptions}
                                        handleMTEngineChange={handleMTEngineChange}
                                        projectDataFromApi={projectDataFromApi}
                                    />
                                </div>
                            )}
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
                                                    {t("translate_edit_download")}
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
                                    {(editProjectId == null && showTranslateAndDownloadBtn) && (
                                        <button className="convert-pdf-list-UploadProjectButton"
                                            type="submit"
                                            onMouseUp={(e) => !translateDownloadBtnLoader && handleSubmit(e, 'trans-download')}
                                        >
                                            <span className="fileupload-new-btn">
                                                {translateDownloadBtnLoader && (
                                                    <SaveButtonLoader />
                                                )}
                                                {t("translate_and_download")}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    </div>
                </div>
                {
                    projectTaskList.length !== 0 &&
                    <div className="ai-translate-file-wrapper translate-task-list" style={{ marginTop: 20}}>
                        <p className="upload-area-title">{t("transalted_files")}</p>
                        <div className="project-task-list">
                            <div className="button-wrap-file-list">
                                <div className="file-list-align">
                                    <div className="file-list">
                                        {projectTaskList?.map((task) => (
                                            <div
                                                key={task.id}
                                                className="file-name-list"
                                            >
                                                
                                                <div className="filename" style={{ width: '100%' }}>
                                                    {
                                                        <img
                                                            src={
                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                task.filename.split(".").pop()
                                                            }
                                                            alt="document"
                                                        />
                                                    }
                                                    <div className="file-name-info-wrapper">
                                                        <div className="file-name-row">
                                                            <span className="filename-length">
                                                                {task.filename
                                                                    .split(".")
                                                                    .slice(0, -1)
                                                                    .join(".")}
                                                            </span>
                                                            <span className="extension">
                                                                {"." +
                                                                    task.filename.split(".").pop()}
                                                            </span>
                                                        </div>
                                                        <span className="lang-pair">
                                                            <span>
                                                                {sourceLanguageOptions?.find(each => each?.id == task?.source_language)?.language}
                                                            </span>
                                                            <img src={ArrowRightAltColor}/>
                                                            <span>
                                                                {sourceLanguageOptions?.find(each => each?.id == task?.target_language)?.language}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {task?.isProcessing ? (
                                                    <ProgressAnimateButton />
                                                ) : (
                                                    (task?.status === 402 || task?.status === 404) ? (
                                                        <button className="convert-pdf-list-UploadProjectButton"
                                                            type="submit"
                                                            onMouseUp={(e) => getTaskTransDownloadStatus(task?.id)}
                                                        >
                                                            <span className="fileupload-new-btn">
                                                                {t("translate")}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <button className="convert-pdf-list-UploadProjectButton"
                                                            type="submit"
                                                            onMouseUp={(e) => {task?.id !== isDownloading && downloadTaskTargetFile(task?.id)}}
                                                        >
                                                            <span className="fileupload-new-btn">
                                                                {task?.id === isDownloading && (
                                                                    <SaveButtonLoader />
                                                                )}
                                                                {t("download")}
                                                            </span>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12" style={{ marginTop: 25}}>
                            {projectTaskList?.find(each => !each.isProcessing) && (
                                <div className="new-btn-grp">
                                    <button 
                                        className="convert-pdf-list-UploadProjectButton" 
                                        type="submit"
                                        onClick={() => resetForm()}
                                    >
                                        <span className="fileupload-new-btn">
                                            {t("reset")}
                                        </span>
                                    </button>
                                    {/* <button 
                                        className="convert-pdf-list-UploadProjectButton" 
                                        type="submit"
                                        onClick={downloadAllFiles}
                                    >
                                        <span className="fileupload-new-btn">
                                            {t("download_all")}
                                        </span>
                                    </button> */}
                                </div>
                            )}
                        </div>
                    </div>
                }
                <div className="file-upload-instruction">
                    <div className="supp-file-format">
                        <div>
                            <div className="supp-file-format-list">
                                <p>{supportFileExtensions.join(" ")}</p>
                            </div>
                            <span className="imp-icon-img">
                                <img
                                    src={ImpFileIcon}
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
                        {/* <span className="add-padd-left max-word-note">
              Bigger files may lead to a slow process initially
            </span> */}
                        <span className="max-file-note">
                            {t("file_upload_condition_note_2")}: <span>100 MB</span>
                        </span>
                    </div>
                </div>
            </div>
            {showSrcLangModal && (<Rodal
                visible={showSrcLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-lang-select-modal"
            >
                <div className="lang-modal-wrapper">
                    {/* <h1>Select a source language</h1> */}
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
                        <Sourcelanguage
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
                        <Targetlanguage
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
            {/* <Rodal
        visible={showDeleteConfirmationModal}
        {...modaloption}
        showCloseButton={false}
        className="ai-mark-confirm-box"
      >
        <div className="confirmation-wrapper">
          <img
            src={
              Config.HOST_URL + "assets/images/new-ui-icons/confirm-icon.svg"
            }
            alt="confirm-icon"
          />
          <h2>Do you want to delete this project?</h2>
          <div className="button-row">
            <button className="mydocument-AiMarkCancel" onClick={() => setShowDeleteConfirmationModal(false)}>
              <span className="cancel-txt">Cancel</span>
            </button>
            <button className="mydocument-AiMarkSubmit" onClick={() => deleteProject(editProjectId)}>
              <span className="submit-txt">Delete</span>
            </button>
          </div>
        </div>
      </Rodal> */}
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
            <ReactRouterPrompt when={handleBlockedNavigation}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        // visible={navigationModalVisible}
                        visible={isActive}
                        {...modaloptions}
                        showCloseButton={false}
                        className="ai-mark-confirm-box"
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("leave_page_confirm_head")}</div>
                                <div>{t("leave_page_confirm_para")}</div>
                            </div>
                            <div className="confirm-bottom">
                                <div>
                                    <Button onClick={onCancel}>{t("stay")}</Button>
                                    <Button onClick={onConfirm} variant="contained">{t("leave")}</Button>
                                </div>
                            </div>
                        </div>
                    </Rodal>
                )
            }}
            </ReactRouterPrompt>

            {/* direct file opening wait modal */}
            {showDocumentOpeingModal && (
                <div className="credit-alert-box">
                    <div className="credit-alert-bg"></div>
                    <div className={"credit-alert-content-container-with-redirection"}>
                        <div className="credits-head">
                            <span
                                onClick={() => {
                                    history(`/translations?page=1${createdProjectIdRef.current ? `&open-project=${createdProjectIdRef.current}` : ''}`)
                                }}
                                className="credits-close-btn"
                            >
                                <img src={CloseBlack} alt="close_black" />
                            </span>
                        </div>
                        <div className="credits-text-cont">
                            <React.Fragment>
                                {/* <img src={Config.HOST_URL + "assets/images/new-ui-icons/insuffient-icon.svg"} alt="insuffient-icon" /> */}
                                <AnalysisLoader />
                                <div className="insuffient-txt-align">
                                    <span>
                                        <ScheduleOutlinedIcon style={{ color: '#5F6368' }} />
                                    </span>
                                    <p>{t("processing")}</p>
                                </div>
                                
                                <p className="insuffient-desc text-center" >
                                    {t("once_process_done_open")}
                                </p>
                              
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            )}

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
                            <img src={FileError} alt="insuffient-icon" />
                            <div className="insuffient-txt-align">
                                <span>
                                    <img src={RemoveCircleRed} alt="remove_circle" />
                                </span>
                                <p>{t("file_error")}</p>
                            </div>
                            <p className="insuffient-desc text-center">{t("file_err_note")}</p>
                            <div className="mt-3">
                                <p className="insuffient-desc" style={{fontSize: '12px'}} dangerouslySetInnerHTML={{__html: sanitizeHtml(t("translate_edit_foot_note"))}}></p>
                            </div>
                        </React.Fragment>
                    </div>
                </Rodal>
            )}

        </React.Fragment>
    );
}

export default TranslateFiles;