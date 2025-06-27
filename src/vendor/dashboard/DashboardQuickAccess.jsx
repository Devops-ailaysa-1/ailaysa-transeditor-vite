/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, createRef, useRef } from "react";
import Config from "../Config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
// import DragandDrop from "./DragandDrop";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
// import Settings from "./Settings";
import Settings from "../Settings";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ButtonBase from '@mui/material/ButtonBase';
import Sourcelanguage from "../lang-modal/Sourcelanguage";
import Targetlanguage from "../lang-modal/Targetlanguage";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InstructionModal from "../model-select/InstructionModal";
import VersionControlModal from "../github-integration/VersionControlModal";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
// import TourTooltip from "../tour/TourTooltip";
// import TourTooltip from "../../tour/TourTooltip";
import SimpleRodals from "../../project-setup-components/rodals/SimpleRodals";
import GlossaryClone from "../model-select/GlossaryClone";
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
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import SearchIcon from '@mui/icons-material/Search';
import { SandClockLoader } from "../../loader/SandClockLoader";
import Cookies from "js-cookie";
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AnalysisLoader } from "../../loader/AnalysisLoader";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteIcon from "./styles-svg/DeleteIcon";
import DeleteIcon from "../styles-svg/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MainAssignManage from "../model-select/MainAssignManage";
import { addDownloadingFiles, updateDownloadingFile, deleteDownloadingFile } from "../../features/FileDownloadingListSlice";
import generateKey from "../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import LSPAssignManage from "../model-select/LSPAssignManage";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ConformPOModal from "../model-select/ConformPOModal";
import ClickAwayListener from '@mui/base/ClickAwayListener';
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
import { POFilesModal } from "../model-select/POFilesModal";
import CachedIcon from '@mui/icons-material/Cached';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AsyncPaginate } from "react-select-async-paginate";
import Radio from '@mui/material/Radio';
import ProgressAnimateButton from "../button-loader/ProgressAnimateButton";
import { setEditorSettingStatus } from '../../features/EditorSettingStatusSlice';
import ArrowRightGreyColor from "../../assets/images/new-create-hub/arrow_right_grey_color.svg"
import ArrowRightAltColor from "../../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import PaginationLeft  from "../../assets/images/new-ui-icons/pagination-left.svg";
import PaginationRight  from "../../assets/images/new-ui-icons/pagination-right.svg";
import ChangeRequest from "../../assets/images/change-request.svg"
import PlusIcon from "../../assets/images/new-ui-icons/plus.svg"
import TranscriptionIcon from "../../assets/images/new-project-setup/transcription.svg"
import SpeechWhiteIcon from "../../assets/images/new-project-setup/speech-icon-white.svg"
import TranslateIcon from "../../assets/images/instant-translate-icon.svg"
import UnopenedProjSymbol from "../../assets/images/new-unopened-proj-symbol.svg"
import BlogArticleIcon from "../../assets/images/blog-article.svg"
import BlogArticleWizardIcon from "../../assets/images/blog-wizard.svg"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import StackedBarChartBlue from "../../assets/images/new-ui-icons/stacked_bar_chart_blue.svg"
import InsuffientIcon from "../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../assets/images/new-ui-icons/remove_circle_red.svg"
import AssetsDeleteIcon from "../../assets/images/new-ui-icons/assets-delete-icon.svg"
import FileDownload from "../../assets/images/new-ui-icons/file_download.svg"
import NoEditorIcon from "../../assets/images/no-editors-found-2.svg"
import EmptyProjectIcon from "../../assets/images/empty-projects-folder.svg"
import HowToRegister from "../../assets/images/new-ui-icons/how_to_register.svg"
import StackedBarChart from "../../assets/images/new-ui-icons/stacked_bar_chart.svg"
import CloneIcon from "../../assets/images/clone-icon.svg"
import PencilEditNew from "../../assets/images/new-ui-icons/pencil-edit-new.svg"
import UploadFile from "../../assets/images/new-ui-icons/upload_file.svg"
import TranslationPair from "../../assets/images/new-ui-icons/translation-pair-L.svg"
import ArrowRightAltColor from "../../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import AssetsDeleteIcon from "../../assets/images/new-ui-icons/assets-delete-icon.svg"

