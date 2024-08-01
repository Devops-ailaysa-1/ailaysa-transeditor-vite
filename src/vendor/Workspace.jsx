import "bootstrap";

import parse from "html-react-parser";
import React, { useState, useEffect, createRef, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import Config from "./Config";
import Navbar from "./Navbar";
import Draggable from "react-draggable";
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';
// import {enableTransliteration} from './google-input-tools/transliteration-input.bundle.js'
// import { enableTransliteration, disableTransliteration } from './google-input-tools/index.ts'
// import { TransliterationProvider } from "./google-input-tools/transliteration-provider";
// import "./google-input-tools/styles/style.scss";
// import Segment from './Segment'
import Cookies from "js-cookie";
import Cursor from "./Cursor";
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
import ContentCopyIcon from "./styles-svg/Content-copy-icon";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { webSpeechLang } from "../project-setup-components/speech-component/text-to-speech/WebSpeechLang";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "../vendor/styles-svg/DeleteIcon";
import { TextareaAutosize } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { t } from "i18next";
import generateKey from "../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import { Popover as MUIPopover } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CircularProgress from '@mui/material/CircularProgress';
import CloseBlack from "../assets/images/new-ui-icons/close_black.svg"
import ErrorBlackWarn from "../assets/images/new-ui-icons/error_black_warn.svg"
import InsuffientIcon from "../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../assets/images/new-ui-icons/remove_circle_red.svg"
import OpenInNew from "../assets/images/new-ui-icons/open_in_new.svg"
import ArrowRightAltColor from "../assets/images/new-ui-icons/arrow_right_alt_color.svg" 
import WikitionaryIcon from "../assets/images/new-ui-icons/wikitionary-new-img.png"
import WikipediaIcon from "../assets/images/new-ui-icons/wiki-new-img.svg"
import SendIcon from "../assets/images/new-ui-icons/send.svg"
import PushPin from "../assets/images/new-project-setup/push_pin.svg"
import PlusSymbol from "../assets/images/new-ui-icons/plus-sym.svg"
import MinusSymbol from "../assets/images/new-ui-icons/minus-sym.svg"
import ErrorFillYellow from "../assets/images/new-ui-icons/error_fill_yellow.svg"
import MergeNewBlack from "../assets/images/new-ui-icons/merge_new_black.svg"
import SplitNew from "../assets/images/new-ui-icons/split_new.svg"
import NoSegmentIcon from "../assets/images/no_segments_icon.png"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewMagnifier from "../assets/images/new-ui-icons/new-magnifier.svg"
import NorCopyContent from "../assets/images/new-ui-icons/nor-copy-content.svg"
import WorkspaceFeatures from "./workspace-components/WorkspaceFeatures";
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import AddGlossaryTermModal from "./model-select/AddGlossaryTermModal";
import { AilaysaGlossariesModal } from "./model-select/Ailaysa-Glossaries/AilaysaGlossariesModal";
import { OnTheFlyGlossary } from "./model-select/Ailaysa-Glossaries/on-the-fly-modal/OnTheFlyGlossary";
import { useDispatch } from "react-redux";
import { setShowGlossTermAddForm } from "../features/ai-glossary/ToggleGlossTermAddFormSlice";
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

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <span id="triangle-down"></span>
        </components.DropdownIndicator>
    );
};


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
        sx: {
            width: 265,
            borderRadius: "4px",
            boxShadow: "0px 2px 8px #0000002E",
            "& .MuiList-root": {
                padding: "21px 0px"
            },
            "& .MuiListItem-root": {
                fontSize: 14,
                lineHeight: 1.3,
                color: "#3C4043",
            },
            "& .MuiListItem-root:hover": {
                backgroundColor: "#F1F3F4"
            },
            "& .MuiListItem-root.Mui-selected": {
                color: "#202124",
            },
            "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
                backgroundColor: "#F1F3F4"
            },
            "& .MuiCheckbox-root": {
                color: "#5F6368",
                padding: "5px",
                "&:hover": {
                    backgroundColor: "#F1F3F4"
                }
            },
            "& .MuiCheckbox-colorSecondary": {
                "&.Mui-checked": {
                    color: "#0074D3"
                }
            }
        },
    }
};


