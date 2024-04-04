import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Select, { components } from "react-select";
import Config from "../../Config";
import ButtonBase from '@mui/material/ButtonBase';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from "react-i18next";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import Breadcrumbs from "../Breadcrumbs";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import axios from "axios";
import Cookies from "js-cookie";
// import SimpleRodals from "../rodals/SimpleRodals";
// import { ButtonLoader } from "../../loader/CommonBtnLoader";
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import { AsyncPaginate } from "react-select-async-paginate";
import ArrowRightGreyColor from "../../assets/images/new-create-hub/arrow_right_grey_color.svg"
import ArrowRightAltColor from "../../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import PaginationLeft  from "../../assets/images/new-ui-icons/pagination-left.svg";
import PaginationRight  from "../../assets/images/new-ui-icons/pagination-right.svg";
import ChangeRequest from "../../assets/images/change-request.svg"
import PlusIcon from "../../assets/images/new-ui-icons/plus.svg"
import TranscriptionIcon from "../../assets/images/new-project-setup/transcription.svg"
import SpeechWhiteIcon from "../../assets/images/new-project-setup/speech-icon-white.svg"
import InstantTranslateIcon from "../../assets/images/instant-translate-icon.svg"
import UnopenedProjSymbol from "../../assets/images/new-unopened-proj-symbol.svg"
import BlogArticleIcon from "../../assets/images/blog-article.svg"
import BlogArticleWizardIcon from "../../assets/images/blog-wizard.svg"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import StackedBarChartBlue from "../../assets/images/new-ui-icons/stacked_bar_chart_blue.svg"
import InsuffientIcon from "../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../assets/images/new-ui-icons/remove_circle_red.svg"
import AssetsDeleteIcon from "../../assets/images/new-ui-icons/assets-delete-icon.svg"
import SearchBarClose from "../../assets/images/assign-page/search-bar-close.svg"
import ChatSearch from "../../assets/images/chat/chat-search.svg"
import NoEditorIcon from "../../assets/images/no-editors-found-2.svg"
import EmptyProjectIcon from "../../assets/images/empty-projects-folder.svg"
import ConfirmIcon from "../../assets/images/new-ui-icons/confirm-icon.svg"

