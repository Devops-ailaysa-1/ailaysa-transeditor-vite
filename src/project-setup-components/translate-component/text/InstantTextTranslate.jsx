import React, { useState, useEffect, useRef, createFactory, useMemo } from "react";
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Config from "../../../vendor/Config";
import ReactDOM from "react-dom";
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Popover, PopoverBody, PopoverHeader, Collapse } from "reactstrap";
import Breadcrumbs from "../../Breadcrumbs";
import Select, { components } from "react-select";
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DatePicker from "../../../vendor/date-time-picker/DatePicker";
import Targetlanguage from "../../../vendor/lang-modal/Targetlanguage";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Sourcelanguage from "../../../vendor/lang-modal/Sourcelanguage";
import { useTranslation } from 'react-i18next';
import {
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookShareButton
} from "react-share";
import axios from "axios";
import { MessageTypingAnimation } from "../../../loader/MessageTypingAnimation";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { ButtonLoader } from "../../../loader/CommonBtnLoader";
import { SandClockLoader } from "../../../loader/SandClockLoader";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
// import { useSpeechRecognition } from 'react-speech-recognition';
import VoiceEditorInstantTranslate from "./VoiceEditorInstantTranslate";
import TranslateIcon from '@mui/icons-material/Translate';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import NotesIcon from '@mui/icons-material/Notes';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Radio from '@mui/material/Radio';
import { BlueButtonLoader } from './../../../loader/BlueButtonLoader';
import SquareIcon from '@mui/icons-material/Square';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
// import Cursor from "../../../../src/vendor/Cursor.js";
// mui icons
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import MicOff from "@mui/icons-material/MicOff";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { dictationLanguages } from '../../../ailaysa-writer/Writter-componenets/DictationLanguages';
import CircularProgress from '@mui/material/CircularProgress';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import $ from 'jquery';
import { count } from 'letter-count';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import HistoryIcon from '@mui/icons-material/History';
import TextareaAutosize from 'react-textarea-autosize';
import { motion, AnimatePresence } from "framer-motion";
import StraightIcon from '@mui/icons-material/Straight';
import WarningIcon from "@mui/icons-material/Warning";
// import MomentTimePicker from "../../../vendor/date-time-picker/MomentTimePicker";
import MainAssignManage from "../../../vendor/model-select/MainAssignManage";
import generateKey from "../../speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import ArrowRightAltColor from "../../../assets/images/new-ui-icons/arrow_right_alt_color.svg";
import ArrowRightAlt from "../../../assets/images/arrow_right_alt.svg";
import ContentCopy from "../../../assets/images/project-setup/instant-text/content_copy.svg";
import ShareIcon from "../../../assets/images/project-setup/instant-text/share.svg";
import FileDownload from "../../../assets/images/project-setup/instant-text/file_download.svg";
import HowToRegisterIcon from "../../../assets/images/new-ui-icons/how_to_register.svg";
import AssignSymbol from "../../../assets/images/project-setup/instant-text/assign-symbol.svg";
import Spellcheck from "../../../assets/images/new-ui-icons/spellcheck.svg";
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg";
import AssetsDeleteIcon from "../../../assets/images/new-ui-icons/assets-delete-icon.svg";
import EventIcon from "../../../assets/images/project-setup/instant-text/event.svg";
import InsuffientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg";
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg";
import ErrorBlackWarn from "../../../assets/images/new-ui-icons/error_black_warn.svg";
import TranslateGoogleLogo from "../../../assets/images/new-project-setup/translate-google-logo.svg";
import AmazaonTranslator from "../../../assets/images/new-project-setup/amazon-trans.svg";
import NewMicrosoftTranslator from "../../../assets/images/new-project-setup/new-microsoft-translator.svg";
import ImpFileIcon from "../../../assets/images/new-ui-icons/imp-icon-file.svg";
import NoMemberImg from "../../../assets/images/assign-page/no-member-img.png";
import ConfirmIcon from "../../../assets/images/new-ui-icons/confirm-icon.svg";
import sanitizeHtml from 'sanitize-html-react';
import ReactRouterPrompt from 'react-router-prompt';
import useStateWithHistory from "../../../vendor/custom-component/useStateWithHistory";

