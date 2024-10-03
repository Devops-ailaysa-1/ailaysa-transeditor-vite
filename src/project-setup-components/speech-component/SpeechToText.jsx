import React, { useState, useEffect, createRef, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import UploadAudio from "./speech-to-text/UploadAudio";
import RecordAudio from "./speech-to-text/RecordAudio";
import SimpleRodals from "../rodals/SimpleRodals";
import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from "../../vendor/Config";
import Button from '@mui/material/Button';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DragandDrop from "../../vendor/DragandDrop";
// import MicRecorder from "mic-recorder-to-mp3";
import AdvancedProjectType from "../../vendor/project-type-selection/AdvancedProjectType";
import TargetLanguage from "../../vendor/lang-modal/Targetlanguage";
// import useRecorder from "./speech-to-text/recorder-components/RecorderHooks";
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from "react-i18next";
import ReactRouterPrompt from 'react-router-prompt'
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"


function SpeechToText(props) {

    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();


    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [projectName, setProjectName] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const [speechTextSwitch, setSpeechTextSwitch] = useState(1);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [sourceLabel, setSourceLabel] = useState(t("source_language"));
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [files, setFiles] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobUrl] = useState([]);
    const [play, setPlay] = useState(false);
    const [sliderPercentage, setSliderPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioData, setAudioData] = useState([])


    const searchAreaRef = useRef(null);
    const contentprojectNameRef = useRef();
    const projectIdToSelect = useRef(null);
    const recorder = useRef(null); //Recorder
    const audioPlayer = useRef(null); //Ref for HTML Audio tag
    const timer = useRef(null); //Ref for interval object
    const time = useRef(0); //Stores the value of time
    const displayTime = useRef(null); //Stores dom ref for div to be used to display time
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const [deadline, setDeadline] = useState(null)

    // steps related states
    const [steps, setSteps] = useState([])
    const [stepOptions, setStepOptions] = useState([])
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [stepsFromApi, setstepsFromApi] = useState([])
    const [revisionStepEdit, setRevisionStepEdit] = useState(null)

    const [validationState, setValidationState] = useState({
        // projectName: false,
        recording: false,
        files: false,
        srcLang: false,
        tarLang: false,

    })

    const [editFiles, setEditFiles] = useState([]);
    const [editJobs, setEditJobs] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [hasTeam, setHasTeam] = useState(false)
    const [editProjectId, setEditProjectId] = useState(null)
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [sourceLanguageDisable, setSourceLanguageDisable] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState("");
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [isTargetLangExists, setIsTargetLangExists] = useState(false)
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [taskID, setTaskID] = useState(null)
    const [isLoading, setIsLoading] = useState(false) // state for showing skeleton

    const [tempWriterFile, setTempWriterFile] = useState(null)
    const [isTempWriterFileDeleted, setIsTempWriterFileDeleted] = useState(false)
    const [clickedOpenButton, setClickedOpenButton] = useState(null);

    const [isTranslationTaskAvailable, setIsTranslationTaskAvailable] = useState(false)
    const [mtEnable, setMtEnable] = useState(true);
    const [preTranslate, setPreTranslate] = useState(false)
    const [translationByPage, setTranslationByPage] = useState(true)
    const [checkchangenav, setCheckchangenav] = useState(false)
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("")
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false)
    const [isProjectDeleting, setIsProjectDeleting] = useState(false)
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)

    // adaptive translation state
    const [adaptiveTransEnable, setAdaptiveTransEnable] = useState(false);

    const deletedEditFileIds = useRef([]);
    const deletedJobIds = useRef([]);
    const targetLanguageOptionsRef = useRef([]);
    const stepOptionsRef = useRef(null)
    const prevPageInfo = useRef(null)
    const projectDataFromApi = useRef(null)


    useEffect(() => {
        if (location.state?.writerFile) {
            // console.log(location.state?.writerFile)
            // console.log(editFiles)
            setTempWriterFile(location.state?.writerFile)
            // setEditFiles(...editFiles, location.state?.writerFile)
        }
    }, [location.state])


    // resetform
    const resetform = () => {
        setAudioData([])
        setFiles([])
        setDeadline(null)
        contentprojectNameRef.current.innerText = ''
        setSourceLanguage("")
    }
    // console.log(contentprojectNameRef.current.innerText)



    const handleProjectNamechange = (e) => {
        setProjectName(e.target.innerText);
        // setValidationState({...validationState, projectName: false})
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording()
            setIsRecording(false)
        } else {
            startRecording()
            setIsRecording(true)
        }
    }

    const handleSlider = (e) => {
        const audio = audioPlayer.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setSliderPercentage(e.target.value)
    }


    // const UploadProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "12.5px 21px",
    //         "&:hover": {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         },
    //         "&:disabled": {
    //             opacity: "0.5",
    //         },
    //     },
    // }))(Button);

    // const AiMarkSubmit = withStyles((theme) => ({
    //     root: {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //       borderRadius: "3px",
    //       textTransform: "none",
    //       height: "40px",
    //       padding: 0,
    //       "&:hover": {
    //         backgroundColor: "#0069B9",
    //         boxShadow: "none",
    //       },
    //       "&:disabled": {
    //         opacity: "0.6",
    //       },
    //     },
    // }))(Button);

    //   const AiMarkCancel = withStyles((theme) => ({
    //     root: {
    //       backgroundColor: "#ffffff",
    //       boxShadow: "none",
    //       borderRadius: "4px",
    //       border: "1px solid #DADCE0",
    //       textTransform: "none",
    //       height: "40px",
    //       padding: 0,
    //       "&:hover": {
    //         boxShadow: "none",
    //         height: "40px",
    //       },
    //       "&:focus": {
    //         border: "1px solid #0078D4",
    //         height: "40px",
    //       },
    //     },
    // }))(Button);

    const hideSettingsModal = () => setshowSettings(false);

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };


    useEffect(() => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    }, [contentprojectNameRef]);

    const startRecording = () => {
        //start() returns a promise incase if audio is not blocked by browser
        recorder.current.start().then(() => {
            setIsRecording(true);
        });
    };

    useEffect(() => {
        //start/stops timer depending on recording state
        if (isRecording) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [isRecording]);

    const stopRecording = () => {
        recorder.current
            .stop().getMp3().then(([buffer, blob]) => {
                const newBlobUrl = URL.createObjectURL(blob); //generates url from blob
                setBlobUrl([...blobURL, newBlobUrl]); //refreshes the page
                // console.log(buffer)
                setIsRecording(false);
            }).catch((e) => console.log(e));
    };

    const playPause = () => {
        //Handle play/pause of audio on click of play/pause button
        const player = audioPlayer.current;

        if (player.paused) {
            setIsPlaying(true)
            player.play();
        } else {
            setIsPlaying(false)
            player.pause();
        }
        setPlay(!play);
    };

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

    const startTimer = () => {
        //sets interval that updates time on UI every second
        time.current = 0;
        timer.current = setInterval(() => {
            time.current = time.current + 1;
            displayTime.current.innerText = time.current;
            //Displays time by updating the DOM directly
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timer.current);
    };

    const setTime = () => {
        if (audioPlayer.current) {
            displayTime.current.innerText = Math.floor(audioPlayer.current.duration);
            //Displays time by updating the DOM directly
            //Note: Math.floor is used since audio time is in decimal and player only displays floor values
            //eg 3.86 will be displayed as 3 seconds in player
        }
    };


    const getCurrentDuration = (e) => {
        const sliderPercent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const audioTime = e.currentTarget.currentTime

        setSliderPercentage(+sliderPercent)
        setCurrentTime(audioTime.toFixed(2))
    }

    const handleHideIcon = () => {
        contentprojectNameRef.current.focus();
        setHasFocus(true);
    };

    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
    };

    /* Get source language options */
    const getSourceLanguages = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data
                setSourceLanguageOptions(response.data);
                setTargetLanguageOptions(response.data)
            },
        };
        Config.axios(params);
    };

    useEffect(() => {
        getSourceLanguages();
        getSteps()
    }, []);

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
        setSelectedSteps(stepOptions?.filter(each => each.value === 1))
    }, [stepOptions])


    // handler for steps selection
    const handleSelectedSteps = (selected) => {
        setSelectedSteps(selected);
    };



    // useEffect(() => {
    //     //Declares the recorder object and stores it in ref
    //     recorder.current = new MicRecorder({ bitRate: 128 });
    // }, []);

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSearchInput('')
        setOnFocusWrap(false)
        setValidationState({ ...validationState, srcLang: false })
    };

    useEffect(() => {
        if (
            URL_SEARCH_PARAMS.get("get-project-info") &&
            URL_SEARCH_PARAMS.get("type") &&
            targetLanguageOptionsRef.current !== null &&
            stepOptionsRef.current !== null
        ) {
            let projectId = URL_SEARCH_PARAMS.get("get-project-info");
            let projectType = URL_SEARCH_PARAMS.get("type");
            let task_id = URL_SEARCH_PARAMS.get("task");
            setIsEdit(true)
            setTaskID(task_id)
            setEditProjectId(projectId)
            editSpeechToTextProject(projectId, projectType);
        }
    }, [targetLanguageOptionsRef.current, stepOptionsRef.current, tempWriterFile]);

    useEffect(() => {
        if (URL_SEARCH_PARAMS.get("get-project-info")) {
            setIsLoading(true)
        }
    }, [URL_SEARCH_PARAMS.get("get-project-info")])

    useEffect(() => {
        if (location.state?.prevPageInfo) {
            prevPageInfo.current = location.state?.prevPageInfo
        }
    }, [location.state])

    useEffect(() => {
        setTargetLanguageOptions(targetLanguageOptions?.filter(each => each.id !== sourceLanguage))
        if (targetLanguage !== '') {
            setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage))
        }
    }, [sourceLanguage])

    const editSpeechToTextProject = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let {
                    data,
                } = response;
                let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                    (element) => element.id == data.jobs[0].source_language
                );

                projectDataFromApi.current = response.data
                deletedJobIds.current = [];
                deletedEditFileIds.current = [];
                setFiles([]);
                // console.log(tempWriterFile);
                if (tempWriterFile !== null) {
                    data.files.push(tempWriterFile)
                }
                // console.log(data.files)
                setEditFiles(data.files);
                setEditJobs(data.jobs);
                setIsTranslationTaskAvailable(data.files?.find(each => each?.get_file_name?.includes('.docx')) ? true : false)
                // console.log(stepOptions)
                setSelectedSteps(stepOptions?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
                setstepsFromApi(stepOptions?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))

                let editTargetLanguages = [];
                response.data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionsRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                    }
                });
                let tar = [];
                let tarID = [];
                // console.log(response.data?.jobs)
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                setIsTargetLangExists(editTargetLanguages?.length === 0 ? false : true)
                setPreTranslate(data?.pre_translate)
                setMtEnable(data?.mt_enable)
                setTranslationByPage(data?.get_mt_by_page)
                setSourceLanguage(editSourceLanguage?.id);
                setSourceLabel(editSourceLanguage?.language);
                setSourceLanguageDisable(true);
                setAdaptiveTransEnable(data?.isAdaptive)

                let deadlineLocal = Config.convertUTCToLocal(data?.project_deadline);
                setDeadline(deadlineLocal);
                setTimeout(() => {
                    setProjectName(data.project_name);
                    setRevisionStepEdit(data?.revision_step_edit);
                    setHasTeam(data?.team)
                    contentprojectNameRef.current.innerText = data.project_name;
                    setTargetLanguage(editTargetLanguages);
                    setIsLoading(false)
                }, 80);
            },
        });
    }

    // useEffect(() => {
    //   console.log(blobURL)
    // }, [blobURL])

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected")
            targetLanguageTemp = Config.removeItemFromArray(
                targetLanguageTemp,
                value
            );
            if (isTargetLangExists) {
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
        setSearchInput('')
        setOnFocusWrap(false)
        if (targetLanguageTemp.length == 0) {
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
        //Also check handleChange
        for (let i = 0; i < (filesTemp).length; i++) {
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        let thisFiles = filesTemp
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (ext !== ".mp3") {
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
        if (fileList.length > 3) {
            Config.toast(t("max_3_audio_files_uploaded"), 'warning')
            setFiles(fileList?.slice(0, 3))
        } else {
            setFiles(fileList?.slice(0, 3))
        }
        setValidationState({ ...validationState, files: false })
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
        if (ext !== ".mp3") {
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
        if (fileList.length > 3) {
            Config.toast(t("max_3_audio_files_uploaded"), 'warning')
            setFiles(fileList?.slice(0, 3))
        } else {
            setFiles(fileList?.slice(0, 3))
        }
        // console.log(fileList)
        setValidationState({ ...validationState, files: false })
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

    /* Delete files when editing */
    const deleteEditFile = (e, canDelete = false, editFileId) => {
        // console.log(editFileId)
        // if (canDelete) {
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
        // console.log(deletedEditFileIds.current)
        /*}
            })*/
        // } else Config.toast("File in progress. Cannot be deleted", "warning");
    };

    // useEffect(() => {
    //   console.log(targetLanguage)
    // }, [targetLanguage])


    // const isValidate = (operationValue) => {
    //     if(projectName === "" && files.length === 0 && audioData.length === 0 && sourceLanguage == "" && (isEdit && targetLanguage.length == 0)){
    //         setValidationState({
    //             projectName: true,
    //             files: speechTextSwitch === 1 ? true : false,
    //             srcLang: true,
    //             recording: speechTextSwitch === 2 ? true : false,
    //             tarLang: true,
    //         })
    //         contentprojectNameRef.current.scrollIntoView()
    //         contentprojectNameRef.current.focus();
    //         setHasFocus(true);
    //         return false
    //     }
    //     if(projectName === ""){
    //         setValidationState({
    //             ...validationState,
    //             projectName: true
    //         })
    //         contentprojectNameRef.current.scrollIntoView()
    //         contentprojectNameRef.current.focus();
    //         setHasFocus(true);
    //         return false
    //     }
    //     if(audioData.length === 0 && speechTextSwitch === 2){
    //         setValidationState({
    //             ...validationState,
    //             recording: true
    //         })
    //         return false
    //     }
    //     if(files.length === 0 && speechTextSwitch === 1){
    //         if(isEdit){
    //             if(files.length === 0 && editFiles.length === 0){
    //                 setValidationState({
    //                     ...validationState,
    //                     files: true
    //                 })
    //                 return false
    //             }
    //         }else if(files.length === 0){
    //             setValidationState({
    //                 ...validationState,
    //                 files: true
    //             })
    //             return false
    //         }
    //     }
    //     if(sourceLanguage === ""){
    //         setValidationState({
    //             ...validationState,
    //             srcLang: true
    //         })
    //         return false
    //     }
    //     if(targetLanguage.length == 0 && isEdit){
    //         setValidationState({
    //             ...validationState,
    //             tarLang: true
    //         })
    //         return false
    //     }
    //     return true
    // }

    // console.log(files)

    const isValidate = (operationValue) => {
        // if(projectName === "" && files.length === 0 && audioData.length === 0 && sourceLanguage == "" && (isEdit && targetLanguage.length == 0)){
        // console.log(isTranslationTaskAvailable);
        if (files.length === 0 && audioData.length === 0 && sourceLanguage == "" && (isEdit && (isTranslationTaskAvailable || tempWriterFile) && targetLanguage.length == 0)) {
            setValidationState({
                // projectName: true,
                files: speechTextSwitch === 1 ? true : false,
                srcLang: true,
                recording: speechTextSwitch === 2 ? true : false,
                tarLang: true,
            })
            // contentprojectNameRef.current.scrollIntoView()
            // contentprojectNameRef.current.focus();
            // setHasFocus(true);
            // return false
        }
        // if(projectName === ""){
        //     setValidationState({
        //         ...validationState,
        //         projectName: true
        //     })
        //     contentprojectNameRef.current.scrollIntoView()
        //     contentprojectNameRef.current.focus();
        //     setHasFocus(true);
        //     return false
        // }
        if (audioData.length === 0 && speechTextSwitch === 2) {
            setValidationState({
                ...validationState,
                recording: true
            })
            return false
        }
        if (files.length === 0 && speechTextSwitch === 1) {
            if (isEdit) {
                if (files.length === 0 && editFiles.length === 0) {
                    setValidationState({
                        ...validationState,
                        files: true
                    })
                    return false
                }
            } else if (files.length === 0) {
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
        if (((isTranslationTaskAvailable || tempWriterFile) && targetLanguage.length == 0) && isEdit) {
            setValidationState({
                ...validationState,
                tarLang: true
            })
            return false
        }
        return true
    }

    const createSpeechToTextProject = (key) => {
        // if(projectName === ""){
        //     return;
        // }
        let formdata = new FormData();
        setClickedOpenButton(key);
        formdata.append("source_language", sourceLanguage);
        // formdata.append("project_name", projectName);
        if (projectName !== null && projectName?.trim() !== "") {
            formdata.append("project_name", projectName);
        }
        formdata.append("project_type", "4"); // by default project type if 4 for voice project
        formdata.append("sub_category", "1"); // sub category is 1 for speech to text

        if(mtEnable) formdata.append("get_mt_by_page", translationByPage);

        formdata.append("isAdaptiveTranslation", adaptiveTransEnable);
        
        let deadlineUTC = Config.convertLocalToUTC(deadline);
        deadline && formdata.append("project_deadline", deadlineUTC);

        selectedSteps?.map((each) => {
            formdata.append("steps", each.value);
        })

        if (speechTextSwitch === 1) {
            for (let x = 0; x < files.length; x++) {
                if (typeof files[x] != "undefined") formdata.append("audio_file", files[x]);
            }
        }

        if (speechTextSwitch === 2) {
            for (let x = 0; x < audioData.length; x++) {
                // console.log(audioData[x]?.audioFile)
                if (typeof audioData[x]?.audioFile != "undefined") formdata.append("audio_file", audioData[x]?.audioFile);
            }
        }



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
                setClickedOpenButton(null);
                // console.log(response.data)
                // if(operationValue === 'translate'){
                Config.toast("Project created successfully");
                history(`/transcriptions?page=1&open-project=${response?.data?.id}`)
                // } 
                // operationValue === 'download' && downloadSourceAudioFile(response?.data?.id)
            },
        });
    }

    const updateSpeechToTextProject = (key) => {
        let formdata = new FormData();

        formdata.append("source_language", sourceLanguage);
        // formdata.append("project_name", projectName);
        if (projectName !== null && projectName?.trim() !== "") {
            formdata.append("project_name", projectName);
        }
        formdata.append("project_type", "4"); // by default project type if 4 for voice project
        formdata.append("sub_category", "1"); // sub category is 1 for speech to text

        let deadlineUTC = Config.convertLocalToUTC(deadline);
        deadline && formdata.append("project_deadline", deadlineUTC);

        formdata.append("team", hasTeam);
        formdata.append("mt_enable", mtEnable);
        
        formdata.append("isAdaptiveTranslation", adaptiveTransEnable);

        if (projectDataFromApi.current?.pre_translate !== preTranslate) {
            formdata.append("pre_translate", preTranslate);
        }

        if (projectDataFromApi.current?.get_mt_by_page !== translationByPage) {
            formdata.append("get_mt_by_page", translationByPage);
        }
        setClickedOpenButton(key);
        selectedSteps?.map((each) => {
            formdata.append("steps", each.value);
        })

        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formdata.append("target_languages", eachTargetLanguage?.id);
        });
        if (taskID !== null && !isTempWriterFileDeleted) {
            formdata.append("task_id", parseInt(taskID));
        }
        if (speechTextSwitch === 1) {
            for (let x = 0; x < files.length; x++) {
                if (typeof files[x] != "undefined") formdata.append("audio_file", files[x]);
            }
        }
        let list = "";
        targetLangListToRemove?.map((each, index) => {
            list += `${each.id}${index !== targetLangListToRemove.length - 1 ? "," : ""
                }`;
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
                setClickedOpenButton(null);
                // console.log(response.data)
                // if(operationValue === 'translate'){
                Config.toast(t("proj_updated_success"));
                // history(`/file-upload?page=1&order_by=-id&open-project=${response?.data?.id}`)
                if (prevPageInfo.current) {
                    history(`/transcriptions?page=${prevPageInfo.current?.pageNo != null ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy != null ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${prevPageInfo.current?.projectId != null ? prevPageInfo.current?.projectId : response.data.id}`)
                } else {
                    history(`/transcriptions?page=1&order_by=-id$&search=${response.data?.project_name}&open-project=${response.data?.id}`)
                }
                // } 
                // operationValue === 'download' && downloadSourceAudioFile(response?.data?.id)
            },
        });
    }

    // create/update button handler function
    const handleCreateUpdateBtn = () => {
        // console.log('click');
        console.log(isValidate());
        if (isValidate()) {
            // console.log('vlaidated');
            if (!isEdit) {
                // console.log('create');
                createSpeechToTextProject('key')
            } else {
                // console.log('update');
                updateSpeechToTextProject('key')
            }
        }
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
                history("/file-upload?page=1&order_by=-id");
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
    };

    const removeTempFile = (id) => {
        setEditFiles(editFiles.filter(each => each.id !== id))
        setIsTempWriterFileDeleted(true)
    }

    useEffect(() => {
        if (audioData.length !== 0) {
            setValidationState({ ...validationState, recording: false })
        }
    }, [audioData])


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

        if (files.length <= 0 || audioData.length <= 0 || nextLocation.pathname?.includes('/transcriptions')) {
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


    return (
        <React.Fragment>
            <div className="ai-working-area-glb-wrapper">
                <div className="file-trans-breadcrumbs-section">
                    <Breadcrumbs />
                    {/* <div className={"project-input-wrap " + (validationState.projectName && "error-focus")}> */}
                    <div className={"project-input-wrap "}>
                        <div
                            ref={contentprojectNameRef}
                            // onInput={projectName}
                            suppressContentEditableWarning={true}
                            contentEditable={URL_SEARCH_PARAMS.get('task') == null ?  "true" : "false"}
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
                            <div className="voice-work-area-wrapper">
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
                        (<div className="voice-work-area-wrapper">
                            {!isEdit ? (
                                <ul className="voice-tab-switch">
                                    <li onClick={() => setSpeechTextSwitch(1)} className={"voice-tab-item " + (speechTextSwitch === 1 ? "active" : "")}>
                                        <p>{t("upload_speech")}</p>
                                    </li>
                                    <li onClick={() => setSpeechTextSwitch(2)} className={"voice-tab-item " + (speechTextSwitch === 2 ? "active" : "")}>
                                        <p>{t("record_speech")}</p>
                                    </li>
                                </ul>
                            ) : (

                                <p className="upload-area-title" style={{ marginTop: '10px' }}>{t("upload_files")}</p>
                            )}
                            <div className={(files.length > 0 || editFiles?.length > 0) ? "fileloaded voice-work-area-content " : "voice-work-area-content"}>
                                {
                                    speechTextSwitch === 1 &&
                                    <>
                                        <UploadAudio
                                            DragandDrop={DragandDrop}
                                            handleDrop={handleDrop}
                                            handleChange={handleChange}
                                            files={files}
                                            removeFile={removeFile}
                                            niceBytes={niceBytes}
                                            editFiles={editFiles}
                                            deleteEditFile={deleteEditFile}
                                            removeTempFile={removeTempFile}
                                        />
                                        {validationState.files && <small style={{ color: 'red' }}>{t("required")}</small>}
                                    </>
                                }
                                {
                                    speechTextSwitch === 2 &&
                                    <>
                                        <RecordAudio
                                            isRecording={isRecording}
                                            toggleRecording={toggleRecording}
                                            audioPlayer={audioPlayer}
                                            blobURL={blobURL}
                                            setTime={setTime}
                                            play={play}
                                            setPlay={setPlay}
                                            playPause={playPause}
                                            displayTime={displayTime}
                                            timer={timer}
                                            setSliderPercentage={setSliderPercentage}
                                            sliderPercentage={sliderPercentage}
                                            handleSlider={handleSlider}
                                            getCurrentDuration={getCurrentDuration}
                                            setDuration={setDuration}
                                            secondsToHms={secondsToHms}
                                            duration={duration}
                                            currentTime={currentTime}
                                            setAudioData={setAudioData}
                                            audioData={audioData}
                                            niceBytes={niceBytes}
                                        />
                                        {validationState.recording && <small style={{ color: 'red' }}>{t("required")}</small>}
                                    </>
                                }
                            </div>
                            <div className="ts-action-cont-wrapper">
                                <div className="ts-sl-tl-wrapper">
                                    <div className="ts-sl-tl-cont files-space-align">
                                        <div className="form-fields">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlFile1">
                                                    {t("source_language")}<span className="asterik-symbol">*</span>
                                                </label>
                                                <div
                                                    className={
                                                        sourceLanguageDisable
                                                            ? "ai-lang-select disabled"
                                                            : "ai-lang-select"
                                                    }
                                                    onClick={
                                                        sourceLanguageDisable
                                                            ? () => { setshowSrcLangModal(false) }
                                                            : () => { setshowSrcLangModal(true) }
                                                    }
                                                    disabled={isEdit}
                                                >
                                                    {sourceLanguage == "" ? (
                                                        <span className="placeholder">{t("select_source_language")}</span>
                                                    ) : (
                                                        <span>{sourceLabel}</span>
                                                    )}
                                                    <i
                                                        style={{ color: "#8c8c8c" }}
                                                        className="fas fa-caret-down"
                                                    />
                                                </div>
                                                {validationState.srcLang && <small style={{ color: 'red' }}>{t("required")}</small>}
                                            </div>
                                        </div>
                                        <div className="form-fields">
                                            {(isTranslationTaskAvailable || tempWriterFile) && <div className="form-group">
                                                <label htmlFor="exampleFormControlFile1">
                                                    {t('target_languages')} <span className="asterik-symbol">*</span>
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
                                                        onClick={() => { setshowTarLangModal(true) }}
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
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AdvancedProjectType
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
                                isTranslationTaskAvailable={isTranslationTaskAvailable}
                                tempWriterFile={tempWriterFile}
                                translationByPage={translationByPage}
                                setTranslationByPage={setTranslationByPage}
                                projectDataFromApi={projectDataFromApi}
                                adaptiveTransEnable={adaptiveTransEnable}
                                setAdaptiveTransEnable={setAdaptiveTransEnable}
                            />
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
                                <div className="voice-work-area-button-row">
                                    {clickedOpenButton == 'key' ? (
                                        <button className="speech-to-text-UploadProjectButton" type="button">
                                            <span className="fileopen-new-btn">
                                                <ButtonLoader />
                                                {!isEdit ? t("creating") : t("updating")}
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="speech-to-text-UploadProjectButton"
                                            type="button"
                                            onMouseUp={(e) => { handleCreateUpdateBtn() }}
                                        >
                                            <span className="fileupload-new-btn">
                                                {!isEdit ? t("create_a_transcription_project") : t("update")}
                                                <ArrowForwardIcon
                                                    style={{
                                                        fontSize: 15,
                                                        color: "#FFFFFF",
                                                    }}
                                                />
                                            </span>
                                        </button>
                                    )}
                                    {URL_SEARCH_PARAMS.get('task') == null && editProjectId && (
                                        <div
                                            onClick={() => setShowDeleteConfirmationModal(true)}
                                            className="edit-delete-btn"
                                        >
                                            <ButtonBase>
                                                <div className="edit-delete-btn-cont">
                                                    <div className="delete-icon"></div>
                                                    {t("delete_project")}
                                                </div>
                                            </ButtonBase>
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>)}
                    {
                      URL_SEARCH_PARAMS.get('task') == null && speechTextSwitch === 1 &&
                        <div className="d-flex align-items-center justify-content-end mt-4">
                            <div className="content-two-info">
                                <span className="max-word-note">
                                    {t("maximum_files")}: <span>3</span>
                                </span>
                                <span className="max-file-note">
                                    {t("file_upload_condition_note_2")}: <span>100 MB</span>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <SimpleRodals
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
            {showTarLangModal && (<Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
                <div className="lang-modal-wrapper">
                    {/* <h1>Select Target Language(s)</h1> */}
                    <span className="modal-close-btn lang-close" onClick={(e) => { setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <TargetLanguage
                        targetLanguage={targetLanguage}
                        targetLanguageOptions={targetLanguageOptions}
                        handleTargetLangClick={handleTargetLangClick}
                        showTarLangModal={showTarLangModal}
                        setshowTarLangModal={setshowTarLangModal}
                        modaloption={modaloption}
                        filteredResults={filteredResults}
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap}
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                        alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                        alreadySelectedTarLang={alreadySelectedTarLang}
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

export default SpeechToText;