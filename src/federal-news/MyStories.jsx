/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, createRef, useRef } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import Select, { components } from "react-select";
import Checkbox from '@mui/material/Checkbox';
import Config from "../vendor/Config";
// import DragandDrop from "./DragandDrop";
// import Footer from "./Footer";
// import Navbar from "reactstrap";
// import { TabContent, TabPane, Nav, NavItem, NavLink, CardFooter } from "reactstrap";
import classnames from "classnames";
import Settings from "../vendor/Settings";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ButtonBase from '@mui/material/ButtonBase';
// import SourceLanguage from "../vendor/lang-modal/Sourcelanguage";
// import TargetLanguage from "../vendor/lang-modal/Targetlanguage";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InstructionModal from "../vendor/model-select/InstructionModal";
import VersionControlModal from "../vendor/github-integration/VersionControlModal";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import TourTooltip from "../tour/TourTooltip";
// import SelectProjectType from "./project-type-selection/SelectProjectType";
// import AdvancedProjectType from "./project-type-selection/AdvancedProjectType";
// import GlossaryProjectType from "./project-type-selection/GlossaryProjectType";
// import SocialMediaIntegrationType from "./project-type-selection/SocialMediaIntegrationType";
// import SideBar from "../project-setup-components/SideBar";
import SimpleRodals from "../project-setup-components/rodals/SimpleRodals";
// import { styled } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';
import GlossaryClone from "../vendor/model-select/GlossaryClone";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Collapse } from 'reactstrap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ButtonLoader } from "../loader/CommonBtnLoader";
import SearchIcon from '@mui/icons-material/Search';
import { SandClockLoader } from "../loader/SandClockLoader";
import Cookies from "js-cookie";
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AnalysisLoader } from "../loader/AnalysisLoader";
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "../vendor/styles-svg/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MainAssignManage from "../vendor/model-select/MainAssignManage";
import { addDownloadingFiles, updateDownloadingFile, deleteDownloadingFile } from "../features/FileDownloadingListSlice";
import generateKey from "../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import LSPAssignManage from "../vendor/model-select/LSPAssignManage";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ConformPOModal from "../vendor/model-select/ConformPOModal";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { POFilesModal } from "../vendor/model-select/POFilesModal";
import CachedIcon from '@mui/icons-material/Cached';
import ProgressAnimateButton from "../vendor/button-loader/ProgressAnimateButton";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { data } from "jquery";
import SourceLanguage from "../vendor/lang-modal/Sourcelanguage";
import TargetLanguage from "../vendor/lang-modal/Targetlanguage";
import SearchBarIcon from "../assets/images/chat/chat-search.svg"
import DinamalarImgPlaceholder from "../assets/images/dinamalar-news/dinamalar.jpg"
import NoImgPlaceholder from "../assets/images/no-img-found.png"
import FederalImgPlaceholder from "../assets/images/federal-news/federal_placeholder.png"
import BlueRightArrow from "../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import PaginationLeftArrow from "../assets/images/new-ui-icons/pagination-left.svg"
import PaginationRightArrow from "../assets/images/new-ui-icons/pagination-right.svg"
import ChangeRequestIcon from "../assets/images/change-request.svg"
import NoEditorIcon from "../assets/images/no-editors-found-2.svg"
import EmptyProjectIcon from "../assets/images/empty-projects-folder.svg"
import PlusIcon from "../assets/images/new-ui-icons/plus.svg"
import EditIcon from "../assets/images/new-ui-icons/pencil-edit-new.svg"
import FileUploadIcon from "../assets/images/new-ui-icons/upload_file.svg"
import DeleteBinIcon from "../assets/images/new-ui-icons/assets-delete-icon.svg"
import DownloadIcon from "../assets/images/new-ui-icons/file_download.svg"
import BlackCloseIcon from "../assets/images/new-ui-icons/close_black.svg"
import BarChatIcon from "../assets/images/new-ui-icons/stacked_bar_chart_blue.svg"
import InsufficientIcon from "../assets/images/new-ui-icons/insuffient-icon.svg"
import RedCircleIcon from "../assets/images/new-ui-icons/remove_circle_red.svg"
import FileErrorIcon from "../assets/images/new-ui-icons/file-error.png"
import { CircularProgress as CircularLoader } from "@mui/material";
import ReactRouterPrompt from 'react-router-prompt'

