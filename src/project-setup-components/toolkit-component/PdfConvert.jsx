import React, { useState, useEffect, createRef, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Config from "../../vendor/Config";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DragandDrop from "../../vendor/DragandDrop";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Sourcelanguage from "../../vendor/lang-modal/Sourcelanguage";
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Select, { components } from "react-select";
import CachedIcon from '@mui/icons-material/Cached';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Cookies from "js-cookie";
import { SandClockLoader } from "../../loader/SandClockLoader";
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SimpleRodals from "../rodals/SimpleRodals";
import Tooltip from '@mui/material/Tooltip';

// mui icon
import CloseIcon from '@mui/icons-material/Close';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import InsuffientIcon from "../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../assets/images/new-ui-icons/remove_circle_red.svg"
import PdfIcon from "../../assets/images/pdf-icon.svg"
import ReactRouterPrompt from 'react-router-prompt'

const PdfConvert = (props) => {
    const {
        setSidebarActiveTab
    } = props

    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const [didMount, setDidMount] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [settingsFileUploadLoading, setSettingsFileUploadLoading] = useState(false);
    const [pdfListResetForm, setPdfListResetForm] = useState(true);
    const [sourceLabel, setSourceLabel] = useState(t("file_language"));
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [error, setError] = useState({ inputText: "", sourceLanguage: "", targetLanguage: "" });
    const [projectName, setProjectName] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [convertLoading, setConvertLoading] = useState();
    const [files, setFiles] = useState([]);
    const [convertSingle, setConvertSingle] = useState(null);
    const [editFiles, setEditFiles] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const [showLongFileAlertModal, setShowLongFileAlertModal] = useState(false);
    const [conversionPendingState, setConversionPendingState] = useState(false);
    const [fileTypeOptionsSelect, setFileTypeOptionsSelect] = useState([]);
    // const [multipleFileIdList, setPdfDownloadRequestData] = useState([]);
    const [pdfDownloadRequestID, setPdfDownloadRequestID] = useState([]);
    const [uploadFileList, setUploadFileList] = useState([]);
    const [pdfDownloadRequestIdStatus, setpdfDownloadRequestIdStatus] = useState("");
    const [showConvertProgress, setShowConvertProgress] = useState(false);
    const [showErrorStatus, setShowErrorStatus] = useState(false);
    const [pdfDownloadUrl, setPdfDownloadUrl] = useState("");
    const [pdfConvertedListWrapper, setPdfConvertedListWrapper] = useState(false);
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)
    const [lastLocation, setLastLocation] = useState(null)
    const [confirmedNavigation, setConfirmedNavigation] = useState(false)

    const [validationState, setValidationState] = useState({
        projectName: false,
        files: true
    })
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null);

    const [fileCheckTrigger, setFileCheckTrigger] = useState(false)
    const [isFileConverting, setIsFileConverting] = useState(false)
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [pdfUploadPercentage, setpdfUploadPercentage] = useState(0)

    const [isUploading, setIsUploading] = useState(null)

    const [uploadedFileList, setuploadedFileList] = useState([])
    const [selectedPdfObj, setSelectedPdfObj] = useState(null)

    const searchAreaRef = useRef(null);
    const targetLanguageOptionsRef = useRef([]);
    const multipleFileIdList = useRef([]);
    const idResponseData = useRef([]);
    const converStatus = useRef("multiple");
    const contentprojectNameRef = useRef();
    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const deletedEditFileIds = useRef([]);

    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)

    const pdfIdListRef = useRef(null)
    const longFileModal = useRef(null)
    const pdfFileBrowserRef = useRef(null)

    const allPDFList = useRef(null)
    const fileListId = useRef([])
    const calledFunction = useRef(null)
    const checkFileStatusTimeoutRef = useRef(null)

    const fileCheckTriggerTimeoutRef = useRef(null)
    const pdfInProcessingList = useRef([])

    const [pdffilesList, setPdfFilesList] = useState([])

    const customMtSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
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
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: state.isFocused ? "#EBEBEB" : "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            width: "100%",
            boxShadow: 0,
            height: 39,
            width: "150px",
            "&:hover": {
                background: "#EBEBEB"
            },
        }),
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

    const modaloption = {
        closeMaskOnClick: false,
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
    };

    /* Get source language options */
    const getSourceLanguages = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setSourceLanguageOptions(response.data);
            },
        };
        Config.axios(params);
    };

    useEffect(() => {
        setDidMount(true);
        getSourceLanguages();
    }, []);

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            history(lastLocation.pathname)
        }
    }, [confirmedNavigation, history, lastLocation])


    const handleBlockedNavigation = nextLocation => {
        if (!confirmedNavigation && location.pathname) {
            if (nextLocation.hash != "#!") {
                setNavigationModalVisible(true)
                setLastLocation(nextLocation)
                setSidebarActiveTab(4)
                return false;
            }
        }
        return true;
    }

    const handleConfirmNavigationClick = () => {
        setNavigationModalVisible(false)
        setConfirmedNavigation(true)
    }

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        let elements = document.getElementsByClassName('list selected')
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected')
        }
        e.target.classList.add("selected")
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setError({ ...error, sourceLanguage: "" });
        setSearchInput('')
        setOnFocusWrap(false)
    };

    const handleProjectNamechange = (e) => {
        setProjectName(e.target.innerText);
        setValidationState({ ...validationState, projectName: false })
    };

    const removeTempFile = (id) => {
        setEditFiles(editFiles.filter(each => each.id !== id))
    }

    useEffect(() => {
        contentprojectNameRef.current?.focus();
        setHasFocus(true);
    }, [contentprojectNameRef]);

    const handleHideIcon = () => {
        contentprojectNameRef.current?.focus();
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
        //Also check handleChange
        let thisFiles = filesTemp
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (ext !== ".pdf") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }
        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if (
                filesTemp[eachKey].size / 1024 / 1024 <=
                allowedSingleFileSize.current
            ) {
                fileList.push(filesTemp[eachKey]);
                setSettingsFileUploadLoading(false)
            }
            else Config.toast(singleFileSizeError.current, "error");

        });
        setFiles(fileList)
        let list = []
        fileList?.map(each => {
            list.push({
                name: each.name,
            })
        })
        setValidationState({ ...validationState, files: false })
    };


    const handleChange = (e) => {
        let thisFiles = e.target.files;
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (ext !== ".pdf") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }
        let fileList = [...files];
        Object.keys(thisFiles).map((eachKey) => {
            // console.log(thisFiles[eachKey].size / 1024 / 1024)
            if (
                thisFiles[eachKey].size / 1024 / 1024 <=
                allowedSingleFileSize.current
            ) {
                fileList.push(thisFiles[eachKey]);
                setSettingsFileUploadLoading(false)
            } else Config.toast(singleFileSizeError.current, "error");
        });
        setFiles(fileList)
        let list = []
        fileList?.map(each => {
            list.push({
                name: each.name,
            })
        })
        pdfFileBrowserRef.current.value = null
        setValidationState({ ...validationState, files: false })
    }


    // destructure and store desired values as key value pair (object)
    useEffect(() => {
        // console.log(files)
        if (files?.length !== 0) {
            let newArr = files?.map(each => {
                return {
                    file_name: each.name,
                    file_size: each.size,
                    actual_file: each,
                    upload_progress: 0
                }
            })
            // console.log(newArr)
            setFiles([])
            let a = pdffilesList.concat(newArr)
            setPdfFilesList(a)
        }
    }, [files])

    useEffect(() => {
        if (pdffilesList?.length !== 0) {
            // console.log(pdffilesList)
            if (pdffilesList?.filter(each => each.upload_progress === 0)?.length !== 0) {
                uploadFile()?.then((response) => {
                    // console.log([...response.data, ...uploadFileList])
                    setIsUploading(false)
                    clearTimeout(longFileModal.current)
                    clearTimeout(fileCheckTriggerTimeoutRef.current)
                    clearTimeout(checkFileStatusTimeoutRef.current)
                    setUploadFileList([...response.data, ...uploadFileList])
                }).catch((err) => {
                    setIsUploading(false)
                })
            }
        }
    }, [pdffilesList])


    useEffect(() => {
        if (uploadFileList?.length !== 0) {
            setPdfFilesList([])
        }
    }, [uploadFileList])


    /* Delete files when editing */
    const deleteEditFile = (e, canDelete = false, editFileId) => {
        let editFilesTemp = editFiles;
        let deleteValue = editFiles.find((element) => element.id == editFileId);
        setEditFiles(Config.removeItemFromArray(editFilesTemp, deleteValue));
        let deletedEditFileIdsTemp = deletedEditFileIds.current;
        deletedEditFileIdsTemp.push(editFileId);
        deletedEditFileIds.current = deletedEditFileIdsTemp;
    };


    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        let newArr = pdffilesList?.map(obj => {
            if (obj?.upload_progress !== 100) {
                return {
                    ...obj,
                    upload_progress: percent
                }
            }
            return obj;
        })
        // console.log(newArr)
        setPdfFilesList(newArr)
    };

    const uploadFile = (file) => {
        setIsUploading(true)
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        const url = `${Config.BASE_URL}/exportpdf/convertpdftodocx/`;

        const formData = new FormData();

        pdffilesList?.map(each => {
            if (each?.upload_progress === 0) {
                formData.append("pdf_request_file", each?.actual_file);
            }
        })

        return axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            onUploadProgress,
        });
    };


    const convertAll = () => {
        let fileIdList = ""
        let remainingFiles = uploadFileList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR" && each?.status !== "PENDING")
        // console.log(remainingFiles);
        remainingFiles?.map((each, index) => {
            fileIdList += `${each?.id}${index !== remainingFiles?.length - 1 ? "&id=" : ""}`
        })

        const newArr = uploadFileList?.map(obj => {
            if (obj.id === remainingFiles?.find(each => each.id == obj.id)?.id) {
                return {
                    ...obj,
                    animate: true,
                    status: 'PENDING'
                };
            }
            return obj;
        });
        setUploadFileList(newArr);
        // console.log(remainingFiles);
        // console.log(fileListId.current);

        let UpdatedIdList = []
        Config.axios({
            url: Config.BASE_URL + "/exportpdf/convert?id=" + fileIdList,
            auth: true,
            success: (response) => {
                // console.log(Object.keys(response.data));
                // console.log(Object.keys(response.data)?.map(Number));

                fileListId.current = Object.keys(response.data)?.map(Number)
                // console.log(fileListId.current);
                calledFunction.current = 'convert-all'
                setIsFileConverting(true)
                setTimeout(() => {
                    checkFileStatus()
                }, 2800);
                // longFileModal.current = setTimeout(() => {
                //     setShowLongFileAlertModal(true)
                // }, 70000);
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('pdf_corrupted')) {
                        setIsFileConverting(false)
                        const newArr = uploadFileList?.map(obj => {
                            if (obj.id === remainingFiles?.find(each => each.id == obj.id)?.id) {
                                return {
                                    ...obj,
                                    animate: true,
                                    status: 'PENDING'
                                };
                            }
                            return obj;
                        });
                        setUploadFileList(newArr);
                    }
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true)
                        const newArr = uploadFileList?.map(obj => {
                            if (obj.id === remainingFiles?.find(each => each.id == obj.id)?.id) {
                                return {
                                    ...obj,
                                    animate: false,
                                    status: 'YET TO START'
                                };
                            }
                            return obj;
                        });
                        setUploadFileList(newArr);
                    }
                }
            }
        });
    }

    const SingleConvert = async (id) => {
        setConvertLoading(true)
        setConvertSingle(id)
        converStatus.current = "Single"
        let UpdatedIdList = ""

        const newArr = uploadFileList?.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    animate: true,
                    status: 'PENDING'
                };
            }
            return obj;
        });
        setUploadFileList(newArr);
        setIsFileConverting(true)

        pdfInProcessingList.current.push(id)

        Config.axios({
            url: Config.BASE_URL + "/exportpdf/convert?id=" + id,
            auth: true,
            success: (response) => {
                if (response.data[id]?.includes('pdf corrupted')) {
                    console.log(uploadFileList)
                    pdfInProcessingList.current = pdfInProcessingList.current.filter(each => each !== id)
                    const newArr = uploadFileList?.map(obj => {
                        if (obj.id === id) {
                            return {
                                ...obj,
                                animate: false,
                                status: 'ERROR'
                            };
                        }
                        return obj;
                    });
                    // console.log(newArr)
                    setUploadFileList(newArr);
                    return;
                }
                UpdatedIdList = Object.keys(response.data)
                // getUploadFileList(parseInt(UpdatedIdList))
                idResponseData.current = parseInt(UpdatedIdList)
                // fileListId.current = id
                fileListId.current?.push(id)
                calledFunction.current = 'single'
                setTimeout(() => {
                    checkFileStatus()
                }, 2800);
                // longFileModal.current = setTimeout(() => {
                //     setShowLongFileAlertModal(true)
                // }, 30000);
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('pdf_corrupted')) {
                        setShowCreditAlertModal(true)
                        pdfInProcessingList.current = pdfInProcessingList.current.filter(each => each !== id)
                        const newArr = uploadFileList?.map(obj => {
                            if (obj.id === id) {
                                return {
                                    ...obj,
                                    animate: false,
                                    status: 'YET TO START'
                                };
                            }
                            return obj;
                        });
                        setUploadFileList(newArr);
                    }
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true)
                        pdfInProcessingList.current = pdfInProcessingList.current.filter(each => each !== id)
                        const newArr = uploadFileList?.map(obj => {
                            if (obj.id === id) {
                                return {
                                    ...obj,
                                    animate: false,
                                    status: 'YET TO START'
                                };
                            }
                            return obj;
                        });
                        setUploadFileList(newArr);
                        setIsFileConverting(false)
                    }
                }
            }
        });
    }

    const checkFileStatus = (fileId, param) => {
        let idList = ''
        fileListId.current?.map((each, index) => {
            idList += `${each}${index !== fileListId.current?.length - 1 ? "&id=" : ""}`
        })
        Config.axios({
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx?id=${idList}`,
            auth: true,
            success: (response) => {
                // console.log(response.data);
                // console.log(fileListId.current);

                const newArr = uploadFileList?.map(obj => {
                    if (obj.id == response.data?.find(each => each?.id === obj?.id)?.id) {
                        // console.log("pass")
                        return {
                            ...obj,
                            status: response.data?.find(each => each?.id === obj?.id)?.status != null ? response.data?.find(each => each?.id === obj?.id)?.status : 'PENDING',
                            docx_url_field: response.data?.find(each => each?.id === obj?.id)?.docx_url_field,
                            docx_file_name: response.data?.find(each => each?.id === obj?.id)?.docx_file_name,
                            animate: (response.data?.find(each => each?.id === obj?.id)?.status == "PENDING" ||
                                response.data?.find(each => each?.id === obj?.id)?.status == 'YET TO START') ? true : false
                        };
                    }
                    return obj;
                });
                // console.log(newArr)
                setUploadFileList(newArr);
                fileCheckTriggerTimeoutRef.current = setTimeout(() => {
                    setFileCheckTrigger(!fileCheckTrigger)
                }, 20);
            },
        });
    }

    useEffect(() => {
        if (uploadFileList?.length !== 0) {
            let remainingFiles = uploadFileList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR" && each?.status != null)
            // console.log(remainingFiles)
            pdfInProcessingList.current = remainingFiles.filter(o1 => pdfInProcessingList.current.some(o2 => o1.id === o2));
            if (remainingFiles?.length !== 0) {
                // setTimeout(longFileModal.current)
                setConversionPendingState(true)
                checkFileStatusTimeoutRef.current = setTimeout(() => {
                    checkFileStatus()
                }, 5000);
            } else {
                clearTimeout(longFileModal.current)
                setConversionPendingState(false)
                setIsFileConverting(false)
                // Config.toast('Conversion completed')
            }
        }
    }, [fileCheckTrigger])

    const handleReset = () => {
        setUploadFileList([])
        setFiles([])
        setSourceLanguage("")
        setSourceLabel(t("file_language"))
        setPdfConvertedListWrapper(false);
    }


    const downloadFileFromApi = (url) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
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

    // download convert docx file 
    const downloadConvertDocxFile = async (taskID) => {
        let url = `${Config.BASE_URL}/exportpdf/docx_file_download/?id=${taskID}`
        const response = await downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    }

    const openWriter = (id, name) => {
        if (id !== undefined) {
            history(`/word-processor?pdf-id=${id}`, {state: { docName: name, from: "My PDF", prevPath: location.pathname + location.search }})
        } else {
            Config.toast(t("file_view_again_wrap"))
        }
    }

    const handlePdfTranslateBtn = (id, docx_file_name) => {
        setSelectedPdfObj({ id, filename: docx_file_name })
        // setProjectUpdateModal(true)
    }

    const handlePdfFileUpload = async () => {
        setIsLoading(true)
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        let formdata = new FormData();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        for (let x = 0; x < files.length; x++) {
            if (typeof files[x] != "undefined")
                formdata.append("pdf_request_file", files[x]);
        }
        // formdata.append("file_language", sourceLanguage);

        // uploadFile().then((response) => {
        //     console.log(response.data);
        // });

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: myHeaders,
        };
        let IdList = []
        let data = await fetch(`${Config.BASE_URL}/exportpdf/convertpdftodocx/`, requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            setIsLoading(false);
            setUploadFileList(response);
            response?.map(each => {
                IdList.push(each?.id)
            })
            // multipleFileIdList.current = IdList
            setPdfConvertedListWrapper(true);
        }
    }

    // useEffect(() => {
    //   console.log(pdfInProcessingList.current)
    // }, [pdfInProcessingList.current])


    return (
        <React.Fragment>
            <div className="ai-working-area-glb-wrapper">
                <div className="file-trans-breadcrumbs-section">
                    <div className="d-flex align-items-center justify-content-between pdf-convert-header">
                        <Breadcrumbs />
                        <div className="d-flex align-items-center">
                            <ArticleOutlinedIcon className="icons" />
                            <Link to="/create/tool-kit/pdf/pdf-list?page=1">{t("view_pdf_converted_docx_files")}</Link>
                        </div>
                    </div>
                    <div className="pdf-convert-area-wrapper">
                        {
                            !pdfConvertedListWrapper ?
                                <>
                                    <h2 className="pdf-header">{t('upload_files')}<span className="asterik-symbol">*</span></h2>
                                    <div className={(files.length > 0 || editFiles?.length > 0) ? "fileloaded pdf-convert-wrapper" : "pdf-convert-wrapper"}  >
                                        {
                                            <DragandDrop handleDrop={handleDrop}>
                                                {
                                                    settingsFileUploadLoading &&
                                                    <div className="dragging-main-wrapper opac-25">
                                                        <div className="dragging-inner-wrapper">
                                                            <SandClockLoader />
                                                        </div>
                                                    </div>
                                                }
                                                <div className={(files.length > 0 || editFiles?.length > 0) ? "upload-audio-work-area h-25 fileloaded" : 'upload-audio-work-area'}>
                                                    <div className="file-drop-area-wrapper">
                                                        <img className={(files.length > 0 || editFiles?.length > 0) && 'img'} src={PdfIcon} alt="voice-upload-icon" />
                                                        <div className="content-wrapper">
                                                            <div className="content-one-info">
                                                                <span className="txt">{t("drop_your_pdf_files")}</span>
                                                                <div className="voice-file-manual-upload">
                                                                    {
                                                                        isUploading ? (
                                                                            <label className="pdf-uploading-dots">{t("uploading")}</label>
                                                                        ) : (
                                                                            <label htmlFor="pdf-file">{t("browse")}</label>
                                                                        )
                                                                    }

                                                                    <input type="file" ref={pdfFileBrowserRef} name="pdf-file" id="pdf-file" accept="application/pdf" onChange={handleChange} multiple hidden />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DragandDrop>
                                        }
                                        <div className="audio-file-list-wrapper">
                                            {/* uploading pdf list  */}
                                            {
                                                pdffilesList?.map((item, index) => {
                                                    return (
                                                        <div className="audio-file-list-item" key={item.index}>
                                                            <div className="file-info-wrapper">
                                                                <img
                                                                    src={
                                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                                        item.file_name.split(".").pop()
                                                                    }
                                                                    alt="document"
                                                                />
                                                                <div className="file-name-wrap">
                                                                    <span className="title">{item.file_name}</span>
                                                                    <small>{niceBytes(item.file_size)}</small>
                                                                </div>
                                                            </div>

                                                            <div className="workspace-progress-bar-part-setup">
                                                                <div className="progress-bar-file-completion-project-setup" style={{ width: '200px' }}>
                                                                    <div className="progress-file-completion-project-setup">
                                                                        <div
                                                                            className="bar-file-completion"
                                                                            style={{
                                                                                width: item?.upload_progress + "%",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <div className="progress-txt border-right-add file-progress-txt">
                                                                    <span>{item?.upload_progress}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* uploaded pdf list */}
                                            <div className="file-conversion-list-wrapper">
                                                <div className="audio-file-list-wrapper">
                                                    {
                                                        uploadFileList?.map((item) => {
                                                            console.log(item)
                                                            console.log(pdfInProcessingList.current.find(each => each === item.id))
                                                            return (
                                                                <div className="audio-file-list-item" key={item?.id}>
                                                                    <div className="file-info-wrapper">
                                                                        {
                                                                            item?.docx_url_field !== null && item?.docx_url_field !== undefined && item.docx_file_name !== null ?
                                                                                <img
                                                                                    src={
                                                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                                                        item.docx_file_name?.split(".")?.pop()
                                                                                    }
                                                                                    alt="document"
                                                                                />
                                                                                :
                                                                                <img
                                                                                    src={
                                                                                        `${Config.BASE_URL}/app/extension-image/` +
                                                                                        item?.pdf_file_name?.split(".")?.pop()
                                                                                    }
                                                                                    alt="document"
                                                                                />
                                                                        }

                                                                        <div className="file-name-wrap">
                                                                            <span className="title">
                                                                                {
                                                                                    item?.docx_url_field !== null && item?.docx_url_field !== undefined && item.docx_file_name !== null ?
                                                                                        item.docx_file_name
                                                                                        :
                                                                                        item?.pdf_file_name
                                                                                }

                                                                            </span>
                                                                            {/* <small>{each?.pdf_id}</small> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="pdf-convert-action-area">
                                                                        <div className="processing-convert-area">
                                                                            {item?.docx_url_field !== null && item.status === "DONE" ?
                                                                                <span className="converted">{t("converted")}</span>
                                                                                :
                                                                                (item?.docx_url_field === null && item.status === "ERROR") ?
                                                                                    <span className="failure">{t("failure")}</span>
                                                                                    : (item?.animate !== undefined && item?.animate) ?
                                                                                        <span className="process">{t("processing")}</span>
                                                                                        :
                                                                                        ""
                                                                            }
                                                                        </div>
                                                                        <div className="download-reload-area">
                                                                            {
                                                                                (item?.docx_url_field !== null && item?.docx_url_field !== undefined) ? (
                                                                                    <>
                                                                                        <Tooltip title={t("download")} placement="top">
                                                                                            <span onClick={() => downloadConvertDocxFile(item.id)} className="download">
                                                                                                <FileDownloadOutlinedIcon className="icons" />
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                        <Tooltip title={t("view_docx_writer")} placement="top">
                                                                                            <button className="convert-pdf-ViewProjectButton" type="button" onMouseUp={() => openWriter(item?.id, item?.docx_file_name)}>
                                                                                                <span className="fileopen-new-btn">{t("view")}</span>
                                                                                            </button>
                                                                                        </Tooltip>
                                                                                    </>
                                                                                )
                                                                                    :
                                                                                    (
                                                                                        (item?.animate !== undefined && item?.animate) ? (
                                                                                            <button className="pdfconvert-TranslateButton">
                                                                                                <span className="trans-btn-txt-convert">
                                                                                                    <CachedIcon className="reload-icon rotate" />
                                                                                                    {t("converting")}
                                                                                                </span>
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button className="pdfconvert-TranslateButton"
                                                                                                onClick={(e) => SingleConvert(item.id)}
                                                                                                style={item.status === "ERROR" ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                            >
                                                                                                <span className="trans-btn-txt-convert">
                                                                                                    {t("convert")}
                                                                                                </span>
                                                                                            </button>
                                                                                        )
                                                                                    )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            uploadFileList?.length > 1 && (
                                                <div className="pdf-convert-all-btn-wrapper">
                                                    {
                                                        uploadFileList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR")?.length !== 0 ? (
                                                            <button className="pdfconvert-TranslateButton"
                                                                onClick={convertAll}
                                                                disabled={isFileConverting}
                                                            >
                                                                <span className="trans-btn-txt">
                                                                    {t("convert_all")}
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            // <p className="convert-success"><CheckCircleOutlineOutlinedIcon className="done-icon"/> Converted</p>
                                                            <p className="convert-success"></p>

                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <div className="file-conversion-list-wrapper">
                                        <div className="audio-file-list-wrapper">
                                            {
                                                uploadFileList?.map((item) => {
                                                    return (
                                                        <div className="audio-file-list-item" key={item?.id}>
                                                            <div className="file-info-wrapper">
                                                                {
                                                                    item?.docx_url_field !== null && item?.docx_url_field !== undefined && item.docx_file_name !== null ?
                                                                        <img
                                                                            src={
                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                item.docx_file_name?.split(".")?.pop()
                                                                            }
                                                                            alt="document"
                                                                        />
                                                                        :
                                                                        <img
                                                                            src={
                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                item?.pdf_file_name?.split(".")?.pop()
                                                                            }
                                                                            alt="document"
                                                                        />
                                                                }

                                                                <div className="file-name-wrap">
                                                                    <span className="title">
                                                                        {
                                                                            item?.docx_url_field !== null && item?.docx_url_field !== undefined && item.docx_file_name !== null ?
                                                                                item.docx_file_name
                                                                                :
                                                                                item?.pdf_file_name
                                                                        }

                                                                    </span>
                                                                    {/* <small>{each?.pdf_id}</small> */}
                                                                </div>
                                                            </div>
                                                            <div className="pdf-convert-action-area">
                                                                <div className="processing-convert-area">
                                                                    {item?.docx_url_field !== null && item.status === "DONE" ?
                                                                        <span className="converted">{t("converted")}</span>
                                                                        :
                                                                        (item?.docx_url_field === null && item.status === "ERROR") ?
                                                                            <span className="failure">Failure</span>
                                                                            : (item?.animate !== undefined && item?.animate && pdfInProcessingList.current.find(each => each === item.id)) ?
                                                                                <span className="process">{t("processing")}</span>
                                                                                :
                                                                                ""
                                                                    }
                                                                </div>
                                                                <div className="download-reload-area">
                                                                    {
                                                                        item?.docx_url_field !== null && item?.docx_url_field !== undefined ? (
                                                                            <>
                                                                                <Tooltip title={t("download")} placement="top">
                                                                                    <span onClick={() => downloadConvertDocxFile(item.id)} className="download">
                                                                                        <FileDownloadOutlinedIcon className="icons" />
                                                                                    </span>
                                                                                </Tooltip>
                                                                                <Tooltip title={t("view_docx_writer")} placement="top">
                                                                                    <button className="convert-pdf-ViewProjectButton" type="button" onMouseUp={() => openWriter(item?.id, item?.docx_file_name)}>
                                                                                        <span className="fileopen-new-btn">{t("view")}</span>
                                                                                    </button>
                                                                                </Tooltip>
                                                                                {/* {
                                                                            item?.pdf_api_use === 'google-ocr' ? (
                                                                                <>
                                                                                    <Tooltip title={t("view_docx_writer")} placement="top">
                                                                                        <button className="convert-pdf-list-ViewProjectButton" type="button" onMouseUp={() =>  openWriter(item?.id, item?.docx_file_name)}>
                                                                                            <span className="fileopen-new-btn">View</span>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </>
                                                                            ) : (
                                                                                item?.pdf_api_use === 'convertio' ? (
                                                                                    <>
                                                                                        <Tooltip title="Create or update to a translation project" placement="top">
                                                                                            <button className="convert-pdf-list-OpenProjectButton" type="button" onMouseUp={() =>  handlePdfTranslateBtn(item?.id, item?.docx_file_name)}>
                                                                                                <span className="fileopen-new-btn">Translate</span>
                                                                                            </button>
                                                                                        </Tooltip>
                                                                                    </>
                                                                                ) : null
                                                                            )
                                                                        } */}
                                                                            </>
                                                                        )
                                                                            :
                                                                            (
                                                                                (item?.animate !== undefined && item?.animate && pdfInProcessingList.current.find(each => each === item.id)) ? (
                                                                                    <button className="pdfconvert-TranslateButton">
                                                                                        <span className="trans-btn-txt-convert">
                                                                                            <CachedIcon className="reload-icon rotate" />
                                                                                            {t("converting")}
                                                                                        </span>
                                                                                    </button>
                                                                                ) : (
                                                                                    <button className="pdfconvert-TranslateButton"
                                                                                        onClick={(e) => SingleConvert(item.id)}
                                                                                        style={item.status === "ERROR" ? { opacity: 0.7, pointerEvents: 'none' } : {}}
                                                                                    >
                                                                                        <span className="trans-btn-txt-convert">
                                                                                            {t("convert")}
                                                                                        </span>
                                                                                    </button>
                                                                                )
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="ai-action-cont-wrapper pdf-convert-button-wrapper">
                                        <div className="ai-sl-tl-wrapper">
                                            <div className="lang-file-wrapper">
                                                <p className="lang-title">{t("file_language")}:</p>
                                                <p className="lang">{sourceLabel}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="ai-btn-and-txt-cont mr-2">
                                                {
                                                    uploadFileList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR")?.length !== 0 ? (
                                                        <button className="pdfconvert-TranslateButton"
                                                            onClick={convertAll}
                                                            disabled={isFileConverting}
                                                        >
                                                            <span className="trans-btn-txt">
                                                                {t("convert_all")}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        // <p className="convert-success"><CheckCircleOutlineOutlinedIcon className="done-icon"/> Converted</p>
                                                        <p className="convert-success"></p>

                                                    )
                                                }
                                            </div>
                                            <div className="ai-btn-and-txt-cont">
                                                <button className="pdfconvert-TranslateButton" disabled={isFileConverting} onMouseUp={handleReset}>
                                                    <span className="trans-btn-txt">
                                                        {t("process_another_pdf")}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-end mt-4">
                        <div className="content-two-info">
                            <span className="max-file-note">
                                {t("file_translate_note_3")}: <span>100 MB</span>
                            </span>
                        </div>
                    </div>
                </div>
                <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
            </div>
            <SimpleRodals
                setShowLongFileAlertModal={setShowLongFileAlertModal}
                showLongFileAlertModal={showLongFileAlertModal}
            />
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
                        onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false) }}
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

            {/* <Prompt
                when={conversionPendingState}
                message={handleBlockedNavigation}
            /> */}
            <ReactRouterPrompt when={conversionPendingState}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        visible={isActive}
                        {...modaloption}
                        showCloseButton={false}
                        className="ai-mark-confirm-box"
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("leave_page_confirm_head")}</div>
                                <div>{t("conversion_leave_prompt_note")}</div>
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
        </React.Fragment>
    )
};

export default PdfConvert;