const InstantTextTranslate = (props) => {
    const { sidebarActiveTab,setSidebarActiveTab,} = props;
    // const {
    //     browserSupportsSpeechRecognition
    // } = useSpeechRecognition();
    const browserSupportsSpeechRecognition = null;

    const { t } = useTranslation();
    const history = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();
    const userDetails = useSelector((state) => state.userDetails.value);    
    const [historyArrState, setHistoryArrState, { historyArr, pointer, back, forward, go }] = useStateWithHistory("")
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    let userSelectionCallTimer = null;
    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor';

    const [navigationModalVisible, setNavigationModalVisible] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [didMount, setDidMount] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [assignBtnLoader, setAssignBtnLoader] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [sourceContentClicked, setSourceContentClicked] = useState(true);
    const [translatedContentClicked, setTranslatedContentClicked] = useState(false);
    const [instantCompareMTVisible, setInstantCompareMTVisible] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState([]);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [sourceLabel, setSourceLabel] = useState(t("source_language"));
    const [targetLabel, setTargetLabel] = useState("");
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [error, setError] = useState({ inputText: "", sourceLanguage: "", targetLanguage: "" });
    const [autoDetectIndication, setAutoDetectIndication] = useState(false);
    const [translateContent, setTranslateContent] = useState("");
    const [mtOptionsSelect, setMtOptionsSelect] = useState([]);
    const [shareIconsPanel, setShareIconsPanel] = useState(false);
    const [downoadPanel, setDownoadPanel] = useState(false);
    const [assignDetailsPanel, setAssignDetailsPanel] = useState(false)
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [unitTypeOptions, setUnitTypeOptions] = useState([]);
    const [currencySelect, setCurrencySelect] = useState(null);
    const [unitTypeSelect, setUnitTypeSelect] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [assignToDrpdown, setAssignToDrpdown] = useState(false);
    const [assignedEditorSwitch, setAssignedEditorSwitch] = useState(1);
    const [shareCommonUrl, setShareCommonUrl] = useState(" ");
    const [translatedtextmodified, setTranslatedtextmodified] = useState(false);
    const [mtpeEngines, setMtpeEngines] = useState([]);
    const [allLangDetailsList, setAllLangDetailsList] = useState(null);
    const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
    const [commonSrcValue, setCommonSrcValue] = useState(null);
    const [commonTarValue, setCommonTarValue] = useState(null);
    const [commonMtpeEngine, setCommonMtpeEngine] = useState(null);
    const [selectedMTEngine, setSelectedMTEngine] = useState(null);
    const [mtEngineLable, setMtEngineLable] = useState("");
    const [showSettings, setshowSettings] = useState(false);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [createdProject, setCreatedProject] = useState(null);
    const [languageListOptions, setLanguageListOptions] = useState(null);
    const [showIndividualAssignManage, setShowIndividualAssignManage] = useState(false);
    const [selectedLanguageSwitch, setSelectedLanguageSwitch] = useState(null);
    const [translatedText, setTranslatedText] = useState(null);
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [clickedOpenButton, setClickedOpenButton] = useState(null);
    const [targetInputBox, setTargetInputBox] = useState(null);
    const [browserName, setBrowserName] = useState(null);   
    const [hasFocus, setHasFocus] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const [projectName, setprojectName] = useState(null);
    const translatedtrue = useRef(false);
    const [documentId, setDocumentId] = useState(null);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const [jobId, setJobId] = useState(null);
    const [partialOutput, setPartialOutput] = useState(null);
    const [sourceApplyToAll, setSourceApplyToAll] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyTriggered, setIsStickyTriggered] = useState(false);
    // const [isOpenFromList, setisOpenFromList] = useState(false);
    //   const [isListening, setIsListening] = useState(false);
    // Assign editor states
    const [selectedEditor, setSelectedEditor] = useState(null);
    const [isForcePickerOpen, setIsOpen] = useState(false);
    const [unitRate, setUnitRate] = useState(null);
    const [estimatedHours, setEstimatedHours] = useState(null);
    const [internalEditors, setInternalEditors] = useState(null);
    const [externalEditors, setExternalEditors] = useState(null);
    const [isTaskAssigned, setIsTaskAssigned] = useState(false);
    const [taskAssignDetails, setTaskAssignDetails] = useState(null);
    const [userSubscriptionName, setUserSubscriptionName] = useState(null);
    const [taskId, setTaskId] = useState(null);
    const [translatedTextTab, setTranslatedTextTab] = useState(1);                                                                                                                                                                                                               const [isFunctionButtonsVisible, setIsFunctionButtonsVisible] = useState(false);
    const [editorName, setEditorName] = useState(null);
    const [editorId, setEditorId] = useState(null);
    const [isInternalEditor, setIsInternalEditor] = useState(false);
    const [hasTeam, setHasTeam] = useState(false);
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [newTargetLanguages, setNewTargetLanguages] = useState([]);
    const [editJobs, setEditJobs] = useState([]);
    const [editorRates, setEditorRates] = useState(null);
    const [validationState, setValidationState] = useState({projectName: false, });
    const [editProjectId, setEditProjectId] = useState(null);
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null);
    const [isEditorAilaysa, setIsEditorAilaysa] = useState(false);
     // NLP feature states
    const [enableSynonym, setEnableSynonym] = useState(false);
    const [enableParaphrase, setEnableParaphrase] = useState(false);    
    const [synonymPopoverOpen, setSynonymPopoverOpen] = useState(false);
    const [synonymPopoverTarget, setSynonymPopoverTarget] = useState("");
    const [synonymsResList, setSynonymsResList] = useState([]);
    const [synonymText, setSynonymText] = useState(null);
    const [paraphraseText, setParaphraseText] = useState("");
    const [paraphrasePopoverTarget, setParaphrasePopoverTarget] = useState("");
    const [paraphrasePopoverOpen, setParaphrasePopoverOpen] = useState(false);
    const [paraphraseResList, setParaphraseResList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [changesSaved, setChangesSaved] = useState(true);
    const [savedTargetData, setSavedTargetData] = useState(null);
    const [mtResponses, setMTResponses] = useState(null);
    const [processing, setProcessing] = useState(false);    // for compare mt loading
    const [selectedMtType, setSelectedMtType] = useState(1); // 1 for google engine : 2 for microsoft : 3 for amazon
    const [sourceTextLength, setSourceTextLength] = useState(0);
    const [compareMTLoader, setCompareMTLoader] = useState(false);
    const [isMainMtChanged, setIsMainMtChanged] = useState(false);
    const [isSourceTextChanged, setIsSourceTextChanged] = useState(false);
    const [showSourceChangeConfimationModal, setShowSourceChangeConfimationModal] = useState(false);
    const [selectedSrcDictationLang, setSelectedSrcDictationLang] = useState({ label: "English (India)", value: "en-IN" });
    const [selectedTarDictationLang, setSelectedTarDictationLang] = useState({ label: "English (India)", value: "en-IN" });
    const [assignInstructionText, setAssignInstructionText] = useState('');
    const [additionalFiles, setAdditionalFiles] = useState([]);
    const [additionalFilesFromApi, setAdditionalFilesFromApi] = useState([]);
    const [dictationLanguageOptions, setDictationLanguageOptions] = useState(null);
    const [isSourceTextLoading, setIsSourceTextLoading] = useState(false);
    const [sourceText, setSourceText] = useState('');
    const [editedTargetLanguage, setEditedTargetLanguage] = useState([]);
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [isCustomizationProcessing, setIsCustomizationProcessing] = useState(false);
    const [languagesPairs, setLanguagePairs] = useState("");
    const [isContentPostedited, setIsContentPostedited] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isConfirmContinue, setIsConfirmContinue] = useState(false);
    const [isSrcListening, setIsSrcListening] = useState(false);
    const [isTarListening, setIsTarListening] = useState(false);
    const [partialCompareMt, setPartialCompareMt] = useState(false);
    const [taskInsufficientCredit, setTaskInsufficientCredit] = useState(false);
    const [translationHistoryList, setTranslationHistoryList] = useState([]);
    const [historyDrawerShow, setHistoryDrawerShow] = useState(false);
    const [historyContentLoader, setHistoryContentLoader] = useState(false);
    const [isSrcTextEmpty, setIsSrcTextEmpty] = useState(false);
    const [isTarTextEmpty, setIsTarTextEmpty] = useState(false);
    const [historySrcShowMore, setHistorySrcShowMore] = useState([]);
    const [historyTarShowMore, setHistoryTarShowMore] = useState([]);
    const [showSourceEditDisableAlert, setShowSourceEditDisableAlert] = useState(false);
    const [showSourceEditPermissionAlert, setShowSourceEditPermissionAlert] = useState(false);
    const [showEditorAssignModal, setShowEditorAssignModal] = useState(false);    
    const [spellCheckSuggestion, setSpellCheckSuggestion] = useState([]);    
    // const [translateResultText, setTranslateResultText] = useState('');
    const [isSpellCheckEnable, setIsSpellCheckEnable] = useState(true);
    const [spellcheck, setSpellcheck] = useState(false);
    const [enableSpellCheck, setEnableSpellCheck] = useState(false);
    const [replaceContentUsedIds, setReplaceContentUsedIds] = useState([]);
    const [popoverTarget, setPopoverTarget] = useState(null);
    const [spellCheckPopoverContent, setSpellCheckPopoverContent] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [isWordsCorrected, setIsWordsCorrected] = useState(false);
    const [isWordsCorrectedTrigger, setIsWordsCorrectedTrigger] = useState(false);
    const [popoverContentSwitch, setPopoverContentSwitch] = useState(false);
    const [selectedCustomization, setSelectedCustomization] = useState(null);
    const [popupLoading, setPopupLoading] = useState('none');
    const [selectionString, setSelectionString] = useState(null);
    const [translateResultText, setTranslateResultText] = useState('');
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
    const [showAssignIcon, setShowAssignIcon] = useState(false);
    const [spellCheckWordsOptions, setSpellCheckWordsOptions] = useState([]);    
    const [rectElement, setRectElement] = useState(null);
    // const [showmodelwarning,setShowmodelwarning]=useState(false);

    const checkform = useRef(false);
    const instantFeatureStickyRef = useRef(null);
    const instantTranslatedRef = useRef(null);
    const projectNameRef = useRef(null);
    const shareRowPanelOutside = useRef();
    const downloadPanelOutside = useRef(null);
    const textareaRef = useRef();
    const assignDrpdownOutside = useRef();
    const projectQuickSetup = useRef(true);
    const searchAreaRef = useRef(null);
    const targetLanguageOptionsRef = useRef([]);
    const translatedTextDivRef = useRef(null);
    const secondWordRef = useRef(null);
    const selectedText = useRef(null);
    const synonymPopoverRef = useRef(null); 
    const sourceLangIdRef = useRef(null);
    const targetLangIdRef = useRef(null);
    const currencyOptionsRef = useRef(null);
    const unitTypeOptionRef = useRef(null);
    const mtpeEngineRef = useRef(null);
    const isOpenFromList = useRef(false);
    const isEditRef = useRef(false);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const assignSettingDivRef = useRef(null);
    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const downloadref = useRef(null);
    const prevPageInfo = useRef(null);
    const lastFunctionCall = useRef(null);
    const mtEngineOptionsRef = useRef(null);
    const sourceLangRef = useRef(null);
    const summernoteEditorRef = useRef(null);
    const sourceSummernoteRef = useRef(null);
    const taskDataFromApi = useRef(null);
    const taskInsufficientCreditRef = useRef(undefined);
    const from = useRef('instant');
    const autoDetectFireEnable = useRef(true);
    const editJobRef = useRef(null);
    const enableassignrow = useRef(false);
    const updateBtnRef = useRef(null);
    const historyPerPage = useRef(2);
    const spellCheckResponseRef = useRef([]);
    const srcDivRef = useRef(null);
    const tarDivRef = useRef(null);
    const copyTarDivRef = useRef(null);
    const maxLength = useRef(0);    
    const caretRange = useRef(null);    
    const spellCheckData = useRef([]);    
    const temptaskid = useRef();
    const selectedFileRow = useRef(null);
    const sourceDisableAlertTimeout = useRef(null);
    const sourcePermissionAlertTimeout = useRef(null);    
    const clickedWrongWordRef = useRef(null) ;
    const clickedMarkEleRef = useRef(null);
    const isSpellcheckAvailableRef = useRef(null); 
    /* API Connections as follows*/

    const header = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
    };

    // useEffect(() => {
    //     const options = {
    //       root: null, // viewport
    //       rootMargin: '0px',
    //       threshold: [0, 1] // partially or completely visible
    //     };

    //     const callback = (entries) => {
    //       entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //           // Div is sticky
    //           setIsStickyTriggered(true);
    //         } else {
    //           // Div is not sticky
    //           setIsStickyTriggered(false);
    //         }
    //       });
    //     };

    //     const observer = new IntersectionObserver(callback, options);
    //     if (instantFeatureStickyRef.current) {
    //         observer.observe(instantFeatureStickyRef.current);
    //     }

    //     // Clean up the observer
    //     return () => {
    //         if (instantFeatureStickyRef.current) {
    //             observer.unobserve(instantFeatureStickyRef.current);
    //         }
    //     };
    //   }, []);
   
    const indianLanguages = [
        {
            "id": 91,
            "language": "Bengali",
            "created_at": "2021-07-19T15:15:41.742000Z",
            "updated_at": "2021-10-18T08:41:15.065363Z"
        },
        {
            "id": 28,
            "language": "Gujarati",
            "created_at": "2021-07-19T15:15:41.272000Z",
            "updated_at": "2021-07-19T15:15:41.272000Z"
        },
        {
            "id": 32,
            "language": "Hindi",
            "created_at": "2021-07-19T15:15:41.300000Z",
            "updated_at": "2021-07-19T15:15:41.300000Z"
        },
        {
            "id": 40,
            "language": "Kannada",
            "created_at": "2021-07-19T15:15:41.370000Z",
            "updated_at": "2021-07-19T15:15:41.370000Z"
        },
        {
            "id": 53,
            "language": "Malayalam",
            "created_at": "2021-07-19T15:15:41.446000Z",
            "updated_at": "2021-07-19T15:15:41.446000Z"
        },
        {
            "id": 55,
            "language": "Marathi",
            "created_at": "2021-07-19T15:15:41.461000Z",
            "updated_at": "2021-07-19T15:15:41.461000Z"
        },
        {
            "id": 58,
            "language": "Nepali",
            "created_at": "2021-07-19T15:15:41.479000Z",
            "updated_at": "2021-07-19T15:15:41.479000Z"
        },
        {
            "id": 59,
            "language": "Odia",
            "created_at": "2021-07-19T15:15:41.482000Z",
            "updated_at": "2021-10-18T08:47:44.666554Z"
        },
        {
            "id": 64,
            "language": "Punjabi",
            "created_at": "2021-07-19T15:15:41.526000Z",
            "updated_at": "2021-07-19T15:15:41.526000Z"
        },
        {
            "id": 101,
            "language": "Sindhi",
            "created_at": "2021-07-19T15:15:41.833000Z",
            "updated_at": "2021-07-19T15:15:41.833000Z"
        },
        {
            "id": 83,
            "language": "Urdu",
            "created_at": "2021-07-19T15:15:41.681000Z",
            "updated_at": "2021-07-19T15:15:41.681000Z"
        },
        {
            "id": 77,
            "language": "Tamil",
            "created_at": "2021-07-19T15:15:41.632000Z",
            "updated_at": "2021-07-19T15:15:41.632000Z"
        },
        {
            "id": 79,
            "language": "Telugu",
            "created_at": "2021-07-19T15:15:41.646000Z",
            "updated_at": "2021-07-19T15:15:41.646000Z"
        }
    ];

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
            width: "max-content",
            minWidth: "100%",
            zIndex: 11,
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
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            height: 39,
            width: "175px",
            // minWidth: "100%",
            "&:hover": {
                color: "#0078D4",
                cursor: 'pointer'
            },
        }),
    };

    const customlangSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#3C4043" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                color: "#0078D4",
            },
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "max-content",
            minWidth: "100%",
            zIndex: 11
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
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            height: 39,
            width: "140px",
            // minWidth: "100%",
            "&:hover": {
                background: "#EBEBEB",
                cursor: 'pointer'
            },
        }),
    };

    const customSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#3C4043" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "300px",
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
            fontSize: "12px",
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
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            height: 32,
            width: "135px",
            // minWidth: "100%",
            "&:hover": {
                background: "#EBEBEB"
            },
        }),
    };

    const customUnitTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#3C4043" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
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
            fontSize: "12px",
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
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            height: 32,
            width: "135px",
            // minWidth: "100%",
            "&:hover": {
                background: "#EBEBEB"
            },
        }),
    };

    const hideSettingsModal = () => setshowSettings(false);

    const modaloption = {
        closeMaskOnClick: false,
        width: !showEditorAssignModal ? 450 : 'auto',
        height: !showDeleteConfirmationModal ? 300 : 'auto',
        onClose: hideSettingsModal,
    };

    const modaloptions = {
        closeMaskOnClick: false,
        width: navigationModalVisible ? 520 : null,
        height: navigationModalVisible ? 240 : 'auto',
        onClose: hideSettingsModal,
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 604,
        height: 'auto',
        onClose: hideSettingsModal,
    };
   
    useEffect(() => {
        const escFunctionClose = (e) => {
            if (e.which === 27) {
                setHistoryDrawerShow(false);
            }
        };
        window.addEventListener("keydown", escFunctionClose);
        return () => {
            window.removeEventListener("keydown", escFunctionClose);
        };
    });

    // initial focus on source textarea
    useEffect(() => {
        if (!isOpenFromList.current) {
            srcDivRef.current.focus();
        }
    }, [srcDivRef.current]);

    useEffect(() => {
        if (isTaskAssigned) {
            srcDivRef.current?.blur();
            tarDivRef.current?.focus();
            setTranslatedContentClicked(true);
            setSourceContentClicked(false);
        }
    }, [isTaskAssigned]);

    useEffect(() => {
        if (editorRates !== null) {
            setCurrencySelect(editorRates[0]?.currency !== null ? currencyOptionsRef.current?.find(each => each.value === editorRates[0]?.currency) : "");
            setUnitTypeSelect(editorRates[0]?.mtpe_count_unit !== null ? unitTypeOptions.find((element) => element.value === editorRates[0]?.mtpe_count_unit) : "");
            setUnitRate(editorRates[0]?.mtpe_rate !== null ? editorRates[0]?.mtpe_rate : "");
            setEstimatedHours(2);
        }
    }, [editorRates])

    useEffect(() => {
        if (unitTypeSelect?.label === 'Hour' && editorRates !== null) {
            setUnitRate(editorRates?.find(each => each?.currency === currencySelect?.value)?.hourly_rate);
            setEstimatedHours(2);
        } else if (unitTypeSelect?.label === 'Fixed') {
            setUnitRate(editorRates?.find(each => each?.currency === currencySelect?.value)?.mtpe_rate);
        } else {
            if (lastFunctionCall.current !== 'getAilaysaServiceRate') {
                setUnitRate(null);
            }
        }
    }, [unitTypeSelect]);


    useEffect(() => {
        if (currencySelect !== null && editorRates !== null && !isEditorAilaysa) {
            let currentCurrencyDict = editorRates?.find(each => each?.currency === currencySelect?.value);
            if (currentCurrencyDict != undefined) {
                // setCurrencySelect(editorRates[0]?.currency !== null ? currencyOptionsRef.current?.find(each => each.value === editorRates[0]?.currency) : "");
                setUnitTypeSelect(currentCurrencyDict?.mtpe_count_unit !== null ? unitTypeOptionRef.current.find((element) => element.value === currentCurrencyDict?.mtpe_count_unit) : "");
                setUnitRate(currentCurrencyDict?.mtpe_rate !== null ? currentCurrencyDict?.mtpe_rate : "");
                setEstimatedHours(2);
            } else {
                setUnitTypeSelect(null);
                setUnitRate("");
                setEstimatedHours("");
            }
        }
    }, [currencySelect]);

    
    useEffect(() => {
        if (taskAssignDetails !== null && selectedTaskDetails !== null) {
            if (taskAssignDetails?.length !== 0) {
                taskAssignDetails?.map(eachRole => {
                    if (Config.userState?.id !== eachRole?.assign_to_details?.id) {
                        setIsFunctionButtonsVisible(true);
                    }
                })
            }
        }
    }, [taskAssignDetails, selectedTaskDetails]);
    
    useEffect(() => {
        if (showEditorAssignModal) {
            assignSettingDivRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [showEditorAssignModal]);

    useEffect(() => {
        let source_language = sourceLanguage;
        let target_language = targetLanguage[0]?.id;
        let sourceData = getLanguageNameFromId(source_language, targetLanguageOptionsRef.current);
        let targetData = getLanguageNameFromId(target_language, targetLanguageOptionsRef.current);
        let sourceParam = { source_id: sourceData?.id, source_language: sourceData?.language };
        let targetParam = { target_id: targetData?.id, target_language: targetData?.language };
        setLanguagePairs(`${Config.MARKETPLACE_HOST}find-editor?source-language=${JSON.stringify(sourceParam)}&target-language=${JSON.stringify(targetParam)}`);
    }, [sourceLanguage, targetLanguage]);


    useEffect(() => {
        if(spellCheckWordsOptions?.length !== 0){
            highlightSpellCheckWords();
        }
    }, [spellCheckWordsOptions]);

    useEffect(() => {
        window.addEventListener('mousemove', getMouseMoveCoordinates);
        document?.addEventListener('click', handleWrongWordClick);        
        return () => {
            window.removeEventListener('mousemove', getMouseMoveCoordinates);
            document.removeEventListener('click', handleWrongWordClick);
            // window.removeEventListener('resize', handleWrongWordClick);
        }
    }, [])
    
    useEffect(() => {
        if(clickedWrongWordRef.current !== null){
            window.addEventListener('resize', setPopOnPosition);          
            return () => {
                window.removeEventListener('resize', setPopOnPosition);
            }
        }
    }, [clickedWrongWordRef.current]);

    useEffect(() => {
        if (!showIndividualAssignManage && taskId !== null) {
            getTaskAssignInfo(taskId);
        }
    }, [showIndividualAssignManage]);
    
    useEffect(() => {
        if (languageListOptions !== null) {
            setSelectedLanguageSwitch(languageListOptions[0]);
        }
    }, [languageListOptions]);

    useEffect(() => {
        if (selectedLanguageSwitch !== null) {
            if(selectedLanguageSwitch?.value !== undefined){
                getTranslatedTextByTaskId(selectedLanguageSwitch?.value);
            }
            setIsMainMtChanged(false);
            // getTaskAssignInfo(selectedLanguageSwitch?.value);
            setIsCustomizationProcessing(true);
            setIsSourceTextLoading(true);
            setTaskId(selectedLanguageSwitch?.value);
            temptaskid.current = selectedLanguageSwitch?.value;
        }
    }, [selectedLanguageSwitch]);

    
    // detect if any changes in target languages
    useEffect(() => {
        if (editedTargetLanguage?.length !== 0) {
            let a = [];
            editJobs?.forEach((each) => {
                if (each?.target_language !== null) {
                    editedTargetLanguage?.map((b) => {
                        if (b?.id === each?.target_language) {
                            a.push(each?.id);
                        }
                    });
                }
            });
            let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
            let arr1 = editedTargetLanguage?.filter(o1 => !editJobs?.some(o2 => o1.id === o2.target_language));
            setNewTargetLanguages(arr1);
            setTargetLangListToRemove(targetLangToRemove);
        }
    }, [editedTargetLanguage]);

    // for open task case 
    useEffect(() => {
        if (
            URL_SEARCH_PARAMS.get("project") &&
            URL_SEARCH_PARAMS.get("task") && targetLanguageOptionsRef.current?.length !== 0
        ) {
            let projectId = URL_SEARCH_PARAMS.get("project");
            let task_id = URL_SEARCH_PARAMS.get("task");
            isOpenFromList.current = true;
            setIsSourceTextLoading(true);
            setIsCustomizationProcessing(true);
            if(task_id !== undefined && task_id !== null){
                getTranslatedTextByTaskId(task_id);
            }
            setTaskId(task_id);
            temptaskid.current = task_id;
        }
    }, [targetLanguageOptionsRef.current]);

    // for open task case 
    useEffect(() => {
        if (URL_SEARCH_PARAMS.get("project") && URL_SEARCH_PARAMS.get("task") === null && targetLanguageOptionsRef.current?.length !== 0) {
            let projectId = URL_SEARCH_PARAMS.get("project");
            vendorDashboard(projectId);
            editExpressProject(projectId);
        }
    }, [targetLanguageOptionsRef.current, URL_SEARCH_PARAMS.get("project")]);

    useEffect(() => {
        if (location.state?.filename !== undefined) {
            setprojectName(location.state?.filename);
            projectNameRef.current.innerText = location.state?.filename;
            projectNameRef.current?.blur();
        }
        if (location.state?.prevPageInfo) {
            prevPageInfo.current = location.state?.prevPageInfo;
        }
    }, [location.state]);
    
    useEffect(() => {
        alreadySelecetedTarLangID.length !== 0 &&
            removeAlreadySelectedTargetlanguage();
    }, [alreadySelecetedTarLangID]);

    useEffect(() => {
        let scrollingDiv = document.querySelector('.ai-new-project-setup-wrapper')
        if (scrollingDiv) handleScroll();
        scrollingDiv?.addEventListener('scroll', handleScroll);
        return () => {
            scrollingDiv?.removeEventListener('scroll', handleScroll);
        };
    }, [document.querySelector('.ai-working-col-wrapper')]);

    useEffect(() => {
        if (translateResultText) {
            // based on the target content length decide whether it should be stick or not
            handleScroll();
            debounce(symSpellCheck);
        }
    }, [translateResultText]);

    useEffect(() => {
        if (selectedTaskDetails !== null && (userDetails?.agency ? selectedTaskDetails?.task_data?.task_reassign_info === null : selectedTaskDetails?.task_data?.task_assign_info === null)) {
            setShowAssignIcon(true);
        }
        if (editorId !== null && selectedTaskDetails !== null) {
            if (
                userDetails?.pk != editorId ||
                (
                    (selectedTaskDetails?.task_data?.assignable && userDetails?.agency && !is_internal_meber_editor) &&
                    (selectedTaskDetails?.task_data?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 1 && each.task_ven_status === 'task_accepted' && each.task_assign_detail.task_status !== 'Completed' && each.task_assign_detail.task_status !== 'Return Request')))
                )
            ) {
                setShowAssignIcon(true);
            }
        }
    }, [selectedTaskDetails, editorId]);

    useEffect(()=>{
        if(taskId != null){
            spellCheckAvailability();
        }
    },[taskId]);

    useEffect(() => {
        setTranslateResultText('')
        copyTarDivRef.current.innerHTML = '';
        let scrollingDiv = document.querySelector('.ai-working-col-wrapper');
        scrollingDiv.scrollTo({ top: 0 });
        if (translatedTextTab === 1) {
            let tarPTag2 = document.createElement('p');
            tarPTag2.innerHTML = translatedText?.target_text?.replace(/\n/g, "<br />") == undefined ? sanitizeHtml('') : sanitizeHtml(translatedText?.target_text?.replace(/\n/g, "<br />"));
            // summernoteEditorRef.current?.summernote('code', tarPTag2);
            // tarDivRef.current.value = translatedText?.target_text == undefined ? '' : translatedText?.target_text;
            setTranslateResultText(translatedText?.target_text == undefined ? '' : translatedText?.target_text);
            copyTarDivRef.current.innerHTML = translatedText?.target_text == undefined ? '' : translatedText?.target_text;
            if (tarDivRef.current?.value?.length !== 0) {
                setIsTarTextEmpty(false);
            }
        } else {
            expressCustomization();
        }
    }, [translatedTextTab])

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            history(lastLocation.pathname);
        }
    }, [confirmedNavigation, history, lastLocation]);

    useEffect(() => {
        setShowEditorAssignModal(false);
    }, [selectedLanguageSwitch]);

    useEffect(() => {
        setConfirmedNavigation(false);
        if ((srcDivRef.current.value?.length !== 0 && sourceLanguage && targetLanguage)) {
            checkform.current = true;
        }
        else {
            checkform.current = false;
        }
    }, [translateContent, sourceLanguage, targetLanguage]);    

    useEffect(() => {
        if (autoDetectIndication) {
            setTimeout(() => {
                setAutoDetectIndication(false);
            }, 10000);
        }
    }, [autoDetectIndication]);

    useEffect(() => {
        if (sourceText?.trim() !== '' && autoDetectFireEnable.current) {
            if (isOpenFromList.current == false && URL_SEARCH_PARAMS.get("project") == null) {
                debounce(detectSourceLanguage);
            }
        }
    }, [sourceText]);

    useEffect(() => {
        detectBrowserName();
    }, []);

    // useEffect(() => {
    //     var trap = false;
    //     $('.summernote').summernote({
    //         callbacks: {
    //             onPaste: function (e) {
    //                 if (document.queryCommandSupported("insertText")) {
    //                     var text = $(e.currentTarget).html();
    //                     var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
    //                     setTimeout(function () {
    //                         document.execCommand('insertText', false, bufferText);
    //                     }, 10);
    //                     e.preventDefault();
    //                 } else { //IE
    //                     var text = window.clipboardData.getData("text")
    //                     if (trap) {
    //                         trap = false;
    //                     } else {
    //                         trap = true;
    //                         setTimeout(function () {
    //                             document.execCommand('paste', false, text);
    //                         }, 10);
    //                         e.preventDefault();
    //                     }
    //                 }
    //             },
    //             onChange:function (e){
    //                 // debounced(getspellcheck);
    //             },
    //             onEnter: function() {
    //             },
    //             onImageUpload: function (data) {
    //                 data.pop();
    //             },
    //         },
    //         disableDragAndDrop: true,
    //         disableGrammar: true,
    //         spellCheck: false,
    //         toolbar: false,
    //         focus: true,
    //         styleTags: [
    //             'p', { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' }

    //             , 'h1', 'h2', 'h3'
    //         ],
    //     });
    //     $('.dropdown-toggle').dropdown();
    //     $('.summernote').summernote({
    //         disableResizeEditor: true,
    //     });

    //     summernoteEditorRef.current = $('.summernote')
    //     $('.note-statusbar').hide();
    //     // $('#summernote').summernote('PasteHTML','<p></p>');
    //     $('.summernote').summernote('focus');
    //     $('.summernote').summernote('removeModule', 'autoLink');
    // }, [])

    // source summernote
    // useEffect(() => {
    //     var trap = false;
    //     $('.src-summernote').summernote({
    //         callbacks: {
    //             onPaste: function (e) {
    //                 if (document.queryCommandSupported("insertText")) {
    //                     var text = $(e.currentTarget).html();
    //                     var t = e.currentTarget.innerText;
    //                     var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
    //                     var maxPaste = bufferText.length;
    //                     if(t.length + bufferText.length > 5000){
    //                         maxPaste = 5000 - t.length;
    //                     }
    //                     if(maxPaste > 0){
    //                         setTimeout(function () {
    //                             document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
    //                         }, 10);
    //                         // document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
    //                     }

    //                     e.preventDefault();
    //                 } else { //IE
    //                     var text = window.clipboardData.getData("text")
    //                     if (trap) {
    //                         trap = false;
    //                     } else {
    //                         trap = true;
    //                         setTimeout(function () {
    //                             document.execCommand('paste', false, text);
    //                         }, 10);
    //                         e.preventDefault();
    //                     }
    //                 }
    //             },
    //             onKeydown: function (e) { 
    //                 var t = count(e.currentTarget.innerText.replace(/\n/g, ''))?.chars
    //                 if (t > 4999) {
    //                     //delete keys, arrow keys, copy, cut, select all
    //                     if (e.keyCode != 8 && !(e.keyCode >=37 && e.keyCode <=40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 86 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
    //                         e.preventDefault();
    //                 }
    //             },
    //             onChange: function(e) {
    //                 setSourceTextLength(count(document.querySelector('.note-editable').innerText.replace(/\n/g, ''))?.chars);
    //                 if(document.querySelector('.note-editable').innerText?.length === 0){
    //                     // autoDetectFireEnable.current = true;
    //                 }
    //                 // setSourceText(document.querySelector('.note-editable').innerText);

    //                 if(getSummerNotePlainText(sourceSummernoteRef.current)?.replace(/\n/g, "")?.replace(/\r/g, "") !== taskDataFromApi.current?.source_text?.replace(/\n/g, "")?.replace(/\r/g, "")){
    //                     setIsSourceTextChanged(true);
    //                 }else{
    //                     setIsSourceTextChanged(false);
    //                 }
    //             },
    //             onImageUpload: function (data) {
    //                 data.pop();
    //             },
    //         },
    //         disableDragAndDrop: true,
    //         disableGrammar: true,
    //         spellCheck: false,
    //         toolbar: false,
    //         focus: true,
    //         styleTags: [
    //             'p', { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' }

    //             , 'h1', 'h2', 'h3'
    //         ],
    //     });
    //     $('.dropdown-toggle').dropdown();
    //     $('.src-summernote').summernote({
    //         disableResizeEditor: true
    //     });

    //     sourceSummernoteRef.current = $('.src-summernote')
    //     $('.note-statusbar').hide();
    //     // $('#summernote').summernote('PasteHTML','<p></p>');
    //     $('.src-summernote').summernote('focus');
    //     $('.src-summernote').summernote('removeModule', 'autoLink');
    // }, [])

    useEffect(() => {
        setMtOptionsSelect(mtpeEngineOptions[0])
    }, [mtpeEngineOptions]);

    useEffect(() => {
        if (targetLanguage || editedTargetLanguage) {
            let list = "";
            if (createdProject) {
                if (editedTargetLanguage !== '') {
                    editedTargetLanguage?.map((each, index) => {
                        list += `${each?.language}${index !== editedTargetLanguage?.length - 1 ? ", " : ""}`;
                    });
                }
            } else {
                targetLanguage?.map((each, index) => {
                    list += `${each?.language}${index !== targetLanguage?.length - 1 ? ", " : ""}`;
                });
            }
            setTargetLanguageListTooltip(list);
        }
    }, [targetLanguage, targetLanguageOptionsRef.current, editedTargetLanguage]);

    useEffect(() => {
        setDidMount(true); //Component mounted
        getSourceLanguages();
        getCurrencyOptions();
        getUnitTypeOptions();
        getAllLangDetailsList();
        getMtEngines();
        getUserPlanDetails();
        getCreditStatus();
        let tempDictateLang = []
        dictationLanguages?.map(each => {
            tempDictateLang.push({
                value: each.code,
                label: each.name
            });
        });
        setDictationLanguageOptions(tempDictateLang);
    }, []);

    /* Check for clicing outside of the social panel */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareRowPanelOutside.current && !shareRowPanelOutside.current.contains(e.target)) {
                setShareIconsPanel(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the download panel */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (downloadPanelOutside.current && !downloadPanelOutside.current.contains(e.target)) {
                setDownoadPanel(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the Assign dropdown panel */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignDrpdownOutside.current && !assignDrpdownOutside.current.contains(e.target)) {
                setAssignToDrpdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    // mt-engine filter =========================================================
    useEffect(() => {
        const sourceFilter = allLangDetailsList?.filter(
            (each) => each?.language === sourceLanguage
        );
        const srcTranslateFilterRes = sourceFilter?.filter(
            (each) => each?.translate === true
        );
        let sortedSrcMtpe = srcTranslateFilterRes?.map((each) => {
            return each?.mtpe_engines;
        });
        setCommonSrcValue(sortedSrcMtpe);
        // remove the source language from the target language list
        setTargetLanguageOptions(targetLanguageOptionsRef.current?.filter(each => each.id !== sourceLanguage))
        if (targetLanguage !== '') {
            setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage));
        }
        // if(sourceSummernoteRef.current !== null){
        //     if(targetLanguage[0]?.id === 4 || targetLanguage[0]?.id === 31 || targetLanguage[0]?.id === 83 || targetLanguage[0]?.id === 31
        //         || targetLanguage[0]?.id === 60 || targetLanguage[0]?.id === 101 || targetLanguage[0]?.id === 88 || targetLanguage[0]?.id === 106){      
        //         document.querySelector('.ai-text-translate-work-container .source-summernote .note-editor.card .note-editable')
        //             .style = 'direction: rtl !important; text-align: right !important;' 
        //     } else{
        //         document.querySelector('.ai-text-translate-work-container .source-summernote .note-editor.card .note-editable')
        //             .style = 'direction: ltr !important; text-align: left !important;' 
        //     }
        // }
        if (sourceLanguage === 4 || sourceLanguage === 31 || sourceLanguage === 83 || sourceLanguage === 31
            || sourceLanguage === 60 || sourceLanguage === 101 || sourceLanguage === 88 || sourceLanguage === 106) {
            srcDivRef.current.style.setProperty("direction", "rtl");
            srcDivRef.current.style.setProperty("text-align", "right");
        } else {
            srcDivRef.current.style.setProperty("direction", "ltr");
            srcDivRef.current.style.setProperty("text-align", "left");
        }
    }, [sourceLanguage]);

    useEffect(() => {
        let targetArr = [];
        for (let i = 0; i < targetLanguage?.length; i++) {
            targetArr?.push(
                allLangDetailsList?.filter(
                    (each2) => each2?.language === targetLanguage[i]?.id
                )
            );
        }
        const tarTranslateFilter = targetArr?.map((each) => {
            return each?.filter((eachTargetArr) => eachTargetArr?.translate === true);
        });
        let sortedTarMtpe = tarTranslateFilter?.map((each) => {
            return each.map((each2) => {
                return each2?.mtpe_engines;
            });
        });
        let commonTarMtpeEngine = sortedTarMtpe?.shift()?.filter(function (v) {
            return sortedTarMtpe?.every(function (a) {
                return a?.indexOf(v) !== -1;
            });
        });
        setCommonTarValue(commonTarMtpeEngine);
        // code to aligning the right aligned language  
        // if(summernoteEditorRef.current !== null){
        //     // 83 31 60 101 88 106
        //     if(targetLanguage[0]?.id === 4 || targetLanguage[0]?.id === 31 || targetLanguage[0]?.id === 83 || targetLanguage[0]?.id === 31
        //         || targetLanguage[0]?.id === 60 || targetLanguage[0]?.id === 101 || targetLanguage[0]?.id === 88 || targetLanguage[0]?.id === 106){
        //         document.querySelector('.ai-text-translate-work-container .instant-translate-row .target-summernote .note-editor.card .note-editable')
        //             .style = 'direction: rtl !important; text-align: right !important;' 
        //     } else{
        //         document.querySelector('.ai-text-translate-work-container .instant-translate-row .target-summernote .note-editor.card .note-editable')
        //             .style = 'direction: ltr !important; text-align: left !important;' 
        //     }
        // }

    }, [targetLanguage]);

    useEffect(() => {
        const common = commonSrcValue?.filter((value) =>
            commonTarValue?.includes(value)
        );
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
        mtEngineOptionsRef.current = engines;
    }, [commonMtpeEngine]);


    // by default google mt is selected
    useEffect(() => {
        if (mtpeEngineOptions.length !== 0 && createdProject === null && !isOpenFromList.current) {
            setSelectedMTEngine(
                mtpeEngineOptions?.find((each) => each?.value === 1)
            );
        }
    }, [mtpeEngineOptions, isOpenFromList.current]);

    // useEffect(() => {
    //     if(projectEditable.current && commonMtpeEngine){
    //         let engines = [];
    //         const engine = mtpeEngines?.filter((value) =>
    //           commonMtpeEngine?.includes(value?.id)
    //         );
    //         engine?.map((eachEngine) =>
    //           engines?.push({
    //             value: eachEngine?.id,
    //             label: eachEngine?.name?.replaceAll("_", " "),
    //           })
    //         );
    //         if(engines?.filter((each) => each.value === selectedMTEngine.value).length ? false : true){
    //           setSelectedMTEngine(mtpeEngineOptions?.filter((each) => each?.value === 1));
    //         }else if(engines.length > 1){
    //             setSelectedMTEngine(selectedMTFromAPI);
    //         }
    //     }
    // }, [targetLanguage, commonMtpeEngine]);

    // ==========================================================================
    // This is calculate the sticky element bottom and the div element bottom 
    // and decide whether the rewrite bar should be sticky or not 
    const handleScroll = () => {
        const stickyDiv = document.getElementById('transphrase-sticky');
        const parentContainer = document.querySelector('.ai-instant-text-nlp-feature-list');
        const elementRect = stickyDiv?.getBoundingClientRect();
        const parentRect = parentContainer.getBoundingClientRect();
        setIsSticky(elementRect.bottom === parentRect.bottom);
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span className="select-mt-icon">
                    <i className="fas fa-caret-down"></i>
                </span>
            </components.DropdownIndicator>
        );
    };

    const DropdownIndicatorSelect = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i
                    style={{ color: "#747474" }}
                    className="fas fa-caret-down"
                />
            </components.DropdownIndicator>
        );
    };

    const detectSourceLanguage = () => {
        if (sourceText?.split(' ')?.length >= 2) {
            autoDetectFireEnable.current = false;

            Config.axios({
                headers: header,
                url: Config.BASE_URL + "/auth/lang_detect/?text=" + sourceText.split(' ').splice(0, 10).join(" "),
                auth: true,
                success: (response) => {
                    setSourceLanguage(response.data?.lang_id);
                    setSourceLabel(response.data?.language);
                    setAutoDetectIndication(true);
                },
                error: (err) => {
                    setAutoDetectIndication(false);
                }
            });
        }
    }
    
    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
    }
    
    const handleDateChange = (newValue) => {
        setDeadline(newValue);
    };

    const handleInstructToggle = () => {
        setShowInstruction(!showInstruction);
    }

    /* Remove the specified :tags in the :text */
    const removeSpecificTag = (text, tags = []) => {
        if (typeof tags == "string") tags = [tags];
        let regExp = "";
        tags.map((tag) => {
            regExp = new RegExp("<" + tag + "[^>]*>", "g");
            if (text != null) text = text.replace(regExp, "");
            regExp = new RegExp("</" + tag + ">", "g");
            if (text != null) text = text.replace(regExp, "");
        });
        return text;
    };
    
    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 500);
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
        setError({ ...error, sourceLanguage: "" });
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = createdProject ? (editedTargetLanguage?.length !== 0 ? editedTargetLanguage : []) : (targetLanguage?.length !== 0 ? targetLanguage : []);
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            if (targetLanguageTemp?.length === 1) {
                Config.toast(t("one_lang_must_select"), 'warning');
                return;
            }
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
            targetLanguageTemp = Config.removeItemFromArray(
                targetLanguageTemp,
                value
            );
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected");
            targetLanguageTemp.push(value);
        }

        if (createdProject) {
            setEditedTargetLanguage([...new Set(targetLanguageTemp)]);
        } else {
            setTargetLanguage([...new Set(targetLanguageTemp)]);
        }
        setSearchInput('');
        setOnFocusWrap(false);
    };

    const handleHideIcon = () => {
        if (!isOpenFromList.current) {
            projectNameRef.current.focus();
            setHasFocus(true);
        }
    }

    const handleProjectNamechange = (e) => {
        setprojectName(e.target.innerText)
        if (e.target.innerText == "" || e.target.textContent == "") {
            // setValidationState({
            //     projectName: true
            // });
            projectNameRef.current.scrollIntoView();
            projectNameRef.current.focus();
            setHasFocus(true);
        } else {
            setValidationState({
                projectName: false
            });
        }
    }

    // Get all languages stt, tts, translation, mt-engine list
    const getAllLangDetailsList = () => {
        let params = {
            url: Config.BASE_URL + "/app/mt-language-support/",
            auth: true,
            success: (response) => {
                setAllLangDetailsList(response.data);
            },
        };
        Config.axios(params);
    }

    /* Get machine translation engine from system values */
    const getMtEngines = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/mt_engines/`,
            auth: true,
            success: (response) => {
                setMtpeEngines(response?.data);
                mtpeEngineRef.current = response?.data;
            },
        });
    };

    /* Get and set all the currency options */
    const getCurrencyOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/currencies/`,
            auth: true,
            success: (response) => {
                let currencyOptionsTemp = [];
                response.data?.map((value) => {
                    currencyOptionsTemp.push({ value: value.id, label: value.currency_code });
                });
                setTimeout(() => {
                    setCurrencyOptions(currencyOptionsTemp);
                    currencyOptionsRef.current = currencyOptionsTemp;
                }, 200);
            },
        });
    };

    /* Get and set all the unit type options */
    const getUnitTypeOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/billunits/`,
            auth: true,
            success: (response) => {
                let unitTypeOptionsTemp = [];
                response.data?.map((value) => {
                    unitTypeOptionsTemp.push({ value: value.id, label: value.unit });
                });
                setTimeout(() => {
                    setUnitTypeOptions(unitTypeOptionsTemp);
                    unitTypeOptionRef.current = unitTypeOptionsTemp;
                }, 200);
            },
        });
    };

    const handleAssignedSwitcher = (switchId) => {
        setAssignedEditorSwitch(switchId);
    }

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

    const getLanguagesNameFromID = (id) => {
        return targetLanguageOptionsRef.current?.find(each => each.id == id)?.language;
    }

    /* List tasks for specific project */
    const vendorDashboard = (projectId) => {
        Config.axios({
            url: Config.BASE_URL + "/workspace/vendor/dashboard/" + projectId,
            auth: true,
            success: (response) => {
                let { data } = response;
                if (createdProject === null) {
                    setCreatedProject(response.data);
                }
                let list = [];
                let tempTarLang = [];
                let tarID = [];

                data?.map((job) => {
                    if (job?.target_language !== null) {
                        list.push({
                            value: job.id,  //task id
                            label: getLanguagesNameFromID(job.target_language)  //target lang
                        });
                        tarID.push(job.id);
                        // tempTarLang.push(
                        //     targetLanguageOptionsRef.current?.find((element) => element.language == job.target_language)
                        // );
                    }
                });
                // setAlreadySelecetedTarLangID(tarID);
                setJobs(tempTarLang);
                // setEditedTargetLanguage(tempTarLang);
                // editJobRef.current = tempTarLang;
                setLanguageListOptions(list);
            },
        });
    };

    const editExpressProject = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_project_detail/${projectId}`,
            auth: true,
            success: (response) => {
                let { data } = response;
                setEditJobs(data?.jobs);
                let tarID = [];
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tarID.push(each.target_language);
                });
                let editTargetLanguages = [];
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionsRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });
                setTimeout(() => {
                    setEditedTargetLanguage(editTargetLanguages);
                    setAlreadySelecetedTarLangID(tarID);
                }, 50);
                setHasTeam(data.team);
            },
        });
    }

    // change the encoded html symbols to actual symbols
    function unescape(s) {
        var re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp);/g;
        var unescaped = {
            '&amp;': '&',
            '&#38;': '&',
            '&lt;': '<',
            '&#60;': '<',
            '&gt;': '>',
            '&#62;': '>',
            '&apos;': "'",
            '&#39;': "'",
            '&quot;': '"',
            '&#34;': '"',
            '&nbsp;': ' '
        };
        return s?.replace(re, function (m) {
            return unescaped[m];
        });
    }

    const getSummerNotePlainText = (target) => {
        // var htmlContent = sourceSummernoteRef.current?.summernote('code');
        // var plainText = $(htmlContent).text();
        var plainText = target?.summernote('code')
            .replace(/<\/p>/gi, "\n")
            .replace(/<br\/?>/gi, "\n")
            .replace(/<\/?[^>]+(>|$)/g, "");
        return unescape(plainText);
    }

    const createExpressProject = (from) => {
        let formData = new FormData();
        if (projectName !== null && projectName?.trim() !== "") {
            formData.append("project_name", projectName);
        }
        // formData.append("text_data", getSummerNotePlainText(sourceSummernoteRef.current));
        formData.append("text_data", srcDivRef.current.value.trim());
        formData.append("source_language", sourceLanguage);
        targetLanguage.map((eachTargetLanguage) => {
            formData.append("target_languages", eachTargetLanguage?.id);
        });
        formData.append("mt_engine", selectedMTEngine?.value ? selectedMTEngine?.value : 1
        );
        formData.append("pre_translate", true);
        setIsCustomizationProcessing(true)

        Config.axios({
            headers: header,
            url: Config.BASE_URL + "/workspace/project/express/setup/",
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setCreatedProject(response.data.Res);
                setIsSourceTextChanged(false);
                setIsMainMtChanged(false);
                // translatedtrue.current = true ;
                setMtEngineLable(mtpeEngineRef.current?.find(each => each.id === selectedMTEngine?.value)?.name?.replaceAll('_', ' '));
                // Config.toast("Project created successfully");
                history(`/create/translate/text/instant-text?project=${response.data?.project_id}`);
                if (from === 'compare-mt') {
                    setCompareMTLoader(false);
                    setInstantCompareMTVisible(false);
                }
            },
        });
    };

    const updateExpressProject = (key) => {
        // save the target changes first
        saveChanges('target-save');
        setTranslatedTextTab(1);
        let formdata = new FormData();
        // setClickedOpenButton("key")
        setIsUpdating(true);
        formdata.append("source_language", sourceLanguage);
        formdata.append("project_name", projectName);
        formdata.append("team", hasTeam);
        // formdata.append("mt_engine", selectedMTEngine?.value ? selectedMTEngine?.value : 1);
        // editedTargetLanguage?.map((eachTargetLanguage) => {
        //     if (
        //       targetLanguage.find(
        //         (element) => element.id == eachTargetLanguage?.id
        //       ) == null
        //     )
        //     formdata.append("target_languages", eachTargetLanguage?.id);
        // });
        editedTargetLanguage.map((eachTargetLanguage) => {
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
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${taskDataFromApi.current?.project_id}/${list?.length ? `?job_delete_ids=${list}` : ""}`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast("Project updated successfully");
                vendorDashboard(response.data.id);
                editExpressProject(response.data.id);
                // history(`/file-upload?page=${prevPageInfo.current?.pageNo}&order_by=${prevPageInfo.current?.orderBy}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${prevPageInfo.current?.projectId}`);
                setIsUpdating(false);
            },
            error: (err) => {
                setIsUpdating(false);
            }
        });
    }

    const getTranslatedTextByTaskId = (taskID, from) => {
        let params = {
            url: `${Config.BASE_URL}/workspace/task_get_segments/?task_id=${taskID}`,
            auth: true,
            success: (response) => {
                if (response.data?.msg !== undefined) {
                    setShowCreditAlertModal(true);
                    setIsCustomizationProcessing(false);
                    taskInsufficientCreditRef.current = response.data?.msg;
                    setTaskInsufficientCredit(true);
                } else {
                    taskInsufficientCreditRef.current = undefined;
                    setTaskInsufficientCredit(false);
                }
                if (response.data.Res.target_lang_id === 4 || response.data.Res.target_lang_id === 31 || response.data.Res.target_lang_id === 83 || response.data.Res.target_lang_id === 31
                    || response.data.Res.target_lang_id === 60 || response.data.Res.target_lang_id === 101 || response.data.Res.target_lang_id === 88 || response.data.Res.target_lang_id === 106) {
                    tarDivRef.current.style.setProperty("direction", "rtl");
                    tarDivRef.current.style.setProperty("text-align", "right");
                    copyTarDivRef.current.style.setProperty("direction", "rtl");
                    copyTarDivRef.current.style.setProperty("text-align", "right");
                    
                } else {
                    tarDivRef.current.style.setProperty("direction", "ltr");
                    tarDivRef.current.style.setProperty("text-align", "left");
                    copyTarDivRef.current.style.setProperty("direction", "ltr");
                    copyTarDivRef.current.style.setProperty("text-align", "left");
                }
                const search_params = new URLSearchParams(window.location.search);
                if (search_params.get("project") !== null) {

                    Config.axios({
                        url: `${Config.BASE_URL}/workspace/project/quick/setup/${search_params.get("project")}/`,
                        auth: true,
                        success: (response) => {
                            let project = response.data
                            Config.axios({
                                url: `${Config.BASE_URL}/workspace/vendor/dashboard/${search_params.get("project")}`,
                                auth: true,
                                success: (taskResponse) => {
                                    let task = taskResponse.data?.find(each => each.id == taskID);
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
                                    };
                                    setSelectedTaskDetails(selectedFileRow.current);
                                    getTaskAssignInfo(taskID);
                                },
                                error: (err) => { 
                                    console.error(err);
                                }
                            });
                        },
                        error: (err) => { 
                            console.error(err);
                        }
                    });
                }
                getCreditStatus();
                taskDataFromApi.current = response.data.Res;
                setTranslatedText(response.data.Res);
                setProjectId(response.data.Res?.project_id);
                setJobId(response.data.Res?.job_id);
                sourceLangIdRef.current = response.data.Res?.source_lang_id;
                targetLangIdRef.current = response.data.Res?.target_lang_id;
                projectNameRef.current.innerText = response.data.Res.project_name;
                setprojectName(response.data.Res.project_name);
                translatedtrue.current = true;
                setIsCustomizationProcessing(false);
                setIsSourceTextLoading(false);
                let srcPTag = document.createElement('p');
                srcPTag.innerHTML = response.data.Res?.source_text?.replace(/\n/g, "<br />");
                // sourceSummernoteRef.current?.summernote('code', srcPTag);
                srcDivRef.current.value = response.data.Res?.source_text;
                // tarDivRef.current.value = response.data.Res?.target_text ? response.data.Res?.target_text : "";
                setTranslateResultText(response.data.Res?.target_text ? response.data.Res?.target_text : "");
                copyTarDivRef.current.innerHTML = response.data.Res?.target_text ? response.data.Res?.target_text : "";
                setSourceText(srcDivRef.current?.value);
                setSourceTextLength(srcDivRef.current?.value?.length);
                let tarPTag = document.createElement('p');
                tarPTag.innerHTML = response.data.Res?.target_text?.replace(/\n/g, "<br />");
                // summernoteEditorRef.current?.summernote('code', tarPTag);
                setSourceLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.Res?.source_lang_id)?.language);
                setSourceLanguage(response.data.Res?.source_lang_id);
                setTargetLanguage(targetLanguageOptionsRef.current?.filter(each => each.id === response.data.Res?.target_lang_id));
                setTargetLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.Res?.target_lang_id)?.language);
                enableassignrow.current = true;
                let engine = mtpeEngineRef.current?.find(each => each.id === response.data?.Res.mt_engine);
                let engineOpt = {
                    value: engine.id,
                    label: engine.name?.replaceAll('_', ' ')
                };
                if (from === 'from-create' || from === 'from-translate') {
                    storeCurrentTranslationInHistory("Translation");
                }
                setSelectedMTEngine(engineOpt);
                if (editProjectId !== null) {
                    // textareaRef.current.value = response.data.Res?.source_text;
                } else {
                    let srcPTag2 = document.createElement('p');
                    srcPTag2.innerHTML = response.data.Res?.source_text?.replace(/\n/g, "<br />");
                    // sourceSummernoteRef.current?.summernote('code', srcPTag2);
                    srcDivRef.current.value = response.data.Res?.source_text;
                    setTranslateContent(response.data.Res?.source_text);
                    setSourceLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.Res?.source_lang_id)?.language);
                    setSourceLanguage(response.data.Res?.source_lang_id);
                    setTargetLanguage(targetLanguageOptionsRef.current?.filter(each => each.id === response.data.Res?.target_lang_id));
                    setTargetLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.Res?.target_lang_id)?.language);
                    setMtEngineLable(mtpeEngineRef.current?.find(each => each.id === response.data?.Res.mt_engine)?.name?.replaceAll('_', ' '));
                    if (!isOpenFromList.current) {
                    } else {
                        let engine = mtpeEngineRef.current?.find(each => each.id === response.data?.Res.mt_engine);
                        let engineOpt = {
                            value: engine.id,
                            label: engine.name?.replaceAll('_', ' ')
                        };
                        setSelectedMTEngine(engineOpt);
                    }
                }
                setTargetLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.Res?.target_lang_id)?.language);
                setShowProcessingModal(false);
                setIsCustomizationProcessing(false);
            },
            error: (err) => {
                if (err.response?.status === 400) {
                    setShowCreditAlertModal(true);
                    setIsCustomizationProcessing(false);
                }
            }
        };
        Config.axios(params);
    }

    const handleMainMtChange = (selectedOption) => {
        setSelectedMTEngine(selectedOption);
        if (taskDataFromApi.current?.mt_engine !== selectedOption?.value) {
            setIsMainMtChanged(true);
        } else {
            setIsMainMtChanged(false);
        }
    }

    const spellCheckAvailability = () => {
        let formData = new FormData();
        formData.append("task_id", taskId);
        Config.axios({
            url: Config.BASE_URL + "/vendor/spellcheck_availability/",
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                isSpellcheckAvailableRef.current = response.data.out;
            },
        });
    }

    /* Get and set internal and external editors data by project and job selected  */
    const getTeamLists = () => {
        // if (projectSelect?.value != null) {
        // let url = `${Config.BASE_URL}/workspace/assign_to/?project=${projectId}`;
        let url = `${Config.BASE_URL}/workspace/assign_to/?project=${projectId}&job=${jobId}`;

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                if (response.data?.external_editors) {
                    // allExternalEditors.current = response.data?.external_editors;
                    let external_list = [];
                    response.data?.external_editors?.map(each => {
                        if (each?.status === "Invite Accepted") {
                            external_list.push(each);
                        }
                    })
                    setExternalEditors(external_list);
                }
                if (response.data?.internal_editors) setInternalEditors(response.data?.internal_editors);
            },
        });
        // }
    };



    /* Assign new or edit already assinged task */
    const assignTask = (e) => {
        saveChanges('from-assign')
        setAssignBtnLoader(true)
        let url = `${Config.BASE_URL}/workspace/task_assign_info/`;
        let method = "POST";
        let formData = new FormData();
        // if (referenceFile?.size)
        //     // To check if it's a file because loading name attr when editing so checking with size
        //     formData.append("instruction_file", referenceFile);

        // selectedTaskIds?.map((value) => {
        // formData.append("task", selectedLanguageSwitch?.value || taskId);
        // });
        if (assignInstructionText?.trim() !== '') {
            formData.append("instruction", assignInstructionText?.trim());
        }
        // if(selectedEditor !== alreadySelectedEditor.current){
        formData.append("assign_to", selectedEditor);
        // }
        // if(deadlineUTC !== taskDetailsFromApi?.deadline){
        if (deadline !== null) {
            let deadlineUTC = Config.convertLocalToUTC(deadline);
            formData.append("deadline", deadlineUTC);
        }
        // }
        // if(additionalFiles?.length !== 0){
        //     for (let x = 0; x < additionalFiles.length; x++) {
        //         if (typeof additionalFiles[x] != "undefined") formData.append("instruction_file", additionalFiles[x]);
        //     }
        // }
        formData.append("step", 1);
        let arrDict = [{
            mtpe_rate: unitRate,
            currency: currencySelect?.value,
            mtpe_count_unit: unitTypeSelect?.value,
            tasks: [selectedLanguageSwitch?.value || taskId],
            ...(unitTypeSelect?.value === 3 && { estimated_hours: estimatedHours })
        }];
        formData.append("task_assign_detail", JSON.stringify(arrDict));
        // if(unitRate !== taskDetailsFromApi?.mtpeRate){
        //     if (unitRate > 0) formData.append("mtpe_rate", unitRate);
        // // }
        // // if(estimatedHours !== taskDetailsFromApi?.estimatedHours){
        //     if (estimatedHours > 0) formData.append("estimated_hours", estimatedHours);
        // // }
        // // if(currencySelect?.value !== taskDetailsFromApi?.currency){
        //     if (currencySelect?.value) formData.append("currency", currencySelect?.value);
        // // }
        // // if(unitTypeSelect?.value !== taskDetailsFromApi?.mtpeCountUnit){
        //     if (unitTypeSelect?.value) formData.append("mtpe_count_unit", unitTypeSelect?.value);
        // }
        // setDrawerOpen(false);

        Config.axios({
            url: url,
            method: method,
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast(t("task_assigned_success"));
                // history(`/file-upload?page=1&order_by=-id&open-project=${projectId}`);
                setShowEditorAssignModal(false);
                getTaskAssignInfo(selectedLanguageSwitch?.value || taskId);
                setAssignBtnLoader(false);
            },
            error: (error) => {
                if (error.response?.data?.message == "integrirty error") Config.toast(t("already_assigned"), "warning");
            },
        });
        // setDrawerOpen(false);
    };

    const getLanguageNameFromId = (name, languages) => languages?.find((language) => language.id == name);

    const getTaskAssignInfo = (taskId) => {
        let project = selectedFileRow.current?.project_data;
        let task = selectedFileRow.current?.task_data;
        let isProjectAssigned = project?.assign_enable !== undefined ? !project?.assign_enable : false;

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?tasks=${taskId}${((userDetails?.agency && isProjectAssigned) || task?.task_reassign_info == true) ? '&reassigned=True' : ''}`,
            auth: true,
            success: (response) => {
                if (response.data?.length !== 0) {
                    let data = response?.data[0];
                    setIsTaskAssigned(true);
                    setTaskAssignDetails(response.data);
                    setEditorName(data?.assign_to_details?.name);
                    setEditorId(data?.assign_to_details?.id);
                    setDeadline(Config.convertUTCToLocal(data?.deadline));
                    setCurrencySelect(currencyOptionsRef.current?.find(each => each.value === data?.currency));
                    setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === data?.mtpe_count_unit));
                    setUnitRate(data?.mtpe_rate);
                    setAssignInstructionText(data?.instruction);
                    setAdditionalFilesFromApi(data?.instruction_files);
                    setEstimatedHours(data?.estimated_hours);
                } else {
                    setIsTaskAssigned(false);
                    setIsFunctionButtonsVisible(true);
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    // useEffect(() => {
    // }, [isFunctionButtonsVisible]);

    /* Current user plan details get */
    const getUserPlanDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/check-subscription/`,
            auth: true,
            success: (response) => {
                setUserSubscriptionName(response.data.subscription_name);
            },
        });
    };

    const downloadTxtFile = () => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            `${Config.BASE_URL}/workspace/express_task_download/${taskId}/`,
            {
                responseType: "blob",
                /* 
                */
                headers: {
                    "Access-Control-Expose-Headers": "Content-Disposition",
                    Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                },
            }
        );
    };

    const downloadedFileName = useRef(null);

    const downloadFile = async (e, type = "ORIGINAL") => {
        saveChanges('from-download')
        setTimeout(async () => {
            const response = await downloadTxtFile();
            Config.downloadFileInBrowser(response);
        }, 200);
    };

    const handleAssignIconClick = () => {
        setShowIndividualAssignManage(!showIndividualAssignManage);
        // getTeamLists(); 
    }

    const handleTextCopy = () => {
        if (isTargetEmpty()) {
            Config.toast(t("text_to_copy_target"), 'warning');
            return;
        }
        navigator.clipboard.writeText(tarDivRef.current.value);
        Config.toast(t("txt_copied"));
    }

    const handleShareIconClick = () => {
        if (isTargetEmpty()) {
            Config.toast(t("text_to_share_target"), 'warning');
            return;
        }
        setShareIconsPanel(!shareIconsPanel);
        saveChanges("from-share");
    }

    /* Delete a project by id */
    const deleteProject = (projectId, isConfirmed = false) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                history("/file-upload?page=1&order_by=-id");
            },
        });
    };

    const toggleSynonym = () => {
        setEnableSynonym(!enableSynonym);
        resetParaphraseStates();
        setEnableParaphrase(false);
        setSpellcheck(false);
    }

    const toggleParaphrase = () => {
        setEnableParaphrase(!enableParaphrase);
        resetSynonymStates();
        setEnableSynonym(false);
        setSpellcheck(false);
    }

    const resetSynonymStates = () => {
        setSynonymPopoverOpen(false);
        setSynonymPopoverTarget("");
        setSynonymsResList([]);
        setSynonymText("");
    }

    const resetParaphraseStates = () => {
        setParaphrasePopoverOpen(false);
        setParaphrasePopoverTarget("");
        setParaphraseResList([]);
        setParaphraseText("");
    }

    const [enableselection, setEnableselection] = useState(true);
    const [selectiontarget, setSelectiontarget] = useState(null);
    const [selectiontext, setSelectiontext] = useState(null);
    const [selectionpopover, setSelectiontextpopover] = useState(null);

    // function getSelected() {
    //     if (window.getSelection?.toString()?.length) {
    //         return window.getSelection();
    //     }
    //     else if (document.getSelection?.toString()?.length) {
    //         return document.getSelection();
    //     }
    //     else {
    //         var selection = document.selection && document.selection.createRange();
    //         if (selection.text) {
    //             return selection.text;
    //         }
    //         return false;
    //     }
    //     return false;
    // }

    // const getSelectedText = () => {
    //     if (window.getSelection()?.toString()?.length) {
    //         if(enableSynonym){
    //             setSynonymText(window.getSelection().toString());
    //             secondWordRef.current =  document.querySelector('.target-summernote').querySelector('.note-editable').innerText.slice(0, window.getSelection()?.anchorOffset);
    //         }
    //         if(enableParaphrase){
    //             setParaphraseText(window.getSelection().toString());
    //         }
    //         if(enableselection){
    //             setSelectiontext(window.getSelection().toString());
    //         }
    //     }
    // } 

    // useEffect(() => {
    //     if (synonymText?.length || paraphraseText?.length || selectiontext?.length) {
    //         var selection = window.getSelection().getRangeAt(0);
    //         if (window.getSelection().toString().length) {
    //             var selectedText = selection.extractContents();
    //             let randomNum = Math.floor(Math.random() * 1000);
    //             var mark = document.createElement("mark");
    //             // if(enableSynonym) mark.id = `synonym-${randomNum}`;
    //             // if(enableParaphrase) mark.id = `paraphrase-${randomNum}`;
    //             if(enableselection) mark.id = `selection-${randomNum}`;
    //             mark.style.setProperty('background-color', 'transparent', 'important');
    //             mark.appendChild(selectedText);
    //             mark.contentEditable = "true";
    //             selection.insertNode(mark);
    //             // if(enableSynonym) setSynonymPopoverTarget("synonym-" + randomNum);
    //             // if(enableParaphrase) setParaphrasePopoverTarget("paraphrase-" + randomNum) ;
    //             if(enableselection) setSelectiontarget("selection-" + randomNum) ;
    //         }
    //     }
    // }, [synonymText, paraphraseText,selectiontext]);

    // useEffect(()=>{
    //     const checkselction =()=>{
    //         var selection = getSelected();
    //         if (selection) {
    //         }
    //        setTimeout(() => {
    //         if(selection.type == 'Range'){
    //             setEnableselection(true);
    //             setSelectiontextpopover(true);
    //         }
    //         else{
    //             setEnableselection(false);
    //             setSelectiontarget(null);
    //             setSelectiontextpopover(false);
    //         }
    //        }, 200);

    //     }
    //     document.querySelector('.target-summernote').querySelector('.note-editable').addEventListener('mouseup',checkselction);
    //     return ()=> {document.querySelector('.target-summernote').querySelector('.note-editable').removeEventListener('mouseup',checkselction)}
    //   })

    // useEffect(() => {
    //   if(synonymPopoverTarget !== ""){
    //     if (synonymText?.trim() !== "") {
    //         getSynonym();
    //     }
    //   }
    // }, [synonymPopoverTarget]);

    // const getSynonym = async(loader) => {
    //     setPopupLoading(loader);
    //     setSynonymText(window.getSelection().toString());
    //     secondWordRef.current =  document.querySelector('.target-summernote').querySelector('.note-editable').innerText.slice(0, window.getSelection()?.anchorOffset);
    //     let userCacheData = JSON.parse(
    //         typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
    //     );
    //     let token = userCacheData != null ? userCacheData?.token : "";
    //     var formdata = new FormData();
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer  ${token}`);
    //     formdata.append("word", window.getSelection()?.toString()?.trim());
    //     formdata.append("sentence", document.querySelector('.target-summernote').querySelector('.note-editable').innerText);
    //     formdata.append("second_word", secondWordRef.current !== "" ? secondWordRef.current : "-1");
    //     var requestOptions = {
    //         method: 'POST',
    //         body: formdata,
    //         redirect: 'follow',
    //         headers: myHeaders,
    //     };
    //     let data = await fetch(Config.BASE_URL + "/workspace_okapi/synonyms/", requestOptions);

    //     if (data.status === 200) {
    //         setPopupLoading('none');
    //         let response = await data.json();    
    //         let synonymList = [];
    //         if (typeof response.context == "object") {
    //             response.context?.map((value) => {
    //                 synonymList.push(
    //                     <p
    //                         key={value}
    //                         className="corrected-word synonyms-each-result"
    //                         onClick={(event) => repalceWithNewSynonym(event, value)}
    //                     >
    //                         {value}
    //                     </p>
    //                 );
    //             });
    //             setSynonymsResList(synonymList);
    //             setSynonymPopoverOpen(true);
    //             setPopoverContentSwitch(true);
    //             checkSelection();
    //         } else {
    //             Config.toast('No synonym found', 'warning');
    //             resetSynonymStates();
    //             setPopupLoading('none');
    //         }
    //     }
    // } 

    // const repalceWithNewSynonym = (e, value) => {
    //     // let childMark = document?.getElementById(selectiontarget);
    //     // childMark.innerHTML = value + " ";
    //     // resetSynonymStates();
    //     // document.querySelector('.target-summernote').querySelector('.note-editable').innerHTML = removeSpecificTag(
    //     //     document.querySelector('.target-summernote').querySelector('.note-editable').innerHTML,
    //     //     "mark"
    //     // );
    //     // const selection = window.getSelection();
    //     // const range = document.createRange();
    //     // selection.removeAllRanges();
    //     // range.selectNodeContents(document.querySelector('.target-summernote').querySelector('.note-editable'));
    //     // range.collapse(false);
    //     // selection.addRange(range);
    //     // document.querySelector('.target-summernote').querySelector('.note-editable').focus();
    //     summernoteEditorRef?.current.summernote('insertText', value + ' ');
    //     setPopoverContentSwitch(false);
    //     resetParaphraseStates();
    //     resetSynonymStates();
    //     // summernoteEditorRef?.current.summernote('restoreRange');
    // } 

    // useEffect(() => {
    //     if (synonymsResList.length !== 0 || paraphraseResList.length !== 0) {
    //         document.addEventListener('click', outsideClickHandler);
    //     }
    //     return () => {
    //         document.removeEventListener('click', outsideClickHandler);
    //     }
    // }, [synonymsResList, synonymPopoverOpen, paraphraseResList, paraphrasePopoverOpen]);

    // const outsideClickHandler = () => {
    //     // let markTag = document.getElementById(enableSynonym ? synonymPopoverTarget : enableParaphrase && paraphrasePopoverTarget);
    //     // if (markTag !== undefined && ((enableSynonym && synonymPopoverOpen && synonymsResList?.length) || (enableParaphrase && paraphrasePopoverOpen && paraphraseResList?.length))) {
    //     //     if(enableSynonym) resetSynonymStates();
    //     //     if(enableParaphrase) resetParaphraseStates();
    //     //     document.querySelector('.target-summernote').querySelector('.note-editable').innerHTML = removeSpecificTag(
    //     //         document.querySelector('.target-summernote').querySelector('.note-editable').innerHTML,
    //     //         "mark"
    //     //     );
    //     // }
    //     setPopoverContentSwitch(false);
    //     setPopupLoading('none');
    //     checkSelection();
    //     resetParaphraseStates();
    //     resetSynonymStates();
    // }    

    // useEffect(() => {
    //     if(paraphrasePopoverTarget !== ""){
    //       setParaphrasePopoverOpen(true);
    //       getParaphrases();
    //     }
    // }, [paraphrasePopoverTarget]);

    // const getParaphrases = async(loader) => {
    //     setPopupLoading(loader);
    //     if (window.getSelection()?.toString()?.trim()?.length !== 0) {
    //         let userCacheData = JSON.parse(
    //             typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
    //         );
    //         let token = userCacheData != null ? userCacheData?.token : "";
    //         var formdata = new FormData();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Bearer  ${token}`);
    //         formdata.append("sentence", window.getSelection()?.toString()?.trim());
    //         var requestOptions = {
    //             method: 'POST',
    //             body: formdata,
    //             redirect: 'follow',
    //             headers: myHeaders,
    //         };
    //         let data = await fetch(Config.BASE_URL + "/workspace_okapi/paraphrase/", requestOptions);

    //         if (data.status === 200) {
    //             let response = await data.json();
    //             let paraphraseList = [];
    //             if(response?.message?.includes('error in paraphrasing')){
    //                 Config.toast('No alternate phrases.', 'warning');
    //                 resetParaphraseStates();
    //                 setPopupLoading('none');
    //             }
    //             if(response?.msg === 'success'){
    //                 setPopupLoading('none');
    //                 response.paraphrase?.map((value) => {
    //                     paraphraseList.push(
    //                         <p
    //                             key={value}
    //                             className="corrected-word synonyms-each-result"
    //                             onClick={(event) => repalceWithNewPhrase(event, value)}
    //                         >
    //                             {value}
    //                         </p>
    //                     );
    //                 });
    //                 setParaphraseResList(paraphraseList);
    //                 setParaphrasePopoverOpen(true);
    //                 setPopoverContentSwitch(true);
    //                 checkSelection();
    //             }else if(response.msg === 'error'){
    //                 Config.toast('No alternate phrases.', 'warning');
    //                 resetParaphraseStates();
    //                 setPopupLoading('none');
    //             }
    //         }
    //     } else {
    //         Config.toast("Please select text to paraphrase", 'warning');
    //         setPopupLoading('none');

    //     }
    // }

    // const repalceWithNewPhrase = (event, value) => {
    //     // let childMark = document?.getElementById(paraphrasePopoverTarget);
    //     // childMark.innerHTML = value + " ";
    //     // translatedTextDivRef.current.innerHTML = removeSpecificTag(
    //     //     translatedTextDivRef.current.innerHTML,
    //     //     "mark"
    //     // );
    //     // const selection = window.getSelection();
    //     // const range = document.createRange();
    //     // selection.removeAllRanges();
    //     // range.selectNodeContents(translatedTextDivRef.current);
    //     // range.collapse(false);
    //     // selection.addRange(range);
    //     // translatedTextDivRef.current.focus();
    //     // checkSelection();
    //     // summernoteEditorRef?.current.summernote('restoreRange');
    //     summernoteEditorRef?.current.summernote('insertText', value + ' ');
    //     setPopoverContentSwitch(false);
    //     resetParaphraseStates();
    //     resetSynonymStates();
    // }

    // this is block the double click behaviour (allows only the triple click selection)
    // useEffect(() => {
    //     if(enableParaphrase){
    //       document.querySelector('.target-summernote').querySelector('.note-editable').addEventListener('mousedown', function(event) {
    //           if (event.detail == 2) {
    //               event.preventDefault();
    //           }
    //         }, false);
    //     }else{
    //         resetParaphraseStates();
    //     }
    // }, [enableParaphrase]);

    const getMtTranslation = () => {
        if (translatedText?.mt_raw !== undefined && translatedText?.mt_raw !== null) {
            // translatedTextDivRef.current.innerHTML = translatedText?.mt_raw?.replace(/\n/g, "<br />");
            let tarPTag = document.createElement('p');
            tarPTag.innerHTML = translatedText?.mt_raw?.replace(/\n/g, "<br />");
            // summernoteEditorRef.current.summernote('code', tarPTag);
            // tarDivRef.current.value = translatedText?.mt_raw;
            setTranslateResultText(translatedText?.mt_raw);
            copyTarDivRef.current.innerHTML = translatedText?.mt_raw;            
        } else {
            setShowCreditAlertModal(true);
        }
    }

    const saveChanges = (from, history_obj_id, store_history) => {
        taskInsufficientCreditRef.current = undefined;
        setTaskInsufficientCredit(false);
        let formData = new FormData();
        formData.append("task_id", taskId);
        if (from !== 'from-translate' && taskInsufficientCreditRef.current === undefined && from !== 'from-history') {
            if (translatedTextTab === 1) {
                // formData.append("target_text", getSummerNotePlainText(summernoteEditorRef.current));
                formData.append("target_text", tarDivRef.current.value.trim()?.replace(/\r/g, ""));
            } else if (translatedTextTab === 2) {
                formData.append("simplified_text", tarDivRef.current.value.trim()?.replace(/\r/g, ""));
            } else if (translatedTextTab === 3) {
                formData.append("shortened_text", tarDivRef.current.value.trim()?.replace(/\r/g, ""));
            } else if (translatedTextTab === 4) {
                formData.append("rewrite_text", tarDivRef.current.value.trim()?.replace(/\r/g, ""));
            }
        } else {
            setTranslatedTextTab(1)
            if (isSourceTextChanged) {
                setIsCustomizationProcessing(true);
                formData.append("source_text", srcDivRef.current.value.trim()?.replace(/\r/g, ""));
            }
            if (isMainMtChanged) {
                setIsCustomizationProcessing(true);
                formData.append("mt_engine", selectedMTEngine?.value);
            }
            if (sourceApplyToAll) {
                formData.append("apply_all", "True");
            }
        }
        if (from === 'from-history') {
            formData.append("from_history", history_obj_id);
            setHistoryDrawerShow(false);
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_save/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setSavedTargetData(response.data.target_text);
                setChangesSaved(true);
                setIsConfirmContinue(false);
                if (from === 'target-save') {
                    if (translatedTextTab === 1) {
                        setTranslatedText({
                            ...translatedText,
                            target_text: response.data.target_text
                        });
                        taskDataFromApi.current = ({
                            ...taskDataFromApi.current,
                            target_text: response.data.target_text
                        });
                        if (store_history) {
                            storeCurrentTranslationInHistory("Post-edited");
                        }
                    }
                }
                if (from === undefined) {     // show toast when save button is clicked
                    // Config.toast('Changes saved');
                }
                if (from === 'from-translate') {
                    setShowSourceChangeConfimationModal(false);
                    if(taskId !== undefined && taskId !== null){
                        getTranslatedTextByTaskId(taskId, 'from-translate');
                    }
                    setIsSourceTextChanged(false);
                    setIsMainMtChanged(false);
                }
                if (from === 'validate') {
                    let isPostedited = response.data?.mt_raw?.replace(/\n/g, "")?.replace(/\r/g, "")?.trim() === response.data?.target_text?.replace(/\n/g, "")?.replace(/\r/g, "")?.trim() ? false : true;
                    setIsContentPostedited(isPostedited);
                    if (isPostedited) {     // if target is post-edited then show confirmation modal
                        if (!dontShowAgain) {     // if dont show again is checked dont show the modal, directly save the changes
                            setShowSourceChangeConfimationModal(true);
                        } else {
                            saveChanges('from-translate');
                        }
                    } else {  // if nothing is changed save the changes
                        saveChanges('from-translate');
                        // setIsSourceTextChanged(false);
                        setIsMainMtChanged(false);
                    }
                }
                if (from === 'from-history') {
                    srcDivRef.current.value = response.data?.source_text;
                    // tarDivRef.current.value = response.data?.target_text;
                    setTranslateResultText(response.data?.target_text);
                    copyTarDivRef.current.innerHTML = response.data?.target_text;
                }
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true);
                        setTaskInsufficientCredit(true);
                        taskInsufficientCreditRef.current = err.response.data?.msg;
                        if (from !== 'from-translate') {
                            // summernoteEditorRef.current?.summernote('code', '');
                            // tarDivRef.current.innerHTML = '';
                            setTranslateResultText('');
                            copyTarDivRef.current.innerHTML = "";
                        }
                        setIsCustomizationProcessing(false);
                        setShowSourceChangeConfimationModal(false);
                        // if(isSourceTextChanged){
                        //     summernoteEditorRef.current?.summernote('code', taskDataFromApi.current?.source_text);
                        // }
                        // if(isMainMtChanged){
                        //     let engine = mtpeEngineRef.current?.find(each => each.id == taskDataFromApi.current?.mt_engine);
                        //     let engineOpt = {
                        //         value: engine.id,
                        //         label: engine.name?.replaceAll('_', ' ')
                        //     };
                        //     setSelectedMTEngine(engineOpt);
                        // }
                        // 

                    }
                } else {
                    if (from !== 'from-translate') {
                        Config.toast(t("failed_to_save"), 'error');
                    } else {
                        Config.toast(t("failed_to_translate"), 'error');
                    }
                }
            },
        });
    }

    const handleSourceEditYesBtn = () => {
        saveChanges('from-translate');
        setIsConfirmContinue(true);
    }

    const handleSouceEditNoBtn = () => {
        setIsCustomizationProcessing(true);
        saveChanges('from-translate');
        setShowSourceChangeConfimationModal(false);
    }

    const handleEditorSelect = (id, name, is_internal = false, email) => {
        setSelectedEditor(id);
        setEditorName(name);
        setIsInternalEditor(is_internal);
        if (is_internal) {
            setCurrencySelect(null);
            setUnitTypeSelect(null);
            setUnitRate("");
            setEstimatedHours("");
        } else {
            if (email == 'ailaysateam@gmail.com') {
                getAilaysaServiceRate();
                setIsEditorAilaysa(true);
            } else {
                fetchAcceptedRates(id);
                setIsEditorAilaysa(false);
            }
        }
        setAssignToDrpdown(false);
    }

    // get previous accepted rates of that editor
    const fetchAcceptedRates = (editorId) => {
        // e.stopPropagation(); 
        var formdata = new FormData();
        formdata.append("vendor_id", editorId);
        formdata.append("job_id", jobId);

        Config.axios({
            url: `${Config.BASE_URL}/marketplace/get_previous_accepted_rate/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    if (response.data["Previously Agreed Rates"]?.length !== 0) {
                        setEditorRates(response.data["Previously Agreed Rates"].flat(1));
                    } else {
                        setEditorRates(response.data["Given Rates"]);
                    }
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error');
                }
            },
        });
    }

   


    const getAilaysaServiceRate = () => {
        if (
            (sourceLangIdRef.current === 17 && indianLanguages?.find(each => each.id === targetLangIdRef.current)) ||
            (targetLangIdRef.current === 17 && indianLanguages?.find(each => each.id === sourceLangIdRef.current))
        ) {
            lastFunctionCall.current = 'getAilaysaServiceRate';
            setCurrencySelect(currencyOptionsRef.current?.find(each => each.value === 63));
            setUnitTypeSelect(unitTypeOptions.find((element) => element.value === 1));
            setUnitRate(0.99);
        } else {
            lastFunctionCall.current = 'getAilaysaServiceRate';
            setCurrencySelect(currencyOptionsRef.current?.find(each => each.value === 144));
            setUnitTypeSelect(unitTypeOptions.find((element) => element.value === 1));
            setUnitRate(0.05);
        }
    }

    const handleTargetChange = (e) => {
        // setTargetInputBox(e.target.innerText);
        setTranslateResultText(e.target.value);
        copyTarDivRef.current.innerHTML = e.target.value;
        if (e.target.value?.trim()?.length === 0) {
            setIsTarTextEmpty(true);
        } else {
            setIsTarTextEmpty(false);
        }
        if (e.target.innerText?.replace(/\n/g, "")?.replace(/\r/g, "") === savedTargetData?.replace(/\n/g, "")?.replace(/\r/g, "")) {
            setChangesSaved(true);
        } else {
            setChangesSaved(false);
        }
    }
    
    const handleTargetKeyDown = (e) => {
        if(e.ctrlKey){
            if(e.which === 90){
                back();
                if(historyArrState !== '') {
                    setTranslateResultText(historyArrState);
                    copyTarDivRef.current.innerHTML = historyArrState;
                }
            } 
            if(e.which === 89){
                forward();
                if(historyArrState !== '') {
                    setTranslateResultText(historyArrState);
                    copyTarDivRef.current.innerHTML = historyArrState;
                }
            } 
        }
    } 

    const handleActionBtn = (target) => {
        if(target === 'undo'){
            back();
            if(historyArrState !== '') {
                setTranslateResultText(historyArrState);
                copyTarDivRef.current.innerHTML = historyArrState;
            }
        } 
        if(target === 'redo'){
            forward();
            if(historyArrState !== '') {
                setTranslateResultText(historyArrState);
                copyTarDivRef.current.innerHTML = historyArrState;
            }
        } 
    } 

    const detectBrowserName = () => {
        let userAgent = navigator.userAgent;
        let browserName;
        if (userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "firefox";
        } else if (userAgent.match(/safari/i)) {
            browserName = "safari";
        } else if (userAgent.match(/opr\//i)) {
            browserName = "opera";
        } else if (userAgent.match(/edg/i)) {
            browserName = "edge";
        } else {
            browserName = "No browser detection";
        }
        setBrowserName(browserName);
    }

    const removebrtag = () => {
        let rem = document.querySelector('.project-box');
        var var1 = rem.getElementsByTagName('br');
        for (var i = var1.length; i--;) {
            var1[i].parentNode.removeChild(var1[i]);
        }
    }

    const executeProposalScroll = () => {
        projectNameRef.current.scrollTo(0, 0);
    }

    const translatedtextmodifiedcheck = () => {
        if (translatedTextDivRef?.current?.innerText != translatedText.target_text) {
            setTranslatedtextmodified(true);
        }
        else {
            setTranslatedtextmodified(false);
        }
    }
   
    const handleBlockedNavigation = ({nextLocation}) => {        
        if (
            !nextLocation.pathname?.includes('/instant-text') && 
            (checkform.current || isOpenFromList.current)
        ) {
            return true;
        }
        return false;
    }

    const handleConfirmNavigationClick = () => {
        if (translatedtextmodified) {
            saveChanges('target-save');
        }
        setSourceLanguage('');
        setSourceLabel(t("source_language"));
        setTargetLabel(t("target_language"));
        setTargetLanguage([]);
        setTranslateContent('');
        setSourceTextLength(0);
        setSourceText('');
        setIsSourceTextChanged(false);
        setIsMainMtChanged(false);
        setprojectName(null);
        setMTResponses(null);
        setEditedTargetLanguage([]);
        setIsContentPostedited([]);
        setCreatedProject(null);
        setTranslatedTextTab(1);
        setTranslatedContentClicked(false);
        setSourceContentClicked(true);
        setLanguageListOptions(null);
        setSelectedLanguageSwitch(null);
        setNewTargetLanguages([]);
        setTargetLangListToRemove([]);
        setAlreadySelecetedTarLangID([]);
        setTranslatedText(null);
        setIsTarTextEmpty(false);
        setIsSrcTextEmpty(false);
        setIsTaskAssigned(false);
        setEditorId(null);
        setSelectedMTEngine(null);
        setTaskInsufficientCredit(false);
        setTaskAssignDetails(null);
        srcDivRef.current.value = '';
        // tarDivRef.current.value = '';
        setTranslateResultText('');
        copyTarDivRef.current.innerHTML = '';
        isOpenFromList.current = false;
        projectNameRef.current.innerText = '';
        setNavigationModalVisible(false);
        setConfirmedNavigation(true);
        setEditorName(null);
        setDeadline(null);
        setCurrencySelect(null);
        setUnitTypeSelect(null);
        setUnitRate('');
        setAssignInstructionText('');
        setAdditionalFilesFromApi([]);
        setEstimatedHours(null);
        setTimeout(() => {
        }, 100);
    }

    const handleTranslatedText = () => {
        setTranslatedContentClicked(true);
        if (sourceContentClicked) {
            setSourceContentClicked(false);
        }
    }

    const handleSourceText = () => {
        setSourceContentClicked(true);
        if (translatedContentClicked) {
            setTranslatedContentClicked(false);
        }
    }

    const focusSourceLangDiv = () => {
        if (sourceLangRef.current !== null) sourceLangRef.current.style = 'outline: 1px solid #E74C3C;'
        setTimeout(() => {
            if (sourceLangRef.current !== null) sourceLangRef.current.style = 'outline: none;'
        }, 1000);
    }

    const getMTSamples = async () => {
        setProcessing(true);
        var formdata = new FormData();
        formdata.append("text", srcDivRef.current.value);
        formdata.append("source_language", sourceLanguage);
        formdata.append("target_language", JSON.stringify([targetLanguage[0]?.id]));

        Config.axios({
            url: `${Config.BASE_URL}/workspace/mt_samples/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                if (Object.values(response.data[targetLanguage[0]?.id])?.filter(each => each.includes('Insufficient Credits'))?.length === Object.keys(response.data[targetLanguage[0]?.id])?.length) {
                    setShowCreditAlertModal(true);
                    setProcessing(false);
                    return;
                } else if (Object.values(response.data[targetLanguage[0]?.id])?.filter(each => each.includes('Insufficient Credits'))?.length > 0) {
                    setPartialCompareMt(true);
                    setInstantCompareMTVisible(true);
                    setMTResponses(response.data);
                    setProcessing(false);
                    setTimeout(() => {
                        setShowCreditAlertModal(true);
                    }, 250);
                    return;
                }
                setInstantCompareMTVisible(true);
                setMTResponses(response.data);
                setProcessing(false);
            },
            error: (err) => {
                Config.toast('');
            }
        });
    }

    // onlick on the radio button
    const handleMtChange = (event) => {
        setSelectedMtType(event.target.value);
        let engine = mtpeEngineRef.current?.find(each => each.id == event.target.value);
        let engineOpt = {
            value: engine.id,
            label: engine.name?.replaceAll('_', ' ')
        };
        setSelectedMTEngine(engineOpt);
    };

    // onclick on the card
    const handleMtSelect = (e) => {
        setSelectedMtType(e.currentTarget.dataset.id);
        let engine = mtpeEngineRef.current?.find(each => each.id == e.currentTarget.dataset.id)
        let engineOpt = {
            value: engine.id,
            label: engine.name?.replaceAll('_', ' ')
        };
        setSelectedMTEngine(engineOpt);
    }

    const handleMtSampleSelectBtn = () => {
        setCompareMTLoader(true);
        createExpressProject('compare-mt');
    }

    // const handleDictateBtnClick = () => {
    //     document.querySelector('#dictate-btn')?.click()
    //     if(!isListening){
    //         setIsListening(true);
    //     }else{
    //         setIsListening(false);
    //     }
    // } 

    const expressCustomization = async () => {
        var formdata = new FormData();
        setIsCustomizationProcessing(true);
        formdata.append("task", taskId);
        formdata.append("option", translatedTextTab === 2 ? 'Simplify' : translatedTextTab === 3 ? 'Shorten' : "Rewrite");

        Config.axios({
            url: `${Config.BASE_URL}/workspace/instant_customize/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                let finalPTag = document.createElement('p');
                finalPTag.innerHTML = response.data.final_result?.replace(/\n/g, "<br />");
                // summernoteEditorRef.current?.summernote('code', finalPTag);
                // tarDivRef.current.value = response.data.final_result;
                setTranslateResultText(response.data.final_result);
                copyTarDivRef.current.innerHTML = response.data.final_result;
                if (tarDivRef.current?.value?.length !== 0) {
                    setIsTarTextEmpty(false);
                }
                setIsCustomizationProcessing(false);
                getCreditStatus();
            },
            error: (err) => {
                setIsCustomizationProcessing(false);
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true);
                        // summernoteEditorRef.current?.summernote('code', '');
                        // tarDivRef.current.value = '';
                        setTranslateResultText('');
                        copyTarDivRef.current.innerHTML = '';
                    }
                } else if (err.response.status === 500) {
                    Config.toast(t("paraphrase_get_error_3"), 'error');
                    // summernoteEditorRef.current?.summernote('code', '');
                    // tarDivRef.current.value = '';
                    setTranslateResultText('');
                    copyTarDivRef.current.innerHTML = '';
                }
            }
        });
    }

    const handleSourceApplytoAllCheckbox = (e) => {
        if (e.target.checked) {
            setSourceApplyToAll(true);
        } else {
            setSourceApplyToAll(false);
        }
    }

    const handleDontShowAgainCheckbox = (e) => {
        if (e.target.checked) {
            setDontShowAgain(true);
        } else {
            setDontShowAgain(false);
        }
    }

    const validateSourceChange = () => {
        if (taskInsufficientCredit) {
            saveChanges('validate');
        } else {
            saveChanges('validate');
        }
    }

    const handleTranslateTabSwitch = (tab) => {
        saveChanges('tab-switch');
        setTranslatedTextTab(tab);
    }

    if (summernoteEditorRef.current !== null) {
        summernoteEditorRef.current?.on('summernote.change', function (we, contents, $editable) {
            if (getSummerNotePlainText(summernoteEditorRef.current) === savedTargetData) {
                setChangesSaved(true);
            } else {
                setChangesSaved(false);
            }
        });
    }

    var toUtf8 = function (text) {
        var surrogate = encodeURIComponent(text);
        var result = '';
        for (var i = 0; i < surrogate.length;) {
            var character = surrogate[i];
            i += 1;
            if (character == '%') {
                var hex = surrogate.substring(i, i += 2);
                if (hex) {
                    result += String.fromCharCode(parseInt(hex, 16));
                }
            } else {
                result += character;
            }
        }
        return result;
    };

    /* Handling all the project creation form */
    const handleAdditionalFilesChange = (e) => {
        for (let i = 0; i < (e.target.files).length; i++) {
            if (e.target.files[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        let thisFiles = e.target.files;
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        // if(ext !== ".docx" && ext !== ".txt" && ext !== ".pdf"){
        //     Config.toast('Unsupported file format', 'warning');
        //     return;
        // }
        let fileList = [...additionalFiles];
        Object.keys(thisFiles).map((eachKey) => {
            if (
                thisFiles[eachKey].size / 1024 / 1024 <=
                100
            )
                fileList.push(thisFiles[eachKey]);
            else Config.toast(t("file_size_exceeds"), "warning");
        });
        setAdditionalFiles(fileList);
    }

    /* Removed dragged files */
    const removeFile = (e, index) => {
        let filesTemp = additionalFiles;
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
        setAdditionalFiles(finalFiles);
    };

    const handleIsSrcListening = () => {
        document.querySelector('#dictate-btn')?.click()
        if (isSrcListening) {
            setIsSrcListening(false);
        } else {
            setIsSrcListening(true);
        }
    }

    const handleIsTarListening = () => {
        document.querySelector('#dictate-btn')?.click()
        if (isTarListening) {
            setIsTarListening(false);
        } else {
            setIsTarListening(true);
        }
    }

    /* Get current user's purchased credits data */
    const getCreditStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/dashboard_credit_status`,
            auth: true,
            success: (response) => {
                setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
                // setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
            },
        });
    };

    const handleJobSwitch = (selectedOption) => {
        saveChanges('target-save');
        setTranslatedTextTab(1);
        setSelectedLanguageSwitch(selectedOption);
        resetAssignEditorModal();
    }

    const resetTotalPage = () => {
        setSourceLanguage("");
        setTargetLanguage([]);
        setSourceLabel(t("source_language"));
        setTargetLabel("");
        setEditedTargetLanguage([]);
        setEditJobs([]);
        setprojectName(null);
        setTranslatedText(null);
        setSelectedLanguageSwitch(null);
        setLanguageListOptions(null);
        setCreatedProject(null);
        setAlreadySelecetedTarLangID([]);
        setSelectedMTEngine(null);
        setHasTeam(null);
        setTaskId(null);
        setTranslatedTextTab(1);
        // setTargetLangListToRemove([]);
        // setNewTargetLanguages(null);
        setTargetLangListToRemove([]);
        setAdditionalFiles([]);
        setAdditionalFilesFromApi([]);
        setSelectedSrcDictationLang({ value: 'en', label: 'English' });
        setSelectedTarDictationLang({ value: 'en', label: 'English' });
    }

    const resetAssignEditorModal = () => {
        setEditorId(null);
        setEditorName(null);
        setSelectedEditor(null);
        setDeadline(null);
        setCurrencySelect(null);
        setUnitTypeSelect(null);
        setUnitRate('');
        setAssignInstructionText('');
        setIsTaskAssigned(false);
        setIsInternalEditor(false);
    }

    // source textarea handler
    const handleSrcTextChange = (e) => {
        setSourceTextLength(e.target.value?.length);
        setSourceText(e.target.value.trim());
        if (e.target.value?.trim()?.length === 0) {
            autoDetectFireEnable.current = true;
            setTranslatedTextTab(1);
            setTimeout(() => {
                // tarDivRef.current.value = '';
                setTranslateResultText('');
                copyTarDivRef.current.innerHTML = '';
            }, 20);
            setIsSrcTextEmpty(true);
        } else {
            setIsSrcTextEmpty(false);
        }
        if (e.target.value?.replace(/\n/g, "")?.replace(/\r/g, "") === taskDataFromApi.current?.source_text?.replace(/\n/g, "")?.replace(/\r/g, "")) {
            setIsSourceTextChanged(false);
        } else {
            setIsSourceTextChanged(true);
        }
    }

    const storeCurrentTranslationInHistory = (from) => {
        var formdata = new FormData();
        formdata.append("task", taskDataFromApi.current.task);
        formdata.append("source_text", taskDataFromApi.current.source_text);
        formdata.append("target_text", taskDataFromApi.current.target_text);
        formdata.append("action", from);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_task_history/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
            },
        });
    }
    const getTranslationHistoryForTask = () => {
        setHistoryDrawerShow(true);
        // setHistoryContentLoader(true);
        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_task_history/?task=${taskId}`,
            auth: true,
            success: (response) => {
                setTranslationHistoryList(response.data);
                setHistoryContentLoader(false);
            },
            error: (err) => {
                setHistoryContentLoader(false);
            }
        });
    }

    const deleteHistoryListItem = (history_obj_id) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/express_task_history/${history_obj_id}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                // Config.toast("Deleted");
                setTranslationHistoryList(translationHistoryList?.filter(each => each.id !== history_obj_id));
            },
        });
    }

    const isTargetEmpty = () => {
        if (tarDivRef.current.value?.trim()?.length === 0)
            return true;
        else
            return false;
    } 

    const handleSrcShowTextToggle = (index) => {
        let collapseByIndex = [...historySrcShowMore];
        collapseByIndex[index] = !collapseByIndex[index];
        setHistorySrcShowMore(collapseByIndex);
    }

    const handleTarShowTextToggle = (index) => {
        let collapseByIndex = [...historyTarShowMore];
        collapseByIndex[index] = !collapseByIndex[index];
        setHistoryTarShowMore(collapseByIndex);
    }

    const handleNonEditableSource = () => {
        if (Config.userState?.id !== editorId && isTaskAssigned) {
            setShowSourceEditDisableAlert(true);
            sourceDisableAlertTimeout.current = setTimeout(() => {
                setShowSourceEditDisableAlert(false);
            }, 8000);
        } else if (Config.userState?.id === editorId) {
            setShowSourceEditDisableAlert(true);
            setShowSourceEditPermissionAlert(true);
            sourceDisableAlertTimeout.current = setTimeout(() => {
                setShowSourceEditPermissionAlert(false);
                setShowSourceEditDisableAlert(false);
            }, 8000);
        }
    }

    const handleAlertCloseBtn = () => {
        if (Config.userState?.id !== editorId && isTaskAssigned) {
            setShowSourceEditDisableAlert(false);
            clearTimeout(sourceDisableAlertTimeout.current);
        } else if (Config.userState?.id === editorId) {
            setShowSourceEditDisableAlert(false);
            clearTimeout(sourceDisableAlertTimeout.current);
            setShowSourceEditPermissionAlert(false);
        }
    }

    const handleSaveIconClick = () => {
        if (!isTarTextEmpty) {
            saveChanges('target-save', null, "store-history")
        } else { }
    }

    // removes specified tag with its text content
    const removeSpecificTagWithContent = (html, tagName) => {
    const openingTagRegExp = new RegExp(`<${tagName}[^>]*>.*?<\\/${tagName}>`, "gs");
        const modifiedHTML = html.replace(openingTagRegExp, "");    
        return modifiedHTML;
    };
     
    const arrow = document.querySelector('#arrow');
    const arrowTop = 'arrow-top';
    const arrowBottom = 'arrow-bottom';

    function changeArrow(dir) {
        if (!arrow) return;
        if (dir == 'up') {
            arrow.classList.remove(arrowTop);
            arrow.classList.add(arrowBottom);
        }
        else {
            arrow.classList.remove(arrowBottom);
            arrow.classList.add(arrowTop);
        }
    }

    // Function to check if the mouse pointer is within the bounding box of the <mark> element
    function isMouseOverMark(event, ele) {
        for (const markElement of ele) {
            const boundingBox = markElement.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX >= boundingBox.left &&
                mouseX <= boundingBox.right &&
                mouseY >= boundingBox.top &&
                mouseY <= boundingBox.bottom
            ) {
                return {
                    element: markElement,
                    rect: boundingBox
                };
            }
        }
        return null;
    }    

    const getMouseMoveCoordinates = (e) => {
        const markTags = copyTarDivRef.current.querySelectorAll('mark');
        let isSpellCheckPopOpen = document.querySelector('#pop').style.visibility === 'visible' ? true : false;
        const touchedMark = isMouseOverMark(e, markTags);
        if (isMouseOverMark(e, markTags) && !isSpellCheckPopOpen) {
            // Mouse pointer is touching the bounding box of a <mark> element
            for (const markElement of markTags) {
                tarDivRef.current.style.cursor = 'pointer';
            }
            // if(document.querySelector('#pop').style.visibility === 'hidden'){
                clickedWrongWordRef.current = touchedMark;
                clickedMarkEleRef.current = touchedMark ;
                setRectElement(touchedMark);
            // }
        } else {
            // Mouse pointer is not over any <mark> element
            for (const markElement of markTags) {
                clickedWrongWordRef.current = null;
                tarDivRef.current.style.cursor = 'text';
            }
        }
    } 
    
    const setPopOnPosition = () => {        
        if(rectElement !== null) clickedWrongWordRef.current = rectElement;
        if(clickedWrongWordRef.current !== null){
            let {element, rect} = clickedWrongWordRef.current;
            rect = element?.getBoundingClientRect();
            let pos = decidePopPosition(rect);
            let top = pos.y - document.querySelector('.text-area-wizard-wrapper').scrollTop;
            let left = pos.x - document.querySelector('.text-area-wizard-wrapper').scrollLeft;
            if (top < 0)
                top = document.querySelector('.text-area-wizard-wrapper').scrollTop + 20;
            else if (top + document.querySelector('#pop').clientHeight > document.querySelector('.text-area-wizard-wrapper').clientHeight)
                top = document.querySelector('.text-area-wizard-wrapper').clientHeight - document.querySelector('#pop').clientHeight + document.querySelector('.text-area-wizard-wrapper').scrollTop - 20;
            if (left < 0)
                left = document.querySelector('.text-area-wizard-wrapper').scrollLeft + 20;
            else if (left + document.querySelector('#pop').clientWidth > document.querySelector('.text-area-wizard-wrapper').clientWidth)
                left = document.querySelector('.text-area-wizard-wrapper').clientWidth - document.querySelector('#pop').clientWidth + document.querySelector('.text-area-wizard-wrapper').scrollLeft - 20;
            if (true && (top != pos.y - document.querySelector('.text-area-wizard-wrapper').scrollTop || left != pos.x - document.querySelector('.text-area-wizard-wrapper').scrollLeft)) {
                document.querySelector('#pop').style.top = `${top}px`;
                document.querySelector('#pop').style.left = `${left}px`;
            }
            else
                document.querySelector('#pop').style.top = `${pos.y}px`;
                document.querySelector('#pop').style.left = `${pos.x}px`;
                changeArrow(pos.dir);
                document.querySelector('#pop').style.visibility = 'visible';
                document.querySelector('#pop').style.opacity = '1';            
        }
    } 

    const decidePopPosition = (rect) => {
        // let x = rect.left + (rect.width) / 2 - document.querySelector('#pop').clientWidth / 2 + document.querySelector('.text-area-wizard-wrapper').scrollLeft;
        let x = rect.left - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector('.text-area-wizard-wrapper').scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#pop')?.clientWidth > document.querySelector('.text-area-wizard-wrapper')?.clientWidth)
             x = document.querySelector('.text-area-wizard-wrapper')?.clientWidth - document.querySelector('#pop')?.clientWidth;
             let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {
            y = rect.bottom - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().top + document.querySelector('.text-area-wizard-wrapper').scrollTop + 8
            dir = 'down';
        }
        else {
            y = rect.bottom - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().top + document.querySelector('.text-area-wizard-wrapper').scrollTop + 8
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const handleWrongWordClick = (e) => {       
        let clickedOverPop = e.target.closest('#pop') ? true : false;
        if(clickedWrongWordRef.current !== null && !clickedOverPop){
            let {element} = clickedWrongWordRef.current;
            setPopOnPosition();
            let suggestions = spellCheckResponseRef.current?.find(each => each.word === element.innerText)?.suggestion;

            try{
                let options_list = suggestions?.map((value, ind) => {
                    return (
                        <p
                            key={value}
                            className={"corrected-word "}
                            onClick={(e) => replaceWithCorrectWord(e, value)}
                        >
                            {value}
                        </p>
                    )
                })
                setSpellCheckSuggestion(options_list);
            }catch(e){
                console.error(e);
            }
            
        }else{
            // don't close when clicked inside the #pop div
            if(e.target instanceof Element && !e.target?.closest('#pop')){
                document.querySelector('#pop').style.visibility = 'hidden';
                document.querySelector('#pop').style.opacity = '0';
                setRectElement(null);
                clickedWrongWordRef.current = null;
            }
        }
    }

    // useEffect(() => {
    // }, [rectElement]);
          
    const replaceWithCorrectWord = (e, value) => {
        const markTags = copyTarDivRef.current.querySelectorAll('mark');
        // group the mark tags based on the innerText / it will give the order and occurance of each word
        const groups = {};
        // Iterate through each <mark> element
        markTags.forEach(markElement => {
            // Get the inner text of the <mark> element
            const innerText = markElement.innerText.trim();
            // Check if the inner text already exists in groups
            if (groups.hasOwnProperty(innerText)) {
                // If it exists, add the current <mark> element to the existing array
                groups[innerText].push(markElement);
            } else {
                // If it doesn't exist, create a new array with the current <mark> element
                groups[innerText] = [markElement];
            }
        });
        let markArr = groups[clickedMarkEleRef.current?.element.innerText?.trim()];
        let index = markArr?.findIndex(each => each?.id === clickedMarkEleRef.current?.element.id);
        // get the text from textarea 
        var text = tarDivRef.current.value;
        var searchWord = clickedMarkEleRef.current?.element.innerText;
        var replacementText = value;
        // Specify the index (zero-based) of the word to replace
        var instanceToReplace = index; // Replace the index occurrence (index 0 means 1st occurance | index 1 means 2nd occurance)
        // Use a regular expression to find all instances of the word
        // var regex = new RegExp(searchWord, "g");
        var regex = new RegExp('\\b' + searchWord + '\\b', 'g');
        var matches = text.match(regex);
        // Keep track of the current instance count
        var currentInstance = -1;
        // Use a custom replace function to replace the specific instance
        setHistoryArrState(prevState => { return text});
        var newText = text.replace(regex, function(match) {
            currentInstance++;
            if (currentInstance === instanceToReplace) {
                return replacementText;
            } else {
                return match;
            }
        });
        document.querySelector('#pop').style.visibility = 'hidden';
        document.querySelector('#pop').style.opacity = '0';
        setTranslateResultText(newText);
        setHistoryArrState(prevState => { return newText});
        copyTarDivRef.current.innerHTML = newText;
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    const highlightSpellCheckWords = () => {
        if (translateResultText?.length === 0) return;
        // let content_editable_div = targetContentEditable.current[segment_id].current;
        if(spellCheckWordsOptions?.length !== 0){
            let words_list = spellCheckWordsOptions?.map(each => {
                return each.word;
            })
            var text = translateResultText;
            var wordsToHighlight = words_list; // Array of words to highlight
            try{
                // Generate regular expression pattern with all the words to highlight
                var pattern = new RegExp('\\b(' + wordsToHighlight.map(escapeRegExp).join('|') + ')\\b', 'g');
                var highlightedHtml = text.replace(
                    pattern, (match) => {
                        let uid = generateKey()
                        return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`
                    }
                );
                copyTarDivRef.current.innerHTML = removeSpecificTag(highlightedHtml, 'font');
            }catch(e){
                console.error(e);
            }
            // restoreCursorPositionWithinContenteditable(content_editable_div); 
        }
    }

    const symSpellCheck = (forceOn = false) => {
        if(tarDivRef.current.value?.length !== 0 && isSpellcheckAvailableRef.current && (isSpellCheckEnable || forceOn)){
            let formData = new FormData();
            formData.append("task_id", taskId);
            formData.append("target", tarDivRef.current.value);
    
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/symspellcheck/`,
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    if(response.data?.result){
                        setSpellCheckWordsOptions(response.data.result);
                        spellCheckResponseRef.current = response.data.result;
                    }
                },
                error: (err) => { 
                    console.error(err);
                }
            });
        }
    } 

    const handleSpellCheckToggle = () => {
        setTranslateResultText(translateResultText);
        copyTarDivRef.current.innerHTML = translateResultText;
        setSpellCheckWordsOptions([]);
        setIsSpellCheckEnable(!isSpellCheckEnable);
        if(isSpellCheckEnable === false) symSpellCheck(true) ;
    } 

    return (
        <React.Fragment>
            <div className="text-area-wizard-wrapper">
                <div className="text-area-header-wrap">
                    <Breadcrumbs />
                    <div className={"project-input-wrap instant " + ((validationState.projectName) ? "error-focus" : "") + (isOpenFromList.current ? "disable" : "")}>
                        <div ref={projectNameRef}
                            contentEditable={isOpenFromList.current ? "false" : "true"}
                            onClick={handleHideIcon}
                            onBlur={() => { executeProposalScroll(); setHasFocus(false) }}
                            data-placeholder={t("untitled_project")}
                            onKeyUp={handleProjectNamechange}
                            onKeyDown={handleProjectEnter}
                            className="project-box"
                            tabIndex={0}>
                        </div>
                        {/* { !hasFocus &&
                        <span className="edit-icon">
                            <CreateOutlinedIcon 
                                onClick={handleHideIcon}
                                style={{
                                    fontSize: 20,
                                    color: "#636363",
                                }}
                            />
                        </span>
                        } */}
                        {/* <span style={{marginRight:'65px'}}>Available credits: <span>{creditsAvailable}</span></span> */}
                    </div>
                    {validationState.projectName && <small style={{ color: 'red' }}>{t("required")}</small>}
                </div>
                {
                    showSourceEditDisableAlert ? (
                        <div className="glb-prof-alert">
                            <WarningIcon
                                style={{
                                    width: 24,
                                    color: "#FFC021",
                                }}
                            />
                            <div className="d-flex align-items-center justify-content-between glb-alert-gap">
                                {
                                    showSourceEditPermissionAlert ?
                                        <span>{t("permission_to_edit_source")}</span>
                                        :
                                        <span>{t("instant_task_assigned_note")}</span>
                                }
                            </div>
                            <span className="close-btn" onClick={handleAlertCloseBtn}><CloseIcon style={{ fontSize: '20px' }} /></span>
                        </div>
                    ) : null
                }
                <div className="instant-text-translate-wrapper">
                    {/* <p className="header-title">Add text<span className="asterik-symbol">*</span></p> */}
                    <div className="ai-text-translate-work-container">
                        <div className="ai-action-cont-wrapper">
                            <div className="ai-sl-tl-wrapper">
                                <div className="ai-sl-tl-cont">
                                    <div className="position-relative">
                                        {   // show only the source label once the project it created (initial project creation page)
                                            (createdProject || isOpenFromList.current) ? (
                                                <span className="text">{sourceLabel}</span>
                                            ) : (
                                                <ButtonBase
                                                    ref={sourceLangRef}
                                                    onClick={() => { setshowSrcLangModal(true); }}
                                                    disabled={isOpenFromList.current || isEdit || showCreditAlertModal || createdProject}
                                                >
                                                    <div className="ai-sl-tl-btn">
                                                        <span className="text">{sourceLabel}
                                                            <span className="asterik-symbol">*</span>
                                                        </span>
                                                        <span className="icon">
                                                            <i className="fas fa-caret-down"></i>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            )
                                        }

                                        <span className="text-danger d-block position-absolute error-bottom">{error.sourceLanguage}</span>
                                        {(autoDetectIndication && !isEdit) && <small style={{ marginLeft: '5px' }} className="auto-detect">{t("auto_detect")}</small>}
                                    </div>
                                    {
                                        (createdProject || isOpenFromList.current) && (
                                            <img src={ArrowRightAltColor} />
                                        )
                                    }
                                    <div className="position-relative">
                                        {   // show only the target label once the project it created (initial project creation page)
                                            (createdProject || isOpenFromList.current) ? (
                                                <>
                                                    <span className="text">
                                                        {languageListOptions?.length === 1 ? targetLabel :
                                                            editedTargetLanguage?.length !== 0
                                                                ? (editedTargetLanguage?.length +
                                                                    " " +
                                                                    (editedTargetLanguage?.length > 1 ? t("languages") : t("language")) +
                                                                    " " + t("selected"))
                                                                : targetLabel
                                                        }
                                                    </span>
                                                    {
                                                        createdProject &&
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
                                                                <EditOutlinedIcon
                                                                    style={{ color: '#575B61', fontSize: '22px', marginLeft: '8px', cursor: 'pointer' }}
                                                                    onClick={() => setshowTarLangModal(true)}
                                                                />
                                                            </Tooltip>
                                                        </>
                                                    }
                                                </>
                                            ) : (
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
                                                    <ButtonBase
                                                        // style={{opacity:(!sourceLanguage ? '0.5' : '1') }}
                                                        onClick={() => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }}
                                                        style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                                    // disabled={isOpenFromList.current || showCreditAlertModal || createdProject || !sourceLanguage}
                                                    >
                                                        <div className="ai-sl-tl-btn">
                                                            <span className="text">
                                                                {targetLanguage?.length !== 0
                                                                    ? (targetLanguage?.length +
                                                                        " " +
                                                                        (targetLanguage?.length > 1 ? t("languages") : t("language")) +
                                                                        " " + t("selected"))
                                                                    : t("target_language")
                                                                }
                                                                <span className="asterik-symbol">*</span>
                                                            </span>
                                                            <span className="icon">
                                                                <i className="fas fa-caret-down"></i>
                                                            </span>
                                                        </div>
                                                    </ButtonBase>
                                                </Tooltip>
                                            )
                                        }
                                        <span className="text-danger d-block position-absolute error-bottom">{error.targetLanguage}</span>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className={"position-relative " + ((isOpenFromList.current || isEditRef.current) ? "ai-sl-tl-btn remove-hover" : "")}>
                                        {   // show only the mt-engine lable once the project is created (initial project creation page)
                                            // mt-engine can be changed if the user comes from open task
                                            (Config.userState?.id === editorId || isTaskAssigned) ? (
                                                <span className="text">{mtEngineLable}</span>
                                            ) : (
                                                <Select
                                                    options={mtpeEngineOptions}
                                                    isSearchable={false}
                                                    classNamePrefix="mt-select"
                                                    value={selectedMTEngine}
                                                    styles={customMtSelectStyles}
                                                    // menuIsOpen={true}
                                                    onChange={handleMainMtChange}
                                                    isDisabled={mtpeEngineOptions.length === 0}
                                                    placeholder={t("translate_with")}
                                                    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                />
                                            )
                                        }
                                    </div>
                                    {(location.search === '' && !createdProject) &&
                                        <div className="position-relative">
                                            <p
                                                className="instant-compare-mt"
                                                style={(sourceLanguage !== '' && targetLanguage?.length !== 0 && sourceTextLength !== 0) ? { opacity: 1 } : { opacity: 0.5, pointerEvents: 'none' }}
                                                onClick={() => { !processing && getMTSamples() }}
                                            >
                                                {t("comp_mt")} {processing && <BlueButtonLoader />}
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* update target lang button appears only when change in target lang */}
                            {/* {
                                (targetLangListToRemove?.length !== 0 || newTargetLanguages?.length !== 0 || (translatedText !== null && (translatedText?.project_name !== projectName))) && (
                                )
                            } */}
                            {
                                (targetLangListToRemove?.length !== 0 || newTargetLanguages?.length !== 0 || (translatedText !== null && (translatedText?.project_name !== projectName))) && (
                                    <Tooltip
                                        title={t("click_update_proj")}
                                        placement="top"
                                        arrow
                                        open={
                                            ((targetLangListToRemove?.length !== 0 || newTargetLanguages?.length !== 0 || (translatedText !== null && (translatedText?.project_name !== projectName))) && !showTarLangModal) ?
                                                true : false
                                        }
                                    >
                                        <button
                                            ref={updateBtnRef}
                                            style={
                                                (targetLangListToRemove?.length !== 0 || newTargetLanguages?.length !== 0 || (translatedText !== null && (translatedText?.project_name !== projectName))) ?
                                                    { float: 'right', opacity: 1 } : { opacity: 0.7, pointerEvents: 'none' }
                                            }
                                            className="convert-pdf-list-UploadProjectButton"
                                            onClick={(e) => { !isUpdating && updateExpressProject() }}
                                        >
                                            <span className="fileupload-new-btn">{t("update")} {isUpdating && <ButtonLoader />}</span>
                                        </button>
                                    </Tooltip>
                                )
                            }
                        </div>
                        <div className="instant-translate-row source-summernote">
                            <div className={"instant-textarea-cont " + (sourceContentClicked ? "focused" : "")} onClick={() => { (Config.userState?.id === editorId || isTaskAssigned) ? handleNonEditableSource() : handleSourceText() }}>
                                <>
                                    {/* <div 
                                        className="ai-text-area" style={isSourceTextLoading ? {display: 'none'} : {padding: '62px 28px 0 28px'}} 
                                        contentEditable={true} 
                                        ref={srcDivRef} 
                                        onInput={(e) => {handleSrcTextChange(e)}}
                                    >

                                    </div> */}
                                    <TextareaAutosize
                                        ref={srcDivRef}
                                        className="ai-text-area"
                                        // rows={5}
                                        // value={translateContent}
                                        style={(Config.userState?.id === editorId || isTaskAssigned) ? { pointerEvents: 'none' } : isSourceTextLoading ? { display: 'none' } : {}}
                                        // style={(Config.userState?.id === editorId || isTaskAssigned) ? {pointerEvents: 'none'} : {}}
                                        placeholder={t("enter_your_text_here")}
                                        maxLength="5000"
                                        spellCheck="false"
                                        onChange={(e) => handleSrcTextChange(e)}
                                    />
                                    {/* <form style={isSourceTextLoading ? {display: 'none'} : {}}>
                                        <textarea className="src-summernote" name="editordata" ></textarea>
                                    </form> */}
                                    <div style={!isSourceTextLoading ? { display: 'none' } : { padding: "77px 38px 20px 38px" }}>
                                        <Stack spacing={2}>
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" height={20} />
                                            <Skeleton variant="rounded" width="65%" height={20} />
                                        </Stack>
                                        {/* <CircularProgress style={!isCustomizationProcessing ? {display: 'none'} : {}} /> */}
                                    </div>
                                </>


                                <div className="ai-btn-and-txt-cont">
                                    <div style={{ width: 38, height: 38 }}>
                                        {/* {
                                            sourceContentClicked ? (
                                                <div className="d-flex">
                                                     {(browserSupportsSpeechRecognition) &&
                                                     
                                                            <VoiceEditorInstantTranslate
                                                                from={from}
                                                                selectedDictationLang={sourceContentClicked ? selectedSrcDictationLang : selectedTarDictationLang}
                                                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                                                editor={sourceContentClicked ? sourceSummernoteRef.current : summernoteEditorRef.current}
                                                            />
                                                    }
                                                    <Select
                                                        options={dictationLanguageOptions}
                                                        isSearchable={true}
                                                        classNamePrefix="mt-select"
                                                        value={selectedSrcDictationLang}
                                                        styles={customSelectStyles}
                                                        onChange={(selectedOption) => {
                                                            setSelectedSrcDictationLang(selectedOption);
                                                        }}
                                                        menuPlacement="auto"
                                                        placeholder=""
                                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                    />
                                                </div>
                                            )
                                            :
                                            ""
                                        } */}
                                    </div>
                                    <p className="calc-txt">{sourceTextLength} / 5000</p>
                                </div>
                            </div>
                            <Tooltip
                                disableHoverListener={sourceTextLength === 0 || targetLanguage?.length === 0 || sourceLanguage?.length === 0 || isCustomizationProcessing || (!isSourceTextChanged && !isMainMtChanged && !taskInsufficientCredit)}
                                title={(sourceTextLength === 0 || targetLanguage?.length === 0 || sourceLanguage?.length === 0 || isCustomizationProcessing || (!isSourceTextChanged && !isMainMtChanged && !taskInsufficientCredit)) ? "" : t("click_to_translate")}
                                placement="top"
                                arrow
                            >
                                <button className="instant-translate-TranslateButton"
                                    onClick={() => { (isOpenFromList.current || createdProject !== null) ? validateSourceChange() : createExpressProject() }}
                                    disabled={sourceTextLength === 0 || targetLanguage?.length === 0 || sourceLanguage?.length === 0 || isCustomizationProcessing || (!isSourceTextChanged && !isMainMtChanged && !taskInsufficientCredit)}
                                >
                                    <span className="trans-btn-txt">
                                        <img src={ArrowRightAlt} />
                                    </span>
                                </button>
                            </Tooltip>

                            <div className={"instant-text-translated-text-box target-summernote " + (translatedContentClicked ? "focused" : "")} onClick={() => handleTranslatedText()}>
                                <div ref={instantTranslatedRef} className={createdProject !== null || isOpenFromList.current ? "translated-text-remove-disable" : "ai-instant-text-translated-inner-wrapper"}>
                                    <div className="ai-instant-text-nlp-feature-list">
                                        <div className="top-select-language d-flex justify-content-end mb-23">
                                            {
                                                !isOpenFromList.current &&
                                                <Select
                                                    options={languageListOptions}
                                                    isSearchable={false}
                                                    classNamePrefix="mt-select"
                                                    value={selectedLanguageSwitch}
                                                    // styles={customMtSelectStyles}
                                                    styles={customlangSelectStyles}
                                                    onChange={handleJobSwitch}
                                                    // value={props.currencySelect}
                                                    placeholder={t("language_l")}
                                                    isDisabled={(!isSrcTextEmpty && !isTarTextEmpty) ? isCustomizationProcessing : true}
                                                    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                />
                                            }
                                        </div>
                                        <>
                                            {/* <div className="ai-text-area" style={isCustomizationProcessing ? { display: 'none' } : {}} contentEditable={translatedText !== null ? true : false} ref={tarDivRef} onInput={handleTargetChange}>
                                            </div> */}
                                            <div className="instant-translate-box-main-wrapper">
                                                <div className="copy-target-text-backdrop">
                                                    <div
                                                        ref={copyTarDivRef}
                                                        contentEditable={true}
                                                        style={isCustomizationProcessing ? { display: 'none', marginBottom: '20px' } : { marginBottom: '20px' }}
                                                        className="copy-of-translated-text"
                                                    >
                                                    </div>
                                                    {/* <TextareaAutosize 
                                                        ref={copyTarDivRef}
                                                        value={translateResultText}
                                                        maxLength="5000"
                                                        style={isCustomizationProcessing ? { display: 'none', marginBottom: '20px' } : { marginBottom: '20px' }}
                                                        className="copy-of-translated-text"
                                                        onChange={(e) => handleTargetChange(e)}
                                                    /> */}
                                                </div>
                                                <TextareaAutosize
                                                    ref={tarDivRef}
                                                    className="ai-text-area"
                                                    // rows={5}
                                                    value={translateResultText}
                                                    style={isCustomizationProcessing ? { display: 'none', marginBottom: '20px' } : { marginBottom: '20px' }}
                                                    // placeholder="Translation"
                                                    maxLength="5000"
                                                    spellCheck="false"
                                                    onChange={(e) => handleTargetChange(e)}
                                                    onKeyDown={handleTargetKeyDown}
                                                />
                                            </div>
                                            {/* <form style={isCustomizationProcessing ? { display: 'none' } : {}}>
                                                <textarea className="summernote" name="editordata"></textarea>
                                            </form> */}
                                            <div style={!isCustomizationProcessing ? { display: 'none' } : { height: "100%" }}>
                                                <Stack spacing={2}>
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" height={20} />
                                                    <Skeleton variant="rounded" width="65%" height={20} />
                                                </Stack>
                                                {/* <CircularProgress style={!isCustomizationProcessing ? {display: 'none'} : {}} /> */}
                                            </div>
                                            <div ref={instantFeatureStickyRef} id="transphrase-sticky" className={"translate-features-tab-switch featured-sticky-class " + (!isSticky ? "sticky-occured" : "")}>
                                                <ul style={(!isSrcTextEmpty) ? ((isCustomizationProcessing || isSourceTextChanged) ? { pointerEvents: 'none', opacity: '0.7' } : {}) : { pointerEvents: 'none', opacity: '0.7' }}>
                                                    <li className={translatedTextTab === 1 ? "active" : ""} onClick={() => handleTranslateTabSwitch(1)}>{t("standard")}</li>
                                                    <li className={translatedTextTab === 4 ? "active" : ""} onClick={() => handleTranslateTabSwitch(4)}>{t("rewrite")}</li>
                                                    <li className={translatedTextTab === 2 ? "active" : ""} onClick={() => handleTranslateTabSwitch(2)}>{t("simplified")}</li>
                                                    <li className={translatedTextTab === 3 ? "active" : ""} onClick={() => handleTranslateTabSwitch(3)}>{t("shortened")}</li>
                                                </ul>
                                            </div>
                                            {/* <div id="pop" >
                                                <div className="popup">
                                                    {popoverContentSwitch ? (
                                                            <div className="paraphrase-popover-box spellcheck-popover-box synonyms-resultwrap" >
                                                            {
                                                                (synonymPopoverOpen) ? (
                                                                    <>
                                                                            {synonymsResList?.length ?
                                                                                (<span className="result-list-instant-nlp">{synonymsResList}</span>) : (<MessageTypingAnimation />)
                                                                            }
                                                                    </>
                                                                ) : null
                                                            }
                                                             {
                                                                (paraphrasePopoverOpen) ? (
                                                                    <>
                                                                       
                                                                            {paraphraseResList?.length ?
                                                                                (<span className="result-list-instant-nlp">{paraphraseResList}</span>) : (<MessageTypingAnimation />)
                                                                            }
                                                                    </>
                                                                ) : null
                                                            }

                                                            </div>

                                                    ) :
                                                        (
                                                            <>

                                                                {((popupLoading == 'none' && ((selectionString?.trim().split(' ')?.length  === 1) && (selectionString  != ' '))) || popupLoading == 'synonyms') &&
                                                                 
                                                                        <button
                                                                            className="pop-buttons"
                                                                            data-id="synonyms"
                                                                            onClick={(e) => { ((selectionString?.trim().split(' ')?.length  === 1) && (selectionString  != ' '))  && getSynonym('Rewrite') }}
                                                                            disabled={popupLoading != 'none' ? true : false}
                                                                        >
                                                                            {popupLoading === 'synonyms' ?
                                                                                (<div className="save-btn-spinner-blue">
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                    <div></div>
                                                                                </div>) :(
                                                                                <img className="icons paraphrase-icon-instant" src={Config.HOST_URL + "assets/images/synonym.svg"} alt="synonym" />     

                                                                                )}
                                                                            <span
                                                                                className="popover-content"
                                                                                style={!((selectionString?.trim().split(' ')?.length  === 1) && (selectionString  != ' '))  ? { opacity: '0.5' } : { opacity: '1' }}
                                                                            >
                                                                                {popupLoading === 'synonyms' ? 'synonyms' : 'synonyms'}
                                                                            </span>
                                                                        </button>
                                                                }
                                                                
                                                                {(((popupLoading == 'none' )&& (selectionString?.trim().split(' ').length >= 2) )|| popupLoading == 'Paraphrase') &&
                                                                  
                                                                        <button
                                                                            className="pop-buttons"
                                                                            data-id="Paraphrase"
                                                                            onClick={(e) => { (selectionString?.trim().split(' ').length >= 2) && getParaphrases('Paraphrase') }}
                                                                           
                                                                            disabled={popupLoading != 'none' ? true : false}

                                                                        >
                                                                            {popupLoading === 'Paraphrase' ? (<div className="save-btn-spinner-blue">
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                                <div></div>
                                                                            </div>):(
                                                                            <img className="icons paraphrase-icon-instant" src={Config.HOST_URL + "assets/images/rephrase.svg"} alt="pharaprase_icon" />     

                                                                            )}
                                                                            <span
                                                                                className="popover-content"
                                                                                style={!(selectionString?.trim().split(' ').length >= 2) ? { opacity: '0.5' } : { opacity: '1' }}
                                                                            >
                                                                                Paraphrase
                                                                            </span>
                                                                        </button>
                                                                }

                                                            </>
                                                        )}
                                                </div>
                                            </div> */}
                                        </>
                                    </div>
                                    {/* {
                                        translatedTextTab === 1 &&
                                            <>
                                                <form>
                                                    <textarea className="summernote" name="editordata"></textarea>
                                                </form>
                                            </>
                                        // <div className="ai-text-translate-text-area-wrapper">
                                        //     <div style={{ position: "relative" }}>
                                        //         <div
                                        //             ref={translatedTextDivRef}
                                        //             contentEditable="true"
                                        //             className="ai-text-area"
                                        //             onBlur={()=>{translatedtextmodifiedcheck()}}
                                        //             onClick={()=> handleTranslatedText()}
                                        //             onSelect={() => {(enableSynonym || enableParaphrase) && getSelectedText()}}
                                        //             onInput={handleTargetInputBox}
                                        //             data-placeholder="Translation"
                                        //         ></div>
                                        //     </div> 
                                        // </div>
                                    } */}
                                    {/* {
                                        translatedTextTab === 2 &&
                                        <>
                                            <form>
                                                <textarea className="summernote" name="editordata"></textarea>
                                            </form>
                                        </>
                        
                                        // <div className="ai-text-translate-text-area-wrapper">
                                        //     <div style={{ position: "relative" }}>
                                        //         <div
                                        //             ref={translatedTextDivRef}
                                        //             contentEditable="true"
                                        //             className="ai-text-area"
                                        //             onBlur={()=>{translatedtextmodifiedcheck()}}
                                        //             // onSelect={() => {(enableSynonym || enableParaphrase) && getSelectedText()}}
                                        //             onInput={handleTargetInputBox}
                                        //             onClick={()=> handleTranslatedText()}
                                        //             data-placeholder="Enter your text here"
                                        //         ></div>
                                        //     </div> 
                                        // </div>
                                    }
                                    {
                                        translatedTextTab === 3 &&
                                        <div className="ai-text-translate-text-area-wrapper">
                                            <div style={{ position: "relative" }}>
                                                <div
                                                    ref={translatedTextDivRef}
                                                    contentEditable="true"
                                                    className="ai-text-area"
                                                    onBlur={()=>{translatedtextmodifiedcheck()}}
                                                    // onSelect={() => {(enableSynonym || enableParaphrase) && getSelectedText()}}
                                                    onInput={handleTargetInputBox}
                                                    onClick={()=> handleTranslatedText()}
                                                    data-placeholder="Enter your text here"
                                                ></div>
                                            </div> 
                                        </div>
                                        featured-sticky-class sticky-occured
                                    } */}
                                    <div className="ai-text-translated-share-wrapper">
                                        <div className="ai-translated-share-row">
                                            <div style={{ width: 44, height: 44 }}>
                                            </div>
                                            <ul className="share-row-list">
                                                {/* {isSpellCheckEnable == 1 && <button style={{background:spellcheck ? '#45ccef' : "transparent"}} onClick={(e)=>{spellchecktoggle(e)}}> 
                                                    <SpellcheckIcon />
                                                </button>} */}
                                                {/* <button style={{background:enableSynonym ? '#45ccef' : "transparent"}} onClick={(e)=>{toggleSynonym(e)}}> 
                                                    syn
                                                </button>
                                                <button style={{background:enableParaphrase ? '#45ccef' : "transparent"}} onClick={(e)=>{toggleParaphrase(e)}}> 
                                                    para
                                                </button> */}
                                                {(createdProject || isOpenFromList.current) && (
                                                    <>
                                                        {
                                                            translatedTextTab === 1 && (
                                                                <Tooltip title={t("machine_translation")} placement="top">
                                                                    <li className="share-row-item" onMouseUp={() => getMtTranslation()}>
                                                                        <span className="share-icon-wrap">
                                                                            <TranslateIcon style={{ color: '#575B61', fontSize: '23px' }} />
                                                                        </span>
                                                                    </li>
                                                                </Tooltip>
                                                            )
                                                        }
                                                    </>
                                                )
                                                }
                                                {(createdProject || isOpenFromList.current) &&
                                                    <Tooltip title={!isTarTextEmpty ? (changesSaved ? t('saved') : t('save_changes')) : t("translation_empty_cannot_be_saved")} placement="top">
                                                        <li className="share-row-item" onMouseUp={() => { !changesSaved && handleSaveIconClick() }}>
                                                            <span className="share-icon-wrap">
                                                                {
                                                                    changesSaved ?
                                                                        <CheckCircleOutlineOutlinedIcon style={{ color: '#0078D4', fontSize: '24px' }} />
                                                                        :
                                                                        <CheckCircleOutlineOutlinedIcon style={{ color: '#E74C3C', fontSize: '24px' }} />
                                                                }
                                                            </span>
                                                        </li>
                                                    </Tooltip>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="share-row-list-outer" style={!isCustomizationProcessing && (!isSrcTextEmpty && !isTarTextEmpty) && ((createdProject && enableassignrow.current) || isOpenFromList.current) ? { opacity: 1 } : { opacity: 0.5, pointerEvents: 'none' }}>
                        <Tooltip title={t("copy")} placement="right">
                            <li className="share-row-item" onMouseUp={handleTextCopy}>
                                <span className="share-icon-wrap">
                                    <img src={ContentCopy} alt="content_copy" />
                                </span>
                            </li>
                        </Tooltip>
                        <li className="share-row-item share-area">
                            <Tooltip title={t("share")} placement="right">
                                <span className="share-icon-wrap" onMouseUp={handleShareIconClick}>
                                    <img src={ShareIcon} alt="share" />
                                </span>
                            </Tooltip>
                            {
                                shareIconsPanel &&
                                <div className="share-translated-text-box" ref={shareRowPanelOutside}>
                                    <ul>
                                        {/* <li>
                                            <TwitterShareButton
                                                url={shareCommonUrl}
                                                title={tarDivRef.current.value?.slice(0, 1498)}
                                                className="instant-text-share-btn-wrapper"
                                            >
                                                <span>
                                                    <TwitterIcon className="social-icons"/>
                                                </span>
                                            </TwitterShareButton>
                                        </li> */}
                                        {/* <li>
                                            <a target="_blank" href={"https://www.facebook.com/share.php?u=" + shareCommonUrl + "&quote=" + translatedText?.target_text}>
                                                <span>
                                                    <FacebookIcon className="social-icons"/>
                                                </span>
                                            </a> 
                                        </li> */}
                                        {/* <li>
                                            <ShareButton {...shareButtonPropsLinkedin}>
                                                <span>
                                                    <LinkedInIcon className="social-icons"/>
                                                </span>
                                            </ShareButton>
                                        </li> */}
                                        <li>
                                            <WhatsappShareButton
                                                url={shareCommonUrl}
                                                title={tarDivRef.current.value}
                                                separator=""
                                                className="instant-text-share-btn-wrapper"
                                            >
                                                <span>
                                                    <WhatsAppIcon className="social-icons" />
                                                </span>
                                            </WhatsappShareButton>
                                        </li>
                                        {/* <li>
                                            {(tarDivRef.current.value?.length > 1450 || tarDivRef.current.value?.length > 1450) && browserName === 'firefox' ?
                                                <span>
                                                <a href={`mailto:?subject=${projectNameRef.current.innerText}&body=${tarDivRef.current?.value}`}><EmailOutlinedIcon className="social-icons"/></a>
                                                </span>
                                            :(tarDivRef.current.value?.length > 1450 || tarDivRef.current.value?.length > 1450) && browserName !== 'firefox' ?
                                                <span onMouseUp={handleTextCopy}>
                                                    <a href={`mailto:?subject=${projectNameRef.current.innerText}`}><EmailOutlinedIcon className="social-icons"/></a>
                                                </span>
                                            :
                                                <span>
                                                    <a href={`mailto:?subject=${projectNameRef.current.innerText}&body=${tarDivRef.current?.value?.slice(0, 1450)}`}><EmailOutlinedIcon className="social-icons"/></a>
                                                </span>
                                            } 
                                        </li> */}
                                    </ul>
                                </div>
                            }
                        </li>

                        {isFunctionButtonsVisible &&
                            <Tooltip title={t("download")} placement="right">
                                <li className="share-row-item share-area">
                                    <span className="share-icon-wrap" onMouseUp={() => downloadFile()}>
                                        <img src={FileDownload} alt="download" />
                                    </span>
                                    <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
                                    {
                                        downoadPanel &&
                                        <div className="download-translated-text-box" ref={downloadPanelOutside}>
                                            <ul>
                                                <li onClick={(e) => downloadFile(e)}>
                                                    <span>
                                                        {t("post_edited_file")}
                                                    </span>
                                                </li>
                                                <li onClick={(e) => downloadFile(e, "TMX")}>
                                                    <span>
                                                        tmx
                                                    </span>
                                                </li>
                                                <li onClick={(e) => downloadFile(e, "XLIFF")}>
                                                    <span>
                                                        xliff
                                                    </span>
                                                </li>
                                                <li onClick={(e) => downloadFile(e, "SOURCE")}>
                                                    <span>
                                                        {t("source_file")}
                                                    </span>
                                                </li>
                                                <li onClick={(e) => downloadFile(e, "BILINGUAL")}>
                                                    <span>
                                                        {t("bilingual")}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    }
                                </li>
                            </Tooltip>
                        }
                        {(showAssignIcon) && (
                            <Tooltip title={!isTaskAssigned ? t("assign") : t("assigned")} placement="right">
                                <li className="share-single-row-item" onMouseUp={handleAssignIconClick}>
                                    <span className="share-icon-wrap">
                                        {
                                            isTaskAssigned ? (
                                                <img src={HowToRegisterIcon}
                                                    alt="assign-symbol"
                                                    className={isTaskAssigned ? "assign-active-filter" : ""}
                                                />
                                            ) : (
                                                <img src={AssignSymbol}
                                                    alt="assign-symbol"
                                                    className={isTaskAssigned ? "assign-active-filter" : ""}
                                                />
                                            )
                                        }

                                    </span>
                                </li>
                            </Tooltip>
                        )}

                        {showAssignIcon && (
                            <Tooltip title={t("history")} placement="right">
                                <li className="share-row-item" onClick={getTranslationHistoryForTask}>
                                    <span className="share-icon-wrap">
                                        <HistoryIcon style={{ fontSize: '28px', color: '#575B61' }} />
                                    </span>
                                </li>
                            </Tooltip>
                        )}
                        
                        {isSpellcheckAvailableRef.current ? (
                            <Tooltip title={t("spell_check")} placement="right">
                                <li className="share-single-row-item" onClick={handleSpellCheckToggle}>
                                    <span className="share-icon-wrap">
                                        <img src={Spellcheck}
                                            alt="assign-symbol"
                                            className={isSpellCheckEnable ? "assign-active-filter" : ""}
                                        />
                                    </span>
                                </li>
                            </Tooltip>
                        ) : (
                            <li className="share-single-row-item"></li>
                        )}
                    </ul>
                    {(browserSupportsSpeechRecognition && location.search === '') &&
                        <div className="instant-voice-typing">
                            {/* <div className="text-center start-listening-btn">
                                <ButtonBase className={"listen-button"} type="button" onClick={handleDictateBtnClick}>
                                    <div className="mic-icon">
                                        <span className={isListening ? "mic-icon" : "mic-icon" }>
                                        {
                                            isListening ? 
                                                <SquareIcon style={{color: '#E74C3C', padding: '4px'}} /> 
                                            : 
                                                <MicOutlinedIcon style={{color: '#666666'}} />
                                        }
                                        </span>
                                    </div>
                                </ButtonBase>
                                <span className="txt">{!isListening ? "Speak to type" : "Listening"}</span>
                            </div> */}
                            {/* <VoiceEditorInstantTranslate
                                from={from}
                                selectedDictationLang={sourceContentClicked ? selectedSrcDictationLang : selectedTarDictationLang}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                editor={sourceContentClicked ? sourceSummernoteRef.current : summernoteEditorRef.current}
                            /> */}
                        </div>
                    }
                </div>
                {((createdProject || isOpenFromList.current) && translatedText?.number_of_tasks > 1) &&
                    <div
                        className="apply-to-all-parent"
                        style={!isSourceTextChanged ? { opacity: 0.5 } : {}}
                    >
                        <Checkbox
                            id="apply-to-all"
                            className="cell-box"
                            size="small"
                            checked={sourceApplyToAll}
                            onChange={handleSourceApplytoAllCheckbox}
                            disabled={!isSourceTextChanged}
                        /> <label htmlFor="apply-to-all">{t("source_text_update_note")}</label>
                    </div>
                }

                <div id="pop" className="spellcheck-popover-box instant-spell-check-pop" style={{borderRadius: '5px', background: '#fff'}}>
                    <div className="instant-popover">
                        <div className="popover-inner">
                            <span>{spellCheckSuggestion}</span>
                            <div id="arrow" className="arrow-top"></div>
                        </div>
                    </div>    
                </div>

            </div>
            
            {/* <button onClick={() => handleActionBtn('undo')}>Back</button>
            <button onClick={() => handleActionBtn('redo')}>Forward</button> */}
            {/* Synonym popover JSX */}
            {/* {
                (selectiontarget?.length && synonymPopoverOpen) ? (
                    <div>
                        <Popover
                            className="paraphrase-popover-box spellcheck-popover-box"
                            placement="bottom"
                            isOpen={synonymPopoverOpen && (document?.getElementById(selectiontarget) !== null || document.getElementById(selectiontarget) !== undefined)}
                            target={selectiontarget}
                            // ref={synonymPopoverRef}
                        >
                            {synonymsResList?.length ?
                                (<span>{synonymsResList}</span>) : (<MessageTypingAnimation />)
                            }
                        </Popover>
                    </div>
                ) : null
            } */}

            {/* {
                (selectiontarget?.length && selectionpopover) ? (
                    <div>
                        <Popover
                            className="paraphrase-popover-box spellcheck-popover-box"
                            placement="bottom"
                            isOpen={selectionpopover && (document?.getElementById(selectiontarget) !== null || document.getElementById(selectiontarget) !== undefined)}
                            target={selectiontarget}
                            // ref={synonymPopoverRef}
                        >
                           hello
                        </Popover>
                    </div>
                ) : null
            } */}

            {/* Paraphrase popover JSX */}
            {/* {
                (selectiontarget?.length && paraphrasePopoverOpen) ? (
                    <div>
                        <Popover
                            className="paraphrase-popover-box spellcheck-popover-box"
                            placement="bottom"
                            isOpen={paraphrasePopoverOpen && (document?.getElementById(selectiontarget) !== null || document.getElementById(selectiontarget) !== undefined)}
                            target={selectiontarget}
                            // ref={synonymPopoverRef}
                        >
                            {paraphraseResList?.length ?
                                (<span>{paraphraseResList}</span>) : (<MessageTypingAnimation />)
                            }
                        </Popover>
                    </div>
                ) : null
            } */}


            <section className={"instant-history-glb-wrapper " + (historyDrawerShow ? "show" : "hide")}>
                <div className="empty-area" onClick={() => setHistoryDrawerShow(false)}></div>
                <div className="instant-history-wrapper">
                    <div className="instant-history-header">
                        <h1>
                            {t("history")}
                            <Tooltip title={t("only_standard_text_history_list")} >
                                <img className="imp-icon-file" src={ImpFileIcon} alt="help" />
                            </Tooltip>
                        </h1>
                        <span className="modal-close-btn" onClick={() => setHistoryDrawerShow(false)}> <img src={CloseBlack} alt="close_black" /></span>
                    </div>
                    <div className="instant-history-body">
                        <div className="instant-lang-pair-box">
                            <span className="text">{sourceLabel}</span>
                            <span><StraightIcon className="straight-icon" /></span>
                            <span className="text">{targetLabel}</span>
                        </div>
                        <div className="instant-history-list">
                            {
                                historyContentLoader ?
                                    (
                                        <>
                                            {
                                                Array(2).fill(null).map((key) => (
                                                    <div key={key} className="intant-history-card-item">
                                                        <div className="card-box">
                                                            <div className="card-box-header">
                                                                <Skeleton animation="wave" variant="text" width={100} height={36} />
                                                                <Skeleton animation="wave" variant="text" width={85} height={36} />
                                                            </div>
                                                            <div className="src-tar-wrapper">
                                                                <div className="src-content">
                                                                    <Stack spacing={1}>
                                                                        <Skeleton variant="rounded" height={15} />
                                                                        <Skeleton variant="rounded" height={15} />
                                                                        <Skeleton variant="rounded" width="65%" height={15} />
                                                                    </Stack>
                                                                </div>
                                                                <div style={{ marginTop: "1rem" }} className="tar-content">
                                                                    <Stack spacing={1}>
                                                                        <Skeleton variant="rounded" height={15} />
                                                                        <Skeleton variant="rounded" height={15} />
                                                                        <Skeleton variant="rounded" width="65%" height={15} />
                                                                    </Stack>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                                                <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="rounded" width={90} height={30} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {
                                                translationHistoryList?.length !== 0 ? (
                                                    translationHistoryList?.map((item, index) => {
                                                        return (
                                                            <div key={item.id} className="intant-history-card-item">
                                                                <div className="card-box">
                                                                    <div className="card-box-header">
                                                                        <span className="history-tag" style={item?.action !== null ? { opacity: 1 } : { opacity: 0 }}>{item?.action}</span>
                                                                        <span className="time">{Config.getProjectCreatedDate(item?.created_at)}</span>
                                                                    </div>
                                                                    <div className="src-tar-wrapper">
                                                                        <div className="src-content"
                                                                            style={
                                                                                (translatedText?.source_lang_id === 4 || translatedText?.source_lang_id === 31 || translatedText?.source_lang_id === 83 || translatedText?.source_lang_id === 31
                                                                                    || translatedText?.source_lang_id === 60 || translatedText?.source_lang_id === 101 || translatedText?.source_lang_id === 88 || translatedText?.source_lang_id === 106) ?
                                                                                    { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr', textAlign: 'left' }
                                                                            }
                                                                        >
                                                                            {historySrcShowMore[index] ? item.source_text : `${item.source_text.substring(0, 350)}`}
                                                                            {
                                                                                item.source_text.length < 350 ?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <span>...</span>
                                                                                        <span className="show-more-link" onClick={() => handleSrcShowTextToggle(index)}>{historySrcShowMore[index] ? t("show_less") : t("show_more")}</span>
                                                                                    </>
                                                                            }

                                                                        </div>
                                                                        <div className="tar-content"
                                                                            style={
                                                                                (translatedText?.target_lang_id === 4 || translatedText?.target_lang_id === 31 || translatedText?.target_lang_id === 83 || translatedText?.target_lang_id === 31
                                                                                    || translatedText?.target_lang_id === 60 || translatedText?.target_lang_id === 101 || translatedText?.target_lang_id === 88 || translatedText?.target_lang_id === 106) ?
                                                                                    { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr', textAlign: 'left' }
                                                                            }
                                                                        >
                                                                            {historyTarShowMore[index] ? item.target_text : `${item.target_text.substring(0, 350)}`}
                                                                            {
                                                                                item.target_text.length < 350 ?
                                                                                    ""
                                                                                    :
                                                                                    <>
                                                                                        <span>...</span>
                                                                                        <span className="show-more-link" onClick={() => handleTarShowTextToggle(index)}>{historyTarShowMore[index] ? t("show_less") : t("show_more")}</span>
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-box-footer">
                                                                        {selectedTaskDetails?.assign_enable && (
                                                                            <span className="modal-close-btn" onClick={() => deleteHistoryListItem(item?.id)}>
                                                                                <img src={AssetsDeleteIcon} alt="delete" />
                                                                            </span>
                                                                        )}
                                                                        <ButtonBase className="use-btn" onClick={() => saveChanges('from-history', item?.id)}>{t("use")}</ButtonBase>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )
                                                    :
                                                    <>
                                                        <div className="instant-history-not-found">
                                                            {t("no_history_yet")}
                                                        </div>
                                                    </>
                                            }
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </section>
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
                        onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false); }}
                    >
                        <img
                            src={CloseBlack}
                            alt="close_black"
                        />
                    </span>

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
                    />
                </div>
            </Rodal>)}
            {showTarLangModal && (<Rodal
                visible={showTarLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-tar-lang-select-modal"
            >
                <div className="lang-modal-wrapper">
                    {/* <h1>Select one or more target language(s)</h1> */}
                    <span
                        className="modal-close-btn lang-close"
                        onClick={(e) => { setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false); }}
                    >
                        <img
                            src={CloseBlack}
                            alt="close_black"
                        />
                    </span>
                    <Targetlanguage
                        targetLanguage={createdProject ? editedTargetLanguage : targetLanguage}
                        targetLanguageOptions={targetLanguageOptions}
                        setTargetLanguageOptions={setTargetLanguageOptions}
                        handleTargetLangClick={handleTargetLangClick}
                        showTarLangModal={showTarLangModal}
                        setshowTarLangModal={setshowTarLangModal}
                        alreadySelectedTarLang={alreadySelectedTarLang}
                        alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                        editFilteredTargetLang={editFilteredTargetLang}
                        // isEdit={isEdit}
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
            {showProcessingModal && 
            (<Rodal
                visible={showProcessingModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowProcessingModal(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper">
                    <SandClockLoader />
                    <h6 className="text-center">{t("instant_processing_text")}</h6>
                </div>
            </Rodal>)}

            {false && (<Rodal className="instant-assign-modal" visible={false} showCloseButton={false}>
                <div ref={assignSettingDivRef}>
                    <div className="instant-assign-modal-header">
                        <h1 className="header-title ts-header-title">{isTaskAssigned ? "Assign details" : "Assign task"}</h1>
                        <span className="modal-close-btn" onClick={(e) => { setShowEditorAssignModal(false) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                    </div>
                    <div className="ai-text-translate-assign-body">
                        <div className="ai-text-translate-work-form-wrapper">
                            <div className="ai-text-form-item-row">
                                <div className="ai-text-form-item-wrapper">
                                    {/* <label>{isTaskAssigned ? "Assigned to" : "Assign to"}{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label> */}
                                    <PersonOutlineIcon style={{ color: "#5F6368", fontSize: "27px" }} />
                                    <div className="ai-text-assigned-select-wrapper">
                                        <div className={"ai-text-assigned-input-area " + (isTaskAssigned ? "editor-select-disable" : "")} onClick={() => { !isTaskAssigned && setAssignToDrpdown(!assignToDrpdown) }}>
                                            {editorName !== null ?
                                                <span className="value">{editorName}</span>
                                                :
                                                <span className="placeholder">Assign to {assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</span>
                                            }
                                            <i
                                                style={{ color: "#747474" }}
                                                className="fas fa-caret-down"
                                            />
                                        </div>
                                        {
                                            assignToDrpdown &&
                                            <div className="assigned-to-switch-wrapper" ref={assignDrpdownOutside}>
                                                <div className="assigned-to-header-wrapper">
                                                    <ul className="assigned-header-switcher">
                                                        <li onClick={() => handleAssignedSwitcher(1)} className={assignedEditorSwitch === 1 ? "active" : ""}>
                                                            External editors
                                                        </li>
                                                        <li onClick={() => handleAssignedSwitcher(2)} className={assignedEditorSwitch === 2 ? "active" : ""}>
                                                            Internal editors
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="assigned-to-switch-area">
                                                    {
                                                        assignedEditorSwitch === 1 &&
                                                        <>
                                                            <div className="assigned-to-switch-editors-list">
                                                                {
                                                                    externalEditors?.length ?
                                                                        externalEditors?.map((item) => {
                                                                            return (
                                                                                <div key={item?.id} className="assigned-to-switch-editor-item" onClick={() => { handleEditorSelect(item?.id, item?.name, false, item?.email) }}>
                                                                                    <div className="img-wrap">
                                                                                        {item?.avatar !== null ? (
                                                                                            <span className="avatar-img-icon">
                                                                                                <img src={Config.BASE_URL + item?.avatar} alt="profile-pic" />
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span className="avatar-initial">{item?.name?.charAt(0)?.toUpperCase()}</span>
                                                                                        )}

                                                                                        {/* {
                                                                                    item?.avatar !== null ?
                                                                                        <img src={Config.BASE_URL + item?.avatar} />
                                                                                    :
                                                                                        <img src={Config.HOST_URL + `assets/images/assign-page/sample-profile-icons/prof-img-3.jpg`} />

                                                                                } */}
                                                                                    </div>
                                                                                    <div className="editor-name">
                                                                                        <p>{item?.name}</p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        :
                                                                        <>
                                                                            <section className="internal-user-no-members-list">
                                                                                <img
                                                                                    className="empty-folder-img"
                                                                                    src={NoMemberImg}
                                                                                    alt="no-member-img"
                                                                                />
                                                                                <p>{t("external_editors_not_found_content")}</p>
                                                                                <small className="label-txt-new">
                                                                                    {t("collaborate_note")}&nbsp;
                                                                                    <span>
                                                                                        <a target="_blank" href={Config.MARKETPLACE_HOST}>
                                                                                            Ailaysa Marketplace
                                                                                        </a>
                                                                                    </span>
                                                                                </small>

                                                                                {/* {externalEditors === null && (
                                                                            <AddNewProjectButton onClick={(e) => openMarketplaceWithLanguagePair()}>
                                                                                <span className="assign-add-new-project-btn">Hire Editors</span>
                                                                            </AddNewProjectButton>
                                                                        )} */}
                                                                            </section>
                                                                        </>
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                    {
                                                        assignedEditorSwitch === 2 &&
                                                        <>
                                                            <div className="assigned-to-switch-editors-list">
                                                                {
                                                                    internalEditors?.length ?
                                                                        internalEditors?.map((item) => {
                                                                            return (
                                                                                <div key={item?.id} className="assigned-to-switch-editor-item" onClick={() => { handleEditorSelect(item?.id, item?.name, true, item?.email) }}>
                                                                                    <div className="img-wrap">
                                                                                        {
                                                                                            item?.avatar !== null ?
                                                                                                <img src={Config.BASE_URL + item?.avatar} />
                                                                                                :
                                                                                                <span className="avatar-initial">{item?.name?.charAt(0)?.toUpperCase()}</span>

                                                                                        }
                                                                                    </div>
                                                                                    <div className="editor-name">
                                                                                        <p>{item?.name}</p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        :
                                                                        <>
                                                                            <section className="internal-user-no-members-list ">
                                                                                <img
                                                                                    className="empty-folder-img"
                                                                                    src={NoMemberImg}
                                                                                    alt="no-member-img"
                                                                                />
                                                                                <p>{t("internal_users_not_found_content")}</p>
                                                                                <small className="label-txt-new">
                                                                                    {
                                                                                        (userSubscriptionName === 'Business' || userSubscriptionName === "Pay-As-You-Go") ? `${t("add_internal_users")} ` :
                                                                                            `${t("upgrade_business_plan")} `
                                                                                    }
                                                                                    <span>
                                                                                        <a target="_blank" href={Config.USER_PORTAL_HOST + "/my-team"}>
                                                                                            {t("my_account")}
                                                                                        </a>
                                                                                    </span>
                                                                                </small>
                                                                                {/* !Config.userState?.is_internal_member
                                                                            ?
                                                                                <a href={Config.USER_PORTAL_HOST + '/my-team'}><AddNewProjectButton><span className="assign-add-new-project-btn">Add internal users</span></AddNewProjectButton></a>
                                                                            :
                                                                                internalEditors != null && <a href={Config.USER_PORTAL_HOST}><AddNewProjectButton><span className="assign-add-new-project-btn">Invite Users</span></AddNewProjectButton></a> */}
                                                                            </section>
                                                                        </>
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                                <div className="assigned-to-switch-footer">
                                                    <a className="find-more-editor-link" target="_blank" href={languagesPairs}>
                                                        {t("find_more_editors")}
                                                    </a>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="ai-text-form-item-wrapper">
                                    <img src={EventIcon} />
                                    {/* <label>Set Deadline{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label> */}
                                    {/* <DateTimePicker disablePast disabled={isTaskAssigned} value={deadline} onChange={handleDateChange} /> */}
                                    {/* <DatePicker disablePast disabled={isTaskAssigned} value={deadline} onChange={handleDateChange} /> */}
                                    {/* <MomentTimePicker /> */}
                                </div>
                            </div>
                            {!isInternalEditor && <div className="units-wrapper">
                                <div className="ai-text-form-item-row">
                                    <AccountBalanceWalletOutlinedIcon style={{ color: "#5F6368", fontSize: "22px", marginLeft: "6px" }} />
                                    <div className="ai-text-form-item-wrapper value-row">
                                        <div className="ai-text-form-item-wrapper">
                                            <div className="currency-selection">
                                                {/* <label>Currency{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label> */}
                                                <Select
                                                    isSearchable={true}
                                                    options={currencyOptions}
                                                    classNamePrefix="instant-currency-select"
                                                    onChange={(selectedOption) => {
                                                        setCurrencySelect(selectedOption);
                                                    }}
                                                    placeholder={<span className="placeholder">Currency {assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</span>}
                                                    styles={customSelectStyles}
                                                    value={currencySelect}
                                                    isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                    menuPlacement="auto"
                                                    components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </div>
                                        <div className="ai-text-form-item-wrapper">
                                            <div className="unit-selection">
                                                {/* <label>Unit type{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label> */}
                                                <Select
                                                    isSearchable={false}
                                                    options={unitTypeOptions}
                                                    classNamePrefix="instant-unit-select"
                                                    onChange={(selectedOption) => {
                                                        setUnitTypeSelect(selectedOption);
                                                    }}
                                                    styles={customUnitTypeSelectStyles}
                                                    placeholder={<span className="placeholder">Unit type {assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</span>}
                                                    value={unitTypeSelect}
                                                    menuPlacement="auto"
                                                    isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                    components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ai-text-form-item-row">
                                    <div className={"ai-text-form-item-wrapper rate " + (unitTypeSelect?.label === 'Hour' ? "hour" : "")}>
                                        <div className={"ai-text-form-item-wrapper " + (unitTypeSelect?.label === 'Hour' ? "ai-text-translate-margin-right" : "unit-rate")}>
                                            <label htmlFor="rate">Rate{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label>
                                            <input
                                                type="number"
                                                className={"text-translate-rate-input " + ((isTaskAssigned || isInternalEditor || isEditorAilaysa) ? "editor-select-disable" : "")}
                                                placeholder="0.00"
                                                id="rate"
                                                min={0}
                                                value={unitRate}
                                                disabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                onChange={(e) => setUnitRate(e.target.value)}
                                            />
                                        </div>
                                        {unitTypeSelect?.label === 'Hour' && <div className="ai-text-form-item-wrapper">
                                            <label htmlFor="rate">{t("estimated_hours")}{assignedEditorSwitch === 1 && <span className="asterik-symbol">*</span>}</label>
                                            <input
                                                type="number"
                                                className={"text-translate-rate-input " + ((isTaskAssigned || isInternalEditor || isEditorAilaysa) ? "editor-select-disable" : "")}
                                                placeholder="00/hr"
                                                id="rate"
                                                min={0}
                                                value={estimatedHours}
                                                disabled={isTaskAssigned || isInternalEditor}
                                                // it take only integer number (non-decimal hours)
                                                onChange={(e) => setEstimatedHours(parseInt(e.target.value))}
                                            />
                                        </div>}
                                    </div>
                                </div>
                            </div>}
                            <div className="ai-text-form-item-row notes">
                                <div className="ai-text-form-item-wrapper">
                                    <NotesIcon style={{ color: "#5F6368", fontSize: "23px", marginLeft: "6px" }} />
                                    <button onClick={() => handleInstructToggle()} className="add-instruct-btn-collapse">{isTaskAssigned ? "Instructions " : "Add instructions "}<span>(optional)</span></button>
                                </div>
                                <Collapse className="collapse-instruct" isOpen={showInstruction}>
                                    <textarea
                                        className="instruct-textarea"
                                        rows={4}
                                        placeholder="Type here"
                                        value={assignInstructionText?.slice(0, 950)}
                                        disabled={isTaskAssigned}
                                        maxLength={950}
                                        onChange={(e) => setAssignInstructionText(e.target.value)}
                                    ></textarea>
                                    <small style={{ float: 'right', opacity: '0.7' }}>{assignInstructionText?.slice(0, 950)?.length}/950</small>
                                </Collapse>
                            </div>
                            {/* <div className="ai-text-form-item-row">
                                <div className="ai-text-form-item-wrapper">
                                    <AttachFileIcon style={{color: "#5F6368", fontSize: "22px", marginLeft: "6px"}}/>
                                    <label htmlFor="assign-attachment" className="add-attachment-btn-collapse">{isTaskAssigned ? "Attachments" : "Add attachment"} <span>(optional)</span></label>
                                    {!isTaskAssigned && <input type="file" id="assign-attachment" accept=".txt,.docx" onChange={handleAdditionalFilesChange} multiple hidden/>}
                                </div>
                                {
                                    Object.keys(additionalFiles)?.map((eachKey) => {
                                        return (
                                        <div className="audio-file-list-item" key={eachKey + additionalFiles[eachKey].name}  >
                                            <div className="file-info-wrapper" style={{width:'90%'}}>
                                                <img
                                                    src={
                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                        additionalFiles[eachKey].name.split(".").pop()
                                                    }
                                                    alt="document"
                                                />
                                                <div className="file-name-wrap" style={{width:'90%',display:'flex'}}>
                                                    <span className="title" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{additionalFiles[eachKey].name}</span>
                                                </div>
                                            </div>
                                            <span
                                                className="audio-file-delete"
                                                data-file-index={eachKey}
                                                onClick={(e) =>
                                                removeFile(e, eachKey)
                                                }
                                            >
                                                <img
                                                    src={
                                                        Config.HOST_URL +
                                                        "assets/images/new-ui-icons/close_black.svg"
                                                    }
                                                    alt="delete"
                                                />
                                            </span>
                                        </div>
                                    )})
                                }

                                {
                                    (isTaskAssigned && additionalFilesFromApi?.length !== 0) && (
                                        additionalFilesFromApi?.map(each => {
                                            return(
                                                <div className="file-name-list" style={{width:'84%', margin: 'auto 0 auto auto'}}>
                                                    <div className="filename" style={{width:'90%'}}>
                                                        <img
                                                            src={
                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                each.filename.split(".").pop()
                                                            }
                                                            alt="document"
                                                        />
                                                        <span className="filename-length filename-trim" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{each.filename}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div> */}
                        </div>
                        <div className="ai-text-translate-button-row">
                            {/* <div className="allow-sharing-wrap">
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Checkbox size="small" />} 
                                        label={
                                            <p className="allow-sharing">Allow sharing  
                                                <Tooltip title={'Download'} placement="top">
                                                    <span className="imp-icon-img" style={{marginLeft: "0.5rem"}}>
                                                        <img
                                                            src={
                                                                Config.HOST_URL +
                                                                "assets/images/new-ui-icons/imp-icon-file.svg"
                                                            }
                                                            alt="imp-icon-file"
                                                        />
                                                    </span>
                                                </Tooltip>
                                            </p>
                                        } 
                                    />
                                </FormGroup>
                            </div> */}
                            {/* <ButtonBase className="instant-text-cancel-button" onClick={() => setShowEditorAssignModal(false)}>
                                Cancel
                            </ButtonBase> */}
                            {
                                assignBtnLoader ?
                                    <ButtonBase
                                        className="instant-text-button"
                                    >
                                        <ButtonLoader />
                                        {isTaskAssigned ? "Assigned" : "Assign"}
                                    </ButtonBase>
                                    :
                                    <ButtonBase
                                        className="instant-text-button"
                                        onClick={assignTask}
                                        style={isTaskAssigned || (!isInternalEditor && (selectedEditor === null || currencySelect === null || unitTypeSelect === null || (unitRate === null || unitRate === "") || (unitTypeSelect?.label === 'Hour' && estimatedHours === null || estimatedHours === NaN))) ? { opacity: '0.5' } : {}}
                                        disabled={isTaskAssigned || (!isInternalEditor && (selectedEditor === null || currencySelect === null || unitTypeSelect === null || (unitRate === null || unitRate === "") || (unitTypeSelect?.label === 'Hour' && estimatedHours === null || estimatedHours === NaN)))}
                                    >
                                        {isTaskAssigned ? "Assigned" : "Assign"}
                                    </ButtonBase>

                            }
                        </div>

                    </div>
                </div>
            </Rodal>)}

            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false); }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="credits-text-cont">
                    <React.Fragment>
                        {partialOutput ?
                            <img
                                className="credits-alert-warn-icon"
                                src={ErrorBlackWarn}
                                alt="error_yellow_warn"
                            />
                            :
                            <img src={InsuffientIcon} alt="insuffient-icon" />
                        }
                        <div className="insuffient-txt-align">
                            <span>
                                <img src={RemoveCircleRed} alt="remove_circle" />
                            </span>
                            <p>{t("insufficient_credits")}</p>
                        </div>
                        {
                            partialCompareMt ?
                                <p className="insuffient-desc">{t("engine_error_note")}</p>
                                :
                                <p className="insuffient-desc">{t("insufficient_credits_note")}</p>
                        }

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

            {showDeleteConfirmationModal && (<Rodal
                visible={showDeleteConfirmationModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-wrapper">
                    <img
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    <h2>{t("translate_file_alert_note")}</h2>
                    <div className="button-row">
                        <button className="mydocument-AiMarkCancel" onClick={() => setShowDeleteConfirmationModal(false)}>
                            <span className="cancel-txt">{t("cancel")}</span>
                        </button>
                        <button className="mydocument-AiMarkSubmit" onClick={() => deleteProject(editProjectId)}>
                            <span className="submit-txt">{t("delete")}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}

            {instantCompareMTVisible && (<Rodal visible={instantCompareMTVisible} showCloseButton={false} className="ai-instant-compare-mt">
                <div className="instant-compare-mt-header">
                    <h1>{t("comp_mt")}</h1>
                    <span className="modal-close-btn" onClick={(e) => { setInstantCompareMTVisible(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <div className="instant-compare-mt-body">
                    <div className="mt-row">
                        {
                            (mtResponses !== null && !mtResponses[targetLanguage[0].id]?.Google_Translate?.includes('Insufficient Credits')) ? (
                                <div className={"mt-container " + (selectedMtType == 1 ? "selected" : "")} data-id="1" onClick={(e) => handleMtSelect(e)}>
                                    <div className="mt-card-header">
                                        <Radio
                                            value={1}
                                            className="cell-box-radio"
                                            size="small"
                                            checked={selectedMtType == 1}
                                            onChange={handleMtChange}
                                        />

                                        <img src={TranslateGoogleLogo} alt="google-translate" />
                                    </div>
                                    <div className="mt-card-body">
                                        <div className="mt-translated-txt"
                                            style={
                                                (targetLanguage[0].id === 4 || targetLanguage[0].id === 31 || targetLanguage[0].id === 83 || targetLanguage[0].id === 31
                                                    || targetLanguage[0].id === 60 || targetLanguage[0].id === 101 || targetLanguage[0].id === 88 || targetLanguage[0].id === 106) ?
                                                    { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr', textAlign: 'left' }
                                            }
                                        >
                                            {mtResponses !== null ? mtResponses[targetLanguage[0].id]?.Google_Translate : ''}
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            (mtResponses !== null && !mtResponses[targetLanguage[0].id]?.Microsoft_Translator?.includes('Insufficient Credits')) ? (
                                <div className={"mt-container " + (selectedMtType == 2 ? "selected" : "")} data-id="2" onClick={(e) => handleMtSelect(e)}>
                                    <div className="mt-card-header">
                                        <Radio
                                            value={2}
                                            className="cell-box-radio"
                                            size="small"
                                            checked={selectedMtType == 2}
                                            onChange={handleMtChange}
                                        />

                                        <img src={NewMicrosoftTranslator} alt="microsoft-bing" />
                                    </div>
                                    <div className="mt-card-body">
                                        <div className="mt-translated-txt"
                                            style={
                                                (targetLanguage[0].id === 4 || targetLanguage[0].id === 31 || targetLanguage[0].id === 83 || targetLanguage[0].id === 31
                                                    || targetLanguage[0].id === 60 || targetLanguage[0].id === 101 || targetLanguage[0].id === 88 || targetLanguage[0].id === 106) ?
                                                    { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr', textAlign: 'left' }
                                            }
                                        >
                                            {mtResponses !== null ? mtResponses[targetLanguage[0].id]?.Microsoft_Translator : ''}
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            (mtResponses !== null && !mtResponses[targetLanguage[0].id]?.Amazon_Translate?.includes('Insufficient Credits')) ? (
                                <div className={"mt-container " + (selectedMtType == 3 ? "selected" : "")} data-id="3" onClick={(e) => handleMtSelect(e)}>
                                    <div className="mt-card-header">
                                        <Radio
                                            value={3}
                                            className="cell-box-radio"
                                            size="small"
                                            checked={selectedMtType == 3}
                                            onChange={handleMtChange}
                                        />

                                        <img src={AmazaonTranslator} alt="amazon-trans" />
                                    </div>
                                    <div className="mt-card-body">
                                        <div className="mt-translated-txt"
                                            style={
                                                (targetLanguage[0].id === 4 || targetLanguage[0].id === 31 || targetLanguage[0].id === 83 || targetLanguage[0].id === 31
                                                    || targetLanguage[0].id === 60 || targetLanguage[0].id === 101 || targetLanguage[0].id === 88 || targetLanguage[0].id === 106) ?
                                                    { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr', textAlign: 'left' }
                                            }
                                        >
                                            {mtResponses !== null ? mtResponses[targetLanguage[0].id]?.Amazon_Translate : ''}
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="instant-button-row">
                        <ButtonBase className="translate-btn" onClick={() => { !compareMTLoader && handleMtSampleSelectBtn() }}>{t("select_and_translate")}</ButtonBase>
                    </div>
                </div>
            </Rodal>)}
            
            {/* change nav to display model */}
            {/* <Prompt
                when={checkform.current || isOpenFromList.current}
                message={handleBlockedNavigation}
            /> */}
            <ReactRouterPrompt when={handleBlockedNavigation}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        visible={isActive}
                        {...modaloptions}
                        showCloseButton={false}
                        className="ai-mark-confirm-box"
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("leave_page_confirm_head")}</div>
                                <div>{t("leave_modal_note")}</div>
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

            {/* modal for user source change confirmation */}
            {(showSourceChangeConfimationModal) && (<Rodal
                visible={showSourceChangeConfimationModal}
                {...modaloptions}
                showCloseButton={false}
                className={"ai-mark-confirm-box " + (isSourceTextChanged && isContentPostedited ? "instant-change-confirm-modal" : "")}
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowSourceChangeConfimationModal(false) }}><CloseIcon /></span></div>
                        <div>
                            {
                                (isSourceTextChanged && isMainMtChanged && isContentPostedited) ? t("src_mt_engine_changed") :
                                    isSourceTextChanged ? t("src_text_changed")
                                        : (isMainMtChanged && isContentPostedited) ? t("mt_engine_changed") : ''
                            }
                        </div>
                        <div>
                            {
                                (isSourceTextChanged && isMainMtChanged) ?
                                    t("src_mt_engine_note")
                                    : isSourceTextChanged ?
                                        t("src_text_note")
                                        : isMainMtChanged ?
                                            t("mt_engine_note")
                                            :
                                            ""
                            }
                        </div>
                    </div>
                    <div className="apply-to-all-parent">
                        <Checkbox
                            id="dont-show-again"
                            className={"cell-box"}
                            size="small"
                            checked={dontShowAgain}
                            onChange={handleDontShowAgainCheckbox}
                        /> <label htmlFor="dont-show-again">{t("dont_show_message")}</label>
                    </div>
                    {/* {
                    isContentPostedited ? (
                        <div>
                            It looks like you have edited the translation. Changing the
                            {(isSourceTextChanged && isMainMtChanged) ? " source and MT engine" : isSourceTextChanged ? " source text" : isMainMtChanged ? " MT engine" : "" } 
                            &nbsp;will cause loss of post-edited data.
                        </div>
                    ) : (
                        <div>
                            Do you want to keep the same source text for all languages of this project?
                        </div>
                    )
                } */}
                    {/* {
                    (isSourceTextChanged && isContentPostedited) && (
                        <div className="apply-to-all-parent">
                            <Checkbox
                                id="apply-to-all"
                                className={"cell-box"}
                                size="small"
                                checked={sourceApplyToAll}
                                onChange={handleSourceApplytoAllCheckbox}
                            /> <label htmlFor="apply-to-all">Apply same source text to all task</label> 
                        </div>
                    )
                } */}
                    <div className="confirm-bottom">
                        <div style={(isSourceTextChanged && isMainMtChanged) ? {} : { marginTop: '0px' }}>
                            <Button onClick={() => { (isSourceTextChanged && isContentPostedited) ? setShowSourceChangeConfimationModal(false) : handleSouceEditNoBtn() }}>{(isSourceTextChanged && !isContentPostedited) ? t("no") : t("close")}</Button>
                            <Button
                                onClick={() => handleSourceEditYesBtn()}
                                style={{ width: 'auto', background: '#0078D4', color: '#FFFFFF' }}
                                variant="contained"
                            >
                                {isConfirmContinue &&
                                    <div className="save-btn-spinner" style={{ marginRight: (isSourceTextChanged && !isContentPostedited) ? '10px' : '0 ', marginBottom: '4px', display: 'inline-block' }}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>} <span>{(isSourceTextChanged && !isContentPostedited) ? t("yes") : t("continue")}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}

            {popoverTarget != null && (
                <div>
                    <Popover
                        className="spellcheck-popover-box"
                        placement="bottom"
                        isOpen={popoverOpen && document?.getElementById(popoverTarget) != null}
                        target={popoverTarget}
                    >
                        <PopoverHeader>{spellCheckPopoverContent}</PopoverHeader>
                    </Popover>
                </div>
            )}
            {showIndividualAssignManage &&
                <MainAssignManage
                    showIndividualAssignManage={showIndividualAssignManage}
                    setShowIndividualAssignManage={setShowIndividualAssignManage}
                    assignStep={1}
                    selectedFileRow={selectedFileRow}
                    targetLanguageOptionsRef={targetLanguageOptionsRef}
                />
            }

            
        </React.Fragment>
    );
};

export default InstantTextTranslate;
