import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import ButtonBase from '@mui/material/ButtonBase';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Config from "../../vendor/Config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ConvertedPdfList from "../toolkit-component/ConvertedPdfList";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import PaginationLeft  from "../../assets/images/new-ui-icons/pagination-left.svg";
import PaginationRight  from "../../assets/images/new-ui-icons/pagination-right.svg";
import PlusIcon from "../../assets/images/new-ui-icons/plus.svg";
import ChatSearch from "../../assets/images/chat/chat-search.svg";
import SearchBarClose from "../../assets/images/assign-page/search-bar-close.svg";
import DeleteBinIcon from "../../assets/images/new-ui-icons/assets-delete-icon.svg";
import NoEditorsFound2 from "../../assets/images/no-editors-found-2.svg";
import EmptyProjectsFolder from "../../assets/images/empty-projects-folder.svg";
import ConfirmIcon from "../../assets/images/new-ui-icons/confirm-icon.svg";

const MyFiles = (props) => {
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const location = useLocation();
    const { t } = useTranslation();
    const history = useNavigate();
    const [didMount, setDidMount] = useState(false);
    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [documentsList, setDocumentsList] = useState(null);
    const [documentName, setDocumentName] = useState("Untitled");
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
    const [selectedSortValue, setselectedSortValue] = useState('-id');
    const [sortEl, setSortEl] = useState(null);

    const fileUploadTop = createRef();
    const projectsPerPage = useRef(20);
    const searchTermRef = useRef(null);
    const documentIdRef = useRef(null);
    const searchTermCloseOutside = useRef();

    const open = Boolean(sortEl);

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

    // const AiMarkCancel = withStyles((theme) => ({
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

    // const OpenProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "7px 26.625px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

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

    const orderByOptions = [
        { value: 'doc_name', label: 'A-Z' },
        { value: '-doc_name', label: 'Z-A' },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ];       
    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
    };

    useEffect(() => {
        setDidMount(true);
        getDocumentList();
    }, []);

    useEffect(() => {
        if(activeTab === 1){
            history(`/create/my-files/documents-list?page=1`);
        }else{
            history(`/create/my-files/pdf-list?page=1`);
        }
    }, [activeTab]);

    useEffect(() =>{
        if(projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete){
            setIsSearchTermDelete(false);
        }
    }, [projectSearchTerm, isSearchTermDelete]);

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

    const handleSelectedMenuItem = (e, index, value) => {
        setselectedSortValue(value);
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };

    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && convetedDocsSearchTerm == ""){
            setConvertedDocsListSearch(false);
            e.target.blur();
        }else if(e.which === 13){
            let pageParam = URL_SEARCH_PARAMS.get("page");
            if(pageParam != 1){
                pageSelect(1);
            }else{
                getDocumentList();
            }
            setConvertedDocsListSearch(false);
            searchTermRef.current = convetedDocsSearchTerm;
            e.target.blur();
        }
    }

    const handleCloseSearchBox = () => {
        setConvertedDocsSearchTerm("");
        setConvertedDocsListSearch(false);
        setIsSearchTermDelete(true);
    }

    useEffect(() => {
        if(selectedSortValue !== null){
            setDocumentsList([]);
            getDocumentList();
        }
    }, [selectedSortValue]);


    const getDocumentList = () => {
        setShowListingLoader(true);
        let list = [];
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
        if (selectedSortValue !== null) url += `&ordering=${selectedSortValue}` ;
        let params = {
            url: url,
            auth: true,
            success: (response) => {
                list = response?.data?.results;
                if (list.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setTimeout(() => {
                    setDocumentsList(list);
                }, 200);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                setShowListingLoader(false);
            },
        };
        Config.axios(params);
    }

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        setDocumentsList([]);
        let url = `/create/my-files/documents-list?page=${page}`;
        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let orderParam = URL_SEARCH_PARAMS.get("order_by");
        if (orderParam != null) url += `&order_by=${orderParam}`;
        history?.push(url);
    };

    /* Pagination content and logic */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages > 1) {
            let url = "/create/my-files/documents-list" + "?page=";
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
    }, [paginationContent]);

    /* Show the pagination content a the bottom */
    useEffect(() => {
        if(didMount){
            paginationContentFunction(currentPage);
        }
    }, [totalPages, currentPage]);

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        if(URL_SEARCH_PARAMS.get("page") !== null && URL_SEARCH_PARAMS.get("page") != 'null'){
            getDocumentList();
        }else if (URL_SEARCH_PARAMS.get("page") == null || URL_SEARCH_PARAMS.get("page") == 'null'){
            // let page = URL_SEARCH_PARAMS.get("page");
            history(`/create/my-files/documents-list?page=1`);
        }
        fileUploadTop.current?.scrollIntoView( { behavior: "smooth" }, 100);
    }, [URL_SEARCH_PARAMS.get("page")]);

    const deleteDocument = (documentId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/mydocuments/${documentId}`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                Config.toast("Document deleted successfully");
                const newArr = documentsList?.filter(obj => obj.id !== documentId);
                setDocumentsList(newArr)
                setShowDeleteFileModal(false)
                if(newArr?.length == 0) setEmptyProjects(true)
            },
        });
    } 


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

        
    const openWriter = (id, name) => {
        history(`/word-processor?document-id=${id}`, {state: {docName: name, prevPath: window.location.pathname + window.location.search}})
    } 

    return (
        <React.Fragment>
            <section className="all-template-glb-wrapper" ref={fileUploadTop}>
                <div className="all-templates-container">
                    <div className="all-template-header">
                        <h1>My Files</h1>
                        {/* <div className="position-relative">
                            <div className={"project-list-search-box " + (fileListSearchEnlarge ? "active" : "")}>
                                <div className="img-box">
                                    <img src={Config.HOST_URL + "assets/images/chat/chat-search.svg"} alt="search-icon" />
                                </div>
                                <input 
                                    onClick={() => setFileListSearchEnlarge(true)}
                                    value={projectSearchTerm}
                                    // autoFocus={projectSearchTerm ? true : false}
                                    onChange={(e) => setProjectSearchTerm(e.target.value)}
                                    type="search"
                                    placeholder={"Search all templates"}
                                    onKeyUp={(e) => SearchTermFilterEnter(e)}
                                    onFocus={() => setFileListSearchEnlarge(true)}
                                    // onBlur={(e) => {
                                    //     setFileListSearchEnlarge(false);
                                    // }}
                                />
                                <span className={"close " + ((fileListSearchEnlarge || projectSearchTerm !== "") ? "show " : " ")}
                                    onClick={() => handleCloseSearchBox()}
                                >
                                    <img src={Config.HOST_URL + "assets/images/assign-page/search-bar-close.svg"} alt="search-bar-close" />
                                </span>
                            </div>
                            <div ref={searchTermCloseOutside} className={"search-results-bar project-list-search-bar " + (fileListSearchEnlarge ? "show" : "hide")}>
                                <div name="search-dropdown" onClick={(e)=>(projectSearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (projectSearchTerm !== "" ? " " : "cursor-change")}>
                                    <SearchIcon className="search-icon" name="search-dropdown" />
                                    <div className="searched-results-info" name="search-dropdown">
                                        <p className="searched-term" name="search-dropdown">{projectSearchTerm}</p>
                                        {
                                            projectSearchTerm !== "" ? 
                                                <p className="results-link" name="search-dropdown">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                            :
                                                <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_proj_list_2")}</span></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="all-templates-tab-wrapper">
                        <ul className="templates-tab-list">
                            <li className={activeTab === 1 ? "active" : ""} onClick={() => {setActiveTab(1); history("/create/my-files/documents-list?page=1")}}>My Documents</li>
                            <li className={activeTab === 2 ? "active" : ""} onClick={() => {setActiveTab(2); history("/create/my-files/pdf-list?page=1")}}>Converted</li>
                        </ul>
                        <div className="templates-box-list-wrapper">
                                {
                                    activeTab === 1 &&
                                    <section className="glossaries-list-wrapper">
                                        <div className="header-align glossary-header pdf-convert docs-list">
                                            {/* <Breadcrumbs /> */}
                                            <div className="pdf-convert-header-wrapper">
                                                <div className="header-project-setup-align-wrap">
                                                    {/* <p className="section-header">My lists</p> */}
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
                                                                    // onBlur={(e) => {
                                                                    //     setconvetedDocsListSearch(false);
                                                                    // }}
                                                                />
                                                                <span className={"close " + ((convetedDocsListSearch || convetedDocsSearchTerm !== "") ? "show " : " ")}
                                                                    onClick={() => handleCloseSearchBox()}
                                                                >
                                                                    <img src={SearchBarClose} alt="search-bar-close" />
                                                                </span>
                                                            </div>
                                                            <div ref={searchTermCloseOutside} className={"search-results-bar glossary-proj-list " + (convetedDocsListSearch ? "show" : "hide")}>
                                                                <div onClick={(e)=>(convetedDocsSearchTerm !== "" ? getDocumentList(e) : "")} className={"search-results-item " + (convetedDocsSearchTerm !== "" ? " " : "cursor-change")}>
                                                                    <SearchIcon className="search-icon" />
                                                                    <div className="searched-results-info">
                                                                        <p className="searched-term">{convetedDocsSearchTerm}</p>
                                                                        {
                                                                            convetedDocsSearchTerm !== "" ?
                                                                            <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                                            :
                                                                            <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_convert_list_1")}</span></p>
                                                                        }
                        
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                            <ButtonBase className="mydocument-files-AddProjectButton" component={Link} to="/word-processor">
                                                                <span className="add-project-btn">
                                                                    <AddIcon
                                                                        style={{
                                                                            width: 20,
                                                                            color: "#ffffff"
                                                                        }}
                                                                    /> 
                                                                    New document
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
                                                                    <span>Document name</span>
                                                                </div>
                                                            </div>
                                                            <div className="file-edit-heading-table-cell">
                                                                <div 
                                                                    // onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} 
                                                                    className="listing-table-header-container"
                                                                >
                                                                    <span>Created at</span>
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
                                                                        (documentsList?.length != 0 || convetedDocsSearchTerm != "")  ? 
                                                                            (
                                                                                documentsList?.map((item, key) => {
                                                                                    return(
                                                                                        <div
                                                                                            className="file-edit-list-table-row"
                                                                                            key={item.id}
                                                                                        >
                                                                                            <div className="file-edit-list-table-cell-wrap">
                                                                                                <div className="file-edit-list-table-cell">
                                                                                                    <div className="proj-title-list-container">
                                                                                                        <img
                                                                                                            src={
                                                                                                                Config.BASE_URL
                                                                                                                +"/app/extension-image/docx"
                                                                                                            }
                                                                                                            alt="document"
                                                                                                        />
                                                                                                        <div className="proj-list-info">
                                                                                                            <div className="proj-information">
                                                                                                                
                                                                                                                <span
                                                                                                                    className="file-edit-proj-txt-tmx"
                                                                                                                >
                                                                                                                    {
                                                                                                                        item.doc_name
                                                                                                                    }
                                                                                                                </span>
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
                                                                                                        <Tooltip title="Open in writer" TransitionComponent={Zoom} placement="top">
                                                                                                            <button 
                                                                                                              style={{
                                                                                                                paddingLeft: "30px",
                                                                                                                paddingRight: "30px"
                                                                                                            }}
                                                                                                            className="workspace-files-OpenProjectButton" type="button" onMouseUp={() =>  openWriter(item?.id, item?.doc_name)}>
                                                                                                                <span className="fileopen-new-btn">Open</span>
                                                                                                            </button>
                                                                                                        </Tooltip>
                                                                                                        <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                                            <span className="file-edit-proj-status-txt glossary-status ml-3 d-inline" onMouseUp={() => {setSelectedDocumntId(item?.id); setShowDeleteFileModal(true)}}>
                                                                                                                <img
                                                                                                                    src={DeleteBinIcon}
                                                                                                                    alt="close_black"
                                                                                                                />
                                                                                                            </span>
                                                                                                        </Tooltip>
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
                                                                        <h2>No documents</h2>
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
                                    </section>
                                }
                                {
                                    activeTab === 2 &&
                                    <>
                                        <ConvertedPdfList />
                                    </>
                                    // <div className="upload-files-section converted-pdf-list-wrap">
                                    //     <div id="select-files" className="uploaded-files">
                                    //         <div className="file-edit-heading-row">
                                    //             <div className="file-edit-heading-table">
                                    //                 <div className="file-edit-heading-table-row">
                                    //                     <div
                                    //                         // onClick={(e) => orderBy(orderField?.indexOf("-project_name") !== -1 ? "project_name" : "-project_name")}
                                    //                         className="file-edit-heading-table-cell"
                                    //                     >
                                    //                         <div className="listing-table-header-container">
                                    //                             <span>Document name</span>
                                    //                         </div>
                                    //                     </div>
                                    //                     <div className="file-edit-heading-table-cell">
                                    //                         <div 
                                    //                             // onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} 
                                    //                             className="listing-table-header-container"
                                    //                         >
                                    //                             <span>Created at</span>
                                    //                         </div>
                                    //                     </div>
                                    //                     <div className="file-edit-heading-table-cell">
                                    //                         <div className="status-name">{t("action")}</div>
                                    //                     </div>
                                    //                 </div>
                                    //                 {
                                    //                     documentsList?.length != 0 && !showListingLoader ? 
                                    //                         (
                                    //                             <React.Fragment>
                                    //                                 {
                                    //                                     (documentsList?.length != 0)  ? 
                                    //                                         (
                                    //                                             documentsList?.map((item, key) => {
                                    //                                                 return(
                                    //                                                     <div
                                    //                                                         className="file-edit-list-table-row"
                                    //                                                         key={item.id}
                                    //                                                     >
                                    //                                                         <div className="file-edit-list-table-cell-wrap">
                                    //                                                             <div className="file-edit-list-table-cell">
                                    //                                                                 <div className="proj-title-list-container">
                                    //                                                                     <img
                                    //                                                                         src={
                                    //                                                                             Config.BASE_URL
                                    //                                                                             +"/app/extension-image/pdf"
                                    //                                                                         }
                                    //                                                                         alt="document"
                                    //                                                                     />
                                    //                                                                     <div className="proj-list-info">
                                    //                                                                         <div className="proj-information">
                                                                                                                
                                    //                                                                             <span
                                    //                                                                                 className="file-edit-proj-txt-tmx"
                                    //                                                                             >
                                    //                                                                                 {
                                    //                                                                                     item.Docs
                                    //                                                                                 }
                                    //                                                                             </span>
                                    //                                                                         </div>
                                    //                                                                     </div>
                                    //                                                                 </div>
                                    //                                                             </div>
                                    //                                                             <div className="file-edit-list-table-cell">
                                    //                                                                 <div className="file-edit-translation-txt word-count">
                                    //                                                                     <span className="file-edit-proj-txt-tmx" >
                                    //                                                                         {
                                    //                                                                             item.Date
                                    //                                                                         }
                                    //                                                                     </span>
                                    //                                                                 </div>
                                    //                                                             </div>
                                    //                                                             <div className="file-edit-list-table-cell">
                                    //                                                                 <div className="status-conditions-part dont-open-list">
                                    //                                                                     <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                    //                                                                         <span className="file-edit-proj-status-txt glossary-status">
                                    //                                                                             <img
                                    //                                                                                 src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"}
                                    //                                                                                 alt="close_black"
                                    //                                                                             />
                                    //                                                                         </span>
                                    //                                                                     </Tooltip>
                                    //                                                                 </div>
                                    //                                                             </div>
                                    //                                                         </div>
                                    //                                                     </div>
                                    //                                                 )
                                    //                                             })
                                    //                                         ) 
                                    //                                         : 
                                    //                                         (
                                    //                                             <React.Fragment>
                                    //                                                 <section className="ai-no-project-found">
                                    //                                                     <div className="ai-no-project-cont">
                                    //                                                         <img
                                    //                                                             className="empty-folder-img"
                                    //                                                             src={Config.HOST_URL + "assets/images/empty-projects-folder.svg"}
                                    //                                                             alt="empty-folder-open"
                                    //                                                         />
                                    //                                                         <h2>{t("pdf_not_found_note")}</h2>
                                    //                                                         <AddNewProjectButton
                                    //                                                             // onClick={() => {
                                    //                                                             //     history("/create/tool-kit/pdf/convert-pdf");
                                    //                                                             // }}
                                    //                                                         >
                                    //                                                             <span className="add-new-project-btn">
                                    //                                                                 <img src={Config.HOST_URL + "assets/images/new-ui-icons/plus.svg"} alt="plus" /> 
                                    //                                                                 Convert a pdf
                                    //                                                             </span>
                                    //                                                         </AddNewProjectButton>
                                    //                                                     </div>
                                    //                                                 </section>
                                    //                                             </React.Fragment>
                                    //                                         )
                                    //                                 }
                                    //                             </React.Fragment>
                                    //                         ) 
                                    //                         : 
                                    //                         (
                                    //                             !showEmptyProjects && (
                                    //                                 <React.Fragment>
                                    //                                     {Array(projectsPerPage?.current)
                                    //                                         .fill(null)
                                    //                                         .map((value, key) => (
                                    //                                             <div className="file-edit-list-table-row" key={key}>
                                    //                                                 <div className="file-edit-list-table-cell">
                                    //                                                     <div className="d-flex align-items-center">
                                    //                                                         <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    //                                                         <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={115} />
                                    //                                                     </div>
                                    //                                                 </div>
                                    //                                                 <div className="file-edit-list-table-cell">
                                    //                                                     <div className="d-flex align-items-center">
                                    //                                                         <Skeleton animation="wave" style={{ marginLeft: "1rem" }} variant="text" width={100} />
                                    //                                                     </div>
                                    //                                                 </div>
                                    //                                                 <div className="file-edit-list-table-cell">
                                    //                                                     <div className="status-conditions-part">
                                    //                                                         <div className="d-flex align-items-center">
                                    //                                                             <Skeleton
                                    //                                                                 animation="wave"
                                    //                                                                 style={{ marginRight: "1rem" }}
                                    //                                                                 variant="text"
                                    //                                                                 width={20}
                                    //                                                             />
                                    //                                                             <Skeleton animation="wave" variant="text" width={55} />
                                    //                                                         </div>
                                    //                                                     </div>
                                    //                                                 </div>
                                    //                                             </div>
                                    //                                         ))}
                                    //                                     <div className="project-setup-pagination">
                                    //                                         <ul>
                                    //                                             <li>
                                    //                                                 <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                    //                                             </li>
                                    //                                             <li>
                                    //                                                 <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                    //                                             </li>
                                    //                                             <li>
                                    //                                                 <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                    //                                             </li>
                                    //                                             <li>
                                    //                                                 <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                    //                                             </li>
                                    //                                         </ul>
                                    //                                     </div> 
                                    //                                 </React.Fragment>
                                    //                             )
                                    //                         )
                                    //                 }
                                    //                 {showEmptyProjects && (
                                    //                     <React.Fragment>
                                    //                         <section className="ai-no-project-found">
                                    //                             <div className="ai-no-project-cont">
                                    //                                 <img
                                    //                                     className="empty-folder-img"
                                    //                                     src={Config.HOST_URL + "assets/images/empty-projects-folder.svg"}
                                    //                                     alt="empty-folder-open"
                                    //                                 />
                                    //                                 <h2>{t("pdf_not_found_note")}</h2>
                                    //                             </div>
                                    //                         </section>
                                    //                     </React.Fragment>
                                    //                 )}
                                    //             </div>
                                    //         </div>
                                    //         <div className="project-setup-pagination">
                                    //             <ul>{paginationContent}</ul>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                }
                        </div>
                    </div>
                </div>
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
                            <button className="mydocument-AiMarkSubmit" onClick={() => deleteDocument(selectedDocumntId)}>
                                <span className="submit-txt">Delete</span>
                            </button>
                        </div>
                    </div>
                </Rodal>)}
            </section>
        </React.Fragment>
    )
};

export default MyFiles;