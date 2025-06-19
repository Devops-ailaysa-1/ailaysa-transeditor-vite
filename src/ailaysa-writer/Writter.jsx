import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import ResizePanel from "react-resize-panel";
import Navbar from "./Writter-componenets/Navbar";
import CloseIcon from '@mui/icons-material/Close';
// import Radio from '@mui/material/Radio';
import Radio from '@mui/material/Radio';
import DescriptionIcon from '@mui/icons-material/Description';
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
import Select, { components } from "react-select";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Translation, useTranslation } from "react-i18next";
// import HTMLtoDOCX from "html-to-docx/dist/html-to-docx.umd"
// import HTMLtoDOCX from 'html-to-docx'
import Config from "../vendor/Config";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import marked from 'marked';
import WritterPromptForm from './Writter-componenets/WritterPromptForm';
import MainEditor from './Writter-componenets/MainEditor';
import CustomizationPanel from './Writter-componenets/CustomizationPanel';
import { PromptHistory } from "./Writter-componenets/PromptHistory";
import ButtonBase from '@mui/material/ButtonBase';
// import SimpleRodals from './../project-setup-components/rodals/SimpleRodals';
// import TargetLanguage from "../vendor/lang-modal/Targetlanguage";
// import Cookies from "js-cookie";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
// import WritterToolbar from "./Writter-componenets/WritterToolbar";
import Cookies from "js-cookie";
import { count } from 'letter-count';
import $ from 'jquery';
import sanitizeHtml from 'sanitize-html-react';
import { auto } from "@popperjs/core";
// import './writterFonts.css'
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogDisplay } from "../features/WriterDialogToggleSlice";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WriterPDFSplit from "./Writter-componenets/WriterPDFSplit";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SplitViewIcon from "../vendor/styles-svg/SplitViewIcon";
import SplitBottomIcon from "../vendor/styles-svg/SplitBottomIcon";
import SplitRightIcon from "../vendor/styles-svg/SplitRightIcon";
import { AsyncPaginate } from "react-select-async-paginate";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { fetchEventSource } from "@microsoft/fetch-event-source";
import MarkdownIt from "markdown-it";
import CollapseTray from "../vendor/styles-svg/CollapseTray";
import { setShowCustomSettingsModal } from "../features/ShowCustomSettingsModalSlice";
import { setDefaultSettings } from "../features/CustomizationSettingsSlice";
import SimpleRodals from "../project-setup-components/rodals/SimpleRodals";
import TargetLanguage from "../vendor/lang-modal/Targetlanguage";
import WriterCharacterCountFooter from "./Writter-componenets/WriterCharacterCountFooter";
import { setWriterSelectionWordCount } from "../features/writer-slices/WriterSelectionCountSlice";
import WriterAudioPlayer from "./Writter-componenets/WriterAudioPlayer";
import DocumentListModal from "./Writter-componenets/DocumentListModal";
import TranslationTab from "./Writter-componenets/TranslationTab";
import { setLevelOption } from "../features/writer-slices/BookLevelOptionSlice";
import { setGenreOption } from "../features/writer-slices/BookGenreOptionSlice";
import { setBookFrontMatterOption } from "../features/writer-slices/BookFrontMatterOptionSlice";
import { setBookBackMatterOption } from "../features/writer-slices/BookBackMatterOptionSlice";
import CoAuthorWriterFooter from "./Writter-componenets/co-author/CoAuthorWriterFooter";
import { setShowBookContentLossAlertModal } from "../features/writer-slices/BookContentLossAlertModalSlice";
import { setModalConfirmationUserDecision } from "../features/writer-slices/ModalConfirmationUserDecisionSlice";
import { setBookCreationResponse } from "../features/writer-slices/BookCreationResponseSlice";
import generateKey from "../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from "../features/FileDownloadingListSlice";
import { ButtonLoader } from "../loader/CommonBtnLoader";
import ArrowRightGreyColor from "../assets/images/new-create-hub/arrow_right_grey_color.svg"
import CloseBlack from "../assets/images/new-ui-icons/close_black.svg"
import RemoveCircleRed from "../assets/images/new-ui-icons/remove_circle_red.svg"
import InsuffientIcon from "../assets/images/new-ui-icons/insuffient-icon.svg"
import ConfirmIcon from "../assets/images/new-ui-icons/confirm-icon.svg"
// import CustomBookTooltip from "./CustomBookTooltip";
import ReferenceModal from "./Writter-componenets/ReferenceModal";
import ReactRouterPrompt from 'react-router-prompt'
import { setWriterWordCount } from "../features/writer-slices/WriterWordCountSlice";
import { AITab } from "../components/AITabs/AITab";
import { MyStyleBox } from "./my-style-prompt/MyStyleBox";
// import { PromptWritingBox } from "./prompt-writing-box/PromptWritingBox";

const AudioSlider = styled(Slider)({
    color: '#0078D44D',
    height: 4,
    verticalAlign: 'middle',
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#0078D4',
    },
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#0078D4',
        border: '0px solid currentColor',
        boxShadow: "0px 1px 2px #00000070",
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:after': {
            width: 14,
            height: 14
        },
        '&:before': {
            display: 'none',
        },
    },
});

