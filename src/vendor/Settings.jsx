import axios from "axios";
import React, { useState, useEffect, createRef, useRef } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Config from "./Config";
// import Navbar from "./Navbar";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import Select, { components } from 'react-select'
// import { motion } from "framer-motion";
// import Fileupload from "./Fileupload";
// import PropTypes from "prop-types";
// import { makeStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Zoom from '@mui/material/Zoom';
import DragandDrop from "./DragandDrop";
import ButtonBase from '@mui/material/ButtonBase';
// import ReplayIcon from '@mui/icons-material/Replay';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Checkbox from '@mui/material/Checkbox';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Cookies from "js-cookie";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import { useTranslation } from "react-i18next";

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SaveButtonLoader } from "../loader/CommonSaveBtnLoader";
import CloseBlack from "../assets/images/new-ui-icons/close_black.svg"
import FolderOpen from "../assets/images/new-ui-icons/folder_open.svg"
import ArrowRightAltColor from "../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import ArrowRightGrey from "../assets/images/arrow_right_grey.svg"
import FileDownloadBlue from "../assets/images/new-ui-icons/file_download_blue_new.svg"
import RefreshIcon from "../assets/images/refresh_icon.svg"
import UploadFileNewGrey from "../assets/images/new-ui-icons/upload_file_new_grey.svg"
import FolderIcon from "../assets/images/new-ui-icons/assets-folder-icon.svg"
import DownloadIcon from "../assets/images/new-ui-icons/file_download14x14.svg"
import DeleteBinIcon from "../assets/images/new-ui-icons/assets-delete-icon.svg"
import ConfirmIcon from "../assets/images/new-ui-icons/confirm-icon.svg"
import PlusIcon from "../assets/images/new-ui-icons/plus-new.svg"
import WordchoiceIcon from "../assets/images/choicelist.svg"


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 39,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#0078D4' : '#0078D4',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#0078D4',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 20,
        height: 20,
        boxShadow: "0px 2px 3px #00000029",
    },
    '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E6E8EB' : '#E6E8EB',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Settings = (props) => {

    let {isNewsProject} = props

    const history = useNavigate();
    const { t } = useTranslation();
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)

    // const classes = selectStyles();
    // const modalClasses = selectModalStyles();
    const [checked, setChecked] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [qaSubdomain, setQaSubdomain] = useState(false);
    const [tbxFileConvertShow, setTbxFileConvertShow] = useState(false);
    const [settingsSaveModalShow, setSettingsSaveModalShow] = useState(false);
    const [subQatab, setSubQatab] = useState();
    const [showTmSection, setShowTmSection] = useState(true);
    const [showToolbarSection, setShowToolbarSection] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const [activeInnerTab, setActiveInnerTab] = useState("1");
    const [activeInnerTab2, setActiveInnerTab2] = useState("1");
    const [matchThreshold, setMatchThreshold] = useState(85);
    const [stepValue, setStepValue] = useState(5);
    const [projectId, setProjectId] = useState(null);
    const [referenceFiles, setReferenceFiles] = useState([]);
    const [tmxFiles, setTmxFiles] = useState([]);
    const [tbxFiles, setTbxFiles] = useState([]);
    const [qaFiles, setQaFiles] = useState([]);
    const [glossaryList, setGlossaryList] = useState([]);
    const [glossarySelectedList, setGlossarySelectedList] = useState([])
    const [jobsOnlyOptions, setJobsOnlyOptions] = useState([])
    const [jobsOptions, setJobsOptions] = useState([]);
    const [uploadedTbxFile, setUploadedTbxFile] = useState(null);
    const [selectedTbxJob, setSelectedTbxJob] = useState("");
    const [selectedTbxConvertJob, setSelectedTbxConvertJob] = useState("");
    const [uploadedTbxConvertFileName, setUploadedTbxConvertFileName] = useState("");
    const [uploadedTbxConvertFile, setUploadedTbxConvertFile] = useState(null);
    const [projectType, setProjectType] = useState(null);
    const [files, setFiles] = useState([]);
    const [untranslatableFiles, setUntranslatableFiles] = useState([]);
    const [forbiddenWordsFiles, setForbiddenWordsFiles] = useState([]);
    const [error, setError] = useState("")
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)
    const [checkedGlossary, setCheckedGlossary] = useState([])
    const [thresholdValueFromAPI, setThresholdValueFromAPI] = useState(null)
    const [isTMXSettingsChnaged, setIsTMXSettingsChanged] = useState(false)
    const [isTMXFilesChanged, setIsTMXFilesChanged] = useState(false)
    const [isGlossaryChanged, setIsGlossaryChanged] = useState(false)
    const [isQaChanged, setIsQaChanged] = useState(false)
    const [showInvalidFileModal, setShowInvalidFileModal] = useState(false)
    const [qaInvalidFiles, setQaInvalidFiles] = useState(null)
    const [tmxFilesFromAPI, setTmxFilesFromAPI] = useState(null)
    const [isQAFileDeleted, setIsQAFileDeleted] = useState(false)
    const [tmxTempFiles, setTmxTempFiles] = useState([])
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [isConvertingButton, setIsConvertingButton] = useState(false)
    const [isGlossaryListLoading, setisGlossaryListLoading] = useState(false)
    const [isWordchoiceListLoading, setIsWordchoiceListLoading] = useState(false)

    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const glossaryToRemove = useRef(null)
    const jobsOptionsRef = useRef([])
    
    const glossaryListRef = useRef([])
    const wordChoiceListRef = useRef([])
    const glossarySelectedListRef = useRef([])
    const wordChoiceSelectedListRef = useRef([])
    const activeTabRef = useRef(1)

    const modaloption = {
        closeMaskOnClick: false
    };

    const settingsSaveModaloption = {
        closeMaskOnClick: false
    };

    useEffect(() => {
        /* Setting the TM show/hide cookie */
        if (localStorage.getItem("showTmSection") != null) {
            setShowTmSection(localStorage.getItem("showTmSection") == "true")
        }

        /* Setting the toolbar show/hide cookie */
        if (localStorage.getItem("showToolbarSection") != null) {
            setShowToolbarSection(localStorage.getItem("showToolbarSection") == "true")
        }
    }, [])

    useEffect(() => {
        if (projectId !== props.projectId) {
            setProjectId(props.projectId)
            props.setshowSettings(props.showSettings)
        }
    }, [props.projectId])

    useEffect(() => {
        if (projectId != null && props.showSettings) {
            loadAllValues();
        }
    }, [projectId])


    useEffect(() => {
        if(isNewsProject){
            setActiveTab("3")
            activeTabRef.current = "3"
        }
    }, [isNewsProject])
    
    useEffect(() => {
        if(activeTab === "3"){
            glossaryToRemove.current = null;
            setGlossaryList(glossaryListRef.current);
            setGlossarySelectedList(glossarySelectedListRef.current);
            setCheckedGlossary(prevState => []);
            setIsGlossaryChanged(false);
             }else if(activeTab === "6"){
            glossaryToRemove.current = null;
            setGlossaryList(wordChoiceListRef.current);
            setGlossarySelectedList(wordChoiceSelectedListRef.current);
            setIsGlossaryChanged(false);
            setCheckedGlossary(prevState => []);
        }
    }, [activeTab]);
    
    // store the glossary which are removed
    useEffect(() => {
        let list = glossarySelectedList?.filter(o1 => !checkedGlossary.some(o2 => o1.glossary == o2));
        glossaryToRemove.current = list
        if (glossaryToRemove.current?.length !== 0 || checkedGlossary?.filter(item => !glossarySelectedList?.some(each => each.glossary == item))?.length !== 0) {
            setIsGlossaryChanged(true);
        } else {
            setIsGlossaryChanged(false);
        }
    }, [checkedGlossary]);


    // check the already added glossaries
    useEffect(() => {
        if (glossaryList?.length !== 0 && glossarySelectedList?.length !== 0) {
            let a = glossaryList.filter(item => glossarySelectedList.some(each => item.glossary_id == each.glossary))
            let list = []
            a?.map(each => {
                list.push(each.glossary_id);
            })
            setCheckedGlossary(list);
        }
    }, [glossarySelectedList, glossaryList]);

    
    const handleGlossaryCheckbox = (e, glossaryId) => {
        if(checkedGlossary?.includes(glossaryId)){
            let newCheckedTerms = checkedGlossary?.filter(id => id !== glossaryId)
            glossaryToRemove.current = glossaryId
            setCheckedGlossary(newCheckedTerms);
        }else{
            setCheckedGlossary(oldArray => [...oldArray, glossaryId]);
        }
    }

    /* Get all the store previous values and load*/
    const loadAllValues = () => {
        if(!isNewsProject){
            setChecked(false);
            setShowTmSection(true);
            setShowToolbarSection(true);
            setMatchThreshold(85);
            setStepValue(5);
            setReferenceFiles([]);
            setTmxFiles([]);
            setTbxFiles([]);
            setGlossaryList([]);
            setGlossarySelectedList([]);
            // setJobsOptions([]);
            setJobsOnlyOptions([]);
            setUploadedTbxFile(null);
            setSelectedTbxJob("");
            setSelectedTbxConvertJob("");
            setUploadedTbxConvertFile(null);
            setUploadedTbxConvertFileName("");
            getJobsByProjectId();
            getTmxFiles();
            getGlossaryList();
            // getWordchoiceList();
            getTbxFiles();
            getThresholdValues();
            getReferenceFiles();
            getUntranslatableFiles();
            getForbiddenFiles();
            }else{
            setGlossaryList([]);
            setGlossarySelectedList([]);
            getGlossaryList();
            // getSelectedGlossaries();
        }
    };

    /* Switch the active tab */
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
            activeTabRef.current = tab
        }
    };

    /* Switch the active inner tabs */
    const toggleInner = (tab) => {
        if (subQatab !== tab) {
            setSubQatab(tab)
        }
    };

    /* Switch the active inner tabs */
    const toggleInner2 = (tab) => {
        if (activeInnerTab2 !== tab) {
            setActiveInnerTab2(tab)
        }
    };


    /* Handling the threshold slider and update it  */
    const handleSliderChange = (event, value) => {
        setMatchThreshold(value)
        if (thresholdValueFromAPI.threshold != value) {
            setIsTMXSettingsChanged(true)
        } else {
            setIsTMXSettingsChanged(false)
        }
    };

    /* Handling maximum TM value and set it */
    const handleStepSliderChange = (event, value) => {
        setStepValue(value)
        if (thresholdValueFromAPI.step != value) {
            setIsTMXSettingsChanged(true)
        } else {
            setIsTMXSettingsChanged(false)
        }
    };

    /* Handling the values inserted via inputs */
    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "stepValue": {
                // TM maximum
                if (e.target.value >= 0 && e.target.value <= 10) {
                    setStepValue(e.target.value)
                    if (thresholdValueFromAPI.step != e.target.value) {
                        setIsTMXSettingsChanged(true)
                    } else {
                        setIsTMXSettingsChanged(false)
                    }
                }
                break;
            }
            case "matchThreshold": {
                // TM match threshold
                if (e.target.value >= 0 && e.target.value <= 100) {
                    setMatchThreshold(e.target.value)
                    if (thresholdValueFromAPI.threshold != e.target.value) {
                        setIsTMXSettingsChanged(true)
                    } else {
                        setIsTMXSettingsChanged(false)
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    /* Get previously stored TM max and match threshold values */
    const getThresholdValues = () => {
        if (projectType !== 3 && projectType !== 4 && projectType !== 5) {
            Config.axios({
                url: Config.BASE_URL + "/workspace/tm/configs/" + projectId,
                method: "PUT",
                auth: true,
                success: (response) => {
                    setThresholdValueFromAPI({
                        threshold: response.data?.threshold != null ? response.data.threshold : 85,
                        step: response.data?.max_hits != null ? response.data.max_hits : 5
                    })
                    setMatchThreshold(response.data?.threshold != null ? response.data.threshold : 85)
                    setStepValue(response.data?.max_hits != null ? response.data.max_hits : 5)
                },
            });
            return;
        }
    };

    /* Update the TM max and match threshold values  */
    const updateThresholdValues = () => {
        if (projectType !== 3 && projectType !== 4 && projectType !== 5) {
            let formData = new FormData();
            formData.append("threshold", matchThreshold);
            formData.append("max_hits", stepValue);
            Config.axios({
                url: Config.BASE_URL + "/workspace/tm/configs/" + projectId,
                method: "PUT",
                auth: true,
                data: formData,
                success: (response) => {
                    setIsTMXSettingsChanged(false)
                    if (response.status === 201) Config.toast(t("changes_saved"))
                    setIsLoadingButton(false)
                }
            });
            return;
        }
    };

    /* Reset to default TM max and match threshold values */
    const resetThreshold = () => {
        let formData = new FormData();
        formData.append("threshold", 85);
        formData.append("max_hits", 5);
        Config.axios({
            url: Config.BASE_URL + "/workspace/tm/configs/" + projectId,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                setMatchThreshold(response.data.threshold)
                setStepValue(response.data.max_hits)
                Config.toast(t("changes_saved"))
            },
        });
    };

    /* Handling the blur effect of the slider */
    const handleBlurStepValue = (event) => {
        if (event.target.value < 0) {
            setStepValue(0);
        } else if (event.target.value > 100) {
            setStepValue(100);
        }
    };

    /* Handling the blur effect of the slider */
    const handleBlurMatchThershold = (event) => {
        if (event.target.value < 0) {
            setMatchThreshold(0);
        } else if (event.target.value > 100) {
            setMatchThreshold(100);
        }
    };

    /* Get and set the previously stored TMX files  */
    const getTmxFiles = (param) => {
        setLoading(true)
        Config.axios({
            url: `${Config.BASE_URL}/tm/tmx_list_create?project=${projectId}`,
            auth: true,
            success: (response) => {
                setTmxTempFiles(response.data)
                setLoading(false)
            },
        });
    };

    const handleTMXFileChange = (e) => {
        for (let i = 0; i < (e.target.files).length; i++) {
            if (e.target.files[i].name.length >= 201) {
                Config.toast(t("filename_value_too_long_char_varying"), "warning");
                return
            }
        }
        let thisFiles = e.target.files;
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        let fileList = []
        if (ext !== ".tmx") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }
        var myArray = [];
        var file = {};

        fileList = [...tmxTempFiles];

        Object.keys(thisFiles).map((eachKey) => {
            if (thisFiles[eachKey].size / 1024 / 1024 <= 100)
                fileList.push({ file: thisFiles[eachKey], name, job: jobsOptionsRef.current?.length !== 0 && jobsOptionsRef.current[1]?.value });
            else Config.toast(t("file_size_exceeds"), "error");
        });

        setTmxTempFiles(fileList)
    }

    const removeTMXFile = (e, index) => {
        let filesTemp = tmxTempFiles;

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

        setTmxTempFiles(finalFiles)
    }

    const uploadTMXFiles = () => {
        let uniqueList = getUniqueListBy(tmxTempFiles, 'job')
        let counter = 0
        uniqueList?.map((eachJob, index) => {
            counter++
            if (eachJob?.id === undefined || eachJob?.id === null) {
                let formData = new FormData();
                tmxTempFiles?.map(eachFile => {
                    if (eachJob?.id === undefined && eachJob.job === eachFile.job && eachFile?.file !== undefined) {
                        formData.append("tmx_file", eachFile.file);
                    }
                })

                if (eachJob.job !== 0) {
                    formData.append("job_id", eachJob.job);
                    formData.append("project_id", projectId);
                } else {
                    Config.toast(t("select_job_for_file"), 'warning')
                }

                Config.axios({
                    url: Config.BASE_URL + "/tm/tmx_list_create/",
                    method: "POST",
                    auth: true,
                    data: formData,
                    success: (response) => {
                        if (response.status == 201) {
                            if (counter === uniqueList?.length) {
                                counter++
                                Config.toast(t("successfully_uploaded"));
                                setIsLoadingButton(false)

                            }
                            setTimeout(() => {
                                getTmxFiles()
                            }, 100);
                        }
                    },
                });
            }
        })
    }

    const handleTMXJobChange = (selectedValue, ind, target) => {
        let selectedFileRow = tmxTempFiles?.map((obj, index) => {
            if (index === ind) {
                return { ...obj, ['job']: selectedValue };
            }
            return obj;
        });
        setTmxTempFiles(selectedFileRow)
    }

    const updateJobForTMXFiles = (jobId, objId) => {
        let formData = new FormData();
        formData.append("job_id", jobId !== 0 ? jobId : '');
        Config.axios({
            url: `${Config.BASE_URL}/tm/tmx_list_create/${objId}/`,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                Config.toast(t("changes_saved"));
                let selectedFileRow = tmxTempFiles?.map((obj, index) => {
                    if (obj?.id === objId) {
                        return { ...obj, job: jobId };
                    }
                    return obj;
                })
                setTmxTempFiles(selectedFileRow)
                setIsTMXFilesChanged(true)
                // setIsQaChanged(true)
            },
        });
    }

    const deleteTmxFile = (objId, index) => {
        Config.axios({
            url: `${Config.BASE_URL}/tm/tmx_list_create/${objId}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                Config.toast(t("deleted_success"))
                removeTMXFile(null, index)
                setIsTMXFilesChanged(true)
            },
        });
    };

    const downloadTMXFile = async (e, objId) => {
        let url = `${Config.BASE_URL}/tm/download_tmx/${objId}/`
        const response = await downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    }


    const getFilteredGlossaryList = () => {
        let result = [];
        let tempList = glossaryList;
        let a = tempList?.filter((value) => glossarySelectedList?.map((selected) => (parseInt(value?.glossary_id) != selected?.glossary ? result.push(value) : null)));
        // let b = this.state.glossaryList?.filter((each) => this.state.glossarySelectedList);
    };

    const getGlossaryList = () => {

        setisGlossaryListLoading(true)
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossaries/${projectId}/?option=glossary`,
            auth: true,
            success: (response) => {
                setGlossaryList(response.data)
                // if(activeTabRef.current === "3"){
                // }
                glossaryListRef.current = response.data
                setisGlossaryListLoading(false)
                getSelectedGlossaries()
            },
            error: (err) => {
                setisGlossaryListLoading(false)
            }
        });
        getFilteredGlossaryList();
    };

    const getWordchoiceList = () => {
        setIsWordchoiceListLoading(true)
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossaries/${projectId}/?option=word_choices`,
            auth: true,
            success: (response) => {
                setGlossaryList(response.data)
                if(activeTabRef.current === "6"){
                }
                wordChoiceListRef.current = response.data
                setIsWordchoiceListLoading(false)
                // getSelectedWordChoice()
            },
            error: (err) => {
                setIsWordchoiceListLoading(false)
            }
        });
        getFilteredGlossaryList();
    };

    const getSelectedGlossaries = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${projectId}&option=glossary`,
            auth: true,
            success: (response) => {
                glossarySelectedListRef.current = response.data
                if(activeTabRef.current === "3"){
                    setGlossarySelectedList(response.data)
                }
                setIsLoadingButton(false)
            },
        });
    };

    const getSelectedWordChoice = () => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?project=${projectId}&option=word_choices`,
            auth: true,
            success: (response) => {
                wordChoiceSelectedListRef.current = response.data
                if(activeTabRef.current === "6"){
                    setGlossarySelectedList(response.data)
                }
                setIsLoadingButton(false)
            },
        });
    };


    // add glossary
    const addGlossaryToProject = () => {
        let formData = new FormData();
        formData.append("project", projectId);
        if (glossarySelectedList?.length == 0) {
            checkedGlossary?.map(each => {
                formData.append("glossary", each);
            })
        } else {
            let listToUpdate = checkedGlossary?.filter(item => !glossarySelectedList?.some(each => each.glossary == item));
            listToUpdate?.map(each => {
                formData.append("glossary", each);
            });
        }

        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/`,
            auth: true,
            method: "POST",
            data: formData,
            success: (response) => {
                if(response?.status === 201) {
                    if(activeTab === "3") getSelectedGlossaries();
                    else if(activeTab === "6") getSelectedWordChoice();
                }
                Config.toast(t("added_success"));
            },
            error: (err) => {
                setIsLoadingButton(false);
            }
        });
    };

    // remove glossary
    const removeGlossaryFromProject = (glossaryId) => {
        let list = "";
        glossaryToRemove.current?.map((each, index) => {
            list += `${each.id}${index !== glossaryToRemove.current?.length - 1 ? "," : ""}`;
        });

        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?to_remove_ids=${list}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                Config.toast(t("removed_success"));
                glossaryToRemove.current = null;
                setIsGlossaryChanged(false);
                setIsLoadingButton(false);
                if(response?.status === 204) {
                    if(activeTab === "3") getSelectedGlossaries();
                    else if(activeTab === "6") getSelectedWordChoice();
                }
            },
            error: (err) => {
                setIsLoadingButton(false);
            }
        });
    };
    
    /* Upload new TMX files */
    // const tmxFileUpload = (fileInput, e) => {
    //     let validExtensions = ["tmx"];
    //     let file;
    //     if (fileInput) {
    //         file = fileInput[0];
    //     } else {
    //         file = e.target?.files[0];
    //     }
    //     let fileName = file?.name;
    //     let extension = fileName?.substring(fileName.lastIndexOf(".") + 1);
    //     if (validExtensions.indexOf(extension) > -1) {
    //         // Check for valid file type i,e .tmx
    //         let formData = new FormData();
    //         formData.append("project", projectId);
    //         formData.append("tmx_files", file);

    //         Config.axios({
    //             url: Config.BASE_URL + "/workspace/tmx_file/",
    //             method: "POST",
    //             auth: true,
    //             data: formData,
    //             success: (response) => {
    //                 Config.toast("Successfully uploaded");
    //                 getTmxFiles();
    //             },
    //         });
    //     } 
    // };

    /* Upload tbx files */
    const tbxFileInput = (e) => {
        let validExtensions = ["tbx"];
        let file = e.target.files[0];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (validExtensions.indexOf(extension) > -1) {
            //Check for file type i,e .tbx
            setUploadedTbxFile(file);
        } else Config.toast(t("upload_tbx_file"), "error");
    };

    /* Get and set previously uploaded tbx files */
    const getTbxFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/tbx_list_create/${projectId}`,
            auth: true,
            success: (response) => {
                setTbxFiles(response.data);
            },
        });
    };

    useEffect(() => {
        tbxJobOptionChange(jobsOptions[0]?.value);
    }, [jobsOptions, jobsOnlyOptions]);

    /* Get all the jobs by project id */
    const getJobsByProjectId = () => {
        // For Jobs Dropdown
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            auth: true,
            success: (response) => {
                let jobsOptionsTemp = [];
                let jobsOnlyOptionsTemp = [];
                setProjectType(response.data.project_type_id)
                jobsOptionsTemp.push({ value: 0, label: "All Jobs" });
                response.data.jobs.map((job) => {
                    if (!job.source_target_pair_names.includes('None')) {
                        jobsOptionsTemp.push({ value: job.id, label: job.source_target_pair_names });
                        jobsOnlyOptionsTemp.push({ value: job.id, label: job.source_target_pair_names });
                    }
                });
                /* Set for dropdown options */
                jobsOptionsRef.current = jobsOptionsTemp
                setJobsOptions(jobsOptionsTemp)
                setJobsOnlyOptions(jobsOnlyOptionsTemp)
            },
        });
    };

    /* Set the selected job when job changes */
    const tbxJobOptionChange = (selectedOption) => {
        setSelectedTbxJob(selectedOption)
    };

    /* Set the selected job when job changes */
    const tbxJobConvertChange = (selectedOption) => {
        setSelectedTbxConvertJob(selectedOption)
    };

    useEffect(() => {
        if (uploadedTbxFile !== null) {
            tbxFileUpload()
        }
    }, [uploadedTbxFile])


    /* Upload tmx and tbx files */
    const tbxFileUpload = () => {
        if (uploadedTbxFile == null) {
            Config.toast(t("upload_tbx_file"), "error");
            return;
        }
        if (selectedTbxJob === "") {
            Config.toast(t("select_job_to_apply"), "error");
            return;
        }

        let formData = new FormData();
        formData.append("tbx_file", uploadedTbxFile);
        if (selectedTbxJob != 0) formData.append("job_id", selectedTbxJob);
        else formData.append("job_id", "");
        let token = Config.userState.token;

        
        let url = `${Config.BASE_URL}/workspace/tbx_list_create/${projectId}`;
        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                Config.toast(t("successfully_uploaded"));
                setUploadedTbxFile(null)
                getTbxFiles();
                setError("")
            },
            error: (err) => {
                Config.toast(t("something_went_wrong"), "error");
            }
        })
    };

    /* Update the tbx job */
    const updateTbxJob = (selectedOption, jobId) => {
        let formData = new FormData();
        if (selectedOption != 0) formData.append("job_id", selectedOption);
        else formData.append("job_id", "");
        let token = Config.userState.token;
        const headers = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        let url = `${Config.BASE_URL}/workspace/tbx_detail/${jobId}`;
        Config.axios({
            url: url,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                getTbxFiles();
                setError("")
            },
            error: (err) => {
                Config.toast(t("something_went_wrong"), "error");
            }
        })
    };

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
                /* 
                */
                headers: {
                    "Access-Control-Expose-Headers": "Content-Disposition",
                    Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                },
            }
        );
    };

    /* Download previously uploaded tbx file */
    const downloadTbxFile = async (fileId) => {
        let url = `${Config.BASE_URL}/workspace/tbx_download/${fileId}`
        const response = await downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    };

    /* Delete a tbx file */
    const deleteTbxFile = (fileId, isConfirmed = false) => {
        // if (isConfirmed)
        //Confirmed by the user
        Config.axios({
            url: `${Config.BASE_URL}/workspace/tbx_detail/${fileId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("deleted_success"));
                getTbxFiles();
            },
        });
        // else Config.confirm(deleteTbxFile, [fileId, true], "Delete file permanently?", ["Delete", "Cancel"]); //Ask confirmation
    };

    /* Download source template file */
    const downloadTemplate = () => {
        fetch(`${Config.BASE_URL}/workspace/tbx_template_download`, {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                Authorization: `Bearer ${Config.userState.token}`,
                "Access-Control-Expose-Headers": "Content-Disposition",
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `glossary_template_standard.xlsx`);
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link?.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

    /* Uplode xlsx convert file */
    const tbxConvertFileInput = (e) => {
        let validExtensions = ["xlsx"];
        let file = e.target.files[0];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (validExtensions.indexOf(extension) > -1) {
            // Check for file type
            setUploadedTbxConvertFile(file)
            if (!tbxFileConvertShow) {
                setTbxFileConvertShow(true)
            }
            setUploadedTbxConvertFileName(fileName)
        } else Config.toast(t('upload_xlsx_file'), "error");
    };


    /* Upload xlsx file to convert as tbx */
    const tbxConvertFileUpload = () => {
        if (uploadedTbxConvertFile == null) {
            Config.toast(t('upload_xlsx_file'), "error");
            return;
        }
        if (selectedTbxConvertJob === "") {
            Config.toast(t("select_job_to_apply"), "error");
            return;
        }
        setIsConvertingButton(true)

        let formData = new FormData();
        formData.append("tbx_template_file", uploadedTbxConvertFile);
        formData.append("job_id", selectedTbxConvertJob);
        let token = Config.userState.token;
        
        let url = `${Config.BASE_URL}/workspace/tbx_template_upload/${projectId}`;
        
        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                Config.toast(t("successfully_uploaded"));
                getTbxFiles();
                // setSelectedTbxJob("")
                setSelectedTbxConvertJob("")
                setUploadedTbxConvertFile("")
                setUploadedTbxConvertFileName("")
                setTbxFileConvertShow(false)
                setIsConvertingButton(false)
                setError("")
            },
            error: (err) => {
                Config.toast(error.response.data.msg, "error");
                setIsConvertingButton(false)
            }
        })
    };


    /* Upload the file for untranslatable */
    const unTranslatableFileUpload = (e) => {
        let validExtensions = ["txt"];
        let file = e.target.files[0];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (validExtensions.indexOf(extension) > -1) {
            // Check for .txt file type
            let formData = new FormData();
            formData.append("doc_id", localStorage.getItem("documentId"));
            formData.append("file", file);
            let token = Config.userState.token;
            const headers = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            let url = "http://167.71.235.214:8010/untranslatable_upload/";
            
            Config.axios({
                url: url,
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    Config.toast(t("successfully_uploaded"));
                    setError("")
                },
                error: (err) => {
                    Config.toast(t("something_went_wrong"), "error");
                }
            })
        } else {
            Config.toast(t("supported_formats") + ": " + validExtensions.join(""), "error");
        }
    };

    /* Forbidden words file upload */
    const forbiddenFileUpload = (e) => {
        let validExtensions = ["txt"];
        let file = e.target.files[0];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (validExtensions.indexOf(extension) > -1) {
            // Check for .txt file type
            let formData = new FormData();
            formData.append("doc_id", localStorage.getItem("documentId"));
            formData.append("file", file);
            let token = Config.userState.token;
            const headers = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            let url = "http://167.71.235.214:8010/forbidden_upload/";
            axios
                .post(url, formData, headers)
                .then((response) => {
                    Config.toast(t("successfully_uploaded"));
                })
                .catch((error) => {
                    Config.toast(t("something_went_wrong"), "error");
                })
                .finally(setError(""));
        } else {
            Config.toast(t("supported_formats") + ": " + validExtensions.join(""), "error");
        }
    };

    /* Letter case file upload */
    const lettercaseFileUpload = (e) => {
        let validExtensions = ["txt"];
        let file = e.target.files[0];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        if (validExtensions.indexOf(extension) > -1) {
            // Check for .txt file type
            let formData = new FormData();
            formData.append("doc_id", localStorage.getItem("documentId"));
            formData.append("file", file);
            let token = Config.userState.token;
            const headers = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            let url = "http://167.71.235.214:8010/lettercase_upload/";
            axios
                .post(url, formData, headers)
                .then((response) => {
                    Config.toast(t("successfully_uploaded"));
                })
                .catch((error) => {
                    Config.toast(t("something_went_wrong"), "error");
                })
                .finally(setError(""));
        } else {
            Config.toast(t("supported_formats") + ": " + validExtensions.join(""), "error");
        }
    };

    /* Get reference files */
    const getReferenceFiles = (e) => {
        Config.axios({
            url: Config.BASE_URL + "/workspace/project/reference/files/?project=" + projectId,
            auth: true,
            success: (response) => {
                setReferenceFiles(response.data)
            },
        });
    };



    /* Upload files for reference files */
    const referenceFilesUpload = (e) => {
        let formData = new FormData();
        formData.append("project", projectId);
        let files = e.target.files;
        Object.keys(files).map((eachKey) => {
            formData.append("ref_files", files[eachKey]);
        });
        Config.axios({
            url: Config.BASE_URL + "/workspace/project/reference/files/",
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                let fileString = response.data.length > 1 ? t("files_sm") : t("file_sm");
                Config.toast(`${t("reference")} ${fileString} ${t("upload_success_sm")}`);
                getReferenceFiles();
            },
        });
    };

    /* Delete the uploaded reference files */
    const deleteReferenceFile = (e, isConfirmed = false) => {
        if (isConfirmed) {
            let id = e.target.getAttribute("data-id");
            Config.axios({
                url: Config.BASE_URL + "/workspace/project/reference/files/" + id,
                method: "DELETE",
                auth: true,
                success: (response) => {
                    Config.toast("Selected File deleted Successfully");
                    getReferenceFiles();
                },
            });
        } else Config.confirm(deleteReferenceFile, [e, true], "Delete file permanently?", ["Delete", "Cancel"]);
    };

    const handleChange = (e, target) => {
        for (let i = 0; i < (e.target.files).length; i++) {
            if (e.target.files[i].name.length >= 201) {
                Config.toast(t("filename_value_too_long_char_varying"), "warning");
                return
            }
        }
        let thisFiles = e.target.files;
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        let fileList = []
        if (ext !== ".txt") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }
        var myArray = [];
        var file = {};

        if (target === 'untranslatable') {
            fileList = [...untranslatableFiles];
        } else if (target === 'forbidden') {
            fileList = [...forbiddenWordsFiles];
        } else if (target === 'tmx') {
            fileList = [...tmxTempFiles];
        } else {
            fileList = [...tbxFiles];
        }

        Object.keys(thisFiles).map((eachKey) => {
            if (thisFiles[eachKey].size / 1024 / 1024 <= 100)
                fileList.push({ file: thisFiles[eachKey], name, job: 0 });
            else Config.toast(t("file_size_exceeds"), "error");
        });

        if (target === 'untranslatable') {
            setUntranslatableFiles(fileList)
        } else if (target === 'forbidden') {
            setForbiddenWordsFiles(fileList)
        } else if (target === 'tmx') {
            setTmxTempFiles(fileList)
        } else {
            setTbxFiles(fileList)
        }
    }

    /* Removed untraslatable files */
    const removeFile = (e, index, target) => {

        let filesTemp = target === 'untranslatable' ? untranslatableFiles : forbiddenWordsFiles;

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
        if (target === 'untranslatable') {
            setUntranslatableFiles(finalFiles)
        } else {
            setForbiddenWordsFiles(finalFiles)
        }
    };

    const deleteFile = (objId, target) => {
        Config.axios({
            url: target === 'untranslatable' ? `${Config.BASE_URL}/qa/untranslatable_file/${objId}` : `${Config.BASE_URL}/qa/forbidden_file/${objId}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                if (target === 'untranslatable') getUntranslatableFiles()
                else getForbiddenFiles()
                Config.toast(t("deleted_success"))
                setIsQaChanged(true)
            },
        });
    }

    const handleQAJobChange = (selectedValue, ind, target) => {
        if (target === 'untranslatable') {
            let selectedFileRow = untranslatableFiles?.map((obj, index) => {
                if (index === ind) {
                    return { ...obj, ['job']: selectedValue };
                }
                return obj;
            })
            setUntranslatableFiles(selectedFileRow)
        } else {
            let selectedFileRow = forbiddenWordsFiles?.map((obj, index) => {
                if (index === ind) {
                    return { ...obj, ['job']: selectedValue };
                }
                return obj;
            })
            setForbiddenWordsFiles(selectedFileRow)
        }
    }

    const handleSettingsSaveBtn = () => {
        setIsLoadingButton(true)

        if (activeTab == 1) {
            if (isTMXSettingsChnaged) {
                updateThresholdValues()
            } if (tmxTempFiles?.filter(each => each?.id === undefined)?.length !== 0) {
                uploadTMXFiles()
            }
            if (isTMXFilesChanged) {
                props.hideSettingsModal(false)
                setIsLoadingButton(false)

            }
        }
        if (activeTab == 2) {
            props.hideSettingsModal(false)
            setIsLoadingButton(false)

        }
        if (glossaryToRemove.current?.length !== 0) {
            removeGlossaryFromProject()
        }
        if (checkedGlossary?.filter(item => !glossarySelectedList?.some(each => each.glossary == item))?.length !== 0) {
            addGlossaryToProject()
        }

        if (activeTab == 5 && subQatab == 1) {
            if (isQaChanged) {
                props.hideSettingsModal(false)
                setIsLoadingButton(false)

            } else if (untranslatableFiles?.filter(each => each?.id === undefined)?.length !== 0) {
                uploadUntranlatableFiles()
            }
        }
        if (activeTab == 5 && subQatab == 2) {
            if (isQaChanged) {
                props.hideSettingsModal(false)
                setIsLoadingButton(false)

            } else if (forbiddenWordsFiles?.filter(each => each?.id === undefined)?.length !== 0) {
                uploadForbiddenFiles()
            }
        }
    }


    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const qaFileDownloadFunction = (objID, target) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            target === 'untranslatable' ?
                `${Config.BASE_URL}/qa/download_untranslatable_file/${objID}/`
                : `${Config.BASE_URL}/qa/download_forbidden_file/${objID}/`,
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

    const uploadUntranlatableFiles = () => {
        let uniqueList = getUniqueListBy(untranslatableFiles, 'job')
        let counter = 0
        uniqueList?.map((eachJob, index) => {
            counter++
            if (eachJob?.id === undefined || eachJob?.id === null) {
                let formData = new FormData();
                untranslatableFiles?.map(eachFile => {
                    if (eachJob?.id === undefined && eachJob.job === eachFile.job) {
                        formData.append("untranslatable_files", eachFile.file);
                    }
                })

                if (eachJob.job !== 0) {      // 0 is if all-job option is selected
                    formData.append("job", eachJob.job);
                } else {
                    formData.append("project", projectId);
                }

                Config.axios({
                    url: Config.BASE_URL + "/qa/untranslatable_file/",
                    method: "POST",
                    auth: true,
                    data: formData,
                    success: (response) => {
                        if (response.data?.Invalid !== null) {
                            setShowInvalidFileModal(true)
                            setQaInvalidFiles(response.data?.Invalid)
                             setIsLoadingButton(false)

                        } else {
                            if (counter === uniqueList?.length) {
                                Config.toast(t("successfully_uploaded"));
                                setIsLoadingButton(false)

                            }
                        }
                        setTimeout(() => {
                            getUntranslatableFiles()
                        }, 100);
                    },
                });
            }
        })
    }

    const getUntranslatableFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/qa/untranslatable_file/?project=${projectId}`,
            auth: true,
            success: (response) => {
                // setUploadedUntranslatableFile(response.data)
                setUntranslatableFiles(response.data)
            },
        });
    }

    const getForbiddenFiles = () => {
        Config.axios({
            url: `${Config.BASE_URL}/qa/forbidden_file/?project=${projectId}`,
            auth: true,
            success: (response) => {
                // setUploadedForbiddenFile(response.data)
                setForbiddenWordsFiles(response.data)
            },
        });
    }

    const downloadQaFile = async (objID, target) => {
        const response = await qaFileDownloadFunction(objID, target);
        Config.downloadFileInBrowser(response)
    }

    const uploadForbiddenFiles = () => {
        let uniqueList = getUniqueListBy(forbiddenWordsFiles, 'job')
        let counter = 0
        uniqueList?.map((eachJob, index) => {
            counter++
            if (eachJob?.id === undefined || eachJob?.id === null) {
                let formData = new FormData();
                forbiddenWordsFiles?.map(eachFile => {
                    if (eachJob?.id === undefined && eachJob.job === eachFile.job) {
                        formData.append("forbidden_files", eachFile.file);
                    }
                })

                if (eachJob.job !== 0) {      // 0 is if all-job option is selected
                    formData.append("job", eachJob.job);
                } else {
                    formData.append("project", projectId);
                }

                Config.axios({
                    url: Config.BASE_URL + "/qa/forbidden_file/",
                    method: "POST",
                    auth: true,
                    data: formData,
                    success: (response) => {
                        if (response.data?.Invalid !== null) {
                            setShowInvalidFileModal(true)
                            setQaInvalidFiles(response.data?.Invalid)
                          setIsLoadingButton(false)

                        } else {
                            if (counter === uniqueList?.length) Config.toast(t("successfully_uploaded"));
                            setIsLoadingButton(false)

                        }
                        setTimeout(() => {
                            getForbiddenFiles()
                        }, 100);
                    },
                });
            }
        })
    }


    const updateJobForQAFile = (job_id, objId, target) => {
        let formData = new FormData();
        formData.append("job", job_id !== 0 ? job_id : '');
        Config.axios({
            url: target === 'untranslatable' ? `${Config.BASE_URL}/qa/untranslatable_file/${objId}/` : `${Config.BASE_URL}/qa/forbidden_file/${objId}/`,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                Config.toast('Changes saved');
                if (target === 'untranslatable') {
                    let selectedFileRow = untranslatableFiles?.map((obj, index) => {
                        if (obj?.id === objId) {
                            return { ...obj, job: job_id };
                        }
                        return obj;
                    })
                    setUntranslatableFiles(selectedFileRow)
                    setIsQaChanged(true)
                } else {
                    let selectedFileRow = forbiddenWordsFiles?.map((obj, index) => {
                        if (obj?.id === objId) {
                            return { ...obj, job: job_id };
                        }
                        return obj;
                    })
                    setForbiddenWordsFiles(selectedFileRow)
                    setIsQaChanged(true)
                }
            },
        });
    }

    // Function to group objects based on a key
    const groupByKey = (objects, key) => {
        return objects.reduce((result, obj) => {
            const group = obj[key];
            result[group] = result[group] || [];
            result[group].push(obj);
            return result;
        }, {});
    }

    return (
        <React.Fragment>
            {/* <Navbar/> */}
            <section className="settings-section">
                <div className="settings-head">
                    <div className="settings-heading-title">
                        <img src={UploadFileNewGrey} alt="upload_file_new_grey" />
                        <span>{t("assets")}</span>
                    </div>
                    {!isNewsProject ? (
                        <Nav tabs className="settings-nav-container">
                            <NavItem
                                className={"setup-button-modal-btn " + classnames({ active: activeTab === "1" })}
                                onClick={() => {
                                    toggle("1");
                                    setQaSubdomain(false);
                                    setSubQatab()
                                }}
                            >
                                <NavLink className="settings-setup-btn">{t("translation_memories")} (TMX)</NavLink>
                            </NavItem>
                            <NavItem
                                className={"setup-button-modal-btn " + classnames({ active: activeTab === "2" })}
                                onClick={() => {
                                    toggle("2");
                                    setQaSubdomain(false)
                                    setSubQatab()
                                }}
                            >
                                <NavLink className="settings-setup-btn">{t("termbases")} (TBX)</NavLink>
                            </NavItem>
                            {/* This is for the next version release */}
                            <NavItem
                                className={"setup-button-modal-btn " + classnames({ active: activeTab === "3" })}
                                onClick={() => {
                                    toggle("3");
                                    setQaSubdomain(false)
                                    setSubQatab()
                                }}
                            >
                                <NavLink className="settings-setup-btn">{t("ailaysa_glossaries")}</NavLink>
                            </NavItem>
                            {/* <NavItem
                                className={"setup-button-modal-btn " + classnames({ active: activeTab === "6" })}
                                onClick={() => {
                                    toggle("6");
                                    setQaSubdomain(false)
                                    setSubQatab()
                                }}
                            >
                                <NavLink className="settings-setup-btn">{t("wordchoice")}</NavLink>
                            </NavItem> */}

                            <NavItem className={"setup-button-modal-btn " + classnames({ active: (activeTab === "5" && (subQatab === 1 || subQatab === 2)) })} onClick={() => { toggle("5"); toggleInner(1); setQaSubdomain(true); }}>
                                <NavLink className="settings-setup-btn">
                                    {t("quality_analysis")}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav tabs className="settings-nav-container">
                            <NavItem
                                className={"setup-button-modal-btn " + classnames({ active: activeTab === "3" })}
                                onClick={() => {
                                    toggle("3");
                                    setQaSubdomain(false)
                                    setSubQatab()
                                }}
                            >
                                <NavLink className="settings-setup-btn">{t("ailaysa_glossaries")}</NavLink>
                            </NavItem>
                        </Nav>
                    )}
                </div>
                <div className="settings-mega-container">
                    {
                        qaSubdomain &&
                        <div className="assets-qa-tab-wrapper">
                            <Nav tabs className="settings-nav-container">
                                <NavItem
                                    className={"setup-button-modal-btn " + classnames({ active: subQatab === 1 })}
                                    onClick={() => {
                                        toggleInner(1);
                                    }}
                                >
                                    <NavLink className="settings-setup-btn">{t("untransaltable_wrds")}</NavLink>
                                </NavItem>
                                <NavItem
                                    className={"setup-button-modal-btn " + classnames({ active: subQatab === 2 })}
                                    onClick={() => {
                                        toggleInner(2);
                                    }}
                                >
                                    <NavLink className="settings-setup-btn">{t("forbidden_wrds")}</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    }
                    <div className="settings-container">
                        <TabContent activeTab={activeTab}>
                            <div className="settings-tab">
                                <h1>
                                    {
                                        activeTab === "1" ?
                                            t("translation_memories")
                                            :
                                            activeTab === "2" ?
                                                t("termbases")
                                                :
                                                activeTab === "3" ?
                                                    t("ailaysa_glossaries")
                                                    :
                                                    activeTab === "5" ?
                                                        t("quality_analysis")
                                                        : 
                                                        activeTab === "6" ?
                                                            t("wordchoice")
                                                                :
                                                                ""
                                    }
                                </h1>
                                <span className="settings-close-btn" onClick={() => props?.hideSettingsModal()}>
                                    <img src={CloseBlack} alt="close_black" />
                                </span>
                            </div>
                            <TabPane tabId="1">
                                <div className="settings-tab-main-container">
                                    <div className="settigs-inner-row">
                                        <h3 className="inner-title">TMX {t("files_sm")}</h3>
                                        <p className="tm-title-desc">{t("add_tmx_files_note")}</p>
                                        {/* <div className="tab-column">
                                            <Nav tabs vertical className="tab-border-bot-remove">
                                                <NavItem className="settings-inner-tab-item">
                                                    <NavLink
                                                        className={"settings-inner-setup-btn " + classnames({ active: this.state.activeInnerTab === "1" })}
                                                        onClick={() => {
                                                            this.toggleInner("1");
                                                        }}
                                                    >
                                                        TM Files
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="settings-inner-tab-item">
                                                    <NavLink
                                                        className={"settings-inner-setup-btn " + classnames({ active: this.state.activeInnerTab === "2" })}
                                                        onClick={() => {
                                                            this.toggleInner("2");
                                                        }}
                                                    >
                                                        TM Settings
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                        <div className="tab-working-cont">
                                            <TabContent activeTab={this.state.activeInnerTab}>
                                        <TabPane tabId="1"> */}
                                        {
                                            isLoading ?
                                                <React.Fragment>
                                                    <div className="tmx-tbx-file-list">
                                                        <form action="">
                                                            <ul className="tmx-tbx-file-list-form">
                                                                <li>
                                                                    <div className="upload-tmx-link">
                                                                        <label htmlFor="tmx-files">
                                                                            <Skeleton
                                                                                animation="wave"
                                                                                variant="text"
                                                                                width={120}
                                                                                height={30}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </form>
                                                        <div className="tmx-tbx-files-box">
                                                            <ul className="tmx-tbx-files-list-new">
                                                                {Array(3).fill(null).map((value, key) => (
                                                                    <li>
                                                                        <div className="tmx-tbx-files-wrap d-flex" style={{ gap: "15px" }}>
                                                                            <span className="settings-doc-icon">
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="text"
                                                                                    width={24}
                                                                                    height={25}
                                                                                />
                                                                            </span>
                                                                            <span className="file-edit-proj-txt-tmx-filename">
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="text"
                                                                                    width={207}
                                                                                    height={25}
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                        <div className="tmx-tbx-action-wrap">
                                                                            <div className="setting-file-edit-translation-txt d-flex" style={{ gap: "15px" }}>
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="text"
                                                                                    width={50}
                                                                                    height={25}
                                                                                />
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="text"
                                                                                    width={20}
                                                                                    height={25}
                                                                                />
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="text"
                                                                                    width={50}
                                                                                    height={25}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                                :
                                                (!tmxTempFiles?.length ? (
                                                    <DragandDrop handleDrop={(e) => handleTMXFileChange(e)} showSettings={props.showSettings}>
                                                        <div className="button-wrap assets-dropdown-wrap">
                                                            <div className="draganddrop-align">
                                                                <img
                                                                    src={FolderIcon}
                                                                    alt="folder"
                                                                />
                                                                <div className="file-upload-align">
                                                                    <p className="upload-text">{t("drop_your_files_here_or")} </p>
                                                                    <div className="upload-link-wrapper">
                                                                        <label htmlFor="tmx-files">{t("browse")}</label>
                                                                        <input
                                                                            type="file"
                                                                            name="tmx_files"
                                                                            id="tmx-files"
                                                                            accept=".tmx"
                                                                            onClick={(e) => {
                                                                                e.target.value = "";
                                                                            }}
                                                                            // onInput={(e) => tmxFileUpload(0, e)}
                                                                            onChange={(e) => handleTMXFileChange(e)}
                                                                            multiple
                                                                            hidden
                                                                            className="form-control-file"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DragandDrop>
                                                ) : (
                                                    <div className="tmx-tbx-file-list">
                                                        <form action="">
                                                            <ul className="tmx-tbx-file-list-form">
                                                                <li>
                                                                    <div className="upload-tmx-link">
                                                                        <label htmlFor="tmx-files">
                                                                            <img src={PlusIcon} />
                                                                            {t("add_tmx_file")}
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            name="tmx_files"
                                                                            accept=".tmx"
                                                                            id="tmx-files"
                                                                            onClick={(e) => {
                                                                                e.target.value = "";
                                                                            }}
                                                                            onChange={(e) => handleTMXFileChange(e)}
                                                                            multiple
                                                                            hidden
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </form>
                                                        <div className="tmx-tbx-files-box">
                                                            <ul className="tmx-tbx-files-list-new">
                                                                {tmxTempFiles.map((each, index) => (
                                                                    <li key={index} className={each?.file !== undefined && "qa-list-updated"}>
                                                                        <div className="tmx-tbx-files-wrap">
                                                                            <span className="settings-doc-icon">
                                                                                <img src={`${Config.BASE_URL}/app/extension-image/` + (each?.file !== undefined ? each?.file?.name?.split(".")[1] : each?.filename?.split(".")[1])} alt="extension-icon" />
                                                                            </span>
                                                                            <span className="file-edit-proj-txt-tmx-filename">
                                                                                {each?.file !== undefined ? each?.file?.name : each?.filename}
                                                                            </span>
                                                                        </div>
                                                                        <div className="tmx-tbx-action-wrap">
                                                                            {each?.id !== undefined &&
                                                                                (
                                                                                    <div className="setting-file-edit-translation-txt">
                                                                                        <span>
                                                                                            {jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[0]}
                                                                                        </span>
                                                                                        <img src={ArrowRightAltColor} />
                                                                                        <span>
                                                                                            {jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[1]}
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            <div className="settings-job-select">
                                                                                <FormControl className="select-root-container">
                                                                                    {jobsOptionsRef.current !== null && <Select
                                                                                        // classes={{ root: classes.input }}
                                                                                        className="select-root-input"
                                                                                        name="tmx-job-select"
                                                                                        placeholder={t("job_select")}
                                                                                        value={each?.job !== 0 ? jobsOptionsRef.current?.find(obj => obj.value === each?.job)?.value : jobsOptionsRef.current[1]?.value}
                                                                                        onChange={(e) => { each?.id !== undefined ? updateJobForTMXFiles(e.target.value, each?.id) : handleTMXJobChange(e.target.value, index) }}
                                                                                        inputProps={{
                                                                                            // classes: {
                                                                                            //     icon: classes.icon,
                                                                                            // },
                                                                                        }}
                                                                                    // MenuProps={{
                                                                                    //     anchorOrigin: {
                                                                                    //     vertical: "bottom",
                                                                                    //     horizontal: "left"
                                                                                    //     },
                                                                                    //     getContentAnchorEl: null
                                                                                    // }}
                                                                                    >
                                                                                        {jobsOptions.map((jobsOption) => {
                                                                                            if (jobsOption?.label?.toLowerCase() !== 'all jobs') {
                                                                                                return (
                                                                                                    <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                                        {jobsOption.label}
                                                                                                    </MenuItem>
                                                                                                )
                                                                                            }
                                                                                        })}
                                                                                    </Select>}
                                                                                </FormControl>
                                                                            </div>
                                                                            <div className="tmx-tbx-files-delete">
                                                                                {
                                                                                    each?.id !== undefined && (
                                                                                        <span className="tmx-tbx-files-del-box" onClick={(e) => downloadTMXFile(e, each?.id)}>
                                                                                            <img
                                                                                                src={DownloadIcon}
                                                                                                alt="file_download"
                                                                                            />
                                                                                        </span>
                                                                                    )
                                                                                }
                                                                                <span onClick={(e) => { each?.id !== undefined ? deleteTmxFile(each?.id, index) : removeTMXFile(e, index) }} className="tmx-tbx-files-del-box">
                                                                                    <img
                                                                                        src={DeleteBinIcon}
                                                                                        alt="close_black"
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                        {/* </TabPane>
                                                <TabPane tabId="2"> */}
                                        <div className={"range-slider-container " + (tmxTempFiles?.length && "slider-border-top-remove")}>
                                            <h3 className="inner-title tm-margin-add">{t("tm_settings")}</h3>
                                            <div className="range-slider-part">
                                                <div className="range-slider-title">{t("match_thershold")}</div>
                                                <div className="range-sliding-wrap">
                                                    <Slider
                                                        // classes={ classes.root, classes.track, classes.rail, classes.thumb }s
                                                        defaultValue={matchThreshold}
                                                        value={matchThreshold}
                                                        aria-label="value"
                                                        onChange={handleSliderChange}
                                                    />
                                                    <div className="range-slider-input">
                                                        <input
                                                            type="number"
                                                            name="matchThreshold"
                                                            value={matchThreshold}
                                                            onChange={handleInputChange}
                                                            onBlur={handleBlurMatchThershold}
                                                            id="range-slider-input"
                                                        />
                                                        <span>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="range-slider-part">
                                                <div className="range-slider-title-1">{t("tm_hits")}</div>
                                                <div className="range-sliding-wrap">
                                                    <Slider
                                                        // classes={{ root: classes.root, track: classes.track, rail: classes.rail, thumb: classes.thumb }}
                                                        defaultValue={stepValue}
                                                        value={stepValue}
                                                        step={1}
                                                        marks
                                                        min={1}
                                                        max={10}
                                                        aria-label="stepValue"
                                                        onChange={handleStepSliderChange}
                                                    />
                                                    <div className="range-slider-input-1">
                                                        <input
                                                            type="number"
                                                            name="stepValue"
                                                            value={stepValue}
                                                            onChange={handleInputChange}
                                                            onBlur={handleBlurStepValue}
                                                            id="range-slider-input"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="range-btn-slider-container">
                                            <p className="reset-def">{t("reset_default_tm_settings")}</p>
                                            <button className="settings-RangeResetButton" type="button" onClick={() => resetThreshold()}>
                                                <img src={RefreshIcon} className="reset-icon-set" />
                                                <span className="add-file-btn">
                                                    {t("reset")}
                                                </span>
                                            </button>
                                        </div>
                                        {/* </TabPane>
                                            </TabContent>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                        <p className="settings-th">File Format</p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                        <p className="settings-th text-center">Vendor Upload</p>
                                    </div>
                                </div> */}
                                {/* <div id="translation_memories" className="display translation_memories">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                                    <div className="text-left">
                                                        <p className="settings-file-names" >TMX File</p>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 file-list-open">
                                                    <div>
                                                        <form>
                                                            <input type="file" name="tmx_files" id="tmx-files" onClick={(e) =>{e.target.value = ''}} onInput={e => this.tmxFileUpload(e)} multiple hidden/>
                                                            <label className="new-btn-align btn new-form-btn-1 btn-color btn-primary" htmlFor="tmx-files"><span className="new-icon-space"><i className="fas fa-upload"></i></span> Upload Files</label>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                                    <div className="text-left">
                                                        <p className="settings-file-names" >TBX File</p>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 file-list-open">
                                                    <div>
                                                        <form>
                                                            <input type="file" name="tbx_files" id="tbx-files" onClick={(e) =>{e.target.value = ''}} onInput={e => this.tbxFileUpload(e)} multiple hidden/>
                                                            <label className="new-btn-align btn new-form-btn-1 btn-color btn-primary" htmlFor="tbx-files"><span className="new-icon-space"><i className="fas fa-upload"></i></span> Upload Files</label>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                            </TabPane>
                            <TabPane tabId="2">
                                <div className="create-tbx-header">
                                    <div className="create-tbx-title">
                                        <h2 className="inner-title">{t("create_new_termbase")}</h2>
                                        <p className="tbx-note">{t("download_template_tbx_file")}</p>
                                        <div className="file-uploadbtn-row">
                                            <button className="settings-TBXDownloadButton" onClick={() => downloadTemplate()}>
                                                <span><img src={FileDownloadBlue} alt="file_download" /></span>
                                                <span className="tbx-download-btn">{t("download_template")}</span>
                                            </button>
                                            <label className="settings-TBXConvertButton"
                                                // onClick={tbxConvertFileUpload} 
                                                // type="button"
                                                htmlFor="tbx_convert_files"
                                            // component="label"
                                            >
                                                <span><FileUploadOutlinedIcon className="upload-icon" /></span>
                                                <span className="add-file-convert-btn">{t("upload_to_convert")}</span>
                                                <input
                                                    hidden
                                                    type="file"
                                                    accept=".xlsx"
                                                    name="tbx_convert_files"
                                                    id="tbx_convert_files"
                                                    onChange={tbxConvertFileInput}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="tbx-file-list-wrapper">
                                    <div className="tbx-file-list-header">
                                        <h2>{t("termbase_list")}</h2>
                                        <div className="upload-tmx-link">
                                            <label htmlFor="tbx-files">
                                                <img src={PlusIcon} />
                                                {t("add_tbx_file")}
                                            </label>
                                            <input type="file" name="tbx_files" id="tbx-files" accept=".tbx" onChange={tbxFileInput} hidden />
                                        </div>
                                    </div>
                                    {/* <form action="">
                                        <ul className="tbx-file-list-form">
                                            <li>
                                                <div className="upload-tmx-link">
                                                    <label htmlFor="tbx-files">
                                                        <img src={import.meta.env.PUBLIC_URL + "assets/images/new-ui-icons/link-pin.svg"} alt="link-pin" />
                                                        {uploadedTbxFile != null ? uploadedTbxFile.name : "Choose File"}
                                                    </label>
                                                    <input type="file" name="tbx_files" id="tbx-files" onChange={() => tbxFileInput()} hidden />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="settings-job-select-link">
                                                    <Select options={this.state.jobsOptions} value={this.state.selectedTbxJob} onChange={this.tbxJobOptionChange} className="setting-select-width" name="job-select" id="job-select" styles={customStyles} placeholder={<div className="setting-select-placeholder-text">All Jobs</div>} components={{ DropdownIndicator, IndicatorSeparator:() => null }}/>
                                                    <FormControl classes={{ root: classes.selectcontainer }}>
                                                        <Select
                                                            classes={{ root: classes.input }}
                                                            name="name"
                                                            placeholder="Job Select"
                                                            value={selectedTbxJob}
                                                            onChange={(event) => tbxJobOptionChange(event.target.value)}
                                                            // input={<Input id="name" />}
                                                        >
                                                            {jobsOptions.map((jobsOption) => (
                                                                <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                    {jobsOption.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="settings-job-select-link">
                                                    <AddButton type="button" onClick={() => tbxFileUpload()}>
                                                        <span className="add-file-btn">Add File</span>
                                                    </AddButton>
                                                </div>
                                            </li>
                                        </ul>
                                    </form> */}
                                    <div className="tbx-files-box-wrapper">
                                        <div className="tbx-files-box">
                                            {tbxFiles.map((tbxFile) => {
                                                return (
                                                    <ul className="tbx-file-list" key={tbxFile.id}>
                                                        <li>
                                                            <span className="settings-doc-icon">
                                                                <img
                                                                    src={
                                                                        `${Config.BASE_URL}/app/extension-image/` + tbxFile.filename.split(".").pop()
                                                                    }
                                                                    alt="doc-icon"
                                                                />
                                                            </span>
                                                            <span className="file-edit-proj-txt">{tbxFile.filename.split(".").slice(0, -1).join(".")}</span>
                                                            <span className="file-edit-proj-txt-extension">{"." + tbxFile.filename.split(".").pop()}</span>
                                                        </li>
                                                        <li>
                                                            {jobsOptions.find((element) => element.value == tbxFile.job) != null &&
                                                                jobsOptions.find((element) => element.value == tbxFile.job)?.label != null ? (
                                                                <div className="setting-file-edit-translation-txt">
                                                                    <span>
                                                                        {
                                                                            jobsOptions
                                                                                .find((element) => element.value == tbxFile.job)
                                                                                .label.split("->")[0]
                                                                        }
                                                                    </span>
                                                                    <img src={ArrowRightAltColor} />
                                                                    <span>
                                                                        {
                                                                            jobsOptions
                                                                                .find((element) => element.value == tbxFile.job)
                                                                                .label.split("->")[1]
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                jobsOptions[0]?.label != null && (
                                                                    <div className="setting-file-edit-translation-txt">
                                                                        <span>{jobsOptions[0].label}</span>
                                                                    </div>
                                                                )
                                                            )}
                                                            <div className="settings-job-select">
                                                                {/* <Select options={this.state.jobsOptions} onChange={(selectedOption) => this.updateTbxJob(selectedOption, tbxFile.id)} value={this.state.jobsOptions.find(element => element.value == tbxFile.job)} className="setting-select-width" name="job-select" id="job-select" styles={customStyles} placeholder={<div className="setting-select-placeholder-text">All Jobs</div>} components={{ DropdownIndicator, IndicatorSeparator:() => null }}/> */}
                                                                <FormControl className="select-root-container">
                                                                    <Select
                                                                        // classes={{ root: classes.input }}
                                                                        className="select-root-input"
                                                                        name="name"
                                                                        placeholder={t("job_select")}
                                                                        value={
                                                                            jobsOptions.find((element) => element.value == tbxFile.job)?.value != null
                                                                                ? jobsOptions.find((element) => element.value == tbxFile.job)?.value
                                                                                : 0
                                                                        }
                                                                        onChange={(event) => updateTbxJob(event.target.value, tbxFile.id)}
                                                                        inputProps={{
                                                                            // classes: {
                                                                            //     icon: classes.icon,
                                                                            // },
                                                                        }}
                                                                    // MenuProps={{
                                                                    //     anchorOrigin: {
                                                                    //       vertical: "bottom",
                                                                    //       horizontal: "left"
                                                                    //     },
                                                                    //     getContentAnchorEl: null
                                                                    // }}
                                                                    // input={<Input id="name" />}
                                                                    >
                                                                        {jobsOptions.map((jobsOption) => (
                                                                            <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                {jobsOption.label}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                            <div className="setting-wrong-btn-algin">
                                                                <span onClick={() => downloadTbxFile(tbxFile.id)} className="settings-close-btn">
                                                                    <img
                                                                        src={DownloadIcon}
                                                                        alt="file_download"
                                                                    />
                                                                </span>
                                                                <span onClick={() => deleteTbxFile(tbxFile.id)} className="settings-close-btn">
                                                                    <img
                                                                        src={DeleteBinIcon}
                                                                        alt="close_black"
                                                                    />
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                        <p className="settings-th">File Title</p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                        <p className="settings-th text-center">Vendor Upload</p>
                                    </div>
                                </div> */}
                                {/* <div id="translation_memories" className="display translation_memories">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                                    <div className="text-left">
                                                        <p className="settings-file-names" >Untranslatable File</p>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 file-list-open">
                                                    <div>
                                                        <form>
                                                            <input type="file" name="untranslatable_files" id="untranslatable-files" onClick={(e) =>{e.target.value = ''}} onInput={e => this.unTranslatableFileUpload(e)} multiple hidden/>
                                                            <label className="new-btn-align btn new-form-btn-1 btn-color btn-primary" htmlFor="untranslatable-files"><span className="new-icon-space"><i className="fas fa-upload"></i></span> Upload Files</label>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                                    <div className="text-left">
                                                        <p className="settings-file-names" >Forbidden Words File</p>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 file-list-open">
                                                    <div>
                                                        <form>
                                                            <input type="file" name="forbidden_files" id="forbidden-files" onClick={(e) =>{e.target.value = ''}} onInput={e => this.forbiddenFileUpload(e)} multiple hidden/>
                                                            <label className="new-btn-align btn new-form-btn-1 btn-color btn-primary" htmlFor="forbidden-files"><span className="new-icon-space"><i className="fas fa-upload"></i></span> Upload Files</label>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                                    <div className="text-left">
                                                        <p className="settings-file-names" >Lettercase Words File</p>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 file-list-open">
                                                    <div>
                                                        <form>
                                                            <input type="file" name="lettercase_files" id="lettercase-files" onClick={(e) =>{e.target.value = ''}} onInput={e => this.lettercaseFileUpload(e)} multiple hidden/>
                                                            <label className="new-btn-align btn new-form-btn-1 btn-color btn-primary" htmlFor="lettercase-files"><span className="new-icon-space"><i className="fas fa-upload"></i></span> Upload Files</label>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                            </TabPane>
                            <TabPane tabId="3">
                                <div className="asset-glossary-wrapper">
                                    <div className="asset-glossary-title-wrap">
                                        <h2 className="asset-gl-head">{t("glossary_list")}</h2>
                                        <div className="create-tbx-btn-align">
                                            <Link to="/create/assets/glossaries/create" className="settings-CreateTBXLink"><span className="create-tbx-btn">{t("create_a_new_glossary")}</span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="asset-glossary-list-wrapper">
                                    <ul className="asset-glossary-projects-wrap-list">
                                        {(isGlossaryListLoading && glossaryList?.length === 0) ? (
                                            Array(8).fill(null).map((index) => {
                                                return(
                                                    <>
                                                        <li key={index} style={(!isGlossaryListLoading && glossaryList?.length !== 0) ? {display: 'none'} : {}}>
                                                            <Skeleton animation="wave" variant="rectangular" height={15} width={15} />
                                                            <div className="asset-project-info-wrap">
                                                                <Skeleton animation="wave" variant="rectangular" width={26} height={26} />
                                                                <div className="asset-project-info">
                                                                    <span className="title"><Skeleton animation="wave" variant="text" width={150} /></span>
                                                                    <div className="lang-pair">
                                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                                        <img src={ArrowRightGrey} />
                                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                )
                                            })
                                        ) : (
                                            glossaryList?.length !== 0 ?
                                                glossaryList?.map((value) => {
                                                    return (
                                                        <li key={value.glossary_id}>
                                                            <div className="asset-project-select-checkbox">
                                                                <Checkbox
                                                                    checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                                    onChange={(e) => handleGlossaryCheckbox(e, value.glossary_id)}
                                                                    size="small"
                                                                />
                                                            </div>
                                                            <div className="asset-project-info-wrap">
                                                                <span className="assets-icon">
                                                                    <DescriptionOutlinedIcon className="gloss-types" />
                                                                </span>
                                                                <div className="asset-project-info">
                                                                    <span className="title">{value.glossary_name}</span>
                                                                    <div className="lang-pair">
                                                                        <span>{value?.source_lang}</span>
                                                                        <img src={ArrowRightGrey} />
                                                                        <span>{value?.target_lang?.join(', ')}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            :
                                                <span>{t("no_glossaries_to_ass")}</span>
                                        )}
                                    </ul>
                                </div>
                            </TabPane>
                            
                            {/* Wordchoice settings */}
                            <TabPane tabId="6">
                                <div className="asset-glossary-wrapper">
                                    <div className="asset-glossary-title-wrap">
                                        <h2 className="asset-gl-head">{t("wordchoice_list")}</h2>
                                        <div className="create-tbx-btn-align">
                                            <Link to="/create/assets/wordchoice" className="settings-CreateTBXLink"><span className="create-tbx-btn">{t("create_a_new_wordchoice")}</span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="asset-glossary-list-wrapper">
                                    <ul className="asset-glossary-projects-wrap-list">
                                        {(isWordchoiceListLoading && glossaryList?.length === 0) ? (
                                            Array(8).fill(null).map((index) => {
                                                return(
                                                    <>
                                                        <li key={index} style={(!isGlossaryListLoading && glossaryList?.length !== 0) ? {display: 'none'} : {}}>
                                                            <Skeleton animation="wave" variant="rectangular" height={15} width={15} />
                                                            <div className="asset-project-info-wrap">
                                                                <Skeleton animation="wave" variant="rectangular" width={26} height={26} />
                                                                <div className="asset-project-info">
                                                                    <span className="title"><Skeleton animation="wave" variant="text" width={150} /></span>
                                                                    <div className="lang-pair">
                                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                                        <img src={ArrowRightGrey} />
                                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                )
                                            })
                                        ) : (
                                            glossaryList?.length !== 0 ?
                                                glossaryList?.map((value) => {
                                                    return (
                                                        <li key={value.glossary_id}>
                                                            <div className="asset-project-select-checkbox">
                                                                <Checkbox
                                                                    checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                                    onChange={(e) => handleGlossaryCheckbox(e, value.glossary_id)}
                                                                    size="small"
                                                                />
                                                            </div>
                                                            <div className="asset-project-info-wrap">
                                                                <img src={WordchoiceIcon} alt="Wordchoice-icon" />
                                                                <div className="asset-project-info">
                                                                    <span className="title">{value.glossary_name}</span>
                                                                    <div className="lang-pair">
                                                                        <span>{value?.source_lang}</span>
                                                                        <img src={ArrowRightGrey} />
                                                                        <span>{value?.target_lang?.join(', ')}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            :
                                                <span>{t("no_glossaries_to_ass")}</span>
                                        )}
                                    </ul>
                                </div>
                            </TabPane>

                            <TabPane tabId="5">
                                <TabContent activeTab={subQatab}>
                                    {/* <div className="tmx-tbx-file-list tbx-list">
                                        <ul className="tmx-tbx-file-list-heading">
                                            <li>
                                                <span>File name</span>
                                            </li>
                                            <li>
                                                <span>Apply to</span>
                                            </li>
                                            <li></li>
                                        </ul>
                                        <form action="">
                                            <ul className="tmx-tbx-file-list-form">
                                                <li>
                                                    <div className="upload-tmx-link">
                                                        <label htmlFor="tbx_convert_files">
                                                            <img src={import.meta.env.PUBLIC_URL + "assets/images/new-ui-icons/link-pin.svg"} alt="link-pin" />
                                                            {this.state.uploadedTbxConvertFile != null ? this.state.uploadedTbxConvertFile.name : "Choose File"}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="tbx_convert_files"
                                                            id="tbx_convert_files"
                                                            onChange={this.tbxConvertFileInput}
                                                            hidden
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <FormControl classes={{ root: classes.selectcontainer }}>
                                                        <Select
                                                            classes={{ root: classes.input }}
                                                            name="name"
                                                            placeholder="Job Select"
                                                            value={this.state.selectedTbxConvertJob}
                                                            onChange={(event) => this.tbxJobConvertChange(event.target.value)}
                                                            // input={<Input id="name" />}
                                                        >
                                                            {this.state.jobsOnlyOptions.map((jobsOption) => (
                                                                <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                    {jobsOption.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </li>
                                                <li>
                                                    <TBXConvertButton onClick={this.tbxConvertFileUpload} type="button">
                                                        <span className="add-file-convert-btn">Convert</span>
                                                    </TBXConvertButton>
                                                </li>
                                            </ul>
                                        </form>
                                    </div> */}
                                    <TabPane tabId={1}>
                                        <div className="qa-collapsible-wrapper">
                                            <div className="qa-collapse-title">
                                                <h2>{t("untransaltable_wrds")}</h2>
                                                <small>{t("list_your_untranslatables_file_and_upload")}</small>
                                                <button className="settings-CreateTBXButton">
                                                    <label htmlFor="untranslatable">
                                                        <img src={PlusIcon} />
                                                        <span className="create-tbx-btn">{t("add_file")}</span>
                                                    </label>
                                                    <input type="file" name="untranslate" accept=".txt" id="untranslatable" onChange={(e) => handleChange(e, 'untranslatable')} multiple hidden />
                                                </button>
                                            </div>
                                            {
                                                untranslatableFiles?.map((each, ind) => (
                                                    <ul key={ind} className={"qa-file-list-wrapper " + (each?.id !== undefined && "qa-list-updated")}>
                                                        <li>
                                                            <div className="list-item-1">
                                                                <img src={`${Config.BASE_URL}/app/extension-image/` + (each?.file !== undefined ? each?.file?.name?.split(".")[1] : each?.name?.split(".")[1])} />
                                                                <span>{each?.file !== undefined ? each?.file?.name : each?.name}</span>
                                                            </div>
                                                            <div className="list-item-2">
                                                                <div className="job-selection-wrap">
                                                                    {
                                                                        each?.id !== undefined ? (
                                                                            <>
                                                                                <div className="selected-job-value">
                                                                                    <div className="lang-pair-value">
                                                                                        {
                                                                                            each?.job !== null && each?.job != 0 ? (
                                                                                                <>
                                                                                                    <span>{jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[0]}</span>
                                                                                                    <img src={ArrowRightAltColor} />
                                                                                                    <span>{jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[1]}</span>
                                                                                                </>
                                                                                            ) : (
                                                                                                <span>{jobsOptionsRef.current?.find(obj => obj.value == 0 || obj.value == null)?.label}</span>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="settings-job-select">
                                                                                    <FormControl className="select-root-container">
                                                                                        {jobsOptionsRef.current !== null && <Select
                                                                                            // classes={{ root: classes.input }}
                                                                                            name="name"
                                                                                            // placeholder="Job Select"
                                                                                            // defaultValue={0}
                                                                                            className="select-root-input"
                                                                                            defaultValue={jobsOptionsRef.current[0]?.value}
                                                                                            displayEmpty={true}
                                                                                            value={jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value != null ?
                                                                                                jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value
                                                                                                :
                                                                                                jobsOptionsRef.current[0]?.value
                                                                                            }
                                                                                            inputProps={{
                                                                                                // classes: {
                                                                                                //     icon: classes.icon,
                                                                                                // },
                                                                                            }}
                                                                                            // MenuProps={{
                                                                                            //     anchorOrigin: {
                                                                                            //       vertical: "bottom",
                                                                                            //       horizontal: "left"
                                                                                            //     },
                                                                                            //     getContentAnchorEl: null
                                                                                            // }}
                                                                                            onChange={(event) => updateJobForQAFile(event.target.value, each?.id, 'untranslatable')}
                                                                                        >
                                                                                            {jobsOptions.map((jobsOption) => (
                                                                                                <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                                    {jobsOption.label}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>}
                                                                                    </FormControl>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div className="settings-job-select">
                                                                                <FormControl className="select-root-container">
                                                                                    <Select
                                                                                        // classes={{ root: classes.input }}
                                                                                        name="name"
                                                                                        placeholder={t("job_select")}
                                                                                        // defaultValue={0}
                                                                                        className="select-root-input"
                                                                                        defaultValue={jobsOptionsRef.current[0]?.value}
                                                                                        value={jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value != null ?
                                                                                            jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value
                                                                                            : 0
                                                                                        }
                                                                                        inputProps={{
                                                                                            // classes: {
                                                                                            //     icon: classes.icon,
                                                                                            // },
                                                                                        }}
                                                                                        // MenuProps={{
                                                                                        //     anchorOrigin: {
                                                                                        //       vertical: "bottom",
                                                                                        //       horizontal: "left"
                                                                                        //     },
                                                                                        //     getContentAnchorEl: null
                                                                                        // }}
                                                                                        // onChange={(event) => this.updateTbxJob(event.target.value, tbxFile.id)}
                                                                                        onChange={(event) => handleQAJobChange(event.target.value, ind, 'untranslatable')}
                                                                                    >
                                                                                        {jobsOptions.map((jobsOption) => (
                                                                                            <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                                {jobsOption.label}
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="action-wrapper">
                                                                    {each?.id && <span className="settings-close-btn">
                                                                        <FileDownloadOutlinedIcon className="download" onClick={() => downloadQaFile(each?.id, 'untranslatable')} />
                                                                    </span>}
                                                                    <span className="settings-close-btn" onClick={(e) => { each.id ? deleteFile(each?.id, 'untranslatable') : removeFile(e, ind, 'untranslatable') }}>
                                                                        <img
                                                                            src={DeleteBinIcon}
                                                                            alt="close_black"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ))
                                            }
                                            {/* {untranslatableFiles?.filter(each => each?.id === undefined)?.length !== 0 &&
                                                <input type="button" onClick={() => uploadUntranlatableFiles()} className="settings-qa-btn" value="Upload"/>
                                            } */}
                                        </div>
                                    </TabPane>
                                    <TabPane tabId={2}>
                                        <div className="qa-collapsible-wrapper">
                                            <div className="qa-collapse-title">
                                                <h2>{t("forbidden_wrds")}</h2>
                                                <small>{t("list_your_forbidden_file_and_upload")}</small>
                                                <button className="settings-CreateTBXButton">
                                                    <label htmlFor="forbidden">
                                                        <img src={PlusIcon} />
                                                        <span className="create-tbx-btn">{t("add_file")}</span>
                                                    </label>
                                                    <input type="file" name="forbidden" accept=".txt" id="forbidden" onChange={(e) => handleChange(e, 'forbidden')} multiple hidden />
                                                </button>
                                            </div>
                                            {
                                                forbiddenWordsFiles?.map((each, ind) => (
                                                    <ul className={"qa-file-list-wrapper " + (each?.id !== undefined && "qa-list-updated")} key={ind}>
                                                        <li>
                                                            <div className="list-item-1">
                                                                <img src={`${Config.BASE_URL}/app/extension-image/` + (each?.file !== undefined ? each?.file?.name?.split(".")[1] : each?.name?.split(".")[1])} />
                                                                <span>{each?.file !== undefined ? each?.file?.name : each?.name}</span>
                                                            </div>
                                                            <div className="list-item-2">
                                                                <div className="job-selection-wrap">
                                                                    {
                                                                        each?.id !== undefined ? (
                                                                            <>
                                                                                <div className="selected-job-value">
                                                                                    <div className="lang-pair-value">
                                                                                        {
                                                                                            each?.job !== null && each?.job !== 0 ? (
                                                                                                <>
                                                                                                    <span>{jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[0]}</span>
                                                                                                    <img src={ArrowRightAltColor} />
                                                                                                    <span>{jobsOptionsRef.current?.find(obj => obj.value == each.job)?.label.split('->')[1]}</span>
                                                                                                </>
                                                                                            ) : (
                                                                                                <span>{jobsOptionsRef.current?.find(obj => obj.value == 0 || obj.value == null)?.label}</span>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="settings-job-select">
                                                                                    <FormControl className="select-root-container">
                                                                                        {jobsOptionsRef.current !== null && <Select
                                                                                            // classes={{ root: classes.input }}
                                                                                            name="name"
                                                                                            // placeholder="Job Select"
                                                                                            // defaultValue={jobsOptions[0]?.value}
                                                                                            className="select-root-input"
                                                                                            displayEmpty={true}
                                                                                            value={(each?.job !== 0 || each?.job !== null) ? jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value : 0}
                                                                                            onChange={(event) => updateJobForQAFile(event.target.value, each?.id, 'forbidden')}
                                                                                            inputProps={{
                                                                                                // classes: {
                                                                                                //     icon: classes.icon,
                                                                                                // },
                                                                                            }}
                                                                                        // MenuProps={{
                                                                                        //     anchorOrigin: {
                                                                                        //       vertical: "bottom",
                                                                                        //       horizontal: "right"
                                                                                        //     },
                                                                                        //     getContentAnchorEl: null
                                                                                        // }}
                                                                                        >
                                                                                            {jobsOptions.map((jobsOption) => (
                                                                                                <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                                    {jobsOption.label}
                                                                                                </MenuItem>
                                                                                            ))}
                                                                                        </Select>}
                                                                                    </FormControl>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div className="settings-job-select">
                                                                                <FormControl className="select-root-container">
                                                                                    <Select
                                                                                        // classes={{ root: classes.input }}
                                                                                        name="name"
                                                                                        placeholder="Job Select"
                                                                                        className="select-root-input"
                                                                                        value={jobsOptionsRef.current?.find(obj => obj.value == (each.job !== null ? each.job : 0))?.value}
                                                                                        onChange={(event) => handleQAJobChange(event.target.value, ind, 'forbidden')}
                                                                                        inputProps={{
                                                                                            // classes: {
                                                                                            //     icon: classes.icon,
                                                                                            // },
                                                                                        }}
                                                                                    // MenuProps={{
                                                                                    //     anchorOrigin: {
                                                                                    //       vertical: "bottom",
                                                                                    //       horizontal: "left"
                                                                                    //     },
                                                                                    //     getContentAnchorEl: null
                                                                                    //   }}
                                                                                    >
                                                                                        {jobsOptions.map((jobsOption) => (
                                                                                            <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                                                                {jobsOption.label}
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="action-wrapper">
                                                                    {each?.id &&
                                                                        <span className="settings-close-btn" onClick={() => downloadQaFile(each?.id, 'forbidden')} >
                                                                            <FileDownloadOutlinedIcon className="download" />
                                                                        </span>

                                                                    }
                                                                    <span className="settings-close-btn" onClick={(e) => { each?.id ? deleteFile(each?.id, 'forbidden') : removeFile(e, ind, 'forbidden') }}>
                                                                        <img
                                                                            src={DeleteBinIcon}
                                                                            alt="close_black"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ))
                                            }
                                            {/* {forbiddenWordsFiles?.filter(each => each?.id === undefined)?.length !== 0 &&
                                                <input type="button" onClick={() => uploadForbiddenFiles()} className="settings-qa-btn" value="Upload"/>
                                            } */}
                                        </div>
                                        <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
                                    </TabPane>
                                </TabContent>
                            </TabPane>
                            {
                                <div className="settings-update-btn">

                                    <button onClick={() => props?.hideSettingsModal()} className="setting-close-btn">{t("close")}</button>
                                    <form>
                                        <button type="button" onClick={() => {!isLoadingButton && handleSettingsSaveBtn()}} className="setting-update-btn" value={t("save")}
                                            style={
                                                (
                                                    (activeTab == 1 && !isTMXSettingsChnaged && tmxTempFiles?.filter(each => each?.id === undefined)?.length === 0 && !isTMXFilesChanged) ||
                                                    (activeTab == 2) ||
                                                    (activeTab == 3 && !isGlossaryChanged) ||
                                                    (activeTab == 6 && !isGlossaryChanged) ||
                                                    ((activeTab == 5 && subQatab == 1) && untranslatableFiles?.filter(each => each?.id === undefined)?.length === 0 && !isQaChanged) ||
                                                    ((activeTab == 5 && subQatab == 2) && forbiddenWordsFiles?.filter(each => each?.id === undefined)?.length === 0 && !isQaChanged)
                                                ) ? { opacity: 0.5 } : {}
                                            }
                                            disabled={
                                                (activeTab == 1 && !isTMXSettingsChnaged && tmxTempFiles?.filter(each => each?.id === undefined)?.length === 0 && !isTMXFilesChanged) ||
                                                (activeTab == 2) ||
                                                (activeTab == 3 && !isGlossaryChanged) ||
                                                (activeTab == 6 && !isGlossaryChanged) ||
                                                ((activeTab == 5 && subQatab == 1) && untranslatableFiles?.filter(each => each?.id === undefined)?.length === 0 && !isQaChanged) ||
                                                ((activeTab == 5 && subQatab == 2) && forbiddenWordsFiles?.filter(each => each?.id === undefined)?.length === 0 && !isQaChanged)
                                            }
                                        >
                                        {isLoadingButton &&  <SaveButtonLoader />}
                                        {isLoadingButton ? t("saving") :t("save")}
                                   </button>
                                    </form>
                                </div>
                            }
                        </TabContent>
                        {/*<p className="settings-sub-heading pt-3 pb-3">Toolbar Settings</p>
                        <table id="translation_memories_on_off" className="display translation_memories">
                            <tbody>
                                <tr>
                                    <div className="row align-items-center">
                                        <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                            <td className="text-left">
                                                <p className="settings-file-names" >TMX Display</p>
                                            </td>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open">
                                            <td>
                                                <div className="table-textbox-align">
                                                    <form>
                                                        <label className={'switch-show-hide' + (this.state.showTmSection == true ? ' switch-show-hide-checked' : '')}>
                                                            <input type="checkbox" checked={this.state.showTmSection == true} onClick={e => this.showTmSection(e)} />
                                                            <div></div>
                                                        </label>
                                                    </form>
                                                </div>
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="row align-items-center">
                                        <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open-1">
                                            <td className="text-left">
                                                <p className="settings-file-names" >Toolbar Display</p>
                                            </td>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 translation-list-open">
                                            <td>
                                                <div className="table-textbox-align">
                                                    <form>
                                                        <label className={'switch-show-hide' + (this.state.showToolbarSection ? ' switch-show-hide-checked' : '')}>
                                                            <input type="checkbox" checked={this.state.showToolbarSection} onClick={e => this.showToolbarSection(e)}  />
                                                            <div></div>
                                                        </label>
                                                    </form>
                                                </div>
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                            </tbody>
                        </table>*/}
                    </div>
                </div>
            </section>
            {settingsSaveModalShow && (<Rodal visible={settingsSaveModalShow} {...settingsSaveModaloption} showCloseButton={false} className="ailaysa-save-alert-modal">
                <div className="ailaysa-save-alert-wrapper">
                    <div className="ai-save-alert-header">
                        <span className="save-alert-close-btn" onClick={() => setSettingsSaveModalShow(false)}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                    </div>
                    <h2 className="modal-title">{t("you_made_changes_to_this_option")}</h2>
                    <p className="modal-desc">{t("like_to_save_or_discard")}</p>
                    <div className="button-row">
                        <button onClick={() => setSettingsSaveModalShow(false)} className="setting-close-btn">{t("discard")}</button>
                        <button className="setting-update-btn">{t('save')}</button>
                    </div>
                </div>
            </Rodal>)}
            {tbxFileConvertShow && (<Rodal visible={tbxFileConvertShow} {...modaloption} showCloseButton={false} className="ailaysa-convert-options-modal">
                <div className="ailaysa-convert-modal">
                    <h2 className="title">{t("convert_into_termbase")}</h2>
                    <div className="form-box">
                        <div className="form-container">
                            <label>{t('uploaded_file')}</label>
                            <div className="input-form-control">
                                <span>{uploadedTbxConvertFileName}</span>
                                <div className="file-input-select">
                                    <label htmlFor="termbase-file"><img src={FolderOpen} /></label>
                                    <input type="file" id="termbase-file" name="termbase-file" onChange={tbxConvertFileInput} hidden />
                                </div>
                            </div>
                        </div>
                        <div className="form-container">
                            <label>{t("apply_to")}</label>
                            <FormControl
                                // classes={{ root: modalClasses.selectcontainer }}
                                className="modal-root-container"
                            >
                                <Select
                                    // classes={{ root: modalClasses.input }}
                                    className="modal-root-input"
                                    name="name"
                                    placeholder="Select a Job"
                                    value={selectedTbxConvertJob}
                                    onChange={(event) => tbxJobConvertChange(event.target.value)}
                                    inputProps={{
                                        // classes: {
                                        //     icon: modalClasses.icon,
                                        // },
                                    }}
                                // MenuProps={{
                                //     anchorOrigin: {
                                //       vertical: "bottom",
                                //       horizontal: "left"
                                //     },
                                //     transformOrigin: {
                                //       vertical: "top",
                                //       horizontal: "left"
                                //     },
                                //     getContentAnchorEl: null
                                // }}
                                // input={<Input id="name" />}
                                >
                                    {jobsOptions.map((jobsOption) => {
                                        if (jobsOption.value != 0) {
                                            return (
                                                <MenuItem key={jobsOption.value} value={jobsOption.value}>
                                                    {jobsOption.label}
                                                </MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="button-row">
                        <button onClick={() => { setTbxFileConvertShow(false); setSelectedTbxConvertJob(""); setUploadedTbxConvertFileName("") }} className="setting-close-btn">{t("discard")}</button>
                        <form>
                            <button type="button" onClick={!isConvertingButton && tbxConvertFileUpload} className="setting-update-btn" value={t("convert")} >
                            {isConvertingButton &&  <SaveButtonLoader />}
                                        {isConvertingButton ? t("converting") :t("convert")}
                            </button>
                            </form>
                    </div>
                </div>
            </Rodal>)}
            {showInvalidFileModal && (<Rodal
                visible={showInvalidFileModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box qa-alert-box"
            >
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowInvalidFileModal(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper">
                    <img
                        width={35}
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    {/* <SandClockLoader /> */}
                    <p className="qa-invalid-file-heading">{t("each_new_line_4_wrds_500_chars")}</p>
                    <p className="qa-sub-heading">{t('invalid_file')}</p>
                    <ul className="qa-invalid-file-list">
                        {
                            qaInvalidFiles !== null &&
                            qaInvalidFiles?.map((each, ind) => (
                                <li key={ind}>{each}</li>
                            ))
                        }
                    </ul>
                    <div className='ok_btn'>
                        <ButtonBase onClick={(e) => { setShowInvalidFileModal(false) }}>
                            <a className="ai-alert-btn" target="_blank">
                                {t("ok")}
                            </a>
                        </ButtonBase>
                    </div>
                </div>
            </Rodal>)}
        </React.Fragment>
    );
}

export default Settings;
