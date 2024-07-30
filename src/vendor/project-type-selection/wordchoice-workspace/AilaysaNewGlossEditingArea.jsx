import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import Config from '../../Config';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Navbar from '../../Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { ButtonLoader } from '../../../loader/CommonBtnLoader';
import { ArrowDropDown } from "@mui/icons-material";
import Select, { components } from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from '../../../features/FileDownloadingListSlice';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { BulkFileUploadModal } from './BulkFileUploadModal';
import TranslateIcon from '@mui/icons-material/Translate';
import CircularProgress from '@mui/material/CircularProgress';
import ChatSearch from "../../../assets/images/chat/chat-search.svg"
import ChatSearchBarClose from "../../../assets/images/assign-page/search-bar-close.svg"
import NoEditorsFoundTwo from "../../../assets/images/no-editors-found-2.svg"
import NoTermFound from '../../../assets/images/no-terms-found.svg'
import WarningIcon from '../../../assets/images/new-ui-icons/confirm-icon.svg'


const customProjectTypeSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: "400",
        lineHeight: "24px",
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px 0px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #DADADA",
        borderRadius: "4px",
        zIndex: 1080
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
        border: state.isFocused ? "1px solid #0074D3" : "1px solid #D3D8DC",
        outline: state.isFocused ? "none" : "none",
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        transtion: 0.3,
        color: "#222222",
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: "500",
        lineHeight: "24px",
        boxShadow: 0,
        padding: "0px",
        width: 200,
        height: 40,
        "&:hover": {
            cursor: "pointer",
        },
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '40px',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '40px',
    }),
    menuList: (base) => ({
        ...base,
        // height: "100px",

        "::-webkit-scrollbar": {
            width: "8px"
        },
        "::-webkit-scrollbar-track": {
            background: "transparent"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#DADDE0",
            border: "8px solid #DADDE0 !important",
            borderRadius: "50px",
        },
        
    }),
};

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <ArrowDropDown className="arrow-icon-color" />
            </components.DropdownIndicator>
        )
    );
};