function DashboardQuickAccess(props){
	Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    const location = useLocation();
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails.value)

    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor'

	const mainContainerRef = useRef(null)

    /* State constants - start */
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [didMount, setDidMount] = useState(false);
    const [activeProjTab, setActiveProjTab] = useState(1);
	const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
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

	const targetLanguageOptionsRef = useRef([]);

    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
    const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
    const [detailsOfPrimaryGlossarySourceName, setDetailsOfPrimaryGlossarySourceName] = useState("");
    const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
    const [glossaryLicense, setGlossaryLicense] = useState("");
    const [selectedUsagePermission, setSelectedUsagePermission] = useState({ value: 1, label: "Private" });
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
    const [selectedGlossaryProject, setSelectedGlossaryProject] = useState(null)
    const [orderByValue, setOrderByValue] = useState(null)
    const [sortEl, setSortEl] = useState(null);
    const [moreEl, setMoreEl] = useState(null);
    const [openEl, setOpenEl] = useState(null);
    const [subDownloadOption, setSubDownloadOption] = useState(null)
    const [openedMoreOption, setOpenedMoreOption] = useState(null);
    const [showOpenAs, setShowOpenAs] = useState(null);
    const [selectedValue, setSelectedValue] = useState(2);
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

    const [expressProjectName, setExpressProjectName] = useState('')

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
    const [isExpressUpdating, setIsExpressUpdating] = useState(false)
    const [showExpressDeleteModal, setShowExpressDeleteModal] = useState(false) // state to show confirmation modal for express project

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

    // states for Open as button
    const [downloadOpen, setDownloadOpen] = useState(false);

    // const [anchorEl, setAnchorEl] = useState(null); // This is the common anchor element for all poppers
    const [popperAnchorEl, setPopperAnchorEl] = useState({}); // Separate anchor element for each popper
    const [showPOFilesModal, setShowPOFilesModal] = useState(false)
    const [POFilesDetails, setPOFilesDetails] = useState(null)

    const [showPDFFileDeleteAlertModal, setShowPDFFileDeleteAlertModal] = useState(false)
    const [fileCheckTrigger, setFileCheckTrigger] = useState(false)
    const [selectedPdfObj, setSelectedPdfObj] = useState(null)
    const [projectUpdateModal, setProjectUpdateModal] = useState(false)
    const [userTranslateChoice, setUserTranslateChoice] = useState('new')
    const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState(null)
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [selectedDocumntId, setSelectedDocumntId] = useState(null);

    const [isReworkSending, setIsReworkSending] = useState(false)
    const [showDeadlineCrossedModal, setShowDeadlineCrossedModal] = useState(false)
    const [isDeadlineExtendReqSending, setIsDeadlineExtendReqSending] = useState(false)

    const [vendorChangeRequestReason, setVendorChangeRequestReason] = useState("")
    const [showVendorChangeRequestModal, setShowVendorChangeRequestModal] = useState(false)

    const [isApproving, setIsApproving] = useState(false)
    const [orderBySelectedValue, setOrderBySelectedValue] = useState(2);


    const [isTaskDeleting, setIsTaskDeleting] = useState(false)
    const [isExpressProjectDeleting, setIsExpressProjectDeleting] = useState(false)
    const [isDocumentDeleting, setIsDocumentDeleting] = useState(false);
    const [isPDFFileDeleting, setIsPDFFileDeleting] = useState(false);


    const downloadAnchorRef = useRef(null);
    const projectIdForPOModal = useRef(null)
    const projectTypeForPOModal = useRef(null)

    const clientResponseDataRef = useRef(null)

    const deletingPDFFileIdRef = useRef(null)
    const fileIdList = useRef([])
    const statusCheckTimeoutRef = useRef(null)
    const triggerTimeoutRef = useRef(null)
    const deleteFromDocOrBlog = useRef(null);

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
    const expressProjectIdRef = useRef(null)
    const targetLangDivRef = useRef(null)
    const isProjectPreTranslate = useRef(false)
    const createdProjectsRef = useRef([])
    const selectedProjectFilesRef = useRef([])
    const myTimeoutFunc = useRef(null)
    const selectedProjectIdRef = useRef(null)

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


    const lspViewPoButtonDiplayed = useRef(false)

    /* Ref constants - end */

    var id = window.setTimeout(function () { }, 0);

    const open = Boolean(anchorEl); //Assigned task open

	/* Get source language options */
	const getLanguagesList = () => {
		let params = {
			url: Config.BASE_URL + "/app/language/",
			auth: true,
			success: (response) => {
				targetLanguageOptionsRef.current = response.data;
				setTargetLanguageOptions(response.data);
			},
		};
		Config.axios(params);
	};

    useEffect(() => {
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam == null) {
            let orderParam = URL_SEARCH_PARAMS.get("order_by");
            let filterParam = URL_SEARCH_PARAMS.get("filter");
            let searchParam = URL_SEARCH_PARAMS.get("search");
            let browserUrl = `/dashboard?page=1`;
            history(browserUrl)
        }
        // set browser tab title as "Projects"
        getLanguagesList()
        if (userDetails?.is_vendor) {
            getEdiorSettingStatus()
        }
        document.title = 'Ailaysa | Dashboard';
    }, []);


    const getEdiorSettingStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/vendor/editor_settings_status/`,
            auth: true,
            success: (response) => {
                dispatch(setEditorSettingStatus(response.data['incomplete status']))
            },
            error: (err) => {
                if (err.response?.data?.msg === "Unauthorised" || err.response?.data?.code === "bad_authorization_header") {
                    // AppConfigs.logout();
                }
            }
        });
    }


    function CircularProgressWithLabel(props) {
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

    useEffect(() => {
        setTimeout(function () {
            setShowElement(false);
        }, 10000);
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
        // getCreditStatus();
        // set browser tab title as "Projects"
    }, []);


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

    // useEffect(() => {
    // 	if(showIndividualAssignManage){
    // 		assignSettingDivRef.current.scrollIntoView({
    // 			behavior: 'smooth'
    // 		})
    // 	}
    // }, [showIndividualAssignManage])

    const handleIndividualTaskAssignManage = (e, selectedStep, task, project) => {
        e.stopPropagation();
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
        setOpenedMoreOption(id)
        setMoreEl(true);
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
        {
            id: 3,
            icon: <ReceiptLongOutlinedIcon className="receipt-icon" />,
            label: t("view_po"),
        }
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
        {
            id: 4,
            value: 'SOURCE',
            label: t("source_file"),
        },
        {
            id: 5,
            value: 'TMX',
            label: "TMX",
        },
        {
            id: 6,
            value: 'XLIFF',
            label: "XLIFF",
        },
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
            width: 125,
            height: 40,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const projectTypes = [
        { value: 'all', label: "All projects" },
        { value: 'text', label: "Text projects" },
        { value: 'files', label: "Translation file projects" },
        { value: 'glossary', label: 'Glossary projects' },
        // { value: 'voice', label: "Voice" },
        { value: 'speech_to_text', label: "Transcription projects" },
        { value: 'text_to_speech', label: "AI voice projects" },
        { value: 'express', label: "Instant translation projects" },
        { value: 'assigned', label: "Assigned projects" },
    ]

    const orderByOptions = [
        { value: 'name', label: 'A-Z' },
        { value: '-name', label: 'Z-A' },
        { value: '-created_at', label: t("most_recent") },
        { value: 'created_at', label: t("least_recent") },
    ]

    const openAsOption = [
        { value: 'editor', label: 'Editor' },
        { value: 'reviewer', label: 'Reviewer' }
    ]

    // const handleSelectOrderBy = (selected) => {
    //     orderBy(selected)
    // } 

    /* Set order by value and redirect */
    const orderBy = (orderFieldTemp) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current)
        let page = 1
        let url = ''
        if (activeProjTab === 7) {
            url = `/toolkit?page=${page}`;
        }

        if (orderFieldTemp != null) url += `&order_by=${orderFieldTemp}`;

        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let filter = URL_SEARCH_PARAMS.get("filter");
        if (filter != null) url += `&filter=${filter}`;
        let searchParam = URL_SEARCH_PARAMS.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        history(url);
    };

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
                })
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
        /* let elements = document.getElementsByClassName('list selected')
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected')
        }
        e.target.classList.add("selected") */
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
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
        let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
        setTargetLangListToRemove(targetLangToRemove);
    }, [targetLanguage]);

    const handleCloseSearchBox = () => {
        setProjectSearchTerm("");
        projectSearchFunctionality('clear-search')
        setFileListSearchEnlarge(false);
        setIsSearchTermDelete(true)
    }

    useEffect(() => {
        if (projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete) {
            projectSearchFunctionality('clear-search')
            setIsSearchTermDelete(false)
        }
    }, [projectSearchTerm, isSearchTermDelete])

    /* Throw errors when there's no target language selected */
    useEffect(() => {
        if (didMount) {
            if (targetLanguage?.length > 0) setTargetLanguageError("");
            else setTargetLanguageError(t("target_validation_note"));
        }
    }, [targetLanguage]);

    /* Show the pagination content a the bottom */
    useEffect(() => {
        if (didMount) paginationContentFunction(currentPage);
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

        let url = ''
        if (activeProjTab === 1) {
            url = `/file-upload?page=1`;
        } else if (activeProjTab === 7) {
            url = `/toolkit?page=1`;
        }
        if (param !== 'clear-search') {
            if (projectSearchTerm != null) url += `&search=${projectSearchTerm}`;
        }
        history(url);
    }

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        let isMounted = true
        let pageParam = URL_SEARCH_PARAMS.get("page")
        if (pageParam !== null && pageParam !== undefined) {
            if (activeProjTab === 1) {
                listAllProjects()
            } else {
                listToolkitProjects()
            }
        }
        mainContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
        // Clean-up:
        return () => {
            isMounted = false;
        }
    }, [URL_SEARCH_PARAMS.get("page"), activeProjTab]);

    /* Go to the top of the page when ordering */
    useEffect(() => {
        let isMounted = true
        let order = URL_SEARCH_PARAMS.get("order_by")
        if (order !== null && order !== undefined) {
            setSelectedValue(orderByOptions?.find(each => each?.value == order)?.value)
            if (activeProjTab === 7) {
                listToolkitProjects();
            }
        }
        // Clean-up:
        return () => {
            isMounted = false;
        }
        // fileUploadTop.current.scrollIntoView(
        //     {
        //         behavior: "smooth",
        //     },
        //     100
        // );
    }, [URL_SEARCH_PARAMS.get("order_by"), activeProjTab]);

    useEffect(() => {
        let isMounted = true;
        let searchParam = URL_SEARCH_PARAMS.get("search")
        if (searchParam !== null && searchParam !== undefined) {
            setProjectSearchTerm(searchParam)
            if (activeProjTab === 1) {
                listAllProjects()
            } else {
                listToolkitProjects()
            }
        } else if (isSearchTermDelete) {
            if (activeProjTab === 1) {
                listAllProjects()
            } else {
                listToolkitProjects()
            }
        }

        clearTimeout(wordCountAnalysisTimeoutRef.current)
        clearTimeout(myTimeoutFunc.current)
        clearTimeout(statusCheckTimeoutRef.current)
        clearTimeout(triggerTimeoutRef.current)

        // Clean-up:
        return () => {
            isMounted = false;
        }
        // fileUploadTop.current.scrollIntoView(
        //     {
        //         behavior: "smooth",
        //     },
        //     100
        // );
    }, [URL_SEARCH_PARAMS.get("search"), activeProjTab]);

    useEffect(() => {
        let proceedAssignParam = URL_SEARCH_PARAMS.get("proceed-assgin")
        let projectIdParam = URL_SEARCH_PARAMS.get("project")
        if (proceedAssignParam !== null && proceedAssignParam !== undefined && projectIdParam && createdProjectsList?.length !== 0) {
            let assignIcon = document.querySelector(`#project-assigni-icon-${projectIdParam}`)
            assignIcon?.click()

        }
    }, [URL_SEARCH_PARAMS.get("proceed-assgin"), createdProjectsList]);

    // automatically open accordian based on the project ID  
    useEffect(() => {
        let id = URL_SEARCH_PARAMS.get("open-project")
        if (id !== null && createdProjectsList?.length !== 0) {
            let selectedRow = document.querySelector(`div[data-key='${id}']`)
            selectedRow?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            setSelectFileRow(true)
            selectProjectById(id)
        }
    }, [createdProjectsList, URL_SEARCH_PARAMS.get("open-project")]);

    useEffect(() => {
      if(!showDeleteFileModal){
        setIsDocumentDeleting(false)
      }
    }, [showDeleteFileModal])
    

    // useEffect(() => {
    //   if(URL_SEARCH_PARAMS.get("pre-trans")){
    //     getPreTranslateTaskStatus(URL_SEARCH_PARAMS.get("open-project"))
    //   }
    // }, [URL_SEARCH_PARAMS.get("pre-trans")])


    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        clearTimeout(wordCountAnalysisTimeoutRef.current)
        clearTimeout(myTimeoutFunc.current)
        clearTimeout(statusCheckTimeoutRef.current)
        clearTimeout(triggerTimeoutRef.current)
        let url = ''
        if (activeProjTab === 1) {
            url = `/file-upload?page=${page}`;
        } else {
            url = `/toolkit?page=${page}`
        }

        let queryParam = new URLSearchParams(window.location.search)
        let projectIdParam = queryParam.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let searchParam = queryParam.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        history(url);
    };

    const listAllProjects = () => {

        setFileListSearchEnlarge(false);
        setShowListingLoader(true);
        setCreatedProjects([])

        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        let searchParam = URL_SEARCH_PARAMS.get("search");

        let url = `${Config.BASE_URL}/workspace/all_proj_lists/?page=${page}`

        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;

        Config.axios({
            url: url,
            auth: true,
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                setCreatedProjects(response.data.results);
                setCreatedProjectsList(response.data.results)
                createdProjectsRef.current = response.data.results
                setShowListingLoader(false);
                if (response.data.results.length === 0) {
                    setEmptyProjects(true);
                } else {
                    setEmptyProjects(false);
                }
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                if (response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'))?.length !== 0) {
                    setAnalysisRunningProjectList(response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id')))
                    analysisRunningProjectListRef.current = response.data.results?.filter(each => each?.project_analysis?.hasOwnProperty('celery_id'))
                }
            },
            error: (err) => { Config.log(err); }
        })
    }

    const listToolkitProjects = () => {
        setFileListSearchEnlarge(false);
        setShowListingLoader(true);
        setCreatedProjects([])

        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        let searchParam = URL_SEARCH_PARAMS.get("search");
        let orderParam = URL_SEARCH_PARAMS.get("order_by");

        // let url = `${Config.BASE_URL}/workspace/toolkit_lists/?page=${page}${orderParam != null ? `&ordering=${orderParam}` : ''}`
        let url = `${Config.BASE_URL}/exportpdf/convertpdftodocx?page=${page}`;
        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                setCreatedProjects(response.data.results);
                setCreatedProjectsList(response.data.results)
                createdProjectsRef.current = response.data.results
                setShowListingLoader(false);
                if (response.data.results.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                // if(response.data.results.filter(each => each.project_analysis.hasOwnProperty('celery_id'))?.length !== 0){
                //     setAnalysisRunningProjectList(response.data.results.filter(each => each.project_analysis.hasOwnProperty('celery_id')))
                //     analysisRunningProjectListRef.current = response.data.results.filter(each => each.project_analysis.hasOwnProperty('celery_id'))
                // }
            },
            error: (err) => { }
        })
    }

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
                    let runningProj = response.data?.out?.filter(each => each.hasOwnProperty('celery_id'))
                    let finishedProj = response.data?.out?.filter(each => !each.hasOwnProperty('celery_id'))
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
                        setCreatedProjects(newArr)
                        wordCountAnalysisTimeoutRef.current = setTimeout(() => {
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
        setSourceLabel(t("click_to_select"));
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
        listFiles(projectId);
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
    const selectProject = (e, projectId, projectType) => {
        let shouldListFiles = e.target.getAttribute("should-open-files");

        if (hasParentThisClass(e?.target, "selected-file-row") || hasParentThisClass(e?.target, "dont-open-files")) return;
        setSelectedProjectFiles([]);
        // setProjectType(projectType);
        if (projectId == openedProjectId) {
            setOpenedProjectId(null);
        } else {
            setSelectFileRow(true)
            selectProjectById(projectId, shouldListFiles);
        }
    };

    /* List files for specific project */
    const listFiles = (projectId) => {

        Config.axios({
            url: Config.BASE_URL + "/workspace/vendor/dashboard/" + projectId,
            auth: true,
            success: (response) => {
                // let responseTemp = response.data;
                setPreTranslateAllTask([])
                selectedProjectFilesRef.current = response.data
                // getVoiceTranscribeTaskStatus(projectId)
                isProjectPreTranslate.current = createdProjectsRef.current?.find(each => each.id == selectedProjectIdRef.current)?.pre_translate
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
                        return { ...obj, pre_trans_processing: false, open_in: t("ailaysa_writer_text_editor"), transcribed: true };
                    }
                    return obj;
                });
                setSelectedProjectFiles(newArr)
            }
        }
    }, [transcriptionTaskList])


    useEffect(() => {
        if (preTranslateAllTask?.length !== 0) {
            let canOpenFiles = preTranslateAllTask?.filter(each => each.open == 'True')
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


    const openFile = (e, key = null, id = null, url = "", isFirstOpen, openIn, fileName, project_id, projectType, from, downloadType, taskFileName, open_as) => {
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            // orderBy: URL_SEARCH_PARAMS.get("order_by"),
            projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
            search: URL_SEARCH_PARAMS.get("search"),
            projectId: project_id,
            fromProjectList: true
        }
        if (openIn === "ExpressEditor") {
            history(`/create/translate/text/instant-text/?project=${project_id}&task=${id}`, {state: { filename: fileName }})
        } else {
            if (from !== 'task-download') {
                setClickedOpenButton(key);
            }
            if (url != null) {
                Config.axios({
                    url: Config.BASE_URL + url,
                    auth: true,
                    success: (response) => {
                        setClickedOpenButton(null);
                        if (response?.data?.msg === undefined) {
                            docCreditCheckAlertRef.current = response.data.doc_credit_check_open_alert
                            if (from === 'task-download') {
                                downloadDifferentFile(downloadType, response.data?.document_id, null, null, id, null, null, null, null, null, null, taskFileName)
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
                                downloadDifferentFile(downloadType, response.data?.document_id, null, null, id, null, null, null, null, null, null, taskFileName)
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
                            Config.toast(t("oops_file_empty"), 'error');
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
                    history(`/glossary-workspace?project-id=${selectedProjectId}&document-id=${id}`, {state: {
                        prevPageInfo: prevPageInfo,
                        prevPath: location.pathname + location.search
                    }});
                });
            }
        }
    };

    const Option = (props) => {
        let list = ""
        props.data?.jobs?.target?.map((eachLang, index) => {
            list += `${targetLanguageOptionsRef.current?.find(each => each.id === eachLang)?.language}${index !== props.data?.jobs?.target?.length - 1 ? ", " : ""}`;
        });
        return (
            <components.Option {...props}>
                <div className="writer-project-list-wrap">
                    <div className="project">
                        <span>{props.data?.project_name}</span>
                    </div>
                    <div className="language-pair">
                        <span>{targetLanguageOptionsRef.current?.find(eachLang => eachLang.id == props.data?.jobs?.source)?.language}</span>
                        <img src={ArrowRightGreyColor} alt="" />
                        <span>{list}</span>
                    </div>
                </div>
            </components.Option>
        );
    };

    const ValueContainerPDF = ({ children, ...props }) => {
        const { getValue, hasValue } = props;
        let list = ""
        children[0]?.props.data?.jobs?.target?.map((eachLang, index) => {
            list += `${targetLanguageOptionsRef.current?.find(each => each.id === eachLang)?.language}${index !== children[0]?.props.data?.jobs?.target?.length - 1 ? ", " : ""}`;
        });
        if (!hasValue) {
            return (
                <components.ValueContainer {...props}>
                    {children}
                </components.ValueContainer>
            );
        }
        return (
            <components.ValueContainer {...props}>
                <div className="writer-project-list-wrap">
                    <div className="project selected-value">
                        <span>{children[0]?.props.data?.project_name}</span>
                    </div>
                    <div className="language-pair selected-value">
                        <span>{targetLanguageOptionsRef.current?.find(eachLang => eachLang.id == children[0]?.props.data?.jobs?.source)?.language}</span>
                        <img src={ArrowRightGreyColor} alt="" />
                        <span>{list}</span>
                    </div>
                </div>
            </components.ValueContainer>
        );
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
        onClose: console.log(),
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        onClose: console.log(),
    };


    const assignmanagemodaloption = {
        closeMaskOnClick: false,
        width: 560,
        height: 'auto',
        onClose: console.log(),
    };

    const versioncontrolmodaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: console.log(),
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
                        <img src={PaginationLeft} />
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
                        <img src={PaginationRight} />
                    </li>
                );
            /*Pagination logic ends*/
        }
        setTimeout(() => {
            setPaginationContent(content);
        }, 100);
    };

    const editProject = (e = null, projectId, projectType, project) => {
        e.stopPropagation()
        // page information for redirecting to same page after updation is done.
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            // orderBy: URL_SEARCH_PARAMS.get("order_by"),
            projectTypeFilter: URL_SEARCH_PARAMS.get("filter"),
            search: URL_SEARCH_PARAMS.get("search"),
            projectId: projectId,
            fromProjectList: true
        }
        if (projectType === 1 || projectType === 2) {
            history("/create/translate/files/translate-files?get-project-info=" + projectId + "&type=" + projectType, { state: prevPageInfo });
        } else if (projectType === 3) {
            history("/create/assets/glossaries/create?page=1&get-project-info=" + projectId + "&type=" + projectType, { state: prevPageInfo });
        } else if (projectType === 4) {
            if (project?.voice_proj_detail?.project_type_sub_category === 1) {
                // speech to text
                history("/create/speech/speech-to-text?get-project-info=" + projectId + "&type=" + projectType, { state: prevPageInfo });
            } else if (project?.voice_proj_detail?.project_type_sub_category === 2) {
                // text to speech
                history("/create/speech/text-to-speech?get-project-info=" + projectId + "&type=" + projectType, { state: prevPageInfo });
            }
        } else if (projectType === 5) {
            setEditInstantProjectModal(true)
            expressProjectIdRef.current = projectId
            editExpressProject(e, projectId)
            // props.history("/create/translate/text/instant-text?get-project-info=" + projectId + "&type=" + projectType, {filename: project?.project_name, prevPageInfo})
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


    const editExpressProject = (e, projectId) => {
        e.stopPropagation()
        setSkeletonLoader(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_project_detail/${projectId}`,
            auth: true,
            success: (response) => {
                let { data } = response;
                setExpressProjectName(data.project_name);
                setHasTeam(data.team);
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
                    (element) => element.id == data?.source_lang
                );

                setTimeout(() => {
                    setSourceLabel(editSourceLanguage?.language);
                    setSourceLanguage(data?.source_lang)
                    setTargetLanguage(editTargetLanguages);
                    setSkeletonLoader(false)
                }, 80);
            },
        });
    }

    const updateExpressProject = () => {
        let formdata = new FormData();
        setIsExpressUpdating(true)

        formdata.append("source_language", sourceLanguage);

        if (expressProjectName?.trim() === '') {
            Config.toast(t("enter_proj_name"))
            return;
        }

        formdata.append("project_name", expressProjectName?.trim());

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
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${expressProjectIdRef.current}/${list?.length ? `?job_delete_ids=${list}` : ""}`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t("proj_updated_success"));
                setEditInstantProjectModal(false)
                setIsExpressUpdating(false)

                // update the word count and project name of the project
                const newArr = createdProjects?.map(obj => {
                    if (obj.id === expressProjectIdRef.current) {
                        return {
                            ...obj,
                            project_name: response.data.project_name,
                            project_analysis: { ...obj.project_analysis, proj_word_count: response.data.project_analysis.proj_word_count }
                        };
                    }
                    return obj;
                });
                setCreatedProjects(newArr)
            },
        });
    }


    /* Delete a project by id */
    const deleteExpressProject = () => {
        setIsExpressProjectDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${expressProjectIdRef.current}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                let filteredArr = createdProjects?.filter(each => each.id !== expressProjectIdRef.current)
                setShowExpressDeleteModal(false)
                setEditInstantProjectModal(false)
                setShowListingLoader(false);
                setIsExpressProjectDeleting(false)
                if (filteredArr?.length === 0) setEmptyProjects(true);
                setCreatedProjects(filteredArr)
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowExpressDeleteModal(false)
                    setIsExpressProjectDeleting(false)
                    SetShowAssignedProjectDeleteAlert(true)
                }
                setIsExpressProjectDeleting(false)
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
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?task=${taskId}&step=${stepId}${is_reassigned !== null ? '&reassigned=True' : ''}`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                Config.toast(t("task_unassigned"));
                listFiles(project?.id)
                // props.history(`/file-upload?page=1&order_by=-id&open-project=${projectID}`)
                // setAnchorEl(null);
                // listProjects(openedProjectId); 
            },
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

    /* Search by keyword */
    // useEffect(() => {
    //     debounce(listProjects);
    // }, [projectSearchTerm]);

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
                    setPoPDFUrl(`${Config.BASE_URL}${response?.data?.url}`);
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error');
                }
            },
        });
    }

    // task accept api 
    const taskAssignUpdate = (targetValue) => {
        // e.stopPropagation(); 
        var formdata = new FormData();
        formdata.append("task_ven_status ", targetValue);
        formdata.append("task", particularClickedTask);
        formdata.append("step", stepToAccept);
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
        setParticularClickedTask(taskId);
        setStepToAccept(step);
        getPOPdf(assignmentId);
        setShowPoModal(true);
        isTaskReassigned.current = typeof is_reassigned === 'boolean' ? true : false;
    }

    // peoples circle
    const AssignInfoUiBox = (props) => {
        let { project, selectedProjectFile, eachRole } = props;
        // let editorProfile = (Config.userState?.id !== eachRole?.assign_to_details?.id && eachRole?.assign_to_details?.avatar)
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
        // && assign_info.task_assign_detail.task_status === "Completed"

        return (
            // <div className="custom-assign-box-wrapper">
            //     <div className="assign-ui-header-box">
            //         {
            //             Config.userState?.id !== eachRole?.assign_to_details?.id && editorProfile !== null && editorProfile !== undefined ?
            //             <img src={Config.BASE_URL + editorProfile} alt="profile-img"/>
            //             :
            //             <span>{editorName?.charAt(0)?.toUpperCase()}</span>
            //         }

            //         <div className="assign-text-wrap">
            //             <small>{assignedByOrAssignedTo}</small>
            //             <h1>{editorName}</h1>
            //             {editorEmail !== null && <p className="editor-email-text">{editorEmail}</p>}
            //             <small>Work assigned: <b>{editorRole}</b></small><br />
            //             {!assignBy &&
            //                 <>
            //                     <small>Status: &nbsp;
            //                         <div className={eachRole?.task_assign_detail?.task_status?.toLowerCase() == "completed" ? "status-indicator-completed"
            //                                     :eachRole?.task_assign_detail?.task_status.toLowerCase() == "in progress"
            //                                     ? "status-indicator-in-progress-color"
            //                                     : "status-indicator-created"}></div>
            //                         <b>{eachRole?.task_assign_detail?.task_status === 'Completed' ? t("submitted") : eachRole?.task_assign_detail?.task_status}</b>
            //                     </small><br />
            //                 </>
            //             }
            //             {eachRole?.deadline !== null && <small>Deadline: <b>{Config.getProjectCreatedDate(eachRole?.deadline)}</b></small>}
            //         </div>
            //     </div>
            //     {Config.userState?.id !== eachRole?.assign_to_details?.id ? (
            //         <div className="assign-ui-footer-box">
            //             <ButtonBase className="unassigned-btn" onClick={()=>{unassignEditor(selectedProjectFile?.id, stepId, projectID)}}>
            //                 {t("unassign")}
            //             </ButtonBase>
            //             <ButtonBase className="edit-btn" onClick={(e) =>{editAssignedTask(e, projectId, selectedProjectFile?.id, eachRole?.job, stepId)}}>
            //             <img
            //                 src={PencilEditNew}
            //                 alt="pencil-edit-new"
            //             />{t("edit")}
            //             </ButtonBase>
            //             {(eachRole?.instruction !== "" || eachRole?.instruction_files.length !== 0) &&
            //                 <ButtonBase className="edit-btn" onClick={(e) =>{handleInstructionModal(selectedProjectFile?.id, eachRole)}}>
            //                     {t("instruction")}
            //                 </ButtonBase>
            //             }
            //         </div>
            //     ) : Config.userState?.id === eachRole?.assign_to_details?.id && (
            //         (eachRole?.instruction !== "" || eachRole?.instruction_files.length !== 0) && 
            //         <div className="assign-ui-footer-box">
            //             <ButtonBase className="edit-btn" onClick={(e) =>{handleInstructionModal(selectedProjectFiledID?.id, eachRole)}}>
            //                 {t("instruction")}
            //             </ButtonBase>
            //         </div>
            //     )}

            // </div>
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
                                        {(eachRole?.task_assign_detail?.client_response !== 'Approved' && eachRole?.task_assign_detail?.task_status !== 'Return Request') && (
                                            <ButtonBase className="info-blue-btn" onClick={(e) => !isApproving && handleClientResponseButtons(1, eachRole, selectedProjectFile, project.id)}>
                                                {isApproving && <ButtonLoader />} {t("approve")}
                                            </ButtonBase>
                                        )}
                                        {(eachRole?.task_assign_detail?.client_response !== 'Rejected' && eachRole?.task_assign_detail?.client_response !== 'Approved') && (
                                            <ButtonBase className="info-grey-btn" onClick={(e) => handleClientResponseButtons(2, eachRole, selectedProjectFile, project.id)}>
                                                {t("rework")}
                                            </ButtonBase>
                                        )}
                                    </>
                                )}
                                <Tooltip className="dont-open-list" title={t("unassign")} placement="top" arrow>
                                    <ButtonBase className="icon-btn" onClick={(e) => { unassignEditor(e, selectedProjectFile?.id, stepId, project, selectedProjectFile?.task_reassign_info) }}>
                                        <PersonRemoveOutlinedIcon className="remove-person-icon" />
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
                                {eachRole.task_ven_status === 'change_request' && (
                                    <span
                                        style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                        className="change-request-button"
                                        onClick={() => { setShowVendorChangeRequestModal(true); setVendorChangeRequestReason(eachRole.change_request_reason) }}
                                    >
                                        <img src={ChangeRequest} alt="change-request" />
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
                                    <p className="time">{Config.getProjectCreatedDate(eachRole?.deadline)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="more-info-item">
                            <div className="assigned-title-area">
                                <p>{t("status")}</p>
                            </div>
                            <div className="assigned-value-area">
                                {/* <div class="assigned-word-progress-bar-wrap">
                                    <div class="progress-bar-outline">
                                        <div class="progress-bar-completing-indicator">
                                            <div class="bar-file-completion-fill" style={{width: "30%"}}></div>
                                        </div>
                                    </div>
                                    <div class="progress-bar-percentage-txt">
                                        <span>30%</span>
                                    </div>
                                </div> */}
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
                        {(eachRole?.task_assign_detail?.client_response && Config.userState?.id !== eachRole?.assign_to_details?.id) && (
                            <div className="more-info-item">
                                <div className="assigned-title-area">
                                    <p>{t("work")}</p>
                                </div>
                                <div className="assigned-value-area">
                                    <div className="assigned-status-details">
                                        <div className={
                                            eachRole?.task_assign_detail?.client_response?.toLowerCase() == "approved" ?
                                                "status-indicator-completed"
                                                : eachRole?.task_assign_detail?.client_response.toLowerCase() == "rejected"
                                                    ? "status-indicator-in-progress-color"
                                                    : "status-indicator-created"
                                        }></div>
                                        <p>{eachRole?.task_assign_detail?.client_response === 'Rejected' ? t("rework") : eachRole?.task_assign_detail?.client_response}</p>
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
        history(`/word-processor/?project=${projectID}&transcription-task=${taskID}`, {state: {
            assignToMe,
            prevPageInfo: {
                pageNo: URL_SEARCH_PARAMS.get("page"),
                // orderBy: URL_SEARCH_PARAMS.get("order_by"),
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
                        //             if (obj.id === voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.task) {
                        //                 return {
                        //                     ...obj, 
                        //                     pre_trans_processing: voiceStatusResponse.data.res?.find(each => each.task === obj.id)?.open === 'True' ? false : true,
                        //                 };
                        //             }
                        //             return obj;
                        //         });
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

    const handleBulkDownload = async (e, projectID, projectName) => {
        e?.stopPropagation();

        // add in download list
        dispatch(addDownloadingFiles({ id: projectID, file_name: projectName, ext: '.zip', status: 1 }))

        let url = `${Config.BASE_URL}/workspace/download/${projectID}/`
        const response = await Config.downloadFileFromApi(url);

        // update the list once download completed
        dispatch(updateDownloadingFile({ id: projectID, status: 2 }))

        Config.downloadFileInBrowser(response)

        setTimeout(() => {
            // remove the downloaded file from list
            dispatch(deleteDownloadingFile({ id: projectID }))
        }, 8000);
    }

    const convertSourceFileToAudio = (taskid) => {
        setClickedOpenButton(taskid)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/convert_text_to_speech_source/?task=${taskid}`,
            auth: true,
            success: (response) => {
                const newArr = selectedProjectFiles?.map(obj => {
                    if (obj.id === taskid) {
                        return { ...obj, audio_file_url: response.data?.source_audio_file };
                    }
                    return obj;
                });
                setSelectedProjectFiles(newArr);
                setClickedOpenButton(null);
                getCreditStatus();
            },
            error: (err) => {
                if (err.response.data?.msg?.includes('Insufficient Credits')) {
                    setShowCreditAlertModal(true);
                    setClickedOpenButton(null);
                }
                if (err.response.data?.msg !== undefined && err.response.data?.msg?.includes('Text to Speech conversion ongoing')) {
                    setShowProcessingModal(true);
                    setTextToSpeechConvert(true);
                    setClickedOpenButton(null);
                    setTimeout(() => {
                        setTextToSpeechConvert(false);
                        setShowProcessingModal(false);
                        setShowProcessingModal(false);
                    }, 4000);
                } else {
                    Config.toast('Download failed', 'error');
                    setClickedOpenButton(null);
                }
                getCreditStatus();
                // Config.toast('Download failed', 'error');
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
        setProjectAnalysisedData(null);
        if (!callback) {
            projectAnalysisTempProjectId.current = projectID;
        }
        projectAnalysisApiCounter.current++;

        Config.axios({
            url: `${Config.BASE_URL}/tm/project_analysis/${projectID}`,
            auth: true,
            success: (response) => {
                let {
                    payable_rate,
                    project_wwc,
                    task_wwc
                } = response.data;
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
                let project = [];
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
    const downloadConvertDocxFile = async (targetValue, taskID) => {
        setMoreEl(false)
        let url = `${Config.BASE_URL}/exportpdf/docx_file_download/?${targetValue === 'task' ? 'task_id' : 'id'}=${taskID}`
        const response = await Config.downloadFileFromApi(url);
        const filename = response.headers['content-disposition']?.split('filename*=')[1];
        downloadedFileName.current = decodeURIComponent(filename?.replace(`UTF-8''`, ''))
        const blob_url = URL.createObjectURL(new Blob([response.data]));
        setHiddenLinkUrl(blob_url)
        downloadref.current?.click();
        URL.revokeObjectURL(blob_url);
    }


    const convertPdfToDocxFromTask = (taskId, projectId) => {
        setClickedOpenButton(taskId)
        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convert_pdf_from_task/${taskId}/`,
            method: 'POST',
            auth: true,
            success: (response) => {
                checkPdfConversionStatus(taskId);
                getCreditStatus();
                setClickedOpenButton(null);
            },
            error: (err) => {
                if (err.response?.data?.msg?.includes('Insufficient Credits')) {
                    setShowCreditAlertModal(true);
                    setClickedOpenButton(null);
                }
                if (err.response?.data?.msg?.includes('File Cannot be Processed')) {
                    Config.toast(t("file_is_corrupted"), 'error');
                    listFiles(projectId);
                }
                setClickedOpenButton(null);
                // else{
                //     Config.toast('Conversion failed', 'error');
                //     setClickedOpenButton(null);
                // }
                // getCreditStatus();
            }
        });
    }

    const checkPdfConversionStatus = (taskId, projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/?task=${taskId}`,
            auth: true,
            success: (response) => {
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
                }
                else if (response.data?.status == 'PENDING') {
                    setShowProcessingModal(true)
                    setTextToSpeechConvert(true)
                    setTimeout(() => {
                        setShowProcessingModal(false)
                        setTextToSpeechConvert(false)
                    }, 4000);
                } else if (response.data?.status == 'ERROR') {

                } else if (response.data?.status == 'DONE') {
                    const newArr = selectedProjectFiles?.map(obj => {
                        if (obj.id === taskId) {
                            return { ...obj, open_in: response.data?.pdf_api_use, converted: true };
                        }
                        return obj;
                    });
                    setSelectedProjectFiles(newArr);
                    setClickedOpenButton(null);
                }
            }
        });
    }

    const openWriter = (id, name, projectId) => {
        let prevPageInfo = {
            pageNo: URL_SEARCH_PARAMS.get("page"),
            // orderBy: URL_SEARCH_PARAMS.get("order_by"),
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
        e.preventDefault();
        setMoreEl(false);
        // e.stopPropagation();
        taskDeleteParam.current = {
            project_id: project_id,
            taskId: taskId
        }
        if (taskAssignInfo !== null) {
            taskDeleteFunction();
        } else {
            setShowTaskDeleteAlert(true);
        }

    }

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
                    setCreatedProjects(createdProjects?.filter(each => each.id !== taskDeleteParam.current?.project_id));
                    if (createdProjects?.filter(each => each.id !== taskDeleteParam.current?.project_id)?.length === 0) setEmptyProjects(true);
                } else {
                    Config.toast(t("task_deleted_success"));
                }
                setSelectedProjectFiles(selectedProjectFiles?.filter(each => each.id !== taskDeleteParam.current?.taskId));
                setShowTaskDeleteAlert(false);
            },
            error: (err) => {
                if (err.response?.status === 400) {
                    if (err.response?.data?.Message?.includes('Unassign')) {
                        setShowTaskDeleteAlert(true);
                        setUnassignTaskDeleteAlert(true);
                        setIsTaskDeleting(false);
                    }
                }
                setIsTaskDeleting(false);
            }
        });
    }

    const focusTargetLangDiv = () => {
        if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #E74C3C;';
        setTimeout(() => {
            if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #ced4da;';
        }, 1000);
    }

    const getVoiceTranscribeTaskStatus = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/voice_task_status/?project=${projectId}`,
            auth: true,
            success: (response) => {
                // const newArr = selectedProjectFiles?.map(obj => {
                //     if (obj.id === response.data.res?.find(each => each.task === obj.id)?.task) {
                //       return {...obj, pre_trans_processing: response.data.res?.find(each => each.task === obj.id)?.open};
                //     }
                //     return obj;
                // });
                // setSelectedProjectFiles(newArr);
            },
            error: (err) => {

            }
        });
    }

    // MT-Raw file download celery status check function
    const mtRawCeleryCheck = async (celeryId, documentId, task_id, uniqueKey) => {
        // setAnimateDownloding('MTRAW')
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
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
    const downloadDifferentFile = async (type, documentId, e, key = null, id = null, url = "", isFirstOpen, openIn, projectName, project_id, projectType, taskFileName) => {
        setMoreEl(false)
        // if task is not opened (document id - null)
        if (documentId == null) {
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
            downloadDiffFilesParamRef.current = { type, documentId, e, key, id, url, isFirstOpen, openIn, projectName, project_id, projectType, taskFileName }
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
                file_name: taskFileName,
                ext: (type === 'ORIGINAL' || type === 'MTRAW' || type === 'SOURCE') ? `.${taskFileName?.split('.')[1]}` :
                    type === 'BILINGUAL' ? '.xlxs' : type === 'TMX' ? '.tmx' : type === 'XLIFF' ? '.xliff' : '',
                status: type !== 'MTRAW' ? 1 : 3    // 1 for downloading and 3 for processing
            }
        ))


        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        try {
            const response = await axios.get(
                `${Config.BASE_URL}/workspace_okapi/document/to/file/${documentId}?output_type=${type}`,
                {
                    responseType: "blob",
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                },
            );
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
                setSelectedProjectFiles(newArr)
                // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== id)
                setIsDownloading(false)
            }
        } catch (err) {
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
                Config.toast(t("something_wrong_file_process"), 'warning');
                setSelectedProjectFiles(newArr);
                dispatch(deleteDownloadingFile({ id: uniqueKey }));
                // downloadingFilesList.current = downloadingFilesList.current.filter(each => each !== id);
                setIsDownloading(false);
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
        if (response === 1) setIsApproving(true);
        setIsReworkSending(true);

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
                        listFiles(project_id)
                    } else if (response === 2) {
                        Config.toast(`${step === 1 ? t('editing') : t('reviewing')} ${t("step_send_rework")}`)
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

    const sendExtendTaskDeadlineRequest = () => {
        let { task_id, step, reassign } = taskDetailsForDeadlineCrossedTask.current;
        var formdata = new FormData();
        formdata.append("task", task_id);
        formdata.append("step", step);
        formdata.append("reassigned", reassign ? 'True' : 'False');
        setIsDeadlineExtendReqSending(true);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/send_msg_extend_deadline/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (api_response) => {
                if (api_response.status === 200) {
                    Config.toast(`${t("deadline_req_sent")}`);
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error');
                }
                setIsDeadlineExtendReqSending(false);
                setShowDeadlineCrossedModal(false);
            },
            error: (err) => {
                setIsDeadlineExtendReqSending(false);
            }
        });
    }

    const getPODetailsForTask = (task_id) => {
        setMoreEl(false);

        Config.axios({
            url: `${Config.BASE_URL}/aipay/po/?task=${task_id}`,
            auth: true,
            success: (response) => {
                setPOFilesDetails(response.data);
                setShowPOFilesModal(true);
            },
            error: (err) => { }
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
                <ButtonBase onMouseUp={(e) => handleMoreVertOption(e, project?.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption === project?.id)) &&
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
                                                    item?.label === 'Download' ? downloadConvertDocxFile(taskPDF ? 'task' : 'pdf', taskPDF ? selectedProjectFile?.id : project?.id) :
                                                        item?.label === 'Delete' && (taskPDF ? handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info) : (from === 'doc' ? handleDocumentDeleteButton(project) : handlePDFDeleteButton(project.id)))
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

    const deletePDFFile = () => {
        setIsPDFFileDeleting(true)
        let params = {
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/${deletingPDFFileIdRef.current}/`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                if (response.data.msg === "deleted successfully") {
                    Config.toast(t("pdf_deleted_success"))
                    setIsPDFFileDeleting(false)
                    setCreatedProjects(createdProjects?.filter(each => each.id != deletingPDFFileIdRef.current))
                    setShowPDFFileDeleteAlertModal(false)
                }
            }, error: (err) => {
                setShowPDFFileDeleteAlertModal(false)
                setIsPDFFileDeleting(false)
            }
        };
        Config.axios(params);
    }

    const handlePDFDeleteButton = (file_id) => {
        setMoreEl(false)
        deletingPDFFileIdRef.current = file_id
        setShowPDFFileDeleteAlertModal(true)
    }

    const SingleConvert = async (id) => {
        const newArr = createdProjects?.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    animate: true,
                    status: 'PENDING'
                };
            }
            return obj;
        });
        setCreatedProjects(newArr);

        Config.axios({
            url: Config.BASE_URL + "/exportpdf/convert?id=" + id,
            auth: true,
            success: (response) => {
                fileIdList.current?.push(id)
                setTimeout(() => {
                    checkFileStatus()
                }, 3500);
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true)
                        const newArr = createdProjects?.map(obj => {
                            if (obj.id === id) {
                                return {
                                    ...obj,
                                    animate: false,
                                    status: t("yet_to_start")
                                };
                            }
                            return obj;
                        });
                        setCreatedProjects(newArr);
                    }
                }
            }
        });
    }

    const checkFileStatus = () => {
        let idList = ''
        fileIdList.current?.map((each, index) => {
            idList += `${each}${index !== fileIdList.current?.length - 1 ? "&id=" : ""}`
        })
        if (idList !== '') {
            Config.axios({
                url: `${Config.BASE_URL}/exportpdf/convertpdftodocx?id=${idList}`,
                auth: true,
                success: (response) => {
                    const newArr = createdProjects?.map(obj => {
                        if (obj.id == response.data?.find(each => each?.id === obj?.id)?.id) {
                            return {
                                ...obj,
                                status: response.data?.find(each => each?.id === obj?.id)?.status != null ? response.data?.find(each => each?.id === obj?.id)?.status : 'PENDING',
                                docx_url_field: response.data?.find(each => each?.id === obj?.id)?.docx_url_field,
                                docx_file_name: response.data?.find(each => each?.id === obj?.id)?.docx_file_name,
                                pdf_api_use: response.data?.find(each => each?.id === obj?.id)?.pdf_api_use,
                                animate: (response.data?.find(each => each?.id === obj?.id)?.status == "PENDING" ||
                                    response.data?.find(each => each?.id === obj?.id)?.status == null) ? true : false
                            };
                        }
                        return obj;
                    });
                    setCreatedProjects(newArr);
                    triggerTimeoutRef.current = setTimeout(() => {
                        setFileCheckTrigger(!fileCheckTrigger)
                    }, 20);
                },
            });
        }
    }

    useEffect(() => {
        if (createdProjects?.length !== 0 && fileIdList.current?.length !== 0) {
            let remainingFiles = createdProjects?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR" && each?.status != 'YET TO START' && each?.status != null)
            if (remainingFiles?.length !== 0) {
                statusCheckTimeoutRef.current = setTimeout(() => {
                    checkFileStatus()
                }, 5000);
            } else {
                // setIsFileConverting(false)
                // Config.toast('Conversion completed')
            }
        }
    }, [fileCheckTrigger])


    const openWriterFromPDF = (id, name) => {
        history(`/word-processor?pdf-id=${id}`, {state: { docName: name, from: "My PDF", prevPath: location.pathname + location.search }})
    }

    const openWriterFromDoc = (id, name) => {
        history(`/word-processor?document-id=${id}`, {state: { docName: name, from: "My documents", prevPath: window.location.pathname + window.location.search }})
    }

    const handlePdfTranslateBtn = (id, docx_file_name) => {
        setSelectedPdfObj({ id, filename: docx_file_name })
        setProjectUpdateModal(true)
    }

    const handleProceedBtn = () => {
        if (userTranslateChoice === 'new') {
            history(`/create/translate/files/translate-files?pdf=${selectedPdfObj?.id}`, {state: { filename: selectedPdfObj?.filename }})
        } else {
            history(`/create/translate/files/translate-files?pdf=${selectedPdfObj?.id}&get-project-info=${selectedProjectToUpdate?.id}&type=${1}`, {state: { filename: selectedPdfObj?.filename }})
        }
    }

    const loadProjectListOptions = async (searchQuery, loadedOptions, { page }) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(
            `${Config.BASE_URL}/workspace/file_project_list/?page=${page}${(searchQuery !== '' && searchQuery !== undefined) ? `&search=${searchQuery}` : ''}`,
            requestOptions);
        const responseJSON = await response.json();
        return {
            options: responseJSON.results,
            hasMore: Math.ceil(responseJSON.count / 20) > page,
            additional: {
                page: searchQuery ? 2 : page + 1,
            },
        };
    };

    const handleDocumentDeleteButton = (item) => {
        setMoreEl(false)
        deleteFromDocOrBlog.current = item?.open_as == 'BlogWizard' ? 'blog' : 'doc'
        setSelectedDocumntId(item?.id);
        setShowDeleteFileModal(true)
    }

    const deleteDocument = (documentId) => {
        let url = ''
        if (deleteFromDocOrBlog.current === 'doc') {
            url = `${Config.BASE_URL}/workspace/mydocuments/${documentId}`
        } else {
            url = `${Config.BASE_URL}/writer/blogcreation/${documentId}`
        }

        setIsDocumentDeleting(true)

        Config.axios({
            url: url,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                Config.toast(t("document_deleted_success"));
                setIsDocumentDeleting(false)
                const newArr = createdProjects?.filter(obj => obj.id !== documentId);
                setCreatedProjects(newArr)
                // if(newArr?.length === 15){
                //     getDocumentList()
                // }
                setShowDeleteFileModal(false)
                if (newArr?.length == 0) setEmptyProjects(true)
            },
            error: (err) => { setIsDocumentDeleting(false) }
        });
    }
	
	return (
		<React.Fragment>
			<div className="ai-projects-main-wrapper__quick-access-wrapper">
				<div className="quick-access-wrapper__header">
					<h1 className="quick-access-wrapper__header__title">{t("quick_access")}</h1>
					<Link className="quick-access-wrapper__header__link" to="/file-upload?page=1&order_by=-id">{t("all_proj")}</Link>
				</div>
                {/* <div className="header-align">
                    <div className="header-project-setup-align-wrap">
                        <div className="position-relative">
                            <div className={"project-list-search-box " + (fileListSearchEnlarge ? "active" : "")}>
                                <div className="img-box">
                                    <img src={Config.HOST_URL + "assets/images/chat/chat-search.svg"} alt="search-icon" />
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
                                    <img src={Config.HOST_URL + "assets/images/assign-page/search-bar-close.svg"} alt="search-bar-close" />
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
                                                <p className="results-link">{t("search_results_proj_list_search")} <span>{t("search_results_glossary_1")}</span></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Select  
                            options={projectTypes}
                            isSearchable={false}
                            styles={customProjectTypeSelectStyles}
                            value={projectFilterType}
                            // menuIsOpen={true}
                            classNamePrefix="project-type-list"
                            placeholder={t("project_type")}
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            onChange={handleProjectType}
                        /> */}
                        {/* {activeProjTab === 7 && (
                            <Select
                                options={orderByOptions}
                                isSearchable={false}
                                styles={customProjectTypeSelectStyles}
                                value={orderBySelectedValue}
                                // menuIsOpen={true}
                                classNamePrefix="project-type-list"
                                placeholder={t("order_by")}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                onChange={handleSelectedOrderItem}
                            />
                        )} */}
                        {/* <Menu
                            anchorEl={sortEl}
                            open={sortOpen}
                            onClose={handleDrpDownClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            className="menu-list-wrapper"
                        >
                            {orderByOptions.map((option, index) => (
                                <MenuItem
                                    className="menu-list-item"
                                    key={index}
                                    selected={option?.value === selectedValue}
                                    onClick={(e) => handleSelectedMenuItem(e, option.value)}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div> */}
                <div className="upload-files-section">
                    <div id="select-files" className="uploaded-files">
                        <div className="file-edit-heading-row project-list-main">
                            <div className="file-edit-heading-table">
                                <div className="file-edit-heading-table-row">
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
                                    <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("status")}</div>
                                    </div>
                                </div>
                                <>
                                    {createdProjects.length !== 0 || !showListingLoader ? (
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

                                                            <h2>{t("no_project_found")}</h2>
                                                            {
                                                                projectSearchTerm ?
                                                                    null
                                                                    :
                                                                    <>
                                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                            <button className="workspace-files-AddNewProjectButton"
                                                                                onClick={() => {
                                                                                    // activeToggle(2);
                                                                                    history(
                                                                                        activeProjTab === 1 ? "/create/all-templates" :
                                                                                            activeProjTab === 7 && "/create/tool-kit/pdf/convert-pdf"
                                                                                    );
                                                                                }}
                                                                            >
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
                                            ) :
                                                (createdProjects.length !== 0) ?
                                                    <React.Fragment>
                                                        {createdProjects.slice(0,4).map((project, key) => {
                                                            // this is for traditional projects
                                                            if ((project?.assign_enable !== null && project?.assign_enable !== undefined) && (project?.get_project_type !== null && project?.get_project_type !== undefined)) {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            openedProjectId == project.id
                                                                                ? "file-edit-list-table-row focused-proj-row"
                                                                                : project.progress?.toLowerCase() == "yet to start" ? "file-edit-list-table-row unopened-focus-proj-row" : "file-edit-list-table-row"
                                                                        }
                                                                        key={project.id}
                                                                        style={project?.analyzingWordCount ? { pointerEvents: 'none', opacity: '0.7' } : {}}
                                                                        data-key={project.id}
                                                                        onClick={(e) => selectProject(e, project?.id, project?.get_project_type)}
                                                                    >
                                                                        <div className="file-edit-list-table-cell-wrap">
                                                                            <div className="file-edit-list-table-cell" data-key={project.id}>
                                                                                <span className="arrow-icon">
                                                                                    {/* <img
                                                                                src={
                                                                                    openedProjectId == project.id
                                                                                        ? Config.HOST_URL + "assets/images/new-ui-icons/expand_less.svg"
                                                                                        : Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"
                                                                                }
                                                                                alt="expand-more"
                                                                            /> */}
                                                                                    {
                                                                                        openedProjectId == project.id ?
                                                                                            <KeyboardArrowUpIcon className="proj-list-arrow-up" />
                                                                                            :
                                                                                            <KeyboardArrowDownIcon className="proj-list-arrow-down" />
                                                                                    }

                                                                                </span>
                                                                                {/* <span className="">
                                                                        </span> */}
                                                                                <div className="proj-title-list-container">
                                                                                    <div className="proj-type-icon-wrap">
                                                                                        <span className={"proj-type-icon " + ((project?.get_project_type === 1 || project?.get_project_type === 2) ? "translate-bg" : project?.get_project_type === 3 ? "assets-bg" : (project?.get_project_type === 4 && project?.voice_proj_detail.project_type_sub_category === 2) ? "voice-bg" : "")}>
                                                                                            {
                                                                                                (project?.get_project_type === 1 || project?.get_project_type === 2) ?
                                                                                                    <TranslateIcon className="proj-types" />
                                                                                                    : project?.get_project_type === 3 ?
                                                                                                        <DescriptionOutlinedIcon className="gloss-types" />
                                                                                                        : (project?.get_project_type === 4 && project?.voice_proj_detail.project_type_sub_category === 1) ?
                                                                                                            <img src={TranscriptionIcon} alt="transcription" />
                                                                                                            : (project?.get_project_type === 4 && project?.voice_proj_detail.project_type_sub_category === 2) ?
                                                                                                                <img src={SpeechWhiteIcon} alt="sidebar-speech" />
                                                                                                                : project?.get_project_type === 5 ?
                                                                                                                    <img src={TranslateIcon} alt="instant-project-icon" />
                                                                                                                    :
                                                                                                                    ""
                                                                                            }

                                                                                        </span>

                                                                                    </div>
                                                                                    <div className="proj-list-info">
                                                                                        <div className="proj-information">
                                                                                            <Tooltip className="dont-open-list" title={project.project_name} placement="top" arrow>
                                                                                                <span
                                                                                                    className="file-edit-proj-txt-tmx"
                                                                                                // className={
                                                                                                //     project.progress?.toLowerCase() == "yet to start"
                                                                                                //         ? "file-edit-proj-txt-tmx-created"
                                                                                                //         : "file-edit-proj-txt-tmx"
                                                                                                // }
                                                                                                >
                                                                                                    {project.project_name}
                                                                                                    {(project?.project_analysis?.proj_word_count == null && showElement) &&
                                                                                                        <span className={project.progress?.toLowerCase() == "yet to start" ? "unopend-icon2" : "d-none"}>
                                                                                                            <img src={UnopenedProjSymbol} alt="unopened-proj" />
                                                                                                        </span>}
                                                                                                </span>
                                                                                            </Tooltip>

                                                                                            {/* project.is_proj_analysed is removed from the below condition */}
                                                                                            {project?.project_analysis?.proj_word_count != null && project?.project_analysis.proj_word_count != 0 ? (
                                                                                                <div className="position-relative">
                                                                                                    <span className="file-edit-proj-txt-word-count word-count-capsule">
                                                                                                        <span >{project.project_analysis.proj_word_count} W</span>
                                                                                                    </span>
                                                                                                    {showElement &&
                                                                                                        <span className={project.progress?.toLowerCase() == "yet to start" ? "unopend-icon" : "d-none"}>
                                                                                                            <img src={UnopenedProjSymbol} alt="unopened-proj" />
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
                                                                                            )}

                                                                                            {project.assigned && (
                                                                                                <span className="pl-2 pr-2">
                                                                                                    <img
                                                                                                        src={HowToRegister}
                                                                                                        alt="project assigned"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="proj-file-type">
                                                                                            <span className={project?.get_project_type === 3 ? "glossary-text-name" : ""}>{project?.get_project_type === 3 ? t("glossary") : project?.get_project_type === 4 ? t("speech") :
                                                                                                project?.file_create_type == "From insta text" ? t("text") :
                                                                                                    (project?.get_project_type === 1 || project?.get_project_type === 2) ? t("files") : (project?.get_project_type === 5) && t("instant")}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                <div className="file-edit-translation-txt word-count">
                                                                                    <span>{Config.getProjectCreatedDate(project.created_at)}</span>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="file-edit-list-table-cell">
                                                                        <div className="file-edit-translation-txt word-count">
                                                                            <span>{project?.get_project_type === 3 ? "Glossary" : project?.get_project_type === 4 ? "Voice" : 
                                                                                (project?.get_project_type === 1 || project?.get_project_type === 2) && "Files"}</span>
                                                                        </div>
                                                                    </div> */}
                                                                            <div className="file-edit-list-table-cell" data-key={project.id}>
                                                                                {/* <div className="file-edit-translation-txt word-count">
                                                                            <span>{Config.getProjectCreatedDate(project.created_at)}</span>
                                                                        </div> */}
                                                                                {/* (selectedProjectFile?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id && each.task_assign_detail.step === 2)) && eachRole?.task_ven_status === 'task_accepted') */}
                                                                                {(
                                                                                    (project?.get_assignable_tasks_exists && project?.assign_enable) ||
                                                                                    (userDetails?.agency && selectedProjectFiles?.find(task => task?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details?.managers?.find(user => user === userDetails.pk)) && each?.task_ven_status === 'task_accepted'))))
                                                                                ) && (
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
                                                                                    )}
                                                                                <div className="project-edit-tools dont-open-list">
                                                                                    {((!Config.userState?.is_internal_member && project?.get_project_type !== 3 && project?.assign_enable)) &&  // add this to enable project-download for agency => || userDetails?.agency
                                                                                        <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                            <span onClick={(e) => handleBulkDownload(e, project.id, project.project_name)}>
                                                                                                <img
                                                                                                    src={FileDownload}
                                                                                                    alt="bulk download"
                                                                                                    should-open-files="dont-open"
                                                                                                />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    {/* Don't show project analysis option for glossary, express, and voice project without translation task. */}
                                                                                    {(project.get_project_type !== 3 && project.get_project_type !== 5 && project?.show_analysis) && <Tooltip title={t("project_analysis")} placement="top">
                                                                                        <span onClick={(e) => { handleShowAnalysisModal(e, project?.id); setShowProjectAnalysis(true) }}>
                                                                                            <img
                                                                                                src={StackedBarChart}
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
                                                                                                    src={CloneIcon}
                                                                                                    alt="clone"
                                                                                                    should-open-files="dont-open"
                                                                                                />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    {Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable && (
                                                                                        <>
                                                                                            <Tooltip dont-open-list="yes" title={t("edit")} placement="top">
                                                                                                <span onClick={(e) => editProject(e, project.id, project?.get_project_type, project)}>
                                                                                                    <img
                                                                                                        src={PencilEditNew}
                                                                                                        alt="pencil-edit-new"
                                                                                                        should-open-files="dont-open"
                                                                                                    />
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                            {(project.get_project_type == 1 || project.get_project_type == 2) &&
                                                                                                <Tooltip TransitionComponent={Zoom} title={t("assets")} placement="top">
                                                                                                    <span onClick={(e) => showSettingsModal(e, project?.id)} >
                                                                                                        <img
                                                                                                            src={UploadFile}
                                                                                                            alt="upload_file"
                                                                                                            should-open-files="dont-open"
                                                                                                        />
                                                                                                    </span>
                                                                                                </Tooltip>
                                                                                            }
                                                                                        </>
                                                                                    )}
                                                                                    {/* <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                    <span onClick={(e) => deleteProject(project.id)} className="dont-open-files"><img src={Config.HOST_URL+'assets/images/new-ui-icons/delete_black.svg'}  alt="Delete file"/></span>
                                                                                </Tooltip> */}
                                                                                </div>
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
                                                                            </div>
                                                                        </div>
                                                                        <Collapse isOpen={openedProjectId == project.id} className="selected-file-row">
                                                                            {
                                                                                openedProjectId == project.id &&
                                                                                ((selectedProjectFiles?.length > 0) ? (
                                                                                    selectedProjectFiles.map((selectedProjectFile, key) => {
                                                                                        isAssignedProject = createdProjects.find(
                                                                                            (element) => element.id === openedProjectId
                                                                                        )?.assign_enable;
                                                                                        let segmentPercentage = 0;
                                                                                        if (selectedProjectFile?.progress != null) {
                                                                                            if (selectedProjectFile?.progress?.total_segments == 0)
                                                                                                segmentPercentage = 0;
                                                                                            else
                                                                                                segmentPercentage = (
                                                                                                    (selectedProjectFile?.progress?.confirmed_segments /
                                                                                                        selectedProjectFile?.progress?.total_segments) *
                                                                                                    100
                                                                                                ).toFixed();
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

                                                                                        selectedFilesData = (
                                                                                            <div className="file-edit-inner-table" key={selectedProjectFile.id}>
                                                                                                <div className="file-edit-list-inner-table-row">
                                                                                                    <div className="file-edit-list-inner-table-cell">
                                                                                                        <div className="file-edit-translation-txt">
                                                                                                            <img
                                                                                                                className="translation-pair-L"
                                                                                                                src={TranslationPair}
                                                                                                            />
                                                                                                            <span>{targetLanguageOptionsRef.current?.find(each => each.id == selectedProjectFile?.source_language)?.language}</span>
                                                                                                            <img
                                                                                                                src={ArrowRightAltColor}
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
                                                                                                    </div>
                                                                                                    <div className="file-edit-list-inner-table-cell">
                                                                                                        {/* {projectType === 1 || projectType === 2 ? ( */}
                                                                                                        {selectedProjectFile?.filename !== undefined &&
                                                                                                            <>
                                                                                                                <span className="doc-icon">
                                                                                                                    <img
                                                                                                                        src={Config.BASE_URL + "/app/extension-image/" +
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
                                                                                                            )}
                                                                                                    </div>
                                                                                                    {/* <div className="file-edit-list-inner-table-cell">
                                                                                                    {(selectedProjectFile?.task_assign_info !== null && selectedProjectFile?.task_assign_info[0]?.deadline) && (
                                                                                                        <div className="file-edit-translation-txt word-count">
                                                                                                            <div className="schedule-timer-row">
                                                                                                                <div className="schedule-timer-img">
                                                                                                                    <img
                                                                                                                        src={
                                                                                                                            Config.HOST_URL +
                                                                                                                            "assets/images/assign-page/timer.svg"
                                                                                                                        }
                                                                                                                        alt="schedule-timer"
                                                                                                                    />
                                                                                                                </div>
                                                                                                                <div className="schedule-timer-content">
                                                                                                                    <p className="time">
                                                                                                                        {Config.convertUTCToLocal(
                                                                                                                            selectedProjectFile?.task_assign_info[0]
                                                                                                                                ?.deadline,
                                                                                                                            "date"
                                                                                                                        )}
                                                                                                                    </p>
                                                                                                                    <p className="date">
                                                                                                                        {Config.convertUTCToLocal(
                                                                                                                            selectedProjectFile?.task_assign_info[0]
                                                                                                                                ?.deadline,
                                                                                                                            "time"
                                                                                                                        )}
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div> */}
                                                                                                    <div className="file-edit-list-inner-table-cell circular-progress">
                                                                                                        {/* {(selectedProjectFile?.filename !== undefined && project?.get_project_type !== 5 && selectedProjectFile?.open_in !== "Download") && 
                                                                                                    <div className="workspace-progress-bar-part-setup">
                                                                                                        {
                                                                                                            (selectedProjectFile?.open_in !== "Ailaysa Writer or Text Editor" || selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) &&
                                                                                                                <div className="progress-bar-file-completion-project-setup">
                                                                                                                    <div className="progress-file-completion-project-setup">
                                                                                                                        {
                                                                                                                            (selectedProjectFile?.pre_trans_processing || downloadingFilesList.current?.find(each => each == selectedProjectFile?.id)) ? 
                                                                                                                                <LinearProgress />
                                                                                                                            :
                                                                                                                            <div
                                                                                                                                className="bar-file-completion"
                                                                                                                                style={{
                                                                                                                                    width: segmentPercentage + "%",
                                                                                                                                }}
                                                                                                                            ></div>
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                        }

                                                                                                        <div className="progress-txt border-right-add file-progress-txt">
                                                                                                            {
                                                                                                                (selectedProjectFile?.pre_trans_processing) ? 
                                                                                                                    <span></span>
                                                                                                                : (selectedProjectFile?.open_in !== "Ailaysa Writer or Text Editor") ?
                                                                                                                    <span>{segmentPercentage}%</span>
                                                                                                                : null
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>} */}
                                                                                                        {(selectedProjectFile?.filename !== undefined && project?.get_project_type !== 5 && selectedProjectFile?.open_in !== "Download" && selectedProjectFile?.open_in !== "Ailaysa Writer or Text Editor") && (
                                                                                                            <>
                                                                                                                {/* Task assign info - STARTS HERE */}
                                                                                                                {
                                                                                                                    (userDetails.agency ? (selectedProjectFile?.task_assign_info != null && userDetails.agency && project?.assign_enable) : (selectedProjectFile?.task_assign_info != null)) ? (
                                                                                                                        selectedProjectFile.task_assign_info?.find(each => each?.assigned_by_details.id === userDetails.pk) ? (     // task owner/admin view - assigned by
                                                                                                                            selectedProjectFile.task_assign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        ) : selectedProjectFile.task_assign_info?.find(each => each?.assign_to_details.id === userDetails.pk) ? (   // vendor view - assign_to
                                                                                                                            selectedProjectFile.task_assign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        ) : (   // logged-in user is not in assigned-by or assigned-to (project-manager)
                                                                                                                            selectedProjectFile.task_assign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        )
                                                                                                                    ) : (((userDetails.agency ? (selectedProjectFile?.assignable && userDetails.agency && project?.assign_enable) : (selectedProjectFile?.assignable)) && !is_internal_meber_editor) && // task is not yet assinged
                                                                                                                        <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                            <CircularProgressWithLabel
                                                                                                                                value={segmentPercentage}
                                                                                                                                // color={'info'}
                                                                                                                                sx={{ color: '#0078D4' }}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                }
                                                                                                                {/* Task assign info - ENDS HERE */}

                                                                                                                {/* Task re-assign info - STRATS HERE */}
                                                                                                                {
                                                                                                                    (typeof selectedProjectFile?.task_reassign_info !== 'boolean' && selectedProjectFile?.task_reassign_info != null) ? (
                                                                                                                        selectedProjectFile.task_reassign_info?.find(each => each?.assigned_by_details.id === userDetails.pk) ? (   // task owner/admin view - assigned by
                                                                                                                            selectedProjectFile.task_reassign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        ) : selectedProjectFile.task_reassign_info?.find(each => each?.assign_to_details.id === userDetails.pk) ? ( // vendor view - assign to
                                                                                                                            selectedProjectFile.task_reassign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        ) : (   // logged-in user is not in assigned-by or assigned-to (project manager view) 
                                                                                                                            selectedProjectFile.task_reassign_info?.map(eachRole => {
                                                                                                                                let status = eachRole.task_assign_detail.task_status
                                                                                                                                let isExternal = eachRole?.assign_to_details?.external_editor
                                                                                                                                if (eachRole.task_assign_detail.step === 1) {     // editor step-1
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("editor")} ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={
                                                                                                                                                        eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                            100 : segmentPercentage
                                                                                                                                                    }
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                } else if (eachRole.task_assign_detail.step === 2) {   // reviewer step-2
                                                                                                                                    return (
                                                                                                                                        <Tooltip
                                                                                                                                            title={
                                                                                                                                                `${t("reviewer")}: ${(eachRole?.task_ven_status == null && isExternal) ? t("not_yet_accepted") :
                                                                                                                                                    eachRole?.task_ven_status === 'change_request' ? t("change_request") :
                                                                                                                                                        status === 'Return Request' ? t("declined") : status === 'Completed' ? t("submitted") :
                                                                                                                                                            status
                                                                                                                                                }`
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        >
                                                                                                                                            <div className="circular-progress-wrapper" onClick={(e) => e.stopPropagation()}>
                                                                                                                                                <CircularProgressWithLabel
                                                                                                                                                    value={100}
                                                                                                                                                    sx={{
                                                                                                                                                        color:
                                                                                                                                                            eachRole.task_assign_detail.task_status === 'Completed' ?
                                                                                                                                                                '#019F40' : eachRole.task_assign_detail.task_status === 'Return request' ?
                                                                                                                                                                    '#FF442E' :
                                                                                                                                                                    ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) == 0) ?
                                                                                                                                                                        '#FF442E' : ((eachRole.task_assign_detail.task_status === 'In progress' || eachRole.task_assign_detail.task_status === 'Yet to start') && Config.calculateTimeLeftPercentage(eachRole.created_at, eachRole.deadline) < 90) ?
                                                                                                                                                                            '#FF9900' : eachRole.task_assign_detail.task_status === 'Yet to start' ? '#E8E8E8' : '#0078D4'
                                                                                                                                                    }}
                                                                                                                                                    hideLabel={true}
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </Tooltip>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        )
                                                                                                                    ) : (selectedProjectFile?.assignable && userDetails?.agency && !is_internal_meber_editor) && (
                                                                                                                        <span></span>
                                                                                                                        // <div>
                                                                                                                        //     <CircularProgressWithLabel
                                                                                                                        //         value={segmentPercentage} 
                                                                                                                        //         color={'info'}
                                                                                                                        //     />
                                                                                                                        // </div>
                                                                                                                    )
                                                                                                                }
                                                                                                            </>
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
                                                                                                                                                // <Tooltip
                                                                                                                                                // PopperProps={{
                                                                                                                                                //     sx: {
                                                                                                                                                //       '& .MuiTooltip-tooltip': {
                                                                                                                                                //         padding: '0 !important',
                                                                                                                                                //         backgroundColor: 'transparent !important'
                                                                                                                                                //       }
                                                                                                                                                //     },
                                                                                                                                                //   }}
                                                                                                                                                //     TransitionComponent={Zoom}
                                                                                                                                                //     className="tooltip-wrapper"
                                                                                                                                                //     disableFocusListener 
                                                                                                                                                //     disableTouchListener
                                                                                                                                                //     title={
                                                                                                                                                //         <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                //     }
                                                                                                                                                //     placement="bottom"
                                                                                                                                                // >
                                                                                                                                                // <Tooltip
                                                                                                                                                //     title={
                                                                                                                                                //         // `Assigned to ${Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name}`
                                                                                                                                                //     <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                                //     }
                                                                                                                                                //     placement="top"
                                                                                                                                                //     arrow
                                                                                                                                                // >
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                        eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                // </Tooltip>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else if (Config.userState?.id === eachRole?.assigned_by_details.id) {    // // task is assigned by me to someone
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}

                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
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
                                                                                                                                                                    <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}

                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
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
                                                                                                                                                                    <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
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
                                                                                                                                                {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                {/* </Tooltip> */}
                                                                                                                                                {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                    <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                </div>
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
                                                                                                                                                                <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                    <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                </div>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                {/* </Tooltip> */}
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            )
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )
                                                                                                                : ((userDetails.agency ? (selectedProjectFile?.assignable && userDetails.agency && project?.assign_enable) : (selectedProjectFile?.assignable)) && !is_internal_meber_editor) && (
                                                                                                                    <>
                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                            <Tooltip title={t("assign_editor")} placement="top" arrow>
                                                                                                                                <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                    <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                </div>
                                                                                                                            </Tooltip>
                                                                                                                            {   // show assign reviewer button only if project has reviewer step
                                                                                                                                (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && (
                                                                                                                                    <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                        <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                            <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                        </div>
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
                                                                                                                                                // <Tooltip
                                                                                                                                                // PopperProps={{
                                                                                                                                                //     sx: {
                                                                                                                                                //       '& .MuiTooltip-tooltip': {
                                                                                                                                                //         padding: '0 !important',
                                                                                                                                                //         backgroundColor: 'transparent !important'
                                                                                                                                                //       }
                                                                                                                                                //     },
                                                                                                                                                //   }}
                                                                                                                                                //     TransitionComponent={Zoom}
                                                                                                                                                //     className="tooltip-wrapper"
                                                                                                                                                //     disableFocusListener 
                                                                                                                                                //     disableTouchListener
                                                                                                                                                //     title={
                                                                                                                                                //         <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                //     }
                                                                                                                                                //     placement="bottom"
                                                                                                                                                // >
                                                                                                                                                // <Tooltip
                                                                                                                                                //     title={
                                                                                                                                                //         // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                //     <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                                //     }
                                                                                                                                                //     placement="top"
                                                                                                                                                //     arrow
                                                                                                                                                // >
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                // </Tooltip>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else if (Config.userState?.id === eachRole?.assigned_by_details.id) {    // // task is assigned by me to someone
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}

                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each?.task_ven_status === 'task_accepted' && !is_internal_meber_editor) &&
                                                                                                                                                            selectedProjectFile?.task_reassign_info?.length === 1) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
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
                                                                                                                                                                    <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper" onClick={(e) => handleShowAssignMemberInfo(e, selectedProjectFile.id)}>
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (eachRole.task_assign_detail.step === 1) {
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
                                                                                                                                                    {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                    {
                                                                                                                                                        (selectedProjectFile?.task_assign_info?.length === 1 && (project?.steps?.find(each => each.steps === 2) && selectedProjectFile?.open_in !== 'Ailaysa Writer or Text Editor') && !is_internal_meber_editor) && (
                                                                                                                                                            <div className="unassigned-members-wrapper">
                                                                                                                                                                <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                    <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
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
                                                                                                                                                                    <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                        <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                    </div>
                                                                                                                                                                </Tooltip>
                                                                                                                                                            </div>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    {/* <Tooltip
                                                                                                                                                title={
                                                                                                                                                    // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                                }
                                                                                                                                                placement="top"
                                                                                                                                                arrow
                                                                                                                                            > */}
                                                                                                                                                    <div className="assigned-details-wrapper">
                                                                                                                                                        <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                            <span className="selected-project-assigned-member">
                                                                                                                                                                {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                                {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                    (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                        ?.charAt(0)
                                                                                                                                                                        // ?.match(/\b(\w)/g)
                                                                                                                                                                        // ?.join("")
                                                                                                                                                                        ?.toUpperCase()}
                                                                                                                                                            </span>

                                                                                                                                                            <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        {/* {
                                                                                                                                                        (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                        <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                    } */}
                                                                                                                                                    </div>
                                                                                                                                                    {/* </Tooltip> */}
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
                                                                                                                                                {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} eachRole={eachRole} selectedProjectFile={selectedProjectFile} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                {/* </Tooltip> */}
                                                                                                                                                {/* if editor is assigned but not reviewer then show add reviewer button, if reviewer step is present */}
                                                                                                                                                {
                                                                                                                                                    (selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each?.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request')) && selectedFileRow?.task_assign_info?.length === 1 && !is_internal_meber_editor) && (
                                                                                                                                                        <div className="unassigned-members-wrapper">
                                                                                                                                                            <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                                                <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                                                    <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                </div>
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
                                                                                                                                                                <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                                                    <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                                                </div>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        </div>
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                {/* <Tooltip
                                                                                                                                            title={
                                                                                                                                                // `Assigned to ${editorAssignmentDetails?.name}`
                                                                                                                                                <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role}/>
                                                                                                                                            }
                                                                                                                                            placement="top"
                                                                                                                                            arrow
                                                                                                                                        > */}
                                                                                                                                                <div className="assigned-details-wrapper">
                                                                                                                                                    <div className="selected-proj-assigned-member-wrapper">
                                                                                                                                                        <span className="selected-project-assigned-member">
                                                                                                                                                            {/* {((Config.userState?.id === eachRole?.assign_to_details?.id || eachRole?.assign_to_details?.managers?.find(user => user === userDetails.pk)) ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                            eachRole?.assign_to_details?.name?.charAt(0)?.toUpperCase()} */}
                                                                                                                                                            {(Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name) &&
                                                                                                                                                                (Config.userState?.id === eachRole?.assign_to_details?.id ? eachRole?.assigned_by_details?.name : eachRole?.assign_to_details?.name)
                                                                                                                                                                    ?.charAt(0)
                                                                                                                                                                    // ?.match(/\b(\w)/g)
                                                                                                                                                                    // ?.join("")
                                                                                                                                                                    ?.toUpperCase()}
                                                                                                                                                        </span>

                                                                                                                                                        <div className="assigned-task-info-box-main-wrapper">
                                                                                                                                                            <AssignInfoUiBox name={editorAssignmentDetails?.name} project={project} selectedProjectFile={selectedProjectFile} eachRole={eachRole} reviewer={role} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {/* {
                                                                                                                                                    (showAssignMemberInfobox && assignSelectedProject === selectedProjectFile.id) &&
                                                                                                                                                    <AssignInfoUiBox name={editorAssignmentDetails?.name} projectID={project.id} eachRole={eachRole} selectedProjectFile={selectedProjectFile} projectId={project.id} reviewer={role}/>
                                                                                                                                                } */}
                                                                                                                                                </div>
                                                                                                                                                {/* </Tooltip> */}
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
                                                                                                                                        <div className="assign-editor-modal-wrap" onClick={(e) => handleIndividualTaskAssignManage(e, 1, selectedProjectFile, project)}>
                                                                                                                                            <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                        </div>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
                                                                                                                            {   // show assign reviewer button only if project has reviewer step
                                                                                                                                (
                                                                                                                                    selectedProjectFile?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request'))
                                                                                                                                ) && (
                                                                                                                                    <Tooltip title={t("assign_reviewer")} placement="top" arrow>
                                                                                                                                        <div className="assign-reviewer-modal-wrap" onClick={(e) => { handleIndividualTaskAssignManage(e, 2, selectedProjectFile, project) }}>
                                                                                                                                            <PersonAddAltOutlinedIcon className="member-add-icon" />
                                                                                                                                        </div>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>
                                                                                                        {/* Task action button logic ---- STARTS HERE */}
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
                                                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                                                    <ButtonLoader />
                                                                                                                                                                    {t("transcribing")}
                                                                                                                                                                </span>
                                                                                                                                                            </button>
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
                                                                                                                                                                                null, null, null, eachRole.task_assign_detail.step === 1 ? 'editor' : 'reviewer'
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
                                                                                                                                        <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                                <ButtonLoader />
                                                                                                                                                {t("transcribing")}
                                                                                                                                            </span>
                                                                                                                                        </button>
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
                                                                                                                                                    project?.get_project_type
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                        </button>
                                                                                                                                    )
                                                                                                                                )
                                                                                                                            )
                                                                                                                        }
                                                                                                                    })
                                                                                                                ) : selectedProjectFile?.task_assign_info?.find(each => Config.userState?.id === each.assigned_by_details.id) !== undefined ? (   // if task is assigned by me (I assigned the task to someone)
                                                                                                                    (selectedProjectFile?.open_in == 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined ? (
                                                                                                                        <>
                                                                                                                            {
                                                                                                                                !selectedProjectFile?.pre_trans_processing && (
                                                                                                                                    <Tooltip TransitionComponent={Zoom} title={t("delete")} placement="top">
                                                                                                                                        <span className="file-edit-proj-status-txt docs-delete glossary-status d-inline" onMouseUp={(e) => handleTaskDeleteButton(e, project?.id, selectedProjectFile?.id, selectedProjectFile?.task_assign_info)}>
                                                                                                                                            <img
                                                                                                                                                src={AssetsDeleteIcon}
                                                                                                                                                alt="close_black"
                                                                                                                                            />
                                                                                                                                        </span>
                                                                                                                                    </Tooltip>
                                                                                                                                )
                                                                                                                            }
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
                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                    <ButtonLoader />
                                                                                                                                    {t("transcribing")}
                                                                                                                                </span>
                                                                                                                            </button>
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
                                                                                                                                                    project?.get_project_type
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                        </button>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                                <div className="more-options-wrap">
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
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                ) : (   // task is assigned, but the task is not assigned by me and the task is not assined to me (internal editor -> project owner) (project-owner view)
                                                                                                                    (selectedProjectFile?.open_in == 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined ? (
                                                                                                                        <>
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
                                                                                                                            <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                                <span className="fileopen-new-btn">
                                                                                                                                    <ButtonLoader />
                                                                                                                                    {t("transcribing")}
                                                                                                                                </span>
                                                                                                                            </button>
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
                                                                                                                                                    project?.get_project_type
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                        </button>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                                <div className="more-options-wrap">
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
                                                                                                                                                                        src={AssetsDeleteIcon}
                                                                                                                                                                        alt="close_black"
                                                                                                                                                                    />
                                                                                                                                                                </span>
                                                                                                                                                            </Tooltip>
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                    <Tooltip className="dont-open-list" title={t("download")} placement="top">
                                                                                                                                                        <span className="mr-4" onMouseUp={() => downloadConvertDocxFile('task', selectedProjectFile?.id)}>
                                                                                                                                                            <img
                                                                                                                                                                src={FileDownload}
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
                                                                                                                                                            className="workspace-files-OpenProjectButton" type="button" onMouseUp={() => downloadConvertDocxFile('task', selectedProjectFile?.id)}>
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
                                                                                                                                    type="button"
                                                                                                                                    style={{
                                                                                                                                        paddingLeft: "22px",
                                                                                                                                        paddingRight: "22px"
                                                                                                                                    }}
                                                                                                                                    onMouseUp={(e) => checkPdfConversionStatus(selectedProjectFile?.id, project?.id)}
                                                                                                                                >
                                                                                                                                    <span className="fileopen-new-btn">{t("convert")}</span>
                                                                                                                                </button>
                                                                                                                                <MoreOptionsIcon selectedProjectFile={selectedProjectFile} project={project} onlyDelete={true} disabled={selectedProjectFile?.pre_trans_processing} />
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    )
                                                                                                                ) : ((selectedProjectFile?.open_in === 'Download' && !selectedProjectFile?.text_to_speech_convert_enable) || selectedProjectFile?.audio_file_url != undefined) ? (
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
                                                                                                                ) : selectedProjectFile?.open_in === 'Download' && selectedProjectFile?.text_to_speech_convert_enable ? (
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
                                                                                                                ) : selectedProjectFile?.open_in === 'Ailaysa Writer or Text Editor' && selectedProjectFile?.transcribed === false ? (
                                                                                                                    clickedOpenButton == key ? (
                                                                                                                        <button className="workspace-files-OpeningProjectButton" type="button">
                                                                                                                            <span className="fileopen-new-btn">
                                                                                                                                <ButtonLoader />
                                                                                                                                {t("transcribing")}
                                                                                                                            </span>
                                                                                                                        </button>
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
                                                                                                                                                project?.get_project_type
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        <span className="fileopen-new-btn">{t("open")}</span>
                                                                                                                                    </button>
                                                                                                                                )
                                                                                                                            }
                                                                                                                            <div className="more-options-wrap">
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
                                                                                                                        </>
                                                                                                                    )
                                                                                                                )
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                        selectedFilesData = <div>{selectedFilesData}</div>;
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
                                                                                                            <div className="d-flex align-items-center gap-5">
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "1rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={50}
                                                                                                                />
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "1rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={25}
                                                                                                                />
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "1rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={50}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    variant="rounded"
                                                                                                                    width={30}

                                                                                                                />
                                                                                                                <Skeleton
                                                                                                                    animation="wave"
                                                                                                                    style={{ marginLeft: "1rem" }}
                                                                                                                    variant="rounded"
                                                                                                                    width={115}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <Skeleton
                                                                                                                animation="wave"
                                                                                                                variant="rounded"
                                                                                                                style={{ width: 100, height: 20 }}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <div className="d-flex align-items-center justify-content-between w-100">
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        variant="circular"
                                                                                                                        width={25}
                                                                                                                        height={25}
                                                                                                                    />
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        variant="circular"
                                                                                                                        style={{ marginLeft: "0.5rem" }}
                                                                                                                        width={25}
                                                                                                                        height={25}
                                                                                                                    />
                                                                                                                </div>
                                                                                                                <div className="d-flex align-items-center">
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        variant="rounded"
                                                                                                                        style={{ width: 100, height: 20 }}
                                                                                                                    />
                                                                                                                    <Skeleton
                                                                                                                        animation="wave"
                                                                                                                        variant="circular"
                                                                                                                        style={{ marginLeft: "0.5rem" }}
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
                                                                                /*(selectedProjectFiles.length == 0) && (
                                                                                                <div className="file-edit-inner-table">
                                                                                                    <div className="file-edit-list-inner-table-row">
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                            <div className="file-edit-translation-txt">
                                                                                                                No Files Found
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="file-edit-list-inner-table-cell">
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )*/
                                                                            }
                                                                        </Collapse>
                                                                    </div>
                                                                );
                                                            }
                                                            // this is for pdf files
                                                            else if ((project?.pdf_file !== null && project?.pdf_file !== undefined) && (project?.pdf_file_name !== null && project?.pdf_file_name !== undefined)) {
                                                                return (
                                                                    <div
                                                                        className="file-edit-list-table-row"
                                                                        key={project.id}
                                                                    >
                                                                        <div className="file-edit-list-table-cell-wrap">
                                                                            <div className="file-edit-list-table-cell">
                                                                                <span className="empty-box-icon"></span>
                                                                                <div className="proj-title-list-container">
                                                                                    {
                                                                                        (project.docx_url_field !== null && project.docx_file_name !== null) ?
                                                                                            <img
                                                                                                src={
                                                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                                                    project?.docx_file_name?.split(".").pop()
                                                                                                }
                                                                                                alt="document"
                                                                                            />
                                                                                            :
                                                                                            <img
                                                                                                src={
                                                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                                                    project?.pdf_file_name?.split(".").pop()
                                                                                                }
                                                                                                alt="document" />
                                                                                    }

                                                                                    <div className="proj-list-info">
                                                                                        <div className="proj-information">
                                                                                            <Tooltip className="dont-open-list" title={
                                                                                                project.docx_url_field !== null && project.docx_file_name !== null ?
                                                                                                    project.docx_file_name
                                                                                                    :
                                                                                                    project.pdf_file_name
                                                                                            } placement="top" arrow>
                                                                                                <span
                                                                                                    className="file-edit-proj-txt-tmx"
                                                                                                >
                                                                                                    {
                                                                                                        project.docx_url_field !== null && project.docx_file_name !== null ?
                                                                                                            project.docx_file_name
                                                                                                            :
                                                                                                            project.pdf_file_name
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                <div className="file-edit-translation-txt word-count">
                                                                                    <div className="status-container">
                                                                                        <span>{Config.getProjectCreatedDate(project?.created_at)}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                {
                                                                                    project?.docx_url_field !== null && (
                                                                                        project?.pdf_api_use === 'google-ocr' ? (
                                                                                            <>
                                                                                                <Tooltip title={t("view_docx_writer")} TransitionComponent={Zoom} placement="top">
                                                                                                    <button className="convert-pdf-list-ViewProjectButton" type="button" onMouseUp={() => openWriterFromPDF(project?.id, project?.docx_file_name)}>
                                                                                                        <span className="fileopen-new-btn">{t("view")}</span>
                                                                                                    </button>
                                                                                                </Tooltip>
                                                                                                <MoreOptionsIconPDF project={project} />
                                                                                            </>
                                                                                        ) : project?.pdf_api_use === 'convertio' ? (
                                                                                            <>
                                                                                                <Tooltip title={t("create_update_trans_project_tooltip")} TransitionComponent={Zoom} placement="top">
                                                                                                    <button
                                                                                                        className="convert-pdf-list-OpenProjectButton"
                                                                                                        type="button"
                                                                                                        onMouseUp={() => handlePdfTranslateBtn(project?.id, project?.docx_file_name)}
                                                                                                    >
                                                                                                        <span className="fileopen-new-btn">{t("translate")}</span>
                                                                                                    </button>
                                                                                                </Tooltip>
                                                                                                <MoreOptionsIconPDF project={project} />
                                                                                            </>
                                                                                        ) : null
                                                                                    )
                                                                                }
                                                                                {
                                                                                    (project.status === 'ERROR') && (
                                                                                        <>
                                                                                            <button
                                                                                                className="convert-pdf-list-RemoveButton"
                                                                                                type="button"
                                                                                                onMouseUp={() => handlePDFDeleteButton(project.id)}
                                                                                            >
                                                                                                <span className="fileopen-new-btn remove-pdf-button">{t("remove")}</span>
                                                                                            </button>
                                                                                            <MoreOptionsIcon project={project} onlyDelete={true} disabled={true} />
                                                                                        </>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    (project.status != null && project.status !== 'PENDING' && project.status !== 'YET TO START') ? (
                                                                                        <>
                                                                                            <div className="status-conditions-part dont-open-list" style={{ display: "none" }}>
                                                                                                <Tooltip TransitionComponent={Zoom} title={t("delete")} placement="top">
                                                                                                    <span
                                                                                                        className="file-edit-proj-status-txt glossary-status"
                                                                                                        onClick={() => handlePDFDeleteButton(project.id)}
                                                                                                    >
                                                                                                        <img
                                                                                                            src={AssetsDeleteIcon}
                                                                                                            alt="close_black"
                                                                                                        />
                                                                                                    </span>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                        </>
                                                                                    ) : (
                                                                                        (project?.animate !== undefined && project?.animate) ? (
                                                                                            <button className="trans-btn-txt-convert" id={project.id}>
                                                                                                <span className="">
                                                                                                    <CachedIcon className="reload-icon rotate" />
                                                                                                    {t("converting")}
                                                                                                </span>
                                                                                            </button>
                                                                                        ) : (
                                                                                            <>
                                                                                                <button className="trans-btn-txt-convert convert-padding"
                                                                                                    id={project.id}
                                                                                                    onClick={(e) => SingleConvert(project.id)}
                                                                                                >
                                                                                                    <span className="">
                                                                                                        {/* <CachedIcon className="reload-icon" /> */}
                                                                                                        {t("convert")}
                                                                                                    </span>
                                                                                                </button>
                                                                                                <MoreOptionsIconPDF project={project} deleteOnly={true} />
                                                                                            </>
                                                                                        )
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            // this is for documents and blogs
                                                            else {
                                                                return (
                                                                    <div
                                                                        className="file-edit-list-table-row"
                                                                        key={project.id}
                                                                    >
                                                                        <div className="file-edit-list-table-cell-wrap">
                                                                            <div className="file-edit-list-table-cell">
                                                                                <span className="empty-box-icon"></span>
                                                                                <div className="proj-title-list-container">
                                                                                    <div className="blog-category-icon">
                                                                                        {
                                                                                            project?.document_type__type === 'Blog' ? (
                                                                                                <Tooltip title={t("blog_article")} TransitionComponent={Zoom} placement="top" arrow>
                                                                                                    <img src={BlogArticleIcon} alt="blog article icon" />
                                                                                                </Tooltip>
                                                                                            ) : project?.open_as == 'BlogWizard' ? (
                                                                                                <Tooltip title={t("blog_wizard")} TransitionComponent={Zoom} placement="top" arrow>
                                                                                                    <img src={BlogArticleWizardIcon} alt="blog article icon" />
                                                                                                </Tooltip>
                                                                                            ) : (
                                                                                                <img src={Config.BASE_URL + "/app/extension-image/docx"} alt="document" />
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                    <div className="proj-list-info">
                                                                                        <div className="proj-information">
                                                                                            <Tooltip className="dont-open-list" title={project.doc_name} placement="top" arrow>
                                                                                                <span
                                                                                                    className="file-edit-proj-txt-tmx"
                                                                                                >
                                                                                                    {
                                                                                                        project.doc_name
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                            {/* {project?.word_count !== null &&  <span className="word-count-capsule">
                                                                                        <span >{project?.open_as == 'BlogWizard' ? 'Blog wizard' : `${project.word_count} W`}</span>
                                                                                    </span>}
                                                                                   {project?.document_type__type === 'Blog' &&  <span className="word-count-capsule">
                                                                                        <span>Blog article</span>
                                                                                    </span>} */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                <div className="file-edit-translation-txt word-count">

                                                                                    <span className="file-edit-proj-txt-tmx" >
                                                                                        {
                                                                                            Config.getProjectCreatedDate(project?.created_at)
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="file-edit-list-table-cell">
                                                                                <div className="status-conditions-part dont-open-list">
                                                                                    {/* <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                <span className="file-edit-proj-status-txt docs-delete glossary-status mr-4 d-inline" onMouseUp={() => handleDeleteButton(project)}>
                                                                                    <img
                                                                                        src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                        alt="close_black"
                                                                                    />
                                                                                </span>

                                                                            </Tooltip> */}
                                                                                    <Tooltip title={t("open_in_writer")} TransitionComponent={Zoom} placement="top">
                                                                                        <button
                                                                                            style={{
                                                                                                paddingLeft: "30px",
                                                                                                paddingRight: "30px"
                                                                                            }}
                                                                                            className="workspace-files-OpenProjectButton" type="button" onMouseUp={() => project?.open_as == 'BlogWizard' ? history(`/writer-blog/?blog=${project?.id}`, {state: { prevPath: window.location.pathname + window.location.search }}) : openWriterFromDoc(project?.id, project?.doc_name)}>
                                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                    <MoreOptionsIconPDF project={project} deleteOnly={true} from={'doc'} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })}
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
                                                                <h2>{t("no_project_found")}</h2>
                                                                {
                                                                    projectSearchTerm ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                                <button className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => {
                                                                                        // activeToggle(2);
                                                                                        history(
                                                                                            activeProjTab === 1 ? "/create/all-templates" :
                                                                                                activeProjTab === 7 && "/create/tool-kit/pdf/convert-pdf"
                                                                                        );
                                                                                    }}
                                                                                >
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
                                            (
                                                !showEmptyProjects ? (
                                                    <React.Fragment>
                                                        {Array(3)
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
                                                        {/* <div className="project-setup-pagination">
                                                        <ul>
                                                            <li>
                                                                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                                            </li>
                                                            <li>
                                                                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                                            </li>
                                                            <li>
                                                                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                                            </li>
                                                            <li>
                                                                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                                            </li>
                                                        </ul>
                                                    </div> */}
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
                                                                <h2>{t("no_project_found")}</h2>
                                                                {
                                                                    projectSearchTerm ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                                <button className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => {
                                                                                        // activeToggle(2);
                                                                                        history(
                                                                                            activeProjTab === 1 ? "/create/all-templates" :
                                                                                                activeProjTab === 7 && "/create/tool-kit/pdf/convert-pdf"
                                                                                        );
                                                                                    }}
                                                                                >
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
                                            )) :
                                        (
                                            <React.Fragment>
                                                {Array(3)
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
                                                {/* <div className="project-setup-pagination">
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
                                                </div> */}
                                            </React.Fragment>
                                        )
                                    }
                                </>
                                {/* {!showEmptyProjects && (
                                    <React.Fragment>
                                        <section className="ai-no-project-found">
                                            <div className="ai-no-project-cont">
                                                <img
                                                    className="empty-folder-img"
                                                    src={EmptyProjectIcon}
                                                    alt="empty-folder-open"
                                                />
                                                <h2>No projects found</h2>
                                                {
                                                    projectSearchTerm ?
                                                    null
                                                    :
                                                    <>
                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                            <AddNewProjectButton
                                                                onClick={() => {
                                                                    // activeToggle(2);
                                                                    props.history("/create/translate/files/translate-files");
                                                                }}
                                                            >
                                                                <span className="add-new-project-btn">
                                                                    <img src={Config.HOST_URL + "assets/images/new-ui-icons/plus.svg"} alt="plus" /> Create new project
                                                                </span>
                                                            </AddNewProjectButton>
                                                        )}
                                                    </>
                                                }
                                            </div>
                                        </section>
                                    </React.Fragment>
                                )} */}
                            </div>
                        </div>
                        {/* {!showListingLoader && <div className="project-setup-pagination">
                            <ul>{paginationContent}</ul>
                        </div>} */}
                    </div>
                </div>
			</div>
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
                        <img src={CloseBlack} alt="close_black" />
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
                                <img src={StackedBarChartBlue} alt="stacked_bar_chart" />{" "}
                                {selectedProjectName}
                            </span>
                            <span className="word-count-close-btn" onClick={hideWordCountModal}>
                                <img src={CloseBlack} alt="close_black" />
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
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <GlossaryClone
                        setShowCloneModal={setShowCloneModal}
                        showCloneModal={showCloneModal}
                        selectedProjectFiles={selectedProjectFiles}
                        languageOptionsList={targetLanguageOptionsRef.current}
                    />
                </div>
            </Rodal>)}

            {showSrcLangModal && (<Rodal visible={showSrcLangModal} {...modaloption} showCloseButton={false} className="ai-lang-select-modal">
                <div className="lang-modal-header">
                    <h1>{t("select_source_language")}</h1>
                    <span className="modal-close-btn" onClick={() => setshowSrcLangModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <Sourcelanguage
                    sourceLanguage={sourceLanguage}
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
                />
            </Rodal>)}

            {showDurationAlertModal && (<Rodal visible={showDurationAlertModal} {...modaloption} showCloseButton={false} className="ai-large-file-alert-modal">
                <span className="prompt-close-btn" onClick={() => setShowDurationAlertModal(false)}>
                    <img src={CloseBlack} alt="close_black" />
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
                        <img src={CloseBlack} alt="close_black" />
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
                    {(projectAnalysisedData !== null && Object.keys(projectAnalysisedData)?.length !== 0) ?
                        <div className="analysis-body-wrapper">
                            {
                                projectAnalysisedData?.project?.map(each => (
                                    <>
                                        <div className="analysis-proj-name-wrapper">
                                            <h4 className="proj-name">Project: {each.projectInfo?.project_name}</h4>
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
                                                            <img src={ArrowRightAltColor} />
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
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper">
                    <SandClockLoader />
                    {
                        textToSpeechConvert ?
                            <h6 className="text-center">{t("processing_text_1")} <br />{t("please_wait_few_minutes_para")}</h6>
                            : isTranscribing ?
                                <h6 className="text-center">{t("processing_text_2")} <br />{t("please_wait_few_minutes_para")}</h6>
                                : partialPretranslate ?
                                    <h6 className="text-center">{t("processing_text_3")}</h6>
                                    :
                                    <h6 className="text-center">{t("processing_text_4")} <br />{t("please_wait_few_minutes_para")}</h6>
                    }
                </div>
            </Rodal>)}

            {/* modal for task delete */}
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
                                    onClick={() => !isTaskDeleting && taskDeleteFunction()}
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

            {/* {showTaskDeleteAlert && (<Rodal
                visible={showTaskDeleteAlert}
                {...modaloptions}
                showCloseButton={false}
                className={unassignTaskDeleteAlert ? "ai-mark-confirm-box Assign-task-deletion-rodal " : 'ai-mark-confirm-box '}
            >
                <div className={unassignTaskDeleteAlert ? " Assign-task-deletion-model confirmation-warning-wrapper" : "confirmation-warning-wrapper "}>
                    <div className="confirm-top">
                        <div className='close_model_btn'><span onClick={() => { setShowTaskDeleteAlert(false); setUnassignTaskDeleteAlert(false) }}><CloseIcon /></span></div>
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
                            {!unassignTaskDeleteAlert && <Button onClick={() => taskDeleteFunction()} variant="contained">{t("delete")}</Button>}
                        </div>
                    </div>
                </div>
            </Rodal>)} */}

            {/* modal for express project delete */}
            {showExpressDeleteModal && (<Rodal
                visible={showExpressDeleteModal}
                {...modaloptions}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowExpressDeleteModal(false) }}><CloseIcon /></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{t("delete_project_note")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowExpressDeleteModal(false) }}>{t("discard")}</Button>
                            <Button
                                style={isExpressProjectDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                onClick={() => !isExpressProjectDeleting && deleteExpressProject()}
                                variant="contained"
                            >
                                {isExpressProjectDeleting ? (
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

            {/* modal for instant tranlation project edit */}
            {editInstantProjectModal && (<Rodal
                visible={editInstantProjectModal}
                showCloseButton={false}
                className={"edit-instant-project-box " + ((showTarLangModal || showExpressDeleteModal) ? "z-index-reduce" : "z-index-increase")}
            >
                <div className="header-wrapper">
                    <div className="header-text">
                        <EditOutlinedIcon style={{ fontSize: 22, color: "#5F6368" }} />
                        <h1>{t("edit_project")}</h1>
                    </div>
                    <span className="modal-close-btn" onClick={() => setEditInstantProjectModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
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
                                    value={expressProjectName}
                                    placeholder={t("project_name")}
                                    className="ai-sl-tl-btn input"
                                    onChange={(e) => setExpressProjectName(e.target.value)}
                                />

                        }
                    </div>
                    <div className="language-details mb-3">
                        <h2>Source language</h2>
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
                        <h2>Target language <span className="asterik-symbol">*</span></h2>
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
                        <ButtonBase className="instant-edit-delete-btn" onClick={() => setShowExpressDeleteModal(true)}>
                            <img src={AssetsDeleteIcon} alt="close_black" />
                            {t("delete_project")}
                        </ButtonBase>
                        <ButtonBase className="instant-edit-update-btn" onClick={() => { !isExpressUpdating && (targetLanguage?.length !== 0 ? updateExpressProject() : focusTargetLangDiv()) }}>
                            {isExpressUpdating ? t('updating') : t('update')}
                            {isExpressUpdating && <ButtonLoader />}
                        </ButtonBase>
                    </div>
                </div>
            </Rodal>)}
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
                            <Button style={{ opacity: 0 }}>Discard</Button>
                            <Button className="assign_task_del_btn" onClick={() => { SetShowAssignedProjectDeleteAlert(false); }}>{t("close")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
            {navigationModalVisible && (<Rodal
                // visible={navigationModalVisible}
                visible={navigationModalVisible}
                showCloseButton={false}
                onclose={() => console.log()}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setNavigationModalVisible(false) }}><CloseIcon /></span></div>
                        <div>{t("download_progress")}!</div>
                        <div>{t("download_progrss_note")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setNavigationModalVisible(false) }}>{t("close")}</Button>
                            <Button onClick={handleConfirmNavigationClick} variant="contained">{t("ok")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
            {/* <Prompt
                when={isDownloading}
                message={handleBlockedNavigation}
            /> */}
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
            {showTaskReworkReasonModal && (<Rodal
                visible={showTaskReworkReasonModal}
                showCloseButton={false}
                onclose={() => setShowTaskReworkReasonModal(false)}
                className="reason-modal-wrapper"
            >
                <div className="reason-modal-inner-wrapper">
                    <span className="modal-close-btn lang-close" onClick={() => { setShowTaskReworkReasonModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
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
                        <small className="note">{customerTaskReworkReasonText?.trim()?.length}/200</small>
                    </div>
                    <div className="reason-modal-button-wrap">
                        <ButtonBase className="cancel-grey-btn" onClick={() => { setShowTaskReworkReasonModal(false) }}>{t("discard")}</ButtonBase>
                        <ButtonBase
                            className="success-blue-btn"
                            onClick={() => !isReworkSending && clientSideTaskResponseUpdate()}
                            style={customerTaskReworkReasonText?.trim() === '' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                        >
                            {isReworkSending && <ButtonLoader />} {t('send')}
                        </ButtonBase>
                    </div>
                </div>
            </Rodal>)}

            {/* PDF file delete confirmation modal */}
            {showPDFFileDeleteAlertModal && (<Rodal
                visible={showPDFFileDeleteAlertModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper" style={isPDFFileDeleting ? { pointerEvents: 'none' } : {}}>
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowPDFFileDeleteAlertModal(false) }}><CloseIcon /></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{t("delete_file_project")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowPDFFileDeleteAlertModal(false) }}>{t("discard")}</Button>
                            <Button
                                style={isPDFFileDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                onClick={() => !isPDFFileDeleting && deletePDFFile()}
                                variant="contained"
                            >
                                {isPDFFileDeleting ? (
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

            {/* {showPDFFileDeleteAlertModal &&
                (<Rodal
                    visible={showPDFFileDeleteAlertModal}
                    width={520}
                    height={230}
                    onClose={() => console.log()}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowPDFFileDeleteAlertModal(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>{t("delete_file_project")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowPDFFileDeleteAlertModal(false) }}>{t("close")}</Button>
                                <Button onClick={() => deletePDFFile()} variant="contained">{t("delete")}</Button>
                            </div>
                        </div>
                    </div>
                </Rodal>)} */}

            {/* Modal to selecting the project to update the file */}
            {projectUpdateModal && (<Rodal visible={projectUpdateModal} height="min-content" showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>{t("take_file_to_translate")}</h1>
                        <span onClick={(e) => setProjectUpdateModal(false)}><CloseIcon className="close-icon" /></span>
                    </div>
                </div>
                <div className="term-edit-form">
                    <div className="term-edit-form-control">
                        <Radio
                            checked={userTranslateChoice === 'new'}
                            id="new"
                            onChange={() => setUserTranslateChoice('new')}
                            size="small"
                            className="radio-btn"
                        /> <label htmlFor="new" className="assign-manage-radio">{t("create_new_project")}</label>
                        <Radio
                            checked={userTranslateChoice === 'existing'}
                            id="existing"
                            onChange={() => setUserTranslateChoice('existing')}
                            size="small"
                            className="radio-btn"
                        /> <label htmlFor="existing" className="assign-manage-radio">{t('add_exiting_project')}</label>
                    </div>
                    {userTranslateChoice === 'existing' &&
                        <div className="term-edit-form-control">
                            <AsyncPaginate
                                value={selectedProjectToUpdate}
                                loadOptions={loadProjectListOptions}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.project_name}
                                onChange={(selected) => setSelectedProjectToUpdate(selected)}
                                classNamePrefix="steps-select"
                                styles={customStepSelectStyles}
                                components={{ Option, ValueContainerPDF, DropdownIndicator, IndicatorSeparator: () => null }}
                                placeholder={`${t("click_to_select")}...`}
                                debounceTimeout={500}
                                hideSelectedOptions={false}
                                menuPlacement="auto"
                                isSearchable={true}
                                additional={{
                                    page: 1,
                                }}
                            />
                        </div>
                    }
                </div>
                <div className="footer-area-wrapper justify-content-end" style={{ padding: '0px 30px 15px 30px' }}>
                    <div className="term-edit-btn-row">
                        <button className="convert-pdf-list-UploadProjectButton" onMouseUp={handleProceedBtn}>
                            <span className="fileupload-new-btn">
                                {t("proceed")}
                                <ArrowForwardIcon
                                    style={{
                                        fontSize: 15,
                                        color: "#FFFFFF",
                                    }}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </Rodal>)}

            {/* Document file delete confirmation modal */}
            {showDeleteFileModal && (<Rodal
                visible={showDeleteFileModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper" style={isDocumentDeleting ? { pointerEvents: 'none' } : {}}>
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowDeleteFileModal(false) }}><CloseIcon /></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{`${deleteFromDocOrBlog.current === 'doc' ? t('document_delete_note') : t("blog_delete_note")}`}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowDeleteFileModal(false) }}>{t("discard")}</Button>
                            <Button
                                style={isDocumentDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                onClick={() => !isDocumentDeleting && deleteDocument(selectedDocumntId)}
                                variant="contained"
                            >
                                {isDocumentDeleting ? (
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


            {showDeadlineCrossedModal && (
                <Rodal
                    visible={showDeadlineCrossedModal}
                    showCloseButton={false}
                    onClose={() => setShowDeadlineCrossedModal(false)}
                    className="reason-modal-wrapper info-modal"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowDeadlineCrossedModal(false) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("dealine_crossed")}</div>
                            <p>{t("send_request_client")}</p>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowDeadlineCrossedModal(false) }}>{t("close")}</ButtonBase>
                            <ButtonBase
                                className="success-blue-btn"
                                variant="contained"
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
                            <img src={CloseBlack} alt="close_black" />
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
		</React.Fragment>
	)
}

export default DashboardQuickAccess;