function MyStories(props) {
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    let {
        activeProjTab,
        targetLanguageOptions,
        setTargetLanguageOptions,
        targetLanguageOptionsRef,
        mainContainerRef,
        setIsViewStoryModal,
        setSelectedStoryDetails,
        openAddStoryModal,
        editorsListOption
    } = props
    const location = useLocation();
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails.value)
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)
    const isFederal = useSelector((state) => state.isFederalNews.value)
    
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    
    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor'

    /* State constants - start */
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [didMount, setDidMount] = useState(true);
    const [skeletonLoader, setSkeletonLoader] = useState(null);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [showPOConfirmModal, setShowPOConfirmModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [showAssignMemberInfobox, setShowAssignMemberInfobox] = useState(false);
    const [assignSelectedProject, setAssignSelectedProject] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [files, setFiles] = useState([]);
    const [selectedProjectTermType, setSelectedpRrojectTermType] = useState({});
    const [tmxFiles, setTMXFiles] = useState([]);
    const [tbxFiles, setTBXFiles] = useState([]);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [subjectFieldOptions, setSubjectFieldOptions] = useState(null);
    const [contentTypeOptions, setContentTypeOptions] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectType, setProjectType] = useState(null);
    const [projectTypeOptions, setProjectTypeOptions] = useState([])
    const [mtpeEngines, setMtpeEngines] = useState([]);
    const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
    const [selectedMTEngine, setSelectedMTEngine] = useState({ value: 1, label: "Google" });
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [subjectField, setSubjectField] = useState([]);
    const [contentType, setContentType] = useState([]);
    const [deadline, setDeadline] = useState("");
    const [mtEnable, setMtEnable] = useState(true);
    const [showIndividualAssignManage, setShowIndividualAssignManage] = useState(false);
    const [showLSPAssignManage, setShowLSPAssignManage] = useState(false);
    const [showEditorReportModal, setShowEditorReportModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [assignStep, setAssignStep] = useState(null);

    // const [preTranslate, setPreTranslate] = useState(false)
    const [createdProjects, setCreatedProjects] = useState([]);
    const [createdGlossaryProject, setCreatedGlossaryProjects] = useState(false);
    const [fileError, setFileError] = useState("");
    const [fileUrlError, setFileUrlError] = useState("");
    const [projectNameError, setProjectNameError] = useState("");
    const [sourceLanguageError, setSourceLanguageError] = useState("");
    const [targetLanguageError, setTargetLanguageError] = useState("");
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [showAnalysisCollapse, setShowAnalysisCollapse] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [openedProjectId, setOpenedProjectId] = useState(null);
    const [createdTasks, setCreatedTasks] = useState({ files: [], jobs: [] });
    const [supportFileExtensions, setSupportFileExtensions] = useState([]);
    const [supportedTMXFileExtensions, setSupportedTMXFileExtensions] = useState([".tmx"]);
    const [supportedTBXFileExtensions, setSupportedTBXFileExtensions] = useState([".tbx"]);
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
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [showProjectAnalysis, setShowProjectAnalysis] = useState(false);
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [showCloneModal, setShowCloneModal] = useState(false);
    const [showDurationAlertModal, setShowDurationAlertModal] = useState(false);
    const [showPoModal, setShowPoModal] = useState(false);
    const [sourceLabel, setSourceLabel] = useState(t("click_to_select"));
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
    const [selectedProjectFiledID, setselectedProjectFiledID] = useState(null)
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [poPDFUrl, setPoPDFUrl] = useState(null)
    const [particularClickedTask, setParticularClickedTask] = useState(null)
    const [stepToAccept, setStepToAccept] = useState(null)
    const searchAreaRef = useRef(null);
    const [selectFileRow, setSelectFileRow] = useState(false);
    const [availCredits, setAvailCredits] = useState(false);
    const [projectFilterType, setprojectFilterType] = useState(null)
    const [isCurrentPlanTrial, setIsCurrentPlanTrial] = useState(null)

    const [documentSubmitParameters, setDocumentSubmitParameters] = useState({
        taskid: null,
        step: null,
        confirm: null,
        total: null,
        isTaskReassigned: false
    })
    const [showSubmitDocumentAlertModal, setShowSubmitDocumentAlertModal] = useState(false)

    const [showElement, setShowElement] = useState(true);

    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
    const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
    const [detailsOfPrimaryGlossarySourceName, setDetailsOfPrimaryGlossarySourceName] = useState("");
    const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
    const [glossaryLicense, setGlossaryLicense] = useState("");
    const [selectedUsagePermission, setSelectedUsagePermission] = useState({ value: 1, label: t("Private") });
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
    const [selectedGlossaryProject, setSelectedGlossaryProject] = useState(null)
    const [orderByValue, setOrderByValue] = useState(null)
    const [sortEl, setSortEl] = useState(null);
    const [moreEl, setMoreEl] = useState(null);
    const [openEl, setOpenEl] = useState(null);
    const [subDownloadOption, setSubDownloadOption] = useState(null)
    const [openedMoreOption, setOpenedMoreOption] = useState(null);
    const [showOpenAs, setShowOpenAs] = useState(null);
    const [orderBySelectedValue, setOrderBySelectedValue] = useState(2);
    const sortOpen = Boolean(sortEl);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [showProcessingModal, setShowProcessingModal] = useState(false)
    const [editInstantProjectModal, setEditInstantProjectModal] = useState(false)
    const [textToSpeechConvert, setTextToSpeechConvert] = useState(false)
    const [isTranscribing, setIsTranscribing] = useState(false)
    const [partialPretranslate, setPartialPretranslate] = useState(false)
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false)
    const [unassignTaskDeleteAlert, setUnassignTaskDeleteAlert] = useState(false)

    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)
    const [taskActionOpen, setTaskActionOpen] = useState(false);
    const [taskActionAnchorEl, setTaskActionAnchorEl] = useState(null)

    const [storyProjectName, setstoryProjectName] = useState('')

    // project analysis states
    const [payableRatesAPI, setPayableRatesAPI] = useState(null)
    const [payablRateValueAPI, setPayablRateValueAPI] = useState(null)
    const [projectAnalysisedData, setProjectAnalysisedData] = useState(null)
    const [projectAnalysisUnitSwitch, setProjectAnalysisUnitSwitch] = useState(false)


    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [hasTeam, setHasTeam] = useState(false)
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("")
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [isStoryProjUpdating, setIsStoryProjUpdating] = useState(false)
    const [showStoryProjDeleteModal, setShowStoryProjDeleteModal] = useState(false) // state to show confirmation modal for express project

    const [preTranslateAllTask, setPreTranslateAllTask] = useState([])
    const [createdProjectsList, setCreatedProjectsList] = useState([])

    const [isPdfTranslating, setIsPdfTranslating] = useState(false)

    const [transcriptionTaskList, setTranscriptionTaskList] = useState([])

    const [analysisRunningProjectList, setAnalysisRunningProjectList] = useState([])

    const [isDownloading, setIsDownloading] = useState(false)
    const [showAssignedProjectDeleteAlert, SetShowAssignedProjectDeleteAlert] = useState(false)
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)
    const [confirmedNavigation, setConfirmedNavigation] = useState(false)
    const [lastLocation, setLastLocation] = useState(null)
    const [showdocCreditCheckAlert, setShowDocCreditCheckAlert] = useState(false)

    const [showTaskReworkReasonModal, setShowTaskReworkReasonModal] = useState(false)
    const [customerTaskReworkReasonText, setCustomerTaskReworkReasonText] = useState('')

    // states for open as button
    const [downloadOpen, setDownloadOpen] = useState(false);

    // const [anchorEl, setAnchorEl] = useState(null); // This is the common anchor element for all poppers
    const [popperAnchorEl, setPopperAnchorEl] = useState({}); // Separate anchor element for each popper
    const [showPOFilesModal, setShowPOFilesModal] = useState(false)
    const [POFilesDetails, setPOFilesDetails] = useState(null)

    const [isReworkSending, setIsReworkSending] = useState(false)
    const [isDeadlineExtendReqSending, setIsDeadlineExtendReqSending] = useState(false)

    const [showDeadlineCrossedModal, setShowDeadlineCrossedModal] = useState(false)

    const [vendorChangeRequestReason, setVendorChangeRequestReason] = useState("")
    const [showVendorChangeRequestModal, setShowVendorChangeRequestModal] = useState(false)
    const [isApproving, setIsApproving] = useState(false)

    const [isTaskDeleting, setIsTaskDeleting] = useState(false)
    const [isStoryProjectDeleting, setIsStoryProjectDeleting] = useState(false)
    
    const [isDesignDeleting, setIsDesignDeleting] = useState(false);
    const [axiosVendorDashboardAbortController, setAxiosVendorDashboardAbortController] = useState(null);
    const [axiosFileTranslateAbortController, setAxiosFileTranslateAbortController] = useState(null);
    const [showFileErrorModal, setShowFileErrorModal] = useState(false);
    const [showTaskDesignIndividualDeleteAlert, setShowTaskDesignIndividualDeleteAlert] = useState(false)
    const [isStoryIdPushing, setIsStoryIdPushing] = useState(null)
    const [refreshParam, setRefreshParam] = useState(false)

    const [isEditorFilterDropDownOpen, setIsEditorFilterDropDownOpen] = useState(false)
    // const [editorsListOption, setEditorsListOption] = useState([])
    const [checkedEditors, setCheckedEditors] = useState([])
    const [editorUnassignData, setEditorUnassignData] = useState({
        task_id: null,
        isUnassigning: false
    })

    const downloadAnchorRef = useRef(null);
    const projectIdForPOModal = useRef(null)
    const projectTypeForPOModal = useRef(null)

    const clientResponseDataRef = useRef(null)

    const [myStoriesSettingsBox, setMyStoriesSettingsBox] = useState(false)
    const myStoriesSettingsBoxRef = useRef()

    /* State constants - end */

    /* Ref constants - start */
    const fileUploadTop = createRef();
    const sourceLanguageLabel = createRef();
    const targetLanguageLabel = createRef();
    const analysisCollapseRef = createRef();
    const sourceLanguageModal = useRef();
    const moreOptionOutside = useRef();
    const showOpenasOutside = useRef();
    const availCreditOutside = useRef();
    const projectsPerPage = useRef(10);
    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const deletedSubjectIds = useRef([]);
    const deletedContentIds = useRef([]);
    const projectTypeRef = useRef(null)
    const assignedMemberCardRef = useRef(null)

    // const allowedFileLength = useRef(10)
    // const fileLengthErrMsg = useRef(`Only ${allowedFileLength.current} files are allowed in a project`)
    // const allowedTargetLanguageLength = useRef(20)
    // const allowedFileSize = useRef(100) //In MB
    // const fileSizeErrMsg = useRef(`Exceeds the file(s) size limit of ${allowedFileSize.current} MB`)
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const projectIdToSelect = useRef(null);
    const subjectFieldOptionsRef = useRef([]);
    const contentTypeOptionsRef = useRef([]);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const projectEditable = useRef(false);

    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const searchTermCloseOutside = useRef();
    const didMountRef = useRef(0)

    const searchTermRef = useRef(null)
    const openFileId = useRef(null)
    const projectAnalysisTempProjectId = useRef(null)
    const projectAnalysisApiCounter = useRef(0)
    const isPdfConversionPostCalled = useRef(false)
    const taskActionAnchorRef = useRef(null);
    const taskDeleteParam = useRef(null)
    const storyProjectIdRef = useRef(null)
    const targetLangDivRef = useRef(null)
    const isProjectPreTranslate = useRef(false)
    const createdProjectsRef = useRef([])
    const selectedProjectFilesRef = useRef([])
    const myTimeoutFunc = useRef(null)
    const selectedProjectIdRef = useRef(null)
    const projectObject = useRef(null)
    const selectedDesignerProject = useRef(null)

    const isProjectTransciptionRef = useRef(false)

    const analysisRunningProjectListRef = useRef(null)
    const wordCountAnalysisTimeoutRef = useRef(null)
    const wordCountAnalysisTriggerRef = useRef(false)

    const mtRawDownloadRetryLimit = useRef(2)
    const mtRawDownloadRetryCounter = useRef(0)

    const downloadingFilesList = useRef([])

    const mtRawCeleryTimeOutRef = useRef(null)

    const downloadDiffFilesParamRef = useRef(null)
    const docCreditCheckAlertRef = useRef(null)

    // userefs for collaborate section (assign & manage)
    const selectedFileRow = useRef(null)

    const stepOptionsRef = useRef(null)
    const isTaskReassigned = useRef(false)

    const taskDetailsForDeadlineCrossedTask = useRef(null)
    const fileTranslatingTaskListRef = useRef([])
    const axiosListProjectControllerRef = useRef(null)
    const isProjectListEmptyRef = useRef(false)
    const editorDropDownBoxRef = useRef(null)

    const openProjectListCounterRef = useRef(0)

    let paginationTimeOut = null


    /* Ref constants - end */

    var id = window.setTimeout(function () { }, 0);

    const open = Boolean(anchorEl); //Assigned task open

    const openReportModal = () => {
        setShowReportModal(true)
    } 

    const CircularProgressWithLabel = (props) => {
        // setOpenedProjectId()
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" {...props} className={"circular-foreground"} />
                <CircularProgress
                    variant="determinate"
                    value={100}
                    className={"circular-background"}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div className="progress-inner-label">
                        {!props.hideLabel ? `${Math.round(props.value)}%` : 'R'}
                    </div>
                </Box>
            </Box>
        );
    }

    useEffect(() => {
        let timeOut = setTimeout(function () {
            setShowElement(false);
        }, 10000);

        return () => {
            clearTimeout(timeOut)
        }
    }, []);

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setFileListSearchEnlarge(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setFileListSearchEnlarge(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });


    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (moreOptionOutside.current && !moreOptionOutside.current.contains(e.target)) {
                setMoreEl(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showOpenasOutside.current && !showOpenasOutside.current.contains(e.target)) {
                setOpenEl(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignedMemberCardRef.current && !assignedMemberCardRef.current.contains(e.target)) {
                setShowAssignMemberInfobox(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the editor filter dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            let filterDropDownBox = e.target.closest('.editor-filter') ? true : false
            // console.log("filterDropDownBox" + filterDropDownBox)
            if (editorDropDownBoxRef.current && !filterDropDownBox) {
                setIsEditorFilterDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleIndividualTaskAssignManage = (e, selectedStep, task, project) => {
        e.stopPropagation();
        // console.log(task);
        selectedFileRow.current = {
            task: task.id,
            job: task.job,
            project: project?.id,
            assign_enable: project?.assign_enable,
            src_lang_id: task.source_language,
            tar_lang_id: task.target_language,
            bid_info: task.bid_job_detail_info,
            task_data: task,
            project_data: project
        }

        setAssignStep(selectedStep)
        setShowIndividualAssignManage(true)
    }

    const handleShowLSPAssignManage = (e, project) => {
        e.stopPropagation();
        // console.log(assign_enable)
        selectedFileRow.current = {
            project: project?.id,
            steps: project?.steps,
            assign_enable: project?.assign_enable,
            project_data: project
        }
        setShowLSPAssignManage(true)
    }

    /* Edit task assignment by id */
    const editAssignedTask = (e, project, task, jobId, stepId) => {
        // console.log(taskId)
        // e.stopPropagation()
        selectedFileRow.current = {
            task: task.id,
            job: jobId,
            project: project?.id,
            assign_enable: project?.assign_enable,
            task_data: task,
            project_data: project
        }
        setAssignStep(stepId)
        setShowIndividualAssignManage(true)
        setAssignedTaskId(task.id);
        // props.history(`/collaborate?project=${projectId}&task=${taskId}&job=${jobId}&_edit=${true}&_step=${stepId}`);
        // setAnchorEl(null);
        // activeToggle(3);
    };

    const handleSortClick = (e) => {
        setSortEl(e.currentTarget);
    };

    const handleShowAssignMemberInfo = (e, id) => {
        e.stopPropagation();
        setShowAssignMemberInfobox(true);
        setAssignSelectedProject(id)
    };

    const handleMoreVertOption = (e, id) => {
        e.stopPropagation();
        setMoreEl(true);
        setOpenedMoreOption(id)
    };

    const handleOpenAsOption = (e, id) => {
        e.stopPropagation();
        setOpenEl(true);
        setShowOpenAs(id)
    };

    const handleSubDownloadOption = (e, id) => {
        e.stopPropagation();
        setSubDownloadOption(true)
    }

    const handleSubDownloadOptioHide = (e, id) => {
        e.stopPropagation();
        setSubDownloadOption(false)
    }

    const moreOptions = [
        {
            id: 1,
            icon: <FileDownloadOutlinedIcon className="file-download" />,
            arrow_icon: <KeyboardArrowRightOutlinedIcon className="right-arrow" />,
            label: t("download_as"),
        },
        {
            id: 2,
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
        },
        // {
        //     id: 3,
        //     icon: <ReceiptLongOutlinedIcon />,
        //     label: t("view_po"),
        // }
    ]

    const moreOptionsForPDF = [
        {
            id: 1,
            icon: <FileDownloadOutlinedIcon className="file-download" />,
            // arrow_icon: <KeyboardArrowRightOutlinedIcon className="right-arrow" />,
            label: t("download"),
        },
        {
            id: 2,
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
        },

    ]

    const subDownloadOptions = [
        {
            id: 1,
            value: 'ORIGINAL',
            label: t("translated_and_edited"),
        },
        {
            id: 2,
            value: 'BILINGUAL',
            label: t("bilingual_excel"),
        },
        {
            id: 3,
            value: 'MTRAW',
            label: t("mt_only"),
        },
        // {
        //     id: 4,
        //     value: 'SOURCE',
        //     label: t("source_file"),
        // },
        // {
        //     id: 5,
        //     value: 'TMX',
        //     label: "TMX",
        // },
        // {
        //     id: 6,
        //     value: 'XLIFF',
        //     label: "XLIFF",
        // },
    ]

    const moreOptionsForDoc = [
        {
            id: 1,
            icon: <EditOutlinedIcon className="file-download" />,
            label: t("edit"),
        },
        {
            id: 2,
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
        },

    ]

    const moreOptionsForDesigner = [
        {
            id: 1,
            icon: <EditOutlinedIcon className="file-download" />,
            label: t("edit"),
        },
        {
            id: 2,
            icon: <FileDownloadOutlinedIcon className="file-download" />,
            label: t("download"),
        },
        {
            id: 3,
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
        },
        {
            id: 4,
            icon: <ReceiptLongOutlinedIcon className="receipt-icon" />,
            label: t("view_po"),
        }
    ]

    const handleSelectedOrderItem = (selected_option) => {
        setOrderBySelectedValue(selected_option)
        orderBy(selected_option.value)
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };


    const openAddOn = () => {
        window.open(Config.USER_PORTAL_HOST + "/add-ons")
        setAvailCredits(false)
    }

    const openSubcription = () => {
        window.open(Config.USER_PORTAL_HOST + "/subscription-plans")
        setAvailCredits(false)
    }


    const hideSettingsModal = () => {
        setshowSettings(false);
        document.querySelector('.padding-correction').style.overflow = 'unset';

    }

    const hideAssignManageModal = () => setShowAssignManageModal(false);

    const hideVersionControlModal = () => setShowVersionControlModal(false);

    const modaloptions = {
        closeMaskOnClick: false,
        width: showTaskDeleteAlert ? 520 : null,
        height: showTaskDeleteAlert ? 240 : null,
        onClose: console.log(),
    };

    const customProjectTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #0000000D",
            borderRadius: "4px",
            zIndex: 5
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            display: "flex",
            marginBottom: "0.2rem",
            padding: "4px 6px",
            color: "#292929",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #0074D3" : "0px solid #DBDBDB",
            backgroundColor: "#e9ebee",
            borderRadius: 4,
            transtion: 0.3,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px 10px",
            width: 120,
            height: 40,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const projectTypes = [
        { value: 'all', label: t("all_proj") },
        { value: 'text', label: t("text_proj") },
        { value: 'files', label: t("translation_file_proj") },
        { value: 'glossary', label: t("glossary_projs") },
        // { value: 'voice', label: "Voice" },
        { value: 'speech_to_text', label: t("transcription_proj") },
        { value: 'text_to_speech', label: t("ai_voice_proj") },
        { value: 'express', label: t("instant_trans_proj") },
        { value: 'assigned', label: t("assign_proj") },
    ]

    const orderByOptions = [
        { value: 'project_name', label: t("a_to_z") },
        { value: '-project_name', label: t("z_to_a") },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ]

    const orderByOptionsForAssets = [
        { value: 'project_name', label: t("a_to_z") },
        { value: '-project_name', label: t("z_to_a") },
        { value: '-created_at', label: t("most_recent") },
        { value: 'created_at', label: t("least_recent") },
    ]

    const openAsOption = [
        { value: 'editor', label: t('editor') },
        { value: 'reviewer', label: t('reviewer') }
    ]

    const handleSelectOrderBy = (selected) => {
        orderBy(selected)
    }


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
                setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
                setAddonCredit(response?.data?.credits_left?.addon);
                setSubscriptionCredit(response?.data?.credits_left?.subscription);
                // console.log(response?.data?.credits_left?.total_buyed)
                // console.log(progressPercentage)
                if (response?.data?.credits_left?.total_buyed === 0) {
                    setProgressPercentage(0)
                } else {
                    setProgressPercentage(
                        (((response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription) / response?.data?.credits_left?.total_buyed) * 100).toFixed(2)
                    )
                }

            },
        });
    };


    const getSteps = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/steps/`,
            auth: true,
            success: (response) => {
                stepOptionsRef.current = response.data
                // setStep(response.data);
            },
        });
    }

    useEffect(() => {
        let engines = [];
        mtpeEngines.map((eachEngine) => engines.push({ value: eachEngine.id, label: eachEngine.name }));
        setMtpeEngineOptions(engines);
    }, [mtpeEngines]);

    /* MT engine select dropdown options */
    const machineLangTranslation = [
        { value: 1, label: "Google translate" },
        { value: 2, label: "Microsoft Translator", disabled: true },
        { value: 3, label: "Amazon Translate", disabled: true },
        { value: 4, label: "DeepL", disabled: true },
    ];

    /* Usage permission selection options */
    const usagePermissionOptions = [
        { value: 1, label: "Private" },
        { value: 2, label: "Public" },
    ];

    /* Handling the team checkbox selection */
    const handleTeamChange = (TeamSelect) => {
        setTeamSelectError("");
        setTeamSelect(TeamSelect);
    };

    const showSettingsModal = (e, project_id) => {
        e.stopPropagation()
        setSelectedProjectId(project_id);
        setshowSettings(true);
        // document.querySelector('.padding-correction').style.overflow = 'hidden';
    }


    /* 
        - Get the analysis data if it's not counted already
    */
    const showWordCountModal = (e = null, projectId = 0, isProjectAnalyzed = true) => {
        e.stopPropagation()
        if (projectId && !isProjectAnalyzed) {
            setShowWordCountLoader(true);

            Config.axios({
                url: `${Config.BASE_URL}/workspace/project_analysis/${projectId}`,
                auth: true,
                success: (response) => {
                    let projectAnalysis = response.data;
                    setCreatedProjects((prevState) =>
                        prevState.map((element) => (element.id == projectId ? { ...element, project_analysis: projectAnalysis, is_proj_analysed: true } : element))
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


    /* Set tab change if clicked only other tabs */
    const activeToggle = (tab) => {
        if (activeTab != tab) {
            setActiveTab(tab);
            // setProjectType(null);
        }
        projectEditable.current = false;
    };

    /* Select project type if clicked during project creation */
    // const selectProjectType = (type = 1) => {
    //     if (projectType != type) setProjectType(type);
    // };

    /* File upload tab change handle */
    const fileUploadTabToggle = (tab) => {
        if (fileUploadTabActive != tab) setFileUploadTabActive(tab);
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
        if (!request && supportFileExtensions.indexOf(ext) == -1) {
            Config.toast(t("file_format_not_support"));
            return false;
        } else if (request === "tmx" && supportedTMXFileExtensions.indexOf(ext) == -1) {
            Config.toast(t("file_format_not_support"));
            return false;
        } else if (request === "tbx" && supportedTBXFileExtensions.indexOf(ext) == -1) {
            Config.toast(t("file_format_not_support"));
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
            if (files.length === 0 && fileUrl === "" && editFiles.length === 0) setFileError(t("upload_files"));
            else setFileError("");
        }
    }, [files]);

    /* Handling all the project creation form */
    const handleChange = (e) => {
        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;
                // let fileList = JSON.parse(JSON.stringify(files))
                let fileList = [...files];
                Object.keys(thisFiles).map((eachKey) => {
                    if (isSupportedFile(thisFiles[eachKey])) {
                        // Check for supprted file types
                        // if (editFiles.length + fileList.length < allowedFileLength.current)
                        if (thisFiles[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current) fileList.push(thisFiles[eachKey]);
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

    /* Selected source language should not display on the target language options */
    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(targetLanguageOptionsRef.current.filter((element) => element.id != sourceLanguage));
    };

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setshowSrcLangModal(false);
        setSearchInput('')
    };

    const handleTargetModalCloseBtn = (e) => {
        if(targetLanguage?.length < 1){
            Config.toast(t("at_least_language_selected"), 'warning')
            return;
        }
        setshowTarLangModal(false); 
        setSearchInput(''); 
        setOnFocusWrap(false)
        
    }

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if(targetLanguage?.length === 2 && (targetLanguage?.find(each => each.id === value.id) ? false : true)){
            Config.toast('Maximum 2 languages can be added for better project management', 'warning')
            return
        }
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected")
            targetLanguageTemp = Config.removeItemFromArray(
                targetLanguageTemp,
                value
            );
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
            targetLanguageTemp.push(value);
        }
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSearchInput('')
        setOnFocusWrap(false)

    };

    useEffect(() => {
        removeSelectedSourceFromTarget();
    }, [sourceLanguage]);


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


    useEffect(() => {
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
        // console.log(a)
        let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
        setTargetLangListToRemove(targetLangToRemove);
    }, [targetLanguage]);

    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (myStoriesSettingsBoxRef.current && !myStoriesSettingsBoxRef.current.contains(e.target)) {
                handleMyStoriesSettingsVisibility(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.addEventListener("scroll", handleClickOutside);
        };
    });

    const handleCloseSearchBox = () => {
        setProjectSearchTerm("");
        // let orderParam = URL_SEARCH_PARAMS.get("order_by");
        // let filterParam = URL_SEARCH_PARAMS.get("filter");
        // let url = `/file-upload?page=1&order_by=${orderParam}`;
        // if (filterParam != null) url += `&filter=${filterParam}`;
        // props.history(url);
        projectSearchFunctionality('clear-search')
        setFileListSearchEnlarge(false);
        setIsSearchTermDelete(true)
    }    

    useEffect(() => {
        if (projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete) {
            projectSearchFunctionality('clear-search')
        }else if(projectSearchTerm == "" && searchTermRef.current !== "" && searchTermRef.current !== null){
            projectSearchFunctionality('clear-search')
        }
    }, [projectSearchTerm])

    /* Throw errors when there's no target language selected */
    useEffect(() => {
        if (didMount) {
            if (targetLanguage?.length > 0) setTargetLanguageError("");
            else setTargetLanguageError("Select one or more target language(s)");
        }
    }, [targetLanguage]);

    /* Show the pagination content a the bottom */
    useEffect(() => {
        if (didMount) paginationContentFunction(currentPage);
        
        return () => {
            if(paginationTimeOut) clearTimeout(paginationTimeOut);
        }
    }, [totalPages, currentPage]);


    const SearchTermFilterEnter = (e) => {
        if (e.which === 13 && projectSearchTerm == "") {
            setFileListSearchEnlarge(false)
            e.target.blur()
        } else if (e.which === 13) {
            projectSearchFunctionality()

            setFileListSearchEnlarge(false)
            searchTermRef.current = projectSearchTerm
            e.target.blur()
        }
    }

    const handleSearchDropDownClick = (e) => {
        projectSearchFunctionality()
    }

    const projectSearchFunctionality = (param) => {
        let orderby = URL_SEARCH_PARAMS.get("order_by")
        let filter = URL_SEARCH_PARAMS.get("filter")
        let url = `/my-stories?page=1`

        if (orderby != null) url += `&order_by=${orderby}`;
        if (filter != null) url += `&filter=${filter}`;
        let typeParam = URL_SEARCH_PARAMS.get("type")
        if (typeParam != null) url += `&type=${typeParam}`;
        if (param !== 'clear-search') {
            if (projectSearchTerm != null) url += `&search=${projectSearchTerm}`;
        }else if(param === 'clear-search'){
            setIsSearchTermDelete(true)
        }
        history(url);
    }

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        const controller = new AbortController();

        let pageParam = URL_SEARCH_PARAMS.get("page")
        let editorParam = URL_SEARCH_PARAMS.get("editor")
        // console.log(editorParam)
		// console.log(pageParam)
        if (pageParam !== null && pageParam !== undefined) {
            listProjects()
            if(editorParam === null) setCheckedEditors([])
            else {setCheckedEditors(editorParam?.split(',')?.map(each => parseInt(each)))}
        }else if((pageParam == null || pageParam == undefined)){		// add page param only for my stories list
			URL_SEARCH_PARAMS.set('page', 1)
			history.push(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
		}
        mainContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })

        return () => {
            controller.abort()
        }
    }, [URL_SEARCH_PARAMS.get("page"), URL_SEARCH_PARAMS.get("editor")]);    

    
    useEffect(() => {
        const controller = new AbortController();

        let refreshParam = URL_SEARCH_PARAMS.get("refresh-proj")
        let projIdParam = URL_SEARCH_PARAMS.get("open-project")
        if (refreshParam !== null && refreshParam !== undefined && projIdParam) {
            if(!createdProjectsList?.find(each => each?.id == projIdParam)) return;
            let selectedRow = document.querySelector(`div[data-key='${projIdParam}']`)
            // selectedRow?.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'center',
            // });
            setSelectFileRow(true)
            setOpenedProjectId(projIdParam)
            selectProjectById(projIdParam, null, true)
            console.log(openedProjectId)
            console.log(refreshParam)
            setRefreshParam(!refreshParam)
            // listFiles(projIdParam, true)
        }
      
        // mainContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })

        return () => {
            controller.abort()
        }
    }, [URL_SEARCH_PARAMS.get("refresh-proj")]);

    /* Go to the top of the page when ordering */
    useEffect(() => {
        const controller = new AbortController();

        let order = URL_SEARCH_PARAMS.get("order_by")
        if (order !== null && order !== undefined) {
            setOrderBySelectedValue(activeProjTab !== 6 ? orderByOptions?.find(each => each?.value == order) : orderByOptionsForAssets?.find(each => each?.value == order))
            listProjects();
        }

        return () => {
            controller.abort()
        }
    }, [URL_SEARCH_PARAMS.get("order_by")]);

    useEffect(() => {
        let filterParam = URL_SEARCH_PARAMS.get("filter")
        if (filterParam !== null && filterParam !== undefined) {
            listProjects()
        }
    }, [URL_SEARCH_PARAMS.get("filter")]);


    useEffect(() => {
        const controller = new AbortController();

        let searchParam = URL_SEARCH_PARAMS.get("search")
        if (searchParam !== null && searchParam !== undefined) {
            // didMountRef.current++
            // if(didMountRef.current !== 2){
            // console.log('from search');
            setProjectSearchTerm(searchParam)
            listProjects();
        } else if (isSearchTermDelete) {
            // console.log('from search');
            listProjects();
        }

        return () => {
            controller.abort()
        }
    }, [URL_SEARCH_PARAMS.get("search"), isSearchTermDelete]);

    useEffect(() => {
        let proceedAssignParam = URL_SEARCH_PARAMS.get("proceed-assgin")
        let projectIdParam = URL_SEARCH_PARAMS.get("project")
        if (proceedAssignParam !== null && proceedAssignParam !== undefined && projectIdParam && createdProjectsList?.length !== 0) {
            let assignIcon = document.querySelector(`#project-assigni-icon-${projectIdParam}`)
            // console.log(assignIcon);
            assignIcon?.click()

        }
    }, [URL_SEARCH_PARAMS.get("proceed-assgin"), createdProjectsList]);


    // automatically open accordian based on the project ID  
    useEffect(() => {
        let id = URL_SEARCH_PARAMS.get("open-project")
        if (id !== null) {
            try{
                // console.log(createdProjectsList?.find(each => each?.id == id))
                if(!createdProjectsList?.find(each => each?.id == id) && !isProjectListEmptyRef.current) {
                    if(openProjectListCounterRef.current < 2){
                        listProjects()
                        openProjectListCounterRef.current += 1
                    }
                    
                }else if(!isProjectListEmptyRef.current){
                    let selectedRow = document.querySelector(`div[data-key='${id}']`)
                    setSelectFileRow(true)
                    selectProjectById(id)
                }
            }catch(e){
                console.log(e)
            }
        }
		if(createdProjectsList?.length !== 0 && id === null){
			selectProjectById(createdProjectsList[0]?.id, 'open')
		}
    }, [createdProjectsList, URL_SEARCH_PARAMS.get("open-project")]);

    useEffect(() => {
      console.log("counter : "+openProjectListCounterRef.current)
    }, [openProjectListCounterRef.current])
    

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current)
        clearTimeout(myTimeoutFunc.current)
        let url = ''
        if (activeProjTab === 2) {
            url = `/my-stories?page=${page}`;
        }

        let queryParam = new URLSearchParams(window.location.search)
        let orderParam = queryParam.get("order_by");
        if (orderParam != null) url += `&order_by=${orderParam}`;
        let projectIdParam = queryParam.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let filterParam = queryParam.get("filter");
        if (filterParam != null) url += `&filter=${filterParam}`;
        let searchParam = queryParam.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        let typeParam = URL_SEARCH_PARAMS.get("type")
        if (typeParam != null) url += `&type=${typeParam}`;
        history(url);
    };

    /* Set order by value and redirect */
    const orderBy = (orderFieldTemp) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current)
        let page = 1
        let url = `/my-stories?page=${page}`
        
        if (orderFieldTemp != null) url += `&order_by=${orderFieldTemp}`;

        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let filter = URL_SEARCH_PARAMS.get("filter");
        if (filter != null) url += `&filter=${filter}`;
        let searchParam = URL_SEARCH_PARAMS.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        let typeParam = URL_SEARCH_PARAMS.get("type")
        if (typeParam != null) url += `&type=${typeParam}`;
        history(url);
    };

    // set the selected editor id in the url param for later retrival
    const assignEditorFilter = () => {
        URL_SEARCH_PARAMS.set('page', 1)
        if(checkedEditors?.length !== 0) URL_SEARCH_PARAMS.set('editor', checkedEditors?.join(','))
		else URL_SEARCH_PARAMS.delete('editor')
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
    } 

    /* Lsiting already created projects */
    const listProjects = (from) => {
        setFileListSearchEnlarge(false);
        setShowListingLoader(true);
        setCreatedProjects([])
        

        // setprojectFilterType(null)
        /* Page param set/get - start */
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);

        /* Page param set/get - start */
        /* ordering param set/get - start */
        // let orderFieldTemp = "";
        let orderParam = URL_SEARCH_PARAMS.get("order_by");
        // if (orderParam != null)  
        // orderParam;
        let filterParam = URL_SEARCH_PARAMS.get("filter");
        let searchParam = URL_SEARCH_PARAMS.get("search");
        let editorParam = URL_SEARCH_PARAMS.get("editor")

        /* ordering param set/get - end */
        // console.log(projectFilterType)
        let url = `${Config.BASE_URL}/workspace/project/quick/setup/?page=${page}&filter=news${orderParam != null ? `&ordering=${orderParam}` : ''}`;
        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;
        if (isDinamalar){
            url += `&assign_status=${filterParam ? filterParam : "inprogress"}`
            if(editorParam !== null && editorParam !== undefined) url += `&assign_to=${editorParam}`
        } 

        if (axiosListProjectControllerRef.current) {
            axiosListProjectControllerRef.current.abort()
        }
    
        const controller = new AbortController();
        axiosListProjectControllerRef.current = controller 

        let params = {
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                // setOrderField(orderFieldTemp);
                setSelectedProjectFiles([])
                setCreatedProjects(response.data.results);
                setCreatedProjectsList(response.data.results)
                createdProjectsRef.current = response.data.results
                setShowListingLoader(false);
                if (response.data.results.length === 0) {
                    setEmptyProjects(true);
                    isProjectListEmptyRef.current = true
                }
                else {
                    setEmptyProjects(false);
                    isProjectListEmptyRef.current = false
                }
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                if (response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'))?.length !== 0) {
                    setAnalysisRunningProjectList(response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id')))
                    analysisRunningProjectListRef.current = response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'))
                }
                if(from === "open-project"){
                    URL_SEARCH_PARAMS.delete("open-project")
                    history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
                }

            },
            error: (error) => {
                Config.log(error);
            },
        };
        Config.axios(params);
    };

   
    // need to put in useeffect instead of a function because new need to clear the timeout when the component is unmounted (so, we clear the settimout in return of useeffect)
    // otherwise if written as function the settimout will be called in every component until the page is reloaded
    useEffect(() => {
        if (analysisRunningProjectList?.length !== 0) {
            let list = "";
            // console.log(analysisRunningProjectListRef.current)
            analysisRunningProjectList?.map((each, index) => {
                if (each?.id !== null || each?.proj) {
                    list += `project_id=${each.id ? each.id : each?.proj}${index !== analysisRunningProjectList?.length - 1 ? "&" : ""
                        }`;
                }
            });

            Config.axios({
                url: `${Config.BASE_URL}/workspace/project/word_char/count?${list}`,
                auth: true,
                success: (response) => {
                    let runningProj = response.data?.out?.filter(each => each.hasOwnProperty('celery_id'))
                    let finishedProj = response.data?.out?.filter(each => !each.hasOwnProperty('celery_id'))
                    // console.log(analysisRunningProjectListRef.current)
                    // if(finishedProj?.length !== 0){
                    //     // console.log(finishedProj)
                    //     finishedProj?.map(each => {

                    //     })
                    // }
                    // console.log(runningProj)

                    if (runningProj?.length !== 0) {
                        const newArr = createdProjectsRef.current?.map(obj => {
                            if (obj.id === response.data?.out?.find(each => each.proj === obj.id)?.proj) {
                                return {
                                    ...obj,
                                    analyzingWordCount: response.data?.out?.find(each => each.proj === obj.id)?.hasOwnProperty('celery_id'),
                                };
                            }
                            return obj;
                        });
                        setCreatedProjects(newArr)
                        wordCountAnalysisTimeoutRef.current = setTimeout(() => {
                            console.log(runningProj)
                            setAnalysisRunningProjectList(runningProj)
                            analysisRunningProjectListRef.current = runningProj
                            wordCountAnalysisTriggerRef.current = !wordCountAnalysisTriggerRef.current
                        }, 8000);
                    } else {
                        const newArr = createdProjectsRef.current?.map(obj => {
                            if (obj.id === response.data?.out?.find(each => each.proj === obj.id)?.proj) {
                                return {
                                    ...obj,
                                    analyzingWordCount: response.data?.out?.find(each => each.proj === obj.id)?.hasOwnProperty('celery_id'),
                                    project_analysis: { ...obj.project_analysis, proj_word_count: response.data?.out?.find(each => each.proj === obj.id)?.proj_word_count }
                                };
                            }
                            return obj;
                        });
                        setCreatedProjects(newArr)
                    }
                },
                error: (err) => {

                }
            });
        }
        return () => {
            clearTimeout(wordCountAnalysisTimeoutRef.current)
        }
    }, [analysisRunningProjectList])


    /* Reset the project creation form */
    const resetForm = () => {
        setEditProjectId(null);
        setProjectName("");
        setTeamSelect("");
        setSourceLanguage("");
        setSourceLabel("Click to select");
        setTargetLanguage("");
        setSubjectField([]);
        setContentType([]);
        setDeadline("");
        setMtEnable(true);
        // setPreTranslate(false);
        setFiles([]);
        setTimeout(() => {
            setSourceLanguageError("");
            setTargetLanguageError("");
            setFileError("");
        }, 100);
    };

    /* Check any of the parent element has the specific :classname. Even the current element has the class also true */
    const hasParentThisClass = (element, classname) => {
        if (element.nodeName != 'svg' && element.nodeName != 'path') {
            if (element?.className != null) if (element?.className?.split(" ")?.indexOf(classname) >= 0) return true;
            return element?.parentNode && hasParentThisClass(element?.parentNode, classname);
        }
    };



    /* Select a particular project by id */
    const selectProjectById = (projectId, shouldListFiles, scrolltoLast = false) => {
        if (shouldListFiles !== "dont-open") setOpenedProjectId(projectId);
        setSelectedProjectId(projectId);
        listFiles(projectId, scrolltoLast);
        selectedProjectIdRef.current = projectId
        setTranscriptionTaskList([])
        setPreTranslateAllTask([])
        // while (id--) {
        //     window.clearTimeout(id); // will do nothing if no timeout with id is present
        // } 
        clearTimeout(myTimeoutFunc.current)
        let createdProject = createdProjects.find((element) => element.id == projectId);
		if (createdProject?.project_name != null) setSelectedProjectName(createdProject.project_name);
        if (createdProject?.project_analysis != null) {
            let createdProjectAnalysis = createdProject.project_analysis;
            setProjectWordCount(createdProjectAnalysis.proj_word_count);
            setProjectCharCount(createdProjectAnalysis.proj_char_count);
            setProjectSegmentCount(createdProjectAnalysis.proj_seg_count);
        }
    };

    const handleAnalysisCollapse = (index) => {
        let collapseByIndex = [...showAnalysisCollapse]
        collapseByIndex[index] = !collapseByIndex[index];
        setShowAnalysisCollapse(collapseByIndex);
    }

    /* Collapse the project selection */
    const selectProject = (e, projectId, project) => {

        let shouldListFiles = e?.target.getAttribute("should-open-files");

        if (hasParentThisClass(e?.target, "selected-file-row") || hasParentThisClass(e?.target, "dont-open-files")) return;
		setSelectedProjectFiles([]);
        // setProjectType(projectType);
        projectObject.current = project
        // console.log(openedProjectId)
        if (projectId == openedProjectId) {
            setOpenedProjectId(null);
        } else {
            setSelectFileRow(true)
            selectProjectById(projectId, shouldListFiles);
        }
    };

    /* List files for specific project */
    const listFiles = (projectId, scrolltoLast = false) => {

        if (axiosVendorDashboardAbortController) {
            axiosVendorDashboardAbortController.abort()
        }
    
        const controller = new AbortController();
        setAxiosVendorDashboardAbortController(controller);
        let filterParam = URL_SEARCH_PARAMS.get("filter");
        let editorParam = URL_SEARCH_PARAMS.get("editor")

        let url = Config.BASE_URL + "/workspace/vendor/dashboard/" + projectId
        if (isDinamalar){
            url += `?status=${filterParam ? filterParam : "inprogress"}`
            if(editorParam !== null && editorParam !== undefined) url += `&assign_to=${editorParam}`

        }

        Config.axios({
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {

                if(response.data?.length === 0){
                    listProjects()
                    return
                }
                
                // let responseTemp = response.data;
                setPreTranslateAllTask([])
                selectedProjectFilesRef.current = response.data

                // console.log(createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.voice_proj_detail);
                // getVoiceTranscribeTaskStatus(projectId)

                isProjectPreTranslate.current = createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.pre_translate
                // console.log(isProjectPreTranslate.current);
                // console.log(isProjectTransciptionRef.current);

                if (createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.voice_proj_detail != null) {
                    isProjectTransciptionRef.current = createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.voice_proj_detail.project_type_sub_category == 1
                }

                if (isProjectPreTranslate.current || isProjectTransciptionRef.current) {
                    // for transcription projects
                    if (isProjectTransciptionRef.current) {
                        Config.axios({
                            url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${projectId}`,
                            auth: true,
                            success: (voiceStatusResponse) => {
                                const newArr = response.data?.map(obj => {
                                    if (obj.id === voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                                        return {
                                            ...obj,
                                            pre_trans_processing: voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                        };
                                    }
                                    return obj;
                                });
                                // console.log(newArr)
                                setSelectedProjectFiles(newArr)
                                let canOpenFiles = voiceStatusResponse.data.res?.filter(each => each.open == 'True')
                                if (voiceStatusResponse.data.res?.length !== canOpenFiles?.length) {
                                    setTranscriptionTaskList(voiceStatusResponse.data.res)
                                }
                            },
                            error: (err) => {

                            }
                        });
                    }

                    // for pre-translate projects

                    if (isProjectPreTranslate.current) {
                        Config.axios({
                            url: `${Config.BASE_URL}/workspace/task_status/?project=${selectedProjectIdRef.current}`,
                            auth: true,
                            success: (statusResponse) => {
                                const newArr = response.data?.map(obj => {
                                    // console.log(statusResponse.data.res?.find(each => each.task === obj.id)?.task)
                                    if (obj.id === statusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                                        return {
                                            ...obj,
                                            pre_trans_processing: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                            document: statusResponse.data.res?.find(each => each.task === obj.id)?.document,
                                            progress: {
                                                confirmed_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                                total_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                            }
                                        };
                                    }
                                    return obj;
                                });
                                // console.log(newArr)
                                setSelectedProjectFiles(newArr)
                                let canOpenFiles = statusResponse.data.res?.filter(each => each.open == 'True')
                                if (statusResponse.data.res?.length !== canOpenFiles?.length) {
                                    setPreTranslateAllTask(statusResponse.data.res)
                                }
                            },
                            error: (err) => {

                            }
                        });
                    }
                }
                else {
                    setSelectedProjectFiles(response.data);
                    setSelectedProjectAnalysis(createdProjects.find((element) => element.id == projectId)?.project_analysis);
                }
            },
        });
    };



    useEffect(() => {
        if (transcriptionTaskList?.length !== 0) {
            let canOpenFiles = transcriptionTaskList?.filter(each => each.open == 'True')
            // console.log(canOpenFiles)
            if (transcriptionTaskList?.length !== canOpenFiles?.length) {   // if any one of the task is not 
                myTimeoutFunc.current = setTimeout(() => {
                    Config.axios({
                        url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${selectedProjectIdRef.current}`,
                        auth: true,
                        success: (response) => {
                            response.data?.res?.map(item => {
                                const newArr = selectedProjectFiles?.map(obj => {
                                    if (obj.id === response.data.res?.find(each => each.task === obj.id)?.task) {
                                        return {
                                            ...obj,
                                            pre_trans_processing: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                            // progress: {
                                            //     confirmed_segments: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? response.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                            //     total_segments: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? response.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                            // }
                                        };

                                    }
                                    return obj;
                                });
                                // console.log(newArr)
                                setSelectedProjectFiles(newArr)
                            })
                            setTranscriptionTaskList(response.data.res)
                        },
                        error: (err) => {

                        }
                    });
                }, 3000);
            } else {
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === transcriptionTaskList?.find(each => each.task === obj.id)?.task) {
                        return { ...obj, pre_trans_processing: false, open_in: "Ailaysa Writer or Text Editor", transcribed: true };
                    }
                    return obj;
                });
                // console.log(newArr);
                setSelectedProjectFiles(newArr)
            }
        }
    }, [transcriptionTaskList])


    useEffect(() => {
        if (preTranslateAllTask?.length !== 0) {
            let canOpenFiles = preTranslateAllTask?.filter(each => each.open == 'True')
            // console.log(canOpenFiles)
            if (preTranslateAllTask?.length !== canOpenFiles?.length) {   // if any one of the task is not 
                myTimeoutFunc.current = setTimeout(() => {
                    Config.axios({
                        url: `${Config.BASE_URL}/workspace/task_status/?project=${selectedProjectIdRef.current}`,
                        auth: true,
                        success: (response) => {
                            response.data?.res?.map(item => {
                                const newArr = selectedProjectFiles?.map(obj => {
                                    if (obj.id === response.data.res?.find(each => each.task === obj.id)?.task) {
                                        return {
                                            ...obj,
                                            pre_trans_processing: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                            document: response.data.res?.find(each => each.task === obj.id)?.document,
                                            progress: {
                                                confirmed_segments: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? response.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                                total_segments: response.data.res?.find(each => each.task === obj.id)?.open === 'True' ? response.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                            }
                                        };

                                    }
                                    return obj;
                                });
                                // console.log(newArr)
                                setSelectedProjectFiles(newArr)
                            })
                            setPreTranslateAllTask(response.data.res)
                        },
                        error: (err) => {

                        }
                    });
                }, 3000);
            } else {
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === preTranslateAllTask?.find(each => each.task === obj.id)?.task) {
                        return { ...obj, pre_trans_processing: false };
                    }
                    return obj;
                });
                setSelectedProjectFiles(newArr)
            }
        }
    }, [preTranslateAllTask])


    const openFile = (e, key = null, id = null, url = "", isFirstOpen, openIn, fileName, project_id, projectType, from, downloadType, taskFileName, open_as,selectedProjectFile,project) => {
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            orderBy: URL_SEARCH_PARAMS.get("order_by"),
            projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
            search: URL_SEARCH_PARAMS.get("search"),
            projectId: project_id,
            fromProjectList: true
        }
        
        if(openIn === "Designer"){
            // writer the designer open logic here
            // console.log('open designer')
            const index = selectedProjectFilesRef.current.findIndex(obj => obj?.design_project?.desg_job === selectedProjectFile?.design_project?.desg_job);
            let subUrl = project?.designer_project_detail?.type == 'image_design' ? `&view=2` : `&code=${selectedProjectFile?.target_language}&view=2`
            let url = `/workspace/${project?.designer_project_detail?.type == 'image_design' ? 'design' : 'image-translate'}/?project=${selectedProjectFile?.design_project?.desg_project}&page=${1}&lang=${index}`
            window.open(Config. DESIGNER_HOST+ url + subUrl)


        }else if (openIn === "ExpressEditor") {
            history(`/create/translate/text/instant-text/?project=${project_id}&task=${id}`, {state: { filename: fileName }})
        }else if (openIn === "News") {
            setClickedOpenButton(key);

            let formdata = new FormData();
            formdata.append("task", id);
            // console.log(openIn)
            let newsUrl = `/workspace/federal_translate/`
            Config.axios({
                url: Config.BASE_URL + newsUrl,
                method: "POST",
                data: formdata,
                auth: true,
                success: (response) => {
                    setClickedOpenButton(null);
                    // console.log(response)
                    setTimeout(() => {
                        // window.location.href = 'workspace/' + response.data.id
                        // window.open('http://localhost:3000/workspace/' + response.data.task, '_blank', 'noopener,noreferrer')
                        // let lastPageAvailable = localStorage.getItem(response.data.document_id)
                        // if (lastPageAvailable) {
                        //     history(lastPageAvailable, {
                        //         prevPath: location.pathname + location.search,
                        //         open_as
                        //     });
                        // } else {
                        //     history(`workspace/${response.data?.id}?page=1`, {
                        //         prevPath: location.pathname + location.search,
                        //         open_as
                        //     });
                        // }
                        history(`/news-workspace/${response.data.task}`, {state: {
                            prevPath: location.pathname + location.search,
                            open_as
                        }});
                    });
                },
                error: (err) => {
                    if (err?.response?.data?.msg?.includes('Empty')) {    // this error comes when the pre-translate is enabled in create flow
                        Config.toast('Oops ! The file is empty', 'error');
                    }
                    if (err?.response?.data?.msg?.includes('Mt only Ongoing')) {
                        setShowProcessingModal(true)
                        // openFile(null, null, null, url)
                        setTimeout(() => {
                            setShowProcessingModal(false)
                        }, 4000);
                    }
                    if (err?.response?.data?.msg?.includes('Pre Translation Ongoing')) {  // this error comes when the pre-translate is enabled in update flow
                        setShowProcessingModal(true)

                        // pre-translate loader update flow (when the task open is cicked)
                        setPreTranslateAllTask([])
                        isProjectPreTranslate.current = createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.pre_translate
                        if (isProjectPreTranslate.current) {
                            Config.axios({
                                url: `${Config.BASE_URL}/workspace/task_status/?project=${selectedProjectIdRef.current}`,
                                auth: true,
                                success: (statusResponse) => {
                                    const newArr = selectedProjectFilesRef.current?.map(obj => {
                                        if (obj.id === statusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                                            return {
                                                ...obj,
                                                pre_trans_processing: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                                document: statusResponse.data.res?.find(each => each.task === obj.id)?.document,
                                                progress: {
                                                    confirmed_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                                    total_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                                }
                                            };
                                        }
                                        return obj;
                                    });
                                    // console.log(newArr)
                                    setSelectedProjectFiles(newArr)
                                    let canOpenFiles = statusResponse.data.res?.filter(each => each.open == 'True')
                                    if (statusResponse.data.res?.length !== canOpenFiles?.length) {
                                        setPreTranslateAllTask(statusResponse.data.res)
                                    }
                                },
                                error: (err) => {

                                }
                            });
                        }
                        // openFile(null, null, null, url)
                        setTimeout(() => {
                            setShowProcessingModal(false)
                        }, 4000);
                    }
                    setClickedOpenButton(null);
                },
            });

        }  else {
            if (from !== 'task-download') {
                setClickedOpenButton(key);
            }
            if (url !== null) {
                Config.axios({
                    url: Config.BASE_URL + url,
                    auth: true,
                    success: (response) => {
                        setClickedOpenButton(null);
                        if (response?.data?.msg === undefined) {
                            docCreditCheckAlertRef.current = response.data.doc_credit_check_open_alert
                            if (from === 'task-download') {
                                downloadDifferentFile(downloadType, response.data?.document_id, null, null, id, null, null, null, null, null, null, taskFileName, selectedProjectFile)
                            } else {
                                setTimeout(() => {
                                    // window.location.href = 'workspace/' + response.data.document_id
                                    let lastPageAvailable = localStorage.getItem(response.data.document_id)
                                    if (lastPageAvailable) {
                                        history(lastPageAvailable, {state: {
                                            prevPath: location.pathname + location.search,
                                            open_as
                                        }});
                                    } else {
                                        history(`/workspace/${response.data?.document_id}?page=1`, {state: {
                                            prevPath: location.pathname + location.search,
                                            open_as
                                        }});
                                    }
                                });
                            }
                        } else {
                            if (from === 'task-download') {
                                downloadDifferentFile(downloadType, response.data?.document_id, null, null, id, null, null, null, null, null, null, taskFileName, selectedProjectFile)
                            } else {
                                setTimeout(() => {
                                    // window.location.href = 'workspace/' + response.data.document_id
                                    let lastPageAvailable = localStorage.getItem(response.data?.doc_data?.document_id)
                                    if (lastPageAvailable) {
                                        history(lastPageAvailable, {state: {
                                            prevPath: location.pathname + location.search,
                                            open_as
                                        }});
                                    } else {
                                        history(`/workspace/${response.data?.doc_data?.document_id}?page=1`, {state: {
                                            partial: true,
                                            prevPath: location.pathname + location.search,
                                            open_as
                                        }});
                                    }
                                });
                            }
                        }
                    },
                    error: (err) => {
                        if (err?.response?.data?.msg?.includes('Empty')) {    // this error comes when the pre-translate is enabled in create flow
                            Config.toast('Oops ! The file is empty', 'error');
                        }
                        if (err?.response?.data?.msg?.includes('Mt only Ongoing')) {
                            setShowProcessingModal(true)
                            // openFile(null, null, null, url)
                            setTimeout(() => {
                                setShowProcessingModal(false)
                            }, 4000);
                        }
                        if (err?.response?.data?.msg?.includes('Pre Translation Ongoing')) {  // this error comes when the pre-translate is enabled in update flow
                            setShowProcessingModal(true)

                            // pre-translate loader update flow (when the task open is cicked)
                            setPreTranslateAllTask([])
                            isProjectPreTranslate.current = createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.pre_translate
                            if (isProjectPreTranslate.current) {
                                Config.axios({
                                    url: `${Config.BASE_URL}/workspace/task_status/?project=${selectedProjectIdRef.current}`,
                                    auth: true,
                                    success: (statusResponse) => {
                                        const newArr = selectedProjectFilesRef.current?.map(obj => {
                                            if (obj.id === statusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                                                return {
                                                    ...obj,
                                                    pre_trans_processing: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                                    document: statusResponse.data.res?.find(each => each.task === obj.id)?.document,
                                                    progress: {
                                                        confirmed_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                                        total_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                                    }
                                                };
                                            }
                                            return obj;
                                        });
                                        // console.log(newArr)
                                        setSelectedProjectFiles(newArr)
                                        let canOpenFiles = statusResponse.data.res?.filter(each => each.open == 'True')
                                        if (statusResponse.data.res?.length !== canOpenFiles?.length) {
                                            setPreTranslateAllTask(statusResponse.data.res)
                                        }
                                    },
                                    error: (err) => {

                                    }
                                });
                            }
                            // openFile(null, null, null, url)
                            setTimeout(() => {
                                setShowProcessingModal(false)
                            }, 4000);
                        }
                        setClickedOpenButton(null);
                    },
                });
            }
            // if url is null means its glossary project [glossary porject type = 3]
            if (projectType === 3) {
                setTimeout(() => {
                    // window.location.href = 'workspace/' + response.data.document_id
                    history(`glossary-workspace?project-id=${selectedProjectId}&document-id=${id}`, {state: {
                        prevPageInfo: prevPageInfo,
                        prevPath: location.pathname + location.search
                    }});
                });
            }
        }

        /* From version 3.0 */
        // if (projectType === 1 || projectType === 2) {
        //     Config.axios({
        //         url: Config.BASE_URL + url,
        //         auth: true,
        //         success: (response) => {
        //             setClickedOpenButton(null);
        //             setTimeout(() => {
        //                 // window.location.href = 'workspace/' + response.data.document_id
        //                 props.history("workspace/" + response.data.document_id);
        //             });
        //         },
        //     });
        // } 

    };

    const ValueContainer = ({ children, ...props }) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer {...props}>
                    {!!children && (
                        <span style={{ position: "absolute", left: 0 }} className="team-placeholder-icon-box">
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

    const handleDropDownClose = (event) => {
        setTaskActionAnchorEl(null)
    };


    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        //Also check handleChange

        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if (!request && isSupportedFile(filesTemp[eachKey])) {
                // if (editFiles.length + fileList.length < allowedFileLength.current)
                if (filesTemp[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current) fileList.push(filesTemp[eachKey]);
                else Config.toast(singleFileSizeError.current, "error");
                // else
                // Config.toast(fileLengthErrMsg.current, 'error')
            } else if (request !== null) {
                if ((request === "tmx" && isSupportedFile(filesTemp[eachKey], request)) || (request === "tbx" && isSupportedFile(filesTemp[eachKey], request))) {
                    if (filesTemp[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current) fileList.push(filesTemp[eachKey]);
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
        height: 'auto',
        onClose: () => console.log(),
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        onClose: () => console.log(),
    };


    const assignmanagemodaloption = {
        closeMaskOnClick: false,
        width: 560,
        height: 'auto',
        onClose: () => console.log(),
    };

    const versioncontrolmodaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: () => console.log(),
    };

    /* Pagination content and logic */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages > 1) {
            let url = "/fil-upload/" + "?page=";
            /*Pagination logic starts*/
            if (page > 1)
                content.push(
                    <li key={"prevButton"} onClick={(e) => pageSelect(page - 1)}>
                        <img src={PaginationLeftArrow} />
                    </li>
                );
            content.push(
                <li key={1} className={currentPage == 1 ? "active-page" : ""} onClick={(e) => pageSelect(1)}>
                    {1}
                </li>
            );
            let isPrevDotsInserted = false;
            let isNextDotsInserted = false;
            let visibleNextPrevPages = 1;
            for (let i = 2; i < totalPages; i++) {
                if (i == currentPage || (i + visibleNextPrevPages >= currentPage && i - visibleNextPrevPages <= currentPage))
                    content.push(
                        <li key={i} className={currentPage == i ? "active-page" : ""} onClick={(e) => pageSelect(i)}>
                            {i}
                        </li>
                    );
                else if (i - visibleNextPrevPages <= currentPage) {
                    if (!isPrevDotsInserted) content.push(<li style={{ cursor: "context-menu" }} key={i}>...</li>);
                    isPrevDotsInserted = true;
                } else if (i + visibleNextPrevPages >= currentPage) {
                    if (!isNextDotsInserted) content.push(<li style={{ cursor: "context-menu" }} key={i}>...</li>);
                    isNextDotsInserted = true;
                }
            }
            content.push(
                <li key={totalPages} className={currentPage == totalPages ? "active-page" : ""} onClick={(e) => pageSelect(totalPages)}>
                    {totalPages}
                </li>
            );
            if (page < totalPages)
                content.push(
                    <li key={"nextButton"} onClick={(e) => pageSelect(page + 1)}>
                        <img src={PaginationRightArrow} />
                    </li>
                );
            /*Pagination logic ends*/
        }
        paginationTimeOut = setTimeout(() => {
            setPaginationContent(content);
        }, 100);
    };

   
    const editProject = (e = null, projectId, projectType, project) => {
        e.stopPropagation()
        // page information for redirecting to same page after updation is done.
        projectObject.current = project
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            orderBy: URL_SEARCH_PARAMS.get("order_by"),
            projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
            search: URL_SEARCH_PARAMS.get("search"),
            projectId: projectId,
            fromProjectList: true
        }
        if (projectType === 8) {
            setEditInstantProjectModal(true)
            storyProjectIdRef.current = projectId
            editStoryProject(e, projectId)
        }
    };


    useEffect(() => {
        selectedSteps?.map((each) => {
            each.steps === 1 ? setPostEditStep(true) : each.steps === 2 ? setProofReadStep(true) : setProofReadStep(false);
        });
    }, [selectedSteps]);

    const handleStepSelection = (selectedStepOptions) => {
        if (selectedStepOptions?.length === 0) {
            setPostEditStep(false);
            setProofReadStep(false);
        }
        if (selectedStepOptions?.length === 1) {
            if (selectedStepOptions[0].value === 1) {
                setPostEditStep(true);
                setProofReadStep(false);
            }
        }
        if (selectedStepOptions?.length === 2) {
            if (selectedStepOptions[1].value === 2) setProofReadStep(true);
        }
    };


    const editStoryProject = (e, projectId) => {
        e.stopPropagation()
        setSkeletonLoader(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            auth: true,
            success: (response) => {
                let { data } = response;
                setstoryProjectName(data.project_name)
                setHasTeam(data.team)
                setEditJobs(data.jobs);
                let editTargetLanguages = [];
                let tar = [];
                let tarID = [];

                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionsRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });
                let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                    (element) => element.id == data.jobs[0].source_language
                );
                // console.log(targetLanguageOptionsRef.current)
                // console.log(editSourceLanguage)
                setTimeout(() => {
                    setSourceLabel(editSourceLanguage?.language);
                    setSourceLanguage(editSourceLanguage?.id)
                    setTargetLanguage(editTargetLanguages);
                    setSkeletonLoader(false)
                }, 80);
            },
        });
    }

    const updateStoryProject = () => {
        let formdata = new FormData();
        setIsStoryProjUpdating(true)

        formdata.append("source_language", sourceLanguage);

        if (storyProjectName?.trim() === '') {
            Config.toast(t("enter_proj_name"))
            return;
        }

        formdata.append("project_name", storyProjectName?.trim());

        formdata.append("team", hasTeam);

        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formdata.append("target_languages", eachTargetLanguage?.id);
        });



        let list = "";
        targetLangListToRemove?.map((each, index) => {
            list += `${each.id}${index !== targetLangListToRemove.length - 1 ? "," : ""
                }`;
        });

        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${storyProjectIdRef.current}/${list?.length ? `?job_delete_ids=${list}` : ""}`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t("proj_updated_success"));
                setEditInstantProjectModal(false)
                setIsStoryProjUpdating(false)

                // update the word count and project name of the project
                const newArr = createdProjects?.map(obj => {
                    if (obj.id === storyProjectIdRef.current) {
                        return {
                            ...obj,
                            project_name: response.data.project_name,
                            project_analysis: { ...obj.project_analysis, proj_word_count: response.data.project_analysis.proj_word_count }
                        };
                    }
                    return obj;
                });
                setCreatedProjects(newArr)
                setCreatedProjectsList(newArr)
            },
			error: (err) => {
				setIsStoryProjUpdating(false)
			}
        });
    }


    /* Delete a project by id */
    const deleteStoryProject = () => {
        setIsStoryProjectDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${storyProjectIdRef.current}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                let filteredArr = createdProjects?.filter(each => each.id !== storyProjectIdRef.current)
                setShowStoryProjDeleteModal(false)
                setEditInstantProjectModal(false)
                setShowListingLoader(false);
                setIsStoryProjectDeleting(false)
                if (filteredArr?.length === 0) setEmptyProjects(true);
                setCreatedProjects(filteredArr)
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowStoryProjDeleteModal(false)
                    SetShowAssignedProjectDeleteAlert(true)
                    setIsStoryProjectDeleting(false)
                }
                setIsStoryProjectDeleting(false)
            }
        });
    };


    /* Handle MT Engine change */
    const handleMTEngineChange = (selectedOption) => {
        setSelectedMTEngine(selectedOption);
    };

    /* Handle Usage permission option change */
    const handleUsagePermissionChange = (selectedOption) => {
        setSelectedUsagePermission(selectedOption);
    };

    /* Handling the instruction popup */
    const handleInstructionModal = (e, taskId, eachRole) => {
        // e.stopPropagation()
        let selectedTask = selectedProjectFiles.find((element) => element.id === taskId);
        setInstructionText(eachRole?.instruction);
        setInstructionFile(eachRole?.instruction_files);
        // setTaskAssignInfoId(eachRole?.instruction_files[0]?.id);
        setShowAssignManageModal(true);
        setAnchorEl(null);
    };


    // unassign editor from task
    const unassignEditor = (e, taskId, stepId, project, is_reassigned) => {
        e.stopPropagation();

        // when an unassign api is calling don't let another api request
        if(editorUnassignData.isUnassigning) return

        setEditorUnassignData({
            task_id: taskId,
            isUnassigning: true
        })

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?task=${taskId}&step=${stepId}${is_reassigned !== null ? '&reassigned=True' : ''}`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                Config.toast(t("task_unassigned"));
                listFiles(project?.id)
                setEditorUnassignData({
                    task_id: null,
                    isUnassigning: false
                })
            },
            error: (err) => {
                setEditorUnassignData({
                    task_id: null,
                    isUnassigning: false
                })
            }
        });
    }

    /* Assinged details if assigned */
    const assignToProject = (e, projectId) => {
        e.stopPropagation()
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

    /* Starts when user stops typing */
    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 400);
    };

    /* Version control file upload, file select handling */
    const selectIntegrationFile = (isChecked, fileId, filename, branchId) => {
        let filesTemp = integrationFiles;
        if (isChecked) filesTemp.push({ id: fileId, filename: filename, branchId: branchId });
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
            let projectRows = document.getElementsByClassName("file-edit-list-table-row");
            if (projectRows[0]) {
                const isTasksOpened = projectRows[0].classList.contains("focused-proj-row");
                if (index === 0) {
                    if (!isTasksOpened)
                        // If the project is not yet opened
                        projectRows[0]?.click();
                    let openButton = null;
                    const waitForOpenButton = setInterval(() => {
                        // Wait for a particular element to be in the DOM
                        openButton = document.querySelector(".file-edit-list-inner-table-row button");
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
        } else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.IDLE].includes(status) || action === ACTIONS.CLOSE) {
            // Need to set our running state to false, so we can restart if we click start again.
            setIsProductTourSeen(true); //Tour seen
        }
    };

    const BeaconComponent = React.forwardRef((props, ref) => <div ref={ref} className="d-none"></div>);

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
    let role = ""
    let isAssignedProject = null;


    // get the PO pdf url
    const getPOPdf = (assignmentId) => {
        Config.axios({
            url: `${Config.BASE_URL}/aipay/po-pdf/?assignment_id=${assignmentId}`,
            auth: true,
            method: "GET",
            success: (response) => {
                if (response.status === 200) {
                    // console.log(response.data.url)
                    setPoPDFUrl(`${Config.BASE_URL}${response?.data?.url}`)
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
            },
        });
    }

    // task accept api 
    const taskAssignUpdate = (targetValue) => {
        // e.stopPropagation(); 
        // console.log(particularClickedTask)
        var formdata = new FormData();
        formdata.append("task_ven_status ", targetValue);
        formdata.append("task", particularClickedTask);
        formdata.append("step", stepToAccept);

        // console.log(isTaskReassigned.current)

        if (isTaskReassigned.current) {
            formdata.append("reassigned", 'True')
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            auth: true,
            method: "PUT",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    // console.log(response.data)
                    setShowPoModal(false)
                    listFiles(openedProjectId)
                    isTaskReassigned.current = false
                    // setAcceptedRates(response.data["Previously Agreed Rates"])
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
            },
        });
    }

    const handleAcceptBtn = (assignmentId, taskId, step, is_reassigned) => {
        setParticularClickedTask(taskId)
        setStepToAccept(step)
        getPOPdf(assignmentId)
        setShowPoModal(true)
        // console.log(is_reassigned)
        isTaskReassigned.current = typeof is_reassigned === 'boolean' ? true : false
    }

    // peoples circle
    const AssignInfoUiBox = (props) => {
        let { project, selectedProjectFile, eachRole } = props;
        // console.log(selectedProjectFile);
        // console.log(eachRole?.assigned_by_details?.avatar);
        // console.log(eachRole);

        // let editorProfile = (Config.userState?.id !== eachRole?.assign_to_details?.id && eachRole?.assign_to_details?.avatar)

        // console.log(eachRole);
        // let assigned_by_name = (Config.userState?.id === eachRole?.assigned_by_details?.id ? 
        //                     eachRole?.assigned_by_details?.name : 
        //                     eachRole?.assign_to_details?.name)

        // let assigned_to_name = (Config.userState?.id === eachRole?.assign_to_details?.id ? 
        //                     eachRole?.assign_to_details?.name :
        //                     eachRole?.assigned_by_details?.name)  

        // let editorEmail = (Config.userState?.id === eachRole?.assign_to_details?.id ? 
        //                     eachRole?.assigned_by_details?.email : 
        //                     eachRole?.assign_to_details?.email)


        let assigned_by_name = eachRole?.assigned_by_details?.name
        let assigned_to_name = eachRole?.assign_to_details?.name
        let assigned_to_isExternal = eachRole?.assign_to_details?.external_editor


        let assignedByOrAssignedTo = Config.userState?.id === eachRole?.assign_to_details?.id ? `${t("assigned_to")}:` : `${t("assigned_by")}:`

        let by_or_to = Config.userState?.id === eachRole?.assign_to_details?.id ? `${t("to_sm")}` : `${t("by")}`

        let editorProfile = (by_or_to === 'by' ? eachRole?.assign_to_details?.avatar : eachRole?.assigned_by_details?.avatar)

        // let assignBy = Config.userState?.id === eachRole?.assign_to_details?.id ? true : false
        let editorRole = eachRole?.task_assign_detail?.step === 1 ? t("editor") : t("reviewer")

        let stepId = eachRole?.task_assign_detail?.step === 1 ? 1 : eachRole?.task_assign_detail?.step === 2 && 2

        let assign_info = selectedProjectFile?.task_assign_info?.find(each => each.task_assign_detail.step === stepId)
        // console.log(assign_info);
        // console.log(eachRole);
        // && assign_info.task_assign_detail.task_status === "Completed"

        // console.log(assignedByOrAssignedTo)
        // console.log(by_or_to === 'by' ? assigned_by_name : assigned_to_name)

        return (
            <div className="assigned-member-info-wrapper" ref={assignedMemberCardRef}>
                <div className="assign-member-header-area">
                    <div className="header-info-area">
                        <div className="header-info-area-row">
                            <div className="image-or-no-avatar-wrap">
                                {
                                    (editorProfile !== null && editorProfile !== undefined) ?
                                        <img src={Config.BASE_URL + editorProfile} alt="profile-img" />
                                        :
                                        <span className="no-avatar">{by_or_to === 'by' ? assigned_to_name?.charAt(0)?.toUpperCase() : assigned_by_name?.charAt(0)?.toUpperCase()}</span>
                                }
                            </div>
                            <div className="name-info-area">
                                <h1>{by_or_to === 'by' ? assigned_to_name : assigned_by_name}</h1>
                                <p>{t("assigned_as")} <span>{editorRole}</span></p>
                            </div>
                        </div>
                        {/* || eachRole?.assign_to_details?.managers?.find(user => user !== userDetails.pk) */}
                        {(Config.userState?.id !== eachRole?.assign_to_details?.id) && (
                            <div className="header-btn-row flex-wrap">
                                {/* if agency show the approve and rework buttons until the LSP doesn't submit, and if not agency show approve and rework buttons only when the vendor step is completed */}
                                {((userDetails?.agency && !project?.assign_enable) ? (eachRole?.task_assign_detail?.task_status === 'Completed' && assign_info.task_assign_detail.task_status !== "Completed") : eachRole?.task_assign_detail?.task_status === 'Completed') && (   //|| eachRole?.task_assign_detail?.task_status === 'Return Request'
                                    <>
                                        {(eachRole?.task_assign_detail?.client_response !== 'Approved' && eachRole?.task_assign_detail?.client_response !== 'Close' && eachRole?.task_assign_detail?.task_status !== 'Return Request') && (
                                            <ButtonBase className="info-blue-btn" onClick={(e) => !isApproving && handleClientResponseButtons(1, eachRole, selectedProjectFile, project.id)}>
                                                {isApproving && <ButtonLoader />} {t("approve")}
                                            </ButtonBase>
                                        )}
                                        {(eachRole?.task_assign_detail?.client_response !== 'Rejected' && eachRole?.task_assign_detail?.client_response !== 'Close' &&  eachRole?.task_assign_detail?.client_response !== 'Approved') && (
                                            <ButtonBase className="info-grey-btn" onClick={(e) => handleClientResponseButtons(2, eachRole, selectedProjectFile, project.id)}>
                                                {t("rework")}
                                            </ButtonBase>
                                        )}
                                    </>
                                )}
                                <Tooltip className="dont-open-list" title={t("unassign")} placement="top" arrow>
                                    <ButtonBase className="icon-btn" onClick={(e) => { unassignEditor(e, selectedProjectFile?.id, stepId, project, selectedProjectFile?.task_reassign_info) }}>
                                        {(editorUnassignData?.isUnassigning && editorUnassignData?.task_id == selectedProjectFile?.id) ? (
                                            <CircularLoader size={18} sx={{ color: '#474848'}} />
                                        ) : (
                                            <PersonRemoveOutlinedIcon className="remove-person-icon" />
                                        )}
                                    </ButtonBase>
                                </Tooltip>
                                <Tooltip className="dont-open-list" title={t("edit")} placement="top" arrow>
                                    <ButtonBase className="icon-btn" onClick={(e) => { editAssignedTask(e, project, selectedProjectFile, eachRole?.job, stepId) }}>
                                        <EditOutlinedIcon className="edit-icon" />
                                    </ButtonBase>
                                </Tooltip>
                                {(eachRole.task_ven_status == null && assigned_to_isExternal) && (
                                    <span style={{ marginLeft: 'auto' }} className="word-count-capsule"><span>{t("not_yet_accepted")}</span></span>
                                )}
                                {eachRole.task_ven_status == 'change_request' && (
                                    <span
                                        style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                        className="change-request-button"
                                        onClick={() => { setShowVendorChangeRequestModal(true); setVendorChangeRequestReason(eachRole.change_request_reason) }}
                                    >
                                        <img src={ChangeRequestIcon} alt="change-request" />
                                        <span style={{ marginLeft: '7px' }}>{t("change_request")}</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="assign-member-more-info">
                    <div className="more-info-row">
                        <div className="more-info-item">
                            <div className="assigned-title-area">
                                <p>{assignedByOrAssignedTo}</p>
                            </div>
                            <div className="assigned-value-area">
                                <div className="assigned-member-name">
                                    <span>{by_or_to === 'by' ? assigned_by_name?.slice(0, 2)?.toUpperCase() : assigned_to_name?.slice(0, 2)?.toUpperCase()}</span>
                                    <p className="name">{by_or_to === 'by' ? assigned_by_name : assigned_to_name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="more-info-item">
                            <div className="assigned-title-area">
                                <p>{t("due_date")}</p>
                            </div>
                            <div className="assigned-value-area">
                                <div className="assigned-member-name">
                                    <TimerOutlinedIcon className="timer-icon" />
                                    <p className="time">{eachRole?.deadline !== null ? Config.getProjectCreatedDate(eachRole?.deadline) : "N/A"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="more-info-item">
                            <div className="assigned-title-area">
                                <p>{t("status")}</p>
                            </div>
                            <div className="assigned-value-area news-proj">
                                <div className="assigned-status-details">
                                    <div className={
                                        eachRole?.task_assign_detail?.task_status?.toLowerCase() == "completed" ?
                                            "status-indicator-completed"
                                            : eachRole?.task_assign_detail?.task_status.toLowerCase() == "in progress"
                                                ? "status-indicator-in-progress-color"
                                                : "status-indicator-created"
                                    }></div>
                                    <p>
                                        {
                                            eachRole?.task_assign_detail?.task_status === 'Completed' ? t("submitted") :
                                                eachRole?.task_assign_detail?.task_status === 'Return Request' ? t("declined") :
                                                    eachRole?.task_assign_detail?.task_status
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* condition for not showing the work status to editors  */}
                        {/* && Config.userState?.id !== eachRole?.assign_to_details?.id */}
                        {(eachRole?.task_assign_detail?.client_response && Config.userState?.id !== eachRole?.assign_to_details?.id) && (
                            <div className="more-info-item">
                                <div className="assigned-title-area">
                                    <p>{t("work")}</p>
                                </div>
                                <div className="assigned-value-area">
                                    <div className="assigned-status-details">
                                        <div className={
                                            eachRole?.task_assign_detail?.client_response?.toLowerCase() == "approved" ?
                                                "status-indicator-approved"
                                                : eachRole?.task_assign_detail?.client_response.toLowerCase() == "rejected"
                                                    ? "status-indicator-in-progress-color"
                                                    : "status-indicator-created"
                                        }></div>
                                        <p>
                                            {
                                                eachRole?.task_assign_detail?.client_response === 'Rejected' ? t("rework") : 
                                                selectedProjectFile?.push_detail ? t("pushed") : eachRole?.task_assign_detail?.client_response
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* { 
                        
                            Config.userState?.id === eachRole?.assign_to_details?.id && (
                            (eachRole?.instruction !== "" || eachRole?.instruction_files.length !== 0) && */}
                        {
                            (eachRole?.instruction !== "" || eachRole?.instruction_files.length !== 0) && (
                                <div className="more-info-item">
                                    <div className="assigned-title-area">
                                        <p>{t("instruction")}</p>
                                    </div>
                                    <div className="assigned-value-area">
                                        <p className="link" onClick={(e) => { handleInstructionModal(e, selectedProjectFiledID?.id, eachRole) }}>{t("view_information")}</p>
                                    </div>
                                </div>
                            )
                        }
                        {/* )} */}
                    </div>
                </div>
            </div>
        )
    }

    // download source audo file 
    const downloadSourceAudioFile = async (taskID) => {
        let url = `${Config.BASE_URL}/workspace/download_text_to_speech_source/?task=${taskID}`
        const response = await Config.downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    }

    const openAilaysaWriter = (projectID, taskID, assignToMe = false) => {
        history(`word-processor/?project=${projectID}&transcription-task=${taskID}`, {state: {
            assignToMe,
            prevPageInfo: {
                pageNo: URL_SEARCH_PARAMS.get("page"),
                orderBy: URL_SEARCH_PARAMS.get("order_by"),
                projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
                search: URL_SEARCH_PARAMS.get("search"),
                projectId: projectID,
                fromProjectList: true
            },
            prevPath: location.pathname + location.search
        }});
    }

    const handleDocumentSubmit = (taskID, step) => {
        let formData = new FormData();
        formData.append("task", taskID);
        formData.append("step", step);
        formData.append("status", "3"); // submit: 3, in-progress: 2

        if (documentSubmitParameters?.isTaskReassigned) {
            formData.append("reassigned", 'True')
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                listFiles(openedProjectId)
                setShowSubmitDocumentAlertModal(false)
                setDocumentSubmitParameters({ ...documentSubmitParameters, isTaskReassigned: false })
                Config.toast(t("document_submitted"))
            }
        });
    }

    useEffect(() => {
        if (documentSubmitParameters?.taskid !== null) {
            getDocumentProgress(documentSubmitParameters?.confirm, documentSubmitParameters?.total)
        }
    }, [documentSubmitParameters])


    const getDocumentProgress = (confirmed, total) => {
        if (confirmed == total) {
            handleDocumentSubmit(documentSubmitParameters?.taskid, documentSubmitParameters?.step)
        }
        else {
            setShowSubmitDocumentAlertModal(true)
        }
    }

    const handleDocuemtSubmitConfirmation = () => {
        handleDocumentSubmit(documentSubmitParameters?.taskid, documentSubmitParameters?.step)
    }

    useEffect(() => {
        if (location.state?.documentLock !== undefined) {
            let documentLockReason = location?.state?.documentLock
            Config.toast(`${documentLockReason}`, 'warning')
        }
    }, [location.state?.documentLock])


    const transcribeAudioFile = (projectID, taskID, key) => {
        let formdata = new FormData();
        formdata.append("task", taskID);
        setClickedOpenButton(key);
        Config.axios({
            url: `${Config.BASE_URL}/workspace/transcribe_file/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                if (response.status === 200) {
                    Config.toast(t("audio_file_transcribed"))
                    setClickedOpenButton(null)
                    listFiles(projectID)
                }
                getCreditStatus();
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true)
                        setClickedOpenButton(null)
                    }
                    if (err.response.data?.msg?.includes('Transcription is ongoing.')) {
                        setShowProcessingModal(true)
                        setIsTranscribing(true)
                        setClickedOpenButton(null)

                        setTranscriptionTaskList([])
                        Config.axios({
                            url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${selectedProjectIdRef.current}`,
                            auth: true,
                            success: (statusResponse) => {
                                const newArr = selectedProjectFilesRef.current?.map(obj => {
                                    if (obj.id === statusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                                        return {
                                            ...obj,
                                            pre_trans_processing: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                                            // progress: {
                                            //     confirmed_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.confirmed_segments : 0,
                                            //     total_segments: statusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? statusResponse.data.res?.find(each => each.task === obj.id)?.progress?.total_segments : 0
                                            // }
                                        };
                                    }
                                    return obj;
                                });
                                // console.log(newArr)
                                setSelectedProjectFiles(newArr)
                                let canOpenFiles = statusResponse.data.res?.filter(each => each.open == 'True')
                                if (statusResponse.data.res?.length !== canOpenFiles?.length) {
                                    setTranscriptionTaskList(statusResponse.data.res)
                                }
                            },
                            error: (err) => {

                            }
                        });

                        setTimeout(() => {
                            setTextToSpeechConvert(false)
                            setShowProcessingModal(false)
                            setIsTranscribing(false)
                        }, 4000);

                        // setTranscriptionTaskList([])
                        // Config.axios({
                        //     url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${selectedProjectIdRef.current}`,
                        //     auth: true,
                        //     success: (voiceStatusResponse) => {
                        //         const newArr = selectedProjectFilesRef.current.data?.map(obj => {
                        //             // console.log(statusResponse.data.res?.find(each => each.task === obj.id)?.task)
                        //             if (obj.id === voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                        //                 return {
                        //                     ...obj, 
                        //                     pre_trans_processing: voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                        //                 };
                        //             }
                        //             return obj;
                        //         });
                        //         console.log(newArr)
                        //         setSelectedProjectFiles(newArr)
                        //         let canOpenFiles = voiceStatusResponse.data.res?.filter(each => each.open == 'True')
                        //         if(voiceStatusResponse.data.res?.length !== canOpenFiles?.length){
                        //             setTranscriptionTaskList(voiceStatusResponse.data.res)
                        //         }
                        //     },
                        //     error: (err) => {

                        //     }
                        // });
                    }
                }
                getCreditStatus();
            }
        });
    }

    const convertSourceFileToAudio = (taskid) => {
        setClickedOpenButton(taskid)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/convert_text_to_speech_source/?task=${taskid}`,
            auth: true,
            success: (response) => {
                // console.log(response.data?.source_audio_file)
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === taskid) {
                        return { ...obj, audio_file_url: response.data?.source_audio_file };
                    }
                    return obj;
                });
                // console.log(newArr)
                setSelectedProjectFiles(newArr)
                setClickedOpenButton(null)
                getCreditStatus();
            },
            error: (err) => {
                if (err.response.data?.msg?.includes('Insufficient Credits')) {
                    setShowCreditAlertModal(true)
                    setClickedOpenButton(null)
                }
                if (err.response.data?.msg !== undefined && err.response.data?.msg?.includes('Text to Speech conversion ongoing')) {
                    setShowProcessingModal(true)
                    setTextToSpeechConvert(true)
                    setClickedOpenButton(null)
                    setTimeout(() => {
                        setTextToSpeechConvert(false)
                        setShowProcessingModal(false)
                        setShowProcessingModal(false)
                    }, 4000);
                } else {
                    Config.toast('Download failed', 'error')
                    setClickedOpenButton(null)
                }
                getCreditStatus();
                // Config.toast('Download failed', 'error')
            }
        });
    }

    const handlePartialPretranslateClose = () => {
        setPartialPretranslate(false)
        let lastPageAvailable = localStorage.getItem(openFileId.current)
        if (lastPageAvailable) {
            history(lastPageAvailable);
        } else {
            history("workspace/" + openFileId.current, {state: { partial: true }});
        }
    }


    // get analysied report for project and its task (project analysis)
    const handleShowAnalysisModal = (e, projectID, callback = false) => {
        e?.stopPropagation();
        setProjectAnalysisedData(null)
        if (!callback) {
            projectAnalysisTempProjectId.current = projectID
        }
        projectAnalysisApiCounter.current++
        // console.log(projectID)
        Config.axios({
            url: `${Config.BASE_URL}/tm/project_analysis/${projectID}`,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                let {
                    payable_rate,
                    project_wwc,
                    task_wwc
                } = response.data

                let payable_rates = {
                    info: {
                        id: payable_rate?.id,
                        is_default: payable_rate?.is_default,
                        base_rate: payable_rate?.base_rate,
                        user: payable_rate?.user
                    },
                    rateData: {
                        key1: t("payable_rate"),
                        key2: '100',
                        key3: payable_rate?.tm_repetition_percentage,
                        key4: payable_rate?.tm_50_74_percentage,
                        key5: payable_rate?.tm_75_84_percentage,
                        key6: payable_rate?.tm_85_94_percentage,
                        key7: payable_rate?.tm_95_99_percentage,
                        key8: payable_rate?.tm_100_percentage,
                        key9: payable_rate?.tm_101_percentage,
                        key10: payable_rate?.tm_102_percentage,
                    }
                }

                let project = []
                project_wwc?.map(each => {
                    project.push({
                        projectInfo: {
                            project_id: each?.project_id,
                            project_name: each?.project_name
                        },
                        projectWordData: {
                            key1: each?.raw_total,
                            key2: each?.weighted,
                            key3: each?.new,
                            key4: each?.repetition,
                            key5: each?.tm_50_74,
                            key6: each?.tm_75_84,
                            key7: each?.tm_85_94,
                            key8: each?.tm_95_99,
                            key9: each?.tm_100,
                            key10: each?.tm_101,
                            key11: each?.tm_102,
                        },
                        projectCharData: {
                            key1: each?.char_raw_total,
                            key2: each?.weighted_char,
                            key3: each?.char_new,
                            key4: each?.char_repetition,
                            key5: each?.char_tm_50_74,
                            key6: each?.char_tm_75_84,
                            key7: each?.char_tm_85_94,
                            key8: each?.char_tm_95_99,
                            key9: each?.char_tm_100,
                            key10: each?.char_tm_101,
                            key11: each?.char_tm_102,
                        }
                    })
                })


                let task = []
                task_wwc?.map(each => {
                    let charData = each?.char_detail
                    task.push({
                        taskInfo: {
                            task_id: each.task_id,
                            file_name: each.task_file,
                            lang_pair: each.task_lang_pair,
                        },
                        taskWordData: {
                            key1: each?.raw_total,
                            key2: each?.weighted,
                            key3: each?.new_words,
                            key4: each?.repetition,
                            key5: each?.tm_50_74,
                            key6: each?.tm_75_84,
                            key7: each?.tm_85_94,
                            key8: each?.tm_95_99,
                            key9: each?.tm_100,
                            key10: each?.tm_101,
                            key11: each?.tm_102
                        },
                        taskCharData: {
                            key1: charData?.raw_total,
                            key2: charData?.weighted_char,
                            key3: charData?.new_words,
                            key4: charData?.repetition,
                            key5: charData?.tm_50_74,
                            key6: charData?.tm_75_84,
                            key7: charData?.tm_85_94,
                            key8: charData?.tm_95_99,
                            key9: charData?.tm_100,
                            key10: charData?.tm_101,
                            key11: charData?.tm_102
                        }
                    })
                })
                setProjectAnalysisedData({ payable_rates, project, task })
            },
            error: (err) => {
                if (err.response?.status === 401) {
                    setTimeout(() => {
                        // console.log(projectAnalysisTempProjectId.current)
                        if (projectAnalysisApiCounter.current <= 10) {
                            handleShowAnalysisModal(e, projectAnalysisTempProjectId.current, true)
                        } else {
                            setShowProjectAnalysis(false)
                        }
                    }, 6000);

                }
            }
        });
    }

    // project analysis whole project excel with task download
    const downloadProjectAnalysisReport = async (e, projectID) => {
        e.stopPropagation()
        let url = `${Config.BASE_URL}/tm/get_report/?project_id=${projectID}`
        // let url = `${Config.BASE_URL}/tm/get_report/?task_id=${taskID}` // project analysis task excel download
        const response = await Config.downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    }


    // download convert docx file 
    const downloadConvertDocxFile = async (taskID) => {
        let url = `${Config.BASE_URL}/exportpdf/docx_file_download/?task_id=${taskID}`
        const response = await Config.downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    }


    const convertPdfToDocxFromTask = (taskId, projectId) => {
        setClickedOpenButton(taskId)
        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convert_pdf_from_task/${taskId}/`,
            method: 'POST',
            auth: true,
            success: (response) => {
                // console.log(response.data);
                checkPdfConversionStatus(taskId, projectId, 'first')
                getCreditStatus();
                setClickedOpenButton(null)
            },
            error: (err) => {
                if (err.response?.data?.msg?.includes('Insufficient Credits')) {
                    setShowCreditAlertModal(true)
                    setClickedOpenButton(null)
                }
                if (err.response?.data?.msg?.includes('File Cannot be Processed')) {
                    Config.toast(t("file_is_corrupted"), 'error')
                    listFiles(projectId)
                    // console.log(newArr)
                }
                setClickedOpenButton(null)
                // else{
                //     Config.toast('Conversion failed', 'error')
                //     setClickedOpenButton(null)
                // }
                // getCreditStatus();
            }
        });
    }

    const checkPdfConversionStatus = (taskId, projectId, isFrist) => {
        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/?task=${taskId}`,
            auth: true,
            success: (response) => {
                // console.log(response.data);
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === taskId) {
                        return {
                            ...obj,
                            isPDFConverting: true
                        };
                    }
                    return obj;
                });
                // console.log(newArr)
                setSelectedProjectFiles(newArr)
                setClickedOpenButton(null)
                
                if(isFrist){
                    if (response.data?.status === '') {
                        convertPdfToDocxFromTask(taskId, projectId)
                    }
                    else if (response.data?.status === 'YET TO START') {
                        setShowProcessingModal(true)
                        setTextToSpeechConvert(true)
                        setTimeout(() => {
                            setShowProcessingModal(false)
                            setTextToSpeechConvert(false)
                        }, 4000);
                        setTimeout(() => {
                            checkPdfConversionStatus(taskId)
                        }, 4000);
                    }
                    else if (response.data?.status == 'PENDING') {
                        setShowProcessingModal(true)
                        setTextToSpeechConvert(true)
                        setTimeout(() => {
                            setShowProcessingModal(false)
                            setTextToSpeechConvert(false)
                        }, 4000);
                        setTimeout(() => {
                            checkPdfConversionStatus(taskId)
                        }, 4000);
                    } else if (response.data?.status == 'ERROR') {
                        const newArr = selectedProjectFiles?.map(obj => {
                            if (obj.id === taskId) {
                                return {
                                    ...obj,
                                    isPDFConverting: false
                                };
                            }
                            return obj;
                        });
                        // console.log(newArr)
                        setSelectedProjectFiles(newArr)
                        setClickedOpenButton(null)
                    } else if (response.data?.status == 'DONE') {
                        const newArr = selectedProjectFiles?.map(obj => {
                            if (obj.id === taskId) {
                                return {
                                    ...obj, 
                                    open_in: response.data?.pdf_api_use, 
                                    converted: true,
                                    isPDFConverting: false
                                };
                            }
                            return obj;
                        });
                        // console.log(newArr)
                        setSelectedProjectFiles(newArr)
                        setClickedOpenButton(null)
                    }
                }else{
                    if (response.data?.status === 'YET TO START') {
                        setTimeout(() => {
                            checkPdfConversionStatus(taskId)
                        }, 4000);
                    }
                    else if (response.data?.status == 'PENDING') {
                        setTimeout(() => {
                            checkPdfConversionStatus(taskId)
                        }, 4000);
                    } else if (response.data?.status == 'ERROR') {
                        const newArr = selectedProjectFiles?.map(obj => {
                            if (obj.id === taskId) {
                                return {
                                    ...obj,
                                    isPDFConverting: false
                                };
                            }
                            return obj;
                        });
                        // console.log(newArr)
                        setSelectedProjectFiles(newArr)
                        setClickedOpenButton(null)
                    } else if (response.data?.status == 'DONE') {
                        const newArr = selectedProjectFiles?.map(obj => {
                            if (obj.id === taskId) {
                                return {
                                    ...obj, 
                                    open_in: response.data?.pdf_api_use, 
                                    converted: true,
                                    isPDFConverting: false
                                };
                            }
                            return obj;
                        });
                        // console.log(newArr)
                        setSelectedProjectFiles(newArr)
                        setClickedOpenButton(null)
                    }
                }
            }
        });
    }

    const openWriter = (id, name, projectId) => {
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            orderBy: URL_SEARCH_PARAMS.get("order_by"),
            projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
            search: URL_SEARCH_PARAMS.get("search"),
            projectId: projectId,
            fromProjectList: true
        }
        history(`/word-processor?task=${id}`, {state: {
            docName: name,
            projectId,
            prevPageInfo,
            prevPath: location.pathname + location.search
        }})
    }

    const translateFromPdfTask = (taskId, projectId) => {
        setIsPdfTranslating(true)
        let formdata = new FormData();

        formdata.append("pdf_task_id", taskId);

        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                if (response.data?.id) {
                    Config.toast(t("translation_task_created"))
                    listFiles(response.data?.id)
                    setIsPdfTranslating(false)
                }
            },
            error: (err) => {
                setIsPdfTranslating(false)
            }
        });
    }

    const handleTaskDeleteButton = (e, project_id, taskId, taskAssignInfo) => {
        e.preventDefault()
        setMoreEl(false)
        // e.stopPropagation()

        // console.log(project_id)
        // console.log(taskId)
        // console.log(taskAssignInfo)
        taskDeleteParam.current = {
            project_id: project_id,
            taskId: taskId
        }
        if (taskAssignInfo !== null) {
            taskDeleteFunction()
        } else {
            setShowTaskDeleteAlert(true)
        }

    }

    const taskDeleteFunction = () => {
        setIsTaskDeleting(true)

        Config.axios({
            url: `${Config.BASE_URL}/workspace/tasks/${taskDeleteParam.current?.taskId}/`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                setIsTaskDeleting(false)
                if (selectedProjectFiles?.length === 1) {
                    Config.toast(t("deleted_success"));
                    setCreatedProjects(createdProjects?.filter(each => each.id !== taskDeleteParam.current?.project_id))
                    if (createdProjects?.filter(each => each.id !== taskDeleteParam.current?.project_id)?.length === 0) setEmptyProjects(true);
                } else {
                    Config.toast(t("task_deleted_success"));
                }
                setSelectedProjectFiles(selectedProjectFiles?.filter(each => each.id !== taskDeleteParam.current?.taskId))
                setShowTaskDeleteAlert(false)
            },
            error: (err) => {
                if (err.response?.status === 400) {
                    if (err.response?.data?.Message?.includes('Unassign')) {
                        setShowTaskDeleteAlert(true)
                        setUnassignTaskDeleteAlert(true)
                        setIsTaskDeleting(false)
                    }
                }
                setIsTaskDeleting(false)
            }
        });
    }


    const focusTargetLangDiv = () => {
        if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    }

    const getVoiceTranscribeTaskStatus = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${projectId}`,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                // const newArr = selectedProjectFiles?.map(obj => {
                //     // console.log(response.data.res?.find(each => each.task === obj.id)?.task)
                //     if (obj.id === response.data.res?.find(each => each.task === obj.id)?.task) {
                //       return {...obj, pre_trans_processing: response.data.res?.find(each => each.task === obj.id)?.open};
                //     }
                //     return obj;
                // });
                // // console.log(newArr)
                // setSelectedProjectFiles(newArr)
            },
            error: (err) => {

            }
        });
    }

    // MT-Raw file download celery status check function
    const mtRawCeleryCheck = async (celeryId, documentId, task_id, uniqueKey) => {
        // setAnimateDownloding('MTRAW')
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        try {
            const response = await axios.get(
                `${Config.BASE_URL}/workspace_okapi/download_mt_file/?celery_id=${celeryId}&document_id=${documentId}`,
                {
                    responseType: "blob",
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            if (response !== undefined) {

                // update the list once download completed
                dispatch(updateDownloadingFile({ id: uniqueKey, status: 2 }))

                setTimeout(() => {
                    // remove the downloaded file from list
                    dispatch(deleteDownloadingFile({ id: uniqueKey }))
                }, 8000);

                Config.downloadFileInBrowser(response)

                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === task_id) {
                        return {
                            ...obj,
                            isTaskDownloading: null
                        };
                    }
                    return obj;
                });
                setSelectedProjectFiles(newArr)
                // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== task_id)
                setIsDownloading(false)
            }
        } catch (err) {
            // console.log(JSON.parse(await err.response.data.text()))
            let responseObj = JSON.parse(await err.response.data.text())
            if (err.response.status === 400) {
                if (responseObj?.msg?.includes('Pending')) {
                    mtRawCeleryTimeOutRef.current = setTimeout(() => {
                        mtRawCeleryCheck(celeryId, documentId, task_id, uniqueKey)
                    }, 8000);
                } else {
                    setTimeout(() => {
                        mtRawDownloadRetryCounter.current++
                        if (mtRawDownloadRetryCounter.current < mtRawDownloadRetryLimit.current) {
                            dispatch(deleteDownloadingFile({ id: uniqueKey }))
                            downloadDifferentFile('MTRAW', documentId, null, null, task_id)
                        } else {
                            dispatch(deleteDownloadingFile({ id: uniqueKey }))
                            // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== task_id)
                            setIsDownloading(false)
                        }
                    }, 8000);
                }
            }
        }
    }


    /* Download different type of output files */
    const downloadDifferentFile = async (type, documentId, e, key = null, id = null, url = "", isFirstOpen, openIn, projectName, project_id, projectType, taskFileName, taskData) => {
        setMoreEl(false)
        setSubDownloadOption(false)
        // if task is not opened (document id - null)
        if (documentId == null && openIn !== "News") {
            openFile(
                e,
                key,
                id,
                url,
                isFirstOpen,
                openIn,
                projectName,
                project_id,
                projectType,
                "task-download",
                type,
                taskFileName
            )
            return;
        }

        if (docCreditCheckAlertRef.current && type === 'MTRAW') {
            setShowDocCreditCheckAlert(true)
            downloadDiffFilesParamRef.current = { type, documentId, e, key, id, url, isFirstOpen, openIn, projectName, project_id, projectType, taskFileName, taskData }
            return;
        }

        let uniqueKey = generateKey()

        const newArr = selectedProjectFiles?.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    isTaskDownloading: type
                };
            }
            return obj;
        });
        setSelectedProjectFiles(newArr)
        setIsDownloading(true)
        // downloadingFilesList.current.push(id)

        // add in download list
        dispatch(addDownloadingFiles(
            {
                id: uniqueKey,
                file_name: taskFileName?.split('.')[0],
                ext: (type === 'ORIGINAL' || type === 'MTRAW' || type === 'SOURCE') ? `.docx` :
                    type === 'BILINGUAL' ? '.xlsx' : type === 'TMX' ? '.tmx' : type === 'XLIFF' ? '.xliff' : '',
                status: type !== 'MTRAW' ? 1 : 3    // 1 for downloading and 3 for processing
            }
        ))

        try {
            let url = openIn !== "News" ? `${Config.BASE_URL}/workspace_okapi/document/to/file/${documentId}?output_type=${type}` :
            `${Config.BASE_URL}/workspace_okapi/download_federal_file/?task_id=${taskData?.id}&output_type=${type}`

            const response = await Config.downloadFileFromApi(url);

            if (response !== undefined) {

                // update the list once download completed
                dispatch(updateDownloadingFile({ id: uniqueKey, status: 2 }))

                Config.downloadFileInBrowser(response)

                setTimeout(() => {
                    // remove the downloaded file from list
                    dispatch(deleteDownloadingFile({ id: uniqueKey }))
                }, 8000);

                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === id) {
                        return {
                            ...obj,
                            isTaskDownloading: null
                        };
                    }
                    return obj;
                });
                // console.log(newArr)
                setSelectedProjectFiles(newArr)
                // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== id)
                setIsDownloading(false)
            }
        } catch (err) {
            // console.log(JSON.parse(await err.response.data.text()))
            let responseObj = JSON.parse(await err.response.data.text())
            if (err.response.status === 400) {
                if (responseObj?.celery_id) {
                    mtRawCeleryCheck(responseObj?.celery_id, documentId, id, uniqueKey)
                } else {
                    if (responseObj?.msg?.includes('under process')) {
                        Config.toast(t("file_is_under_process"), 'warning')
                    } else {
                        Config.toast(t("download_failed"), 'error')
                    }
                    const newArr = selectedProjectFiles?.map(obj => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                isTaskDownloading: null
                            };
                        }
                        return obj;
                    });
                    setSelectedProjectFiles(newArr)
                    dispatch(deleteDownloadingFile({ id: uniqueKey }))
                    // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== id)
                    setIsDownloading(false)
                }
            } else if (err.response.status === 409) {
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === id) {
                        return {
                            ...obj,
                            isTaskDownloading: null
                        };
                    }
                    return obj;
                });
                // console.log(newArr)
                Config.toast(t("something_wrong_file_process"), 'warning')
                setSelectedProjectFiles(newArr)
                dispatch(deleteDownloadingFile({ id: uniqueKey }))
                // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== id)
                setIsDownloading(false)
            } else {
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === id) {
                        return {
                            ...obj,
                            isTaskDownloading: null
                        };
                    }
                    return obj;
                });
                setSelectedProjectFiles(newArr)
                dispatch(deleteDownloadingFile({ id: uniqueKey }))
                setIsDownloading(false)
                Config.toast(t("download_failed"), 'error')
            }
        }
    };

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // clearTimeout(mtRawCeleryTimeOutRef.current)
            // Navigate to the previous blocked location with your navigate function
            history(lastLocation.pathname)
        }
    }, [confirmedNavigation, lastLocation])

    const handleBlockedNavigation = (nextLocation) => {

        if (!confirmedNavigation && window.location.pathname) {
            setLastLocation(nextLocation)
            if (nextLocation.hash != "#!" && nextLocation.search == '') {
                setNavigationModalVisible(true)
                return false
            }
            if (nextLocation.state === null && nextLocation.search == '') {
                setNavigationModalVisible(true)
                return false
            }
        }
    }

    const handleConfirmNavigationClick = () => {
        setNavigationModalVisible(false)
        setConfirmedNavigation(true)
    }

    const handleMtOnyDownloadYes = () => {
        let { type, documentId, e, key, id, url, isFirstOpen, openIn, fileName, project_id, projectType, taskFileName } = downloadDiffFilesParamRef.current
        setShowDocCreditCheckAlert(false);
        docCreditCheckAlertRef.current = null
        downloadDifferentFile(type, documentId, e, key, id, url, isFirstOpen, openIn, fileName, project_id, projectType, taskFileName)
    }

    const handleGeneralPurposeOpenBtn = (project, eachRole, task) => {
        if (Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) {
            taskDetailsForDeadlineCrossedTask.current = {
                task_id: task.id,
                step: eachRole?.task_assign_detail?.step,
                reassign: task.task_reassign_info !== null ? true : false,
            }
            setShowDeadlineCrossedModal(true)
        } else {
            setShowPOConfirmModal(true)
            projectIdForPOModal.current = project.id
            projectTypeForPOModal.current = project.get_project_type
        }
    }

    const handleOpenDrpDownClose = (event) => {
        if (downloadAnchorRef.current && downloadAnchorRef.current.contains(event.target)) {
            return;
        }
        setDownloadOpen(false);
    };

    const handleDrpDownToggle = (e) => {
        e.stopPropagation()
        setDownloadOpen((prevOpen) => !prevOpen);
    };

    const handleOpenAsButton = (e, key = null, id = null, url = "", isFirstOpen, openIn, fileName, project_id, projectType, from, downloadType, taskFileName, open_as, assignInfo, taskData) => {
        let step = open_as === 'editor' ? 1 : 2
        let isTaskAccepted = assignInfo?.find(each => each.task_assign_detail.step === step && each.task_ven_status === "task_accepted") ? true : false
        let stepData = assignInfo?.find(each => each.task_assign_detail.step === step && each.task_ven_status === "task_accepted")

        // console.log(assignInfo);

        if (isTaskAccepted) {
            // if(!stepData?.task_assign_detail?.can_open){
            //     Config.toast(`${step === 1 ? 'Reviewer' : 'Editor'} is working!!!`, 'warning')
            //     // return;
            // }
            openFile(
                e,
                key,
                id,
                url,
                isFirstOpen,
                openIn,
                fileName,
                project_id,
                projectType,
                from,
                downloadType,
                taskFileName,
                open_as
            )
        } else {
            let eachRole = assignInfo?.find(each => each.task_assign_detail.step === step)
            if (Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) {
                taskDetailsForDeadlineCrossedTask.current = {
                    task_id: id,
                    step: step = open_as === 'editor' ? 1 : 2,
                    reassign: taskData.task_reassign_info !== null ? true : false,
                }
                setShowDeadlineCrossedModal(true)
            } else {
                setShowPOConfirmModal(true)
                projectIdForPOModal.current = project_id
                projectTypeForPOModal.current = projectType
            }
        }
    }

    // function for customer side so that customer can approve or reject the task
    const clientSideTaskResponseUpdate = () => {
        let { task_id, response, step, reassign, project_id } = clientResponseDataRef.current
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
                        Config.toast(`${step === 1 ? t('editing') : t('reviewing')} ${t("step_approved")}`)
                        if(isDinamalar){
                            // history("/my-stories?page=1&filter=inprogress")
                            listProjects()
                        }else{
                            listFiles(project_id)
                        }
                    } else if (response === 2) {
                        Config.toast(`${t("rework_initiate")}`)
                        listFiles(project_id)
                    }
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
                setIsReworkSending(false)
                setShowTaskReworkReasonModal(false)
            },
            error: (err) => {
                setIsApproving(false)
                setIsReworkSending(false)
            }
        });
    }

    // store the parameters in ref for easy accessiblity
    const handleClientResponseButtons = (response, eachRole, task, projectId) => {
        clientResponseDataRef.current = {
            response: response,
            step: eachRole?.task_assign_detail?.step,
            task_id: task.id,
            reassign: task.task_reassign_info !== null ? true : false,
            project_id: projectId
        }
        clientSideTaskResponseUpdate()
    }

    const getPODetailsForTask = (task_id) => {
        setMoreEl(false)
        Config.axios({
            url: `${Config.BASE_URL}/aipay/po/?task=${task_id}`,
            auth: true,
            success: (response) => {
                // console.log(response);
                setPOFilesDetails(response.data)
                setShowPOFilesModal(true)
            },
            error: (err) => { }
        });
    }

    const sendExtendTaskDeadlineRequest = () => {
        // console.log(taskDetailsForDeadlineCrossedTask.current);
        let { task_id, step, reassign } = taskDetailsForDeadlineCrossedTask.current

        var formdata = new FormData();
        formdata.append("task", task_id);
        formdata.append("step", step);
        formdata.append("reassigned", reassign ? 'True' : 'False')

        setIsDeadlineExtendReqSending(true)

        Config.axios({
            url: `${Config.BASE_URL}/workspace/send_msg_extend_deadline/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (api_response) => {
                if (api_response.status === 200) {
                    Config.toast(`${t("deadline_req_sent")}`)
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
                setIsDeadlineExtendReqSending(false)
                setShowDeadlineCrossedModal(false)
            },
            error: (err) => {
                setIsDeadlineExtendReqSending(false)
            }
        });
    }

    const MoreOptionsIcon = (props) => {
        let { selectedProjectFile, project, key, onlyDelete, disabled } = props
        return (
            <div className="more-options-wrap" style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
                <ButtonBase onClick={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                    <>
                        <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                            <ul>
                                {
                                    moreOptions?.filter(each => each.id === 2)?.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className="list-item"
                                                onClick={(e) =>
                                                    item?.label === 'Delete' ? handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info) :
                                                        item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                }
                                                style={selectedProjectFile?.pre_trans_processing ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                onMouseEnter={item.arrow_icon ? ((e) => handleSubDownloadOption(e)) : ((e) => handleSubDownloadOptioHide(e))}
                                            >
                                                <div className="item-wrap">
                                                    <span className="icon">{item.icon}</span>
                                                    <span className="text">{item.label}</span>
                                                </div>
                                                {
                                                    item.arrow_icon &&
                                                    <>
                                                        {item.arrow_icon}
                                                    </>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                subDownloadOption &&
                                <>
                                    <div className="download-sub-menu" onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                        <ul>
                                            {
                                                subDownloadOptions?.filter(each => project.mt_enable ? true : each.value !== 'MTRAW')?.map((item) => {
                                                    return (
                                                        <li
                                                            key={item.id}
                                                            className="list-inner-item"
                                                            style={
                                                                (selectedProjectFile?.isTaskDownloading != item?.value) ?
                                                                    {} : { opacity: 0.7 }
                                                            }
                                                            onClick={(e) => {
                                                                docCreditCheckAlertRef.current = selectedProjectFile.mt_only_credit_check;
                                                                (selectedProjectFile?.isTaskDownloading != item?.value) &&
                                                                    downloadDifferentFile(
                                                                        item?.value,
                                                                        selectedProjectFile?.document,
                                                                        e,
                                                                        key,
                                                                        selectedProjectFile.id,
                                                                        selectedProjectFile.document_url,
                                                                        selectedProjectFile.first_time_open,
                                                                        selectedProjectFile.open_in,
                                                                        project.project_name,
                                                                        project.id,
                                                                        project?.get_project_type,
                                                                        selectedProjectFile?.filename,
                                                                        selectedProjectFile
                                                                    )
                                                            }}
                                                        >
                                                            {item.label}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        )
    }

    const MoreOptionsIconPDF = (props) => {
        let { project, deleteOnly, from, taskPDF, selectedProjectFile } = props
        return (
            <div className="more-options-wrap">
                <ButtonBase onMouseUp={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                    <>
                        <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                            <ul>
                                {
                                    moreOptionsForPDF?.filter(each => deleteOnly ? each.id === 2 : each.id)?.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className="list-item"
                                                onClick={(e) =>
                                                    item?.label === 'Download' ? downloadConvertDocxFile(selectedProjectFile?.id) :
                                                        item?.label === 'Delete' && handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)
                                                }
                                            >
                                                <div className="item-wrap">
                                                    <span className="icon">{item.icon}</span>
                                                    <span className="text">{item.label}</span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
        )
    }

    const MoreOptionsIconDesigner = (props) => {
        let { project, removeDelete, removeEdit, selectedProjectFile, deleteOnly, assigned } = props
        // console.log(assigned)
        return (
            <div className="more-options-wrap">
                 <ButtonBase onMouseUp={(e) => handleMoreVertOption(e, selectedProjectFile?.id !== undefined ? selectedProjectFile?.id : project.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption == (selectedProjectFile?.id !== undefined ? selectedProjectFile?.id : project.id))) && 
                    <>
                        <div className="menu-wrapper" ref={moreOptionOutside}>
                            <ul>
                                {
                                    moreOptionsForDesigner?.filter(each => removeEdit ? (assigned ? each.id !== 1 : (each.id !== 1 && each.id !== 4)) : (removeDelete ? each.id === 3 : (assigned ? each.id !== 1 : (each.id !== 1 && each.id !== 4))))?.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className="list-item"
                                                onClick={(e) => {
                                                    item?.label === 'Edit' ? handleEditDesignerProj(e,project) :
                                                    item?.label === 'Download' ? handleDownloadDesignerProj(project,selectedProjectFile) :
                                                    item?.label === 'Delete' && handleDeleteDesignerProjectHandle(project,selectedProjectFile)
                                                    item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                }}
                                            >
                                                <div className="item-wrap">
                                                    <span className="icon">{item.icon}</span>
                                                    <span className="text">{item.label}</span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
        )
    }



    

    const handleRetriveDesignProject = (e,proj) => {
        e.stopPropagation()
        let url = ''
        if (proj.designer_project_detail.type === "image_design") {
            url = `${Config.BASE_URL}/canvas/canvas-designs/${proj.designer_project_detail.des_proj_id}`
        } else {
            url = `${Config.BASE_URL}/ai-image-translation/imagetranslate/${proj.designer_project_detail.des_proj_id}`
        }

        Config.axios({
            url: url,
            method: 'GET',
            auth: true,
            success: (response) => {
                let { data } = response;
                // console.log(proj?.designer_project_detail?.type === "image_design" ? data?.file_name : data?.project_name)
                setstoryProjectName(proj?.designer_project_detail?.type === "image_design" ? data?.file_name : data?.project_name )
                // setHasTeam(data.team)
                let editTargetLanguages = [];
                let tar = [];
                let tarID = [];
                if(proj.designer_project_detail.type === "image_design"){
               setEditJobs(data.canvas_translation);
                    response.data?.canvas_translation?.map((each) => {

                        tar.push({ language: each?.target_language, id: each?.target_language });
                        tarID.push(each.target_language);
                    });
                    setAlreadySelectedTarLang(tar);
                    setAlreadySelecetedTarLangID(tarID);
                    data?.canvas_translation?.map((job) => {
                        if (job?.target_language !== null) {
                            editTargetLanguages.push(
                                targetLanguageOptionsRef.current?.find(
                                    (element) => element.id == job.target_language
                                )
                            );
                        }
                    });
                    let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                        (element) => element.id ==  data?.canvas_translation[0]?.source_language
                    );
    
                    setTimeout(() => {
                        setSourceLabel(editSourceLanguage?.language);
                        setSourceLanguage(data?.canvas_translation[0]?.source_language)
                        setTargetLanguage(editTargetLanguages);
                        setSkeletonLoader(false)
                    }, 80);
                }else{
                    setEditJobs(data?.image_inpaint_creation);
                    response.data?.image_inpaint_creation?.map((each) => {

                        tar.push({ language: each?.target_language, id: each?.target_language });
                        tarID.push(each.target_language);
                    });
                    setAlreadySelectedTarLang(tar);
                    setAlreadySelecetedTarLangID(tarID);
                    data?.image_inpaint_creation?.map((job) => {
                        if (job?.target_language !== null) {
                            editTargetLanguages.push(
                                targetLanguageOptionsRef.current?.find(
                                    (element) => element.id == job.target_language
                                )
                            );
                        }
                    });
                    let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                        (element) => element.id ==  data?.source_language
                    );
    
                    setTimeout(() => {
                        setSourceLabel(editSourceLanguage?.language);
                        setSourceLanguage(data?.source_language)
                        setTargetLanguage(editTargetLanguages);
                        setSkeletonLoader(false)
                    }, 80);
                }
               
            },
        });
    }


    // for designer project edit
    const handleEditDesignerProj = (e,proj) => {
        // console.log('designer edit')
        handleRetriveDesignProject(e,proj)
    } 
    
     // for designer project delete
     const handleDownloadDesignerProj = async(proj,selectedProjectFile) => {
       
        let url
        let designDownloadUrl
        let nameofDownload
        let extention

        if (proj?.designer_project_detail?.type == "image_translate") {
            designDownloadUrl = Config.BASE_URL + `/ai-image-translation/image-download?image_id=${proj.designer_project_detail.des_proj_id}&file_format=png&language=${selectedProjectFile.target_language}&export_size=1`
            // console.log(designDownloadUrl)
            
            nameofDownload = `${proj?.project_name}_${targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language)?.language}`
        } else {
            const startNumber = 1;
            const endNumber = proj?.designer_project_detail?.pages;
            const formattedString = Array.from({ length: endNumber - startNumber + 1 }, (_, index) => {
                const numberToMap = index + startNumber;
                return `page_number_list=${numberToMap}`;
            }).join('&');
           
            // console.log(formattedString);
            if(selectedProjectFile == null){
                designDownloadUrl = Config.BASE_URL + `/canvas/design-download?canvas_id=${proj?.designer_project_detail?.des_proj_id}&file_format=png&export_size=1&` + formattedString
                nameofDownload = `${proj?.project_name}`
                if(proj?.designer_project_detail?.pages == 1){
                    extention = '.png'
                }else{
                    extention = '.zip'
                }
            }else{
                designDownloadUrl = Config.BASE_URL + `/canvas/design-download?canvas_id=${proj?.designer_project_detail?.des_proj_id}&file_format=png&language=${selectedProjectFile?.target_language}&export_size=1&` + formattedString
                nameofDownload = `${proj?.project_name}_${targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language)?.language}`
                if(proj?.designer_project_detail?.pages == 1){
                    extention = '.png'
                }else{
                    extention = '.zip'
                }
            }
            // console.log(designDownloadUrl)
        }
        // add in download list
        dispatch(addDownloadingFiles({ id: id, file_name: nameofDownload, ext: extention, status: 1 }))

        url = designDownloadUrl
        const response = await Config.downloadFileFromApi(url);

        // update the list once download completed
        dispatch(updateDownloadingFile({ id: id, status: 2 }))

        Config.downloadFileInBrowser(response)

        setTimeout(() => {
            // remove the downloaded file from list
            dispatch(deleteDownloadingFile({ id: id }))
        }, 8000);
    } 

    // for designer project delete
       // for designer project delete

       const handleDeleteDesignerProjectHandle = (proj,selectedProj) => {
        selectedDesignerProject.current = selectedProj
        projectObject.current = proj
        if(selectedProj == null){
            setShowStoryProjDeleteModal(true)
        }else{
            // console.log(selectedProj)
            // console.log(selectedProjectFilesRef.current)

            if(selectedProj.task_assign_info != null){
                SetShowAssignedProjectDeleteAlert(true)
            }else{
                setShowTaskDesignIndividualDeleteAlert(true)

            }
        }
    } 

    // for designer project delete
    const handleDeleteDesignerProj = (proj,selectedProjectFile) => {

        // console.log(proj)
        let url = ''
        if (proj?.designer_project_detail?.type === "image_design") {
            url = `${Config.BASE_URL}/canvas/canvas-designs/${proj?.designer_project_detail?.des_proj_id}/`
            if(selectedProjectFile == null){
                handleDeleteDesignWholeProject(proj,url)
            }else{
                handleDeleteDesignTaskOfProject(proj,url,selectedProjectFile?.design_project?.desg_job)

            }
        } else {
            url = `${Config.BASE_URL}/ai-image-translation/imagetranslate/${proj?.designer_project_detail?.des_proj_id}/`
             if(selectedProjectFile == null){
                handleDeleteDesignWholeProject(proj,url)
            }else{
                handleDeleteDesignTaskOfProject(proj,url,selectedProjectFile?.design_project?.desg_job)
            }
        }

        setIsDesignDeleting(true)
       
    } 



    const handleDeleteDesignWholeProject = (proj,url) => {
        setIsTaskDeleting(true)

        Config.axios({
            url: url,
            method: 'DELETE',
            auth: true,
            success: (response) => {

                setIsTaskDeleting(false)
                // console.log(response.data)
                Config.toast(proj?.designer_project_detail?.type === "image_design" ? 'Design project deleted' : 'Image project deleted');
                setIsDesignDeleting(false)
                const newArr = createdProjects?.filter(obj => obj.id !== proj.id);
                setCreatedProjects(newArr)
                // if(newArr?.length === 15){
                //     getDocumentList()
                // }
                setShowTaskDesignIndividualDeleteAlert(false)
                setShowStoryProjDeleteModal(false)
                setEditInstantProjectModal(false)
                if (newArr?.length == 0) setEmptyProjects(true)
            },
            error: (err) => { 
                setIsTaskDeleting(false)
                setIsDesignDeleting(false)
             }
        });
    }
    const handleDeleteDesignTaskOfProject = (proj,url,id) => {
        setIsTaskDeleting(true)

        let formdata = new FormData();
        formdata.append(proj?.designer_project_detail?.type === "image_design" ? 'delete_target_design_lang' : 'image_translate_delete_target',id)

        Config.axios({
            url: url,
            method: 'PUT',
            formData: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                Config.toast(proj.designer_project_detail.type === "image_design" ? 'Design task deleted' : 'Image task deleted');
                setIsTaskDeleting(false)
                if (selectedProjectFiles?.length === 1) {
                    // Config.toast(t("deleted_success"));
                    setCreatedProjects(createdProjects?.filter(each => each?.design_project?.desg_job !== id))
                    if (createdProjects?.filter(each => each?.design_project?.desg_job !== id)?.length === 0) setEmptyProjects(true);
                } else {
                    // Config.toast(t("task_deleted_success"));
                }
                setSelectedProjectFiles(selectedProjectFiles?.filter(each => each?.design_project?.desg_job !== id))
                setShowTaskDesignIndividualDeleteAlert(false)
               
            },
            error: (err) => { 
                setShowTaskDesignIndividualDeleteAlert(true)
                setIsTaskDeleting(false)
                setIsDesignDeleting(false)
             }
        });
    }


    // for designer project open before translate
    const handleOpenNonTranslatedDesignProject = (project) => {
        // console.log(project)
        // console.log('open in designer')
        let subUrl = project.designer_project_detail.type == 'image_design' ? `&page=${1}` : ''
        let url = `/editor/${project.designer_project_detail.type == 'image_design' ? 'design' : 'image-translate'}/?project=${project.designer_project_detail.des_proj_id}`
        // console.log(project.designer_project_detail)
        // window.open(Config. DESIGNER_HOST+ url)
        window.open(Config.DESIGNER_HOST+ url+subUrl)

    }

    const handleDeleteDesignerProjectUpdate = (proj) => {
        // console.log(proj)
        let formdata = new FormData();
        setIsStoryProjUpdating(true)
        if(sourceLanguage != ''){
            formdata.append("source_language", sourceLanguage);
        }

        if (storyProjectName?.trim() === '') {
            Config.toast(t("enter_proj_name"))
            return;
        }

        formdata.append(proj?.designer_project_detail?.type === "image_design" ? "file_name" : "project_name" , storyProjectName?.trim());

        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formdata.append(proj?.designer_project_detail?.type === "image_design" ? 'canvas_translation_tar_lang' : 'inpaint_creation_target_lang', eachTargetLanguage?.id);
        });

        editJobs.map((eachTargetLanguage) => {
            // console.log(eachTargetLanguage?.target_language)
            // console.log(targetLangListToRemove)
            // console.log( targetLangListToRemove.find(
            //     (element) => element.target_language != eachTargetLanguage?.target_language
            // ))
            // console.log( targetLangListToRemove.find(
            //     (element) => element.target_language == eachTargetLanguage?.target_language
            // ))
            if (
                targetLangListToRemove.find(
                    (element) => element.target_language == eachTargetLanguage?.target_language
                ) 
            )
            formdata.append(proj?.designer_project_detail?.type === "image_design" ? 'delete_target_design_lang' : 'image_translate_delete_target', eachTargetLanguage?.id);
        });
      

        let url = ''
        if (proj.designer_project_detail.type === "image_design") {
            url = `${Config.BASE_URL}/canvas/canvas-designs/${proj.designer_project_detail.des_proj_id}/`
        } else {
            url = `${Config.BASE_URL}/ai-image-translation/imagetranslate/${proj.designer_project_detail.des_proj_id}/`
        }
    
        Config.axios({
            url:url,
            method: 'PUT',
            formData: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t("proj_updated_success"));
                setEditInstantProjectModal(false)
                setIsStoryProjUpdating(false)
                // update the word count and project name of the project
                const newArr = createdProjects?.map(obj => {
                    if (obj.id === proj?.id) {
                        return {
                            ...obj,
                            project_name: response.data.project_name,
                        };
                    }
                    return obj;
                });
                setCreatedProjects(newArr)
                listFiles(proj.id)

            },
            error: (err) => { 
              
             }
        });
    }

    const downloadTaskTargetFile = async(task_data) => {
        let {id, filename} = task_data
        let {name, extension} = Config.getNameAndExtension(filename)
        
        try{
            // add in download list
            dispatch(addDownloadingFiles({ id: id, file_name: name, ext: extension, status: 1 }))
    
            let url = `${Config.BASE_URL}/workspace/download_task_target_file/?task=${id}`
            const response = await Config.downloadFileFromApi(url);
    
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: id, status: 2 }))
    
            Config.downloadFileInBrowser(response)
    
            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: id }))
            }, 8000);
        } catch (e) {
            console.log(e)
            dispatch(deleteDownloadingFile({ id: id }))
            Config.toast(t("download_failed"), 'error')
        }
    } 

    // this api will initiate the file translate process and provide the status of each task
    const getProjectTransDownloadStatus = (task_id) => {
        if(projectObject.current?.id === undefined) return;

        // it will abort/cancel the ongoing api request
        if (axiosFileTranslateAbortController) {
            axiosFileTranslateAbortController.abort()
        }
    
        const controller = new AbortController();
        setAxiosFileTranslateAbortController(controller);

        let task_list_arr = []

        let alreadyProcessingTask = selectedProjectFilesRef.current?.filter(each => each.isProcessing)
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
            let newArr = selectedProjectFilesRef.current?.map(obj => {
                if(obj.id === task_id){
                    return {
                        ...obj,
                        isProcessing: true,
                    }
                }
                return obj
            })
            selectedProjectFilesRef.current = newArr 
            setSelectedProjectFiles(newArr)
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/translate_file/?${list}`,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                // if called with project_id, returns list if task_data
                if(response.data?.results !== undefined){
                    let dataList = response.data?.results
                    let newArr = selectedProjectFilesRef.current?.map(obj => {
                        if(obj.id === dataList?.find(each => each.task === obj.id)?.task){
                            let status = dataList?.find(each => each.task === obj.id)?.status
                            return {
                                ...obj,
                                isProcessing: status == 400 ? true : false,
                                status: status,
                                file_translate_done: status === 200 ? true : obj.file_translate_done
                            }
                        }
                        return obj
                    })
                    // console.log('modified list with isProcessing key')
                    // console.log(newArr)
                    selectedProjectFilesRef.current = newArr 
                    setSelectedProjectFiles(newArr)

                    // console.log('isAnyTaskIsProcessing')
                    
                    let isAnyTaskIsProcessing = selectedProjectFilesRef.current?.find(each => each.status === 400) ? true : false
                    let insuffientCredit = selectedProjectFilesRef.current?.find(each => each.status === 402) ? true : false
                    let isPageNumNotFound = selectedProjectFilesRef.current?.find(each => each.status === 404) ? true : false
                    
                    if(isPageNumNotFound){
                        // Config.toast(`File couldn't process!`, 'error')
                        setShowFileErrorModal(true)
                        let newArr = selectedProjectFilesRef.current?.map(obj => {
                            if(obj.status === 404){
                                return {
                                    ...obj,
                                    isProcessing: false,
                                }
                            }
                            return obj
                        })
                        selectedProjectFilesRef.current = newArr 
                        setSelectedProjectFiles(newArr)
                        return
                    }

                    if(insuffientCredit) setShowCreditAlertModal(true)

                    if(isAnyTaskIsProcessing){
                        setTimeout(() => {
                            getProjectTransDownloadStatus(task_id)
                        }, 5000);
                    }
                }
                // if called with task_id, returns that particular task status 
                else if(task_id){  
                    // task - insufficient scenario
                    if(response.data?.status === 402){
                        let newArr = selectedProjectFilesRef.current?.map(obj => {
                            return {
                                ...obj,
                                isProcessing: false,
                            }
                        })
                        // console.log(newArr)
                        selectedProjectFilesRef.current = newArr 
                        setSelectedProjectFiles(newArr)
                        setShowCreditAlertModal(true)
                    }
                }
            },
            error: (err) => {
                if(err?.response?.status === 500){
                    let newArr = selectedProjectFilesRef.current?.map(obj => {
                        if(fileTranslatingTaskListRef.current?.find(each => each === obj.id)){
                            return {
                                ...obj,
                                isProcessing: false,
                                file_translate_done: false
                            }
                        }
                        return obj
                    })
                    // console.log(newArr)
                    selectedProjectFilesRef.current = newArr 
                    setSelectedProjectFiles(newArr)
                }
            }
        });
    }

    const handleMyStoriesSettingsVisibility = (show = true) => {
        setMyStoriesSettingsBox(show);
    };

    const handleViewStoryClick = (e, task, open) => {
        setIsViewStoryModal(true)

        Config.axios({
            url: `${Config.BASE_URL}/workspace/news_detail/?task_id=${task?.id}`,
            auth: true,
            method: "GET",
            success: (response) => {
                setSelectedStoryDetails({
                    data: response.data,
                    pair: `${targetLanguageOptionsRef.current?.find(each => each?.id == task?.source_language)?.language}->${targetLanguageOptionsRef.current?.find(each => each?.id == task?.target_language)?.language}`,
                    open: open
                })
            },
        });
    } 

    const pushStoryToCMS = (e, taskData, project_id) => {
        // console.log(taskData)

        // var formdata = new FormData();
        // formdata.append("task", taskData?.id);
        // formdata.append("step", 1);
        // formdata.append("client_response", 3);
        
        // if (reassign) {
        //     formdata.append("reassigned", 'True')
        // }
        let feedId = taskData?.feed_id
        setIsStoryIdPushing(taskData?.id)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/push_story/?task_id=${taskData?.id}${(feedId !== null && feedId !== undefined) ? `&feed_id=${feedId}` : ""}`,
            auth: true,
            method: "POST",  
            // data: formdata,
            success: (api_response) => {
                Config.toast(t("push_successfully"))
                listFiles(project_id)
                setIsStoryIdPushing(null)
            },
            error: (err) => {
                Config.toast(`${t("something_went_wrong")}`, 'error')
                setIsStoryIdPushing(null)
            }
        });
    } 

    const handleCreateStoryBtn = () => {
        if(isFederal){
            history('/all-stories?page=1')
        }else if(isDinamalar){
            openAddStoryModal()
        }
    } 


    const openDefaultGlossary = () => {
        history(`/default-glossary-workspace/`)
    } 


    const handleEditorSelect = (id) => {
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
        let filteredEditor = []
        URL_SEARCH_PARAMS.set('page', 1)
        URL_SEARCH_PARAMS.delete('open-project')
        URL_SEARCH_PARAMS.delete('refresh-proj')

        if(checkedEditors?.includes(id)){
            filteredEditor = checkedEditors?.filter(editor => editor !== id)
            setCheckedEditors(filteredEditor)
        }else{
            filteredEditor = [...checkedEditors, id]
            setCheckedEditors(filteredEditor)
        }
        if(filteredEditor?.length !== 0) URL_SEARCH_PARAMS.set('editor', filteredEditor?.join(','))
        else URL_SEARCH_PARAMS.delete('editor')

        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
    } 


    return (
        <React.Fragment>
            <>
                <div className="header-align">
                    <div className="header-project-setup-align-wrap assets">
                        {/* <p className="section-header">{t("project_list")}</p> */}
                        <div className="position-relative">
                            <div className={"project-list-search-box " + (fileListSearchEnlarge ? "active" : "")}>
                                <div className="img-box">
                                    <img src={SearchBarIcon} alt="search-icon" />
                                </div>
                                <input
                                    onClick={() => setFileListSearchEnlarge(true)}
                                    value={projectSearchTerm}
                                    // autoFocus={projectSearchTerm ? true : false}
                                    onChange={(e) => setProjectSearchTerm(e.target.value)}
                                    type="search"
                                    placeholder={t("search") + "...."}
                                    onKeyUp={(e) => SearchTermFilterEnter(e)}
                                    onFocus={() => setFileListSearchEnlarge(true)}
                                // onBlur={(e) => {
                                //     setFileListSearchEnlarge(false);
                                // }}
                                />
                                <span className={"close " + ((fileListSearchEnlarge || projectSearchTerm !== "") ? "show " : " ")}
                                    onClick={() => handleCloseSearchBox()}
                                >
                                    <img src={SearchBarIcon} alt="search-bar-close" />
                                </span>
                            </div>
                            <div ref={searchTermCloseOutside} className={"search-results-bar project-list-search-bar " + (fileListSearchEnlarge ? "show" : "hide")}>
                                <div name="search-dropdown" onClick={(e) => (projectSearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (projectSearchTerm !== "" ? " " : "cursor-change")}>
                                    <SearchIcon className="search-icon" name="search-dropdown" />
                                    <div className="searched-results-info" name="search-dropdown">
                                        <p className="searched-term" name="search-dropdown">{projectSearchTerm}</p>
                                        {
                                            projectSearchTerm !== "" ?
                                                <p className="results-link" name="search-dropdown">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                :
                                                <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_proj_list_2")}</span></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Select
                            options={activeProjTab !== 6 ? orderByOptions : orderByOptionsForAssets}
                            isSearchable={false}
                            styles={customProjectTypeSelectStyles}
                            value={orderBySelectedValue}
                            // menuIsOpen={true}
                            classNamePrefix="project-type-list"
                            placeholder={t("order_by")}
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            onChange={handleSelectedOrderItem}
                        />

                        {(isDinamalar && !is_internal_meber_editor) && (
                            <div className="editor-filter" >
                                <ButtonBase 
                                    className="add-btn-wrapper filter-button" 
                                    onClick={() => setIsEditorFilterDropDownOpen(!isEditorFilterDropDownOpen)}
                                    disableRipple={true}
                                    style={checkedEditors?.length !== 0 ? {fontWeight: 600} : {}}
                                >
                                    {
                                        checkedEditors?.length !== 0 ? checkedEditors?.length === 1 ? 
                                        `${editorsListOption?.find(editor => editor?.internal_member === checkedEditors[0])?.internal_member_detail.name}` : 
                                        `${checkedEditors?.length} ${t("editors_selected")}` : t("editors")
                                    } 
                                    <span id="triangle-down" className="ml-3"></span>
                                </ButtonBase>

                                {isEditorFilterDropDownOpen && (
                                    <div className="editor-filter-drop-down" ref={editorDropDownBoxRef}>
                                        <div className="editor-filter-drop-down-wrapper">
                                            {editorsListOption?.map(editor => {
                                                return (
                                                    <div key={editor.id} className="editor-row-wrapper" onClick={(e) => handleEditorSelect(editor.internal_member)}>
                                                        <Tooltip title={editor?.internal_member_detail?.email} placement="right" arrow>
                                                            <div className="suggestion-icon-wrap">
                                                                <Checkbox 
                                                                    name="title-radio-button"
                                                                    size="small" 
                                                                    className="mr-1"
                                                                    id={`outline-${editor?.id}`}
                                                                    checked={checkedEditors?.includes(editor.internal_member)}
                                                                    onChange={(e) => handleEditorSelect(editor.internal_member)}
                                                                />
                                                                {
                                                                    (editor.professional_identity === null || editor.professional_identity === "") ?
                                                                        <div className="no-avatar">{editor?.internal_member_detail.name?.charAt(0).toUpperCase()}</div>
                                                                        :
                                                                        <img src={`${Config.BASE_URL + editor.professional_identity}`} alt="profile-pic" />
                                                                }
                                                                <div className="name">{editor?.internal_member_detail?.name}</div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="get-stories-btn-wrapper my-stories">
                        {(isDinamalar && !is_internal_meber_editor) && (
                            <>
                                <ButtonBase className="add-btn-wrapper" onClick={openAddStoryModal}>
                                    <AddIcon className="ref-icon" />
                                    {t("add_story")}
                                </ButtonBase>
                            </>
                        )}

                        {isDinamalar && (
                            <ButtonBase className="add-btn-wrapper" onClick={openDefaultGlossary}>
                                {t("my_glossary")}
                            </ButtonBase>
                        )}

                        {/* <div className="ai-projects-main-wrapper__header__dropdown-wrapper">
                            <ButtonBase 
                                className="ai-projects-main-wrapper__header__button" 
                                onClick={() => {
                                    handleMyStoriesSettingsVisibility(!myStoriesSettingsBox);
                                }}
                            >
                                <SettingsOutlinedIcon className="ai-projects-main-wrapper__header__button__plus-icon"/>
                                <i
                                    style={{ color: "#474848" }}
                                    className="fas fa-caret-down"
                                />
                            </ButtonBase>
                            <AnimatePresence initial={false}>
                                {myStoriesSettingsBox &&
                                    (<motion.div 
                                        key="content"
                                        initial={{ height: 0, opacity: 0}}
                                        animate={{ height: "auto", opacity: 1}}
                                        exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                        transition={{ duration: 0.15 }} 
                                        className="ai-projects-main-wrapper__header__dropdown-wrapper__dropdown-box"
                                        ref={myStoriesSettingsBoxRef}
                                    >
                                        <ul className="dropdown-box__link__item__wrapper">
                                            <li className="dropdown-box__link__item active">
                                                Assets
                                            </li>
                                        </ul>
                                    </motion.div>)
                                }
                            </AnimatePresence>
                        </div> */}
                    </div>
                </div>
                <div className="upload-files-section">
                    <div id="select-files" className="uploaded-files">
                        <div className="file-edit-heading-row project-list-main">
                            <div className="file-edit-heading-table my-stories-main-wrap">
                                <div className="file-edit-heading-table-row federal-news-wrap my-stories-wrap">
                                    <div
                                        // onClick={(e) => orderBy(orderField?.indexOf("-project_name") !== -1 ? "project_name" : "-project_name")}
                                        className="file-edit-heading-table-cell"
                                    >
                                        <div className="listing-table-header-container">
                                            <span>{t("project_name")}</span>
                                            {/* <div className="sorting-container">
                                                <div
                                                    className={
                                                        orderField?.indexOf("project_name") !== -1 && orderField?.indexOf("-project_name") == -1
                                                            ? "arrow-down-sort arrow-down-active"
                                                            : "arrow-down-sort arrow-down-inactive"
                                                    }
                                                ></div>
                                                <div
                                                    className={
                                                        orderField?.indexOf("-project_name") !== -1
                                                            ? "arrow-up-sort arrow-up-active"
                                                            : "arrow-up-sort arrow-up-inactive"
                                                    }
                                                ></div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="file-edit-heading-table-cell">
                                        <div onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} className="listing-table-header-container">
                                            <span>Team</span>
                                            <div className='sorting-container'>
                                                <div className={(orderField.indexOf('team__name') !== -1 && orderField.indexOf('-team__name') == -1) ? 'arrow-down-sort arrow-down-active' : 'arrow-down-sort arrow-down-inactive'}></div>
                                                <div className={orderField.indexOf('-team__name') !== -1 ? 'arrow-up-sort arrow-up-active' : 'arrow-up-sort arrow-up-inactive'}></div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="file-edit-heading-table-cell">
                                        <div className="status-name">Type</div>
                                    </div> */}

                                    <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("created_on")}</div>
                                    </div>
                                    {/* <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("status")}</div>
                                    </div> */}
                                </div>
                                <>
                                    {createdProjects.length != 0 || !showListingLoader ? (
                                        (createdProjects.length != 0 || projectFilterType !== null || projectSearchTerm != "") ?
                                            (createdProjects.length == 0 && projectSearchTerm != "" ? (
                                                <React.Fragment>
                                                    <section className="ai-no-project-found">
                                                        <div className="ai-no-project-cont">
                                                            {
                                                                projectSearchTerm ?
                                                                    <img
                                                                        className="empty-folder-img"
                                                                        src={NoEditorIcon}
                                                                        alt="empty-folder-open"
                                                                    />
                                                                    :
                                                                    <img
                                                                        className="empty-folder-img"
                                                                        src={EmptyProjectIcon}
                                                                        alt="empty-folder-open"
                                                                    />
                                                            }

                                                            <h2>{t("no_story_found")}</h2>
                                                            {
                                                                projectSearchTerm ?
                                                                    null
                                                                    :
                                                                    <>
                                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                            <button className="workspace-files-AddNewProjectButton"
                                                                                onClick={() => handleCreateStoryBtn()}
                                                                            >
                                                                                <span className="add-new-project-btn">
                                                                                    <img src={PlusIcon} alt="plus" />
                                                                                    {t("create_new_story")}
                                                                                </span>
                                                                            </button>
                                                                        )}
                                                                    </>
                                                            }
                                                        </div>
                                                    </section>
                                                </React.Fragment>
                                            ) :
                                                (createdProjects.length !== 0) ?
                                                    <React.Fragment>
                                                        {createdProjects.map((project, key) => 
                                                            {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            openedProjectId == project.id
                                                                                ? "file-edit-list-table-row focused-proj-row federal-news my-stories"
                                                                                : project.progress?.toLowerCase() == "yet to start" ? "file-edit-list-table-row unopened-focus-proj-row" : "file-edit-list-table-row"
                                                                        }
                                                                        key={project.id}
                                                                        style={project?.analyzingWordCount ? { pointerEvents: 'none', opacity: '0.7' } : {}}
                                                                        data-key={project.id}
                                                                        onClick={(e) => selectProject(e, project?.id, project)}
                                                                    >
                                                                        <div className="file-edit-list-table-cell-wrap">
                                                                            <div className="file-edit-list-table-cell" data-key={project.id}>
                                                                                <span className="arrow-icon">
                                                                                    {
                                                                                        openedProjectId == project.id ?
                                                                                            <KeyboardArrowUpIcon className="proj-list-arrow-up" />
                                                                                            :
                                                                                            <KeyboardArrowDownIcon className="proj-list-arrow-down" />
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

                                                                                            {/* project.is_proj_analysed is removed from the below condition */}
                                                                                            {/* {project?.project_analysis?.proj_word_count != null && project?.project_analysis.proj_word_count != 0 ? (
                                                                                                <div className="position-relative">
                                                                                                    <span className="file-edit-proj-txt-word-count word-count-capsule">
                                                                                                        <span >{project.project_analysis.proj_word_count} W</span>
                                                                                                    </span>
                                                                                                    {showElement &&
                                                                                                        <span className={project.progress?.toLowerCase() == "yet to start" ? "unopend-icon" : "d-none"}>
                                                                                                            <img src={Config.HOST_URL + "assets/images/new-unopened-proj-symbol.svg"} alt="unopened-proj" />
                                                                                                        </span>
                                                                                                    }
                                                                                                </div>
                                                                                            ) : project?.analyzingWordCount && (
                                                                                                <div className="position-relative">
                                                                                                    <span className="file-edit-proj-txt-word-count word-count-capsule">
                                                                                                        <span>
                                                                                                            <div className="loading">
                                                                                                                <span className="loading__dot"></span>
                                                                                                                <span className="loading__dot"></span>
                                                                                                                <span className="loading__dot"></span>
                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            )} */}

                                                                                            {/* {project.assigned && (
                                                                                                <span className="pl-2 pr-2">
                                                                                                    <img
                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/how_to_register.svg"}
                                                                                                        alt="project assigned"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            )} */}
                                                                                        </div>
                                                                                        {/* <div className="proj-file-type">
                                                                                            <span className={project?.get_project_type === 3 ? "glossary-text-name" : ''}>{project?.get_project_type === 3 ? t("glossary") :
                                                                                                project?.file_create_type == "From insta text" ? t("text") :
                                                                                                (project?.get_project_type === 1 || project?.get_project_type === 2) ? t("files") : 
                                                                                                (project?.get_project_type === 5) ? t("instant") : (project?.get_project_type === 6) && t("proj_list_cate_design")}
                                                                                            </span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                <div className="file-edit-translation-txt word-count">
                                                                                    <span>{Config.getProjectCreatedDate(project.created_at)}</span>
                                                                                </div>
                                                                                {(!project?.file_translate && Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable) && (
                                                                                    <div className="project-edit-tools" onClick={(e) => editProject(e, project.id, project?.get_project_type, project)}>
                                                                                        {isFederal && (
                                                                                            <Tooltip title={t("edit")} placement="top">
                                                                                                <span>
                                                                                                    <img
                                                                                                        src={EditIcon}
                                                                                                        alt="pencil-edit-new"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                        {!isDinamalar && (
                                                                                            <Tooltip TransitionComponent={Zoom} title={t("assets")} placement="top">
                                                                                                <span onClick={(e) => showSettingsModal(e, project?.id)} >
                                                                                                    <img
                                                                                                        src={FileUploadIcon}
                                                                                                        alt="upload_file"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {/* <div className="file-edit-list-table-cell">
                                                                        <div className="file-edit-translation-txt word-count">
                                                                            <span>{project?.get_project_type === 3 ? "Glossary" : project?.get_project_type === 4 ? "Voice" : 
                                                                                (project?.get_project_type === 1 || project?.get_project_type === 2) && "Files"}</span>
                                                                        </div>
                                                                    </div> */}
                                                                            {/* <div className="file-edit-list-table-cell" data-key={project.id}> */}
                                                                                {/* <div className="file-edit-translation-txt word-count">
                                                                            <span>{Config.getProjectCreatedDate(project.created_at)}</span>
                                                                        </div> */}
                                                                                {/* (selectedProjectFile?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id && each.task_assign_detail.step === 2)) && eachRole?.task_ven_status === 'task_accepted') */}
                                                                                {/* {((!project?.file_translate ) && (
                                                                                    (project?.get_assignable_tasks_exists && project?.assign_enable) ||
                                                                                    (userDetails?.agency && selectedProjectFiles?.find(task => task?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details?.managers?.find(user => user === userDetails.pk)) && each?.task_ven_status === 'task_accepted'))))
                                                                                )) && (
                                                                                        <>
                                                                                            <div className="user-project-icon">
                                                                                                <Tooltip className="dont-open-list" title={t("assign")} placement="top">
                                                                                                    <span
                                                                                                        id={`project-assigni-icon-${project?.id}`}
                                                                                                        onClick={(e) => handleShowLSPAssignManage(e, project)}>
                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                    </span>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                            <div className="icons-separator"></div>
                                                                                        </>
                                                                                    )} */}
                                                                                {/* <div className="project-edit-tools dont-open-list">
                                                                                    {((!Config.userState?.is_internal_member && project?.get_project_type !== 3 && project?.assign_enable)) &&  // add this to enable project-download for agency => || userDetails?.agency
                                                                                        <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                            <span onClick={(e) => handleBulkDownload(e, project)}>
                                                                                                <img
                                                                                                    src={Config.HOST_URL + "assets/images/new-ui-icons/file_download.svg"}
                                                                                                    alt="bulk download"
                                                                                                    should-open-files="dont-open"
                                                                                                />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    // Don't show project analysis option for glossary, express, and voice project without translation task.
                                                                                    {(!project?.file_translate && project.get_project_type !== 3 && project.get_project_type !== 5 && project.get_project_type !== 6 && project?.show_analysis) && <Tooltip title={t("project_analysis")} placement="top">
                                                                                        <span onClick={(e) => { handleShowAnalysisModal(e, project?.id); setShowProjectAnalysis(true) }}>
                                                                                            <img
                                                                                                src={Config.HOST_URL + "assets/images/new-ui-icons/stacked_bar_chart.svg"}
                                                                                                alt="stacked_bar_chart"
                                                                                                should-open-files="dont-open"
                                                                                            />
                                                                                        </span>
                                                                                    </Tooltip>}
                                                                                    {
                                                                                        (Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable && project.get_project_type === 3
                                                                                            && project?.tasks_count > 1 && project?.clone_available && openedProjectId == project.id) &&
                                                                                        <Tooltip title={t("clone")} placement="top">
                                                                                            <span onClick={(e) => { e.stopPropagation(); setShowCloneModal(true) }}>
                                                                                                <img
                                                                                                    src={Config.HOST_URL + "assets/images/clone-icon.svg"}
                                                                                                    alt="clone"
                                                                                                    should-open-files="dont-open"
                                                                                                />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    {(!project?.file_translate && Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable) && (
                                                                                        <>
                                                                                            <Tooltip dont-open-list="yes" title={t("edit")} placement="top">
                                                                                                <span onClick={(e) => editProject(e, project.id, project?.get_project_type, project)}>
                                                                                                    <img
                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/pencil-edit-new.svg"}
                                                                                                        alt="pencil-edit-new"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                            {(project.get_project_type == 1 || project.get_project_type == 2) &&
                                                                                                <Tooltip TransitionComponent={Zoom} title={t("assets")} placement="top">
                                                                                                    <span onClick={(e) => showSettingsModal(e, project?.id)} >
                                                                                                        <img
                                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/upload_file.svg"}
                                                                                                            alt="upload_file"
                                                                                                            should-open-files="dont-open"
                                                                                                        />
                                                                                                    </span>
                                                                                                </Tooltip>
                                                                                            }
                                                                                        </>
                                                                                    )}
                                                                                </div> */}
                                                                                {/* {(!project?.file_translate && project?.get_project_type !== 6) && (
                                                                                    <div className="status-conditions-part dont-open-list">
                                                                                        <span className="file-edit-proj-status-txt">
                                                                                            <div
                                                                                                className={
                                                                                                    project.progress?.toLowerCase() == "completed"
                                                                                                        ? "status-indicator-completed"
                                                                                                        : project.progress?.toLowerCase() == "in progress"
                                                                                                            ? "status-indicator-in-progress-color"
                                                                                                            : "status-indicator-created"
                                                                                                }
                                                                                                should-open-files="dont-open"
                                                                                            ></div>
                                                                                            {project.progress?.toLowerCase() == "completed" ? t("completed") : project.progress?.toLowerCase() == "in progress" ? t("in_progress") : project.progress?.toLowerCase() == "yet to start" ? t("yet_to_start") : ""}
                                                                                        </span>
                                                                                        <span className="more-icon-empty"></span>
                                                                                    </div>
                                                                                )}
                                                                            </div> */}
                                                                        </div>
                                                                        <Collapse isOpen={openedProjectId == project.id} className="selected-file-row">
                                                                            {
                                                                                openedProjectId == project.id &&
                                                                                ((selectedProjectFiles?.length > 0) ? (
                                                                                    selectedProjectFiles.map((selectedProjectFile, key) => {
                                                                                        // console.log(selectedProjectFile)
                                                                                        isAssignedProject = createdProjects.find(
                                                                                            (element) => element.id === openedProjectId
                                                                                        )?.assign_enable;
                                                                                        let segmentPercentage = 0;
                                                                                        if (selectedProjectFile?.progress != null) {
                                                                                            if (selectedProjectFile?.progress?.total_segments == 0)
                                                                                                segmentPercentage = 0;
                                                                                            else
                                                                                                segmentPercentage = Math.floor(
                                                                                                    (selectedProjectFile?.progress?.confirmed_segments /
                                                                                                        selectedProjectFile?.progress?.total_segments) *
                                                                                                    100
                                                                                                );
                                                                                        }
                                                                                        // Need to destructure this following conditional code and set everything optimised properly
                                                                                        if (selectedProjectFile?.task_assign_info?.length === 1) {
                                                                                            editorAssignmentDetails =
                                                                                                selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                                    Config.userState?.id
                                                                                                    ? selectedProjectFile?.task_assign_info[0]?.assigned_by_details
                                                                                                    : selectedProjectFile?.task_assign_info[0]?.assign_to_details;
                                                                                            role = selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                                Config.userState?.id
                                                                                                ? "Assigner" : "Editor"
                                                                                        }

                                                                                        // New logic
                                                                                        if (selectedProjectFile?.task_assign_info?.length === 2) {

                                                                                        }

                                                                                        if (selectedProjectFile?.task_assign_info?.length === 2) {
                                                                                            editorAssignmentDetails =
                                                                                                selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                                    Config.userState?.id
                                                                                                    ? selectedProjectFile?.task_assign_info[0]?.assigned_by_details
                                                                                                    : selectedProjectFile?.task_assign_info[0]?.assign_to_details;

                                                                                            reviewerAssignDetails =
                                                                                                selectedProjectFile?.task_assign_info[1]?.assign_to_details?.id ===
                                                                                                    Config.userState?.id
                                                                                                    ? selectedProjectFile?.task_assign_info[1]?.assigned_by_details
                                                                                                    : selectedProjectFile?.task_assign_info[1]?.assign_to_details;
                                                                                        }

                                                                                        let taskAssignStatus = selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status)?.task_assign_detail?.task_status
                                                                                        let taskClientStatus = selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status)?.task_assign_detail?.client_response

                                                                                        selectedFilesData = (
                                                                                            <div 
                                                                                                className={
                                                                                                    "file-edit-inner-table " + ( 
                                                                                                        isDinamalar ? (
                                                                                                            selectedProjectFile?.task_assign_info === null ? (
                                                                                                                (selectedProjectFile?.progress?.total_segments !== 0 && selectedProjectFile?.progress?.total_segments === selectedProjectFile?.progress?.confirmed_segments) ? "task-completed-bg" : 
                                                                                                                selectedProjectFile?.progress?.total_segments !== 0 ? "task-in-progress-bg" : 
                                                                                                                selectedProjectFile?.progress?.total_segments === 0 ? "" : ""
                                                                                                            ) : (
                                                                                                                taskClientStatus === "Approved" ? "task-approved-bg" :
                                                                                                                taskClientStatus === "Rework" ? "task-rework-bg" :
                                                                                                                taskAssignStatus === "Yet to start" ? "" :
                                                                                                                taskAssignStatus === "In Progress" ? "task-in-progress-bg" :
                                                                                                                taskAssignStatus === "Completed" ? "task-completed-bg" :
                                                                                                                taskAssignStatus === "Return Request" ? "task-declined-bg" : ""

                                                                                                            )
                                                                                                        ) : ""
                                                                                                    ) 
                                                                                                } 
                                                                                                key={selectedProjectFile?.id}
                                                                                            >
                                                                                                <div className="file-edit-list-inner-table-row">
                                                                                                    {/* <div className="file-edit-list-inner-table-cell">
                                                                                                        <div className="file-edit-translation-txt">
                                                                                                            <img
                                                                                                                className="translation-pair-L"
                                                                                                                src={
                                                                                                                    Config.HOST_URL +
                                                                                                                    "assets/images/new-ui-icons/translation-pair-L.svg"
                                                                                                                }
                                                                                                            />
                                                                                                            <span>{targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.source_language)?.language}</span>
                                                                                                            <img
                                                                                                                src={
                                                                                                                    Config.HOST_URL +
                                                                                                                    "assets/images/new-ui-icons/arrow_right_alt_color.svg"
                                                                                                                }
                                                                                                            />
                                                                                                            <span>
                                                                                                                {
                                                                                                                    (targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language) !== undefined &&
                                                                                                                        targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language) != null) ?
                                                                                                                        targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language)?.language :
                                                                                                                        targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.source_language)?.language
                                                                                                                }
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div> */}
                                                                                                    <div className="file-edit-list-inner-table-cell">
                                                                                                        {/* <div className='check-box-wrap'>
                                                                                                            <Checkbox 
                                                                                                                size="small"
                                                                                                                // checked={newsId.includes(each.newsId) ? true : false} 
                                                                                                                // onClick={() => handleSelectedcard(each.newsId)}
                                                                                                            />
                                                                                                        </div> */}
                                                                                                        <div className="my-stories-doc-info-wrapper dinamalar-info-wrap">
                                                                                                            <div className="doc-icon-wrapper">
                                                                                                                <span className="doc-icon">
                                                                                                                    <img
                                                                                                                        src={
                                                                                                                            selectedProjectFile?.news_detail?.thumbUrl ?
                                                                                                                            selectedProjectFile?.news_detail?.thumbUrl :
                                                                                                                            isFederal ? FederalImgPlaceholder :
                                                                                                                            isDinamalar ? DinamalarImgPlaceholder :
                                                                                                                            NoImgPlaceholder
                                                                                                                            
                                                                                                                        }
                                                                                                                        onError={({ currentTarget }) => { 
                                                                                                                            currentTarget.onerror = null; // prevents looping
                                                                                                                            currentTarget.src = isFederal ?
                                                                                                                            FederalImgPlaceholder :
                                                                                                                            isDinamalar ? DinamalarImgPlaceholder :
                                                                                                                            NoImgPlaceholder;
                                                                                                                        }}
                                                                                                                        alt="new-img"
                                                                                                                    />
                                                                                                                </span>
                                                                                                            </div>
                                                                                                            <div className="story-info-wrap">
                                                                                                                {selectedProjectFile?.news_detail?.maincat_name && (
                                                                                                                    <span className="category-wrap">{selectedProjectFile?.news_detail?.maincat_name}</span>
                                                                                                                )}
                                                                                                                <Tooltip TransitionComponent={Zoom} title={selectedProjectFile?.news_detail?.heading} placement="top">
                                                                                                                    <span className="file-edit-proj-txt-file-name" onClick={(e) => handleViewStoryClick(e, selectedProjectFile, "src")}>
                                                                                                                        {selectedProjectFile?.news_detail?.heading}
                                                                                                                    </span>
                                                                                                                </Tooltip>
                                                                                                            </div>
                                                                                                            {/* {projectType === 1 || projectType === 2 ? ( */}
                                                                                                            {/* {selectedProjectFile?.filename !== undefined &&
                                                                                                                <>
                                                                                                                    <span className="doc-icon">
                                                                                                                        <img
                                                                                                                            src={
                                                                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                                                                selectedProjectFile?.filename?.split(".")?.pop()
                                                                                                                            }
                                                                                                                            alt="doc-icon"
                                                                                                                        />
                                                                                                                    </span>
                                                                                                                    <Tooltip TransitionComponent={Zoom} title={selectedProjectFile?.filename} placement="top">
                                                                                                                        <span className="file-edit-proj-txt-file-name">
                                                                                                                            {selectedProjectFile?.filename
                                                                                                                                ?.split(".")
                                                                                                                                ?.slice(0, -1)
                                                                                                                                ?.join(".")}
                                                                                                                        </span>
                                                                                                                    </Tooltip>
                                                                                                                    <Tooltip TransitionComponent={Zoom} title={selectedProjectFile?.filename} placement="top">
                                                                                                                        <span className="file-edit-proj-txt-file-extension">
                                                                                                                            {"." + selectedProjectFile?.filename?.split(".")?.pop()}
                                                                                                                        </span>
                                                                                                                    </Tooltip>
                                                                                                                </>
                                                                                                            }
                                                                                                            {(selectedProjectFile?.filename !== undefined) && (selectedProjectAnalysis?.task_words?.find(
                                                                                                                (element) => element[selectedProjectFile?.id]
                                                                                                            )?.[selectedProjectFile?.id] || selectedProjectFile?.task_word_count != null) && (
                                                                                                                    <span className="file-edit-proj-txt-file-extension word-count-capsule">
                                                                                                                        {selectedProjectFile?.task_word_count && <span>
                                                                                                                            {
                                                                                                                                selectedProjectAnalysis?.task_words?.find(
                                                                                                                                    (element) => element[selectedProjectFile?.id]
                                                                                                                                )?.[selectedProjectFile?.id] || selectedProjectFile?.task_word_count
                                                                                                                            } W
                                                                                                                        </span>}
                                                                                                                    </span>
                                                                                                                )} */}
                                                                                                            
                                                                                                        </div>
                                                                                                        <div className="file-edit-translation-txt">
                                                                                                            <span onClick={(e) => handleViewStoryClick(e, selectedProjectFile, "src")}>
                                                                                                                {targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.source_language)?.language}
                                                                                                            </span>
                                                                                                            <img
                                                                                                                src={BlueRightArrow}
                                                                                                            />
                                                                                                            <span onClick={(e) => handleViewStoryClick(e, selectedProjectFile, "tar")}>
                                                                                                                {targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.target_language)?.language}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="file-edit-list-inner-table-cell">
                                                                                                        {isFederal ? (  // task status without calculating segment progress
                                                                                                            <div className="status-conditions-part dont-open-list">
                                                                                                                <span className="file-edit-proj-status-txt">
                                                                                                                    <div
                                                                                                                        className={
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.push_detail && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed" && userDetails?.pk !== each?.assign_to_details?.id)) ? "status-indicator-approved" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed")) ? "status-indicator-completed" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Yet to start")) ? "status-indicator-created" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "In Progress")) ? "status-indicator-in-progress-color" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Return Request")) ? "status-indicator-created" :
                                                                                                                            (selectedProjectFile?.task_assign_info == null && selectedProjectFile?.push_detail) ? "status-indicator-approved" :
                                                                                                                            (selectedProjectFile?.news_detail?.tar_json_exists) ? "status-indicator-in-progress-color" : "status-indicator-created"
                                                                                                                            // (selectedProjectFile?.progress?.total_segments === 0) ?  : ""
                                                                                                                        }
                                                                                                                        should-open-files="dont-open"
                                                                                                                    ></div>
                                                                                                                    {
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.push_detail && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed" && userDetails?.pk !== each?.assign_to_details?.id)) ? t("pushed") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed")) ? t("submitted") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Yet to start")) ? t("yet_to_start") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "In Progress")) ? t("in_progress") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Return Request")) ? t("declined") :
                                                                                                                        (selectedProjectFile?.task_assign_info == null && selectedProjectFile?.push_detail) ? t("pushed") :
                                                                                                                        (selectedProjectFile?.news_detail?.tar_json_exists) ? t("in_progress") : t("yet_to_start")
                                                                                                                        // (selectedProjectFile?.progress?.total_segments === 0) ? t("yet_to_start") : ""
                                                                                                                    }
                                                                                                                </span>
                                                                                                                <span className="more-icon-empty"></span>
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                            <div className="status-conditions-part dont-open-list">
                                                                                                                <span className="file-edit-proj-status-txt">
                                                                                                                    <div
                                                                                                                        className={
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.client_response?.toLowerCase() == "approved")) ? "status-indicator-approved" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed")) ? "status-indicator-completed" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Yet to start")) ? "status-indicator-created" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "In Progress")) ? "status-indicator-in-progress-color" :
                                                                                                                            (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Return Request")) ? "status-indicator-created" :
                                                                                                                            (selectedProjectFile?.task_assign_info == null && selectedProjectFile?.progress?.total_segments !== 0 && selectedProjectFile?.progress?.total_segments === selectedProjectFile?.progress?.confirmed_segments) ? "status-indicator-completed" :
                                                                                                                            (selectedProjectFile?.progress?.total_segments !== 0) ? "status-indicator-in-progress-color" :
                                                                                                                            (selectedProjectFile?.progress?.total_segments === 0) ? "status-indicator-created" : ""
                                                                                                                        }
                                                                                                                        should-open-files="dont-open"
                                                                                                                    ></div>
                                                                                                                    {
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.client_response?.toLowerCase() == "approved")) ? t("approved") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Completed")) ? t("completed_&_submit") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Yet to start")) ? t("yet_to_start") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "In Progress")) ? t("in_progress") :
                                                                                                                        (selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === "Return Request")) ? t("declined") :
                                                                                                                        (selectedProjectFile?.task_assign_info == null && selectedProjectFile?.progress?.total_segments !== 0 && selectedProjectFile?.progress?.total_segments === selectedProjectFile?.progress?.confirmed_segments) ? t("completed") :
                                                                                                                        (selectedProjectFile?.progress?.total_segments !== 0) ? t("in_progress") : 
                                                                                                                        (selectedProjectFile?.progress?.total_segments === 0) ? t("yet_to_start") : ""
                                                                                                                    }
                                                                                                                </span>
                                                                                                                <span className="more-icon-empty"></span>
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>

                                                                                                    <div className="file-edit-list-inner-table-cell">
                                                                                                        {/*  Need to destructure this following conditional code and set everything optimised properly */}
                                                                                                        <div className="file-assigned-member-lists">
                                                                                                            {(userDetails.agency ? (selectedProjectFile?.task_assign_info != null && userDetails.agency && project?.assign_enable) : (selectedProjectFile?.task_assign_info != null)) ?
                                                                                                                (
                                                                                                                    <>
                                                                                                                        {selectedProjectFile?.task_assign_info?.sort((a, b) => a.task_assign_detail.step - b.task_assign_detail.step)?.map(each => console.log())}
                                                                                                                        {
                                                                                                                            (selectedProjectFile?.task_assign_info?.find(each => (Config.userState?.id === each.assign_to_details.id || each?.assign_to_details?.managers?.find(user => user === userDetails.pk))) !== undefined ||
                                                                                                                                selectedProjectFile?.task_assign_info?.find(each => Config.userState?.id === each.assigned_by_details.id) !== undefined) ? (
                                                                                                                                selectedProjectFile?.task_assign_info?.map((eachRole) => {
                                                                                                                                    if (Config.userState?.id === eachRole?.assign_to_details.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) {    // task is assigned to me
                                                                                                                                        if (eachRole.task_assign_detail.step === 1 || eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)?.toUpperCase()
                                                                                                                                                            }
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else if (Config.userState?.id === eachRole?.assigned_by_details.id) {    // // task is assigned by me to someone
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        {selectedProjectFile?.editorUnassigning ? (
                                                                                                                                                            <CircularLoader size={30} />
                                                                                                                                                        ) : (
                                                                                                                                                            <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                                <span className="selected-project-assigned-member">
                                                                                                                                                                    {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                        (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                            ?.charAt(0)?.toUpperCase()
                                                                                                                                                                    }
                                                                                                                                                                </span>
                                                                                                                                                                <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                    </div>
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        {selectedProjectFile?.editorUnassigning ? (
                                                                                                                                                            <CircularLoader size={30} />
                                                                                                                                                        ) : (
                                                                                                                                                            <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                                <span className="selected-project-assigned-member">
                                                                                                                                                                    {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                        (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                            ?.charAt(0)?.toUpperCase()
                                                                                                                                                                    }
                                                                                                                                                                </span>
                                                                                                                                                                <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        {selectedProjectFile?.editorUnassigning ? (
                                                                                                                                                            <CircularLoader size={30} />
                                                                                                                                                        ) : (
                                                                                                                                                            <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                                <span className="selected-project-assigned-member">
                                                                                                                                                                    {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                        (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                            ?.charAt(0)?.toUpperCase()
                                                                                                                                                                    }
                                                                                                                                                                </span>
                                                                                                                                                                <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                    </div>
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        {selectedProjectFile?.editorUnassigning ? (
                                                                                                                                                            <CircularLoader size={30} />
                                                                                                                                                        ) : (
                                                                                                                                                            <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                                <span className="selected-project-assigned-member">
                                                                                                                                                                    {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                        (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                            ?.charAt(0)?.toUpperCase()
                                                                                                                                                                    }
                                                                                                                                                                </span>
                                                                                                                                                                <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            ) : (
                                                                                                                                selectedProjectFile?.task_assign_info?.map((eachRole) => {
                                                                                                                                    if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    {selectedProjectFile?.editorUnassigning ? (
                                                                                                                                                        <CircularLoader size={30} />   
                                                                                                                                                    ) : (
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)?.toUpperCase()
                                                                                                                                                                }
                                                                                                                                                            </span>
                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    )}
                                                                                                                                                    </div>
                                                                                                                                                {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                    <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                    if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                    <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)?.toUpperCase()
                                                                                                                                                            }
                                                                                                                                                        </span>
                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            )
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )
                                                                                                                : ((!project?.file_translate ) && ((userDetails.agency ? (selectedProjectFile?.assignable && userDetails.agency && project?.assign_enable) : (selectedProjectFile?.assignable)) && !is_internal_meber_editor)) && (
                                                                                                                    <>
                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                            <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                    <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                </button>
                                                                                                                            </Tooltip>
                                                                                                                            {   // show assign reviewer button only if project has reviewer step
                                                                                                                                (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && (
                                                                                                                                    <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                        <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                            <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                        </button>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            }

                                                                                                            {/* Re-assign task info for agency/LSP it will show the assigned info card - shows for LSP only */}
                                                                                                            {(typeof selectedProjectFile?.task_reassign_info !== 'boolean' && selectedProjectFile?.task_reassign_info?.length) ?
                                                                                                                (
                                                                                                                    <>
                                                                                                                        {selectedProjectFile?.task_reassign_info?.sort((a, b) => a.task_assign_detail.step - b.task_assign_detail.step)?.map(each => console.log())}
                                                                                                                        {
                                                                                                                            (selectedProjectFile?.task_reassign_info?.find(each => (Config.userState?.id === each?.assign_to_details?.id)) !== undefined ||
                                                                                                                                selectedProjectFile?.task_reassign_info?.find(each => Config.userState?.id === each.assigned_by_details.id) !== undefined) ? (
                                                                                                                                selectedProjectFile?.task_reassign_info?.map((eachRole) => {
                                                                                                                                    if (Config.userState?.id === eachRole?.assign_to_details.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) {    // task is assigned to me
                                                                                                                                        if (eachRole.task_assign_detail.step === 1 || eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)?.toUpperCase()
                                                                                                                                                            }
                                                                                                                                                        </span>
                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else if (Config.userState?.id === eachRole?.assigned_by_details.id) {    // // task is assigned by me to someone
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)?.toUpperCase()
                                                                                                                                                                }
                                                                                                                                                            </span>
                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each?.task_ven_status === 'task_accepted' && !is_internal_meber_editor) &&
                                                                                                                                                            selectedProjectFile?.task_reassign_info?.length === 1) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 1 && each?.task_ven_status === 'task_accepted') && !is_internal_meber_editor) &&
                                                                                                                                                            selectedProjectFile?.task_reassign_info?.length === 1) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)?.toUpperCase()
                                                                                                                                                                }
                                                                                                                                                            </span>
                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)?.toUpperCase()
                                                                                                                                                                }
                                                                                                                                                            </span>
                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)?.toUpperCase()
                                                                                                                                                                }
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            ) : (
                                                                                                                                selectedProjectFile?.task_reassign_info?.map((eachRole) => {
                                                                                                                                    if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)?.toUpperCase()
                                                                                                                                                            }
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                                {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each?.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request')) && selectedFileRow?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                    <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                    if (eachRole.task_assign_detail.step === 2) {
                                                                                                                                        return (
                                                                                                                                            <>
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 1 && each?.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request')) && selectedFileRow?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                                                <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                                                    <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)?.toUpperCase()
                                                                                                                                                            }
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            )
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )
                                                                                                                : (selectedProjectFile?.assignable && userDetails?.agency && !is_internal_meber_editor) && (
                                                                                                                    <>
                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                            {
                                                                                                                                (
                                                                                                                                    selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 1 && each.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request'))
                                                                                                                                ) && (
                                                                                                                                    <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                        <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project) }}>
                                                                                                                                            <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                        </button>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
                                                                                                                            {   // show assign reviewer button only if project has reviewer step
                                                                                                                                (
                                                                                                                                    selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request'))
                                                                                                                                ) && (
                                                                                                                                    <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                        <button className="workspace-files-OpenProjectButton" type="button" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                            <span className="fileopen-new-btn">{t("assign_editor")}</span>
                                                                                                                                        </button>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>

                                                                                                        {/* Task action button logic ---- STARTS HERE */}
                                                                                                        {/* {console.log(selectedProjectFile?.task_assign_info?.find(each => (Config.userState?.id === each.assign_to_details.id || each.assign_to_details?.managers?.find(each => each === userDetails?.pk))))} */}
                                                                                                        <div className="project-list-action-wrap">
                                                                                                            {selectedProjectFile?.task_assign_info?.length ? (  // if task is assigned
                                                                                                                selectedProjectFile?.task_assign_info?.find(each => (Config.userState?.id === each.assign_to_details.id || each.assign_to_details?.managers?.find(each => each === userDetails?.pk))) !== undefined ? (  // if task is assigned to same loged in user (assigned to me)
                                                                                                                    selectedProjectFile?.task_assign_info?.map((eachRole, index) => {  // loop for different types of service type (editor, reviewer..)
                                                                                                                        if ((Config.userState?.id === eachRole?.assign_to_details.id || eachRole.assign_to_details?.managers?.find(each => each === userDetails?.pk)) && ((eachRole.task_assign_detail.step === 1 || eachRole.task_assign_detail.step === 2)) && (eachRole?.assign_to_details?.external_editor)) {  // condition if editor is external editor
                                                                                                                            return (
                                                                                                                                <>
                                                                                                                                    {
                                                                                                                                        <>
                                                                                                                                            {
                                                                                                                                                eachRole?.task_ven_status == null ? (
                                                                                                                                                    selectedProjectFile?.task_assign_info?.filter(each => (each.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers?.find(user => user === userDetails.pk)))?.length == 1 ? (
                                                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                                                            type="button"
                                                                                                                                                            // onMouseUp={() => handleAcceptBtn(eachRole?.assignment_id, selectedProjectFile?.id, eachRole?.task_assign_detail.step, selectedProjectFile?.task_reassign_info)}
                                                                                                                                                            onMouseUp={() => handleGeneralPurposeOpenBtn(project, eachRole, selectedProjectFile)}
                                                                                                                                                        >
                                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                                        </button>
                                                                                                                                                    ) : (selectedProjectFile?.task_assign_info?.filter(each => each.task_ven_status === 'task_accepted')?.length === 1) ? (
                                                                                                                                                        index === 0 &&
                                                                                                                                                        <div className="open-as-button-wrapper">
                                                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                style={{
                                                                                                                                                                    paddingLeft: "15px",
                                                                                                                                                                    paddingRight: "15px"
                                                                                                                                                                }}
                                                                                                                                                                type="button" onClick={(e) => handleOpenAsOption(e, selectedProjectFile.id)}>
                                                                                                                                                                <span className="fileopen-new-btn">{t("open_as")}</span>
                                                                                                                                                                <KeyboardArrowRightIcon className="arrow2-right" />
                                                                                                                                                            </button>
                                                                                                                                                            {
                                                                                                                                                                (openEl && (showOpenAs === selectedProjectFile.id)) &&
                                                                                                                                                                <>
                                                                                                                                                                    <div className="menu-wrapper" ref={showOpenasOutside}>
                                                                                                                                                                        <ul>
                                                                                                                                                                            <li
                                                                                                                                                                                className="list-item"
                                                                                                                                                                                onClick={() => {
                                                                                                                                                                                    handleOpenAsButton(
                                                                                                                                                                                        null,
                                                                                                                                                                                        key,
                                                                                                                                                                                        selectedProjectFile.id,
                                                                                                                                                                                        selectedProjectFile.document_url,
                                                                                                                                                                                        selectedProjectFile.first_time_open,
                                                                                                                                                                                        selectedProjectFile.open_in,
                                                                                                                                                                                        project.project_name,
                                                                                                                                                                                        project.id,
                                                                                                                                                                                        project?.get_project_type,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        'editor',
                                                                                                                                                                                        selectedProjectFile?.task_assign_info,
                                                                                                                                                                                        selectedProjectFile
                                                                                                                                                                                    )
                                                                                                                                                                                }}
                                                                                                                                                                            >
                                                                                                                                                                                <div className="item-wrap">
                                                                                                                                                                                    <span className="text">{t("editor")}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </li>
                                                                                                                                                                            <li
                                                                                                                                                                                className="list-item"
                                                                                                                                                                                onClick={() => {
                                                                                                                                                                                    handleOpenAsButton(
                                                                                                                                                                                        null,
                                                                                                                                                                                        key,
                                                                                                                                                                                        selectedProjectFile.id,
                                                                                                                                                                                        selectedProjectFile.document_url,
                                                                                                                                                                                        selectedProjectFile.first_time_open,
                                                                                                                                                                                        selectedProjectFile.open_in,
                                                                                                                                                                                        project.project_name,
                                                                                                                                                                                        project.id,
                                                                                                                                                                                        project?.get_project_type,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        'reviewer',
                                                                                                                                                                                        selectedProjectFile?.task_assign_info,
                                                                                                                                                                                        selectedProjectFile
                                                                                                                                                                                    )
                                                                                                                                                                                }}
                                                                                                                                                                            >
                                                                                                                                                                                <div className="item-wrap">
                                                                                                                                                                                    <span className="text">{t("reviewer")}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </li>
                                                                                                                                                                        </ul>
                                                                                                                                                                    </div>
                                                                                                                                                                </>
                                                                                                                                                            }
                                                                                                                                                        </div>
                                                                                                                                                    ) : (
                                                                                                                                                        index === 0 &&
                                                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                                                            type="button"
                                                                                                                                                            // onMouseUp={() => handleAcceptBtn(eachRole?.assignment_id, selectedProjectFile?.id, eachRole?.task_assign_detail.step, selectedProjectFile?.task_reassign_info)}
                                                                                                                                                            onMouseUp={() => handleGeneralPurposeOpenBtn(project, eachRole, selectedProjectFile)}
                                                                                                                                                        >
                                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                                        </button>
                                                                                                                                                    )
                                                                                                                                                ) : eachRole?.task_ven_status === "change_request" ? (
                                                                                                                                                    selectedProjectFile?.task_assign_info?.filter(each => (each.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers?.find(user => user === userDetails.pk)))?.length == 1 ? (
                                                                                                                                                        index === 0 &&
                                                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                                                            type="button"
                                                                                                                                                            style={{
                                                                                                                                                                backgroundColor: '#cccccc', color: '#666666', paddingLeft: "15px",
                                                                                                                                                                paddingRight: "15px"
                                                                                                                                                            }}
                                                                                                                                                            disabled={true}
                                                                                                                                                        >
                                                                                                                                                            <span className="fileopen-new-btn">{t("request_sent")}</span>
                                                                                                                                                        </button>
                                                                                                                                                    ) : (
                                                                                                                                                        index === 0 &&
                                                                                                                                                        <div className="open-as-button-wrapper">
                                                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                style={{
                                                                                                                                                                    paddingLeft: "15px",
                                                                                                                                                                    paddingRight: "15px"
                                                                                                                                                                }}
                                                                                                                                                                type="button" onClick={(e) => handleOpenAsOption(e, selectedProjectFile.id)}>
                                                                                                                                                                <span className="fileopen-new-btn">{t("open_as")}</span>
                                                                                                                                                                <KeyboardArrowRightIcon className="arrow2-right" />
                                                                                                                                                            </button>
                                                                                                                                                            {
                                                                                                                                                                (openEl && (showOpenAs === selectedProjectFile.id)) &&
                                                                                                                                                                <>
                                                                                                                                                                    <div className="menu-wrapper" ref={showOpenasOutside}>
                                                                                                                                                                        <ul>
                                                                                                                                                                            <li
                                                                                                                                                                                className="list-item"
                                                                                                                                                                                onClick={() => {
                                                                                                                                                                                    handleOpenAsButton(
                                                                                                                                                                                        null,
                                                                                                                                                                                        key,
                                                                                                                                                                                        selectedProjectFile.id,
                                                                                                                                                                                        selectedProjectFile.document_url,
                                                                                                                                                                                        selectedProjectFile.first_time_open,
                                                                                                                                                                                        selectedProjectFile.open_in,
                                                                                                                                                                                        project.project_name,
                                                                                                                                                                                        project.id,
                                                                                                                                                                                        project?.get_project_type,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        'editor',
                                                                                                                                                                                        selectedProjectFile?.task_assign_info,
                                                                                                                                                                                        selectedProjectFile
                                                                                                                                                                                    )
                                                                                                                                                                                }}
                                                                                                                                                                            >
                                                                                                                                                                                <div className="item-wrap">
                                                                                                                                                                                    <span className="text">{t("editor")}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </li>
                                                                                                                                                                            <li
                                                                                                                                                                                className="list-item"
                                                                                                                                                                                onClick={() => {
                                                                                                                                                                                    handleOpenAsButton(
                                                                                                                                                                                        null,
                                                                                                                                                                                        key,
                                                                                                                                                                                        selectedProjectFile.id,
                                                                                                                                                                                        selectedProjectFile.document_url,
                                                                                                                                                                                        selectedProjectFile.first_time_open,
                                                                                                                                                                                        selectedProjectFile.open_in,
                                                                                                                                                                                        project.project_name,
                                                                                                                                                                                        project.id,
                                                                                                                                                                                        project?.get_project_type,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        null,
                                                                                                                                                                                        'reviewer',
                                                                                                                                                                                        selectedProjectFile?.task_assign_info,
                                                                                                                                                                                        selectedProjectFile
                                                                                                                                                                                    )
                                                                                                                                                                                }}
                                                                                                                                                                            >
                                                                                                                                                                                <div className="item-wrap">
                                                                                                                                                                                    <span className="text">{t("reviewer")}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </li>
                                                                                                                                                                        </ul>
                                                                                                                                                                    </div>
                                                                                                                                                                </>
                                                                                                                                                            }
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                ) : eachRole?.task_ven_status === "task_accepted" ? (
                                                                                                                                                    selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false ? (
                                                                                                                                                        clickedOpenButton == key ? (
                                                                                                                                                            <>
                                                                                                                                                                <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                                                    <span className="fileopen-new-btn">
                                                                                                                                                                        <ButtonLoader />
                                                                                                                                                                        {t("transcribing")}
                                                                                                                                                                    </span>
                                                                                                                                                                </button>
                                                                                                                                                                <span className="more-icon-empty"></span>
                                                                                                                                                            </>
                                                                                                                                                        ) : (
                                                                                                                                                            (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                                                <>
                                                                                                                                                                    <ProgressAnimateButton />
                                                                                                                                                                    <span className="more-icon-empty"></span>
                                                                                                                                                                </>
                                                                                                                                                            ) : (
                                                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                    type="button"
                                                                                                                                                                    onMouseUp={(e) => transcribeAudioFile(project?.id, selectedProjectFile?.id, key)}
                                                                                                                                                                    disabled={selectedProjectFile?.pre_trans_processing}
                                                                                                                                                                    style={selectedProjectFile?.pre_trans_processing ? { opacity: '0.6' } : { opacity: 1 }}
                                                                                                                                                                >
                                                                                                                                                                    <span className="fileopen-new-btn">{t("transcribe")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            )
                                                                                                                                                        )
                                                                                                                                                    ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed ? (    // this wil show submit button for writer document
                                                                                                                                                        <>
                                                                                                                                                            {(eachRole?.task_assign_detail?.task_status === 'In Progress') &&
                                                                                                                                                                <button
                                                                                                                                                                    type="button"
                                                                                                                                                                    className="workspace-files-SubmitProjectButton"
                                                                                                                                                                    onMouseUp={() => setDocumentSubmitParameters({
                                                                                                                                                                        taskid: selectedProjectFile?.id,
                                                                                                                                                                        step: eachRole?.task_assign_detail?.step,
                                                                                                                                                                        confirm: selectedProjectFile?.progress?.confirmed_segments,
                                                                                                                                                                        total: selectedProjectFile?.progress?.total_segments,
                                                                                                                                                                        isTaskReassigned: (typeof selectedProjectFile.task_reassign_info === 'boolean' ? true : false)
                                                                                                                                                                    })}
                                                                                                                                                                >
                                                                                                                                                                    <span className="file-submit-new-btn">{t("submit")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            }
                                                                                                                                                            <Tooltip title={t("view_transcription")} TransitionComponent={Zoom} placement="top">
                                                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                    type="button"
                                                                                                                                                                    style={{
                                                                                                                                                                        paddingLeft: "30px",
                                                                                                                                                                        paddingRight: "30px"
                                                                                                                                                                    }}
                                                                                                                                                                    onMouseUp={(e) => openAilaysaWriter(project?.id, selectedProjectFile?.id, true)}
                                                                                                                                                                >
                                                                                                                                                                    <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                                                                </button>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </>
                                                                                                                                                    ) : (
                                                                                                                                                        <>
                                                                                                                                                            {/* remove disabled and style props to remove or unlock the editor/reviewer */}
                                                                                                                                                            {(userDetails?.agency && selectedProjectFile?.task_assign_info?.length > 1) ? (
                                                                                                                                                                (index === 0) &&
                                                                                                                                                                <div className="open-as-button-wrapper">
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                        style={{
                                                                                                                                                                            paddingLeft: "15px",
                                                                                                                                                                            paddingRight: "15px"
                                                                                                                                                                        }}
                                                                                                                                                                        type="button" onClick={(e) => handleOpenAsOption(e, selectedProjectFile.id)}>
                                                                                                                                                                        <span className="fileopen-new-btn">{t("open_as")}</span>
                                                                                                                                                                        <KeyboardArrowRightIcon className="arrow2-right" />
                                                                                                                                                                    </button>
                                                                                                                                                                    {
                                                                                                                                                                        (openEl && (showOpenAs === selectedProjectFile.id)) &&
                                                                                                                                                                        <>
                                                                                                                                                                            <div className="menu-wrapper" ref={showOpenasOutside}>
                                                                                                                                                                                <ul>
                                                                                                                                                                                    <li
                                                                                                                                                                                        className="list-item"
                                                                                                                                                                                        onClick={() => {
                                                                                                                                                                                            handleOpenAsButton(
                                                                                                                                                                                                null,
                                                                                                                                                                                                key,
                                                                                                                                                                                                selectedProjectFile.id,
                                                                                                                                                                                                selectedProjectFile.document_url,
                                                                                                                                                                                                selectedProjectFile.first_time_open,
                                                                                                                                                                                                selectedProjectFile.open_in,
                                                                                                                                                                                                project.project_name,
                                                                                                                                                                                                project.id,
                                                                                                                                                                                                project?.get_project_type,
                                                                                                                                                                                                null,
                                                                                                                                                                                                null,
                                                                                                                                                                                                null,
                                                                                                                                                                                                'editor',
                                                                                                                                                                                                selectedProjectFile?.task_assign_info,
                                                                                                                                                                                                selectedProjectFile
                                                                                                                                                                                            )
                                                                                                                                                                                        }}
                                                                                                                                                                                    >
                                                                                                                                                                                        <div className="item-wrap">
                                                                                                                                                                                            <span className="text">{t("editor")}</span>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </li>
                                                                                                                                                                                    <li
                                                                                                                                                                                        className="list-item"
                                                                                                                                                                                        onClick={() => {
                                                                                                                                                                                            handleOpenAsButton(
                                                                                                                                                                                                null,
                                                                                                                                                                                                key,
                                                                                                                                                                                                selectedProjectFile.id,
                                                                                                                                                                                                selectedProjectFile.document_url,
                                                                                                                                                                                                selectedProjectFile.first_time_open,
                                                                                                                                                                                                selectedProjectFile.open_in,
                                                                                                                                                                                                project.project_name,
                                                                                                                                                                                                project.id,
                                                                                                                                                                                                project?.get_project_type,
                                                                                                                                                                                                null,
                                                                                                                                                                                                null,
                                                                                                                                                                                                null,
                                                                                                                                                                                                'reviewer',
                                                                                                                                                                                                selectedProjectFile?.task_assign_info,
                                                                                                                                                                                                selectedProjectFile
                                                                                                                                                                                            )
                                                                                                                                                                                        }}
                                                                                                                                                                                    >
                                                                                                                                                                                        <div className="item-wrap">
                                                                                                                                                                                            <span className="text">{t("reviewer")}</span>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </li>
                                                                                                                                                                                </ul>
                                                                                                                                                                            </div>
                                                                                                                                                                        </>
                                                                                                                                                                    }
                                                                                                                                                                </div>
                                                                                                                                                            ) : (
                                                                                                                                                                (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                                                    <ProgressAnimateButton />
                                                                                                                                                                ) : (
                                                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                                                        type="button"
                                                                                                                                                                        // style={!eachRole?.task_assign_detail?.can_open ? {backgroundColor: '#cccccc', color: '#666666', paddingLeft: "30px",  paddingRight: "30px"} : {paddingLeft: "30px",  paddingRight: "30px"}}
                                                                                                                                                                        onMouseUp={(e) =>
                                                                                                                                                                            openFile(
                                                                                                                                                                                e,
                                                                                                                                                                                key,
                                                                                                                                                                                selectedProjectFile.id,
                                                                                                                                                                                selectedProjectFile.document_url,
                                                                                                                                                                                selectedProjectFile.first_time_open,
                                                                                                                                                                                selectedProjectFile.open_in,
                                                                                                                                                                                project.project_name,
                                                                                                                                                                                project.id,
                                                                                                                                                                                project?.get_project_type,
                                                                                                                                                                                null, null, null, eachRole.task_assign_detail.step === 1 ? 'editor' : 'reviewer',
                                                                                                                                                                                selectedProjectFile,
                                                                                                                                                                                project
                                                                                                                                                                            )
                                                                                                                                                                        }
                                                                                                                                                                    >
                                                                                                                                                                        <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                                                    </button>
                                                                                                                                                                )
                                                                                                                                                            )}
                                                                                                                                                        </>
                                                                                                                                                    )
                                                                                                                                                ) : null
                                                                                                                                            }
                                                                                                                                            {
                                                                                                                                                (index === 0) &&
                                                                                                                                                <div className="more-options-wrap">
                                                                                                                                                    <ButtonBase onClick={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                                                                                                                                                        <MoreVertIcon className="more-icon" />
                                                                                                                                                    </ButtonBase>
                                                                                                                                                    {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                                                                                                                                                        <>
                                                                                                                                                            <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                                <ul>
                                                                                                                                                                    {
                                                                                                                                                                        moreOptions?.filter(item => item.label === 'View PO')?.map((item) => {
                                                                                                                                                                            return (
                                                                                                                                                                                <li
                                                                                                                                                                                    key={item.id}
                                                                                                                                                                                    className="list-item"
                                                                                                                                                                                    onClick={(e) =>
                                                                                                                                                                                        item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                                                                                                                                                    }
                                                                                                                                                                                    style={selectedProjectFile?.pre_trans_processing ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                                                                                                                // onMouseEnter={item.arrow_icon ? ((e) => handleSubDownloadOption(e)) : ((e) => handleSubDownloadOptioHide(e))}
                                                                                                                                                                                >
                                                                                                                                                                                    <div className="item-wrap">
                                                                                                                                                                                        <span className="icon">{item.icon}</span>
                                                                                                                                                                                        <span className="text">{item.label}</span>
                                                                                                                                                                                    </div>
                                                                                                                                                                                    {
                                                                                                                                                                                        item.arrow_icon &&
                                                                                                                                                                                        <>
                                                                                                                                                                                            {item.arrow_icon}
                                                                                                                                                                                        </>
                                                                                                                                                                                    }
                                                                                                                                                                                </li>
                                                                                                                                                                            )
                                                                                                                                                                        })
                                                                                                                                                                    }
                                                                                                                                                                </ul>
                                                                                                                                                            </div>
                                                                                                                                                        </>
                                                                                                                                                    }
                                                                                                                                                </div>
                                                                                                                                            }
                                                                                                                                        </>
                                                                                                                                    }
                                                                                                                                </>

                                                                                                                            )
                                                                                                                        }
                                                                                                                        else if (!eachRole?.assign_to_details?.external_editor && Config.userState?.id === eachRole?.assign_to_details.id) {  // condition if editor is not external editor (user is internal editor)
                                                                                                                            return (
                                                                                                                                selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false ? (
                                                                                                                                    clickedOpenButton == key ? (
                                                                                                                                        <>
                                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                                    <ButtonLoader />
                                                                                                                                                    {t("transcribing")}
                                                                                                                                                </span>
                                                                                                                                            </button>
                                                                                                                                            <span className="more-icon-empty"></span>
                                                                                                                                        </>
                                                                                                                                    ) : (
                                                                                                                                        (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                            <ProgressAnimateButton />
                                                                                                                                        ) : (
                                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                                type="button"
                                                                                                                                                onMouseUp={(e) => transcribeAudioFile(project?.id, selectedProjectFile?.id, key)}
                                                                                                                                                disabled={selectedProjectFile?.pre_trans_processing}
                                                                                                                                                style={selectedProjectFile?.pre_trans_processing ? { opacity: '0.6' } : { opacity: 1 }}
                                                                                                                                            >
                                                                                                                                                <span className="fileopen-new-btn">{t("transcribe")}</span>
                                                                                                                                            </button>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed ? (
                                                                                                                                    <>
                                                                                                                                        {(eachRole?.task_assign_detail?.task_status === 'In Progress') &&
                                                                                                                                            <button
                                                                                                                                                type="button"
                                                                                                                                                className="mr-2 workspace-files-SubmitProjectButton"
                                                                                                                                                onMouseUp={() => setDocumentSubmitParameters({
                                                                                                                                                    taskid: selectedProjectFile?.id,
                                                                                                                                                    step: eachRole?.task_assign_detail?.step,
                                                                                                                                                    confirm: selectedProjectFile?.progress?.confirmed_segments,
                                                                                                                                                    total: selectedProjectFile?.progress?.total_segments,
                                                                                                                                                    isTaskReassigned: (typeof selectedProjectFile.task_reassign_info === 'boolean' ? true : false)
                                                                                                                                                })}
                                                                                                                                            >
                                                                                                                                                <span className="file-submit-new-btn">{t("submit")}</span>
                                                                                                                                            </button>
                                                                                                                                        }
                                                                                                                                        <Tooltip title={t("view_transcription")} TransitionComponent={Zoom} placement="top">
                                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                                type="button"
                                                                                                                                                style={{
                                                                                                                                                    paddingLeft: "30px",
                                                                                                                                                    paddingRight: "30px"
                                                                                                                                                }}
                                                                                                                                                onMouseUp={(e) => openAilaysaWriter(project?.id, selectedProjectFile?.id, true)}
                                                                                                                                            >
                                                                                                                                                <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                                            </button>
                                                                                                                                        </Tooltip>
                                                                                                                                    </>
                                                                                                                                ) : (
                                                                                                                                    (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                        <ProgressAnimateButton />
                                                                                                                                    ) : (
                                                                                                                                        clickedOpenButton == key ? (
                                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                                    <ButtonLoader />
                                                                                                                                                    {t("opening")}
                                                                                                                                                </span>
                                                                                                                                            </button>
                                                                                                                                        ) : (
                                                                                                                                            <button className="workspace-files-OpenProjectButton"        
                                                                                                                                                type="button"
                                                                                                                                                // disabled={!eachRole?.task_assign_detail?.can_open}
                                                                                                                                                onMouseUp={(e) =>
                                                                                                                                                    openFile(
                                                                                                                                                        e,
                                                                                                                                                        key,
                                                                                                                                                        selectedProjectFile.id,
                                                                                                                                                        selectedProjectFile.document_url,
                                                                                                                                                        selectedProjectFile.first_time_open,
                                                                                                                                                        selectedProjectFile.open_in,
                                                                                                                                                        project.project_name,
                                                                                                                                                        project.id,
                                                                                                                                                        project?.get_project_type,
                                                                                                                                                        null,
                                                                                                                                                        null,
                                                                                                                                                        null,
                                                                                                                                                        null,
                                                                                                                                                        selectedProjectFile,
                                                                                                                                                        project
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                            >
                                                                                                                                                <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                            </button>
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )
                                                                                                                            )
                                                                                                                        }
                                                                                                                    })
                                                                                                                ) : selectedProjectFile?.task_assign_info?.find(each => Config.userState?.id === each.assigned_by_details.id) !== undefined ? (   // if task is assigned by me (I assigned the task to someone)
                                                                                                                    (selectedProjectFile?.open_in == 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined ? (
                                                                                                                        <>
                                                                                                                            {/* {
                                                                                                                        !selectedProjectFile?.pre_trans_processing && (
                                                                                                                            <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                    <img
                                                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                                                                        alt="close_black"
                                                                                                                                    />
                                                                                                                                </span>
                                                                                                                            </Tooltip>
                                                                                                                        )
                                                                                                                    } */}
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                type="button"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "16px",
                                                                                                                                    paddingRight: "16px"
                                                                                                                                }}
                                                                                                                                onMouseUp={(e) => downloadSourceAudioFile(selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("download")}</span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : selectedProjectFile?.open_in == 'Download' && selectedProjectFile?.text_to_speech_convert_enable ? (
                                                                                                                        <>
                                                                                                                            {/* {
                                                                                                                        !selectedProjectFile?.pre_trans_processing && (
                                                                                                                            <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                    <img
                                                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                                                                        alt="close_black"
                                                                                                                                    />
                                                                                                                                </span>
                                                                                                                            </Tooltip>
                                                                                                                        )
                                                                                                                    } */}
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                type="button"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "22px",
                                                                                                                                    paddingRight: "22px"
                                                                                                                                }}
                                                                                                                                onMouseUp={(e) => downloadSourceAudioFile(selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false ? (
                                                                                                                        clickedOpenButton == key ? (
                                                                                                                            <>
                                                                                                                                <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                    <span className="fileopen-new-btn">
                                                                                                                                        <ButtonLoader />
                                                                                                                                        {t("transcribing")}
                                                                                                                                    </span>
                                                                                                                                </button>
                                                                                                                                <span className="more-icon-empty"></span>
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                <ProgressAnimateButton />
                                                                                                                            ) : (
                                                                                                                                <>
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        onMouseUp={(e) => transcribeAudioFile(project?.id, selectedProjectFile?.id, key)}
                                                                                                                                        disabled={selectedProjectFile?.pre_trans_processing}
                                                                                                                                        style={selectedProjectFile?.pre_trans_processing ? { opacity: '0.6' } : { opacity: 1 }}
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">{t("transcribe")}</span>
                                                                                                                                    </button>
                                                                                                                                    <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                                </>
                                                                                                                            )
                                                                                                                        )
                                                                                                                    ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed ? (
                                                                                                                        <>
                                                                                                                            <Tooltip title={t("view_transcription")} TransitionComponent={Zoom} placement="top">
                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                    type="button"
                                                                                                                                    style={{
                                                                                                                                        paddingLeft: "30px",
                                                                                                                                        paddingRight: "30px"
                                                                                                                                    }}
                                                                                                                                    onMouseUp={(e) => openAilaysaWriter(project?.id, selectedProjectFile?.id)}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                                </button>
                                                                                                                            </Tooltip>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                            <ProgressAnimateButton />
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                {
                                                                                                                                    clickedOpenButton == key ? (
                                                                                                                                        <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                                <ButtonLoader />
                                                                                                                                                {t("opening")}
                                                                                                                                            </span>
                                                                                                                                        </button>
                                                                                                                                    ) : (
                                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                                            type="button"
                                                                                                                                            onMouseUp={(e) =>
                                                                                                                                                openFile(
                                                                                                                                                    e,
                                                                                                                                                    key,
                                                                                                                                                    selectedProjectFile.id,
                                                                                                                                                    selectedProjectFile.document_url,
                                                                                                                                                    selectedProjectFile.first_time_open,
                                                                                                                                                    selectedProjectFile.open_in,
                                                                                                                                                    project.project_name,
                                                                                                                                                    project.id,
                                                                                                                                                    project?.get_project_type,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    selectedProjectFile,
                                                                                                                                                    project
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                        </button>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                                {isFederal && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === 'Completed') && (
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        style={
                                                                                                                                            selectedProjectFile?.push_detail ? 
                                                                                                                                            {backgroundColor: "#9d9db1"} : {}
                                                                                                                                        }
                                                                                                                                        onClick={(e) => {
                                                                                                                                            selectedProjectFile?.push_detail ?
                                                                                                                                            Config.toast("Story already has been pushed") : pushStoryToCMS(e, selectedProjectFile, project?.id)
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">
                                                                                                                                            {isStoryIdPushing === selectedProjectFile?.id && (
                                                                                                                                                <ButtonLoader />
                                                                                                                                            )}
                                                                                                                                            {selectedProjectFile?.push_detail ? t("pushed") : t("push")}
                                                                                                                                        </span>
                                                                                                                                    </button>
                                                                                                                                )}
                                                                                                                                <div className="more-options-wrap">
                                                                                                                                    {project.get_project_type === 6 ? (
                                                                                                                                        <MoreOptionsIconDesigner project={project} removeDelete={false} assigned={selectedProjectFile.task_assign_info == null ? false : true} removeEdit={true} selectedProjectFile={selectedProjectFile} />
                                                                                                                                    ) : (
                                                                                                                                        <>
                                                                                                                                            <ButtonBase onClick={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                                                                                                                                                <MoreVertIcon className="more-icon" />
                                                                                                                                            </ButtonBase>
                                                                                                                                            {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                                                                                                                                                <>
                                                                                                                                                    <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                        <ul>
                                                                                                                                                            {
                                                                                                                                                                moreOptions?.filter(item => (
                                                                                                                                                                    (project?.get_project_type !== 5 && project?.get_project_type !== 3) ?
                                                                                                                                                                        (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? item.id !== 3 : item.id
                                                                                                                                                                        : (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? (item.id !== 3 && item.id !== 1) : item.id !== 1
                                                                                                                                                                ))?.map((item) => {
                                                                                                                                                                    return (
                                                                                                                                                                        <li
                                                                                                                                                                            key={item.id}
                                                                                                                                                                            className="list-item"
                                                                                                                                                                            onClick={(e) =>
                                                                                                                                                                                item?.label === 'Delete' ? handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info) :
                                                                                                                                                                                    item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                                                                                                                                            }
                                                                                                                                                                            style={selectedProjectFile?.pre_trans_processing ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                                                                                                            onMouseEnter={item.arrow_icon ? ((e) => handleSubDownloadOption(e)) : ((e) => handleSubDownloadOptioHide(e))}
                                                                                                                                                                        >
                                                                                                                                                                            <div className="item-wrap">
                                                                                                                                                                                <span className="icon">{item.icon}</span>
                                                                                                                                                                                <span className="text">{item.label}</span>
                                                                                                                                                                            </div>
                                                                                                                                                                            {
                                                                                                                                                                                item.arrow_icon &&
                                                                                                                                                                                <>
                                                                                                                                                                                    {item.arrow_icon}
                                                                                                                                                                                </>
                                                                                                                                                                            }
                                                                                                                                                                        </li>
                                                                                                                                                                    )
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                        </ul>
                                                                                                                                                        {
                                                                                                                                                            subDownloadOption &&
                                                                                                                                                            <>
                                                                                                                                                                <div className="download-sub-menu" onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                                    <ul>
                                                                                                                                                                        {
                                                                                                                                                                            subDownloadOptions?.filter(each => project.mt_enable ? true : each.value !== 'MTRAW')?.map((item) => {
                                                                                                                                                                                return (
                                                                                                                                                                                    <li
                                                                                                                                                                                        key={item.id}
                                                                                                                                                                                        className="list-inner-item"
                                                                                                                                                                                        style={
                                                                                                                                                                                            (selectedProjectFile?.isTaskDownloading != item?.value) ?
                                                                                                                                                                                                {} : { opacity: 0.7 }
                                                                                                                                                                                        }
                                                                                                                                                                                        onClick={(e) => {
                                                                                                                                                                                            docCreditCheckAlertRef.current = selectedProjectFile.mt_only_credit_check;
                                                                                                                                                                                            (selectedProjectFile?.isTaskDownloading != item?.value) &&
                                                                                                                                                                                                downloadDifferentFile(
                                                                                                                                                                                                    item?.value,
                                                                                                                                                                                                    selectedProjectFile?.document,
                                                                                                                                                                                                    e,
                                                                                                                                                                                                    key,
                                                                                                                                                                                                    selectedProjectFile.id,
                                                                                                                                                                                                    selectedProjectFile.document_url,
                                                                                                                                                                                                    selectedProjectFile.first_time_open,
                                                                                                                                                                                                    selectedProjectFile.open_in,
                                                                                                                                                                                                    project.project_name,
                                                                                                                                                                                                    project.id,
                                                                                                                                                                                                    project?.get_project_type,
                                                                                                                                                                                                    selectedProjectFile?.filename,
                                                                                                                                                                                                    selectedProjectFile
                                                                                                                                                                                                )
                                                                                                                                                                                        }}
                                                                                                                                                                                    >
                                                                                                                                                                                        {item.label}
                                                                                                                                                                                    </li>
                                                                                                                                                                                )
                                                                                                                                                                            })
                                                                                                                                                                        }
                                                                                                                                                                    </ul>
                                                                                                                                                                </div>
                                                                                                                                                            </>
                                                                                                                                                        }
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            }
                                                                                                                                        </>
                                                                                                                                    )}
                                                                                                                                    
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                ) : (   // task is assigned, but the task is not assigned by me and the task is not assined to me (internal editor -> project owner) (project-owner view)
                                                                                                                    (selectedProjectFile?.open_in == 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined ? (
                                                                                                                        <>
                                                                                                                            {/* {
                                                                                                                        !selectedProjectFile?.pre_trans_processing && (
                                                                                                                            <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                    <img
                                                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                                                                        alt="close_black"
                                                                                                                                    />
                                                                                                                                </span>
                                                                                                                            </Tooltip>
                                                                                                                        )
                                                                                                                    } */}
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "16px",
                                                                                                                                    paddingRight: "16px"
                                                                                                                                }}
                                                                                                                                type="button"
                                                                                                                                onMouseUp={(e) => downloadSourceAudioFile(selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("download")}</span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : selectedProjectFile?.open_in == 'Download' && selectedProjectFile?.text_to_speech_convert_enable ? (
                                                                                                                        <>
                                                                                                                            {/* {
                                                                                                                        !selectedProjectFile?.pre_trans_processing && (
                                                                                                                            <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                    <img
                                                                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                                                                        alt="close_black"
                                                                                                                                    />
                                                                                                                                </span>
                                                                                                                            </Tooltip>
                                                                                                                        )
                                                                                                                    } */}
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                type="button"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "22px",
                                                                                                                                    paddingRight: "22px"
                                                                                                                                }}
                                                                                                                                onMouseUp={(e) => downloadSourceAudioFile(selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false ? (
                                                                                                                        clickedOpenButton == key ? (
                                                                                                                            <>
                                                                                                                                <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                    <span className="fileopen-new-btn">
                                                                                                                                        <ButtonLoader />
                                                                                                                                        {t("transcribing")}
                                                                                                                                    </span>
                                                                                                                                </button>
                                                                                                                                <span className="more-icon-empty"></span>
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                <>
                                                                                                                                    <ProgressAnimateButton />
                                                                                                                                    <span className="more-icon-empty"></span>
                                                                                                                                </>
                                                                                                                            ) : (
                                                                                                                                <>
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        onMouseUp={(e) => transcribeAudioFile(project?.id, selectedProjectFile?.id, key)}
                                                                                                                                        disabled={selectedProjectFile?.pre_trans_processing}
                                                                                                                                        style={selectedProjectFile?.pre_trans_processing ? { opacity: '0.6' } : { opacity: 1 }}
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">{t("transcribe")}</span>
                                                                                                                                    </button>
                                                                                                                                    <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                                </>
                                                                                                                            )
                                                                                                                        )
                                                                                                                    ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed ? (
                                                                                                                        <>
                                                                                                                            <Tooltip title={t("view_transcription")} TransitionComponent={Zoom} placement="top">
                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                    type="button"
                                                                                                                                    style={{
                                                                                                                                        paddingLeft: "30px",
                                                                                                                                        paddingRight: "30px"
                                                                                                                                    }}
                                                                                                                                    onMouseUp={(e) => openAilaysaWriter(project?.id, selectedProjectFile?.id)}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                                </button>
                                                                                                                            </Tooltip>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                            <ProgressAnimateButton />
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                {
                                                                                                                                    clickedOpenButton == key ? (
                                                                                                                                        <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                                <ButtonLoader />
                                                                                                                                                {t("opening")}
                                                                                                                                            </span>
                                                                                                                                        </button>
                                                                                                                                    ) : (
                                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                                            type="button"
                                                                                                                                            onMouseUp={(e) =>
                                                                                                                                                openFile(
                                                                                                                                                    e,
                                                                                                                                                    key,
                                                                                                                                                    selectedProjectFile.id,
                                                                                                                                                    selectedProjectFile.document_url,
                                                                                                                                                    selectedProjectFile.first_time_open,
                                                                                                                                                    selectedProjectFile.open_in,
                                                                                                                                                    project.project_name,
                                                                                                                                                    project.id,
                                                                                                                                                    project?.get_project_type,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    null,
                                                                                                                                                    selectedProjectFile,
                                                                                                                                                    project
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                        </button>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                                {isFederal && selectedProjectFile?.task_assign_info?.find(each => each?.task_assign_detail?.task_status === 'Completed') && (
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        style={
                                                                                                                                            selectedProjectFile?.push_detail ? 
                                                                                                                                            {backgroundColor: "#9d9db1"} : {}
                                                                                                                                        }
                                                                                                                                        onClick={(e) => {
                                                                                                                                            selectedProjectFile?.push_detail ?
                                                                                                                                            Config.toast("Story already has been pushed") : pushStoryToCMS(e, selectedProjectFile, project?.id)
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">
                                                                                                                                            {isStoryIdPushing === selectedProjectFile?.id && (
                                                                                                                                                <ButtonLoader />
                                                                                                                                            )}
                                                                                                                                            {selectedProjectFile?.push_detail ? t("pushed") : t("push")}
                                                                                                                                        </span>
                                                                                                                                    </button>
                                                                                                                                )}
                                                                                                                                <div className="more-options-wrap">
                                                                                                                                    {project.get_project_type === 6 ? (
                                                                                                                                        <MoreOptionsIconDesigner project={project} removeDelete={false} assigned={selectedProjectFile.task_assign_info == null ? false : true} removeEdit={true} selectedProjectFile={selectedProjectFile} />
                                                                                                                                    ) : (
                                                                                                                                        <>
                                                                                                                                            <ButtonBase onClick={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                                                                                                                                                <MoreVertIcon className="more-icon" />
                                                                                                                                            </ButtonBase>
                                                                                                                                            {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                                                                                                                                                <>
                                                                                                                                                    <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                        <ul>
                                                                                                                                                            {
                                                                                                                                                                moreOptions?.filter(item => (
                                                                                                                                                                    (project?.get_project_type !== 5 && project?.get_project_type !== 3) ?
                                                                                                                                                                        (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? item.id !== 3 : item.id
                                                                                                                                                                        : (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? (item.id !== 3 && item.id !== 1) : item.id !== 1
                                                                                                                                                                ))?.map((item) => {
                                                                                                                                                                    return (
                                                                                                                                                                        <li
                                                                                                                                                                            key={item.id}
                                                                                                                                                                            className="list-item"
                                                                                                                                                                            onClick={(e) =>
                                                                                                                                                                                item?.label === 'Delete' ? handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info) :
                                                                                                                                                                                    item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                                                                                                                                            }
                                                                                                                                                                            style={selectedProjectFile?.pre_trans_processing ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                                                                                                            onMouseEnter={item.arrow_icon ? ((e) => handleSubDownloadOption(e)) : ((e) => handleSubDownloadOptioHide(e))}
                                                                                                                                                                        >
                                                                                                                                                                            <div className="item-wrap">
                                                                                                                                                                                <span className="icon">{item.icon}</span>
                                                                                                                                                                                <span className="text">{item.label}</span>
                                                                                                                                                                            </div>
                                                                                                                                                                            {
                                                                                                                                                                                item.arrow_icon &&
                                                                                                                                                                                <>
                                                                                                                                                                                    {item.arrow_icon}
                                                                                                                                                                                </>
                                                                                                                                                                            }
                                                                                                                                                                        </li>
                                                                                                                                                                    )
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                        </ul>
                                                                                                                                                        {
                                                                                                                                                            subDownloadOption &&
                                                                                                                                                            <>
                                                                                                                                                                <div className="download-sub-menu" onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                                    <ul>
                                                                                                                                                                        {
                                                                                                                                                                            subDownloadOptions?.filter(each => project.mt_enable ? true : each.value !== 'MTRAW')?.map((item) => {
                                                                                                                                                                                return (
                                                                                                                                                                                    <li
                                                                                                                                                                                        key={item.id}
                                                                                                                                                                                        className="list-inner-item"
                                                                                                                                                                                        style={
                                                                                                                                                                                            (selectedProjectFile?.isTaskDownloading != item?.value) ?
                                                                                                                                                                                                {} : { opacity: 0.7 }
                                                                                                                                                                                        }
                                                                                                                                                                                        onClick={(e) => {
                                                                                                                                                                                            docCreditCheckAlertRef.current = selectedProjectFile.mt_only_credit_check;
                                                                                                                                                                                            (selectedProjectFile?.isTaskDownloading != item?.value) &&
                                                                                                                                                                                                downloadDifferentFile(
                                                                                                                                                                                                    item?.value,
                                                                                                                                                                                                    selectedProjectFile?.document,
                                                                                                                                                                                                    e,
                                                                                                                                                                                                    key,
                                                                                                                                                                                                    selectedProjectFile.id,
                                                                                                                                                                                                    selectedProjectFile.document_url,
                                                                                                                                                                                                    selectedProjectFile.first_time_open,
                                                                                                                                                                                                    selectedProjectFile.open_in,
                                                                                                                                                                                                    project.project_name,
                                                                                                                                                                                                    project.id,
                                                                                                                                                                                                    project?.get_project_type,
                                                                                                                                                                                                    selectedProjectFile?.filename,
                                                                                                                                                                                                    selectedProjectFile
                                                                                                                                                                                                )
                                                                                                                                                                                        }}
                                                                                                                                                                                    >
                                                                                                                                                                                        {item.label}
                                                                                                                                                                                    </li>
                                                                                                                                                                                )
                                                                                                                                                                            })
                                                                                                                                                                        }
                                                                                                                                                                    </ul>
                                                                                                                                                                </div>
                                                                                                                                                            </>
                                                                                                                                                        }
                                                                                                                                                    </div>
                                                                                                                                                </>
                                                                                                                                            }
                                                                                                                                        </>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                )

                                                                                                            ) : (    // if project is not assigned to anyone
                                                                                                                (selectedProjectFile?.converted != null && (project?.get_project_type == 1 || project?.get_project_type == 2)) ? (   // pdf convert logic 
                                                                                                                    selectedProjectFile?.converted ? (    // if pdf is converted
                                                                                                                        <>
                                                                                                                            {
                                                                                                                                selectedProjectFile?.open_in === 'google-ocr' ? (
                                                                                                                                    <>
                                                                                                                                        {/* {
                                                                                                                                            !selectedProjectFile?.pre_trans_processing && (
                                                                                                                                                <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                                                                    <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                                        <img
                                                                                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                                                                                            alt="close_black"
                                                                                                                                                        />
                                                                                                                                                    </span>
                                                                                                                                                </Tooltip>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                                                                            <span className="mr-4" onMouseUp={() => downloadConvertDocxFile(selectedProjectFile?.id)}>
                                                                                                                                                <img
                                                                                                                                                    src={Config.HOST_URL + "assets/images/new-ui-icons/file_download.svg"}
                                                                                                                                                    alt="bulk download"
                                                                                                                                                    should-open-files="dont-open"
                                                                                                                                                />
                                                                                                                                            </span>
                                                                                                                                        </Tooltip> */}
                                                                                                                                        <Tooltip title={t("view_docx_file_in_writer")} TransitionComponent={Zoom} placement="top">
                                                                                                                                            <button
                                                                                                                                                className="workspace-files-OpenProjectButton" type="button" onMouseUp={() => openWriter(selectedProjectFile?.id, selectedProjectFile?.filename, project?.id)}>
                                                                                                                                                <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                                            </button>
                                                                                                                                        </Tooltip>
                                                                                                                                        <MoreOptionsIconPDF selectedProjectFile={selectedProjectFile} project={project} taskPDF={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                                    </>
                                                                                                                                ) : selectedProjectFile?.open_in === 'convertio' ? (
                                                                                                                                    <>
                                                                                                                                        {
                                                                                                                                            !selectedProjectFile?.is_task_translated ? (    // if task is not translated (translation task is not created)
                                                                                                                                                <>
                                                                                                                                                    {
                                                                                                                                                        !selectedProjectFile?.pre_trans_processing && (
                                                                                                                                                            <Tooltip TransitionComponent={Zoom} title={t("delete")} placement="top">
                                                                                                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                                                    <img
                                                                                                                                                                        src={DeleteBinIcon}
                                                                                                                                                                        alt="close_black"
                                                                                                                                                                    />
                                                                                                                                                                </span>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                                                                                        <span className="mr-4" onMouseUp={() => downloadConvertDocxFile(selectedProjectFile?.id)}>
                                                                                                                                                            <img
                                                                                                                                                                src={DownloadIcon}
                                                                                                                                                                alt="bulk download"
                                                                                                                                                                should-open-files="dont-open"
                                                                                                                                                            />
                                                                                                                                                        </span>
                                                                                                                                                    </Tooltip>
                                                                                                                                                    <Tooltip title={t("create_trans_text")} TransitionComponent={Zoom} placement="top">
                                                                                                                                                        <button className="workspace-files-OpenProjectButton" type="button" onMouseUp={(e) => { !isPdfTranslating && translateFromPdfTask(selectedProjectFile?.id, project?.id) }}>
                                                                                                                                                            <span className="fileopen-new-btn">{isPdfTranslating && <ButtonLoader style={{ marginLeft: '5px' }} />} {isPdfTranslating ? t("translating") : t("translate")}</span>
                                                                                                                                                        </button>
                                                                                                                                                    </Tooltip>
                                                                                                                                                </>
                                                                                                                                            ) : (   // the task is translated (translation task has been created)
                                                                                                                                                <>
                                                                                                                                                    <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                                                                                        <button
                                                                                                                                                            style={{
                                                                                                                                                                paddingLeft: "16px",
                                                                                                                                                                paddingRight: "16px"
                                                                                                                                                            }}
                                                                                                                                                            className="workspace-files-OpenProjectButton" type="button" onMouseUp={() => downloadConvertDocxFile(selectedProjectFile?.id)}>
                                                                                                                                                            <span className="fileopen-new-btn">{t("download")}</span>
                                                                                                                                                        </button>
                                                                                                                                                    </Tooltip>
                                                                                                                                                    <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    </>
                                                                                                                                ) : selectedProjectFile?.open_in === 'FileCorrupted' ? (
                                                                                                                                    <>
                                                                                                                                        <Tooltip title={t("file_cannot_be_processed")} TransitionComponent={Zoom} placement="top">
                                                                                                                                            <button className="workspace-files-OpenProjectButton" type="button" style={{ opacity: 0.7, paddingLeft: "22px", paddingRight: "22px" }}>
                                                                                                                                                <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                                            </button>
                                                                                                                                        </Tooltip>
                                                                                                                                        <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                                    </>
                                                                                                                                ) : selectedProjectFile?.open_in == null ? (
                                                                                                                                    <>
                                                                                                                                        <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                                <ButtonLoader />
                                                                                                                                                {t("converting")}
                                                                                                                                            </span>
                                                                                                                                        </button>
                                                                                                                                        <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={true} />
                                                                                                                                    </>
                                                                                                                                ) : null
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    ) : (   // if pdf is not converted
                                                                                                                        clickedOpenButton == selectedProjectFile?.id ? (
                                                                                                                            <>
                                                                                                                                <ProgressAnimateButton name={"Converting"} />
                                                                                                                                <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={true} />
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                {selectedProjectFile?.isPDFConverting ? (
                                                                                                                                    <ProgressAnimateButton name={"Converting"} />
                                                                                                                                ) : (
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        style={{
                                                                                                                                            paddingLeft: "22px",
                                                                                                                                            paddingRight: "22px"
                                                                                                                                        }}
                                                                                                                                        onMouseUp={(e) => checkPdfConversionStatus(selectedProjectFile?.id, project?.id, 'first')}
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                                    </button>
                                                                                                                                )}
                                                                                                                                <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                ) : (project?.get_project_type === 4 && ((selectedProjectFile?.open_in === 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined)) ? (
                                                                                                                    <>
                                                                                                                        <button className="workspace-files-OpenProjectButton"
                                                                                                                            type="button"
                                                                                                                            style={{
                                                                                                                                paddingLeft: "16px",
                                                                                                                                paddingRight: "16px"
                                                                                                                            }}
                                                                                                                            onMouseUp={(e) => downloadSourceAudioFile(selectedProjectFile?.id)}
                                                                                                                        >
                                                                                                                            <span className="fileopen-new-btn">{t("download")}</span>
                                                                                                                        </button>
                                                                                                                        <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                    </>
                                                                                                                ) : (project?.get_project_type === 4 && selectedProjectFile?.open_in === 'Download' && selectedProjectFile?.text_to_speech_convert_enable) ? (
                                                                                                                    clickedOpenButton == selectedProjectFile?.id ? (
                                                                                                                        <>
                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                    <ButtonLoader />
                                                                                                                                    {t("converting")}
                                                                                                                                </span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={true} />
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        <>
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "22px",
                                                                                                                                    paddingRight: "22px"
                                                                                                                                }}
                                                                                                                                type="button"
                                                                                                                                onMouseUp={(e) => convertSourceFileToAudio(selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                            </button>
                                                                                                                            <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                        </>
                                                                                                                    )
                                                                                                                ) : (selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed) ? (
                                                                                                                    <>
                                                                                                                        <Tooltip title={t("view_transcription")} TransitionComponent={Zoom} placement="top">
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                type="button"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "30px",
                                                                                                                                    paddingRight: "30px"
                                                                                                                                }}
                                                                                                                                onMouseUp={(e) => openAilaysaWriter(project?.id, selectedProjectFile?.id)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                                            </button>
                                                                                                                        </Tooltip>
                                                                                                                        <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                    </>
                                                                                                                ) : (selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false) ? (
                                                                                                                    clickedOpenButton == key ? (
                                                                                                                        <>
                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                    <ButtonLoader />
                                                                                                                                    {t("transcribing")}
                                                                                                                                </span>
                                                                                                                            </button>
                                                                                                                            <span className="more-icon-empty"></span>
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                            <>
                                                                                                                                <ProgressAnimateButton />
                                                                                                                                <span className="more-icon-empty"></span>
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                    type="button"
                                                                                                                                    onMouseUp={(e) => transcribeAudioFile(project?.id, selectedProjectFile?.id, key)}
                                                                                                                                    disabled={selectedProjectFile?.pre_trans_processing}
                                                                                                                                    style={selectedProjectFile?.pre_trans_processing ? { opacity: '0.6' } : { opacity: 1 }}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">{t("transcribe")}</span>
                                                                                                                                </button>
                                                                                                                                <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                ) : (selectedProjectFile?.open_in === 'Download' && (project?.get_project_type === 1 || project?.get_project_type === 2)) ? (
                                                                                                                    <>
                                                                                                                        {selectedProjectFile?.file_translate_done ? (   // if file is translated show download btn
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                                type="button"
                                                                                                                                style={{
                                                                                                                                    paddingLeft: "16px",
                                                                                                                                    paddingRight: "16px"
                                                                                                                                }}
                                                                                                                                onMouseUp={(e) => downloadTaskTargetFile(selectedProjectFile)}
                                                                                                                            >
                                                                                                                                <span className="fileopen-new-btn">{t("download")}</span>
                                                                                                                            </button>
                                                                                                                        ) : (   // not translated then show translate btn
                                                                                                                            selectedProjectFile?.isProcessing ? (
                                                                                                                                <ProgressAnimateButton />
                                                                                                                            ) : (
                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                    type="button"
                                                                                                                                    style={{
                                                                                                                                        paddingLeft: "16px",
                                                                                                                                        paddingRight: "16px"
                                                                                                                                    }}
                                                                                                                                    onMouseUp={(e) => getProjectTransDownloadStatus(selectedProjectFile?.id)}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">{t("translate")}</span>
                                                                                                                                </button>
                                                                                                                            )
                                                                                                                        )}
                                                                                                                        <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                    </>
                                                                                                                ) : (
                                                                                                                    <>
                                                                                                                        {
                                                                                                                            (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? (
                                                                                                                                <ProgressAnimateButton />
                                                                                                                            ) : (
                                                                                                                                clickedOpenButton == key ? (
                                                                                                                                    <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                        <span className="fileopen-new-btn">
                                                                                                                                            <ButtonLoader />
                                                                                                                                            {t("opening")}
                                                                                                                                        </span>
                                                                                                                                    </button>
                                                                                                                                ) : (
                                                                                                                                    <button className="workspace-files-OpenProjectButton"
                                                                                                                                        type="button"
                                                                                                                                        onMouseUp={(e) =>
                                                                                                                                            openFile(
                                                                                                                                                e,
                                                                                                                                                key,
                                                                                                                                                selectedProjectFile.id,
                                                                                                                                                selectedProjectFile.document_url,
                                                                                                                                                selectedProjectFile.first_time_open,
                                                                                                                                                selectedProjectFile.open_in,
                                                                                                                                                project.project_name,
                                                                                                                                                project.id,
                                                                                                                                                project?.get_project_type,
                                                                                                                                                null,
                                                                                                                                                null,
                                                                                                                                                null,
                                                                                                                                                null,
                                                                                                                                                selectedProjectFile,
                                                                                                                                                project
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                    </button>
                                                                                                                                )
                                                                                                                            )
                                                                                                                        }
                                                                                                                        {/* story push button */}
                                                                                                                        {selectedProjectFile?.push_detail ? (
                                                                                                                            <button className="workspace-files-OpenProjectButton"
                                                                                                                            type="button"
                                                                                                                            style={{backgroundColor: "#9d9db1"}}
                                                                                                                            onClick={(e) => {
                                                                                                                                (Config.toast('Story already has been pushed'))
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                {t("pushed")}
                                                                                                                            </span>
                                                                                                                        </button>
                                                                                                                        ) : (
                                                                                                                            isFederal && (
                                                                                                                                <button className="workspace-files-OpenProjectButton"
                                                                                                                                    type="button"
                                                                                                                                    style={
                                                                                                                                        (selectedProjectFile?.news_detail?.tar_json_exists) ? 
                                                                                                                                        {} : {backgroundColor: "#9d9db1"}
                                                                                                                                    }
                                                                                                                                    onClick={(e) => {
                                                                                                                                        (selectedProjectFile?.news_detail?.tar_json_exists) ? 
                                                                                                                                        (isStoryIdPushing !== selectedProjectFile?.id) && pushStoryToCMS(e, selectedProjectFile, project?.id) :
                                                                                                                                        (Config.toast('Task is not yet started', 'warning'))
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">
                                                                                                                                        {isStoryIdPushing === selectedProjectFile?.id && (
                                                                                                                                            <ButtonLoader />
                                                                                                                                        )}
                                                                                                                                        {t("push")}
                                                                                                                                    </span>
                                                                                                                                </button>
                                                                                                                            )
                                                                                                                        )}
                                                                                                                        
                                                                                                                        <div className="more-options-wrap">
                                                                                                                            {project.get_project_type === 6 ? (
                                                                                                                                <MoreOptionsIconDesigner project={project} removeDelete={false} assigned={selectedProjectFile.task_assign_info == null ? false : true} removeEdit={true} selectedProjectFile={selectedProjectFile} />
                                                                                                                            ) : (
                                                                                                                                <>
                                                                                                                                    <ButtonBase onClick={(e) => handleMoreVertOption(e, selectedProjectFile?.id)} className="sorting-icon">
                                                                                                                                        <MoreVertIcon className="more-icon" />
                                                                                                                                    </ButtonBase>
                                                                                                                                    {(moreEl && (openedMoreOption === selectedProjectFile?.id)) &&
                                                                                                                                        <>
                                                                                                                                            <div className="menu-wrapper" ref={moreOptionOutside} onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                <ul>
                                                                                                                                                    {
                                                                                                                                                        moreOptions?.filter(item => (
                                                                                                                                                            project?.file_translate ? item?.id === 2 :
                                                                                                                                                            (project?.get_project_type !== 5 && project?.get_project_type !== 3) ?
                                                                                                                                                                (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? item.id !== 3 : item.id
                                                                                                                                                                : (project?.assign_enable ? selectedProjectFile.task_assign_info == null : (userDetails?.agency && !project?.assign_enable) && (selectedProjectFile.task_reassign_info == null || selectedProjectFile.task_assign_info == null)) ? (item.id !== 3 && item.id !== 1) : item.id !== 1
                                                                                                                                                        ))?.map((item) => {
                                                                                                                                                            return (
                                                                                                                                                                <li
                                                                                                                                                                    key={item.id}
                                                                                                                                                                    className="list-item"
                                                                                                                                                                    onClick={(e) =>
                                                                                                                                                                        item?.label === 'Delete' ? handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info) :
                                                                                                                                                                            item?.label === 'View PO' && getPODetailsForTask(selectedProjectFile.id)
                                                                                                                                                                    }
                                                                                                                                                                    style={selectedProjectFile?.pre_trans_processing ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                                                                                                    onMouseEnter={item.arrow_icon ? ((e) => handleSubDownloadOption(e)) : ((e) => handleSubDownloadOptioHide(e))}
                                                                                                                                                                >
                                                                                                                                                                    <div className="item-wrap">
                                                                                                                                                                        <span className="icon">{item.icon}</span>
                                                                                                                                                                        <span className="text">{item.label}</span>
                                                                                                                                                                    </div>
                                                                                                                                                                    {
                                                                                                                                                                        item.arrow_icon &&
                                                                                                                                                                        <>
                                                                                                                                                                            {item.arrow_icon}
                                                                                                                                                                        </>
                                                                                                                                                                    }
                                                                                                                                                                </li>
                                                                                                                                                            )
                                                                                                                                                        })
                                                                                                                                                    }
                                                                                                                                                </ul>
                                                                                                                                                {
                                                                                                                                                    subDownloadOption &&
                                                                                                                                                    <>
                                                                                                                                                        <div className="download-sub-menu" onMouseLeave={((e) => handleSubDownloadOptioHide(e))}>
                                                                                                                                                            <ul>
                                                                                                                                                                {
                                                                                                                                                                    subDownloadOptions?.filter(each => project.mt_enable ? true : each.value !== 'MTRAW')?.map((item) => {
                                                                                                                                                                        return (
                                                                                                                                                                            <li
                                                                                                                                                                                key={item.id}
                                                                                                                                                                                className="list-inner-item"
                                                                                                                                                                                style={
                                                                                                                                                                                    (selectedProjectFile?.isTaskDownloading != item?.value) ?
                                                                                                                                                                                        {} : { opacity: 0.7 }
                                                                                                                                                                                }
                                                                                                                                                                                onClick={(e) => {
                                                                                                                                                                                    docCreditCheckAlertRef.current = selectedProjectFile.mt_only_credit_check;
                                                                                                                                                                                    (selectedProjectFile?.isTaskDownloading != item?.value) &&
                                                                                                                                                                                        downloadDifferentFile(
                                                                                                                                                                                            item?.value,
                                                                                                                                                                                            selectedProjectFile?.document,
                                                                                                                                                                                            e,
                                                                                                                                                                                            key,
                                                                                                                                                                                            selectedProjectFile.id,
                                                                                                                                                                                            selectedProjectFile.document_url,
                                                                                                                                                                                            selectedProjectFile.first_time_open,
                                                                                                                                                                                            selectedProjectFile.open_in,
                                                                                                                                                                                            project.project_name,
                                                                                                                                                                                            project.id,
                                                                                                                                                                                            project?.get_project_type,
                                                                                                                                                                                            selectedProjectFile?.filename,
                                                                                                                                                                                            selectedProjectFile
                                                                                                                                                                                        )
                                                                                                                                                                                }}
                                                                                                                                                                            >
                                                                                                                                                                                {item.label}
                                                                                                                                                                            </li>
                                                                                                                                                                        )
                                                                                                                                                                    })
                                                                                                                                                                }
                                                                                                                                                            </ul>
                                                                                                                                                        </div>
                                                                                                                                                    </>
                                                                                                                                                }
                                                                                                                                            </div>
                                                                                                                                        </>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                        selectedFilesData = <div className="task-row-wrapper">{selectedFilesData}</div>
                                                                                        return selectedFilesData;
                                                                                    })
                                                                                ) : (
                                                                                    <div>
                                                                                        {Array(project.tasks_count)
                                                                                            .fill(null)
                                                                                            .map((value, key) => (
                                                                                                <div className="file-edit-inner-table" key={key}>
                                                                                                    <div className="file-edit-list-inner-table-row">
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            {/* <div className='check-box-wrap'>
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    variant="circular"
                                                                                                                    width={25}
                                                                                                                    height={25}
                                                                                                                />
                                                                                                            </div> */}
                                                                                                            <div className="my-stories-doc-info-wrapper">
                                                                                                                <div className="doc-icon-wrapper">
                                                                                                                    <span className="doc-icon">
                                                                                                                        <Skeleton
                                                                                                                            animation="wave"
                                                                                                                            variant="rounded"
                                                                                                                            style={{ width: "100%", height: "100%" }}
                                                                                                                        />
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div className="story-info-wrap">
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        style={{ marginBottom: "15px" }}
                                                                                                                        variant="rounded"
                                                                                                                        width={80}
                                                                                                                        height={10}
                                                                                                                    />
                                                                                                                    <div className="d-flex flex-column">
                                                                                                                        <Skeleton
                                                                                                                            animation="wave"
                                                                                                                            variant="rounded"
                                                                                                                            width={200}
                                                                                                                            height={15}
                                                                                                                        />
                                                                                                                        <Skeleton
                                                                                                                            animation="wave"
                                                                                                                            style={{ marginTop: "0.5rem" }}
                                                                                                                            variant="rounded"
                                                                                                                            width={100}
                                                                                                                            height={15}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div style={{ marginTop: "10px" }} className="d-flex align-items-center">
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "0.2rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={20}
                                                                                                                    height={10}
                                                                                                                />
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "0.2rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={20}
                                                                                                                    height={10}
                                                                                                                />
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "0.2rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={20}
                                                                                                                    height={10}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <div className="status-conditions-part">
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        style={{ marginRight: "1rem" }}
                                                                                                                        variant="text"
                                                                                                                        width={20}
                                                                                                                    />
                                                                                                                    <Skeleton animation="wave" variant="text" width={55} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <div className="d-flex align-items-center justify-content-end w-100">
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        style={{ marginRight: "14px" }}
                                                                                                                        variant="rounded"
                                                                                                                        width={80}
                                                                                                                        height={28}
                                                                                                                    />
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        style={{ marginRight: "14px" }}
                                                                                                                        variant="rounded"
                                                                                                                        width={80}
                                                                                                                        height={28}
                                                                                                                    />
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        style={{ marginRight: "14px" }}
                                                                                                                        variant="rounded"
                                                                                                                        width={80}
                                                                                                                        height={28}
                                                                                                                    />
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        variant="circular"
                                                                                                                        width={25}
                                                                                                                        height={25}
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>    
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </Collapse>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <section className="ai-no-project-found">
                                                            <div className="ai-no-project-cont">
                                                                {
                                                                    projectSearchTerm ?
                                                                        <img
                                                                            className="empty-folder-img"
                                                                            src={NoEditorIcon}
                                                                            alt="empty-folder-open"
                                                                        />
                                                                        :
                                                                        <img
                                                                            className="empty-folder-img"
                                                                            src={EmptyProjectIcon}
                                                                            alt="empty-folder-open"
                                                                        />
                                                                }
                                                                <h2>{t("no_story_found")}</h2>
                                                                {
                                                                    projectSearchTerm ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                                <button className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => handleCreateStoryBtn()}
                                                                                >
                                                                                    <span className="add-new-project-btn">
                                                                                        <img src={PlusIcon} alt="plus" />
                                                                                        {t("create_new_story")}
                                                                                    </span>
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                }
                                                            </div>
                                                        </section>
                                                    </React.Fragment>
                                            )
                                            :
                                            (
                                                !showEmptyProjects ? (
                                                    <React.Fragment>
                                                        {Array(projectsPerPage?.current)
                                                            .fill(null)
                                                            .map((value, key) => (
                                                                <div className="file-edit-list-table-row" key={key}>
                                                                    <div className="file-edit-list-table-cell">
                                                                        <div className="d-flex align-items-center">
                                                                            <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                                                            <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={115} />
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="file-edit-list-table-cell">
                                                                    <Skeleton animation="wave" variant="text" width={50} />
                                                                </div> */}
                                                                    {/* <div className="file-edit-list-table-cell">
                                                                    <Skeleton animation="wave" variant="text" width={50} />
                                                                </div> */}
                                                                    <div className="file-edit-list-table-cell">
                                                                        <div className="status-conditions-part">
                                                                            <div className="d-flex align-items-center">
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    style={{ marginRight: "1rem" }}
                                                                                    variant="text"
                                                                                    width={20}
                                                                                />
                                                                                <Skeleton animation="wave" variant="text" width={55} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        <div className="project-setup-pagination">
                                                            <ul>
                                                                <li>
                                                                    <Skeleton animation="wave" variant="rounded" width={120} height={25} />
                                                                </li>
                                                                <li>
                                                                    <Skeleton animation="wave" variant="rounded" width={120} height={25} />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <section className="ai-no-project-found">
                                                            <div className="ai-no-project-cont">
                                                                {
                                                                    projectSearchTerm ?
                                                                        <img
                                                                            className="empty-folder-img"
                                                                            src={NoEditorIcon}
                                                                            alt="empty-folder-open"
                                                                        />
                                                                        :
                                                                        <img
                                                                            className="empty-folder-img"
                                                                            src={EmptyProjectIcon}
                                                                            alt="empty-folder-open"
                                                                        />
                                                                }
                                                                <h2>{t("no_story_found")}</h2>
                                                                {
                                                                    projectSearchTerm ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                                <button className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => handleCreateStoryBtn()}
                                                                                >
                                                                                    <span className="add-new-project-btn">
                                                                                        <img src={PlusIcon} alt="plus" />
                                                                                        {t("create_new_story")}
                                                                                    </span>
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                }
                                                            </div>
                                                        </section>
                                                    </React.Fragment>
                                                )
                                            )) :
                                        (
                                            <React.Fragment>
                                                {Array(projectsPerPage?.current)
                                                    .fill(null)
                                                    .map((value, key) => (
                                                        <div className="file-edit-list-table-row" key={key}>
                                                            <div className="file-edit-list-table-cell">
                                                                <div className="d-flex align-items-center">
                                                                    <Skeleton animation="wave" variant="text" width={30} height={35} />
                                                                    <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={115} />
                                                                </div>
                                                            </div>
                                                            {/* <div className="file-edit-list-table-cell">
                                                                    <Skeleton animation="wave" variant="text" width={50} />
                                                                </div> */}
                                                            <div className="file-edit-list-table-cell">
                                                                <Skeleton animation="wave" variant="text" width={50} />
                                                            </div>
                                                            {/* <div className="file-edit-list-table-cell">
                                                                <div className="status-conditions-part">
                                                                    <div className="d-flex align-items-center">
                                                                        <Skeleton
                                                                            animation="wave"
                                                                            style={{ marginRight: "1rem" }}
                                                                            variant="text"
                                                                            width={20}
                                                                        />
                                                                        <Skeleton animation="wave" variant="text" width={55} />
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    ))}
                                                <div className="project-setup-pagination">
                                                    <ul>
                                                        <li>
                                                            <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                                        </li>
                                                        <li>
                                                            <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                                        </li>
                                                        <li>
                                                            <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                                        </li>
                                                        <li>
                                                            <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                </>
                            </div>
                        </div>
                        {!showListingLoader && <div className="project-setup-pagination">
                            <ul>{paginationContent}</ul>
                        </div>}
                    </div>
                </div>
            </>

            {showVersionControlModal && (<Rodal visible={showVersionControlModal} {...versioncontrolmodaloption} showCloseButton={false} className="version-control-integration">
                <VersionControlModal
                    onClick={hideVersionControlModal}
                    modalImage={modalImage}
                    integrationPlatform={integrationPlatform}
                    selectFile={selectIntegrationFile}
                    integrationFiles={integrationFiles}
                    setIntegrationFiles={setIntegrationFiles}
                    fileUploadTabToggle={fileUploadTabToggle}
                />
            </Rodal>)}

            {showAssignManageModal && (<Rodal visible={showAssignManageModal} {...assignmanagemodaloption} showCloseButton={false} className="ailaysa-manage-modal">
                <div className="assign-manage-cont">
                    <span className="assign-manage-close-btn" onClick={hideAssignManageModal}>
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                    <InstructionModal instructionText={instructionText} instructionFile={instructionFile} taskAssignInfoId={taskAssignInfoId} />
                </div>
            </Rodal>)}

            {showSettings && (<Rodal visible={showSettings} {...modaloption} showCloseButton={false} className="ailaysa-setup-settings-modal">
                {showSettings &&
                    <Settings
                        projectId={selectedProjectId}
                        handleDrop={handleDrop}
                        handleChange={handleChange}
                        files={files}
                        setFiles={setFiles}
                        tmxFiles={tmxFiles}
                        removeFile={removeFile}
                        hideSettingsModal={hideSettingsModal}
                        showSettings={showSettings}
                        setshowSettings={setshowSettings}
                        isNewsProject={true}
                    />
                }
            </Rodal>)}

            {showWordCount && (<Rodal visible={showWordCount} {...modaloption} showCloseButton={false} className="ailaysa-wordcount-modal">
                {showWordCountLoader ? (
                    <React.Fragment>
                        <div className="word-count-head">
                            <span className="word-count-heading-title">
                                <div className="d-flex align-items-center">
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={110} />
                                </div>
                            </span>
                            <span className="word-count-close-btn">
                                <Skeleton animation="wave" variant="circle" width={30} height={30} />
                            </span>
                        </div>
                        <div className="wordcount-content-box">
                            <div className="wordcount-content-row">
                                <div className="wordcount-content-col">
                                    <div className="wordcount-content-col-box">
                                        <Skeleton animation="wave" variant="text" width={100} />
                                        <Skeleton animation="wave" variant="text" width={60} />
                                    </div>
                                </div>
                                <div className="wordcount-content-col">
                                    <div className="wordcount-content-col-box">
                                        <Skeleton animation="wave" variant="text" width={100} />
                                        <Skeleton animation="wave" variant="text" width={60} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="word-count-head">
                            <span className="word-count-heading-title">
                                <img src={BarChatIcon} alt="stacked_bar_chart" />{" "}
                                {selectedProjectName}
                            </span>
                            <span className="word-count-close-btn" onClick={hideWordCountModal}>
                                <img src={BlackCloseIcon} alt="close_black" />
                            </span>
                        </div>
                        <div className="wordcount-content-box">
                            <div className="wordcount-content-row">
                                <div className="wordcount-content-col">
                                    <div className="wordcount-content-col-box">
                                        <small>{t("word_count")}</small>
                                        <p>{projectWordCount}</p>
                                    </div>
                                </div>
                                <div className="wordcount-content-col">
                                    <div className="wordcount-content-col-box">
                                        <small>{t("total_sentences")}</small>
                                        <p>{projectSegmentCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </Rodal>)}

            {showCloneModal && (<Rodal visible={showCloneModal} {...modaloption} showCloseButton={false} className="ai-glossary-clone-modal">
                <div className="lang-modal-wrapper">
                    <span className="modal-close-btn lang-close" onClick={() => setShowCloneModal(false)}>
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                    <GlossaryClone
                        setShowCloneModal={setShowCloneModal}
                        showCloneModal={showCloneModal}
                        selectedProjectFiles={selectedProjectFiles}
                        languageOptionsList={targetLanguageOptionsRef.current}
                    />
                </div>
            </Rodal>)}


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
                            src={BlackCloseIcon}
                            alt="close_black"
                        />
                    </span>
                    {showSrcLangModal &&
                        <SourceLanguage
                            sourceLanguage={sourceLanguage}
                            showSrcLangModal={showSrcLangModal}
                            setshowSrcLangModal={setshowSrcLangModal}
                            sourceLanguageOptions={targetLanguageOptionsRef.current}
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

            {/* {showSrcLangModal && (<Rodal visible={showSrcLangModal} {...modaloption} showCloseButton={false} className="ai-lang-select-modal">
                <div className="lang-modal-header">
                    <h1>{t("select_source_language")}</h1>
                    <span className="modal-close-btn" onClick={() => setshowSrcLangModal(false)}>
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                </div>
                <Sourcelanguage
                    sourceLanguage={sourceLanguage}
                    setshowSrcLangModal={setshowSrcLangModal}
                    sourceLanguageOptions={targetLanguageOptionsRef.current}
                    handleSourceLangClick={handleSourceLangClick}
                    filteredResults={filteredResults}
                    setFilteredResults={setFilteredResults}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onFocusWrap={onFocusWrap}
                    setOnFocusWrap={setOnFocusWrap}
                    searchAreaRef={searchAreaRef}
                />
            </Rodal>)} */}

            {showDurationAlertModal && (<Rodal visible={showDurationAlertModal} {...modaloption} showCloseButton={false} className="ai-large-file-alert-modal">
                <span className="prompt-close-btn" onClick={() => setShowDurationAlertModal(false)}>
                    <img src={BlackCloseIcon} alt="close_black" />
                </span>
                <div className="alert-content-wrap">
                    {/* <img src={Config.HOST_URL + "assets/images/new-ui-icons/triangle-error-icon.svg"} alt="error-icon"/> */}
                    <div>
                        <h2 className="title-txt">{t("large_file_alert_content-1")}</h2>
                        <p className="info-txt">{t("large_file_alert_content-2")}</p>
                    </div>
                </div>
            </Rodal>)}
            {showTarLangModal && (<Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
                <div className="lang-modal-wrapper">
                    {/* <h1>{t("select_target_language-2")}</h1> */}
                    <span className="modal-close-btn lang-close" onClick={(e) => handleTargetModalCloseBtn()}>
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                    <TargetLanguage
                        targetLanguage={targetLanguage}
                        targetLanguageOptions={targetLanguageOptions}
                        setTargetLanguageOptions={setTargetLanguageOptions}
                        handleTargetLangClick={handleTargetLangClick}
                        alreadySelectedTarLang={alreadySelectedTarLang}
                        showTarLangModal={showTarLangModal}
                        setshowTarLangModal={setshowTarLangModal}
                        filteredResults={filteredResults}
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap}
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                        handleTargetModalCloseBtn={handleTargetModalCloseBtn}
                    />
                </div>
            </Rodal>)}
            <SimpleRodals
                setShowPoModal={setShowPoModal}
                showPoModal={showPoModal}
                poPDFUrl={poPDFUrl}
                taskAssignUpdate={taskAssignUpdate}
                showSubmitDocumentAlertModal={showSubmitDocumentAlertModal}
                setShowSubmitDocumentAlertModal={setShowSubmitDocumentAlertModal}
                handleDocuemtSubmitConfirmation={handleDocuemtSubmitConfirmation}
            />

            <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />

            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false) }}>
                    <img src={BlackCloseIcon} alt="close_black" />
                </span>
                <div className="credits-text-cont">
                    <React.Fragment>
                        <img src={InsufficientIcon} alt="insuffient-icon" />
                        <div className="insuffient-txt-align">
                            <span>
                                <img src={RedCircleIcon} alt="remove_circle" />
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
            </Rodal>)}
            {showProjectAnalysis && (<Rodal
                visible={showProjectAnalysis}
                {...modaloption}
                showCloseButton={false}
                className="ai-project-analysis-modal-wrapper"
            >
                <div className="ai-project-analysis-wrapper">
                    <div className="analysis-header-wrapper">
                        <div className="analysis-header-txt">
                            <div className="d-flex align-items-center">
                                <StackedBarChartOutlinedIcon className="bar-chart-icon" />
                                <span className="title">{t("project_analysis")}</span>
                            </div>
                            <div className="close-wrapper">
                                <span className="close" onClick={() => { setShowProjectAnalysis(false); setProjectAnalysisUnitSwitch(false) }}>
                                    <CloseIcon className="bar-char-close" />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* if projectAnalysisUnitSwitch is false: word and projectAnalysisUnitSwitch is true: character */}
                    {(projectAnalysisedData != null && Object.keys(projectAnalysisedData)?.length !== 0) ?
                        <div className="analysis-body-wrapper">
                            {
                                projectAnalysisedData?.project?.map(each => (
                                    <>
                                        <div className="analysis-proj-name-wrapper">
                                            <h4 className="proj-name">{t("project_c")}: {each.projectInfo?.project_name}</h4>
                                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: "center" }}>
                                                <span className="download-wrap" onClick={(e) => downloadProjectAnalysisReport(e, each.projectInfo?.project_id)}>
                                                    <FileDownloadOutlinedIcon className="download" />
                                                    <span>{t("download_report")}</span>
                                                </span>
                                                {(projectAnalysisedData?.task[0]?.taskCharData?.key1 !== undefined && projectAnalysisedData?.task[0]?.taskCharData?.key1 !== null) &&
                                                    <>
                                                        <div className="analyse-word-character-toggle-wrapper">
                                                            <span onClick={() => setProjectAnalysisUnitSwitch(false)} className={"toggle-tag " + (!projectAnalysisUnitSwitch && "active")}>{t("word")}</span>
                                                            <span onClick={() => setProjectAnalysisUnitSwitch(true)} className={"toggle-tag " + (projectAnalysisUnitSwitch && "active")}>{t("character")}</span>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div className="analysis-table-wrapper">
                                            <table>
                                                <tr className="main-header">
                                                    <th rowSpan={2}>{t("total")}</th>
                                                    <th>{t("weighted")}</th>
                                                    <th>{t("new")}</th>
                                                    <th>{t("repetition")}</th>
                                                    <th>50-74%</th>
                                                    <th>75-84%</th>
                                                    <th>85-94%</th>
                                                    <th>95-99%</th>
                                                    <th>100%</th>
                                                    <th>101%</th>
                                                    <th>102%</th>
                                                </tr>
                                                <tr className="sub-header">
                                                    {
                                                        Object.values(projectAnalysisedData?.payable_rates?.rateData)?.map((item, ind) => {
                                                            return (
                                                                <th key={ind}>{item}{ind !== 0 ? '%' : ''}</th>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr className="body-row">
                                                    {
                                                        Object.values(!projectAnalysisUnitSwitch ? each?.projectWordData : each?.projectCharData)?.map((item, ind) => {
                                                            return (
                                                                <td key={ind}>{item}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            </table>
                                        </div>
                                    </>
                                ))
                            }
                            <div className="analysis-lang-pair-collapse-wrapper">
                                {
                                    projectAnalysisedData?.task?.map((each, index) => {
                                        return (
                                            <div key={each?.taskInfo.task_id} className="analysis-lang-pair-item">
                                                <div className={"analysis-lang-wrapper " + (showAnalysisCollapse[index] && "marg-add")} onClick={(e) => handleAnalysisCollapse(index)}>
                                                    <div className="analysis-lang-pair-row">
                                                        <span className="collapse-arrow">
                                                            {
                                                                showAnalysisCollapse[index] ?
                                                                    <ExpandLessIcon className="arrow" />
                                                                    :
                                                                    <ExpandMoreIcon className="arrow" />
                                                            }
                                                        </span>
                                                        <div className="file-name-wrap">
                                                            <span className="fileicon">
                                                                <img src={`${Config.BASE_URL}/app/extension-image/` + each?.taskInfo.file_name.split(".").pop()} />
                                                            </span>
                                                            <span className="filename">{each?.taskInfo.file_name}</span>
                                                        </div>
                                                        <div className="lang-pair">
                                                            <span>{each?.taskInfo.lang_pair?.split('->')[0]}</span>
                                                            <img src={BlueRightArrow} />
                                                            <span>{each?.taskInfo.lang_pair?.split('->')[1]}</span>
                                                        </div>
                                                    </div>
                                                    {/* <span className="download-wrap">
                                                            <FileDownloadOutlinedIcon className="download" onClick={(e) => downloadtaskAnalysisReport(e, each?.taskInfo.task_id)} />
                                                        </span> */}
                                                </div>
                                                <Collapse isOpen={showAnalysisCollapse[index]} className="selected-file-row">
                                                    <div className="analysis-table-wrapper">
                                                        <table>
                                                            <tr className="main-header">
                                                                <th rowSpan={2}>{t("total")}</th>
                                                                <th>{t("weighted")}</th>
                                                                <th>{t("new")}</th>
                                                                <th>{t("repetition")}</th>
                                                                <th>50-74%</th>
                                                                <th>75-84%</th>
                                                                <th>85-94%</th>
                                                                <th>95-99%</th>
                                                                <th>100%</th>
                                                                <th>101%</th>
                                                                <th>102%</th>
                                                            </tr>
                                                            <tr className="sub-header">
                                                                {
                                                                    Object.values(projectAnalysisedData?.payable_rates?.rateData)?.map((item, ind) => {
                                                                        return (
                                                                            <th key={ind}>{item}{ind !== 0 ? '%' : ''}</th>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                            <tr className="body-row">
                                                                {
                                                                    Object.values(!projectAnalysisUnitSwitch ? each?.taskWordData : each?.taskCharData)?.map((item, ind) => {
                                                                        return (
                                                                            <td key={ind}>{item}</td>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        (
                            <div className="analysis-body-loader-wrapper">
                                <AnalysisLoader />
                                <h4>{t("analysis_progress")}...</h4>
                            </div>
                        )
                    }
                    <div className="analysis-header-txt"></div>
                </div>
            </Rodal>)}

            {/* modal for file processing */}
            {showProcessingModal && (<Rodal
                visible={showProcessingModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowProcessingModal(false); setTextToSpeechConvert(false); setIsTranscribing(false); partialPretranslate && handlePartialPretranslateClose() }}>
                    <img src={BlackCloseIcon} alt="close_black" />
                </span>
                <div className="confirmation-wrapper">
                    <SandClockLoader />
                    {
                        textToSpeechConvert ?
                            <h6 className="text-center">{t("processing_text_1")} <br />{t("please_wait_few_minutes_para")}</h6>
                            : isTranscribing ?
                                <h6 className="text-center">{t('processing_text_2')} <br />{t("please_wait_few_minutes_para")}</h6>
                                : partialPretranslate ?
                                    <h6 className="text-center">{t("processing_text_3")}</h6>
                                    :
                                    <h6 className="text-center">{t("processing_text_4")} <br />{t("please_wait_few_minutes_para")}</h6>
                    }
                </div>
            </Rodal>)}

            {/* modal for last task delete */}
            {showTaskDeleteAlert && (<Rodal
                visible={showTaskDeleteAlert}
                {...modaloptions}
                showCloseButton={false}
                className={unassignTaskDeleteAlert ? "ai-mark-confirm-box Assign-task-deletion-rodal " : 'ai-mark-confirm-box '}
            >
                <div
                    style={isTaskDeleting ? { pointerEvents: 'none' } : {}}
                    className={unassignTaskDeleteAlert ? " Assign-task-deletion-model confirmation-warning-wrapper" : "confirmation-warning-wrapper "}
                >
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowTaskDeleteAlert(false) }}><CloseIcon /></span></div>
                        {
                            unassignTaskDeleteAlert ?
                                <>
                                    <div className="model_title_"><span className="indicate_icon__rodal"></span>{t("task_assigned")}!</div>
                                    <div className="model_discription_">{t("task_assigned_note_1")}</div>
                                </>
                                :
                                <>
                                    <div>{t("are_you_sure")}</div>
                                    {
                                        selectedProjectFiles?.length === 1 ?
                                            <div>{t("delete_confirm_note_1")}</div>
                                            :
                                            <div>{t("delete_confirm_note_2")}</div>
                                    }
                                </>
                        }
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button className={unassignTaskDeleteAlert && 'assign_task_del_btn'} onClick={() => { setShowTaskDeleteAlert(false); setUnassignTaskDeleteAlert(false) }}>{unassignTaskDeleteAlert ? t("close") : t("discard")}</Button>
                            {!unassignTaskDeleteAlert && (
                                <Button
                                    style={isTaskDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                    onClick={() =>  projectObject.current?.get_project_type == 6 ? !isTaskDeleting && handleDeleteDesignerProj(projectObject.current,selectedDesignerProject.current) : !isTaskDeleting && taskDeleteFunction()}
                                    variant="contained"
                                >
                                    {isTaskDeleting ? (
                                        <>
                                            <ButtonLoader />
                                            {t("deleting")}
                                        </>
                                    ) : (
                                        t("delete")
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Rodal>)}

                {/* modal for task delete */}
                {showTaskDesignIndividualDeleteAlert && (<Rodal
                visible={showTaskDesignIndividualDeleteAlert}
                {...modaloptions}
                showCloseButton={false}
                className={unassignTaskDeleteAlert ? "ai-mark-confirm-box Assign-task-deletion-rodal " : 'ai-mark-confirm-box '}
            >
                <div
                    style={isTaskDeleting ? { pointerEvents: 'none' } : {}}
                    className={unassignTaskDeleteAlert ? " Assign-task-deletion-model confirmation-warning-wrapper" : "confirmation-warning-wrapper "}
                >
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowTaskDesignIndividualDeleteAlert(false) }}><CloseIcon /></span></div>
                        {
                            unassignTaskDeleteAlert ?
                                <>
                                    <div className="model_title_"><span className="indicate_icon__rodal"></span>{t("task_assigned")}!</div>
                                    <div className="model_discription_">{t("task_assigned_note_1")}</div>
                                </>
                                :
                                <>
                                    <div>{t("are_you_sure")}</div>
                                    {
                                        selectedProjectFiles?.length === 1 ?
                                            <div>{t("delete_confirm_note_2")}</div>

                                            :
                                            <div>{t("delete_design_confirm_note_1")}</div>

                                    }
                                </>
                        }
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button className={unassignTaskDeleteAlert && 'assign_task_del_btn'} onClick={() => { setShowTaskDesignIndividualDeleteAlert(false); setUnassignTaskDeleteAlert(false) }}>{unassignTaskDeleteAlert ? t("close") : t("discard")}</Button>
                            {!unassignTaskDeleteAlert && (
                                <Button
                                    style={isTaskDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                    onClick={() =>  selectedProjectFiles?.length !== 1 ? !isTaskDeleting && handleDeleteDesignerProj(projectObject.current,selectedDesignerProject.current) : !isTaskDeleting && handleDeleteDesignerProj(projectObject.current,null)}
                                    variant="contained"
                                >
                                    {isTaskDeleting ? (
                                        <>
                                            <ButtonLoader />
                                            {t("deleting")}
                                        </>
                                    ) : (
                                        t("delete")
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Rodal>)}

            {/* modal for express project delete */}
            {showStoryProjDeleteModal && (
                <Rodal
                    visible={showStoryProjDeleteModal}
                    {...modaloptions}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowStoryProjDeleteModal(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>{t("delete_project_note")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowStoryProjDeleteModal(false) }}>{t("discard")}</Button>
                                <Button
                                    style={isStoryProjectDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                    onClick={() => projectObject.current?.get_project_type == 6 ? !isStoryProjectDeleting && handleDeleteDesignerProj(projectObject.current,null) : !isStoryProjectDeleting && deleteStoryProject()}
                                    variant="contained"
                                >
                                    {isStoryProjectDeleting ? (
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
                </Rodal>
            )}

            {/* modal for instant tranlation project edit */}
            {editInstantProjectModal && (
                <Rodal
                    visible={editInstantProjectModal}
                    showCloseButton={false}
                    className={"edit-instant-project-box " + ((showTarLangModal || showStoryProjDeleteModal) ? "z-index-reduce" : "z-index-increase")}
                >
                    <div className="header-wrapper">
                        <div className="header-text">
                            <EditOutlinedIcon style={{ fontSize: 22, color: "#5F6368" }} />
                            <h1>{t("edit_project")}</h1>
                        </div>
                        <span className="modal-close-btn" onClick={() => setEditInstantProjectModal(false)}>
                            <img src={BlackCloseIcon} alt="close_black" />
                        </span>
                    </div>
                    <div className="body-wrapper">
                        {/* <div className="details-cont">
                            
                        </div> */}
                        <div className="language-details mb-3">
                            <h2>{t("project_name")}</h2>
                            {
                                skeletonLoader ?
                                    <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                                    :
                                    <input
                                        type='text'
                                        value={storyProjectName}
                                        placeholder={t("project_name")}
                                        className="ai-sl-tl-btn input"
                                        onChange={(e) => setstoryProjectName(e.target.value)}
                                    />

                            }
                        </div>
                        <div className="language-details mb-3">
                            <h2>{t("source_language")}</h2>
                            {
                                skeletonLoader ?
                                    <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                                    :
                                    <ButtonBase disabled={true}>
                                        <div className="ai-sl-tl-btn">
                                            <span className="text">
                                                {sourceLabel !== "" ? `${sourceLabel}` : t("source_language")}
                                            </span>
                                            {/* <span className="icon">
                                            <i className="fas fa-caret-down"></i>
                                        </span> */}
                                        </div>
                                    </ButtonBase>
                            }
                        </div>
                        <div className="language-details">
                            <h2>{t("target_language")} <span className="asterik-symbol">*</span></h2>
                            {
                                skeletonLoader ?
                                    <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                                    :
                                    <>
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
                                            <ButtonBase onClick={() => { setshowTarLangModal(true); }} ref={targetLangDivRef}>
                                                <div className="ai-sl-tl-btn">
                                                    <span className="text">
                                                        {targetLabel !== "" ? `${targetLabel}` :
                                                            targetLanguage?.length !== 0
                                                                ? (targetLanguage?.length +
                                                                    " " +
                                                                    (targetLanguage?.length > 1 ? t("languages") : t("language")) +
                                                                    " " + t("selected"))
                                                                : t("target_language")
                                                        }
                                                    </span>
                                                    <span className="icon">
                                                        <i className="fas fa-caret-down"></i>
                                                    </span>
                                                </div>
                                            </ButtonBase>
                                        </Tooltip>
                                        {targetLanguage?.length === 0 && <small className="asterik-symbol">{t("required")}</small>}
                                    </>
                            }
                        </div>
                        <div className="edit-proj-button-row">
                            <ButtonBase className="instant-edit-delete-btn" onClick={() => setShowStoryProjDeleteModal(true)}>
                                <img src={DeleteBinIcon} alt="close_black" />
                                {t("delete_project")}
                            </ButtonBase>
                            <ButtonBase className="instant-edit-update-btn" onClick={() => { !isStoryProjUpdating && (targetLanguage?.length !== 0 ? (updateStoryProject()) : focusTargetLangDiv()) }}>
                                {isStoryProjUpdating ? t('updating') : t('update')}
                                {isStoryProjUpdating && <ButtonLoader />}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            )}
            {showAssignedProjectDeleteAlert && (<Rodal
                visible={showAssignedProjectDeleteAlert}
                {...modaloptions}
                showCloseButton={false}
                className="ai-mark-confirm-box Assign-task-deletion-rodal"
            >
                <div className="confirmation-warning-wrapper Assign-task-deletion-model">
                    <div className="confirm-top">
                        <div><span onClick={() => { SetShowAssignedProjectDeleteAlert(false); }}><CloseIcon /></span></div>
                        <div className="model_title_"><span className="indicate_icon__rodal"></span>{t("task_assigned")}!</div>
                        <div className="model_discription_">{t("task_assigned_note")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button style={{ opacity: 0 }}>{t("discard")}</Button>
                            <Button className="assign_task_del_btn" onClick={() => { SetShowAssignedProjectDeleteAlert(false); }}>{t("close")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
            
            {/* <Prompt
                when={isDownloading}
                message={handleBlockedNavigation}
            /> */}
            <ReactRouterPrompt when={isDownloading}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        visible={isActive}
                        showCloseButton={false}
                        onclose={() => console.log()}
                        className="ai-mark-confirm-box"
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("download_progress")}!</div>
                                <div>{t("download_progrss_note")}</div>
                            </div>
                            <div className="confirm-bottom">
                                <div>
                                    <Button onClick={onCancel}>{t("close")}</Button>
                                    <Button onClick={onConfirm} variant="contained">{t("ok")}</Button>
                                </div>
                            </div>
                        </div>
                    </Rodal>
                )
            }}
            </ReactRouterPrompt>

            {showdocCreditCheckAlert && (<Rodal
                visible={showdocCreditCheckAlert}
                showCloseButton={false}
                onclose={() => console.log()}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowDocCreditCheckAlert(false) }}><CloseIcon /></span></div>
                        <div>{t("low_credit")}!</div>
                        <div>{t("insufficient_credit_note")}?</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowDocCreditCheckAlert(false) }}>{t("no")}</Button>
                            <Button onClick={handleMtOnyDownloadYes} variant="contained">{t("yes")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
            {showIndividualAssignManage &&
                <MainAssignManage
                    showIndividualAssignManage={showIndividualAssignManage}
                    setShowIndividualAssignManage={setShowIndividualAssignManage}
                    assignStep={assignStep}
                    selectedFileRow={selectedFileRow}
                    targetLanguageOptionsRef={targetLanguageOptionsRef}
                    listFiles={listFiles}
                />
            }
            {showLSPAssignManage &&
                <LSPAssignManage
                    showLSPAssignManage={showLSPAssignManage}
                    setShowLSPAssignManage={setShowLSPAssignManage}
                    selectedFileRow={selectedFileRow}
                    targetLanguageOptionsRef={targetLanguageOptionsRef}
                    listFiles={listFiles}
                />
            }
            {showPOConfirmModal &&
                <ConformPOModal
                    showPOConfirmModal={showPOConfirmModal}
                    setShowPOConfirmModal={setShowPOConfirmModal}
                    projectIdForPOModal={projectIdForPOModal}
                    targetLanguageOptionsRef={targetLanguageOptionsRef}
                    listFiles={listFiles}
                    projectTypeForPOModal={projectTypeForPOModal}
                />
            }
            {showPOFilesModal && (
                <POFilesModal
                    showPOFilesModal={showPOFilesModal}
                    setShowPOFilesModal={setShowPOFilesModal}
                    POFilesDetails={POFilesDetails}
                />
            )}
            {showTaskReworkReasonModal && (
                <Rodal
                    visible={showTaskReworkReasonModal}
                    showCloseButton={false}
                    onclose={() => setShowTaskReworkReasonModal(false)}
                    className="reason-modal-wrapper"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowTaskReworkReasonModal(false) }}>
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
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowTaskReworkReasonModal(false) }}>{t("discard")}</ButtonBase>
                            <ButtonBase
                                onClick={() => !isReworkSending && clientSideTaskResponseUpdate()}
                                className="success-blue-btn"
                                style={customerTaskReworkReasonText?.trim() === '' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                            >
                                {isReworkSending && <ButtonLoader />} {t('send')}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            )}
            {showDeadlineCrossedModal && (
                <Rodal
                    visible={showDeadlineCrossedModal}
                    showCloseButton={false}
                    onclose={() => setShowDeadlineCrossedModal(false)}
                    className="reason-modal-wrapper info-modal"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowDeadlineCrossedModal(false) }}>
                            <img src={BlackCloseIcon} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("dealine_crossed")}</div>
                            <p>{t("send_request_client")}</p>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowDeadlineCrossedModal(false) }}>{t("close")}</ButtonBase>
                            <ButtonBase
                                className="success-blue-btn"
                                onClick={() => !isDeadlineExtendReqSending && sendExtendTaskDeadlineRequest()}
                            >
                                {isDeadlineExtendReqSending && <ButtonLoader />} {t('send')}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            )}
            {showVendorChangeRequestModal && (
                <Rodal
                    visible={showVendorChangeRequestModal}
                    showCloseButton={false}
                    onClose={() => setShowVendorChangeRequestModal(false)}
                    className="reason-modal-wrapper"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowVendorChangeRequestModal(false) }}>
                            <img src={BlackCloseIcon} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("change_request_reason")}</div>
                            <p>{vendorChangeRequestReason}</p>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowVendorChangeRequestModal(false) }}>{t("close")}</ButtonBase>
                            {/* <Button 
                                variant="contained"
                                onClick={() => !isDeadlineExtendReqSending && sendExtendTaskDeadlineRequest()} 
                            >
                                {isDeadlineExtendReqSending && <ButtonLoader />} Send
                            </Button> */}
                        </div>
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
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                    <div className="credits-text-cont">
                        <React.Fragment>
                            <img src={FileErrorIcon} alt="insuffient-icon" />
                            <div className="insuffient-txt-align">
                                <span>
                                    <img src={RedCircleIcon} alt="remove_circle" />
                                </span>
                                <p>{t("file_error")}</p>
                            </div>
                            <p className="insuffient-desc text-center">{t("file_err_note")}</p>
                            {/* <div className="mt-3">
                                <p className="insuffient-desc" style={{fontSize: '12px'}} dangerouslySetInnerHTML={{__html: t("translate_edit_foot_note")}}></p>
                            </div> */}
                        </React.Fragment>
                    </div>
                </Rodal>
            )}
        </React.Fragment>
    );
}
export default MyStories;