function Workspace(props) {
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
    const dispatch = useDispatch()

    // const classes = useStyles();
    const userDetails = useSelector((state) => state.userDetails.value)
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)

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
    const [findTerm, setFindTerm] = useState("");
    const [findSelectedSegmentId, setFindSelectedSegmentId] = useState(null);
    const [replaceTerm, setReplaceTerm] = useState("");
    const [findArea, setFindArea] = useState("source");
    const [caseMatch, setCaseMatch] = useState(false);
    const [wholeWordMatch, setWholeWordMatch] = useState(false);
    const [pushPinActive, setPushPinActive] = useState(false);
    const [segmentStatusName, setSegmentStatusName] = useState([]);

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
    const [enableSynonym, setEnableSynonym] = useState(false)
    const [isWordsCorrected, setIsWordsCorrected] = useState(false)
    const [isWordsCorrectedTrigger, setIsWordsCorrectedTrigger] = useState(false)
    const [totalCharCount, setTotalCharCount] = useState(null)
    const [updatedFileDownload, setUpdatedFileDownload] = useState(null)
    const [paraphraseText, setParaphraseText] = useState("")
    const [paraphraseTrigger, setparaphraseTrigger] = useState(false)
    const [synonymText, setSynonymText] = useState("")

    const [grammarPopoverOpen, setGrammarPopoverOpen] = useState(false)
    const [paraphrasePopoverOpen, setParaphrasePopoverOpen] = useState(false)
    const [paraPhraseResList, setParaPhraseResList] = useState([])
    const [paraPhraseTag, setparaPhraseTag] = useState("")
    const [paraPhrasePopoverTarget, setparaPhrasePopoverTarget] = useState("")
    const [synonymsResList, setSynonymsResList] = useState([])
    const paraPhraseRef = useRef(null)
    const [grammarCheckPopoverTarget, setgrammarCheckPopoverTarget] = useState("")
    const [grammarCheckSuggestedSentence, setGrammarCheckSuggestedSentence] = useState([])
    const [grammarCheckResponse, setGrammarCheckResponse] = useState([])
    const [translateSwitch, setTranslateSwitch] = useState(false)
    const [showParaphraseBtn, setShowParaphraseBtn] = useState(true)   // hide paraphrase button when contenteditable is empty
    const [isTranslatedAudioFileAvailable, setIsTranslatedAudioFileAvailable] = useState(null)
    const [synonumSelectionObject, setSynonumSelectionObject] = useState(null)
    // const [updatedFileDownload, setUpdatedFileDownload] = useState(null)
    const [taskAssignUserDetails, setTaskAssignUserDetails] = useState(null)
    const [isUserIsReviwer, setIsUserIsReviwer] = useState(false)
    const [steps, setSteps] = useState([])
    const [stepOptions, setStepOptions] = useState([])
    const [audioFileAlreadyExist, setAudioFileAlreadyExist] = useState(false)
    const [disbaleSplitIcon, setDisbaleSplitIcon] = useState(true)

    // Auido Download States
    const [showAudioOptionsModal, setShowAudioOptionsModal] = useState(false)
    const [localeOptions, setLocaleOptions] = useState([])
    const [genderOptions, setGenderOptions] = useState([])
    const [audioLocale, setAudioLocale] = useState(null)
    const [audioGender, setAudioGender] = useState(null)
    const [voiceType, setVoiceType] = useState(null)

    const [partialPretranslate, setPartialPretranslate] = useState(false)

    const [splitLoader, setSplitLoader] = useState(false)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
    const [showMtDisabledModal, setShowMtDisabledModal] = useState(false)
    const [imeTextObject, setImeTextObject] = useState('')
    const [imeTextObjectTarget, setTextImeObjectTarget] = useState('')
    const [isConfirmBtnClicked, setIsConfirmBtnClicked] = useState(false)
    const [selectedPageSize, setSelectedPageSize] = useState(null)

    const [showInsufficientConfirmAllModal, setShowInsufficientConfirmAllModal] = useState(false)
    const [showAiLoader, setShowAiLoader] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const [mtEnable, setMtEnable] = useState(false)

    const [isWorkspaceEditable, setIsWorkspaceEditable] = useState(true)
    const [showDocumentSubmitButton, setShowDocumentSubmitButton] = useState(false)
    const [showVendorComplaintReasonModal, setShowVendorComplaintReasonModal] = useState(false)
    const [vendorReturnRequestReasonText, setVendorReturnRequestReasonText] = useState('')
    const [showReturnRequestBtn, setShowReturnRequestBtn] = useState(false)

    const [showDontHaveEditingAccessAlertModal, setShowDontHaveEditingAccessAlertModal] = useState(false)
    const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false)
    const [segmentDifference, setSegmentDifference] = useState([]);

    const [selectedParaphrase, setSelectedParaphrase] = useState(null);
    const [isParaphrasing, setIsParaphrasing] = useState(false);

    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    const [commentsDataCopy, setCommentsDataCopy] = useState([]);
    const [isDocumentSubmitting, setIsDocumentSubmitting] = useState(false);

    const [isAssignEnable, setIsAssignEnable] = useState(true)

    const [transphrasePopoverOpen, setTransphrasePopoverOpen] = useState(false);
    const [transphrasePopoverTarget, setTransphrasePopoverTarget] = useState(null);
    
    const [spellCheckWordsOptions, setSpellCheckWordsOptions] = useState([]);
    
    const [isSegmentConfirming, setIsSegmentConfirming] = useState(false);
    
    const [isSegmentPageLoading, setIsSegmentPageLoading] = useState(false);
    const [spellCheckSuggestion, setSpellCheckSuggestion] = useState([])
    
    // on-the-fly glossary term add states
    const [showGlossaryAddition, setShowGlossaryAddition] = useState(false);
    const [sourceSelectionText, setSourceSelectionText] = useState("")
    const [targetSelectionText, setTargetSelectionText] = useState("")
    
    const [wordChoicelist, setWordChoicelist] = useState([])
    const [selectedWordChoiceItem, setSelectedWordChoiceItem] = useState(null)
    const [selectedWordChoicePOS, setSelectedWordChoicePOS] = useState(null)

    const [isTermAdding, setIsTermAdding] = useState(false)
    const [showTaskAssignActionBtn, setShowTaskAssignActionBtn] = useState(false)
    
    const [commentsLoader, setCommentsLoader] = useState(false)
    const [segmentHistoryLoader, setSegmentHistoryLoader] = useState(false)
    const [isSegmentDataLoading, setIsSegmentDataLoading] = useState(false)
    
    // store selection coordinates
    const [selectedCoordinates, setSelectedCoordinates] = useState(null)
    
    const forcedLoaderRef = useRef(false)
    const glossarySrcFieldRef = useRef(null)
    const glossaryTarFieldRef = useRef(null)

    const axiosTransliterationAbortControllerRef = useRef(null)
    const axiosCommentListAbortControllerRef = useRef(null)
    const axiosSegmentHistoryAbortControllerRef = useRef(null)
    const axiosMTRawTMAbortControllerRef = useRef(null)
    const isDocumentOpenerVendorRef = useRef(false)
    const documentProgressRef = useRef(null)

    const isAssignEnableRef = useRef(true)
    const documentTaskIdRef = useRef(null)
    const isTaskReassignedRef = useRef(false)
    const documentSubmitStepRef = useRef(null)
    const isDocumentSubmittedRef = useRef(false)

    const docCreditCheckAlertRef = useRef(false)

    const translatedResponseRef = useRef([])
    const translatedResponseDisableEditRef = useRef([])

    const isEditorSubmittedDocument = useRef(false)
    const isWorkspaceEditableRef = useRef(true)

    const documentRestrictionReasonRef = useRef(null)

    const pageSizeOption = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 50, label: '50' },
    ]
    // const [selectionObject, setselectionObject] = useState(null)

    /* State constants - end */

    /*useRef() constants - start*/
    let scrl = useRef(null);
    const imeTextObjectTargetRef = useRef('')
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
    const showGlossaryRef = useRef();
    const showTagsRef = useRef();
    const copySourceToTargetRef = useRef();
    const nerRef = useRef();
    const sourceTextDiv = useRef([]);
    const targetContentEditable = useRef([]);
    const notSavedStatus = useRef([]);
    const workspaceRow = useRef([]);
    const savedStatus = useRef([]);
    const saveBtn = useRef([]);
    // const correctWordRef = useRef([])
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

    const segmentIdRef = useRef(null)
    const sourceTextUnitRef = useRef(null)
    const isSegmentMergeRef = useRef(null)
    const isMergedRef = useRef(false)
    const isRestoredRef = useRef(false)
    const isSplitRef = useRef(false)
    const errorNoteCount = useRef(0)
    const didMountRef = useRef(false)
    const prevPageInfo = useRef(null)
    /*useRef() constants - end*/

    /* createRef() constants - start */
    const toolbarsRef = createRef(null);
    const specialCharSectionRef = createRef(null);
    const addGlossarySectionRef = createRef(null);
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
    // const showConcoradanceRef = createRef();
    const showSpecialCharactersRef = createRef();
    const contentEditableParentRef = createRef();
    const selectionRangeRef = useRef();
    const lowCreditAlertCounter = useRef(1)
    const segmentDiffButton = useRef(null)

    const showConcoradanceRef = useRef(null)
    const prevPathRef = useRef(null)

    const pageSizeFromApi = useRef(null)

    const segmentStatusOptionsRef = useRef(null)

    const confirmedSegmentListFromConfirmAll = useRef([])
    const showAllSegmentsConfirmedToastRef = useRef(true)

    const taskDataRef = useRef(null)
    const recognition = useRef(null)
    
    const savedCursorPositionRef = useRef(null)
    const commentScrollingDivRef = useRef(null)
    
    const istargetSegmentOnBlurTriggeredRef = useRef(false)

    const isMovedFromLastSegmentConfirmRef = useRef(false)

    // new spell-check modal implementation states
    const [rectElement, setRectElement] = useState(null);

    const clickedMarkEleRef = useRef(null)
    const clickedWrongWordRef = useRef(null)
    const spellCheckResponseRef = useRef([])
    const pageSizeRef = useRef(null)
    const clientResponseDataRef = useRef(null)
    const previousSegmentIdRef = useRef(null)
    
    const documentDetailsRef = useRef(null)
    const termAddModalPositionRef = useRef({ x: '-50%', y: '-60%' })
    const wordChoiceListRef = useRef([])

    const defaultGlossDetailsRef = useRef(null)


    const transphraseId = transphrasePopoverOpen ? "simple-popover" : undefined;
    let userSelectionCallTimer = null;

    const [allowedMinFontSize, allowedMaxFontSize] = [12, 18];
    // filterMenuPaperclassName = classes.selectOptions;

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
            width: "50px",
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
            width: 50,
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
            setPartialPretranslate(true)
        }
    }, [location.state])


    useEffect(() => {
        if(userDetails !== null) {
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
        }
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
            setStepOptions(stepList)
        })
    }, [steps])

    useEffect(() => {
        /*Get cursor position in contenteditable - start*/
        const handleSelectionChange = (e) => {
            changeContenteditableSelection();

            if(window.getSelection()?.toString()?.trim()?.length === 0) {
                // dispatch(setShowGlossTermAddForm(false))
                // setSelectedCoordinates(null)
            }
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
                istargetSegmentOnBlurTriggeredRef.current = true
            }else{
                istargetSegmentOnBlurTriggeredRef.current = false
            }
            
            if (e.target.classList.contains("spellcheck-highlight")) {
                // handleSpellCheckWordMouseEnter(e)
                // // If it's a wrong word and hoghlight for spellcheck
                // setPopoverTarget(null); //Make the spellcheck target parent empty
                // let cursorWord = e.target.innerHTML; //Current hovering word
                // let thisWordData = spellCheckData.current.find((element) => element.word == cursorWord); // Get the hovering words spellcheck suggestions
                // setSpellCheckPopoverContent(""); // Make the spellcheck corrected words data as empty
                // setPopoverOpen(false); // Make the spellcheck popover closed
                // if (thisWordData != null)
                //     if (thisWordData["Suggested Words"] != null) {
                //         // If the word has corrected word suggestion data
                //         let suggestedWords = thisWordData["Suggested Words"];
                //         let spellCheckPopoverContent = [];
                //         /* Put the popover contents - start */
                //         suggestedWords.map((value) => {
                //             // correctWordRef.current[value] = createRef()
                //             spellCheckPopoverContent.push(
                //                 <p
                //                     key={value}
                //                     /* ref={elem => correctWordRef.current[value] = elem}*/ href="#!"
                //                     className="corrected-word"
                //                     onClick={(event) => correctWord(e, value)}
                //                 >
                //                     {value}
                //                 </p>
                //             );
                //         });
                //         /* Put the popover contents - end */
                //         if (document.getElementById(e.target.id)) {
                //             // Get the current hovering span id
                //             setSpellCheckPopoverContent(spellCheckPopoverContent); // Load the popover content
                //             setPopoverTarget(e.target.id); //Make the current hovering id as the spellcheck content target
                //             setPopoverOpen(true); // Make the spellcheck suggestions visible
                //         }
                //     }
            }
        };
        document.addEventListener("mouseover", handleMouseover, false);
        return () => {
            document.removeEventListener("mouseover", handleMouseover);
        };
    });

    useEffect(() => {
        if(enableSpellCheck && focusedDivId){
            window?.addEventListener('mousemove', getMouseMoveCoordinates)
            document?.addEventListener('click', handleWrongWordClick)
            
            return () => {
                window?.removeEventListener('mousemove', getMouseMoveCoordinates)
                document?.removeEventListener('click', handleWrongWordClick)
            }
        }
    }, [targetContentEditable.current, enableSpellCheck])

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
    }, [location.pathname, location.search]); // Wheever the url and query param changes

    useEffect(() => {
        if (didMount) {
            setTimeout(() => {
                // To wait for click the spellcheck button to disable spellcheck by default. Ref: ID1
                toggleSpellcheck();
            }, 1500);
        }
    }, [documentId]);

    useEffect(() => {
        if (didMount) {
            getDocumentProgressData();
        }
    }, [documentId, new URLSearchParams(window.location.search).get("page")]);


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
                        targetContentEditable.current[value.segment_id].current.value = targetContentEditable.current[value.segment_id].current.innerText;
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
                    // if(document.querySelector('.ks-input-suggestions')){
                    //     console.log(document.querySelectorAll('.ks-input-suggestions'))
                    //     const suggestionsArray = document.querySelectorAll('.ks-input-suggestions')
                    //     console.log(suggestionsArray)
                    //     suggestionsArray.forEach((each) => {
                    //         each.remove()
                    //     })
                    // }
                    // removeListenersFromElement(targetContentEditable.current[focusedDivIdRef.current].current, )
                    // targetContentEditable.current[focusedDivIdRef.current].current.replaceWith(targetContentEditable.current[focusedDivIdRef.current].current.clone()); // Make the currently focused contenteditable to save
                    // recreateNode(document.querySelector('#workspace'), true)
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
        setTimeout(() => {
            getSavedFontSize();
        }, 200);
    }, [targetLanguageId]);

    // useEffect(() => {
    //     const insertInputSuggestionClick = (e) => {
    //         // To insert the clicked text from IME suggestions
    //         if (e.target.classList.contains("suggestion-div")) {
    //             changeSavedCaretPosition();
    //             let text = "" + e.target.innerText;
    //             // console.log(text)
    //             document.execCommand("insertText", false, text);
    //         }
    //     };
    //     document.addEventListener("click", insertInputSuggestionClick, false); // Also can merge this with the previous click eventListener
    //     return () => {
    //         document.removeEventListener("click", insertInputSuggestionClick);
    //     };
    // });

    useEffect(() => {
        if (isDocumentOpenerVendorRef.current) {
            if (isWorkspaceEditable) {
                let { segments_confirmed_count, total_segment_count } = documentProgressRef.current
                // console.log(isUserIsReviwer)
                // console.log(documentProgressRef.current)
                if (!isUserIsReviwer ? (segments_confirmed_count === total_segment_count) : isEditorSubmittedDocument.current) {
                    console.log("editor submnit: "+isEditorSubmittedDocument.current)
                    if(isEditorSubmittedDocument.current){
                        setShowDocumentSubmitButton(false)
                    }else{
                        setShowDocumentSubmitButton(true)
                    }
                } else {
                    setShowDocumentSubmitButton(false)
                }
            } else {
                setShowDocumentSubmitButton(false)
            }
        } else if (taskDataRef.current) {
            // if post-editing (step-1) is not available but reviewing step is present then the project admin will act as editor the should submit the document 
            // check if step 1 is not preset and task_assign_info length is 1
            if (taskDataRef.current?.task_assign_info?.find(each => each.task_assign_detail.step !== 1) && taskDataRef.current?.task_assign_info?.length === 1) {
                let { segments_confirmed_count, total_segment_count } = documentProgressRef.current
                if (segments_confirmed_count === total_segment_count) {
                    setShowDocumentSubmitButton(true)
                } else {
                    setShowDocumentSubmitButton(false)
                }
            }
        }
    }, [isWorkspaceEditable, documentProgressRef.current, isDocumentOpenerVendorRef.current, isUserIsReviwer, isEditorSubmittedDocument.current, taskDataRef.current])

    useEffect(() => {
        if (!isWorkspaceEditableRef.current) {
            setShowDontHaveEditingAccessAlertModal(true)
        }
    }, [isWorkspaceEditableRef.current])


    // ============= Voice option selection logic starts =============

    useEffect(() => {
        // console.log(isTranslatedAudioFileAvailable)
        const localeCount = isTranslatedAudioFileAvailable?.reduce((a, { locale }) => (
            Object.assign(a, { [locale]: (a[locale] || 0) + 1 })
        ), {})
        const genderCount = isTranslatedAudioFileAvailable?.reduce((a, { gender }) => (
            Object.assign(a, { [gender]: (a[gender] || 0) + 1 })
        ), {})

        let gender_options = []
        if (genderCount !== null && genderCount !== undefined) {
            Object?.keys(genderCount)?.map((each, index) => {
                gender_options.push({
                    value: index,
                    label: each.charAt(0) + each?.slice(1).toLowerCase()
                })
            })
        }

        let locale_options = []
        if (localeCount !== null && localeCount !== undefined) {
            Object?.keys(localeCount)?.map((each, index) => {
                locale_options.push({
                    value: index,
                    label: each
                })
            })
        }

        setLocaleOptions(locale_options)
        setGenderOptions(gender_options)
    }, [isTranslatedAudioFileAvailable])

    const handleLocaleChange = (selected) => {
        setAudioLocale(selected)
    }

    const handleGenderChange = (selected) => {
        setAudioGender(selected)
    }

    useEffect(() => {
        if (localeOptions?.length === 1) {
            setAudioLocale(localeOptions[0])
        }
        if (genderOptions?.length === 1) {
            setAudioGender(genderOptions[0])
        }
    }, [localeOptions, genderOptions])

    useEffect(() => {
        if (audioLocale !== null) {
            let filteredLocale = isTranslatedAudioFileAvailable?.filter(each => audioLocale.label.toUpperCase() == each.locale.toUpperCase())
            // console.log(filteredLocale)
            const filteredGender = filteredLocale?.reduce((a, { gender }) => (
                Object.assign(a, { [gender]: (a[gender] || 0) + 1 })
            ), {})

            let filteredGenderOption = []
            if (filteredGender !== null && filteredGender !== undefined) {
                Object?.keys(filteredGender)?.map((each, index) => {
                    filteredGenderOption.push({
                        value: index,
                        label: each.charAt(0) + each?.slice(1).toLowerCase()
                    })
                })
            }
            setGenderOptions(filteredGenderOption)
        }
    }, [audioLocale])

    useEffect(() => {
        if (audioLocale !== null && audioGender !== null) {
            let filteredRes = isTranslatedAudioFileAvailable?.filter(each => audioLocale?.label == each?.locale && audioGender?.label.toUpperCase() == each?.gender.toUpperCase())
            // console.log(filteredRes)
            const filteredVoiceType = filteredRes?.reduce((a, item) => (
                Object.assign(a, { [item?.voice_type]: item })
            ), {})
            // console.log(filteredVoiceType)

            // set voice-type as Neural(1st priority) then Standard(2nd priority) and then Wavenet(3rd priority)
            // if(filteredVoiceType?.Neural2 !== undefined){
            //     setVoiceType(filteredVoiceType?.Neural2?.voice_name)
            // }else 
            if (filteredVoiceType?.Wavenet !== undefined) {
                setVoiceType(filteredVoiceType?.Wavenet?.voice_name)
            } else if (filteredVoiceType?.Standard !== undefined) {
                setVoiceType(filteredVoiceType?.Standard?.voice_name)
            }
        }
    }, [audioLocale, audioGender])


    // ============= Voice option selection logic ends =============


    useEffect(() => {
        findTriggerCount.current = 0; // Initial find and replace trigger
        //Don't update if it comes from update segment with id function
        if (didMount) {
            if (lastCalledArgs.current.functionName == "pageSelect" || lastCalledArgs.current.functionName == "filter") {
                // If the state set from one of these functions
                paginationContentFunction(lastCalledArgs.current.page);
                createTargetContentEditableRefs();
                updateSegmentStatus();
                /*Trigger focus on the first segment - start*/
                // if (!creditAlertTxt?.length) {
                setTimeout(() => {
                    //targetContentEditable Ref's assigned
                    // console.log(targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current);
                    if (targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current !== null) {
                        
                        // focus the first segment if moved by confirming the last segment manually  
                        if(isMovedFromLastSegmentConfirmRef.current){
                            targetContentEditable.current[translatedResponse[0]?.segment_id]?.current?.focus();
                            isMovedFromLastSegmentConfirmRef.current = false
                        }
                        if (Cookies.get('isProductTourSeen') == undefined) {
                            if (isWorkspaceEditable) {
                                targetContentEditable.current[translatedResponse[0]?.segment_id]?.current?.focus();
                            }
                        }
                        // didMountRef.current = false
                    }

                    // if (targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current != null){
                    //     let a = document.getElementsByClassName('workspace-editor')[0];
                    //     console.log(a);
                    //     a.scroll({
                    //         top: 0,
                    //         behavior: 'smooth'
                    //       });
                    //     targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current.scrollTo({top: 0, behavior: 'smooth'});
                    //     if(findTerm === ""){
                    //         console.log(isRestoredRef.current);
                    //         console.log(isMergedRef.current);
                    //         console.log(isSplitRef.current);
                    //         if(isMergedRef.current || isRestoredRef.current || isSplitRef.current){
                    // //         //     // if(isMergedRef.current || isRestoredRef.current){
                    // //         //     //     console.log(mergedSegmentIDsRef.current);
                    // //         //     //     console.log(mergedSegmentIDsRef.current?.sort()[0]);
                    // //         //     //     console.log(isRestoredRef.current);
                    // //         //     //     targetContentEditable.current[translatedResponse[0].segment_id].current.focus();
                    // //         //     //     targetContentEditable.current[translatedResponse.find(each => each.segment_id === mergedSegmentIDsRef.current?.sort()[0]).segment_id].current.focus();
                    // //         //     // }
                    // //         //     // mergedSegmentIDsRef.current = null
                    // //             if(translatedResponse !== null){
                    //                 isMergedRef.current = false
                    //                 isRestoredRef.current = false
                    //                 isSplitRef.current = false
                    // //             }
                    //         }else{
                    //             targetContentEditable.current[translatedResponse[0].segment_id].current.focus();
                    //         }
                    //     }
                    // }
                }, 50);
                // }
                /*Trigger focus on the first segment - end*/
            }
        }

    }, [translatedResponse, allSegmentStatusState]);


    useEffect(() => {
        if (didMount) {
            // spellCheck();
            // reset the paraphrase states when segment focus is changed
            setparaphraseTrigger(false)
            setParaPhraseResList([])
            setQaData([])
            // setSegmentDifference([])
            setQaContent([])
            setQaCountShow(false)
            setTranslationMatches([])
            setTbxData([])
            setSelectedParaphrase(null)

            if(document.querySelector('.MuiTooltip-popper')){
                let tooltips = document.querySelectorAll('.MuiTooltip-popper')
                // console.log(tooltips)
                tooltips?.forEach(each => {
                    each.style.visibility = 'hidden'
                })
            }
            errorNoteCount.current = 0
        }
        if(focusedDivId !== ""){
            try{
                let activeFooterTab = document.querySelector('.nav-link.active')
                if(activeFooterTab){
                    activeFooterTab.classList.remove('active')
                }
            }catch(e) {
                console.log(e)
            }
            setIsSegmentDataLoading(true)
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
                mark.id = `synonym-${randomNum}`
                mark.style.setProperty('background-color', 'transparent', 'important');
                mark.appendChild(selectedText);
                mark.contentEditable = "true"
                selection.insertNode(mark);
                setSynonymPopoverTarget("synonym-" + randomNum)
            }
        }

        if (enableIME && imeTextObject.length) {
            var selection = window.getSelection().getRangeAt(0);

            if (window.getSelection().toString().length && imeTextObjectTarget.length != "") {
                let childMark = document?.getElementById(imeTextObjectTarget)
                if (childMark) {
                    childMark.style.setProperty('background-color', 'transparent', 'important');
                    childMark.style.setProperty('color', '#3C4043', 'important');
                }
                // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark")

            }
            // removeSpecificTag()

            if (window.getSelection().toString().length && window.getSelection().toString().trim() != "") {

                var selectedText = selection.extractContents();
                let randomNum = Math.floor(Math.random() * 1000)
                var mark = document.createElement("mark");
                mark.id = `ime-${randomNum}`
                mark.style.setProperty('background-color', '#3390ff', 'important');
                mark.style.setProperty('color', '#ffffff', 'important');
                mark.appendChild(selectedText);
                mark.contentEditable = "true"
                selection.insertNode(mark);
                setTextImeObjectTarget("ime-" + randomNum)
                imeTextObjectTargetRef.current = "ime-" + randomNum
            }
        }
    }, [synonymText, imeTextObject])

    useEffect(() => {
        if (synonymPopoverTarget !== "") {
            setSynonymPopoverOpen(true)
            if (enableSynonym) {
                setSynonymsResList([])
                if (synonymText.trim().length !== "") {
                    fetchSynonym()
                }
            }
        }
    }, [synonymPopoverTarget])

    useEffect(() => {
        if (synonymsResList.length !== 0) {
            document.addEventListener('mousedown', outsideClickHandler)
            document.addEventListener('keyup', outsideClickHandler)
        }
        return () => {
            document.removeEventListener('mousedown', outsideClickHandler);
            document.removeEventListener('keyup', outsideClickHandler);
        }
    }, [synonymsResList])

    useEffect(() => {
        // console.log(isWordsCorrected)
        if (targetLanguage === "English") {
            if (isWordsCorrected === true && enableSpellCheck === true) {
                // console.log('grammar check')
                // console.log(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML.length)
                // console.log(targetContentEditable.current[focusedDivIdRef.current].current.textContent.length)
                if (targetContentEditable.current[focusedDivIdRef.current].current.textContent.length !== 0 ||
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML.length !== 0) {
                    // grammarCheck()
                }
            }
        }
    }, [isWordsCorrected, isWordsCorrectedTrigger])


    // close the popover and remove the mark tag when clicked outside of the popover
    // useEffect(() => {
    //     // console.log('sarvesh')
    //     if (grammarCheckPopoverTarget !== "") {
    //         document.addEventListener('click', (e) => {
    //             // console.log(e.target)
    //             let popoverDiv = document.getElementsByClassName('popover')[0]
    //             // console.log(popoverDiv)
    //             if (!e.target.classList.contains('popover') && popoverDiv) {
    //                 // setParaphraseText("")
    //                 setGrammarPopoverOpen(false);
    //                 setgrammarCheckPopoverTarget("");
    //                 setGrammarCheckResponse([]);
    //                 // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
    //                 //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
    //                 //     "mark"
    //                 // );
    //                 // updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
    //                 // updateSegmentStatus(focusedDivIdRef.current, 103);
    //                 // changeEditedStatus(focusedDivIdRef.current, "unsaved");
    //             }
    //         })

    //     }
    // }, [grammarCheckPopoverTarget])


    useEffect(() => {
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        setGrammarCheckSuggestedSentence([])

        grammarCheckResponse?.map((value, index) => {
            // console.log('sarvesh '+index)
            // changeSavedCaretPosition()
            if (index === 0) {
                if (value.edit.length !== 0 && value?.sentence !== " ") {
                    var selectedTextStartIndex = targetContentEditable.current[focusedDivIdRef.current].current?.textContent.indexOf(value.sentence)
                    // console.log(selectedTextStartIndex)

                    let randomNum = Math.floor(Math.random() * 1000)
                    var mark = document.createElement("mark");
                    let txt = document.createTextNode(value.sentence)
                    mark.id = `grammar-check-${randomNum}`
                    mark.classList.add('grammarcheck-highlight')
                    // mark.style.setProperty('background-color', 'transper', 'important');
                    mark.appendChild(txt);


                    mark.contentEditable = "true"
                    // console.log(mark)
                    let finalTxt = targetContentEditable.current[focusedDivIdRef.current].current.innerHTML.replace(value.sentence, mark.outerHTML)
                    // console.log(finalTxt)
                    // console.log(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML)
                    var doc = new DOMParser().parseFromString(finalTxt, "text/html");
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = doc.body.innerHTML.replaceAll("&nbsp;", " ");
                    // const selection = window.getSelection();
                    // const range = document.createRange();
                    // selection.removeAllRanges();
                    // range.selectNodeContents(targetContentEditable.current[focusedDivIdRef.current].current);
                    // range.collapse(false);
                    // selection.addRange(range);
                    // targetContentEditable.current[focusedDivIdRef.current].current.focus();
                    setgrammarCheckPopoverTarget("grammar-check-" + randomNum)
                    // let grammarList = []
                    // grammarList.push(
                    //     <p
                    //         key={value.corrected_sentence}
                    //         className="corrected-word"
                    //         onClick={(event) => replaceWithCorrectGrammarSentence(event, value.corrected_sentence)}
                    //         >
                    //         {value.corrected_sentence}
                    //     </p>
                    // );
                    // setGrammarCheckSuggestedSentence(grammarList)
                }
            }
        })
    }, [grammarCheckResponse])


    useEffect(() => {
        grammarCheckResponse.map((value, index) => {
            if (index === 0) {
                let grammarList = []
                grammarList.push(
                    <p
                        key={value.corrected_sentence}
                        className="corrected-word"
                        onClick={(event, grammarCheckPopoverTarget) => replaceWithCorrectGrammarSentence(event, value.corrected_sentence, grammarCheckPopoverTarget)}
                    >
                        {value.corrected_sentence}
                    </p>
                );
                setGrammarCheckSuggestedSentence(grammarList)
            }
        })
    }, [grammarCheckPopoverTarget])


    // useEffect(() => {
    //     const handleMouseOverGrammar = (e) => {
    //         if (e.target.classList.contains('grammarcheck-highlight')) {
    //             // console.log(e.target)
    //             if (grammarPopoverOpen === false) {
    //                 setGrammarPopoverOpen(true)
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
            if (location.state?.findHighlightSegment != null) {
                findHighlightSegment.current = location.state.findHighlightSegment;
                window.history.replaceState(null, "");
                // filterWithFindTerm()
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
            } else if (location.state?.highlightFirstFindTerm === true) {
                setTimeout(() => {
                    findNext();
                }, 400);
            }
            paginationContentFunction(lastCalledArgs.current.page);
        }
    }, [totalPages, currentPage]);


    useEffect(() => {
        // console.log('from page');
        let pageParam = URL_SEARCH_PARAMS.get("page")
        let statusParam = URL_SEARCH_PARAMS.get("status")
        if (documentId !== 0) {
            if (statusParam == null || statusParam == undefined) {
                if (pageParam !== null && pageParam !== undefined) {
                    if (pageSizeFromApi.current !== null) {
                        listSegments()
                    }
                }
            } else {
                segmentStatusFilter()
            }
        }
    }, [URL_SEARCH_PARAMS.get("page"), documentId, pageSizeFromApi.current]);


    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        let statusParam = URL_SEARCH_PARAMS.get("status")
        let pageParam = URL_SEARCH_PARAMS.get("page")
        if (documentId && segmentStatusOptionsRef.current !== null) {
            // console.log('document '+ documentId)
            if (statusParam !== null && statusParam !== undefined) {
                setFindStatus(statusParam)
                // console.log(segmentStatusOptionsRef.current?.filter(o1 => statusParam.split(',').some(o2 => o1.value === o2)))
                setSegmentStatusName(segmentStatusOptionsRef.current?.filter(status => statusParam.split(',').some(each => status.value === each)))
                segmentStatusFilter()
                didMountRef.current = false
            } else {
                // console.log('from-status else')
                // console.log('empty status');
                if (!didMountRef.current) {
                    listSegments()
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
            showFindReplaceRef.current.classList.remove("toolbar-list-icons-active");
            if (showFindReplace) showFindReplaceRef.current.classList.add("toolbar-list-icons-active");
        }
    }, [showFindReplace]);

    /* Make the special characters icon active when select that */
    useEffect(() => {
        if (didMount) {
            showSpecialCharactersRef.current.classList.remove("toolbar-list-icons-active");
            if (showSpecialCharacters) showSpecialCharactersRef.current.classList.add("toolbar-list-icons-active");
        }
    }, [showSpecialCharacters]);

    /* Make the size selection icon active when select that */
    useEffect(() => {
        if (didMount) {
            showFormatSizeRef.current.classList.remove("toolbar-list-icons-active");
            if (showFormatSize) showFormatSizeRef.current.classList.add("toolbar-list-icons-active");
        }
    }, [showFormatSize]);

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
                // console.log(cache);
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
        // console.log(cacheList);
        // console.log(tempParagraphSegmentsList);
    }, [segmentation]);

    useEffect(() => {
        filterWithFindTerm();
    }, [findArea]);


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
                let url = `/workspace/${documentId}?page=1`
                // if (pageParam != 0 && pageParam != null) url += `?page=1`;
                if (findStatus?.length !== 0) {
                    history(url + "&status=" + findStatus.toString());
                } else {
                    history(url);
                }
                // console.log(findStatus);
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
                setQaCountShow(false)
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
                    // sourceTextDiv.current[lastCalledArgs.current.segmentId].current.innerHTML = replaceTextWithTags(lastCalledArgs.current.sourceText, 'mark')
                    // targetContentEditable.current[lastCalledArgs.current.segmentId].current.innerHTML = replaceTextWithTags(lastCalledArgs.current.translatedText, 'mark')
                    updateTranslatedResponseSegment(lastCalledArgs.current.segmentId, "original", lastCalledArgs.current.sourceText, "mark");
                    updateTranslatedResponseSegment(lastCalledArgs.current.segmentId, "temp_target", lastCalledArgs.current.translatedText, "mark");
                }
            }, 100);
        }
    }, [qaData]);


    useEffect(() => {
        if (selectedPageSize) {
            let pageParam = URL_SEARCH_PARAMS.get("page")
            let statusParam = URL_SEARCH_PARAMS.get("status")
            if (statusParam == null || statusParam == undefined) {
                if (pageSizeFromApi.current != selectedPageSize?.value) {
                    saveCustomPageSize(selectedPageSize?.value)
                    let url = `/workspace/${documentId}?page=${1}`
                    let pageParam = URL_SEARCH_PARAMS.get("page");
                    if (pageParam != 1) {
                        // console.log(pageParam)
                        history(url);
                    } else {
                        listSegments('page-size-change')
                    }
                }
                listSegments()
            } else {
                segmentStatusFilter()
            }
        }
    }, [selectedPageSize])

    /* Cookie based tour show */
    useEffect(() => {
        if (didMount) {
            if (!isProductTourSeen && targetContentEditable?.current[translatedResponse[0]?.segment_id]?.current)
                targetContentEditable.current[translatedResponse[0]?.segment_id].current.focus();
        }
    }, [isProductTourSeen]);

    useEffect(() => {
        if(spellCheckResponseRef.current?.length !== 0){
            highlightSpellCheckWords(focusedDivId)
        }
    }, [spellCheckResponseRef.current])
    

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.classList.contains("suggestion-input")) {
                //If clicking on the IME suggested input
                removeIMESuggestion();
                // return
            }
            if (
                !hasParentClass(e.target, "workspace-features") &&
                !hasParentClass(e.target, "workspace-textarea") &&
                !e.target.classList.contains("suggestion-div")
            ) {
                // Not inside the workspace area or IME suggestion div
                // handleToggleVisibility(false)
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
                setPopoverOpen(false)
                setPopoverTarget(null);
                setSpellCheckPopoverContent("");
            }
        };
        document?.addEventListener("click", handleClick, false);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    // function to calculate the scroll y position of the scrolling editor, 
    // used to place the modal at the specified position
    useEffect(() => {
        const workspaceEditor = document.querySelector('.workspace-editor');
        const handleScroll = (e) => {
            if (workspaceEditor) {
                const { scrollTop, scrollHeight, clientHeight } = workspaceEditor;
                termAddModalPositionRef.current = {
                    ...termAddModalPositionRef.current,
                    y: (scrollTop - 268)
                }

                let selection = window.getSelection();
                if(selection?.toString()?.trim()?.length === 0) {
                    if(selectedCoordinates !== null) {
                        dispatch(setShowGlossTermAddForm(false))
                        setSelectedCoordinates(null)
                    }
                    return
                }
                
                if(!isDinamalar){
                    let range = selection.getRangeAt(0);
                    let selectionRect = range.getBoundingClientRect();
                    setSelectedCoordinates(selectionRect)
                }
            }
        }
    
        workspaceEditor?.addEventListener('scroll', handleScroll);
        return () => {
            workspaceEditor?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (mergeSelectedSegmentIds?.length !== 0) {
            let txt_unit = translatedResponse?.find(each => each.segment_id == mergeSelectedSegmentIds[0])?.text_unit
            let sameTxtUnitSeg = translatedResponse?.filter(each => each.text_unit == txt_unit)
            // console.log(sameTxtUnitSeg)
            let newArr = translatedResponse?.map(obj => {
                if (obj.segment_id == sameTxtUnitSeg?.find(each => each.segment_id == obj.segment_id)?.segment_id) {
                    return {
                        ...obj,
                        sameTxtUnit: true
                    }
                }
                return obj;
            })
            // console.log(newArr)
            setTranslatedResponse(newArr)
        } else {
            let newArr = translatedResponse?.map(obj => {
                return {
                    ...obj,
                    sameTxtUnit: false
                }
            })
            // console.log(newArr)
            setTranslatedResponse(newArr)
        }
    }, [mergeSelectedSegmentIds, translatedResponseRef.current])


    // get the list of wordchoices based on the task_id
    useEffect(() => {
        if(documentTaskIdRef.current !== null){
            // getWordChoiceListForDocument()
        }
    }, [documentTaskIdRef.current])
    
    // reset the target if source text is selected
    useEffect(() => {
        if(sourceSelectionText !== "" && !showGlossaryAddition){
            setTargetSelectionText("")
        }
    }, [sourceSelectionText])

    // reset the source if target text is selected
    useEffect(() => {
        if(targetSelectionText !== "" && !showGlossaryAddition){
            setSourceSelectionText("")
        }
    }, [targetSelectionText])    

    // Handle footer pin
    const handlePushPinActive = (show = false) => {
        setPushPinActive(show)
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

    // Handle paste on target segment - only plain text is accepted
    const handlePasteOnWorkArea = (e) => {
        // console.log(e.target)   
        e.preventDefault();
        var text = "";
        if (e.clipboardData && e.clipboardData.getData) {
          text = e.clipboardData.getData("text/plain");
        } else if (window.clipboardData && window.clipboardData.getData) {
          text = window.clipboardData.getData("Text");
        }
        document.execCommand("insertHTML", false, text);
    } 


        /* Class name for top div based on toolbar and find and replace visibility - start*/
        let workspaceAreaClassName = "";
        if (advancedOptionVisibility) workspaceAreaClassName = "workspace-editor-new-bottom-height";
        if (!advancedOptionVisibility) workspaceAreaClassName = "";
        if (showFindReplace) workspaceAreaClassName = "workspace-editor-show-tm-add-top";
        if (showFindReplace && advancedOptionVisibility) workspaceAreaClassName = "workspace-editor-show-tm-comments-add-top";
        if (!showFindReplace && !advancedOptionVisibility) workspaceAreaClassName = "";
        /* Class name for top div based on advancedOption and find and replace visibility - start*/
        /* let toolbarClassName = ''
        if (showTmSection)
            toolbarClassName = 'toolbar-parts-padd-top-remove'
        if (!showTmSection)
            toolbarClassName = 'toolbar-parts-padd-top-add toolbar-parts-padd-new-height'
        if (showToolbarSection && showTmSection)
            toolbarClassName = 'toolbar-parts-padd-both-show' */
    
    

    // Handle keyboard key press on target segment
    const handleKeyDown = (e) => {
        
        if(imeOn) handeIMEKeyDownDiv(e)

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
        if(e.key === "Enter"){
            e.preventDefault()
        }
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
            savedCursorPositionRef.current = saveCursorPositionWithinContenteditable()
        }
    };

    /* Insert the selected / active tag in the cursor position -start */
    const insertSelectedTag = () => {
        let selectedTag = document.querySelector(".selected-tag");
        if (selectedTag) {
            // changeSavedCaretPosition()
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
        let currentSegPosition = translatedResponseRef.current?.findIndex(each => each.segment_id == currentDivId)
        let segmentAfterCurrentSeg = translatedResponseRef.current?.slice(currentSegPosition)?.filter(each => [101, 103, 105, 109].includes(each.status))

        if(segmentAfterCurrentSeg?.length !== 0)
            return segmentAfterCurrentSeg[0]
        else 
            return null

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
        // console.log(focusedDivIdRef.current);
        if (focusedDivIdRef.current != null) {
            saveBtn.current[focusedDivIdRef.current].current?.click();
            setTimeout(() => {
                // console.log(saveBtn.current[focusedDivIdRef.current].current);
                let nextSegmentUnsavedId = getUnsavedSegmentData(focusedDivIdRef.current)?.segment_id;
                // console.log(nextSegmentUnsavedId);
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
            // console.log(e)
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
            // console.log(e)
        }
    }
    // ==========================================================================================

    /* Get the docuement details by document id */
    const getDocumentDetailsById = (documentIdTemp) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/document_by_doc_id/${documentIdTemp}${(userDetails?.agency && location.state?.open_as !== undefined) ? `?step_id=${location.state?.open_as === 'editor' ? 1 : 2}` : ''}`,
            auth: true,
            success: (docResponse) => {
                let responseTemp = docResponse.data;
                documentDetailsRef.current = docResponse.data
                // console.log(responseTemp)
                if (responseTemp.doc_credit_check_open_alert) {
                    setShowCreditAlert(true);
                    setShowCreditAlertRedirection(false);
                }
                docCreditCheckAlertRef.current = responseTemp.doc_credit_check_open_alert
                isAssignEnableRef.current = responseTemp.assign_enable
                setIsAssignEnable(responseTemp.assign_enable)
                if (!responseTemp.assign_enable) {
                    setCreditAlertTxt(t("insufficient_credit_contact"))
                }

                documentTaskIdRef.current = responseTemp.task_id
                setAudioFileAlreadyExist(responseTemp.converted_audio_file_exists)
                setTotalCharCount(responseTemp.total_char_count)
                setSourceLanguage(responseTemp.source_language);
                setSourceLanguageId(responseTemp.source_language_id);
                setTargetLanguage(responseTemp.target_language);
                setTargetLanguageId(responseTemp.target_language_id);
                setFileName(responseTemp.filename);
                setIsTranslatedAudioFileAvailable(responseTemp?.download_audio_output_file?.length ? responseTemp?.download_audio_output_file : null)
                setSourceLanguageCode(responseTemp.source_language_code);
                setTargetLanguageCode(responseTemp.target_language_code);
                setTargetLanguageScript(responseTemp.target_language_script);
                setUpdatedFileDownload(responseTemp?.updated_download === "enable" ? true : false)
                setEnableFileDownload(responseTemp?.download === "enable" ? true : false);
                setMtEnable(responseTemp?.mt_enable)
                setTaskAssignUserDetails(responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id)?.step_id)

                getDefaultGlossDetails()

                if(userDetails?.enterprise_name !== "Enterprise - DIN"){
                    // edit_allowed key will restrict the workspace editing access
                    setIsWorkspaceEditable(responseTemp.edit_allowed)
                    isWorkspaceEditableRef.current = responseTemp.edit_allowed
                    if (responseTemp.edit_allowed) isEditorSubmittedDocument.current = false
                    else isEditorSubmittedDocument.current = true
                    
                }


                // go back to the previous page and keep open the project collapse
                if (location.state?.prevPath) {
                    let [pathname, search] = location.state.prevPath?.split("?")
                    const URL_SEARCH_PARAMS = new URLSearchParams(`?${search}`);
                    URL_SEARCH_PARAMS.set('open-project', responseTemp.project)
                    prevPathRef.current = pathname + '?' + URL_SEARCH_PARAMS.toString()
                }

               
                // console.log("editor submnit: "+isEditorSubmittedDocument.current)


                // console.log(location.state?.open_as);

                let is_user_reviewer = false
                let is_reviewer = false
                // console.log(responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id && location.state?.open_as === 'reviewer'));

                if (userDetails.agency) {
                    is_reviewer = responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id && location.state?.open_as === 'reviewer')?.step_id === 2
                    setIsUserIsReviwer(is_reviewer)
                    is_user_reviewer = is_reviewer
                } else {
                    is_reviewer = responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id)?.step_id === 2
                    setIsUserIsReviwer(is_reviewer)
                    is_user_reviewer = is_reviewer
                }

                let is_from_reviewer = responseTemp?.assign_detail.filter(each => each.assign_to_id === Config?.userState.id && each.step_id === 2 && location.state?.open_as === 'reviewer')?.length !== 0 ? true : false

                if (location.state?.open_as !== undefined) {
                    if (location.state?.open_as !== 'editor') {
                        setIsUserIsReviwer(is_from_reviewer)
                        is_user_reviewer = is_from_reviewer
                    }
                }

                Config.axios({
                    url: `${Config.BASE_URL}/workspace/vendor/dashboard/${responseTemp.project}/`,
                    auth: true,
                    success: (response) => {

                        documentSubmitStepRef.current = (is_reviewer || is_from_reviewer) ? 2 : 1
                        // console.log(response.data?.find(each => each.id === responseTemp.task_id));
                        let task_data = response.data?.find(each => each.id === responseTemp.task_id)
                        // console.log(task_data);
                        taskDataRef.current = task_data
                        
                        if(userDetails?.enterprise_name === "Enterprise - DIN") {

                            try{
                                let assign_info = task_data?.task_assign_info?.find(each => each.task_assign_detail?.step == 1)
                                let assign_by_data = assign_info?.assigned_by_details
                                let assign_to_data = assign_info?.assign_to_details
                                
                                // console.log("Assign info")
                                // console.log(assign_info)
                                // console.log("Assign by");
                                // console.log(assign_by_data);
                                // console.log("Assign to");
                                // console.log(assign_to_data);
                                
                                // console.log(assign_info?.task_assign_detail?.client_response)
                                if(assign_info?.task_assign_detail?.client_response === "Approved"){
                                    setIsWorkspaceEditable(responseTemp.edit_allowed)
                                    isWorkspaceEditableRef.current = responseTemp.edit_allowed
                                }

                                if(userDetails?.pk !== assign_to_data?.id && assign_info?.task_assign_detail?.task_status === 'Completed'){
                                    clientResponseDataRef.current = {
                                        step: 1,
                                        task_id: task_data.id,
                                        reassign: false,
                                        assign_info
                                    }
                                    if(assign_info?.task_assign_detail?.task_status === "Completed"){
                                        setShowTaskAssignActionBtn(true)
                                    } 
                                }

                                if (assign_info?.task_assign_detail?.task_status === "Completed") isEditorSubmittedDocument.current = true
                                else isEditorSubmittedDocument.current = false
                                
                            }catch(e){
                                console.log(e)
                            }
                        }


                        // logged in user is an agency and this task is assigned to LSP(not his own project) (LSP(reassign) -> vendor)
                        if (userDetails?.agency && !isAssignEnableRef.current) {
                            // the task whether reassigned or not, the LSP needs to work/see work and submit the document
                            isDocumentOpenerVendorRef.current = true
                            isTaskReassignedRef.current = typeof task_data.task_reassign_info === 'boolean' ? true : false

                            if (task_data?.task_reassign_info === null) {
                                console.log('return 1')
                                setShowReturnRequestBtn(true)
                                // setIsWorkspaceEditable(true)
                            }

                            // task_reassign_into
                            let assign_to_data = task_data?.task_reassign_info?.find(each => ((each?.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))
                            let assign_by_data = task_data?.task_reassign_info?.find(each => ((each?.assigned_by_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))

                            // console.log("Assign by");
                            // console.log(assign_by_data);
                            // console.log("Assign to");
                            // console.log(assign_to_data);

                            // task is assigned by me (view -> when task owner/admin sees)
                            if (assign_by_data?.assigned_by_details?.id === userDetails.pk) {
                                // console.log('owner view');
                                if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    // setIsWorkspaceEditable(true)
                                    isDocumentSubmittedRef.current = true
                                } else {
                                    // setIsWorkspaceEditable(false)
                                }
                            }

                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (assign_to_data?.assign_to_details?.id === userDetails.pk) {
                                // console.log('vendor view');
                                if (assign_to_data?.task_assign_detail.task_status !== "Return Request" && assign_to_data?.task_assign_detail.task_status !== "Completed") {
                                    // console.log('return 2')
                                    setShowReturnRequestBtn(true)
                                }
                                else setShowReturnRequestBtn(false)

                                if (assign_to_data?.task_assign_detail.task_status === "Yet to start" || assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    // setIsWorkspaceEditable(true)
                                } else {
                                    // setIsWorkspaceEditable(false)
                                    isDocumentSubmittedRef.current = true
                                }
                            }

                            // task_assign_info

                            // console.log(is_reviewer);
                            // console.log(location.state?.open_as);
                            // console.log(is_from_reviewer);

                            let task_assign_assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))
                            let task_assign_assign_by_data = task_data?.task_assign_info?.find(each => ((each?.assigned_by_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))

                            // console.log('assign_info_ assign_to');
                            // console.log(task_assign_assign_to_data);

                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (task_assign_assign_to_data?.assign_to_details?.id === userDetails.pk) {
                                isDocumentOpenerVendorRef.current = true

                                if (task_assign_assign_to_data?.task_assign_detail.task_status !== "Return Request" && task_assign_assign_to_data?.task_assign_detail.task_status !== "Completed" && task_data.task_reassign_info === null) {
                                    console.log('return 3')
                                    setShowReturnRequestBtn(true)
                                } else if (task_assign_assign_to_data?.task_assign_detail.task_status !== "Return Request" && task_assign_assign_to_data?.task_assign_detail.task_status !== "Completed" && assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    console.log('return 4')
                                    setShowReturnRequestBtn(true)
                                } else setShowReturnRequestBtn(false)


                                if (task_assign_assign_to_data?.task_assign_detail.task_status === "Yet to start" || task_assign_assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                        // setIsWorkspaceEditable(true)
                                        isDocumentSubmittedRef.current = false
                                    } else {
                                        // setIsWorkspaceEditable(false)
                                        isDocumentSubmittedRef.current = true
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false)
                                    isDocumentSubmittedRef.current = true
                                    // console.log('submitted');
                                }

                                if (task_assign_assign_to_data?.task_assign_detail.task_status === "Completed") {
                                    documentRestrictionReasonRef.current = 'completed'
                                } else if (task_assign_assign_to_data?.task_assign_detail.task_status === "Return Request") {
                                    documentRestrictionReasonRef.current = 'returned'
                                }

                            }


                        } else {  // logged in user can be agency or non-agency and its their own project (customer(agency/non-agency) -> vendor)
                            // if(task_data?.task_assign_info === null) setIsWorkspaceEditable(true) 

                            let assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))
                            let assign_by_data = task_data?.task_assign_info?.find(each => ((each?.assigned_by_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))

                            // console.log('all assign info');
                            // console.log(task_data?.task_assign_info);
                            // console.log(task_data?.task_assign_info?.filter(each => each?.task_assign_detail.task_status === 'Completed' || each?.task_assign_detail.task_status === 'Return Request'));

                            // console.log("Assign by");
                            // console.log(assign_by_data);
                            // console.log("Assign to");
                            // console.log(assign_to_data);


                            // only 3rd level assigned vendor has reassigned true 
                            isTaskReassignedRef.current = typeof task_data.task_reassign_info === 'boolean' ? true : false

                            // task is assigned by me (view -> when task owner/admin sees)
                            if (assign_by_data?.assigned_by_details?.id === userDetails.pk) {
                                if (assign_by_data?.task_assign_detail.task_status === "Completed" || assign_by_data?.task_assign_detail.task_status === "Return Request") {
                                    // console.log('owner view');
                                    if (task_data?.task_assign_info?.filter(each => each?.task_assign_detail.task_status === 'Completed' || each?.task_assign_detail.task_status === 'Return Request')?.length === task_data?.task_assign_info?.length) {
                                        // setIsWorkspaceEditable(true)
                                    } else {
                                        // setIsWorkspaceEditable(false)
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false)
                                }
                            }

                            // task is assigned to someone (view -> when editor/reviewer sees)
                            // don't show the submit button when work is not started and when work is completed
                            if (assign_to_data?.assign_to_details?.id === userDetails.pk) {
                                isDocumentOpenerVendorRef.current = true
                                // console.log('vendor view');
                                if (assign_to_data?.task_assign_detail.task_status !== "Return Request" && assign_to_data?.task_assign_detail.task_status !== "Completed") {
                                    console.log('return 5')
                                    setShowReturnRequestBtn(true)
                                }
                                else setShowReturnRequestBtn(false)

                                if (assign_to_data?.task_assign_detail.task_status === "In Progress") {
                                    // setIsWorkspaceEditable(true)
                                    // isEditorSubmittedDocument.current = true
                                } else {
                                    // setIsWorkspaceEditable(false)
                                    // console.log('submitted');
                                    isDocumentSubmittedRef.current = true
                                }

                                if (assign_to_data?.task_assign_detail.task_status === "Completed") {
                                    documentRestrictionReasonRef.current = 'completed'
                                } else if (assign_to_data?.task_assign_detail.task_status === "Return Request") {
                                    documentRestrictionReasonRef.current = 'returned'
                                }
                            }
                        }

                        // console.log(isTaskReassignedRef.current);

                        if (isTaskReassignedRef.current) {
                            let a = responseTemp?.assign_detail?.filter(each => each.reassigned === isTaskReassignedRef.current)
                            let assign_to_data = task_data?.task_assign_info?.find(each => ((each?.assign_to_details.id === userDetails.pk || each?.assign_to_details?.managers.find(user => user === userDetails.pk)) && (each.task_assign_detail?.step === (is_reviewer || is_from_reviewer ? 2 : 1))))

                            // console.log(a);
                            // console.log(is_user_reviewer);
                            if (is_user_reviewer) {
                                // console.log(a?.find(each => each.assign_to_id !== userDetails.pk));
                                // condition is true if editing status is completed then make the editable true
                                if (a?.find(each => each.assign_to_id !== userDetails.pk)?.status === 3) {
                                    // step-1 editor has submitted document (post-editing step(1) is done) 
                                    if (assign_to_data?.task_assign_detail.task_status !== "Return Request" && assign_to_data?.task_assign_detail.task_status !== "Completed") {
                                        // isEditorSubmittedDocument.current = true
                                        // setIsWorkspaceEditable(true)
                                        // console.log( "is_editable_inside: true");
                                    }
                                } else {
                                    // setIsWorkspaceEditable(false)
                                    // console.log('is_editable_inside: false');
                                }
                                // console.log(a?.find(each => each.assign_to_id !== userDetails.pk)?.status !== 3 ? 'is_editable_inside: false' : "is_editable_inside: true");
                            }
                        } else {
                            if (userDetails.agency) {
                                let a = responseTemp?.assign_detail?.filter(each => each.reassigned === false)
                                // console.log(a);

                                // console.log(a?.find(each => each.step_id !== 2));
                                // console.log(is_user_reviewer);
                                if (is_user_reviewer) {
                                    // console.log(a?.find(each => each.step_id !== 2));
                                    if (a?.find(each => each.step_id !== 2)?.status === 3) {
                                        // step-1 editor has submitted document (post-editing step(1) is done) 
                                        // isEditorSubmittedDocument.current = true
                                        // setIsWorkspaceEditable(true)
                                    } else {
                                        // setIsWorkspaceEditable(false)
                                        // console.log('no access');
                                    }
                                    // console.log(a?.find(each => each.assign_to_id !== userDetails.pk)?.status !== 3 ? 'is_editable_inside: false' : "is_editable_inside: true");
                                }
                                // else{
                                //     console.log(a?.find(each => each.step_id !== 1));
                                //     if(a?.find(each => each.step_id !== 1)?.status !== 3){
                                //         // step-1 editor has submitted document (post-editing step(1) is done) 
                                //         isEditorSubmittedDocument.current = true
                                //         setIsWorkspaceEditable(true)
                                //     } else {
                                //         setIsWorkspaceEditable(false)
                                //     }
                                // }
                            }
                        }
                    },
                    error: (err) => { }
                })

                // setIsUserIsReviwer(stepOptions?.find(eachStep => responseTemp?.assign_detail.find(each => each.assign_to_id === Config?.userState.id)?.step_id === eachStep.value) )
            },
            error: (err) => {
                if (err.response?.data?.detail) {
                    history("/file-upload");
                }
            }
        });
    };
    
    const handleDocumentSubmitBtn = (status) => {
        setVendorReturnRequestReasonText('')
        if (status === 4 && vendorReturnRequestReasonText?.trim() === '') {
            setShowVendorComplaintReasonModal(true)
            return;
        } else if (status === 3) {
            if (!showSubmitConfirmModal) {
                setShowSubmitConfirmModal(true)
                return;
            }
        }

        let formData = new FormData();
        formData.append("task", documentTaskIdRef.current);
        formData.append("step", documentSubmitStepRef.current);
        formData.append("status", status?.toString()); // in-progress: 2, submit: 3, raise-complaint: 4 

        if (status === 4) {
            formData.append("return_request_reason", vendorReturnRequestReasonText?.trim())
        }
        if (isTaskReassignedRef.current) {
            formData.append("reassigned", 'True')
        }
        setIsDocumentSubmitting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                if(!isDinamalar){
                    setIsWorkspaceEditable(false)
                }
                setShowDocumentSubmitButton(false)
                setShowReturnRequestBtn(false)
                setShowVendorComplaintReasonModal(false)
                setShowSubmitConfirmModal(false)
                setIsDocumentSubmitting(false)
                if (status === 3) {
                    Config.toast(t("document_submitted"))
                } else if (status === 4) {
                    Config.toast(t("return_req_send"))
                }
            },
            error: (err) => { setIsDocumentSubmitting(false) }
        });
    }

    /*
        - Remove the suggestion div -start
    */
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
        // mark.setAttribute("id", 'replaceable-content-' + randomNumber)
        // mark.setAttribute("contenteditable", true)
        // mark.className = cName
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
                        restoreCursorPositionWithinContenteditable()
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

    /* Remove all the tags from the :element */
    const removeTagFromTextNode = (element) => {
        if (typeof element != "undefined") {
            for (let i = 0; i < element.childNodes.length; ++i) {
                element.childNodes[i].removeChild("mark");
            }
        }
    };


    /* Enable the spellcheck after checking the availability of the target language */
    const toggleSpellcheck = (e = null) => {
        resetSynonymStates()
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
                            setEnableSynonym(false)
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
                        setEnableSynonym(false)
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

    // This will call the callback function with the given event after specified milliseconds the user stopped typing
    const debounce = (e, callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            callback(e);
        }, 1000);
    };

    // Triggers once the user stops typing - Page number enter in the input 
    const debouncePageNumber = (e, url) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            pageNumberEnter(e, url);
        }, 500);
    };

    // This will call the callback function with the given event after specified milliseconds the user stopped typing
    const debounceSegmentUpdate = (e, callback) => {
        if (segUpdateTypingTimeout.current) clearTimeout(segUpdateTypingTimeout.current);
        segUpdateTyping.current = false;
        segUpdateTypingTimeout.current = setTimeout(() => {
            callback(e);
        }, 800);
    };

    // Spellcheck the current focused contenteditable 
    const spellCheck = (e = null) => {
        setPopoverTarget(null);
        setSpellCheckPopoverContent("");
        let segmentId = "";
        if (e != null) segmentId = e.target.getAttribute("data-id");
        else segmentId = focusedDivIdRef.current;
        if (segmentId == "") return;
        let thisElement = targetContentEditable.current[segmentId]?.current;
        let focusNode = window.getSelection().focusNode;
        if (focusNode != null) {
            if (focusNode.parentNode.classList.contains("spellcheck-highlight")) {
                let text = "";
                if (focusNode.nodeType === Node.TEXT_NODE) text = focusNode.textContent.trim();
                if (text.indexOf(" ") == -1 || text.indexOf("&nbsp;") != -1) return;
            }
        }
        if (thisElement != null) UnCheckIt(thisElement);
        let sentence = "";
        if (e?.target != null) sentence = e.target?.innerHTML;
        else sentence = targetContentEditable.current[segmentId]?.current?.innerHTML;
        // let words = sentence.match(/\S+\s*/g)

        // if (!grammarPopoverOpen) {
        sentence = removeSpecificTag(sentence, "mark");
        // } else {    
        //     setGrammarPopoverOpen(false)
        //     setgrammarCheckPopoverTarget("")
        //     sentence = removeSpecificTag(sentence, "mark");
        // }
        // sentence = replaceTagsWithText(sentence)
        // sentence = removeAllTags(sentence)
        // console.log(sentence)   
        sentence = removeTagWithItsTextContent(sentence)

        // console.log(sentence)

        if (sentence != null) sentence = sentence.replaceAll("&nbsp;", " ");
        if (enableSpellCheck) {
            let formData = new FormData();
            formData.append("doc_id", documentId);
            formData.append("target", sentence);
            let url = `${Config.BASE_URL}/workspace_okapi/spellcheck/`;
            Config.axios({
                url: url,
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    let result = response.data.result;
                    setIsWordsCorrected(response.data.result.length === 0 ? true : false)
                    setIsWordsCorrectedTrigger(!isWordsCorrectedTrigger)
                    spellCheckData.current = result;
                    // setTimeout(() => {
                    // if (!grammarPopoverOpen) {
                    //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                    //         targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                    //         "mark"
                    //     );
                    // } else {
                    //     setGrammarPopoverOpen(false)
                    //     setgrammarCheckPopoverTarget("")
                    //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                    //         targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                    //         "mark"
                    //     );
                    // }
                    result.map((value) => {
                        checkIt(thisElement, value.word);
                    });
                    // }, 1000)
                },
                error: () => {
                    // Sometime it's showing error response. Handle it
                },
            });
        }
    };

    /* Spellcheck - replace the selected word and change it's class name too. */
    const correctWord = (e, replaceableWord) => {
        // saveCaretPosition() // Can't use. the replaced word doesn't have the same range because of the length difference
        e.target.innerHTML = replaceableWord;
        // changeSavedCaretPosition() // Can't use. the replaced word doesn't have the same range because of the length difference
        e.target.classList.remove("spellcheck-highlight");
        e.target.classList.add("spellcheck-replaced");
        setPopoverOpen(false);
        setPopoverTarget(null);
        setSpellCheckPopoverContent("");
    };


    /* Synonym - replace the selected word and change it's class name too. */
    const changeSynonym = (target, replaceableWord) => {
        // saveCaretPosition() // Can't use. the replaced word doesn't have the same range because of the length difference
        target.innerHTML = replaceableWord;
        // changeSavedCaretPosition() // Can't use. the replaced word doesn't have the same range because of the length difference
        target.classList.remove("synonym-highlight");
        target.classList.add("synonym-replaced");
        // target.removeAttribute('id')
        setSynonymPopoverOpen(false);
        setSynonymPopoverTarget(null);
        setSynonymPopoverContent("");
    };

    // reset all NLP state variables
    const resetSynonymStates = () => {
        setSynonymPopoverOpen(false)
        setSynonymPopoverTarget("")
        setSynonymsResList([])
        setSynonymText("")
        setSynonumSelectionObject(null)
    }




    const getSelectedText = (e) => {

      
        if (enableSynonym && window.getSelection().toString().length) {
            // console.log(window.getSelection().toString())
            setSynonymText(window.getSelection().toString())

            setSynonumSelectionObject(window.getSelection())
            // console.log(window.getSelection().anchorOffset)
            // console.log(window.getSelection())
            // setEnableSpellCheck(false)
            // toggleSpellCheckBtn.current?.classList?.remove("toolbar-list-icons-active");
            // if (popoverOpen || paraPhrasePopoverTarget !== "" || grammarPopoverOpen || grammarCheckPopoverTarget !== "") {
            // } else {
            //     setSynonymText(window.getSelection().toString())
            // }
        } else {
            //  selectionRangeRef.current =  saveSelection(targetContentEditable.current[focusedDivIdRef.current].current)
            //  console.log(selectionRangeRef.current);
            setImeTextObject(window.getSelection().toString())
        }
    }

    const replaceWithNewPara = (e, value) => {
        updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", value + paraPhraseTag);
        updateSegmentStatus(focusedDivIdRef.current, 103);
        changeEditedStatus(focusedDivIdRef.current, "unsaved");
        handleTransphrasePopoverClose()
        setTimeout(() => {
            updateTranslationById(null, focusedDivIdRef.current, true, { forceUpdate: true });
        }, 200);
    }

    const repalceWithNewSynonym = (e, value) => {
        let childMark = document?.getElementById(synonymPopoverTarget)
        childMark.innerHTML = value + " "

        setSynonymPopoverOpen(false)
        setSynonymPopoverTarget("")
        setSynonymsResList([])

        // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
        //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
        //     "mark"
        // );

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

    const removeSelectedText = (e) => {
        let childMark = document?.getElementById(imeTextObjectTarget)
        if (childMark) {
            childMark.style.setProperty('background-color', 'transparent', 'important');
            childMark.style.setProperty('color', '#3C4043', 'important');
        }
        // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML =  targetContentEditable.current[focusedDivIdRef.current].current.innerText
        // console.log('clicked')
    }
    // !e.target.classList.contains('popover') && 
    // close the popover and remove the mark tag when clicked outside of the popover


    const outsideClickHandler = (e) => {
        // console.log('called from disable synonom')
        if(!e.target?.closest('.paraphrase-popover-box')){
            let popoverDiv = document.getElementsByClassName('popover')[0]
            let markTag = document.getElementById(synonymPopoverTarget)
            if (markTag !== undefined && synonymPopoverOpen && synonymsResList.length) {
                resetSynonymStates()
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                    "mark"
                );
            }
        }
    }


    const handleTransphrase = (e, action) => {
        let text = ''
        if (targetLanguageId == 17) {
            text = replaceTagsWithText(unescape(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML), "")
        } else if (sourceLanguageId == 17) {
            text = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML), "")
        }

        if (removeAllTags(text)?.trim()?.split(' ')?.length <= 1) {
            Config.toast(t("text_more_than_one_word"), 'warning')
            setIsParaphrasing(false)
            return
        }

        setSelectedParaphrase(action)
        setTransphrasePopoverTarget(e.currentTarget)
        setTransphrasePopoverOpen(true)

        if (!isParaphrasing) {
            getParaphrases(action)
        }
    }

    const handleTransphrasePopoverClose = () => {
        setTransphrasePopoverTarget(null)
        setTransphrasePopoverOpen(false)
        setSelectedParaphrase(null)
    }


    const getParaphrases = async (option) => {

        setIsParaphrasing(true)
        setParaPhraseResList([]) // reset the paraphrase response list before getting the new list
        let text = ''
        if (targetLanguageId == 17) {
            text = replaceTagsWithText(unescape(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML), "")
        } else if (sourceLanguageId == 17) {
            text = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML), "")
        }

        setParaphraseText(text)
        setparaphraseTrigger(true)
        // handleToggleVisibility(true)
        // console.log(paraphraseTabButton.current)
        // paraphraseTabButton.current?.click();
        // scrollRight()

        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        // console.log(sourceTextDiv.current[focusedDivIdRef.current].current);
        if (removeAllTags(text)?.trim()?.length.length !== 0) {

            var formdata = new FormData();
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            if (targetLanguageId == 17) {
                // normal paraphrasing
                formdata.append("sentence", text.trim());
                formdata.append("doc_id", documentId);

                formdata.append("seg_id", focusedDivId ? focusedDivId : focusedDivIdRef.current);
            } else if (sourceLanguageId == 17) {
                // transphrasing
                formdata.append("source_sent", text?.trim());
                formdata.append("target_lang_id", targetLanguageId);
                formdata.append("doc_id", documentId);
            }

            // options: Rewrite, Shorten, Simplify
            formdata.append("option", option);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            try{
                let data = null
                if (targetLanguageId == 17) {
                    data = await fetch(Config.BASE_URL + "/workspace_okapi/paraphrase/", requestOptions)
                } else if (sourceLanguageId == 17) {
                    data = await fetch(Config.BASE_URL + "/workspace_okapi/seg_rewrite/", requestOptions)
                }

                // console.log(data)
                let response = await data.json()
                if (data.status === 200) {
                    setParaPhraseResList(response?.result)
                    setparaPhraseTag(response?.tag)
                    setIsParaphrasing(false)
                    if (response?.msg === 'error') {
                        setIsParaphrasing(false)
                        setparaphraseTrigger(false)
                        setIsParaphrasing(false)
                        Config.toast(t("paraphrase_get_error_1"), 'warning');
                    }
                } else if (data.status === 400) {
                    if (response?.msg === 'Insufficient Credits') {
                        setShowCreditAlert(true)
                        if (!isAssignEnable) setCreditAlertTxt(t("insufficient_credit_contact"))
                        else setCreditAlertTxt(t("insufficient_credits"))
                    }
                    handleTransphrasePopoverClose()
                    setparaphraseTrigger(false)
                    setIsParaphrasing(false)
                } else if (data.status === 500) {
                    handleTransphrasePopoverClose()
                    Config.toast(t("paraphrase_get_error_3"), 'error')
                    setparaphraseTrigger(false)
                    setIsParaphrasing(false)
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            handleTransphrasePopoverClose()
            Config.toast(t("paraphrase_get_error_4"), 'warning')
            setparaphraseTrigger(false)
            setIsParaphrasing(false)
        }
    }



    // Get Synonym for selected word
    const fetchSynonym = async () => {
        // get token from cache
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        var formdata = new FormData();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        let fullSentence = replaceTagsWithText(removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML, "mark"), " ")

        formdata.append("word", synonymText.trim());
        formdata.append("word", synonymText.trim());
        formdata.append("sentence", fullSentence);

        // console.log("sarvesh" + fullSentence.slice(0, synonumSelectionObject?.anchorOffset))
        formdata.append("second_word", synonumSelectionObject?.anchorOffset !== 0 ? fullSentence.slice(0, synonumSelectionObject?.anchorOffset) : "-1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        let data = await fetch(Config.BASE_URL + "/workspace_okapi/synonyms/", requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            // console.log(response.context.synonyms)
            let synonymList = []
            // console.log(typeof response.context?.synonyms)
            if (typeof response.context == "object") {
                response.context?.map((value) => {
                    synonymList.push(
                        <p
                            key={value}
                            className="corrected-word"
                            onClick={(event) => repalceWithNewSynonym(event, value)}
                        >
                            {value}
                        </p>
                    );
                });
                setSynonymsResList(synonymList)
                setParaphrasePopoverOpen(true)
            } else {
                Config.toast(t("no_synonym_found"), 'warning')
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                    targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                    "mark"
                );
                setSynonymPopoverOpen(false)
                setSynonymPopoverTarget("")
                setSynonymsResList([])
            }
        }
    }

    const highlightGrammarMistake = (originalSentence, newSentence) => {
        var selectedTextStartIndex = targetContentEditable.current[focusedDivIdRef.current]?.current?.textContent.indexOf(originalSentence)
        // console.log(selectedTextStartIndex)
        let randomNum = Math.floor(Math.random() * 1000)
        var mark = document.createElement("mark");
        let txt = document.createTextNode(originalSentence)
        mark.id = `grammar-check-${randomNum}`
        setgrammarCheckPopoverTarget("grammar-check-" + randomNum)
        mark.classList.add('grammarcheck-highlight')
        // mark.style.setProperty('background-color', 'transper', 'important');
        mark.appendChild(txt);
        mark.contentEditable = "true"
        // console.log(mark)
        let finalTxt = targetContentEditable.current[focusedDivIdRef.current].current.textContent.replace(originalSentence, mark.outerHTML)
        // console.log(finalTxt)
        var doc = new DOMParser().parseFromString(finalTxt, "text/html");
        // console.log(doc.body.innerHTML)
        targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = doc.body.innerHTML
        targetContentEditable.current[focusedDivIdRef.current].current.focus()
    }



    // const replaceWithCorrectGrammarSentence = (e, value, targetValue) => {
    //     console.log(typeof grammarCheckPopoverTarget)
    //     let childMark = document.getElementById(grammarCheckPopoverTarget)
    //     console.log(childMark)
    //     childMark.innerHTML = value + " "
    //     console.log(childMark.innerHTML)

    //     setGrammarCheckSuggestedSentence([])
    //     setGrammarPopoverOpen(false)
    //     setgrammarCheckPopoverTarget("")

    //     // console.log(targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML)
    //     // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
    //     //     targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML,
    //     //     "mark"
    //     // );
    //     console.log(targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML)

    //     const selection = window.getSelection();
    //     const range = document.createRange();
    //     selection.removeAllRanges();
    //     range.selectNodeContents(targetContentEditable.current[focusedDivIdRef.current].current);
    //     range.collapse(false);
    //     selection.addRange(range);
    //     targetContentEditable.current[focusedDivIdRef.current].current.focus();

    //     updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
    //     updateSegmentStatus(focusedDivIdRef.current, 103);
    //     changeEditedStatus(focusedDivIdRef.current, "unsaved");

    // }

    const correctSentence = (correctedSentence) => {
        let markDiv = document.getElementById(grammarCheckPopoverTarget)
        // console.log(markDiv)
        markDiv.innerHTML = correctedSentence
    }



    const replaceWithCorrectGrammarSentence = (e, value, targetValue) => {
        let childMark = document.getElementById(grammarCheckPopoverTarget)
        childMark.textContent = value + " "
        childMark.classList.remove("grammarcheck-highlight")
        childMark.classList.add("spellcheck-replaced")

        setGrammarCheckSuggestedSentence([])
        setGrammarCheckResponse([])
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")

        // console.log(childMark)

        // console.log(removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML,"mark"))

        var doc = new DOMParser().parseFromString(removeSpecificTag(targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML, "mark"), "text/html");
        // console.log(doc)
        // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = doc.body.innerHTML.replaceAll("&nbsp;", " ");

        // console.log(targetContentEditable.current[focusedDivIdRef.current].current.innerHTML)


        // targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
        //     targetContentEditable.current[focusedDivIdRef.current].current?.innerHTML,
        //     "mark"
        // );
        // updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", targetContentEditable.current[focusedDivIdRef.current].current.innerHTML);
        // updateSegmentStatus(focusedDivIdRef.current, 103);
        // changeEditedStatus(focusedDivIdRef.current, "unsaved");

        // targetContentEditable.current[focusedDivIdRef.current].current.setAttribute("data-translated-text", targetContentEditable.current[focusedDivIdRef.current]?.current.innerHTML);

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
        saveCaretPosition()
        let thisElement = targetContentEditable.current[focusedDivIdRef.current]?.current
        if (thisElement != null) UnCheckIt(thisElement);
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        var myHeaders = new Headers();
        var formdata = new FormData();
        let text = removeTagWithItsTextContent(unescape(targetContentEditable.current[focusedDivIdRef.current]?.current?.innerHTML.replaceAll("&nbsp;", " ")))
        formdata.append("target", text);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        let data = await fetch(Config.BASE_URL + "/workspace_okapi/grammercheck/", requestOptions)
        if (data.status === 200) {
            let response = await data.json()

            // console.log(response)
            setGrammarCheckResponse(response.grammar_check)
            // response.grammar_check?.map(value => {
            //     if(value.edit.length !== 0){
            //         // checkIt(thisElement, value.sentence);
            //         highlightGrammarMistake(value.sentence, value.corrected_sentence)
            //         // let grammarList = []
            //         // grammarList.push(
            //         //     <p
            //         //         key={value.corrected_sentence}
            //         //         className="corrected-word"
            //         //         onClick={(event) => replaceWithCorrectGrammarSentence(event, value.corrected_sentence)}
            //         //     >
            //         //         {value.corrected_sentence}
            //         //     </p>
            //         // );
            //         // setGrammarCheckSuggestedSentence(grammarList)
            //     }
            // })
        }
    }

    
    window.onerror = function (message, file, line, col, error) {
        console.log("Error occurred: " + error?.message);
        return false;
    };
    window.addEventListener("error", function (e) {
        console.log("Error occurred: " + e?.error?.message);
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

    /* Whenever typing on the target contenteditable */
    const translatedTextChange = (e) => {
        let id = e.target.getAttribute("data-id");
        
        // Call the spellchecker api
        if (e.target.innerText !== ""){
            debounceApiCall(() => {
                // console.log('debounce')
                symSpellCheck(id)
            })
        }

        // call segment update - to automatically update the segment
        // debounceSegmentUpdate(e, (e) => updateTranslationById(null, id, true, null, null, null, true))
        
        if (savedStatus.current[id].current != null) savedStatus.current[id].current.style.display = "none";
        
        let translatedText = e.target.getAttribute("data-translated-text");
        
        /*status(Manual) update - start*/
        if (e.target.innerHTML == "") {
            updateSegmentStatus(id, 105);
            changeEditedStatus(id, "unsaved");
        }
        /*status(Manual) update - end*/

        // check if contenteditable is empty then clear the contenteditable and update status
        if (e.target.textContent == '') {
            setparaPhrasePopoverTarget("")
            setShowParaphraseBtn(false)
            if(targetContentEditable.current[focusedDivId].current){
                targetContentEditable.current[focusedDivId].current.innerHTML = "";
            }
            updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", "");
            updateSegmentStatus(focusedDivIdRef.current, 105);
            changeEditedStatus(focusedDivIdRef.current, "unsaved");
        } else {
            setShowParaphraseBtn(true)
        }
    };

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
        // console.log(id)
        if (id != null) {
            alreadyTranslatedText = targetContentEditable.current[id]?.current?.getAttribute("data-translated-text");
            translatedText = targetContentEditable.current[id]?.current?.innerHTML;
            translatedText = removeSpecificTag(translatedText, "div");
            translatedText = removeSpecificTag(translatedText, "br");
            // console.log("sarvesh: "+ translatedText)
            let textWithoutTags = removeAllTags(replaceTagsWithText(translatedText !== undefined ? translatedText : '')  ? replaceTagsWithText(translatedText !== undefined ? translatedText : '') : '')
            // console.log(textWithoutTags?.trim())
            // console.log(textWithoutTags?.trim()?.length)
            if (textWithoutTags?.trim()?.length === 0) {
                // If empty
                if (!isTemp)
                    // Don't check empty for temp
                    Config.toast(t("add_trans_working"), "warning");
                return;
            }

            if (!translatedText) return;


            // disable removemark tag
            if (grammarPopoverOpen) {
                setGrammarPopoverOpen(false)
                setgrammarCheckPopoverTarget("")
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
                    // console.log(alreadyTranslatedText.replace(/\s+/g, "") == translatedText.replace(/\s+/g, ""))
                    // console.log("你 好 世 界".replace(/\s+/g, "") == "你 好 世 界".replace(/\s+/g, ""))

                    // console.log(alreadyTranslatedText)
                    // console.log(translatedText)

                    // console.log(temp_target)
                    // console.log(target)

                    // console.log(temp_target.trim() == target.trim())

                    // console.log(alreadyTranslatedText.trim() == translatedText.trim())
                    // console.log("combined condition : " + (removeWhitespace(alreadyTranslatedText) == removeWhitespace(translatedText)) && (removeWhitespace(temp_target) == removeWhitespace(target)))
                    // console.log("combined condition : " + (alreadyTranslatedText.trim() == translatedText.trim()) && (temp_target.trim() == target.trim()))

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
            // console.log(translatedText)
            formData.append(formDataKey, translatedText == 'undefined' ? "" : unescape(translatedText));
            let status = allSegmentStatuses?.current[id] == null ? 105 : allSegmentStatuses?.current[id];
            // let changeStatusTo = status - 1;
            // console.log(status)
            // console.log(isTemp)
            let changeStatusTo = status;
            /* Change the appropriate status - start */
            if (isTemp) {
                if (isUserIsReviwer) {
                    changeStatusTo = 109
                } else {
                    if (status == 102) changeStatusTo = 101;
                    else if (status == 104) changeStatusTo = 103;
                    else if (status == 106) changeStatusTo = 105;
                    else if (status == 109) changeStatusTo = 103;
                    else if (status == 110) changeStatusTo = 103;
                }
            } else {
                if (isUserIsReviwer) {
                    changeStatusTo = 110
                } else {
                    if (status == 101) changeStatusTo = 102;
                    else if (status == 103) changeStatusTo = 104;
                    else if (status == 105) changeStatusTo = 106;
                    else if (status == 109) changeStatusTo = 104;
                    else if (status == 110) changeStatusTo = 104;
                }
                setIsConfirmBtnClicked(true)
            }

            if(!isTemp){
                setIsSegmentConfirming(true)
            }

            // console.log(changeStatusTo)
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
                        // console.log(targetContentEditable?.current[id]?.current)
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
                        if (!isTemp) showSegmentQa(id)

                        // if confirm button is clicked, this will move the focus to next unconfirmed segment otherwise focus the un-opned segment  
                        if (!isTemp) {
                            setIsSegmentConfirming(false)
                            
                            // confirm current segment then move to next unconfimed segment
                            let nextSegmentUnsavedId = getUnsavedSegmentData(focusedDivIdRef.current)?.segment_id;
                            // console.log("unconfirmed segment: " + nextSegmentUnsavedId);
                            if (targetContentEditable.current[nextSegmentUnsavedId]?.current != null) targetContentEditable.current[nextSegmentUnsavedId].current.focus();

                            // if no unsaved segment is found then move to next segment
                            if (nextSegmentUnsavedId === undefined) {
                                // confirm current segment then move to next immediate segment
                                let nextSegmentId = getNextSegmentData(focusedDivIdRef.current)?.segment_id;
                                // console.log("immediate next segment: " + nextSegmentId);

                                // if no unopened segment is found or confirmed the last segment then move to next page
                                if(translatedResponse?.filter(each => each.status === undefined || each.status === null)?.length === 0 || translatedResponse?.slice(-1)[0]?.segment_id == id) {
                                    // move to next page when last segment is confirmed
                                    if(translatedResponse?.slice(-1)[0]?.segment_id == id){
                                        // update page and scroll to top 
                                        let pageParam = URL_SEARCH_PARAMS.get("page");
                                        // don't update page beyond the total page
                                        // console.log(totalPages)
                                        if(totalPages > pageParam){
                                            URL_SEARCH_PARAMS.set("page", parseInt(pageParam) + 1);
                                            history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
                                            isMovedFromLastSegmentConfirmRef.current = true
    
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

                        if(advancedOptionVisibility) getSegmentDiff()
                        if(isTyping) {
                            restoreCursorPositionWithinContenteditable()
                            symSpellCheck(id)
                        } 
                    }
                    istargetSegmentOnBlurTriggeredRef.current = false
                },
                error: (err) => {
                    if (err.response?.status === 400) {
                        if (err?.response?.data?.msg?.includes('working')) {
                            history({
                                pathname: '/file-upload',
                                state: { documentLock: isUserIsReviwer ? t("sp_working") : t("reviewer_working") }
                            })
                        } else {
                            setShowCreditAlert(true)
                            setCreditAlertTxt(t("insuffient_credits_to_continue_work"));
                            // setShowCreditAlertRedirection(true)
                        }
                    }
                    setIsSegmentConfirming(false)
                    istargetSegmentOnBlurTriggeredRef.current = false
                }
            });
        }
    };

    const listSegments = (from) => {
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        // console.log(pageParam)
        if (pageParam != null) {
            setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        if (from === 'invalid-page') {
            setCurrentPage(1)
            URL_SEARCH_PARAMS.set("page", 1);
            history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
        }

        setIsSegmentPageLoading(true)

        let url = `${Config.BASE_URL}/workspace_okapi/segments/${documentId}?page=${from === 'invalid-page' ? 1 : page}&page_size=${selectedPageSize?.value ? selectedPageSize?.value : pageSizeFromApi.current}`
        Config.axios({
            url: url,
            method: "GET",
            auth: true,
            success: (response) => {
                setTimeout(() => {
                    setIsSegmentLoading(false);
                }, 200);
                lastCalledArgs.current.functionName = "pageSelect";
                lastCalledArgs.current.page = page;
                let tempList = response.data.results
                if (confirmedSegmentListFromConfirmAll.current?.length !== 0) {
                    if (showAllSegmentsConfirmedToastRef.current) {
                        Config.toast(t("segments_confirm"))
                    }
                    showAllSegmentsConfirmedToastRef.current = true
                    confirmedSegmentListFromConfirmAll.current?.map(each => {
                        if (targetContentEditable?.current[each]?.current != null){
                            // console.log(response.data.results?.find(seg => seg?.segment_id == each)?.target)
                            targetContentEditable.current[each].current.setAttribute("data-translated-text", (response.data.results?.find(seg => seg?.segment_id == each)?.target == '' || response.data.results?.find(seg => seg?.segment_id == each)?.target == null) ? "" : response.data.results?.find(seg => seg?.segment_id == each)?.target);
                        }
                    })
                    confirmedSegmentListFromConfirmAll.current = []
                    setTimeout(() => {
                        setShowAiLoader(false)
                    }, 50);
                }
                setTranslatedResponse(tempList);
                translatedResponseRef.current = tempList
                setNextPageUrl(response.data.next);
                setPreviousPageUrl(response.data.previous);
                // console.log("selected page-szie: " + selectedPageSize?.value)
                setTotalPages(Math.ceil(response.data.count / (selectedPageSize?.value ? selectedPageSize?.value : pageSizeFromApi.current)));
                // pageSizeFromApi.current = null
                setIsSegmentPageLoading(false)
                getDocumentProgressData()
                if (from === 'confirm-all') {
                    confirmAllsegments('list-segments')
                }
            },
            error: (err) => {
                if (err?.response?.data?.detail?.includes('page')) {
                    // lastCalledArgs.current.page = 1
                    listSegments('invalid-page')
                }
                setIsSegmentPageLoading(false)
            }
        });
    }

    const confirmAllsegments = (from) => {
        var formdata = new FormData();
        if (from !== 'list-segments') {
            listSegments('confirm-all')
            return;
        }
        // formdata.append("status", isUserIsReviwer ? 110 : 104);
        
        // console.log(translatedResponseRef.current)
        let list = []
        let confirmedStatusList = [102, 104, 106, 110]
        translatedResponseRef.current?.map(each => {
            // console.log(confirmedStatusList?.includes(each?.status))
            if (each?.status !== undefined && !confirmedStatusList?.includes(each?.status)) {
                list.push({
                    pk: each.segment_id,
                    status: each.status == 101 ? "102" : each.status == 103 ? "104" : each.status == 105 ? "106" : (each.status == 109 && !isUserIsReviwer) ? "104" :
                        each.status == 104 ? "104" : (each.status == 109 && isUserIsReviwer) ? "110" : each.status == 106 ? "106" : each.status == 110 ? "110" : each.status == 102 ? "102" :
                            "110"
                })
            }
        })
        // console.log(list)
        if (list?.length === 0) {
            Config.toast(t("no_segments_confirm"), 'warning')
            return;
        }

        setShowAiLoader(true)

        formdata.append("confirm_list", JSON.stringify(list));

        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/segment/update/`,
            auth: true,
            method: "PATCH",
            data: formdata,
            success: (response) => {
                if (response.data?.confirmed_list !== undefined) {
                    confirmedSegmentListFromConfirmAll.current = response.data?.confirmed_list
                }
                if (response.data?.message?.includes('insufficient')) {
                    setShowAiLoader(false)
                    setShowInsufficientConfirmAllModal(true)
                    showAllSegmentsConfirmedToastRef.current = false
                }
                listSegments()
                // if(response.status === 200){
                //     // console.log(response.data)
                // }else{
                //     // Config.toast(`Something went wrong`, 'error')
                // }
            },
            error: (err) => {
                setShowAiLoader(false)
            }
        });
    }



    /* Specific page is selected. */
    // const pageSelect = (page = 0) => {
    //     let workspaceContainer = document.getElementsByClassName('workspace-editor')[0];
    //     setTimeout(() => {
    //         if(isMergedRef.current || isRestoredRef.current || isSplitRef.current){
    //             isMergedRef.current = false
    //             isRestoredRef.current = false
    //             isSplitRef.current = false
    //         }else{
    //             workspaceContainer.scroll({top: 0,behavior: 'smooth'});
    //         }
    //     }, 10);

    //     let url = Config.BASE_URL + "/workspace_okapi/segments/" + documentId;
    //     let pageParam = new URLSearchParams(history.location.search).get("page");
    //     if (pageParam != null) {
    //         setCurrentPage(pageParam);
    //         page = pageParam;
    //     }
    //     if (page != 0 && page != null) url += "?page=" + page;
    //     Config.axios({
    //         url: url,
    //         method: "GET",
    //         auth: true,
    //         success: (response) => {
    //             setIsSegmentLoading(false);
    //             lastCalledArgs.current.functionName = "pageSelect";
    //             lastCalledArgs.current.page = page;
    //             setTranslatedResponse(response.data.results);
    //             setNextPageUrl(response.data.next);
    //             setPreviousPageUrl(response.data.previous);
    //             setTotalPages(Math.ceil(response.data.count / segmentsPerPage));
    //         },
    //     });
    // };

    const pageSelect = (page = 0, param) => {
        let workspaceContainer = document.getElementsByClassName('workspace-editor')[0];
        setTimeout(() => {
            if (isMergedRef.current || isRestoredRef.current || isSplitRef.current) {
                isMergedRef.current = false
                isRestoredRef.current = false
                isSplitRef.current = false
            } else {
                workspaceContainer.scroll({ top: 0, behavior: 'smooth' });
            }
        }, 10);
        let url = `/workspace/${documentId}`
        if (page != 0 && page != null) url += `?page=${page}`;
        else url += `?page=1`
        let statusParam = URL_SEARCH_PARAMS.get("status");
        if (param !== 'clear-status') {
            if (statusParam != null) url += `&status=${statusParam}`;
        }
        history(url);
    }

    // Store last visited project page number in local storage
    const storeLastVisitedPageNumber = (path) => {
        localStorage.setItem(documentId, path)
    }

    /* Pagination content data generate */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages != 0) {
            // let findParams = "";
            // if (findStatus.length) findParams += "&status=" + findStatus.toString();
            let url = "/workspace/" + documentId + "?page=";
            /*Pagination logic starts*/
            if (page > 1)
                content.push(
                    <span key={"prev" + currentPage} className="back-btn" onClick={() => { storeLastVisitedPageNumber(url + (page - 1)); pageSelect(page - 1) }}>
                        {" "}
                        <i className="fas fa-chevron-left"></i>{" "}
                    </span>
                );
            content.push(
                <React.Fragment key={currentPage}>
                    <input id="page-num" style={{width: '26px', boxSizing: 'content-box'}} type="number" defaultValue={currentPage} onChange={(e) => debouncePageNumber(e, url)} />
                    {t("of") + " " + Math.ceil(totalPages) + " " + t("pages")}
                </React.Fragment>
            );
            if (page < totalPages)
                content.push(
                    <span key={"next" + currentPage} className="forw-btn" onClick={() => { storeLastVisitedPageNumber(url + (page + 1)); pageSelect(page + 1) }}>
                        {" "}
                        <i className="fas fa-chevron-right"></i>{" "}
                    </span>
                );
            /*Pagination logic ends*/
        }
        setTimeout(() => {
            setPaginationContent(content);
        }, 100);
    };

    /* Handling page number enter */
    const pageNumberEnter = (e, url) => {
        let value = e.target.value;
        if (value) {
            if (value > 0 && value <= totalPages) {
                let workspaceContainer = document.getElementsByClassName('workspace-editor')[0];
                setTimeout(() => {
                    if (isMergedRef.current || isRestoredRef.current || isSplitRef.current) {
                        isMergedRef.current = false
                        isRestoredRef.current = false
                        isSplitRef.current = false
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
                storeLastVisitedPageNumber(url + value)
            }
            else {
                Config.toast(t("page_not_found"), "warning");
                // reset the input value to the current page number
                let pageParam = URL_SEARCH_PARAMS.get("page");
                e.target.value = pageParam
            }
        }
    };

    /* Show / hide the TM section in the footer toolbar */
    const showTmSectionFunction = (show = true) => {
        if (show) {
            // if (localStorage.getItem('showTmSection') === 'true' || localStorage.getItem('showTmSection') == null)
            setShowTmSection(true);
            scrollLeft()
        } else setShowTmSection(false);
    };

    const toggleListening = () => {
        if (recognition.current === null) {
            Config.toast(t("speech_not_support_this_browser"), 'warning')
            return
        }
        if (isListening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
    };


    /* Whenever select a target contenteditable */
    const contentEditableFocus = (e, segment_status) => {
        let id = e.target.getAttribute("data-id");

        if (e.target.className?.includes('source')) {
            if (sourceTextDiv.current[id].current !== null) {
                let pos = getHTMLCaretPosition(sourceTextDiv.current[id].current)
                // console.log(pos);
                let firstSeg = replaceTagsWithText(unescape(sourceTextDiv.current[id].current.innerHTML).slice(0, pos))
                let secondSeg = replaceTagsWithText(unescape(sourceTextDiv.current[id].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[id].current.innerHTML).length))
                // console.log(pos);
                // console.log(firstSeg);
                // console.log(secondSeg);
                if ((pos !== null || pos !== undefined) && mergeSelectedSegmentIds?.length === 0) {
                    if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                        segmentIdRef.current = e.target.getAttribute('data-id')
                        sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit')
                        setDisbaleSplitIcon(false)
                    }
                }
                // console.log(focusedDivIdRef.current)
            }
        }

        handleToggleVisibility(pushPinActive ? true : (advancedOptionVisibility) ? true : false);

        highlightFocusedSegment(id);

        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        // setPopoverOpen(false)
        showTmSectionFunction(false);

        setFocusedDivId(id);
        ctrlAClicked.current = false;
        focusedDivIdRef.current = id;
        // spellCheck(e);
        symSpellCheck(id)
        if(isDinamalar){
            getNerTerms(id)
        }

        getSegmentDiff()

        changeEditedStatus(id);

        let advanceToolbarOpenedForTm = false;
        if (targetContentEditable?.current[id]?.current != null) {
            if (findTerm === "") {
                // console.log(findTerm);
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
        let textTag = "" + thisSegmentTag

        searchTbxForDoc(e)
        searchGlossaryForDoc(e)
        
        // if(segment_status) return

        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/mt_raw_and_tm/${id}?mt_uc=false`,
            auth: true,
            success: (response) => {
                let mtTmResponse = response.data;
                let thisSegmentTags = "";
                let segmentData = translatedResponse.find((element) => element.segment_id == id);
                let segmentStatus = allSegmentStatuses.current[id];
                if (segmentStatus) {
                    if (segmentStatus == 101 || segmentStatus == 103 || segmentStatus == 105) changeEditedStatus(id, "unsaved");
                    else changeEditedStatus(id);
                } else {
                    if (insertedDivIds.current.indexOf(id) <= -1) {
                        /*if (targetContentEditable?.current[id]?.current != null)
                            targetContentEditable.current[id].current.innerHTML = replaceTextWithTags(response.data.mt_raw + segmentData.target_tags)*/
                        if (mtTmResponse?.alert_msg == 'MT Disabled') {
                            updateTranslatedResponseSegment(
                                id,
                                "temp_target",
                                textTag
                            );
                            updateSegmentStatus(id, 105);
                        } else {
                            updateTranslatedResponseSegment(
                                id,
                                "temp_target",
                                (mtTmResponse?.mt_raw != "" && mtTmResponse?.mt_raw != undefined) ?
                                    mtTmResponse.mt_raw + segmentData.target_tags
                                    :
                                    mtTmResponse?.tm[0]?.target + segmentData.target_tags
                            );

                            updateSegmentStatus(
                                id,
                                (mtTmResponse?.mt_raw != "" && mtTmResponse?.mt_raw != undefined) ?
                                    103
                                    :
                                    101
                            );

                            // updateSegmentStatus(id, 103);
                            insertedDivIds.current.push(id);
                        }
                        changeEditedStatus(id, "unsaved");
                        setTimeout(() => {
                            //It helps to call after the segment update happened. Otherwise the old data will be updated
                            updateTranslationById(null, id, true, { forceUpdate: true });
                        }, 100);
                    }
                }
                if (mtTmResponse?.tm?.length) {
                    // If it has TM data, need to show it on the footer toolbar
                    setTranslationMatches(mtTmResponse.tm);
                    if (segmentStatus == null || segmentStatus == 101 || segmentStatus == 103) {
                        advanceToolbarOpenedForTm = true;
                        handleToggleVisibility(true);
                    }
                }
                setIsSegmentDataLoading(false)
            },
            error: (error) => {
                setIsSegmentDataLoading(false)
                if (error.response?.data?.mt_alert) {
                    if (showCreditAlert) {
                        if (!isAssignEnable) setCreditAlertTxt(t("insufficient_credit_contact"))
                        else setCreditAlertTxt(creditAlertTxt);
                    } else {
                        if (!isAssignEnable) setCreditAlertTxt(t("insufficient_credit_contact"))
                        else setCreditAlertTxt(error.response.data.alert_msg);
                    }

                    let newArr = translatedResponse?.map(obj => {
                        if(obj.segment_id == id){
                            return{
                                ...obj,
                                disableEdit: true
                            }
                        }
                        return obj
                    })
                    // setTranslatedResponse(newArr)
                    translatedResponseDisableEditRef.current = newArr
                    // console.log(newArr)
                    
                    // if (lowCreditAlertCounter.current === 1) {
                        setShowCreditAlert(true);
                    //     lowCreditAlertCounter.current++
                    // }
                    if (showCreditAlert) {
                        setShowCreditAlertRedirection(false);
                    } else {
                        setShowCreditAlertRedirection(true);
                    }
                }
            },
        });
        /*Glossary request starts*/
        // let glossaryFileId = localStorage.getItem("glossaryFileId");
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        setPopoverOpen(false)
    };

    const searchTbxForDoc = (e) => {
        let tbxFormdata = new FormData();
        let sourceText = e.target.getAttribute("data-source-text");
        tbxFormdata.append("user_input", sourceText);
        tbxFormdata.append("doc_id", documentId);
        tbxFormdata.append("lang", targetLanguage);
        tbxFormdata.append("srclang", sourceLanguage);
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
    }

    const searchGlossaryForDoc = (e) => {
        let glossaryFormdata = new FormData();
        let sourceText = e.target.getAttribute("data-source-text");
        glossaryFormdata.append("user_input", sourceText);
        glossaryFormdata.append("doc_id", documentId);
        let glossaryUrl = Config.BASE_URL + "/glex/glossary_term_search/";
        Config.axios({
            url: glossaryUrl,
            method: "POST",
            auth: true,
            data: glossaryFormdata,
            success: (response) => {
                if (response.data !== undefined) {
                    if (response.data.res !== null || response.data.res.length > 0) {
                        setGlossaryData(response.data.res)
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
    } 

    /* Replace the give string with the tags span element. Also can skip some tags to prevent replacing */
    const replaceTextWithTags = (targetText, exculudeTags = []) => {
        if (typeof exculudeTags == "string") exculudeTags = [exculudeTags];
        let bgColor, thisTag;
        let tagName = targetText.match(/(<([^>]+)>)/gi);
        if (tagName) {
            tagName = tagName.map((val, key) => {
                thisTag = val.replace(/[<>]|[</>]/g, "");
                // console.log(thisTag)
                bgColor = bgColors[thisTag] != undefined ? bgColors[thisTag] : "#0074D3";
                // console.log(thisTag)
                let digitPattern = /^[0-9]+$/;
                let isDigit = digitPattern?.test(thisTag);
                if (exculudeTags.indexOf(thisTag) == -1) {
                    if (/<([0-9]+) *[^/]*?>/gi.test(val)) {
                        // Open tag
                        thisTag =
                            '<span key="1' +
                            key +
                            '" id="open-tag-' +
                            key +
                            `" class="tag tag-open draggable ${isDigit ? '' : 'd-none'}" contenteditable="false" suppressContentEditableWarning="true" style="--tag-color: ` +
                            bgColor +
                            ';">' +
                            thisTag +
                            "</span>";
                        // console.log(thisTag);
                        targetText = targetText.replace(val, thisTag);
                    } else {
                        // Close tag
                        thisTag =
                            '<span key="2' +
                            key +
                            '" id="close-tag-' +
                            key +
                            `" class="tag tag-close ${isDigit ? '' : 'd-none'}  draggable" contenteditable="false" suppressContentEditableWarning="true" style="--tag-color: ` +
                            bgColor +
                            ';">' +
                            thisTag +
                            "</span>";
                        targetText = targetText.replace(val, thisTag);
                    }
                }
            });
        }
        return targetText;
    };

    // console.log(document.querySelectorAll('.tag-close'));
    // console.log(document.querySelectorAll('.tag-open'));

    /* Removing the tags strings*/
    const replaceTextWithTagsTemp = (targetText, exculudeTags = []) => {
        //Added for not to show tags
        if (typeof exculudeTags == "string") exculudeTags = [exculudeTags];
        let bgColor, thisTag;
        let tagName = targetText.match(/(<([^>]+)>)/gi);
        if (tagName) {
            tagName = tagName.map((val, key) => {
                thisTag = val.replace(/[<>]|[</>]/g, "");
                if (exculudeTags.indexOf(thisTag) == -1) {
                    if (/<([0-9]+) *[^/]*?>/gi.test(val)) {
                        // Open tag
                        targetText = targetText.replace(val, "");
                    } else {
                        // Close tag
                        targetText = targetText.replace(val, "");
                    }
                }
            });
        }
        return targetText;
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
        targetText = targetText.replace(/&nbsp;/g, " ");
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
        /*replacedText = replaceTextWithTags(replacedText)
        if (targetContentEditable.current[id]?.current != null)
            targetContentEditable.current[id].current.innerHTML = replacedText*/
        updateTranslatedResponseSegment(id, "temp_target", replacedText);
        updateSegmentStatus(id, 101);
        changeEditedStatus(id, "unsaved");
        // highlightTmMismatch(id, selectedTranslationMatch.source)
        setTimeout(() => {
            //It helps to call after the segment update happened. Otherwise the old data will be updated
            updateTranslationById(null, id, true, { forceUpdate: true });
        }, 100);
    };

    /* Get the MT */
    const getMachineTranslation = (e) => {
        // console.log("comes heres");
        setTranslateSwitch(false)
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        // setPopoverOpen(false)
        let advanceToolbarOpenedForTm = false;
        showTmSectionFunction(false);
        let token = Config.userState.token;
        let segmentId = e.target.getAttribute("data-id");
        let segmentData = translatedResponse.find((element) => element.segment_id == segmentId);
        let thisSegmentTags = segmentData.target_tags;

        if (axiosMTRawTMAbortControllerRef.current) {
            axiosMTRawTMAbortControllerRef.current.abort()
        }

        const controller = new AbortController();
        axiosMTRawTMAbortControllerRef.current = controller 

        forcedLoaderRef.current = true
        setIsSegmentDataLoading(true)
        
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/mt_raw_and_tm/${segmentId}?mt_uc=true`,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                // console.log("workgin and cmg", response);
                lastCalledArgs.current.functionName = "getMachineTranslation";
                let translatedText = response.data.mt_raw;
                if (translatedText == undefined) {
                    translatedText = "" + thisSegmentTags;
                } else {
                    translatedText = translatedText + thisSegmentTags;
                }
                let replacedText = "";
                let segmentStatus = allSegmentStatuses.current[segmentId];
                if (isShowTags.current) replacedText = replaceTextWithTags(translatedText); //Hide for not to show tags
                else replacedText = replaceTextWithTagsTemp(translatedText); //Added for not to show tags
                // console.log(translatedText);
                console.log(replacedText);
                // console.log(targetFindTerm);

                if (targetFindTerm != "") {
                    let globalMatch, replaceFromRegExp;
                    let targetFindTermTemp = targetFindTerm;
                    // console.log(caseMatch);
                    if (!caseMatch) {
                        globalMatch = "gi";
                        targetFindTermTemp = targetFindTermTemp.toLowerCase();
                    } else globalMatch = "g";
                    // console.log(targetFindTermTemp);
                    targetFindTermTemp = targetFindTermTemp
                        .replace(/\+/g, " ")
                        .trim()
                        .split(" ")
                        .sort((a, b) => b.length - a.length);
                    // console.log(wholeWordMatch);
                    if (wholeWordMatch) replaceFromRegExp = new RegExp("\\b" + `(${targetFindTermTemp.join("|")})` + "\\b", globalMatch);
                    else replaceFromRegExp = new RegExp(`(${targetFindTermTemp.join("|")})`, globalMatch);
                    // console.log(replaceFromRegExp);
                    replacedText = replacedText.replace(replaceFromRegExp, (match) => '<mark contentEditable="false">' + match + "</mark>");
                }
                forcedLoaderRef.current = false
                setIsSegmentDataLoading(false)
                // console.log(replacedText);
                /*if (targetContentEditable?.current[segmentId]?.current != null)
                    targetContentEditable.current[segmentId].current.innerHTML = replaceTextWithTags(translatedText)*/

                // console.log(segmentId);
                // console.log(translatedText);
                if (response.data?.alert_msg == "MT Disabled") {
                    setShowMtDisabledModal(true)
                }
                console.log(translatedText);
                updateTranslatedResponseSegment(segmentId, "temp_target", translatedText);
                updateSegmentStatus(segmentId, 103);
                changeEditedStatus(segmentId, "unsaved");
                insertedDivIds.current.push(segmentId);
                setTimeout(() => {
                    updateTranslationById(null, segmentId, true, { forceUpdate: true });
                }, 100);
                if (response.data?.tm?.length) {
                    // If it has TM data, need to show it on the footer toolbar
                    setTranslationMatches(response.data.tm);
                    // if (segmentStatus == null || segmentStatus == 101 || segmentStatus == 103 || segmentStatus == 104 || segmentStatus == 105 || ) {
                    advanceToolbarOpenedForTm = true;
                    handleToggleVisibility(true);
                    // }
                }
            },
            error: (error) => {
                if (error.response?.data?.mt_alert) {
                    forcedLoaderRef.current = false
                    setIsSegmentDataLoading(false)

                    setShowCreditAlert(true);
                    if (!isAssignEnable) setCreditAlertTxt(t("insufficient_credit_contact"))
                    else setCreditAlertTxt(error.response?.data?.alert_msg);
                    // setTimeout(() => {
                    //     history("/file-upload");
                    // }, 4000);
                }
            },
        });
    };


    /* The :copyText will be copied to the clipboard */
    const copyText = (copyText = null) => {
        if (copyText != null) {
            /*if (navigator.clipboard && window.isSecureContext)
                navigator.clipboard.writeText(copyText)
            else {*/
            let textArea = document.createElement("textarea");
            textArea.value = copyText;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            setIsCopied(true)
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
            $(document).find('mark').remove()
        } */
        if (stateKey == "showDictionary") showDictionaryFunction();
        setStateKeyVal(stateKey);
        setShowFindReplace(false);
        setShowSpecialCharacters(false);
        setShowDictionary(false);
        switch (stateKey) {
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
            case "showGlossaryAddition": {
                setShowGlossaryAddition(!showGlossaryAddition);
                if(showGlossaryAddition){
                    setSourceSelectionText("")
                    setTargetSelectionText("")
                }
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


    const toggleIME = () => {
        setEnableIME(!enableIME);
    };

    // put curosr on the source segment but dont allow any kind of editing (keypress, pasting of content and drag and drop of contentx)
    const handleSourceSegmentClick = (e) => {
        // console.log(e);
        // disable when any of the checkbox is selected
        if (sourceTextDiv.current[focusedDivIdRef.current].current !== null) {
            // let pos = getHTMLCaretPosition(sourceTextDiv.current[focusedDivIdRef.current].current)
            // if(mergeSelectedSegmentIds?.length === 0 && pos){
            //     let firstSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(0, pos))
            //     let secondSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length))
            //     // console.log(pos);
            //     // console.log(replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)).slice(0, pos));
            //     // console.log(replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)).slice(pos, replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length)));

            if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                segmentIdRef.current = e.target.getAttribute('data-id')
                sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit')
                setDisbaleSplitIcon(false)
            }

            // }
            // let pos = getCaretPosition()
            // console.log(pos);
            // console.log(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.slice(0, pos));
            // console.log(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.length));

        }
    }

    const handleSourceSegmentBlur = (e) => {
        setDisbaleSplitIcon(true)
    }

    const handleTargetSegmentBlur = (e = null, id = null, isTemp = false, extraArgs = {}, temp_target, target) => {      
        if(isWorkspaceEditable){
            updateTranslationById(e, id, isTemp, extraArgs, temp_target, target)
        }
    }

    const handleSegmentSaveBtnClick = (e, id) => {
        if(isWorkspaceEditable){
            updateTranslationById(null, id)
        }
    } 


    const toggleSynonym = () => {
        setEnableSpellCheck(false)
        resetSynonymStates()
        toggleSpellCheckBtn.current?.classList?.remove("toolbar-list-icons-active");
        console.log(focusedDivIdRef.current)

        if(!focusedDivIdRef.current){
            targetContentEditable.current[translatedResponse[0]?.segment_id].current.focus();
        } 
        if (grammarPopoverOpen) {
            setGrammarPopoverOpen(false)
            setgrammarCheckPopoverTarget("")
            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                "mark"
            );
        } else {
            setSynonymPopoverOpen(false)
            setSynonymPopoverTarget("")
            setSynonymText("")
            targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                "mark"
            );
        }
        setEnableSynonym(!enableSynonym)
    }

    const toggleSegmentation = () => {
        // translatedResponse
        setSegmentation(!segmentation);
    };

    /* Highlight with mark tag for the Named Entity Remove */
    const nerHighlight = (highlight = true) => {
        if (highlight) {
            if (focusedDivIdRef.current != null) {
                /* let formData = new FormData()
                formData.append('src_lang_code', sourceLanguageCode)
                let sourceText = translatedResponse.find(element => element.segment_id == focusedDivIdRef.current)?.source
                formData.append('src_segment', sourceText)
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
        setGrammarPopoverOpen(false)
        setgrammarCheckPopoverTarget("")
        removeSpecificTag(value, "mark")
    }

    /* Find and replace inputs handling */
    const handleChange = (e, setFunction) => {
        if (e.target.name == "findArea") {
            if (e.target.value == "target") setShowReplaceSection(true);
            else setShowReplaceSection(false);
        }
        setFunction(e.target.type === "checkbox" ? e.target.checked : e.target.value);
    };

    // const usePrevious = (value) => {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = value;
    //     });
    //     return ref.current;
    // };

    /* Find the given term on the segments */
    const findTermFunction = () => {
        setFindTerm(findTerm);
        if (findArea == "" || findArea == null) {
            Config.toast(t("src_tar_find"), "error");
            return;
        }
        setSourceFindTerm("");
        setTargetFindTerm("");
        if (findArea == "target") {
            setTargetFindTerm(findTerm);
            // setShowReplaceSection(true)
        } else if (findArea == "source") {
            setSourceFindTerm(findTerm);
            // setShowReplaceSection(false)
        }
        setTimeout(() => {
            findTriggerCount.current = 0;
            findNext();
        }, 100);
    };

    /* Filtering by status and find the term */
    const filterWithFindTerm = (page = 1, callbackFunction = findTermFunction) => {
        let url = Config.BASE_URL + "/workspace_okapi/" + findArea + "/segments/filter/" + documentId + "?page=" + page;
        let formData = new FormData();
        if (findTerm == "") return;
        formData.append("search_word", findTerm);
        formData.append("match_case", caseMatch);
        formData.append("exact_word", wholeWordMatch);
        if (findStatus.length) formData.append("status_list", "[" + findStatus.toString() + "]");
        Config.axios({
            url: url,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                occurrenceData.current = response.data;
                occurrenceDataPage.current = page;
                occurrenceDataTotalPages.current = Math.ceil(response.data.count / 20);
                callbackFunction();
            },
        });
    };

    /* Whenever the filter query params changes, filter it again */
    // useEffect(() => {
    //     if (didMount) {
    //         if (new URLSearchParams(history.location.search).get("page") != null || new URLSearchParams(history.location.search).get("status")) {
    //             if (findStatus.length) filter();
    //         }
    //     }
    // }, [new URLSearchParams(history.location.search).get("page"), new URLSearchParams(history.location.search).get("status")]);

    /* Filter the segments by status */
    const segmentStatusFilter = (e = null) => {
        let url = Config.BASE_URL + "/workspace_okapi/source/segments/filter/" + documentId;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        let statusParam = URL_SEARCH_PARAMS.get("status")
        if (pageParam != null) {
            // console.log(pageParam);
            setCurrentPage(pageParam);
            url = `${Config.BASE_URL}/workspace_okapi/source/segments/filter/${documentId}?page=${pageParam}&page_size=${selectedPageSize?.value ? selectedPageSize?.value : pageSizeFromApi.current}`;
        }
        let formData = new FormData();
        /*if (findTerm != '')
            formData.append('search_word', findTerm)
        formData.append('match_case', caseMatch)
        formData.append('exact_word', wholeWordMatch)*/
        // console.log(findStatus)
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
                translatedResponseRef.current = response.data.results
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
        listSegments()
        // pageSelect(1);
        occurrenceData.current = null;
        findTriggerCount.current = 0;
        // let urlWithParam = removeParamFromUrl(['find', 'replace', 'find_area', 'match_case', 'whole_word'])
        // history(urlWithParam)
    };

    /* Remove a specific :param (s) from the url */
    const removeParamFromUrl = (param = []) => {
        let params = [];
        if (typeof param === "string") params.push(param);
        else params = param;
        let queryParams = new URLSearchParams(location.search);
        params.forEach((value) => {
            if (queryParams.has(value)) queryParams.delete(value);
        });
        return location.pathname + "?" + queryParams;
    };

    /* Find the previous segment */
    const findPrevious = () => {
        findIds.current.forEach((findId) => {
            if (document.getElementById("search-highlight-" + findId) != null)
                document.getElementById("search-highlight-" + findId).classList.remove("highlight-selected");
        });
        findTriggerCount.current -= 1;
        if (findIds.current.indexOf(findTriggerCount.current) != -1) {
            let element = document.getElementById("search-highlight-" + findTriggerCount.current);
            if (element) {
                element.classList.add("highlight-selected");
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            // All occurrences highlighted and no other occurrence remaining
            findTermPreviousPage();
        }
    };

    /* Find on the previous page */
    const findTermPreviousPage = () => {
        let minSegmentId = Math.min(...translatedResponse.map((element) => element.segment_id));
        if (occurrenceData.current?.results == null) return;
        let previousCurrentSegmentIds = Array.from(occurrenceData.current?.results, (element) => {
            if (element.segment_id < minSegmentId) return element.segment_id;
        });
        let nextPageSegmentIds = [...previousCurrentSegmentIds.filter(Boolean)];
        if (!nextPageSegmentIds?.length) {
            if (occurrenceDataPage.current > 1) filterWithFindTerm(occurrenceDataPage.current - 1, findTermPreviousPage);
            else findTriggerCount.current += 1;
            return;
        }
        let nextPageSegmentIdMax = Math.max(...previousCurrentSegmentIds.filter(Boolean));
        if (nextPageSegmentIdMax != null) {
            let statusList = [];
            if (findStatus.length) statusList = findStatus;
            else statusList = Object.keys(segmentStatuses);
            let data = JSON.stringify({ status_list: statusList });
            Config.axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: Config.BASE_URL + "/workspace_okapi/segment/get/page/filter/" + documentId + "/" + nextPageSegmentIdMax,
                method: "POST",
                auth: true,
                data: data,
                success: (response) => {
                    if (response.data?.page_id != null)
                    history("/workspace/" + documentId + "?page=" + response.data.page_id, {state: { findHighlightSegment: nextPageSegmentIdMax }});
                },
                error: (error) => { },
            });
        }
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
        let maxSegmentId = Math.max(...translatedResponse.map((element) => element.segment_id));
        if (occurrenceData.current?.results == null) return;
        let previousCurrentSegmentIds = Array.from(occurrenceData.current?.results, (element) => {
            if (element.segment_id > maxSegmentId) return element.segment_id;
        });
        let nextPageSegmentIds = [...previousCurrentSegmentIds.filter(Boolean)];
        if (!nextPageSegmentIds?.length) {
            if (occurrenceDataTotalPages.current != null) {
                if (occurrenceDataPage.current < occurrenceDataTotalPages.current) filterWithFindTerm(occurrenceDataPage.current + 1, findTermNextPage);
                else findTriggerCount.current -= 1;
            }
            return;
        }
        let nextPageSegmentIdMin = Math.min(...previousCurrentSegmentIds.filter(Boolean));
        if (nextPageSegmentIdMin != null) {
            let statusList = [];
            if (findStatus.length) statusList = findStatus;
            else statusList = Object.keys(segmentStatuses);
            let data = JSON.stringify({ status_list: statusList });
            Config.axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: Config.BASE_URL + "/workspace_okapi/segment/get/page/filter/" + documentId + "/" + nextPageSegmentIdMin,
                method: "POST",
                auth: true,
                data: data,
                success: (response) => {
                    if (response.data?.page_id != null)
                    history("/workspace/" + documentId + "?page=" + response.data.page_id, {state: { highlightFirstFindTerm: true }});
                },
                error: (error) => { },
            });
        }
    };

    /* Highlight with the mark tag */
    const highlightSearchText = (findTerm, text, caseMatch = false, wholeWordMatch = false) => {
        if (findTerm != "" && text != "") {
            let globalMatch, replaceFromRegExp;
            if (!caseMatch) {
                globalMatch = "gi";
                findTerm = findTerm.toLowerCase();
            } else globalMatch = "g";
            // findTerm = findTerm.replace(/\+/g, " ").trim().split(" ").sort((a, b) => b.length - a.length) // This will consider space separated words as different keyword
            findTerm = [findTerm.replace(/\+/g, " ").trim()];
            if (wholeWordMatch)
                replaceFromRegExp = new RegExp(
                    String.raw`(?:\B(?!\w)|\b(?=\w))(?:${findTerm.map((x) => x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})(?:(?<=\w)\b|(?<!\w)\B)`,
                    globalMatch
                );
            else replaceFromRegExp = new RegExp(String.raw`(?:${findTerm.map((x) => x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`, globalMatch);
            text = text.replace(replaceFromRegExp, "<mark>$&</mark>");
            return text;
        }
        return text;
    };

    /* Replace the find term with the replace term */
    const replace = () => {
        if (/^ *$/.test(replaceTerm)) {
            Config.toast(t("enter_term_replaced"), "error");
            return;
        }
        let element = document.getElementsByClassName("highlight-selected");
        // console.log(element);
        if (element.length !== 0) {
            let parent = null;
            if (element[0]) {
                element[0].innerHTML = replaceTerm;
                parent = element[0]?.parentNode;
                element[0].outerHTML = element[0].innerHTML;
            }
            if (parent) {
                let segmentId = parent.getAttribute("data-id");
                setTimeout(() => {
                    updateTranslationById(null, segmentId, !replaceConfirm);
                    setTimeout(() => {
                        // filterWithFindTerm()
                        findNext();
                    }, 200);
                }, 100);
                /*}*/
            }
        } else {
            filterWithFindTerm()
        }
    };

    /* Replace all the sements text with the given replacable text */
    const replaceAll = () => {
        if (/^ *$/.test(replaceTerm)) {
            Config.toast(t("enter_term_replaced"), "error");
            return;
        }
        let url = Config.BASE_URL + "/workspace_okapi/target/segments/filter/" + documentId;
        let formData = new FormData();
        formData.append("search_word", findTerm);
        formData.append("match_case", caseMatch);
        formData.append("exact_word", wholeWordMatch);
        formData.append("replace_word", replaceTerm);
        formData.append("do_confirm", replaceConfirm);
        Config.axios({
            url: url,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                if (response.data?.results != null) {
                    resetSearch();
                    Config.toast(t("all_segments_replaced"));
                    response.data.results.map((value) => {
                        updateSegmentStatus(value.segment_id, value.status);
                        if (value.status == 101 || value.status == 103 || value.status == 105) changeEditedStatus(value.segment_id, "unsaved");
                        else changeEditedStatus(value.segment_id, "saved");
                    });
                }
            },
            error: () => {
                Config.log("Inside replace all error function");
            },
        });
    };

    /* Update the segment status in the front-end itself  */
    const updateSegmentStatus = (segmentId = null, status = null) => {
        if (segmentId != null) {
            // console.log(segmentId)
            // console.log(status)
            allSegmentStatuses.current[segmentId] = status;
            setAllSegmentStatusState((prevState) => ({
                ...prevState,
                [segmentId]: status,
            }));
            translatedResponseRef.current = translatedResponseRef.current?.map((el) => (el.segment_id == segmentId ? { ...el, status: status } : el))
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
        // let selectedText = window.getSelection().anchorNode.data.substring( window.getSelection().anchorOffset,window.getSelection().extentOffset)
        let selectedText = window.getSelection().toString();
        // console.log(selectedText)
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
        scrollRight()
    };

    /* useEffect(() => {
        if (didMount) {
            dictionaryTabButton.current.click()
        }
    }, [wikipediaData, wiktionaryData, posData]) */

    /* Show the dictionary tab on the footer toolbar */
    const showDictionaryTab = () => {
        if (dictionaryTerm == "") {
            Config.toast(t("select_text"), "error");
        } else {
            setTimeout(() => {
                handleToggleVisibility(true);
            }, 100);
            /*Wikipedia call - start*/
            let url = `${Config.BASE_URL}/workspace_okapi/get_wikipedia/?doc_id=${documentId}&term=${encodeURI(dictionaryTerm)}&term_type=${dictionaryTermType}`;
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
            url = `${Config.BASE_URL}/workspace_okapi/get_wiktionary/?doc_id=${documentId}&term=${encodeURI(dictionaryTerm)}&term_type=${dictionaryTermType}`;
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
            formData.append("doc_id", documentId);
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

    /* Show the concordance data on the footer toolbar */
    const showConcoradance = () => {
        if (window.getSelection().anchorNode == null || window.getSelection().anchorNode.data == null) {
            Config.toast(t("select_text"), "error");
            return;
        }
        // let selectedText = window.getSelection().anchorNode.data.substring( window.getSelection().anchorOffset,window.getSelection().extentOffset)
        let selectedText = window.getSelection().toString();
        if (selectedText == "") {
            Config.toast(t("select_text"), "error");
            return;
        }
        let selectedSegmentId = window.getSelection().anchorNode.parentNode.getAttribute("data-id");

        let url = Config.BASE_URL + "/workspace_okapi/concordance/" + selectedSegmentId + "?string=" + encodeURI(selectedText);
        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                try{
                    showConcoradanceRef.current.classList.add("toolbar-list-icons-active");
                    handleToggleVisibility(true);
                    scrollLeft()
                    
                    response.data.map((value, index) => {
                        response.data[index].source = higlightText(value.source, selectedText);
                    });
                    setTimeout(() => {
                        setConcordanceData(response.data);
                    }, 100);
                }catch(e){
                    console.log(e)
                }
            },
            error: (error) => {
                Config.log(error);
            },
        });
    };

    /* Insert the special characters on the current focused contenteditable */
    const insertSpecialCharacter = (e) => {
        let specialCharacter = e.target.innerHTML;
        // to prevent the symbol insertion in source div
        if (document.activeElement !== sourceTextDiv.current[focusedDivIdRef.current].current) {  // it will check if source div is focused or not
            document.execCommand("insertText", false /*no UI*/, specialCharacter);
        }
    };

    /* Highlight the TM mismatch text with mark tag */
    const highlightTmMismatch = (segmentId, tmSource = "") => {
        let segmentData = translatedResponse.find((response) => response.segment_id == segmentId);
        let sourceText = segmentData.tagged_source;
        let thisIndex = translatedResponse.findIndex((response) => response.segment_id == segmentId);
        let formData = new FormData();
        formData.append("src", sourceText);
        formData.append("tm", tmSource);
        let url = Config.BASE_URL + "/tbxApp/source_tm_match/";
        Config.axios({
            url: url,
            auth: true,
            method: "POST",
            data: formData,
            success: (response) => {
                let mismatchData = response.data.res;
                if (mismatchData) {
                    let items = [...translatedResponse];
                    let item = { ...items[thisIndex] };
                    let replaceFromRegExp = "";
                    let text = sourceText;
                    mismatchData.map((val) => {
                        replaceFromRegExp = new RegExp("(" + val + ")(?!([^<]+)?>)", "g");
                        text = text.replace(replaceFromRegExp, (match) => "<mark>" + match + "</mark>");
                    });
                    // item.original = text
                    // items[thisIndex] = item
                    lastCalledArgs.current.functionName = "highlightTmMismatch";
                    updateTranslatedResponseSegment(segmentId, "tagged_source", text);
                    // setTranslatedResponse(items)
                }
            },
        });
    };

    /* For select2 changing the format with value and label */
    const makeSegmentStatusOptions = () => {
        let segmentStatusOptions = [];
        let allValues = Object.values(segmentStatuses);
        Object.keys(segmentStatuses).map((value, key) => {
            segmentStatusOptions.push({ value: value, label: allValues[key] });
        });
        setTimeout(() => {
            segmentStatusOptionsRef.current = segmentStatusOptions
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



    const handleClearFilter = () => {
        setSegmentStatusName([])
        setSelectedFindStatus(null)
        setFindStatus([])
        let url = `/workspace/${documentId}`
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != 0 && pageParam != null) url += `?page=${pageParam}`;
        else url += `?page=1`
        history(url);
    }

    /* Whenever selecting the set the findStatus values */
    const findStatusChange = (selectedOption) => {
        const { target: { value }, } = selectedOption;
        setSegmentStatusName(
            typeof value === 'string' ? value.split(',') : value,
        );
        // console.log(typeof value === 'string' ? value.split(',') : value)
        setSelectedFindStatus(value);
        lastCalledArgs.current.functionName = "findStatusChange";
        let findStatusTemp = [];
        if (value != null && value.length != 0) {
            value?.map((value) => {
                findStatusTemp.push(value.value);
            });
        }
        setTimeout(() => {
            setFindStatus(findStatusTemp);
        }, 100);
    };


    /* Show the segment comment section on the footer toolbar */
    const showCommentSection = (e) => {
        commentsTabButton.current?.click();
        scrollLeft()
        let segmentId = e.target.getAttribute("data-id");
        // targetContentEditable.current[segmentId].current.focus()
        lastCalledArgs.current.functionName = "showCommentSection";
        setTimeout(() => {
            // Outside click close the toolbar. Wait for the toolbar is to be closed
            handleToggleVisibility(true);
        }, 100);
        showSegmentComments(segmentId, true);
    };

    /* Show QA section in the footer toolbar */
    const showQaSection = (e) => {
        qaTabButton.current?.click();
        scrollLeft()
        let segmentId = e.target.getAttribute("data-id");
        // console.log(e.target);
        // console.log(segmentId);
        // targetContentEditable.current[segmentId].current.focus()
        lastCalledArgs.current.functionName = "showQaSection";
        handleToggleVisibility(true);
        showSegmentQa(segmentId);
    };

    /* Adding new segment comment(s) */
    const commentSubmit = (e) => {
        let commentTextarea = document.querySelector('#comments')
        let segmentId = focusedDivIdRef.current;
        let comment = commentTextArea.current.value;
        if (comment?.trim() == "") {
            Config.toast(t("type_comment"), "warning");
            return;
        }
        if (segmentId == "" || segmentId === null || segmentId === undefined) {
            Config.toast(t("select_segment"), "error");
            commentTextArea.current.value = "";
            return;
        }
        let formData = new FormData();
        formData.append("comment", comment);
        formData.append("segment", segmentId);
        let url = Config.BASE_URL + "/workspace_okapi/comment/";
        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                // Config.toast('Comment is added successfully')
                showSegmentComments(segmentId);
                if(commentTextArea.current){
                    commentTextArea.current.value = "";
                }
                commentTextarea.value = ""
                setTimeout(() => {
                    commentScrollingDivRef.current.scrollTop = commentScrollingDivRef.current.scrollHeight
                }, 200);
            },
            error: (err) => {
                console.log(err)
            }
        });
    };

    const commentEdit = (commentId) => {

        let segmentId = focusedDivIdRef.current;

        let comment = commentsDataCopy?.find(each => each.id === commentId)?.comment;
        if (comment?.trim() == "") {
            Config.toast(t("type_comment"), "warning");
            return;
        }
        if (segmentId == "") {
            Config.toast(t("select_segment"), "error");
            return;
        }

        let formData = new FormData();
        formData.append("comment", comment);
        formData.append("segment", segmentId);

        let url = `${Config.BASE_URL}/workspace_okapi/comment/${commentId}/`;
        Config.axios({
            url: url,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                // Config.toast('Comment is added successfully')
                showSegmentComments(segmentId);
                // commentTextArea.current.value = "";
            },
            error: (err) => {
                if (err.response.status === 403) {
                    Config.toast(t("permission_edit_comment"), 'warning')
                }
            }
        });
    };

    const handleCommentChange = (e, comment_id) => {
        let newArr = commentsDataCopy?.map(obj => {
            if (obj.id === comment_id) {
                return {
                    ...obj,
                    comment: e.target.value
                }
            }
            return obj
        })
        // console.log(newArr);
        setCommentsDataCopy(newArr)
    }

    const openCommentsEdit = (comment_id) => {
        let newArr = commentsData?.map(obj => {
            if (obj.id === comment_id) {
                return {
                    ...obj,
                    isEdit: true
                }
            }
            return obj
        })

        // console.log(newArr);
        setCommentsData(newArr)
    }

    const closeCommentsEdit = (comment_id) => {
        let newArr = commentsData?.map(obj => {
            if (obj.id === comment_id) {
                return {
                    ...obj,
                    isEdit: false
                }
            }
            return obj
        })

        // console.log(newArr);
        setCommentsData(newArr)
        setCommentsDataCopy(newArr)
    }


    const handleCommentEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            commentSubmit(e)
        }
    }

    /* Get and set all segment comments */
    const showSegmentComments = (segmentId, showLoader = false) => {
        segmentId = segmentId ? segmentId : focusedDivId
        if(!segmentId) return 

        if(showLoader){
            setCommentsData([])
            setCommentsLoader(true)
        }
        
        if (axiosCommentListAbortControllerRef.current) {
            axiosCommentListAbortControllerRef.current.abort()
        }
    
        const controller = new AbortController();
        axiosCommentListAbortControllerRef.current = controller
        
        let url = Config.BASE_URL + "/workspace_okapi/comment/?by=segment&id=" + segmentId;
        Config.axios({
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                setCommentsData(response.data);
                setCommentsDataCopy(response.data)
                setCommentsLoader(false)
                if (response.data?.length > 0) updateTranslatedResponseSegment(segmentId, "has_comment", true);
                else updateTranslatedResponseSegment(segmentId, "has_comment", false);
            },
            error: (err) => {
                if(err?.message !== "canceled") 
                    setCommentsLoader(false)
                setCommentsData([])
            }
        });
    };

    /* Delete a segment comment */
    const deleteComment = (e) => {
        let segmentId = focusedDivIdRef.current;
        let commentId = e.currentTarget.getAttribute("data-comment-id");
        let url = Config.BASE_URL + "/workspace_okapi/comment/" + commentId;
        Config.axios({
            url: url,
            auth: true,
            method: "DELETE",
            success: (response) => {
                // Config.toast('Comment is deleted successfully')
                showSegmentComments(segmentId);
            },
            error: (err) => {
                if (err.response.status === 403) {
                    Config.toast(t("permission_delete_comment"), 'warning')
                }
            }
        });
    };

    // useEffect(() => {
    //   console.log(qaData);
    // }, [qaData])


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
            // console.log("sarvesh: "+translatedText)
            // disable removemark tag
            if (!grammarPopoverOpen) {
                translatedText = removeSpecificTag(translatedText, "mark");
                translatedText = replaceTagsWithText(translatedText);
            } else {
                setGrammarPopoverOpen(false)
                setgrammarCheckPopoverTarget("")
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
                    errorNoteCount.current = 0
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
        // console.log(translatedResponse);
        setTranslatedResponse((prevTranslatedResponse) => prevTranslatedResponse?.map((el) => (el.segment_id == segmentId ? { ...el, [key]: value } : el)));
        translatedResponseRef.current = translatedResponseRef.current?.map((el) => (el.segment_id == segmentId ? { ...el, [key]: value } : el))
        // console.log(translatedResponse);
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
                        setGrammarPopoverOpen(false)
                        setgrammarCheckPopoverTarget("")
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
            } else {

            }
        }
        setAdvancedOptionVisibility(show);
    };

    /* Adding/Removing specific CSS classes to differentiate the active one */
    const highlightFocusedSegment = (segmentId) => {
        // console.log(segmentId)

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
        // console.log(newArr)
        setTranslatedResponse(newArr)

        // let workspaceRowDiv = "";
        // translatedResponse.map((value) => {
        //     workspaceRowDiv = targetContentEditable.current[value.segment_id].current.closest(".workspace-row");
        //     workspaceRowDiv.classList.remove("focused-row");
        // });
        // workspaceRowDiv = targetContentEditable.current[segmentId].current.closest(".workspace-row");
        // workspaceRowDiv.classList.add("focused-row");
    };

    const restoreTags = (e) => {
        if (targetContentEditable.current[focusedDivIdRef.current] == null) {
            Config.toast(t('select_segment'), "error");
            return;
        }
        if (targetContentEditable.current[focusedDivIdRef.current]?.current != null) {
            // targetContentEditable.current[focusedDivId].current.innerHTML = ''
            let segmentId = e.currentTarget.getAttribute("data-id");
            // console.log(segmentId);
            let targetTextContent = removeAllTags(replaceTagsWithText(targetContentEditable.current[focusedDivId].current.innerHTML))
            // console.log(targetTextContent);
            let segmentData = translatedResponse.find((element) => element.segment_id == segmentId);
            let thisSegmentTags = segmentData?.target_tags;
            // console.log(thisSegmentTags);
            let txt = `${targetTextContent}${(thisSegmentTags !== undefined || thisSegmentTags !== '') ? thisSegmentTags : ''}`
            // console.log(txt);
            let replacedText = replaceTextWithTags(txt);


            resetSynonymStates()

            setTimeout(() => {
                // updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", replacedText);
                // updateSegmentStatus(focusedDivIdRef.current, 103);
                // changeEditedStatus(focusedDivIdRef.current, "unsaved");

                targetContentEditable.current[focusedDivId].current.innerHTML = replacedText;
            }, 150);
        }
    }

    /* Delete the segment entered data by using the delete button */
    const deleteSegmentTranslation = (e) => {
        if (targetContentEditable.current[focusedDivIdRef.current] == null) {
            Config.toast(t('select_segment'), "error");
            return;
        }
        if (targetContentEditable.current[focusedDivIdRef.current]?.current != null) {
            targetContentEditable.current[focusedDivId].current.innerHTML = ''
            let segmentId = e.target.getAttribute("data-id");
            let segmentData = translatedResponse.find((element) => element.segment_id == segmentId);
            let thisSegmentTags = segmentData.target_tags;
            let txt = '' + (thisSegmentTags !== undefined || thisSegmentTags !== '') ? thisSegmentTags : ''
            let replacedText = replaceTextWithTags(txt);

            // console.log(replacedText)

            setShowParaphraseBtn(false)
            resetSynonymStates()

            setTimeout(() => {
                updateTranslatedResponseSegment(focusedDivIdRef.current, "temp_target", "");
                updateSegmentStatus(focusedDivIdRef.current, 105);
                changeEditedStatus(focusedDivIdRef.current, "unsaved");

                targetContentEditable.current[focusedDivId].current.innerHTML = replacedText;
            }, 150);
        }
    };


    /* Copy the source text to the target. This will remove old values and replace with the source text */
    const copySourceToTarget = () => {
        if (targetContentEditable.current[focusedDivIdRef.current] == null) {
            Config.toast(t('select_segment'), "error");
            return;
        }
        if (sourceTextDiv?.current[focusedDivIdRef.current]?.current != null) {
            if (targetContentEditable.current[focusedDivIdRef.current]?.current != null) {
                // targetContentEditable.current[focusedDivId].current.innerHTML = sourceTextDiv?.current[focusedDivId]?.current?.innerHTML
                setTimeout(() => {

                    var srcText = removeTagsWithClass(sourceTextDiv?.current[focusedDivIdRef.current]?.current?.innerHTML, 'mark', 'ner-highlight');

                    updateTranslatedResponseSegment(
                        focusedDivIdRef.current,
                        "temp_target",
                        replaceTagsWithText(srcText)
                    );
                    updateSegmentStatus(focusedDivIdRef.current, 105);
                }, 150);
            }
        }
    };

    /* Increase/decrease the font size for source language */
    const changeSourceLanguageFontSize = (action) => {
        if (action == "+") sourceLanguageFontSizeRef.current += 1;
        else if (action == "-") sourceLanguageFontSizeRef.current -= 1;
        if (sourceLanguageFontSizeRef.current >= allowedMinFontSize && sourceLanguageFontSizeRef.current <= allowedMaxFontSize) {
            setSourceLanguageFontSize(sourceLanguageFontSizeRef.current);
            saveFontSize(sourceLanguageFontSizeRef.current, sourceLanguageId);
        } else {
            if (action == "+") sourceLanguageFontSizeRef.current -= 1;
            else if (action == "-") sourceLanguageFontSizeRef.current += 1;
        }
    };

    /* Increase/decrease the font size for target language */
    const changeTargetLanguageFontSize = (action) => {
        if (action == "+") targetLanguageFontSizeRef.current += 1;
        else if (action == "-") targetLanguageFontSizeRef.current -= 1;
        if (targetLanguageFontSizeRef.current >= allowedMinFontSize && targetLanguageFontSizeRef.current <= allowedMaxFontSize) {
            setTargetLanguageFontSize(targetLanguageFontSizeRef.current);
            saveFontSize(targetLanguageFontSizeRef.current, targetLanguageId);
        } else {
            if (action == "+") targetLanguageFontSizeRef.current -= 1;
            else if (action == "-") targetLanguageFontSizeRef.current += 1;
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
                    pageSizeFromApi.current = response.data.page_size
                    setSelectedPageSize(pageSizeOption?.find(each => each.value === response.data.page_size))
                } else {
                    pageSizeFromApi.current = 20
                    setSelectedPageSize(pageSizeOption?.find(each => each.value === 20))
                }
            },
        });
    }

    const getSegmentDiff = () => {
        if (focusedDivId != '') {

            if (axiosSegmentHistoryAbortControllerRef.current) {
                axiosSegmentHistoryAbortControllerRef.current.abort()
            }
        
            const controller = new AbortController();
            axiosSegmentHistoryAbortControllerRef.current = controller

            setSegmentDifference([])
            setSegmentHistoryLoader(true)
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/segment_history/?segment=${focusedDivId}`,
                method: "GET",
                auth: true,
                ...(controller !== undefined && {signal: controller.signal}),
                success: (response) => {
                    // console.log(response.data)
                    setSegmentHistoryLoader(false)
                    setSegmentDifference(response.data)
                },
                error: (err) => {
                    setSegmentHistoryLoader(false)
                }
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
                documentProgressRef.current = responseTemp
                setConfirmedSegmentsCount(responseTemp.segments_confirmed_count);
                setTotalSegmentsCount(responseTemp.total_segment_count);
                if (responseTemp.total_segment_count == 0) setSegmentStatusPercentage(0);
                else setSegmentStatusPercentage(((responseTemp.segments_confirmed_count / responseTemp.total_segment_count) * 100).toFixed(2));
            },
            error: (err) => {

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
                    saveBtn.current[segmentId].current.style.color = '#0078D4'
                    break;
                }
                case "unsaved": {
                    notSavedStatus.current[segmentId].current.style.display = "block";
                    workspaceRow.current[segmentId].current.classList.add("unsaved-border");
                    savedStatus.current[segmentId].current.style.display = "none";
                    // saveBtn.current[segmentId].current.classList.remove("btn-primary", "check-unsaved-circle");
                    // saveBtn.current[segmentId].current.classList.add("unsaved-check-circle");
                    saveBtn.current[segmentId].current.style.color = '#E74C3C'
                    // console.log(saveBtn.current[segmentId].current);
                    break;
                }
                default: {
                    notSavedStatus.current[segmentId].current.style.display = "none";
                    workspaceRow.current[segmentId].current.classList.remove("unsaved-border");
                    savedStatus.current[segmentId].current.style.display = "none";
                    saveBtn.current[segmentId].current.style.color = '#5F6368'
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

    /* Setting focus and adding class for currently focusing contenteditable */
    const sourceSegmentClick = (e) => {
        // console.log(e);
        if (e.target.classList.contains("trigger-focus")) {
            let segmentId = e.target.getAttribute("data-id");


            if (sourceTextDiv?.current[segmentId]?.current) {
                if (document.activeElement != sourceTextDiv?.current[segmentId]?.current) {
                    sourceTextDiv.current[segmentId].current.focus();
                    let pos = getHTMLCaretPosition(sourceTextDiv.current[focusedDivIdRef.current].current)
                    if (mergeSelectedSegmentIds?.length === 0 && pos) {
                        let firstSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(0, pos))
                        let secondSeg = replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length))
                        // console.log(pos);
                        // console.log(firstSeg);
                        // console.log(secondSeg);
                        if (e.target.getAttribute('data-id') && e.target.getAttribute('source-data-text-unit')) {
                            segmentIdRef.current = e.target.getAttribute('data-id')
                            sourceTextUnitRef.current = e.target.getAttribute('source-data-text-unit')
                            setDisbaleSplitIcon(false)
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

    /* Sleep the line call for the given :milliseconds */
    const sleep = (milliseconds) => {
        const waitUntil = new Date().getTime() + milliseconds;
        while (new Date().getTime() < waitUntil) {
            // do nothing
        }
    };

    /* Handling react-joyride how to tour callback */
    const handleJoyrideCallback = (data) => {
        let { action, index, status, type } = data;
        let navDropDown = document.getElementById("download-dropdown-wrapper");
        
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            let secondSegmentId = translatedResponse[1]?.segment_id;
            if (secondSegmentId && isWorkspaceEditable) {
                if (index === 1 && focusedDivIdRef.current !== secondSegmentId) targetContentEditable.current[secondSegmentId].current.focus();
            } else {
                if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
                    // Update state to advance the tour
                    if (index === 5 && action === ACTIONS.NEXT) {
                        setTourStepIndex(index + 4);
                        if (typeof Cookies.get("isProductTourSeen") == "undefined")
                        Cookies.set("isProductTourSeen", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
                        return;
                    }
                }
            }
            if (navDropDown) {
                if (index === 4) {
                    // navDropDown.classList.add("tour-hover");
                    downloadTrigger?.current?.click();
                }
                // else if {
                //     (navDropDown.classList.contains("tour-hover")) navDropDown.classList.remove("tour-hover");
                // }
            }
            setTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
            if (typeof Cookies.get("isProductTourSeen") == "undefined")
            Cookies.set("isProductTourSeen", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
        } else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.IDLE].includes(status) || action === ACTIONS.CLOSE) {
            // Need to set our running state to false, so we can restart if we click start again.
            if (navDropDown) navDropDown.classList.remove("tour-hover");
            setIsProductTourSeen(true);
        }
        // console.log(tourStepIndex)

    };

    /* Product tour component */
    const BeaconComponent = React.forwardRef((props, ref) => <div ref={ref} className="d-none"></div>);

    /* Show the product how to tour */
    const showHowToTour = () => {
        setTourStepIndex(0);
        setIsProductTourSeen(false);
        if (isTagTourSeen === false) {
            setIsTagTourSeen(true)
        }
    };



    /* Check given :obj has consecutive numbers */
    const isSequceConsecutive = (obj) => Boolean(obj.reduce((output, lastest) => (output ? (Number(output) + 1 === Number(lastest) ? lastest : false) : false)));

    /* Check all the values in the :ilst are same */
    const areAllValuesSame = (list) => list.every((item) => list.indexOf(item) === 0);


    /* handling merge check box click */
    const mergeCheckboxSelect = (e) => {
        let segmentId = parseInt(e.target.getAttribute("data-id"));
        let segmentNumber = parseInt(e.target.getAttribute("data-segment-no"));
        let textUnit = parseInt(e.target.getAttribute("data-text-unit"));

        let segmentIds = [...mergeSelectedSegmentIds];
        let textUnits = selectedTextUnit.current;
        let segmentNos = mergeSelectedSegmentNos.current;

        if (e.target.checked) {
            segmentIds.push(segmentId);
            segmentNos.push(segmentNumber);
            textUnits.push(textUnit);
        } else {
            segmentIds = segmentIds.filter((element) => element !== segmentId);
            segmentNos = segmentNos.filter((element) => element !== segmentNumber);
            let removableIndex = textUnits.indexOf(textUnit);
            if (removableIndex !== -1) textUnits.splice(removableIndex, 1);
        }
        setMergeSelectedSegmentIds(segmentIds);
        mergeSelectedSegmentNos.current = segmentNos;
        selectedTextUnit.current = textUnits;
        /* Check for already merged segment- start */
        let isAlreadyMerged = false;
        let thisSegment = null;
        segmentIds.map((eachSegmentId) => {
            thisSegment = translatedResponse.find((element) => element.segment_id === eachSegmentId);
            Config.log(thisSegment);
            if (thisSegment.is_merged) isAlreadyMerged = true;
        });
        /* Check for already merged segment- end */
        /* Enabling merge icon - start */
        setIsShowMergeIcon(false);
        if (!isAlreadyMerged && areAllValuesSame(textUnits) && segmentIds.length > 1 && isSequceConsecutive(segmentNos.sort())) {
            setIsShowMergeIcon(true);
        } else if (segmentIds.length === 0) {
            selectedTextUnit.current = [];
        }
        /* Enabling merge icon - end */
        /* Enabling restrore icon - start */
        setIsShowRestoreSegmentIcon(false);
        if (segmentIds.length === 1) {
            let selectedSegment = translatedResponse.find((element) => element.segment_id === segmentIds[0]);
            if (selectedSegment.is_merged) setIsShowRestoreSegmentIcon(true);
        }
        /* Enabling restrore icon - end */
    };

    /* Merge the segments */
    const mergeSegments = () => {
        // mergeIcon.current.classList.add("toolbar-list-icons-active");
        let formData = new FormData();
        mergeSelectedSegmentIds?.forEach((segmentId) => {
            formData.append("segments", segmentId);
        });
        formData.append("text_unit", selectedTextUnit.current[0]);
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/merge/segment/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                isMergedRef.current = true
                resetMergeAndRestore();
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response?.data?.msg?.includes('already')) {
                        Config.toast(t('segment_split_err_3'), 'warning')
                    }
                    if (err.response?.data?.msg?.includes('parent')) {
                        Config.toast(t('segment_split_err_2'), 'warning')
                    }
                }
            }
        });
    };

    /* Restore the merged segments */
    const restoreSegments = () => {
        isRestoredRef.current = false
        restoreSegmentIcon.current.classList.add("toolbar-list-icons-active");
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/segment/restore/${mergeSelectedSegmentIds[0]}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                isRestoredRef.current = true
                resetMergeAndRestore();
            },
            error: (err) => {
                if (err?.response?.status === 500) {
                    setShowCreditAlertRedirection(true)
                }
            }
        });
    };

    // const handleScroll = (e) => {
    //     const position = e.target.scrollTop;
    //     currentScrollPosition.current = position
    //     console.log(position);
    // };

    // useEffect(() => {
    //     const output = document.querySelector(".workspace-editor-add-top");
    //     // console.log(output);
    //     output.addEventListener('scroll', handleScroll, { passive: true });
    //     return () => {
    //         output.removeEventListener('scroll', handleScroll);
    //     };
    // });

    // ===================================================================================================================

    function textNodesUnder(el) {
        var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) a.push(n);
        return a;
    }

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
                // console.log(range);
                const preCaretRange = range.cloneRange();
                // Select all textual contents from the contenteditable element
                // console.log(preCaretRange);
                preCaretRange.selectNodeContents(element);
                // And set the range end to the original clicked position
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                // Return the text length from contenteditable start to the range end
                // console.log(preCaretRange.toString());
                position = preCaretRange.toString().length;
            }
        }
        return position;
    }

    function getCaretPosition(node) {
        var range = window.getSelection().getRangeAt(0),
            preCaretRange = range.cloneRange(),
            caretPosition,
            tmp = document.createElement("div");

        preCaretRange.selectNodeContents(node);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        tmp.appendChild(preCaretRange.cloneContents());
        caretPosition = tmp.innerHTML.length;
        return caretPosition - 7;
    }



    function getHTMLCaretPosition(element) {
        var textPosition = getCaretIndex(element),
            htmlContent = element.innerHTML,
            textIndex = 0,
            htmlIndex = 0,
            insideHtml = false,
            htmlBeginChars = ['<'],
            htmlEndChars = ['>'];

        // console.log(textPosition)
        // console.log(htmlContent);

        if (textPosition == 0) {
            return 0;
        }

        while (textIndex < textPosition) {

            htmlIndex++;
            // console.log(htmlIndex);
            // check if next character is html and if it is, iterate with htmlIndex to the next non-html character
            while (htmlBeginChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
                // console.log('encountered HTML');
                // now iterate to the ending char
                insideHtml = true;

                while (insideHtml) {
                    if (htmlEndChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
                        if (htmlContent.charAt(htmlIndex) == '.' || htmlContent.charAt(htmlIndex) == ';') {
                            htmlIndex--; // entity is char itself
                        }
                        // console.log('encountered end of HTML');
                        insideHtml = false;
                    }
                    htmlIndex++;
                }
            }
            textIndex++;
        }

        // console.log(htmlIndex);
        // console.log(textPosition);
        // in htmlIndex is caret position inside html
        return htmlIndex;
    }

    function getCaretCharacterOffsetWithin(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
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


    /* split the segments */
    const splitSegment = () => {
        // console.log(window.getSelection());
        // console.log(sel.anchorOffset);
        // console.log(replaceTagsWithText(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML));

        // console.log(getHTMLCaretPosition(sourceTextDiv.current[focusedDivIdRef.current].current));
        isSplitRef.current = false
        let thisSegment = translatedResponse.find((element) => element.segment_id == segmentIdRef.current);

        if (thisSegment?.is_split) {
            Config.toast(t("segment_split_err_1"), 'warning')
            setDisbaleSplitIcon(true)
            return;
        }

        setSplitLoader(true)
        // let pos = getHTMLCaretPosition(sourceTextDiv.current[focusedDivIdRef.current].current)
        // let pos = getCaretPosition()
        // console.log(replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(0, pos)));
        // console.log(replaceTagsWithText(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length)));
        // console.log(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(0, pos));
        // console.log(unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML).length));

        // console.log(replaceTextWithTags(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML));
        // console.log(replaceTextWithTagsTemp(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML));
        let pos = getCaretPosition()
        let firstSeg = unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.slice(0, pos)
        let secondSeg = unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.slice(pos, unescape(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML)?.length)

        // console.log(pos);
        // console.log(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML?.slice(0, pos));
        // console.log(sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML?.slice(pos, sourceTextDiv.current[focusedDivIdRef.current].current.innerHTML?.length));

        // console.log(replaceTagsWithText(firstSeg));
        // console.log(replaceTagsWithText(secondSeg));
        // console.log(segmentIdRef.current);
        // console.log(sourceTextUnitRef.current);


        let formData = new FormData();
        formData.append("seg_first", replaceTagsWithText(firstSeg));
        formData.append("seg_second", replaceTagsWithText(secondSeg));
        formData.append("segment", segmentIdRef.current);
        formData.append("text_unit", sourceTextUnitRef.current);
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/split/segment/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                isSplitRef.current = true
                resetMergeAndRestore();
                setSplitLoader(false)
                setDisbaleSplitIcon(true)
            },
            error: (err) => {
                setSplitLoader(false)
                setDisbaleSplitIcon(true)
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('already')) {
                        Config.toast(t("segment_already_merged"), 'warning')
                    } else if (err.response.data?.msg?.includes('No text')) {
                        Config.toast(err.response.data?.msg, 'warning')
                    }
                }
            }
        });

    };

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

    // ===================================================================================================================

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
        listSegments()
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
            setIsProductTourSeen(true)
        }
    };

    /* Handling react-joyride tour callback */
    const handleTagTourCallback = (data) => {
        let { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            setTagTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.IDLE].includes(status) || action === ACTIONS.CLOSE) {
            // Need to set our running state to false, so we can restart if we click start again.
            if (index === 4) {
                setTagTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
            } else setIsTagTourSeen(true);
        }
    };

    const symSpellCheck = (segmentId) => {
        if(enableSpellCheck){
            let sentence_without_tags = removeSpecificTagWithContent(targetContentEditable.current[segmentId]?.current?.innerHTML, 'span')
            let sentence = unescape(removeSpecificTag(sentence_without_tags, 'mark'))
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

        if (targetContentEditable.current[segment_id].current?.innerText === '') return
        let content_editable_div = targetContentEditable.current[segment_id].current
        // console.log(content_editable_div)
        if(spellCheckResponseRef.current?.length !== 0 && content_editable_div){
            let words_list = spellCheckResponseRef.current?.map(each => {
                return each.word
            })

            var text = removeTagsWithClass(content_editable_div?.innerHTML, 'mark', 'spellcheck-highlight');
            var wordsToHighlight = words_list; // Array of words to highlight
            // console.log(wordsToHighlight)
            // console.log(text)
            // let highlightedHtml = ""
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
                        let uid = generateKey()
                        return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`
                    }
                );
    
                // console.log(highlightedHtml)
                content_editable_div.innerHTML = removeSpecificTag(highlightedHtml, 'font');
            }catch(e){
                console.log(e)
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
            arrow.classList.remove(arrowTop)
            arrow.classList.add(arrowBottom);
        }
        else {
            arrow.classList.remove(arrowBottom)
            arrow.classList.add(arrowTop);
        }
    }

    // Function to check if the mouse pointer is within the bounding box of the <mark> element
    function isMouseOverMark(event, ele) {
        if(ele === undefined || ele?.length === 0) return

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
        // console.log(targetContentEditable.current)
        if (targetContentEditable.current && focusedDivIdRef.current) {
            // console.log(targetContentEditable.current[focusedDivIdRef.current].current)
            const markTags = targetContentEditable.current[focusedDivIdRef.current].current?.querySelectorAll('.spellcheck-highlight');
            let isSpellCheckPopOpen = document.querySelector('#pop').style.visibility === 'visible' ? true : false
    
            const touchedMark = isMouseOverMark(e, markTags);
            if (isMouseOverMark(e, markTags) && !isSpellCheckPopOpen) {
                // Mouse pointer is touching the bounding box of a <mark> element
                for (const markElement of markTags) {
                    // tarDivRef.current.style.cursor = 'pointer'
                }
                // if(document.querySelector('#pop').style.visibility === 'hidden'){
                    clickedWrongWordRef.current = touchedMark
                    clickedMarkEleRef.current = touchedMark 
                    // console.log(touchedMark)

                    setRectElement(touchedMark)
                // }
                // console.log("Touched <mark> element:", touchedMarkText);
            } else {
                // Mouse pointer is not over any <mark> element
                if(markTags === undefined || markTags?.length === 0) return
                for (const markElement of markTags) {
                    clickedWrongWordRef.current = null
                    // tarDivRef.current.style.cursor = 'text'
                }
            }
        }
    }

    const setPopOnPosition = () => {
        // console.log("rect element "+rectElement)
        // console.log("rect ref "+clickedWrongWordRef.current)
        
        if(rectElement !== null) clickedWrongWordRef.current = rectElement
        if(clickedWrongWordRef.current !== null){
            // console.log(document.querySelector(`.workspace-editor`))
            let {element, rect} = clickedWrongWordRef.current
            rect = element?.getBoundingClientRect()
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
        // let x = rect.left + (rect.width) / 2 - document.querySelector('#pop').clientWidth / 2 + document.querySelector(`.workspace-editor`).scrollLeft;
        let x = rect.left - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector(`.workspace-editor`).scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#pop')?.clientWidth > document.querySelector(`.workspace-editor`)?.clientWidth)
            x = document.querySelector(`.workspace-editor`)?.clientWidth - document.querySelector('#pop')?.clientWidth;

        let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {

            y = rect.bottom - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().top + document.querySelector(`.workspace-editor`).scrollTop + 8
            dir = 'down';
        }
        else {
            y = rect.bottom - document.querySelector(`.workspace-editor`)?.getBoundingClientRect().top + document.querySelector(`.workspace-editor`).scrollTop + 8
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const handleWrongWordClick = (e) => {
        let clickedOverPop = e.target.closest('#pop') ? true : false
        let segment_id = e.target?.parentNode?.getAttribute('data-id')
        
        if(clickedWrongWordRef.current !== null && !clickedOverPop){
            let {element} = clickedWrongWordRef.current

            setPopOnPosition()

            let suggestions = spellCheckResponseRef.current?.find(each => each.word === element.innerText)?.suggestion

            try{
                let options_list = suggestions?.map((value, ind) => {
                    return (
                        <p
                            key={value}
                            className={"corrected-word "}
                            onClick={(e) => repalceWithSelectedSpellCheckSuggestedWord(value, segment_id, element)}
                        >
                            {value}
                        </p>
                    )
                })
                setSpellCheckSuggestion(options_list)
            }catch(e){
                console.log(e)
            }
            
        }else{
            // console.log(e.target)
            // don't close when clicked inside the #pop div
            if(e.target instanceof Element && !e.target?.closest('#pop')){
                document.querySelector('#pop').style.visibility = 'hidden';
                document.querySelector('#pop').style.opacity = '0';
                setRectElement(null)
                clickedWrongWordRef.current = null
            }
        }
    }

    
    const repalceWithSelectedSpellCheckSuggestedWord = (value, segment_id, element) => {
        let childMark = element
        childMark.innerHTML = value + " "

        document.querySelector('#pop').style.visibility = 'hidden';
        document.querySelector('#pop').style.opacity = '0';
        highlightSpellCheckWords(segment_id)
    }

    const checkTargetTextSelection = () => {
        // let selTxt = window.getSelection()?.toString()
        let selection = window.getSelection();
        if(selection?.toString()?.trim()?.length === 0) {
            setSelectedCoordinates(null)
            dispatch(setShowGlossTermAddForm(false))
            return
        } 
        let range = selection.getRangeAt(0);

        if(!isDinamalar){
            let selectionRect = range.getBoundingClientRect();
            dispatch(setShowGlossTermAddForm(false))
            setSelectedCoordinates(selectionRect)
        }

        let clonedSelection = range.cloneContents();
        let div = document.createElement('div');
        div.appendChild(clonedSelection);
        let selectedHTML = div.innerHTML;
        let selTxt = removeSpecificTagWithContent(selectedHTML, 'span')
        selTxt = removeSpecificTag(selTxt, 'mark')

        setTargetSelectionText(selTxt)
        if(window.getSelection().toString()?.trim() === '' || dictionaryTerm !== selTxt){
            showDictionaryRef.current?.classList.remove("toolbar-list-icons-active")
        }
    }


    const checkSourceTextSelection = () => {
        // let selTxt = window.getSelection()?.toString()
        // console.log(window.getSelection())
        // console.log(selTxt)
        let selection = window.getSelection();
        if(selection?.toString()?.trim()?.length === 0) {
            setSelectedCoordinates(null)
            dispatch(setShowGlossTermAddForm(false))
            return
        }
        let range = selection.getRangeAt(0);
        if(!isDinamalar){
            let selectionRect = range.getBoundingClientRect();
            dispatch(setShowGlossTermAddForm(false))
            setSelectedCoordinates(selectionRect)
        }

        let clonedSelection = range.cloneContents();
        let div = document.createElement('div');
        div.appendChild(clonedSelection);
        let selectedHTML = div.innerHTML;
        let selTxt = removeSpecificTagWithContent(selectedHTML, 'span')
        selTxt = removeSpecificTag(selTxt, 'mark')

        // console.log(selTxt)
        setSourceSelectionText(selTxt)
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
    const [imeOn, setImeOn] = useState(false)
    const [options, setOptions] = useState([])
    const [activeResult, setActiveResult] = useState(0)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [showImeSuggesstion, setShowImeSugessiton] = useState(false)
    const transliterateCompRef = useRef()
    const inputTransliterate = useRef(null)

    const imeRef = useRef(false)
    let shouldRenderSuggestions = true
    let showCurrentWordAsLastSuggestion = true
    let maxOptions = 5
    let lang = targetLanguageCode

    const handleIme = () => {
        setImeOn(!imeOn)
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
        console.log(data)
        setOptions(data);
    };

    const transliteration = async (word, config) => {
        const { numOptions: numOptions, showCurrentWordAsLastSuggestion: showCurrentWordAsLastSuggestion, lang: lang } = config || {
            numOptions: 5,
            showCurrentWordAsLastSuggestion: true,
            lang: targetLanguageCode
        };

        if (axiosTransliterationAbortControllerRef.current) {
            axiosTransliterationAbortControllerRef.current.abort()
        }

        const controller = new AbortController();
        axiosTransliterationAbortControllerRef.current = controller 

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
                document.execCommand("insertText", false, text + (space ? " " : ""))
            }else{
                document.execCommand("insertText", false, text + expression + (space ? " " : ""))
            }
           

        } else {
            if(expression == null){
                document.execCommand("insertText", false, text + (space ? " " : ""))
            }else{
                document.execCommand("insertText", false, text + expression + (space ? " " : ""))

            }
        }

        document.querySelector('.input-box-transliterate').innerHTML = ''
        setActiveResult(0)
        setOptions([])
        setShowImeSugessiton(false)
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


   let textRef = useRef('')
    const handeIMEKeyDownDiv = (e) => {

        var charCode = e.keyCode;
        // console.log(e.target.getBoundingClientRect())
      
        if (e.ctrlKey) {
            if (charCode == 39) {
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault()
                } 
            } else if (charCode == 37) {
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault()
                }
            }else if(charCode == 40 || charCode == 38 ){
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault()
                }
            }else{
                if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault()
                }
            }
        } else {
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
                if(charCode >= 112 && charCode <= 123) {

                    if(charCode == 113 || charCode == 115 || charCode == 119 || charCode == 120){
                        if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        return
                        }
                    }else{
                        if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                       handleDissapear()
                       return
                        }
                    }
                }
                
                if (getCaretPositions()?.x == 0 && getCaretPositions()?.y == 0) {
                    let rect = e.target.getBoundingClientRect()
                    setLeft(rect.left + window.pageXOffset + 10)
                    setTop(rect.top + window.pageYOffset)
                    if (window.innerHeight - (rect.top + window.pageYOffset) > (transliterateCompRef.current?.clientHeight + 50)) {

                    } else {
                        document.querySelector('.workspace-editor-add-top').scrollBy({
                            top: transliterateCompRef.current?.clientHeight,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    setLeft(window.innerWidth - getCaretPositions()?.x > (transliterateCompRef.current?.clientWidth + 50) ? getCaretPositions()?.x : (getCaretPositions()?.x - transliterateCompRef.current?.clientWidth))
                    setTop(getCaretPositions()?.y)
                }


                // console.log(window.innerHeight - getCaretPositions()?.y > (transliterateCompRef.current?.clientHeight + 50) ? getCaretPositions()?.y : (getCaretPositions()?.x - 5))
                if (window.innerHeight - getCaretPositions()?.y > (transliterateCompRef.current?.clientHeight + 50)) {

                } else {
                    // document.querySelector('.workspace-editor-add-top').scrollIntoView({
                    //     // top: transliterateCompRef.current?.clientHeight,
                    //     behavior: 'smooth'
                    // });
                    document.querySelector(".focused-row")?.scrollIntoView({ behavior: "smooth",block: 'nearest',
                    inline: 'center' });
                }

               
                let text = ''
                if (charCode == 8) {
                    if (inputTransliterate.current.innerText.length > 0) {
                        text = inputTransliterate.current.innerText.slice(0, -1);
                        textRef.current = inputTransliterate.current.innerText.slice(0, -1)
                        inputTransliterate.current.innerText = inputTransliterate.current.innerText.slice(0, -1); // 
                    
                        e.preventDefault()
                        renderSuggestions(textRef.current)
                        if(document.querySelector('.input-box-transliterate').innerText.length == 0){
                            handleDissapear()
                        }
                    } else {

                    }
                } else if(charCode >= 65 && charCode <= 90) {
                    setShowImeSugessiton(true)
                    text = inputTransliterate.current.innerText + e.key
                    textRef.current = inputTransliterate.current.innerText + e.key
                    inputTransliterate.current.innerText = inputTransliterate.current.innerText + e.key

                    e.preventDefault()
                    renderSuggestions(textRef.current)
                }else if(charCode >= 106 && charCode <= 111) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key)
                        e.preventDefault()
                       
                    }
                }else{
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    e.preventDefault()
                    }
                }
              


            }
            else {
                console.log(e)
                if(document.querySelector('.active-transliterate-result') === null) return
                
                if (charCode == 40) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        setActiveResult(activeResult == 4 ? 0 : activeResult + 1)
                        e.preventDefault()
                    } else {
                    }


                }else if(charCode >= 48 && charCode <= 57){
                    if (e.shiftKey && document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key)
                        e.preventDefault()
                    }else{
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,null)
                        e.preventDefault()
                    }
                }else if(charCode == 18){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        e.preventDefault()
                    }
                } else if (charCode == 46) {
                    // console.log('clicked')
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        e.preventDefault()
                    }
                } else if (charCode == 38) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        setActiveResult(activeResult == 0 ? 4 : activeResult - 1)
                        e.preventDefault()
                    } else {

                    }


                }else if((charCode >= 186 && charCode <= 222)){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,e.key)
                        e.preventDefault()
                    }
                } else if (charCode == 32) {
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText,null)
                        e.preventDefault()
                    } else {

                    }
                }else if (charCode == 13){
                    if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
                        insertTextAtCaret(document.querySelector('.active-transliterate-result').innerText, null, false)
                        e.preventDefault()
                    }
                } else if (charCode == 39) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault()
                    } 
                } else if (charCode == 37) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault()
                    }
                } else if (charCode == 16) {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                        e.preventDefault()
                    }
                }else {
                    if(document.querySelector('.input-box-transliterate').innerText.length != 0){
                    setShowImeSugessiton(false)
                    e.preventDefault()
                    }

                }
                return false;
            }
        }



        // inputTransliterate.current.innerText = inputTransliterate.current.innerText + e.key 

    }

    const handlePasteSelection = (e) => {

        if (document.querySelector('.input-box-transliterate').innerText.length != 0) {
            insertTextAtCaret(e.target.innerText,null)
            e.preventDefault()
        }
        e.preventDefault()
    }

    const handleDissapear = () => {
        document.querySelector('.input-box-transliterate').innerHTML = ''
        setOptions([])
        setActiveResult(0)
        setShowImeSugessiton(false)
    }

    const getWordChoiceListForDocument = () =>{
        Config.axios({
            url: `${Config.BASE_URL}/glex/word_choices_list/?task_id=${documentTaskIdRef.current}`,
            auth: true,
            success: (response) => {
                let list = response.data?.map(each => {
                    return {
                        label: each?.glossary_name,
                        value: each?.glossary_id
                    }
                })
                wordChoiceListRef.current = list
                setWordChoicelist(list)
                
                // get the selected wordchoice list for the project
                getSelectedWordChoice()
            },
            error: (error) => {},
        });
    } 

    const addTermToGlossary = (glossary_id) => {
        let formData = new FormData();

        let srcInputEle = glossarySrcFieldRef.current
        let tarInputEle = glossaryTarFieldRef.current
        if(srcInputEle?.value?.trim() === "" || tarInputEle?.value?.trim() === ""){
            if(srcInputEle?.value?.trim() === ""){
                srcInputEle.classList.add('error-field-style')
            }
            if(tarInputEle?.value?.trim() === ""){
                tarInputEle.classList.add('error-field-style')
            }
            return
        }

        if(isDinamalar){
            formData.append("sl_term", srcInputEle?.value);
            formData.append("tl_term", tarInputEle?.value);
        }else{
            formData.append("source", srcInputEle?.value);
            formData.append("target", tarInputEle?.value);
            formData.append("pos", selectedWordChoicePOS?.label ? selectedWordChoicePOS?.label : "");
            if(glossary_id){
                if(glossary_id) formData.append("glossary", glossary_id);
            }else{
                if(selectedWordChoiceItem?.value) formData.append("glossary", selectedWordChoiceItem?.value);
            }
        }
        formData.append("doc_id", documentId);

        let url = ''
        if(isDinamalar) url = `${Config.BASE_URL}/glex/default_glossary/`
        else url = `${Config.BASE_URL}/glex/term_save/`

        setIsTermAdding(true)


        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                // getWordChoiceListForDocument()
                setIsTermAdding(false)
                Config.toast(t("term_added_success"))
                showHideToolbarElement("showGlossaryAddition")
            },
            error: (error) => { 
                console.log(error)
                if(error?.response?.status == 400){
                    Config.toast(t("term_already_exist"),'warning');
                }else{
                    Config.toast("Failed to add term!", "error")

                }
                setIsTermAdding(false)
            },
        });
    } 

    const handleAddGlossaryTermBtn = () => {
        let srcTxt = sourceSelectionText?.trim()
        let tarTxt = targetSelectionText?.trim()
        // console.log("srcTxt: "+srcTxt)
        // console.log("tarTxt: "+tarTxt)
        if(window.getSelection()?.toString()?.trim()?.length === 0 || (srcTxt === "" && tarTxt === "")) {
            Config.toast('Select a term to add!', 'warning')
            return
        }
        showHideToolbarElement("showGlossaryAddition")
    } 

    const getNerTerms = (id) => {
        
        // console.log("isDinamalar: "+isDinamalar)
        // console.log("targetLanguage: "+sourceLanguage)
        if(!isDinamalar && sourceLanguage !== "English") return

        if(previousSegmentIdRef.current !== null && previousSegmentIdRef.current !== ""){
            let content_editable_div = sourceTextDiv.current[previousSegmentIdRef.current].current
            // console.log(content_editable_div)
            if(content_editable_div === null) return 
            var text = removeTagsWithClass(content_editable_div.innerHTML, 'mark', 'ner-highlight');
            content_editable_div.innerHTML = removeSpecificTag(text, 'font');
        }

        previousSegmentIdRef.current = id

        let formData = new FormData();
        let sourceText = translatedResponse.find(element => element.segment_id == id)?.source
        
        formData.append("text", sourceText);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/ner/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                highlightNerTerms(response.data?.ner)
            },
            error: (error) => {},
        });
    } 

    const highlightNerTerms = (nerResposne) => {

        if (sourceTextDiv.current[focusedDivIdRef.current].current.innerText === '') return
        
        let content_editable_div = sourceTextDiv.current[focusedDivIdRef.current].current
        if(nerResposne?.length !== 0){
            let words_list = nerResposne?.map(each => {
                return each
            })

            var text = removeTagsWithClass(content_editable_div.innerHTML, 'mark', 'ner-highlight');
            var wordsToHighlight = words_list; // Array of words to highlight
            
            try{
                // Generate regular expression pattern with all the words to highlight
                var pattern = new RegExp('\\b(' + wordsToHighlight.join('|') + ')\\b', 'g');
                var highlightedHtml = text.replace(
                    pattern, (match) => {
                        let uid = generateKey()
                        return `<mark data-word=${`"${match}"`} id=${`"ner-${uid}"`} class="ner-highlight" >${match}</mark>`
                    }
                );
                content_editable_div.innerHTML = removeSpecificTag(highlightedHtml, 'font');
            }catch(e){
                console.log(e)
            }
            

        }
    }

    // get the selected wordchoice list for the project and set the first selected wordchoice by default
    const getSelectedWordChoice = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${documentDetailsRef.current?.project}&option=word_choices`,
            auth: true,
            success: (response) => {
                let list = response.data
                if(list?.length === 0) {
                    // if there is no selected wordchoice for the project by default select the first wordchoice project
                    setSelectedWordChoiceItem(wordChoiceListRef.current[0])
                    return
                }
                // set the first selected wordchoice by default
                setSelectedWordChoiceItem(wordChoiceListRef.current?.find(each => parseInt(each?.value) === list[0]?.glossary) )
            },
        });
    };

    const getDefaultGlossDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/get_default_gloss?trans_project_id=${documentDetailsRef.current?.project}&task=${documentDetailsRef.current?.task_id}`,
            auth: true,
            success: (response) => {
                defaultGlossDetailsRef.current = response.data
            },
            error: (err) => {
                // setisGlossaryListLoading(false)
            }
        });
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
                showViewOnlyTag={true}
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
                listSegments={listSegments}
                mtEnable={mtEnable}
                docCreditCheckAlertRef={docCreditCheckAlertRef}
                showDocumentSubmitButton={showDocumentSubmitButton}
                handleDocumentSubmitBtn={handleDocumentSubmitBtn}
                showReturnRequestBtn={showReturnRequestBtn}
                isWorkspaceEditable={isWorkspaceEditable}
                clientResponseDataRef={clientResponseDataRef}
                showTaskAssignActionBtn={showTaskAssignActionBtn}
                setShowTaskAssignActionBtn={setShowTaskAssignActionBtn}
            />
            {
                showAiLoader && <MainAILoader background={"#ffffffba"} />
            }
            {/* <section className="top-section-part-fixed"> */}
            {showToolbarSection && (
                <section id="toolbar-section" className="toolbar-mega-section toolbar-parts-padd-top-add">
                    <div className="toolbar-part-section" ref={toolbarsRef} id="toolbars">
                        <div className="toolbar-part-container">
                            <div className="toolbar-list-align">
                                <ul>
                                    {/* <li onClick={(e) => copySourceToTarget()}>
                                        <Tooltip title="Copy content from source to target, without translating" placement="bottom" arrow>
                                            <div ref={copySourceToTargetRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg copy-to-target"></div>
                                            </div>
                                        </Tooltip>
                                    </li> */}
                                    {/* <li onClick={(e) => deleteSegmentTranslation()}>
                                        <Tooltip title="Delete target segment" placement="bottom" arrow>
                                            <div ref={deleteSegmentTranslationRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg eraser"></div>
                                            </div>
                                        </Tooltip>
                                    </li> */}
                                    {/* <li data-toggle="tooltip" title="Change font size" onClick={ e => changeFontSize('targetLanguageFontSize', '+') }>
                                                    <div className="toolbar-list-icons-align"><div className="toolbar-list-icon-bg format-size"></div></div>  
                                                </li> */}
                                    <li onClick={(e) => showHideToolbarElement("showFormatSize")}>
                                        <Tooltip title={t("change_font_size")} placement="bottom" arrow>
                                            <div ref={showFormatSizeRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg format-size"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                </ul>
                                <ul>
                                    <li onClick={(e) => showHideToolbarElement("showFindReplace")}>
                                        <Tooltip title={t("find_and_replace")} placement="bottom" arrow>
                                            <div ref={showFindReplaceRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg find-and-replace"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    <li onClick={(e) => showConcoradance()}>
                                        <Tooltip title={t("concordance_search")} placement="bottom" arrow>
                                            <div ref={showConcoradanceRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg search-off"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                </ul>
                                <ul>
                                    <li onClick={(e) => showHideToolbarElement("showDictionary")}>
                                        <Tooltip title={t("dictionaries_and_references")} placement="bottom" arrow>
                                            <div ref={showDictionaryRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg dictionary"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    
                                    {/* {isDinamalar &&  */}
                                        <li onClick={(e) => handleAddGlossaryTermBtn()}>
                                            <Tooltip title={t("add_glossary")} placement="bottom" arrow>
                                                <div ref={showGlossaryRef} className="toolbar-list-icons-align">
                                                    <div className="toolbar-list-icon-bg glossary"></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    {/* } */}
                                    <li onClick={(e) => showHideToolbarElement("showSpecialCharacters")}>
                                        <Tooltip title={t("special_characters")} placement="bottom" arrow>
                                            <div ref={showSpecialCharactersRef} className="toolbar-list-icons-align">
                                                <div className="toolbar-list-icon-bg omega"></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                    {/* <li onClick={e => showHideToolbarElement('showTags')}>
                                        <Tooltip TransitionComponent={Fade} title="Tags" placement="bottom" arrow enterDelay={500} leaveDelay={200}>
                                            <div ref={showTagsRef} className="toolbar-list-icons-align"><div className="toolbar-list-icon-bg">{'</>'}</div></div>
                                        </Tooltip>
                                    </li> */}
                                    {/* <li onClick={e => showHideToolbarElement('ner')}>
                                        <Tooltip TransitionComponent={Fade} title="NER" placement="bottom" arrow enterDelay={500} leaveDelay={200}>
                                            <div ref={nerRef} className="toolbar-list-icons-align"><div className="toolbar-list-icon-bg omega"></div></div>
                                        </Tooltip>
                                    </li> */}
                                    {/*<li><div className="toolbar-list-icons-align"><div className="toolbar-list-icon-bg note-add"></div></div></li>*/}
                                </ul>
                                {/* {showSpellCheckIcon && (
                                    <ul className="last-row-tools" onClick={toggleSpellcheck}>
                                        <li>
                                            <Tooltip title="Spell check" placement="bottom" arrow>
                                                <div ref={toggleSpellCheckBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg spellcheck " + (enableSpellCheck ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li onClick={(e) => showHideToolbarElement("showFindReplace")}>
                                            <Tooltip title="Find and Replace" placement="bottom" arrow>
                                                <div ref={showFindReplaceRef} className="toolbar-list-icons-align">
                                                    <div className="toolbar-list-icon-bg find-and-replace"></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                        <li onClick={(e) => showConcoradance()}>
                                            <Tooltip title="Concordance search" placement="bottom" arrow>
                                                <div ref={showConcoradanceRef} className="toolbar-list-icons-align">
                                                    <div className="toolbar-list-icon-bg search-off"></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li onClick={(e) => showHideToolbarElement("showDictionary")}>
                                            <Tooltip title="Dictionaries and References" placement="bottom" arrow>
                                                <div ref={showDictionaryRef} className="toolbar-list-icons-align">
                                                    <div className="toolbar-list-icon-bg dictionary"></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                        <li onClick={(e) => showHideToolbarElement("showSpecialCharacters")}>
                                            <Tooltip title="Special Characters" placement="bottom" arrow>
                                                <div ref={showSpecialCharactersRef} className="toolbar-list-icons-align">
                                                    <div className="toolbar-list-icon-bg omega"></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul> */}
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
                                {/* {showIME && (
                                    <ul className="last-row-tools-1" onClick={toggleIME}>
                                        <li>
                                            <Tooltip title={t("transliteration_typing")} placement="bottom" arrow>
                                                <div ref={toggleIMEBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg ime-editor " + (enableIME ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                )} */}
                                {targetLanguage === "English" && (
                                    <ul className="last-row-tools-1" onClick={toggleSynonym}>
                                        <li>
                                            <Tooltip title={t("synonym")} placement="bottom" arrow>
                                                <div ref={toggleSynonymBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg synonym " + (enableSynonym ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul>
                                )}
                                {/* Toggle to switch Sentente to Paragraph wised segmentations and vice versa */}
                                {/* <ul className="last-row-tools-1" onClick={toggleSegmentation}>
                                        <li>
                                            <Tooltip title="Segmentation switch" placement="bottom" arrow>
                                                <div ref={toggleIMEBtn} className="toolbar-list-icons-align toolbar-list-icons-disable">
                                                    <div className={"toolbar-list-icon-bg ime-editor " + (enableSpellCheck ? "active" : "")}></div>
                                                </div>
                                            </Tooltip>
                                        </li>
                                    </ul> */}
                                <ul>
                                    <Tooltip title={t("merge")} placement="bottom" arrow>
                                        <li className={!isShowMergeIcon ? "onclickdisable" : ""} onClick={mergeSegments}>
                                            <div ref={mergeIcon} className={'toolbar-list-icons-align' + (!isShowMergeIcon ? ' toolbar-list-icons-disable' : '')}>
                                                <img src={MergeNewBlack} />
                                            </div>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title={t("restore")} placement="bottom" arrow>
                                        <li className={!isShowRestoreSegmentIcon ? "onclickdisable" : ""} onClick={restoreSegments}>
                                            <div ref={restoreSegmentIcon} className={'toolbar-list-icons-align' + (!isShowRestoreSegmentIcon ? ' toolbar-list-icons-disable' : '')}>
                                                {/* <div className="toolbar-list-icon-bg split"></div> */}
                                                <ReplayOutlinedIcon className="restore-icon" />
                                            </div>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title={t("split")} placement="bottom" arrow>
                                        <li className={disbaleSplitIcon ? "onclickdisable" : ""} onClick={() => { !splitLoader && splitSegment() }}>
                                            <div className={'toolbar-list-icons-align' + (disbaleSplitIcon ? ' toolbar-list-icons-disable' : '')}>
                                                <img src={SplitNew} />
                                            </div>
                                        </li>
                                    </Tooltip>
                                </ul>
                                {supportedImeLanguage?.includes(targetLanguageCode) &&  <ul className="last-row-tools-1" onClick={handleIme}>
                                    <li>
                                        <Tooltip title="Transliteration typing" placement="bottom" arrow>
                                            <div ref={imeRef} className={"toolbar-list-icons-align toolbar-list-icons-disable" + (imeOn ? " toolbar-list-icons-active" : "")} style={{ border: 'none'}}>
                                                <div className={"toolbar-list-icon-bg ime-editor "}></div>
                                            </div>
                                        </Tooltip>
                                    </li>
                                </ul>}
                                {/* {webSpeechLang?.find(each => each.name?.toLowerCase() === targetLanguage?.toLowerCase()) && (
                                    <ul>
                                        <Tooltip title={isListening ? t("listening") : t("voice_typing")} placement="bottom" arrow>
                                            <li
                                                style={recognition.current !== null ? {} : { opacity: 0.7 }}
                                                onClick={(e) => toggleListening()}
                                            >
                                                <div ref={showDictionaryRef} className="toolbar-list-icons-align">
                                                    {isListening ? <SquareIcon style={{ color: '#E74C3C', padding: '4px' }} /> : <MicOutlinedIcon style={{ color: '#666666', fontSize: '22px' }} />}
                                                    <VoiceTyping
                                                        recognition={recognition}
                                                        isListening={isListening}
                                                        setIsListening={setIsListening}
                                                        recognizedText={recognizedText}
                                                        setRecognizedText={setRecognizedText}
                                                        targetLanguage={targetLanguage}
                                                    />
                                                </div>
                                            </li>
                                        </Tooltip>
                                    </ul>
                                )} */}

                            </div>
                            <div className="toolbar-filter-option">
                                <div className="pagesize-wrapper">
                                    <ReactSelect
                                        classNamePrefix="pagesize-select"
                                        value={selectedPageSize}
                                        styles={customPageSelectStyles}
                                        options={pageSizeOption}
                                        isSearchable={false}
                                        ref={pageSizeRef}
                                        defaultValue={{ value: 20, label: '20' }}
                                        onChange={(selectedOption) => setSelectedPageSize(selectedOption)}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                    />
                                    <span>{t("segments/page")}</span>
                                </div>
                                {/* <div className="confirm-all-btn">
                                        <ButtonBase className="buttonwwrap" onClick={() => setCompleteAllWrap(!completeAllWrap)}>
                                            <CheckCircleOutlineIcon className="complete"/>
                                            <KeyboardArrowDownIcon className="arrow"/>
                                        </ButtonBase>
                                        {
                                            completeAllWrap &&       
                                            <div ref={allSegmenswrapBtn} className="complete-all-btn">
                                                <ul>
                                                    <li  onClick={() => setCompleteAllWrap(false)}>Complete all segments</li>
                                                </ul>
                                            </div>
                                        }
                                    </div> */}
                                <div className="select-align">
                                    <Tooltip title={t("confirm_all_segments")} placement="top" arrow>
                                        <ButtonBase className="confirm-all-segments-btn" style={!isWorkspaceEditable ? { pointerEvents: 'none', opacity: 0.5, userSelect: 'none' } : {}} onClick={confirmAllsegments}>
                                            <div className="check-circle"></div>
                                        </ButtonBase>
                                    </Tooltip>
                                    {
                                        (!isFilterMenuOpen && segmentStatusName?.length !== 0) &&
                                        <span onMouseUp={() => handleClearFilter()} className="clr-filter">{t("clr_filter")}</span>
                                    }
                                    <Select
                                        // className={classes.selectBox}
                                        multiple
                                        displayEmpty
                                        sx={{
                                            height: 28,
                                            padding: "4px 2px",
                                            borderRadius: "2px",
                                            backgroundColor: "transparent",
                                            "&:hover, :focus": {
                                                backgroundColor: "#E8F0FE",
                                            },
                                            "& .MuiSelect-select.MuiSelect-select": {
                                                paddingRight: "20px !important",
                                                paddingLeft: 0,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                "&:focus": {
                                                    backgroundColor: "transparent",
                                                }
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "0px solid darkgrey",
                                                padding: 0,
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "#5F6368",
                                                fontSize: 20,
                                            },
                                        }}
                                        onOpen={() => setIsFilterMenuOpen(true)}
                                        onClose={() => setIsFilterMenuOpen(false)}
                                        value={segmentStatusName}
                                        onChange={findStatusChange}
                                        MenuProps={filterMenuProps}
                                        renderValue={(selected) => {
                                            return (
                                                <React.Fragment>
                                                    <div className="filter-icon-row">
                                                        <FilterAltOutlinedIcon className={selected?.length !== 0 ? "filter-icon-active" : "filter-icon"} />
                                                        {
                                                            selected?.length !== 0 &&
                                                            <span className="icon-ball">{selected?.length}</span>
                                                        }
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }}
                                    >
                                        {segmentStatusOptions?.map((segmentStatus) => (
                                            <MenuItem className="workspaceMenuItem" key={segmentStatus.value} value={segmentStatus}>
                                                <Checkbox
                                                    size="small"
                                                    checked={segmentStatusName?.indexOf(segmentStatus) > -1}
                                                />
                                                <p className="filter-text">{segmentStatus.label}</p>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="languages-info-part">
                            <div className="workspace-row-container">
                                <div className="workspace-language-info-row">
                                    <div className="workspace-language-info-col">
                                        <p className="workspace-source-language-txt">{sourceLanguage}</p>
                                    </div>
                                    <div className="workspace-language-info-col">
                                        <img src={Config.HOST_URL + "assets/images/new-ui-icons/new_arrow_right_alt_color.svg"} alt="arrow-color" />
                                    </div>
                                    <div className="workspace-language-info-col">
                                        <p className="workspace-target-language-txt">{targetLanguageScript}</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </section>
            )}
            {/* </section> */}
            {showFindReplace && (
                <div className="toolbar-parts">
                    <div className="toolbar-part-container">
                        <div className="form-section find-and-replace-cont">
                            <div className="find-and-replace-row">
                                <div className="find-and-replace-bottom-left-part">
                                    <div className="find-and-replace-top-left">
                                        <div className="form-checkbox-align">
                                            <div className="form-group form-check">
                                                <input
                                                    ref={findSourceRef}
                                                    type="radio"
                                                    name="findArea"
                                                    className="form-check-input"
                                                    id="find-source"
                                                    value="source"
                                                    checked={findArea == "source"}
                                                    onChange={(e) => handleChange(e, setFindArea)}
                                                />
                                                <label className="form-radio-label" htmlFor="find-source">
                                                    {t("source")}
                                                </label>
                                            </div>
                                            <div className="ml-3 form-group form-check">
                                                <input
                                                    ref={findTargetRef}
                                                    type="radio"
                                                    name="findArea"
                                                    className="form-check-input"
                                                    id="find-target"
                                                    value="target"
                                                    checked={findArea == "target"}
                                                    onChange={(e) => handleChange(e, setFindArea)}
                                                />
                                                <label className="form-radio-label" htmlFor="find-target">
                                                    {t("target")}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group findandreplacealign">
                                            <input
                                                ref={findTermRef}
                                                type="text"
                                                name="findTerm"
                                                id="find-term"
                                                placeholder={t("find")}
                                                value={findTerm}
                                                onChange={(e) => handleChange(e, setFindTerm)}
                                            />
                                        </div>
                                        {showReplaceSection && (
                                            <div className="form-group findandreplace-txtbox-align">
                                                <input
                                                    ref={replaceTargetRef}
                                                    type="text"
                                                    name="replaceTerm"
                                                    placeholder={t("replace_with")}
                                                    id="replace-target"
                                                    value={replaceTerm}
                                                    onChange={(e) => handleChange(e, setReplaceTerm)}
                                                />
                                            </div>
                                        )}
                                        {findTerm != "" && (
                                            <>
                                                <div className="arrow-align">
                                                    <div className="up-arrow" onClick={(e) => findPrevious()}>
                                                        <i className="fas fa-angle-up"></i>
                                                    </div>
                                                    <div className="down-arrow" onClick={(e) => findNext()}>
                                                        <i className="fas fa-angle-down"></i>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="find-and-replace-bottom-left">
                                        <div className="form-checkbox-align">
                                            <div className="form-group form-check">
                                                <input
                                                    ref={caseMatchRef}
                                                    type="checkbox"
                                                    name="caseMatch"
                                                    className="form-check-input"
                                                    id="case-match"
                                                    checked={caseMatch}
                                                    onChange={(e) => handleChange(e, setCaseMatch)}
                                                />
                                                <label className="form-check-label" htmlFor="case-match">
                                                    {t("match_case")}
                                                </label>
                                            </div>
                                            <div className="ml-4 form-group form-check">
                                                <input
                                                    ref={wholeWordMatchRef}
                                                    type="checkbox"
                                                    name="wholeWordMatch"
                                                    className="form-check-input"
                                                    id="whole-word-match"
                                                    checked={wholeWordMatch}
                                                    onChange={(e) => handleChange(e, setWholeWordMatch)}
                                                />
                                                <label className="form-check-label" htmlFor="whole-word-match">
                                                    {t("whole_word")}
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            // new URLSearchParams(history.location.search).get('find') != null &&
                                            <>
                                                <span type="button" className="reset-link" onClick={(e) => resetSearch()}>
                                                    <span className="reset-icon"></span> {t("clear_search")}
                                                </span>
                                            </>
                                        }
                                        {occurrenceData.current?.count != null && (
                                            <span className="segment-matches-found">
                                                {t("matches_found_in")}:{" "}
                                                <span>
                                                    {occurrenceData.current.count} Segment{occurrenceData.current.count > 1 ? "s" : ""}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="find-and-replace-bottom-right-part">
                                    <div className="find-and-replace-top-left">
                                        <div className="toolbar-btn-align">
                                            <ButtonBase className="ml-3">
                                                <div className="find-and-replace-btn find-btn" onClick={(e) => filterWithFindTerm()}>
                                                    <img className="magnifier-glass" src={NewMagnifier} />
                                                    {t("find")}
                                                </div>
                                            </ButtonBase>
                                            {showReplaceSection && findTerm != "" && (
                                                <>
                                                    {/* <input type="checkbox" id="replace-confirm" name="replaceConfirm" onChange={ e => handleChange(e, setReplaceConfirm) } value={replaceConfirm} />
                                                                    <label htmlFor="replace-confirm">Confirm while replacing</label> */}
                                                    <ButtonBase className="ml-3">
                                                        <div className="find-and-replace-btn" onClick={(e) => replace()}>
                                                            {t("replace")}
                                                        </div>
                                                    </ButtonBase>
                                                    <ButtonBase className="ml-3">
                                                        <div className="find-and-replace-btn" onClick={(e) => replaceAll()}>
                                                            {t("replace_all")}
                                                        </div>
                                                    </ButtonBase>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="find-and-replace-bottom-left">
                                        <div className="ml-3 form-checkbox-align">
                                            <div className="form-group form-check">
                                                {showReplaceSection && findTerm != "" && (
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            id="replace-confirm"
                                                            name="replaceConfirm"
                                                            className="form-check-input"
                                                            onChange={(e) => handleChange(e, setReplaceConfirm)}
                                                            value={replaceConfirm}
                                                        />
                                                        <label className="form-check-label" htmlFor="replace-confirm">
                                                            {t("confirm_and_replace")}
                                                        </label>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="find-and-replace-close-btn" onClick={(e) => showHideToolbarElement("showFindReplace")}>
                            &#x2715;
                        </div>
                    </div>
                </div>
            )}
            <section className={"workspace-editor workspace-editor-add-top " + workspaceAreaClassName}>
                
                {!isSegmentPageLoading ? (
                    <div className="workspace-container">
                        <div className="workspace-wrap">
                            {projectName && (
                                <div className="workspace-editor-comp-logo">
                                    <h3>{projectName}</h3>
                                </div>
                            )}

                            {isSegmentLoading ? (
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
                                    <img src={NoSegmentIcon} />
                                    <p>{t("no_segments_has_been_found")}</p>
                                </div>
                            ) : (
                                <form className="workspace-form">
                                    <ul id="workspace" className="display" ref={contentEditableParentRef}>
                                        {
                                            translatedResponse?.map((translation, key) => {
                                                // console.log(translation);
                                                if (key == 0) {
                                                    // Reset the values whenever renders
                                                    findIds.current = [];
                                                    uniqueFindIdNumber.current = 0;
                                                }
                                                // console.log(translatedResponse[key]);
                                                id = translatedResponse[key].segment_id;
                                                textUnit = translation?.text_unit;
                                                segmentNo = translatedResponse[key].segment_count;
                                                hasComment = translatedResponse[key].has_comment;
                                                sourceOriginal = translatedResponse[key].tagged_source;
                                                translation = translatedResponse[key].temp_target ? translatedResponse[key].temp_target : "";
                                                savedTranslation = translatedResponse[key].target ? translatedResponse[key].target : "";
                                                machineTranslatedText = translation;
                                                
                                                // console.log("===================temp-target===============");
                                                // console.log(translation);
                                         
                                                if (isShowTags.current) {
                                                    translation = replaceTextWithTags(translation, "mark"); //Hide for not to show tags
                                                    savedTranslation = replaceTextWithTags(savedTranslation); //Hide for not to show tags
                                                } else {
                                                    translation = replaceTextWithTagsTemp(translation, "mark"); //Added for not to show tags
                                                    savedTranslation = replaceTextWithTagsTemp(savedTranslation); //Added for not to show tags
                                                }
                                                if (targetFindTerm != "") {
                                                    targetFindTermTemp = targetFindTerm;
                                                    if (!caseMatch) {
                                                        globalMatch = "gi";
                                                        targetFindTermTemp = targetFindTerm.toLowerCase();
                                                    } else globalMatch = "g";
                                                    targetFindTermTemp = targetFindTermTemp.replace(/\+/g, " ").trim();
                                                    if (wholeWordMatch)
                                                        replaceFromRegExp = new RegExp(String.raw`(?:\B(?!\w)|\b(?=\w))(${targetFindTermTemp})(?!([^<]+)?>)(?:(?<=\w)\b|(?<!\w)\B)`, globalMatch);
                                                    else replaceFromRegExp = new RegExp("(" + targetFindTermTemp + ")(?!([^<]+)?>)", globalMatch);
                                                    translation = translation.replace(replaceFromRegExp, (match) => {
                                                        uniqueFindIdNumber.current += 1;
                                                        findIds.current.push(uniqueFindIdNumber.current);
                                                        if (findHighlightSegment.current == id) finalHighlightId.current = uniqueFindIdNumber.current;
                                                        return (
                                                            '<mark contentEditable="true" suppressContentEditableWarning="true" class="search-highlight search-highlight-target" id="search-highlight-' +
                                                            uniqueFindIdNumber.current +
                                                            '">' +
                                                            match +
                                                            "</mark>"
                                                        );
                                                    });
                                                }
                                                if (isShowTags.current) sourceText = replaceTextWithTags(sourceOriginal, "mark"); //Hide for not to show tags
                                                else sourceText = replaceTextWithTagsTemp(sourceOriginal, "mark"); //Added for not to show tags
                                                if (sourceFindTerm != "") {
                                                    sourceFindTermTemp = sourceFindTerm;
                                                    if (!caseMatch) {
                                                        globalMatch = "gi";
                                                        sourceFindTermTemp = sourceFindTermTemp.toLowerCase();
                                                    } else globalMatch = "g";
                                                    sourceFindTermTemp = sourceFindTermTemp.replace(/\+/g, " ").trim();
                                                    if (wholeWordMatch)
                                                        replaceFromRegExp = new RegExp(String.raw`(?:\B(?!\w)|\b(?=\w))(?:${sourceFindTermTemp})(?!([^<]+)?>)(?:(?<=\w)\b|(?<!\w)\B)`, globalMatch);
                                                    else replaceFromRegExp = new RegExp("(" + sourceFindTermTemp + ")(?!([^<]+)?>)", globalMatch);
                                                    sourceText = sourceText.replace(replaceFromRegExp, (match) => {
                                                        uniqueFindIdNumber.current += 1;
                                                        findIds.current.push(uniqueFindIdNumber.current);
                                                        if (findHighlightSegment.current == id) finalHighlightId.current = uniqueFindIdNumber.current;
                                                        return (
                                                            '<mark contentEditable="true" suppressContentEditableWarning="true" class="search-highlight search-highlight-source" id="search-highlight-' +
                                                            uniqueFindIdNumber.current +
                                                            '">' +
                                                            match +
                                                            "</mark>"
                                                        );
                                                    });
                                                }


                                                // --------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                                const restoreMTTranslation = () => {
                                                    // console.log(targetContentEditable.current[focusedDivId].current)
                                                    if (targetContentEditable.current[focusedDivId].current.innerHTML.trim().length === 0) {
                                                        // console.log("sarvesh "+translation)
                                                        targetContentEditable.current[focusedDivId].current.innerHTML = translation
                                                        setShowParaphraseBtn(true)
                                                        resetSynonymStates()
                                                    }
                                                }

                                                if (document.querySelectorAll('.tag-close')) {
                                                    let closeTag = document.querySelectorAll('.tag-close')
                                                    closeTag?.forEach(each => {
                                                        each.contentEditable = 'false'
                                                    })
                                                }
                                                if (document.querySelectorAll('.tag-open')) {
                                                    let openTag = document.querySelectorAll('.tag-open')
                                                    openTag?.forEach(each => {
                                                        each.contentEditable = 'false'
                                                    })
                                                }

                                                // --------------------------------------------------------------------------------------------------------------------------------------------------------------------


                                                // console.log(translation);
                                                // console.log(replaceTagsWithText(translation))
                                                return (
                                                    <li key={id} onClick={() => !isWorkspaceEditable && highlightFocusedSegment(translatedResponse[key].segment_id)}>
                                                        {/* {console.log("-1")} */}
                                                        <div style={!isWorkspaceEditable ? { pointerEvents: 'none' } : {}} className={'segment-checkbox ' + (mergeSelectedSegmentIds.indexOf(id) !== -1 ? 'selected-box' : mergeSelectedSegmentIds?.length !== 0 ? "segment-checkbox-show-all" : "")}>
                                                            <input type="checkbox" id={'workSpaceSegment' + id} data-id={id} data-segment-no={segmentNo} data-text-unit={textUnit} onChange={mergeCheckboxSelect} checked={mergeSelectedSegmentIds.indexOf(id) !== -1} />
                                                            <label style={mergeSelectedSegmentIds?.length !== 0 ? (translatedResponse[key].sameTxtUnit ? {} : { opacity: 0.3, pointerEvents: 'none' }) : {}} className="segment-checkbox-label" htmlFor={'workSpaceSegment' + id}></label>
                                                        </div>
                                                        <div
                                                            ref={workspaceRow.current[id]}
                                                            className={"workspace-row " +
                                                                (mergeSelectedSegmentIds.indexOf(id) !== -1 ? "segmentbgchange " : " ") +
                                                                ((allSegmentStatusState[id] == 101 || allSegmentStatusState[id] == 103 || allSegmentStatusState[id] == 105 || allSegmentStatusState[id] == 109) ?
                                                                    "unconfirmed-segment"
                                                                    : (allSegmentStatusState[id] == 102 || allSegmentStatusState[id] == 104 || allSegmentStatusState[id] == 106 || allSegmentStatusState[id] == 110) ?
                                                                        "confirmed-segment" : "") + (translatedResponse[key].isFocused ? " focused-row" : "")
                                                            }
                                                            data-id={id}
                                                        >
                                                            <div className="src-lang-part trigger-focus" data-id={id} onClick={(e) => isWorkspaceEditable && sourceSegmentClick(e)}>
                                                                <div className="src-workspace-align trigger-focus" data-id={id} style={translatedResponse[key].isFocused ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }} >
                                                                    <div
                                                                        contentEditable={isWorkspaceEditable ? true : false}
                                                                        ref={sourceTextDiv.current[id]}
                                                                        className={rightAlignLangs.current.indexOf(sourceLanguage) != -1 ? "source-text-div align-right" : "source-text-div"}
                                                                        id={"source-text-div-" + id}
                                                                        data-id={id}
                                                                        style={sourceLanguageFontSize != null ? { fontSize: sourceLanguageFontSize } : {}}
                                                                        onFocus={(e) => contentEditableFocus(e, translatedResponse[key].status)}
                                                                        onClick={(e) => isWorkspaceEditable && handleSourceSegmentClick(e)}
                                                                        onBlur={(e) => isWorkspaceEditable && handleSourceSegmentBlur(e)}
                                                                        onKeyDown={(e) => e.preventDefault()}
                                                                        onChange={(e) => e.preventDefault()}
                                                                        onPaste={(e) => e.preventDefault()}
                                                                        onDrop={(e) => e.preventDefault()}
                                                                        onCut={(e) => e.preventDefault()}
                                                                        onCopy={(e) => isDinamalar && e.preventDefault()}
                                                                        onSelect={() => debounceApiCall(checkSourceTextSelection)}
                                                                        source-data-text-unit={textUnit}
                                                                        suppressContentEditableWarning={true}
                                                                        spellCheck="false"
                                                                    >
                                                                        {parse(sourceText)}
                                                                    </div>
                                                                    {segmentNo != null && (
                                                                        <div>
                                                                            <div className="segment-align justify-content-between">
                                                                                <div className="source-div-info">
                                                                                    <Tooltip title={t("segment_id") + " " + id} placement="top" arrow>
                                                                                        <span className="segment-number">{segmentNo}</span>
                                                                                    </Tooltip>
                                                                                    {translatedResponse[key].is_split &&
                                                                                        <Tooltip title={t("splitted_segment")} placement="top" arrow>
                                                                                            <span className="segment-number">
                                                                                                <img src={SplitNew} />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    {translatedResponse[key].is_merged &&
                                                                                        <Tooltip title={t("merged_segement")} placement="top" arrow>
                                                                                            <span className="segment-number">
                                                                                                <img src={MergeNewBlack} />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                </div>
                                                                                <div className="source-div-icon">
                                                                                    {/* {(targetContentEditable.current[id]?.current?.innerText == "" && mtEnable) && ( */}
                                                                                        <Tooltip title={t("replace_content_with_mt_tooltip")} placement="top" arrow>
                                                                                            <a
                                                                                                type="button"
                                                                                                className={
                                                                                                    "get-machine-translate-btn"
                                                                                                }
                                                                                                data-id={id}
                                                                                                style={!isWorkspaceEditable ? { pointerEvents: 'none' } : {}}
                                                                                                onClick={isWorkspaceEditable ? (e) => { getMachineTranslation(e); restoreMTTranslation() } : () => {}}
                                                                                            >
                                                                                                <div data-id={id} className="translate"></div>
                                                                                            </a>
                                                                                        </Tooltip>
                                                                                    {/* )} */}
                                                                                    <Tooltip title={t("copy_src_to_tar_tooltip")} placement="top" arrow>
                                                                                        <a
                                                                                            type="button"
                                                                                            ref={copySourceToTargetRef}
                                                                                            style={!isWorkspaceEditable ? { pointerEvents: 'none' } : {}}
                                                                                            className="workspace-feature-btn-2"
                                                                                            onClick={(e) => isWorkspaceEditable && copySourceToTarget()}
                                                                                        >
                                                                                            <div className="toolbar-list-icon-bg copy-to-target"></div>
                                                                                        </a>
                                                                                    </Tooltip>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* {console.log("testing 0")} */}
                                                            <div className="target-lang-part trigger-focus" data-id={id} onClick={(e) => targetSegmentClick(e)}>
                                                                {/* {console.log("testing 1")} */}
                                                                <div className="workspace-align trigger-focus" data-id={id}>
                                                                    {/* {console.log("testing 2")} */}
                                                                    <div className="form-group new-form-group trigger-focus" data-id={id}>
                                                                        
                                                                        <div style={{display: ((isSegmentDataLoading && focusedDivId == id) && (!translatedResponse[key].status || forcedLoaderRef.current)) ? 'block' : 'none'}}>
                                                                            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                                                                            <Skeleton animation="wave" height={15} width="80%" />
                                                                        </div>

                                                                        <div
                                                                            style={targetLanguageFontSize != null ? { fontSize: targetLanguageFontSize, opacity: (isSegmentDataLoading && focusedDivId == id && (!translatedResponse[key].status || forcedLoaderRef.current)) ? 0 : 1 } : {opacity: isSegmentDataLoading ? 0 : 1}}
                                                                            data-placeholder={(segmentNo == 1 && !isUserIsReviwer) ? "Click here to translate..." : (segmentNo == 1 && isUserIsReviwer) ? "Click here to review" : (isConfirmBtnClicked && segmentNo == 2) ? "Click here to continue" : ''}
                                                                            contentEditable={isWorkspaceEditable ? (translatedResponseDisableEditRef.current?.find(each => each.segment_id == id)?.disableEdit ? false : true) : false}
                                                                            ref={targetContentEditable.current[id]}
                                                                            onFocus={(e) => isWorkspaceEditable && contentEditableFocus(e, translatedResponse[key].status)}
                                                                            // onClick={(e) => !isWorkspaceEditable && highlightFocusedSegment(translatedResponse[key].segment_id)}
                                                                            onInput={(e) => isWorkspaceEditable &&  (!translatedResponse[key].disableEdit && translatedTextChange(e))}
                                                                            // onBlur={(e) => handleTargetSegmentBlur(e, null, true, {}, translatedResponse[key].temp_target, translatedResponse[key].target)}
                                                                            onBlur={(e) => document.querySelector('.input-box-transliterate').innerText.length == 0 && handleTargetSegmentBlur(e, null, true, {}, translatedResponse[key].temp_target, translatedResponse[key].target)}
                                                                            onSelect={(e) => isWorkspaceEditable && ((enableSynonym || enableIME) ? getSelectedText() : debounceApiCall(checkTargetTextSelection))}
                                                                            onMouseUp={(e) => isWorkspaceEditable && (enableIME && removeSelectedText(e))}
                                                                            onPaste={handlePasteOnWorkArea}
                                                                            // onCopy={(e) => isDinamalar && e.preventDefault()}
                                                                            onKeyDown={(e) => handleKeyDown(e)}
                                                                            // onKeyUp={(e) => handleKeyDown(e)}
                                                                            onClick={(e) => imeOn && handleDissapear()}
                                                                            onScroll={(e) => imeOn && handleDissapear()}
                                                                            onDrop={(e) => e.preventDefault()}  // this line prevent from dropping anything inside the target segment
                                                                            // onClick={(e) => recreateNode(targetContentEditable.current[focusedDivIdRef.current].current) }
                                                                            data-id={id}
                                                                            data-source-text={sourceOriginal}
                                                                            data-translated-text={
                                                                                (replaceTagsWithText(translation) !== undefined && replaceTagsWithText(translation) !== null) ? 
                                                                                replaceTagsWithText(translation)?.trim() : translation
                                                                            }
                                                                            id={"workspace-textarea-" + id}
                                                                            className={rightAlignLangs.current.indexOf(targetLanguage) != -1 ? "workspace-textarea align-right" : "workspace-textarea"}
                                                                            spellCheck="false"
                                                                            suppressContentEditableWarning={true}
                                                                            dangerouslySetInnerHTML={{ __html: translation }}
                                                                        ></div>
                                                                    </div>
                                                                    <div data-id={id} className="target-lang-row-align trigger-focus">
                                                                        <div data-id={id} className="segment-status trigger-focus">
                                                                            {/* <span
                                                                                    className={
                                                                                        allSegmentStatusState[id] == 101 || allSegmentStatusState[id] == 103 || allSegmentStatusState[id] == 105 || allSegmentStatusState[id] == 109
                                                                                            ? "segment-flag status-danger"
                                                                                            :(allSegmentStatusState[id] == 102 || allSegmentStatusState[id] == 104 || allSegmentStatusState[id] == 106 || allSegmentStatusState[id] == 110) ?
                                                                                            "segment-flag status-confirmed"
                                                                                            :
                                                                                            "segment-flag"
                                                                                    }
                                                                                >
                                                                                    {segmentStatuses[allSegmentStatusState[id]]}
                                                                                </span>
                                                                                <span
                                                                                    ref={notSavedStatus.current[id]}
                                                                                    id={"not-saved-status-" + id}
                                                                                    data-id={id}
                                                                                    style={{ display: "none" }}
                                                                                    className="text-changes-danger"
                                                                                >
                                                                                    Changes not yet saved
                                                                                </span>
                                                                                <span
                                                                                    ref={savedStatus.current[id]}
                                                                                    id={"saved-status-" + id}
                                                                                    data-id={id}
                                                                                    style={{ display: "none" }}
                                                                                    className="text-changes-success"
                                                                                >
                                                                                    Changes Saved!
                                                                                </span> */}
                                                                            {(isWorkspaceEditable && (sourceLanguageId == 17 || targetLanguageId == 17)) ? (
                                                                                targetContentEditable.current[id]?.current !== null && targetContentEditable.current[id]?.current?.innerText != "" ? (
                                                                                    <>
                                                                                        <span aria-describedby={transphraseId} className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Rewrite' ? "active" : "")} onClick={(e) => handleTransphrase(e, 'Rewrite')}><span>{t("rewrite")}</span></span>
                                                                                        <span aria-describedby={transphraseId} className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Simplify' ? "active" : "")} onClick={(e) => handleTransphrase(e, 'Simplify')}><span>{t("simplified")}</span></span>
                                                                                        {/* <span aria-describedby={transphraseId} className={"word-count-capsule paraphrase-tag " + (selectedParaphrase === 'Shorten' ? "active" : "")} onClick={(e) => handleTransphrase(e, 'Shorten')}><span>{t("shortened")}</span></span> */}
                                                                                    </>
                                                                                ) : null
                                                                            ) : null}
                                                                        </div>

                                                                        <div data-id={id} className="workspace-btn-algin trigger-focus">
                                                                            <span
                                                                                ref={notSavedStatus.current[id]}
                                                                                id={"not-saved-status-" + id}
                                                                                data-id={id}
                                                                                style={{ display: "none" }}
                                                                                className="text-changes-danger"
                                                                            >
                                                                                Changes not yet saved
                                                                            </span>
                                                                            <span
                                                                                ref={savedStatus.current[id]}
                                                                                id={"saved-status-" + id}
                                                                                data-id={id}
                                                                                style={{ display: "none" }}
                                                                                className="text-changes-success"
                                                                            >
                                                                                Changes Saved!
                                                                            </span>

                                                                            <Tooltip
                                                                                title={`${segmentStatuses[allSegmentStatusState[id]]}`}
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <div type="button"
                                                                                    id={"save-btn-" + id}
                                                                                    ref={saveBtn.current[id]}
                                                                                    className={"workspace-feature-btn segment-save-btn " + (targetContentEditable.current[id]?.current?.innerText?.trim() == "" ? "disbaled-with-opacity" : "")}
                                                                                    data-id={id}
                                                                                    onClick={(e) => { !isSegmentConfirming && (isWorkspaceEditable && updateTranslationById(e)) }}
                                                                                // onClick={(e) => {saveAndNextUnsavedSegment()}}
                                                                                >
                                                                                    <div 
                                                                                        data-id={id}
                                                                                        style={{display: 'flex', alignItems: 'center'}} 
                                                                                    >
                                                                                        {!isSegmentConfirming ? (
                                                                                            <CheckCircleOutlineOutlinedIcon
                                                                                                data-id={id}
                                                                                                style={{
                                                                                                    color: (allSegmentStatusState[id] == 101 || allSegmentStatusState[id] == 103 || allSegmentStatusState[id] == 105 || allSegmentStatusState[id] == 109)
                                                                                                        ? '#E74C3C' :
                                                                                                        (allSegmentStatusState[id] == 102 || allSegmentStatusState[id] == 104 || allSegmentStatusState[id] == 106 || allSegmentStatusState[id] == 110) ? '#0078D4' : '#5F6368',
                                                                                                    fontSize: '25px',
                                                                                                }}
                                                                                            />
                                                                                        ) : (
                                                                                            <CircularProgress sx={{ color: 'grey.500' }} style={{height: '21px', width: '21px'}} />
                                                                                        )}
                                                                                        {/* blue: #0078D4, red: #E74C3C, black: #5F6368 */}
                                                                                    </div>
                                                                                    {/* <div ref={saveBtn.current[id]} className="check-circle" data-id={id}></div> */}
                                                                                </div>
                                                                            </Tooltip>

                                                                            <Tooltip data-id={id} title={t("restore_tags")} placement="top" arrow>
                                                                                <a type="button" className="workspace-feature-btn" data-id={id} onClick={(e) => isWorkspaceEditable && restoreTags(e)}>
                                                                                    <div className="position-relative" data-id={id}>
                                                                                        <LabelOutlinedIcon data-id={id} style={{ color: '#5F6368' }} />
                                                                                    </div>
                                                                                </a>
                                                                            </Tooltip>

                                                                            {/* {(targetContentEditable.current[id]?.current?.innerText == "" && mtEnable) ? (
                                                                                    <a
                                                                                        type="button"
                                                                                        className={
                                                                                            "workspace-feature-btn"
                                                                                        }
                                                                                        data-id={id}
                                                                                        onClick={(e) => { getMachineTranslation(e); restoreMTTranslation() }}
                                                                                    >
                                                                                        <Tooltip title="This will replace the content with the MT content" placement="top" arrow>
                                                                                            <div data-id={id} className="translate"></div>
                                                                                        </Tooltip>
                                                                                    </a>
                                            
                                                                                ) : (
                                            
                                                                                    <a type="button" data-id={id} className={
                                                                                        "workspace-feature-btn"
                                                                                    } onClick={(e) => deleteSegmentTranslation(e)}>
                                                                                        <Tooltip title="Clear target segment" placement="top" arrow>
                                                                                            <div ref={deleteSegmentTranslationRef}>
                                                                                                <div data-id={id} className="toolbar-list-icon-bg eraser"></div>
                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    </a>
                                            
                                                                                )} */}
                                                                            {/*                                                                         
                                                                                {(sourceLanguageId == 17 || targetLanguageId == 17) ? (
                                                                                    showParaphraseBtn ? (
                                                                                        <Tooltip
                                                                                        title="Paraphrase" placement="top" arrow>
                                                                                            <a type="button" className="workspace-feature-btn" data-id={id} onClick={(e) => getParaphrases()}>
                                                                                                <div data-id={id} className="paraphrase"></div>
                                                                                            </a>
                                                                                        </Tooltip>
                                                                                    ) : null
                                                                                ) : null} */}


                                                                            <Tooltip title={t("add_view_comments")} placement="top" arrow>
                                                                                <a
                                                                                    type="button"
                                                                                    className="workspace-feature-btn"
                                                                                    data-id={id}
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        top: '35%',
                                                                                        right: '-24px',
                                                                                        background: '#FFFFFF 0% 0% no-repeat padding-box',
                                                                                        boxShadow: '0px 3px 3px #00000014',
                                                                                        border: '1px solid #0000000F'
                                                                                    }}
                                                                                    onClick={(e) => showCommentSection(e)}
                                                                                >
                                                                                    {/* <div data-id={id} className={hasComment ? "comment-batch" : ""}>
                                                                                            <AddCommentOutlinedIcon style={{color: '#0074d3'}} />
                                                                                        </div> */}
                                                                                    <div data-id={id} className={hasComment ? "comment comment-batch" : "comment"}></div>
                                                                                </a>
                                                                            </Tooltip>

                                                                            <Tooltip data-id={id} title={qaCountShow ? `${errorNoteCount.current} ${errorNoteCount.current === 1 ? t("issue") : t("issues")} ${t("found")}` : t("qa_text")} placement="top" arrow>
                                                                                <a type="button" className="workspace-feature-btn" data-id={id} onClick={(e) => showQaSection(e)}>
                                                                                    <div className="position-relative">
                                                                                        <div data-id={id} className="inventory-qa"></div>
                                                                                        {
                                                                                            qaCountShow &&
                                                                                            <span className="qa-list-count">
                                                                                                <img src={ErrorFillYellow} data-id={id} onClick={(e) => { showQaSection(e); e.stopPropagation(); }} />
                                                                                            </span>
                                                                                        }
                                                                                    </div>
                                                                                </a>
                                                                            </Tooltip>

                                                                        </div>
                                                                        {hasComment && (
                                                                            <Tooltip title={t("add_view_comments")} placement="top" arrow>
                                                                                <div className="untarget-lang-row-align" style={{ cursor: 'pointer' }} data-id={id} onClick={(e) => {contentEditableFocus(e, translatedResponse[key].status); showCommentSection(e)}}>
                                                                                    <div className="comment-msg-info-part" data-id={id}>
                                                                                        <div className="comment-not-action" data-id={id}></div>
                                                                                    </div>
                                                                                </div>
                                                                            </Tooltip>
                                                                        )}
                                                                        {
                                                                            (translatedResponse[key].status !== null || translatedResponse[key].status !== undefined) && (
                                                                                allSegmentStatusState[id] == 110 ? (
                                                                                    <Tooltip title={segmentStatuses[allSegmentStatusState[id]]} placement="top" arrow>
                                                                                        <div className={'status-on-nofocus reviewedstatus-nofocus' + (translatedResponse[key].isFocused ? " focused-row" : "")}>
                                                                                        </div>
                                                                                    </Tooltip>
                                                                                ) : (
                                                                                    <Tooltip title={segmentStatuses[allSegmentStatusState[id]]} placement="top" arrow>
                                                                                        <div className={'status-on-nofocus ' + ((allSegmentStatusState[id] == 101 || allSegmentStatusState[id] == 103 || allSegmentStatusState[id] == 105 || allSegmentStatusState[id] == 109) ?
                                                                                            "unconfirmstatus-nofocuss" // remove the extra "s" to display the unconfirmed icon 
                                                                                            : (allSegmentStatusState[id] == 102 || allSegmentStatusState[id] == 104 || allSegmentStatusState[id] == 106 || allSegmentStatusState[id] == 110) ?
                                                                                                "confirmstatus-nofocus" : "") + (translatedResponse[key].isFocused ? " focused-row" : "")}>
                                                                                        </div>
                                                                                    </Tooltip>
                                                                                )
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
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
                {showGlossaryAddition && (
                    <AddGlossaryTermModal 
                        wordChoicelist={wordChoicelist}
                        addGlossarySectionRef={addGlossarySectionRef}
                        showHideToolbarElement={showHideToolbarElement}
                        sourceSelectionText={sourceSelectionText}
                        targetSelectionText={targetSelectionText}
                        selectedWordChoiceItem={selectedWordChoiceItem}
                        setSelectedWordChoiceItem={setSelectedWordChoiceItem}
                        addTermToGlossary={addTermToGlossary}
                        srcInputRef={glossarySrcFieldRef}
                        tarInputRef={glossaryTarFieldRef}
                        selectedWordChoicePOS={selectedWordChoicePOS}
                        setSelectedWordChoicePOS={setSelectedWordChoicePOS}
                        isTermAdding={isTermAdding}
                        documentTaskIdRef={documentTaskIdRef}
                        setShowCreditAlert={setShowCreditAlert}
                        documentDetailsRef={documentDetailsRef}
                        termAddModalPositionRef={termAddModalPositionRef}
                        setIsTermAdding={setIsTermAdding}
                    />
                )}
                {showFormatSize && (
                    <Draggable handle="strong" defaultPosition={{ x: 100, y: 100 }}>
                        <div className="toolbar-parts" id="showFormatSize">
                            <div className="formatsizetitlesection">
                                <div className="formatsizecont">
                                    <h4 className="formatsizetitle">{t("font_size")}</h4>
                                </div>
                                <div className="close-spl-char">
                                    <button type="button" onClick={(e) => showHideToolbarElement("showFormatSize")} className="close-spl-char-btn">
                                        &#x2715;
                                    </button>
                                </div>
                            </div>
                            <div className="format-size-increase-decrease-cont">
                                <div className="format-size-box-algin">
                                    <div className="format-size-source-lang-part">
                                        <div className="src-lng-txt">{sourceLanguage}</div>
                                        <div className="src-lng-function-part">
                                            <span onClick={(e) => changeSourceLanguageFontSize("-")} className="increase-btn">
                                                <img src={MinusSymbol} />
                                            </span>
                                            <div className="counter-percentage-box">{sourceLanguageFontSizeRef.current + " px"}</div>
                                            <span onClick={(e) => changeSourceLanguageFontSize("+")} className="decrease-btn">
                                                <img src={PlusSymbol} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="format-size-target-lang-part">
                                        <div className="tar-lng-txt">{targetLanguage}</div>
                                        <div className="tar-lng-function-part">
                                            <span onClick={(e) => changeTargetLanguageFontSize("-")} className="increase-btn">
                                                <img src={MinusSymbol} />
                                            </span>
                                            <div className="counter-percentage-box">{targetLanguageFontSizeRef.current + " px"}</div>
                                            <span onClick={(e) => changeTargetLanguageFontSize("+")} className="decrease-btn">
                                                <img src={PlusSymbol} />
                                            </span>
                                        </div>
                                    </div>
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

            <WorkspaceFeatures 
                workspaceFeaturRef={workspaceFeaturRef} 
                advancedOptionVisibility={advancedOptionVisibility}
                scrl={scrl}
                scrollLeft={scrollLeft}
                scrollRight={scrollRight}
                segmentDiffButton={segmentDiffButton}
                handleToggleVisibility={handleToggleVisibility}
                getSegmentDiff={getSegmentDiff}
                commentsTabButton={commentsTabButton}
                tmTabButton={tmTabButton}
                dictionaryTabButton={dictionaryTabButton}
                qaTabButton={qaTabButton}
                concordanceTabButton={concordanceTabButton}
                paginationContent={paginationContent}
                confirmedSegmentsCount={confirmedSegmentsCount}
                totalSegmentsCount={totalSegmentsCount}
                segmentStatusPercentage={segmentStatusPercentage}
                handlePushPinActive={handlePushPinActive}
                pushPinActive={pushPinActive}
                PushPin={PushPin}
                showTmSection={showTmSection}
                translationMatches={translationMatches}
                tbxData={tbxData}
                glossaryData={glossaryData}
                ArrowRightAltColor={ArrowRightAltColor}
                NorCopyContent={NorCopyContent}
                sourceLanguage={sourceLanguage}
                copyText={copyText}
                setIsCopied={setIsCopied}
                isCopied={isCopied}
                concordanceData={concordanceData}
                commentScrollingDivRef={commentScrollingDivRef}
                commentsData={commentsData}
                commentsDataCopy={commentsDataCopy}
                handleCommentChange={handleCommentChange}
                commentEdit={commentEdit}
                closeCommentsEdit={closeCommentsEdit}
                deleteComment={deleteComment}
                openCommentsEdit={openCommentsEdit}
                handleCommentEnter={handleCommentEnter}
                commentTextArea={commentTextArea}
                commentSubmit={commentSubmit}
                SendIcon={SendIcon}
                qaContent={qaContent}
                WikipediaIcon={WikipediaIcon}
                WikitionaryIcon={WikitionaryIcon}
                wikipediaData={wikipediaData}
                wiktionaryData={wiktionaryData}
                OpenInNew={OpenInNew}
                posData={posData}
                segmentDifference={segmentDifference}
                paraphraseTrigger={paraphraseTrigger}
                selectedParaphrase={selectedParaphrase}
                paraPhraseResList={paraPhraseResList}
                replaceWithNewPara={replaceWithNewPara}
                rightAlignLangs={rightAlignLangs}
                targetLanguage={targetLanguage}
                commentsLoader={commentsLoader}
                segmentHistoryLoader={segmentHistoryLoader}
                showSegmentComments={showSegmentComments}
            />

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
                            className="paraphrase-popover-box spellcheck-popover-box synonym-popover-drop-down"
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

            {/* Grammar check popover */}
            {
                (grammarCheckPopoverTarget.length !== 0 && grammarCheckSuggestedSentence.length !== 0 && enableSpellCheck && grammarPopoverOpen) ? (
                    <div>
                        <Popover
                            className="paraphrase-popover-box spellcheck-popover-box"
                            placement="bottom"
                            isOpen={grammarPopoverOpen && (document?.getElementById(grammarCheckPopoverTarget) !== null || document.getElementById(grammarCheckPopoverTarget) !== undefined)}
                            target={grammarCheckPopoverTarget}
                        >
                            <span>{grammarCheckSuggestedSentence}</span>
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
                    }}
                >
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
                            <span
                                onClick={handleTransphrasePopoverClose}
                                className="transphrasing-popover-close-icon"
                            >
                                <img src={CloseBlack} alt="close_black" />
                            </span>

                        </div>
                        {(paraphraseTrigger && paraPhraseResList?.length !== 0) ? (
                            <div className="paraphrase-result-div">
                                <ul className="list-unstyled">
                                    <li onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                        <div className="capsule-wrapper">
                                            <div className={"capsule " + (rightAlignLangs.current.indexOf(targetLanguage) != -1 ? 'align-right' : '')}>
                                                {paraPhraseResList}
                                            </div>
                                            <Tooltip title="Copy to segment" placement="top" arrow>
                                                <div className="content-copy" onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                                    <ContentCopyIcon />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </li>
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
                            <span
                                onClick={() => {
                                    setCreditAlertTxt("");
                                    setShowCreditAlert(false)
                                    shouldShowInsufficientModal(false);
                                    setPartialPretranslate(false)
                                }}
                                className="credits-close-btn"
                            >
                                <img src={CloseBlack} alt="close_black" />
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

                                    {/* {(!Config.userState?.is_internal_member && enableFileDownload && isAssignEnable) && (
                                        <div className="mt-3">
                                            <ButtonBase>
                                                <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                                    {t("buy_credits")}
                                                </a>
                                            </ButtonBase>
                                        </div>
                                    )} */}
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
                                    <img
                                        className="credits-alert-warn-icon"
                                        src={ErrorBlackWarn}
                                        alt="error_yellow_warn"
                                    />
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
            <Joyride
                steps={[
                    // { target: '.toolbar-list-align', title: 'Toolbar section', content: 'All the toolbars here', image_url: Config.HOST_URL + 'assets/images/new-ui-icons/file_replace_btn.svg'},
                    { target: ".target-lang-part", title: t("joyride_note_1"), disableBeacon: true },
                    { target: ".workspace-feature-btn", title: t("joyride_note_2") },
                    { target: "ul#workspace li:nth-child(2) div.target-lang-part", title: t("joyride_note_3") },
                    { target: "ul#workspace li:nth-child(2) .segment-save-btn", title: t("joyride_note_4") },
                    { target: "ul#workspace li:nth-child(2) div.target-lang-part", title: t("joyride_note_5") },
                    { target: "#download-dropdown", title: t("joyride_note_6") },
                ]}
                continuous={true}
                tooltipComponent={TourTooltip}
                // disableScrolling={true}
                scrollOffset={150}
                // disableScrollParentFix={true}
                callback={handleJoyrideCallback}
                stepIndex={tourStepIndex}
                disableCloseOnEsc={true}
                beaconComponent={BeaconComponent}
                run={!isProductTourSeen}
                scrollToFirstStep={true}
            />

            <Joyride
                steps={[
                    {
                        target: `.workspace-row div.src-lang-part[data-id="${firstTagSegmentId}"]`,
                        title: t("joyride_tags_note_1"),
                        disableBeacon: true,
                    },
                    {
                        target: `.workspace-row div.target-lang-part[data-id="${firstTagSegmentId}"]`,
                        title: t("joyride_tags_note_2"),
                    },
                    {
                        target: ".workspace-textarea span.tag",
                        title: t("joyride_tags_note_3"),
                    },
                    {
                        target: ".workspace-textarea span.tag",
                        title: t("joyride_tags_note_4"),
                    },
                    {
                        target: `#workspace-textarea-${firstTagSegmentId} span.tag.tag-close`,
                        title: t("joyride_tags_note_5"),
                    },
                    {
                        target: `.workspace-row .workspace-feature-btn[data-id="${firstTagSegmentId}"]`,
                        title: t("joyride_tags_note_6"),
                    },
                ]}
                continuous={true}
                tooltipComponent={TourTooltip}
                // disableScrolling={true}
                scrollOffset={150}
                // disableScrollParentFix={true}
                callback={handleTagTourCallback}
                stepIndex={tagTourStepIndex}
                disableCloseOnEsc={true}
                beaconComponent={BeaconComponent}
                run={!isTagTourSeen}
                scrollToFirstStep={true}
            />
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
            <AilaysaGlossariesModal 
                documentDetails={documentDetailsRef.current}
                defaultGlossDetailsRef={defaultGlossDetailsRef}
            />
            {selectedCoordinates && (
                <OnTheFlyGlossary 
                    selectedCoordinates={selectedCoordinates}
                    setSelectedCoordinates={setSelectedCoordinates} 
                    sourceSelectionText={sourceSelectionText}
                    targetSelectionText={targetSelectionText}
                    defaultGlossDetailsRef={defaultGlossDetailsRef}
                />
            )}
        </React.Fragment>
    );
}

export default Workspace;
