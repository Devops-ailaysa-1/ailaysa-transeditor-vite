import React, { useState, useEffect, createRef, useRef } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Breadcrumbs from "../Breadcrumbs";
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import SimpleRodals from "../rodals/SimpleRodals";
import Rodal from "rodal";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Targetlanguage from "../../vendor/lang-modal/Targetlanguage";
import Select, { components } from "react-select";
import {
    getFilesDocumentIdFromTranseditor,
    getFilesDocumentURLFromTransEditor,
    getProjectFilesAndJobsFromTransEditor,
    getProjectsFromTransEditor,
} from "../helper/APIHelper";
import Config from "../../vendor/Config";
import TextInput from "./text-to-speech/TextInput";
import FileInput from "./text-to-speech/FileInput";
import DragandDrop from "../../vendor/DragandDrop";
import TargetLanguage from "../../vendor/lang-modal/Targetlanguage";
import AdvancedProjectType from "../../vendor/project-type-selection/AdvancedProjectType";
import Radio from '@mui/material/Radio';
import CachedIcon from '@mui/icons-material/Cached';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import getBlobDuration from 'get-blob-duration'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { lineHeight } from "@mui/system";
// import TextToSpeechLayout from "./speech-dictation/TextToSpeechLayout";
// import DraftEditor from "./speech-dictation/DraftEditor";
// import { SpeechDictation } from "./text-to-speech/SpeechDictation";
import { webSpeechLang } from "./text-to-speech/WebSpeechLang";
import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import { useSpeechRecognition } from 'react-speech-recognition';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import axios from "axios";
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import WarningIcon from '@mui/icons-material/Warning';
import Cookies from "js-cookie";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import RemoveCircleRed from "../../assets/images/new-ui-icons/remove_circle_red.svg"
import InsuffientIcon from "../../assets/images/new-ui-icons/insuffient-icon.svg"
import PauseIcon from "../../assets/images/project-setup/voice/pause-icon.svg"
import ColorDocIcon from "../../assets/images/new-project-setup/color-doc-icon.svg"
import ColorArrow from "../../assets/images/new-project-setup/color-arrow.svg"
import ColorTranslateIcon from "../../assets/images/new-project-setup/color-translate-icon.svg"
import ColorVoiceIcon from "../../assets/images/new-project-setup/color-voice-icon.svg"
import ImpFileIcon from "../../assets/images/new-ui-icons/imp-icon-file.svg"
import ReactRouterPrompt from 'react-router-prompt'
import ArrowRightGreyColor from "../../assets/images/new-create-hub/arrow_right_grey_color.svg"
import ConfirmIcon from "../../assets/images/new-ui-icons/confirm-icon.svg"