const ConvertedPdfList = (props) => {
    const location = useLocation();
    const history = useNavigate();
    const { t } = useTranslation();

    const [didMount, setDidMount] = useState(false);
    const [allPDFtoDocxList, setAllPDFtoDocxList] = useState([]);
    const [convertLoading, setConvertLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [pdfSelectedFileName, setPdfSelectedFileName] = useState("");
    const [pdfSelectedFileId, setPdfSelectedFileId] = useState("");
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [showPendingStatus, setShowPendingStatus] = useState(false);
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [showListingLoader, setShowListingLoader] = useState(false);
    const [convetedPdfListSearch, setConvertedPdfListSearch] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [showLongFileAlertModal, setShowLongFileAlertModal] = useState(false);
    const [convetedPdfSearchTerm, setConvertedPdfSearchTerm] = useState("");
    const [paginationContent, setPaginationContent] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilterType, setStatusFilterType] = useState(null)
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null);
    const [showConvertProgress, setShowConvertProgress] = useState(false);
    const [showErrorStatus, setShowErrorStatus] = useState(false);
    const [sortEl, setSortEl] = useState(null);
    const [selectedSortValue, setselectedSortValue] = useState('-id')
    const [fileCheckTrigger, setFileCheckTrigger] = useState(false)
    const [allPDFFileList, setAllPDFFileList] = useState([])
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [taskActionOpen, setTaskActionOpen] = useState(false);
    const [taskActionAnchorEl, setTaskActionAnchorEl] = useState(null)
    const [filesProjectList, setFilesProjectList] = useState(null)
    const [projectUpdateModal, setProjectUpdateModal] = useState(false)
    const [selectedPdfObj, setSelectedPdfObj] = useState(null)
    const [filesProjectListOptions, setFilesProjectListOptions] = useState(null)
    const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState(null)
    const [userTranslateChoice, setUserTranslateChoice] = useState('new')

    const searchTermRef = useRef(null)
    const projectsPerPage = useRef(20);
    const fileUploadTop = createRef();
    const pdfDownloadRequestData = useRef();
    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const statusTypeRef = useRef(null)
    const searchTermCloseOutside = useRef();
    const fileIdList = useRef([])
    const statusCheckTimeoutRef = useRef(null)
    const triggerTimeoutRef = useRef(null)
    const targetLanguageOptionsRef = useRef([]);

    const open = Boolean(sortEl);
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    // const AddProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         borderRadius: "3px",
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: "5px 10px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
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
            width: 150,
            height: 40,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    // const OpeningProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "7px 13.5px",
    //         marginRight: '35px',
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

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
    //         maxWidth: "100%",
    //     },
    //     arrow: {
    //         color: "#2A2A2A",
    //     },
    // })(Tooltip);

    // const AddNewProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         borderRadius: "3px",
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: "10px 30px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const TranslateButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
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

    // const ConvertButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
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

    // const DrpDownArrowButton = withStyles((theme) => ({
    //     root: {
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: 0,
    //         minWidth: 20,
    //         "&:hover": {
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const UploadProjectButton = withStyles((theme) => ({
    //     root: {
    //       backgroundColor: "#0078D4",
    //       boxShadow: "none",
    //       borderRadius: "3px",
    //       textTransform: "none",
    //       padding: "12.5px 21px",
    //       "&:hover": {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //       },
    //     },
    //   }))(Button);

    // const OpenProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "12px 40.625px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const ViewProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "12px 56.625px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const RemoveButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#EEEEEE",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         color: "#EEEEEE",
    //         padding: "12px 46.625px",
    //         // "&:hover": {
    //         //     backgroundColor: "#0078D4",
    //         //     boxShadow: "none",
    //         // },
    //     },
    // }))(Button);


    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const statusTypes = [
        { value: 'all', label: t("all") },
        { value: 'DONE', label: t("done") },
        { value: 'ERROR', label: t("error") },
        { value: 'PENDING', label: t("process") },
        { value: 'YET TO START', label: 'Yet to start' }
    ]

    const handleSortClick = (e) => {
        setSortEl(e.currentTarget);
    };

    const handleSelectedMenuItem = (e, index, value) => {
        setselectedSortValue(value)
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };

    const orderByOptions = [
        { value: 'pdf_file_name', label: 'A-Z' },
        { value: '-pdf_file_name', label: 'Z-A' },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ]




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


    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height:'auto'
    };

    const handleDrpDownToggle = (e, divId, pdfId, docx_file_name) => {
        e.stopPropagation()
        if(taskActionAnchorEl === null){
            setTaskActionAnchorEl(document.getElementById(divId))
        }else{
            setTaskActionAnchorEl(null)
        }
    };

    const handleDropDownClose = (event) => {
        setTaskActionAnchorEl(null)
    };

    
    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setConvertedPdfListSearch(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });

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
    const downloadConvertDocxFile = async(taskID) => {
        let url = `${Config.BASE_URL}/exportpdf/docx_file_download/?id=${taskID}`
        const response = await downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    } 

    useEffect(() => {
        setDidMount(true)
        getLanguagesList()
    }, [])

    useEffect(() => {
        if(selectedSortValue !== null){
            setAllPDFtoDocxList([])
            getAllPDFList()
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
        }
    }, [selectedSortValue])

    // // filter file list by its status
    useEffect(() => {
        setAllPDFtoDocxList([])
        if(statusFilterType !== null){
            getAllPDFList()
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
            // console.log('from filter');
        }
    }, [statusFilterType])

    const handleStatusFilter = (selected) => {
        setStatusFilterType(selected);
        statusTypeRef.current = selected
        if(statusFilterType?.value != selected?.value){
            pageSelect(1)
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
        }
    };

    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && convetedPdfSearchTerm == ""){
            setConvertedPdfListSearch(false);
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
            e.target.blur()
        }else if(e.which === 13){
            let pageParam = URL_SEARCH_PARAMS.get("page");
            if(pageParam != 1){
                clearTimeout(statusCheckTimeoutRef.current)
                clearTimeout(triggerTimeoutRef.current)
                pageSelect(1)
            }else{
                getAllPDFList()
            }
            setConvertedPdfListSearch(false);
            searchTermRef.current = convetedPdfSearchTerm
            e.target.blur()
        }
    }

    useEffect(() =>{ 
        if(convetedPdfSearchTerm == "" && searchTermRef.current !== null &&isSearchTermDelete){
            setAllPDFtoDocxList([])
            getAllPDFList()
            setIsSearchTermDelete(false)
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
        }
    }, [convetedPdfSearchTerm, isSearchTermDelete])

    useEffect(() =>{ 
        if(convetedPdfSearchTerm == ""){
            getAllPDFList()
            setIsSearchTermDelete(false)
            clearTimeout(statusCheckTimeoutRef.current)
            clearTimeout(triggerTimeoutRef.current)
        }
    }, [convetedPdfSearchTerm])

    const handleCloseSearchBox = () => {
        setConvertedPdfSearchTerm("")
        setConvertedPdfListSearch(false)
        setIsSearchTermDelete(true)
    }



    const getAllPDFList = () => {
        if(showPendingStatus) setShowListingLoader(false);
        else setShowListingLoader(true);
        let list = []
        /* Page param set/get - start */
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            // setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        /* Page param set/get - start */
        let url = `${Config.BASE_URL}/exportpdf/convertpdftodocx?page=${page}`;
        if (convetedPdfSearchTerm) url += `&search=${convetedPdfSearchTerm}`;
        if (selectedSortValue !== null) url += `&ordering=${selectedSortValue}` 
        if(statusFilterType !== null && statusFilterType?.value !== 'all') url += `&status=${statusFilterType?.value}`
        let params = {
            url: url,
            auth: true,
            success: (response) => {
                list = response?.data?.results
                if (list.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setTimeout(() => {
                    setAllPDFtoDocxList(list)
                    setAllPDFFileList(list)
                    setShowConvertProgress(!showConvertProgress)
                }, 200);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                setShowListingLoader(false);
            },
        };
        Config.axios(params);
    }

    // this snippet will check if there is any pending convertion and if present, it starts to call api automatically(checkFileStatus)
    useEffect(() => {
      if(allPDFFileList?.length !== 0) {
        let pendingFiles = allPDFFileList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR" && each?.status != null && each?.status != 'YET TO START')
        // console.log(pendingFiles);
        if(pendingFiles?.length !== 0){
            pendingFiles?.map(each => {
                fileIdList.current?.push(each.id)
            })
            checkFileStatus()
        }
        // console.log(fileIdList.current);
      }
    }, [allPDFFileList])
    

    const SingleConvert = async(id) => {
        const newArr = allPDFtoDocxList?.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    animate: true,
                    status: 'PENDING'
                };
            }
            return obj;
        });
        console.log(newArr);
        setAllPDFtoDocxList(newArr);
        
        Config.axios({
            url: Config.BASE_URL + "/exportpdf/convert?id=" + id,
            auth: true,
            success: (response) => {
                fileIdList.current?.push(id)
                setTimeout(() => {
                    checkFileStatus()
                }, 3500);
                console.log(fileIdList.current);
            },
            error: (err) => {
                if(err.response.status === 400){
                    if(err.response.data?.msg?.includes('Insufficient Credits')){
                        setShowCreditAlertModal(true)
                        const newArr = allPDFtoDocxList?.map(obj => {
                            if (obj.id === id) {
                                return {
                                    ...obj,
                                    animate: false,
                                    status: 'YET TO START'
                                };
                            }
                            return obj;
                        });
                        // console.log(newArr);
                        setAllPDFtoDocxList(newArr);
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
        // console.log(idList);

        if(idList !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/exportpdf/convertpdftodocx?id=${idList}`,
                auth: true,
                success: (response) => {
                    // console.log(response.data);
                    // console.log(fileIdList.current);

                    const newArr = allPDFtoDocxList?.map(obj => {
                        // console.log(response.data?.find(each => each?.id === obj?.id));
                        // console.log(obj.id == response.data?.find(each => each?.id === obj?.id)?.id);
                        if (obj.id == response.data?.find(each => each?.id === obj?.id)?.id) {
                            // console.log("pass")
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
                    console.log(newArr);
                    setAllPDFtoDocxList(newArr);
                    triggerTimeoutRef.current = setTimeout(() => {
                        setFileCheckTrigger(!fileCheckTrigger)
                    }, 20);
                },
            });
        }
    } 

    useEffect(() => {
      if(allPDFtoDocxList?.length !== 0 && fileIdList?.length !== 0){
        let remainingFiles = allPDFtoDocxList?.filter(each => each?.status !== "DONE" && each?.status !== "ERROR" && each?.status != 'YET TO START' && each?.status != null)
        console.log(remainingFiles)
        if(remainingFiles?.length !== 0){
            statusCheckTimeoutRef.current = setTimeout(() => {
                checkFileStatus()
            }, 5000);
        }else{
            // setIsFileConverting(false)
            // Config.toast('Conversion completed')
        }
      }
    }, [fileCheckTrigger])
    

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        setAllPDFtoDocxList([])
        clearTimeout(statusCheckTimeoutRef.current)
        clearTimeout(triggerTimeoutRef.current)
        let url = `/create/tool-kit/pdf/pdf-list?page=${page}`;
        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let orderParam = URL_SEARCH_PARAMS.get("order_by");
        if (orderParam != null) url += `&order_by=${orderParam}`;
        history(url);
    };

    /* Pagination content and logic */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages > 1) {
            let url = "/create/tool-kit/pdf/pdf-list" + "?page=";
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
                    if (!isPrevDotsInserted) content.push(<li style={{cursor: "context-menu"}} key={i}>...</li>);
                    isPrevDotsInserted = true;
                } else if (i + visibleNextPrevPages >= currentPage) {
                    if (!isNextDotsInserted) content.push(<li style={{cursor: "context-menu"}} key={i}>...</li>);
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

    useEffect(() => {
      
    }, [paginationContent])

    /* Show the pagination content a the bottom */
    useEffect(() => {
        if(didMount){
            paginationContentFunction(currentPage);
        }
    }, [totalPages, currentPage]);

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        if(URL_SEARCH_PARAMS.get("page") !== null && URL_SEARCH_PARAMS.get("page") != 'null'){
            getAllPDFList();
        }else if (URL_SEARCH_PARAMS.get("page") == null || URL_SEARCH_PARAMS.get("page") == 'null'){
            // let page = URL_SEARCH_PARAMS.get("page")
            history(`/create/tool-kit/pdf/pdf-list?page=1`)
        }
        fileUploadTop.current?.scrollIntoView(
            {
                behavior: "smooth",
            },
            100
        );
    }, [URL_SEARCH_PARAMS.get("page")]);

    const handleDeleteModal = (id, name) => {
        setShowDeleteFileModal(true);
        setPdfSelectedFileName(name);
        setPdfSelectedFileId(id);
    }

    const handleDeleteConvertedPdf = (id) => {
        let params = {
            url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/${id}/`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                if(response.data.msg === "deleted successfully"){
                    getAllPDFList()
                    setShowDeleteFileModal(false);
                    Config.toast('Deleted successfully')
                }
            },
        };
        Config.axios(params);
    }

    /* Get language options list */
    const getLanguagesList = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data
                // getFilesProjectList()
            },
        };
        Config.axios(params);
    };

    const getFilesProjectList = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace/file_project_list/",
            auth: true,
            success: (response) => {
                // console.log(response.data);
                let arr = []
                response.data?.map(each => {
                    let list = ""
                    each.jobs?.target?.map((eachLang, index) => {
                        list += `${targetLanguageOptionsRef.current?.find(each => each.id === eachLang)?.language}${index !== each.jobs?.target?.length - 1 ? ", " : ""}`;
                    });

                    arr.push({
                        value: each.id,
                        label: `${each.project_name}=>${targetLanguageOptionsRef.current?.find(eachLang => eachLang.id == each.jobs?.source)?.language} -> ${list}`
                    })
                })
                setFilesProjectListOptions(arr)
                setFilesProjectList(response.data)
            }
        });
    } 

    const handlePdfTranslateBtn = (id, docx_file_name) => {
        setSelectedPdfObj({id, filename: docx_file_name})
        setProjectUpdateModal(true)
    } 

    const handleProceedBtn = () => {
        if(userTranslateChoice === 'new'){
            history(`/create/translate/files/translate-files?pdf=${selectedPdfObj?.id}`, {state: {filename: selectedPdfObj?.filename}})
        }else{
            history(`/create/translate/files/translate-files?pdf=${selectedPdfObj?.id}&get-project-info=${selectedProjectToUpdate?.id}&type=${1}`, {state: {filename: selectedPdfObj?.filename}})
        }
    } 
    
    const openWriter = (id, name) => {
        history(`/word-processor?pdf-id=${id}`, {state: {docName: name, from: "My PDF", prevPath: location.pathname + location.search}})
    }



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

    const ValueContainer = ({ children, ...props }) => {
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


    return (
        <React.Fragment>
            <section className="glossaries-list-wrapper" ref={fileUploadTop}>
                <div className="header-align glossary-header pdf-convert">
                    {/* <Breadcrumbs /> */}
                    <div className="pdf-convert-header-wrapper">
                        <div className="header-project-setup-align-wrap">
                            <p className="section-header">Converted</p>
                            <div className="glossary-search-row-new view-glossary-list pdf-list">
                                <div className="glossary-sub-search-row">
                                    <div className={"project-list-search-box " + (convetedPdfListSearch ? "active" : "")}>
                                        <div className="img-box">
                                            <img src={ChatSearch} alt="search-icon" />
                                        </div>
                                        <input 
                                            onClick={() => setConvertedPdfListSearch(true)}
                                            value={convetedPdfSearchTerm}
                                            // autoFocus={convetedPdfSearchTerm ? true : false}
                                            onChange={(e) => setConvertedPdfSearchTerm(e.target.value)}
                                            type="search"
                                            placeholder={`${t("search")}....`}
                                            onKeyUp={(e) => SearchTermFilterEnter(e)}
                                            onFocus={() => setConvertedPdfListSearch(true)}
                                            // onBlur={(e) => {
                                            //     setConvetedPdfListSearch(false);
                                            // }}
                                        />
                                        <span className={"close " + ((convetedPdfListSearch || convetedPdfSearchTerm !== "") ? "show " : " ")}
                                            onClick={() => handleCloseSearchBox()}
                                        >
                                            <img src={SearchBarClose} alt="search-bar-close" />
                                        </span>
                                    </div>
                                    <div ref={searchTermCloseOutside} className={"search-results-bar glossary-proj-list " + (convetedPdfListSearch ? "show" : "hide")}>
                                        <div onClick={(e)=>(convetedPdfSearchTerm !== "" ? getAllPDFList(e) : "")} className={"search-results-item " + (convetedPdfSearchTerm !== "" ? " " : "cursor-change")}>
                                            <SearchIcon className="search-icon" />
                                            <div className="searched-results-info">
                                                <p className="searched-term">{convetedPdfSearchTerm}</p>
                                                {
                                                    convetedPdfSearchTerm !== "" ?
                                                    <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                    :
                                                    <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_convert_list_1")}</span></p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <Select  
                                        options={statusTypes}
                                        isSearchable={false}
                                        styles={customProjectTypeSelectStyles}
                                        classNamePrefix="project-type-list"
                                        placeholder={t("status")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleStatusFilter}
                                    />
                                    <ButtonBase onClick={handleSortClick} className="sorting-icon">
                                        <SortByAlphaIcon className="sort-icon"/>
                                    </ButtonBase>
                                    <Menu
                                        anchorEl={sortEl}
                                        open={open}
                                        onClose={handleDrpDownClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        className="menu-list-wrapper"
                                    >
                                        {orderByOptions.map((option, index) => (
                                            <MenuItem 
                                                className="menu-list-item" 
                                                key={index}
                                                selected={option?.value === selectedSortValue} 
                                                onClick={(e) => handleSelectedMenuItem(e, index, option?.value)}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                                <div className="glossary-view-row">
                                    <ButtonBase className="mydocument-files-AddProjectButton" component={Link} to="/create/tool-kit/pdf/convert-pdf">
                                        <span className="add-project-btn">
                                            <AddIcon
                                                style={{
                                                    width: 20,
                                                    color: "#ffffff"
                                                }}
                                            /> 
                                            Upload PDF
                                        </span>
                                    </ButtonBase>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-files-section converted-pdf-list-wrap">
                    <div id="select-files" className="uploaded-files">
                        <div className="file-edit-heading-row">
                            <div className="file-edit-heading-table">
                                <div className="file-edit-heading-table-row">
                                    <div
                                        // onClick={(e) => orderBy(orderField?.indexOf("-project_name") !== -1 ? "project_name" : "-project_name")}
                                        className="file-edit-heading-table-cell"
                                    >
                                        <div className="listing-table-header-container">
                                            <span>Converted files</span>
                                        </div>
                                    </div>
                                    <div className="file-edit-heading-table-cell">
                                        <div 
                                            // onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} 
                                            className="listing-table-header-container"
                                        >
                                            <span>{t("status")}</span>
                                        </div>
                                    </div>
                                    <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("action")}</div>
                                    </div>
                                </div>
                                <>
                                {allPDFtoDocxList.length != 0 && !showListingLoader ? (
                                        <React.Fragment>
                                        {
                                        (allPDFtoDocxList.length != 0 || statusFilterType !== null || convetedPdfSearchTerm != "")  ? 
                                            (
                                                allPDFtoDocxList.map((item, key) => {
                                                    return (
                                                        <div
                                                            className="file-edit-list-table-row"
                                                            key={item.id}
                                                        >
                                                            <div className="file-edit-list-table-cell-wrap">
                                                                <div className="file-edit-list-table-cell">
                                                                    <div className="proj-title-list-container">
                                                                        {
                                                                            (item.docx_url_field !== null && item.docx_file_name !== null) ?
                                                                            <img
                                                                                src={
                                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                                    item?.docx_file_name?.split(".").pop()
                                                                                }
                                                                                alt="document"
                                                                            />
                                                                            :
                                                                            <img
                                                                            src={
                                                                                `${Config.BASE_URL}/app/extension-image/` +
                                                                                item?.pdf_file_name?.split(".").pop()
                                                                            }
                                                                            alt="document"/>
                                                                        }

                                                                        <div className="proj-list-info">
                                                                            <div className="proj-information">
                                                                                <span
                                                                                    className="file-edit-proj-txt-tmx"
                                                                                >
                                                                                    {
                                                                                        item.docx_url_field !== null && item.docx_file_name !== null ?
                                                                                        item.docx_file_name
                                                                                        :
                                                                                        item.pdf_file_name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="file-edit-list-table-cell">
                                                                    <div className="file-edit-translation-txt word-count">
                                                                        <div className="status-container">
                                                                        <span className="span-dot" style={{ backgroundColor:  (item.status === "ERROR") ?
                                                                                    "#E74C3C"
                                                                                :(item.status === "PENDING") ?
                                                                                    "#ffc021"
                                                                                :(item.status === "DONE") ?
                                                                                    "#1A73E8"
                                                                                :
                                                                                    "#C1C1C1"  }}></span>
                                                                        <span className={(item.status === "ERROR") ? "failure" : (item.status === "PENDING") ? "process" : (item.status === "DONE") ? "converted" : "converted"}>
                                                                            {
                                                                                (item.status === "ERROR") ?
                                                                                    "Failed"
                                                                                :(item.status === "PENDING") ?
                                                                                    "Processing"
                                                                                :(item.status === "DONE") ?
                                                                                    "Converted"
                                                                                :
                                                                                    "Uploaded"
                                                                            }
                                                                        </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="file-edit-list-table-cell">
                                                                    {/* {
                                                                        item?.docx_url_field !== null && (
                                                                            <>
                                                                                <div className="convert-inline-tool-wrapper">
                                                                                <div className="status-conditions-part dont-open-list">
                                                                                    <Tooltip TransitionComponent={Zoom} title="Download" placement="top">
                                                                                        <span className="file-edit-proj-status-txt glossary-status" onClick={() => downloadConvertDocxFile(item.id)}>
                                                                                                <FileDownloadOutlinedIcon className="icons"/>
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                <span className="file-edit-proj-status-txt glossary-status" onClick={() => handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                                    <img
                                                                                        src={AssetsDeleteIcon}
                                                                                        alt="close_black"
                                                                                    />
                                                                                </span>
                                                                            </Tooltip>
                                                                            </div>
                                                                                <Tooltip title="View the docx file in writer" TransitionComponent={Zoom} placement="top">
                                                                                    <button className="convert-pdf-list-ViewProjectButton" type="button" onMouseUp={() =>  openWriter(item?.id, item?.docx_file_name)}>
                                                                                        <span className="fileopen-new-btn">View</span>
                                                                                    </button>
                                                                                </Tooltip>
                                                                            </>
                                                                        )
                                                                    } */}
                                                                    {
                                                                        item?.docx_url_field !== null && (
                                                                            item?.pdf_api_use === 'google-ocr' ? (
                                                                                <>
                                                                                   <div className="convert-inline-tool-wrapper">
                                                                                    <div className="status-conditions-part dont-open-list">
                                                                                        <Tooltip TransitionComponent={Zoom} title="Download" placement="top">
                                                                                            <span className="file-edit-proj-status-txt glossary-status" onClick={() => downloadConvertDocxFile(item.id)}>
                                                                                                    <FileDownloadOutlinedIcon className="icons"/>
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                    <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                    <span className="file-edit-proj-status-txt glossary-status" onClick={() => handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                                        <img
                                                                                            src={AssetsDeleteIcon}
                                                                                            alt="close_black"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>
                                                                                </div>
                                                                                    <Tooltip title="View the docx file in writer" TransitionComponent={Zoom} placement="top">
                                                                                        <button className="convert-pdf-list-ViewProjectButton" type="button" onMouseUp={() =>  openWriter(item?.id, item?.docx_file_name)}>
                                                                                            <span className="fileopen-new-btn">View</span>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </>
                                                                            ) :  item?.pdf_api_use === 'convertio' ? (
                                                                                <>
                                                                                    <div className="convert-inline-tool-wrapper">
                                                                                    <div className="status-conditions-part dont-open-list">
                                                                                        <Tooltip TransitionComponent={Zoom} title="Download" placement="top">
                                                                                            <span className="file-edit-proj-status-txt glossary-status" onClick={() => downloadConvertDocxFile(item.id)}>
                                                                                                    <FileDownloadOutlinedIcon className="icons"/>
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                    <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                        <span className="file-edit-proj-status-txt glossary-status" onClick={() => handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                                            <img
                                                                                                src={AssetsDeleteIcon}
                                                                                                alt="close_black"
                                                                                            />
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                    <Tooltip title="Create or update to a translation project" TransitionComponent={Zoom} placement="top">
                                                                                        <button className="convert-pdf-list-OpenProjectButton" type="button" onMouseUp={() =>  handlePdfTranslateBtn(item?.id, item?.docx_file_name)}>
                                                                                            <span className="fileopen-new-btn">Translate</span>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </>
                                                                            ) : null
                                                                        )
                                                                    }
                                                                    {
                                                                        (item.status === 'ERROR') && 
                                                                        <button className="convert-pdf-list-RemoveButton" type="button" onMouseUp={() =>  handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                            <span className="fileopen-new-btn remove-pdf-button">Remove</span>
                                                                        </button>
                                                                    }
                                                                    {
                                                                        (item.status != null && item.status !== 'PENDING' && item.status !== 'YET TO START') ? (
                                                                            <>
                                                                            <div className="status-conditions-part dont-open-list" style={{ display: "none"}}>
                                                                                <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                    <span className="file-edit-proj-status-txt glossary-status" onClick={() => handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                                        <img
                                                                                            src={AssetsDeleteIcon}
                                                                                            alt="close_black"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </div>
                                                                            </>
                                                                        ) : (
                                                                            (item?.animate !== undefined && item?.animate) ? (
                                                                                <button className="trans-btn-txt-convert" id={item.id}>
                                                                                    <span className="">
                                                                                        <CachedIcon className="reload-icon rotate" />
                                                                                        Converting
                                                                                    </span>
                                                                                </button>
                                                                            ) : (
                                                                                <>
                                                                                    <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                        <span className="file-edit-proj-status-txt glossary-status uploaded" onClick={() => handleDeleteModal(item.id, item?.pdf_file_name)}>
                                                                                            <img
                                                                                                src={AssetsDeleteIcon}
                                                                                                alt="close_black"
                                                                                            />
                                                                                        </span>
                                                                                    </Tooltip>
                                                                                    <button className="trans-btn-txt-convert convert-padding"
                                                                                        id={item.id}
                                                                                        onClick={(e) => SingleConvert(item.id)}
                                                                                    >
                                                                                        <span className=""> 
                                                                                            {/* <CachedIcon className="reload-icon" /> */}
                                                                                            Convert
                                                                                        </span>
                                                                                    </button>
                                                                                </>
                                                                            )
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) 
                                            : 
                                            (
                                                <React.Fragment>
                                                    <section className="ai-no-project-found">
                                                        <div className="ai-no-project-cont">
                                                            {
                                                                convetedPdfSearchTerm ?
                                                                <img 
                                                                    className="empty-folder-img"
                                                                    src={NoEditorIcon} 
                                                                    alt="main-no-project-found"
                                                                />
                                                                :
                                                                <img
                                                                    className="empty-folder-img"
                                                                    src={EmptyProjectIcon}
                                                                    alt="empty-folder-open"
                                                                />
                                                            }

                                                            <h2>{t("pdf_not_found_note")}</h2>
                                                            {
                                                                convetedPdfSearchTerm ?
                                                                null
                                                                :
                                                                <>
                                                                    <button className="workspace-files-AddNewProjectButton"
                                                                        onClick={() => {
                                                                            history("/create/tool-kit/pdf/convert-pdf");
                                                                        }}
                                                                    >
                                                                        <span className="add-new-project-btn">
                                                                            <img src={PlusIcon} alt="plus" /> 
                                                                            Convert a pdf
                                                                        </span>
                                                                    </button>
                                                                </>
                                                            }
                                                        </div>
                                                    </section>
                                                </React.Fragment>
                                            )
                                        }
                                        </React.Fragment>
                                    ) : (
                                        !showEmptyProjects && (
                                            <React.Fragment>
                                                {Array(projectsPerPage?.current)
                                                    .fill(null)
                                                    .map((value, key) => (
                                                        <div className="file-edit-list-table-row" key={key}>
                                                            <div className="file-edit-list-table-cell">
                                                                <div className="d-flex align-items-center">
                                                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                                                    <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={115} />
                                                                </div>
                                                            </div>
                                                            <div className="file-edit-list-table-cell">
                                                                <div className="d-flex align-items-center">
                                                                    <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={100} />
                                                                </div>
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
                                                <div className="project-setup-pagination">
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
                                                </div> 
                                            </React.Fragment>
                                        )
                                    )}
                                </>
                                {showEmptyProjects && (
                                    <React.Fragment>
                                        <section className="ai-no-project-found">
                                            <div className="ai-no-project-cont">
                                                {
                                                    convetedPdfSearchTerm ?
                                                    <img 
                                                        className="empty-folder-img"
                                                        src={NoEditorIcon} 
                                                        alt="main-no-project-found"
                                                    />
                                                    :
                                                    <img
                                                        className="empty-folder-img"
                                                        src={EmptyProjectIcon}
                                                        alt="empty-folder-open"
                                                    />
                                                }
                                                <h2>{t("pdf_not_found_note")}</h2>
                                            </div>
                                        </section>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <div className="project-setup-pagination">
                            <ul>{paginationContent}</ul>
                        </div>
                    </div>
                </div>
                <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
            </section>
            {showDeleteFileModal && (<Rodal
                visible={showDeleteFileModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-wrapper">
                <img
                    src={ConfirmIcon}
                    alt="confirm-icon"
                />
                <h2>Are you sure?</h2>
                <div className="button-row">
                    <button className="mydocument-AiMarkCancel" onClick={() => setShowDeleteFileModal(false)}>
                    <span className="cancel-txt">Cancel</span>
                    </button>
                    <button className="mydocument-AiMarkSubmit" onClick={() => handleDeleteConvertedPdf(pdfSelectedFileId)}>
                    <span className="submit-txt">Delete</span>
                    </button>
                </div>
                </div>
            </Rodal>)}
            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => {setShowCreditAlertModal(false)}}>
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
            {/* Modal to selecting the project to update the file */}
            {projectUpdateModal && (<Rodal visible={projectUpdateModal} height="min-content" showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>Take file to translate</h1>
                        <span onClick={(e) => setProjectUpdateModal(false)}><CloseIcon className="close-icon"/></span>
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
                        /> <label htmlFor="new" className="assign-manage-radio">Create new project</label>
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
                                placeholder="Click to select..."
                                debounceTimeout={500}
                                hideSelectedOptions={false}
                                menuPlacement="auto"
                                isSearchable={true}
                                additional={{
                                    page: 1,
                                }}
                            />
                            {/* <Select
                                options={filesProjectListOptions}
                                defaultValue={filesProjectListOptions !== null && filesProjectListOptions[0]}
                                value={selectedProjectToUpdate}
                                onChange={handleProjectUpdateSelect}
                                styles={customStepSelectStyles}
                                classNamePrefix="steps-select"
                                hideSelectedOptions={false}
                                placeholder="Click to select..."
                                components={{ Option, ValueContainer, DropdownIndicator, IndicatorSeparator: () => null }}
                                isSearchable={false}
                            /> */}
                        </div>
                    }
                </div>
                <div className="footer-area-wrapper justify-content-end" style={{padding: '0px 30px 15px 30px'}}>
                    <div className="term-edit-btn-row">
                        <button className="convert-pdf-list-UploadProjectButton" onMouseUp={handleProceedBtn}>
                            <span className="fileupload-new-btn">
                            Proceed
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
        </React.Fragment>
    );
};

export default ConvertedPdfList;