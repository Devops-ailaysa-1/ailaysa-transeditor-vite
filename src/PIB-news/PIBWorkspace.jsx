/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap";
import $ from 'jquery';
import parse from "html-react-parser";
import React, { useState, useEffect, createRef, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import Config from "../vendor/Config";
import Navbar from "../vendor/Navbar";
import Draggable from "react-draggable";
import Tooltip from '@mui/material/Tooltip';
// import { makeStyles } from '@mui/styles';
import ButtonBase from '@mui/material/ButtonBase';
// import { TransliterationProvider } from "../vendor/google-input-tools/transliteration-provider";
// import "../vendor/google-input-tools/styles/style.scss"
import Cookies from "js-cookie";
import Cursor from "../vendor/Cursor";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import TourTooltip from "../tour/TourTooltip";
import Skeleton from '@mui/material/Skeleton';
import { MessageTypingAnimation } from "../loader/MessageTypingAnimation";
import SimpleRodals from "../project-setup-components/rodals/SimpleRodals";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ReactSelect, { components } from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import DOMPurify from "isomorphic-dompurify";
import sanitizeHtml from 'sanitize-html-react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MainAILoader } from "../loader/MainAILoader";
import { useSelector } from "react-redux";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import SquareIcon from '@mui/icons-material/Square';
import VoiceTyping from '../vendor/custom-component/VoiceTyping'
import ContentCopyIcon from "../vendor/styles-svg/Content-copy-icon";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { webSpeechLang } from "../project-setup-components/speech-component/text-to-speech/WebSpeechLang";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "../vendor/styles-svg/DeleteIcon";
import { TextareaAutosize } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { t } from "i18next";
import generateKey from "../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import { Popover as MUIPopover } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CircularProgress from '@mui/material/CircularProgress';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import RichTexteditor from "../vendor/custom-component/RichTexteditor";
import NoSegmentImg from "../assets/images/no_segments_icon.png";
import BlackCloseIcon from '../assets/images/new-ui-icons/close_black.svg';
import PushPin from "../assets/images/new-project-setup/push_pin.svg";
import ArrowRightAltColor from "../assets/images/new-ui-icons/arrow_right_alt_color.svg";
import NorCopyContent from "../assets/images/new-ui-icons/nor-copy-content.svg";
import OpenInNew from "../assets/images/new-ui-icons/open_in_new.svg";
import InsuffientIcon from "../assets/images/new-ui-icons/insuffient-icon.svg";
import RemoveCircleRed from "../assets/images/new-ui-icons/remove_circle_red.svg";
import ErrorBlackWarn from "../assets/images/new-ui-icons/error_black_warn.svg";
import WikipediaIcon from "../assets/images/new-ui-icons/wiki-new-img.svg";
import WikitionaryIcon from "../assets/images/new-ui-icons/wikitionary-new-img.png";
// import { getTransliterateSuggestions } from "react-transliterate";

// const useStyles = makeStyles((theme) => ({
//     selectBox: {
//         height: 28,
//         padding: "4px 2px",
//         borderRadius: "2px",
//         backgroundColor: "transparent",
//         "&:hover, :focus": {
//             backgroundColor: "#E8F0FE",
//         },
//         "& .MuiSelect-select.MuiSelect-select": {
//             paddingRight: "20px !important",
//             paddingLeft: 0,
//             paddingTop: 0,
//             paddingBottom: 0,
//             "&:focus": {
//                 backgroundColor: "transparent",
//             }
//         },
//         "& .MuiOutlinedInput-notchedOutline": {
//             border: "0px solid darkgrey",
//             padding: 0,
//         },
//         "& .MuiSvgIcon-root": {
//             color: "#5F6368",
//             fontSize: 20,
//         },
//     },
//     selectOptions: {
//         "& .MuiMenu-list": {
//             padding: "21px 0px"
//         },
//         "& .MuiListItem-root": {
//             fontSize: 14,
//             lineHeight: 1.3,
//             color: "#3C4043",
//         },
//         "& .MuiListItem-root:hover": {
//             backgroundColor: "#F1F3F4"
//         },
//         "& .MuiListItem-root.Mui-selected": {
//             color: "#202124",
//         },
//         "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
//             backgroundColor: "#F1F3F4"
//         },
//         "& .MuiCheckbox-root": {
//             color: "#5F6368",
//             padding: "5px",
//             "&:hover": {
//                 backgroundColor: "#F1F3F4"
//             }
//         },
//         "& .MuiCheckbox-colorSecondary": {
//             "&.Mui-checked": {
//                 color: "#0074D3"
//             }
//         }
//     }
// }));

const filterMenuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "right",
    },
    PaperProps: {
        style: {
            width: 265,
            borderRadius: 4,
            boxShadow: "0px 2px 8px #0000002E",
            "& .MuiList-root": {
                padding: "21px 0px"
            }
        },
    }
};

