import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBase from '@mui/material/ButtonBase';
import Radio from '@mui/material/Radio';
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
// import ListenAnimation from "./listen-animation/ListenAnimation";
import SimpleRodals from "../../rodals/SimpleRodals";
// import ErrorIcon from "@mui/icons-material/Error";
import {
    getFilesDocumentIdFromTranseditor,
    getFilesDocumentURLFromTransEditor,
    getProjectFilesAndJobsFromTransEditor,
    getProjectsFromTransEditor,
} from "../../helper/APIHelper";
import Breadcrumbs from "../../Breadcrumbs";
import Cookies from "js-cookie";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import InsuffientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import TranslateGoogleLogo from "../../../assets/images/new-project-setup/translate-google-logo.svg"
import AmazaonTranslator from "../../../assets/images/new-project-setup/amazon-trans.svg"
import NewMicrosoftTranslator from "../../../assets/images/new-project-setup/new-microsoft-translator.svg"
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const StandardTextTranslate = (props) => {
    const history = useNavigate();
    const [didMount, setDidMount] = useState(false);
    const [translateContent, setTranslateContent] = useState("");
    const [recognizedTranscripts, setRecognizedTranscripts] = useState("");

    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [sourceLabel, setSourceLabel] = useState("Source language");
    const [targetLabel, setTargetLabel] = useState("Target language");
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [finalTargetLang, setFinalTargetLang] = useState(null)
    const [subscriptionCredit, setSubscriptionCredit] = useState(0);
    const [addonCredit, setAddonCredit] = useState(0);
    const [mtResponses, setMTResponses] = useState(null);
    const [mtTypeCollapse, setMtTypeCollapse] = useState(false);
    const [mtGlbCollapase, setMtGlbCollapse] = useState(true);
    const [mtTranslateTextCollapse, setMtTranslateTextCollapse] = useState(false)
    const [selectedMtType, setSelectedMtType] = useState("google-translate");
    const [showSettings, setshowSettings] = useState(false);
    const [projectCreationStatus, setProjectCreationStatus] = useState({});
    const [error, setError] = useState({ inputText: "", sourceLanguage: "", targetLanguage: "" });
    const [isProcessing, setProcessing] = useState({ translate: false, edit: false, assign: false });
    const [projectName, setprojectName] = useState(null)

    const textareaRef = useRef();
    const targetLanguageOptionsRef = useRef([]);
    const projectQuickSetup = useRef(true);
    const projectNameRef = useRef()
    const [hasFocus, setHasFocus] = useState(false)
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [autoDetectIndication, setAutoDetectIndication] = useState(false)
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [partialCompareMt, setPartialCompareMt] = useState(false)

    const typing = useRef(false);
    const typingTimeout = useRef(0);

    const searchAreaRef = useRef(null);
    // let { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // useEffect(() => {
    //     setDidMount(true); //Component mounted
    //     getSourceLanguages();
    //     getCreditStatus();
    // }, []);

    // useEffect(() => {
    //     removeSelectedSourceFromTarget();
    // }, [sourceLanguage]);

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 604,
        height: 'auto',
    };

    useEffect(() => {
        if (projectCreationStatus?.request === "edit") openWorkspace();
        if (projectCreationStatus?.request === "assign") openProjectManagement();
    }, [projectCreationStatus.status]);


    useEffect(() => {
        projectNameRef.current.focus();
        setHasFocus(true)

    }, [projectNameRef]);

    const handleHideIcon = () => {
        projectNameRef.current.focus();
        setHasFocus(true)
    }

    /* API Connections as follows*/

    const header = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
    };

    // if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn't support speech recognition.</span>;
    // }

    const handleMtChange = (event) => {
        setSelectedMtType(event.target.value);
    };

    const handleMtSelect = (e) =>{
        setSelectedMtType(e.currentTarget.dataset.id);
    }

    const handleMtTypeCollapser = () => {
        // Disable temporarily.
        // setMtTypeCollapse(!mtTypeCollapse);
    };

    const handleMtGlbCollapser = () => {
        setMtGlbCollapse(true);
    };

    // const startListening = () => {
    //     SpeechRecognition.startListening({ continuous: true });
    //     const selectionStart = textareaRef.current.selectionStart;
    //     const selectionEnd = textareaRef.current.selectionEnd;

    //     setTranslateContent(addString(translateContent, selectionStart, selectionEnd, transcript));
    // };

    // const stopListening = () => {
    //     SpeechRecognition.stopListening();
    //     setRecognizedTranscripts(transcript);
    //     resetTranscript();
    // };

    const addString = (original, startIndex, endIndex, newString) => {
        return original.substring(0, startIndex) + newString + original.substring(endIndex, original.length);
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

    /* Get current user's purchased credits data */
    const getCreditStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/dashboard_credit_status`,
            auth: true,
            success: (response) => {
                setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
                setAddonCredit(response?.data?.credits_left?.addon);
                setSubscriptionCredit(response?.data?.credits_left?.subscription);
            },
        });
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
        setSearchInput('')
        setOnFocusWrap(false)
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, name, e) => {
        if (projectQuickSetup.current) {
            setTargetLanguage(value);
            setshowTarLangModal(false);
            setTargetLabel(name);
            setError({ ...error, targetLanguage: "" });
            setSearchInput('')
            setOnFocusWrap(false)
        } else {
            let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
            if (e.target.classList.contains("selected")) {
                e.target.classList.remove("selected");
                targetLanguageTemp = Config.removeItemFromArray(targetLanguageTemp, value);
                // if (editProjectId != null) {
                //     let thisJob = editJobs.find((element) => element.target_language == value);
                //     if (thisJob?.id != null) deletedJobIds.current.push(thisJob?.id);
                // }
            } else {
                e.target.classList.add("selected");
                targetLanguageTemp.push(value);
            }
            setTargetLanguage(targetLanguageTemp);
            setError({ ...error, targetLanguage: !targetLanguageTemp?.length ? "Required" : "" });
            setSearchInput('')
            setOnFocusWrap(false)
        }
    };

    const hideSettingsModal = () => setshowSettings(false);

    /* Selected source language should not display on the target language options */
    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(targetLanguageOptionsRef.current.filter((element) => element.id != sourceLanguage));
    };

       useEffect(() => {
        setDidMount(true); //Component mounted
        getSourceLanguages();
        getCreditStatus();
    }, []);

    useEffect(() => {
        removeSelectedSourceFromTarget();
        if(targetLanguage !== ''){
            setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage))
        }
    }, [sourceLanguage]);


    const validateForm = () => {
        let errorCopy = error;
        if (!translateContent) {
            errorCopy = { ...errorCopy, inputText: "Required" };
        }
        if (!sourceLanguage) {
            errorCopy = { ...errorCopy, sourceLanguage: "Required" };
        }
        if (!targetLanguage) {
            errorCopy = { ...errorCopy, targetLanguage: "Required" };
        }
        return errorStatus(errorCopy);
        // return errorStatus();
    };

    const errorStatus = (errorCopy) => {
        setError(errorCopy);
        if (!errorCopy.inputText.length && !errorCopy.sourceLanguage.length && !errorCopy.targetLanguage.length) {
            return true;
        } else return false;
    };

    const getSelectedMTEngine = () => {
        if (selectedMtType === "google-translate") return 1;
        if (selectedMtType === "microsoft-translate") return 2;
        if (selectedMtType === "amazon-translate") return 3;
    };

    const createProject = (request) => {
        let formData = new FormData();
        // console.log(projectName)
        if(projectName !== null && projectName?.trim() !== ""){
            // console.log(projectName)
            formData.append("project_name", projectName);
        }
        formData.append("text_data", translateContent);
        formData.append("source_language", sourceLanguage);
        formData.append("target_languages", targetLanguage);
        formData.append("mt_engine", getSelectedMTEngine());

        Config.axios({
            headers: header,
            url: Config.BASE_URL + "/workspace/project/quick/setup/",
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setProjectCreationStatus({ request: request, status: response.status === 201 ? true : false });
                setTimeout(() => setProcessing({ ...isProcessing, edit: false, assign: false }), 2000);
                Config.toast("Project created successfully");
            },
        });
    };

    const [translateTrigger, setTranslateTrigger] = useState(false)

    const handleTranslateBtnClick = () => {
        // console.log(targetLanguage)
        if(validateForm()){
            setProcessing({ ...isProcessing, translate: true });
            setTranslateTrigger(!translateTrigger)
            setFinalTargetLang(targetLanguage)
        }
    }

    useEffect(() => {
        setMTResponses(null)
    }, [targetLanguage])
    

    useEffect(() => {
        if(finalTargetLang !== null){
            fetchTranslate();
        }
    }, [finalTargetLang, translateTrigger])    

    const fetchTranslate = async() => {
        setMTResponses(null)
        setPartialCompareMt(false)
        // if (validateForm()) {
            // setProcessing({ ...isProcessing, translate: true });
            // Write API to create the project
            let formData = new FormData();
            let myHeaders = new Headers();
            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );
            let token = userCacheData != null ? userCacheData?.token : "";
            formData.append("text", translateContent);
            formData.append("source_language", sourceLanguage);
            formData.append("target_language", JSON.stringify([targetLanguage]));
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow'
            };

            let data = await fetch(Config.BASE_URL + "/workspace/mt_samples/", requestOptions)
            if(data.status === 200){
                let response = await data.json()
                // console.log(response)
                if(Object.values(response[finalTargetLang])?.filter(each => each.includes('Insufficient Credits'))?.length === Object.keys(response[finalTargetLang])?.length ){
                    setProcessing({ ...isProcessing, translate: false });
                    setShowCreditAlertModal(true)
                    return;
                }else if(Object.values(response[finalTargetLang])?.filter(each => each.includes('Insufficient Credits'))?.length > 0){
                    setMTResponses(response);
                    setMtGlbCollapse(true);
                    setMtTranslateTextCollapse(true);
                    setPartialCompareMt(true)
                    setProcessing({ ...isProcessing, translate: false });
                    setTimeout(() => {
                        setShowCreditAlertModal(true)
                    }, 250);
                    return;
                }
                setMTResponses(response);
                setMtGlbCollapse(true);
                setMtTranslateTextCollapse(true);
                setProcessing({ ...isProcessing, translate: false });
            }
        // }
    } 
    
    
    /* Create a project from Edit or Assign click event*/
    const handleEdit = () => {
        setProcessing({ ...isProcessing, edit: true });
        createProject("edit");
    };

    const handleAssign = () => {
        setProcessing({ ...isProcessing, assign: true });
        createProject("assign");
    };

    const openWorkspace = async () => {
        let token = Config.userState != null ? Config.userState.token : "";
        const project_id = await getRecentlyCreatedProjectId(token);
        let document_id = await getFilesAndJobsLength(token, project_id);
        history(`/workspace/${document_id}`, {state: {
            prevPageInfo: {
                pageNo: 1, 
                orderBy: "-id",
                projectId: project_id,
                fromProjectList: true
            }
        }});
    };

    const getRecentlyCreatedProjectId = async (token) => {
        let new_project_id = "";
        const project_data = await getProjectsFromTransEditor(token);
        project_data?.results?.slice(0, 1)?.map((project) => (new_project_id = project?.id));
        return new_project_id;
    };

    const getFilesAndJobsLength = async (token, project_id) => {
        let documentInformation = await getFilesDocumentURLFromTransEditor(token, project_id);
        let documentIdInformation = await getFilesDocumentIdFromTranseditor(token, documentInformation[0]?.document_url);
        return documentIdInformation?.document_id;
    };

    const openProjectManagement = async () => {
        let token = Config.userState != null ? Config.userState.token : "";
        const project_id = await getRecentlyCreatedProjectId(token);
        const task_id = await getNewProjectsTaskId(token, project_id);
        history(`/collaborate?project=${project_id}&task=${task_id}`);
    };

    const getNewProjectsTaskId = async (token, project_id) => {
        let files_and_jobs = await getProjectFilesAndJobsFromTransEditor(token, project_id);
        return files_and_jobs?.jobs[0]?.id;
    };

    const handleProjectNamechange = (e) => {
        setprojectName(e.target.innerText)
    }
    

    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
    }

    const detectSourceLanguage = () => {
        if(translateContent !== ""){
            Config.axios({
                headers: header,
                url: Config.BASE_URL + "/auth/lang_detect/?text=" + translateContent.split(' ').splice(0, 10).join(" "),
                auth: true,
                success: (response) => {
                    setSourceLanguage(response.data?.lang_id)
                    setSourceLabel(response.data?.language)
                    setAutoDetectIndication(true)
                    setTargetLabel("Target language")
                    setTargetLanguage("")
                },
                error: (err) => {
                    setAutoDetectIndication(false)
                }
            });
        }
    } 
    
    
    useEffect(() => {
      if(autoDetectIndication){
        setTimeout(() => {
            setAutoDetectIndication(false)
        }, 10000);
      }
    }, [autoDetectIndication])
    
    
    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 2000);
    };

    useEffect(() => {
        if(translateContent !== null || translateContent !== ""){
            debounce(detectSourceLanguage)
        }
    }, [translateContent])
    

    // const MTRadiobtn = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         "&:hover": {
    //             backgroundColor: "#EBEBEB",
    //             color: "#5F6368",
    //         },
    //         "&$checked": {
    //             color: "#0078D4",
    //             "&:hover": {
    //                 backgroundColor: "#E5F1FB",
    //             },
    //         },
    //     },
    //     checked: {},
    // })(Radio);

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


    const removebrtag=()=>{
        let rem = document.querySelector('.project-box')
        var var1   = rem.getElementsByTagName('br');

            for(var i = var1.length; i--;) {
                var1[i].parentNode.removeChild(var1[i]);
            }
    }
    document.querySelector('[contenteditable]')?.addEventListener('paste', function pasteAsPlainText(event) {
        event.preventDefault();
        event.target.innerText = event.clipboardData.getData("text/plain");
        removebrtag()
      });

    
    const executeProposalScroll = () => {
        projectNameRef.current.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            <div className="text-area-wizard-wrapper">
                <div className="text-area-header-wrap">
                    <Breadcrumbs />
                    <div className="project-input-wrap">
                        <div ref={projectNameRef} contentEditable="true" onClick={handleHideIcon} onBlur={()=>{executeProposalScroll();setHasFocus(false)}} data-placeholder="Untitled project" onKeyUp={handleProjectNamechange} onKeyDown={handleProjectEnter} className="project-box" tabIndex={0}></div>
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
                    </div>
                </div>
                <div className="text-area-wrap">
                    <div className="wizard-numbers-list">
                        <span className="wizard-num active">1</span>
                    </div>
                    <div className="text-translate-working-wrap">
                        <p className="header-title">Add text<span className="asterik-symbol">*</span></p>
                        <div className="ai-text-translate-work-container standard">
                            <div style={{ position: "relative" }}>
                                <textarea
                                    ref={textareaRef}
                                    className="ai-text-area"
                                    rows={5}
                                    value={translateContent}
                                    placeholder="Enter your text here"
                                    maxLength="5000"
                                    onChange={(e) => {
                                        setTranslateContent(e.target.value);
                                        setError({ ...error, inputText: e.target.value?.length === 0 ? "Required" : "" });
                                    }}
                                ></textarea>
                                {/* {error.inputText === "Required" && (
                                    <div className="ai-texbox-validation-alert">
                                        <p>
                                            <ErrorIcon
                                                style={{
                                                    color: "#fa0202",
                                                    width: 25,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            {error.inputText}
                                        </p>
                                    </div>
                                )} */}
                            </div>
                            <div className="ai-action-cont-wrapper standard">
                                <div className="ai-sl-tl-wrapper">
                                    <div className="ai-sl-tl-cont">
                                        <div className="position-relative">
                                            <ButtonBase onClick={() => {setshowSrcLangModal(true);}}>
                                                <div className="ai-sl-tl-btn">
                                                    <span className="text">{sourceLabel}
                                                    <span className="asterik-symbol">*</span>
                                                    </span>
                                                    <span className="icon">
                                                        <i className="fas fa-caret-down"></i>
                                                    </span>
                                                </div>
                                            </ButtonBase>
                                            <span className="text-danger d-block position-absolute error-bottom">{error.sourceLanguage}</span>
                                            {autoDetectIndication && <small className="auto-detect">Auto detect</small>}
                                        </div>
                                        <div className="position-relative">
                                            <ButtonBase onClick={() => {setshowTarLangModal(true);}} style={{opacity:(!sourceLanguage ? 0.5 : 1)}} disabled={!sourceLanguage}>
                                                <div className="ai-sl-tl-btn">
                                                    <span className="text">
                                                        {projectQuickSetup?.current
                                                            ? targetLabel
                                                            : targetLanguage?.length
                                                            ? `${targetLanguage?.length} language selected`
                                                            : "Target Language"}
                                                            <span className="asterik-symbol">*</span>
                                                    </span>
                                                    <span className="icon">
                                                        <i className="fas fa-caret-down"></i>
                                                    </span>
                                                </div>
                                            </ButtonBase>
                                            <span className="text-danger d-block position-absolute error-bottom">{error.targetLanguage}</span>
                                        </div>
                                    </div>
                                    {/* <span
                                        className={listening ? "stop-icon" : "mic-icon"}
                                        onClick={() => {
                                            startListening();
                                            stopListening();
                                        }}
                                    >
                                        <img
                                            src={
                                                Config.HOST_URL +
                                                (listening ? "assets/images/new-project-setup/ai-stop.svg" : "assets/images/new-project-setup/proj_mic_black.svg")
                                            }
                                            alt={listening ? "stop" : "mic"}
                                        />
                                        <span className="txt">{listening ? "Stop" : "Start"}</span>
                                    </span> */}
                                    {/* {listening && <ListenAnimation />} */}
                                </div>
                                <div className="ai-btn-and-txt-cont">
                                    <p className="calc-txt">{translateContent?.length} / 5000 chars</p>
                                    <button className="standard-translate-TranslateButton" disabled={translateContent.trim() === "" || targetLanguage?.length === 0 || sourceLanguage?.length === 0} onClick={() => {setMTResponses(null); handleTranslateBtnClick()}}>
                                        <span className="trans-btn-txt">
                                            {isProcessing?.translate ? "Processing" : "Show translations"}
                                            {isProcessing?.translate ? (
                                                <div className="ml-2 save-btn-spinner">
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
                                                </div>
                                            ) : (
                                                <span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="select-mt-wrap">
                    <div className="wizard-numbers-list">
                        <span className={"wizard-num " + (mtResponses ? "active" : "")}>2</span>
                    </div>
                    <Collapse isOpen={mtGlbCollapase}>
                        <div className="ai-mt-type-wrapper">
                            <div className="ai-mt-header">
                                <p className="title">Choose MT sample</p>
                                <span className="mid-line"></span>
                                {/* <div className="ai-show-more-btn" onClick={() => handleMtTypeCollapser()}>
                                    <span className="txt">Show more MT</span>
                                    <span className="icon">
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                </div> */}
                            </div>
                            <div className="ai-mt-card-list-wrapper">
                                {mtResponses ? (
                                    !mtResponses[finalTargetLang]?.Google_Translate?.includes('Insufficient Credits') ? (
                                        <div className={"ai-mt-card " + (selectedMtType === "google-translate" && mtResponses ? "selected" : "")} data-id="google-translate" onClick={(e) => handleMtSelect(e)}>
                                            <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                                {
                                                    mtResponses &&
                                                    <Radio
                                                        value="google-translate"
                                                        className="cell-box-radio"
                                                        size="small"
                                                        checked={selectedMtType === "google-translate" && mtResponses}
                                                        onChange={handleMtChange}
                                                    />
                                                }

                                                <img src={TranslateGoogleLogo} alt="google-translate" />
                                            </div>
                                            <Collapse isOpen={mtTranslateTextCollapse}>
                                                <div className="mt-translated-txt">
                                                    {
                                                        mtResponses  && 
                                                            mtResponses[finalTargetLang]?.Google_Translate
                                                    }
                                                </div>
                                            </Collapse>
                                        </div>
                                    ) : null
                                ) : (
                                    <div className={"ai-mt-card " + (selectedMtType === "google-translate" && mtResponses ? "selected" : "")}>
                                        <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                            {
                                                mtResponses &&
                                                <Radio
                                                    value="google-translate"
                                                    className="cell-box-radio"
                                                    size="small"
                                                    checked={selectedMtType === "google-translate" && mtResponses}
                                                    onChange={handleMtChange}
                                                />
                                            }

                                            <img src={TranslateGoogleLogo} alt="google-translate" />
                                        </div>
                                    </div>
                                )
                                }
                                {mtResponses ? (
                                   !mtResponses[finalTargetLang]?.Microsoft_Translator?.includes('Insufficient Credits') ? (<div className={"ai-mt-card " + (selectedMtType === "microsoft-translate" ? "selected" : "")} data-id="microsoft-translate" onClick={(e) => handleMtSelect(e)}>
                                        <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                            {
                                                mtResponses &&
                                                <Radio
                                                    value="microsoft-translate"
                                                    className="cell-box-radio"
                                                    size="small"
                                                    checked={selectedMtType === "microsoft-translate"}
                                                    onChange={handleMtChange}
                                                />
                                            }

                                            <img src={NewMicrosoftTranslator} alt="microsoft-bing" />
                                        </div>
                                        <Collapse isOpen={mtTranslateTextCollapse}>
                                            <div className="mt-translated-txt">{mtResponses && mtResponses[finalTargetLang]?.Microsoft_Translator }</div>
                                        </Collapse>
                                    </div>) : null
                                ) : (
                                    <div className={"ai-mt-card " + (selectedMtType === "microsoft-translate" ? "selected" : "")}>
                                        <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                            {
                                                mtResponses &&
                                                <Radio
                                                    value="microsoft-translate"
                                                    className="cell-box-radio"
                                                    size="small"
                                                    checked={selectedMtType === "microsoft-translate"}
                                                    onChange={handleMtChange}
                                                />
                                            }

                                            <img src={NewMicrosoftTranslator} alt="microsoft-bing" />
                                        </div>
                                    </div>
                                )
                                }
                                {mtResponses ? (
                                    !mtResponses[finalTargetLang]?.Amazon_Translate?.includes('Insufficient Credits') ? (<div className={"ai-mt-card " + (selectedMtType === "amazon-translate" ? "selected" : "")} data-id="amazon-translate" onClick={(e) => handleMtSelect(e)}>
                                        <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                            {
                                                mtResponses &&
                                                <Radio
                                                    value="amazon-translate"
                                                    className="cell-box-radio"
                                                    size="small"
                                                    checked={selectedMtType === "amazon-translate"}
                                                    onChange={handleMtChange}
                                                />
                                            }
                                            <img src={AmazaonTranslator} alt="amazon-trans" />
                                        </div>
                                        <Collapse isOpen={mtTranslateTextCollapse}>
                                            <div className="mt-translated-txt">{mtResponses && mtResponses[finalTargetLang]?.Amazon_Translate}</div>
                                        </Collapse>
                                    </div>) : null
                                ) : (
                                    <div className={"ai-mt-card " + (selectedMtType === "amazon-translate" ? "selected" : "")}>
                                        <div className={"mt-card-header " + (!mtResponses ? "justify-content-center" : "")}>
                                            {
                                                mtResponses &&
                                                <Radio
                                                    value="amazon-translate"
                                                    className="cell-box-radio"
                                                    size="small"
                                                    checked={selectedMtType === "amazon-translate"}
                                                    onChange={handleMtChange}
                                                />
                                            }
                                            <img src={AmazaonTranslator} alt="amazon-trans" />
                                        </div>
                                    </div>
                                )
                                }
                                {/* <Collapse isOpen={mtTypeCollapse}>
                                    <div className={"ai-mt-card " + (selectedMtType === "lingva-nex-translate" ? "selected" : "")}>
                                        <div className="mt-card-header">
                                            <MTRadiobtn
                                                value="lingva-nex-translate"
                                                className="cell-box-radio"
                                                size="small"
                                                checked={selectedMtType === "lingva-nex-translate"}
                                                onChange={handleMtChange}
                                            />
                                            <img src={Config.HOST_URL + "assets/images/new-project-setup/lingva-nex.svg"} alt="lingva-nex" />
                                        </div>
                                        <div className="mt-translated-txt">{mtResponses && mtResponses[finalTargetLang]?.Lingvanex}</div>
                                    </div>
                                </Collapse> */}
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="text-translate-btn-wrap">
                    <div className="wizard-numbers-list">
                        <span className={"wizard-num " + (selectedMtType && mtResponses ? "active" : "")}>3</span>
                    </div>
                    <div className="w-100">
                        <div className="improve-btn-wrapper">
                            <div className="ai-mt-header">
                                <p className="title">Improve and customize</p>
                                <span className="mid-line"></span>
                            </div>
                            <div className="ai-btn-card-select-btn">
                                <button className="standard-translate-TranslateButton" disabled={selectedMtType === "" || !mtResponses} onClick={() => {(isProcessing?.edit || isProcessing?.assign) ? console.log() : handleEdit()}}>
                                    <span className="trans-btn-txt trans-btn-padd">
                                        {isProcessing?.edit ? "Processing" : "Open to edit"}
                                        {isProcessing?.edit && (
                                            <div className="ml-2 save-btn-spinner">
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
                                            </div>
                                        )}
                                    </span>
                                </button>
                                <button className="standard-translate-TranslateButton" disabled={selectedMtType === "" || !mtResponses} onClick={() => {(isProcessing?.edit || isProcessing?.assign) ? console.log() : handleAssign()}}>
                                    <span className="trans-btn-txt trans-btn-padd">
                                        {isProcessing?.assign ? "Processing" : "Find editors"}
                                        {isProcessing?.assign && (
                                            <div className="ml-2 save-btn-spinner">
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
                                            </div>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <SimpleRodals
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                showSrcLangModal={showSrcLangModal}
                showTarLangModal={showTarLangModal}
                setshowSrcLangModal={setshowSrcLangModal}
                setshowTarLangModal={setshowTarLangModal}
                sourceLanguageOptions={sourceLanguageOptions}
                targetLanguageOptions={targetLanguageOptions}
                handleSourceLangClick={handleSourceLangClick}
                handleTargetLangClick={handleTargetLangClick}
                quickProjectSetup={projectQuickSetup.current}
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                searchInput={searchInput} 
                setSearchInput={setSearchInput}
                onFocusWrap={onFocusWrap} 
                setOnFocusWrap={setOnFocusWrap}
                searchAreaRef={searchAreaRef}
            />

            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => {setShowCreditAlertModal(false);}}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="credits-text-cont">
                <React.Fragment>
                    <img src={InsuffientIcon} alt="insuffient-icon" />
                    
                    <div className="insuffient-txt-align">
                        <span>
                            <img src={RemoveCircleRed} alt="remove_circle" />
                        </span>
                        <p>Insufficient credits</p>
                    </div>
                    {
                        partialCompareMt ? 
                            <p className="insuffient-desc">Some MT engine results are not available due to insufficent credits</p>
                        :
                            <p className="insuffient-desc">Insufficient credits to complete the task</p>
                    }
                    
                    {!Config.userState?.is_internal_member && (
                        <div className="mt-3">
                            <ButtonBase>
                                <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                    Buy Credits
                                </a>
                            </ButtonBase>
                        </div>
                    )}
                </React.Fragment>
                </div>
            </Rodal>)}
        </React.Fragment>
    );
};

export default StandardTextTranslate;
