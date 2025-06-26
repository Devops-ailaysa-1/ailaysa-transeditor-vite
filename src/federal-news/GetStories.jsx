/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import Checkbox from '@mui/material/Checkbox';
import Config from "../vendor/Config";
// import DragandDrop from "./DragandDrop";
// import Footer from "./Footer";
import Navbar from "../vendor/Navbar";
import { TabContent, TabPane, Nav, NavItem, NavLink, CardFooter } from "reactstrap";
import classnames from "classnames";
import Settings from "../vendor/Settings";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ButtonBase from '@mui/material/ButtonBase';
import Sourcelanguage from "../vendor/lang-modal/Sourcelanguage";
import Targetlanguage from "../vendor/lang-modal/Targetlanguage";
// import DatePicker from "../vendor/date-time-picker/DatePicker";
// import TimePicker from "../vendor/date-time-picker/TimePicker";
// import AssignManage from "./assign-tabs/AssignManage";
// import FindEditor from "./find-editor/FindEditors";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InstructionModal from "../vendor/model-select/InstructionModal";
// import GitHubBox from "./github-integration/GithubBox";
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
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
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
import MyDocuments from "../project-setup-components/myfiles-component/MyDocuments";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "../vendor/styles-svg/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
// import { setDownloadableFileResponse } from "../features/DownloadFileResponseSlice";
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
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
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
import LanguageSelector from "./LanguageSelector";
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBarIcon from "../assets/images/chat/chat-search.svg";
import BlackClose from '../assets/images/assign-page/search-bar-close.svg';
import NoEditors from "../assets/images/no-editors-found-2.svg";
import EmptyProjectIcon from "../assets/images/empty-projects-folder.svg";
import PlusIcon from "../assets/images/new-ui-icons/plus.svg";
import FederalImgPlaceholder from '../assets/images/federal-news/federal_placeholder.png';
import BlueRightArrow from '../assets/images/new-ui-icons/arrow_right_alt_color.svg';
import InsuffientIcon from "../assets/images/new-ui-icons/insuffient-icon.svg";
import RedCircleIcon from "../assets/images/new-ui-icons/remove_circle_red.svg";
import FileErrorIcon from "../assets/images/new-ui-icons/file-error.png";

