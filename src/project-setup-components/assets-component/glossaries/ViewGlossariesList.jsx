import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Config from "../../../Config";
import ButtonBase from '@mui/material/ButtonBase';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TranslateIcon from '@mui/icons-material/Translate';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import { Collapse } from 'reactstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import FadeInRight from "../../../animation-styles/FadeInRightSuggestion";
import FadeInLeft from "../../../animation-styles/FadeInLeftSuggestion";
import FadeInRightModal from "../../../animation-styles/FadeInRight";
import FadeInLeftModal from "../../../animation-styles/FadeInLeft";
import { AnimatePresence, motion } from "framer-motion";
import Select, { components } from "react-select";
import GlossaryClone from "../../../vendor/model-select/GlossaryClone";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import NewTooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaginationLeft from "../../../assets/images/new-ui-icons/pagination-left.svg"
import PaginationRight from "../../../assets/images/new-ui-icons/pagination-right.svg"
import ChatSearch from "../../../assets/images/chat/chat-search.svg"
import SearchBarClose from "../../../assets/images/assign-page/search-bar-close.svg"
import UnopenedProjSymbol from "../../../assets/images/new-unopened-proj-symbol.svg"
import PlusIcon from "../../../assets/images/new-ui-icons/plus.svg"
import WikipediaIcon from "../../../assets/images/glossary-workspace/wikipedia.svg"
import WikitionaryIcon from "../../../assets/images/glossary-workspace/wiktionary.png"
import TranslateBlack from "../../../assets/images/glossary-workspace/translate_black.svg"
import TermDeleteIcon from "../../../assets/images/new-ui-icons/term_delete_icon.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"