const PIBWorkspace = (props) => {
    Config.redirectIfNotLoggedIn(props); //Redirect to login page if not logged in
    let userToken = new URLSearchParams(window.location.search).get("token");
    /* If coming with token from some other app like ailaysa.com. No longer used - start */
    if (userToken != null) {
        let userState = {
            token: userToken,
            isLoggedIn: true,
            fromAilaysa: true,
        };
        Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
        Cookies.set(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, JSON.stringify(userState), { domain: Config.COOKIE_DOMAIN });
        Config.userState = JSON.parse(Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME));
    } else Config.redirectIfNotLoggedIn(props);
    /* If coming with token from some other app like ailaysa.com. No longer used - start */
    const location = useLocation();
    const history = useNavigate();
    const params = useParams();
    // const classes = useStyles();
    const userDetails = useSelector((state) => state.userDetails.value);
    /* State constants - start */
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [didMount, setDidMount] = useState(false); // To verify the app loaded
    const [projectName, setProjectName] = useState("");
    const [isSegmentLoading, setIsSegmentLoading] = useState(true);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [sourceLanguageId, setSourceLanguageId] = useState(0);
    const [targetLanguage, setTargetLanguage] = useState("");
    const [fileName, setFileName] = useState("");
    const [targetLanguageId, setTargetLanguageId] = useState(0);
    const [sourceLanguageCode, setSourceLanguageCode] = useState("");
    const [targetLanguageCode, setTargetLanguageCode] = useState("");
    const [targetLanguageScript, setTargetLanguageScript] = useState("");
    const [documentId, setDocumentId] = useState(0);
    const [translatedResponse, setTranslatedResponse] = useState([]);
    const [translatedFullResponse, setTranslatedFullResponse] = useState(null);
    const [outputFileName, setOutputFileName] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [segmentsPerPage, setSegmentsPerPage] = useState(20);
    const [paginationContent, setPaginationContent] = useState("");
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [previousPageUrl, setPreviousPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [unsavedChangesPages, setUnsavedChangesPages] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [bgColors, setBgColors] = useState(["#1A73E8"]);
    const [focusedDivId, setFocusedDivId] = useState("");
    const [translationMatches, setTranslationMatches] = useState([]);
    const [tbxData, setTbxData] = useState([]);
    const [glossaryData, setGlossaryData] = useState([]);
    const [showTmSection, setShowTmSection] = useState(false);
    const [showToolbarSection, setShowToolbarSection] = useState(true);
    const [completeAllWrap, setCompleteAllWrap] = useState(false);
    const [segmentStatusOptions, setSegmentStatusOptions] = useState([]);
    const [stateKeyVal, setStateKeyVal] = useState(null);
    /*Find and replace - start*/
    const [showFindReplace, setShowFindReplace] = useState(false);
    const [sourceFindTerm, setSourceFindTerm] = useState("");
    const [targetFindTerm, setTargetFindTerm] = useState("");
    const [showReplaceSection, setShowReplaceSection] = useState(false);
    const [showSpecialCharacters, setShowSpecialCharacters] = useState(false);
    const [showFormatSize, setShowFormatSize] = useState(false);
    const [showGlossary, setShowGlossary] = useState(false);
    const [findTerm, setFindTerm] = useState("");
    const [findSelectedSegmentId, setFindSelectedSegmentId] = useState(null);
    const [replaceTerm, setReplaceTerm] = useState("");
    const [findArea, setFindArea] = useState("source");
    const [caseMatch, setCaseMatch] = useState(false);
    const [wholeWordMatch, setWholeWordMatch] = useState(false);
    const [pushPinActive, setPushPinActive] = useState(false);
    const [segmentStatusName, setSegmentStatusName] = useState([]);
    const [forceRender, setForceRender] = useState(false);  
    /*Find and replace - end*/
    const [segmentStatuses, setSegmentStatuses] = useState({
        0: t("un_opened"),
        101: t("tm_unconfirmed"),
        102: t("tm_confirmed"),
        103: t("mt_unconfirmed"),
        104: t("mt_confirmed"),
        105: t("manual_unconfirmed"),
        106: t("manual_confirmed"),
        107: t("copy_from_the_source") /*, 108: 'Locked'*/,
        109: t("reviewing"),
        110: t("reviewed"),
    });
    const [allSegmentStatusState, setAllSegmentStatusState] = useState({});
    const [wikipediaData, setWikipediaData] = useState({ source: "", sourceUrl: "", target: "", targetUrls: "" });
    const [wiktionaryData, setWiktionaryData] = useState({ source: "", sourceUrl: "", targets: [], targetUrls: [] });
    const [specialCharacters, setSpecialCharacters] = useState([
        "؋",
        "฿",
        "₵",
        "₡",
        "¢",
        "$",
        "₫",
        "֏",
        "€",
        "ƒ",
        "₣",
        "₲",
        "₴",
        "₭",
        "₺",
        "₼",
        "₦",
        "₱",
        "£",
        "元",
        "圆",
        "圓",
        "﷼",
        "៛",
        "₽",
        "₹",
        "Rp",
        "රු",
        "૱",
        "௹",
        "₨",
        "₪",
        "৳",
        "₸",
        "₮",
        "₩",
        "¥",
        "円",
    ]);
    const [concordanceData, setConcordanceData] = useState([]);
    const [qaCount, setQaCount] = useState();
    const [qaCountShow, setQaCountShow] = useState(false);
    const [selectedFindStatus, setSelectedFindStatus] = useState(null);
    const [findStatus, setFindStatus] = useState([]);
    const [visibleQaSectionId, setVisibleQaSectionId] = useState(0);
    const [commentsData, setCommentsData] = useState([]);
    const [dictionaryTerm, setDictionaryTerm] = useState(null);
    const [dictionaryTermType, setDictionaryTermType] = useState("source");
    const [qaData, setQaData] = useState([]);
    const [qaContent, setQaContent] = useState([]);
    const [showSpellCheckPopover, setShowSpellCheckPopover] = useState(false);
    const [spellCheckPopoverContent, setSpellCheckPopoverContent] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverTarget, setPopoverTarget] = useState(null);
    const [replaceContentUsedIds, setReplaceContentUsedIds] = useState([]);
    const [advancedOptionVisibility, setAdvancedOptionVisibility] = useState(false);
    const [filterVisibility, setFilterVisibility] = useState(false);
    const [sourceLanguageFontSize, setSourceLanguageFontSize] = useState(15);
    const [targetLanguageFontSize, setTargetLanguageFontSize] = useState(15);
    const [showSpellCheckIcon, setShowSpellCheckIcon] = useState(false);
    const [enableSpellCheck, setEnableSpellCheck] = useState(false);
    const [showDictionary, setShowDictionary] = useState(false);
    const [segmentation, setSegmentation] = useState(true);
    const [enableIME, setEnableIME] = useState(null);
    const [posData, setPosData] = useState([]);
    const [confirmedSegmentsCount, setConfirmedSegmentsCount] = useState(0);
    const [totalSegmentsCount, setTotalSegmentsCount] = useState(0);
    const [segmentStatusPercentage, setSegmentStatusPercentage] = useState(0);
    const [replaceConfirm, setReplaceConfirm] = useState(false);
    const [showCreditAlert, setShowCreditAlert] = useState(false);
    const [showCreditAlertRedirection, setShowCreditAlertRedirection] = useState(false);
    const [creditAlertTxt, setCreditAlertTxt] = useState(t("insufficient_credits_note"));
    const [showIME, setShowIME] = useState(false);
    const [synonymData, setSynonymData] = useState([]);
    const [showSynonymPopover, setShowSynonymPopover] = useState(false);
    const [synonymPopoverContent, setSynonymPopoverContent] = useState("");
    const [synonymPopoverOpen, setSynonymPopoverOpen] = useState(false);
    const [synonymPopoverTarget, setSynonymPopoverTarget] = useState(null);
    const [enableFileDownload, setEnableFileDownload] = useState(false);
    const [tourStepIndex, setTourStepIndex] = useState(0);
    const [isProductTourSeen, setIsProductTourSeen] = useState(true);
    const [mergeSelectedSegmentIds, setMergeSelectedSegmentIds] = useState([]);
    const [isShowMergeIcon, setIsShowMergeIcon] = useState(false);
    const [tagTourStepIndex, setTagTourStepIndex] = useState(0);
    const [isTagTourSeen, setIsTagTourSeen] = useState(true);
    const [firstTagSegmentId, setFirstTagSegmentId] = useState(null);
    const [isShowRestoreSegmentIcon, setIsShowRestoreSegmentIcon] = useState(false);
    const [restoreSegmentation, setRestoreSegmentation] = useState([]);
    const [enableSynonym, setEnableSynonym] = useState(false);
    const [isWordsCorrected, setIsWordsCorrected] = useState(false);
    const [isWordsCorrectedTrigger, setIsWordsCorrectedTrigger] = useState(false);
    const [totalCharCount, setTotalCharCount] = useState(null);
    const [updatedFileDownload, setUpdatedFileDownload] = useState(null);
    const [paraphraseText, setParaphraseText] = useState("");
    const [paraphraseTrigger, setparaphraseTrigger] = useState(false);
    const [synonymText, setSynonymText] = useState("");
    const [grammarPopoverOpen, setGrammarPopoverOpen] = useState(false);
    const [paraphrasePopoverOpen, setParaphrasePopoverOpen] = useState(false);
    const [paraPhraseResList, setParaPhraseResList] = useState([]);
    const [paraPhraseTag, setparaPhraseTag] = useState("");
    const [paraPhrasePopoverTarget, setparaPhrasePopoverTarget] = useState("");
    const [synonymsResList, setSynonymsResList] = useState([]);
    const paraPhraseRef = useRef(null);
    const [grammarCheckPopoverTarget, setgrammarCheckPopoverTarget] = useState("");
    const [grammarCheckSuggestedSentence, setGrammarCheckSuggestedSentence] = useState([]);
    const [grammarCheckResponse, setGrammarCheckResponse] = useState([]);
    const [translateSwitch, setTranslateSwitch] = useState(false);
    const [showParaphraseBtn, setShowParaphraseBtn] = useState(true);   // hide paraphrase button when contenteditable is empty
    const [isTranslatedAudioFileAvailable, setIsTranslatedAudioFileAvailable] = useState(null);
    const [synonumSelectionObject, setSynonumSelectionObject] = useState(null);
    // const [updatedFileDownload, setUpdatedFileDownload] = useState(null);
    const [taskAssignUserDetails, setTaskAssignUserDetails] = useState(null);
    const [isUserIsReviwer, setIsUserIsReviwer] = useState(false);
    const [steps, setSteps] = useState([]);
    const [stepOptions, setStepOptions] = useState([]);
    const [audioFileAlreadyExist, setAudioFileAlreadyExist] = useState(false);
    const [disbaleSplitIcon, setDisbaleSplitIcon] = useState(true);
    // Auido Download States
    const [showAudioOptionsModal, setShowAudioOptionsModal] = useState(false);
    const [localeOptions, setLocaleOptions] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [audioLocale, setAudioLocale] = useState(null);
    const [audioGender, setAudioGender] = useState(null);
    const [voiceType, setVoiceType] = useState(null);
    const [partialPretranslate, setPartialPretranslate] = useState(false);
    const [splitLoader, setSplitLoader] = useState(false);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [showMtDisabledModal, setShowMtDisabledModal] = useState(false);
    const [imeTextObject, setImeTextObject] = useState('');
    const [imeTextObjectTarget, setTextImeObjectTarget] = useState('');
    const [isConfirmBtnClicked, setIsConfirmBtnClicked] = useState(false);
    const [selectedPageSize, setSelectedPageSize] = useState(null);
    const [showInsufficientConfirmAllModal, setShowInsufficientConfirmAllModal] = useState(false);
    const [showAiLoader, setShowAiLoader] = useState(false);
    const [mtEnable, setMtEnable] = useState(false);
    const [isWorkspaceEditable, setIsWorkspaceEditable] = useState(true);
    const [showDocumentSubmitButton, setShowDocumentSubmitButton] = useState(false);
    const [enableDocumentSubmitBtn, setEnableDocumentSubmitBtn] = useState(false);
    const [showVendorComplaintReasonModal, setShowVendorComplaintReasonModal] = useState(false);
    const [vendorReturnRequestReasonText, setVendorReturnRequestReasonText] = useState('');
    const [showReturnRequestBtn, setShowReturnRequestBtn] = useState(false);
    const [showDontHaveEditingAccessAlertModal, setShowDontHaveEditingAccessAlertModal] = useState(false);
    const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
    const [segmentDifference, setSegmentDifference] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedParaphrase, setSelectedParaphrase] = useState(null);
    const [isParaphrasing, setIsParaphrasing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const [commentsDataCopy, setCommentsDataCopy] = useState([]);
    const [isDocumentSubmitting, setIsDocumentSubmitting] = useState(false);
    const [isAssignEnable, setIsAssignEnable] = useState(true);
    const [transphrasePopoverOpen, setTransphrasePopoverOpen] = useState(false);
    const [transphrasePopoverTarget, setTransphrasePopoverTarget] = useState(null);    
    const [spellCheckWordsOptions, setSpellCheckWordsOptions] = useState([]);    
    const [isSegmentConfirming, setIsSegmentConfirming] = useState(false);    
    const [isSegmentPageLoading, setIsSegmentPageLoading] = useState(false);
    const [spellCheckSuggestion, setSpellCheckSuggestion] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [storySelectionText, setStorySelectionText] = useState("");
    // const [selectionObject, setselectionObject] = useState(null);    
    /* State constants - end */

    const pageSizeOption = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 50, label: '50' },
    ];
    
    /*useRef() constants - start*/
    let scrl = useRef(null);
    const imeTextObjectTargetRef = useRef('');
    const allSegmentStatuses = useRef({});
    const downloadTrigger = useRef(null);
    const findTriggerCount = useRef(0);
    const uniqueFindIdNumber = useRef(0);
    const lastCalledFunction = useRef("");
    const lastCalledArgs = useRef({ functionName: "" });
    const occurrenceData = useRef(null);
    const occurrenceDataPage = useRef(null);
    const occurrenceDataTotalPages = useRef(null);
    const findHighlightSegment = useRef(null);
    const finalHighlightId = useRef(null);
    const enabledTransliteration = useRef([]);
    const findTermRef = useRef();
    const spellCheckData = useRef([]);
    const showDictionaryRef = useRef();
    const showTagsRef = useRef();
    const copySourceToTargetRef = useRef();
    const nerRef = useRef();
    const sourceTextDiv = useRef([]);
    const targetContentEditable = useRef([]);
    const notSavedStatus = useRef([]);
    const workspaceRow = useRef([]);
    const savedStatus = useRef([]);
    const saveBtn = useRef([]);
    // const correctWordRef = useRef([]);
    const toggleSpellCheckBtn = useRef(null);
    const toggleIMEBtn = useRef(null);
    const toggleSynonymBtn = useRef(null);
    const allSegmenswrapBtn = useRef(null);
    const sourceLanguageFontSizeRef = useRef(15);
    const targetLanguageFontSizeRef = useRef(15);
    const findIds = useRef([]);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const segUpdateTyping = useRef(false);
    const segUpdateTypingTimeout = useRef(0);
    const ctrlAClicked = useRef(false);
    const focusedDivIdRef = useRef(null);
    const insertedDivIds = useRef([]);
    const selectedContenteditable = useRef(null);
    const childNodeIndex = useRef(null);
    const contentEditableCursorRange = useRef(null);
    const rightAlignLangs = useRef(["Arabic", "Urdu", "Hebrew", "Pashto", "Sindhi", "Yiddish", "Persian"]);
    const isNerActive = useRef(false);
    const synonymHighlightRef = useRef();
    const caretRange = useRef(null);
    const selectedTagDiv = useRef(null);
    const workspaceFeaturRef = useRef(null);
    const workspaceFeaturePosition = useRef();
    const isShowTags = useRef(true);
    const footerToolbarHeightRef = useRef(200);
    const selectedTextUnit = useRef([]);
    const mergeIcon = useRef(null);
    const mergeSelectedSegmentNos = useRef([]);
    const restoreSegmentIcon = useRef(null);
    const segmentIdRef = useRef(null);
    const sourceTextUnitRef = useRef(null);
    const isSegmentMergeRef = useRef(null);
    const isMergedRef = useRef(false);
    const isRestoredRef = useRef(false);
    const isSplitRef = useRef(false);
    const errorNoteCount = useRef(0);
    const didMountRef = useRef(false);
    const prevPageInfo = useRef(null);
    const axiosTransliterationAbortControllerRef = useRef(null);
    const isDocumentOpenerVendorRef = useRef(false);
    const documentProgressRef = useRef(null);
    const isAssignEnableRef = useRef(true);
    const documentTaskIdRef = useRef(null);
    const isTaskReassignedRef = useRef(false);
    const documentSubmitStepRef = useRef(null);
    const isDocumentSubmittedRef = useRef(false);
    const docCreditCheckAlertRef = useRef(false);
    const translatedResponseRef = useRef([]);
    const translatedResponseDisableEditRef = useRef([]);
    const isEditorSubmittedDocument = useRef(false);
    const isWorkspaceEditableRef = useRef(true);
    const documentRestrictionReasonRef = useRef(null);
    const translatedFullResponseref = useRef(null);
    const translatedDataResponseref = useRef(null);
    const tarLangRef = useRef(null);
    const sourceLangRef = useRef(null);
    /*useRef() constants - end*/

    /* createRef() constants - start */
    const toolbarsRef = createRef(null);
    const specialCharSectionRef = createRef(null);
    const replaceTargetRef = createRef(null);
    const findSourceRef = createRef(null);
    const findTargetRef = createRef(null);
    const caseMatchRef = createRef(null);
    const wholeWordMatchRef = createRef(null);
    const qaSection = createRef();
    const commentTextArea = createRef();
    const tmTabButton = createRef();
    const concordanceTabButton = createRef();
    const commentsTabButton = createRef();
    const qaTabButton = createRef();
    const dictionaryTabButton = createRef();
    const paraphraseTabButton = createRef();
    const dictionaryTermRef = createRef();
    const deleteSegmentTranslationRef = createRef();
    const showFormatSizeRef = createRef();
    const showFindReplaceRef = createRef();
    const showConcoradanceRef = createRef();
    const showSpecialCharactersRef = createRef();
    const showGlossaryRef = createRef();
    const contentEditableParentRef = createRef();
    const selectionRangeRef = useRef();
    const lowCreditAlertCounter = useRef(1);
    const segmentDiffButton = useRef(null);
    const prevPathRef = useRef(null);
    const pageSizeFromApi = useRef(null);
    const segmentStatusOptionsRef = useRef(null);
    const confirmedSegmentListFromConfirmAll = useRef([]);
    const showAllSegmentsConfirmedToastRef = useRef(true);
    const taskDataRef = useRef(null);
    const recognition = useRef(null);    
    const savedCursorPositionRef = useRef(null);
    const commentScrollingDivRef = useRef(null);    
    const istargetSegmentOnBlurTriggeredRef = useRef(false);
    const isMovedFromLastSegmentConfirmRef = useRef(false);
    // new spell-check modal implementation states
    const [rectElement, setRectElement] = useState(null);
    const clickedMarkEleRef = useRef(null);
    const clickedWrongWordRef = useRef(null);
    const spellCheckResponseRef = useRef([]);
    const editorRef = useRef(null);
    const axiosGlossarySearchTermAbortControllerRef = useRef(null);
    const itemToParaphraseRef = useRef(null);
    const selectionTextRef = useRef("");

    const transphraseId = transphrasePopoverOpen ? "simple-popover" : undefined;
    let userSelectionCallTimer = null;

    // filterMenuProps.PaperProps.className = classes.selectOptions;
    const writerAreaDiv = document.querySelector(".federal-segment-wrapper .note-editable");
    const newsSourceDiv = document.querySelector("#source-text-div-3");
    const targetNoteEditableDiv = document.querySelector('.note-editable');

    // Use useEffect to attach scroll event listeners
    useEffect(() => {
        const handleScroll = (event) => {
            const scrollValue = event.target.scrollTop;
            setScrollPosition(scrollValue);
            // Synchronize the other div's scroll position
            if (event.target === newsSourceDiv) {
                writerAreaDiv.scrollTop = scrollValue;
            } else {
                newsSourceDiv.scrollTop = scrollValue;
            }
        };
        if(newsSourceDiv && writerAreaDiv){
            newsSourceDiv?.addEventListener("scroll", handleScroll);
            writerAreaDiv?.addEventListener("scroll", handleScroll);
        }
        // Clean up the event listeners when the component unmounts
        return () => {
            if(newsSourceDiv && writerAreaDiv){
                newsSourceDiv?.removeEventListener("scroll", handleScroll);
                writerAreaDiv?.removeEventListener("scroll", handleScroll);
            }
        };
    }, [newsSourceDiv, writerAreaDiv]); // Empty dependency array ensures the effect runs once when the component mounts
   
    const customPageSelectStyles = {
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
            zIndex: 10,

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
            fontWeight: "500",
            lineHeight: 1.3,
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #d7d7d7" : "1px solid #d7d7d7",
            borderRadius: 3,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#262626" : "#262626",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: 1,
            boxShadow: 0,
            height: 24,
            width: 29,
            minHeight: 24,
            marginRight: 8,
            padding: 0,
            justifyContent: "center",
            "&:hover": {
                color: "#262626",
                cursor: 'pointer'
            },
        }),
    };
    
    useEffect(() => {
        if (location.state?.partial) {
            setPartialPretranslate(true);
        }
    }, [location.state]);

    useEffect(() => {
        if(userDetails === null) return;
        queryParamExistUrl();
        getSteps();
        setDidMount(true); // Component is mount (App loaded)
        didMountRef.current = true;
        if (location?.state?.sourceLanguage != null) {
            setSourceLanguage(location.state.sourceLanguage);
            setTargetLanguage(location.state.targetLanguage);
            setSourceLanguageId(location.state.sourceLanguageId);
            setTargetLanguageId(location.state.targetLanguageId);
            setFileName(location.state.fileName);
            setDocumentId(params.documentId);
        } else if (params?.documentId != null) {
            // Check documentId is exist in the url
            setDocumentId(params.documentId);
            getDocumentDetailsById(params.documentId);
        } // If laguage data or document id is not present, redirect to file-upload page
        else history("/file-upload");
        makeSegmentStatusOptions();
        getSavedPageSize();
        // history.listen((location, action) => {
        //     removeIMESuggestion();
        //     /* if (enableIME) {
        //         targetContentEditable.current[focusedDivIdRef.current].current.blur()
        //         setTimeout(() => {
        //             window.location.reload()
        //         }, 100)
        //     } */
        // });
        let element = workspaceFeaturRef.current; // Footer toolbar
        makeResizable(element, 10, 10);
        /* How to tour will be shown for the first time - start */
        if (typeof Cookies.get("isProductTourSeen") == "undefined")
            // Check for the product tour is not seen yet
            setIsProductTourSeen(false); // Product tour is not yet seen
        /* How to tour will be shown for the first time - end */

        /* To unselect the spellcheck by default - start (ID1)*/
        const waitForSpellCheckButton = setInterval(() => {
            // Wait for the spellcheck icon is to be rendered
            let spellcheckButton = toggleSpellCheckBtn.current;
            if (spellcheckButton) {
                spellcheckButton?.click(); // Manually clicking the spellcheck icon because it has been enabled by default
                clearInterval(waitForSpellCheckButton);
            }
        }, 0);
        /* To unselect the spellcheck by default - end */
        // set browser tab title as "Transeditor"
        document.title = 'Ailaysa | Transeditor';
    }, [userDetails]);

    /*Keep the focus of the target segment contenteditable when clicking the toolbars- start*/
    useEffect(() => {
        const handleToolbarMouseDown = (e) => e.preventDefault();
        if (toolbarsRef.current != null) toolbarsRef.current.addEventListener("mousedown", handleToolbarMouseDown, true);
        return () => {
            if (toolbarsRef.current != null) toolbarsRef.current.removeEventListener("mousedown", handleToolbarMouseDown);
        };
    }, []);
    /*Keep the focus of the target segment contenteditable when clicking the toolbars- end*/

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
            setStepOptions(stepList);
        });
    }, [steps]);

    useEffect(() => {
        /*Get cursor position in contenteditable - start*/
        const handleSelectionChange = (e) => {
            changeContenteditableSelection();
        };
        /*Get cursor position in contenteditable - end*/
        document.addEventListener("selectionchange", handleSelectionChange, false);
        return () => {
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    });

    useEffect(() => {
        const handleMouseover = (e) => {
            if(e.target.classList.contains('segment-save-btn')){
                istargetSegmentOnBlurTriggeredRef.current = true;
            }else{
                istargetSegmentOnBlurTriggeredRef.current = false;
            }            
            if (e.target.classList.contains("spellcheck-highlight")) {}
        };
        document.addEventListener("mouseover", handleMouseover, false);
        return () => {
            document.removeEventListener("mouseover", handleMouseover);
        };
    });

    useEffect(() => {
        if(enableSpellCheck){
            window.addEventListener('mousemove', getMouseMoveCoordinates);
            document.addEventListener('click', handleWrongWordClick);            
            return () => {
                window.removeEventListener('mousemove', getMouseMoveCoordinates);
                document.removeEventListener('click', handleWrongWordClick);
            }
        }
    }, [targetContentEditable.current, enableSpellCheck]);

    useEffect(() => {
        /* Keep the target contenteditable focus when clicking the spellcheck / synonum popover - start*/
        const handlePopoverClick = (e) => {
            e.preventDefault();
        };
        if (document.getElementsByClassName("popover")[0]) document.getElementsByClassName("popover")[0].addEventListener("mousedown", handlePopoverClick, false);
        return () => {
            if (document.getElementsByClassName("popover")[0]) document.getElementsByClassName("popover")[0].removeEventListener("mousedown", handlePopoverClick);
        };
        /* Keep the target contenteditable focus when clicking the spellcheck / synonum popover - end*/
    });

    // useEffect(() => {
    //     /* Keep the target contenteditable focus when clicking with the IME editor suggestions - start*/
    //     const handlePopoverClick = (e) => {
    //         e.preventDefault();
    //     };
    //     if (document.getElementsByClassName("ks-input-suggestions")[0])
    //         document.getElementsByClassName("ks-input-suggestions")[0].addEventListener("mousedown", handlePopoverClick, false);
    //     return () => {
    //         if (document.getElementsByClassName("ks-input-suggestions")[0])
    //             document.getElementsByClassName("ks-input-suggestions")[0].removeEventListener("mousedown", handlePopoverClick);
    //     };
    //     /* Keep the target contenteditable focus when clicking with the IME editor suggestions - end*/
    // });

    useEffect(() => {
        if (didMount) setDocumentId(params.documentId);
    }, [window.location.pathname, window.location.search]); // Wheever the url and query param changes

    // useEffect(() => {
    //     if (didMount) {
    //         setTimeout(() => {
    //             // To wait for click the spellcheck button to disable spellcheck by default. Ref: ID1
    //             toggleSpellcheck();
    //         }, 1500);
    //     }
    // }, [documentId]);

    // useEffect(() => {
    //     if (didMount) {
    //         getDocumentProgressData();
    //     }
    // }, [documentId, new URLSearchParams(history.location.search).get("page")]);

    useEffect(() => {
        if (didMount) {
            if (targetLanguageCode != "") {
                /*Google input tools suggestion functionality start*/
                /* let workspaceTextArea = document.getElementsByClassName("workspace-textarea")
                for (let i = 0; i < workspaceTextArea.length; i++) {
                    if (enableIME) {
                        workspaceTextArea[i].value = workspaceTextArea[i].innerText
                        enableTransliteration(workspaceTextArea[i], targetLanguageCode)
                    } else {
                        disableTransliteration(workspaceTextArea[i])
                    }
                } */
                translatedResponse.map((value, key) => {
                    //Loop all the target contenteditable
                    if (enableIME) {
                        // If enabled
                        // targetContentEditable.current[value.segment_id].current.value = targetContentEditable.current[value.segment_id].current.innerText;
                        // let instance = new TransliterationProvider(targetContentEditable.current[value.segment_id].current, targetLanguageCode);
                        // instance.addEvents(); // Enable IME in each target contenteditable
                        // enabledTransliteration.current.push(instance)
                    } else if (enableIME == false) {
                        // If disabled
                        // let instance = new TransliterationProvider(targetContentEditable.current[value.segment_id].current, targetLanguageCode)
                        // instance.removeEvents(instance.elements)
                        /* enabledTransliteration.current.map(value => {
                            value.disableTransliteration()
                        }) */
                        // if (targetContentEditable.current[value.segment_id].current != null)
                        // disableTransliteration(targetContentEditable.current[value.segment_id].current)
                    }
                });
                if (enableIME == false) {
                    // If disabled
                    if (targetContentEditable.current) {
                        targetContentEditable.current[focusedDivIdRef.current]?.current.blur(); // Make the currently focused contenteditable to save
                    }
                    setTimeout(() => {
                        window.location.reload(); // As of now just reload the page to disable
                        // history(window.location)
                    }, 100);
                }
                /*Google input tools suggestion functionality end*/
            }
        }
    }, [targetLanguageCode, enableIME]); //Whenever ebable IME Editor

    useEffect(() => {
        if(!isWorkspaceEditable && editorRef.current !== null){
            editorRef.current?.summernote('disable');
        }
        if (isDocumentOpenerVendorRef.current) {
            if (isWorkspaceEditable) {
                try{
                    // show the button to editor if the user has permission to edit the document
                    setShowDocumentSubmitButton(true);
                }catch (e) {
                    console.error(e);
                }
                // let { segments_confirmed_count, total_segment_count } = documentProgressRef.current;
                // segments_confirmed_count === total_segment_count;
                if (!isUserIsReviwer ? (true) : isEditorSubmittedDocument.current) {
                    if(isEditorSubmittedDocument.current){  
                        setShowDocumentSubmitButton(false);  
                    }else{
                        setEnableDocumentSubmitBtn(true);    
                    }
                } else {
                    if(!isUserIsReviwer) {  
                        setEnableDocumentSubmitBtn(false);
                        // setShowDocumentSubmitButton(false)
                    }else {     // for reviwer enable the button - reviewer submittion not depends on the segment confirmation
                        setEnableDocumentSubmitBtn(true);
                    }
                }
            } else {
                setShowDocumentSubmitButton(false);
            }
        } else if (taskDataRef.current) {
            // if post-editing (step-1) is not available but reviewing step is present then the project admin will act as editor the should submit the document 
            // check if step 1 is not preset and task_assign_info length is 1
            if (taskDataRef.current?.task_assign_info?.find(each => each.task_assign_detail.step !== 1) && taskDataRef.current?.task_assign_info?.length === 1) {
                // let { segments_confirmed_count, total_segment_count } = documentProgressRef.current;                
                if(!isEditorSubmittedDocument.current)  // check if document is already submitted - if not submitted show the button 
                    setShowDocumentSubmitButton(true);
            }
        }
    }, [isWorkspaceEditable, documentProgressRef.current, isDocumentOpenerVendorRef.current, isUserIsReviwer, isEditorSubmittedDocument.current, taskDataRef.current]);

    useEffect(() => {
    }, [showDocumentSubmitButton]);
    

    useEffect(() => {
        if (!isWorkspaceEditableRef.current) {
            setShowDontHaveEditingAccessAlertModal(true);
        }
    }, [isWorkspaceEditableRef.current]);

    // ============= Voice option selection logic starts =============

    useEffect(() => {
        const localeCount = isTranslatedAudioFileAvailable?.reduce((a, { locale }) => (
            Object.assign(a, { [locale]: (a[locale] || 0) + 1 })
        ), {});
        const genderCount = isTranslatedAudioFileAvailable?.reduce((a, { gender }) => (
            Object.assign(a, { [gender]: (a[gender] || 0) + 1 })
        ), {});
        let gender_options = [];
        if (genderCount !== null && genderCount !== undefined) {
            Object?.keys(genderCount)?.map((each, index) => {
                gender_options.push({
                    value: index,
                    label: each.charAt(0) + each?.slice(1).toLowerCase()
                });
            })
        }
        let locale_options = [];
        if (localeCount !== null && localeCount !== undefined) {
            Object?.keys(localeCount)?.map((each, index) => {
                locale_options.push({
                    value: index,
                    label: each
                });
            });
        }
        setLocaleOptions(locale_options);
        setGenderOptions(gender_options);
    }, [isTranslatedAudioFileAvailable]);

    const handleLocaleChange = (selected) => {
        setAudioLocale(selected);
    }

    const handleGenderChange = (selected) => {
        setAudioGender(selected);
    }

    useEffect(() => {
        if (localeOptions?.length === 1) {
            setAudioLocale(localeOptions[0]);
        }
        if (genderOptions?.length === 1) {
            setAudioGender(genderOptions[0]);
        }
    }, [localeOptions, genderOptions]);

    useEffect(() => {
        if (audioLocale !== null) {
            let filteredLocale = isTranslatedAudioFileAvailable?.filter(each => audioLocale.label.toUpperCase() == each.locale.toUpperCase());
            const filteredGender = filteredLocale?.reduce((a, { gender }) => (
                Object.assign(a, { [gender]: (a[gender] || 0) + 1 })
            ), {});
            let filteredGenderOption = [];
            if (filteredGender !== null && filteredGender !== undefined) {
                Object?.keys(filteredGender)?.map((each, index) => {
                    filteredGenderOption.push({
                        value: index,
                        label: each.charAt(0) + each?.slice(1).toLowerCase()
                    });
                });
            }
            setGenderOptions(filteredGenderOption);
        }
    }, [audioLocale]);

    useEffect(() => {
        if (audioLocale !== null && audioGender !== null) {
            let filteredRes = isTranslatedAudioFileAvailable?.filter(each => audioLocale?.label == each?.locale && audioGender?.label.toUpperCase() == each?.gender.toUpperCase())
            const filteredVoiceType = filteredRes?.reduce((a, item) => (
                Object.assign(a, { [item?.voice_type]: item })
            ), {});
            if (filteredVoiceType?.Wavenet !== undefined) {
                setVoiceType(filteredVoiceType?.Wavenet?.voice_name);
            } else if (filteredVoiceType?.Standard !== undefined) {
                setVoiceType(filteredVoiceType?.Standard?.voice_name);
            }
        }
    }, [audioLocale, audioGender]);

    useEffect(() => {
        if (didMount) {
            // spellCheck();
            // reset the paraphrase states when segment focus is changed
            setparaphraseTrigger(false);
            setParaPhraseResList([]);
            setQaData([]);
            setSegmentDifference([]);
            setQaContent([]);
            setQaCountShow(false);
            setTranslationMatches([]);
            setTbxData([]);
            setSelectedParaphrase(null);
            if(document.querySelector('.MuiTooltip-popper')){
                let tooltips = document.querySelectorAll('.MuiTooltip-popper');
                tooltips?.forEach(each => {
                    each.style.visibility = 'hidden';
                })
            }
            errorNoteCount.current = 0;
        }
    }, [focusedDivId]);

    // wrap inside mark tag
    useEffect(() => {
        if (enableSynonym && synonymText.length) {
            var selection = window.getSelection().getRangeAt(0);
            if (window.getSelection().toString().length) {
                var selectedText = selection.extractContents();
                let randomNum = Math.floor(Math.random() * 1000)
                var mark = document.createElement("mark");
                mark.id = `synonym-${randomNum}`;
                mark.style.setProperty('background-color', 'transparent', 'important');
                mark.appendChild(selectedText);
                mark.contentEditable = "true";
                selection.insertNode(mark);
                setSynonymPopoverTarget("synonym-" + randomNum);
            }
        }
        if (enableIME && imeTextObject.length) {
            var selection = window.getSelection().getRangeAt(0);
            if (window.getSelection().toString().length && imeTextObjectTarget.length != "") {
                let childMark = document?.getElementById(imeTextObjectTarget);
                if (childMark) {
                    childMark.style.setProperty('background-color', 'transparent', 'important');
                    childMark.style.setProperty('color', '#3C4043', 'important');
                }
                // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark");
            }
            // removeSpecificTag();
            if (window.getSelection().toString().length && window.getSelection().toString().trim() != "") {
                var selectedText = selection.extractContents();
                let randomNum = Math.floor(Math.random() * 1000);
                var mark = document.createElement("mark");
                mark.id = `ime-${randomNum}`;
                mark.style.setProperty('background-color', '#3390ff', 'important');
                mark.style.setProperty('color', '#ffffff', 'important');
                mark.appendChild(selectedText);
                mark.contentEditable = "true";
                selection.insertNode(mark);
                setTextImeObjectTarget("ime-" + randomNum);
                imeTextObjectTargetRef.current = "ime-" + randomNum;
            }
        }
    }, [synonymText, imeTextObject]);

    useEffect(() => {
        if (synonymPopoverTarget !== "") {
            setSynonymPopoverOpen(true);
            if (enableSynonym) {
                setSynonymsResList([]);
                if (synonymText.trim().length !== "") {
                    fetchSynonym();
                }
            }
        }
    }, [synonymPopoverTarget]);

    useEffect(() => {
        if (synonymsResList.length !== 0) {
            document.addEventListener('mousedown', outsideClickHandler);
            document.addEventListener('keyup', outsideClickHandler);
        }
        return () => {
            document.removeEventListener('mousedown', outsideClickHandler);
            document.removeEventListener('keyup', outsideClickHandler);
        }
    }, [synonymsResList]);

    useEffect(() => {
        if (targetLanguage === "English") {
            if (isWordsCorrected === true && enableSpellCheck === true) {
                if (targetContentEditable.current[focusedDivIdRef.current].current.textContent.length !== 0 ||
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML.length !== 0) {
                    // grammarCheck();
                }
            }
        }
    }, [isWordsCorrected, isWordsCorrectedTrigger]);

    // close the popover and remove the mark tag when clicked outside of the popover
    // useEffect(() => {
    //     if (grammarCheckPopoverTarget !== "") {
    //         document.addEventListener('click', (e) => {
    //             let popoverDiv = document.getElementsByClassName('popover')[0];
    //             if (!e.target.classList.contains('popover') && popoverDiv) {
    //                 setParaphraseText("");
    //                 setGrammarPopoverOpen(false);
    //                 setgrammarCheckPopoverTarget("");
    //                 setGrammarCheckResponse([]);
    //                 targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
    //                 targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,"mark");
    //                 updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
    //                 updateSegmentStatus(focusedDivIdRef.current, 103);
    //                 changeEditedStatus(focusedDivIdRef.current, "unsaved");
    //             }
    //         })
    //     }
    // }, [grammarCheckPopoverTarget]);

    useEffect(() => {
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        setGrammarCheckSuggestedSentence([]);

        grammarCheckResponse?.map((value, index) => {
            // changeSavedCaretPosition();
            if (index === 0) {
                if (value.edit.length !== 0 && value?.sentence !== " ") {
                    var selectedTextStartIndex = targetContentEditable.current[focusedDivIdRef.current].current?.textContent.indexOf(value.sentence);
                    let randomNum = Math.floor(Math.random() * 1000);
                    var mark = document.createElement("mark");
                    let txt = document.createTextNode(value.sentence);
                    mark.id = `grammar-check-${randomNum}`;
                    mark.classList.add('grammarcheck-highlight');
                    // mark.style.setProperty('background-color', 'transper', 'important');
                    mark.appendChild(txt);
                    mark.contentEditable = "true";
                    let finalTxt = targetContentEditable.current[focusedDivIdRef.current].current.innerHTML.replace(value.sentence, mark.outerHTML);
                    var doc = new DOMParser().parseFromString(finalTxt, "text/html");
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = doc.body.innerHTML.replaceAll("&nbsp;", " ");
                    // const selection = window.getSelection();
                    // const range = document.createRange();
                    // selection.removeAllRanges();
                    // range.selectNodeContents(targetContentEditable.current[focusedDivIdRef.current].current);
                    // range.collapse(false);
                    // selection.addRange(range);
                    // targetContentEditable.current[focusedDivIdRef.current].current.focus();
                    setgrammarCheckPopoverTarget("grammar-check-" + randomNum);
                    // let grammarList = [];
                    // grammarList.push(
                    //     <p key={value.corrected_sentence}  className="corrected-word"  onClick={(event) => replaceWithCorrectGrammarSentence(event, value.corrected_sentence)} >
                    //         {value.corrected_sentence}
                    //     </p>
                    // );
                    // setGrammarCheckSuggestedSentence(grammarList);
                }
            }
        })
    }, [grammarCheckResponse]);

    useEffect(() => {
        grammarCheckResponse.map((value, index) => {
            if (index === 0) {
                let grammarList = [];
                grammarList.push(
                    <p key={value.corrected_sentence}  className="corrected-word" onClick={(event, grammarCheckPopoverTarget) => replaceWithCorrectGrammarSentence(event, value.corrected_sentence, grammarCheckPopoverTarget)}>
                        {value.corrected_sentence}
                    </p>
                );
                setGrammarCheckSuggestedSentence(grammarList);
            }
        })
    }, [grammarCheckPopoverTarget]);

    // useEffect(() => {
    //     const handleMouseOverGrammar = (e) => {
    //         if (e.target.classList.contains('grammarcheck-highlight')) {
    //             if (grammarPopoverOpen === false) {
    //                 setGrammarPopoverOpen(true);
    //             }
    //         }
    //     }
    //     document.addEventListener("mouseover", handleMouseOverGrammar, false);
    //     return () => {
    //         document.removeEventListener("mouseover", handleMouseOverGrammar);
    //     };
    // });

    /* Update the pagination content whenever the page changes */
    useEffect(() => {
        if (didMount) {
            /*Highlight last segment Find Previous clicked from next page - start*/
            if (props.location?.state?.findHighlightSegment != null) {
                findHighlightSegment.current = props?.location?.state.findHighlightSegment;
                window.history.replaceState(null, "");
                // filterWithFindTerm();
                setTimeout(() => {
                    if (finalHighlightId.current != null) {
                        let element = document.getElementById("search-highlight-" + finalHighlightId.current);
                        if (element) {
                            element.classList.add("highlight-selected");
                            element.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                        setTimeout(() => {
                            findTriggerCount.current = finalHighlightId.current;
                        }, 100);
                    }
                }, 200);
                /*Highlight last segment Find Previous clicked from next page - end*/
            } else if (props?.location?.state?.highlightFirstFindTerm === true) {
                setTimeout(() => {
                    findNext();
                }, 400);
            }
            paginationContentFunction(lastCalledArgs.current.page);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        let pageParam = URL_SEARCH_PARAMS.get("page");
        let statusParam = URL_SEARCH_PARAMS.get("status");
        if (documentId !== 0) {
            if (statusParam == null || statusParam == undefined) {
                if (pageParam !== null && pageParam !== undefined) {
                    if (pageSizeFromApi.current !== null) {
                        // listSegments();
                    }
                }
            } else {
                segmentStatusFilter();
            }
        }
    }, [URL_SEARCH_PARAMS.get("page"), documentId, pageSizeFromApi.current]);

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        let statusParam = URL_SEARCH_PARAMS.get("status");
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (documentId && segmentStatusOptionsRef.current !== null) {
            if (statusParam !== null && statusParam !== undefined) {
                setFindStatus(statusParam);
                setSegmentStatusName(segmentStatusOptionsRef.current?.filter(status => statusParam.split(',').some(each => status.value === each)));
                segmentStatusFilter();
                didMountRef.current = false;
            } else {
                if (!didMountRef.current) {
                    // listSegments();
                }
            }
        }
    }, [URL_SEARCH_PARAMS.get("status"), documentId, segmentStatusOptionsRef.current]);

    useEffect(() => {
        if (didMount && translationMatches?.length !== 0) {
            tmTabButton.current?.click();
            showTmSectionFunction();
        }
    }, [translationMatches]);

    /* Prevent losing focus when select a special character */
    useEffect(() => {
        if (didMount) {
            if (specialCharSectionRef?.current != null)
                specialCharSectionRef.current.addEventListener("mousedown", (event) => {
                    event.preventDefault();
                });
        }
    }, [specialCharSectionRef]);

    /* Make the find and replace icon active when select that */
    useEffect(() => {
        if (didMount) {
            showFindReplaceRef?.current?.classList.remove("toolbar-list-icons-active");
            if (showFindReplace) showFindReplaceRef.current?.classList.add("toolbar-list-icons-active");
        }
    }, [showFindReplace]);

    /* Make the special characters icon active when select that */
    useEffect(() => {
        if (didMount) {
            showSpecialCharactersRef.current?.classList.remove("toolbar-list-icons-active");
            if (showSpecialCharacters) showSpecialCharactersRef.current?.classList.add("toolbar-list-icons-active");
        }
    }, [showSpecialCharacters]);

    /* Make the size selection icon active when select that */
    useEffect(() => {
        if (didMount) {
            showFormatSizeRef.current?.classList.remove("toolbar-list-icons-active");
            if (showFormatSize) showFormatSizeRef.current?.classList.add("toolbar-list-icons-active");
        }
    }, [showFormatSize]);

    /* Make the size selection icon active when select that */
    useEffect(() => {
        if (didMount) {
            showGlossaryRef.current?.classList.remove("toolbar-list-icons-active");
            if (showGlossary) showGlossaryRef.current?.classList.add("toolbar-list-icons-active");
        }
    }, [showGlossary]);

    /* Make the IME editor icon active when select that */
    useEffect(() => {
        if (didMount) {
            toggleIMEBtn.current?.classList?.remove("toolbar-list-icons-active");
            if (enableIME) toggleIMEBtn.current?.classList?.add("toolbar-list-icons-active");
        }
    }, [enableIME]);

    useEffect(() => {
        if (didMount) {
            toggleSynonymBtn.current?.classList?.remove("toolbar-list-icons-active");
            if (enableSynonym) {
                toggleSynonymBtn.current?.classList?.add("toolbar-list-icons-active");
            }
        }
    }, [enableSynonym])

    useEffect(() => {
        const errorHandler = (message, source, lineno, colno, error) => {
          // You can log the error or perform any other action here.
          console.error(error);
          return true; // Return true to prevent the default browser error handling
        };    
        window.onerror = errorHandler;    
        return () => {
          window.onerror = null; // Clean up the event handler when the component unmounts
        };
    }, []);
 
    useEffect(() => {
        // Create a state specifically for Parawise segmentation
        let tempParagraphSegmentsList = [];
        let tempParagraphSegment = {};
        let cacheList = [];
        let cache = {};
        let enoughObject = {
            has_comment: false,
            is_merge_start: null,
            is_merged: null,
            random_tag_ids: "",
            segment_count: null,
            segment_id: null,
            source: "",
            tagged_source: "",
            target: "",
            target_tags: "",
            temp_target: "",
            text_unit: null,
        };
        if (!segmentation) {
            for (let i = 0; i < translatedResponse?.length; i++) {
                if (!cache[translatedResponse[i]?.text_unit]) {
                    cache[translatedResponse[i]?.textUnit] = translatedResponse[i]?.textUnit;
                } else {
                    enoughObject["has_commit"] = translatedResponse[i - 1]?.has_comment || translatedResponse[i]?.has_comment;
                    enoughObject["is_merge_start"] = translatedResponse[i - 1]?.is_merge_start;
                    enoughObject["is_merged"] = translatedResponse[i - 1]?.is_merged;
                    enoughObject["random_tag_ids"] = translatedResponse[i - 1]?.random_tag_ids + " " + translatedResponse[i]?.random_tag_ids;
                    enoughObject["segment_count"] = translatedResponse[i - 1]?.segment_count;
                    enoughObject["segment_id"] = translatedResponse[i - 1]?.segment_id;
                    enoughObject["source"] = translatedResponse[i - 1]?.source + " " + translatedResponse[i]?.source;
                    enoughObject["tagged_source"] = translatedResponse[i - 1]?.tagged_source + " " + translatedResponse[i]?.tagged_source;
                    enoughObject["target"] = translatedResponse[i - 1]?.target + " " + translatedResponse[i]?.target;
                    enoughObject["target_tags"] = translatedResponse[i - 1]?.target_tags + " " + translatedResponse[i]?.target_tags;
                    enoughObject["temp_target"] = translatedResponse[i - 1]?.temp_target + " " + translatedResponse[i]?.temp_target;
                    enoughObject["text_unit"] = translatedResponse[i - 1]?.text_unit;
                    tempParagraphSegment = enoughObject;
                }
                tempParagraphSegmentsList?.push(tempParagraphSegment);
                cacheList?.push({ ...cache }, cache);
            }
        }
    }, [segmentation]);

    useEffect(() => {
        if (didMount) {
            if (dictionaryTerm != null) showDictionaryTab();
        }
    }, [dictionaryTerm, dictionaryTermType]);

    useEffect(() => {
        if (didMount) {
            concordanceTabButton.current?.click();
            scrollLeft()
        }
    }, [concordanceData]);

    /* Whever the findStatus set, redirect it with the selected statuses as query params */
    useEffect(() => {
        if (didMount) {
            if (lastCalledArgs.current.functionName == "findStatusChange") {
                let pageParam = URL_SEARCH_PARAMS.get("page");
                let url = `/workspace/${documentId}?page=1`;
                // if (pageParam != 0 && pageParam != null) url += `?page=1`;
                if (findStatus?.length !== 0) {
                    history(url + "&status=" + findStatus.toString());
                } else {
                    history(url);
                }
                // let urlWithParam = removeParamFromUrl();
                // let removableParams = ["status"];
                // if (queryParamExistUrl("page")) removableParams = ["page", "status"];
                // urlWithParam = removeParamFromUrl(removableParams);
                // history(urlWithParam);
                // let paramSeparator = "";
                // if (queryParamExistUrl()) paramSeparator = "&";
                // if (findStatus.length) {
                //     history(urlWithParam + paramSeparator + "status=" + findStatus.toString());
                // } else {
                //     if (!queryParamExistUrl()) pageSelect(currentPage);
                // }
            }
        }
    }, [findStatus]);

    useEffect(() => {
        const handleAllsegmentVisibilty = (e) => {
            if (allSegmenswrapBtn.current && !allSegmenswrapBtn.current.contains(e.target)) {
                setCompleteAllWrap(false);
            }
        };
        document.addEventListener("mousedown", handleAllsegmentVisibilty);
        return () => {
            document.removeEventListener("mousedown", handleAllsegmentVisibilty);
        };
    });

    /* Whenever the QA data changes, highlight on the source and target */
    useEffect(() => {
        if (didMount) {
            let qaContentTemp = [];
            if (typeof qaData == "string") {
                qaContentTemp?.push(
                    <li className="error-code">
                        <span className="qa-text">{qaData}</span>
                    </li>
                );
                setQaCountShow(false);
            } else {
                qaData?.map((value, index) => {
                    setQaCountShow(true)
                    if (Object.values(value)[0].source.length || Object.values(value)[0].target.length || Object.values(value)[0].ErrorNote.length) {
                        qaContentTemp.push(
                            // <u>
                            <h6 key={Object.keys(value)[0] + "-" + index}>
                                <span className="qa-text-title">{Object.keys(value)[0]?.replace('_', ' ')}</span>
                            </h6>
                            // </u>
                        );
                    }
                    Object.values(value)[0]?.source?.map((sourceTerm, key) => {
                        // lastCalledArgs.current.sourceText = highlightSearchText(sourceTerm, lastCalledArgs.current.sourceText);
                    });
                    Object.values(value)[0]?.target?.map((targetTerm, key) => {
                        // lastCalledArgs.current.translatedText = highlightSearchText(targetTerm, lastCalledArgs.current.translatedText);
                    });
                    Object.values(value)[0]?.ErrorNote?.map((errorNote, key) => {
                        qaContentTemp.push(
                            <li key={errorNote + "-" + index}>
                                <span id={"error-note-" + key} key={"error-note-" + key} className="qa-text">
                                    {errorNote} {(Object.keys(value)[0]?.replace('_', ' ')?.toLowerCase() == 'untranslatables' || Object.keys(value)[0]?.replace('_', ' ')?.toLowerCase() == 'forbidden words') && (Object.keys(value)[0]?.replace('_', ' ')?.toLowerCase() == 'untranslatables' ? ` - ${Object.values(value)[0]?.source?.map(item => `"${item}"`)?.join(', ')}` : ` - ${Object.values(value)[0]?.target?.map(item => `"${item}"`)?.join(', ')}`)}
                                </span>
                            </li>
                        );
                    });
                });
            }
            setTimeout(() => {
                if (qaData.length) {
                    setQaContent(qaContentTemp);
                    // sourceTextDiv.current[lastCalledArgs.current.segmentId].current.innerHTML = replaceTextWithTags(lastCalledArgs.current.sourceText, 'mark');
                    // targetContentEditable.current[lastCalledArgs.current.segmentId].current.innerHTML = replaceTextWithTags(lastCalledArgs.current.translatedText, 'mark');
                    updateTranslatedResponseSegment(lastCalledArgs.current.segmentId, "original", lastCalledArgs.current.sourceText, "mark");
                    updateTranslatedResponseSegment(lastCalledArgs.current.segmentId, "temp_target", lastCalledArgs.current.translatedText, "mark");
                }
            }, 100);
        }
    }, [qaData]);

    useEffect(() => {
        if (selectedPageSize) {
            let pageParam = URL_SEARCH_PARAMS.get("page");
            let statusParam = URL_SEARCH_PARAMS.get("status");
            if (statusParam == null || statusParam == undefined) {
                if (pageSizeFromApi.current != selectedPageSize?.value) {
                    saveCustomPageSize(selectedPageSize?.value);
                    let url = `/workspace/${documentId}?page=${1}`;
                    let pageParam = URL_SEARCH_PARAMS.get("page");;
                    if (pageParam != 1) {
                        history(url);
                    } else {
                        // listSegments('page-size-change');
                    }
                }
                // listSegments();
            } else {
                segmentStatusFilter();
            }
        }
    }, [selectedPageSize]);

    /* Cookie based tour show */
    useEffect(() => {
        if (didMount) {
            if (!isProductTourSeen && targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current)
                targetContentEditable.current[translatedResponse[0]?.segment_id].current.focus();
        }
    }, [isProductTourSeen]);
    
    useEffect(() => {
        if(spellCheckResponseRef.current?.length !== 0){
            highlightSpellCheckWords(focusedDivId);
        }
    }, [spellCheckResponseRef.current]);
    
    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.classList.contains("suggestion-input")) {
                //If clicking on the IME suggested input
                removeIMESuggestion();
                // return;
            }
            if (
                !hasParentClass(e.target, "workspace-features") &&
                !hasParentClass(e.target, "workspace-textarea") &&
                !e.target.classList.contains("suggestion-div")
            ) {
                // Not inside the workspace area or IME suggestion div
                // handleToggleVisibility(false);
            } else if (hasParentClass(e.target, "workspace-textarea")) {
                // Inside target contenteditable div
                /* Tag insert functionality - start */
                if (e.target.classList.contains("tag")) {
                    // If it's a tag
                    if (
                        !e.target.classList.contains("popover-header") &&
                        !e.target.classList.contains("corrected-word") &&
                        !e.target.classList.contains("react-draggable")
                    ) {
                        // If it's not spellcheck popver and not special character draggable div
                        document.querySelectorAll(".selected-tag").forEach((element) => {
                            // Remove all the selected tag (makes all are unselected)
                            if (element !== e.target) element.classList.remove("selected-tag");
                        });
                        if (e.target.classList.contains("selected-tag"))
                            // If the current element is selected tag
                            e.target.classList.remove("selected-tag"); // Make it unselected
                        else {
                            e.target.classList.add("selected-tag"); // Make the tag selected
                            selectedTagDiv.current = focusedDivIdRef.current; // To know which segment tag is selected, store the current focused segment id
                        }
                    }
                } else {
                    if (selectedTagDiv.current == focusedDivIdRef.current)
                        //Only insert into the same div
                        insertSelectedTag();
                }
                /* Tag insert functionality - end */
                let sel = window.getSelection();
                let str = sel?.anchorNode?.nodeValue;
                if (str?.length == null || str?.length == 0) return;
                let len = str.length,
                    a = sel.anchorOffset,
                    b = a;
                while (str[a] != " " && a--) { }
                if (str[a] == " ") a++; // start of word
                while (str[b] != " " && b++ < len) { } // end of word+1
                let clickedWord = str.substring(a, b);
                // sel.anchorNode.nodeValue = str.replace(clickedWord, '<span>clickedWord</span>')
                let words = {};
                // let words = { 'Friday': ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday'], 'paid': ['payment done', 'pay']}
                setSynonymData(words);
                if (clickedWord in words) {
                    setSynonymPopoverTarget(null);
                    let target = synonymHighlightRef.current;
                    if (target != null) {
                        if (target?.parentNode != null) target.outerHTML = target.innerHTML;
                    }
                    synonymCheckIt(e.target, clickedWord);
                    let thisWordData = clickedWord in words ? words[clickedWord] : [];
                    setSynonymPopoverContent("");
                    setSynonymPopoverOpen(false);
                    if (thisWordData.length) {
                        let synonymPopoverContentTemp = [];
                        target = synonymHighlightRef.current;
                        thisWordData.map((value, key) => {
                            synonymPopoverContentTemp.push(
                                <p key={key + value} className="corrected-word" onClick={(event) => changeSynonym(target, value)}>
                                    {value}
                                </p>
                            );
                        });
                        if (document.getElementById("synonym-highlight")) {
                            setSynonymPopoverContent(synonymPopoverContentTemp);
                            setSynonymPopoverTarget("synonym-highlight");
                            setSynonymPopoverOpen(true);
                        }
                    }
                }
            }            
            if(popoverOpen){
                setPopoverOpen(false);
                setPopoverTarget(null);
                setSpellCheckPopoverContent("");
            }
        };
        document.addEventListener("click", handleClick, false);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (mergeSelectedSegmentIds?.length !== 0) {
            let txt_unit = translatedResponse?.find(each => each.segment_id == mergeSelectedSegmentIds[0])?.text_unit;
            let sameTxtUnitSeg = translatedResponse?.filter(each => each.text_unit == txt_unit);
            let newArr = translatedResponse?.map(obj => {
                if (obj.segment_id == sameTxtUnitSeg?.find(each => each.segment_id == obj.segment_id)?.segment_id) {
                    return {
                        ...obj,
                        sameTxtUnit: true
                    }
                }
                return obj;
            })
            setTranslatedResponse(newArr);
        } else {
            let newArr = translatedResponse?.map(obj => {
                return {
                    ...obj,
                    sameTxtUnit: false
                }
            })
            setTranslatedResponse(newArr);
        }
    }, [mergeSelectedSegmentIds, translatedResponseRef.current]);

    // Handle footer pin
    const handlePushPinActive = (show = false) => {
        setPushPinActive(show);
    }

    const getSteps = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/steps/`,
            auth: true,
            success: (response) => {
                setSteps(response.data);
            },
        });
    }

    /* Class name for top div based on toolbar and find and replace visibility - start*/
    let workspaceAreaClassName = "";
    if (advancedOptionVisibility) workspaceAreaClassName = "workspace-editor-new-bottom-height";
    if (!advancedOptionVisibility) workspaceAreaClassName = "";
    if (showFindReplace) workspaceAreaClassName = "workspace-editor-show-tm-add-top";
    if (showFindReplace && advancedOptionVisibility) workspaceAreaClassName = "workspace-editor-show-tm-comments-add-top";
    if (!showFindReplace && !advancedOptionVisibility) workspaceAreaClassName = "";
    /* Class name for top div based on advancedOption and find and replace visibility - start*/
    /* let toolbarClassName = '';
    if (showTmSection)
        toolbarClassName = 'toolbar-parts-padd-top-remove';
    if (!showTmSection)
       toolbarClassName = 'toolbar-parts-padd-top-add toolbar-parts-padd-new-height'
    if (showToolbarSection && showTmSection)
        toolbarClassName = 'toolbar-parts-padd-both-show'; */
      
    // Handle keyboard key press on target segment
    const handleKeyDown = (e) => {       
        if (ctrlAClicked.current) {
            // To detect empty for status if the user removes the content with CTRL + A
            if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g))
                if (focusedDivIdRef.current != null) {
                    // If the pressed key is a char key not ESC shift, etc
                    updateSegmentStatus(focusedDivIdRef.current, 105);
                    changeEditedStatus(focusedDivIdRef.current, "unsaved");
                }
        }
        ctrlAClicked.current = false;
        if (e.ctrlKey) {
            if (e.key === "a") ctrlAClicked.current = true; // To Change status if user selects CTRL+A and type
            else if (e.altKey) {
                if (e.shiftKey) {
                    if (e.key === "Enter" && targetContentEditable.current[focusedDivIdRef.current].current.innerText != "")
                        // Ctrl + Alt + Shift + Enter
                        saveCurrentSegment();
                } else if (e.key === "Enter" && targetContentEditable.current[focusedDivIdRef.current].current.innerText != "") {
                    // Ctrl + Alt + Enter
                    saveAndNextSegment();
                }
            } else if (e.key === "Enter" && targetContentEditable.current[focusedDivIdRef.current].current.innerText != "") {
                // Ctrl + Enter
                saveAndNextUnsavedSegment();
            } else if (e.key === "Insert") {
                // CTRL + Insert
                if (copySourceToTargetRef?.current != null) copySourceToTargetRef.current?.click();
            }
        } else if (e.key === "Enter" || e.keyCode === 32) {
            // IME Editor Enter and spacebar to insert
            let inputSuggestionElements = document.querySelectorAll("div.ks-input-suggestions:not(.hidden)");
            if (inputSuggestionElements[0] != null) {
                // The IME suggestions are showing and not hidden
                let activeSuggestion = inputSuggestionElements[0].getElementsByClassName("suggestion-div active");
                if (activeSuggestion[0]?.innerText != null) {
                    //Get the highlighted inner text
                    //Get the highlighted inner text
                    e.preventDefault(); //Prevent adding br for Enter
                    changeSavedCaretPosition();
                    let text = "" + activeSuggestion[0]?.innerText; //Adding a space before
                    document.execCommand("insertText", false, text); //Insert at the current cursor position
                    activeSuggestion[0].classList.remove("active"); // Remove the current active highlighted after insert
                    removeIMESuggestion();
                }
            }
        } else if (e.key === "Backspace" || e.key === "Delete") {
            //If press the specified keys
            let inputSuggestionElements = document.querySelectorAll("div.ks-input-suggestions:not(.hidden)");
            if (inputSuggestionElements[0] != null) {
                // The IME suggestions are showing and not hidden
                let suggestionInput = inputSuggestionElements[0]?.childNodes[0]; //Get the input element node
                if (suggestionInput?.value) {
                    // If there is value
                    setTimeout(() => {
                        // Without time delay it returs the old value
                        if (suggestionInput?.value == "") {
                            //If all the value is cleared
                            changeSavedCaretPosition();
                            removeIMESuggestion();
                        }
                    }, 100);
                }
            }
            setTimeout(() => {
                changeContenteditableSelection();
            }, 200);
        }
    };

    // Save the caret position for currently active contenteditable div
    const changeContenteditableSelection = () => {
        if (document.activeElement.classList.contains("workspace-textarea")) {
            caretRange.current = 0;
            // saveCaretPosition();
            savedCursorPositionRef.current = saveCursorPositionWithinContenteditable();
        }
    };

    /* Insert the selected / active tag in the cursor position -start */
    const insertSelectedTag = () => {
        let selectedTag = document.querySelector(".selected-tag");
        if (selectedTag) {
            // changeSavedCaretPosition();
            const tempDiv = document.createElement("div");
            const newNode = selectedTag.cloneNode(true);
            tempDiv.appendChild(newNode);
            if (window.getSelection().toString() === "") {
                //Check for not select any text
                const isInserted = document.execCommand("insertHTML", false, tempDiv.innerHTML);
                if (isInserted) {
                    selectedTag.parentNode.removeChild(selectedTag);
                    /* To make the draggable off - start*/
                    document.querySelectorAll(".selected-tag").forEach((element) => {
                        element.classList.remove("selected-tag");
                    });
                    /* To make the draggable off - end*/
                }
            }
        }
    };
    /* Insert the selected / active tag in the cursor position -start */

    /* Get the next segment's data by current segment id */
    const getNextSegmentData = (currentDivId = null) => {
        let index = translatedResponse.findIndex((element) => element.segment_id == currentDivId);
        if (index != -1) return translatedResponse[index + 1];
        return null;
    };

    /* Get the next unsaved segment's data by current segment id */
    const getUnsavedSegmentData = (currentDivId = null) => {
        let currentSegPosition = translatedResponseRef.current?.findIndex(each => each.segment_id == currentDivId);
        let segmentAfterCurrentSeg = translatedResponseRef.current?.slice(currentSegPosition)?.filter(each => [101, 103, 105, 109].includes(each.status));
        if(segmentAfterCurrentSeg?.length !== 0)
            return segmentAfterCurrentSeg[0];
        else 
            return null;
        // let index = Object.keys(allSegmentStatusState).findIndex(
        //     (element) => element > currentDivId && [101, 103, 105].indexOf(allSegmentStatusState[element]) != -1
        // );
        // if (index != -1) return translatedResponse[index];
        // return null;
    };

    /* Save the current segment and move to next segment */
    const saveAndNextSegment = () => {
        if (focusedDivIdRef.current != null) {
            saveBtn.current[focusedDivIdRef.current].current?.click();
            setTimeout(() => {
                let nextSegmentId = getNextSegmentData(focusedDivIdRef.current)?.segment_id;
                if (targetContentEditable.current[nextSegmentId]?.current != null) targetContentEditable.current[nextSegmentId].current.focus();
            }, 200);
        }
    };

    /* Save the current segment */
    const saveCurrentSegment = () => {
        if (focusedDivIdRef.current != null) saveBtn.current[focusedDivIdRef.current].current?.click();
    };

    /* Save and go to next unconfirmed segment */
    const saveAndNextUnsavedSegment = () => {
        if (focusedDivIdRef.current != null) {
            saveBtn.current[focusedDivIdRef.current].current?.click();
            setTimeout(() => {
                let nextSegmentUnsavedId = getUnsavedSegmentData(focusedDivIdRef.current)?.segment_id;
                if (targetContentEditable.current[nextSegmentUnsavedId]?.current != null) targetContentEditable.current[nextSegmentUnsavedId].current.focus();            
            }, 100);
        }
    };

    /* Check the given class name is present in the given element or one of it's parents */
    const hasParentClass = (child, classname) => {
        if (child?.nodeName != 'svg' && child?.nodeName != 'path') { // svg don't have classname to apply split function
            if (child?.className?.split(" ").indexOf(classname) >= 0) return true;
            try {
                //Throws TypeError if child doesn't have parent any more
                return child?.parentNode && hasParentClass(child?.parentNode, classname);
            } catch (TypeError) {
                return false;
            }
        }
    };
    // ==========================================================================================

    const getCaretIndexWithinContenteditable = (element) => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return 0;
        try{
            const range = selection.getRangeAt(0);
            const preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(element);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            return preSelectionRange.toString().length;
        }catch(e){
            console.error(e);
        }
    }

    // This function will save the cursor/caret position within the contenteditable,
    // even if the contenteditable contains HTML tags and text within it
    const saveCursorPositionWithinContenteditable = () => {
        let element = targetContentEditable.current[focusedDivIdRef.current]?.current;
        const caretIndex = getCaretIndexWithinContenteditable(element);
        return { caretIndex };
    }

    // This function will set the cursor/caret position which is previously saved by the above function,
    // it works for both only text and text with html tags - inside the contenteditable
    const restoreCursorPositionWithinContenteditable = () => {
        let savedPosition = savedCursorPositionRef.current
        let element = targetContentEditable.current[focusedDivIdRef.current]?.current;
        const selection = window.getSelection();
        if (!savedPosition || !selection) return;
        const range = document.createRange();
        const { caretIndex } = savedPosition;
        const nodes = element.childNodes;
        let currentIndex = 0;
        let foundNode = null;
        for (const node of nodes) {
            const nodeLength = node.textContent.length;
            if (currentIndex + nodeLength >= caretIndex) {
                foundNode = node;
                break;
            }
            currentIndex += nodeLength;
        }
        if (!foundNode) return;
        try{
            range.setStart(foundNode, caretIndex - currentIndex);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }catch(e) {
            console.error(e);
        }
    }
    // ==========================================================================================

    const createSegmentLikeJson = (responseTemp) => {
        // 'keywords description media->caption image_caption heading authorName story location tags story_summary'        
        let segmentData = [
        {
            "source": responseTemp?.source_json?.heading,
            "target": responseTemp.target_json?.heading,
            "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.heading,
            "segment_count": 1,
            'segment_id': 1,
            type: "Headline"
        },
        // {
        //     "source": responseTemp?.source_json?.news !== undefined ? 
        //                 responseTemp.source_json.news[0].image_caption : 
        //                 responseTemp?.source_json?.image_caption,
        //     "target": responseTemp.target_json.image_caption,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.image_caption,
        //     "segment_count": 1,
        //     'segment_id': 2,
        //     type: "Image caption"
        // },
        (
            (responseTemp.source_json !== undefined ? responseTemp.source_json.story : responseTemp.source_json?.story) !== "<p><br></p>" && 
            (responseTemp.source_json !== undefined ? responseTemp.source_json.story : responseTemp.source_json?.story) !== "" &&  
            (responseTemp.source_json !== undefined ? responseTemp.source_json.story : responseTemp.source_json?.story) !== null
        ) &&
        {
            "source": responseTemp.source_json?.story,
            "target": responseTemp.target_json?.story,
            "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.story,
            "segment_count": 1,
            'segment_id': 3,
            type: "Story"
        },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].tags :
        //                 responseTemp.source_json?.tags,
        //     "target": responseTemp.target_json.tags,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.tags,
        //     "segment_count": 1,
        //     'segment_id': 4,
        //     type: "Tags"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].description:
        //                 responseTemp.source_json?.description,
        //     "target": responseTemp.target_json.description,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.description,
        //     "segment_count": 1,
        //     'segment_id': 5,
        //     type: "Description"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ?
        //                 responseTemp.source_json.news[0].keywords :
        //                 responseTemp.source_json?.keywords,
        //     "target": responseTemp.target_json.keywords,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.keywords,
        //     "segment_count": 1,
        //     'segment_id': 6,
        //     type: "Keywords"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].authorName :
        //                 responseTemp.source_json?.authorName,
        //     "target": responseTemp.target_json.authorName,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.authorName,
        //     "segment_count": 1,
        //     'segment_id': 7,
        //     type: "Author name"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].story_summary :
        //                 responseTemp.source_json?.story_summary,
        //     "target": responseTemp.target_json.story_summary,
        //     "mt_raw": responseTemp?.mt_json?.mt_raw_json?.story_summary,
        //     "segment_count": 1,
        //     'segment_id': 8,
        //     type: "Story summary"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].location :
        //                 responseTemp.source_json?.location,
        //     "target": responseTemp.target_json.location,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.location,
        //     "segment_count": 1,
        //     'segment_id': 9,
        //     type: "Location"
        // },
        // {
        //     "source": responseTemp.source_json.news !== undefined ? 
        //                 responseTemp.source_json.news[0].media[0]?.caption :
        //                 responseTemp.source_json?.media[0]?.caption,
        //     "target": responseTemp.target_json.media[0]?.caption,
        //     "mt_raw": responseTemp?.mt_json[0]?.mt_raw_json?.media[0]?.caption,
        //     "segment_count": 1,
        //     'segment_id': 10,
        //     type: "Caption (media)"
        // }
    ];
        return segmentData;
    } 

    /* Get the docuement details by document id */
    const getDocumentDetailsById = (documentIdTemp) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/pib_translate/${documentIdTemp}`,
            auth: true,
            success: (docResponse) => {
                let responseTemp = docResponse.data;
                let segmentData = [];
                try{
                    segmentData = createSegmentLikeJson(responseTemp);
                }catch(e){
                    console.error(e);
                }
                // go back to the previous page and keep open the project collapse
                if (location.state?.prevPath) {
                    let [pathname, search] = location.state.prevPath?.split("?");
                    const URL_SEARCH_PARAMS = new URLSearchParams(`?${search}`);
                    URL_SEARCH_PARAMS.set('open-project', responseTemp.task);
                    prevPathRef.current = pathname + '?' + URL_SEARCH_PARAMS.toString();
                }
                setTranslatedResponse(segmentData);
                translatedDataResponseref.current = segmentData;
                setTranslatedFullResponse(responseTemp);
                translatedFullResponseref.current = responseTemp;
                // edit_allowed key will restrict the workspace editing access
                setIsWorkspaceEditable(responseTemp.edit_allowed);
                isWorkspaceEditableRef.current = responseTemp.edit_allowed;            
                if (responseTemp.edit_allowed) { isEditorSubmittedDocument.current = false }
                else { isEditorSubmittedDocument.current = true };
                documentTaskIdRef.current = responseTemp.task;
                setAudioFileAlreadyExist(responseTemp.converted_audio_file_exists);
                setTotalCharCount(responseTemp.total_char_count);
                setSourceLanguage(responseTemp.source_language);
                sourceLangRef.current = responseTemp.source_language;
                setSourceLanguageId(responseTemp.source_language_id);
                setTargetLanguage(responseTemp.target_language);
                tarLangRef.current = responseTemp.target_language;
                setTargetLanguageId(responseTemp.target_language_id);
                setFileName(responseTemp.filename);
                setIsTranslatedAudioFileAvailable(responseTemp?.download_audio_output_file?.length ? responseTemp?.download_audio_output_file : null);
                setSourceLanguageCode(responseTemp.source_language_code);
                setTargetLanguageCode(responseTemp.target_language_code);
                setTargetLanguageScript(responseTemp.target_language_script);
                setUpdatedFileDownload(responseTemp?.updated_download === "enable" ? true : false);
                setEnableFileDownload(responseTemp?.download === "enable" ? true : false);
                setMtEnable(true);
                // setTaskAssignUserDetails(responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id)?.step_id)
                             
                if (responseTemp.doc_credit_check_open_alert) {
                    setShowCreditAlert(true);
                    setShowCreditAlertRedirection(false);
                }
                docCreditCheckAlertRef.current = responseTemp.doc_credit_check_open_alert;
                isAssignEnableRef.current = responseTemp.assign_enable;
                setIsAssignEnable(responseTemp.assign_enable);
                if (!responseTemp.assign_enable) {
                    setCreditAlertTxt(t("insufficient_credit_contact"));
                }                
                let is_user_reviewer = false;
                let is_reviewer = false;
                let is_from_reviewer = false;

                try{
                    if (userDetails?.agency) {
                        is_reviewer = responseTemp?.assign_detail?.find(each => each.assign_to_id === Config?.userState.id && location.state?.open_as === 'reviewer')?.step_id === 2
                        setIsUserIsReviwer(is_reviewer)
                        is_user_reviewer = is_reviewer
                    } else {
                        is_reviewer = responseTemp?.assign_detail?.find(each => each.assign_to_id === Config?.userState.id)?.step_id === 2
                        setIsUserIsReviwer(is_reviewer)
                        is_user_reviewer = is_reviewer
                    }
                    is_from_reviewer = responseTemp?.assign_detail?.filter(each => each.assign_to_id === Config?.userState.id && each.step_id === 2 && location.state?.open_as === 'reviewer')?.length !== 0 ? true : false
                }catch(e){
                    console.error(e)
                }
                if (location.state?.open_as !== undefined) {
                    if (location.state?.open_as !== 'editor') {
                        setIsUserIsReviwer(is_from_reviewer);
                        is_user_reviewer = is_from_reviewer;
                    }
                }
                is_user_reviewer = false;

                Config.axios({
                    url: `${Config.BASE_URL}/workspace/vendor/dashboard/${responseTemp.project}/`,
                    auth: true,
                    success: (response) => {
                        documentSubmitStepRef.current = 1;
                        let task_data = response.data?.find(each => each.id === responseTemp.task);
                        taskDataRef.current = task_data;
                        // logged in user is an agency and this task is assigned to LSP(not his own project) (LSP(reassign) -> vendor)
                        if (userDetails?.agency ) {
                            // the task whether reassigned or not, the LSP needs to work/see work and submit the document
                            isDocumentOpenerVendorRef.current = true;
                            isTaskReassignedRef.current = typeof task_data.task_reassign_info === 'boolean' ? true : false;
                            if (task_data?.task_reassign_info === null) {
                                setShowReturnRequestBtn(true);
                                // setIsWorkspaceEditable(true);
                            }
                            // task_reassign_into
                            let assign_to_data = task_data?.task_reassign_info?.find(each => ((each?.assign_to_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)));
                            let assign_by_data = task_data?.task_reassign_info?.find(each => ((each?.assigned_by_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)));
                            // task is assigned by me (view -> when task owner/admin sees)
                            if (assign_by_data?.assigned_by_details?.id === userDetails.pk) {
                                if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    // setIsWorkspaceEditable(true);
                                    isDocumentSubmittedRef.current = true;
                                } else {
                                    // setIsWorkspaceEditable(false);
                                }
                            }
                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (assign_to_data?.assign_to_details?.id === userDetails.pk) {
                                if (assign_to_data?.task_assign_detail.task_status !== "Return Request") setShowReturnRequestBtn(true);
                                else setShowReturnRequestBtn(false);
                                if (assign_to_data?.task_assign_detail.task_status === "Yet to start" || assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    // setIsWorkspaceEditable(true);
                                } else {
                                    // setIsWorkspaceEditable(false);
                                    isDocumentSubmittedRef.current = true;
                                }
                            }
                            // task_assign_info
                            let task_assign_assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)));
                            let task_assign_assign_by_data = task_data?.task_assign_info?.find(each => ((each?.assigned_by_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)));
                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (task_assign_assign_to_data?.assign_to_details?.id == userDetails.pk) {
                                isDocumentOpenerVendorRef.current = true;
                                if (task_assign_assign_to_data?.task_assign_detail.task_status !== "Return Request" && task_assign_assign_to_data?.task_assign_detail.task_status !== "Completed" && task_data.task_reassign_info === null) {
                                    setShowReturnRequestBtn(true);
                                } else if (task_assign_assign_to_data?.task_assign_detail.task_status !== "Return Request" && task_assign_assign_to_data?.task_assign_detail.task_status !== "Completed" && assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    setShowReturnRequestBtn(true);
                                } else setShowReturnRequestBtn(false);
                                if (task_assign_assign_to_data?.task_assign_detail.task_status === "Yet to start" || task_assign_assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                        // setIsWorkspaceEditable(true);
                                        isDocumentSubmittedRef.current = false;
                                    } else {
                                        // setIsWorkspaceEditable(false);
                                        isDocumentSubmittedRef.current = true;
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false);
                                    isDocumentSubmittedRef.current = true;
                                }
                                if (task_assign_assign_to_data?.task_assign_detail.task_status === "Completed") {
                                    documentRestrictionReasonRef.current = 'completed';
                                } else if (task_assign_assign_to_data?.task_assign_detail.task_status === "Return Request") {
                                    documentRestrictionReasonRef.current = 'returned';
                                }
                            }
                        } else {  // logged in user can be agency or non-agency and its their own project (customer(agency/non-agency) -> vendor)
                            // if(task_data?.task_assign_info === null) setIsWorkspaceEditable(true); 
                            let assign_to_data = null;
                            let assign_by_data = null;
                            try{
                                assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)))
                                assign_by_data = task_data?.task_assign_info?.find(each => ((each?.assigned_by_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)))
                            }catch(e){
                                console.error(e);
                            }
                            // only 3rd level assigned vendor has reassigned true 
                            isTaskReassignedRef.current = typeof task_data.task_reassign_info === 'boolean' ? true : false;
                            // task is assigned by me (view -> when task owner/admin sees)
                            if (assign_by_data?.assigned_by_details?.id == userDetails.pk) {
                                if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    if (task_data?.task_assign_info?.filter(each => each?.task_assign_detail.task_status === 'Completed' || each?.task_assign_detail.task_status === 'Return Request')?.length === task_data?.task_assign_info?.length) {
                                        // setIsWorkspaceEditable(true);
                                    } else {
                                        // setIsWorkspaceEditable(false);
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false);
                                }
                            }
                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (assign_to_data?.assign_to_details?.id == userDetails.pk) {
                                isDocumentOpenerVendorRef.current = true;
                                if (assign_to_data?.task_assign_detail.task_status !== "Return Request" && assign_to_data?.task_assign_detail.task_status !== "Completed") setShowReturnRequestBtn(true)
                                else setShowReturnRequestBtn(false);
                                if (assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    // setIsWorkspaceEditable(true);
                                    // isEditorSubmittedDocument.current = true;
                                } else {
                                    // setIsWorkspaceEditable(false);
                                    isDocumentSubmittedRef.current = true;
                                }
                                if (assign_to_data?.task_assign_detail.task_status === "Completed") {
                                    documentRestrictionReasonRef.current = 'completed';
                                } else if (assign_to_data?.task_assign_detail.task_status === "Return Request") {
                                    documentRestrictionReasonRef.current = 'returned';
                                }
                            }
                        }
                        if (isTaskReassignedRef.current) {
                            let a = responseTemp?.assign_detail?.filter(each => each.reassigned === isTaskReassignedRef.current)
                            let assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id == userDetails.pk || each?.assign_to_details?.managers.find(user => user == userDetails.pk)) && (each.task_assign_detail?.step == 1)))
                            if (is_user_reviewer) {
                                // condition is true if editing status is completed then make the editable true
                                if (a?.find(each => each.assign_to_id !== userDetails.pk)?.status === 3) {
                                    // step-1 editor has submitted document (post-editing step(1) is done) 
                                    if (assign_to_data?.task_assign_detail.task_status !== "Return Request" && assign_to_data?.task_assign_detail.task_status !== "Completed") {
                                        // isEditorSubmittedDocument.current = true;
                                        // setIsWorkspaceEditable(true);
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false);
                                }
                            }
                        } else {
                            if (userDetails.agency) {
                                let a = responseTemp?.assign_detail?.filter(each => each.reassigned === false)
                                if (is_user_reviewer) {
                                    if (a?.find(each => each.step_id !== 2)?.status === 3) {
                                        // step-1 editor has submitted document (post-editing step(1) is done) 
                                        // isEditorSubmittedDocument.current = true;
                                        // setIsWorkspaceEditable(true);
                                    } else {
                                        // setIsWorkspaceEditable(false);
                                    }
                                }
                                // else{
                                //     if(a?.find(each => each.step_id !== 1)?.status !== 3){
                                //         // step-1 editor has submitted document (post-editing step(1) is done) 
                                //         isEditorSubmittedDocument.current = true;
                                //         setIsWorkspaceEditable(true);
                                //     } else {
                                //         setIsWorkspaceEditable(false);
                                //     }
                                // }
                            }
                        }
                    },
                    error: (err) => {
                        console.error(err);
                     }
                })
                // setIsUserIsReviwer(stepOptions?.find(eachStep => responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id)?.step_id === eachStep.value) );
            },
            error: (err) => {
                if (err.response?.data?.detail) {
                    history("/file-upload");
                }
            }
        });
    };

    const handleDocumentSubmitBtn = (status) => {
        setVendorReturnRequestReasonText('');
        if (status === 4 && vendorReturnRequestReasonText?.trim() === '') {
            setShowVendorComplaintReasonModal(true);
            return;
        } else if (status === 3) {
            if (!showSubmitConfirmModal) {
                setShowSubmitConfirmModal(true);
                return;
            }
        }
        let formData = new FormData();
        formData.append("task", documentTaskIdRef.current);
        formData.append("step", documentSubmitStepRef.current);
        formData.append("status", status?.toString()); // in-progress: 2, submit: 3, raise-complaint: 4 
        if (status === 4) {
            formData.append("return_request_reason", vendorReturnRequestReasonText?.trim());
        }
        if (isTaskReassignedRef.current) {
            formData.append("reassigned", 'True');
        }
        setIsDocumentSubmitting(true);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                setIsWorkspaceEditable(false);                
                // hide and disbale the submit button once docuemnt is submitted
                setShowDocumentSubmitButton(false);
                setEnableDocumentSubmitBtn(false);
                setShowReturnRequestBtn(false);
                setShowVendorComplaintReasonModal(false);
                setShowSubmitConfirmModal(false);
                setIsDocumentSubmitting(false);
                if (status === 3) {
                    Config.toast(t("document_submitted"));
                } else if (status === 4) {
                    Config.toast(t("return_req_send"));
                }
            },
            error: (err) => { setIsDocumentSubmitting(false); }
        });
    }

    // Remove the suggestion div -start
    
    const removeIMESuggestion = () => {
        let inputSuggestionElements = document.querySelectorAll("div.ks-input-suggestions:not(.hidden)");
        if (inputSuggestionElements[0] != null) inputSuggestionElements[0].classList.add("hidden");
    };

    /* Create refs for each target contenteditable */
    const createTargetContentEditableRefs = () => {
        for (let i = 0; i < translatedResponse.length; i++) {
            // if (typeof targetContentEditable?.current[translatedResponse[i].segment_id] == 'undefined') {
            sourceTextDiv.current[translatedResponse[i].segment_id] = createRef();
            targetContentEditable.current[translatedResponse[i].segment_id] = createRef();
            savedStatus.current[translatedResponse[i].segment_id] = createRef();
            notSavedStatus.current[translatedResponse[i].segment_id] = createRef();
            workspaceRow.current[translatedResponse[i].segment_id] = createRef();
            saveBtn.current[translatedResponse[i].segment_id] = createRef();
            // }
        }
    };

    /* Spellcheck - Wrap the given text node with <mark> with the given class name */
    const wrap = (textNode, str, cName) => {
        // str = str.replace(/\+/g, " ").trim().split(" ").sort((a, b) => b.length - a.length)
        let wholeWordRegExp = new RegExp("\\b" + str + "\\b");
        let pos = textNode.nodeValue.search(wholeWordRegExp);
        if (pos < 0) return false;
        let newNode = textNode.splitText(pos);
        let randomNumber = Math.floor(Math.random() * 1000);
        while (replaceContentUsedIds.indexOf(randomNumber) != -1) randomNumber = Math.floor(Math.random() * 1000);
        setReplaceContentUsedIds((prevState) => [...prevState, randomNumber]);
        let mark = document.createElement("mark");
        // mark.setAttribute("id", 'replaceable-content-' + randomNumber);
        // mark.setAttribute("contenteditable", true);
        // mark.className = cName;
        textNode.parentNode.insertBefore(mark, newNode);
        newNode.splitText(str.length);
        mark.appendChild(newNode);
        let markElement = (
            <mark contentEditable={true} suppressContentEditableWarning={true} id={"replaceable-content-" + randomNumber} className={cName}>
                {str}
            </mark>
        );
        replaceNodeWithReactComponent(markElement, mark);
        return true;
    };

    /* unwrap the given node. Simply remove the parent tags */
    const unwrap = (node) => {
        if (node?.parentNode?.NodeType) {
            node?.parentNode?.insertBefore(node?.firstChild, node);
            node?.parentNode?.removeChild(node);
        }
    };

    /* Spellcheck - Check for the given :word in the given :element and put the :highlightClass with the wrap function */
    const checkIt = (element, word, highlightClass = "spellcheck-highlight") => {
        if (element != null) {
            for (let i = 0; i < element.childNodes.length; ++i) {
                let node = element.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE) {
                    if (wrap(node, word, highlightClass)) {
                        // changeSavedCaretPosition();
                        restoreCursorPositionWithinContenteditable();
                        ++i;
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    checkIt.call(node);
                }
            }
        }
    };

    /* Remove the parent tags of the :element */
    const UnCheckIt = (element) => {
        if (element?.childNodes != null) {
            for (let i = 0; i < element.childNodes.length; ++i) {
                let node = element.childNodes[i];
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (!node.classList.contains("tag") && !node.classList.contains("search-highlight")) unwrap(node);
                    ++i;
                } else if (node.nodeType === Node.TEXT_NODE) {
                    UnCheckIt.call(node);
                }
            }
        }
    };

    /* Synonym - Check for the given :word in the given :element and put the :highlightClass with the wrap function */
    const synonymCheckIt = (element, word, highlightClass = "synonym-highlight") => {
        if (element != null) {
            for (let i = 0; i < element.childNodes.length; ++i) {
                let node = element.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE) {
                    if (synonymWrap(node, word, highlightClass)) ++i;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    synonymCheckIt.call(node);
                }
            }
        }
    };

    /* Replace the :element with the :reactComponent */
    const replaceNodeWithReactComponent = (reactComponent, element) => {
        const parent = document.createElement("div");
        ReactDOM.render(reactComponent, parent, () => {
            element.replaceWith(...Array.from(parent.childNodes));
        });
    };

    /* Synonym - Wrap the given text node with <mark> with the given class name */
    const synonymWrap = (textNode, str, cName) => {
        // str = str.replace(/\+/g, " ").trim().split(" ").sort((a, b) => b.length - a.length)
        let wholeWordRegExp = new RegExp("\\b" + str + "\\b");
        let pos = textNode.nodeValue.search(wholeWordRegExp);
        if (pos < 0) return false;
        let newNode = textNode.splitText(pos);
        let mark = document.createElement("mark");
        textNode.parentNode.insertBefore(mark, newNode);
        newNode.splitText(str.length);
        mark.appendChild(newNode);
        let markElement = (
            <mark ref={synonymHighlightRef} contentEditable={true} suppressContentEditableWarning={true} id="synonym-highlight" className={cName}>
                {str}
            </mark>
        );
        replaceNodeWithReactComponent(markElement, mark);
        return true;
    };

    /* Enable the spellcheck after checking the availability of the target language */
    const toggleSpellcheck = (e = null) => {
        resetSynonymStates();
        let formData = new FormData();
        formData.append("doc_id", documentId);

        Config.axios({
            url: Config.BASE_URL + "/vendor/spellcheck_availability/",
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                if (e?.isTrusted != null) {
                    //Human click
                    if (response.data.out) {
                        setShowSpellCheckIcon(true); // Hide the spellcheck icon itself
                        if (!enableSpellCheck) {
                            //!enableSpellCheck == true
                            setEnableSpellCheck(true);
                            setEnableSynonym(false);
                            let segmentId = focusedDivIdRef.current;
                            if (toggleSpellCheckBtn.current?.classList != null) {
                                toggleSpellCheckBtn.current?.classList.remove("toolbar-list-icons-active", "toolbar-list-icons-disable");
                                toggleSpellCheckBtn.current?.classList.add("toolbar-list-icons-active");
                            }
                        } else {
                            setEnableSpellCheck(false);
                            if (toggleSpellCheckBtn.current?.classList != null) {
                                toggleSpellCheckBtn.current?.classList.remove("toolbar-list-icons-active", "toolbar-list-icons-disable");
                                toggleSpellCheckBtn.current?.classList.add("toolbar-list-icons-disable");
                            }
                        }
                    } else {
                        setShowSpellCheckIcon(false);
                        setEnableSpellCheck(false);
                        if (toggleSpellCheckBtn.current?.classList != null) {
                            toggleSpellCheckBtn.current?.classList.remove("toolbar-list-icons-active", "toolbar-list-icons-disable");
                            toggleSpellCheckBtn.current?.classList.add("toolbar-list-icons-disable");
                        }
                        if (e != null)
                            //Human trigger
                            Config.toast(`${t("spellcheck_not_avail")} ${targetLanguage}`, "warning");
                    }
                } else {
                    //Triggered
                    if (response.data.out) {
                        setEnableSpellCheck(true);
                        setEnableSynonym(false);
                        setShowSpellCheckIcon(true);
                        if (toggleSpellCheckBtn.current?.classList != null) {
                            toggleSpellCheckBtn.current?.classList.remove("toolbar-list-icons-active", "toolbar-list-icons-disable");
                            toggleSpellCheckBtn.current?.classList.add("toolbar-list-icons-active");
                        }
                    } else {
                        setShowSpellCheckIcon(false);
                        setEnableSpellCheck(false);
                        if (toggleSpellCheckBtn.current?.classList != null) {
                            toggleSpellCheckBtn.current?.classList.remove("toolbar-list-icons-active", "toolbar-list-icons-disable");
                            toggleSpellCheckBtn.current?.classList.add("toolbar-list-icons-disable");
                        }
                    }
                }
                /* Show IME Editor based on response - start */
                setShowIME(response.data.show_ime);
                /* Show IME Editor based on response - end */
            },
            error: (err) => {
                console.error(err);
            }
        });
    };

        // Save the cursor position in a ref varaible
    const saveCaretPosition = () => {
        let element = targetContentEditable.current[focusedDivIdRef.current]?.current;
        if (element) caretRange.current = Cursor.getCurrentCursorPosition(element);
    };
   
    // Set the cursor position which was saved from saveCaretPosition()
    const changeSavedCaretPosition = () => {
        let element = targetContentEditable.current[focusedDivIdRef.current]?.current;
        if (element) {
            Cursor.setCurrentCursorPosition(caretRange.current, element);
            element.focus();
        }
    };

    /* Synonym - replace the selected word and change it's class name too. */
    const changeSynonym = (target, replaceableWord) => {
        // saveCaretPosition(); // Can't use. the replaced word doesn't have the same range because of the length difference
        target.innerHTML = replaceableWord;
        // changeSavedCaretPosition(); // Can't use. the replaced word doesn't have the same range because of the length difference
        target.classList.remove("synonym-highlight");
        target.classList.add("synonym-replaced");
        // target.removeAttribute('id');
        setSynonymPopoverOpen(false);
        setSynonymPopoverTarget(null);
        setSynonymPopoverContent("");
    };

    // reset all NLP state variables
    const resetSynonymStates = () => {
        setSynonymPopoverOpen(false);
        setSynonymPopoverTarget("");
        setSynonymsResList([]);
        setSynonymText("");
        setSynonumSelectionObject(null);
    }

    const replaceWithNewPara = (e, value) => {
        if(itemToParaphraseRef.current?.type === "Story"){
            const range = $.summernote.range;
            const rng = range.create();             
            const isCollapsed = rng.isCollapsed();
            if(!isCollapsed){
                const newRng = rng.deleteContents();
                newRng.select();
                let node = newRng.pasteHTML(value);                
                // this will select the inserted text
                const rngs = range.createFromNode(node[0]);
                rngs.select();
                setStorySelectionText(rngs.toString());
            }
        }else{
            let newObj = translatedResponse?.map(obj => {
                if(obj?.segment_id === itemToParaphraseRef.current?.segment_id){
                    return {
                        ...obj,
                        target: value
                    }
                }
                return obj;
            })
            setTranslatedResponse(newObj);
        }
        handleTransphrasePopoverClose();
        handleChangeUpdate();
    }

    const repalceWithNewSynonym = (e, value) => {
        let childMark = document?.getElementById(synonymPopoverTarget);
        childMark.innerHTML = value + " ";
        setSynonymPopoverOpen(false);
        setSynonymPopoverTarget("");
        setSynonymsResList([]);
        // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag( targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark");
        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(targetContentEditable.current[focusedDivIdRef.current].current);
        range.collapse(false);
        selection.addRange(range);
        targetContentEditable.current[focusedDivIdRef.current].current.focus();
        // updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
        // updateSegmentStatus(focusedDivIdRef.current, 103);
        // changeEditedStatus(focusedDivIdRef.current, "unsaved");
        // targetContentEditable.current[focusedDivIdRef.current].current.setAttribute("data-translated-text", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
    }

    const outsideClickHandler = (e) => {
        if(!e.target?.closest('.paraphrase-popover-box')){
            let popoverDiv = document.getElementsByClassName('popover')[0];
            let markTag = document.getElementById(synonymPopoverTarget);
            if (markTag !== undefined && synonymPopoverOpen && synonymsResList.length) {
                resetSynonymStates();
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark" );
            }
        }
    }

    const handleTransphrase = (e, action, item) => {
        e?.preventDefault();
        let text = '';
        try{
            if(Object?.keys(item)?.length !== 0){
                itemToParaphraseRef.current = item;
            }
        }catch(e) { console.error(e); }
        if (targetLanguageId == 17) {
            if(itemToParaphraseRef.current?.type === "Story"){
                text = unescape(storySelectionText);
            }else{
                text = replaceTagsWithText(unescape(itemToParaphraseRef.current?.target), "");
            }
        } else if (sourceLanguageId == 17) {
            if(itemToParaphraseRef.current?.type === "Story"){
                text = unescape(storySelectionText);
            }else{
                text = replaceTagsWithText(unescape(itemToParaphraseRef.current?.source), "");
            }
        }
        if (removeAllTags(text)?.trim()?.split(' ')?.length <= 1) {
            Config.toast(t("text_more_than_one_word"), 'warning');
            setIsParaphrasing(false);
            return;
        }
        setSelectedParaphrase(action);
        setTransphrasePopoverTarget(e.currentTarget);
        setTransphrasePopoverOpen(true);
        if (!isParaphrasing) {
            getParaphrases(action, itemToParaphraseRef.current);
        }
    }

    const handleTransphrasePopoverClose = () => {
        setTransphrasePopoverTarget(null);
        setTransphrasePopoverOpen(false);
        setparaphraseTrigger(false);
        setSelectedParaphrase(null);
        setParaPhraseResList([]);
        // itemToParaphraseRef.current = null;
    }

    const getParaphrases = async (option, item) => {
        setIsParaphrasing(true);
        setParaPhraseResList([]); // reset the paraphrase response list before getting the new list
        let text = '';
        if (targetLanguageId == 17) {
            if(itemToParaphraseRef.current?.type === "Story"){
                text = unescape(storySelectionText);
            }else{
                text = replaceTagsWithText(unescape(itemToParaphraseRef.current?.target), "");
            }
        } else if (sourceLanguageId == 17) {
            if(itemToParaphraseRef.current?.type === "Story"){
                text = unescape(storySelectionText);
            }else{
                text = replaceTagsWithText(unescape(itemToParaphraseRef.current?.source), "");
            }
        }
        setParaphraseText(text);
        setparaphraseTrigger(true);
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        if (removeAllTags(text)?.trim()?.length.length !== 0) {
            var formdata = new FormData();
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            if (targetLanguageId == 17) {
                // normal paraphrasing
                formdata.append("sentence", text.trim());
                formdata.append("task_id", documentTaskIdRef.current);
            } else if (sourceLanguageId == 17) {
                // transphrasing
                formdata.append("source_sent", text?.trim());
                formdata.append("target_lang_id", targetLanguageId);
                formdata.append("task_id", documentTaskIdRef.current);
            }
            // options: Rewrite, Shorten, Simplify
            formdata.append("option", option);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            let data = null;
            if (targetLanguageId == 17) {
                data = await fetch(Config.BASE_URL + "/workspace_okapi/paraphrase/", requestOptions);
            } else if (sourceLanguageId == 17) {
                data = await fetch(Config.BASE_URL + "/workspace_okapi/seg_rewrite/", requestOptions);
            }
            let response = await data.json()

            if (data.status === 200) {
                setParaPhraseResList(response?.result);
                setparaPhraseTag(response?.tag);
                setIsParaphrasing(false);
                setparaphraseTrigger(true);
                if (response?.msg === 'error') {
                    setIsParaphrasing(false);
                    setparaphraseTrigger(false);
                    setIsParaphrasing(false);
                    Config.toast(t("paraphrase_get_error_1"), 'warning');
                }
            } else if (data.status === 400) {
                if (response?.msg === 'Insufficient Credits') {
                    setShowCreditAlert(true);
                    if (!isAssignEnable) setCreditAlertTxt(t("insufficient_credit_contact"));
                    else setCreditAlertTxt(t("insufficient_credits"));
                }
                handleTransphrasePopoverClose();
                setparaphraseTrigger(false);
                setIsParaphrasing(false);
            } else if (data.status === 500) {
                handleTransphrasePopoverClose();
                Config.toast(t("paraphrase_get_error_3"), 'error');
                setparaphraseTrigger(false);
                setIsParaphrasing(false);
            }
        } else {
            handleTransphrasePopoverClose();
            Config.toast(t("paraphrase_get_error_4"), 'warning');
            setparaphraseTrigger(false);
            setIsParaphrasing(false);
        }
    }

    // Get Synonym for selected word
    const fetchSynonym = async () => {
        // get token from cache
        let userCacheData = JSON.parse( typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null);
        let token = userCacheData != null ? userCacheData?.token : "";
        var formdata = new FormData();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let fullSentence = replaceTagsWithText(removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark"), " ");
        formdata.append("word", synonymText.trim());
        formdata.append("word", synonymText.trim());
        formdata.append("sentence", fullSentence);
        formdata.append("second_word", synonumSelectionObject?.anchorOffset !== 0 ? fullSentence.slice(0, synonumSelectionObject?.anchorOffset) : "-1");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        let data = await fetch(Config.BASE_URL + "/workspace_okapi/synonyms/", requestOptions);

        if (data.status === 200) {
            let response = await data.json();
            let synonymList = [];
            if (typeof response.context == "object") {
                response.context?.map((value) => {
                    synonymList.push(
                        <p key={value} className="corrected-word"  onClick={(event) => repalceWithNewSynonym(event, value)}>
                            {value}
                        </p>
                    );
                });
                setSynonymsResList(synonymList);
                setParaphrasePopoverOpen(true);
            } else {
                Config.toast(t("no_synonym_found"), 'warning')
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark" );
                setSynonymPopoverOpen(false);
                setSynonymPopoverTarget("");
                setSynonymsResList([]);
            }
        }
    }

    const replaceWithCorrectGrammarSentence = (e, value, targetValue) => {
        let childMark = document.getElementById(grammarCheckPopoverTarget);
        childMark.textContent = value + " ";
        childMark.classList.remove("grammarcheck-highlight");
        childMark.classList.add("spellcheck-replaced");
        setGrammarCheckSuggestedSentence([]);
        setGrammarCheckResponse([]);
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        var doc = new DOMParser().parseFromString(removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML, "mark"), "text/html");      
        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(targetContentEditable.current[focusedDivIdRef.current].current);
        range.collapse(false);
        selection.addRange(range);
        targetContentEditable.current[focusedDivIdRef.current].current.focus();
    }

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

    // Grammer check for only English
    const grammarCheck = async (sentence) => {
        saveCaretPosition();
        let thisElement = targetContentEditable.current[focusedDivIdRef.current]?.current;
        if (thisElement != null) UnCheckIt(thisElement);
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        var myHeaders = new Headers();
        var formdata = new FormData();
        let text = removeTagWithItsTextContent(unescape(targetContentEditable.current[focusedDivIdRef.current]?.current?.innerHTML.replaceAll("&nbsp;", " ")));
        formdata.append("target", text);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        let data = await fetch(Config.BASE_URL + "/workspace_okapi/grammercheck/", requestOptions);

        if (data.status === 200) {
            let response = await data.json()
            setGrammarCheckResponse(response.grammar_check);         
        }
    }
    
    window.onerror = function (message, file, line, col, error) {
        console.error("Error occurred: " + error?.message);
        return false;
    };

    window.addEventListener("error", function (e) {
        console.error("Error occurred: " + e?.error?.message);
        return false;
    })

    const debounceApiCall = (callback) => {
        if (userSelectionCallTimer) {
          clearTimeout(userSelectionCallTimer);
        }
        userSelectionCallTimer = setTimeout(() => {
            callback();
            userSelectionCallTimer = null;
        }, 300); // Adjust the debounce delay as needed
    }
  
    // match all whitespace characters in any language or script that defines them as whitespace in Unicode and remove them from sting 
    function removeWhitespace(str) {
        const regex = /\p{White_Space}/gu;
        return str?.replace(/\s/g, '')?.replace(regex, '');
    }

    /* Update the contenteditable value. Both temperory and user saved */
    const updateTranslationById = (e = null, id = null, isTemp = false, extraArgs = {}, temp_target, target, isTyping = false) => {        
        resetSynonymStates();
        let userTrigger = false;
        let alreadyTranslatedText = null;
        let translatedText = null;
        if (e != null) {
            userTrigger = true;
            id = e.currentTarget.getAttribute("data-id");
            // translatedText = e.target.innerHTML
        }
        if (id != null) {
            alreadyTranslatedText = targetContentEditable.current[id]?.current?.getAttribute("data-translated-text");
            translatedText = targetContentEditable.current[id]?.current?.innerHTML;
            translatedText = removeSpecificTag(translatedText, "div");
            translatedText = removeSpecificTag(translatedText, "br");
            let textWithoutTags = removeAllTags(replaceTagsWithText(translatedText !== undefined ? translatedText : '')  ? replaceTagsWithText(translatedText !== undefined ? translatedText : '') : '')
            if (textWithoutTags?.trim()?.length === 0) {
                if (!isTemp)
                // Don't check empty for temp
                Config.toast(t("add_trans_working"), "warning");
                return;
            }
            if (!translatedText) return;
            // disable removemark tag
            if (grammarPopoverOpen) {
                setGrammarPopoverOpen(false);
                setgrammarCheckPopoverTarget("");
                translatedText = removeSpecificTag(translatedText, "mark");
                translatedText = replaceTagsWithText(translatedText);
            } else {
                translatedText = removeSpecificTag(translatedText, "mark");
                translatedText = removeSpecificTag(translatedText, "br");
                translatedText = replaceTagsWithText(translatedText);
            }
            let formData = new FormData();
            let formDataKey = "target";
            if (isTemp) {
                formDataKey = "temp_target";
                if (extraArgs?.forceUpdate == null) {
                    // force update even translatedText == alreadyTranslatedText
                    // if innerText and data-translated-text are same not update and if temp_target and target both are same then also don't update the segment
                    // if((removeWhitespace(alreadyTranslatedText) == removeWhitespace(translatedText)) && (removeWhitespace(temp_target) == removeWhitespace(target))){
                    if ((removeWhitespace(alreadyTranslatedText?.trim()) === removeWhitespace(translatedText?.trim())) && (removeWhitespace(temp_target?.trim()) === removeWhitespace(target?.trim()))) {
                        return;
                    }
                }
            }
            if (!isShowTags.current)
                translatedText =
                    translatedText +
                    (translatedResponse.find((element) => element.segment_id == id)?.target_tags
                        ? translatedResponse.find((element) => element.segment_id == id)?.target_tags
                        : ""); //Added for not to show tags
            formData.append(formDataKey, translatedText == 'undefined' ? "" : unescape(translatedText));
            let status = allSegmentStatuses?.current[id] == null ? 105 : allSegmentStatuses?.current[id];
            // let changeStatusTo = status - 1;
            let changeStatusTo = status;
            /* Change the appropriate status - start */
            if (isTemp) {
                if (isUserIsReviwer) {
                    changeStatusTo = 109;
                } else {
                    if (status == 102) changeStatusTo = 101;
                    else if (status == 104) changeStatusTo = 103;
                    else if (status == 106) changeStatusTo = 105;
                    else if (status == 109) changeStatusTo = 103;
                    else if (status == 110) changeStatusTo = 103;
                }
            } else {
                if (isUserIsReviwer) {
                    changeStatusTo = 110;
                } else {
                    if (status == 101) changeStatusTo = 102;
                    else if (status == 103) changeStatusTo = 104;
                    else if (status == 105) changeStatusTo = 106;
                    else if (status == 109) changeStatusTo = 104;
                    else if (status == 110) changeStatusTo = 104;
                }
                setIsConfirmBtnClicked(true);
            }
            if(!isTemp){
                setIsSegmentConfirming(true);
            }
            /* Change the appropriate status - start */
            formData.append("status", changeStatusTo);
            formData.append("user", Config.userState.id);
            formData.append("segment", id);
            let url = Config.BASE_URL + "/workspace_okapi/segment/update/";

            Config.axios({
                url: url,
                method: "PUT",
                auth: true,
                data: formData,
                success: (response) => {
                    if (response.data.id) {
                        if (targetContentEditable?.current[id]?.current != null)
                            targetContentEditable.current[id].current.setAttribute("data-translated-text", response.data.target == '' ? "" : response.data.target);
                            updateTranslatedResponseSegment(id, "temp_target", response.data.temp_target == null ? "" : response.data.temp_target);
                            updateTranslatedResponseSegment(id, "target", response.data.target);
                            updateTranslatedResponseSegment(id, "status", changeStatusTo);
                        if (targetContentEditable?.current[id]?.current != null) {
                            // if the element is no there. Can't update.
                            if (isTemp) changeEditedStatus(id, "unsaved");
                            else changeEditedStatus(id, "saved");
                        }
                        updateSegmentStatus(id, response.data.status);
                        getDocumentProgressData();
                        if (!isTemp) showSegmentQa(id);
                        // if confirm button is clicked, this will move the focus to next unconfirmed segment otherwise focus the un-opned segment  
                        if (!isTemp) {
                            setIsSegmentConfirming(false);                            
                            // confirm current segment then move to next unconfimed segment
                            let nextSegmentUnsavedId = getUnsavedSegmentData(focusedDivIdRef.current)?.segment_id;
                            if (targetContentEditable.current[nextSegmentUnsavedId]?.current != null) targetContentEditable.current[nextSegmentUnsavedId].current.focus();
                            // if no unsaved segment is found then move to next segment
                            if (nextSegmentUnsavedId === undefined) {
                                // confirm current segment then move to next immediate segment
                                let nextSegmentId = getNextSegmentData(focusedDivIdRef.current)?.segment_id;
                                // if no unopened segment is found or confirmed the last segment then move to next page
                                if(translatedResponse?.filter(each => each.status === undefined || each.status === null)?.length === 0 || translatedResponse?.slice(-1)[0]?.segment_id == id) {
                                    // move to next page when last segment is confirmed
                                    if(translatedResponse?.slice(-1)[0]?.segment_id == id){
                                        // update page and scroll to top 
                                        let pageParam = URL_SEARCH_PARAMS.get("page");
                                        // don't update page beyond the total page
                                        if(totalPages > pageParam){
                                            URL_SEARCH_PARAMS.set("page", parseInt(pageParam) + 1);
                                            history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
                                            isMovedFromLastSegmentConfirmRef.current = true;
                                            let workspaceContainer = document.getElementsByClassName('workspace-editor')[0];
                                            workspaceContainer.scroll({ top: 0, behavior: 'smooth' });
                                        }
                                    }
                                    // if not last segment then move to the immediate next segment
                                    else{
                                        if (targetContentEditable.current[nextSegmentId]?.current != null) targetContentEditable.current[nextSegmentId].current.focus();
                                    }
                                }
                                // if opened segments are present then move to the unopened segment (open the unopened segment)
                                else if (translatedResponse?.find(each => each.segment_id === nextSegmentId)?.status === undefined || translatedResponse?.find(each => each.segment_id === nextSegmentId)?.status === null) {
                                    if (targetContentEditable.current[nextSegmentId]?.current != null) targetContentEditable.current[nextSegmentId].current.focus();
                                }
                            }
                        }
                        if(advancedOptionVisibility) getSegmentDiff();
                        if(isTyping) {
                            restoreCursorPositionWithinContenteditable();
                            symSpellCheck(id);
                        } 
                    }
                    istargetSegmentOnBlurTriggeredRef.current = false;
                },
                error: (err) => {
                    if (err.response?.status === 400) {
                        if (err?.response?.data?.msg?.includes('working')) {
                            history({
                                pathname: '/file-upload',
                                state: { documentLock: isUserIsReviwer ? t("sp_working") : t("reviewer_working") }
                            });
                        } else {
                            setShowCreditAlert(true);
                            setCreditAlertTxt(t("insuffient_credits_to_continue_work"));
                            // setShowCreditAlertRedirection(true);
                        }
                    }
                    setIsSegmentConfirming(false);
                    istargetSegmentOnBlurTriggeredRef.current = false;
                }
            });
        }
    };
    
    // Store last visited project page number in local storage
    const storeLastVisitedPageNumber = (path) => {
        localStorage.setItem(documentId, path);
    }

    /* Pagination content data generate */
    const paginationContentFunction = (page = 1) => {
        
    };

    /* Handling page number enter */
    const pageNumberEnter = (e, url) => {
        let value = e.target.value;
        if (value) {
            if (value > 0 && value <= totalPages) {
                let workspaceContainer = document.getElementsByClassName('workspace-editor')[0];
                setTimeout(() => {
                    if (isMergedRef.current || isRestoredRef.current || isSplitRef.current) {
                        isMergedRef.current = false;
                        isRestoredRef.current = false;
                        isSplitRef.current = false;
                    } else {
                        workspaceContainer.scroll({ top: 0, behavior: 'smooth' });
                    }
                }, 10);
                if (findStatus?.length !== 0) {
                    let statusParam = URL_SEARCH_PARAMS.get("status");
                    history(url + value + "&status=" + statusParam);
                } else {
                    history(url + value);
                }
                // history(url + value);
                storeLastVisitedPageNumber(url + value);
            }
            else Config.toast(t("page_not_found"), "warning");
        }
    };

    /* Show / hide the TM section in the footer toolbar */
    const showTmSectionFunction = (show = true) => {
        if (show) {
            // if (localStorage.getItem('showTmSection') === 'true' || localStorage.getItem('showTmSection') == null)
            setShowTmSection(true);
            scrollLeft();
        } else setShowTmSection(false);
    };

    /* Replace the tag span elements with string tags */
    const replaceTagsWithText = (targetText) => {
        let translatedTextArr = targetText?.match(/(<([^>]+)>)/gi) ? targetText?.match(/(<([^>]+)>)/gi) : [];
        let tagNames = translatedTextArr.map((val, key) => {
            if (/<span[^>]*>/.test(val)) {
                if (val.indexOf("tag-open") > -1)
                    // Open tag
                    targetText = targetText.replace(val, "<");
                // Close tag
                else targetText = targetText.replace(val, "</");
            } else targetText = targetText.replace(val, ">");
        });
        targetText = targetText?.replace(/&nbsp;/g, " ");
        return targetText;
    };

    /* Remove all the tags in the :text */
    const removeAllTags = (text) => {
        return text.replace(/(<([^>]+)>)/gi, "");
    };

    const removeTagWithItsTextContent = (text) => {
        let txt = text.replace(/<\/?span[^>].*>/g, "");  //remove span tag with its text content from the string
        return txt.replace(/<\/?mark[^>]*>/g, "");  //remove mark tag from the string
        // return text.replace(/(<([^>]+).*>)/gi,""); 
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

    // removes only the opening and closing html tag and retains the text inside that tag
    // can give specific tag with specific classname
    const removeTagsWithClass = (html, tagName, className) => {
        const tagRegExp = new RegExp(`<${tagName}\\s+[^>]*class="${className}"[^>]*>((.|\\n)*?)<\/${tagName}>`, "gi");
        const modifiedHTML = html.replace(tagRegExp, "$1");
        return modifiedHTML;
    };
    
    // removes specified tag with its text content
    const removeSpecificTagWithContent = (html, tagName) => {
        const openingTagRegExp = new RegExp(`<${tagName}[^>]*>.*?<\\/${tagName}>`, "gs");
        const modifiedHTML = html.replace(openingTagRegExp, "");    
        return modifiedHTML;
    };
 
    /* Get the TM */
    const getTranslationMatch = (e) => {
        lastCalledArgs.current.functionName = "getTranslationMatch";
        let key = e.target.getAttribute("data-key");
        let matchPercentage = e.target.getAttribute("data-match-percentage");
        let selectedTranslationMatch = translationMatches[key];
        let id = focusedDivIdRef.current;
        let thisSegmentTags = translatedResponse.find((element) => element.segment_id == id)?.target_tags;
        let replacedText = selectedTranslationMatch.target + thisSegmentTags;
        /*replacedText = replaceTextWithTags(replacedText);
        if (targetContentEditable.current[id]?.current != null)
            targetContentEditable.current[id].current.innerHTML = replacedText;*/
        updateTranslatedResponseSegment(id, "temp_target", replacedText);
        updateSegmentStatus(id, 101);
        changeEditedStatus(id, "unsaved");
        // highlightTmMismatch(id, selectedTranslationMatch.source);
        setTimeout(() => {
            //It helps to call after the segment update happened. Otherwise the old data will be updated
            updateTranslationById(null, id, true, { forceUpdate: true });
        }, 100);
    };

    /* The :copyText will be copied to the clipboard */
    const copyText = (copyText = null) => {
        if (copyText != null) {
            /*if (navigator.clipboard && window.isSecureContext)
                navigator.clipboard.writeText(copyText);
            else {*/
            let textArea = document.createElement("textarea");
            textArea.value = copyText;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            setIsCopied(true);
            return new Promise((res, rej) => {
                document.execCommand("copy") ? res() : rej();
                textArea.remove();
                // Config.toast("Text Copied!");
            });
            // }
        }
    };

    /* Enable/ Disable the toolbar tools */
    const showHideToolbarElement = (stateKey) => {
        /* if (stateKey != 'showFindReplace') {
            $(document).find('mark').remove();
        } */
        if (stateKey == "showDictionary") showDictionaryFunction();
        setStateKeyVal(stateKey);
        setShowFindReplace(false);
        setShowSpecialCharacters(false);
        setShowDictionary(false);
        switch (stateKey) {
            case "glossary": {
                setShowGlossary(!showGlossary);
                break;
            }
            case "showFormatSize": {
                setShowFormatSize(!showFormatSize);
                break;
            }
            case "showFindReplace": {
                if (showFindReplace) resetSearch();
                setShowFindReplace(!showFindReplace);
                break;
            }
            case "showDictionary": {
                setShowDictionary(!showDictionary);
                break;
            }
            case "showSpecialCharacters": {
                // if (document.activeElement.classList.contains("workspace-textarea")) // show the symbol modal only when target segment is focused
                setShowSpecialCharacters(!showSpecialCharacters);
                break;
            }
            case "ner": {
                isNerActive.current = !isNerActive.current;
                if (isNerActive.current) {
                    nerHighlight();
                    nerRef.current.classList.add("toolbar-list-icons-active");
                } else {
                    nerHighlight(false);
                    if (nerRef.current.classList.contains("toolbar-list-icons-active")) nerRef.current.classList.remove("toolbar-list-icons-active");
                }
                break;
            }
            case "showTags": {
                isShowTags.current = !isShowTags.current;
                if (isShowTags.current) showTagsRef.current.classList.add("toolbar-list-icons-active");
                else if (showTagsRef.current.classList.contains("toolbar-list-icons-active")) showTagsRef.current.classList.remove("toolbar-list-icons-active");
                break;
            }
            default: {
                return;
            }
        }
    };

    // put curosr on the source segment but dont allow any kind of editing (keypress, pasting of content and drag and drop of contentx)
    const handleSourceSegmentClick = (e) => {
        // disable when any of the checkbox is selected
        if (sourceTextDiv.current[focusedDivIdRef.current].current !== null) {           
            if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                segmentIdRef.current = e.target.getAttribute('data-id');
                sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit');
                setDisbaleSplitIcon(false);
            }
        }
    }

    const toggleSynonym = () => {
        setEnableSpellCheck(false);
        resetSynonymStates();
        toggleSpellCheckBtn.current?.classList?.remove("toolbar-list-icons-active");
        if(!focusedDivIdRef.current){
            targetContentEditable.current[translatedResponse[0]?.segment_id].current.focus();
        } 
        if (grammarPopoverOpen) {
            setGrammarPopoverOpen(false);
            setgrammarCheckPopoverTarget("");
            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                "mark"
            );
        } else {
            setSynonymPopoverOpen(false);
            setSynonymPopoverTarget("");
            setSynonymText("");
            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark");
        }
        setEnableSynonym(!enableSynonym);
    }
  
    /* Highlight with mark tag for the Named Entity Remove */
    const nerHighlight = (highlight = true) => {
        if (highlight) {
            if (focusedDivIdRef.current != null) {
                /* let formData = new FormData();
                formData.append('src_lang_code', sourceLanguageCode);
                let sourceText = translatedResponse.find(element => element.segment_id == focusedDivIdRef.current)?.source;
                formData.append('src_segment', sourceText);

                Config.axios({
                    url: `${Config.BASE_URL}/nlp/ner`,
                    auth: true,
                    method: 'POST',
                    data: formData,
                    success: (response) => {
                        let wordsArray = response.data.src_ner
                        let highlightedSourceText = sourceText
                        wordsArray.map(value => {
                            replaceFromRegExp = new RegExp("(" + value + ")(?!([^<]+)?>)", 'g')
                            highlightedSourceText = highlightedSourceText.replace(replaceFromRegExp, match => '<mark>' + match + '</mark>')
                            updateTranslatedResponseSegment(focusedDivIdRef.current, 'tagged_source', highlightedSourceText)
                        })
                    }
                }) */
                let thisSourceText = translatedResponse.find((element) => element.segment_id == focusedDivIdRef.current)?.source;
                let wordsArray = ["Chidambaram", "Pillai"];
                let highlightedSourceText = thisSourceText;
                wordsArray.map((value) => {
                    replaceFromRegExp = new RegExp("(" + value + ")(?!([^<]+)?>)", "g");
                    highlightedSourceText = highlightedSourceText.replace(replaceFromRegExp, (match) => "<mark>" + match + "</mark>");
                });
                setTimeout(() => {
                    updateTranslatedResponseSegment(focusedDivIdRef.current, "tagged_source", highlightedSourceText);
                }, 200);
            } else {
                Config.log("Focused div id is null");
            }
        } else {
            /* Remove all the ner highlighted mark tags - start*/
            translatedResponse.map((value) => {
                updateTranslatedResponseSegment(
                    value.segment_id,
                    "tagged_source",
                    grammarPopoverOpen ? clearGrammarPopoverAndRemoveTag(value.tagged_source) : removeSpecificTag(value.tagged_source, "mark")
                )
            });
            /* Remove all the ner highlighted mark tags - end*/
        }
    };

    const clearGrammarPopoverAndRemoveTag = (value) => {
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        removeSpecificTag(value, "mark");
    }

    /* Filter the segments by status */
    const segmentStatusFilter = (e = null) => {
        let url = Config.BASE_URL + "/workspace_okapi/source/segments/filter/" + documentId;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        let statusParam = URL_SEARCH_PARAMS.get("status");
        if (pageParam != null) {
            setCurrentPage(pageParam);
            url = `${Config.BASE_URL}/workspace_okapi/source/segments/filter/${documentId}?page=${pageParam}&page_size=${selectedPageSize?.value ? selectedPageSize?.value : pageSizeFromApi.current}`;
        }
        let formData = new FormData();
        /*if (findTerm != '')
            formData.append('search_word', findTerm);
            formData.append('match_case', caseMatch)
            formData.append('exact_word', wholeWordMatch)*/
        formData.append("status_list", `[${findStatus.toString() ? findStatus.toString() : statusParam}]`);

        Config.axios({
            url: url,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setIsSegmentLoading(false);
                lastCalledArgs.current.functionName = "filter";
                lastCalledArgs.current.page = pageParam;
                setTranslatedResponse(response.data.results);
                translatedResponseRef.current = response.data.results;
                setNextPageUrl(response.data.next);
                setPreviousPageUrl(response.data.previous);
                setTotalPages(Math.ceil(response.data.count / (selectedPageSize?.value ? selectedPageSize?.value : pageSizeFromApi.current)));
            },
            error: (error) => {
                if (error.response.status == 422) {
                    Config.toast(t("no-segment_found"), "warning");
                }
            },
        });
    };

    /* Reset all the search params */
    const resetSearch = () => {
        setFindTerm("");
        setReplaceTerm("");
        setFindArea("source");
        setShowReplaceSection(false);
        setCaseMatch(false);
        setWholeWordMatch(false);
        setTargetFindTerm("");
        setSourceFindTerm("");
        setReplaceConfirm(false);
        // listSegments();
        // pageSelect(1);
        occurrenceData.current = null;
        findTriggerCount.current = 0;
        // let urlWithParam = removeParamFromUrl(['find', 'replace', 'find_area', 'match_case', 'whole_word']);
        // history(urlWithParam);
    };

    /* Find on the previous page */
    const findTermPreviousPage = () => {
        // let minSegmentId = Math.min(...translatedResponse.map((element) => element.segment_id));
        // if (occurrenceData.current?.results == null) return;
        // let previousCurrentSegmentIds = Array.from(occurrenceData.current?.results, (element) => {
        //     if (element.segment_id < minSegmentId) return element.segment_id;
        // });
        // let nextPageSegmentIds = [...previousCurrentSegmentIds.filter(Boolean)];
        // if (!nextPageSegmentIds?.length) {
        //     if (occurrenceDataPage.current > 1) filterWithFindTerm(occurrenceDataPage.current - 1, findTermPreviousPage);
        //     else findTriggerCount.current += 1;
        //     return;
        // }
        // let nextPageSegmentIdMax = Math.max(...previousCurrentSegmentIds.filter(Boolean));
        // if (nextPageSegmentIdMax != null) {
        //     let statusList = [];
        //     if (findStatus.length) statusList = findStatus;
        //     else statusList = Object.keys(segmentStatuses);
        //     let data = JSON.stringify({ status_list: statusList });

        //     Config.axios({
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         url: Config.BASE_URL + "/workspace_okapi/segment/get/page/filter/" + documentId + "/" + nextPageSegmentIdMax,
        //         method: "POST",
        //         auth: true,
        //         data: data,
        //         success: (response) => {
        //             if (response.data?.page_id != null)
        //                 history("/workspace/" + documentId + "?page=" + response.data.page_id, { findHighlightSegment: nextPageSegmentIdMax });
        //         },
        //         error: (error) => { },
        //     });
        // }
    };

    /* Find on the next segment */
    const findNext = () => {
        findIds.current.forEach((findId) => {
            if (document.getElementById("search-highlight-" + findId) != null)
                document.getElementById("search-highlight-" + findId).classList.remove("highlight-selected");
        });
        findTriggerCount.current += 1;
        if (findIds.current.indexOf(findTriggerCount.current) != -1) {
            let element = document.getElementById("search-highlight-" + findTriggerCount.current);
            if (element) {
                element.classList.add("highlight-selected");
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            // All occurrences highlighted and no other occurrence remaining
            // findTriggerCount.current = 0 // To let it go to the first occurrence of the page
            findTermNextPage();
        }
    };

    /* Find on the next page */
    const findTermNextPage = () => {
        // let maxSegmentId = Math.max(...translatedResponse.map((element) => element.segment_id));
        // if (occurrenceData.current?.results == null) return;
        // let previousCurrentSegmentIds = Array.from(occurrenceData.current?.results, (element) => {
        //     if (element.segment_id > maxSegmentId) return element.segment_id;
        // });
        // let nextPageSegmentIds = [...previousCurrentSegmentIds.filter(Boolean)];
        // if (!nextPageSegmentIds?.length) {
        //     if (occurrenceDataTotalPages.current != null) {
        //         if (occurrenceDataPage.current < occurrenceDataTotalPages.current) filterWithFindTerm(occurrenceDataPage.current + 1, findTermNextPage);
        //         else findTriggerCount.current -= 1;
        //     }
        //     return;
        // }
        // let nextPageSegmentIdMin = Math.min(...previousCurrentSegmentIds.filter(Boolean));
        // if (nextPageSegmentIdMin != null) {
        //     let statusList = [];
        //     if (findStatus.length) statusList = findStatus;
        //     else statusList = Object.keys(segmentStatuses);
        //     let data = JSON.stringify({ status_list: statusList });

        //     Config.axios({
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         url: Config.BASE_URL + "/workspace_okapi/segment/get/page/filter/" + documentId + "/" + nextPageSegmentIdMin,
        //         method: "POST",
        //         auth: true,
        //         data: data,
        //         success: (response) => {
        //             if (response.data?.page_id != null)
        //                 history("/workspace/" + documentId + "?page=" + response.data.page_id, { highlightFirstFindTerm: true });
        //         },
        //         error: (error) => { },
        //     });
        // }
    };
    
    /* Update the segment status in the front-end itself  */
    const updateSegmentStatus = (segmentId = null, status = null) => {
        if (segmentId != null) {
            allSegmentStatuses.current[segmentId] = status;
            setAllSegmentStatusState((prevState) => ({
                ...prevState,
                [segmentId]: status,
            }));
            translatedResponseRef.current = translatedResponseRef.current?.map((el) => (el.segment_id == segmentId ? { ...el, status: status } : el));
        } else if (segmentId == null && status == null) {
            translatedResponse.map((value) => {
                allSegmentStatuses.current[value.segment_id] = value?.status;
            });
            setTimeout(() => {
                setAllSegmentStatusState(allSegmentStatuses.current);
            }, 200);
        }
    };

    /* Show the dictionary data */
    const showDictionaryFunction = () => {
        showDictionaryRef.current.classList.remove("toolbar-list-icons-active");
        if (window.getSelection().anchorNode == null || window.getSelection().anchorNode.data == null) {
            Config.toast(t("select_text"), "error");
            return;
        }
        // let selectedText = window.getSelection().anchorNode.data.substring( window.getSelection().anchorOffset,window.getSelection().extentOffset);
        let selectedText = window.getSelection().toString();
        if (selectedText != "") {
            setDictionaryTerm(selectedText);
            showDictionaryRef.current.classList.add("toolbar-list-icons-active");
        } else {
            if (dictionaryTerm == "") {
                Config.toast(t("select_text"), "error");
                return;
            }
        }
        if (window.getSelection().anchorNode.parentNode.classList.contains("workspace-textarea")) setDictionaryTermType("target");
        else setDictionaryTermType("source");
        dictionaryTabButton.current?.click();
        scrollRight();
    };

    /* useEffect(() => {
        if (didMount) {
            dictionaryTabButton.current.click();
        }
    }, [wikipediaData, wiktionaryData, posData]); */

    /* Show the dictionary tab on the footer toolbar */
    const showDictionaryTab = () => {
        if (dictionaryTerm == "") {
            Config.toast(t("select_text"), "error");
        } else {
            setTimeout(() => {
                handleToggleVisibility(true);
            }, 100);
            /*Wikipedia call - start*/
            let url = `${Config.BASE_URL}/workspace_okapi/get_wikipedia/?task_id=${documentId}&term=${encodeURI(dictionaryTerm)}&term_type=${dictionaryTermType}`;

            Config.axios({
                url: url,
                auth: true,
                success: (response) => {
                    let wikipediaDataTemp = response.data.out;
                    setWikipediaData((prevState) => ({
                        ...prevState.wikipediaDataTemp,
                        source: wikipediaDataTemp.source,
                        sourceUrl: wikipediaDataTemp.srcURL,
                        target: wikipediaDataTemp.target,
                        targetUrl: wikipediaDataTemp.targeturl,
                    }));
                },
            });
            /*Wikipedia call - end*/
            /*Wiktionary call - start*/
            url = `${Config.BASE_URL}/workspace_okapi/get_wiktionary/?task_id=${documentId}&term=${encodeURI(dictionaryTerm)}&term_type=${dictionaryTermType}`;

            Config.axios({
                url: url,
                auth: true,
                success: (response) => {
                    let wiktionaryDataTemp = response.data.out;
                    setWiktionaryData((prevState) => ({
                        ...prevState,
                        source: wiktionaryDataTemp.source,
                        sourceUrl: wiktionaryDataTemp["source-url"],
                    }));
                    let targets = [];
                    let targetUrls = [];
                    if (wiktionaryDataTemp.targets != null) {
                        wiktionaryDataTemp.targets.map((value, key) => {
                            targets.push(value.target);
                            targetUrls.push(value["target-url"]);
                        });
                    }
                    setTimeout(() => {
                        setWiktionaryData((prevState) => ({
                            ...prevState,
                            targets: targets,
                            targetUrls: targetUrls,
                        }));
                    }, 100);
                },
            });
            /*Wiktionary call - end*/
            let formData = new FormData();
            formData.append("task_id", documentId);
            formData.append("term", dictionaryTerm);
            formData.append("term_type", dictionaryTermType);

            Config.axios({
                url: Config.BASE_URL + "/workspace_okapi/wiktdata/",
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    /*response.data?.Output.map((value) => {
                        value.pos
                        value.definitions
                        value.target
                    })*/
                    setPosData(response.data?.Output);
                },
            });
        }
    };

    /* Insert the special characters on the current focused contenteditable */
    const insertSpecialCharacter = (e) => {
        let specialCharacter = e.target.innerHTML;
        // to prevent the symbol insertion in source div
        if (document.activeElement !== sourceTextDiv.current[focusedDivIdRef.current].current) {  // it will check if source div is focused or not
            document.execCommand("insertText", false /*no UI*/, specialCharacter);
        }
    };
  
    /* For select2 changing the format with value and label */
    const makeSegmentStatusOptions = () => {
        let segmentStatusOptions = [];
        let allValues = Object.values(segmentStatuses);
        Object.keys(segmentStatuses).map((value, key) => {
            segmentStatusOptions.push({ value: value, label: allValues[key] });
        });
        setTimeout(() => {
            segmentStatusOptionsRef.current = segmentStatusOptions;
            setSegmentStatusOptions(segmentStatusOptions);
        }, 100);
    };

    /* Check whether specific query param is exist in the current url */
    const queryParamExistUrl = (param = "") => {
        if (param == "") {
            return window.location.search.length;
        } else {
            if (new URLSearchParams(window.location.search).get(param) != null) return true;
            return false;
        }
    };
   
    /* Get and set all segment comments */
    const showSegmentComments = (segmentId) => {
        let url = Config.BASE_URL + "/workspace_okapi/comment/?by=segment&id=" + segmentId;

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                setCommentsData(response.data);
                setCommentsDataCopy(response.data);
                if (response.data?.length > 0) updateTranslatedResponseSegment(segmentId, "has_comment", true);
                else updateTranslatedResponseSegment(segmentId, "has_comment", false);
            },
        });
    };

    /* Show the segment QA data after getting the response */
    const showSegmentQa = (segmentId) => {
        setQaData([]);
        let formData = new FormData();
        formData.append("doc_id", documentId);
        let segmentData = translatedResponse.find((response) => response.segment_id == segmentId);
        if (segmentData == null) return;
        let sourceText = segmentData.tagged_source;
        let translatedText = "";
        if (targetContentEditable.current[segmentId]?.current != null) {
            translatedText = targetContentEditable.current[segmentId].current.innerHTML;
            // disable removemark tag
            if (!grammarPopoverOpen) {
                translatedText = removeSpecificTag(translatedText, "mark");
                translatedText = replaceTagsWithText(translatedText);
            } else {
                setGrammarPopoverOpen(false);
                setgrammarCheckPopoverTarget("");
                translatedText = removeSpecificTag(translatedText, "mark");
                translatedText = replaceTagsWithText(translatedText);
            }

        }
        formData.append("source", sourceText);
        formData.append("target", translatedText);
        let url = Config.BASE_URL + "/qa/qa_check/";

        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                if (response.data.data != null) {
                    lastCalledArgs.current.functionName = "showSegmentQa";
                    lastCalledArgs.current.segmentId = segmentId;
                    lastCalledArgs.current.sourceText = sourceText;
                    lastCalledArgs.current.translatedText = translatedText;
                    errorNoteCount.current = 0;
                    Object.entries(response.data?.data)?.forEach(([key, value]) => {
                        Object.entries(value).forEach(([keys, values]) => {
                            if (values.ErrorNote && values.ErrorNote.length > 0) {
                                errorNoteCount.current += values.ErrorNote?.length;
                            }
                        })
                    });
                    setQaData(response.data.data);
                }
            },
        });
    };

    /* This will update specific segment values on front-end itself */
    const updateTranslatedResponseSegment = (segmentId, key, value) => {
        lastCalledArgs.current.functionName = "updateTranslatedResponseSegment";
        /*if (key == 'original')
            sourceTextDiv.current[segmentId].current.innerHTML = value
        else if (key == 'temp_target')
            targetContentEditable.current[segmentId].current.innerHTML = value
        else*/
        setTranslatedResponse((prevTranslatedResponse) => prevTranslatedResponse?.map((el) => (el.segment_id == segmentId ? { ...el, [key]: value } : el)));
        translatedResponseRef.current = translatedResponseRef.current?.map((el) => (el.segment_id == segmentId ? { ...el, [key]: value } : el));
    };

    /* Toggling the footer toolbar show/hide */
    const handleToggleVisibility = (show = true) => {
        if (!show) {
            if (targetContentEditable?.current[focusedDivIdRef.current]?.current != null) {
                if (findTermRef.current?.value == "")
                    if (!grammarPopoverOpen) {
                        targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                            "mark"
                        );
                    } else {
                        setGrammarPopoverOpen(false);
                        setgrammarCheckPopoverTarget("");
                        targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                            "mark"
                        );
                    }
            }
            workspaceFeaturRef.current.style.height = 51 + "px";
        } else {
            if (!pushPinActive) {
                workspaceFeaturRef.current.style.height = footerToolbarHeightRef.current + "px";
            } else {  }
        }
        setAdvancedOptionVisibility(show);
    };

    /* Adding/Removing specific CSS classes to differentiate the active one */
    const highlightFocusedSegment = (segmentId) => {
        showDictionaryRef.current.classList.remove("toolbar-list-icons-active");
        setShowDictionary(false);
        setFocusedDivId(segmentId);
        ctrlAClicked.current = false;
        focusedDivIdRef.current = segmentId;
        let newArr = translatedResponse?.map(obj => {
            if (obj.segment_id == segmentId) {
                return {
                    ...obj,
                    isFocused: true
                }
            } else {
                return {
                    ...obj,
                    isFocused: false
                }
            }
        })
        setTranslatedResponse(newArr);
        // let workspaceRowDiv = "";
        // translatedResponse.map((value) => {
        //     workspaceRowDiv = targetContentEditable.current[value.segment_id].current.closest(".workspace-row");
        //     workspaceRowDiv.classList.remove("focused-row");
        // });
        // workspaceRowDiv = targetContentEditable.current[segmentId].current.closest(".workspace-row");
        // workspaceRowDiv.classList.add("focused-row");
    };

    /* Copy the source text to the target. This will remove old values and replace with the source text */
    const copySourceToTarget = () => {
        if (targetContentEditable.current[focusedDivIdRef.current] == null) {
            Config.toast(t('select_segment'), "error");
            return;
        }
        if (sourceTextDiv?.current[focusedDivIdRef.current]?.current != null) {
            if (targetContentEditable.current[focusedDivIdRef.current]?.current != null) {
                // targetContentEditable.current[focusedDivId].current.innerHTML = sourceTextDiv?.current[focusedDivId]?.current?.innerHTML;
                setTimeout(() => {
                    updateTranslatedResponseSegment(
                        focusedDivIdRef.current,
                        "temp_target",
                        replaceTagsWithText(sourceTextDiv?.current[focusedDivIdRef.current]?.current?.innerHTML)
                    );
                    updateSegmentStatus(focusedDivIdRef.current, 105);
                }, 150);
            }
        }
    };

    /* Save the set font-size for the specific language */
    const saveFontSize = (fontSize, LanguageId) => {
        let formData = new FormData();
        formData.append("font_size", fontSize);
        formData.append("language", LanguageId);

        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/font_size",
            method: "POST",
            auth: true,
            data: formData,
        });
    };

    /* Get and set the previously saved font size for this user and for specific language */
    const getSavedFontSize = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/font_size?source=" + sourceLanguageId + "&target=" + targetLanguageId,
            auth: true,
            success: (response) => {
                let savedFontSizeResponse = response.data;
                let sourceLanguageFontSizeTemp = savedFontSizeResponse.find((el) => el.language == sourceLanguageId);
                let targetLanguageFontSizeTemp = savedFontSizeResponse.find((el) => el.language == targetLanguageId);
                sourceLanguageFontSizeRef.current = sourceLanguageFontSizeTemp?.font_size == null ? 15 : sourceLanguageFontSizeTemp.font_size;
                targetLanguageFontSizeRef.current = targetLanguageFontSizeTemp?.font_size == null ? 15 : targetLanguageFontSizeTemp.font_size;
                setSourceLanguageFontSize(sourceLanguageFontSizeTemp?.font_size == null ? 15 : sourceLanguageFontSizeTemp.font_size);
                setTargetLanguageFontSize(targetLanguageFontSizeTemp?.font_size == null ? 15 : targetLanguageFontSizeTemp.font_size);
            },
        });
    };

    // Save the custom page size for the user
    const saveCustomPageSize = (pageSize) => {
        let formData = new FormData();
        formData.append("size", pageSize);

        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/page_size/",
            method: "POST",
            auth: true,
            data: formData,
        });
    }

    const getSavedPageSize = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/page_size/",
            auth: true,
            success: (response) => {
                if (response.data.page_size != null) {
                    pageSizeFromApi.current = response.data.page_size;
                    setSelectedPageSize(pageSizeOption?.find(each => each.value === response.data.page_size));
                } else {
                    pageSizeFromApi.current = 20;
                    setSelectedPageSize(pageSizeOption?.find(each => each.value === 20));
                }
            },
        });
    }

    const getSegmentDiff = () => {
        if (focusedDivId != '') {
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/segment_history/?segment=${focusedDivId}`,
                method: "GET",
                auth: true,
                success: (response) => {
                    setSegmentDifference(response.data);
                },
            });
        }

    };

    /* Getting and setting the document status data */
    const getDocumentProgressData = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/progress/" + documentId,
            auth: true,
            success: (response) => {
                let responseTemp = response.data;
                documentProgressRef.current = responseTemp;
                setConfirmedSegmentsCount(responseTemp.segments_confirmed_count);
                setTotalSegmentsCount(responseTemp.total_segment_count);
                if (responseTemp.total_segment_count == 0) setSegmentStatusPercentage(0);
                else setSegmentStatusPercentage(((responseTemp.segments_confirmed_count / responseTemp.total_segment_count) * 100).toFixed(2));
            },
            error: (err) => {
                console.error(err);
            }
        });
    };

    /* Set the editing status of a segment with the status */
    const changeEditedStatus = (segmentId, status = "") => {
        if (notSavedStatus.current[segmentId]?.current != null) {
            //Checks the element is present. One element check is enough the others(workspaceRow, savedStatus, saveBtn) also will present
            switch (status) {
                case "saved": {
                    notSavedStatus.current[segmentId].current.style.display = "none";
                    workspaceRow.current[segmentId].current.classList.remove("unsaved-border");
                    savedStatus.current[segmentId].current.style.display = "block";
                    // saveBtn.current[segmentId].current.classList.remove("btn-primary", "unsaved-check-circle");
                    // saveBtn.current[segmentId].current.classList.add("check-unsaved-circle");
                    saveBtn.current[segmentId].current.style.color = '#0078D4';
                    break;
                }
                case "unsaved": {
                    notSavedStatus.current[segmentId].current.style.display = "block";
                    workspaceRow.current[segmentId].current.classList.add("unsaved-border");
                    savedStatus.current[segmentId].current.style.display = "none";
                    // saveBtn.current[segmentId].current.classList.remove("btn-primary", "check-unsaved-circle");
                    // saveBtn.current[segmentId].current.classList.add("unsaved-check-circle");
                    saveBtn.current[segmentId].current.style.color = '#E74C3C';
                    break;
                }
                default: {
                    notSavedStatus.current[segmentId].current.style.display = "none";
                    workspaceRow.current[segmentId].current.classList.remove("unsaved-border");
                    savedStatus.current[segmentId].current.style.display = "none";
                    saveBtn.current[segmentId].current.style.color = '#5F6368';
                    // saveBtn.current[segmentId].current.classList.remove("saved", "check-unsaved-circle");
                    break;
                }
            }
        }
    };

    /* Setting focus and adding class for currently focusing contenteditable */
    const targetSegmentClick = (e) => {
        if (e.target.classList.contains("trigger-focus")) {
            let segmentId = e.target.getAttribute("data-id");
            if (targetContentEditable?.current[segmentId]?.current) {
                if (document.activeElement != targetContentEditable?.current[segmentId]?.current) targetContentEditable.current[segmentId].current.focus();
            }
        }
    };

    const triggerFocuseWritter = ( ) => {
        highlightFocusedSegment(3);
    }

    /* Setting focus and adding class for currently focusing contenteditable */
    const sourceSegmentClick = (e) => {
        if (e.target.classList.contains("trigger-focus")) {
            let segmentId = e.target.getAttribute("data-id");
            if (sourceTextDiv?.current[segmentId]?.current) {
                if (document.activeElement != sourceTextDiv?.current[segmentId]?.current) {
                    sourceTextDiv.current[segmentId].current.focus();
                    let pos = getHTMLCaretPosition(sourceTextDiv.current[focusedDivIdRef.current].current);
                    if (mergeSelectedSegmentIds?.length === 0 && pos) {
                        let firstSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(0, pos));
                        let secondSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length));
                        if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                            segmentIdRef.current = e.target.getAttribute('data-id');
                            sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit');
                            setDisbaleSplitIcon(false);
                        }
                    }
                }
            }
        }
    };

    /* Highlight the :highlightTerm in the :text with mark tags */
    const higlightText = (text, highlightTerm = null) => {
        if (highlightTerm != null) {
            if (typeof highlightTerm == "string") highlightTerm = [highlightTerm];
            let replaceFromRegExp = new RegExp(`(${highlightTerm.join("|")})`, "gi");
            return text.replace(replaceFromRegExp, (match) => "<mark>" + match + "</mark>");
        }
    };

    /* Footer toolbar resize - start */
    const makeResizable = (element, minW = 100, minH = 100, size = 10) => {
        const top = document.createElement("div");
        top.classList.add('top-resize');
        top.style.width = "100%";
        top.style.height = size + "px";
        top.style.backgroundColor = "transparent";
        top.style.position = "absolute";
        top.style.top = -(size / 2) + "px";
        top.style.left = "0px";
        top.style.cursor = "n-resize";
        // top.innerHTML = 'Top Lorem Ipsum'
        top.addEventListener("mousedown", resizeYNegative());
        element.appendChild(top);
        function get_int_style(key) {
            return parseInt(window.getComputedStyle(element).getPropertyValue(key));
        }
        function resizeYNegative() {
            let offsetY;
            let startY;
            let startH;
            let maxY;
            function dragMouseDown(e) {
                if (e.button !== 0) return;
                e = e || window.event;
                e.preventDefault();
                const { clientY } = e;
                startY = get_int_style("top");
                startH = get_int_style("height");
                offsetY = clientY - startY;
                maxY = startY + startH - minH;
                document.addEventListener("mouseup", closeDragElement, false);
                document.addEventListener("mousemove", elementDrag, false);
            }
        function elementDrag(e) {
            const { clientY } = e;
            let y = clientY - offsetY;
            let h = startH + startY - y;
            if (h < minH) h = minH;
            if (y > maxY) y = maxY;
            // element.style.top = y + 'px';
            if (h >= 34 && h <= 380) {
                element.style.height = h + "px";
                if (pushPinActive) {
                    footerToolbarHeightRef.current = h;
                }
                  setAdvancedOptionVisibility(true);
                } else if (h < 34) {
                  setAdvancedOptionVisibility(false);
                }
            }
        function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);
            document.removeEventListener("mousemove", elementDrag);
        }
        return dragMouseDown;
        }
    };
    /* Footer toolbar resize - end */
  
    /* Show the product how to tour */
    const showHowToTour = () => {
        setTourStepIndex(0);
        setIsProductTourSeen(false);
        if (isTagTourSeen === false) {
            setIsTagTourSeen(true);
        }
    };

    function getCaretIndex(element) {
        let position = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            // Check if there is a selection (i.e. cursor in place)
            if (selection.rangeCount !== 0) {
                // Store the original range
                const range = window.getSelection().getRangeAt(0);
                // Clone the range
                const preCaretRange = range.cloneRange();
                // Select all textual contents from the contenteditable element
                preCaretRange.selectNodeContents(element);
                // And set the range end to the original clicked position
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                // Return the text length from contenteditable start to the range end
                position = preCaretRange.toString().length;
            }
        }
        return position;
    }

    function getHTMLCaretPosition(element) {
        var textPosition = getCaretIndex(element),
            htmlContent = element.innerHTML,
            textIndex = 0,
            htmlIndex = 0,
            insideHtml = false,
            htmlBeginChars = ['<'],
            htmlEndChars = ['>'];
        if (textPosition == 0) {
            return 0;
        }
        while (textIndex < textPosition) {
            htmlIndex++;
            // check if next character is html and if it is, iterate with htmlIndex to the next non-html character
            while (htmlBeginChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
                // now iterate to the ending char
                insideHtml = true;
                while (insideHtml) {
                    if (htmlEndChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
                        if (htmlContent.charAt(htmlIndex) == '.' || htmlContent.charAt(htmlIndex) == ';') {
                            htmlIndex--; // entity is char itself
                        }
                        insideHtml = false;
                    }
                    htmlIndex++;
                }
            }
            textIndex++;
        }
        // in htmlIndex is caret position inside html
        return htmlIndex;
    }

    function getCaretPosition() {
        if (window.getSelection && window.getSelection().getRangeAt) {
            var range = window.getSelection().getRangeAt(0);
            var selectedObj = window.getSelection();
            var rangeCount = 0;
            var childNodes = selectedObj.anchorNode.parentNode.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i] == selectedObj.anchorNode) {
                    break;
                }
                if (childNodes[i].outerHTML)
                    rangeCount += childNodes[i].outerHTML.length;
                else if (childNodes[i].nodeType == 3) {
                    rangeCount += childNodes[i].textContent.length;
                }
            }
            return range.startOffset + rangeCount;
        }
        return -1;
    }

    //Footer Toolbar Slide click
    const scrollLeft = () => {
        const container = scrl.current;
        const scrollStep = 500; // The amount of pixels to scroll
        if (container) {
            container.scrollTo({
                left: container.scrollLeft - scrollStep,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        const container = scrl.current;
        const scrollStep = 500; // The amount of pixels to scroll
        if (container) {
            container.scrollTo({
                left: container.scrollLeft + scrollStep,
                behavior: 'smooth',
            });
        }
    };
    //===================================================================================================================

    const shouldShowInsufficientModal = (bool = true) => {
        setShowCreditAlert(false);
    };

    /* Reset the segments merge and restore selection and enabled icons */
    const resetMergeAndRestore = () => {
        insertedDivIds.current = [];
        setIsShowMergeIcon(false);
        setIsShowRestoreSegmentIcon(false);
        selectedTextUnit.current = [];
        setMergeSelectedSegmentIds([]);
        mergeSelectedSegmentNos.current = [];
        if (mergeIcon.current.classList.contains("toolbar-list-icons-active")) mergeIcon.current.classList.remove("toolbar-list-icons-active");
        if (restoreSegmentIcon.current.classList.contains("toolbar-list-icons-active")) restoreSegmentIcon.current.classList.remove("toolbar-list-icons-active");
        let pageParam = URL_SEARCH_PARAMS.get("page");
        // pageSelect();
        // listSegments();
    };

    /* Show how to use tags tour */
    const showTagsTour = () => {
        let firstTag = document.querySelector(".workspace-row span.tag");
        let digitPattern = /^[0-9]+$/;
        let isDigitTag = digitPattern?.test(firstTag?.innerText);
        let firstTagSegmentIdTemp = firstTag?.parentElement?.getAttribute("data-id");
        setFirstTagSegmentId(firstTagSegmentIdTemp);
        let firstTagSegment = targetContentEditable?.current[firstTagSegmentIdTemp]?.current;
        if (firstTagSegment && isDigitTag) {
            setTagTourStepIndex(0);
            setIsTagTourSeen(false);
            firstTagSegment.focus();
        } else Config.toast(t("no_segments_found_tags"), "error");
        if (isProductTourSeen === false) {
            setIsProductTourSeen(true);
        }
    };

    const symSpellCheck = (segmentId) => {
        if(enableSpellCheck){
            let sentence_without_tags = removeSpecificTagWithContent(targetContentEditable.current[segmentId]?.current?.innerHTML, 'span');
            let sentence = unescape(removeSpecificTag(sentence_without_tags, 'mark'));
            if(sentence?.length !== 0){
                let formData = new FormData();
                formData.append("doc_id", documentId);
                formData.append("target", sentence);
        
                Config.axios({
                    url: `${Config.BASE_URL}/workspace_okapi/symspellcheck/`,
                    method: "POST",
                    auth: true,
                    data: formData,
                    success: (response) => {
                        if(response.data?.result){
                            setSpellCheckWordsOptions(response.data.result)
                            spellCheckResponseRef.current = response.data.result
                        }
                    },
                    error: (err) => { }
                });
            }
        }
    } 

    const highlightSpellCheckWords = (segment_id) => {
        if (targetContentEditable.current[segment_id].current.innerText === '') return;
        let content_editable_div = targetContentEditable.current[segment_id].current;
        if(spellCheckResponseRef.current?.length !== 0){
            let words_list = spellCheckResponseRef.current?.map(each => {
                return each.word
            });
            var text = removeTagsWithClass(content_editable_div.innerHTML, 'mark', 'spellcheck-highlight');
            var wordsToHighlight = words_list; // Array of words to highlight
            // let highlightedHtml = "";
            // const savedCaretPosition = saveCursorPositionWithinContenteditable(content_editable_div);
            savedCursorPositionRef.current = saveCursorPositionWithinContenteditable(content_editable_div);
            // saveCaretPosition();           
            // wordsToHighlight.forEach(word => {
            //     const regex = new RegExp(String.raw`(?:\B(?!\w)|\b(?=\w))(${word.replace(/\+/g, " ").trim()})(?!([^<]+)?>)(?:(?<=\w)\b|(?<!\w)\B)`, globalMatch)
            //     text = text.replace(
            //         regex, (match) => {
            //             let uid = generateKey()
            //             return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`
            //         }
            //     );
            // });
            try{
                // Generate regular expression pattern with all the words to highlight
                var pattern = new RegExp('\\b(' + wordsToHighlight.join('|') + ')\\b', 'g');
                var highlightedHtml = text.replace(
                    pattern, (match) => {
                        let uid = generateKey();
                        return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`;
                    }
                );
                content_editable_div.innerHTML = removeSpecificTag(highlightedHtml, 'font');
            }catch(e){
                console.error(e);
            }
            restoreCursorPositionWithinContenteditable(content_editable_div); 
        }
    }

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
        if (targetContentEditable.current && focusedDivIdRef.current) {
            const markTags = targetContentEditable.current[focusedDivIdRef.current].current?.querySelectorAll('.spellcheck-highlight');
            let isSpellCheckPopOpen = document.querySelector('#pop').style.visibility === 'visible' ? true : false;    
            const touchedMark = isMouseOverMark(e, markTags);
            if (isMouseOverMark(e, markTags) && !isSpellCheckPopOpen) {
                // Mouse pointer is touching the bounding box of a <mark> element
                for (const markElement of markTags) {
                    // tarDivRef.current.style.cursor = 'pointer';
                }
                // if(document.querySelector('#pop').style.visibility === 'hidden'){
                    clickedWrongWordRef.current = touchedMark;
                    clickedMarkEleRef.current = touchedMark;
                    setRectElement(touchedMark);
                // }
            } else {
                // Mouse pointer is not over any <mark> element
                for (const markElement of markTags) {
                    clickedWrongWordRef.current = null;
                    // tarDivRef.current.style.cursor = 'text'
                }
            }
        }
    }

    const setPopOnPosition = () => {        
        if(rectElement !== null) clickedWrongWordRef.current = rectElement;
        if(clickedWrongWordRef.current !== null){
            let {element, rect} = clickedWrongWordRef.current;
            rect = element?.getBoundingClientRect();
            let pos = decidePopPosition(rect);
            let top = pos.y - document.querySelector(`.workspace-editor`).scrollTop;
            let left = pos.x - document.querySelector(`.workspace-editor`).scrollLeft;
            if (top < 0)
                top = document.querySelector(`.workspace-editor`).scrollTop + 20;
            else if (top + document.querySelector('#pop').clientHeight > document.querySelector(`.workspace-editor`).clientHeight)
                top = document.querySelector(`.workspace-editor`).clientHeight - document.querySelector('#pop').clientHeight + document.querySelector(`.workspace-editor`).scrollTop - 20;
            if (left < 0)
                left = document.querySelector(`.workspace-editor`).scrollLeft + 20;
            else if (left + document.querySelector('#pop').clientWidth > document.querySelector(`.workspace-editor`).clientWidth)
                left = document.querySelector(`.workspace-editor`).clientWidth - document.querySelector('#pop').clientWidth + document.querySelector(`.workspace-editor`).scrollLeft - 20;
            if (true && (top != pos.y - document.querySelector(`.workspace-editor`).scrollTop || left != pos.x - document.querySelector(`.workspace-editor`).scrollLeft)) {
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
        let x = rect.left - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector(`.workspace-editor`).scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#pop')?.clientWidth > document.querySelector(`.workspace-editor`)?.clientWidth)
            x = document.querySelector(`.workspace-editor`)?.clientWidth - document.querySelector('#pop')?.clientWidth;
            let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {
            y = rect.bottom - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().top + document.querySelector(`.workspace-editor`).scrollTop + 8;
            dir = 'down';
        }
        else {
            y = rect.bottom - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().top + document.querySelector(`.workspace-editor`).scrollTop + 8;
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const handleWrongWordClick = (e) => {
        let clickedOverPop = e.target.closest('#pop') ? true : false;
        let segment_id = e.target?.parentNode?.getAttribute('data-id');        
        if(clickedWrongWordRef.current !== null && !clickedOverPop){
            let {element} = clickedWrongWordRef.current;
            setPopOnPosition();
            let suggestions = spellCheckResponseRef.current?.find(each => each.word === element.innerText)?.suggestion;
            try{
                let options_list = suggestions?.map((value, ind) => {
                    return (
                        <p key={value} className={"corrected-word "}  onClick={(e) => repalceWithSelectedSpellCheckSuggestedWord(value, segment_id, element)}>
                            {value}
                        </p>
                    );
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
    
    const repalceWithSelectedSpellCheckSuggestedWord = (value, segment_id, element) => {
        let childMark = element;
        childMark.innerHTML = value + " ";
        document.querySelector('#pop').style.visibility = 'hidden';
        document.querySelector('#pop').style.opacity = '0';
        highlightSpellCheckWords(segment_id);
        // symSpellCheck(segment_id);
    }

    const checkTextSelection = () => {
        let selTxt = window.getSelection()?.toString();
        if(window.getSelection().toString()?.trim() === '' || dictionaryTerm !== selTxt){
            showDictionaryRef.current?.classList.remove("toolbar-list-icons-active");
        }
    }
    // ================================================================================================================
    // Transliteration
     const supportedImeLanguage = [
        "am", "ar", "bn", "be", "bg", "yue-hant",
        "zh", "zh-hant", "fr", "de", "el", "gu", "he",
        "hi", "it", "ja", "kn", "ml", "mr", "ne", "or",
        "fa", "pt", "pa", "ru", "sa", "sr", "si", "es",
        "ta", "te", "ti", "uk", "ur", "vi"
      ];
    const [imeOn, setImeOn] = useState(false);
    const [options, setOptions] = useState([]);
    const [activeResult, setActiveResult] = useState(0);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [showImeSuggesstion, setShowImeSugessiton] = useState(false);
    const transliterateCompRef = useRef();
    const inputTransliterate = useRef(null);
    const imeRef = useRef(false);
    let shouldRenderSuggestions = true;
    let showCurrentWordAsLastSuggestion = true;
    let maxOptions = 5;
    let lang = targetLanguageCode;

    const handleIme = () => {
        setImeOn(!imeOn);
    }

    const renderSuggestions = async (lastWord) => {
        if (!shouldRenderSuggestions) return; 
        // fetch suggestion from api
        const numOptions = showCurrentWordAsLastSuggestion ? maxOptions - 1 : maxOptions;
        const data = await transliteration(lastWord, {
            numOptions: numOptions,
            showCurrentWordAsLastSuggestion: showCurrentWordAsLastSuggestion,
            lang: lang
        });
        setOptions(data);
    };

    const transliteration = async (word, config) => {
        const { numOptions: numOptions, showCurrentWordAsLastSuggestion: showCurrentWordAsLastSuggestion, lang: lang } = config || {
            numOptions: 5,
            showCurrentWordAsLastSuggestion: true,
            lang: targetLanguageCode
        };
        if (axiosTransliterationAbortControllerRef.current) {
            axiosTransliterationAbortControllerRef.current.abort();
        }
        const controller = new AbortController();
        axiosTransliterationAbortControllerRef.current = controller;
        // fetch suggestion from api
        // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${word}`;
        const url = `https://inputtools.google.com/request?text=${word}&itc=${lang}-t-i0-und&num=${numOptions}&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;

        try {
            const res = await fetch(url, {
                signal: controller.signal
            });
            const data = await res.json();
            if (data && data[0] === "SUCCESS") {
                const found = showCurrentWordAsLastSuggestion ? [
                    ...data[1][0][1],
                    word
                ] : data[1][0][1];
                return found;
            } else {
                if (showCurrentWordAsLastSuggestion) return [
                    word
                ];
                return [];
            }
        } catch (e) {
            // catch error
            console.error("There was an error with transliteration", e);
            return [];
        }
    };

    function getCaretPositions() {
        var x = 0;
        var y = 0;
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects()) {
                range.collapse(true);
                var rect = range.getClientRects()[0];
                if (rect) {
                    y = rect.top;
                    x = rect.left;
                }
            }
        }
        return {
            x: x,
            y: y
        };
    }

    function insertTextAtCaret(text, expression, space = true) {
        if (isPrecedingCharacterSpace()) {
            if(expression == null){
                document.execCommand("insertText", false, text + (space ? " " : ""));
            }else{
                document.execCommand("insertText", false, text + expression + (space ? " " : ""));
            } 
        } else {
            if(expression == null){
                document.execCommand("insertText", false, text + (space ? " " : ""));
            }else{
                document.execCommand("insertText", false, text + expression + (space ? " " : ""));
            }
        }
        document.querySelector('.input-box-transliterate').innerHTML = '';
        setActiveResult(0);
        setOptions([]);
        setShowImeSugessiton(false);
        // sel.removeAllRanges();
    }

    function isPrecedingCharacterSpace() {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            // Ensure that there is content before the caret
            if (range.startOffset > 0) {
                var precedingText = range.startContainer.textContent.substring(0, range.startOffset);
                return /\s$/.test(precedingText);
            } else if (range.startContainer.previousSibling && range.startContainer.previousSibling.nodeType === Node.TEXT_NODE) {
                // Check the last character of the previous text node if it exists
                var precedingText = range.startContainer.previousSibling.textContent;
                return /\s$/.test(precedingText);
            }
        }
        return false; // Return false if no space or no selection
    }

    const handleChangeUpdate = (isStory = false) => {
        Config.debounceApiCalls(() => handlePIBNewsUpdate(isStory));
    }

    const handlePIBNewsUpdate = (isStory = false) => {
        if(isStory){
            if(editorRef.current?.summernote("code") === translatedFullResponseref.current?.target_json?.story) return;
        }
        if(translatedFullResponseref.current != null){
            // let translatedJson = {
            //     "url":translatedFullResponseref.current?.target_json?.url,
            //     "tags": document.querySelector('#workspace-textarea-4')?.innerText,
            //     "media": translatedFullResponseref.current?.target_json?.media,
            //     "story": editorRef.current?.summernote("code"),
            //     "newsId": translatedFullResponseref.current?.target_json?.newsId,
            //     "source": translatedFullResponseref.current?.target_json?.source,
            //     "heading": document.querySelector('#workspace-textarea-1')?.innerText,
            //     "is_open": translatedFullResponseref.current.target_json.is_open,
            //     "is_paid": translatedFullResponseref.current.target_json.is_paid,
            //     "mediaId":  translatedFullResponseref.current.target_json.mediaId,
            //     "authorId": translatedFullResponseref.current.target_json.authorId,
            //     "keywords": document.querySelector('#workspace-textarea-6')?.innerText,
            //     "location": translatedFullResponseref.current.target_json.location,
            //     "thumbUrl": translatedFullResponseref.current.target_json.thumbUrl,
            //     "date_news": translatedFullResponseref.current.target_json.date_news,
            //     "news_tags": translatedFullResponseref.current.target_json.news_tags,
            //     "authorName":document.querySelector('#workspace-textarea-7')?.innerText,
            //     "buzz_count": translatedFullResponseref.current.target_json.buzz_count,
            //     "categories": translatedFullResponseref.current.target_json.categories,
            //     "locationId": translatedFullResponseref.current.target_json.locationId,
            //     "authorImage": translatedFullResponseref.current.target_json.authorImage,
            //     "description": document.querySelector('#workspace-textarea-5')?.innerText,
            //     "app_lite_url": translatedFullResponseref.current.target_json.app_lite_url,
            //     "date_created": translatedFullResponseref.current.target_json.date_created,
            //     "maincat_name": translatedFullResponseref.current.target_json.maincat_name,
            //     "maincategory": translatedFullResponseref.current.target_json.maincategory,
            //     "image_caption": document.querySelector('#workspace-textarea-2')?.innerText,
            //     "is_live_article": translatedFullResponseref.current.target_json.is_live_article,
            //     "article_template": translatedFullResponseref.current.target_json.article_template,
            //     "show_authors_block": translatedFullResponseref.current.target_json.show_authors_block,
            // 

            let translatedJson = {
                ...translatedFullResponseref.current?.target_json,
                "heading": document.querySelector('#workspace-textarea-1')?.innerText,
                // "image_caption": document.querySelector('#workspace-textarea-2')?.innerText,
                "story": editorRef.current?.summernote("code"),
                // "tags": document.querySelector('#workspace-textarea-4')?.innerText,
                // "description": document.querySelector('#workspace-textarea-5')?.innerText,
                // "keywords": document.querySelector('#workspace-textarea-6')?.innerText,
                // "authorName": document.querySelector('#workspace-textarea-7')?.innerText,
                // "story_summary": document.querySelector('#workspace-textarea-8')?.innerText,
                // "location": document.querySelector('#workspace-textarea-9')?.innerText,
                // "media": [
                //     {
                //         ...translatedFullResponseref.current.target_json.media[0],
                //         "caption": document.querySelector('#workspace-textarea-10')?.innerText
                //     }
                // ]
            };
            let formData = new FormData();
            formData.append("target_json", JSON.stringify(translatedJson));

            Config.axios({
                url: `${Config.BASE_URL}/workspace/pib_translate/${translatedFullResponseref.current.uid}/`,
                auth: true,
                method: "PUT",
                data: formData,
                success: (docResponse) => {
                    const responseTemp = docResponse.data;
                    let segmentData = createSegmentLikeJson(responseTemp);
                },
                error: (err) => {
                    if (err.response?.data?.detail) {
                        history("/my-stories");
                    }
                }
            });
        }        
    }

   let textRef = useRef('');

    const handeKeyDownDiv = (e) => {
        var charCode = e.keyCode;      
        if (e.ctrlKey) {
            if (charCode == 39) {
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault();
                } 
            } else if (charCode == 37) {
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault();
                }
            }else if(charCode == 40 || charCode == 38 ){
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault();
                }
            }else{
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault();
                }
            }
        } else {
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
                if(charCode >= 112 && charCode <= 123) {
                    if(charCode == 113 || charCode == 115 || charCode == 119 || charCode == 120){
                        if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        return;
                        }
                    }else{
                        if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                       handleDissapear();
                       return;
                        }
                    }
                }                
                if (getCaretPositions()?.x == 0 && getCaretPositions()?.y == 0) {
                    let rect = e.target.getBoundingClientRect();
                    setLeft(rect.left + window.pageXOffset + 10);
                    setTop(rect.top + window.pageYOffset);
                    if (window.innerHeight - (rect.top + window.pageYOffset) > (transliterateCompRef.current?.clientHeight + 50)) {
                    } else {
                        document.querySelector('.workspace-editor-add-top').scrollBy({
                            top: transliterateCompRef.current?.clientHeight,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    setLeft(window.innerWidth - getCaretPositions()?.x > (transliterateCompRef.current?.clientWidth + 50) ? getCaretPositions()?.x : (getCaretPositions()?.x - transliterateCompRef.current?.clientWidth));
                    setTop(getCaretPositions()?.y);
                }
                if (window.innerHeight - getCaretPositions()?.y > (transliterateCompRef.current?.clientHeight + 50)) {
                } else {
                    // document.querySelector('.workspace-editor-add-top').scrollIntoView({
                    //     // top: transliterateCompRef.current?.clientHeight,
                    //     behavior: 'smooth'
                    // });
                    document.querySelector(".focused-row")?.scrollIntoView({ behavior: "smooth",block: 'nearest',
                    inline: 'center' });
                }               
                let text = '';
                if (charCode == 8) {
                    if (inputTransliterate.current.innerText.length > 0) {
                        text = inputTransliterate.current.innerText.slice(0, -1);
                        textRef.current = inputTransliterate.current.innerText.slice(0, -1)
                        inputTransliterate.current.innerText = inputTransliterate.current.innerText.slice(0, -1); //                     
                        e.preventDefault();
                        renderSuggestions(textRef.current);
                        if(document.querySelector('.input-box-transliterate').innerText.length == 0){
                            handleDissapear();
                        }
                    } else {
                    }
                } else if(charCode >= 65 && charCode <= 90) {
                    setShowImeSugessiton(true);
                    text = inputTransliterate.current.innerText + e.key;
                    textRef.current = inputTransliterate.current.innerText + e.key;
                    inputTransliterate.current.innerText = inputTransliterate.current.innerText + e.key;
                    e.preventDefault();
                    renderSuggestions(textRef.current);
                }else if(charCode >= 106 && charCode <= 111) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key);
                        e.preventDefault();                       
                    }
                }else{
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault();
                    }
                }              
            }
            else {
                if(document.querySelector('.active-transliterate-result') === null) return;                
                if (charCode == 40) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        setActiveResult(activeResult == 4 ? 0 : activeResult + 1);
                        e.preventDefault();
                    } else {
                    }
                }else if(charCode >= 48 && charCode <= 57){
                    if (e.shiftKey && document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key);
                        e.preventDefault();
                    }else{
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,null);
                        e.preventDefault();
                    }
                }else if(charCode == 18){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        e.preventDefault();
                    }
                } else if (charCode == 46) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        e.preventDefault();
                    }
                } else if (charCode == 38) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        setActiveResult(activeResult == 0 ? 4 : activeResult - 1);
                        e.preventDefault();
                    } else {
                    }
                }else if((charCode >= 186 && charCode <= 222)){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key);
                        e.preventDefault();
                    }
                } else if (charCode == 32) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,null);
                        e.preventDefault();
                    } else {
                    }
                }else if (charCode == 13){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText, null, false);
                        e.preventDefault();
                    }
                } else if (charCode == 39) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault();
                    } 
                } else if (charCode == 37) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault();
                    }
                } else if (charCode == 16) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault();
                    }
                }else {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    setShowImeSugessiton(false);
                    e.preventDefault();
                    }
                }
                return false;
            }
        }
    }

    const handlePasteSelection = (e) => {
        if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
            insertTextAtCaret(e.target.innerText,null);
            e.preventDefault();
        }
        e.preventDefault();
    }

    const handleDissapear = () => {
        createTargetContentEditableRefs();
        document.querySelector('.input-box-transliterate').innerHTML = '';
        setOptions([]);
        setActiveResult(0);
        setShowImeSugessiton(false);
    }

    /* Whenever select a target contenteditable */
    const contentEditableFocus = (e,type) => {
        let id = e.target.getAttribute("data-id");
        if (e.target.className?.includes('source')) {
            if (sourceTextDiv.current[id].current !== null) {
                let pos = getHTMLCaretPosition(sourceTextDiv.current[id].current);
                let firstSeg = replaceTagsWithText(unescape(sourceTextDiv.current[id].current.innerHTML).slice(0, pos));
                let secondSeg = replaceTagsWithText(unescape(sourceTextDiv.current[id].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[id].current.innerHTML).length));
                if ((pos !== null || pos !== undefined) && mergeSelectedSegmentIds?.length === 0) {
                    if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                        segmentIdRef.current = e.target.getAttribute('data-id');
                        sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit');
                        setDisbaleSplitIcon(false);
                    }
                }
            }
        }
        handleToggleVisibility(pushPinActive ? true : (advancedOptionVisibility) ? true : false);
        if(type !== 'editor'){
            highlightFocusedSegment(id);
        }
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        // setPopoverOpen(false);
        showTmSectionFunction(false);
        setFocusedDivId(id);
        ctrlAClicked.current = false;
        focusedDivIdRef.current = id;
        // spellCheck(e);
        symSpellCheck(id);
        // getSegmentDiff();
        changeEditedStatus(id);
        let advanceToolbarOpenedForTm = false;
        if (targetContentEditable?.current[id]?.current != null) {
            if (findTerm === "") {
                // uncomment below line to auto scroll the segment into view
                // targetContentEditable?.current[id]?.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }
        }
        /* Remove NER if it's active - start */
        if (isNerActive.current) {
            isNerActive.current = !isNerActive.current;
            if (nerRef.current != null) nerRef.current?.click();
        }
        /* Remove NER if it's active - end */
        let segmentId = e.target.getAttribute("data-id");
        let segmentData = translatedResponse.find((element) => element.segment_id == segmentId);
        let thisSegmentTag = segmentData?.target_tags;
        let textTag = "" + thisSegmentTag;       
        /*Glossary request starts*/
        // let glossaryFileId = localStorage.getItem("glossaryFileId");
        setGrammarPopoverOpen(false);
        setgrammarCheckPopoverTarget("");
        setPopoverOpen(false);
        let tbxFormdata = new FormData();
        let sourceText = e.target.getAttribute("data-source-text");
        if (paraphraseText === "" || grammarCheckPopoverTarget === "") {
            // sourceText = removeAllTags(sourceText);
        }
        tbxFormdata.append("user_input", type == 'editor' ? document.querySelector('#source-text-div-3')?.innerText : sourceText);
        tbxFormdata.append("task_id", documentId);
        tbxFormdata.append("lang", tarLangRef.current);
        tbxFormdata.append("srclang", sourceLangRef.current);
        let url = Config.BASE_URL + "/workspace/tbx_read";

        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: tbxFormdata,
            success: (response) => {
                if (response.data !== undefined) {
                    if (response.data.out.length > 0) {
                        setTbxData(response.data.out);
                        showTmSectionFunction();
                        if (!advanceToolbarOpenedForTm) {
                            let segmentData = translatedResponse.find((element) => element.segment_id == id);
                            let segmentStatus = allSegmentStatuses.current[id];
                            if (segmentStatus == null || segmentStatus == 101) {
                                advanceToolbarOpenedForTm = true;
                                handleToggleVisibility(true); // enabling it will automatically opens the footer if tbx data is present
                            }
                        }
                    }
                }
            },
            error: (error) => { },
        });
        let glossaryFormdata = new FormData();
        if (axiosGlossarySearchTermAbortControllerRef.current) {
            axiosGlossarySearchTermAbortControllerRef.current.abort();
        }    
        const controller = new AbortController();
        axiosGlossarySearchTermAbortControllerRef.current = controller;
        glossaryFormdata.append("user_input", type == 'editor' ? document.querySelector('#source-text-div-3')?.innerText : sourceText);
        glossaryFormdata.append("task_id", documentId);
        let glossaryUrl = Config.BASE_URL + "/glex/glossary_term_search/";

        Config.axios({
            url: glossaryUrl,
            method: "POST",
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            data: glossaryFormdata,
            success: (response) => {
                if (response.data !== undefined) {
                    if (response.data.res !== null || response.data.res.length > 0) {
                        setGlossaryData(response.data.res);
                        showTmSectionFunction();
                        handleToggleVisibility(true);
                        if (!advanceToolbarOpenedForTm) {
                            let segmentData = translatedResponse.find((element) => element.segment_id == id);
                            let segmentStatus = allSegmentStatuses.current[id];
                            if (segmentStatus == null || segmentStatus == 101) {
                                advanceToolbarOpenedForTm = true;
                                handleToggleVisibility(true); // enabling it will automatically opens the footer if glossary data is present
                            }
                        }
                    }
                }
            },
            error: (error) => { },
        });

    };

    const logSelection = () => {
        selectionTextRef.current = document.getSelection().toString();
        setStorySelectionText(document.getSelection().toString());
    }
    
    try{
        if (targetNoteEditableDiv) {
            targetNoteEditableDiv.addEventListener("selectstart", () => {
                document.addEventListener("selectionchange", logSelection);
            });    
            targetNoteEditableDiv.addEventListener("blur", () => {
                document.removeEventListener("selectionchange", logSelection);
            })
        }
    }catch(e) {console.error(e);}

    const getMachineTranslation = (e, item) => {
        if(item?.type !== "Story"){
            if(targetContentEditable.current[item?.segment_id].current){
                targetContentEditable.current[item?.segment_id].current.innerHTML = item?.mt_raw;
            }
        }else{
            editorRef.current?.summernote('code', item?.mt_raw);
        }
        handleChangeUpdate();        
    }
    
    // ================================================================================================================
    let id,
        segmentNo,
        hasComment,
        sourceOriginal,
        sourceText,
        translation,
        savedTranslation,
        translatedText,
        span,
        tagName,
        thisTag,
        replacedTranslation,
        tempTranslation,
        machineTranslatedText,
        globalMatch,
        sourceFindTermTemp,
        replaceFromRegExp,
        targetFindTermTemp,
        textUnit;
    let bgColor = "#0074D3";

    return (
        <React.Fragment>
            <Navbar
                documentId={documentId}
                projectName={projectName}
                fileName={fileName}
                isTranslatedAudioFileAvailable={isTranslatedAudioFileAvailable}
                isWhite={true}
                enableFileDownload={enableFileDownload}
                showHowToTour={showHowToTour}
                showTagsTour={showTagsTour}
                setShowAudioOptionsModal={setShowAudioOptionsModal}
                voiceType={voiceType}
                showAudioOptionsModal={showAudioOptionsModal}
                localeOptions={localeOptions}
                genderOptions={genderOptions}
                handleLocaleChange={handleLocaleChange}
                handleGenderChange={handleGenderChange}
                audioLocale={audioLocale}
                audioGender={audioGender}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                targetLanguageScript={targetLanguageScript}
                totalCharCount={totalCharCount}
                audioFileAlreadyExist={audioFileAlreadyExist}
                getDocumentDetailsById={getDocumentDetailsById}
                updatedFileDownload={updatedFileDownload}
                prevPathRef={prevPathRef}
                downloadTrigger={downloadTrigger}
                listSegments={() => console.log()}
                mtEnable={mtEnable}
                docCreditCheckAlertRef={docCreditCheckAlertRef}
                showDocumentSubmitButton={showDocumentSubmitButton}
                enableDocumentSubmitBtn={enableDocumentSubmitBtn}
                handleDocumentSubmitBtn={handleDocumentSubmitBtn}
                showReturnRequestBtn={false}
                isWorkspaceEditable={isWorkspaceEditable}
                documentTaskIdRef={documentTaskIdRef}
                isPIBWorkspace={true}
            />
            {
                showAiLoader && <MainAILoader background={"#ffffffba"} />
            }
            {showToolbarSection && (
                <section id="toolbar-section" className="toolbar-mega-section toolbar-parts-padd-top-add">
                    <div className="toolbar-part-section" ref={toolbarsRef} id="toolbars">
                        <div className="toolbar-part-container">
                            <div className="toolbar-list-align">
                                <ul>
                                    <li onClick={(e) => showHideToolbarElement("showDictionary")}>
                                        <Tooltip title={t("dictionaries_and_references")} placement="bottom" arrow>
                                            <div ref={showDictionaryRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg dictionary"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li onClick={(e) => showHideToolbarElement("showSpecialCharacters")}>
                                        <Tooltip title={t("special_characters")} placement="bottom" arrow>
                                            <div ref={showSpecialCharactersRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg omega"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                </ul>                                
                                {showSpellCheckIcon && (
                                    <ul className="last-row-tools" onClick={toggleSpellcheck}>
                                        <li>
                                            <Tooltip title={t("spell_check")} placement="bottom" arrow>
                                                <div ref={toggleSpellCheckBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg spellcheck " + (enableSpellCheck ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                )}                                
                                {/* {targetLanguage === "English" && (
                                    <ul className="last-row-tools-1" onClick={toggleSynonym}>
                                        <li>
                                            <Tooltip title={t("synonym")} placement="bottom" arrow>
                                                <div ref={toggleSynonymBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg synonym " + (enableSynonym ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                )} */}                                
                                {supportedImeLanguage?.includes(targetLanguageCode) &&  <ul className="last-row-tools-1" onClick={handleIme}>
                                    <li>
                                        <Tooltip title="Transliteration typing" placement="bottom" arrow>
                                            <div ref={imeRef} className={"toolbar-list-icons-align toolbar-list-icons-disable" + (imeOn ? " toolbar-list-icons-active" : "")} style={{ border: 'none'}}>
                                                <div className={"toolbar-list-icon-bg ime-editor "}></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>
                </section>
            )}            
            <section className={"workspace-editor workspace-editor-add-top federal-news-workspace-wrap " + workspaceAreaClassName}>
                {!isSegmentPageLoading ? (
                    <div className="workspace-container">
                        <div className="workspace-wrap">
                            {projectName && (
                                <div className="workspace-editor-comp-logo">
                                    <h3>{projectName}</h3>
                                </div>
                            )}
                            {(isSegmentLoading && translatedResponse?.length === 0) ? (
                                <form className="workspace-form">
                                    <ul id="workspace" className="display load">
                                        {Array(6)
                                            .fill(null)
                                            .map((key, index) => (
                                                <li key={index}>
                                                    <div className="workspace-row-copy">
                                                        <div className="src-lang-part">
                                                            <div className="src-workspace-align">
                                                                <div className="source-text-div">
                                                                    <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                                                                    <Skeleton animation="wave" height={15} width="80%" />
                                                                </div>
                                                                <div>
                                                                    <div className="segment-align">
                                                                        <Skeleton animation="wave" height={35} width={24} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="target-lang-part-loader trigger-focus">
                                                            <div className="workspace-align trigger-focus">
                                                                <div className="form-group new-form-group trigger-focus">
                                                                    <div className="workspace-textarea">
                                                                        <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                                                                        <Skeleton animation="wave" height={15} width="80%" />
                                                                    </div>
                                                                </div>
                                                                <div className="target-lang-row-align trigger-focus">
                                                                    <div className="segment-status trigger-focus">
                                                                        <Skeleton animation="wave" height={15} width={65} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </form>
                            ) : translatedResponse?.length === 0 ? (
                                <div className="workspace-no-segment-found">
                                    <img src={NoSegmentImg} />
                                    <p>{t("no_segments_has_been_found")}</p>
                                </div>
                            ) : (
                                <form className="workspace-form">
                                    <ul id="workspace" className="display" ref={contentEditableParentRef}>
                                        {
                                            translatedResponse?.map((translation, key) => {
                                           
                                               id = translation.segment_id
                                                

                                                return (
                                                    <div className={translation.source?.length  != 0 &&  translation.source?.length  != undefined ? "federal-segment-wrapper" : "federal-segment-wrapper d-none"}>
                                                        <span className="title">{translation?.type}</span>
                                                        <li key={id} onClick={() => !isWorkspaceEditable && highlightFocusedSegment(translation.segment_id)}>
                                                            <div
                                                                ref={workspaceRow.current[id]}
                                                                className={"workspace-row " +
                                                                    (mergeSelectedSegmentIds.indexOf(id) !== -1 ? "segmentbgchange " : " ") +
                                                                    ((allSegmentStatusState[id] == 101 || allSegmentStatusState[id] == 103 || allSegmentStatusState[id] == 105 || allSegmentStatusState[id] == 109) ?
                                                                        "unconfirmed-segment"
                                                                        : (allSegmentStatusState[id] == 102 || allSegmentStatusState[id] == 104 || allSegmentStatusState[id] == 106 || allSegmentStatusState[id] == 110) ?
                                                                            "confirmed-segment" : "") + (translation.isFocused ? " focused-row" : "")
                                                                }
                                                                data-id={id}
                                                            >
                                                                <div className="src-lang-part trigger-focus" data-id={id} onClick={(e) => isWorkspaceEditable && sourceSegmentClick(e)}>
                                                                    <div className="src-workspace-align trigger-focus" data-id={id} style={translation.isFocused ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }} >
                                                                            <div
                                                                                className={rightAlignLangs.current.indexOf(sourceLanguage) != -1 ? "source-text-div align-right" : "source-text-div"}
                                                                                onClick={(e) =>  highlightFocusedSegment(translation.segment_id)}
                                                                                onKeyDown={(e) => e.preventDefault()}
                                                                                ref={sourceTextDiv.current[id]}
                                                                                id={"source-text-div-" + id}
                                                                                onChange={(e) => e.preventDefault()}
                                                                                onPaste={(e) => e.preventDefault()}
                                                                                onDrop={(e) => e.preventDefault()}
                                                                                onCut={(e) => e.preventDefault()}
                                                                                spellCheck="false"
                                                                                style={{ marginTop: 0}}
                                                                                contentEditable={false}
                                                                                suppressContentEditableWarning={true}
                                                                                dangerouslySetInnerHTML={{__html: translation?.source}}
                                                                            ></div>
                                                                        {(
                                                                            <div>
                                                                                <div className="segment-align" style={{justifyContent: 'flex-end'}}>
                                                                                    <div className="source-div-icon">
                                                                                        {/* <Tooltip title={t("copy_src_to_tar_tooltip")} placement="top" arrow>
                                                                                            <a
                                                                                                type="button"
                                                                                                ref={copySourceToTargetRef}
                                                                                                style={!isWorkspaceEditable ? { pointerEvents: 'none' } : {}}
                                                                                                className="workspace-feature-btn-2"
                                                                                                onClick={(e) => isWorkspaceEditable && copySourceToTarget()}
                                                                                            >
                                                                                                <div className="toolbar-list-icon-bg copy-to-target"></div>
                                                                                            </a>
                                                                                        </Tooltip> */}
                                                                                        <Tooltip title={t("replace_content_with_mt_tooltip")} placement="top" arrow>
                                                                                            <a
                                                                                                type="button"
                                                                                                className={
                                                                                                    "get-machine-translate-btn"
                                                                                                }
                                                                                                data-id={id}
                                                                                                style={!isWorkspaceEditable ? { pointerEvents: 'none' } : {}}
                                                                                                onClick={isWorkspaceEditable ? (e) => { getMachineTranslation(e, translation) } : () => {}}
                                                                                            >
                                                                                                <div data-id={id} className="translate"></div>
                                                                                            </a>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="target-lang-part trigger-focus" style={{ padding: translation?.type === "Story" ? "1.5rem 1.5rem 1rem 1.5rem" : '1.5rem 1.5rem 1rem 1.5rem'}} data-id={id} onClick={(e) => targetSegmentClick(e)}>
                                                                    <div className="workspace-align trigger-focus" data-id={id} onClick={() => translation?.type === "Story" && triggerFocuseWritter()}>
                                                                        <div className="form-group new-form-group trigger-focus" data-id={id}>
                                                                            {translation?.type === "Story" ? (
                                                                                <RichTexteditor 
                                                                                    contentEditableFocus={contentEditableFocus} 
                                                                                    triggerFocuseWritter={triggerFocuseWritter}  
                                                                                    handleChangeUpdate={handleChangeUpdate} 
                                                                                    translation={translation.target}
                                                                                    editorRef={editorRef}
                                                                                    isWorkspace={true}
                                                                                />
                                                                            ) : ( 
                                                                                <div
                                                                                    data-placeholder={(segmentNo == 1 && !isUserIsReviwer) ? "Click here to translate..." : (segmentNo == 1 && isUserIsReviwer) ? "Click here to review" : (isConfirmBtnClicked && segmentNo == 2) ? "Click here to continue" : ''}
                                                                                    contentEditable={isWorkspaceEditable ? (translatedResponseDisableEditRef.current?.find(each => each.segment_id == id)?.disableEdit ? false : true) : false}
                                                                                    ref={targetContentEditable.current[id]}
                                                                                    onFocus={(e) => {contentEditableFocus(e); highlightFocusedSegment(translation.segment_id)}}
                                                                                    onKeyDown={(e) => imeOn && handeKeyDownDiv(e)}
                                                                                    onKeyUp={(e) => handleKeyDown(e)}
                                                                                    onClick={(e) => imeOn && handleDissapear()}
                                                                                    onInput={() => handleChangeUpdate()}
                                                                                    onScroll={(e) => imeOn && handleDissapear()}
                                                                                    onDrop={(e) => e.preventDefault()}  // this line prevent from dropping anything inside the target segment
                                                                                    data-id={id}
                                                                                    data-source-text={translation.source}
                                                                                    id={"workspace-textarea-" + id}
                                                                                    className={rightAlignLangs.current.indexOf(targetLanguage) != -1 ? "workspace-textarea align-right" : "workspace-textarea"}
                                                                                    style={targetLanguageFontSize != null ? { fontSize: targetLanguageFontSize } : {}}
                                                                                    spellCheck="false"
                                                                                    suppressContentEditableWarning={true}
                                                                                    dangerouslySetInnerHTML={{ __html: translation.target }}
                                                                                ></div> 
                                                                           )}
                                                                        </div>
                                                                            {(translation?.isFocused) && (
                                                                                <div data-id={id} className="target-lang-row-align trigger-focus">
                                                                                    <div data-id={id} className="segment-status trigger-focus">
                                                                                        {(isWorkspaceEditable) ? (
                                                                                            !["Tags", "Keywords", "Author name", "Location"]?.find(each => each === translation?.type) &&
                                                                                                <>
                                                                                                    <Tooltip title={
                                                                                                        (translation?.type === "Story" && (storySelectionText?.trim()?.length < 20 || storySelectionText?.trim()?.length > 500)) ? 
                                                                                                        "Select 20 to 500 characters to rewrite" : ""
                                                                                                    }>
                                                                                                        <button 
                                                                                                            aria-describedby={transphraseId} 
                                                                                                            className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Rewrite' ? "active" : "")} 
                                                                                                            onClick={(e) => {
                                                                                                                translation?.type === "Story" ? (
                                                                                                                    storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ?
                                                                                                                    handleTransphrase(e, 'Rewrite', translation) : e.preventDefault()
                                                                                                                ) : (
                                                                                                                    handleTransphrase(e, 'Rewrite', translation)
                                                                                                                )
                                                                                                            }}
                                                                                                            style={translation?.type === "Story" ? (storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ? {} : {opacity: 0.5}) : {}}
                                                                                                        >
                                                                                                            <span>Rewrite</span>
                                                                                                        </button>
                                                                                                    </Tooltip>
                                                                                                    <Tooltip title={
                                                                                                        (translation?.type === "Story" && (storySelectionText?.trim()?.length < 20 || storySelectionText?.trim()?.length > 500)) ? 
                                                                                                        "Select 20 to 500 characters to simplify" : ""
                                                                                                    }>
                                                                                                        <button 
                                                                                                            aria-describedby={transphraseId} 
                                                                                                            className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Simplify' ? "active" : "")} 
                                                                                                            onClick={(e) => {
                                                                                                                translation?.type === "Story" ? (
                                                                                                                    storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ?
                                                                                                                    handleTransphrase(e, 'Simplify', translation) : e.preventDefault()
                                                                                                                ) : (
                                                                                                                    handleTransphrase(e, 'Simplify', translation) 
                                                                                                                )
                                                                                                            }}
                                                                                                            style={translation?.type === "Story" ? (storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ? {} : {opacity: 0.5}) : {}}
                                                                                                        >
                                                                                                            <span>Simplify</span>
                                                                                                        </button>
                                                                                                    </Tooltip>
                                                                                                    <Tooltip title={
                                                                                                        (translation?.type === "Story" && (storySelectionText?.trim()?.length < 20 || storySelectionText?.trim()?.length > 500)) ? 
                                                                                                        "Select 20 to 500 characters to shorten" : ""
                                                                                                    }>
                                                                                                        <button 
                                                                                                            aria-describedby={transphraseId} 
                                                                                                            className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Shorten' ? "active" : "")} 
                                                                                                            onClick={(e) => {
                                                                                                                translation?.type === "Story" ? (
                                                                                                                    storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ?
                                                                                                                    handleTransphrase(e, 'Shorten', translation) : e.preventDefault()
                                                                                                                ) : (
                                                                                                                    handleTransphrase(e, 'Shorten', translation)
                                                                                                                )
                                                                                                            }}
                                                                                                            style={translation?.type === "Story" ? (storySelectionText?.trim()?.length >= 20 && storySelectionText?.trim()?.length <= 500 ? {} : {opacity: 0.5}) : {}}
                                                                                                        >
                                                                                                            <span>Shorten</span>
                                                                                                        </button>
                                                                                                    </Tooltip>
                                                                                                </>
                                                                                        ) : null}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </div>
                                                );
                                            })
                                        }
                                    </ul>
                                </form>
                            )}
                        </div>
                    </div>
                ) : (        
                    <MainAILoader position={"absolute"} zIndex={1} />
                )}                
                {showSpecialCharacters && (
                    <Draggable defaultPosition={{ x: 100, y: 100 }} >
                        <div ref={specialCharSectionRef} className="toolbar-parts" id="special-characters-section">
                            <div className="close-spl-char">
                                <button type="button" onClick={(e) => !showHideToolbarElement("showSpecialCharacters")} className="close-spl-char-btn">
                                    &#x2715;
                                </button>
                            </div>
                            <div className="toolbar-part-container">
                                <h4 className="symbol-char-title">{t("symbols")}</h4>
                                <div className="symbol-char">
                                    {specialCharacters.map((value, key) => {
                                        if ((key + 1) % 4 == 0) {
                                            return (
                                                <div className="special-char-box" key={value}>
                                                    <p onClick={(e) => insertSpecialCharacter(e)} className="spl-char-cont">
                                                        {value}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div className="special-char-box" key={value}>
                                                <p onClick={(e) => insertSpecialCharacter(e)} className="spl-char-cont">
                                                    {value}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Draggable>
                )}
                <div id="pop" className="spellcheck-popover-box instant-spell-check-pop" style={{borderRadius: '5px', background: '#fff'}}>
                    <div className="instant-popover">
                        <div className="popover-inner">
                            <span>{spellCheckSuggestion}</span>
                            <div id="arrow" className="arrow-top"></div>
                        </div>
                    </div>    
                </div>
            </section>
            <section ref={workspaceFeaturRef} className={advancedOptionVisibility ? "workspace-features wokspace-features-collapse" : "workspace-features"}>
                <div className="workspace-tools-bar">
                    <div className="workspace-tool-bar-wrap">
                        <div className="workspace-tool-bar-scroll-check">
                            <div className="left-arrow" onClick={() => scrollLeft()}>
                                <NavigateBeforeSharpIcon className="navigate-icon" />
                            </div>
                            <div ref={scrl} className="workspace-tool-bar-links-wrap">
                                <ul  className="nav nav-pills"  id="pills-tab"  role="tablist" >
                                    <li className="nav-item" role="presentation">
                                        <a ref={tmTabButton}  onClick={(e) => e.isTrusted && handleToggleVisibility(true)}  className="nav-link"  id="pills-tm-tb-tab"
                                            data-toggle="pill"
                                            href="#pills-tm-tb"
                                            role="tab"
                                            aria-controls="pills-tm-tb"
                                            aria-selected="true" >
                                            {t("tm_and_glossary")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a ref={dictionaryTabButton}  onClick={(e) => e.isTrusted && handleToggleVisibility(true)}  className="nav-link"  id="pills-dictionary-tab"
                                            data-toggle="pill"
                                            href="#pills-dictionary"
                                            role="tab"
                                            aria-controls="pills-dictionary"
                                            aria-selected="false" >
                                            {t("dictionary")}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-arrow" onClick={() => scrollRight()}>
                                <NavigateNextSharpIcon className="navigate-icon" />
                            </div>
                        </div>
                        <div className="workspace-tools-bar-right-sec">
                            { advancedOptionVisibility &&
                                <div className="workspace-page-pinned">
                                    <span onClick={() => handlePushPinActive(!pushPinActive)} className={"workspace-pin " + (pushPinActive ? "active" : "")}>
                                        <img src={PushPin} alt="push_pin" />
                                    </span>
                                </div>
                            }
                            <div className="workspace-page-minimize">
                                <span className="tool-tm-section-minimize" onClick={(e) => handleToggleVisibility(pushPinActive ? advancedOptionVisibility : !advancedOptionVisibility)}>
                                    {advancedOptionVisibility ? (
                                        <ExpandMoreIcon />
                                    ) : (
                                        <ExpandLessIcon />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={advancedOptionVisibility ? "workspace-working-area tab-content" : "workspace-working-area tab-content d-none"} id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-tm-tb" role="tabpanel" aria-labelledby="pills-tm-tb-tab">
                        {showTmSection && (
                            <section className="top-section-show">
                                <div className="modal-top-body">
                                    <div className="tm-tb-main-row">
                                        <div className={translationMatches?.length === 0 ? "tm-container-no-found tm-side-border" : (tbxData?.length === 0 && glossaryData?.length === 0) ? "tm-container-expand tm-container tm-side-border" : "tm-container tm-side-border"}>
                                            {
                                                translationMatches?.length === 0 ?
                                                    <div className="tm-container-no-matches-found">
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="top-section-title-align">
                                                            <div className="top-body-title-1">
                                                                <p>
                                                                    <span>{t("tmx_src")}</span>
                                                                </p>
                                                            </div>
                                                            <p className="top-body-title-2">
                                                                <span>{t("tmx_tar")}</span>
                                                            </p>
                                                            <div className="top-body-title-3"></div>
                                                        </div>
                                                        <div className="translation_memories-2">
                                                            <div className="translation_memories-1">
                                                                <ul>
                                                                    {translationMatches.map((value, key) => {
                                                                        return (
                                                                            <li key={value.source}>
                                                                                <div className="tm-tb-sub-cont">
                                                                                    <div className="translation-list-value-src">
                                                                                        <div className="text-left d-flex align-items-start justify-content-between">
                                                                                            <p className="tb-file-src-txt">{value.source}</p>
                                                                                            <img className="tmx-arrow-icon" src={ArrowRightAltColor} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="translation-list-value-tar">
                                                                                        <div className="target-lang-align">
                                                                                            <div className="text-left">
                                                                                                <p className="tb-file-tar-txt">{unescape(value.target)}</p>
                                                                                            </div>
                                                                                            <div className="tmx-links-algin">
                                                                                                <div className="translation-mem-percent-box">
                                                                                                    <span>{value.percentage}</span>
                                                                                                    <span>% {t('match')}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="translation-list-value-copy-btn">
                                                                                        <button  type="button"  className="workspace-feature-btn-new" data-key={key}
                                                                                            data-match-percentage={value.percentage}
                                                                                            onClick={(e) => getTranslationMatch(e)}
                                                                                            data-toggle="tooltip"
                                                                                            title="Use" >
                                                                                            <img  data-key={key} src={NorCopyContent} className="content-copy" alt="copy text" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                        <div className={(tbxData?.length === 0 && glossaryData?.length === 0) ? "tb-container-no-found" : translationMatches?.length === 0 ? "tm-container-expand tb-container tm-side-border" : "tb-container"}>
                                            {
                                                (tbxData?.length === 0 && glossaryData?.length === 0) ?
                                                    <div className="tm-container-no-matches-found">
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="glossary-tbx-data-header">
                                                            <div className="glossary-tbx-header-row">
                                                                <div className="glossary-tbx-header-col">
                                                                    <div className="glossary-tbx-name-source-1">
                                                                        {t("glossary_name")}
                                                                    </div>
                                                                    <div className="glossary-tbx-name-source-2">
                                                                        {t("src_lang_terms")}
                                                                    </div>
                                                                </div>
                                                                <div className="glossary-tbx-header-col">
                                                                    <div className="glossary-tbx-target">
                                                                        {t("tar_lang_terms")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="translation_memories-1">
                                                            {glossaryData.map((each, key) => {
                                                                return (
                                                                    <ul key={key}>
                                                                        {
                                                                            each.data.map((value, ind) => {
                                                                                return (
                                                                                    <>
                                                                                        <li key={ind}>
                                                                                            <div className="glossary-data-wrapper">
                                                                                                <div className="glossary-data-src-wrapper">
                                                                                                    <p className="top-body-title pl-0">{each?.glossary}</p>
                                                                                                    <div className="tm-tb-sub-cont-2">
                                                                                                        <div className="translation-list-src-part">
                                                                                                            <p className="settings-file-names-new">{value.source}</p>
                                                                                                        </div>
                                                                                                        <div className="translation-list-src-part">
                                                                                                            <img src={ArrowRightAltColor} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="translation-list-tar-part">
                                                                                                    <div className="target-lang-align-1">
                                                                                                        <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                                                    </div>
                                                                                                    <div className="translation-list-value-copy-btn">
                                                                                                        <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top" > 
                                                                                                            <button type="button"  className="workspace-feature-btn-new"  onMouseUp={(e) => copyText(value.target)}
                                                                                                                onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)}  >
                                                                                                                <img  src={NorCopyContent} className="content-copy" alt="copy text"  />
                                                                                                            </button>
                                                                                                        </Tooltip>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                )
                                                            })}
                                                            <ul>
                                                                {tbxData.map((value, key) => (
                                                                    <li key={key}>
                                                                        <div className="glossary-data-wrapper">
                                                                            <div className="glossary-data-src-wrapper">
                                                                                <p className="top-body-title pl-0">{t("from")} TBX</p>
                                                                                <div className="tm-tb-sub-cont-2">
                                                                                    <div className="translation-list-src-part">
                                                                                        <p className="settings-file-names-new">{value.source}</p>
                                                                                    </div>
                                                                                    <div className="translation-list-src-part">
                                                                                        <img src={ArrowRightAltColor} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="translation-list-tar-part">
                                                                                <div className="target-lang-align-1">
                                                                                    <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                                </div>
                                                                                <div className="translation-list-value-copy-btn">
                                                                                    <button  type="button"  className="workspace-feature-btn-new" onClick={(e) => copyText(value.target)}  >
                                                                                        <img src={NorCopyContent}  className="content-copy"  alt="copy text"  />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="tab-pane fade" id="pills-dictionary" role="tabpanel" aria-labelledby="pills-dictionary-tab">
                        {
                            <section className="dictionary-section">
                                <div className="dictionary-wikipedia dictionary-border-right">
                                    <p className="dictionary-wikipedia-title">
                                        <span>
                                            <img src={WikipediaIcon} />
                                        </span>
                                        {t("from_wikipedia")}
                                    </p>
                                    <div className="dictionary-search-word-cont">
                                        {wikipediaData?.source == "" ? (
                                            <p>{t("no_results_found")}</p>
                                        ) : (
                                            <ul>
                                                <li>
                                                    {wikipediaData.source != "" && (
                                                        <a href={wikipediaData.sourceUrl} target="_blank">
                                                            {wikipediaData.source}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    )}
                                                </li>
                                                { (wikipediaData.source != "" && wikipediaData.target != "") &&
                                                    <li><img src={ArrowRightAltColor} /></li>
                                                }
                                                <li>
                                                    { wikipediaData.target != "" && (
                                                        <a href={wikipediaData.targetUrl} target="_blank">
                                                            {wikipediaData.target}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    )}
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="dictionary-wikitionary">
                                    <p className="dictionary-wikitionary-title">
                                        <span>
                                            <img src={WikitionaryIcon} />
                                        </span>
                                        {t("from_wiktionary")}
                                    </p>
                                    <div className="dictionary-search-word-cont">
                                        {wiktionaryData.source == "" ? (
                                            <p>{t("no_results_found")}</p>
                                        ) : (
                                            <ul>
                                                <li>
                                                    {wiktionaryData.source != "" ? (
                                                        <a href={wiktionaryData.sourceUrl} target="_blank">
                                                            {wiktionaryData.source}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        ""
                                                    )}
                                                </li>
                                                { (wiktionaryData.source != "" && wiktionaryData.targets.length !== 0) &&
                                                    <li><img src={ArrowRightAltColor} /></li>
                                                }
                                                { wiktionaryData.targets.map((value, key) => (
                                                    <React.Fragment key={value}>
                                                        <li key={key}>
                                                            <a href={wiktionaryData.targetUrls[key]} target="_blank">
                                                                {value}
                                                                <span>
                                                                    <img src={OpenInNew} />
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </React.Fragment>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="wikitionary-search-word-cont">
                                        {posData.map((value, key) => (
                                            <React.Fragment key={value + "" + key}>
                                                <p>{value.pos}</p>
                                                <ul>
                                                    {value.definitions.map((definition, childKey) => (
                                                        <li key={key + "" + childKey}>{definition}</li>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        }
                    </div>
                </div>
            </section>
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
            {/* Synonym popover */}
            {
                (synonymPopoverTarget?.length && synonymPopoverOpen) ? (
                    <div>
                        <Popover
                            className="paraphrase-popover-box spellcheck-popover-box"
                            placement="bottom"
                            isOpen={synonymPopoverOpen && (document?.getElementById(synonymPopoverTarget) !== null || document.getElementById(synonymPopoverTarget) !== undefined)}
                            target={synonymPopoverTarget}
                        >
                            {synonymsResList?.length ?
                                (<span>{synonymsResList}</span>) : (<MessageTypingAnimation />)
                            }
                        </Popover>
                    </div>
                ) : null
            }
            {transphrasePopoverTarget !== null && (
                <MUIPopover
                    id={transphraseId}
                    open={transphrasePopoverOpen}
                    anchorEl={transphrasePopoverTarget !== null ? transphrasePopoverTarget : undefined}
                    // onClose={() => setTransphrasePopoverTarget(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }} >
                    <div className="transphraseing-popover-box">
                        <div className="header-wrapper">
                            <span className="header-text d-flex">
                                {selectedParaphrase}
                                {paraPhraseResList?.length !== 0 && (
                                    <span className="transphrase-reload-icon" onClick={() => getParaphrases(selectedParaphrase)}>
                                        <ReplayIcon style={{ fontSize: '18px' }} />
                                    </span>
                                )}
                            </span>
                            <span onClick={handleTransphrasePopoverClose} className="transphrasing-popover-close-icon"  >
                                <img src={BlackCloseIcon} alt="close_black" />
                            </span>
                        </div>
                        {(paraphraseTrigger && paraPhraseResList?.length !== 0) ? (
                            <div className="paraphrase-result-div">
                                <ul className="list-unstyled">
                                    <button onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                        <div className="capsule-wrapper">
                                            <div className={"capsule " + (rightAlignLangs.current.indexOf(targetLanguage) != -1 ? 'align-right' : '')}>
                                                {paraPhraseResList}
                                            </div>
                                            <Tooltip title="Copy to segment" placement="top" arrow>
                                                <button className="content-copy" onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                                    <ContentCopyIcon />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </button>
                                </ul>
                            </div>
                        ) : (
                            <div className="paraphrase-loader">
                                <MessageTypingAnimation />
                            </div>
                        )}
                    </div>
                </MUIPopover>

            )}
            {showCreditAlert && (
                <div className="credit-alert-box">
                    <div className="credit-alert-bg"></div>
                    <div className={(showCreditAlertRedirection || true) ? "credit-alert-content-container-with-redirection" : "credit-alert-content-container"}>
                        <div className="credits-head">
                            <span className="credits-close-btn"
                                onClick={() => {
                                    setCreditAlertTxt("");
                                    setShowCreditAlert(false)
                                    shouldShowInsufficientModal(false);
                                    setPartialPretranslate(false)
                                }} >
                                <img src={BlackCloseIcon} alt="close_black" />
                            </span>
                        </div>
                        <div className="credits-text-cont">
                            {true ? (
                                <React.Fragment>
                                    <img src={InsuffientIcon} alt="insuffient-icon" />
                                    <div className="insuffient-txt-align">
                                        <span>
                                            <img src={RemoveCircleRed} alt="remove_circle" />
                                        </span>
                                        <p>{t("insufficient_credits")}</p>
                                    </div>
                                    {
                                        partialPretranslate ?
                                            <p className="insuffient-desc">{t("pre-translation_modal_text")}</p>
                                        :
                                            <p className="insuffient-desc" dangerouslySetInnerHTML={{ __html: creditAlertTxt }}></p>
                                    }

                                    {(!Config.userState?.is_internal_member && enableFileDownload && isAssignEnable) && (
                                        <div className="credits-button-align mt-3">
                                            <ButtonBase>
                                                <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                                    {t("buy_credits")}
                                                </a>
                                            </ButtonBase>
                                            <ButtonBase className="ml-2">
                                                <div className="ai-alert-btn-grey" onClick={() => { setShowCreditAlert(false); setShowCreditAlertRedirection(true) }}>
                                                    {t("buy_credits_note")}
                                                </div>
                                            </ButtonBase>
                                        </div>
                                    )}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <img className="credits-alert-warn-icon"  src={ErrorBlackWarn}  alt="error_yellow_warn"  />
                                    {
                                        partialPretranslate ?
                                            <p className="credits-text-cont-txt text-center">{t("pre-translation_modal_text")}</p>
                                            :
                                            <p className="credits-text-cont-txt text-center" dangerouslySetInnerHTML={{ __html: creditAlertTxt }}></p>
                                    }
                                    {(!Config.userState?.is_internal_member && enableFileDownload && isAssignEnable) && (
                                        <div className="credits-button-align">
                                            <ButtonBase>
                                                <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                                    {t("buy_credits")}
                                                </a>
                                            </ButtonBase>
                                            <ButtonBase className="ml-2">
                                                <div className="ai-alert-btn-grey" onClick={() => { setShowCreditAlert(false); setShowCreditAlertRedirection(true) }}>
                                                    {t("buy_credits_note")}
                                                </div>
                                            </ButtonBase>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            )}            
            <SimpleRodals
                showMtDisabledModal={showMtDisabledModal}
                setShowMtDisabledModal={setShowMtDisabledModal}
                showInsufficientConfirmAllModal={showInsufficientConfirmAllModal}
                setShowInsufficientConfirmAllModal={setShowInsufficientConfirmAllModal}
                showVendorComplaintReasonModal={showVendorComplaintReasonModal}
                setShowVendorComplaintReasonModal={setShowVendorComplaintReasonModal}
                handleDocumentSubmitBtn={handleDocumentSubmitBtn}
                vendorReturnRequestReasonText={vendorReturnRequestReasonText}
                setVendorReturnRequestReasonText={setVendorReturnRequestReasonText}
                showDontHaveEditingAccessAlertModal={showDontHaveEditingAccessAlertModal}
                setShowDontHaveEditingAccessAlertModal={setShowDontHaveEditingAccessAlertModal}
                showSubmitConfirmModal={showSubmitConfirmModal}
                setShowSubmitConfirmModal={setShowSubmitConfirmModal}
                documentRestrictionReasonRef={documentRestrictionReasonRef}
                isDocumentSubmitting={isDocumentSubmitting}
            />
            <ClickAwayListener onClickAway={handleDissapear}>
                <div onClick={(e) => e.stopPropagation()} ref={transliterateCompRef} className="iframe-component-transliterate" height={250} width={250} style={{ top:top+23 , left:left, zIndex: 500, visibility:showImeSuggesstion? 'visible' : 'hidden',zIndex:showImeSuggesstion? '5' : '-1'  }}>
                    <div  className="transliterate-body"   >
                        <div className="input-box-transliterate" ref={inputTransliterate}></div>
                        <div className="sugessions">
                            <span>
                            {options.map((each,index) => (
                                <div className="each-suggesstions">
                                    <span className="suggesstion-numbering"><span>{index + 1}</span> <span>.</span> </span>
                                    <button onClick={(e) => { handlePasteSelection(e)}} className={activeResult == index ?   `active-transliterate-result results-options-button` : 'results-options-button'} key={each}>{each}</button>
                                    </div>
                            ))}
                            </span>                            
                        </div>
                    </div>
                </div >
            </ClickAwayListener>
        </React.Fragment>
    );
}

export default PIBWorkspace;
