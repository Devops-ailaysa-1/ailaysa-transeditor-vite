import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import ButtonBase from '@mui/material/ButtonBase';
// import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Config from "../../vendor/Config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import ConvertedPdfList from "../toolkit-component/ConvertedPdfList";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from "../../vendor/styles-svg/DeleteIcon";
import Select, { components } from "react-select";
import { ButtonLoader } from './../../loader/CommonBtnLoader';
import axios from "axios";
import Cookies from "js-cookie";
import sanitizeHtml from 'sanitize-html-react';
import { useDispatch } from "react-redux";
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from "../../features/FileDownloadingListSlice";
import PaginationLeft  from "../../assets/images/new-ui-icons/pagination-left.svg";
import PaginationRight  from "../../assets/images/new-ui-icons/pagination-right.svg";
import PlusIcon from "../../assets/images/new-ui-icons/plus.svg"
import BlogArticleIcon from "../../assets/images/blog-article.svg"
import BlogArticleWizardIcon from "../../assets/images/blog-wizard.svg"
import ChatBookIcon from "../../assets/images/new-ui-icons/book.svg"
import ChatSearch from "../../assets/images/chat/chat-search.svg"
import SearchBarClose from "../../assets/images/assign-page/search-bar-close.svg"
import NoEditorsFound2 from "../../assets/images/no-editors-found-2.svg"
import EmptyProjectsFolder from "../../assets/images/empty-projects-folder.svg"