const AilaysaNewGlossEditingArea = (props) => {

    let {
        setLanguagePairObject, 
        newGlossEditingImperativeRef,
        setActiveScreen,
        glossTaskId
    } = props
    
    const { t } = useTranslation();
    const params = useParams();

    const { projectId, taskId } = params

    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const history = useNavigate()

    const [searchBox, setSearchBox] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [termsList, setTermsList] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [termsListCopy, setTermsListCopy] = useState([])
    const [showTermDeletModal, setShowTermDeletModal] = useState(false)
    const [taskOptionList, setTaskOptionList] = useState([])
    const [selectedTaskItem, setselectedTaskItem] = useState(null)
    const [newTerm, setNewTerm] = useState({
        sl_term: "",
        tl_term: "",
        pos: ""
    })
    const [isTermAdding, setIsTermAdding] = useState(false)
    const [showTermsLoading, setShowTermsLoading] = useState(true)
    const [openBulkUploadModal, setOpenBulkUploadModal] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [filesList, setFilesList] = useState([])
    const [isListLoading, setIsListLoading] = useState(false)
    const [mtTermLoader, setMtTermLoader] = useState(false)
    // states for term ordering
    const [orderBySrcToggle, setOrderBySrcToggle] = useState(null)
    const [orderByTarToggle, setOrderByTarToggle] = useState(null)

    // states for term pagination
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [totalTerms, setTotalTerms] = useState(0)

    const termIdToDeleteRef = useRef(null)
    const searchTermRef = useRef("");
    const searchTermCloseOutside = useRef();
    
    const termsListRef = useRef([])
    const termsListCopyRef = useRef([])
    
    const newSourceTermRef = useRef(null)
    const newReplaceTermRef = useRef(null)
    const editSourceTermRef = useRef([])
    const editReplaceTermRef = useRef(null)
    const scrollingDivRef = useRef(null)    // scrolling pagination div 
    const lastPageRef = useRef(null)
    const axiosTermListAbortControllerRef = useRef(null)
    const axiosTermListPaginationAbortControllerRef = useRef(null)
    const srcSortUp = useRef(null)
    const srcSortDown = useRef(null)
    const tarSortUp = useRef(null)
    const tarSortDown = useRef(null)
    const orderByRef = useRef(null)
    const selectedTaskDataRef = useRef(null)
    const taskListRef = useRef(null)
    const rightAlignLangsRef = useRef(["Arabic", "Urdu", "Hebrew", "Pashto", "Sindhi", "Yiddish", "Persian"]);

    const partOfSpeechOptions = [
        { value: 1, label: t("partsSpeech_verb") },
        { value: 2, label: t("partsSpeech_noun") },
        { value: 3, label: t("partsSpeech_adjective") },
        { value: 4, label: t("partsSpeech_adverb") },
    ];

    const flexStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid grey'
    }

    const errorFieldStyle = {
        border: '1px solid #e74c3c'
    }
    const defaultFieldStyle = {
        border: '1px solid #cccccc'
    }

    useImperativeHandle(newGlossEditingImperativeRef, () => {
        return {
            getSelectedTaskItem: () => {
                return selectedTaskItem
            }
        }
    })

    useEffect(() => {
        if(glossTaskId){
            setselectedTaskItem({value: glossTaskId})
        }
    }, [glossTaskId])
    

    useEffect(() => {
        if(languageOptionsList?.length){
            if(projectId !== undefined && !isNaN(parseInt(projectId))){
                getVendorDashboard()
            }else {
                // history('/file-upload?page=1')
            }
            
        }
    }, [languageOptionsList])

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (!searchTermCloseOutside.current.contains(e.target)) {
                setSearchBox(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // don't fetch the data for page 1 - otherwise multiple page 1 result will append  
            if(currPage === 1) return

            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );

            if (axiosTermListPaginationAbortControllerRef.current) {
                axiosTermListPaginationAbortControllerRef.current.abort()
            }
        
            const controller = new AbortController();
            axiosTermListPaginationAbortControllerRef.current = controller

            let token = userCacheData != null ? userCacheData?.token : "";

            let url = `${Config.BASE_URL}/glex/term_upload/?task=${selectedTaskItem?.value}&page=${currPage}${searchTerm !== '' ? `&search=${searchTerm}` : ''}`
            if(orderBySrcToggle !== null || orderByTarToggle !== null) url += `&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) ? `${orderByRef.current}` : `-${orderByRef.current}`}`
            
            if(currPage !== 1) setIsListLoading(true)
            
            const response = await axios.get(
                url,
                {
                    signal: controller.signal,
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            lastPageRef.current = currPage
            termsListRef.current = [...termsListRef.current, ...response?.data?.results]
            termsListCopyRef.current = [...termsListRef.current, ...response?.data?.results]
            
            setPrevPage(currPage);
            setTermsList([...termsList, ...response?.data?.results]);
            setTermsListCopy([...termsList, ...response?.data?.results])
            setIsListLoading(false)
        };
        // console.log("totalPages: "+totalPages)
        // console.log("prevPage: "+prevPage)
        // console.log("lastPageRef.current: "+lastPageRef.current)
        if (currPage <= totalPages && prevPage !== currPage && lastPageRef.current !== currPage) {
            fetchData();
        }
    }, [currPage]);

    useEffect(() => {
        if (searchTerm == "" && isSearchTermDelete) {
            searchTermRef.current = ""
            getTermsList()
            setIsSearchTermDelete(false)
        }
    }, [searchTerm, isSearchTermDelete])

    useEffect(() => {
        if(orderBySrcToggle !== null){
            // reset target up and down arrow class
            tarSortUp.current.classList.remove("arrow-up-active")
            tarSortDown.current.classList.remove("arrow-down-active")
            tarSortUp.current.classList.add("arrow-up-inactive")
            tarSortDown.current.classList.add("arrow-down-inactive")

            getTermsList('sl_term', false)
        }
    }, [orderBySrcToggle])

    useEffect(() => {
        if(orderByTarToggle !== null){
            // reset source up and down arrow class
            srcSortUp.current.classList.remove("arrow-up-active")
            srcSortDown.current.classList.remove("arrow-down-active")
            srcSortUp.current.classList.add("arrow-up-inactive")
            srcSortDown.current.classList.add("arrow-down-inactive")
            getTermsList('tl_term', false)
        }
    }, [orderByTarToggle]) 

    useEffect(() => {
        if(selectedTaskItem !== null){
            getTermsList(null, false)
            selectedTaskDataRef.current = taskListRef.current?.find(each => each.id === selectedTaskItem?.value)
        }
    }, [selectedTaskItem])
    

    // This will get all the language pairs of that project and adds [All pairs] option to the language drop-down
    const getVendorDashboard = () => {
        // console.log(selectedFileRow.current)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/vendor/dashboard/${projectId}`,
            auth: true,
            success: (response) => {
                taskListRef.current = response.data

                let list = response.data?.map(each => {
                    return {
                        label: languageOptionsList?.find(lang => lang.id == each.target_language)?.language,
                        value: each.id
                    }
                })
                setTaskOptionList(list)
                
                if(taskId !== undefined && !isNaN(parseInt(taskId))) setselectedTaskItem(list?.find(each => each.value == taskId))
                else setselectedTaskItem(list[0])
            },
            error: (err) => { }
        });
    }

    const getTermsList = (orderType, isLoad = true) => {
        setSearchBox(false)
        if (axiosTermListAbortControllerRef.current) {
            axiosTermListAbortControllerRef.current.abort()
        }

        if(isLoad){
            setShowTermsLoading(true)
            setTermsList([])
        }
        
        const controller = new AbortController();
        axiosTermListAbortControllerRef.current = controller

        if(orderType) orderByRef.current = orderType

        let url = `${Config.BASE_URL}/glex/term_upload/?task=${selectedTaskItem?.value}&page=1${searchTerm !== '' ? `&search=${searchTerm}` : ''}`
        if(orderType) url += `&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) 
            ? `${orderType}` : `-${orderType}`}`


        scrollingDivRef.current.scrollTop = 0
        
        Config.axios({
            url: url,
            method: "GET",
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                setShowTermsLoading(false)
                if(setLanguagePairObject)
                    setLanguagePairObject(response?.data.additional_info[0])
                
                termsListRef.current = response.data.results
                termsListCopyRef.current = response.data.results

                setTermsList(response.data.results)
                setTermsListCopy(response.data.results)
                setTotalPages(Math.ceil(response?.data.count / 20))
                setCurrPage(1)
                setPrevPage(0)
                setTotalTerms(response.data.count)
                
                lastPageRef.current = null
                if(orderBySrcToggle){
                    srcSortUp.current.classList.add("arrow-up-inactive")
                    srcSortUp.current.classList.remove("arrow-up-active")
                    srcSortDown.current.classList.add("arrow-down-active")
                    srcSortDown.current.classList.remove("arrow-down-inactive")
                }
                if(orderBySrcToggle === false){
                    srcSortUp.current.classList.add("arrow-up-active")
                    srcSortUp.current.classList.remove("arrow-up-inactive")
                    srcSortDown.current.classList.add("arrow-down-inactive")
                    srcSortDown.current.classList.remove("arrow-down-active")
                }
                if(orderByTarToggle){
                    tarSortUp.current.classList.add("arrow-up-inactive")
                    tarSortUp.current.classList.remove("arrow-up-active")
                    tarSortDown.current.classList.add("arrow-down-active")
                    tarSortDown.current.classList.remove("arrow-down-inactive")
                }
                if(orderByTarToggle === false){
                    tarSortUp.current.classList.add("arrow-up-active")
                    tarSortUp.current.classList.remove("arrow-up-inactive")
                    tarSortDown.current.classList.add("arrow-down-inactive")
                    tarSortDown.current.classList.remove("arrow-down-active")
                }
            },
            error: (err) => {
                setShowTermsLoading(false)
            }
        });
    }

    // update the isEdit/isDelete (any specific) key in the list for operation
    const updateSpecificKeyInList = (list, id, key, value) => {
        let newArr = list?.map(obj => {
            if(obj?.id === id){
                return {
                    ...obj,
                    [key]: value
                }
            }else{
                if(value){
                    return {
                        ...obj,
                        [key]: !value
                    }
                }
                return obj   
            }
        })
        return newArr
    } 

    const handleTermEdit = (e, term_id) => {
        let { name, value } = e.target

        let newArr = termsListCopy.map(obj => {
            if (obj.id === term_id) {
                return {
                    ...obj,
                    [name]: value
                }
            }
            return obj
        })

        if (name === "sl_term" && value?.trim() !== '') editSourceTermRef.current[term_id].style.border = defaultFieldStyle.border
        // if (name === "tl_term" && value?.trim() !== '') editReplaceTermRef.current[term_id].style.border = defaultFieldStyle.border
        // console.log(newArr);
        termsListCopyRef.current = newArr
        setTermsListCopy(newArr)
    }

    const handleTermDelete = (term_id) => {
        termIdToDeleteRef.current = term_id

        if (!showTermDeletModal) {
            setShowTermDeletModal(true)
            return;
        }

        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/0/?term_delete_ids=${termIdToDeleteRef.current}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                // console.log(response.data)
                let listAfterDeletion = termsList?.filter(each => each.id !== term_id)
                termsListRef.current = listAfterDeletion
                termsListCopyRef.current = listAfterDeletion
                
                setTermsList(listAfterDeletion)
                setTermsListCopy(listAfterDeletion)
                setShowTermDeletModal(false)
                setTotalTerms(totalTerms - 1)
            },
            error: (err) => { setShowTermDeletModal(false) }
        });
    }


    const handleTermUpdate = (term_id) => {
        let formData = new FormData();
        let term = termsList?.find(each => each.id === term_id)
        let termCopy = termsListCopyRef.current?.find(each => each.id === term_id)

        if (termCopy?.sl_term?.trim() === '' || termCopy?.sl_term?.trim() === undefined ) {
            if (termCopy?.sl_term?.trim() === '') editSourceTermRef.current[term_id].style.border = errorFieldStyle.border
            // if (termCopy?.tl_term?.trim() === '') editReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        console.log(termsListRef.current)
        console.log(termsListCopyRef.current)

        console.log(term?.pos)
        console.log(termCopy?.pos)

        if(
            term?.sl_term === termCopy?.sl_term?.trim() &&
            term?.tl_term === termCopy?.tl_term?.trim() &&
            term?.pos === termCopy?.pos?.trim()
        ) return


        if (term?.sl_term !== termCopy?.sl_term?.trim()) {
            formData.append('sl_term', termCopy?.sl_term?.trim() ? termCopy?.sl_term?.trim() : "");
        }
        if (term?.tl_term !== termCopy?.tl_term?.trim()) {
            formData.append('tl_term', termCopy?.tl_term?.trim() !== undefined ? termCopy?.tl_term?.trim() : "");
        }
        if (term?.pos !== termCopy?.pos?.trim()) {
            formData.append('pos', termCopy?.pos?.trim() ? termCopy?.pos?.trim() : "");
        }


        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/${term_id}/`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                showSavedChangeText(term_id)
                // toggleEditMode(term.id, 'close', true)
            },
            error: (err) => {
                if(err?.response?.status == 400){
                    Config.toast(t("term_already_exist"),'warning');

                }else{
                    Config.toast("Failed to add term!", "error")

                }
            }
        });
    }

    const showSavedChangeText = (term_id) => {
        
        let newArr = termsListRef.current.map(obj => {
            if (obj.id === term_id) {
                return {
                    ...obj,
                    changeSaved: true
                }
            }
            return obj
        })
        setTermsList(newArr)

        setTimeout(() => {
            setTermsList(prevState => {
                return prevState?.map(obj => {
                    if (obj.id === term_id) {
                        return {
                            ...obj,
                            changeSaved: false
                        }
                    }
                    return obj
                })
            })
        }, 2500);
    } 

    const handleTermSearchChange = (e) => {
        setSearchTerm(e.target.value)
        if(e.target.value === '' && searchTermRef.current !== ''){
            e.target.blur()
            handleCloseSearchBox()
        }
    } 

    const handleNewTermOnChange = (e) => {
        let { name, value } = e.target
        if (name === 'sl_term' && e.target.value?.trim() !== '') newSourceTermRef.current.style.border = defaultFieldStyle.border
        if (name === 'tl_term' && e.target.value?.trim() !== '') newReplaceTermRef.current.style.border = defaultFieldStyle.border

        setNewTerm({
            ...newTerm,
            [name]: value
        })
    }

    const handleNewTermPosChange = (option) => {
        setNewTerm({
            ...newTerm,
            pos: option.label
        })
    } 

    const addNewTerm = () => {
        let formData = new FormData();

        if (newTerm?.sl_term?.trim() === '' || newTerm?.sl_term?.trim() === undefined) {
            // if (newTerm?.sl_term?.trim() === '') 
            newSourceTermRef.current.style.border = errorFieldStyle.border
            // if (newTerm?.tl_term?.trim() === '') newReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        formData.append('sl_term', newTerm?.sl_term);
        formData.append('tl_term', newTerm?.tl_term);
        formData.append('pos', newTerm?.pos);
        formData.append("task", selectedTaskItem?.value);
        
        setIsTermAdding(true)

        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setNewTerm({
                    sl_term: "",
                    tl_term: "",
                    pos: ""
                })
                scrollingDivRef.current.scrollTop = 0
                setTimeout(() => {
                    setIsTermAdding(false)
                    getTermsList(null, false)
                }, 100);
                newSourceTermRef.current.focus()
            },
            error: (err) => {
                setIsTermAdding(false)
                if(err?.response?.status == 400){
                    Config.toast(t("term_already_exist"),'warning');

                }else{
                    Config.toast("Failed to add term!", "error")

                }
            }
        });
    }

    const SearchTermFilterEnter = (e) => {
        if (e.which === 13 && searchTerm == "") {
            setSearchBox(false);
            getTermsList()
            e.target.blur()
        } else if (e.which === 13) {
            searchTermRef.current = searchTerm
            setSearchBox(false);
            getTermsList()
            e.target.blur()
        }
    }

    const handleCloseSearchBox = () => {
        setSearchTerm("")
        setSearchBox(false)
        setIsSearchTermDelete(true)
    }

    // add term when enter key is pressed
    const handleEnterKey = (e) => {
        if (e.which === 13) {
            addNewTerm()
        }
    }

    const handleOnScroll = () => {
        if (scrollingDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollingDivRef.current;
            // console.log("scrollTop: "+Math.round(scrollTop))
            // console.log("clientHeight: "+Math.round(clientHeight))
            // console.log("scrollHeight: "+Math.round(scrollHeight))
            // console.log("=====addition:=========")
            // console.log(Math.round(scrollTop) + Math.round(clientHeight))
            // console.log(Math.round(scrollTop) + Math.round(clientHeight) === Math.round(scrollHeight))
            // console.log("====abs=====")
            // console.log(Math.abs((Math.round(scrollTop) + Math.round(clientHeight)) - Math.round(scrollHeight)) <= 4)
            if (Math.abs((Math.round(scrollTop) + Math.round(clientHeight)) - Math.round(scrollHeight)) <= 4) {
                // This will be triggered after hitting the last element.
                // API call should be made here while implementing pagination.
                setTimeout(() => {
                    setCurrPage(currPage + 1);
                }, 80);
            }
        }
    }

    const handleEditTermEnter = (e, term_id) => {
        if (e.which === 13) {
            handleTermUpdate(term_id)
        }
    }

    const handlePOSChange = (selectedOption, termId) => {
        let newArr = termsListCopy?.map(obj => {
            if(obj.id === termId){
                return {
                    ...obj,
                    pos: selectedOption.label
                }
            }
            return obj
        })
        // console.log(newArr)
        termsListCopyRef.current = newArr
        setTermsListCopy(newArr)
    } 

    const handleBlur = (e, term_id) => {
        // console.log(e.target)
        // console.log(term_id)
        handleTermUpdate(term_id)
    } 

    const handleTaskChange = (selectedOption) =>  {
        // don't rerender if same option is selected again
        if(selectedOption?.value === selectedTaskItem?.value) return
        setTermsList([])
        setTermsListCopy([])
        termsListRef.current = []
        termsListCopyRef.current = []
        setShowTermsLoading(true)
        setselectedTaskItem(selectedOption)
    }

    const handleBulkUploadTerms = (e) => {
        let formData = new FormData();
        for (let x = 0; x < filesList.length; x++) {
            if (typeof filesList[x] != "undefined") formData.append("glossary_file", filesList[x]);
        }
       
        formData.append("job", selectedTaskDataRef.current?.job);
        setIsUploading(true)

        Config.axios({
            url: Config.BASE_URL + "/glex/glossary_file_upload/",
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setOpenBulkUploadModal(false)        
                setIsUploading(false)
                setFilesList([])
                getTermsList()
            },
            error: (err) => {
                if (err?.response?.status == 400) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                } else if (err?.response?.status == 500) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                }
                setIsUploading(false)
            }
        });
    } 

    // get machine translation for the given term
    // input => source and target word
    // output => if source given => target_mt is output
    // output => if target given => source is output
    const getTermMT = (term_id) => {
        let formData = new FormData();

        if(term_id){
            let termCopy = termsListCopy?.find(each => each.id === term_id)
    
            if (termCopy?.sl_term?.trim() === '' || termCopy?.sl_term?.trim() === undefined ) {
                editSourceTermRef.current[term_id].style.border = errorFieldStyle.border
                return
            }
            formData.append("source", termCopy?.sl_term?.trim());

            setTermsList(updateSpecificKeyInList(termsListCopy, term_id, "mtLoading", true))
        }else{
            if (newTerm?.sl_term?.trim() === '' || newTerm?.sl_term?.trim() === undefined) {
                newSourceTermRef.current.style.border = errorFieldStyle.border
                return
            }
            formData.append("source", newTerm?.sl_term);
            setMtTermLoader(true)
        }

        formData.append("task_id", selectedTaskItem?.value);


        Config.axios({
            url: `${Config.BASE_URL}/glex/term_mt/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                let data = response.data
                
                if(term_id){
                    let newArr = termsList.map(obj => {
                        if (obj.id === term_id) {
                            return {
                                ...obj,
                                tl_term: data.target_mt
                            }
                        }
                        return obj
                    })
                    termsListRef.current = newArr
                    termsListCopyRef.current = newArr

                    setTermsList(newArr)
                    setTermsListCopy(newArr)
                    setTimeout(() => {
                        handleTermUpdate(term_id)
                    }, 100);

                    setTermsList(updateSpecificKeyInList(termsListCopy, term_id, "mtLoading", false))
                    
                }else{
                    setNewTerm({
                        ...newTerm,
                        tl_term: data.target_mt,
                    })
                    setMtTermLoader(false)
                }
            },
            error: (error) => {},
        });
    } 

    const setRef = (index, ref) => {
        editSourceTermRef.current[index] = ref;
    };

    return (
        <>
            <div className="choicelist-main-header-wrapper">
                {projectId && (
                    <h2 className="title">{ t("terms_list")}</h2>
                )}
                <div className="seach-wrapper-wrap">
                    <div className={"search-wrapper " + (searchBox ? "add-blue-border" : null)}>
                        <div className="search-img">
                            <img src={ChatSearch} alt="search" />
                        </div>
                        <input
                            onClick={() => setSearchBox(true)}
                            type="search"
                            placeholder={`${t("search")}...`}
                            value={searchTerm}
                            onChange={handleTermSearchChange}
                            onKeyUp={(e) => SearchTermFilterEnter(e)}
                            onFocus={() => setSearchBox(true)}
                        />
                        <span
                            className={"close " + ((searchBox || searchTerm !== "") ? "show" : "")}
                            onClick={() => handleCloseSearchBox()}
                        >
                            <img src={ChatSearchBarClose} alt="search-bar-close" />
                        </span>
                    </div>
                    <div ref={searchTermCloseOutside} className={"search-results-bar " + (searchBox ? "show" : "hide")}>
                        <div
                            onClick={(e) => (searchTerm !== "" ? getTermsList() : "")}
                            className={"search-results-item " + (searchTerm !== "" ? " " : "cursor-change")}
                        >
                            <SearchIcon className="search-icon" />
                            <div className="searched-results-info">
                                <p className="searched-term">{searchTerm}</p>
                                {
                                    searchTerm !== "" ?
                                        <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                        :
                                        <p className="results-link">{t("search_results_proj_list_1")} <span>{t("wordchoice_term")}</span></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='glossary-word-count d-flex'>
                    {projectId ? (
                        <>
                            <button className="convert-pdf-list-UploadProjectButton mr-2" onClick={() => setOpenBulkUploadModal(true)}>
                                <span className="fileupload-new-btn bulk-upload-span">
                                    {t("bulk_upload")}
                                </span>
                            </button>
                            <Select
                                options={taskOptionList}
                                menuPlacement="auto"
                                value={selectedTaskItem}
                                styles={customProjectTypeSelectStyles}
                                onChange={handleTaskChange}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            />
                        </>
                    ) : (
                        <button className="convert-pdf-list-UploadProjectButton mr-2" onClick={() => setActiveScreen(2)}>
                            <span className="fileupload-new-btn bulk-upload-span">
                                {t("import_terms")}
                            </span>
                        </button>
                    )}
                </div>
            </div>
            <div className="choicelist-wrapper-container">
                <div className="choicelist-wrap-list">
                    <div className="choiclist-wrap-header">
                        <div className="choicelist-left-wrap">
                            <div className='d-flex items-center' style={{cursor:'pointer'}} onClick={() => {setOrderBySrcToggle(!orderBySrcToggle); setOrderByTarToggle(null)}}>
                                <p className="title-header">{t("src_term")}</p>
                                <div className="sorting-container ml-3">
                                    <div
                                        ref={srcSortDown}
                                        className="arrow-down-sort arrow-down-inactive"
                                    ></div>
                                    <div
                                        ref={srcSortUp}
                                        className="arrow-up-sort arrow-up-inactive"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="choicelist-right-wrap">
                            <div className='d-flex items-center' style={{cursor:'pointer', justifyContent: 'unset'}} onClick={() => {setOrderByTarToggle(!orderByTarToggle); setOrderBySrcToggle(null)}}>
                                <p className="title-header">{t("tar_term")}</p>
                                <div className="sorting-container ml-3">
                                    <div
                                        ref={tarSortDown}
                                        className="arrow-down-sort arrow-down-inactive"
                                    ></div>
                                    <div
                                        ref={tarSortUp}
                                        className="arrow-up-sort arrow-up-inactive"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="choicelist-right-wrap">
                            <p className="title-header pos">{t("parts_of_speech")}</p>
                            
                        </div>
                    </div>
                    <div className="choicelist-item-main-wrapper" onScroll={handleOnScroll} ref={scrollingDivRef}>
                        {(showTermsLoading && termsList?.length === 0) ? (
                            Array(10).fill(null).map((index) => {
                                return(
                                    <>
                                        <div key={index} className={`choicelist-list-item `}>
                                            <div className="choice-list-source-term-wrap">
                                                <p className="choicelist-item-text">
                                                    {/* <span className="text-icon" style={{background: 'none'}}> <Skeleton animation="wave" variant="circular" width={19} height={19} /></span> */}
                                                    <Skeleton animation="wave" variant="text" width={120} />
                                                </p>
                                            </div>
                                            <div className="choice-list-replace-term-wrap">
                                                <p className="choicelist-item-text"><Skeleton animation="wave" variant="text" width={120} /></p>
                                            </div>
                                            <div className="choice-list-replace-term-wrap">
                                                <p className="choicelist-item-text pos"><Skeleton animation="wave" variant="text" width={120} /></p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        ) : 
                        termsList?.length !== 0 ? (
                            termsList?.map(term => {
                                return (
                                    // onDoubleClick={(e) => { e.stopPropagation(); toggleEditMode(term.id, 'open') }}
                                    <div key={term.id} className={`choicelist-list-item ${(isEditMode && !term?.isEdit) ? "disabled-choicelist" : term?.isEdit ? "blue-bg" : ""}`}>
                                        <div className="choice-list-source-term-wrap wordchoice">
                                            <input
                                                ref={(ref) => setRef(term.id, ref)}
                                                type="text"
                                                name="sl_term"
                                                className={rightAlignLangsRef.current?.includes(languageOptionsList?.find(each => selectedTaskDataRef.current?.source_language == each.id)?.language) ? "align-right" : ""}
                                                value={termsListCopy?.find(each => each.id === term.id)?.sl_term}
                                                onChange={(e) => handleTermEdit(e, term.id)}
                                                onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                onBlur={(e) => handleBlur(e, term.id)}
                                            />
                                            {/* {!term?.isEdit ? (
                                            ) : (
                                                <p className="choicelist-item-text">
                                                    {term.sl_term}
                                                </p>
                                            )} */}
                                        </div>
                                        <div className="choice-list-replace-term-wrap wordchoice">
                                            <input
                                                ref={editReplaceTermRef}
                                                type="text"
                                                name="tl_term"
                                                className={rightAlignLangsRef.current?.includes(languageOptionsList?.find(each => selectedTaskDataRef.current?.target_language == each.id)?.language) ? "align-right" : ""}
                                                value={termsListCopy?.find(each => each.id === term.id)?.tl_term}
                                                onChange={(e) => handleTermEdit(e, term.id)}
                                                onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                onBlur={(e) => handleBlur(e, term.id)}
                                            />
                                            <div className='choicelist-action-wrapper visible ml-1'>
                                                <span className="action-list-item" onClick={() => !term?.mtLoading && getTermMT(term.id)}>
                                                    {term?.mtLoading ? (
                                                        <CircularProgress sx={{ color: '#222' }} style={{height: '16px', width: '16px'}} />
                                                    ) : (
                                                        <TranslateIcon className="list-update-icon" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="choice-list-replace-term-wrap">
                                            <div className="choicelist-item-text pos">
                                                <Select
                                                    options={partOfSpeechOptions}
                                                    menuPlacement="auto"
                                                    isSearchable={false}
                                                    value={partOfSpeechOptions?.find(each => each.label === termsListCopy?.find(each => each.id === term.id)?.pos) ? partOfSpeechOptions?.find(each => each.label === termsListCopy?.find(each => each.id === term.id)?.pos) : null}
                                                    styles={customProjectTypeSelectStyles}
                                                    onChange={(selectedOption) => handlePOSChange(selectedOption, term.id)}
                                                    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                    onBlur={(e) => handleBlur(e, term.id)}
                                                />
                                                {!glossTaskId && term?.changeSaved && (
                                                    <div className="choicelist-action-wrapper visible ml-1">
                                                        <span className="action-list-item" >
                                                            <CheckCircleOutlineOutlinedIcon 
                                                                style={{fontSize: '25px', color: '#0078D4'}}
                                                            />
                                                        </span>
                                                        {/* <span className="text-changes-success visible">{t("changes_saved")}</span> */}
                                                    </div>
                                                )}
                                            </div>                                                
                                            
                                            <div className="choicelist-action-wrapper">
                                                <span className="action-list-item" onClick={() => handleTermDelete(term.id)}>
                                                    <DeleteOutlineIcon className="list-delete-icon" />
                                                </span>
                                            </div>
                                        

                                            {/* {term?.isEdit ? (
                                                <div className="choicelist-action-wrapper">
                                                    <span className="action-list-item" onClick={() => handleTermUpdate(term.id)}>
                                                        <DoneIcon className="list-update-icon" />
                                                    </span>
                                                    <span className="action-list-item" onClick={() => toggleEditMode(term.id, 'close')}>
                                                        <CloseIcon className="list-cancel-icon" />
                                                    </span>
                                                </div>
                                            ) : (
                                            )} */}
                                                
                                        </div>
                                    </div>
                                )
                            })
                        ) : searchTermRef.current?.trim()?.length !== 0 ? (
                            <div className="no-terms-added-wrapper">
                                <img src={NoEditorsFoundTwo} alt="no-terms-found"/>
                                <h1>{t("term_not_found")}</h1>
                            </div>
                        ) : (
                            <div className="no-terms-added-wrapper">
                                <img src={NoTermFound} alt="no-terms-found"/>
                                <h1>{t("term_not_added_note")}</h1>
                            </div>
                        )}
                        <p style={{
                            textAlign: 'center',
                            opacity: isListLoading ? 1 : 0
                        }}>
                            <p className="upload-text mt-2 d-flex items-center justify-center" style={{ fontWeight: 500, fontSize: '17px' }}>
                                <CircularProgress sx={{color: '#959191'}} style={{width: '24px', height: '24px', marginRight: '10px'}} /> {t("loading_terms")}...
                            </p>
                        </p>
                    </div>
                </div>
                <div className="choiclist-create-main-wrapper">
                    <div className="choice-list-create-source-term-wrap">
                        <input
                            type="text"
                            ref={newSourceTermRef}
                            name="sl_term"
                            placeholder={t("src_term")}
                            value={newTerm?.sl_term}
                            onChange={handleNewTermOnChange}
                            onKeyUp={handleEnterKey}
                        />
                    </div>
                    <div className="choice-list-create-replace-term-wrap">
                        <input
                            type="text"
                            ref={newReplaceTermRef}
                            name="tl_term"
                            placeholder={t("tar_term")}
                            value={newTerm?.tl_term}
                            onChange={handleNewTermOnChange}
                            onKeyUp={handleEnterKey}
                        />
                        <div className='choicelist-action-wrapper visible ml-1'>
                            <span className="action-list-item" onClick={() => !mtTermLoader && getTermMT()}>
                                {mtTermLoader ? (
                                    <CircularProgress sx={{ color: '#222' }} style={{height: '16px', width: '16px'}} />
                                ) : (
                                    <TranslateIcon className="list-update-icon" />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="choice-list-create-replace-term-wrap">
                        <div className="choicelist-item-text pos">
                            <Select
                                options={partOfSpeechOptions}
                                menuPlacement="auto"
                                isSearchable={false}
                                value={partOfSpeechOptions?.find(each => each.label === newTerm?.pos) ? partOfSpeechOptions?.find(each => each.label === newTerm?.pos) : null}
                                styles={customProjectTypeSelectStyles}
                                onChange={(selectedOption) => handleNewTermPosChange(selectedOption)}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            />
                        </div>
                        <button
                            className="add-term-btn d-flex justify-center items-center"
                            onClick={() => !isTermAdding && addNewTerm()}
                        >
                            {isTermAdding && <ButtonLoader style={{marginRight: "4px"}} />}
                            <span className="fileopen-new-btn">
                                {t("add_term")}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Term delete confirmation modal */}
            {showTermDeletModal && (
                <Rodal
                    visible={showTermDeletModal}
                    showCloseButton={false}
                    onClose={() => console.log()}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-wrapper">
                        <img
                            src={WarningIcon}
                            alt="confirm-icon"
                        />
                        <h2>{t("are_you_sure")}</h2>

                        <div className="button-row">
                            <button className="mydocument-AiMarkCancel" onClick={() => setShowTermDeletModal(false)}>
                                <span className="cancel-txt">{t("cancel")}</span>
                            </button>
                            <button className="mydocument-AiMarkSubmit" onClick={() => handleTermDelete(termIdToDeleteRef.current)}>
                                <span className="submit-txt">{t("delete")}</span>
                            </button>
                        </div>
                    </div>
                </Rodal>
            )}

            
            {openBulkUploadModal && (
                <BulkFileUploadModal 
                    openModal={openBulkUploadModal}
                    setOpenModal={setOpenBulkUploadModal}
                    handleUploadBtn={handleBulkUploadTerms}
                    isUploading={isUploading}
                    filesList={filesList}
                    setFilesList={setFilesList}
                />
            )}
        </>
    )
}

export default AilaysaNewGlossEditingArea