const ViewGlossariesList = (props) => {
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const location = useLocation();
    const history = useNavigate();
    const { t } = useTranslation();


    const [didMount, setDidMount] = useState(false);
    const [glossaryListSearch, setGlossaryListSearch] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
    const [paginationContent, setPaginationContent] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderField, setOrderField] = useState(null);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [glossaryProjectList, setGlossaryProjectList] = useState([])
    const [showListingLoader, setShowListingLoader] = useState(false);
    const [openedProjectId, setOpenedProjectId] = useState(null);
    const [selectedProjectFiles, setSelectedProjectFiles] = useState([]);
    const [projectType, setProjectType] = useState(null);
    const [selectFileRow, setSelectFileRow] = useState(false);
    const [creditsPromptClose, setCreditsPromptClose] = useState()
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [projectWordCount, setProjectWordCount] = useState(0);
    const [projectCharCount, setProjectCharCount] = useState(0);
    const [projectSegmentCount, setProjectSegmentCount] = useState(0);
    const [selectedProjectFilesCount, setSelectedProjectFilesCount] = useState(1);
    const [selectedProjectAnalysis, setSelectedProjectAnalysis] = useState(null);
    const [assignProjectId, setAssignProjectId] = useState(null);
    const [showWordCountLoader, setShowWordCountLoader] = useState(false);
    const [showWordCount, setshowWordCount] = useState(false);
    const [showCloneModal, setShowCloneModal] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [instructionText, setInstructionText] = useState(null);
    const [instructionFile, setInstructionFile] = useState(null);
    const [taskAssignInfoId, setTaskAssignInfoId] = useState(null);
    const [showAssignManageModal, setShowAssignManageModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [assignedTaskId, setAssignedTaskId] = useState(null);
    const [selectedProjectFiledID, setselectedProjectFiledID] = useState(null)
    const [poPDFUrl, setPoPDFUrl] = useState(null)
    const [particularClickedTask, setParticularClickedTask] = useState(null)
    const [stepToAccept, setStepToAccept] = useState(null)
    const [showPoModal, setShowPoModal] = useState(false);
    const [clickedOpenButton, setClickedOpenButton] = useState(null);
    const [showDurationAlertModal, setShowDurationAlertModal] = useState(false);
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [projectSearchTerm, setProjectSearchTerm] = useState("");
    // const [termCopied, setTermCopied] = useState(false);
    // const [open, setOpen] = useState(false);

    // Glossary project states
    const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
    const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
    const [detailsOfPrimaryGlossarySourceName, setDetailsOfPrimaryGlossarySourceName] = useState("");
    const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
    const [glossaryLicense, setGlossaryLicense] = useState("");
    const [selectedUsagePermission, setSelectedUsagePermission] = useState({ value: 1, label: t("private") });
    const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
    const [selectedGlossaryProject, setSelectedGlossaryProject] = useState(null)
    const [creditsDetectionPrompt, setCreditsDetectionPrompt] = useState(false)

    const [mtSuggestion, setMtSuggestion] = useState(null)
    const [showFirstGlossaryCreationModal, setShowFirstGlossaryCreationModal] = useState(false)
    const [firstTaskId, setFirstTaskId] = useState(null)
    const [projectID, setProjectID] = useState(null)

    const projectsPerPage = useRef(20);
    const fileUploadTop = createRef();
    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const projectIdToSelect = useRef(null);
    const searchTermCloseOutside = useRef();
    const didMountRef = useRef(null)
    const isSearchTermDeletedRef = useRef(false)

    const [sortEl, setSortEl] = useState(null);
    const [selectedSortValue, setselectedSortValue] = useState('-id')
    const open = Boolean(sortEl);


    const showSettingsModal = () => setshowSettings(true);

    const showAddTermModal = (e) => setAddNewTermModal(true);

    // download source audo file 
    const downloadSourceAudioFile = (taskID) => {
        window.location.href = `${Config.BASE_URL}/workspace/download_text_to_speech_source/?task=${taskID}`
    }

    useEffect(() => {
        if (typeof Cookies.get("isCreditPromptSeen") == "undefined"){
            setCreditsPromptClose(true)
        }
    }, []);


    const handleCloseCreditsPrompt = () => {
         Cookies.set("isCreditPromptSeen", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
         setCreditsPromptClose(false)
    } 


    // const AddProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         borderRadius: "3px",
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: "8px 12px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);
    
    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setGlossaryListSearch(false);
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

    const handleSelectedMenuItem = (e, value) => {
        setselectedSortValue(value)
        orderBy(value)
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };

    const handleWikipediaCopyText = () => {
        navigator.clipboard.writeText(wikipediaData?.target)
    }

    const handleWikitionaryCopyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const handleMtSuggestionCopyText = (text) => {
        navigator.clipboard.writeText(mtSuggestion)
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

    // const OpeningProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "7px 13.5px",
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

    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
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
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            color: "#292929",
            fontFamily: "Roboto",
            fontSize: "15px",
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
            border: state.isFocused ? "1px solid #0074D3" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#0074D3" : "#292929",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            height: 44,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    // get the PO pdf url
    const getPOPdf = (assignmentId) => {
        Config.axios({
            url: `${Config.BASE_URL}/aipay/po-pdf/?assignment_id=${assignmentId}`,
            auth: true,
            method: "GET",
            success: (response) => {
                if(response.status === 200){
                    // console.log(response.data.url)
                    setPoPDFUrl(`${Config.BASE_URL}${response?.data?.url}`)
                }else{
                    Config.toast(t("something_went_wrong"), 'error')
                }
            },
        });
    } 


    /* Open workspace for a particular job */
    const openFile = (e, key = null, id = null, url = "", isFirstOpen) => {
       
        // if url is null means its glossary project [glossary porject type = 3]
        if (projectType === 3) {
            setTimeout(() => {
                // window.location.href = 'workspace/' + response.data.document_id
                history?.push(`glossary-workspace?project-id=${selectedProjectId}&document-id=${id}`);
            });
        }     
        
    };

    useEffect(() => {
        setDidMount(true)
    }, [])

    // call get list when sorting value is changed
    // useEffect(() => {
    //     if(selectedSortValue !== null){
    //         setGlossaryProjectList([])
    //         console.log('sort value');
    //         // listGlossaryProjects()
    //     }
    // }, [selectedSortValue])

    useEffect(() => {
        // console.log(location.state?.isFirst)
        if(location.state?.isFirst){
            setShowFirstGlossaryCreationModal(true)
            setProjectID(URL_SEARCH_PARAMS.get("open-project"))
        }
    }, [location.state, URL_SEARCH_PARAMS.get("open-project")])
    
    

    const listGlossaryProjects = () => {
        setGlossaryListSearch(false);
        setShowListingLoader(true);

        setGlossaryProjectList([])
        /* Page param set/get - start */
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            // setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);

        let orderFieldTemp = "-id";
        let orderParam = URL_SEARCH_PARAMS.get("order_by");
        if (orderParam != null) orderFieldTemp = orderParam;
        let searchParam = URL_SEARCH_PARAMS.get("search");
        /* Page param set/get - start */
        let url = `${Config.BASE_URL}/workspace/project/quick/setup/?filter=glossary&page=${page}&ordering=${orderFieldTemp}`;
        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;

        let list = []
        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                list = response?.data?.results?.filter((each) => each?.assign_enable === true)
                if (list.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setTimeout(() => {
                    setGlossaryProjectList(list)
                }, 200);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
                setShowListingLoader(false);

                // let id = URL_SEARCH_PARAMS.get("open-project")
                // if(id != null){
                //     selectProjectById(id)
                //     setSelectFileRow(true)
                // }
                
            },
        });

    }
    



    /* Starts when user stops typing */
    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 400);
    };
    
    

     /* Show the pagination content a the bottom */
    useEffect(() => {
        if(didMount){
            paginationContentFunction(currentPage);
        }
    }, [totalPages, currentPage]);

    /* Go to the top of the page when move to another pages */
    useEffect(() => {
        if(URL_SEARCH_PARAMS.get("page") != null){
            // console.log('from page');
            listGlossaryProjects();
        }else if (URL_SEARCH_PARAMS.get("page") == null || URL_SEARCH_PARAMS.get("page") == 'null'){
            history(`/create/assets/glossaries/my-glossaries?page=1`)
        }
        fileUploadTop.current.scrollIntoView(
            {
                behavior: "smooth",
            },
            100
        );
    }, [URL_SEARCH_PARAMS.get("page")]);

    useEffect(() => {
        let order = URL_SEARCH_PARAMS.get("order_by")
        if(order !== null && order !== undefined){
            setselectedSortValue(orderByOptions?.find(each => each?.value == order)?.value)
            listGlossaryProjects();
        }
    }, [URL_SEARCH_PARAMS.get("order_by")]);


    // automatically open accordian based on the project ID  
    useEffect(() => {
        let id = URL_SEARCH_PARAMS.get("open-project")
        if(id != null){
            setSelectFileRow(true)
            selectProjectById(id)
        }
    }, [URL_SEARCH_PARAMS.get("open-project")]);

    useEffect(() => {
        let searchParam = URL_SEARCH_PARAMS.get("search")
        // console.log(isSearchTermDelete);
        // console.log('fromsearch');

        if(searchParam !== null && searchParam !== undefined){
            // console.log('from search');
            setGlossarySearchTerm(searchParam)
            listGlossaryProjects();
        }else if(isSearchTermDelete || isSearchTermDeletedRef.current){
            // console.log('from search');
            listGlossaryProjects();
        }
    }, [URL_SEARCH_PARAMS.get("search")]);

    /* Set the current page and redirect */
    const pageSelect = (page = 1) => {
        let url = `/create/assets/glossaries/my-glossaries?page=${page}`;
        let queryParam = new URLSearchParams(window.location.search)
        let orderParam = queryParam.get("order_by");
        if (orderParam != null) url += `&order_by=${orderParam}`;
        let projectIdParam = queryParam.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let filterParam = queryParam.get("filter");
        if (filterParam != null) url += `&filter=${filterParam}`;
        let searchParam = queryParam.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        history(url);
    };

    /* Set order by value and redirect */
    const orderBy = (orderFieldTemp) => {
        let url = `/create/assets/glossaries/my-glossaries?page=1`;
        if (orderFieldTemp != null) url += `&order_by=${orderFieldTemp}`;
        let projectIdParam = URL_SEARCH_PARAMS.get("open-project");
        if (projectIdParam != null) url += `&open-project=${projectIdParam}`;
        let searchParam = URL_SEARCH_PARAMS.get("search");
        if (searchParam != null) url += `&search=${searchParam}`;
        history(url);
    };
    
    const projectSearchFunctionality = (param) => {
        let orderby = URL_SEARCH_PARAMS.get("order_by")
        let url = `/create/assets/glossaries/my-glossaries?page=1&order_by=${orderby}`;
        if(param !== 'clear-search'){
            if (glossarySearchTerm != null) url += `&search=${glossarySearchTerm}`;
        }
        history(url);
    } 
    

    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && glossarySearchTerm == ""){
            setGlossaryListSearch(false);
            e.target.blur()
        }else if(e.which === 13){
            // console.log('from search');
            projectSearchFunctionality()
            setGlossaryListSearch(false);
            e.target.blur()
        }
    }

    const handleSearchDropDownClick = (e) => {
        projectSearchFunctionality()
    } 

    useEffect(() =>{ 
        if(glossarySearchTerm == "" && isSearchTermDelete){
            // console.log('from empty search');
            isSearchTermDeletedRef.current = true
            setIsSearchTermDelete(false)
            projectSearchFunctionality('clear-search')
        }
    }, [glossarySearchTerm, isSearchTermDelete])

    const handleCloseSearchBox = () => {
        setGlossarySearchTerm("")
        setGlossaryListSearch(false)
        setIsSearchTermDelete(true)
    }



    let selectedFilesData = "";
    let isColorClassAdded = false;
    let activeColorTarget = "";
    let editorAssignmentDetails = {};
    let reviewerAssignDetails = {};
    let role = ""
    let isAssignedProject = null;



    const editProject = (e = null, projectId, projectType) => {
        // console.log(e, projectId, )
        // console.log(projectType)
        if(projectType === 3){
            history?.push("/create/assets/glossaries/create?page=1&get-project-info=" + projectId + "&type=" + projectType );
        }
     };


    /* Pagination content and logic */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages > 1) {
            let url = "/create/assets/glossaries/my-glossaries" + "?page=";
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
    

    /* Collapse the project selection */
    const selectProject = (e, projectId, projectType) => {
        let shouldListFiles = e.target?.getAttribute("should-open-files");

        if (hasParentThisClass(e?.target, "selected-file-row") || hasParentThisClass(e?.target, "dont-open-files")) return;
        setSelectedProjectFiles([]);
        setProjectType(projectType);

        if (projectId == openedProjectId) {
            setOpenedProjectId(null);
        } else {
            selectProjectById(projectId, shouldListFiles);
            setSelectFileRow(true)
        }
    };

    /* Check any of the parent element has the specific :classname. Even the current element has the class also true */
    const hasParentThisClass = (element, classname) => {
        if(element.nodeName != 'svg' && element.nodeName != 'path'){
            if (element?.className != null) if (element?.className?.split(" ")?.indexOf(classname) >= 0) return true;
            return element?.parentNode && hasParentThisClass(element?.parentNode, classname);
        }
    };


    /* Select a particular project by id */
    const selectProjectById = (projectId, shouldListFiles) => {
        if (shouldListFiles !== "dont-open") setOpenedProjectId(projectId);
        setSelectedProjectId(projectId);
        listFiles(projectId);
        let createdProject = glossaryProjectList.find((element) => element.id == projectId);
        if (createdProject?.project_name != null) setSelectedProjectName(createdProject.project_name);
        if (createdProject?.project_analysis != null) {
            let createdProjectAnalysis = createdProject.project_analysis;
            setProjectWordCount(createdProjectAnalysis.proj_word_count);
            setProjectCharCount(createdProjectAnalysis.proj_char_count);
            setProjectSegmentCount(createdProjectAnalysis.proj_seg_count);
        }
    };

     /* Handling the instruction popup */
     const handleInstructionModal = (taskId, eachRole) => {
        let selectedTask = selectedProjectFiles.find((element) => element.id === taskId);
        setInstructionText(eachRole?.instruction);
        setInstructionFile(eachRole?.instruction_files[0]?.filename);
        setTaskAssignInfoId(eachRole?.instruction_files[0]?.id);
        setShowAssignManageModal(true);
        setAnchorEl(null);
    };

    /* Edit task by id */
    const editTask = (e, projectId, taskId, stepId) => {
        // console.log(taskId)
        setAssignedTaskId(taskId);
        props.history(`/collaborate?project=${projectId}&task=${taskId}&_edit=${true}&_step=${stepId}`);
        // setAnchorEl(null);
        // activeToggle(3);
    };

    // unassign editor from task
    const unassignEditor = (taskId, stepId, projectID) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?task=${taskId}&step=${stepId}`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                // console.log(response.data)
                Config.toast(t("task_unassigned"));
                props.history(`/file-upload?page=1&open-project=${projectID}`)
                // setAnchorEl(null);
                // listProjects(openedProjectId); 
            },
        });
    }

    /* List files for specific project */
    const listFiles = (projectId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                setSelectedGlossaryProject(response.data.glossary_files)
                setSelectedProjectFilesCount(response.data?.files?.length != null ? response.data.files.length : 1);
                setProjectType(response.data?.project_type_id);
                Config.axios({
                    url: Config.BASE_URL + "/workspace/vendor/dashboard/" + projectId,
                    auth: true,
                    success: (response) => {
                        // let responseTemp = response.data;
                        setSelectedProjectFiles(response.data);
                        setSelectedProjectAnalysis(glossaryProjectList.find((element) => element.id == projectId)?.project_analysis);
                        setFirstTaskId(response.data[0]?.id)
                    },
                });
            },
        });
    };
    

    const orderByOptions = [
        { value: 'project_name', label: t("a_to_z") },
        { value: '-project_name', label: t("z_to_a") },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ]

    // ======================================================================================

    const [addNewTermModal, setAddNewTermModal] = useState(false);
    const [editTermForm, setEditTermForm] = useState(false);
    const [termCreateTabs, setTermCreateTabs] = useState(1);
    const [wikipediaData, setWikipediaData] = useState(null)
    const [wiktionaryData, setWiktionaryData] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null);
    const [sourceLanguageTerm, setSourceLanguageTerm] = useState("");
    const [targetLanguageTerm, setTargetLanguageTerm] = useState("");
    const [termNote, setTermNote] = useState("");
    const [termContext, setTermContext] = useState("");
    const [sourceOfSourceLanguageTerm, setSourceOfSourceLanguageTerm] = useState("");
    const [sourceOfTargetLanguageTerm, setSourceOfTargetLanguageTerm] = useState("");
    const [sourceLanguageDefinition, setSourceLanguageDefinition] = useState("");
    const [targetLanguageDefinition, setTargetLanguageDefinition] = useState("");
    const [selectedTermType, setSelectedTermType] = useState({});
    const [selectedGender, setSelectedGender] = useState({});
    const [selectedUsageStatus, setSelectedUsageStatus] = useState({});
    const [geographyUsage, setGeographyUsage] = useState("");
    const [termLocation, setTermLocation] = useState("");
    const [selectedPOS, setSelectedPOS] = useState({});
    const [error, setError] = useState({ slError: "" });
    const [termAdvBox, setTermAdvBox] = useState({
        note: false,
        context: false,
        sl_definition: false,
        tl_definition: false,
        src_sl_term: false,
        src_tl_term: false
    })
    const [glexTerms, setGlexTerms] = useState([]);

    const sourceLangRef = useRef(null)
    const targetLangRef = useRef(null)
    const documentId = useRef(null);

    
    const partOfSpeechOptions = [
        { value: 1, label: t("verb") },
        { value: 2, label: t("noun") },
        { value: 3, label: t("adjective") },
        { value: 4, label: t("adverb") },
        { value: 5, label: t("pronoun") },
        { value: 6, label: t("other") },
        { value: "", label: t("none") }
    ];

    const termTypeOptions = [
        { value: "fullForm", label: "Full form" },
        { value: "acronym", label: "Acronym" },
        { value: "abbreviation", label: "Abbreviation" },
        { value: "shortForm", label: "Short form" },
        { value: "varient", label: "Varient" },
        { value: "phrase", label: "Phrase" },
    ];

    const genderOptions = [
        { value: 1, label: "Masculine" },
        { value: 2, label: "Feminine" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Other" },
    ];

    const usageStatusOptions = [
        { value: "preferred", label: "Preferred" },
        { value: "admitted", label: "Admitted" },
        { value: "notRecommended", label: "Not recommended" },
        { value: "obsolete", label: "Obsolete" },
    ];

    const handleTermType = (selected) => {
        setSelectedTermType(selected);
    };

    const handleGenderOptions = (selected) => {
        setSelectedGender(selected);
    };

    const handleUsageOptions = (selected) => {
        setSelectedUsageStatus(selected);
    };

    // const SubmitButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: 0,
    //         "&:disabled": {
    //             backgroundColor: "#99c9ee",
    //         },
    //         "&:hover": {
    //             backgroundColor: "#0265b1",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const ClearAllButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#ffffff",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: 0,
    //         "&:hover": {
    //             backgroundColor: "#F3F3F3",
    //         },
    //     },
    // }))(Button);

    const validateForm = () => {
        setError(!sourceLanguageTerm?.length ? { slError: t("required") } : { slError: "" });
        if (!sourceLanguageTerm?.length) return false;
        else return true;
    };

    const handleFormData = (formdata) => {
        if(sourceLanguageTerm !== ""){
            formdata.append("sl_term", sourceLanguageTerm);
        }
        if(targetLanguageTerm !== ""){
            formdata.append("tl_term", targetLanguageTerm);
        }
        if(selectedPOS !== null){
            formdata.append("pos", selectedPOS?.label);
        }
        if(termNote !== ""){
            formdata.append("note", termNote);
        }
        if(termContext !== ""){
            formdata.append("context", termContext);
        }
        if(sourceLanguageDefinition !== ""){
            formdata.append("sl_definition", sourceLanguageDefinition);
        }
        if(targetLanguageDefinition !== ""){
            formdata.append("tl_definition", targetLanguageDefinition);
        }
        if(sourceOfSourceLanguageTerm !== ""){
            formdata.append("sl_source", sourceOfSourceLanguageTerm);
        }
        if(sourceOfTargetLanguageTerm !== ""){
            formdata.append("tl_source", sourceOfTargetLanguageTerm);
        }
        if(selectedTermType !== undefined && Object.keys(selectedTermType)?.length !== 0){
            formdata.append("termtype", selectedTermType?.value);
        }
        if(selectedGender !== undefined && Object.keys(selectedGender)?.length !== 0){
            formdata.append("gender", selectedGender?.label);
        }
        if(selectedUsageStatus !== undefined && Object.keys(selectedUsageStatus)?.length !== 0){
            formdata.append("usage_status", selectedUsageStatus?.value);
        }
        if(geographyUsage !== ""){
            formdata.append("geographical_usage", geographyUsage);
        }
        if(termLocation !== ""){
            formdata.append("term_location", termLocation);
        }
        formdata.append("task", documentId?.current);
        return formdata;
    };

    useEffect(() => {
        if (documentId.current !== null) getGlexTerms();
    }, [documentId.current]);

    const getGlexTerms = (value = 0) => {
        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/?task=${documentId.current}`,
            method: "GET",
            auth: true,
            success: (response) => {
                setGlexTerms(response.data);
            },
        });
        // if (value !== 0) setSelectedItem(value);
    };

    
    const handleSaveButton = () => {
        let term = -1;
        let url = "";
        let method = "";
        let formdata = new FormData();
        if (validateForm()) {
            if (!selectedItem) {
                url = `${Config.BASE_URL}/glex/term_upload/`;
                method = "POST";
                term = 1;
            } else {
                url = `${Config.BASE_URL}/glex/term_upload/${selectedItem}/`;
                method = "PUT";
                term = 2;
            }

            let data = handleFormData(formdata);
            Config.axios({
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
                },
                url: url,
                method: method,
                data: data,
                auth: true,
                success: (response) => {
                    if (term == 1){
                        Config.toast(t("new_term_saved"));
                    } 
                    else if (term == 2){
                        Config.toast(t("term_updated"));
                    } 
                    setTimeout(() => {
                        getGlexTerms(term === 1 ? response?.data?.id : 0);
                    }, 80);
                    setAddNewTermModal(false)
                },
                error: (err) => {
                    if(err.response.status === 400){
                        if(err.response.data?.sl_source){
                            Config.toast(t("sl_src_text_exceed_warn"), 'warning');
                            return;
                        }
                        if(err.response.data?.tl_source){
                            Config.toast(t("tl_src_text_exceed_warn"), 'warning');
                            return;
                        }
                    }
                }
            });
            clearAll(1);
        }
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down-new"></span>
            </components.DropdownIndicator>
        );
    };

    const handlepartOfSpeechOptions = (selected) => {
        setSelectedPOS(selected);
    };

    const customPartsOfSpeechSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "150px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            color: "#292929",
            fontFamily: "Roboto",
            fontSize: "15px",
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
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#292929" : "#292929",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            width: "150px",
            boxShadow: 0,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };


    const modaloption = {
        closeMaskOnClick: false,
        height:'auto',
    };

    const getWikipedia = (term) => {
        if(term !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/get_wikipedia/?task_id=${documentId.current}&term=${term}&term_type=source`,
                method: "GET",
                auth: true,
                success: (response) => {
                    // console.log(response.data);
                    setWikipediaData(response.data.out)
                },
            });
        } 
    } 
    
    const getWiktionary = (term) => {
        if(term !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/get_wiktionary/?task_id=${documentId.current}&term=${term}&term_type=source`,
                method: "GET",
                auth: true,
                success: (response) => {
                    // console.log(response.data);
                    setWiktionaryData(response.data.out)
                },
            });
        }
    }

    const getMTTranslation = (term) => {
        var formdata = new FormData();
        formdata.append("source", term);
        Config.axios({
            url: `${Config.BASE_URL}/glex/get_translation/${documentId.current}/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                setTargetLanguageTerm(response.data?.target_mt)
                // setMtSuggestion(response.data?.target_mt)
                // setWiktionaryData(response.data.out)
            },
            error: (err) => {
                if(err.response.status === 424){
                    err.response.data?.res && Config.toast(t("insufficient_credit"), 'warning');
                }
            }
        });
    } 

    const handleAddNewTermModal = (e, id) => {
        documentId.current = id
        addNewTerm();
        setWikipediaData(null)
        setEditTermForm(false)
        setAddNewTermModal(true);
        setTermCreateTabs(1)
    }

    // This function has to be encountered when add new button is added
    const addNewTerm = () => {
        setSelectedItem(null);
        clearAll(1);
    };

    const clearAll = (query) => {
        if (query) setSelectedItem(null);
        setSourceLanguageTerm("");
        setTargetLanguageTerm("");
        setSelectedPOS(null);
        setTermNote("");
        setTermContext("");
        setSourceOfSourceLanguageTerm("");
        setSourceOfTargetLanguageTerm("");
        setSourceLanguageDefinition("");
        setTargetLanguageDefinition("");
        setSelectedTermType({});
        setSelectedGender({});
        setSelectedUsageStatus({});
        setGeographyUsage("");
        setTermLocation("");
        setWikipediaData(null)
        setWiktionaryData(null)
        setMtSuggestion(null)
    };

    // ======================================================================================

    return (
        <React.Fragment>
            <section className="glossaries-list-wrapper" ref={fileUploadTop}>
                <div className="header-align glossary-header">
                    <div className="header-project-setup-align-wrap">
                        <p className="section-header">{t("my_glossaries")}</p>
                        <div className="glossary-search-row-new view-glossary-list">
                            <div className="glossary-sub-search-row">
                                <div className={"project-list-search-box " + (glossaryListSearch ? "active" : "")}>
                                    <div className="img-box">
                                        <img src={ChatSearch} alt="search-icon" />
                                    </div>
                                    <input 
                                        onClick={() => setGlossaryListSearch(true)}
                                        value={glossarySearchTerm}
                                        // autoFocus={glossarySearchTerm ? true : false}
                                        onChange={(e) => setGlossarySearchTerm(e.target.value)}
                                        type="search"
                                        placeholder={`${t("search")}....`}
                                        onKeyUp={(e) => SearchTermFilterEnter(e)}
                                        onFocus={() => setGlossaryListSearch(true)}
                                        // onBlur={(e) => {
                                        //     setGlossaryListSearch(false);
                                        // }}
                                    />
                                    <span className={"close " + ((glossaryListSearch || glossarySearchTerm !== "") ? "show " : " ")}
                                        onClick={() => handleCloseSearchBox()}
                                    >
                                        <img src={SearchBarClose} alt="search-bar-close" />
                                    </span>
                                </div>
                                <div ref={searchTermCloseOutside} className={"search-results-bar glossary-proj-list " + (glossaryListSearch ? "show" : "hide")}>
                                    <div onClick={(e)=>(glossarySearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (glossarySearchTerm !== "" ? " " : "cursor-change")}>
                                        <SearchIcon className="search-icon" />
                                        <div className="searched-results-info">
                                            <p className="searched-term">{glossarySearchTerm}</p>
                                            {
                                                glossarySearchTerm !== "" ?
                                                <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                :
                                                <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_glossary_1")}</span></p>
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
                                            onClick={(e) => handleSelectedMenuItem(e, option?.value)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <div className="glossary-view-row">
                                <ButtonBase className="viewglossarieslist-AddProjectButton" component={Link} to="/create/assets/glossaries/create">
                                    <span className="add-project-btn">
                                        <AddIcon
                                            style={{
                                                width: 20,
                                                color: "#ffffff"
                                            }}
                                        /> 
                                        {t("create_a")} <span>glossary</span>
                                    </span>
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload-files-section glossary-list-wrap">
                    <div id="select-files" className="uploaded-files">
                       
                        <div className="file-edit-heading-row">
                            <div className="file-edit-heading-table">
                                <div className="file-edit-heading-table-row">
                                    <div
                                        // onClick={(e) => orderBy(orderField?.indexOf("-project_name") !== -1 ? "project_name" : "-project_name")}
                                        className="file-edit-heading-table-cell"
                                    >
                                        <div className="listing-table-header-container">
                                            <span>Glossaries</span>
                                            {/* <div className="sorting-container">
                                                <div
                                                    className={
                                                        orderField?.indexOf("project_name") !== -1 && orderField?.indexOf("-project_name") == -1
                                                            ? "arrow-down-sort arrow-down-active"
                                                            : "arrow-down-sort arrow-down-inactive"
                                                    }
                                                ></div>
                                                <div
                                                    className={
                                                        orderField?.indexOf("-project_name") !== -1
                                                            ? "arrow-up-sort arrow-up-active"
                                                            : "arrow-up-sort arrow-up-inactive"
                                                    }
                                                ></div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="file-edit-heading-table-cell">
                                        <div onClick={e => orderBy(orderField.indexOf('-team__name') !== -1 ? 'team__name' : '-team__name')} className="listing-table-header-container">
                                            <span>Team</span>
                                            <div className='sorting-container'>
                                                <div className={(orderField.indexOf('team__name') !== -1 && orderField.indexOf('-team__name') == -1) ? 'arrow-down-sort arrow-down-active' : 'arrow-down-sort arrow-down-inactive'}></div>
                                                <div className={orderField.indexOf('-team__name') !== -1 ? 'arrow-up-sort arrow-up-active' : 'arrow-up-sort arrow-up-inactive'}></div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="file-edit-heading-table-cell">
                                        <div className="status-name">Type</div>
                                    </div> */}
                                    <div className="file-edit-heading-table-cell">
                                        <div className="status-name">{t("created_on")}</div>
                                    </div>
                                </div>
                                <>
                                {glossaryProjectList.length != 0 && !showListingLoader ? (
                                        <React.Fragment>
                                        {
                                        (glossaryProjectList.length != 0 || glossarySearchTerm != "")  ? 
                                            (
                                                glossaryProjectList.map((project, key) => {
                                                    return (
                                                        <div
                                                            className={
                                                                openedProjectId == project.id
                                                                    ? "file-edit-list-table-row focused-proj-row"
                                                                    : project.progress?.toLowerCase() == "yet to start" ? "file-edit-list-table-row unopened-focus-proj-row" : "file-edit-list-table-row"
                                                            }
                                                            key={project.id}
                                                            data-key={project.id}
                                                            onClick={(e) => selectProject(e, project?.id, project?.get_project_type)}
                                                        >
                                                            <div className="file-edit-list-table-cell-wrap">
                                                                <div className="file-edit-list-table-cell" data-key={project.id}>
                                                                    <span className="arrow-icon">
                                                                        {/* <img
                                                                            src={
                                                                                openedProjectId == project.id
                                                                                    ? Config.HOST_URL + "assets/images/new-ui-icons/expand_less.svg"
                                                                                    : Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"
                                                                            }
                                                                            alt="expand-more"
                                                                        /> */}
                                                                        {
                                                                            openedProjectId == project.id ?
                                                                            <KeyboardArrowUpIcon className="proj-list-arrow-up"/>
                                                                            :
                                                                            <KeyboardArrowDownIcon className="proj-list-arrow-down"/>
                                                                        }

                                                                    </span>
                                                                    {/* <span className="">

                                                                    </span> */}
                                                                    <div className="proj-title-list-container">
                                                                        <div className="proj-type-icon-wrap">
                                                                            <span className={"proj-type-icon " + ((project?.get_project_type === 1 || project?.get_project_type === 2 || project?.get_project_type === 4) ? "translate-bg" : project?.get_project_type === 3 ? "assets-bg" : "")}>
                                                                                {
                                                                                    (project?.get_project_type === 1 || project?.get_project_type === 2 || project?.get_project_type === 4) ?
                                                                                        <TranslateIcon className="proj-types"/>
                                                                                    : project?.get_project_type === 3 ?
                                                                                        <DescriptionOutlinedIcon className="gloss-types"/>
                                                                                        :
                                                                                        ""
                                                                                }
                                                                                
                                                                            </span>
                                                                        </div>
                                                                        <div className="proj-list-info">
                                                                            <div className="proj-information">
                                                                                <span
                                                                                    className="file-edit-proj-txt-tmx"
                                                                                    // className={
                                                                                    //     project.progress?.toLowerCase() == "yet to start"
                                                                                    //         ? "file-edit-proj-txt-tmx-created"
                                                                                    //         : "file-edit-proj-txt-tmx"
                                                                                    // }
                                                                                >
                                                                                    {project.project_name}
                                                                                </span>
                                                                                {project.is_proj_analysed && project?.project_analysis?.proj_word_count != null && (
                                                                                    <span className="file-edit-proj-txt-word-count">
                                                                                        (<span>{project.project_analysis.proj_word_count}</span> W)
                                                                                        <span className={project.progress?.toLowerCase() == "yet to start" ? "unopend-icon" : "d-none"}>
                                                                                            <img src={UnopenedProjSymbol} alt="unopened-proj"/>
                                                                                        </span>
                                                                                    </span>
                                                                                )}
                                                                                {project.assigned && (
                                                                                    <span className="pl-2 pr-2">
                                                                                        <img
                                                                                            src={Config.HOST_URL + "assets/images/chat/inventory_black.svg"}
                                                                                            alt="assigned"
                                                                                        />
                                                                                    </span>
                                                                                )}
                                                                                {/* <span
                                                                                    className={project.progress?.toLowerCase() == "yet to start" ? "created-label" : "d-none"}
                                                                                >
                                                                                    New
                                                                                </span> */}
                                                                            </div>
                                                                            <div className="proj-file-type">
                                                                                <span>{project?.get_project_type === 3 ? "Glossary" : project?.get_project_type === 4 ? "Voice" : 
                                                                            (project?.get_project_type === 1 || project?.get_project_type === 2) && "Files"}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="file-edit-list-table-cell">
                                                                    <div className="file-edit-translation-txt word-count"><span>{project?.get_team && project?.get_team}</span></div>
                                                                </div> */}
                                                                {/* <div className="file-edit-list-table-cell">
                                                                    <div className="file-edit-translation-txt word-count">
                                                                        <span>{project?.get_project_type === 3 ? "Glossary" : project?.get_project_type === 4 ? "Voice" : 
                                                                            (project?.get_project_type === 1 || project?.get_project_type === 2) && "Files"}</span>
                                                                    </div>
                                                                </div> */}
                                                                <div className="file-edit-list-table-cell" data-key={project.id}>
                                                                    {/* {project?.assign_enable && (
                                                                        <>
                                                                            <div className="user-project-icon">
                                                                                <Tooltip className="dont-open-list" title="Assign" placement="top">
                                                                                    <span onClick={(e) => assignToProject(e, project.id)}>
                                                                                        <img
                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/how_to_register.svg"}
                                                                                            alt="how_to_register"
                                                                                            should-open-files="dont-open"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </div>
                                                                            <div className="icons-separator"></div>
                                                                        </>
                                                                    )} */}
                                                                    <div className="project-edit-tools dont-open-list">
                                                                        {/* {project.get_project_type !== 3 && <Tooltip title="Word Count" placement="top">
                                                                            <span onClick={(e) => showWordCountModal(e, project.id, project.is_proj_analysed)}>
                                                                                <img
                                                                                    src={Config.HOST_URL + "assets/images/new-ui-icons/stacked_bar_chart.svg"}
                                                                                    alt="stacked_bar_chart"
                                                                                    should-open-files="dont-open"
                                                                                />
                                                                            </span>
                                                                        </Tooltip>} */}
                                                                        {
                                                                           (Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable && project.get_project_type === 3
                                                                           && project?.tasks_count > 1 && project?.clone_available) &&
                                                                            <Tooltip title="Clone" placement="top">
                                                                                <span onClick={() => setShowCloneModal(true)}>
                                                                                    <img
                                                                                        src={Config.HOST_URL + "assets/images/clone-icon.svg"}
                                                                                        alt="clone"
                                                                                        should-open-files="dont-open"
                                                                                    />
                                                                                </span>
                                                                            </Tooltip>
                                                                        }
                                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && project?.assign_enable && (
                                                                            <>
                                                                                <Tooltip dont-open-list="yes" title="Edit" placement="top">
                                                                                    <span onClick={(e) => {e.stopPropagation(); editProject(e, project.id, project?.get_project_type)}}>
                                                                                        <img
                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/pencil-edit-new.svg"}
                                                                                            alt="pencil-edit-new"
                                                                                            should-open-files="dont-open"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>
                                                                                {project.get_project_type !== 3 && <Tooltip TransitionComponent={Zoom} title="Assets" placement="top">
                                                                                    <span onClick={showSettingsModal}>
                                                                                        <img
                                                                                            src={Config.HOST_URL + "assets/images/new-ui-icons/upload_file.svg"}
                                                                                            alt="upload_file"
                                                                                            should-open-files="dont-open"
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>}
                                                                            </>
                                                                        )}
                                                                        {/* <Tooltip TransitionComponent={Zoom} title="Delete" placement="top">
                                                                                <span onClick={(e) => deleteProject(project.id)} className="dont-open-files"><img src={Config.HOST_URL+'assets/images/new-ui-icons/delete_black.svg'}  alt="Delete file"/></span>
                                                                            </Tooltip> */}
                                                                    </div>
                                                                    <div className="status-conditions-part dont-open-list">
                                                                        <span className="file-edit-proj-status-txt glossary-status">
                                                                            {/* <div
                                                                                className={
                                                                                    project.progress?.toLowerCase() == "completed"
                                                                                        ? "status-indicator-completed"
                                                                                        : project.progress?.toLowerCase() == "in progress"
                                                                                        ? "status-indicator-in-progress-color"
                                                                                        : "status-indicator-created"
                                                                                }
                                                                                should-open-files="dont-open"
                                                                            ></div>
                                                                            {project.progress} */}
                                                                            {Config.convertUTCToLocal(project?.created_at, "date")}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Collapse isOpen={selectFileRow} className="selected-file-row">
                                                                {
                                                                    openedProjectId == project.id &&
                                                                        (selectedProjectFiles?.length > 0 ? (
                                                                            selectedProjectFiles.map((selectedProjectFile, key) => {
                                                                                // console.log(selectedProjectFile)
                                                                                isAssignedProject = glossaryProjectList.find(
                                                                                    (element) => element.id === openedProjectId
                                                                                )?.assign_enable;
                                                                                let segmentPercentage = 0;
                                                                                if (selectedProjectFile?.progress != null) {
                                                                                    if (selectedProjectFile?.progress?.total_segments == 0)
                                                                                        segmentPercentage = 0;
                                                                                    else
                                                                                        segmentPercentage = (
                                                                                            (selectedProjectFile?.progress?.confirmed_segments /
                                                                                                selectedProjectFile?.progress?.total_segments) *
                                                                                            100
                                                                                        ).toFixed(2);
                                                                                }
                                                                                // Need to destructure this following conditional code and set everything optimised properly
                                                                                if (selectedProjectFile?.task_assign_info?.length === 1) {
                                                                                    editorAssignmentDetails =
                                                                                        selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                        Config.userState?.id
                                                                                            ? selectedProjectFile?.task_assign_info[0]?.assigned_by_details
                                                                                            : selectedProjectFile?.task_assign_info[0]?.assign_to_details;
                                                                                    role = selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                        Config.userState?.id
                                                                                            ? "Assigner" : "Editor"
                                                                                }

                                                                                // New logic
                                                                                if(selectedProjectFile?.task_assign_info?.length === 2){
                                                                                    
                                                                                }

                                                                                if (selectedProjectFile?.task_assign_info?.length === 2) {
                                                                                    editorAssignmentDetails =
                                                                                        selectedProjectFile?.task_assign_info[0]?.assign_to_details?.id ===
                                                                                        Config.userState?.id
                                                                                            ? selectedProjectFile?.task_assign_info[0]?.assigned_by_details
                                                                                            : selectedProjectFile?.task_assign_info[0]?.assign_to_details;

                                                                                    reviewerAssignDetails =
                                                                                        selectedProjectFile?.task_assign_info[1]?.assign_to_details?.id ===
                                                                                        Config.userState?.id
                                                                                            ? selectedProjectFile?.task_assign_info[1]?.assigned_by_details
                                                                                            : selectedProjectFile?.task_assign_info[1]?.assign_to_details;
                                                                                }

                                                                                selectedFilesData = (
                                                                                    <div className="file-edit-inner-table" key={selectedProjectFile.id}>
                                                                                        <div className="file-edit-list-inner-table-row">
                                                                                            <div className="file-edit-list-inner-table-cell">
                                                                                                <div className="file-edit-translation-txt">
                                                                                                    <img
                                                                                                        className="translation-pair-L"
                                                                                                        src={
                                                                                                            Config.HOST_URL +
                                                                                                            "assets/images/new-ui-icons/translation-pair-L.svg"
                                                                                                        }
                                                                                                    />
                                                                                                    <span>{selectedProjectFile?.source_language}</span>
                                                                                                    <img
                                                                                                        src={
                                                                                                            Config.HOST_URL +
                                                                                                            "assets/images/new-ui-icons/arrow_right_alt_color.svg"
                                                                                                        }
                                                                                                    />
                                                                                                    <span>{selectedProjectFile?.target_language ? selectedProjectFile?.target_language : selectedProjectFile?.source_language}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="file-edit-list-inner-table-cell">
                                                                                                <Tooltip TransitionComponent={Zoom} title={t("add_new_term")} placement="top">
                                                                                                        <span onClick={(e) => {e.stopPropagation(); handleAddNewTermModal(e, selectedProjectFile?.id);}} className="add-term-icon-wrap">
                                                                                                            <AddCircleOutlineIcon className="add-term-icon"/>
                                                                                                        </span>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                            <div className="file-edit-list-inner-table-cell">
                                                                                                <Link className="glossary-workspace-link" to={`/glossary-workspace?project-id=${project?.id}&document-id=${selectedProjectFile?.id}`}>{t("open")}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                                selectedFilesData = <div>{selectedFilesData}</div>;
                                                                                if (selectedProjectFilesCount > 1) {
                                                                                    if (key == 0) activeColorTarget = selectedProjectFile.target_language;
                                                                                    if (activeColorTarget == selectedProjectFile.target_language) {
                                                                                        if (isColorClassAdded)
                                                                                            selectedFilesData = (
                                                                                                <div key={key} className="file-list-active">
                                                                                                    {selectedFilesData}
                                                                                                </div>
                                                                                            );
                                                                                    } else {
                                                                                        isColorClassAdded = !isColorClassAdded;
                                                                                        if (isColorClassAdded)
                                                                                            selectedFilesData = (
                                                                                                <div key={key} className="file-list-active">
                                                                                                    {selectedFilesData}
                                                                                                </div>
                                                                                            );
                                                                                    }
                                                                                    activeColorTarget = selectedProjectFile.target_language;
                                                                                }
                                                                                return selectedFilesData;
                                                                            })
                                                                        ) : (
                                                                            <div>
                                                                                {Array(project.tasks_count)
                                                                                    .fill(null)
                                                                                    .map((value, key) => (
                                                                                        <div className="file-edit-inner-table" key={key}>
                                                                                            <div className="file-edit-list-inner-table-row">
                                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                                    <div className="d-flex align-items-center">
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            variant="circle"
                                                                                                            width={30}
                                                                                                            height={30}
                                                                                                        />
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            style={{ marginLeft: "1rem" }}
                                                                                                            variant="text"
                                                                                                            width={95}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* <div className="file-edit-list-inner-table-cell">
                                                                                                    <div className="d-flex align-items-center">
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            variant="circle"
                                                                                                            width={30}
                                                                                                            height={30}
                                                                                                        />
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            style={{ marginLeft: "1rem" }}
                                                                                                            variant="text"
                                                                                                            width={115}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                                    <div className="d-flex align-items-center">
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            variant="circle"
                                                                                                            width={20}
                                                                                                            height={20}
                                                                                                        />
                                                                                                        <Skeleton
                                                                                                            animation="wave"
                                                                                                            variant="text"
                                                                                                            style={{
                                                                                                                width: 50,
                                                                                                                height: 40,
                                                                                                                marginLeft: "0.7rem",
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                                    <Skeleton
                                                                                                        animation="wave"
                                                                                                        variant="text"
                                                                                                        style={{ width: 100, height: 40 }}
                                                                                                    />
                                                                                                </div> */}
                                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                                    <Skeleton
                                                                                                        animation="wave"
                                                                                                        variant="circle"
                                                                                                        width={28}
                                                                                                        height={28}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="file-edit-list-inner-table-cell">
                                                                                                    <Skeleton
                                                                                                        animation="wave"
                                                                                                        variant="text"
                                                                                                        style={{ width: 100, height: 40 }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        ))
                                                                }
                                                            </Collapse>
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
                                                                glossarySearchTerm ?
                                                                <img 
                                                                className="empty-folder-img"
                                                                src={Config.HOST_URL + "assets/images/no-editors-found-2.svg"} 
                                                                alt="main-no-project-found"/>
                                                                :
                                                                <img
                                                                    className="empty-folder-img"
                                                                    src={Config.HOST_URL + "assets/images/empty-projects-folder.svg"}
                                                                    alt="empty-folder-open"
                                                                />
                                                            }

                                                            <h2>No glossary projects found</h2>
                                                            {
                                                                glossarySearchTerm ?
                                                                null
                                                                :
                                                                <>
                                                                    {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                                        <button className="workspace-files-AddNewProjectButton"
                                                                            onClick={() => {
                                                                                // activeToggle(2);
                                                                                history("/create/assets/glossaries/create");
                                                                            }}
                                                                        >
                                                                            <span className="add-new-project-btn">
                                                                                <img src={PlusIcon} alt="plus" /> Create new project
                                                                            </span>
                                                                        </button>
                                                                    )}
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
                                                {/* <div className="project-setup-pagination">
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
                                                </div> */}
                                            </React.Fragment>
                                        )
                                    )}
                                </>
                                {showEmptyProjects && (
                                    <React.Fragment>
                                        <section className="ai-no-project-found">
                                            <div className="ai-no-project-cont">
                                                {
                                                    glossarySearchTerm ?
                                                    <img 
                                                        className="empty-folder-img"
                                                        src={Config.HOST_URL + "assets/images/no-editors-found-2.svg"} 
                                                        alt="main-no-project-found"
                                                    />
                                                    :
                                                    <img
                                                        className="empty-folder-img"
                                                        src={Config.HOST_URL + "assets/images/empty-projects-folder.svg"}
                                                        alt="empty-folder-open"
                                                    />
                                                }
                                                <h2>{t("glossary_not_found_note")}</h2>
                                                {/* {
                                                    projectSearchTerm ?
                                                    null
                                                    :
                                                    <>
                                                        {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                                            <AddNewProjectButton
                                                                onClick={() => {
                                                                    // activeToggle(2);
                                                                    props.history("/create/assets/glossaries/create");
                                                                }}
                                                            >
                                                                <span className="add-new-project-btn">
                                                                    <img src={Config.HOST_URL + "assets/images/new-ui-icons/plus.svg"} alt="plus" /> Create new project
                                                                </span>
                                                            </AddNewProjectButton>
                                                        )}
                                                    </>
                                                } */}
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

            {addNewTermModal && (<Rodal visible={addNewTermModal} {...modaloption} showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>{editTermForm ? `${t("edit_term")}` : `${t("add_new_term")}`}</h1>
                        <span onClick={(e) => setAddNewTermModal(false)}><CloseIcon className="close-icon"/></span>
                    </div>
                </div>
                <div className="term-edit-form">
                    <div className="term-edit-form-control">
                        <label htmlFor="src-term">{t("source_language_term")}</label>
                        <input
                            ref={sourceLangRef}
                            className="gl-worksp-input"
                            type="text"
                            id="src-term"
                            name="sourceLanguageTerm"
                            placeholder={t("enter_text")}
                            value={sourceLanguageTerm}
                            onChange={(e) => setSourceLanguageTerm(e.target.value)}
                            onBlur={(e) => {getWikipedia(e.target.value); getWiktionary(e.target.value)}}
                        />
                        {error?.slError != "" && !sourceLanguageTerm?.length && <span className="text-danger">{error.slError}</span>}
                        <div className={"wikipedia-wikitionary-info-row " + ((sourceLanguageTerm && wikipediaData) ? "wikipedia-wikitionary-info-row-show" : "")}>
                            {(wikipediaData?.source !== "" || wiktionaryData?.source !== "") && <span className="suggest-title">{t("references")}:</span>}
                            {
                                wikipediaData?.source !== "" &&
                                (
                                    <div className="wikipedia">
                                        <img src={WikipediaIcon} alt="wiki" />
                                        <a href={wikipediaData?.srcURL} target="_blank" className="link">
                                            {wikipediaData?.source}
                                        </a>
                                    </div>
                                ) 
                            }
                            {
                                wiktionaryData?.source !== "" &&
                                (
                                    <div className="wikitionary-row-wrapper">
                                        <img src={WikitionaryIcon} alt="wiki" />
                                        <a href={wiktionaryData?.['source-url']} target="_blank" className="link">
                                            {wiktionaryData?.source}
                                        </a>
                                    </div>
                                ) 
                            }
                        </div>
                    </div>
                    <div className="term-edit-form-control">
                        <label htmlFor="tar-term">{t("target_language_term")}</label>
                        <div className="translate-row-wrapper">
                            <div className="target-translate-term-box">
                                <input
                                    ref={targetLangRef}
                                    className="gl-worksp-input"
                                    type="text"
                                    id="tar-term"
                                    name="targetLanguageTerm"
                                    placeholder={t("enter_text")}
                                    value={targetLanguageTerm}
                                    onChange={(e) => setTargetLanguageTerm(e.target.value)}
                                />
                                {
                                    !creditsPromptClose &&
                                    <span>
                                        <InfoOutlinedIcon className="info-icon"/>
                                        <div className="icon-mt-disclaimer">
                                            <p>Credits will be consumed for machine translated suggestions</p>
                                        </div>
                                    </span>
                                }
                            </div>
                            <div className="get-mt-box">
                                {
                                    creditsPromptClose &&
                                    <div className="mt-disclaimer">
                                        <span onClick={handleCloseCreditsPrompt} className="small-close">&#x2715;</span>
                                        <p>Credits will be consumed for machine translated suggestions</p>
                                    </div>
                                }
                                <ButtonBase className="trans-btn-box" onClick={() => validateForm() && getMTTranslation(sourceLanguageTerm)}>
                                    <img src={TranslateBlack} alt="translate" />
                                </ButtonBase>
                            </div>
                        </div>
                        {(wikipediaData?.target !== "" || mtSuggestion !== null || wiktionaryData?.targets) && <div className="wikipedia-wikitionary-info-row wikipedia-wikitionary-info-row-show">
                            {((wikipediaData?.target !== undefined) || mtSuggestion !== null || (wiktionaryData?.targets !== undefined)) && <span className="suggest-title">{t("suggestions")}:</span>}
                            <div className="main-suggestion-box">
                            {/* {
                                (mtSuggestion !== null) && (
                                <div className="mt-suggestion-box">
                                    <img src={Config.HOST_URL + "assets/images/glossary-workspace/translate_black.svg"} alt="translate" />
                                    <span className="mt-suggestion-span">{mtSuggestion}</span>
                                    <ButtonBase className="copy-icon" onClick={handleMtSuggestionCopyText}>
                                        <ContentCopyOutlinedIcon className="content-copy-icon"/>
                                    </ButtonBase>
                                </div>)
                            } */}
                            {
                                (wikipediaData !== null && wikipediaData?.target !== "") && 
                                <>
                                    <div className="wikipedia">
                                        <img src={WikipediaIcon} alt="wiki" />
                                        <a href={wikipediaData?.targeturl} target="_blank" className="link">
                                            {wikipediaData?.target}
                                        </a>
                                        <ButtonBase className="copy-icon" onClick={handleWikipediaCopyText}>
                                            <ContentCopyOutlinedIcon className="content-copy-icon"/>
                                        </ButtonBase>
                                    </div>
                                </>
                            }
                            {
                                wiktionaryData?.targets &&
                                    <>
                                        <img src={WikitionaryIcon} alt="wiki" className="wiktionary-img"/>
                                        {/* <div className="wikitionary-row-wrapper-glb"> */}
                                            {
                                                wiktionaryData?.targets?.map((eachWord, index) => {
                                                    return (
                                                        <>
                                                            <div className="wikitionary-row-wrapper">
                                                                <a href={eachWord?.['target-url']} target="_blank" className="link">
                                                                    {eachWord?.target}
                                                                </a>
                                                                <ButtonBase className="copy-icon" onClick={()=> handleWikitionaryCopyText(eachWord?.target)}>
                                                                    <ContentCopyOutlinedIcon className="content-copy-icon"/>
                                                                </ButtonBase>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        {/* </div> */}
                                    </>
                            }
                            </div>
                        </div>}
                    </div>
                    <div className="term-edit-form-control">
                        <label>{t("parts_of_speech")}</label>
                        <Select
                            options={partOfSpeechOptions}
                            styles={customStepSelectStyles}
                            value={selectedPOS}
                            classNamePrefix="steps-select"
                            hideSelectedOptions={false}
                            isSearchable={false}
                            placeholder={t("select")}
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            onChange={handlepartOfSpeechOptions}
                        />
                    </div>
                </div>
                <div className="footer-area-wrapper">
                    <ButtonBase className="clear-all-button" onClick={() => clearAll(1)}>
                        <img src={TermDeleteIcon} alt="term_delet_icon"/>
                        <span>{t("clear_all")}</span>
                    </ButtonBase>
                    <div className="term-edit-btn-row">
                        <button className="searchterm-ClearAllButton" onClick={() => {setAddNewTermModal(false); clearAll(1);}}>
                            <span className="gl-workspace-btn-txt-1">{t("cancel")}</span>
                        </button>
                        <button className="globalform-StepProcessButton" onClick={() => handleSaveButton()}>
                            <span className="gl-workspace-btn-txt-2">{editTermForm ? `${t("update")}` : `${t("save")}`}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}

            {/* Glossary clone functionality modal */}
            {showCloneModal && (<Rodal visible={showCloneModal} {...modaloption} showCloseButton={false} className="ai-glossary-clone-modal">
                <div className="lang-modal-wrapper">
                    <span className="modal-close-btn lang-close" onClick={() => setShowCloneModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <GlossaryClone setShowCloneModal={setShowCloneModal} showCloneModal={showCloneModal} selectedProjectFiles={selectedProjectFiles} />
                </div>
            </Rodal>)}
            
            {showFirstGlossaryCreationModal && (<Rodal visible={showFirstGlossaryCreationModal} {...modaloption} showCloseButton={false} className="">
                <span className="modal-close-btn lang-close" onClick={(e) => {setShowFirstGlossaryCreationModal(false);}}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="confirmation-wrapper-mod">
                    <h2>
                        {t("open_glossary_note")}
                    </h2>
                    <div className="button-row d-flex justify-content-center">
                        <button className="globalform-StepProcessButton" onClick={() => history(`/glossary-workspace?project-id=${projectID}&document-id=${firstTaskId}`)}>
                            <span className="gl-workspace-btn-txt-2">{t("open")}</span>
                        </button>
                    </div> 
                </div>
            </Rodal>)}


        </React.Fragment>
    );
};

export default ViewGlossariesList;