const TextToSpeech = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    // const {
    //     browserSupportsSpeechRecognition
    // } = useSpeechRecognition();
    const browserSupportsSpeechRecognition = null

    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [projectName, setProjectName] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const [translateSrcContent, setTranslateSrcContent] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [targetLabel, setTargetLabel] = useState(t("target_language"));
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [textToSpeechSwitch, setTextToSpeechSwitch] = useState(1);
    const [flowSwitch, setFlowSwitch] = useState(1) // 1 - for source downlaod, 2 - for translate and download
    const [textToSpeechGlbSwitch, setTextToSpeechGlbSwitch] = useState(2);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [sourceLabel, setSourceLabel] = useState(t("source_language"));
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [files, setFiles] = useState([]);
    const [deadline, setDeadline] = useState(null)
    const [selectedTypeValue, setSelectedTypeValue] = useState("");
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [selectedAudioConvert, setSelectedAudioConvert] = useState(false);
    // const [playPause, setPlayPause] = useState(false);
    const [selectedVoiceValue, setSelectedVoiceValue] = useState()
    const [preTranslate, setPreTranslate] = useState(false)
    const [translationByPage, setTranslationByPage] = useState(true)

    const [mtEnable, setMtEnable] = useState(true);


    const textareaRef = useRef();
    const searchAreaRef = useRef(null);
    const contentprojectNameRef = useRef();
    const targetLanguageOptionsRef = useRef([]);
    const projectQuickSetup = useRef(true);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const [showSettings, setshowSettings] = useState(false);
    const [validationState, setValidationState] = useState({
        projectName: false,
        inputText: false,
        files: false,
        srcLang: false,
        tarLang: false,
        dictatedData: false
    })

    const [sourceLanguageDisable, setSourceLanguageDisable] = useState(false);
    const [sourceTargetValidation, setSourceTargetValidation] = useState({
        source: false,
        target: false,
    })
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState(
        []
    );
    const [editFiles, setEditFiles] = useState([]);
    const [editJobs, setEditJobs] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [hasTeam, setHasTeam] = useState(false)
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [editProjectId, setEditProjectId] = useState(null)
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [projectId, setProjectId] = useState(null)
    const [selectedProjectFiles, setSelectedProjectFiles] = useState([]);
    const [animate, setAnimate] = useState(null)
    const [clickedOpenButton, setClickedOpenButton] = useState(false);
    const [taskID, setTaskID] = useState(null)
    const [showConvertAllModal, setShowConvertAllModal] = useState(false)
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)
    const [dictationInput, setDictationInput] = useState("")
    const [showProcessingModal, setShowProcessingModal] = useState(false)
    const [isConversionGoing, setIsConversionGoing] = useState(false)
    const [showBtnLoader, setShowBtnLoader] = useState(false)

    // Auido Download States
    const [showAudioOptionsModal, setShowAudioOptionsModal] = useState(false)
    const [localeOptions, setLocaleOptions] = useState([])
    const [genderOptions, setGenderOptions] = useState([])
    const [audioLocale, setAudioLocale] = useState(null)
    const [audioGender, setAudioGender] = useState([])
    const [voiceType, setVoiceType] = useState(null)
    const [isTranslatedAudioFileAvailable, setIsTranslatedAudioFileAvailable] = useState(null)

    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)


    // audio player states
    const [isPlaying, setIsPlaying] = useState(null)
    const [play, setPlay] = useState(false);
    const [currentSlider, setCurrentSlider] = useState(null)
    const [currentThumb, setCurrentThumb] = useState(null)
    const [bar, setBar] = useState(null)
    const [totDuration, setTotDuration] = useState(0)
    const [inputRangeValue, setInputRangeValue] = useState(null)
    const [audioTagId, setAudioTagId] = useState(null)
    const [currentTimeText, setCurrentTimeText] = useState(null)
    const [currentAudioTime, setCurrentAudioTime] = useState(null)
    const [sliderPercentage, setSliderPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false)  // state for showing skeleton
    const [showPunctuationModal, setShowPunctuationModal] = useState(false)
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("")
    const [isProjectDeleting, setIsProjectDeleting] = useState(false)


    const audioPlayer = useRef(null); //Ref for HTML Audio tag
    const sliderRangeRef = useRef()
    const sliderThumbRef = useRef()
    const dictationDataRef = useRef(null)

    // steps related states
    const [steps, setSteps] = useState([])
    const [stepOptions, setStepOptions] = useState([])
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [stepsFromApi, setstepsFromApi] = useState([])
    const [revisionStepEdit, setRevisionStepEdit] = useState(null)

    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const ref = useRef(null)
    const targetLanguageOptionRef = useRef(null)
    const dictatFilteredSourceLang = useRef(null)
    const dictatedFilterListWithAccent = useRef(null)

    // voice-dictation
    const [speechSourceLanguageOption, setSpeechSourceLanguageOption] = useState(null); // int
    const [accentOptions, setAccentOptions] = useState(null)
    const [selectedAccent, setSelectedAccent] = useState(null)
    const [isListening, setIsListening] = useState(false);
    const [dictatedData, setDictatedData] = useState(null)

    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [dictationTabSwitchAlert, setDictationTabSwitchAlert] = useState(false)

    const [tempTabSwitch, setTempTabSwitch] = useState(1)
    const [switchTrigger, setSwitchTrigger] = useState(false)
    const [recentlyUsedLangs, setRecentlyUsedLangs] = useState([])
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false)
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)

    const [formValidation, setFormValidation] = useState({
        source: false,
        target: false,
        name: false,
        file: false
    })


    const prevT2SSwitch = useRef(null)
    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const stepOptionsRef = useRef(null)
    const prevPageInfo = useRef(null)
    const sourceLangRef = useRef(null)


    const handleSelectedConvert = (e) => {
        setSelectedAudioConvert(true)
    }

    // useEffect(() => {
    //   console.log(speechSourceLanguageOption);
    // }, [speechSourceLanguageOption])



    // const TranslateButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         borderRadius: "3px",
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: 0,
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //         "&:disabled": {
    //             opacity: "0.5",
    //         },
    //     },
    // }))(Button);

    // const GoBackButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "transparent",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         color: "#0078D4",
    //         border: "1px solid #0078D4",
    //         textTransform: "none",
    //         padding: 0,

    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             color: "#ffffff",
    //         },
    //     },
    // }))(Button);


    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#9B9FA2",
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
            zIndex: 10,
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected && state.isDisabled ? "#ededed" : "#ffffff",
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

    const customVoiceSelectionStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#9B9FA2",
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
            background: state.isSelected && state.isDisabled ? "#ededed" : "#ffffff",
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
            border: state.isFocused ? "0px solid #DBDBDB" : "0px solid #DBDBDB",
            transtion: 0.3,
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px",
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

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

    // const Tooltip = withStyles({
    //     tooltip: {
    //         color: "#ffffff !important",
    //         backgroundColor: "#2A2A2A !important",
    //         padding: "7px 12px !important",
    //         fontFamily: "Roboto !important",
    //         fontSize: "12px !important",
    //         lineHeight: 1.4,
    //         fontWeight: "400 !important",
    //         width: "auto !important",
    //         maxWidth: "100% ",
    //     },
    //     arrow: {
    //         color: "#2A2A2A",
    //     },
    // })(Tooltip);

    const handleVoiceSelection = (selectedOption) => {
        setSelectedVoice(selectedOption);
        const newArr = selectedProjectFiles?.map(obj => {
            return { ...obj, voice_gender: selectedOption, voice_locale: audioLocale };
        });
        // console.log(newArr)
        setSelectedProjectFiles(newArr)
    };

    const handleSelectedVoiceValue = (selected) => {
        setSelectedVoiceValue(selected)
    }


    // Initial Api calls
    useEffect(() => {
        voiceSupportedLangList();
        getSteps()
    }, []);

    const voiceOptions = [
        { id: 1, label: 'Male' },
        { id: 2, label: 'Female' }
    ]

    const sourceAudioWrapper = [
        {
            id: 1,
            audioFileName: "Record.mp3",
            audioVoiceSelection: [
                {
                    id: 1,
                    value: "female-voice",
                    label: "Female voice"
                },
                {
                    id: 2,
                    value: "male-voice",
                    label: "Male voice"
                }
            ]

        },
        {
            id: 2,
            audioFileName: "Record.mp3",
            audioVoiceSelection: [
                {
                    id: 1,
                    value: "female-voice",
                    label: "Female voice"
                },
                {
                    id: 2,
                    value: "male-voice",
                    label: "Male voice"
                }
            ]

        },
        {
            id: 3,
            audioFileName: "Record.mp3",
            audioVoiceSelection: [
                {
                    id: 1,
                    value: "female-voice",
                    label: "Female voice"
                },
                {
                    id: 2,
                    value: "male-voice",
                    label: "Male voice"
                }
            ]

        },
    ]


    const hideSettingsModal = () => setshowSettings(false);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const DropdownAudioIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down-new"></span>
            </components.DropdownIndicator>
        );
    };

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 604,
        height: 'auto',
        onClose: hideSettingsModal,
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
            setStepOptions(stepList)
            stepOptionsRef.current = stepList
        })
    }, [steps])

    // by default post editing is selected and it can't be removed [mandatory step]
    useEffect(() => {
        setSelectedSteps(stepOptions?.filter(each => each.value === 1))
    }, [stepOptions])


    // set the file area for edit project
    useEffect(() => {
        if (isEdit) {
            setTextToSpeechSwitch(2)
        }
    }, [isEdit])

    useEffect(() => {
        if (URL_SEARCH_PARAMS.get("get-project-info")) {
            setFlowSwitch(2)
            setTextToSpeechGlbSwitch(2)
            setIsLoading(true)
        }
    }, [URL_SEARCH_PARAMS.get("get-project-info")])

    useEffect(() => {
        setTargetLanguageOptions(targetLanguageOptionRef.current?.filter(each => each.id !== sourceLanguage))
        if (targetLanguage !== '') {
            setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage))
        }
    }, [sourceLanguage])

    useEffect(() => {
        if (targetLanguageOptionRef.current !== null) {
            if (location.search === '') {
                recentlyUsedLanguage()
            }
        }
    }, [targetLanguageOptionRef.current, location.search])


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
        if (
            URL_SEARCH_PARAMS.get("get-project-info") &&
            URL_SEARCH_PARAMS.get("type") &&
            targetLanguageOptionRef.current !== null &&
            stepOptionsRef.current !== null
        ) {
            let projectId = URL_SEARCH_PARAMS.get("get-project-info");
            let projectType = URL_SEARCH_PARAMS.get("type");
            setIsEdit(true)
            setEditProjectId(projectId)
            editTextToSpeechProject(projectId, projectType);
        }
    }, [targetLanguageOptionRef.current, stepOptionsRef.current]);

    useEffect(() => {
        if (location.state?.prevPageInfo) {
            prevPageInfo.current = location.state?.prevPageInfo
        }
        if (location.state?.aiWritingCateg) {
            setFlowSwitch(2)
        }
    }, [location.state])

    // auto detect language when content is typed or pasted in textarea
    useEffect(() => {
        if(translateSrcContent?.trim() !== ''){
            Config.debounceApiCalls(() => detectSourceLanguage())
        }
    }, [translateSrcContent])
    

    // handler for steps selection
    const handleSelectedSteps = (selected) => {
        setSelectedSteps(selected);
    };

    const editTextToSpeechProject = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let {
                    data,
                    data: { glossary },
                } = response;
                let editSourceLanguage = targetLanguageOptionRef.current?.find(
                    (element) => element.id == data.jobs[0].source_language
                );
                deletedJobIds.current = [];
                deletedEditFileIds.current = [];
                setFiles([]);
                setEditFiles(data.files);
                setEditJobs(data.jobs);

                let tar = [];
                let tarID = [];
                // console.log(response.data?.jobs)
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setHasTeam(data?.team)
                // console.log(tarID)
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                setMtEnable(data?.mt_enable)
                setPreTranslate(data?.pre_translate)
                setTranslationByPage(data?.get_mt_by_page)
                setSourceLanguage(editSourceLanguage?.id);
                setSourceLabel(editSourceLanguage?.language);
                setSourceLanguageDisable(true);

                let deadlineLocal = Config.convertUTCToLocal(data?.project_deadline);
                setDeadline(deadlineLocal);

                let editTargetLanguages = [];
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });
                console.log(editTargetLanguages);

                setTimeout(() => {
                    setProjectName(data.project_name);
                    setRevisionStepEdit(data?.revision_step_edit);
                    contentprojectNameRef.current.innerText = data.project_name;
                    setTargetLanguage(editTargetLanguages);
                    setSelectedSteps(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
                    setstepsFromApi(stepOptionsRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
                    setIsLoading(false)
                }, 80);
            },
        });
    }

    /* Delete files when editing */
    const deleteEditFile = (e, canDelete = false, editFileId) => {
        // console.log(editFileId)
        if (canDelete) {
            let editFilesTemp = editFiles;
            let deleteValue = editFiles.find((element) => element.id == editFileId);
            setEditFiles(Config.removeItemFromArray(editFilesTemp, deleteValue));
            let deletedEditFileIdsTemp = deletedEditFileIds.current;
            deletedEditFileIdsTemp.push(editFileId);
            deletedEditFileIds.current = deletedEditFileIdsTemp;
            // console.log(deletedEditFileIds.current)
            /*}
                })*/
        } else Config.toast(t("file_progress_cannot_deleted"), "warning");
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
        if (flowSwitch === 2 && targetLanguageTemp.length == 0) {
            setValidationState({
                ...validationState,
                tarLang: true
            })
        } else {
            setValidationState({
                ...validationState,
                tarLang: false
            })
        }
    };

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

    // useEffect(() => {
    //   console.log(targetLangListToRemove)
    // }, [targetLangListToRemove])

    // ============= Voice option selection logic starts =============

    useEffect(() => {
        if (selectedProjectFiles?.length !== 0) {
            setIsTranslatedAudioFileAvailable(selectedProjectFiles[0]?.download_audio_source_file)
            // console.log(selectedProjectFiles[0]?.download_audio_source_file)
        }
    }, [selectedProjectFiles])


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

    const handleGenderChange = (selectedValue, id) => {
        setAudioGender(selectedValue)
        // console.log(id)

        const newArr = selectedProjectFiles?.map(obj => {
            if (obj.id === id) {
                return { ...obj, voice_gender: selectedValue, voice_locale: audioLocale };
            }
            return obj;
        });
        // console.log(newArr)
        setSelectedProjectFiles(newArr)
    }


    useEffect(() => {
        if (localeOptions?.length !== 0) {
            setAudioLocale(localeOptions[0])
        }
        if (genderOptions?.length !== 0) {
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
           
            if (filteredVoiceType?.Wavenet !== undefined) {
                setVoiceType(filteredVoiceType?.Wavenet?.voice_name)
            } else if (filteredVoiceType?.Standard !== undefined) {
                setVoiceType(filteredVoiceType?.Standard?.voice_name)
            }
        }
    }, [audioLocale, audioGender])



    // ============= Voice option selection logic ends =============



    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value);
        if (value === 0) {
            setValidationState({
                ...validationState,
                srcLang: true
            })
        } else {
            setValidationState({
                ...validationState,
                srcLang: false
            })
        }
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSearchInput('')
        setOnFocusWrap(false)
    };


    /* Get source language options */
    const voiceSupportedLangList = () => {
        let params = {
            url: `${Config.BASE_URL}/app/voice-support-language/?sub_category=2`,  //sub_category 2 - for text to speech
            auth: true,
            success: (response) => {
                // targetLanguageOptionsRef.current = response.data.target_lang_list;
                let langList = []
                response?.data?.target_lang_list?.map(each => langList.push({
                    id: each.language_id,
                    language: each.language
                }))
                targetLanguageOptionRef.current = langList
                let dictateFilterLang = []
                //  = langList?.filter(each => webSpeechLang?.some(obj => each.id === obj.value));
                let temp = webSpeechLang?.filter(each => langList?.some(obj => obj.id === each.value))
                temp?.map(each => {
                    dictateFilterLang.push({
                        id: each.value,
                        language: each.name,
                        code: each.code,
                        code_name: each.code_name
                    })
                })
                dictatedFilterListWithAccent.current = dictateFilterLang
                dictatFilteredSourceLang.current = [...new Map(dictateFilterLang.map(item => [item['id'], item])).values()]
                // console.log(dictatFilteredSourceLang.current)
                setTargetLanguageOptions(langList)
                setSourceLanguageOptions(langList)
            },
        };
        Config.axios(params);
    };

    useEffect(() => {
        if (sourceLanguage != '') {
            setSelectedAccent(null)
            setSpeechSourceLanguageOption(null)
            let accentList = dictatedFilterListWithAccent.current?.filter(each => each.id === sourceLanguage)
            // console.log(accentList)
            let accent_options = []
            accentList?.map((each, index) => {
                accent_options.push({
                    value: each.code,
                    label: each.code_name
                })
            })
            // console.log(accent_options)
            if (accent_options?.length === 1) {
                setSpeechSourceLanguageOption(accent_options[0]?.value)
            }
            setAccentOptions(accent_options)
        }
    }, [sourceLanguage])


    useEffect(() => {
        contentprojectNameRef.current?.focus();
        setHasFocus(true);
    }, [textToSpeechGlbSwitch === 2]);

    const handleAccentChange = (selectedValue) => {
        setSelectedAccent(selectedValue)
        setSpeechSourceLanguageOption(selectedValue.value)
    }

    const handleProjectNamechange = (e) => {
        setProjectName(e.target.innerText);
    };

    const handleHideIcon = () => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    };

    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
    };

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const niceBytes = (x) => {
        let l = 0;
        let n = parseInt(x, 10) || 0;

        while (n >= 1024 && ++l) {
            n = n / 1024;
        }
        return (
            n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
        );
    }


    /* File upload drag and drop handling */
    const handleDrop = (filesTemp) => {
       
        for (let i = 0; i < (filesTemp).length; i++) {
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        //Also check handleChange
        let thisFiles = filesTemp
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (ext !== ".docx" && ext !== ".txt") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }
        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if (
                filesTemp[eachKey].size / 1024 / 1024 <=
                allowedSingleFileSize.current
            )
                fileList.push(filesTemp[eachKey]);
            else Config.toast(singleFileSizeError.current, "error");

        });
        setFiles(fileList);
        if (fileList.length === 0) {
            setValidationState({
                ...validationState,
                files: true
            })
        } else {
            setValidationState({
                ...validationState,
                files: false
            })
        }
    };


    /* Handling all the project creation form */
    const handleChange = (e) => {
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
        if (ext !== ".docx" && ext !== ".txt") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }

        let fileList = [...files];
        Object.keys(thisFiles).map((eachKey) => {
            if (
                thisFiles[eachKey].size / 1024 / 1024 <=
                allowedSingleFileSize.current
            )
                fileList.push(thisFiles[eachKey]);
            else Config.toast(singleFileSizeError.current, "error");
        });
        setFiles(fileList);
        if (fileList.length === 0) {
            setValidationState({
                ...validationState,
                files: true
            })
        } else {
            setValidationState({
                ...validationState,
                files: false
            })
        }
    }


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

    const handleDateChange = (newValue) => {
        setDeadline(newValue);
    };


    const createTextToSpeechProject = (operationValue) => {
        setShowBtnLoader(true)
        let formdata = new FormData();

        formdata.append("source_language", sourceLanguage);
        // formdata.append("project_name", projectName);
        if (projectName !== null && projectName?.trim() !== "") {
            formdata.append("project_name", projectName);
        }
        formdata.append("project_type", "4"); // by default project type if 4 for voice project
        formdata.append("sub_category", "2"); // sub category is 2 for text to speech

        let deadlineUTC = Config.convertLocalToUTC(deadline);
        deadline && formdata.append("project_deadline", deadlineUTC);

        selectedSteps?.map((each) => {
            formdata.append("steps", each.value);
        })

        const regex = new RegExp('[.|?。!]+(\s|\n)?'); // check for punctuation validation

        if (textToSpeechSwitch === 1 && !regex.test(translateSrcContent?.trim()) && translateSrcContent?.trim()?.length > 350) {
            setShowPunctuationModal(true)
            return;
        }

        if (textToSpeechSwitch === 3 && !regex.test(dictationInput?.trim()) && dictationInput?.trim()?.length > 350) {
            setShowPunctuationModal(true)
            return;
        }

        textToSpeechSwitch === 1 && formdata.append("text_data", translateSrcContent?.trim());

        textToSpeechSwitch === 3 && formdata.append("text_data", dictationInput?.trim());

        if (textToSpeechSwitch === 2) {
            for (let x = 0; x < files.length; x++) {
                if (typeof files[x] != "undefined") formdata.append("files", files[x]);
            }
        }

        // if translate/download button is clicked, then add targetlanguages to api
        if (operationValue === 'translate') {
            targetLanguage.map((eachTargetLanguage) => {
                formdata.append("target_languages", eachTargetLanguage?.id);
            });
        }

        formdata.append("mt_enable", mtEnable);
        formdata.append("pre_translate", preTranslate);
        if(mtEnable) formdata.append("get_mt_by_page", translationByPage);


        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                setProjectId(response.data?.id)
                if (operationValue === 'translate') {
                    Config.toast(t("project_created_success"));
                    history(`/ai-voices?page=1&order_by=-id&open-project=${response?.data?.id}`)
                }
                if (operationValue === 'download') {
                    Config.toast(t("project_created_success"));
                    Config.axios({
                        url: Config.BASE_URL + "/workspace/vendor/dashboard/" + response?.data?.id,
                        auth: true,
                        success: (response) => {
                            // console.log(response.data)
                            setSelectedProjectFiles(response.data);
                            setTextToSpeechGlbSwitch(3)
                            setShowBtnLoader(false)
                        },
                    });
                    // downloadSourceAudioFile(response?.data?.id)
                }
            },
        });
    }

    const updateTextToSpeechProject = (operationValue) => {
        // console.log(projectName)
        setShowBtnLoader(true)
        let formdata = new FormData();

        formdata.append("source_language", sourceLanguage);
        // formdata.append("project_name", projectName);
        if (projectName !== null && projectName?.trim() !== "") {
            formdata.append("project_name", projectName);
        }
        formdata.append("project_type", "4"); // by default project type if 4 for voice project
        formdata.append("sub_category", "2"); // sub category is 1 for speech to text

        let deadlineUTC = Config.convertLocalToUTC(deadline);
        deadline && formdata.append("project_deadline", deadlineUTC);

        formdata.append("team", hasTeam);

        selectedSteps?.map((each) => {
            formdata.append("steps", each.value);
        })


        formdata.append("mt_enable", mtEnable);

        formdata.append("pre_translate", preTranslate);
        formdata.append("get_mt_by_page", translationByPage);


        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formdata.append("target_languages", eachTargetLanguage?.id);
        });

        if (textToSpeechSwitch === 2) {
            for (let x = 0; x < files.length; x++) {
                if (typeof files[x] != "undefined") formdata.append("files", files[x]);
            }
        }
        let list = "";
        targetLangListToRemove?.map((each, index) => {
            if (each.target_language !== null) {
                list += `${each.id}${index !== targetLangListToRemove.length - 1 ? "," : ""
                    }`;
            }
        });

        let stepsToRemoveList = stepOptions?.filter(stepOpt => selectedSteps?.some(each => stepOpt.value !== each.value))

        let deleteIdList = ""
        if (stepsFromApi.length > selectedSteps?.length) {
            stepsToRemoveList?.map((each, index) => {
                deleteIdList += `${each.value}${index !== stepsToRemoveList?.length - 1 ? "," : ""}`
            })
        } else if (stepsFromApi.length < selectedSteps?.length) {
            stepsToRemoveList?.map(each => {
                formdata.append("steps", each.value);
            })
        }

        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${editProjectId}/?step_delete_ids=${deleteIdList}&file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${list}`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                setShowBtnLoader(false)
                Config.toast(t("project_updated_success"));
                history(`/ai-voices?page=${prevPageInfo.current?.pageNo != null ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy != null ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${prevPageInfo.current?.projectId != null ? prevPageInfo.current?.projectId : response.data.id}`)
                operationValue === 'download' && downloadSourceAudioFile(response?.data?.id)
            },
        });
    }

    /* Delete a project by id */
    const deleteProject = (projectId, isConfirmed = false) => {
        setIsProjectDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                setIsProjectDeleting(false)
                history("/ai-voices?page=1&order_by=-id");
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setIsProjectDeleting(false)
                    setShowTaskDeleteAlert(true)
                    setShowDeleteConfirmationModal(false)
                }
                setIsProjectDeleting(false)
            }
        });
    };

    useEffect(() => {
        if (mtEnable === false) {
            setPreTranslate(false)
        }
    }, [mtEnable])



    const isValidate = (operationValue) => {
        if (projectName === "" && translateSrcContent.trim() === "" && files.length === 0 && sourceLanguage == "" && (dictationInput.trim() === "") && (flowSwitch === 2 && targetLanguage == "")) {
            setValidationState({
                projectName: true,
                inputText: textToSpeechSwitch === 1 ? true : false,
                files: textToSpeechSwitch === 2 ? true : false,
                srcLang: true,
                tarLang: true,
                dictationInput: textToSpeechSwitch === 3 ? true : false
            })
            contentprojectNameRef.current.scrollIntoView()
            contentprojectNameRef.current.focus();
            setHasFocus(true);
            return false
        }
      
        if (translateSrcContent.trim() === "" && textToSpeechSwitch === 1) {
            setValidationState({
                ...validationState,
                inputText: true
            })
            return false
        }
        if (files.length === 0 && textToSpeechSwitch === 2) {
            if (isEdit) {
                if (files.length === 0 && editFiles.length === 0) {
                    setValidationState({
                        ...validationState,
                        files: true
                    })
                    return false
                }
            } else {
                setValidationState({
                    ...validationState,
                    files: true
                })
                return false
            }
        }
        if (sourceLanguage === "") {
            setValidationState({
                ...validationState,
                srcLang: true
            })
            return false
        }
        if (textToSpeechSwitch === 3 && dictationInput?.trim() === "") {
            setValidationState({
                ...validationState,
                dictatedData: true
            })
            return false
        }
        if (flowSwitch === 2 && targetLanguage == "") {
            setValidationState({
                ...validationState,
                tarLang: true
            })
            return false
        }
        return true
    }

    const downloadTxtFile = (id, target) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            target === 'project' ?
                `${Config.BASE_URL}/workspace/convert_and_download_text_to_speech_source/?project=${id}`
                : `${Config.BASE_URL}/workspace/download_text_to_speech_source/?task=${id}`,
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

    const downloadSourceAudioFile = async (id, target) => {
        const response = await downloadTxtFile(id, target);
        Config.downloadFileInBrowser(response)
    }

    const resetForm = () => {
        setValidationState({
            projectName: false,
            inputText: false,
            files: false,
            srcLang: false,
            tarLang: false
        })
        setProjectName("")
        setSourceLanguage("")
        setTargetLanguage("")
        setFiles([])
        setTranslateSrcContent("")
        setSelectedAccent(null)
        setDeadline(null)
        setDictationInput(null)
    }

    const [convertingAll, setConvertingAll] = useState(false)
    const currentTaskId = useRef(null)
    const currentVoiceGender = useRef(null)
    const currentVoiceLocale = useRef(null)

    const convertSourceFileToAudioFile = (ID, target, voiceGender, voiceLocale) => {
        if (target === 'task') {
            setAnimate(ID)
            currentTaskId.current = ID
            currentVoiceGender.current = voiceGender
            currentVoiceLocale.current = voiceLocale
        }

        if (target === 'project') setClickedOpenButton(true)

        Config.axios({
            url: `${Config.BASE_URL}/workspace/convert_text_to_speech_source/?${target === 'task' ? "task=" + ID : ''}${target === 'project' ? "project=" + ID : ''}${voiceGender !== null ? "&gender=" + voiceGender?.label?.toUpperCase() : ''}${voiceLocale !== null ? "&language_locale=" + voiceLocale?.label : ''}${voiceType !== null ? "&voice_name=" + voiceType : ''}`,
            auth: true,
            success: (response) => {
                // console.log(response.data?.source_audio_file)
                if (target === 'task') {
                    setAnimate(null)
                    const newArr = selectedProjectFiles?.map(obj => {
                        if (obj.id === ID) {
                            return {
                                ...obj,
                                audio_file_url: Config.BASE_URL + response.data?.source_audio_file,
                            };
                        }
                        return obj;
                    });
                    // console.log(newArr)
                    setSelectedProjectFiles(newArr)
                }
                if (target === 'project') {
                    const newArr = selectedProjectFiles?.map(obj => {
                        if (obj.id == response.data?.find(each => each?.task == obj.id)?.task) {
                            return { ...obj, audio_file_url: Config.BASE_URL + response.data?.find(each => each?.task == obj.id)?.source_audio_file };
                        }
                        return obj;
                    });
                    // console.log(newArr)
                    setAnimate(null)
                    setShowConvertAllModal(false)
                    setSelectedProjectFiles(newArr)
                    setClickedOpenButton(false)
                    setIsConversionGoing(false)
                    setConvertingAll(false)
                }
            },
            error: (err) => {
                if (err.response.status == 400) {
                    if (err.response.data?.msg === "Insufficient Credits") {
                        setShowCreditAlertModal(true)
                        setShowConvertAllModal(false)
                        setClickedOpenButton(false)
                        setConvertingAll(false)
                        setAnimate(null)
                    }
                    if (err.response.data?.msg?.includes('Text to Speech conversion ongoing')) {
                        setShowConvertAllModal(false)
                        setClickedOpenButton(false)
                        if (target === 'task') {
                            setTimeout(() => {
                                convertSourceFileToAudioFile(currentTaskId.current, 'task', currentVoiceGender.current, currentVoiceLocale.current)
                            }, 8000);
                        }
                        if (target === 'project') {
                            setConvertingAll(true)
                            setAnimate('all')
                            setTimeout(() => {
                                convertSourceFileToAudioFile(projectId, 'project', audioGender, audioLocale)
                            }, 8000);
                        }

                    }
                } else {
                    Config.toast(t("conversion_failed"), 'error')
                    setAnimate(null)
                    setShowConvertAllModal(false)
                    setClickedOpenButton(false)
                    setIsConversionGoing(false)
                    setConvertingAll(false)
                }
            }
        });
    }



    const handleSlider = (blob, id, e, sliderId, thumbId, barID, playPauseId) => {
        setCurrentSlider(sliderId)
        setCurrentThumb(thumbId)
        setBar(barID)
        setIsPlaying(playPauseId)
        setAudioTagId(id)
        const audio = document.getElementById(id);
        setInputRangeValue(e.target.value)
        audio.currentTime = (totDuration / 100) * e.target.value

        setSliderPercentage(e.target.value)
    }

    useEffect(() => {
        // console.log(sliderPercentage)
        const slider = document.getElementById(currentSlider);
        if (slider !== undefined) {
            try {
                console.log(sliderPercentage)
                slider.value = sliderPercentage
            } catch (e) {
                console.log(e)
            }
        }
        let thumb = document.getElementById(currentThumb);
        const sliderRangeWidth = slider?.getBoundingClientRect()?.width
        const thumbWidth = thumb?.getBoundingClientRect()?.width
        const centerThumb = (thumbWidth / 100) * sliderPercentage * - 1
        const centerProgressBar = thumbWidth + sliderRangeWidth / 100 * sliderPercentage - (thumbWidth / 100 * sliderPercentage)
        try {
            thumb.style.left = `${sliderPercentage}%`
            thumb.style.marginLeft = `${centerThumb}px`
        } catch (e) {
            console.log(e)
        }

        let progressBar = document.getElementById(bar)
        try {
            console.log(progressBar)
            progressBar.style.width = `${centerProgressBar}px`
        } catch (e) {
            console.log(e)
        }
    }, [sliderPercentage])

    const playPause = (e, id, sliderId, thumbId, barID, playPauseId, audPlayer) => {
        setCurrentSlider(sliderId)
        setCurrentThumb(thumbId)
        setBar(barID)
        setIsPlaying(playPauseId)
        setTotDuration(null)
        let player = document.getElementById(id);

        player.addEventListener('play', function (e) {
            var audios = document.getElementsByTagName('audio');

            for (var i = 0, len = audios.length; i < len; i++) {
                if (audios[i] != e.target) {
                    audios[i].pause();
                    // setPlay(false)
                }
            }
        }, true);
        if (player.duration > 0 && !player.paused) {
            setPlay(false)
            player.pause();
        }
        else {
            setPlay(true)
            player.play();
        }
    };

    const getDurationTime = (e, id, blob, currentDurationId) => {
        let audio = document.getElementById(id)
        try{
            getBlobDuration(blob).then(function (duration) {
                document.getElementById(currentDurationId).innerHTML = secondsToHms(duration)
                audio = Math.floor(duration);
            });
        }catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (totDuration !== null && totDuration !== Infinity && currentTimeText !== null && currentAudioTime !== null) {
            // console.log(totDuration)
            const sliderPercent = ((currentAudioTime / totDuration) * 100).toFixed(2)
            const audioTime = currentAudioTime
          
            setSliderPercentage(+sliderPercent)
            document.getElementById(currentTimeText).innerHTML = secondsToHms(audioTime?.toFixed(2))
        }
    }, [currentAudioTime, totDuration])


    const getCurrentDuration = (e, id, blob, currentTimeId) => {
        let player = document.getElementById(id);
        getBlobDuration(blob).then(function (duration) {
            setTotDuration(duration)
        });
        setCurrentTimeText(currentTimeId)
        setCurrentAudioTime(player.currentTime)
    }


    function secondsToHms(seconds) {
        if (!seconds) return '00:00'

        let duration = seconds
        let hours = duration / 3600
        duration = duration % 3600

        let min = parseInt(duration / 60)
        duration = duration % 60

        let sec = parseInt(duration)

        if (sec < 10) {
            sec = `0${sec}`
        }
        if (min < 10) {
            min = `0${min}`
        }

        if (parseInt(hours, 10) > 0) {
            return `${parseInt(hours, 10)}:${min}:${sec}`
        } else if (min == 0) {
            return `00:${sec}`
        } else {
            return `${min}:${sec}`
        }
    }


    useEffect(() => {
        if (dictationInput !== "") {
            setValidationState({
                ...validationState,
                dictatedData: false
            })
        }
    }, [dictationInput])




    useEffect(() => {

        if (tempTabSwitch !== 3 && prevT2SSwitch.current === 3 && dictationInput !== "") {
            // setDictationTabSwitchAlert(true)
            setTextToSpeechSwitch(tempTabSwitch);
        } else {
            setTextToSpeechSwitch(tempTabSwitch);
        }
    }, [tempTabSwitch, switchTrigger])

    const handleTextToSpeechSwitch = (tab) => {
        setTempTabSwitch(tab)
        setSwitchTrigger(!switchTrigger)
        if (tempTabSwitch !== prevT2SSwitch.current) {
            prevT2SSwitch.current = textToSpeechSwitch
        }
    }

    const handleConfirmSwitch = () => {
        setTextToSpeechSwitch(tempTabSwitch);
        setDictationTabSwitchAlert(false)
    }


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

    const handleBlockedNavigation = ({nextLocation}) => {
        if (
            files.length <= 0 || dictationInput?.trim() === "" || translateSrcContent?.trim() === "" || 
            nextLocation.pathname?.includes('/text-to-speech') || nextLocation.pathname?.includes('/ai-voices')
        ) {
            return false
        }
        return true
    }

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
        Config.axios({
            url: Config.BASE_URL + "/workspace/default_detail/",
            auth: true,
            success: (response) => {
                let options = []
                response.data?.recent_pairs?.map(each => {
                    let filteredTar = each.tar.filter(eachTar => targetLanguageOptionRef.current.find(eachlang => eachlang.id === eachTar) !== undefined)   // filter the language that are in the language list
                    if (targetLanguageOptionRef.current.find(eachlang => eachlang.id === each.src)?.language && filteredTar.map(eachTar => targetLanguageOptionRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') !== '') {
                        options.push({
                            value: `${each.src}->${filteredTar.join(',')}`,
                            label: `${targetLanguageOptionRef.current.find(eachlang => eachlang.id === each.src)?.language}`,
                            customAbbreviation: `${filteredTar?.length > 1 ? filteredTar.map(eachTar => targetLanguageOptionRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : targetLanguageOptionRef.current.find(eachlang => eachlang.id === filteredTar[0])?.language
                                }`
                        })
                    }
                })
                setRecentlyUsedLangs(options)
            },
        });
    }

    const handleRecentLangClick = (clickedLang) => {
        let src = clickedLang.value.split('->')[0]
        let tar = clickedLang.value.split('->')[1]?.split(',')
        setSourceLabel(targetLanguageOptionRef.current?.find((element) => element.id == src).language)
        setSourceLanguage(src)
        let selectedTar = []
        tar?.map(eachTar => {
            selectedTar.push(targetLanguageOptionRef.current?.find((element) => element.id == eachTar))
        })
        setTargetLanguage([...new Set(selectedTar)]);
    }

    const focusSourceLangDiv = () => {
        if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if (sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    }

    const detectSourceLanguage = () => {
        if(translateSrcContent?.trim() !== ""){
            Config.axios({
                url: Config.BASE_URL + "/auth/lang_detect/?text=" + translateSrcContent.split(' ').splice(0, 10).join(" "),
                auth: true,
                success: (response) => {
                    setSourceLanguage(response.data?.lang_id)
                    setSourceLabel(response.data?.language)
                },
                error: (err) => {
                    // setAutoDetectIndication(false)
                }
            });
        }
    } 



    return (
        <React.Fragment>
            <div className="ai-working-area-glb-wrapper">
                <div className="file-trans-breadcrumbs-section">
                    <Breadcrumbs />
                    {
                        textToSpeechGlbSwitch === 1 &&
                        <div className="ts-work-area-selection">
                            <div className="ts-work-area-select-row">
                                <div onClick={() => setFlowSwitch(1)} className={"ts-work-area-select-col " + (flowSwitch === 1 ? "active" : "")}>
                                    <div className="img-row-wrap">
                                        <img src={ColorDocIcon} alt="doc-file" />
                                        <img src={ColorArrow} alt="grey-arrow" />
                                        <img src={ColorVoiceIcon} alt="audio-file" />
                                    </div>
                                    <p className="title">{t("text_to_speech_switch_first_note")}</p>
                                    <Radio
                                        checked={flowSwitch === 1}
                                        name="radio-buttons"
                                        onChange={() => setFlowSwitch(1)}
                                        size="small"
                                        className="radio-btn"
                                    />
                                </div>
                                <div onClick={() => { setFlowSwitch(2); }} className={"ts-work-area-select-col " + (flowSwitch === 2 ? "active" : "")}>
                                    <div className="img-row-wrap">
                                        <img src={ColorDocIcon} alt="translate" />
                                        <img src={ColorArrow} alt="grey-arrow" />
                                        <img src={ColorTranslateIcon} alt="doc-file" />
                                        <img src={ColorArrow} alt="grey-arrow" />
                                        <img src={ColorVoiceIcon} alt="audio-file" />
                                    </div>
                                    <p className="title">{t("text_to_speech_switch_second_note")}</p>
                                    <Radio
                                        checked={flowSwitch === 2}
                                        name="radio-buttons"
                                        onChange={() => setFlowSwitch(2)}
                                        size="small"
                                        className="radio-btn"
                                    />
                                </div>
                            </div>
                            <ButtonBase className="ts-work-btn" onClick={() => setTextToSpeechGlbSwitch(2)}>
                                {t("next")}
                                <ArrowForwardIcon
                                    style={{
                                        fontSize: 15,
                                        color: "#FFFFFF",
                                    }}
                                />
                            </ButtonBase>
                        </div>
                    }
                    {
                        textToSpeechGlbSwitch === 2 &&
                        <>
                            {/* <div className={"project-input-wrap " + ((validationState.projectName) && "error-focus")}> */}
                            <div className={"project-input-wrap "}>
                                <div
                                    ref={contentprojectNameRef}
                                    // onInput={projectName}
                                    suppressContentEditableWarning={true}
                                    contentEditable="true"
                                    onClick={handleHideIcon}
                                    // onBlur={() => {
                                    //     setHasFocus(false);
                                    // }}
                                    onBlur={executeProposalScroll}
                                    data-placeholder={t("untitled_project")}
                                    onKeyUp={(e) => handleProjectNamechange(e)}
                                    onKeyDown={handleProjectEnter}
                                    className="project-box"
                                    tabIndex={0}
                                ></div>
                                {/* {!hasFocus && (
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
                            {/* {validationState.projectName && <small style={{color: 'red'}}>Required</small>} */}
                            {isLoading ? (
                                <React.Fragment>
                                    <div className="ts-work-area-wrapper">
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
                                    </div>
                                </React.Fragment>
                            ) :
                                (<div className="ts-work-area-wrapper">
                                    <div style={{ position: "relative" }}>
                                        {!isEdit ? (
                                            <ul className="voice-tab-switch">
                                                <li onClick={() => handleTextToSpeechSwitch(1)} className={"voice-tab-item " + (textToSpeechSwitch === 1 ? "active" : "")}>
                                                    <p>{t("add_text")}</p>
                                                </li>
                                                <li onClick={() => handleTextToSpeechSwitch(2)} className={"voice-tab-item " + (textToSpeechSwitch === 2 ? "active" : "")}>
                                                    <p>{t("upload_files")}</p>
                                                </li>
                                                <li onClick={() => { handleTextToSpeechSwitch(3) }} className={"voice-tab-item " + (textToSpeechSwitch === 3 ? "active" : "")}>
                                                    <p>{t("dictation")}</p>
                                                </li>
                                            </ul>
                                        ) : (
                                            <p className="upload-area-title" style={{ marginTop: '10px' }}>{t("upload_files")}<span className="asterik-symbol">*</span></p>
                                        )}
                                        {textToSpeechSwitch === 3 && <div className="ts-action-cont-wrapper">
                                            <div className="ts-sl-tl-wrapper">
                                                <div className="ts-sl-tl-cont files-space-align">
                                                    <div className="form-fields">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleFormControlFile1"
                                                                style={(isListening) ? { opacity: 0.5 } : {}}
                                                            >
                                                                {t("source_language")}<span className="asterik-symbol">*</span>
                                                            </label>
                                                            <div
                                                                ref={sourceLangRef}
                                                                className={
                                                                    (sourceLanguageDisable || isListening || !browserSupportsSpeechRecognition)
                                                                        ? "ai-lang-select disabled"
                                                                        : "ai-lang-select"
                                                                }
                                                                onClick={
                                                                    (sourceLanguageDisable || isListening || !browserSupportsSpeechRecognition)
                                                                        ? () => { setshowSrcLangModal(false); }
                                                                        : () => { setshowSrcLangModal(true); }
                                                                }
                                                                disabled={isEdit || !browserSupportsSpeechRecognition}
                                                            >
                                                                {sourceLanguage == "" ? (
                                                                    <span className="placeholder">{t("select_source_language")}</span>
                                                                ) : (
                                                                    <span style={(isListening) ? { opacity: 0.5 } : {}}>{sourceLabel}</span>
                                                                )}
                                                                <i
                                                                    style={{ color: "#8c8c8c" }}
                                                                    className="fas fa-caret-down"
                                                                />
                                                            </div>
                                                            {(location.search === "" && flowSwitch === 2 && recentlyUsedLangs?.length !== 0) &&
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
                                                            {validationState.srcLang && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                        </div>
                                                    </div>
                                                    {textToSpeechSwitch == 3 && (accentOptions !== null && accentOptions[0]?.label !== undefined) ?
                                                        <div className="form-fields">
                                                            <div className="form-group">
                                                                <>
                                                                    <label style={(sourceLanguage === '' || isListening) ? { opacity: 0.5 } : {}}>{t("lang_accent")}</label>
                                                                    <Select
                                                                        options={accentOptions}
                                                                        styles={customStepSelectStyles}
                                                                        classNamePrefix="steps-select"
                                                                        value={selectedAccent}
                                                                        placeholder={t("select_accent")}
                                                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                                        isSearchable={false}
                                                                        onChange={handleAccentChange}
                                                                        isDisabled={sourceLanguage === '' || isListening}
                                                                    />
                                                                </>
                                                            </div>
                                                        </div> :
                                                        flowSwitch == 1 && <div className="form-fields">
                                                            <div className="form-group">
                                                            </div>
                                                        </div>
                                                    }
                                                    {flowSwitch === 2 && <div className="form-fields">
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
                                                                    className={!browserSupportsSpeechRecognition ? "ai-lang-select disabled" : "ai-lang-select"}
                                                                    style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                                                    onClick={!browserSupportsSpeechRecognition ? () => { setshowTarLangModal(false); } : () => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }}
                                                                    disabled={!browserSupportsSpeechRecognition}
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
                                                            {validationState?.tarLang && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>}
                                        <div className={(files.length > 0 || editFiles?.length > 0) ? "fileloaded voice-work-area-content " : "voice-work-area-content"}>
                                            {
                                                textToSpeechSwitch === 1 &&
                                                <>
                                                    <TextInput textareaRef={textareaRef} translateSrcContent={translateSrcContent} setTranslateSrcContent={setTranslateSrcContent} />
                                                    {validationState.inputText && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                    {/* <TextToSpeechLayout /> */}
                                                    {/* <DraftEditor 
                                            speechSourceLanguageOption={speechSourceLanguageOption} 
                                            // setSpeechTargetLanguageOption={setSpeechTargetLanguageOption} setTranslated={setTranslated} setAudioBlob={setAudioBlob} setAudioUrl={setAudioUrl} setTranslateContent={setTranslateContent}
                                            /> */}
                                                </>

                                            }
                                            {
                                                textToSpeechSwitch === 2 &&
                                                <>
                                                    <FileInput
                                                        DragandDrop={DragandDrop}
                                                        handleDrop={handleDrop}
                                                        handleChange={handleChange}
                                                        files={files}
                                                        removeFile={removeFile}
                                                        niceBytes={niceBytes}
                                                        editFiles={editFiles}
                                                        deleteEditFile={deleteEditFile}
                                                    />
                                                    {validationState.files && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                </>
                                            }
                                            {
                                                textToSpeechSwitch === 3 &&
                                                <>
                                                    {/* <TextInput textareaRef={textareaRef} translateSrcContent={translateSrcContent} setTranslateSrcContent={setTranslateSrcContent}/> */}
                                                    {
                                                        browserSupportsSpeechRecognition ?
                                                            <>
                                                                {/* <SpeechDictation
                                                                    isListening={isListening}
                                                                    setIsListening={setIsListening}
                                                                    setDictationInput={setDictationInput}
                                                                    speechSourceLanguageOption={speechSourceLanguageOption}
                                                                    dictatedData={dictatedData}
                                                                    setDictatedData={setDictatedData}
                                                                    dictationInput={dictationInput}
                                                                    dictationDataRef={dictationDataRef.current}
                                                                // editorState={editorState}
                                                                // setEditorState={setEditorState}
                                                                /> */}
                                                                {validationState.dictatedData && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                            </>
                                                            :
                                                            (
                                                                <div className="browser-not-support-wrap">
                                                                    <VoiceOverOffIcon className="speech-recognition-off" />
                                                                    <p>{t("browser_not_support_speech_note")}</p>
                                                                </div>
                                                            )
                                                    }
                                                </>
                                            }
                                        </div>

                                        {textToSpeechSwitch !== 3 && <div className="ts-action-cont-wrapper">
                                            <div className="ts-sl-tl-wrapper">
                                                <div className="ts-sl-tl-cont files-space-align">
                                                    <div className="form-fields">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleFormControlFile1"
                                                                style={(isListening) ? { opacity: 0.5 } : {}}
                                                            >
                                                                {t("source_language")}<span className="asterik-symbol">*</span>
                                                            </label>
                                                            <div
                                                                ref={sourceLangRef}
                                                                className={
                                                                    (sourceLanguageDisable || isListening)
                                                                        ? "ai-lang-select disabled"
                                                                        : "ai-lang-select"
                                                                }
                                                                onClick={
                                                                    (sourceLanguageDisable || isListening)
                                                                        ? () => { setshowSrcLangModal(false); }
                                                                        : () => { setshowSrcLangModal(true); }
                                                                }
                                                                disabled={isEdit}
                                                            >
                                                                {sourceLanguage == "" ? (
                                                                    <span className="placeholder">{t("select_source_language")}</span>
                                                                ) : (
                                                                    <span style={(isListening) ? { opacity: 0.5 } : {}}>{sourceLabel}</span>
                                                                )}
                                                                <i
                                                                    style={{ color: "#8c8c8c" }}
                                                                    className="fas fa-caret-down"
                                                                />
                                                            </div>
                                                            {(location.search === "" && flowSwitch === 2 && recentlyUsedLangs?.length !== 0) &&
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
                                                            {validationState.srcLang && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                        </div>
                                                    </div>
                                                    {textToSpeechSwitch == 3 && <div className="form-fields">
                                                        <div className="form-group">
                                                            {(accentOptions !== null && accentOptions[0]?.label !== undefined) &&
                                                                <>
                                                                    <label style={(sourceLanguage === '' || isListening) ? { opacity: 0.5 } : {}}>{t("lang_accent")}</label>
                                                                    <Select
                                                                        options={accentOptions}
                                                                        styles={customStepSelectStyles}
                                                                        classNamePrefix="steps-select"
                                                                        value={selectedAccent}
                                                                        placeholder={t("select_accent")}
                                                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                                        isSearchable={false}
                                                                        onChange={handleAccentChange}
                                                                        isDisabled={sourceLanguage === '' || isListening}
                                                                    />
                                                                </>
                                                            }
                                                        </div>
                                                    </div>}
                                                    {flowSwitch === 2 && <div className="form-fields">
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
                                                                    className="ai-lang-select"
                                                                    style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
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
                                                            {validationState?.tarLang && <small style={{ color: 'red' }}>{t("required")}</small>}
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>}
                                        {(flowSwitch === 2 || !browserSupportsSpeechRecognition) && <AdvancedProjectType
                                            deadline={deadline}
                                            setDeadline={setDeadline}
                                            projectType={4}
                                            revisionStepEdit={revisionStepEdit}
                                            steps={steps}
                                            selectedSteps={selectedSteps}
                                            setSelectedSteps={setSelectedSteps}
                                            stepOptions={stepOptions}
                                            handleSelectedSteps={handleSelectedSteps}
                                            setMtEnable={setMtEnable}
                                            mtEnable={mtEnable}
                                            setPreTranslate={setPreTranslate}
                                            preTranslate={preTranslate}
                                            translationByPage={translationByPage}
                                            setTranslationByPage={setTranslationByPage}
                                        />}
                                    </div>
                                    <div className="d-flex justify-between">
                                        {isEdit && (
                                            <button
                                                className="glossaryglobalform-StepCancelButton"
                                                onClick={() => history(-1)}
                                            >
                                                <span className="prev-btn">
                                                    {t("cancel")}
                                                </span>
                                            </button>
                                        )}
                                        <div className="new-btn-grp">
                                            {flowSwitch === 2 &&
                                                <div className="action-btns">
                                                    {showBtnLoader ? (
                                                        <button className="speech-to-text-UploadProjectButton">
                                                            <span className="trans-btn-txt">
                                                                <ButtonLoader />
                                                                {!isEdit ? t("creating") : t("updating")}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <button className="speech-to-text-UploadProjectButton" disabled={textToSpeechSwitch === 3 && !browserSupportsSpeechRecognition} onMouseUp={() => isValidate('translate') && (!isEdit ? createTextToSpeechProject('translate') : updateTextToSpeechProject('translate'))}>
                                                            <span className="trans-btn-txt">
                                                                {!isEdit ? t("translate_or_download") : t("update")}
                                                                <span>
                                                                    <i className="fas fa-arrow-right"></i>
                                                                </span>
                                                            </span>
                                                        </button>
                                                    )
                                                    }
                                                    {isEdit && <div
                                                        onClick={() => setShowDeleteConfirmationModal(true)}
                                                        className="edit-delete-btn"
                                                    >
                                                        <ButtonBase>
                                                            <div className="edit-delete-btn-cont">
                                                                <div className="delete-icon"></div>
                                                                {t("delete_project")}
                                                            </div>
                                                        </ButtonBase>
                                                    </div>}
                                                </div>
                                            }
                                            {(!isEdit && flowSwitch == 1) &&
                                                <>
                                                    <button className="speech-to-text-UploadProjectButton-process" disabled={textToSpeechSwitch === 3 && !browserSupportsSpeechRecognition} onMouseUp={() => isValidate('download') && createTextToSpeechProject('download')}>
                                                        
                                                        
                                                        {showBtnLoader ? (<span className="trans-btn-txt trans-btn-gap">
                                                        <span className="save-btn-spinner">
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
                                                        {t("processing")}
                                                        </span>) :(<span className="trans-btn-txt">
                                                            {t("process")}
                                                            <span>
                                                                <i className="fas fa-arrow-right"></i>
                                                            </span>
                                                        </span>)}
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>)}
                            {textToSpeechSwitch == 2 &&
                                <div className="supp-file-format ts-file-format-note">
                                    <div>
                                        <div className="supp-file-format-list">
                                            <p>.docx &nbsp; .txt</p>
                                        </div>
                                        <span className="imp-icon-img">
                                            <img
                                                src={ImpFileIcon}
                                                alt="imp-icon-file"
                                            />
                                        </span>
                                        <span className="supported-file-tooltip">
                                            {t("supported_file_formats")}
                                        </span>
                                    </div>
                                    <div className="content-two-info">
                                        <span className="max-file-note">
                                            {t("file_upload_condition_note_2")}: <span>100 MB</span>
                                        </span>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    {
                        textToSpeechGlbSwitch === 3 &&
                        <div className="ts-work-area-wrapper ts-work-area-padd">
                            <div className="ts-top-work-area">
                                <div className="ts-work-header">
                                    <p>{t("download_source_audio")}</p>
                                </div>
                                <div className="ts-work-source-audio-list-wrapper">
                                    {
                                        selectedProjectFiles?.length !== 0 && selectedProjectFiles?.map((item, index) => {
                                            return (
                                                <div key={item.id} className="ts-work-source-audio-list-item">
                                                    <div className="file-info-wrap">
                                                        {/* <img src={`${Config.BASE_URL}/app/extension-image/mp3`} alt="document"/>
                                                    <p>{item.audioFileName}</p> */}
                                                        {item?.audio_file_url === undefined ? <>
                                                            <span className="doc-icon">
                                                                <img
                                                                    src={
                                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                                        item?.filename?.split(".")?.pop()
                                                                    }
                                                                    alt="doc-icon"
                                                                />
                                                            </span>
                                                            <div>
                                                                <Tooltip TransitionComponent={Zoom} title={item?.filename} placement="top">
                                                                    <span className="file-edit-proj-txt-file-name">
                                                                        {item?.filename
                                                                            ?.split(".")
                                                                            ?.slice(0, -1)
                                                                            ?.join(".")}
                                                                    </span>
                                                                </Tooltip>
                                                                <Tooltip TransitionComponent={Zoom} title={item?.filename} placement="top">
                                                                    <span className="file-edit-proj-txt-file-extension">
                                                                        {"." + item?.filename?.split(".")?.pop()}
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                        </> :
                                                            <>
                                                                <span className="doc-icon">
                                                                    <img
                                                                        src={`${Config.BASE_URL}/app/extension-image/mp3`}
                                                                        alt="doc-icon"
                                                                    />
                                                                </span>
                                                                <div>
                                                                    <Tooltip TransitionComponent={Zoom} title={item?.filename} placement="top">
                                                                        <span className="file-edit-proj-txt-file-name">
                                                                            {item?.filename
                                                                                ?.split(".")
                                                                                ?.slice(0, -1)
                                                                                ?.join(".")}
                                                                        </span>
                                                                    </Tooltip>
                                                                    <Tooltip TransitionComponent={Zoom} title={item?.filename} placement="top">
                                                                        <span className="file-edit-proj-txt-file-extension">
                                                                            {".mp3"}
                                                                        </span>
                                                                    </Tooltip>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="audio-file-range">
                                                        {
                                                            item?.audio_file_url !== undefined &&
                                                            <div className="audio-custom-player">
                                                                <div className="audio-play-pause">
                                                                    <ButtonBase id={`audio-play-pause-${index}`} className="play-pause-wrap" onClick={(e) => playPause(e, item?.id, `audio-slider-${index}`, `audio-thumb-${index}`, `bar-${index}`, `audio-play-pause-${index}`, `player-${index}`)}>
                                                                        {(play && isPlaying == `audio-play-pause-${index}`) ?
                                                                            <img src={PauseIcon} alt="pause-icon" />
                                                                            :
                                                                            <PlayArrowRoundedIcon className="icon" />
                                                                        }
                                                                    </ButtonBase>
                                                                </div>
                                                                <div className="audio-player">
                                                                    <p className="audio-file-timings" id={`audio-currentTime-${index}`}>00:00</p>
                                                                    <div className="audio-slider-container">
                                                                        <div className="audio-progress-bar-cover" id={`bar-${index}`}></div>
                                                                        <div className="audio-thumb" id={`audio-thumb-${index}`} ref={sliderThumbRef}></div>
                                                                        <input type="range"
                                                                            id={`audio-slider-${index}`}
                                                                            // value={sliderPercentage}
                                                                            ref={sliderRangeRef}
                                                                            step="0.01"
                                                                            onChange={(e) => handleSlider(`${item?.audio_file_url}`, item?.id, e, `audio-slider-${index}`, `audio-thumb-${index}`, `bar-${index}`, `audio-play-pause-${index}`)}
                                                                            className="slider-range"
                                                                        />
                                                                    </div>
                                                                    <p className="audio-file-timings" id={`audio-duration-Time-${index}`}></p>
                                                                </div>
                                                                <audio
                                                                    ref={audioPlayer}
                                                                    id={item?.id}
                                                                    preload="auto"
                                                                    className={`player-${index}`}
                                                                    onLoadedData={(e) => getDurationTime(e, item?.id,  `${item?.audio_file_url}`, `audio-duration-Time-${index}`)}
                                                                    onTimeUpdate={(e) => getCurrentDuration(e, item?.id,  `${item?.audio_file_url}`, `audio-currentTime-${index}`)}
                                                                    onEnded={(e) => { setPlay(false); }}
                                                                    onPlay={(e) => { sliderPercentage == 100 && setSliderPercentage(0) }}
                                                                >
                                                                    <source src={ `${item?.audio_file_url}`} type="audio/mp3" />
                                                                </audio>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="audio-file-voice-selection">
                                                        {
                                                            item?.audio_file_url !== undefined ?
                                                                <p className="selected-value">{item?.voice_gender?.label === undefined ? audioGender?.label : item?.voice_gender?.label}</p>
                                                                :
                                                                selectedProjectFiles?.length !== 1 && !convertingAll &&
                                                                <Select
                                                                    options={genderOptions}
                                                                    styles={customVoiceSelectionStyles}
                                                                    value={item?.voice_gender}
                                                                    isDisabled={animate !== null && animate !== item?.id}
                                                                    placeholder={t("select_voice")}
                                                                    components={{ DropdownIndicator: DropdownAudioIndicator, IndicatorSeparator: () => null }}
                                                                    onChange={(selectedOption) => handleGenderChange(selectedOption, item?.id)}
                                                                />
                                                        }
                                                    </div>
                                                    <div className="audio-file-action-wrap">
                                                        {
                                                            item?.audio_file_url !== undefined ?
                                                                selectedProjectFiles?.length !== 1 &&
                                                                (
                                                                    <>
                                                                        <ButtonBase id={item.id} className="download-btn" onClick={() => downloadSourceAudioFile(item?.id, 'task')}>
                                                                            <FileDownloadOutlinedIcon className="download-icon" /> {t("download")}
                                                                        </ButtonBase>
                                                                    </>
                                                                )
                                                                :
                                                                selectedProjectFiles?.length !== 1 &&
                                                                <ButtonBase id={item.id}
                                                                    className="convert-btn"
                                                                    onClick={(e) => { animate === null && convertSourceFileToAudioFile(item?.id, 'task', item?.voice_gender, item?.voice_locale) }}
                                                                    disable={animate !== item?.id}
                                                                >
                                                                    <CachedIcon className={`reload-icon ${(animate == item?.id || animate === 'all') ? 'rotate' : ''}`} /> {t("convert")}
                                                                </ButtonBase>
                                                        }
                                                    </div>
                                                    {/* <div className="audio-file-delete-wrap">
                                                    <span className="upload-file-delete">
                                                        <img src={CloseBlack} alt="delete"/>
                                                    </span>
                                                </div> */}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="ts-bottom-work-area">
                                <div className="ts-bottom-top-area-box">
                                    <div className="source-lang-select-wrap">
                                        <span className="label">{t("source_language")}:</span>
                                        <span className="selected-src">{selectedProjectFiles?.length !== 0 && targetLanguageOptionRef.current?.find(each => each.id == selectedProjectFiles[0]?.source_language)?.language}</span>
                                        <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
                                    </div>
                                    <div className="audio-file-download-wrap">
                                        {selectedProjectFiles?.filter(each => each.audio_file_url !== undefined)?.length == selectedProjectFiles?.length ?
                                            <p className="convert-success"><CheckCircleOutlineOutlinedIcon className="done-icon" /> {t("converted")}</p>
                                            :
                                            (
                                                convertingAll ?
                                                    <ButtonBase className="convert-all-btn">
                                                        <span className="submit-txt">
                                                            <ButtonLoader processAll={true} />
                                                            {t("converting")}
                                                        </span>
                                                    </ButtonBase>
                                                    :
                                                    <ButtonBase className="convert-all-btn"
                                                        onClick={() => { isConversionGoing ? convertSourceFileToAudioFile(projectId, 'project', audioGender, audioLocale) : setShowConvertAllModal(true) }}
                                                        disabled={animate !== null}
                                                    >
                                                        {selectedProjectFiles?.length !== 1 ? t("convert_all") : t("convert")}
                                                    </ButtonBase>
                                            )
                                        }
                                        <ButtonBase className="convert-all-btn"
                                            onClick={() => downloadSourceAudioFile((selectedProjectFiles?.length === 1 ? selectedProjectFiles[0]?.id : projectId), (selectedProjectFiles?.length === 1 ? 'task' : 'project'))}
                                            disabled={selectedProjectFiles?.filter(each => each.audio_file_url !== undefined)?.length != selectedProjectFiles?.length}
                                        >
                                            {selectedProjectFiles?.length !== 1 ? t("download_all") : t("download")}
                                        </ButtonBase>
                                    </div>
                                </div>
                                <div className="take-translate-flow">
                                    <div className="translate-flow-wrap">
                                        <ErrorOutlineOutlinedIcon style={{ color: 'rgb(140, 140, 140)', fontSize: '20px' }} />
                                        <p>{t("translate_text_speech")},</p>
                                        <a href={window.location.origin + "/create/speech/text-to-speech?get-project-info=" + projectId + "&type=4"}>{t("setup_trans_proj")}</a>
                                        {/* <TranslationFlowButton className="convert-all-btn" components={Link}  onClick={() => openProjectUpdate()}>
                                        setup a translation project
                                    </TranslationFlowButton> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <SimpleRodals
                sourceLanguage={sourceLanguage}
                showSrcLangModal={showSrcLangModal}
                setshowSrcLangModal={setshowSrcLangModal}
                sourceLanguageOptions={textToSpeechSwitch !== 3 ? sourceLanguageOptions : dictatFilteredSourceLang.current}
                handleSourceLangClick={handleSourceLangClick}
                filteredResults={filteredResults}
                setFilteredResults={setFilteredResults}
                quickProjectSetup={projectQuickSetup.current}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onFocusWrap={onFocusWrap}
                setOnFocusWrap={setOnFocusWrap}
                searchAreaRef={searchAreaRef}
            />
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
                        targetLanguage={targetLanguage}
                        targetLanguageOptions={targetLanguageOptions}
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
            </Rodal>)}

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
            {showConvertAllModal && (<Rodal className="ts-rodal-mask" visible={showConvertAllModal} {...convertmodaloption} showCloseButton={false} clickedOpenButton={clickedOpenButton}>
                <div className="confirmation-wrapper ts-convert-modal">
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowConvertAllModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="form-fields">
                        <div className="form-group">
                            <label>{t("select_preferred_voice")}</label>
                            <Select
                                options={genderOptions}
                                styles={customStepSelectStyles}
                                value={audioGender}
                                classNamePrefix="steps-select"
                                placeholder={t("select_voice")}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                isSearchable={false}
                                onChange={handleGenderChange}
                            />
                        </div>
                    </div>
                    {selectedProjectFiles?.length !== 1 &&
                        <p className="convert-all-note"><ErrorOutlineOutlinedIcon style={{ color: 'rgb(140, 140, 140)', fontSize: '20px' }} /> {t("selected_voice_type")}</p>
                    }
                    <div className="button-row">
                        <button className="mydocument-AiMarkCancel" onClick={() => setShowConvertAllModal(false)}>
                            <span className="cancel-txt">{t("cancel")}</span>
                        </button>
                        {
                            clickedOpenButton ? (
                                <button className="convert-all-btn mydocument-AiMarkSubmit">
                                    <span className="submit-txt">
                                        <ButtonLoader />
                                        {t("processing")}
                                    </span>
                                </button>
                            ) : (
                                <button className="mydocument-AiMarkSubmit" onClick={() => convertSourceFileToAudioFile(projectId, 'project', audioGender, audioLocale)}>
                                    <span className="submit-txt">{t("process")}</span>
                                </button>
                            )
                        }
                    </div>
                </div>
            </Rodal>)}
            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false); history(`/ai-voices?page=1&order_by=-id&open-project=${projectId}`) }}>
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
            {dictationTabSwitchAlert && (<Rodal
                visible={dictationTabSwitchAlert}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setDictationTabSwitchAlert(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper">
                    <img
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    <h6 className="text-center">{t("some_content_dictation_tab")}</h6>
                    <div className="button-row">
                        <button className="mydocument-AiMarkCancel" onClick={() => setDictationTabSwitchAlert(false)}>
                            <span className="cancel-txt">{t("close")}</span>
                        </button>
                        <button className="mydocument-AiMarkSubmit" onClick={() => handleConfirmSwitch()}>
                            <span className="submit-txt">{t("switch")}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}
            {showProcessingModal && (<Rodal visible={showProcessingModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowProcessingModal(false); }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper-mod">
                    <WarningIcon className="warning-icon" />
                    <h2>{t("processing_text_1")} <br />{t("please_wait_few_minutes_para")}</h2>
                </div>
            </Rodal>)}
            {/* <Prompt
                when={checkchangenav}
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

            {showPunctuationModal && (<Rodal
                visible={showPunctuationModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowPunctuationModal(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper" style={{ padding: '20px' }}>
                    <img
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    <h6 className="text-center">{t("please_provide_punc_create_proj")}</h6>
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
        </React.Fragment>
    )
};

export default TextToSpeech;