function MyDocuments(props) {
    let { mainContainerRef } = props
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const location = useLocation();
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch()

    const [didMount, setDidMount] = useState(false);
    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [documentsList, setDocumentsList] = useState([])
    const [documentName, setDocumentName] = useState(t("untitled"))
    const [activeTab, setActiveTab] = useState(1);
    const [projectSearchTerm, setProjectSearchTerm] = useState("");
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [showListingLoader, setShowListingLoader] = useState(false);
    const [paginationContent, setPaginationContent] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [selectedDocumntId, setSelectedDocumntId] = useState(null);
    const [convetedDocsListSearch, setConvertedDocsListSearch] = useState(false);
    const [convetedDocsSearchTerm, setConvertedDocsSearchTerm] = useState("");
    const [selectedSortValue, setselectedSortValue] = useState(null)
    const [sortEl, setSortEl] = useState(null);
    const [moreEl, setMoreEl] = useState(null);
    const [openedMoreOption, setOpenedMoreOption] = useState(null);
    const [orderBySelectedValue, setOrderBySelectedValue] = useState(2);

    const [isDocumentDeleting, setIsDocumentDeleting] = useState(false);

    const fileUploadTop = createRef();
    const projectsPerPage = useRef(20);
    const searchTermRef = useRef(null)
    const documentIdRef = useRef(null)
    const searchTermCloseOutside = useRef();

    const deleteFromDocOrBlog = useRef(null);
    const moreOptionOutside = useRef();
    const allDownloadedFilesArrRef = useRef([]);
    const bookCreationRef = useRef(null);
    let paginationTimeOut = null

    const open = Boolean(sortEl);


    const deletemodaloption = {
        closeMaskOnClick: false,
        width: 784,
        height: 'auto',
        onClose: () => console.log(),
    };


    const orderByOptions = [
        { value: 'doc_name', label: 'A-Z' },
        { value: '-doc_name', label: 'Z-A' },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ]

    const moreOptionsForDoc = [
        {
            id: 1,
            icon: <FileDownloadOutlinedIcon className="file-download" />,
            // arrow_icon: <KeyboardArrowRightOutlinedIcon className="right-arrow" />,
            label: t("download"),
        },
        {
            id: 2,
            icon: <DeleteIcon style="delete" />,
            label: t("delete"),
        },

    ]

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
            padding: "6px 0px 6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #0000000D",
            borderRadius: "4px",
            zIndex: 5
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
            width: 125,
            height: 40,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
    };

    useEffect(() => {
        setDidMount(true)
    }, [])

    useEffect(() => {
        const controller = new AbortController();

        if (props.activeProjTab === 2) {
            // console.log('single')
            getDocumentList(controller)
        }

        return () => {
            controller.abort()
        }
    }, [props.activeProjTab])

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (moreOptionOutside.current && !moreOptionOutside.current.contains(e.target)) {
                setMoreEl(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    useEffect(() => {
        const controller = new AbortController();

        if (convetedDocsSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete) {
            setDocumentsList([])
            // console.log('fomr seatch delete')
            getDocumentList(controller)
            setIsSearchTermDelete(false)
        }

        return () => {
            controller.abort()
        }
    }, [convetedDocsSearchTerm, isSearchTermDelete])

    useEffect(() => {
        const controller = new AbortController();

        if (convetedDocsSearchTerm == "") {
            if (props.activeProjTab === 2) {
                // console.log('from sear')
                getDocumentList(controller)
                setIsSearchTermDelete(false)
            }
        }

        return () => {
            controller.abort()
        }
    }, [convetedDocsSearchTerm])

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setConvertedDocsListSearch(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });

    const handleSortClick = (e) => {
        setSortEl(e.currentTarget);
    };

    const handleSelectedMenuItem = (selected_option) => {
        setselectedSortValue(selected_option.value)
        setOrderBySelectedValue(selected_option)
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };

    const handleMoreVertOption = (e, id) => {
        e.stopPropagation();
        setMoreEl(true);
        setOpenedMoreOption(id)
    };

    const SearchTermFilterEnter = (e) => {
        if (e.which === 13 && convetedDocsSearchTerm == "") {
            setConvertedDocsListSearch(false);
            e.target.blur()
        } else if (e.which === 13) {
            let pageParam = URL_SEARCH_PARAMS.get("page");
            if (pageParam != 1) {
                pageSelect(1)
            } else {
                // console.log('from search enter')
                getDocumentList()
            }
            setConvertedDocsListSearch(false);
            searchTermRef.current = convetedDocsSearchTerm
            e.target.blur()
        }
    }

    const handleCloseSearchBox = () => {
        setConvertedDocsSearchTerm("")
        setConvertedDocsListSearch(false)
        setIsSearchTermDelete(true)
    }

    useEffect(() => {
        const controller = new AbortController();

        if (selectedSortValue !== null) {
            if (props.activeProjTab === 2) {
                setDocumentsList([])
                // console.log('sortvalue')
                getDocumentList(controller)
            }
        }
        return () => {
            controller.abort()
        }
    }, [selectedSortValue])


    const getDocumentList = (controller) => {
        setShowListingLoader(true);
        let list = []
        /* Page param set/get - start */
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            // setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        /* Page param set/get - start */
        let url = `${Config.BASE_URL}/workspace/mydocuments?page=${page}`;
        if (convetedDocsSearchTerm) url += `&doc_name=${convetedDocsSearchTerm}`;
        if (selectedSortValue !== null) url += `&ordering=${selectedSortValue}`
        let params = {
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                list = response?.data?.results
                if (list.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setDocumentsList(list)
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                setShowListingLoader(false);
            },
        };
        Config.axios(params);
    }

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        setDocumentsList([])
        let url = `/documents-list?page=${page}`;
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
            let url = "/documents-list" + "?page=";
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
                    if (!isPrevDotsInserted) content.push(<li style={{ cursor: "context-menu" }} key={i}>...</li>);
                    isPrevDotsInserted = true;
                } else if (i + visibleNextPrevPages >= currentPage) {
                    if (!isNextDotsInserted) content.push(<li style={{ cursor: "context-menu" }} key={i}>...</li>);
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
        paginationTimeOut = setTimeout(() => {
            setPaginationContent(content);
        }, 100);
    };


    /* Show the pagination content a the bottom */
    useEffect(() => {
        if (didMount) {
            paginationContentFunction(currentPage);
        }
        return () => {
            if(paginationTimeOut) clearTimeout(paginationTimeOut);
        }
    }, [totalPages, currentPage]);

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        const controller = new AbortController();

        if (URL_SEARCH_PARAMS.get("page") !== null && URL_SEARCH_PARAMS.get("page") != 'null') {
            // console.log(props.activeProjTab)
            if (props.activeProjTab === 2) {
                // console.log('from page')
                getDocumentList(controller);
            }

        } else if (URL_SEARCH_PARAMS.get("page") == null || URL_SEARCH_PARAMS.get("page") == 'null') {
            // let page = URL_SEARCH_PARAMS.get("page")
            history(`/documents-list?page=1`)
        }
        mainContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })

        return () => {
            controller.abort()
        }
    }, [URL_SEARCH_PARAMS.get("page")]);

    
    useEffect(() => {
        if(!showDeleteFileModal){
          setIsDocumentDeleting(false)
        }
    }, [showDeleteFileModal])

    useEffect(() => {
      console.log(deleteFromDocOrBlog.current)
    }, [deleteFromDocOrBlog.current])
    

    const deleteDocument = (documentId) => {
        let url = ''
        if (deleteFromDocOrBlog.current === 'doc') {
            url = `${Config.BASE_URL}/workspace/mydocuments/${documentId}`
        } else if(deleteFromDocOrBlog.current === 'book') {
            url = `${Config.BASE_URL}/writer/bookcreation/${documentId}`
        }else {
            url = `${Config.BASE_URL}/writer/blogcreation/${documentId}`
        }
        setIsDocumentDeleting(true)
        Config.axios({
            url: url,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                // console.log(response.data)
                Config.toast(t("document_deleted_success"));
                setIsDocumentDeleting(false)
                const newArr = documentsList?.filter(obj => obj.id !== documentId);
                setDocumentsList(newArr)
                if (newArr?.length === 15) {
                    getDocumentList()
                }
                setShowDeleteFileModal(false)
                if (newArr?.length == 0) setEmptyProjects(true)
            },
            error: (err) => { setIsDocumentDeleting(false) }
        });
    }

    const openWriter = (id, name) => {
        history(`/word-processor?document-id=${id}`, {state: { docName: name, from: "My documents", prevPath: window.location.pathname + window.location.search }})
    }

    const handleDeleteButton = (item) => {
        deleteFromDocOrBlog.current = item?.open_as == 'BlogWizard' ? 'blog' : item?.open_as == 'Book' ? 'book' : 'doc'
        setSelectedDocumntId(item?.id);
        setShowDeleteFileModal(true)
    }

    const MoreOptionsIconDoc = (props) => {
        let { docItem, deleteOnly } = props
        return (
            <div className="more-options-wrap">
                <ButtonBase onMouseUp={(e) => handleMoreVertOption(e, docItem.id)} className="sorting-icon">
                    <MoreVertIcon className="more-icon" />
                </ButtonBase>
                {(moreEl && (openedMoreOption === docItem.id)) &&
                    <>
                        <div className="menu-wrapper" ref={moreOptionOutside}>
                            <ul>
                                {
                                    moreOptionsForDoc?.filter(each => deleteOnly ? each.id === 2 : each.id)?.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className="list-item"
                                                onClick={(e) => {
                                                    item?.label === 'Download' ? handleDownload(docItem) :
                                                    item?.label === 'Delete' && handleDeleteButton(docItem)
                                                }}
                                            >
                                                <div className="item-wrap">
                                                    <span className="icon">{item.icon}</span>
                                                    <span className="text">{item.label}</span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
        )
    }

    const handleOpenButtonClick = (item) => {
        if(item?.open_as === 'BlogWizard'){
            history(`/writer-blog/?blog=${item?.id}`, {state: { prevPath: window.location.pathname + window.location.search }})
        } else if(item?.open_as === 'Book'){
            history(`/book-writing?book=${item?.id}`, {state: { prevPath: window.location.pathname + window.location.search }})
        } else{
            openWriter(item?.id, item?.doc_name)
        }
    } 

    const handleDownload = (item) => {
        if(item?.open_as === 'Book'){
            getBookDetails(item?.id)
        }
    } 

    const getBookDetails = (book_id) => {
        if(book_id === undefined || book_id === null) return
        Config.axios({
            url: `${Config.BASE_URL}/writer/bookcreation/${book_id}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let data = response.data
                bookCreationRef.current = data
                setTimeout(() => {
                    handleDownloadAll()
                }, 10);
            },
        });
    } 

    const filesDownload = async(html_data, item) => {
        var summerNoteData = html_data

        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
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

        // regex to replace all <p><br /></p>
        let cleaned = clean?.replace(/<p><br \/><\/p>/g, '<br />')
        let removedPandH1 = cleaned?.replace(/<(p|h1|h2|h3)>\s*<\/\1>/g, '')

        let removedStyleAttribFromImg = removedPandH1.replace(/<img(.*?)\s+style\s*(=\s*["'][^"']*["'])?(\s.*?)?>/gi, '<img$1$3>');

        // formData.append("name", documentNameRef.current.innerText);
        var myHeaders = new Headers();
        var formdata = new FormData();

        formdata.append("html", removedStyleAttribFromImg);
        // formdata.append("html_str", removedStyleAttribFromImg)
        formdata.append("name", "name")
        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };
        try{
            let data = await fetch(`https://apinodestaging.ailaysa.com/docx-generator`, requestOptions)
            // let data = await fetch(`${Config.BASE_URL}/workspace/html2docx`, requestOptions)
           
            if (data.status === 200) {
                let response = await data.blob()
    
                let fileObj = new File([response], `${(item.hasOwnProperty('front_matter') || item.hasOwnProperty('back_matter')) ? item.name : item.generated_content}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
                console.log(fileObj);
                return fileObj;
            }else {
                console.error('Failed to download file');
                return null;
            }
        }catch(e) {
            dispatch(deleteDownloadingFile({ id: bookCreationRef.current?.id }))
        }
    } 

    const handleDownloadAll = () => {
        allDownloadedFilesArrRef.current = []
        let arr = []
        bookCreationRef.current?.front_matter?.forEach(each => {
            arr.push(each)
        })
        bookCreationRef.current?.body_matter?.forEach(each => {
            arr.push(each)
        })
        bookCreationRef.current?.back_matter?.forEach(each => {
            arr.push(each)
        })
        dispatch(addDownloadingFiles({ id: bookCreationRef.current?.id, file_name: bookCreationRef.current?.name, ext: '.docx', status: 1 }))

        downloadFilesInOrder(arr).then(() => {
            console.log(allDownloadedFilesArrRef.current)
            mergeFile()
        })
    } 

    const downloadFilesInOrder = async (arr) => {
        for (const each of arr) {
            let html = (each.hasOwnProperty('front_matter') || each.hasOwnProperty('back_matter')) ? each.generated_content : each.html_data;
            if (html !== null && html.trim().length !== 0) {
                const fileObj = await filesDownload(html, each);
                if (fileObj) {
                    allDownloadedFilesArrRef.current = [...allDownloadedFilesArrRef.current, fileObj];
                }
            }
        }
    };

    const mergeFile = async() => {
        let formData = new FormData();
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
        let token = userCacheData != null ? userCacheData?.token : "";
        
        console.log(allDownloadedFilesArrRef.current)

        allDownloadedFilesArrRef.current?.forEach(each => {
            formData.append("docx_files", each);
        })
        formData.append("book_name", bookCreationRef.current?.name);
        
        axios({
            method: "POST",
            url: `${Config.BASE_URL}/writer/docx_merger/`,
            data: formData,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
            //handle success
            console.log(response.data)
            const filename = response.headers['content-disposition']?.split('filename*=')[1];
            let bookName = decodeURIComponent(filename?.replace(`UTF-8''`, ''))
            const url = URL.createObjectURL(new Blob([response.data]));

            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            // fileDownload.href = URL.createObjectURL(response.data);
            fileDownload.href = url
            fileDownload.download = Config.unescape(`${bookName}`);
            fileDownload?.click();
            document.body.removeChild(fileDownload);
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: bookCreationRef.current?.id, status: 2 }))

            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: bookCreationRef.current?.id }))
            }, 8000);


        }).catch((e) =>{
            console.log(e)
            Config.toast('Failed to download file', 'error')
            dispatch(deleteDownloadingFile({ id: bookCreationRef.current?.id }))
        })
    } 

    return (
        <React.Fragment>
            <section className="glossaries-list-wrapper">
                <div className="header-align glossary-header pdf-convert docs-list">
                    {/* <Breadcrumbs /> */}
                    <div className="pdf-convert-header-wrapper">
                        <div className="header-project-setup-align-wrap">
                            {/* <p className="section-header">My Documents</p> */}
                            <div className="glossary-search-row-new view-glossary-list pdf-list">
                                <div className="glossary-sub-search-row">
                                    <div className={"project-list-search-box " + (convetedDocsListSearch ? "active" : "")}>
                                        <div className="img-box">
                                            <img src={ChatSearch} alt="search-icon" />
                                        </div>
                                        <input
                                            onClick={() => setConvertedDocsListSearch(true)}
                                            value={convetedDocsSearchTerm}
                                            onChange={(e) => setConvertedDocsSearchTerm(e.target.value)}
                                            type="search"
                                            placeholder={`${t("search")}....`}
                                            onKeyUp={(e) => SearchTermFilterEnter(e)}
                                            onFocus={() => setConvertedDocsListSearch(true)}
                                        />
                                        <span className={"close " + ((convetedDocsListSearch || convetedDocsSearchTerm !== "") ? "show " : " ")}
                                            onClick={() => handleCloseSearchBox()}
                                        >
                                            <img src={SearchBarClose} alt="search-bar-close" />
                                        </span>
                                    </div>
                                    <div ref={searchTermCloseOutside} className={"search-results-bar glossary-proj-list " + (convetedDocsListSearch ? "show" : "hide")}>
                                        <div onClick={(e) => (convetedDocsSearchTerm !== "" ? getDocumentList(e) : "")} className={"search-results-item " + (convetedDocsSearchTerm !== "" ? " " : "cursor-change")}>
                                            <SearchIcon className="search-icon" />
                                            <div className="searched-results-info">
                                                <p className="searched-term">{convetedDocsSearchTerm}</p>
                                                {
                                                    convetedDocsSearchTerm !== "" ?
                                                        <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                        :
                                                        <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_convert_list_docs")}</span></p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <Select  
                                        options={orderByOptions}
                                        isSearchable={false}
                                        styles={customProjectTypeSelectStyles}
                                        value={orderBySelectedValue}
                                        // menuIsOpen={true}
                                        classNamePrefix="project-type-list"
                                        placeholder={t("order_by")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleSelectedMenuItem}
                                    />
                                </div>
                                {/* <div className="glossary-view-row">
                                    <ButtonBase className="mydocument-files-AddProjectButton" component={Link} to="/word-processor">
                                        <span className="add-project-btn">
                                            <AddIcon
                                                style={{
                                                    width: 20,
                                                    color: "#ffffff"
                                                }}
                                            />
                                            {t("new_docs")}
                                        </span>
                                    </ButtonBase>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-files-section converted-pdf-list-wrap document-wrap writing-category">
                    <div id="select-files" className="uploaded-files">
                        <div className="file-edit-heading-row">
                            <div className="file-edit-heading-table">
                                <div className="file-edit-heading-table-row">
                                    <div
                                        // onClick={(e) => orderBy(orderField?.indexOf("-project_name") !== -1 ? "project_name" : "-project_name")}
                                        className="file-edit-heading-table-cell"
                                    >
                                        <div className="listing-table-header-container">
                                            <span>{t("search_results_convert_list_docs")}</span>
                                        </div>
                                    </div>
                                    <div className="file-edit-heading-table-cell">
                                        <div
                                            // onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} 
                                            className="listing-table-header-container"
                                        >
                                            <span>{t("created_on")}</span>
                                        </div>
                                    </div>
                                    <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("action")}</div>
                                    </div>
                                </div>
                                {
                                    documentsList?.length != 0 && !showListingLoader ? (
                                        <React.Fragment>
                                            {
                                                (documentsList?.length != 0 || convetedDocsSearchTerm != "") ?
                                                    (
                                                        documentsList?.map((item, key) => {
                                                            return (
                                                                <div
                                                                    className="file-edit-list-table-row"
                                                                    key={item.id}
                                                                >
                                                                    <div className="file-edit-list-table-cell-wrap">
                                                                        <div className="file-edit-list-table-cell">
                                                                            <div className="proj-title-list-container">
                                                                                <div className="blog-category-icon">
                                                                                    {
                                                                                        item?.document_type__type === 'Blog' ? (
                                                                                            <Tooltip title={t("blog_article")} TransitionComponent={Zoom} placement="top" arrow>
                                                                                                <img src={BlogArticleIcon} alt="blog article icon" />
                                                                                            </Tooltip>
                                                                                        ) : item?.open_as == 'BlogWizard' ? (
                                                                                            <Tooltip title={t("blog_wizard")} TransitionComponent={Zoom} placement="top" arrow>
                                                                                                <img src={BlogArticleWizardIcon} alt="blog article icon" />
                                                                                            </Tooltip>
                                                                                        ) : item?.open_as === 'Book' ? (
                                                                                            <img src={ChatBookIcon} alt="book-project-icon" />
                                                                                        ) : (
                                                                                            <img src={Config.BASE_URL + "/app/extension-image/docx"} alt="document" />
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <div className="proj-list-info">
                                                                                    <div className="proj-information">
                                                                                        <Tooltip TransitionComponent={Zoom} title={item.doc_name} placement="top" arrow>
                                                                                            <span
                                                                                                className="file-edit-proj-txt-tmx"
                                                                                            >
                                                                                                {
                                                                                                    item.doc_name
                                                                                                }
                                                                                            </span>
                                                                                        </Tooltip>
                                                                                        {/* {item?.word_count !== null &&  <span className="word-count-capsule">
                                                                                            <span >{item?.open_as == 'BlogWizard' ? 'Blog wizard' : `${item.word_count} W`}</span>
                                                                                        </span>}
                                                                                    {item?.document_type__type === 'Blog' &&  <span className="word-count-capsule">
                                                                                            <span>Blog article</span>
                                                                                        </span>} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="file-edit-list-table-cell">
                                                                            <div className="file-edit-translation-txt word-count">

                                                                                <span className="file-edit-proj-txt-tmx" >
                                                                                    {
                                                                                        Config.getProjectCreatedDate(item?.created_at)
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="file-edit-list-table-cell">
                                                                            <div className="status-conditions-part dont-open-list">
                                                                                {/* <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                    <span className="file-edit-proj-status-txt docs-delete glossary-status mr-4 d-inline" onMouseUp={() => handleDeleteButton(item)}>
                                                                                        <img
                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                                                                            alt="close_black"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip> */}
                                                                                <Tooltip title={item?.open_as === 'BlogWizard' ? t("open_in_blog") : item?.open_as === 'Book' ? "Open book" : t("open_in_writer")} TransitionComponent={Zoom} placement="top">
                                                                                    <button
                                                                                        style={{
                                                                                            paddingLeft: "30px",
                                                                                            paddingRight: "30px"
                                                                                        }}
                                                                                        className="workspace-files-OpenProjectButton" type="button" onMouseUp={() => handleOpenButtonClick(item)}>
                                                                                        <span className="fileopen-new-btn">{t("open")}</span>
                                                                                    </button>
                                                                                </Tooltip>
                                                                                <MoreOptionsIconDoc docItem={item} deleteOnly={item?.open_as === 'Book' ? false : true} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <React.Fragment>
                                                            <section className="ai-no-project-found">
                                                                <div className="ai-no-project-cont">
                                                                    {
                                                                        convetedDocsSearchTerm ?
                                                                            <img
                                                                                className="empty-folder-img"
                                                                                src={NoEditorsFound2}
                                                                                alt="main-no-project-found"
                                                                            />
                                                                            :
                                                                            <img
                                                                                className="empty-folder-img"
                                                                                src={EmptyProjectsFolder}
                                                                                alt="empty-folder-open"
                                                                            />
                                                                    }
                                                                    <h2>{t("pdf_not_found_note")}</h2>
                                                                    {
                                                                        convetedDocsSearchTerm ?
                                                                            null
                                                                            :
                                                                            <>
                                                                                <button
                                                                                    className="workspace-files-AddNewProjectButton"
                                                                                    onClick={() => {
                                                                                        history("/word-processor", {state: { prevPath: window.location.pathname + window.location.search }});
                                                                                    }}
                                                                                >
                                                                                    <span className="add-new-project-btn">
                                                                                        <img src={PlusIcon} alt="plus" />
                                                                                        {t("new_docs")}
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
                                    )
                                }
                                {showEmptyProjects && (
                                    <React.Fragment>
                                        <section className="ai-no-project-found">
                                            <div className="ai-no-project-cont">
                                                <img
                                                    className="empty-folder-img"
                                                    src={EmptyProjectsFolder}
                                                    alt="empty-folder-open"
                                                />
                                                <h2>{convetedDocsSearchTerm?.length === 0 ? t("no_docs") : t("no_docs_found")}</h2>
                                                {convetedDocsSearchTerm?.length === 0 ? (
                                                    <>
                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                            <button className="workspace-files-AddNewProjectButton"
                                                                onClick={() => {
                                                                    history('/word-processor')
                                                                }}
                                                            >
                                                                <span className="add-new-project-btn">
                                                                    <img src={PlusIcon} alt="plus" />
                                                                    {t("create_new_document")}
                                                                </span>
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    null
                                                )}
                                            </div>
                                        </section>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        {!showListingLoader && <div className="project-setup-pagination">
                            <ul>{paginationContent}</ul>
                        </div>}
                    </div>
                </div>
            </section>

            {showDeleteFileModal && (<Rodal
                visible={showDeleteFileModal}
                {...deletemodaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper" style={isDocumentDeleting ? { pointerEvents: 'none' } : {}}>
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowDeleteFileModal(false) }}><CloseIcon /></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{`${deleteFromDocOrBlog.current === 'doc' ? t('document_delete_note') : deleteFromDocOrBlog.current === 'book' ? t("book_deletion_desc") : t("blog_delete_note")}`}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowDeleteFileModal(false) }}>{t("discard")}</Button>
                            <Button
                                style={isDocumentDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                onClick={() => !isDocumentDeleting && deleteDocument(selectedDocumntId)}
                                variant="contained"
                            >
                                {isDocumentDeleting ? (
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
        </React.Fragment>
    )
}

export default MyDocuments