const VolumeSlider = styled(Slider)({
    color: '#0078D44D',
    height: "100%",
    padding: 0,
    verticalAlign: 'middle',
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#0078D4',
    },
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#0078D4',
        border: '0px solid currentColor',
        boxShadow: "0px 1px 2px #00000070",
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:after': {
            width: 14,
            height: 14
        },
        '&:before': {
            display: 'none',
        },
    },
});

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
        minHeight: 46,
        height: "auto",
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const Writter = (props) => {
    const dispatch = useDispatch();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    let userSelectionCallTimer = null;    
    const showWriterAudioPDFDialog = useSelector((state) => state.writerDialog.value);
    const defaultSettings = useSelector((state) => state.customizationSetting.value);
    const showCustomSettingsModal = useSelector((state) => state.showCustomSettingsModal.value);
    const mtEngineOption = useSelector((state) => state.mtEngineOptions.value);
    const userDetails = useSelector((state) => state.userDetails.value);
    const showBookContentLossAlertModal = useSelector((state) => state.bookContentLossAlertModal.value);    
    const [sourceLanguage, setSourceLanguage] = useState(17);   // by default engligh is selected as source
    const [targetLanguage, setTargetLanguage] = useState("");
    const [sourceLabel, setSourceLabel] = useState("English");  // by default english source label is set 
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState(null);
    // const [showSrcLangModal, setshowSrcLangModal] = useState(false);   
    const [showDesigner ,setShowDesigner] = useState(false);
    // const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [promptMainWrapper, setPromptMainWrapper] = useState((window.location.pathname.includes("book-writing") && URL_SEARCH_PARAMS.get("matter") && URL_SEARCH_PARAMS.get("item")) ? true : false);
    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [synonumSelectionObject, setSynonumSelectionObject] = useState(null);
    const [projectName, setProjectName] = useState(null);
    const [isSaved, setIsSaved] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [writterWidth, setWritterWidth] = useState(null);
    const [editor, setEditor] = useState(null);
    const [rightSideBar, setRightSideBar] = useState(true);
    const [leftSideBar, setLeftSideBar] = useState(true);
    const [deskLeftSideBar, setDeskLeftSideBar] = useState(true);
    const [mobLeftSideBar, setMobLeftSideBar] = useState(false);
    const [showDocumentListModal, setShowDocumentListModal] = useState(false);
    const [showCustomSrcLangModal, setshowCustomSrcLangModal] = useState(false);
    const [showCustomTarLangModal, setshowCustomTarLangModal] = useState(false);
    const [splitViewChange, setSplitViewChange] = useState('right');
    const [dynamicWidth, setDynamicWidth] = useState(cw);
    const [documentName, setDocumentName] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [userTranslateChoiceModal, setUserTranslateChoiceModal] = useState(false);
    const [userTranslateChoice, setUserTranslateChoice] = useState('new');
    const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState(null);
    const [isDocument, setIsDocument] = useState(true);
    const [historyTab, setHistoryTab] = useState(false);
    const [splitViewTab, setSplitViewTab] = useState(false);
    const [aiCustomizationOptions, setAiCustomizationOptions] = useState([]);
    const [toneOptions, setToneOptions] = useState([]);
    const [selectedTone, setSelectedTone] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const searchAreaRef = useRef(null);
    // const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    // const [seletctedMainCategory, setSeletctedMainCategory] = useState(null);
    // const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isAssignedToMe, setIsAssignedToMe] = useState(false);
    const [showPunctuationModal, setShowPunctuationModal] = useState(false);
    const [punctuationValidation, setPunctuationValidation] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [textGenerationIds, setTextGenerationIds] = useState([]);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [synonymsList, setSynonymsList] = useState([]);
    // const [targetLanguage, setTargetLanguage] = useState("");
    // const [sourceLanguage, setSourceLanguage] = useState(17);   // by default engligh is selected as source
    // const [sourceLabel, setSourceLabel] = useState("English");  // by default english source label is set 
    // const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    // const [searchInput, setSearchInput] = useState('');
    // const [onFocusWrap, setOnFocusWrap] = useState(false);
    // const [showTarLangModal, setshowTarLangModal] = useState(false);
    // const [filteredResults, setFilteredResults] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    // const [promptHistoryList, setPromptHistoryList] = useState(null);
    // const [cardIndexNum, setCardIndexNum] = useState(null);
    const [selectedCustomization, setSelectedCustomization] = useState(null);
    const [selectedCustomizationCategory, setSelectedCustomizationCategory] = useState(null);
    const [customizationResult, setCustomizationResult] = useState(null);
    // const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [convetedDocsListSearch, setConvertedDocsListSearch] = useState(false);
    const [popupLoading, setPopupLoading] = useState('none');
    // const [description, setDescription] = useState('')
    // const [aiWrittingKeywords, setAiWrittingKeywords] = useState('')
    // const [selectedNumberOfCopies, setSelectedNumberOfCopies] = useState({ label: 1, value: 1 })    // default value
    // const [isGenerateLoading, setIsGenerateLoading] = useState(false)
    // const [isGenerateLoadingFreestyle, setIsGenerateLoadingFreestyle] = useState(false)
    // const [promptResultsList, setPromptResultsList] = useState([])
    // const [freeStylePromptResultsList, setFreeStylePromptResultsList] = useState([])
    // const [freeStyleDescription, setFreeStyleDescription] = useState('')
    // const [aiWrittingProductName, setAiWrittingProductName] = useState('')
    const [popoverContentSwitch, setPopoverContentSwitch] = useState(false);
    const [isMakePopInsideViewPort, setIsMakePopInsideViewPort] = useState(false);
    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [selectionString, setSelectionString] = useState(null);
    const [newline, setNewline] = useState(true);
    // states to restrict customization options
    const [generalCustomizatinOptEnable, setGeneralCustomizatinOptEnable] = useState(false);
    const [oneWordCustomizationOptEnable, setOneWordCustomizationOptEnable] = useState(false);
    const [paraCustomizationOptEnable, setParaCustomizationOptEnable] = useState(false);
    const [continueWritingEnable, setContinueWritingEnable] = useState(false);
    const [translateWritterSwitch, setTranslateWritterSwitch] = useState(false);
    const [tooltipTabLoader, setTooltipTabLoader] = useState(false);
    const [browserPageTitle, setBrowserPageTitle] = useState("Ailaysa | Writer");
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [sizes, setSizes] = useState(splitViewTab ? ['50%', 'auto'] : ['100%', '100%']);
    const [isDocxFileDownloading, setIsDocxFileDownloading] = useState(false);
    const [isTaskAssigned, setIsTaskAssigned] = useState(false);
    const [isTaskAssignedToMe, setIsTaskAssignedToMe] = useState(false);
    const [showSubmitDocment, setShowSubmitDocment] = useState(false);
    const [resetToNewDoc, setResetToNewDoc] = useState(false);
    const [referenceFileUrl, setReferenceFileUrl] = useState(null);
    const [referenceFileExt, setReferenceFileExt] = useState(null);
    const [isAudioOrPdf, setIsAudioOrPdf] = useState(null);  // state to check if writer opened of transcription or pdf task
    const [selectedMtengine, setSelectedMtengine] = useState(1);
    const [newLineResult, setNewLineResult] = useState(true);
    const [appendResult, setAppendResult] = useState(true);
    const [isDefaultSettingSaving, setIsDefaultSettingSaving] = useState(false);
    const [showResultInModal, setShowResultInModal] = useState(true);
    const [showSetAsTranslationBtn, setShowSetAsTranslationBtn] = useState(false);
     // book writing langauge states
    const [bookLanguage, setBookLanguage] = useState(17);
    const [bookLanguageLabel, setBookLanguageLabel] = useState("English");
    const [showPlaceHolderDivForBook, setShowPlaceHolderDivForBook] = useState(false);
    // when leaving the co-author/book writing
    const [bookPageActive, setBookPageActive] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [showBookPageLeavingAlertModal, setShowBookPageLeavingAlertModal] = useState(false);
    // co-author prompt box languages
    const [promptSrcLang, setPromptSrcLang] = useState(17);
    const [promptSrcLabel, setPromptSrcLabel] = useState("English");
    const [promptTarLang, setPromptTarLang] = useState([]);    
    // when writer page leaving states
    const [writerPageActive, setWriterPageActive] = useState(false);
    const [showWriterPageLeavingAlertModal, setShowWriterPageLeavingAlertModal] = useState(false);
    const [isTranslateProceeding, setIsTranslateProceeding] = useState(false);

    // prompt form states
    // let copiesOptions = [
    //     { label: 1, value: 1 },
    //     { label: 2, value: 2 },
    //     { label: 3, value: 3 },
    // ];
    const customizationTabList = [
        {
            value: 1,
            label: t("general")
        },
        {
            value: 2,
            label: t("my_style")
        },
    ];
    const webSearchResult = {
        "google": [
            {
                "title": "James Webb Space Telescope",
                "link": "https://webb.nasa.gov/",
                "desccription": "Image Details - The James Webb Space Telescope has observed the best evidence yet for emission from a neutron star at the site of a well-known and recently- ..."
            },
            {
                "title": "Webb Home | Webb",
                "link": "https://webbtelescope.org/home",
                "desccription": "Discover the science mission of NASA's James Webb Space Telescope (JWST), from exoplanet atmospheres to the first light in the universe—and more!"
            },
            {
                "title": "James Webb Space Telescope - Wikipedia",
                "link": "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
                "desccription": "The Webb was launched on 25 December 2021 on an Ariane 5 rocket from Kourou, French Guiana. In January 2022 it arrived at its destination, a solar orbit near ..."
            },
            {
                "title": "NASA's James Webb Space Telescope | STScI",
                "link": "https://www.stsci.edu/jwst",
                "desccription": "NASA's James Webb Space Telescope (JWST), developed in partnership with ESA and CSA, is operated by AURA's Space Telescope Science Institute."
            },
            {
                "title": "ESA Science & Technology - JWST",
                "link": "https://sci.esa.int/web/jwst",
                "desccription": "Mar 30, 2021 ... Inspired by the success of the Hubble Space Telescope, NASA, ESA and the Canadian Space Agency have collaborated since 1996 on the design ..."
            },
            {
                "title": "James Webb Space Telescope - NASA Science",
                "link": "https://science.nasa.gov/mission/webb/",
                "desccription": "The James Webb Space Telescope is a giant leap forward in our quest to understand the Universe and our origins. Webb is examining every phase of cosmic history: ..."
            },
            {
                "title": "James Webb Space Telescope (JWST) — A complete guide | Space",
                "link": "https://www.space.com/21925-james-webb-space-telescope-jwst.html",
                "desccription": "Apr 27, 2023 ... The $10 billion James Webb Telescope is probing the cosmos to uncover the history of the universe from the Big Bang to exoplanet formation and ..."
            },
            {
                "title": "ESA/Webb",
                "link": "https://esawebb.org/",
                "desccription": "Royal Astronomical Society Group Achievement Award for JWST-MIRI Team. 12 Jan. 2024 — ann2401 ; Announcement of the 2024 ESA Hubble and Webb Calendar. 15 Dec."
            },
            {
                "title": "Package Documentation — jwst 1.13.4.dev40+g613383f ...",
                "link": "https://jwst-pipeline.readthedocs.io/",
                "desccription": "Welcome to the documentation for jwst . ... The tools in this package allow users to run and configure the pipeline to custom process their JWST data."
            },
            {
                "title": "Supernova mystery solved: JWST reveals the fate of an iconic stellar ...",
                "link": "https://www.nature.com/articles/d41586-024-00528-4",
                "desccription": "6 days ago ... The James Webb Space Telescope (JWST) has solved a decades-old mystery about one of the most famous explosions of a star in history. Astronomers ..."
            }
        ],
        "bing": [
            {
                "title": "Webb Image Release- Webb Space Telescope GSFC/NASA",
                "link": "https://www.jwst.nasa.gov/",
                "description": "Webb is a revolutionary telescope that will study every phase of cosmic history from our solar system to the early universe. Learn about Webb&#39;s science, features, images, news, and team on this official site."
            },
            {
                "title": "James Webb Space Telescope - Wikipedia",
                "link": "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
                "description": "The James Webb Space Telescope (<b>JWST</b>) is a space telescope designed to conduct infrared astronomy. Its high-resolution and high-sensitivity instruments allow it to view objects too old, distant, or faint for the Hubble Space Telescope. This enables investigations across many fields of astronomy and cosmology, such as observation of the first stars and the formation of the first galaxies, and detailed atmospheric characterization of potentially habitable exoplanets."
            },
            {
                "title": "Webb Home | Webb",
                "link": "https://webbtelescope.org/",
                "description": "Webb is a space-based telescope that explores the origins and evolution of the universe, from the first galaxies to the horizons of other worlds. Learn about Webb&#39;s science mission, latest news, image gallery, and first year of science discoveries."
            },
            {
                "title": "Where Is Webb? NASA/Webb",
                "link": "https://www.webb.nasa.gov/content/webbLaunch/whereIsWebb.html",
                "description": "The James Webb Space Telescope (sometimes called Webb or <b>JWST</b>) is a large infrared telescope with a 6.5-meter primary mirror. Webb will be the premier observatory of the next decade, serving thousands of astronomers worldwide. It will study every phase in the history of our Universe, ranging from the first luminous glows after the Big Bang, to the formation of solar systems capable of supporting life on planets like Earth, to the evolution of our own Solar System. ..."
            },
            {
                "title": "James Webb Space Telescope - Webb/NASA",
                "link": "https://www.webb.nasa.gov/content/webbLaunch/news.html",
                "description": "The latest news on NASA&#39;s Webb Space Telescope. Webb is NASA&#39;s largest and most powerful space science telescope ever constructed. Webb’s enormous size and frigid operating temperature present extraordinary engineering challenges. After launching from French Guiana, the observatory will travel to an orbit about one million miles away from Earth and undergo six months of commissioning in space—unfolding its mirrors, sunshield, and other smaller systems; cooling down; aligning; and ..."
            },
            {
                "title": "The Launch - Webb/NASA - Webb Space Telescope",
                "link": "https://jwst.nasa.gov/content/about/launch.html",
                "description": "Learn how the James Webb Space Telescope (Webb) was launched on an Ariane 5 rocket from Europe&#39;s Spaceport in French Guiana on December 25, 2021. Find out more about the launch vehicle, the launch site, the launch configuration, the deployment sequence, and the features and activities of Webb after launch."
            },
            {
                "title": "Webb Image Galleries - NASA Science",
                "link": "https://science.nasa.gov/mission/webb/multimedia/images",
                "description": "Explore Webb&#39;s latest science images and other curated galleries of Webb&#39;s build, engineering, test and launch. Learn more about Webb&#39;s science, discover ancient galaxies, dig up galactic fossils and see the road to launch."
            },
            {
                "title": "James Webb Space Telescope - NASA Blogs",
                "link": "https://blogs.nasa.gov/webb/",
                "description": "NASA&#39;s James Webb Space Telescope has spotted a second multiply-imaged supernova in a distant galaxy, the first time that two gravitationally lensed supernovae were found in the same galaxy. The supernova, named Supernova Encore, is a type Ia supernova that will be visible in infrared images from Webb in 2035."
            }
        ]
    };
    const newsSearchResult = [
        {
            "title": "James Webb Space Telescope finds 'extremely red' supermassive black hole growing in the early universe",
            "link": "https://www.msn.com/en-gb/news/techandscience/james-webb-space-telescope-finds-extremely-red-supermassive-black-hole-growing-in-the-early-universe/ar-BB1iZXWT",
            "description": "Using the James Webb Space Telescope, astronomers discovered an \"extremely red,\" growing supermassive black hole powering a quasar that existed 700 million years after the Big Bang.",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.j4PV0YZzSeOEDC1BXEmhRy&pid=News"
        },
        {
            "title": "Vampire in space? James Webb Telescope discovers a massive red colour blackhole",
            "link": "https://www.businesstoday.in/visualstories/news/vampire-in-space-james-webb-telescope-discovers-a-massive-red-colour-blackhole-108668-28-02-2024",
            "description": "Using the James Webb Space Telescope (JWST), astronomers have made a groundbreaking discovery of an 'extremely red' supermassive black hole in the early universe.",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.zXc9Afj4bszj3P9fHsQ0pS&pid=News"
        },
        {
            "title": "Nasa's James Webb telescope discovers an enigmatic ancient galaxy",
            "link": "https://timesofindia.indiatimes.com/home/science/nasas-james-webb-telescope-discovers-an-enigmatic-ancient-galaxy/articleshow/108033330.cms",
            "description": "This scenario suggests that these stars were formed without the influence of dark matter, a fundamental element according to conventional galaxy formation models, a space.com report said. This conundrum mirrors the shock induced by previous JWST findings ...",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.7F3kev-6X3rETs3vNz8k2i&pid=News"
        },
        {
            "title": "Identifying Red Supermassive Black Holes in the Early Universe",
            "link": "https://www.msn.com/en-gb/news/techandscience/identifying-red-supermassive-black-holes-in-the-early-universe/ar-BB1iYweC",
            "description": "Reviewed by Lexie Corner A team of astronomers, led by Dr. Lukas Furtak and Professor Adi Zitrin from Ben-Gurion University , analyzed images from the James Webb Space Telescope and detected an extremely red,",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.sNIEIkGAnjXqiAn0FWkwTS&pid=News"
        },
        {
            "title": "Scientists discover galaxy similar to our own that goes beyond what we thought was possible in the universe",
            "link": "https://www.unilad.com/technology/space/nasa-james-webb-telescope-discovers-galaxy-075705-20240227",
            "description": "The galaxy was spotted by the NASA's deep space James Webb Telescope (JWST), and has been given the catchy name of ZF-UDS-7329. What's interesting about the galaxy is that according to our existing knowledge of the universe, it shouldn't exist. Or at least ...",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.BPA0TEhvOlnp5mdxrHggvS&pid=News"
        },
        {
            "title": "Dark Matter Mystery: Telescope Uncovers Mysterious 11-Billion-Year-Old Galaxy That Defies Logic",
            "link": "https://www.msn.com/en-us/news/technology/dark-matter-mystery-telescope-uncovers-mysterious-11-billion-year-old-galaxy-that-defies-logic/ar-BB1iZQ2e",
            "description": "The James Webb Space Telescope has made a remarkable breakthrough, uncovering a colossal ancient galaxy surpassing the size of our own Milky Way. The discovery reveals an astonishing find: a galaxy over 11 billion years old that defies conventional logic with its existence.",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.-8PuswQSB4VDkoBaedh90i&pid=News"
        },
        {
            "title": "Webb spots intensely red supermassive black hole in early universe",
            "link": "https://www.msn.com/en-us/news/technology/webb-spots-intensely-red-supermassive-black-hole-in-early-universe/ar-BB1iYBAB",
            "description": "Analyses of James Webb Space Telescope images have shown the existence of an “extremely ... “We were very excited when JWST started sending its first data. We were scanning the data that arrived for the UNCOVER program and three very compact yet ...",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.fL8NyFB0w_DkSnvYvy8q3C&pid=News"
        },
        {
            "title": "Distant worlds Eris and Makemake unveil surprisingly active natures to the world’s largest space telescope",
            "link": "https://www.msn.com/en-us/news/other/distant-worlds-eris-and-makemake-unveil-surprisingly-active-natures-to-the-world-s-largest-space-telescope/ar-BB1iYmpv",
            "description": "Enter JWST, the largest space telescope of all time ... SwRI scientists used data from the James Webb Space Telescope to model the subsurface geothermal processes that could explain how methane ended up on the surfaces of Eris and MakemakeThe illustration ...",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.L5agKAhC_osum8lnjSJSwC&pid=News"
        },
        {
            "title": "NASA: Super-red massive black hole from early universe catches JWST's eye",
            "link": "https://www.thenews.com.pk/latest/1162156-super-red-massive-black-hole-discovered-in-early-universe-by-nasa",
            "description": "An extremely red supermassive black hole may have existed in the early cosmos, as per the analysis of photos taken with the James Webb Space Telescope. Scientists suggest that the black hole's",
            "thumbnail_url": "https://www.bing.com/th?id=OVFT.yPFtmPv0dWMq43Byot5ZZi&pid=News"
        },
        {
            "title": "JWST Spies Surprising Signs of Warmth in Frozen Solar System Worlds",
            "link": "https://www.scientificamerican.com/article/jwst-spies-surprising-signs-of-warmth-in-frozen-solar-system-worlds/",
            "description": "Eris and Makemake—two icy worlds beyond the orbit of Pluto—have seemingly fresh methane on their surface, a sign of unexpectedly hot interiors",
            "thumbnail_url": ""
        }
    ];

    const [openContentReferenceModal, setOpenContentReferenceModal] = useState(false);
    const [contentReferenceResult, setContentReferenceResult] = useState(null);   
    const [myStyleData, setMyStyleData] = useState(null);
    const [activeCustomizationTab, setActiveCustomizationTab] = useState(1);
    const selectedToneRef = useRef(null);
    const documentNameRef = useRef(null);
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const leftSidebarRef = useRef();
    const rightSidebar = useRef();
    const isInitialHtmlDataLoaded = useRef(false);
    const createdDocumentId = useRef(null);
    const mainCategoryRef = useRef(null);
    const subCategoryRef = useRef(null);
    const currentSummerNoteTextData = useRef(null);
    const summerNoteEditorRef = useRef(null);
    const targetLanguageOptionsRef = useRef([]);
    const toneOptionsRef = useRef(null);
    // const generatedPromptId = useRef(null);
    const docxFileBlobRef = useRef(null);
    // Ai writing form fields useref
    const productNameTextRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const freeStyleDescriptionTextRef = useRef(null);
    const keywordTextRef = useRef(null);
    const toggleWritingStateRef = useRef(1);
    const tabElementRef = useRef(null);
    const tabElementCursonPlaceRef = useRef(null);
    const enableTabFunctionRef = useRef(true);
    const transcriptionTaskId = useRef(null);
    const pdfTaskId = useRef(null);
    const prevPathRef = useRef(null);
    const writterWrittingRef = useRef(null);
    const tabToWriteTextRef = useRef(null);
    const customizationResultRef = useRef(null);
    const isTaskAssignedToMeRef = useRef(false);
    const isTaskInProgressRef = useRef(false);
    const isCopiedFromSummernoteRef = useRef(null);
    // const audioRef = useRef(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [progress, setProgress] = useState(0);
    // const [currentTime, setCurrentTime] = useState('00:00');
    // const [duration, setDuration] = useState('00:00');
    const convert = new MarkdownIt({ html: true, });
    // const [blogCreatedId, setBlogCreatedId] = useState();
    const blogCreatedId = useRef(null);
    const selectedFileRow = useRef(null);
    const selectedCustomizationCategoryRef = useRef(null);    
    const isWriterDocumentRef = useRef(false);    
    const documentSearchTermRef = useRef("");
    const documentSearchFieldRef = useRef(null);
    const bookCreationObjRef = useRef(null);
    const summernoteRangeRef = useRef(null);
    const popoverContentSwitchRef = useRef(false);
    const isPopInPositionRef = useRef(false);

    useEffect(() => {
        getAiCustomizationOptions();
        getAiWritingTone();
        getAiWritingCategories();
        getLanguagesList();
        getLevelOptions();
        getGenreOptions();
        getBookFrontMatterOptions();
        getBookBackMatterOptions();
        // getMyStyle();
        // set browser tab title as "Writer"
        document.title = '';
        setTimeout(() => {
            document.title = 'Ailaysa | Writer';
        }, 10);        
        // clean-up function when component unmount
        return () => {
            // dismiss all writer toasts when component unmount
            Config.toast('','', true);
        }
    }, [])

    const getLevelOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/level/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.level
                    });
                })
                dispatch(setLevelOption(options));
            },
        });
    }

    const getGenreOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/genre/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.genre
                    });
                })
                dispatch(setGenreOption(options));
            },
        });
    }

    const getBookFrontMatterOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/front-matter/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.name
                    });
                })
                dispatch(setBookFrontMatterOption(options));
            },
        });
    }

    const getBookBackMatterOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/back-matter/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.name
                    });
                })
                dispatch(setBookBackMatterOption(options));
            },
        });
    }

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        if(location.pathname?.includes('/book-writing')){
            setBookLanguage(value);
            setBookLanguageLabel(name);
        }else{
            setSourceLanguage(value);
            setSourceLabel(name);
        }        
        setshowSrcLangModal(false);
        // setSearchInput('');
        // setOnFocusWrap(false);
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        // if (targetLanguage?.length === 1 && (targetLanguage?.find(each => each.id === value.id) ? true : false)) {
        //     Config.toast(t("at_least_language_selected"), 'warning');
        //     return;
        // }
        // limit only 3 target language
        if (targetLanguage?.length === 3 && (targetLanguage?.find(each => each.id === value.id) ? false : true)) {
            Config.toast(t("only_3_language_selected"), 'warning');
            return;
        }
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
        // setSearchInput('');
        // setOnFocusWrap(false);
    };

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
        if (showCustomSettingsModal) {
            setSelectedMtengine(
                mtEngineOption?.find(each => each.id === defaultSettings?.mt_engine) ?
                    mtEngineOption?.find(each => each.id === defaultSettings?.mt_engine)?.id :
                    1
            );
            setNewLineResult(
                (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ?
                    defaultSettings?.newline : true
            );
            setAppendResult(
                (defaultSettings?.append !== null && defaultSettings?.append !== undefined) ?
                    defaultSettings?.append : true
            );
            setShowResultInModal(
                (defaultSettings?.result_in_modal !== null && defaultSettings?.result_in_modal !== undefined) ?
                    defaultSettings?.result_in_modal : true
            );
        }
    }, [showCustomSettingsModal]);

    // show writer when chapter item is clicked or else show the place holder div
    useEffect(() => {
        let bookItemParam = URL_SEARCH_PARAMS.get('item')
        if(window.location.pathname.includes('/book-writing') && !bookItemParam){
            setShowPlaceHolderDivForBook(true);
        }else{
            setShowPlaceHolderDivForBook(false);
        }
    }, [window.location.pathname, URL_SEARCH_PARAMS.get('item')]);

    useEffect(() => {
        if(!openContentReferenceModal){
            handleCustomizationPopoverCloseBtn();
        }
    }, [openContentReferenceModal]);
        
    const handleCustomSettingsSave = () => {
        let formdata = new FormData();
        if (selectedMtengine !== defaultSettings?.mt_engine) {
            formdata.append('mt_engine', selectedMtengine);
        }
        if (newLineResult !== defaultSettings?.newline) {
            formdata.append('new_line', newLineResult);
        }
        if (appendResult !== defaultSettings?.append) {
            formdata.append('append', appendResult);
        }        
        let formdataLength = Array.from(formdata.values())?.length;
        if(formdataLength === 0) {
            Config.toast(t("settings_saved"));
            dispatch(setDefaultSettings({
                ...defaultSettings,
                result_in_modal: showResultInModal !== defaultSettings?.result_in_modal ? showResultInModal : defaultSettings?.result_in_modal
            }));
            dispatch(setShowCustomSettingsModal(false));
            return;
        }
        setIsDefaultSettingSaving(true);

        Config.axios({
            url: `${Config.BASE_URL}/writer/custom_settings/${defaultSettings?.id ? `${defaultSettings?.id}/` : ''}`,
            method: defaultSettings?.id !== null ? "PUT" : "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t("settings_saved"));
                dispatch(setShowCustomSettingsModal(false));
                setIsDefaultSettingSaving(false);
                dispatch(setDefaultSettings({
                    ...defaultSettings,
                    mt_engine: response.data?.mt_engine,
                    newline: response.data?.new_line,
                    append: response.data?.append,
                    result_in_modal: showResultInModal !== defaultSettings?.result_in_modal ? showResultInModal : defaultSettings?.result_in_modal
                }));
            },
            error: (err) => {
                setIsDefaultSettingSaving(false);
            }
        })
    }

    const blogAricleUpdate = (doc_id, blog_id) => {
        let formData = new FormData();
        formData.append("document", doc_id); // submit: 3, in-progress: 2

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogarticle/${blog_id}/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => { }
        });
    }

    // fetchData();

    const createNewDocumentForBlog = async (ol, bi, lang, title) => {
        var textData = document.querySelector('.note-editable')?.innerText;
        // let wordCount2 = count(document?.querySelector('.note-editable')?.innerText?.replace(/\n/g, '')).words;
        let wordCount = document?.querySelector('.note-editable')?.innerText?.trim().split(/\s+/).length;
        var htmlData = document.querySelector('.note-editable')?.innerHTML;
        if (htmlData === '') {
            return;
        }
        let formdata = new FormData();
        formdata.append("doc_name", title);
        formdata.append("html_data", htmlData);
        formdata.append("word_count", wordCount);
        formdata.append('document_type', 2)
        // formdata.append("file", fileObj);
        document.querySelector('.note-editable').blur();

        Config.axios({
            url: `${Config.BASE_URL}/workspace/mydocuments/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: async (response) => {
                // blogAricleUpdate(response.data.id,bi);
                createdDocumentId.current = response.data?.id;
                // summerNoteEditorRef.current.summernote('saveRange');
                history(`/word-processor?document-id=${response.data?.id}`, {state: location.state});
                // summerNoteEditorRef.current.summernote('restoreRange');
                // setIsDocument(true);
                isWriterDocumentRef.current = true;
                showOverlay();
                document.querySelector('.note-editable').blur();
                document.querySelector('.ailaysa-writter-main-wrapper').style.pointerEvents = 'none';
                setTimeout(() => {
                    getArticle(ol, bi, lang);
                }, 500);
            },
            error: (err) => {
                document.querySelector('.note-editable').classList.remove('note-editable-loader');
                document.querySelector('.note-editable').classList.remove('cursor-hide');
            }
        });
    }

    useEffect(() => {
        if (editor != null) {
            if (window.location.pathname == '/word-processor/article/') {
                let orderList = URL_SEARCH_PARAMS.get('outline_section_list');
                let blogId = URL_SEARCH_PARAMS.get('blog_creation');
                let lang = URL_SEARCH_PARAMS.get('lang');
                let title = URL_SEARCH_PARAMS.get('title');
                blogCreatedId.current = URL_SEARCH_PARAMS.get('blog_creation');
                if (orderList && blogId && lang && title) {
                    setDeskLeftSideBar(false);
                    createNewDocumentForBlog(orderList, blogId, lang, title);
                    document.querySelector('.note-editable').blur();
                    document.querySelector('.note-editable').classList.add('note-editable-loader');
                    document.querySelector('.note-editable').classList.add('cursor-hide');
                    history(`/word-processor`);
                }
                // getArticle(URL_SEARCH_PARAMS.get('outline_section_list'),URL_SEARCH_PARAMS.get('blog_creation'));
            }
        }
    }, [editor]);

    const removePrefixSuffix = (text) => {
        return text.replace(/^b'|'$/g, '');
    };

    const scrollToBottom = () => {
        const element = document.querySelector('.note-editable');
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
    };
    const scrollToTop = () => {
        const element = document.querySelector('.note-editable');
        element.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    // remove break
    const removeBreakParagraphs = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const paragraphs = doc.querySelectorAll('p.break');
        paragraphs.forEach(paragraph => {
            paragraph.parentNode.removeChild(paragraph);
        });
        return doc.body.innerHTML;
    };

    const handleFormateArticle = () => {
        document.querySelector('.note-editable').classList.remove('note-editable-loader');
        let data = document.querySelector('.note-editable').innerText;
        let html = convert.render(data);
        // let final = html.replace(/(?:\r\n|\r|\n)/g, '<p><br></p>');
        let final = html.replace(/(<li>[^]*?<\/li>)|(\r\n|\r|\n)/g, (match, liTag, lineBreak) => {
            if (liTag) {
                return liTag; // Keep <li> tags unchanged
            } else {
                return ""; // Replace line breaks with <p><br></p>
            }
        });
        document.querySelector('.note-editable').innerHTML = final;
        document.querySelector('.note-editable-backdrop').innerHTML = document.querySelector('.note-editable').innerHTML;        
        dispatch(setWriterWordCount({
            char: count(document?.querySelector('.note-editable')?.innerText.replace(/\n/g, '')).chars,
            word: document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length !== undefined ? document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length : 0
        }));        
        scrollToTop();
        setTimeout(() => {
            saveHtmlDataForDocument();
            document.querySelector('.pop-overlay').style.pointerEvents = 'all';
            closeOverlay();
        }, 500);
    }

    const getArticle = async (order_list, blog_id, lang) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        await fetchEventSource(`${Config.AI_GEN_URL}/writer/stream_article/?outline_section_list=${order_list}&blog_creation=${blog_id}`, {
            // await fetchEventSource(`https://aicanvas.ailaysa.com/writer/stream_article/?outline_section_list=${order_list}&blog_creation=${blog_id}`, {
            // await fetchEventSource(`https://aicanvas.ailaysa.com/writer/article/`, {
            openWhenHidden: true,
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            onopen(res) {
                if (res.ok && res.status === 200) {
                    // console.log("Connection made ", res);
                    blogAricleUpdate(createdDocumentId.current, blogCreatedId.current);
                } else if (
                    res.status >= 400 &&
                    res.status < 500 &&
                    res.status !== 429
                ) {}
            },
            onmessage(event) {
                // const text = removePrefixSuffix(event.data);
                // const decoder = new TextDecoder('utf-8');
                // const decodedText = decoder.decode(new Uint8Array(event.data.split('\\x').slice(1).map((hex) => parseInt(hex, 16))));
                // const tamil = decodedText.slice(2, -1);
                // if(lang != 17){
                // }else{
                // }
                scrollToBottom();
                const text = event.data.slice(7, -2);
                if (text.includes('\\n')) {
                    saveHtmlDataForDocument('article');
                } else { }
                let final = text.replace(/\\n/g, "<p><br/></p>");
                // let final = text.replace(/\\n/g, " ");   
                let update = final.replace('/\u200c/g', " ");
                document.querySelector('.note-editable').innerHTML += final;
                // placeCaretAtEnd(document.querySelector('.note-editable'));
                // saveHtmlDataForDocument('article');
                scrollToBottom();
            },
            onclose() {
                scrollToBottom();
                // document.querySelector('.note-editable').innerHTML = converter.makeHtml(document.querySelector('.note-editable').innerHTML);
                handleFormateArticle();
                // editor.summernote('pasteHTML', html);
                document.querySelector('.note-editable').classList.remove('note-editable-loader');
                document.querySelector('.note-editable').classList.remove('cursor-hide');
            },
            onerror(err) {
                // console.log("There was an error from server", err);
                document.querySelector('.note-editable').classList.remove('note-editable-loader');
                document.querySelector('.note-editable').classList.remove('cursor-hide');
                setTimeout(() => {
                    saveHtmlDataForDocument('article');
                    closeOverlay();
                    document.querySelector('.pop-overlay').style.pointerEvents = 'all';
                }, 500);
            },
        });
    };

    var wi = document.querySelector(".editor");
    var cw = wi?.offsetWidth + 8;
    const [moreToolsContentSwitch, setMoreToolsContentSwitch] = useState(false);
    const [moreToolsContentSwitchLoading, setMoreToolsContentSwitchLoading] = useState(false);

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

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (leftSidebarRef.current && leftSidebarRef.current.contains(e.target)) {
                setMobLeftSideBar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        // onClose: () => setshowSettings(false),
    };

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        // onClose: () => setshowSettings(false),
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    // this is responsible for opening pdf task data in writter
    useEffect(() => {
        let taskParam = URL_SEARCH_PARAMS.get("task");
        if (taskParam && location.state?.docName && location.state?.projectId) {
            setIsAudioOrPdf('pdf');
            getWriterHtmlData(taskParam, 'task');
            setProjectId(location.state?.projectId);
            // setIsDocument(false);
            // setIsDocument(true);
            setLeftSideBar(false);
            setRightSideBar(false);
            getTaskAssignInfo(taskParam);
        }
        if (location.state?.prevPath) {
            prevPathRef.current = location.state.prevPath;
        }
    }, [URL_SEARCH_PARAMS.get("task"), location.state]);

    // this is responsible for opening pdf-files data in writter
    useEffect(() => {
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
        if (pdfParam && location.state?.docName) {
            pdfTaskId.current = pdfParam;
            setIsAudioOrPdf('pdf');
            getWriterHtmlData(pdfParam, 'id');
            // setIsDocument(false);
            // setIsDocument(true);
            setLeftSideBar(false);
            setRightSideBar(false);
            setShowSetAsTranslationBtn(true);
        }
    }, [URL_SEARCH_PARAMS.get("pdf-id"), location.state]);

    // 
    useEffect(() => {
        let docParam = URL_SEARCH_PARAMS.get("document-id");
        if (docParam) {
            createdDocumentId.current = parseInt(docParam);
            getHtmlDataForDocument(docParam);
            // setIsDocument(true);
            isWriterDocumentRef.current = true;
            setShowSetAsTranslationBtn(true);
            setWriterPageActive(true);
        }
    }, [URL_SEARCH_PARAMS.get("document-id")]);

    useEffect(() => {
        let projectParam = URL_SEARCH_PARAMS.get("project");
        let transcripParam = URL_SEARCH_PARAMS.get("transcription-task");
        if (projectParam && transcripParam) {
            transcriptionTaskId.current = transcripParam;
            setIsAudioOrPdf('audio');
            getTranscribeFile(transcripParam);
            // setIsDocument(false);
            // setIsDocument(true);
            setLeftSideBar(false);
            setRightSideBar(false);
            getProjectDetails(projectParam, transcripParam);
        }
        if (location.state?.assignToMe !== null) {
            setIsAssignedToMe(location.state?.assignToMe);
        }
    }, [URL_SEARCH_PARAMS.get("project"), URL_SEARCH_PARAMS.get("transcription-task"), location.state]);

    useEffect(() => {
        if (isTaskAssignedToMe) {
            if (userDetails?.internal_member_team_detail?.role !== "Editor" && !isTaskAssignedToMe) {
                setShowSetAsTranslationBtn(true);
            }
        }
    }, [isTaskAssignedToMe]);

    // get book details from api
    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book');
        if(bookId){
            getBookDetails(bookId);
            setBookPageActive(true);
        }
    }, [URL_SEARCH_PARAMS.get('book')])

    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book');
        let itemId = URL_SEARCH_PARAMS.get('item');
        if(bookId && itemId){
            setShowSetAsTranslationBtn(true);
        }
    }, [URL_SEARCH_PARAMS.get('book'), URL_SEARCH_PARAMS.get('item')]);
    
    // set popoverContentSwitchRef when popoverContentSwitch changed
    useEffect(() => {
        popoverContentSwitchRef.current = popoverContentSwitch;
    }, [popoverContentSwitch]);

    useEffect(() => {
        if(!showCustomSettingsModal){
            setActiveCustomizationTab(1);
        }
    }, [showCustomSettingsModal]);
    
    const Option = (props) => {
        let list = "";
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

    const ValueContainer = ({ children, ...props }) => {
        const { getValue, hasValue } = props;
        let list = "";
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

    const getProjectDetails = (project_id, task_id) => {
        if (project_id !== null) {
            Config.axios({
                url: `${Config.BASE_URL}/workspace/project/quick/setup/${project_id}/`,
                auth: true,
                success: (response) => {
                    let project = response.data;

                    Config.axios({
                        url: `${Config.BASE_URL}/workspace/vendor/dashboard/${project_id}`,
                        auth: true,
                        success: (taskResponse) => {
                            let task = taskResponse.data?.find(each => each.id == task_id);
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
                            // setSelectedTaskDetails(selectedFileRow.current);
                            getTaskAssignInfo(task_id);
                        },
                        error: (err) => { }
                    });
                },
                error: (err) => { }
            });
        }
    }

    const getAiCustomizationOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/ai_customize/`,
            auth: true,
            success: (response) => {
                let custData = []
                Object.keys(response.data?.results)?.map(category => {
                    custData.push({
                        category,
                        values: response.data?.results[`${category}`]
                    });
                })
                // Define the desired order of categories
                const desiredOrder = ['Edit', 'Explore', 'Refer', 'Translate', 'Convert'];
                // Rearrange the JSON according to the desired order
                const rearrangedJSON = custData.sort((a, b) => desiredOrder.indexOf(a.category) - desiredOrder.indexOf(b.category));
                setAiCustomizationOptions(rearrangedJSON);
            },
        });
    }

    if (!!document.createRange && document.querySelector('#pop')?.style?.visibility != 'visible') {
        document.getSelection().removeAllRanges();
    }

    const getAiWritingTone = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/ai_tones/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = [];
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.tone
                    })
                });
                toneOptionsRef.current = options;
                setToneOptions(options);
                setSelectedTone(options[0]);
                selectedToneRef.current = options[0].value;
            },
        });
    };

    const getAiWritingCategories = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/ai_categories/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let mainCateg = [];
                let subCateg = [];
                response.data?.map(each => {
                    mainCateg.push({
                        value: each.id,
                        label: each.category
                    });
                    each.prompt_category?.map(item => {
                        subCateg.push(item)
                    });
                })
                setCategoryOptions(mainCateg);
                mainCategoryRef.current = mainCateg;
                subCategoryRef.current = subCateg;
                // setSeletctedMainCategory(mainCateg[0]);
            },
        })
    }

    /* Get language options list */
    const getLanguagesList = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setSourceLanguageOptions(response.data);
                setTargetLanguageOptions(response.data);
                // setAlreadySelecetedTarLangID([17]);  // this is for selecting the language in UI
                // getFilesProjectList();
            },
        };
        Config.axios(params);
    };

    // get transcription task data
    const getTranscribeFile = (taskID) => {
        isInitialHtmlDataLoaded.current = true;

        Config.axios({
            url: `${Config.BASE_URL}/workspace/get_transcribe_file/?task=${taskID}`,
            auth: true,
            success: (response) => {
                setDocumentName(response.data[0]?.project_name);
                if (response.data[0]?.transcription_source_file) {
                    getReferenceFile(response.data[0]?.transcription_source_file);
                }
                documentNameRef.current.innerHTML = response.data[0]?.project_name
                if (response.data[0]?.punctuation_support === false) {
                    setShowPunctuationModal(true);
                }
                if (response.data[0]?.html_data !== null) {
                    summerNoteEditorRef.current.summernote('code', response.data[0]?.html_data);
                    $('.summernote').summernote('commit');
                } else {
                    // console.log('indie')
                    summerNoteEditorRef.current.summernote('code', "<p>"+response.data[0]?.transcripted_text+"</p>");
                    $('.summernote').summernote('commit');
                }
                isInitialHtmlDataLoaded.current = false;
            },
        });
    }


    const getHtmlToDocxFileBlob = async (target) => {
        var summerNoteData = document.querySelector('.note-editable').innerHTML;
        if($('.summernote').summernote('isEmpty')) {
            Config.toast('Nothing to download', 'warning');
            return;
        }
        // var htmlData = summerNoteEditorRef.current.summernote('code');
        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    let c = attribs?.color ? attribs?.color : '';
                    let s = attribs?.style ? attribs.style : '';
                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });
        if (target === 'download') {
            setIsDocxFileDownloading(true);
            dispatch(addDownloadingFiles({ id: createdDocumentId.current, file_name: documentNameRef.current.innerText, ext: '.docx', status: 1 }));
        }
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        let formData = new FormData();
        // regex to replace all <p><br /></p>
        let cleaned = clean?.replace(/<p><br \/><\/p>/g, '<br />');
        let removedPandH1 = cleaned?.replace(/<(p|h1|h2|h3)>\s*<\/\1>/g, '');
        let removedStyleAttribFromImg = removedPandH1.replace(/<img(.*?)\s+style\s*(=\s*["'][^"']*["'])?(\s.*?)?>/gi, '<img$1$3>');
        formData.append("html", removedStyleAttribFromImg);
        formData.append("name", "name");
        // formData.append("html", clean);
        // formData.append("name", documentNameRef.current.innerText);

        axios({
            method: "POST",
            // url: "https://apinode.ailaysa.com/docx-generator",
            url: "https://apinodestaging.ailaysa.com/docx-generator",
            // url: "http://localhost:8000/docx-generator",
            // url: `${Config.BASE_URL}/workspace/docx_convertor/`,
            //  url: `${Config.BASE_URL}/workspace/html2docx`,
            data: formData,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
            // headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            docxFileBlobRef.current = response.data;
            if (target === 'download') {
                downloadHtmlToDocx();
                setIsDocxFileDownloading(false);
            } else if (target === 'file') {
                return getHtmlToDocxFile();
            }
        })
        .catch(function (response) {
            //handle error
            Config.toast("Failed to download file", 'error');
            setIsDocxFileDownloading(false);
            dispatch(deleteDownloadingFile({ id: createdDocumentId.current }));
        });
    }

    const downloadHtmlToDocx = async () => {
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = URL.createObjectURL(docxFileBlobRef.current);
        fileDownload.download = Config.unescape(`${documentNameRef.current?.innerText?.split('.')[0] ? documentNameRef.current?.innerText?.split('.')[0] : 'Untitled'}.docx`);
        fileDownload?.click();
        document.body.removeChild(fileDownload);
        // update the list once download completed
        dispatch(updateDownloadingFile({ id: createdDocumentId.current, status: 2 }));
        setTimeout(() => {
            // remove the downloaded file from list
            dispatch(deleteDownloadingFile({ id: createdDocumentId.current }));
        }, 8000);
    }

    // create docx file object from html data 
    const getHtmlToDocxFile = async () => {
        var summerNoteData = document.querySelector('.note-editable').innerHTML;
        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    let c = attribs?.color ? attribs?.color : '';
                    let s = attribs?.style ? attribs.style : '';
                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });
        // regex to replace all <p><br /></p>
        let cleaned = clean?.replace(/<p><br \/><\/p>/g, '<br />');
        let removedPandH1 = cleaned?.replace(/<(p|h1|h2|h3)>\s*<\/\1>/g, '');
        let removedStyleAttribFromImg = removedPandH1.replace(/<img(.*?)\s+style\s*(=\s*["'][^"']*["'])?(\s.*?)?>/gi, '<img$1$3>');
        // formData.append("name", documentNameRef.current.innerText);
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("html", removedStyleAttribFromImg);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };

        try{
            let data = await fetch(`https://apinodestaging.ailaysa.com/docx-generator`, requestOptions);
            if (data.status === 200) {
                let response = await data.blob();    
                let fileObj = new File([response], `${documentNameRef.current?.innerText?.split('.')[0] === '' ? 'untitled' : documentNameRef.current?.innerText?.split('.')[0]}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                return fileObj;
            }else {
                console.error('Failed to download file');
                return null;
            }
        }catch(e) {
            console.error(e);
        }
    }

    /* Spellcheck the current focused contenteditable */
    const spellCheck = (sentence) => {
        let formData = new FormData();
        formData.append("doc_id", createdDocumentId.current);
        formData.append("target", sentence);
        let url = `${Config.BASE_URL}/workspace_okapi/spellcheck/`;

        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                let result = response.data.result;
                // setIsWordsCorrected(response.data.result.length === 0 ? true : false);
                // setIsWordsCorrectedTrigger(!isWordsCorrectedTrigger);
                // spellCheckData.current = result;
                // setTimeout(() => {
                // if (!grammarPopoverOpen) {
                //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                //         targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                //         "mark"
                //     );
                // } else {
                //     setGrammarPopoverOpen(false);
                //     setgrammarCheckPopoverTarget("");
                //     targetContentEditable.current[focusedDivIdRef.current].current.innerHTML = removeSpecificTag(
                //         targetContentEditable.current[focusedDivIdRef.current].current.innerHTML,
                //         "mark"
                //     );
                // }
                // result.map((value) => {
                //     checkIt(thisElement, value.word);
                // });
                // }, 1000)
            },
            error: () => {
                // Sometime it's showing error response. Handle it
            },
        });
    };

    // get and load the html data for pdf and task
    const getWriterHtmlData = (id, target) => {
        isInitialHtmlDataLoaded.current = true;

        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/?${target}=${id}`,
            auth: true,
            success: (response) => {
                // console.log(response.data[0]?.html_data);
                if (response.data[0]?.html_data !== null) {
                    if (target === 'id') {    // from toolkit
                        if (response.data[0]?.pdf_file) {
                            getReferenceFile(response.data[0]?.pdf_file);
                        }
                        summerNoteEditorRef.current?.summernote('code', response.data[0]?.html_data);
                        $('.summernote').summernote('commit');
                        setDocumentName(response.data[0]?.docx_file_name);
                        documentNameRef.current.innerHTML = sanitizeHtml(response.data[0]?.docx_file_name);
                        if ((document.querySelector('.note-editable') && document.querySelector('.note-editable-backdrop'))) {
                            document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '20%', 'important');
                            document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '20%', 'important');
                            document.querySelector('.note-editable').style.setProperty('padding-left', '20%', 'important');
                            document.querySelector('.note-editable').style.setProperty('padding-right', '20%', 'important');
                        }
                        if (document.querySelector('.temp-color')) {
                            document.querySelector('.temp-color').classList.remove('temp-color')
                        }
                    } else {  // from task
                        if (response.data?.pdf_file) {
                            getReferenceFile(response.data?.pdf_file);
                        }
                        summerNoteEditorRef.current?.summernote('code', response.data?.html_data);
                        $('.summernote').summernote('commit');
                        setDocumentName(response.data?.docx_file_name);
                        documentNameRef.current.innerHTML = sanitizeHtml(response.data?.docx_file_name);
                        if ((document.querySelector('.note-editable') && document.querySelector('.note-editable-backdrop'))) {
                            document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '20%', 'important');
                            document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '20%', 'important');
                            document.querySelector('.note-editable').style.setProperty('padding-left', '20%', 'important');
                            document.querySelector('.note-editable').style.setProperty('padding-right', '20%', 'important');
                        }
                        if (document.querySelector('.temp-color')) {
                            document.querySelector('.temp-color').classList.remove('temp-color')
                        }
                    }
                    isInitialHtmlDataLoaded.current = false;
                }
            }
        });
    }

    const getHtmlDataForDocument = (id) => {
        isInitialHtmlDataLoaded.current = true;
        // summerNoteEditorRef.current.summernote('saveRange');

        Config.axios({
            url: `${Config.BASE_URL}/workspace/mydocuments/${id}`,
            auth: true,
            success: (response) => {
                if (response.data?.html_data !== null) {
                    summerNoteEditorRef.current?.summernote('code', response.data?.html_data);
                    $('.summernote').summernote('commit');
                    setDocumentName(response.data?.doc_name);
                    documentNameRef.current.innerHTML = sanitizeHtml(response.data?.doc_name);
                    isInitialHtmlDataLoaded.current = false;
                    if (document.querySelector('.temp-color')) {
                        document.querySelector('.temp-color').classList.remove('temp-color');
                    }
                }
                if (response.data?.blog_data !== null) {
                    const paragraphs = response.data.blog_data?.split("\n");
                    paragraphs.forEach(paragraph => {
                        if (paragraph?.includes('<h1>')) {
                            const h1 = document.createElement("h1");
                            h1.innerHTML = sanitizeHtml(paragraph);
                            summerNoteEditorRef.current?.summernote('pasteHTML', paragraph);
                        } else if (paragraph?.includes('<h2>')) {
                            const h2 = document.createElement("h2");
                            h2.innerHTML = sanitizeHtml(paragraph);
                            summerNoteEditorRef.current?.summernote('pasteHTML', paragraph);
                        } else {
                            const p = document.createElement("p");
                            p.innerHTML = sanitizeHtml(paragraph);
                            summerNoteEditorRef.current?.summernote('insertNode', p);
                        }
                    });
                    setDocumentName(response.data?.doc_name);
                    documentNameRef.current.innerHTML = sanitizeHtml(response.data?.doc_name);
                    isInitialHtmlDataLoaded.current = false;
                    if (document.querySelector('.temp-color')) {
                        document.querySelector('.temp-color').classList.remove('temp-color');
                    }
                    // summerNoteEditorRef.current?.summernote('code', response.data?.blog_data);
                }
                setEndOfContenteditable(document.querySelector('.note-editable'));
            },
            error: (err) => {}
        });
    }

    const getTaskAssignInfo = (taskId) => {
        let project = selectedFileRow.current?.project_data;
        let task = selectedFileRow.current?.task_data;
        let isProjectAssigned = project?.assign_enable !== undefined ? !project?.assign_enable : false;

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?tasks=${taskId}${(task?.task_reassign_info == true) ? '&reassigned=True' : ''}`,
            auth: true,
            success: (response) => {
                if (response.data?.length !== 0) {
                    setIsTaskAssigned(true);
                    if (response.data?.find(each => each.assign_to_details?.id == userDetails?.pk || each?.assign_to_details?.managers?.find(usr => usr === userDetails?.pk))) {
                        setIsTaskAssignedToMe(true);
                        isTaskAssignedToMeRef.current = true;
                        let info = response.data?.find(each => each.assign_to_details?.id == userDetails?.pk || each?.assign_to_details?.managers?.find(usr => usr === userDetails?.pk));
                        if (info?.task_assign_detail.task_status === 'In Progress') {
                            isTaskInProgressRef.current = true;
                            setShowSubmitDocment(true);
                        } else {
                            isTaskInProgressRef.current = false;
                            setShowSubmitDocment(false);
                        }
                    } else {
                        setShowSetAsTranslationBtn(true);
                    }
                } else {
                    setShowSetAsTranslationBtn(true);
                }
            },
            error: (err) => {}
        });
    }

    // update/save the html data with docx file
    const saveHtmlDataForPdf = async (target) => {
        // setIsSaved(false);
        let taskParam = URL_SEARCH_PARAMS.get("task");
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
        let formData = new FormData();
        var htmlData = summerNoteEditorRef.current.summernote('code');
        formData.append("html_data", htmlData);
        formData.append("by", taskParam ? "task" : "pdf");
        if (target === 'translate' || target === 'create-new') {
            const blobObj = await getHtmlToDocxFile();
            let fileObj = new File([blobObj], `${documentNameRef.current?.innerText?.split('.')[0]}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            formData.append("docx_file", fileObj);
        }

        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/${taskParam ? taskParam : pdfParam}/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                setTimeout(() => {
                    // setIsSaved(true);
                }, 1800);
                if (isTaskAssignedToMeRef.current && !isTaskInProgressRef.current) {
                    getTaskAssignInfo(taskParam);
                }
                if (target === 'translate') {
                    translateDocument();
                }
            }
        });
    }


    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 1000);
    };

    const translateDocument = async () => {
        setIsTranslateProceeding(true);
        let taskParam = URL_SEARCH_PARAMS.get("task");
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
        let docParam = URL_SEARCH_PARAMS.get("document-id");        
        let bookParam = URL_SEARCH_PARAMS.get("book");
        let isCoAuthor = window.location.pathname.includes('book-writing');        
        let formdata = new FormData();
        if (!isCoAuthor && (docParam == null || docParam == undefined) && (createdDocumentId.current == null)) {
            formdata.append(taskParam ? "pdf_task_id" : "pdf_obj_id", taskParam ? taskParam : pdfParam);
        }
        if (!isCoAuthor && (docParam || createdDocumentId.current !== null)) {
            formdata.append("files", await getHtmlToDocxFile());
        }
        if(isCoAuthor && bookParam){
            formdata.append("files", await getHtmlToDocxFile());
        }

        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId ? projectId : selectedProjectToUpdate?.id}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                if (!projectId) {
                    history(`/file-upload?page=1&order_by=-id&search=${selectedProjectToUpdate?.project_name}&open-project=${response?.data?.id}`);
                }
                else {
                    history(`/file-upload?page=1&order_by=-id&search=${response.data?.project_name}&open-project=${response?.data?.id}`);
                    // history(`/file-upload?page=${prevPageInfo.current?.pageNo ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${response?.data?.id}`);
                    Config.toast(t("translation_task_created"));
                }
                setIsTranslateProceeding(false);
            },
        });
    }

    // Translate button
    const handleTranslateBtn = async () => {
        if (summerNoteEditorRef.current.summernote('isEmpty') || document?.querySelector('.note-editable')?.innerText?.trim()?.replace(/\n/g, '')?.length === 0) {
            Config.toast(t("document_is_empty"), 'warning');
            return;
        }
        if (projectId) {
            saveHtmlDataForPdf('translate');
        } else if (URL_SEARCH_PARAMS.get("transcription-task")) {
            saveTranscriptionData('translate');
        } else {
            var textData = document.querySelector('.note-editable')?.innerText?.trim();
            // let wordCount = count(document?.querySelector('.note-editable')?.innerText?.replace(/\n/g, '')).words;
            let wordCount = document?.querySelector('.note-editable')?.innerText?.trim().split(/\s+/).length;
            if (wordCount === 0) {
                Config.toast(t("empty_docs_translated_note"), 'warning');
            } else {
                setUserTranslateChoiceModal(true);
            }
        }
    }

    // Procced button
    const handleProceedBtn = async () => {
        let taskParam = URL_SEARCH_PARAMS.get("task");
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
        let docParam = URL_SEARCH_PARAMS.get("document-id");
        let bookParam = URL_SEARCH_PARAMS.get("book");
        let isCoAuthor = window.location.pathname.includes('book-writing');
        setIsTranslateProceeding(true);
        if (userTranslateChoice === 'new') {
            if (pdfParam) {   // from pdf -> first save docx file, then redirect to project creation page 
                await saveHtmlDataForPdf('create-new');
                history(`/create/translate/files/translate-files?pdf=${pdfParam}`, {state: { filename: documentNameRef.current?.innerText }});
            } else if(isCoAuthor && bookParam){
                let file = await getHtmlToDocxFile();
                setTimeout(() => {
                    history(`/create/translate/files/translate-files?doc=${(bookCreationObjRef.current?.id !== null && bookCreationObjRef.current?.id !== undefined) && bookCreationObjRef.current?.id}`, {state: { filename: bookCreationObjRef.current?.name, docxFile: file }})
                }, 80);
            } else if (docParam || createdDocumentId.current) {    // from document -> redirect to project creation page with docx file 
                let file = await getHtmlToDocxFile();
                setTimeout(() => {
                    history(`/create/translate/files/translate-files?doc=${createdDocumentId.current !== null ? createdDocumentId.current : docParam}`, {state: { filename: documentNameRef.current?.innerText, docxFile: file }})
                }, 80);
            }
        } else {
            if (docParam || createdDocumentId.current) {
                saveHtmlDataForDocument('translate');
            } else if (isCoAuthor && bookParam) {
                translateDocument();
            } else {
                saveHtmlDataForPdf('translate');
            }
            // history(`/create/translate/files/translate-files?pdf=${selectedPdfObj?.id}&get-project-info=${selectedProjectToUpdate?.value}&type=${1}`, {filename: selectedPdfObj?.filename});
        }
    }


    const createNewDocument = async (from, files) => {
        var textData = document.querySelector('.note-editable')?.innerText;
        // let wordCount2 = count(document?.querySelector('.note-editable')?.innerText?.replace(/\n/g, '')).words;
        let wordCount = document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.length;        
        var htmlData = document.querySelector('.note-editable')?.innerHTML;
        if (htmlData === '') {
            return;
        }
        let formdata = new FormData();
        if (documentNameRef.current?.innerText !== null && documentNameRef.current?.innerText?.trim() !== '') {
            formdata.append("doc_name", Config.unescape(documentNameRef.current?.innerText));
        }
        formdata.append("html_data", htmlData);
        formdata.append("word_count", wordCount);
        // formdata.append("file", fileObj);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/mydocuments/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: async (response) => {
                createdDocumentId.current = response.data?.id;
                // create document and then upload the image to server and add in DOM
                if (from === 'image-upload') {
                    let userCacheData = JSON.parse(
                        typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
                    );
                    let token = userCacheData != null ? userCacheData?.token : "";
                    var formdata = new FormData();
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", `Bearer  ${token}`);
                    formdata.append("document", response.data?.id);
                    formdata.append("image", files[0]);
                    var requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow',
                        headers: myHeaders,
                    };
                    let data = await fetch(Config.BASE_URL + "/workspace/doc_image/", requestOptions);
                    if (data.status === 200) {
                        let response = await data.json();
                        summerNoteEditorRef.current?.summernote("insertImage", `${Config.BASE_URL}${response.image}`);
                    }
                }
                summerNoteEditorRef.current.summernote('saveRange');
                if (from === 'image-upload') {
                    setTimeout(() => {
                        history(`/word-processor?document-id=${response.data?.id}`, {state: location.state})
                    }, 8500);
                } else {
                    history(`/word-processor?document-id=${response.data?.id}`, {state: location.state});
                }
                // setIsDocument(true);
                isWriterDocumentRef.current = true;
            },
        });
    }

    const closeOverlay = () => {
        document.querySelector('.ailaysa-writter-main-wrapper').style.pointerEvents = 'all';
        document.querySelector('.pop-overlay').style.display = 'none';
        // window.getSelection().removeAllRanges();
    }

    function setEndOfContenteditable(contentEditableElement) {
        var range, selection;
        if (document.createRange) {       //Firefox, Chrome, Opera, Safari, IE 9+
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if (document.selection) {    //IE 8 and lower
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

    const saveHtmlDataForDocument = (target) => {
        // setIsSaved(false);
        var textData = document.querySelector('.note-editable')?.innerText;
        var htmldata = document.querySelector('.note-editable')?.innerHTML;
        let wordCount = document?.querySelector('.note-editable')?.innerText?.trim().split(/\s+/).length;
        let docParam = URL_SEARCH_PARAMS.get("document-id");
        let formdata = new FormData();
        formdata.append("doc_name", Config.unescape(documentNameRef.current?.innerText));
        if (target == 'article') {
            let data = document.querySelector('.note-editable').innerText;
            let html = convert.render(data);
            let final = html.replace(/(?:\r\n|\r|\n)/g, '');
            formdata.append("html_data",final);
        } else {
            formdata.append("html_data", summerNoteEditorRef.current.summernote('code'));
        }
        // formdata.append("html_data", summerNoteEditorRef.current.summernote('code'));
        formdata.append("word_count", wordCount);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/mydocuments/${docParam ? docParam : createdDocumentId.current}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // setTimeout(() => {
                //     // setIsSaved(true)
                // }, 1800);
                // setContinueWritingEnable(true)
                enableTabFunctionRef.current = true;
                if (target === 'translate') {
                    translateDocument();
                }
            },
        });
    }

    const saveTranscriptionData = async (target) => {
        // setIsSaved(false);
        var htmlData = summerNoteEditorRef.current.summernote('code');
        let projectParam = URL_SEARCH_PARAMS.get("project");
        let transcripParam = URL_SEARCH_PARAMS.get("transcription-task");
        let formdata = new FormData();
        formdata.append("edited_text", htmlData);
        formdata.append("task_id", transcripParam);
        if (target === 'translate') {
            formdata.append("file", await getHtmlToDocxFile())
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace/writer_save/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                setTimeout(() => {
                    // setIsSaved(true);
                }, 1800);
                // Config.toast('Document saved successfully');
                if (isTaskAssignedToMeRef.current && !isTaskInProgressRef.current) {
                    getTaskAssignInfo(transcripParam);
                }
                if (target === 'translate') {
                    // setSavedWriterFile();
                    let summerNoteTxt = Config.unescape(htmlData?.replace(/<\/?[^>]+(>|$)/g, ""));
                    const regex = new RegExp('[.|?。!]+(\s|\n)?'); // check for punctuation validation
                    if (!regex.test(summerNoteTxt) && summerNoteTxt?.length > 350) {
                        setShowPunctuationModal(true);
                        setPunctuationValidation(true);
                        return;
                    }
                    history(`/create/speech/speech-to-text?get-project-info=${projectParam}&task=${transcripParam}&type=4`,
                    {state: {
                        writerFile: {
                            id: response.data.id,
                            filename: `${response.data.writer_filename}.docx`,
                            can_delete: true
                        }
                    }});
                }
            },
            error: (err) => {
                Config.toast(t("improper_text_frmting"), 'warning');
                setTimeout(() => {
                    // setIsSaved(true);
                }, 1800);
            },
        });
    }

    // Function to check if a string contains RTL characters
    const containsRtlCharacters = (text) => {
        var rtlCharacters = /[\u0600-\u06FF\u0590-\u05FF\uFE70-\uFEFF]/;
        // return rtlCharacters.test(text);
        // Count the number of RTL characters and non-RTL characters
        let rtlCount = 0;
        let nonRtlCount = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (rtlCharacters.test(char)) {
                rtlCount++;
            } else {
                nonRtlCount++;
            }
        }
        // Compare the counts and return the result
        return rtlCount > nonRtlCount;
    }

    // move prompt result from history tab to editor
    const moveToEditorFromHistory = (promptResult) => {
        if (document.querySelector('.temp-color')) {
            document.querySelector('.temp-color').classList.remove('temp-color');
        }
        setHistoryTab(false);
        setTimeout(() => {
            editor?.summernote('focus');
            promptResult?.forEach((each) => {
                var node = document.createElement('p');
                var brNode2 = document.createElement('p');
                brNode2.innerHTML = "<br />"
                node.innerHTML = sanitizeHtml(each?.trim());
                // node.style = 'background-color:#cee6f9; display: inline;';
                node.className = 'temp-color';
                if (containsRtlCharacters(each)) {
                    node.classList.add('right-align-lang-style');
                } else {
                    node.classList.remove('right-align-lang-style');
                }
                node?.addEventListener('click', removeBgColor);
                document.querySelector('.note-editable').appendChild(node)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                document.querySelector('.note-editable').appendChild(brNode2);
            })
            setTimeout(() => {
                globalSaveLogic();
            }, 2000);
        }, 800);
    }

    // to remove the background color of added prompt
    const removeBgColor = (e) => {
        e.target.classList.remove('temp-color');
        e.target.removeEventListener('click', removeBgColor);
    }

    const root = document.querySelector('.note-editable');
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


    function decidePopPosition(rect) {
        if (document.querySelector('.tab-to-write-more-tooltip') && window.getSelection()?.toString() !== 0) {
            // document.querySelector('.tab-to-write-more-tooltip').style.setProperty('display', "hidden", 'important');
            document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden";

        }
        // let x = rect.left + (rect.width) / 2 - document.querySelector('#pop').clientWidth / 2 + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
        let x = rect.left - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#pop')?.clientWidth > document.querySelector('.ailaysa-writter-working-col-wrapper')?.clientWidth)
            x = document.querySelector('.ailaysa-writter-working-col-wrapper')?.clientWidth - document.querySelector('#pop')?.clientWidth;
            let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {
            y = rect.top - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop - document.querySelector('#pop').clientHeight - 8;
            dir = 'up';
            if (y < 0) {
                y = rect.bottom - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 8;
                dir = 'down';
            }
        }
        else {
            y = rect.bottom - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 8;
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const hideTabtoWriteMore = (e) => {
        if (document.querySelector('.tab-to-write-more-tooltip')) {
            document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden";
        }
    }

    window.onerror = function (message, file, line, col, error) {
        console.error("Error occurred: " + error.message);
        return false;
    };

    window.addEventListener("error", function (e) {
        console.error("Error occurred: " + e.error.message);
        return false;
    })
    
    const debounceApiCall = () => {
        if (userSelectionCallTimer) {
          clearTimeout(userSelectionCallTimer);
        }
        userSelectionCallTimer = setTimeout(() => {
            checkSelection();
            userSelectionCallTimer = null;
        }, 300); // Adjust the debounce delay as needed
    }

    function checkSelection() {
        // setTimeout(() => {
            let selection = window.getSelection();
            if(selection.toString()?.length === 0){
                if (document.querySelector('.word-count-number2')) {
                    dispatch(setWriterSelectionWordCount({
                        char: 0,
                        word: 0
                    }));
                    document.querySelector('.word-count-number2').innerHTML = currentSummerNoteTextData.current ? currentSummerNoteTextData.current : 0;
                }
            }            
            let range = selection && selection.rangeCount && selection.getRangeAt(0);
            let x = (document.querySelector('.note-editable')?.getBoundingClientRect().width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector('.note-editable')?.scrollLeft;
            let y = (document.querySelector('.note-editable')?.getBoundingClientRect().height) / 2 - document.querySelector('#pop')?.clientHeight + document.querySelector('.note-editable')?.scrollTop;
            if (!range) {
                if (document.querySelector('#pop')) {
                    // document.querySelector('#pop').style.opacity = '0';
                    // setTimeout(()=>
                    // ,20);
                    // document.querySelector('#pop').style.visibility = 'hidden'
                    // document.querySelector('#pop').style.left = x + 'px';
                    // document.querySelector('#pop').style.top = y + 'px';
                    if (document.querySelector('.word-count-number2')) {
                        document.querySelector('.word-count-number2').innerHTML = currentSummerNoteTextData.current ? currentSummerNoteTextData.current : 0;
                    }
                    // if(document.querySelector('.notification-dot-cutomiz')){
                    //     document.querySelector('.notification-dot-cutomiz').style.setProperty('display', 'none', 'important');
                    // }
                }
                return;
            }
            let rect = range?.getBoundingClientRect();
            if (Math.floor(rect.width) > 0 && document.querySelector('.ailaysa-writter-working-col-wrapper')?.contains(range.commonAncestorContainer)) {                
                // don't calculate the pop modal position when the modal is already open 
                if(popoverContentSwitchRef.current && isPopInPositionRef.current) {
                    return;
                }                
                // calculate the word and character count and store it in redux
                if (document.querySelector('.word-count-number2')) {
                    dispatch(setWriterSelectionWordCount({
                        char: count(window.getSelection()?.toString().replace(/\n/g, '')).chars,
                        word: window.getSelection()?.toString()?.trim()?.split(/\s+/)?.length !== undefined ? window.getSelection()?.toString()?.trim()?.split(/\s+/)?.length : 0
                    }))
                    document.querySelector('.word-count-number2').innerHTML = count(window.getSelection()?.toString().replace(/\n/g, '')).chars + " of " + count(document?.querySelector('.note-editable')?.innerText?.replace(/\n/g, '')).chars
                }  
                let pos = decidePopPosition(rect);
                let top = pos.y - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop;
                let left = pos.x - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
                if (top < 0)
                    top = document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 20;
                else if (top + document.querySelector('#pop').clientHeight > document.querySelector('.ailaysa-writter-working-col-wrapper').clientHeight);
                    top = document.querySelector('.ailaysa-writter-working-col-wrapper').clientHeight - document.querySelector('#pop').clientHeight + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop - 20;
                if (left < 0)
                    left = document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft + 20;
                else if (left + document.querySelector('#pop').clientWidth > document.querySelector('.ailaysa-writter-working-col-wrapper').clientWidth)
                    left = document.querySelector('.ailaysa-writter-working-col-wrapper').clientWidth - document.querySelector('#pop').clientWidth + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft - 20;
                if (isMakePopInsideViewPort && (top != pos.y - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop || left != pos.x - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft)) {
                    document.querySelector('#pop').style.top = `${top}px`;
                    document.querySelector('#pop').style.left = `${left}px`;
                    // document.querySelector('#pop').style.setProperty('transform', `translate(${`${left}px`}, ${`${top}px`})`);
                }
                else {
                    if(pos.y > 1300) pos.y = 200;
                    document.querySelector('#pop').style.top = `${pos.y}px`;
                    document.querySelector('#pop').style.left = `${pos.x}px`;
                }
                // document.querySelector('#pop').style.setProperty('transform', `translate(${`${pos.x}px`}, ${`${pos.y}px`})`);
                changeArrow(pos.dir);
                document.querySelector('#pop').style.visibility = 'visible';
                document.querySelector('#pop').style.opacity = '1';
                if(popoverContentSwitchRef.current){
                    isPopInPositionRef.current = true;
                }
            }
            else {
                // if (document.querySelector('#pop')) {
                //     document.querySelector('#pop').style.opacity = '0';
                //     document.querySelector('#pop').style.visibility = 'hidden'
                //     if(document.querySelector('.word-count-number')){
                //         document.querySelector('.word-count-number').innerHTML =  currentSummerNoteTextData.current ?  currentSummerNoteTextData.current : 0;
                //     }
                // }
            }

        // }, 100);
    }

    useEffect(() => {
        if (!historyTab) {
            document.addEventListener('selectionchange', debounceApiCall);            
            window.addEventListener('resize', debounceApiCall);
            window.addEventListener('scroll', debounceApiCall);
            if (document.querySelector('.note-editable')) {
                document.querySelector('.note-editable').addEventListener('scroll', hideTabtoWriteMore);
            }
            addScrollListners(root, debounceApiCall);
            function addScrollListners(elm, callback) {
                if (!elm || elm == document.body) return;
                elm.addEventListener('scroll', callback);
                addScrollListners(elm.parentNode);
                // hideTabtoWriteMore();
            }
            document.addEventListener('contextmenu', debounceApiCall);

            return () => {
                try{
                    document.removeEventListener('selectionchange', debounceApiCall);
                    window.removeEventListener('resize', debounceApiCall);
                    window.removeEventListener('scroll', debounceApiCall);
                    document.removeEventListener('contextmenu', debounceApiCall);
                    if (document.querySelector('.note-editable')) {
                        document.querySelector('.note-editable').removeEventListener('scroll', hideTabtoWriteMore);
                    }
                }catch(e){
                    console.error(e)
                }
            };
        }
    }, [])

    if (!historyTab) {
        let resizeObserver = new ResizeObserver(() => {
            // checkSelection();
            debounceApiCall();
        });
        if (document.querySelector('.ailaysa-writter-working-col-wrapper')) {
            resizeObserver.observe(document.querySelector('.ailaysa-writter-working-col-wrapper')
            );
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
        let fullSentence = window.getSelection().getRangeAt(0).startContainer.textContent
        let synonomText = window.getSelection().toString().trim()
        let secondWord = window.getSelection().getRangeAt(0).startContainer.textContent.slice(0, window.getSelection()?.anchorOffset)
        formdata.append("word", synonomText.trim());
        formdata.append("word", synonomText.trim());
        formdata.append("sentence", fullSentence);
        formdata.append("second_word", secondWord.length !== 0 ? secondWord : "-1");
        formdata.append("second_word", "-1");
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
            if (response.context) {
                setMoreToolsContentSwitch(true);
                setSynonymsList(response.context);
            } else {
                Config.toast(t("no_output_diff_text_note"), 'warning');

            }
        }
    }

    const getAiCustomizationResult = (id, sel_customization, sel_category, src, tar, mtengin) => {
        handleCustomizationPopoverCloseBtn();
        document.querySelector('#pop').style.setProperty('display', 'block');
        if (window.getSelection().type === 'Range' || sel_customization === 'Continue Writing') {
            // setTabSelectionDisable(false);
            // showOverlay();
            // setTooltipTabLoader(true);
            if (sel_customization !== 'Continue Writing') {
                setPopupLoading(sel_customization);
                setIsMakePopInsideViewPort(true);
                setCustomizationResult(null);
                setSelectedCustomization(sel_customization);
                selectedCustomizationCategoryRef.current = sel_category;
                setSelectedCustomizationCategory(sel_category);
            } else {
                writterWrittingRef.current.style.display = 'block';
                tabToWriteTextRef.current.style.display = 'none';
            }
            let formdata = new FormData();
            // setPopoverContentSwitch(true);
            const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
            enableTabFunctionRef.current = false;
            let docParam = URL_SEARCH_PARAMS.get("document-id");
            let transcribeParam = URL_SEARCH_PARAMS.get("transcription-task");
            let taskParam = URL_SEARCH_PARAMS.get("task");
            let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
            let bookParam = URL_SEARCH_PARAMS.get('book');
            let isCoAuthor = window.location.pathname.includes('book-writing');
            let selectedText = window.getSelection()?.toString();
            // document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible';
            let width = window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('width').replaceAll('px', '') - (window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('padding-left').replaceAll('px', '') * 2);
            formdata.append("user_text", sel_customization === 'Continue Writing' ? sel_category : selectedText);
            formdata.append("customize_id", id);
            // if(id === 24) formdata.append("percent", summerizePercentage);
            // my style
            if(id === 29) {
                if(myStyleData?.length === 0) {
                    dispatch(setShowCustomSettingsModal(true));
                    setActiveCustomizationTab(2);
                    Config.toast(t("empty_my_style_text2"), "warning");
                    return;
                }
                formdata.append("my_style", myStyleData[0]?.id);
            }
            if (id == 23) {
                formdata.append("language", src);
                for (let i = 0; i < tar.length; i++) {
                    formdata.append("target_lang", tar[i]?.id);
                }
                formdata.append("mt_engine", mtengin);
            }
            if (sel_category == 'Explore' || sel_category == 'Refer') {
                formdata.append("language", src);
            }
            if (!isCoAuthor && transcribeParam === null && taskParam === null && pdfParam === null) {
                formdata.append("document_id", docParam ? docParam : createdDocumentId.current);
            }
            if (transcriptionTaskId.current !== null || transcribeParam) {
                formdata.append("task", transcribeParam ? transcribeParam : transcriptionTaskId.current);
            }
            if (taskParam) {
                formdata.append("task", taskParam);
            }
            if(isCoAuthor){
                formdata.append("book", bookParam);
            }           
            if (sel_customization == 'Continue Writing' && toggleWritingStateRef.current === 1) {
                formdata.append("tone", selectedToneRef.current);
            }

            Config.axios({
                url: `${Config.BASE_URL}/writer/customize_text_generate`,
                method: "POST",
                data: formdata,
                auth: true,
                success: (response) => {
                    // open content reference modal to show the references
                    if(sel_category === 'Refer'){
                        document.querySelector('#pop').style.setProperty('display', 'none');                        
                        if(response.data?.res?.length === 0 && id === 26) {
                            Config.toast('No result found', 'warning');
                            return;
                        }else if(id === 25){
                            if(Object.keys(response.data)?.length === 0){
                                Config.toast('No result found', 'warning');
                                return;
                            }
                        }
                        let res = {
                            data: response.data,
                            customize: id
                        }
                        if(id === 26) res.data.Title = selectedText.charAt(0).toUpperCase() + selectedText.slice(1);
                        if(id === 25 || id === 26) {
                            Config.openLinksInWindow(response.data.URL);
                        } else {
                            setContentReferenceResult(res);
                            setOpenContentReferenceModal(true);
                        }
                        return;
                    }
                    // setPopupLoading('none');
                    if (sel_customization != 'Continue Writing') {
                        if (id != 23) {//non translation 
                            if ((response.data?.api_result == null && response.data?.prompt_result == null)) {
                                Config.toast(t("no_output_diff_text_note"), 'warning');
                                closeOverlay();
                                return;
                            }
                            customizationResultRef.current = response.data?.user_text_lang === 17 ? response.data?.api_result : response.data?.prompt_result;
                            setCustomizationResult(response.data?.user_text_lang === 17 ? response.data?.api_result : response.data?.prompt_result);
                            // if customization defalt settings is available don't show the modal - directly apply the saved setting
                            if (
                                (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) && 
                                (defaultSettings?.append !== null && defaultSettings?.append !== undefined) &&
                                (!defaultSettings?.result_in_modal)
                            ) {
                                // replaceWithNewText(null, sel_customization);
                                insertResultInEditor(null, sel_customization);
                            } else {
                                setPopoverContentSwitch(true);
                            }
                            summerNoteEditorRef.current.summernote('focus');
                            summerNoteEditorRef.current.summernote('restoreRange');
                            document.querySelector('#pop').style.setProperty('max-width', `${width}px`, 'important');
                            document.querySelector('#pop').style.setProperty('min-height', `189px`, 'important');
                            // checkSelection();
                            debounceApiCall();
                        }
                        else {
                            if (response.data == null || undefined) {
                                Config.toast(t("no_output_diff_text_note"), 'warning')
                                closeOverlay();
                                return;
                            }
                            setCustomizationResult(response?.data[0].translation.result);
                            customizationResultRef.current = response?.data[0].translation.result;
                            if (
                                (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) && 
                                (defaultSettings?.append !== null && defaultSettings?.append !== undefined) &&
                                (!defaultSettings?.result_in_modal)
                            ) {
                                // replaceWithNewText(null, sel_customization);
                                insertResultInEditor(null, sel_customization);
                            } else {
                                setPopoverContentSwitch(true);
                            }
                            // setPopoverContentSwitch(true);
                            summerNoteEditorRef.current.summernote('focus');
                            summerNoteEditorRef.current.summernote('restoreRange');
                            document.querySelector('#pop').style.setProperty('max-width', `${width}px`, 'important');
                            document.querySelector('#pop').style.setProperty('min-height', `189px`, 'important');
                            // checkSelection();
                        }
                    } else {
                        document.querySelector('.tab-to-write-more-tooltip').style.visibility = "visible";
                        if (response.data?.api_result == null && response.data?.prompt_result == null) {
                            Config.toast(t("no_output_diff_text_note"), 'warning');
                            closeOverlay();
                            // document.querySelector('.write-more-tab').innerHTML = `Press <span class="tab-write-more-inner">Tab</span> to write more...`;
                            writterWrittingRef.current.style.display = 'none';
                            tabToWriteTextRef.current.style.display = 'block';
                            // setTooltipTabLoader(false);
                            document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden";
                            enableTabFunctionRef.current = true;
                            return;
                        }
                        if (document.querySelector('.temp-color')) {
                            document.querySelector('.temp-color').classList.remove('temp-color');
                        }
                        let countinueWrittingResult = response.data?.user_text_lang === 17 ? response.data?.api_result?.match(/[^\r\n]+/g) : response.data?.prompt_result?.match(/[^\r\n]+/g);
                        countinueWrittingResult?.forEach((each, index) => {
                            if (index === 0) {
                                var childSpan = document.createElement('span');
                                childSpan.className = 'temp-color';
                                childSpan.innerHTML = sanitizeHtml(" " + each.trim());
                                childSpan?.addEventListener('click', removeBgColor);
                                // insertHtmlAfterSelection(childSpan.innerHTML);
                                summerNoteEditorRef.current.summernote('insertNode', childSpan);
                                // summerNoteEditorRef.current.summernote('pasteHTML', '<p><br /></p>')
                            } else {
                                var childSpanP = document.createElement('p');
                                childSpanP.className = 'temp-color';
                                childSpanP.innerHTML = sanitizeHtml(each.trim());
                                childSpanP?.addEventListener('click', removeBgColor);
                                summerNoteEditorRef.current.summernote('insertNode', childSpanP);
                                summerNoteEditorRef.current.summernote('pasteHTML', '<p><br /></p>');
                            }
                        })
                        document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'hidden';
                        closeOverlay();
                        writterWrittingRef.current.style.display = 'none';
                        tabToWriteTextRef.current.style.display = 'block';
                        enableTabFunctionRef.current = true;
                        // setTooltipTabLoader(false);
                        summerNoteEditorRef.current.summernote("focus");
                        summerNoteEditorRef.current.summernote("restoreRange");
                    }
                    setPopupLoading('none');
                },
                error: (err) => {
                    closeOverlay();
                    console.error(err);
                    // summerNoteEditorRef.current.summernote("focus");
                    // summerNoteEditorRef.current.summernote("restoreRange");
                    // if(document.querySelector('.write-more-tab')){
                    //     document.querySelector('.write-more-tab').innerHTML = `Press <span class="tab-write-more-inner">Tab</span> to write more...`;
                    // }
                    enableTabFunctionRef.current = true;
                    if (err?.response?.status === 400) {
                        if (err?.response?.data?.msg == 'Insufficient Credits') {
                            // Config.toast('Insufficient Credits', 'warning');
                            setShowCreditAlertModal(true);

                        } else if(err?.response?.data?.msg?.includes('voice style')) {
                            dispatch(setShowCustomSettingsModal(true));
                            setActiveCustomizationTab(2);
                            Config.toast(t("empty_my_style_text2"), "warning");
                        } else {
                            Config.toast(t("no_output_diff_text_note"), 'warning');
                        }
                    } 
                    // else {
                    //     Config.toast(t("paraphrase_get_error_3"), 'error');
                    // }
                    if (err?.response?.status === 500) {
                        Config.toast(t("paraphrase_get_error_3"), 'error');
                    }
                    writterWrittingRef.current.style.display = 'none';
                    tabToWriteTextRef.current.style.display = 'block';
                    // setTooltipTabLoader(false);
                    setPopupLoading('none');
                }
            });
        }

    }

    function createImage(node, img, alt) {
        var p = document.createElement("p");
        var br = document.createElement('br');
        var x = document.createElement("IMG");
        x.setAttribute("src", img);
        p.appendChild(br);
        // x.setAttribute("height", "200");
        // x.setAttribute("width", "400");
        x.setAttribute("alt", alt);
        p.appendChild(x);
        // summerNoteEditorRef.current.summernote('inserNode', p);
        // node.append(x);
        // insertAfter(window.getSelection().baseNode,x);
        node.parentNode.insertBefore(p, node.nextSibling);
        const range = $.summernote.range;
        const rng = range.create(); //  is equals range.createFromSelection()
        const newRng = rng.collapse();
        newRng.select();
        $('.summernote').summernote('insertText', '');
        rng.select();
        p.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    const backendDocxTest = () => {
        let summerNoteData = '';
        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    // console.log(attribs)

                    // console.log(attribs.style)
                    // console.log(attribs.style)
                    let c = attribs?.color ? attribs?.color : ''
                    let s = attribs?.style ? attribs.style : ''


                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });
        // if(target === 'download'){
        //     setIsDocxFileDownloading(true);
        // }
        let formData = new FormData();
        formData.append("html", summerNoteData);
        formData.append("name", 'mytest-docx');
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        axios({
            method: "POST",
            url: `${Config.BASE_URL}/workspace/docx_convertor/`,
            data: formData,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(function (response) {
                //handle success
                docxFileBlobRef.current = response.data;
                downloadHtmlToDocx();
                // if (target === 'download') {
                //     setIsDocxFileDownloading(false)
                // } else if (target === 'file') {
                //     return getHtmlToDocxFile()
                // }
            })
            .catch(function (response) {
                //handle error
                // setIsDocxFileDownloading(false)
            });
    }

    const getAiGeneratedImage = (document, customisation, no) => {
        if (window.getSelection().type === 'Range') {
            setPopupLoading(customisation);
            showOverlay();
            setIsMakePopInsideViewPort(true);
            setCustomizationResult(null);
            let selectedText = window.getSelection().toString().trim();
            let formdata = new FormData();
            formdata.append('document', createdDocumentId.current);
            formdata.append('no_of_image', 1);
            formdata.append('prompt', selectedText);

            Config.axios({
                url: `${Config.BASE_URL}/writer/ai_image_gen/`,
                method: "POST",
                data: formdata,
                auth: true,
                success: (response) => {
                    let AiImgUrl = response.data.gen_img[0].generated_image;
                    let AiImgName = response.data.prompt;
                    setPopupLoading('none');
                    closeOverlay();
                    createImage(window.getSelection().focusNode?.parentElement, AiImgUrl, AiImgName);
                    if (URL_SEARCH_PARAMS.get("pdf-id") || URL_SEARCH_PARAMS.get("task")) {
                        debounce(saveHtmlDataForPdf);
                    } else if (createdDocumentId.current) {
                        debounce(saveHtmlDataForDocument);
                        // saveHtmlDataForDocument();
                    } else if (URL_SEARCH_PARAMS.get("transcription-task")) {
                        debounce(saveTranscriptionData);
                    }
                    else {
                        debounce(createNewDocument);
                    }
                },
                error: (err) => {
                    closeOverlay();
                    if (err.response?.status === 400) {
                        if (err.response.data.msg == 'Insufficient Credits') {
                            // Config.toast('Insufficient Credits', 'warning');
                            setShowCreditAlertModal(true);
                        } else {
                            Config.toast(t("no_output_diff_text_note"), 'warning');
                        }
                    }
                    if (err.response?.status === 500) {
                        Config.toast(t("paraphrase_get_error_3"), 'error');
                    }
                    setPopupLoading('none');
                }
            })

        }
    }

    const showOverlay = () => {
        setIsMakePopInsideViewPort(false);
        if (document.querySelector('.pop-overlay')) {
            document.querySelector('.pop-overlay').style.top = 0;
            document.querySelector('.pop-overlay').style.left = 0;
            // document.querySelector('.writter-container').style.pointerEvents = 'none';
            document.querySelector('.pop-overlay').style.display = 'block';
            document.querySelector('.pop-overlay').style.pointerEvents = 'all';
            document.querySelector('#pop').style.pointerEvents = 'all';
            window.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    // prevent default behaviour
                    event.preventDefault();
                    return false;
                }
            });
        }
    }

    const handleCustomizationPopoverCloseBtn = () => {
        document.querySelector('#pop').style.setProperty('min-height', ``, 'important');
        document.querySelector('#pop').style.setProperty('transform', 'translate(0, 0)');
        setPopoverContentSwitch(false);
        setIsMakePopInsideViewPort(false);
        isPopInPositionRef.current = false;
        closeOverlay();
    }

    function replaceSelectedTextWith(textToInsert, element) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;
        const startNode = range.startContainer;
        const endNode = range.endContainer;
        const prefix = startNode.textContent.slice(0, startOffset);
        const suffix = endNode.textContent.slice(endOffset);
        const newTextNode = document.createTextNode(textToInsert);
        range.deleteContents();
        range.insertNode(newTextNode);
        const newRange = new Range();
        newRange.setStart(newTextNode, 0);
        newRange.setEnd(newTextNode, textToInsert.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        element.focus();
    }

    var insertHtmlBeforeSelection, insertHtmlAfterSelection;

    (function () {
        function createInserter(isBefore) {
            return function (html) {
                var sel, range, node;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = window.getSelection().getRangeAt(0);
                        range.collapse(isBefore);
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement("p");
                        // console.log(html)
                        el.innerHTML = sanitizeHtml(html);
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
                    }
                } else if (document.selection && document.selection.createRange) {
                    // IE < 9
                    range = document.selection.createRange();
                    range.collapse(isBefore);
                    range.pasteHTML(html);
                }
            }
        }
        insertHtmlBeforeSelection = createInserter(true);
        insertHtmlAfterSelection = createInserter(false);
    })();

    const replaceWithNewText = (e, selectedCustomization) => {
        let p_start_tag = '<p>';
        if (containsRtlCharacters(customizationResultRef.current)) {
            p_start_tag = `<p class="right-align-lang-style">`;
        }
        // console.log(p_start_tag)
        document.querySelector('#pop').style.setProperty('min-height', ``, 'important');
        if (selectedCustomizationCategoryRef.current == 'Convert') {
            if (selectedCustomization == 'Paragraph to bullet points') {
                if (e?.currentTarget?.dataset.id === 'Replace' ? e?.currentTarget?.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    var node;
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        node = document.createElement('p');
                        window.getSelection().deleteFromDocument();
                        node.innerHTML = sanitizeHtml("<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>");
                    }
                    else {
                        node = document.createElement('span');
                        window.getSelection().deleteFromDocument();
                        node.innerHTML = sanitizeHtml(`<p>` + customizationResultRef.current?.replace(/\n/g, "<br />") + '</p> ');

                    }
                    insertHtmlAfterSelection(node.innerHTML);
                    globalSaveLogic();
                } else {
                    var nodeResult
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        nodeResult = document.createElement('p');
                        nodeResult.innerHTML = sanitizeHtml("<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>");
                    }
                    else {
                        nodeResult = document.createElement('span');
                        nodeResult.innerHTML = sanitizeHtml('<p>' + customizationResultRef.current?.replace(/\n/g, "<br />") + '</p> ');
                    }
                    insertHtmlAfterSelection(nodeResult.innerHTML);
                    globalSaveLogic();
                }
            } else {
                if (e?.currentTarget?.dataset.id === 'Replace' ? e?.currentTarget?.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    var node
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        node = document.createElement('p');
                        window.getSelection().deleteFromDocument();
                        node.innerHTML = sanitizeHtml("<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, " ") + "</p>" + "<p><br /></p>");
                        //  insertHtmlAfterSelection(node.innerHTML);
                        globalSaveLogic();
                    } else {
                        node = document.createElement('span');
                        window.getSelection().deleteFromDocument();
                        node.innerHTML = sanitizeHtml(`<p>` + customizationResultRef.current?.replace(/\n/g, " ") + '</p> ');
                    }
                    insertHtmlAfterSelection(node.innerHTML);
                    globalSaveLogic();
                } else {
                    var nodeResult
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        nodeResult = document.createElement('p');
                        nodeResult.innerHTML = "<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, " ") + "</p>" + "<p><br /></p>";
                    }
                    else {
                        nodeResult = document.createElement('span');
                        nodeResult.innerHTML = '<p>' + customizationResultRef.current?.replace(/\n/g, " ") + '</p> ';
                    }
                    insertHtmlAfterSelection(nodeResult.innerHTML);
                    globalSaveLogic();
                }
            }
            setPopoverContentSwitch(false);
            closeOverlay();
        } else {
            if (selectedCustomizationCategoryRef.current == 'Explore') {
                if (e?.currentTarget?.dataset.id === 'Replace' ? e?.currentTarget?.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.newline !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    var node;
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        summerNoteEditorRef.current.summernote('focus');
                        summerNoteEditorRef.current.summernote('restoreRange');
                        node = document.createElement('p');
                        node.innerHTML = "<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>";
                        node.classList.add('temp-color');
                        window.getSelection().deleteFromDocument();
                        //  insertHtmlAfterSelection(node.innerHTML);
                    }
                    else {
                        summerNoteEditorRef.current.summernote('focus');
                        summerNoteEditorRef.current.summernote('restoreRange');
                        node = document.createElement('span');
                        node.innerHTML = ' ' + customizationResultRef.current.replace(/\n/g, "<p><br /></p>") + ' ';
                        // node.className = 'temp-color';
                        node.classList.add('temp-color');
                        window.getSelection().deleteFromDocument();
                        // replaceSelectedTextWith(' '+customizationResultRef.current.replace(/\n/g, "<p><br /></p>")+' ', document.querySelector('.note-editable'));
                    }
                    insertHtmlAfterSelection(node.innerHTML);
                    globalSaveLogic();

                } else {
                    var nodeResult;
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        nodeResult = document.createElement('p');
                        nodeResult.innerHTML = "<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>";
                        // nodeResult.className = 'temp-color';
                        nodeResult.classList.add('temp-color');
                    }
                    else {
                        nodeResult = document.createElement('span');
                        nodeResult.innerHTML = ' ' + customizationResultRef.current.replace(/\n/g, "<p><br /></p>") + ' ';
                        // nodeResult.className = 'temp-color';
                        nodeResult.classList.add('temp-color');
                    }
                    insertHtmlAfterSelection(nodeResult.innerHTML);
                    globalSaveLogic();
                }
            } else {
                if (e?.currentTarget?.dataset.id === 'Replace' ? e?.currentTarget?.dataset.id === 'Replace' : ((e?.currentTarget?.dataset.id !== 'Accept' && defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    document.querySelector('#pop').style.setProperty('min-height', ``, 'important');
                    var node;
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        summerNoteEditorRef.current.summernote('focus');
                        summerNoteEditorRef.current.summernote('restoreRange');
                        node = document.createElement('p');
                        node.innerHTML = `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>";
                        // node.className = 'temp-color';
                        node.classList.add('temp-color');
                        window.getSelection().deleteFromDocument();
                        // insertHtmlAfterSelection(node.innerHTML);
                    } else {
                        summerNoteEditorRef.current.summernote('focus');
                        summerNoteEditorRef.current.summernote('restoreRange');
                        node = document.createElement('span');
                        node.innerHTML = ' ' + customizationResultRef.current.replace(/\n/g, "<p><br /></p>") + ' ';
                        // node.className = 'temp-color';
                        node.classList.add('temp-color');
                        window.getSelection().deleteFromDocument();
                        // replaceSelectedTextWith(' '+customizationResultRef.current+' ', document.querySelector('.note-editable'));
                    }
                    insertHtmlAfterSelection(node.innerHTML);
                    globalSaveLogic();
                } else {
                    var nodeResult;
                    if (newline ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline) {
                        nodeResult = document.createElement('p');
                        nodeResult.innerHTML = "<p><br /></p>" + `${p_start_tag}` + customizationResultRef.current?.replace(/\n/g, "<br />") + "</p>" + "<p><br /></p>";
                        // nodeResult.className = 'temp-color';
                        nodeResult.classList.add('temp-color');
                    }
                    else {
                        nodeResult = document.createElement('span');
                        nodeResult.innerHTML = ' ' + customizationResultRef.current.replace(/\n/g, "<p><br /></p>") + ' ';
                        // nodeResult.className = 'temp-color';
                        nodeResult.classList.add('temp-color');
                    }
                    insertHtmlAfterSelection(nodeResult.innerHTML);
                    globalSaveLogic();
                }
            }
            setPopoverContentSwitch(false);
            closeOverlay();
        }
    }

    const globalSaveLogic = () => {
        let docParam = URL_SEARCH_PARAMS.get("document-id");
        let transcribeParam = URL_SEARCH_PARAMS.get("transcription-task");
        let taskParam = URL_SEARCH_PARAMS.get("task");
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id");
        let isCoAuthor = window.location.pathname.includes('book-writing');
        let item_id = URL_SEARCH_PARAMS.get('item');
        let matter = URL_SEARCH_PARAMS.get('matter');
        if (!isCoAuthor && createdDocumentId.current === null && transcribeParam === null && taskParam === null && pdfParam === null) {
            createNewDocument();
        }
        if (!isCoAuthor && (docParam || createdDocumentId.current)) {
            saveHtmlDataForDocument();
        }
        if (transcribeParam) {
            saveTranscriptionData();
        }
        if (taskParam) {
            saveHtmlDataForPdf();
        }
        if(isCoAuthor && item_id && matter){            
            bookMatterItemSaveLogic();
        }
    }

    const getBookDetails = (book_id) => {
        Config.axios({
            url: `${Config.BASE_URL}/writer/bookcreation/${book_id}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let data = response.data;
                bookCreationObjRef.current = data;
                console.log(data);
                dispatch(setBookCreationResponse(data));
            },
        });
    } 

    const bookMatterItemSaveLogic = () => {
        if(bookCreationObjRef.current === null) return;
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);        
        let item_id = URL_SEARCH_PARAMS.get('item');
        let matter = URL_SEARCH_PARAMS.get('matter');
        let bookObj = bookCreationObjRef.current;        
        let formdata = new FormData();
        let editor_data = $('.summernote').summernote('code');
        // fallback check
        if(editor_data?.length === 0) return;
        if(matter === 'front' || matter === 'back'){
            formdata.append("generated_content", editor_data);
        }else if(matter === 'body'){
            formdata.append("html_data", editor_data);
        }
        formdata.append("book_creation", bookObj?.id);
        let url = '';
        if(matter === 'front') url = `${Config.BASE_URL}/writer/bookfrontmatter/${item_id}/`;
        else if (matter === 'body') url = `${Config.BASE_URL}/writer/bookbodymatter/${item_id}/`;
        else if (matter === 'back') url = `${Config.BASE_URL}/writer/bookbackmatter/${item_id}/`;

        Config.axios({
            url: url,
            body:formdata,
            method: 'PUT',
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(bookObj?.id);
            },
            error: (err) => {
                getBookDetails(bookObj?.id);
            }
        });
    } 

    const downloadFileFromApi = (url) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            url,
            {   
                responseType: "blob",
            }
        );
    };

    const getReferenceFile = async (fileUrl) => {
        const response = await downloadFileFromApi(`${Config.BASE_URL}${fileUrl}`);
        let indexOfDot = fileUrl.lastIndexOf(".");
        let ext = fileUrl.slice(indexOfDot).replace('.', "");
        const blob_url = URL.createObjectURL(new Blob([response.data]));
        setReferenceFileUrl(blob_url);
        setReferenceFileExt(ext);
    }

    useEffect(() => {
        if ((document.querySelector('.note-editable') && document.querySelector('.note-editable-backdrop'))) {
            if (splitViewChange === "bottom" || splitViewChange === "right") {
                document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '5%', 'important');
                document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '5%', 'important');
                document.querySelector('.note-editable').style.setProperty('padding-left', '5%', 'important');
                document.querySelector('.note-editable').style.setProperty('padding-right', '5%', 'important');
            } else {
                document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '20%', 'important');
                document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '20%', 'important');
                document.querySelector('.note-editable').style.setProperty('padding-left', '20%', 'important');
                document.querySelector('.note-editable').style.setProperty('padding-right', '20%', 'important');
            }
        }
    }, [splitViewChange]);

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

    const handleTargetModalCloseBtn = (e) => {
        if(targetLanguage?.length < 1){
            Config.toast(t("at_least_language_selected"), 'warning');
            return;
        }        
        setshowTarLangModal(false); 
        // setSearchInput(''); 
        // setOnFocusWrap(false);
    }

    const selectTheInsertedNodeText = (range, node) => {
        // insert an empty string in editor to update the editor (then only summernote recognize it as update)
        try{
            $('.summernote').summernote('insertText', '');
            // this will select the inserted node
            const rngs = range?.createFromNode(node); // put the range on node 
            rngs?.select();  // select the node - it will select/highlight the node
        }catch(e){
            console.error("insernote text errornote: " +e);
        }
    } 
    
    const moveToEditor = () => {
        // let data = customizationResultRef.current?.replace(/\n/g, "<br />");
        // let node = window.getSelection().focusNode.parentElement;
        // var p = document.createElement("p");
        // var br = document.createElement('br');
        // p.innerText = data;
        // // p.appendChild(br);
        // // x.setAttribute("height", "200");
        // // x.setAttribute("width", "400");
        // // summerNoteEditorRef.current.summernote('inserNode', p);
        // // node.append(x);
        // // insertAfter(window.getSelection().baseNode,x);
        // node?.parentNode?.insertBefore(p, node.nextSibling);
        // const range = $.summernote.range;
        // const rng = range.create() //  is equals range.createFromSelection();
        // const newRng = rng.collapse();
        // newRng.select();
        // $('.summernote').summernote('insertText', '');
        // rng.select();
    } 

    // my new text insertion logic for summernote
    const insertResultInEditor = (e, selectedCustomization) => {
        const range = $.summernote.range;  // range utility
        const rng = range.create() //  is equals range.createFromSelection()
        // const rng = range.create() //  is equals range.createFromSelection()
        let isCollapsed = rng?.isCollapsed();        
        let p_start_tag = '<p>';
        let p_end_tag = '</p>';
        let line_break = '<p><br></p>';
        let node;
        if (containsRtlCharacters(customizationResultRef.current)) {
            p_start_tag = `<p class="right-align-lang-style">`;
        }
        document.querySelector('#pop').style.setProperty('min-height', ``, 'important');
        let new_line = popoverContentSwitch ? newline : (defaultSettings?.newline !== null && defaultSettings?.newline !== undefined) ? defaultSettings?.newline : newline;        
        let data = customizationResultRef.current?.replace(/\n/g, "<br />");

        if(!isCollapsed && rng?.ec?.parentElement.closest('.note-editable')){   // some text is selected
            if (selectedCustomizationCategoryRef.current == 'Convert') {
                if (selectedCustomization == 'Paragraph to bullet points') {    // convert category - paragraph to bullet and vice-versa
                    // replace the content with new data
                    if (popoverContentSwitch ? e?.currentTarget.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget.dataset.id === 'Replace')) {
                        if(new_line){
                            // used to delete the delete selected text 
                            const newRng = rng.deleteContents();
                            newRng.select();     // place the cursor back to the deleted position                            
                            let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);            
                        } else if(!new_line){
                            const newRng = rng.deleteContents();
                            newRng.select();    // place the cursor back to the deleted position
                            const containsBrTag = /<br \/>/.test(data);
                            if(containsBrTag) {
                                let spanTag = document.createElement('span');
                                spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                                let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node);
                            }else{
                                let node = newRng.pasteHTML(data);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node[0]);
                            }
                        }
                    } 
                    // add the new data in same or next line (don't delete the selected text)
                    else {
                        if(new_line) {
                            const newRng = rng.collapse();  // put cursor at end of selection rng
                            newRng.select(); // display the cursor on DOM
                            let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        } else if(!new_line) {
                            const newRng = rng.collapse();  // put cursor at end of selection rng
                            newRng.select(); // display the cursor on DOM                            
                            const containsBrTag = /<br \/>/.test(data);
                            if(containsBrTag) {
                                let spanTag = document.createElement('span');
                                spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                                let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node);
                            }else{
                                let node = newRng.pasteHTML(" " + data);   // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node[0]);
                            }
                        }
                    }
                    // globalSaveLogic();
                } else {   // if not from convert category - paragraph to bullet then do the below
                    // replace the content with new data
                    if (popoverContentSwitch ? e?.currentTarget?.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                        if(new_line){
                            // used to delete the delete selected text 
                            const newRng = rng.deleteContents();
                            newRng.select();     // place the cursor back to the deleted position                            
                            let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);            
                        } else if(!new_line){
                            const newRng = rng.deleteContents();
                            newRng.select();     // place the cursor back to the deleted position
                            const containsBrTag = /<br \/>/.test(data);
                            if(containsBrTag) {
                                let spanTag = document.createElement('span');
                                spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                                let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node);
                            }else{
                                let node = newRng.pasteHTML(data);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node[0]);
                            }
                        }
                    }
                    // add the new data in same or next line (don't delete the selected text)
                    else {
                        if(new_line) {
                            const newRng = rng.collapse();  // put cursor at end of selection rng
                            newRng.select(); // display the cursor on DOM            
                            let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        } else if(!new_line) {
                            const newRng = rng.collapse();  // put cursor at end of selection rng
                            newRng.select(); // display the cursor on DOM
                            const containsBrTag = /<br \/>/.test(data);
                            if(containsBrTag) {
                                let spanTag = document.createElement('span');
                                spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                                let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node);
                            }else{
                                let node = newRng.pasteHTML(" " + data);    // paste the content in the cursor position
                                selectTheInsertedNodeText(range, node[0]);
                            }
                        }
                    }
                }
                globalSaveLogic();
                setPopoverContentSwitch(false);
                closeOverlay();
            } else if (selectedCustomizationCategoryRef.current == 'Explore'){ // if not convert category then do the below
                // replace the content with new data
                if (popoverContentSwitch ? e?.currentTarget?.dataset.id === 'Replace' : ((defaultSettings?.append !== null && defaultSettings?.newline !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    if(new_line){
                        // used to delete the delete selected text 
                        const newRng = rng.deleteContents();
                        newRng.select() ;    // place the cursor back to the deleted position                        
                        let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                        selectTheInsertedNodeText(range, node[0]);        
                    } else if(!new_line){
                        const newRng = rng.deleteContents();
                        newRng.select();     // place the cursor back to the deleted position                        
                        const containsBrTag = /<br \/>/.test(data);
                        if(containsBrTag) {
                            let spanTag = document.createElement('span');
                            spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                            let node = newRng.insertNode(spanTag) ;   // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node);
                        }else{
                            let node = newRng.pasteHTML(data);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        }
                    }
                }
                // add the new data in same or next line (don't delete the selected text)
                else {
                    if(new_line) {
                        const newRng = rng.collapse();  // put cursor at end of selection rng
                        newRng.select(); // display the cursor on DOM
                        let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                        selectTheInsertedNodeText(range, node[0]);
                    } else if(!new_line) {
                        const newRng = rng.collapse();  // put cursor at end of selection rng
                        newRng.select(); // display the cursor on DOM                        
                        const containsBrTag = /<br \/>/.test(data);
                        if(containsBrTag) {
                            let spanTag = document.createElement('span');
                            spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                            let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node);
                        }else{
                            let node = newRng.pasteHTML(" " + data);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        }
                    }
                }
                globalSaveLogic();
                setPopoverContentSwitch(false);
                closeOverlay();
            } 
            // if not passed in the above conditions - do the below
            else {
                document.querySelector('#pop').style.setProperty('min-height', ``, 'important');
                // replace the content with new data
                if (popoverContentSwitch ? e?.currentTarget?.dataset.id === 'Replace' : ((e?.currentTarget?.dataset.id !== 'Accept' && defaultSettings?.append !== null && defaultSettings?.append !== undefined) ? !defaultSettings?.append : e?.currentTarget?.dataset.id === 'Replace')) {
                    if(new_line){
                        // used to delete the delete selected text 
                        const newRng = rng.deleteContents();
                        newRng.select();     // place the cursor back to the deleted position                        
                        let node = newRng.pasteHTML(p_start_tag + data + p_end_tag) ;   // paste the content in the cursor position
                        selectTheInsertedNodeText(range, node[0]);        
                    } else if(!new_line){
                        const newRng = rng.deleteContents();
                        newRng.select();     // place the cursor back to the deleted position                        
                        const containsBrTag = /<br \/>/.test(data);
                        if(containsBrTag) {
                            let spanTag = document.createElement('span');
                            spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                            let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node);
                        }else{
                            let node = newRng.pasteHTML(data);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        }
                    }
                }
                // add the new data in same or next line (don't delete the selected text)
                else {
                    if(new_line) {
                        const newRng = rng.collapse();  // put cursor at end of selection rng
                        newRng.select(); // display the cursor on DOM
                        let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
                        selectTheInsertedNodeText(range, node[0]);
                    } else if(!new_line) {
                        const newRng = rng.collapse();  // put cursor at end of selection rng
                        newRng.select(); // display the cursor on DOM
                        const containsBrTag = /<br \/>/.test(data);
                        if(containsBrTag) {
                            let spanTag = document.createElement('span');
                            spanTag.innerHTML = data?.replace(/\n/g, "<br />");
                            let node = newRng.insertNode(spanTag);    // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node);
                        }else{
                            let node = newRng.pasteHTML(" " + data) ;   // paste the content in the cursor position
                            selectTheInsertedNodeText(range, node[0]);
                        }
                    }
                }
                globalSaveLogic();
                setPopoverContentSwitch(false);
                closeOverlay();
            }
            // if(new_line && action === 'repalce'){
            //     // used to delete the delete selected text 
            //     const newRng = rng.deleteContents();
            //     newRng.select();     // place the cursor back to the deleted position                
            //     let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
            //     selectTheInsertedNodeText(range, node[0]);
            // }else if(new_line && action === 'accept') {
            //     const newRng = rng.collapse();  // put cursor at end of selection rng
            //     newRng.select(); // display the cursor on DOM
            //     let node = newRng.pasteHTML(p_start_tag + data + p_end_tag);    // paste the content in the cursor position
            //     selectTheInsertedNodeText(range, node[0]);
            // }else if(!new_line && action === 'replace'){
            //     const newRng = rng.deleteContents();
            //     newRng.select();     // place the cursor back to the deleted position                
            //     let node = newRng.pasteHTML(data);    // paste the content in the cursor position
            //     selectTheInsertedNodeText(range, node[0]);
            // }else if(!new_line && action === 'accept'){
            //     const newRng = rng.collapse();  // put cursor at end of selection rng
            //     newRng.select(); // display the cursor on DOM                
            //     let node = newRng.pasteHTML(" " + data);    // paste the content in the cursor position
            //     selectTheInsertedNodeText(range, node[0]);
            // }

        }else{  // nothing is selected - the cursor is sitting idle 
            if(rng?.ec?.parentElement?.closest('.note-editable')){
                let node = rng.pasteHTML(data);
                selectTheInsertedNodeText(range, node[0]);
            }else{
                $('.summernote').summernote('focus');
                const range = $.summernote.range;
                const rng = range.create(); //  is equals range.createFromSelection()
                let node = rng?.pasteHTML(data);
                selectTheInsertedNodeText(range, node[0]);
            }
            globalSaveLogic();
            setPopoverContentSwitch(false);
            closeOverlay();
        }
    } 

    function getSelectedNode()
    {
        if (document.selection)
            return document.selection.createRange()?.parentElement();
        else
        {
            var selection = window.getSelection();
            if (selection.rangeCount > 0)
                return selection.getRangeAt(0).startContainer.parentNode;
        }
    }

    const handleBtnClick = (param) => {
        // commit the changes what has been happend, beyond this undo won't work
        // $('.summernote').summernote('focus');
        const range = $.summernote.range;
        const rng = range.create(); //  is equals range.createFromSelection()
        const isCollapsed = rng.isCollapsed();
        
        if (!isCollapsed){            
            let Imgsrc = 'https://aidev4.ailaysa.com/media/u756436/MyDocImages/Screenshot_from_2023-09-12_11-00-32_1Hcctfl.png';
            let imgNode = document.createElement('img');
            imgNode.src = `${Imgsrc}`;            
            let selectedEle = getSelectedNode();
            // this is put th
            const rng = range.createFromNodeAfter(selectedEle);
            // rng.select();
            const node = rng.insertNode(imgNode);            
            // $('.summernote').summernote('insertNode', imgNode);
            // window.selection object destructuring
            // let {startContainer, startOffset, endContainer, endOffset} = savedSelection;
            // summernote range object
            // const rng = range.create(startContainer, startOffset, endContainer, endOffset);
            // let p_tag_start = '<p>';
            // let p_tag_end = '</p>';
            // let line_break = '<p><br></p>';
            // // const newRng = rng.collapse();  // put cursor at end of selection rng
            // // newRng.select() // display the cursor on DOM
            // let data = `- Greetings and asking about the person's day
            // - Wishing that the person is feeling good
            // - Describing the charming and pleasant weather
            // - Mentioning the sun shining brightly and painting the sky with its golden rays
            // - Noting the gentle breeze carrying the sweet scent of blooming flowers
            // - Describing the day as perfect and inviting to seize opportunities and chase dreams
            // - Reminding to appreciate the simple pleasures in life
            // - Asking about the person's day so far`           
            // const newRng = rng.collapse();  // put cursor at end of selection rng
            // newRng.select() // display the cursor on DOM
            // let p = document.createElement('span')
            // p.innerHTML = data?.replace(/\n/g, "<br />")
            // console.log(p)
            // let node = newRng.insertNode(p)    // paste the content in the cursor position
            // selectTheInsertedNodeText(range, node)           
            // let node = newRng.pasteHTML('this is Sarvesh the great')    // paste the content in the cursor position
            // selectTheInsertedNodeText(range, node[0]);            
            // const newRng = rng.collapse();  // put cursor at end of selection rng
            // newRng.select() // display the cursor on DOM
            // let lineBreakNode = newRng.pasteHTML(line_break)    // paste the content in the cursor position
            // let node = newRng.pasteHTML(p_tag_start + 'this is Sarvesh the great' + p_tag_end)    // paste the content in the cursor position
            // selectTheInsertedNodeText(range, node[0]);
            // const newRng = rng.deleteContents()
            // newRng.select();     // place the cursor back to the deleted position
            // let node = newRng.pasteHTML('this is Sarvesh the great');    // paste the content in the cursor position
            // // let node = newRng.pasteHTML( p_tag_start + 'this is Sarvesh the great' + p_tag_end);    // paste the content in the cursor position
            // selectTheInsertedNodeText(range, node[0]);
            // const newRng = rng.collapse();  // put cursor at end of selection rng
            // newRng.select() // display the cursor on DOM            
            // let node = newRng.pasteHTML('<p> this is Sarvesh the great</p>');    // paste the content in the cursor position
            // selectTheInsertedNodeText(range, node[0]);
            // const newRng = rng.collapse();  // to end rng
            // newRng.select();
            // const newRng = rng.wrapBodyInlineWithPara();
            // console.log(newRng);
            // newRng.select();
            // used to delete the delete selected text 
            // const newRng = rng.deleteContents();
            // newRng.select();
            // let node = newRng.pasteHTML('<p> this is Sarvesh the great</p>');            
            // // this will select the inserted text
            // const rngs = range.createFromNode(node[0]);
            // rngs.select();            
            // const newRng = rng.collapse(param === 'start' && true);
            // newRng.select();
        }else{
            const rng = summerNoteEditorRef.current.summernote('editor.getLastRange');
            console.log(rng);
            rng.select();
            // let loaderPTag = document.createElement('p');
            // loaderPTag.id = 'loader-tag';
            // $('.summernote').summernote("insertNode", loaderPTag);
            // setTimeout(() => {
            //     let Imgsrc = 'https://aidev4.ailaysa.com/media/u756436/MyDocImages/Screenshot_from_2023-09-12_11-00-32_1Hcctfl.png'
            //     const rng = range.createFromNode(loaderPTag);
            //     const newRng = rng.deleteContents();
            //     let imgNode = document.createElement('img');
            //     imgNode.src = `${Imgsrc}`;
            //     const node = newRng.insertNode(imgNode);
            // }, 1100);
            // const range = $.summernote.range;  // range utility
            // const rng = range.create();
            // const newRng = rng.wrapBodyInlineWithPara();
            // newRng.select();
            // let node = rng.pasteHTML(`<b>summernote</b>`);
            // // rng.select();           
            // // this will put the cursor before or after the inserted text
            // // const rngs = range.createFromNodeAfter(node[0]);            
            // // this will select the inserted text
            // const rngs = range.createFromNode(node[0]);
            // rngs.select();
        }
    } 
    
    // Image gallery click upload
    const onImageClick = async(file) => {
        let name = file?.name;
        let img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            let loaderPTag = document.createElement('p');
            loaderPTag.id = 'loader-tag';
            loaderPTag.classList.add('skeleton-box', 'img-loader-tag');
            let width = window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('width').replaceAll('px', '') - (window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('padding-left').replaceAll('px', '') * 2);
            if (img.width > width) {
                loaderPTag.style.setProperty('width', `100%`);
                loaderPTag.style.setProperty('height', `${img.height*(width/img.width)}px`);
            } else {
                loaderPTag.style.setProperty('width', img.width);
                loaderPTag.style.setProperty('height', img.height);
            }
            // summerNoteEditorRef.current.summernote("insertNode", loaderPTag);
        }
        let lastDot = name?.lastIndexOf(".");
        let ext = "." + name?.substring(lastDot + 1);
        if (ext?.toLowerCase() !== ".png" && ext?.toLowerCase() !== ".jpg" && ext?.toLowerCase() !== ".jpeg") {
            Config.toast('Only .png, .jpg and .jpeg files are supported', 'warning');
            return;
        }
        let files = [];
        files.push(file);
        let isCoAuthor = window.location.pathname.includes('book-writing');
        if (!isCoAuthor && createdDocumentId.current == null && URL_SEARCH_PARAMS.get("document-id") == null && transcriptionTaskId.current == null && pdfTaskId.current == null) {
            createNewDocument('image-upload', files);
        } else {
            uploadImagesToServer(files);
        }
    }

    const uploadImagesToServer = async (files) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        var formdata = new FormData();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer  ${token}`);        
        let isCoAuthor = window.location.pathname.includes('book-writing');
        let bookId = URL_SEARCH_PARAMS.get('book');        
        if(isCoAuthor && bookId) {
            if(bookId === undefined || bookId === null) return;
            formdata.append("book", bookId);
        }else if (createdDocumentId.current) {
            formdata.append("document", createdDocumentId.current);
        } else if (transcriptionTaskId.current) {
            formdata.append("task", transcriptionTaskId.current);
        } else if (pdfTaskId.current) {
            formdata.append("pdf", pdfTaskId.current);
        }
        formdata.append("image", files[0]);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: myHeaders,
        };

        try{
            let data = await fetch(Config.BASE_URL + "/workspace/doc_image/", requestOptions)
            if (data.status === 200) {
                let response = await data.json();                
                // const range = $.summernote.range;
                const rng = $('.summernote').summernote('editor.getLastRange');
                // let loaderPtags = document.querySelectorAll('.img-loader-tag');
                // loaderPtags?.forEach(each => {
                //     each.removeAttribute('style');
                //     each.removeAttribute('class');
                //     each.removeAttribute('id');
                // })    
                // let imgNode = document.createElement('img');
                // imgNode.src = `${Config.BASE_URL}${response.image}`;    
                // loaderPtag.appendChild(imgNode);    
                // const rng = range.createFromNode(loaderPtag);
                // const newRng = rng.deleteContents() ;
                let imgNode = document.createElement('img');
                imgNode.src = `${Config.BASE_URL}${response.image}`;
                rng.select();
                $('.summernote').summernote("insertNode", imgNode);
                // const node = rng.insertNode(imgNode);                
                // loaderPtag.removeAttribute('style');
                // loaderPtag.removeAttribute('class');
                // loaderPtag.removeAttribute('id');
                // $('.summernote').summernote("insertNode", imgNode);
                // $('.summernote').summernote("insertImage", `${Config.BASE_URL}${response.image}`);
            }else{
                let loaderPtag = document.querySelector('#loader-tag');
                loaderPtag.remove();
                Config.toast('Something went wrong', 'error');
            }
        } catch(e){ }
    }

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            dispatch(setBookCreationResponse(null));
            history(lastLocation.pathname + lastLocation.search);
        }
    }, [confirmedNavigation, lastLocation]);

    // conditions for when to show the leaving modal for book-writing page
    const handleBlockedNavigationForBook = nextLocation => {
        let bookId = URL_SEARCH_PARAMS.get('book');       
        if (!confirmedNavigation && location.pathname) {
            setLastLocation(nextLocation);
            if (!isTranslateProceeding && nextLocation.hash != "#!" && !nextLocation.pathname?.includes('/book-writing') && bookId) {
                setShowBookPageLeavingAlertModal(true);
                return false;
            }
            if (!isTranslateProceeding && nextLocation.state === null && !nextLocation.pathname?.includes('/book-writing') && bookId) {
                setShowBookPageLeavingAlertModal(true);
                return false;
            }
        }
        return true;
    }

    // conditions for when to show the leaving modal for writer page
    const handleBlockedNavigationForWriter = ({nextLocation}) => {
        let docIdParam = URL_SEARCH_PARAMS.get('document-id');
        if(
            !docIdParam || nextLocation.pathname?.includes('/file-upload') ||
            nextLocation.pathname?.includes('create/translate/files') || 
            nextLocation.pathname?.includes('create/speech/speech')
        ){
            return false;
        }
        return true;
    }

    // handle book writing want to leave confirmation 
    const handleConfirmNavigationClick = () => {
        setShowBookPageLeavingAlertModal(false);
        setShowWriterPageLeavingAlertModal(false);
        setConfirmedNavigation(true);
    }

    // My styles
    const getMyStyle = () => {
        Config.axios({
            url: `${Config.BASE_URL}/writer/my-style/`,
            auth: true,
            success: (response) => {
                setMyStyleData(response.data);
            },
            error: (err) => { }
        });
    } 

    const handleCustomizationTabChange = (item) => {
        setActiveCustomizationTab(item.value);
    } 
    
    const ailaysaMainWritter = (
        <>
            <div className="ailaysa-writer-inner-wrapper">
                {(leftSideBar) &&
                    <div 
                        className={"ailaysa-writter-sidebar-col-wrapper panel-adjust-poc " + (mobLeftSideBar ? "show " : "hide ") + (deskLeftSideBar ? "sidebar-show " : "sidebar-hide ")} 
                        // style={{ zIndex: (showSrcLangModal || showTarLangModal || mobLeftSideBar) ? 100 : 10 }}
                        style={{ zIndex: (showCustomSrcLangModal || showCustomTarLangModal || showDesigner) ? 0 : 110 }}
                    >
                        <div className="ailaysa-mask" ref={leftSidebarRef}></div>
                        {/* <ResizePanel direction="e" style={{ minWidth: "400px", width: "530px", maxWidth: "530px" }}> */}
                        <WritterPromptForm
                            editor={editor}
                            showSrcLangModal={showSrcLangModal}
                            setshowSrcLangModal={setshowSrcLangModal}
                            showTarLangModal={showTarLangModal}
                            setshowTarLangModal={setshowTarLangModal}
                            createNewDocument={createNewDocument}
                            createdDocumentId={createdDocumentId}
                            selectedTone={selectedTone}
                            deskLeftSideBar={deskLeftSideBar}
                            setDeskLeftSideBar={setDeskLeftSideBar}
                            setSelectedTone={setSelectedTone}
                            categoryOptions={categoryOptions}
                            setTextGenerationIds={setTextGenerationIds}
                            textGenerationIds={textGenerationIds}
                            targetLanguageOptionsRef={targetLanguageOptionsRef}
                            sourceLanguageOptions={sourceLanguageOptions}
                            targetLanguageOptions={targetLanguageOptions}
                            alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                            setAlreadySelecetedTarLangID={setAlreadySelecetedTarLangID}
                            moveToEditor={moveToEditorFromHistory}
                            subCategoryRef={subCategoryRef}
                            productNameTextRef={productNameTextRef}
                            descriptionTextRef={descriptionTextRef}
                            freeStyleDescriptionTextRef={freeStyleDescriptionTextRef}
                            keywordTextRef={keywordTextRef}
                            mainCategoryRef={mainCategoryRef}
                            toneOptionsRef={toneOptionsRef}
                            toneOptions={toneOptions}
                            toggleWritingStateRef={toggleWritingStateRef}
                            mobLeftSideBar={mobLeftSideBar}
                            setMobLeftSideBar={setMobLeftSideBar}
                            saveHtmlDataForDocument={saveHtmlDataForDocument}
                            transcriptionTaskId={transcriptionTaskId}
                            isTaskAssignedToMe={isTaskAssignedToMe}
                            globalSaveLogic={globalSaveLogic}
                            showCreditAlertModal={showCreditAlertModal}
                            setShowCreditAlertModal={setShowCreditAlertModal}
                            resetToNewDoc={resetToNewDoc}
                            setResetToNewDoc={setResetToNewDoc}
                            targetLanguage={targetLanguage}
                            sourceLanguage={sourceLanguage}
                            setSourceLabel={setSourceLabel}
                            setTargetLanguageListTooltip={setTargetLanguageListTooltip}
                            setTargetLanguage={setTargetLanguage}
                            sourceLabel={sourceLabel}
                            targetLanguageListTooltip={targetLanguageListTooltip}
                            bookLanguage={bookLanguage}
                            setBookLanguage={setBookLanguage}
                            bookLanguageLabel={bookLanguageLabel}
                            setBookLanguageLabel={setBookLanguageLabel}
                            closeOverlay={closeOverlay}
                            showOverlay={showOverlay}
                            confirmedNavigation={confirmedNavigation}
                            setConfirmedNavigation={setConfirmedNavigation}
                            lastLocation={lastLocation}
                        />
                        {/* </ResizePanel> */}
                        {(leftSideBar && !historyTab) &&
                            <>
                                {
                                    deskLeftSideBar &&
                                        <div className={"collapse-tray-icon tray-icon-change "} style={{ zIndex: (showDocumentListModal) ? 10 : 11, display: (showCustomSrcLangModal || showCustomTarLangModal || showDesigner) ? "none" : "block"}} onClick={() => { setDeskLeftSideBar(false) }}>
                                            <CollapseTray />
                                        </div>
                                //         :
                                //         <Tooltip
                                //             componentsProps={{
                                //                 tooltip: {
                                //                     sx: {
                                //                         bgcolor: '#2A2A2A',
                                //                         '& .MuiTooltip-arrow': {
                                //                             color: '#2A2A2A',
                                //                         },
                                //                     },
                                //                 },
                                //             }}
                                //             title={t("show_prompt_panel")}
                                //             placement="top-start"
                                //         >
                                //             <div className="sidebaropen-bar left-bar-desk" style={{ zIndex: (showDocumentListModal || showCustomSrcLangModal || showCustomTarLangModal) ? 10 : 11 }} onClick={() => { setDeskLeftSideBar(true) }}>
                                //                 <div className="sidepanel-leaf">
                                //                     <ArrowBackIosIcon className="side-bar-arrow-ai-writter" />
                                //                 </div>
                                //             </div>
                                //         </Tooltip>
                                }
                            </>
                        }
                    </div>
                }
                {(leftSideBar && !historyTab) &&
                    <>
                        {
                            !deskLeftSideBar &&
                                <Tooltip
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
                                    title={t("show_prompt_panel")}
                                    placement="top-start"
                                >
                                    <div className="sidebaropen-bar left-bar-desk" style={{ zIndex: (showDocumentListModal || showCustomSrcLangModal || showCustomTarLangModal) ? 10 : 11 }} onClick={() => { setDeskLeftSideBar(true) }}>
                                        <div className="sidepanel-leaf">
                                            <ArrowBackIosIcon className="side-bar-arrow-ai-writter" />
                                        </div>
                                    </div>
                                </Tooltip>
                        }
                    </>
                }
                <div className="empty-book-wrapper" style={{display: showPlaceHolderDivForBook ? "flex" : "none"}}>
                    {/* <h1 className="place-holder-txt">
                       Start writing your book 
                    </h1> */}
                    {/* <CustomBookTooltip /> */}
                </div>
                <div style={{display: showPlaceHolderDivForBook ? "none" : "flex"}} className={"ailaysa-writter-working-col-wrapper " + (((window.location.pathname.includes("book-writing") && URL_SEARCH_PARAMS.get("matter") && URL_SEARCH_PARAMS.get("item")) ? "co-author-writer-col-wrapper " : " "))} >
                    <div className="ailaysa-writter-inner-working-wrapper">
                        {/* <PromptWritingBox /> */}
                        {/* <button id="focus-btn" onClick={handleBtnClick}>replace</button> */}
                        {
                            <MainEditor
                                debounceApiCall={debounceApiCall}
                                setEditor={setEditor}
                                rightSideBar={rightSideBar}
                                setShowDocumentListModal={setShowDocumentListModal}
                                leftSideBar={leftSideBar}
                                deskLeftSideBar={deskLeftSideBar}
                                historyTab={historyTab}
                                documentNameRef={documentNameRef}
                                summerNoteEditorRef={summerNoteEditorRef}
                                summernoteRangeRef={summernoteRangeRef}
                                popoverContentSwitch={popoverContentSwitch}
                                showOverlay={showOverlay}
                                selectedCustomization={selectedCustomization}
                                customizationResult={customizationResult}
                                handleCustomizationPopoverCloseBtn={handleCustomizationPopoverCloseBtn}
                                replaceWithNewText={insertResultInEditor}
                                getAiCustomizationResult={getAiCustomizationResult}
                                generalCustomizatinOptEnable={generalCustomizatinOptEnable}
                                oneWordCustomizationOptEnable={oneWordCustomizationOptEnable}
                                setPopupLoading={setPopupLoading}
                                popupLoading={popupLoading}
                                // tabElementRef={tabElementRef}
                                tabElementCursonPlaceRef={tabElementCursonPlaceRef}
                                enableTabFunctionRef={enableTabFunctionRef}
                                continueWritingEnable={continueWritingEnable}
                                setTranslateWritterSwitch={setTranslateWritterSwitch}
                                setRightSideBar={setRightSideBar}
                                setTooltipTabLoader={setTooltipTabLoader}
                                tooltipTabLoader={tooltipTabLoader}
                                tabElementRef={tabElementRef}
                                setNewline={setNewline}
                                newline={newline}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                // setTabSelectionDisable={setTabSelectionDisable}
                                spellCheck={spellCheck}
                                saveHtmlDataForDocument={saveHtmlDataForDocument}
                                checkSelection={checkSelection}
                                debounce={debounce}
                                isInitialHtmlDataLoaded={isInitialHtmlDataLoaded}
                                saveHtmlDataForPdf={saveHtmlDataForPdf}
                                createdDocumentId={createdDocumentId}
                                transcriptionTaskId={transcriptionTaskId}
                                pdfTaskId={pdfTaskId}
                                saveTranscriptionData={saveTranscriptionData}
                                createNewDocument={createNewDocument}
                                setMoreToolsContentSwitch={setMoreToolsContentSwitch}
                                moreToolsContentSwitch={moreToolsContentSwitch}
                                synonymsList={synonymsList}
                                setSynonymsList={setSynonymsList}
                                moreToolsContentSwitchLoading={moreToolsContentSwitchLoading}
                                setMoreToolsContentSwitchLoading={setMoreToolsContentSwitchLoading}
                                currentSummerNoteTextData={currentSummerNoteTextData}
                                zoomLevel={zoomLevel}
                                editor={editor}
                                getSummerNotePlainText={getSummerNotePlainText}
                                resetToNewDoc={resetToNewDoc}
                                setResetToNewDoc={setResetToNewDoc}
                                uploadImagesToServer={uploadImagesToServer}
                                promptMainWrapper={promptMainWrapper} 
                                setPromptMainWrapper={setPromptMainWrapper}
                                bookMatterItemSaveLogic={bookMatterItemSaveLogic}
                                isCopiedFromSummernoteRef={isCopiedFromSummernoteRef}
                                selectedCustomizationCategoryRef={selectedCustomizationCategoryRef}
                                moveToEditor={moveToEditor}
                            />
                        }
                        {(isAudioOrPdf === 'audio' || splitViewTab) &&
                            <>
                                <div className="src-audio-main-wrapper">
                                    
                                    <WriterAudioPlayer 
                                        isAudioOrPdf={isAudioOrPdf}
                                        referenceFileUrl={referenceFileUrl}
                                        referenceFileExt={referenceFileExt}
                                    />
                                    {
                                        splitViewTab &&
                                        <div className="writer-pdf-view-control-wrapper">
                                            <div className="split-view-icon-wrap">
                                                <SplitViewIcon />
                                                <span>{t("compare_view")}</span>
                                            </div>
                                            <div className="split-box-icon-wrap">
                                                <span
                                                    className={"split-bot-icon " + (splitViewChange === 'bottom' ? "active" : "")}
                                                    onClick={() => {
                                                        setSplitViewChange('bottom')
                                                    }}
                                                >
                                                    <SplitBottomIcon />
                                                </span>
                                                <span className={"split-right-icon " + (splitViewChange === 'right' ? "active" : "")} onClick={() => setSplitViewChange('right')}>
                                                    <SplitRightIcon />
                                                </span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                        <div className="writer-common-footer-wrap">
                            {(window.location.pathname.includes("book-writing") && URL_SEARCH_PARAMS.get("matter") && URL_SEARCH_PARAMS.get("item")) && (
                                <CoAuthorWriterFooter 
                                    promptMainWrapper={promptMainWrapper} 
                                    setPromptMainWrapper={setPromptMainWrapper} 
                                    deskLeftSideBar={deskLeftSideBar} 
                                    rightSideBar={rightSideBar}
                                    setShowCreditAlertModal={setShowCreditAlertModal}
                                    promptSrcLang={promptSrcLang}
                                    promptSrcLabel={promptSrcLabel}
                                    promptTarLang={promptTarLang}
                                    setshowSrcLangModal={setshowSrcLangModal}
                                    setshowTarLangModal={setshowTarLangModal}
                                />
                            )}
                            <WriterCharacterCountFooter currentSummerNoteTextData={currentSummerNoteTextData} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel}/>
                        </div>
                    </div>
                </div>

                <div className={"ailaysa-writter-sidebar-col-wrapper-right " + (rightSideBar ? "show " : "hide ") + ((splitViewTab || (!leftSideBar && !rightSideBar && !historyTab && !splitViewTab)) && "d-none")} ref={rightSidebar}>
                    {(!rightSideBar && !historyTab && leftSideBar) &&
                        <Tooltip 
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
                            title={t("show_customize_panel")} placement="top-end">
                            <button className={"ailaysa-writer-prompt-box-open"} onClick={() => {
                                setRightSideBar(true)
                                // console.log('clicked');
                                // console.log(rightSideBar)
                            }}>
                                <ArrowBackIosIcon className="side-bar-arrow-ai-writter" />
                                <span>{t("customization_tray")}</span>
                            </button>
                        </Tooltip>
                        }
                        <div className={"customization-panel ailaysa-writer-prompt-box " + (rightSideBar ? "show " : "hide ")}>
                            <CustomizationPanel
                                showDesigner={showDesigner}
                                setShowDesigner={setShowDesigner}
                                setRightSideBar={setRightSideBar}
                                showSrcLangModal={showCustomSrcLangModal}
                                setshowSrcLangModal={setshowCustomSrcLangModal}
                                showTarLangModal={showCustomTarLangModal}
                                setshowTarLangModal={setshowCustomTarLangModal}
                                aiCustomizationOptions={aiCustomizationOptions}
                                getAiCustomizationResult={getAiCustomizationResult}
                                showOverlay={showOverlay}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                generalCustomizatinOptEnable={generalCustomizatinOptEnable}
                                oneWordCustomizationOptEnable={oneWordCustomizationOptEnable}
                                paraCustomizationOptEnable={paraCustomizationOptEnable}
                                setPopupLoading={setPopupLoading}
                                translateWritterSwitch={translateWritterSwitch}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                sourceLanguageOptions={sourceLanguageOptions}
                                targetLanguageOptions={targetLanguageOptions}
                                alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                                setTranslateWritterSwitch={setTranslateWritterSwitch}
                                editor={editor}
                                summerNoteEditorRef={summerNoteEditorRef}
                                getAiGeneratedImage={getAiGeneratedImage}
                                onImageClick={onImageClick}
                                promptMainWrapper={promptMainWrapper} 
                                setPromptMainWrapper={setPromptMainWrapper}
                                showPlaceHolderDivForBook={showPlaceHolderDivForBook}
                            />
                        </div>
                </div>
            </div>
        </>
    );

    return (
        <React.Fragment>
            <Navbar isWhite={true}
                showCustomSrcLangModal={showCustomSrcLangModal}
                showCustomTarLangModal={showCustomTarLangModal}
                showDesigner={showDesigner}
                writerProjectName={projectName}
                setRightSideBar={setRightSideBar}
                setLeftSideBar={setLeftSideBar}
                leftSideBar={leftSideBar}
                rightSideBar={rightSideBar}
                prevPathRef={prevPathRef}
                documentName={documentName}
                setDocumentName={setDocumentName}
                getHtmlToDocxFileBlob={getHtmlToDocxFileBlob}
                handleTranslateBtn={handleTranslateBtn}
                documentNameRef={documentNameRef}
                saveHtmlDataForPdf={saveHtmlDataForPdf}
                saveHtmlDataForDocument={saveHtmlDataForDocument}
                // isDocument={isDocument}
                isWriterDocumentRef={isWriterDocumentRef}
                setHistoryTab={setHistoryTab}
                historyTab={historyTab}
                setSplitViewTab={setSplitViewTab}
                splitViewTab={splitViewTab}
                // getPromptHistory={getPromptHistory}
                createdDocumentId={createdDocumentId}
                createNewDocument={createNewDocument}
                isDocxFileDownloading={isDocxFileDownloading}
                isTaskAssignedToMe={isTaskAssignedToMe}
                globalSaveLogic={globalSaveLogic}
                showSubmitDocment={showSubmitDocment}
                setShowSubmitDocment={setShowSubmitDocment}
                isTaskInProgressRef={isTaskInProgressRef}
                isAudioOrPdf={isAudioOrPdf}
                splitViewChange={splitViewChange}
                showSetAsTranslationBtn={showSetAsTranslationBtn}
                mobLeftSideBar={mobLeftSideBar}
                showPlaceHolderDivForBook={showPlaceHolderDivForBook}
                isTranslateProceeding={isTranslateProceeding}
            />
            {/* <WritterToolbar 
            editor={editor}
            /> */}
            <div className="ailaysa-writter-main-wrapper" style={{ display: historyTab ? 'none' : 'flex' }}>
                <div className={splitViewTab ?
                    "writer-pdf-split-view " + (splitViewChange === "bottom" ? "split-bottom" : "split-right")
                    :
                    "writer-main-row"
                }>
                    <SplitPane resizerSize={splitViewTab ? 4 : 0} split={(splitViewTab && splitViewChange === "bottom") ? 'horizontal' : 'vertical'} sizes={sizes} onChange={setSizes}>
                        {splitViewTab &&
                            <Pane minSize={(splitViewTab && splitViewChange === "bottom") ? 300 : 500}>
                                <WriterPDFSplit
                                    setSplitViewTab={setSplitViewTab}
                                    splitViewTab={splitViewTab}
                                    referenceFileUrl={referenceFileUrl}
                                    referenceFileExt={referenceFileExt}
                                    splitViewChange={splitViewChange}
                                />
                            </Pane>
                        }
                        <Pane minSize={(splitViewTab && splitViewChange === "bottom") ? 300 : 500}>
                            {/* <TranslationTab/> */}
                            {ailaysaMainWritter}
                        </Pane>
                    </SplitPane>
                </div>
            </div>
            
            
            {/* <WriterCharacterCountFooter currentSummerNoteTextData={currentSummerNoteTextData} /> */}

            <PromptHistory
                mainCategoryRef={mainCategoryRef}
                subCategoryRef={subCategoryRef}
                targetLanguageOptionsRef={targetLanguageOptionsRef}
                toneOptionsRef={toneOptionsRef}
                // deleteAiWrittingPrompt={deleteAiWrittingPrompt}
                // cardIndexNum={cardIndexNum}
                // setCardIndexNum={setCardIndexNum}
                moveToEditorFromHistory={moveToEditorFromHistory}
                historyTab={historyTab}
                getSummerNotePlainText={getSummerNotePlainText}
                summerNoteEditorRef={summerNoteEditorRef}
                setHistoryTab={setHistoryTab}
                saveHtmlDataForDocument={saveHtmlDataForDocument}
                isCopiedFromSummernoteRef={isCopiedFromSummernoteRef}
            />
            {
                (!historyTab && leftSideBar) &&
                <Tooltip
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
                    title={t("show_prompt_panel")} placement="top-start">
                    <div className="sidebaropen-bar left-side-bar" style={{ display: (showDocumentListModal || showCustomSrcLangModal || showCustomTarLangModal) ? "none" : "", zIndex: mobLeftSideBar ? -1 : 10 }} onClick={() => { setMobLeftSideBar(true) }}>
                        <div className="sidepanel-leaf">
                            <ArrowBackIosIcon className="side-bar-arrow-ai-writter" />
                        </div>
                    </div>
                </Tooltip>
            }
            {/* overlay for restricting all the user interactions */}
            <div className="pop-overlay"></div>

            <div className="tab-to-write-more-tooltip">
                <span className="writter-writting-loader-wrapper" style={{ display: 'none' }} ref={writterWrittingRef}>
                    <span className="save-btn-spinner-blue-writter">
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
                    </span>
                    <span className="writter-writting-loader">{t("writing")}...</span>
                </span>
                <span ref={tabToWriteTextRef} style={{ display: 'block' }} className="tab-to-write-more-tool-tip"> {t("press")} <span className="tab-write-more-inner">{t("tab")}</span> {t("to_write_more")}...</span>
            </div>
            {/* rodal for user choice for translate flow */}
            {userTranslateChoiceModal && (<Rodal visible={userTranslateChoiceModal} onClose={() => console.log()} height="min-content" showCloseButton={false} leaveAnimation className="add-edit-new-term-modal-wrapper glossary-list-modal">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>{t("take_file_to_translate")}</h1>
                        <span onClick={(e) => setUserTranslateChoiceModal(false)}><CloseIcon className="close-icon" /></span>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio
                            checked={userTranslateChoice === 'existing'}
                            id="existing"
                            onChange={() => setUserTranslateChoice('existing')}
                            size="small"
                            className="radio-btn"
                        /> <label htmlFor="existing" className="assign-manage-radio">{t("add_exiting_project")}</label>
                    </div>
                    {userTranslateChoice === 'existing' &&
                        <div className="term-edit-form-control">
                            {/* <label>Language locale</label> */}
                            <AsyncPaginate
                                value={selectedProjectToUpdate}
                                loadOptions={loadProjectListOptions}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.project_name}
                                onChange={(selected) => setSelectedProjectToUpdate(selected)}
                                classNamePrefix="steps-select"
                                styles={customStepSelectStyles}
                                components={{ Option, ValueContainer, DropdownIndicator, IndicatorSeparator: () => null }}
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
                        <button
                            className="uploadProjectButton-writter"
                            style={userTranslateChoice === 'existing' && selectedProjectToUpdate === null ? { pointerEvents: 'none', opacity: 0.7 } : {}}
                            onMouseUp={() => !isTranslateProceeding && handleProceedBtn()}
                        >
                            <span className="fileupload-new-btn">
                                {isTranslateProceeding && (
                                    <ButtonLoader />
                                )}
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

            {showPunctuationModal && (<Rodal
                visible={showPunctuationModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
                onClose={() => console.log()}
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowPunctuationModal(false); setPunctuationValidation(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper" style={{ padding: '20px' }}>
                    <img
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    {
                        punctuationValidation ?
                            <h6 className="text-center">{t("punc_validation_note_1")}</h6>
                            :
                            <h6 className="text-center">{t("punc_validation_note_2")}</h6>

                    }
                    {/* <div className="button-row">
                        <AiMarkCancel onClick={() => setDictationTabSwitchAlert(false)}>
                            <span className="cancel-txt">Close</span>
                        </AiMarkCancel>
                        <AiMarkSubmit onClick={() => handleConfirmSwitch()}>
                            <span className="submit-txt">Switch</span>
                        </AiMarkSubmit>
                    </div> */}
                </div>
            </Rodal>)}
            {showCreditAlertModal && (
                <Rodal className="ts-rodal-mask" visible={showCreditAlertModal} onClose={() => console.log()} {...convertmodaloption} showCloseButton={false}>
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
                            <p className="insuffient-desc">{t("insufficient_credits")}</p>
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
            {showCustomSettingsModal && (
                <Rodal visible={showCustomSettingsModal} onClose={() => console.log()} height="min-content" showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                    <div className="header-area-wrapper">
                        <div className="header-area">
                            <h1>{t("customization_sett")}</h1>
                            <span onClick={() => dispatch(setShowCustomSettingsModal(false))}><CloseIcon className="close-icon" /></span>
                        </div>
                    </div>

                    {/* <AITab
                        onChange={handleCustomizationTabChange} 
                        activeTab={activeCustomizationTab}
                        dataList={customizationTabList}
                        customClass="w-1/2 mt-4 ml-4"
                    /> */}
                    {activeCustomizationTab === 1 ? (
                        <div className="general-settings-wrapper">
                            <div className="term-edit-form">
                                <p className="customization-default-radio-group-label">{t("select_ai_trans_want_to_use")}:</p>
                                <div className="term-edit-form-control">
                                    <Radio
                                        checked={selectedMtengine === 1}
                                        className="cell-box-radio"
                                        size="small"
                                        id="google"
                                        onChange={() => setSelectedMtengine(1)}
                                    />
                                    <label htmlFor="google">{t("goog_translate")}</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio
                                        checked={selectedMtengine === 2}
                                        className="cell-box-radio"
                                        size="small"
                                        id="microsoft"
                                        onChange={() => setSelectedMtengine(2)}
                                    />
                                    <label htmlFor="microsoft">{t("micro_translate")}</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio
                                        checked={selectedMtengine === 3}
                                        className="cell-box-radio"
                                        size="small"
                                        id="amazon"
                                        onChange={() => setSelectedMtengine(3)}
                                    />
                                    <label htmlFor="amazon">{t("amazon_translate")}</label>
                                </div>
                            </div>
                            <div className="term-edit-form">
                                <p className="customization-default-radio-group-label">{t("adding_generated_result")}:</p>
                                <div className="term-edit-form-control">
                                    <Radio
                                        checked={newLineResult}
                                        className="cell-box-radio"
                                        size="small"
                                        id="new_line"
                                        onChange={() => setNewLineResult(true)}
                                    />
                                    <label htmlFor="new_line">{t("new_line")}</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio
                                        checked={!newLineResult}
                                        className="cell-box-radio"
                                        size="small"
                                        id="same_line"
                                        onChange={() => { setNewLineResult(false); console.log('hello'); }}
                                    />
                                    <label htmlFor="same_line">{t("same_line")}</label>
                                </div>
                                <div className="term-edit-form-control">
                                    <Radio
                                        checked={appendResult}
                                        className="cell-box-radio"
                                        size="small"
                                        id="append"
                                        onChange={() => setAppendResult(true)}
                                    />
                                    <label htmlFor="append">{t("append")}</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio
                                        checked={!appendResult}
                                        className="cell-box-radio"
                                        size="small"
                                        id="replace"
                                        onChange={() => setAppendResult(false)}
                                    />
                                    <label htmlFor="replace">{t("replace")}</label>
                                </div>
                            </div>
                            <div className="term-edit-form">
                                <p className="customization-default-radio-group-label">{t("show_customization_result_in")}</p>
                                <div className="term-edit-form-control">
                                    <Radio
                                        checked={showResultInModal}
                                        className="cell-box-radio"
                                        size="small"
                                        id="in-modal"
                                        onChange={() => setShowResultInModal(true)}
                                    />
                                    <label htmlFor="in-modal">{t("show_in_modal")}</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Radio
                                        checked={!showResultInModal}
                                        className="cell-box-radio"
                                        size="small"
                                        id="in-editor"
                                        onChange={() => setShowResultInModal(false)}
                                    />
                                    <label htmlFor="in-editor">{t("show_in_editor")}</label>
                                </div>
                            </div>
                            <div className="footer-area-wrapper justify-content-end" style={{ padding: '0px 30px 15px 30px' }}>
                                <div className="term-edit-btn-row">
                                    <button
                                        className="uploadProjectButton-writter"
                                        onClick={() => !isDefaultSettingSaving && handleCustomSettingsSave()}
                                    >
                                        <span className="fileupload-new-btn">
                                            {isDefaultSettingSaving ? `${t("saving")}...` : `${t("save")}`}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <MyStyleBox myStyleData={myStyleData} getMyStyle={getMyStyle} />
                    )}
                </Rodal>
            )}
            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} onClose={() => console.log()} showCloseButton={false}>
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

            <SimpleRodals
                sourceLanguage={location.pathname?.includes('/book-writing') ? bookLanguage : sourceLanguage}
                showSrcLangModal={showSrcLangModal}
                setshowSrcLangModal={setshowSrcLangModal}
                sourceLanguageOptions={sourceLanguageOptions}
                handleSourceLangClick={handleSourceLangClick}
                // filteredResults={filteredResults}
                // setFilteredResults={setFilteredResults}
                // searchInput={searchInput}
                // setSearchInput={setSearchInput}
                // onFocusWrap={onFocusWrap}
                // setOnFocusWrap={setOnFocusWrap}
                searchAreaRef={searchAreaRef}
            />
            
            {showTarLangModal && (
                <Rodal visible={showTarLangModal} {...modaloption} onClose={() => console.log()} showCloseButton={false} className="ai-tar-lang-select-modal">
                    <div className="lang-modal-wrapper">
                        <span className="modal-close-btn lang-close" onClick={(e) => { handleTargetModalCloseBtn(e) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <TargetLanguage
                            targetLanguage={targetLanguage}
                            targetLanguageOptions={targetLanguageOptions}
                            handleTargetLangClick={handleTargetLangClick}
                            showTarLangModal={showTarLangModal}
                            setshowTarLangModal={setshowTarLangModal}
                            modaloption={modaloption}
                            // filteredResults={filteredResults}
                            // setFilteredResults={setFilteredResults}
                            // searchInput={searchInput}
                            // setSearchInput={setSearchInput}
                            // onFocusWrap={onFocusWrap}
                            // setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                            alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                            handleTargetModalCloseBtn={handleTargetModalCloseBtn}
                        />
                    </div>
                </Rodal>
            )}
            
            {/* show open document modal */}
            {showDocumentListModal && (
                <DocumentListModal 
                    showDocumentListModal={showDocumentListModal}
                    setShowDocumentListModal={setShowDocumentListModal}
                />
            )}

            {/* open content reference modal */}
            {openContentReferenceModal && (
                <ReferenceModal 
                    openContentReferenceModal={openContentReferenceModal}
                    setOpenContentReferenceModal={setOpenContentReferenceModal}
                    contentReferenceResult={contentReferenceResult}
                />
            )}

            {showBookContentLossAlertModal && (
                <Rodal
                    // visible={navigationModalVisible}
                    visible={showBookContentLossAlertModal}
                    width={520}
                    height={240}
                    onClose={() => {}}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => dispatch(setShowBookContentLossAlertModal(false))}><CloseIcon /></span></div>
                            <div>{t("content_loss_alert")}</div>
                            <div>{t("content_loss_alert_desc")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <button onClick={() => dispatch(setShowBookContentLossAlertModal(false))}>{t("no")}</button>
                                <button onClick={() => dispatch(setModalConfirmationUserDecision(true))} variant="contained">{t("yes")}</button>
                            </div>
                        </div>
                    </div>
                </Rodal>
            )}

            {/* book page leaving confirmation modal */}
            {showBookPageLeavingAlertModal && (
                <Rodal
                    visible={showBookPageLeavingAlertModal}
                    width={520}
                    height={240}
                    onClose={() => {}}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowBookPageLeavingAlertModal(false) }}><CloseIcon /></span></div>
                            <div>{t("leave_page_confirm_head")}</div>
                            <div>{t("book_page_leave_desc")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <button onClick={() => { setShowBookPageLeavingAlertModal(false) }}>{t("stay")}</button>
                                <button onClick={handleConfirmNavigationClick} variant="contained">{t("leave")}</button>
                            </div>
                        </div>
                    </div>
                </Rodal>
            )}

          
            <ReactRouterPrompt when={handleBlockedNavigationForWriter}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        visible={isActive}
                        width={520}
                        height={240}
                        onClose={() => {}}
                        showCloseButton={false}
                        className="ai-mark-confirm-box"
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("leave_page_confirm_head")}</div>
                                <div>{t("writer_page_leave_desc")}</div>
                            </div>
                            <div className="confirm-bottom">
                                <div>
                                    <button onClick={onCancel}>{t("stay")}</button>
                                    <button onClick={onConfirm} variant="contained">{t("leave")}</button>
                                </div>
                            </div>
                        </div>
                    </Rodal>
                )
            }}
            </ReactRouterPrompt>

            {/* writer page leaving confirmation modal */}
            {showWriterPageLeavingAlertModal && (
                <Rodal
                    visible={showWriterPageLeavingAlertModal}
                    width={520}
                    height={240}
                    onClose={() => {}}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowWriterPageLeavingAlertModal(false) }}><CloseIcon /></span></div>
                            <div>{t("leave_page_confirm_head")}</div>
                            <div>{t("writer_page_leave_desc")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <button onClick={() => { setShowWriterPageLeavingAlertModal(false) }}>{t("stay")}</button>
                                <button onClick={handleConfirmNavigationClick} variant="contained">{t("leave")}</button>
                            </div>
                        </div>
                    </div>
                </Rodal>
            )}
        </React.Fragment>
    )
}

export default Writter;