function GetStories(props) {
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    let {
        activeProjTab,
        targetLanguageOptions,
        setTargetLanguageOptions,
        targetLanguageOptionsRef,
        mainContainerRef,
        setIsViewStoryModal,
        setSelectedStoryDetails,
        openAddStoryModal
    } = props;
    const location = useLocation();
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails.value);
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value);
    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor';

    /* State constants - start */
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [didMount, setDidMount] = useState(false);
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
    const [projectTypeOptions, setProjectTypeOptions] = useState([]);
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
    const [assignStep, setAssignStep] = useState(null);
    // const [preTranslate, setPreTranslate] = useState(false);
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
    const [selectedProjectFiledID, setselectedProjectFiledID] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [poPDFUrl, setPoPDFUrl] = useState(null)
    const [particularClickedTask, setParticularClickedTask] = useState(null);
    const [stepToAccept, setStepToAccept] = useState(null)
    const searchAreaRef = useRef(null);
    const [selectFileRow, setSelectFileRow] = useState(false);
    const [availCredits, setAvailCredits] = useState(false);
    const [projectFilterType, setprojectFilterType] = useState(null);
    const [isCurrentPlanTrial, setIsCurrentPlanTrial] = useState(null);
    const [documentSubmitParameters, setDocumentSubmitParameters] = useState({
        taskid: null,
        step: null,
        confirm: null,
        total: null,
        isTaskReassigned: false
    });
    const [showSubmitDocumentAlertModal, setShowSubmitDocumentAlertModal] = useState(false);
    const [showElement, setShowElement] = useState(true);
    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
    const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
    const [detailsOfPrimaryGlossarySourceName, setDetailsOfPrimaryGlossarySourceName] = useState("");
    const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
    const [glossaryLicense, setGlossaryLicense] = useState("");
    const [selectedUsagePermission, setSelectedUsagePermission] = useState({ value: 1, label: t("Private") });
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
    const [selectedGlossaryProject, setSelectedGlossaryProject] = useState(null);
    const [orderByValue, setOrderByValue] = useState(null);
    const [sortEl, setSortEl] = useState(null);
    const [moreEl, setMoreEl] = useState(null);
    const [openEl, setOpenEl] = useState(null);
    const [subDownloadOption, setSubDownloadOption] = useState(null);
    const [openedMoreOption, setOpenedMoreOption] = useState(null);
    const [showOpenAs, setShowOpenAs] = useState(null);
    const [orderBySelectedValue, setOrderBySelectedValue] = useState(2);
    const sortOpen = Boolean(sortEl);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [editInstantProjectModal, setEditInstantProjectModal] = useState(false);
    const [textToSpeechConvert, setTextToSpeechConvert] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [partialPretranslate, setPartialPretranslate] = useState(false);
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);
    const [unassignTaskDeleteAlert, setUnassignTaskDeleteAlert] = useState(false);
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null);
    const [taskActionOpen, setTaskActionOpen] = useState(false);
    const [taskActionAnchorEl, setTaskActionAnchorEl] = useState(null);
    const [expressProjectName, setExpressProjectName] = useState('');
    // project analysis states
    const [payableRatesAPI, setPayableRatesAPI] = useState(null);
    const [payablRateValueAPI, setPayablRateValueAPI] = useState(null);
    const [projectAnalysisedData, setProjectAnalysisedData] = useState(null);
    const [projectAnalysisUnitSwitch, setProjectAnalysisUnitSwitch] = useState(false);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [hasTeam, setHasTeam] = useState(false);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [isExpressUpdating, setIsExpressUpdating] = useState(false);
    const [showExpressDeleteModal, setShowExpressDeleteModal] = useState(false); // state to show confirmation modal for express project
    const [preTranslateAllTask, setPreTranslateAllTask] = useState([]);
    const [createdProjectsList, setCreatedProjectsList] = useState([]);
    const [isPdfTranslating, setIsPdfTranslating] = useState(false);
    const [transcriptionTaskList, setTranscriptionTaskList] = useState([]);
    const [analysisRunningProjectList, setAnalysisRunningProjectList] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showAssignedProjectDeleteAlert, SetShowAssignedProjectDeleteAlert] = useState(false);
    const [navigationModalVisible, setNavigationModalVisible] = useState(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [showdocCreditCheckAlert, setShowDocCreditCheckAlert] = useState(false);
    const [showTaskReworkReasonModal, setShowTaskReworkReasonModal] = useState(false);
    const [customerTaskReworkReasonText, setCustomerTaskReworkReasonText] = useState('');
    // states for open as button
    const [downloadOpen, setDownloadOpen] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null); // This is the common anchor element for all poppers
    const [popperAnchorEl, setPopperAnchorEl] = useState({}); // Separate anchor element for each popper
    const [showPOFilesModal, setShowPOFilesModal] = useState(false);
    const [POFilesDetails, setPOFilesDetails] = useState(null);
    const [isReworkSending, setIsReworkSending] = useState(false);
    const [isDeadlineExtendReqSending, setIsDeadlineExtendReqSending] = useState(false);
    const [showDeadlineCrossedModal, setShowDeadlineCrossedModal] = useState(false);
    const [vendorChangeRequestReason, setVendorChangeRequestReason] = useState("");
    const [showVendorChangeRequestModal, setShowVendorChangeRequestModal] = useState(false);
    const [isApproving, setIsApproving] = useState(false);    
    const [isDesignDeleting, setIsDesignDeleting] = useState(false);
    const [axiosGetStoriesAbortController, setAxiosGetStoriesAbortController] = useState(null);
    const [axiosFileTranslateAbortController, setAxiosFileTranslateAbortController] = useState(null);
    const [showFileErrorModal, setShowFileErrorModal] = useState(false);
    const [showTaskDesignIndividualDeleteAlert, setShowTaskDesignIndividualDeleteAlert] = useState(false);
    const [isStoryTranslating, setIsStoryTranslating] = useState(false);
    const [isStoryIdTranslating, setIsStoryIdTranslating] = useState(null);
    const [defaultPair , setDefaultPair] = useState([]);
    const [restrictedTargetLang , setRestrictedTargetLang] = useState([]);
    const [newsId, setNewsId] = useState([]);
    const [selectedLanguageCMS, setSelectedLanguageCMS] = useState({value: 1, label: 'English'});    
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
    const projectsPerPage = useRef(20);
    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const deletedSubjectIds = useRef([]);
    const deletedContentIds = useRef([]);
    const projectTypeRef = useRef(null);
    const assignedMemberCardRef = useRef(null);
    const downloadAnchorRef = useRef(null);
    const projectIdForPOModal = useRef(null);
    const projectTypeForPOModal = useRef(null);
    const clientResponseDataRef = useRef(null);
    // const allowedFileLength = useRef(10);
    // const fileLengthErrMsg = useRef(`Only ${allowedFileLength.current} files are allowed in a project`);
    // const allowedTargetLanguageLength = useRef(20);
    // const allowedFileSize = useRef(100); //In MB
    // const fileSizeErrMsg = useRef(`Exceeds the file(s) size limit of ${allowedFileSize.current} MB`);
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const projectIdToSelect = useRef(null);
    const subjectFieldOptionsRef = useRef([]);
    const contentTypeOptionsRef = useRef([]);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const projectEditable = useRef(false);
    const downloadref = useRef(null);
    const downloadedFileName = useRef(null);
    const searchTermCloseOutside = useRef();
    const searchTermRef = useRef(null);
    const createdProjectsRef = useRef([]);
    const selectedProjectFilesRef = useRef([]);
    const myTimeoutFunc = useRef(null);
    const selectedProjectIdRef = useRef(null);
    const projectObject = useRef(null);
    const analysisRunningProjectListRef = useRef(null);
    const wordCountAnalysisTimeoutRef = useRef(null);
    const wordCountAnalysisTriggerRef = useRef(false);
    const isTaskReassigned = useRef(false);
    const fileTranslatingTaskListRef = useRef([]);
    const sourceLangSelectBoxRef = useRef([]);
    const targetLangSelectBoxRef = useRef([]);
    /* Ref constants - end */

    var id = window.setTimeout(function () { }, 0);

    useEffect(() => {
        let timeOut = setTimeout(function () {
            setShowElement(false);
        }, 10000);
        return () => {
            clearTimeout(timeOut);
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

    useEffect(() => {
        setDidMount(true); //Component mounted
        defaultDetail();
    }, []);

    useEffect(() => {
        let langParam = URL_SEARCH_PARAMS.get('lang') ? URL_SEARCH_PARAMS.get('lang') : "English";
        let langParamId = targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.id;       
        if(defaultPair && targetLanguageOptionsRef.current?.length !== 0){
            // setSourceLanguage(defaultPair.src);
            // setSourceLabel(targetLanguageOptionsRef.current?.find((each) => each.id === defaultPair.src)?.language);
            let tar = [];
            defaultPair.tar?.forEach((lang) => {
                if(lang != langParamId){
                    tar.push(targetLanguageOptionsRef.current?.find((each) => each.id == lang))
                }
            }) 
            setTargetLanguage([...tar]);
        }
        if(targetLanguageOptionsRef.current?.length !== 0){
            setSourceLanguage(langParamId);
            setSourceLabel(targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.language);
        }
    },[defaultPair, targetLanguageOptionsRef.current, URL_SEARCH_PARAMS.get('lang')]);

    useEffect(() => {
        if(targetLanguage?.length !== 0 && targetLanguageOptionsRef.current?.length !== 0) {
            let langParam = URL_SEARCH_PARAMS.get('lang') ? URL_SEARCH_PARAMS.get('lang') : "English";
            let langParamId = targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.id;    
            if(targetLanguage?.find(lang => lang.id == langParamId)){
                setTargetLanguage(targetLanguage?.filter(lang => lang.id != langParamId));
            }
        }
    }, [targetLanguage, targetLanguageOptionsRef.current]);    

    // calculate restricting target language from selected news
    useEffect(() => {
        let newsList = createdProjects?.filter(each => newsId?.some(item => item == each?.newsId));
        let restrictedTarLang = Array.from(new Set(newsList?.map(each => {
            if(each?.tar_code !== undefined) return each?.tar_code
            else return []
        })?.flat()));
        setRestrictedTargetLang(restrictedTarLang);
        let filteredTarLang = defaultPair?.tar?.filter(each => !restrictedTarLang?.some(item => item === each));
        setTargetLanguage(targetLanguageOptionsRef.current?.filter(each => filteredTarLang?.some(item => item === each?.id))?.slice(0, 2));
    }, [newsId]);
     
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

    const federalLangList = [
        { value: 1, label: 'English' },
        { value: 4, label: 'Hindi' },
        { value: 3, label: 'Kannada' },
        { value: 2, label: 'Telugu' },
    ];

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
    ];

    useEffect(() => {
        let engines = [];
        mtpeEngines.map((eachEngine) => engines.push({ value: eachEngine.id, label: eachEngine.name }));
        setMtpeEngineOptions(engines);
    }, [mtpeEngines]);

    /* Show errors when not uploadig files */
    useEffect(() => {
        if (didMount) {
            if (files.length === 0 && fileUrl === "" && editFiles.length === 0) setFileError(t("upload_files"));
            else setFileError("");
        }
    }, [files]);

    /* Selected source language should not display on the target language options */
    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(targetLanguageOptionsRef.current.filter((element) => element.id != sourceLanguage));
    };

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setshowSrcLangModal(false);
        setSearchInput('');
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
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
            targetLanguageTemp.push(value);
        }
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSearchInput('');
        setOnFocusWrap(false);
    };

    useEffect(() => {
        removeSelectedSourceFromTarget();
    }, [sourceLanguage]);

    useEffect(() => {
        if (targetLanguage) {
            let list = "";
            targetLanguage?.map((each, index) => {
                list += `${each?.language}${index !== targetLanguage?.length - 1 ? ", " : ""
                    }`;
            });
            setTargetLanguageListTooltip(list);
        }
    }, [targetLanguage, targetLanguageOptionsRef.current]);

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
        let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
        setTargetLangListToRemove(targetLangToRemove);
    }, [targetLanguage]);

    const handleCloseSearchBox = () => {
        setProjectSearchTerm("");
        setFileListSearchEnlarge(false);
        URL_SEARCH_PARAMS.delete("search");
        URL_SEARCH_PARAMS.set("page", 1);
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());     
    }

    useEffect(() => {
        if (projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete) {
            projectSearchFunctionality('clear-search');
        }else if(projectSearchTerm == "" && searchTermRef.current !== "" && searchTermRef.current !== null){
            projectSearchFunctionality('clear-search');
        }
    }, [projectSearchTerm]);

    /* Throw errors when there's no target language selected */
    useEffect(() => {
        if (didMount) {
            if (targetLanguage?.length > 0) setTargetLanguageError("");
            else setTargetLanguageError("Select one or more target language(s)");
        }
    }, [targetLanguage]);

    const SearchTermFilterEnter = (e) => {
        if (e.which === 13 && projectSearchTerm == "") {
            setFileListSearchEnlarge(false);
            e.target.blur()
        } else if (e.which === 13) {
            projectSearchFunctionality();
            setFileListSearchEnlarge(false);
            searchTermRef.current = projectSearchTerm;
            e.target.blur();
        }
    }

    const handleSearchDropDownClick = (e) => {
        projectSearchFunctionality();
    }

    const projectSearchFunctionality = (param) => {       
        let queryParam = new URLSearchParams(window.location.search);   
        if (param !== 'clear-search') {
            queryParam.set("page", 1);
            if (projectSearchTerm != null) queryParam.set("search", projectSearchTerm);
            // if (projectSearchTerm != null) url += `&search=${projectSearchTerm}`;
        }else if(param === 'clear-search'){
            setIsSearchTermDelete(true);
        }
        history(window.location.pathname + '?' + queryParam.toString());
        // history(url);
    }

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        const controller = new AbortController();
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam !== null && pageParam !== undefined) {
            getStories(controller);
        }
        mainContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        let getStoryInterval = setInterval(() => {
            getStories(controller, true);
        }, 8000);
        return () => {
            clearInterval(getStoryInterval);
            controller.abort();
        }
    }, [URL_SEARCH_PARAMS.get("page")]);

    useEffect(() => {
        let langParam = URL_SEARCH_PARAMS.get("lang");        
        if(langParam){
            getStories();
        }
    }, [URL_SEARCH_PARAMS.get("lang")]);
    
    useEffect(() => {
        let filterParam = URL_SEARCH_PARAMS.get("filter")
        if (filterParam !== null && filterParam !== undefined) {
            let filtered = projectTypes?.find(each => each?.value == filterParam);
            setprojectFilterType({
                value: filtered?.value,
                label: filtered?.label?.charAt(0)?.toUpperCase() + filtered?.label?.slice(1)
            });
        }
        // fileUploadTop.current.scrollIntoView({ behavior: "smooth", }, 100 );
    }, [URL_SEARCH_PARAMS.get("filter")]);

    useEffect(() => {
        const controller = new AbortController();
        let searchParam = URL_SEARCH_PARAMS.get("search");
        if (searchParam !== null && searchParam !== undefined) {
            setProjectSearchTerm(searchParam);
            getStories(controller);            
        } else if (isSearchTermDelete) {
            getStories(controller);
        }
        return () => {
            controller.abort();
        }
    }, [URL_SEARCH_PARAMS.get("search"), isSearchTermDelete]);

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current);
        clearTimeout(myTimeoutFunc.current);
        let url = `/all-stories?page=${page}`;
        let queryParam = new URLSearchParams(window.location.search);
        queryParam.set("page", page);
        history(window.location.pathname + '?' + queryParam.toString());        
        // let orderParam = queryParam.get("order_by");
        // if (orderParam != null) url += `&order_by=${orderParam}`;
        // let projectIdParam = queryParam.get("open-project");
        // if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        // let filterParam = queryParam.get("filter");
        // if (filterParam != null) url += `&filter=${filterParam}`;
        // let searchParam = queryParam.get("search");
        // if (searchParam != null) url += `&search=${searchParam}`;
        // let typeParam = URL_SEARCH_PARAMS.get("type")
        // if (typeParam != null) url += `&type=${typeParam}`;
        // history(url);
    };

    const handleCMSLangChange = (option) => {
        setSelectedLanguageCMS(option);
        setNewsId([]);
        URL_SEARCH_PARAMS.set("lang", option?.label);
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
    } 

    /* Set order by value and redirect */
    const orderBy = (orderFieldTemp) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current);
        let page = 1;
        let url = '';
        if (activeProjTab === 3) {
            url = `/translations?page=${page}`;
        } else if (activeProjTab === 4) {
            url = `/transcriptions?page=${page}`;
        } else if (activeProjTab === 5) {
            url = `/ai-voices?page=${page}`;
        } else if (activeProjTab === 6) {
            url = `/assets?page=${page}`;
        } else if (activeProjTab === 9) {
            url = `/designs?page=${page}`;
        }
        if (orderFieldTemp != null) url += `&order_by=${orderFieldTemp}`;
        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let filter = URL_SEARCH_PARAMS.get("filter");
        if (filter != null) url += `&filter=${filter}`;
        let searchParam = URL_SEARCH_PARAMS.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        let typeParam = URL_SEARCH_PARAMS.get("type");
        if (typeParam != null) url += `&type=${typeParam}`;
        history(url);
    };

    // handle project type filter
    const handleProjectType = (selected) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current);
        let page = URL_SEARCH_PARAMS.get("page");
        let orderby = URL_SEARCH_PARAMS.get("order_by");
        let searchParam = URL_SEARCH_PARAMS.get("search");
        let url = '';
        setprojectFilterType(selected);
        projectTypeRef.current = selected;
        if (projectFilterType?.value != selected?.value) {
            url = `/file-upload?page=1${orderby ? `&order_by=${orderby}` : ''}`;
            if (selected?.value != null) url += `&filter=${selected?.value}`;
        } else {
            url = `/file-upload?page=${page}${orderby ? `&order_by=${orderby}` : ''}`;
            if (selected?.value != null) url += `&filter=${selected?.value}`;
        }
        if (searchParam != null) url += `&search=${searchParam}`;
        history(url);
    };

    // need to put in useeffect instead of a function because new need to clear the timeout when the component is unmounted (so, we clear the settimout in return of useeffect)
    // otherwise if written as function the settimout will be called in every component until the page is reloaded
    useEffect(() => {
        if (analysisRunningProjectList?.length !== 0) {
            let list = "";
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
                    let runningProj = response.data?.out?.filter(each => each.hasOwnProperty('celery_id'));
                    let finishedProj = response.data?.out?.filter(each => !each.hasOwnProperty('celery_id'));
                    // if(finishedProj?.length !== 0){
                    //     finishedProj?.map(each => {
                    //     })
                    // }
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
                        setCreatedProjects(newArr);
                        wordCountAnalysisTimeoutRef.current = setTimeout(() => {
                            setAnalysisRunningProjectList(runningProj);
                            analysisRunningProjectListRef.current = runningProj;
                            wordCountAnalysisTriggerRef.current = !wordCountAnalysisTriggerRef.current;
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
                        setCreatedProjects(newArr);
                    }
                },
                error: (err) => {
                      console.error(err);
                }
            });
        }
        return () => {
            clearTimeout(wordCountAnalysisTimeoutRef.current);
        }
    }, [analysisRunningProjectList]);

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
    const selectProjectById = (projectId, shouldListFiles) => {
        if (shouldListFiles !== "dont-open") setOpenedProjectId(projectId);
        setSelectedProjectId(projectId);
        // listFiles(projectId);
        selectedProjectIdRef.current = projectId;
        setTranscriptionTaskList([]);
        setPreTranslateAllTask([]);
        // while (id--) {
        //     window.clearTimeout(id); // will do nothing if no timeout with id is present
        // } 
        clearTimeout(myTimeoutFunc.current);
        let createdProject = createdProjects.find((element) => element.id == projectId);
        if (createdProject?.project_name != null) setSelectedProjectName(createdProject.project_name);
        if (createdProject?.project_analysis != null) {
            let createdProjectAnalysis = createdProject.project_analysis;
            setProjectWordCount(createdProjectAnalysis.proj_word_count);
            setProjectCharCount(createdProjectAnalysis.proj_char_count);
            setProjectSegmentCount(createdProjectAnalysis.proj_seg_count);
        }
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
        height: 'auto',
        onClose: () => console.log(),
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        onClose: () => console.log(),
    };
    
    // task accept api 
    const taskAssignUpdate = (targetValue) => {
        // e.stopPropagation(); 
        var formdata = new FormData();
        formdata.append("task_ven_status ", targetValue);
        formdata.append("task", particularClickedTask);
        formdata.append("step", stepToAccept);
        if (isTaskReassigned.current) {
            formdata.append("reassigned", 'True');
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            auth: true,
            method: "PUT",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    setShowPoModal(false);
                    // listFiles(openedProjectId);
                    isTaskReassigned.current = false;
                    // setAcceptedRates(response.data["Previously Agreed Rates"]);
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error');
                }
            },
        });
    }

    const handleDocumentSubmit = (taskID, step) => {
        let formData = new FormData();
        formData.append("task", taskID);
        formData.append("step", step);
        formData.append("status", "3"); // submit: 3, in-progress: 2
        if (documentSubmitParameters?.isTaskReassigned) {
            formData.append("reassigned", 'True');
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                // listFiles(openedProjectId);
                setShowSubmitDocumentAlertModal(false);
                setDocumentSubmitParameters({ ...documentSubmitParameters, isTaskReassigned: false });
                Config.toast(t("document_submitted"));
            }
        });
    }

    useEffect(() => {
        if (documentSubmitParameters?.taskid !== null) {
            getDocumentProgress(documentSubmitParameters?.confirm, documentSubmitParameters?.total);
        }
    }, [documentSubmitParameters]);

    const getDocumentProgress = (confirmed, total) => {
        if (confirmed == total) {
            handleDocumentSubmit(documentSubmitParameters?.taskid, documentSubmitParameters?.step);
        }
        else {
            setShowSubmitDocumentAlertModal(true);
        }
    }

    const handleDocuemtSubmitConfirmation = () => {
        handleDocumentSubmit(documentSubmitParameters?.taskid, documentSubmitParameters?.step);
    }

    const handleCreateNewProjectBtnClick = () => {
        const search_param = new URLSearchParams(window.location.search);
        let typeParam = search_param.get("type");
        if (typeParam === 'assert') {
        } else {
            if(activeProjTab === 9){    // redirect to designer
                window.open(Config.DESIGNER_HOST);
            }else{
                history(
                    activeProjTab === 3 ? "/create/translate/files/translate-files" :
                        activeProjTab === 4 ? "/create/speech/speech-to-text" :
                            activeProjTab === 5 ? "/create/speech/text-to-speech" :
                                activeProjTab === 6 && "/create/assets/glossaries/create"
                                
                );
            }
        }
    }

    // this api will initiate the file translate process and provide the status of each task
    const getProjectTransDownloadStatus = (task_id) => {
        if(projectObject.current?.id === undefined) return;
        // it will abort/cancel the ongoing api request
        if (axiosFileTranslateAbortController) {
            axiosFileTranslateAbortController.abort();
        }    
        const controller = new AbortController();
        setAxiosFileTranslateAbortController(controller);
        let task_list_arr = [];
        let alreadyProcessingTask = selectedProjectFilesRef.current?.filter(each => each.isProcessing);
        let alreadyProcessingTaskIds = alreadyProcessingTask?.map(each => each.id);
        if(alreadyProcessingTask?.length !== 0){
            task_list_arr = [...new Set([...alreadyProcessingTaskIds, task_id])];
        }else{
            task_list_arr = [task_id];
        }
        fileTranslatingTaskListRef.current = task_list_arr;
        // create task list to process
        let list = "";
        fileTranslatingTaskListRef.current?.map((each, index) => {
            list += `task=${each}${index !== fileTranslatingTaskListRef.current?.length - 1 ? "&" : ""}`;
        });
        // display the button loader as soon as the user clicks the TRANSLATE button
        if(task_id !== undefined){
            let newArr = selectedProjectFilesRef.current?.map(obj => {
                if(obj.id === task_id){
                    return {
                        ...obj,
                        isProcessing: true,
                    }
                }
                return obj;
            })
            selectedProjectFilesRef.current = newArr;
            setSelectedProjectFiles(newArr);
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/translate_file/?${list}`,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                // if called with project_id, returns list if task_data
                if(response.data?.results !== undefined){
                    let dataList = response.data?.results;
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
                        return obj;
                    })
                    selectedProjectFilesRef.current = newArr ;
                    setSelectedProjectFiles(newArr);                    
                    let isAnyTaskIsProcessing = selectedProjectFilesRef.current?.find(each => each.status === 400) ? true : false;
                    let insuffientCredit = selectedProjectFilesRef.current?.find(each => each.status === 402) ? true : false;
                    let isPageNumNotFound = selectedProjectFilesRef.current?.find(each => each.status === 404) ? true : false;                    
                    if(isPageNumNotFound){
                        // Config.toast(`File couldn't process!`, 'error');
                        setShowFileErrorModal(true);
                        let newArr = selectedProjectFilesRef.current?.map(obj => {
                            if(obj.status === 404){
                                return {
                                    ...obj,
                                    isProcessing: false,
                                }
                            }
                            return obj;
                        })
                        selectedProjectFilesRef.current = newArr;
                        setSelectedProjectFiles(newArr);
                        return;
                    }
                    if(insuffientCredit) setShowCreditAlertModal(true);
                    if(isAnyTaskIsProcessing){
                        setTimeout(() => {
                            getProjectTransDownloadStatus(task_id);
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
                        });
                        selectedProjectFilesRef.current = newArr ;
                        setSelectedProjectFiles(newArr);
                        setShowCreditAlertModal(true);
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
                        return obj;
                    });
                    selectedProjectFilesRef.current = newArr;
                    setSelectedProjectFiles(newArr);
                }
            }
        });
    }

    const defaultDetail = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/default_detail`,
            auth: true,
            method: "GET",
            success: (response) => {
                if (response.status === 200) {
                  setDefaultPair(response?.data?.recent_pairs[0]);                 
                } else {
                  Config.toast(`${t("something_went_wrong")}`, 'error');
                }
            },
        });
    }
    
    const getStories = (controllers, fromInterval = false) => {
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
        setFileListSearchEnlarge(false);
        if(!fromInterval){
            setShowListingLoader(true);
            setCreatedProjects([]);
        }
        if (axiosGetStoriesAbortController) {
            axiosGetStoriesAbortController.abort();
        }
        const controller = new AbortController();
        setAxiosGetStoriesAbortController(controller);
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
        let typeParam = URL_SEARCH_PARAMS.get("type");
        let searchParam = URL_SEARCH_PARAMS.get("search");
        let langParam = URL_SEARCH_PARAMS.get("lang");
        /* ordering param set/get - end */
        let url = `${Config.BASE_URL}/workspace/get_stories/?page=${page}${orderParam != null ? `&ordering=${orderParam}` : ''}`;
        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;
        if (typeParam !== null && typeParam !== undefined && typeParam !== 'all') url += `&type=${typeParam}`
        if (langParam !== null && langParam !== undefined) url += `&lang=${langParam}`
        // if (activeProjTab === 3) url += `&filter=translation`
        // if (activeProjTab === 4) url += `&filter=transcription`
        // if (activeProjTab === 5) url += `&filter=ai_voice`
        // if (activeProjTab === 6) url += `&filter=assets`

        let params = {
            url: url,
            auth: true,
            ...((controller !== undefined && controller !== null) && {signal: controller.signal}),
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                // setOrderField(orderFieldTemp);
                setCreatedProjects(response.data);
                setCreatedProjectsList(response.data);
                createdProjectsRef.current = response.data;
                setShowListingLoader(false);
                if (response.data.length === 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                if (response.data?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'))?.length !== 0) {
                    setAnalysisRunningProjectList(response.data?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id')));
                    analysisRunningProjectListRef.current = response.data?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'));
                }
            },
            error: (error) => {
                Config.error(error);
                setShowListingLoader(false);
            },
        };
        Config.axios(params);
    }

    const removeElement = (valueToRemove) => {
        const newArray = newsId.filter(item => item !== valueToRemove);
        setNewsId(newArray);
    };

    const handleSelectedcard = (e, id) => {
        e.stopPropagation()
        if(newsId?.length === 10 && (newsId?.find(each => each === id) ? false : true)){
            Config.toast('Maximum 10 stories can be added for better project management', 'warning');
            return;
        }
        if(newsId.includes(id)){
            removeElement(id);
        }else{
            setNewsId(oldArray => [...oldArray, id]);
        }
    }

    const handleStoryClick = (e, story) => {
        setSelectedStoryDetails(story);
        setIsViewStoryModal(true);
    } 

    const addErrorFieldClass = (element) => {
        element.classList.add('error-field-style');
    }
    
    const handleClaimStoriesBtnClick = (e, news_id, group = false) => {
        e.stopPropagation();
        if(sourceLanguage === "" || sourceLanguage === undefined || sourceLanguage === null){
            addErrorFieldClass(sourceLangSelectBoxRef.current);
            return;
        }
        if(targetLanguage?.length === 0 || targetLanguage === undefined || targetLanguage === null){
            addErrorFieldClass(targetLangSelectBoxRef.current);
            return;
        }
        let formData = new FormData();
        if(group){
            setIsStoryTranslating(true);
            newsId?.forEach(newsId => formData.append('news_id', newsId));
        }else{
            setIsStoryIdTranslating(news_id);
            formData.append('news_id', news_id);
        }        
        formData.append('source_language', sourceLanguage);
        targetLanguage.forEach(lang => {
            formData.append('target_languages', lang?.id)
        })

        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/news/setup/`,
            auth: true,
            method: "POST",
            data: formData,
            success: (response) => {
                setIsViewStoryModal(false);
                if (response.status === 200) {
                    setNewsId([]);
                    history(`/my-stories?page=1`);
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error');
                }
                setIsStoryTranslating(false);
                setIsStoryIdTranslating(null);
            },
            error: (err) => {
                Config.toast(`${t("something_went_wrong")}`, 'error');
                setIsStoryTranslating(false);
                setIsStoryIdTranslating(null);
            }
        });
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
                                    onClick={() => handleCloseSearchBox()} >
                                    <img src={BlackClose} alt="search-bar-close" />
                                </span>
                            </div>
                            <div ref={searchTermCloseOutside} className={"search-results-bar project-list-search-bar " + (fileListSearchEnlarge ? "show" : "hide")}>
                                <div name="search-dropdown" onClick={(e) => (projectSearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (projectSearchTerm !== "" ? " " : "cursor-change")}>
                                    <SearchIcon className="search-icon" name="search-dropdown" />
                                    <div className="searched-results-info" name="search-dropdown">
                                        <p className="searched-term" name="search-dropdown">{projectSearchTerm}</p>
                                        { projectSearchTerm !== "" ?
                                            <p className="results-link" name="search-dropdown">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                            :
                                            <p className="results-link">{t("search_results_proj_list_1")} <span>{t("story_search_help_text")}</span></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Select
                            options={federalLangList}
                            isSearchable={false}
                            styles={customProjectTypeSelectStyles}
                            value={selectedLanguageCMS}
                            classNamePrefix="project-type-list"
                            placeholder={'Language'}
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            onChange={handleCMSLangChange} />
                    </div>
                    <div className="get-stories-btn-wrapper">
                        <ButtonBase className="refresh-btn-wrapper" onClick={getStories}>
                            <RefreshIcon className={"ref-icon " + (showListingLoader ? "rotate" : "")} />
                            {t("refresh")}
                        </ButtonBase>
                        {/* <ButtonBase className="add-btn-wrapper" onClick={openAddStoryModal}>
                            <AddIcon className="ref-icon" />
                            {t("add_story")}
                        </ButtonBase> */}
                    </div>
                </div>
                <div className="upload-files-section">
                    <div id="select-files" className="uploaded-files">
                        <div className="file-edit-heading-row project-list-main">
                            <div className="file-edit-heading-table">
                                <>
                                    { createdProjects.length != 0 || !showListingLoader ? (
                                        (createdProjects?.length != 0 || projectFilterType !== null || projectSearchTerm != "") ?
                                            (
                                                (createdProjects?.length == 0 && projectSearchTerm != "") ? 
                                                (<React.Fragment>
                                                        <section className="ai-no-project-found">
                                                            <div className="ai-no-project-cont">
                                                                { projectSearchTerm ?
                                                                    <img  className="empty-folder-img" src={NoEditors}  alt="empty-folder-open" />
                                                                    :
                                                                    <img className="empty-folder-img" src={EmptyProjectIcon}  alt="empty-folder-open"  />
                                                                }
                                                                <h2>{t("no_story_found")}</h2>
                                                                { projectSearchTerm ? null :
                                                                    <>
                                                                    {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                        <button className="workspace-files-AddNewProjectButton"
                                                                            onClick={() => { handleCreateNewProjectBtnClick() }} >
                                                                            <span className="add-new-project-btn">
                                                                            <img src={PlusIcon} alt="plus" />
                                                                            {t("create_new_project")}
                                                                             </span>
                                                                            </button>
                                                                    )}
                                                                    </>
                                                                }
                                                            </div>
                                                        </section>
                                                    </React.Fragment>)                                                 
                                                :
                                                (createdProjects?.length !== 0) ?
                                                    <React.Fragment>
                                                        {createdProjects?.map((each,index) => {
                                                            return(
                                                                // file deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
                                                                <div className={"file-edit-list-table-row focused-proj-row federal-news " + (newsId.includes(each.newsId) ? "selected" : "" )} onClick={(e) => handleStoryClick(e, each)} >
                                                                    <div className="selected-file-row">
                                                                        <div  className="file-edit-inner-table" >
                                                                            <div className="file-edit-list-inner-table-row">
                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                    <div className='check-box-wrap'>
                                                                                        <Checkbox  size="small" checked={newsId.includes(each.newsId) ? true : false} nClick={(e) => handleSelectedcard(e, each.newsId)}/>
                                                                                    </div>
                                                                                    <div className="d-flex flex-column w-100">
                                                                                        <div className="my-stories-doc-info-wrapper">
                                                                                            <div className="doc-icon-wrapper">
                                                                                                <span className="doc-icon"> 
                                                                                                    <img src={each.thumbUrl}  alt="new-img"
                                                                                                        onError={({ currentTarget }) => {
                                                                                                            currentTarget.onerror = null; // prevents looping
                                                                                                            currentTarget.src= FederalImgPlaceholder;
                                                                                                        }}  />
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className="story-info-wrap">
                                                                                                <span className="category-wrap">{each?.maincat_name}</span>
                                                                                                <Tooltip TransitionComponent={Zoom} title={each?.heading} placement="top">
                                                                                                    <span className="file-edit-proj-txt-file-name">
                                                                                                    {each?.heading}
                                                                                                    </span>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                    <div className="project-list-action-wrap">
                                                                                        {each?.claimed && (
                                                                                            <div className="file-edit-translation-txt">
                                                                                                <small style={{marginRight: '4px'}}>Claimed languages:</small>
                                                                                                <span>
                                                                                                    {targetLanguageOptionsRef.current?.find(item => item?.id === each?.src_code)?.language}
                                                                                                </span>
                                                                                                <img src={BlueRightArrow} />
                                                                                                <span>
                                                                                                    { targetLanguageOptionsRef.current?.filter(item => each?.tar_code?.some(obj => obj === item?.id))?.map(each => {
                                                                                                            return each?.language
                                                                                                        })?.join(', ')
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                        )}
                                                                                        <>
                                                                                            {!newsId.includes(each.newsId) ? (
                                                                                                <button className="workspace-files-OpenProjectButton" type="button" disabled={isStoryIdTranslating !== null || isStoryTranslating}
                                                                                                    onClick={(e) =>{!isStoryIdTranslating !== each.newsId && handleSelectedcard(e, each.newsId)}} >
                                                                                                    <span className="fileopen-new-btn">
                                                                                                        {isStoryIdTranslating === each.newsId && (
                                                                                                            <ButtonLoader />
                                                                                                        )}
                                                                                                        {t("claim")}
                                                                                                    </span>
                                                                                                </button>
                                                                                            ) : (
                                                                                                <button  className="workspace-files-OpenProjectButton" type="button" style={{backgroundColor: "#9d9db1"}}
                                                                                                    disabled={isStoryIdTranslating !== null || isStoryTranslating}
                                                                                                    onClick={(e) =>{!isStoryIdTranslating !== each.newsId && handleSelectedcard(e, each.newsId)}} >
                                                                                                    <span className="fileopen-new-btn">
                                                                                                        {isStoryIdTranslating === each.newsId && (
                                                                                                            <ButtonLoader />
                                                                                                        )}
                                                                                                        {t("unclaim")}
                                                                                                    </span>
                                                                                                </button>
                                                                                            )}
                                                                                        </>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )})
                                                        }
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <section className="ai-no-project-found">
                                                            <div className="ai-no-project-cont">
                                                                { projectSearchTerm ?
                                                                    <img className="empty-folder-img" src={NoEditors}  alt="empty-folder-open" />
                                                                    :
                                                                    <img  className="empty-folder-img"  src={EmptyProjectIcon}  alt="empty-folder-open" />
                                                                }
                                                                <h2>{t("no_project_found")}</h2>
                                                                { projectSearchTerm ?  null  :
                                                                    <>
                                                                    {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                    <button className="workspace-files-AddNewProjectButton"
                                                                        onClick={() => {handleCreateNewProjectBtnClick() }}>
                                                                    <span className="add-new-project-btn">
                                                                    <img src={PlusIcon} alt="plus" />
                                                                    {t("create_new_project")}
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
                                            ( !showEmptyProjects ? (
                                                    <React.Fragment>
                                                        {Array(projectsPerPage?.current)
                                                            .fill(null)
                                                            .map((value, key) => (
                                                                <div  className="file-edit-list-table-row focused-proj-row federal-news">
                                                                    <div className="selected-file-row">
                                                                        <div className="file-edit-inner-table" key={key}>
                                                                            <div className="file-edit-list-inner-table-row">
                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                    <div className='check-box-wrap'>
                                                                                        <Skeleton animation="wave"  variant="circular" width={25} height={25} />
                                                                                    </div>
                                                                                    <div className="doc-icon-wrapper">
                                                                                        <span className="doc-icon">
                                                                                            <Skeleton animation="wave" variant="rounded" style={{ width: "100%", height: "100%" }}  />
                                                                                        </span>
                                                                                        {/* <div style={{ marginTop: "10px" }} className="d-flex align-items-center">
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
                                                                                        </div> */}
                                                                                    </div>
                                                                                    <div className="story-info-wrap">
                                                                                        <Skeleton  animation="wave"  style={{ marginBottom: "15px" }} variant="rounded"  width={80}  height={10}  />
                                                                                        <div className="d-flex flex-column">
                                                                                            <Skeleton animation="wave"  variant="rounded" width={200}  height={15} />
                                                                                            <Skeleton  animation="wave"  style={{ marginTop: "0.5rem" }} variant="rounded" width={100}  height={15} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                    <div className="d-flex align-items-center justify-content-end w-100">
                                                                                        <div className="d-flex align-items-center">
                                                                                            <Skeleton animation="wave"  variant="rounded"  width={80}  height={28}
                                                                                                // style={{ marginRight: "14px" }}
                                                                                            />
                                                                                            {/* <Skeleton
                                                                                                animation="wave"
                                                                                                style={{ marginRight: "14px" }}
                                                                                                variant="rounded"
                                                                                                width={80}
                                                                                                height={28}/>
                                                                                            <Skeleton
                                                                                                animation="wave"
                                                                                                style={{ marginRight: "14px" }}
                                                                                                variant="rounded"
                                                                                                width={80}
                                                                                                height={28} />
                                                                                            <Skeleton
                                                                                                animation="wave"
                                                                                                variant="circular"
                                                                                                width={25}
                                                                                                height={25} /> */}
                                                                                        </div>
                                                                                    </div>    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="project-setup-pagination">
                                                                <div className="d-flex align-items-center">
                                                                    <Skeleton style={{ marginRight: "14px" }} animation="wave" variant="rounded" width={150} height={38} />
                                                                    <Skeleton animation="wave" variant="rounded" width={150} height={38} />
                                                                </div>
                                                            </div>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <section className="ai-no-project-found">
                                                            <div className="ai-no-project-cont">
                                                                { projectSearchTerm ?
                                                                        <img className="empty-folder-img" src={NoEditors}  alt="empty-folder-open"  />
                                                                        :
                                                                        <img className="empty-folder-img" src={EmptyProjectIcon}  alt="empty-folder-open" />
                                                                }
                                                                <h2>{t("no_project_found")}</h2>
                                                                { projectSearchTerm ?  null  :
                                                                        <>
                                                                            {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                                <button className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => {
                                                                                        handleCreateNewProjectBtnClick()
                                                                                        // history(
                                                                                        //     activeProjTab === 3 ? "/create/translate/files/translate-files" :
                                                                                        //         activeProjTab === 4 ? "/create/speech/speech-to-text" :
                                                                                        //             activeProjTab === 5 ? "/create/speech/text-to-speech" :
                                                                                        //                 activeProjTab === 6 && "/create/assets/glossaries/create"
                                                                                        // );
                                                                                    }}  >
                                                                                    <span className="add-new-project-btn">
                                                                                    <img src={PlusIcon} alt="plus" />
                                                                                        {t("create_new_project")}
                                                                                    </span>
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                }
                                                            </div>
                                                        </section>
                                                    </React.Fragment>
                                                )
                                            )
                                        ):
                                        (
                                            <React.Fragment>
                                                {Array(projectsPerPage?.current)
                                                    .fill(null)
                                                    .map((value, key) => (
                                                        <div  className="file-edit-list-table-row focused-proj-row federal-news">
                                                            <div className="selected-file-row">
                                                                <div className="file-edit-inner-table" key={key}>
                                                                    <div className="file-edit-list-inner-table-row">
                                                                        <div className="file-edit-list-inner-table-cell">
                                                                            <div className='check-box-wrap'>
                                                                                <Skeleton animation="wave"  variant="circular"  width={25}  height={25} />
                                                                            </div>
                                                                            <div className="doc-icon-wrapper">
                                                                                <span className="doc-icon">
                                                                                    <Skeleton animation="wave" variant="rounded" style={{ width: "100%", height: "100%" }}/>
                                                                                </span>
                                                                                {/* <div style={{ marginTop: "10px" }} className="d-flex align-items-center">
                                                                                    <Skeleton
                                                                                        animation="wave"
                                                                                        style={{ marginLeft: "0.2rem" }}
                                                                                        variant="rounded"
                                                                                        width={20}
                                                                                        height={10} />
                                                                                    <Skeleton
                                                                                        animation="wave"
                                                                                        style={{ marginLeft: "0.2rem" }}
                                                                                        variant="rounded"
                                                                                        width={20}
                                                                                        height={10} />
                                                                                    <Skeleton
                                                                                        animation="wave"
                                                                                        style={{ marginLeft: "0.2rem" }}
                                                                                        variant="rounded"
                                                                                        width={20}
                                                                                        height={10}/>
                                                                                </div> */}
                                                                            </div>
                                                                            <div className="story-info-wrap">
                                                                                <Skeleton animation="wave"  style={{ marginBottom: "15px" }}  variant="rounded"  width={80} height={10} />
                                                                                <div className="d-flex flex-column">
                                                                                    <Skeleton  animation="wave"  variant="rounded"  width={200} height={15}  />
                                                                                    <Skeleton animation="wave" style={{ marginTop: "0.5rem" }}  variant="rounded" width={100} height={15}  />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="file-edit-list-inner-table-cell">
                                                                            <div className="d-flex align-items-center justify-content-end w-100">
                                                                                <div className="d-flex align-items-center">
                                                                                    <Skeleton  animation="wave" variant="rounded" width={80} height={28}
                                                                                        // style={{ marginRight: "14px" }} 
                                                                                    />
                                                                                    {/* <Skeleton
                                                                                        animation="wave"
                                                                                        style={{ marginRight: "14px" }}
                                                                                        variant="rounded"
                                                                                        width={80}
                                                                                        height={28}/>
                                                                                    <Skeleton
                                                                                        animation="wave"
                                                                                        style={{ marginRight: "14px" }}
                                                                                        variant="rounded"
                                                                                        width={80}
                                                                                        height={28}/>
                                                                                    <Skeleton
                                                                                        animation="wave"
                                                                                        variant="circular"
                                                                                        width={25}
                                                                                        height={25}/> */}
                                                                                </div>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="project-setup-pagination">
                                                        <div className="d-flex align-items-center">
                                                            <Skeleton style={{ marginRight: "14px" }} animation="wave" variant="rounded" width={150} height={38} />
                                                            <Skeleton animation="wave" variant="rounded" width={150} height={38} />
                                                        </div>
                                                    </div>
                                            </React.Fragment>
                                        )
                                    }
                                </>
                            </div>
                        </div>
                        {(!showListingLoader && (createdProjects?.length === 20)) && 
                            <div className="project-setup-pagination">
                                <div className="story-pagin-wrapper">
                                    {currentPage > 1 && (
                                        <ButtonBase   style={{ marginLeft: 0 }}   className="add-btn-wrapper"  onClick={() => pageSelect(parseInt(currentPage) - 1)}  >
                                            <KeyboardArrowLeftOutlinedIcon className="ref-icon" />
                                            {t("previous")}
                                        </ButtonBase>
                                    )}
                                    <ButtonBase  className="add-btn-wrapper" onClick={() => {pageSelect(parseInt(currentPage) + 1); console.log(currentPage)}}  >
                                        {t("next")}
                                        <KeyboardArrowRightOutlinedIcon className="ref-icon" />
                                    </ButtonBase>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
            { showSrcLangModal && (<Rodal
                visible={showSrcLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-lang-select-modal"  >
                <div className="lang-modal-wrapper">
                    {/* <h1>Select a source language</h1> */}
                    <span  className="modal-close-btn lang-close" onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false) }}  >
                        <img src={BlackClose}  alt="close_black"/>
                    </span>
                    {showSrcLangModal &&
                        <Sourcelanguage
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
                        <img src={BlackClose} alt="close_black" />
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
            { showDurationAlertModal && (<Rodal visible={showDurationAlertModal} {...modaloption} showCloseButton={false} className="ai-large-file-alert-modal">
                <span className="prompt-close-btn" onClick={() => setShowDurationAlertModal(false)}>
                <img src={BlackClose} alt="close_black" />
                </span>
                <div className="alert-content-wrap">
                    <div>
                        <h2 className="title-txt">{t("large_file_alert_content-1")}</h2>
                        <p className="info-txt">{t("large_file_alert_content-2")}</p>
                    </div>
                </div>
            </Rodal>)}
            {showTarLangModal && (<Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
                <div className="lang-modal-wrapper">
                    {/* <h1>{t("select_target_language-2")}</h1> */}
                    <span className="modal-close-btn lang-close" onClick={(e) => setshowTarLangModal(false)}>
                    <img src={BlackClose} alt="close_black" />
                    </span>
                    <Targetlanguage
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
                    <img src={BlackClose} alt="close_black" />
                </span>
                <div className="credits-text-cont">
                    <React.Fragment>
                        <img src={InsuffientIcon} alt="insuffient-icon" />
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
            { showAssignedProjectDeleteAlert && (<Rodal
                visible={showAssignedProjectDeleteAlert}
                {...modaloptions}
                showCloseButton={false}
                className="ai-mark-confirm-box Assign-task-deletion-rodal" >
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
            {/* language selection box */}
            {newsId?.length > 0 && (
                <LanguageSelector 
                    newsId={newsId} 
                    defaultPair={defaultPair}
                    isStoryTranslating={isStoryTranslating}
                    isStoryIdTranslating={isStoryIdTranslating} 
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    setTargetLanguage={setTargetLanguage}
                    setSourceLanguage={setSourceLanguage}
                    restrictedTargetLang={restrictedTargetLang}
                    handleClaimStoriesBtnClick={handleClaimStoriesBtnClick}
                    sourceLangSelectBoxRef={sourceLangSelectBoxRef}
                    targetLangSelectBoxRef={targetLangSelectBoxRef} />
            )}
            {showFileErrorModal && (
                <Rodal 
                    className="ts-rodal-mask" 
                    visible={showFileErrorModal} 
                    closeMaskOnClick={false}
                    width={528}
                    height="auto"
                    onClose={() => console.log()} 
                    showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowFileErrorModal(false) }}>
                        <img src={BlackClose} alt="close_black" />
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
export default GetStories;
