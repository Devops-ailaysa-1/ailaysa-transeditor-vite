import { useEffect, useState } from "react";
import Config from "../Config";
import EmptyStory from "./EmptyStory";
import StoryList from "./StoryList";
import { useTranslation } from "react-i18next";
import SearchBarIcon from "../assets/images/chat/chat-search.svg"
import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";
import PaginationLeftArrow from "../assets/images/new-ui-icons/pagination-left.svg";
import PaginationRightArrow from "../assets/images/new-ui-icons/pagination-right.svg";
import BlackCloseIcon from "../assets/images/new-ui-icons/close_black.svg";
import DeleteBinIcon from "../assets/images/new-ui-icons/assets-delete-icon.svg";
import { Button, ButtonBase, Skeleton, Tooltip } from "@mui/material";
import { ButtonLoader } from "../loader/CommonBtnLoader";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Rodal from "rodal";
import TargetLanguage from "../vendor/lang-modal/Targetlanguage";


const MyStories = (props) => {
    const {targetLanguageOptionsRef, languageOptions} = props;
    const { t } = useTranslation();
    const location = useLocation();
    const history = useNavigate();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    let paginationTimeOut = null;

    const [storyList, setStoryList] = useState([]);
    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [projectSearchTerm, setProjectSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [selectFileRow, setSelectFileRow] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [didMount, setDidMount] = useState(true);
    const [transcriptionTaskList, setTranscriptionTaskList] = useState([]);
    const [preTranslateAllTask, setPreTranslateAllTask] = useState([]);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [editInstantProjectModal, setEditInstantProjectModal] = useState(false);
    const [showTarLangModal, setShowTarLangModal] = useState(false);
    const [isStoryProjectDeleting, setIsStoryProjectDeleting] = useState(false);
    const [showStoryProjDeleteModal, setShowStoryProjDeleteModal] = useState(false);
    const [skeletonLoader, setSkeletonLoader] = useState(null);
    const [storyProjectName, setStoryProjectName] = useState('');
    const [hasTeam, setHasTeam] = useState(false);
    const [editJobs, setEditJobs] = useState([]);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [sourceLabel, setSourceLabel] = useState(t("click_to_select"));
    const [targetLabel, setTargetLabel] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [restrictedTargetLanguages, setRestrictedTargetLanguages] = useState([]);
    const [isStoryProjUpdating, setIsStoryProjUpdating] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState([]);
    const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);

    const axiosListProjectControllerRef = useRef(null);
    const searchTermCloseOutside = useRef();
    const taskDeleteParam = useRef(null);
    const projectsPerPage = useRef(10);
    const targetLangDivRef = useRef(null);
    const storyProjectIdRef = useRef(null);
    const searchAreaRef = useRef(null);
    const projectObject = useRef(null);

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        height: 'auto',
        onClose: () => console.log(),
    };

    const modaloptions = {
        closeMaskOnClick: false,
        width: showTaskDeleteAlert ? 520 : null,
        height: showTaskDeleteAlert ? 240 : null,
        onClose: console.log(),
    };

    useEffect(() => {
        setTargetLanguageOptions(languageOptions);
    }, [languageOptions]);

    useEffect(() => {
        const controller = new AbortController();
        let pageParam = URL_SEARCH_PARAMS.get("page");
        let editorParam = URL_SEARCH_PARAMS.get("editor");
        if (pageParam !== null && pageParam !== undefined) {
            listProjects();
        }else if((pageParam == null || pageParam == undefined)){
            URL_SEARCH_PARAMS.set('page', 1);
			history.push(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
        }
        return () => {
            controller.abort();
        }
    }, [URL_SEARCH_PARAMS.get("page")]);

    useEffect(() => {
        let filterParam = URL_SEARCH_PARAMS.get("filter");
        if (filterParam !== null && filterParam !== undefined) {
            listProjects();
        }
    }, [URL_SEARCH_PARAMS.get("filter")]);

    useEffect(() => {
            const controller = new AbortController();
            let searchParam = URL_SEARCH_PARAMS.get("search");
            if (searchParam !== null && searchParam !== undefined) {
                setProjectSearchTerm(searchParam);
                listProjects();
            } else if (isSearchTermDelete) {
                listProjects();
            }
            return () => {
                controller.abort();
            }
    }, [URL_SEARCH_PARAMS.get("search"), isSearchTermDelete]);
    
    /**
     * This method used to list out the projects based on the search query and page query.
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const listProjects = () => {
        setFileListSearchEnlarge(false);
        setCreatedProjects([]) ;
        let page = 1;
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam != null) {
            setCurrentPage(pageParam);
            page = pageParam;
        } else setCurrentPage(pageParam);
        let orderParam = URL_SEARCH_PARAMS.get("order_by");
        let filterParam = URL_SEARCH_PARAMS.get("filter");
        let searchParam = URL_SEARCH_PARAMS.get("search");
        let url = `${Config.BASE_URL}/workspace/project/quick/setup/?page=${page}&filter=news${orderParam != null ? `&ordering=${orderParam}` : ''}`;
        if (searchParam !== null && searchParam !== undefined) url += `&search=${searchParam}`;
        if (axiosListProjectControllerRef.current) {
            axiosListProjectControllerRef.current.abort();
        }
        const controller = new AbortController();
        axiosListProjectControllerRef.current = controller;
        let params = {
            url: url,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            timeout: 1000 * 15, // Wait for 15 seconds
            success: (response) => {
                setCreatedProjects(response.data.results);
                setCurrentPage(page);
                setTotalPages(Math.ceil(response.data.count / projectsPerPage.current));
            },
            error: (error) => {
                Config.log(error);
            }
        };
        Config.axios(params);
    }

    const deleteProject = (projectId) => {
        setCreatedProjects(createdProjects?.filter(each => each.id !== projectId));
    }

    /* Show the pagination content a the bottom */
    useEffect(() => {
        if (didMount) paginationContentFunction(currentPage);        
        return () => {
            if(paginationTimeOut) clearTimeout(paginationTimeOut);
        }
    }, [totalPages, currentPage]);

    /**
     * This method used for the pagination content logic.
     * @param {*} page 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const paginationContentFunction = (page = 1) => {
        page = page == 0 ? 1 : page;
        page = parseInt(page);
        let content = [];
        if (totalPages > 1) {
            let url = "/fil-upload/" + "?page=";
            /*Pagination logic starts*/
            if (page > 1)
                content.push(
                    <li key={"prevButton"} onClick={(e) => pageSelect(page - 1)}>
                        <img src={PaginationLeftArrow} />
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
                        <img src={PaginationRightArrow} />
                    </li>
                );
            /*Pagination logic ends*/
        }
        paginationTimeOut = setTimeout(() => {
            setPaginationContent(content);
        }, 100);
    };

    /**
     * This method used to filter the projects based on the search query.
     * @param {*} e 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const SearchTermFilterEnter = (e) => {
        if (e.which === 13 && projectSearchTerm == "") {
            setFileListSearchEnlarge(false);
            e.target.blur();
            projectSearchFunctionality('clear-search')
        } else if (e.which === 13) {
            projectSearchFunctionality();
            setFileListSearchEnlarge(false);
            searchTermRef.current = projectSearchTerm;
            e.target.blur();
        }
    }
    
    /**
     * This mehtod used to handle the close action for the search box.
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const handleCloseSearchBox = () => {
        setProjectSearchTerm("");
        projectSearchFunctionality('clear-search');
        setFileListSearchEnlarge(false);
        setIsSearchTermDelete(true);
    }
    
    /**
     * This method used to search the project based on the query.
     * @param {*} param 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const projectSearchFunctionality = (param) => {
        let orderby = URL_SEARCH_PARAMS.get("order_by");
        let filter = URL_SEARCH_PARAMS.get("filter");
        let url = `/my-stories?page=1`;
        let queryParam = new URLSearchParams(window.location.search);
        queryParam.set('page', 1);        
        if (param !== 'clear-search') {
            queryParam.set('search', projectSearchTerm);
        }else if(param === 'clear-search'){
            setIsSearchTermDelete(true);
            queryParam.delete('search');
        }
        history(window.location.pathname + '?' + queryParam.toString());
    }

    /**
     * This mehtod used to update the edited story project
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 26 Nov 2025
     */
    const updateStoryProject = () => {
        let formdata = new FormData();
        setIsStoryProjUpdating(true);
        formdata.append("source_language", sourceLanguage);
        if (storyProjectName?.trim() === '') {
            Config.toast(t("enter_proj_name"));
            return;
        }
        formdata.append("project_name", storyProjectName?.trim());
        formdata.append("team", hasTeam);
        targetLanguage.map((eachTargetLanguage) => {
            if (
                editJobs.find(
                    (element) => element.target_language == eachTargetLanguage?.id
                ) == null
            )
                formdata.append("target_languages", eachTargetLanguage?.id);
        });

        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${storyProjectIdRef.current}`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t("proj_updated_success"));
                setEditInstantProjectModal(false);
                setIsStoryProjUpdating(false);
                // update the word count and project name of the project
                const newArr = createdProjects?.map(obj => {
                    if (obj.id === storyProjectIdRef.current) {
                        return {
                            ...obj,
                            project_name: response.data.project_name,
                            project_analysis: { ...obj.project_analysis, proj_word_count: response.data.project_analysis.proj_word_count }
                        };
                    }
                    return obj;
                });
                setCreatedProjects(newArr);
                setCreatedProjectsList(newArr);
            },
            error: (err) => {
                setIsStoryProjUpdating(false);
                console.error(err);
            }
        });
    }

    /**
     * This method used focus the target language div section. 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const focusTargetLangDiv = () => {
        if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if (targetLangDivRef.current !== null) targetLangDivRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    }

    /**
     * This method used to open the edit project modal.
     * @param {*} e 
     * @param {*} project 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 27 Nov 2025
     */
    const openEditProjectModel = (e, project) => {
        projectObject.current = project;
        if (project.get_project_type === 8) {
            setEditInstantProjectModal(true);
            storyProjectIdRef.current = project.id;
            editStoryProject(e, project.id);
        }
    }

    /**
     * Thi method used to update the edited story project.
     * @param {*} e 
     * @param {*} projectId 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const editStoryProject = (e, projectId) => {
        e.stopPropagation();
        setSkeletonLoader(true);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
            auth: true,
            success: (response) => {
                let { data } = response;
                setStoryProjectName(data.project_name);
                setHasTeam(data.team);
                setEditJobs(data.jobs);
                let editTargetLanguages = [];
                const restrictedLangIds = []
                let tar = [];
                let tarID = [];
                response.data?.jobs?.map((each) => {
                    let a = each?.source_target_pair_names?.split("->");
                    tar.push({ language: a[1], id: each?.target_language });
                    tarID.push(each.target_language);
                });
                setAlreadySelectedTarLang(tar);
                setAlreadySelecetedTarLangID(tarID);
                data?.jobs?.map((job) => {
                    if (job?.target_language !== null) {
                        editTargetLanguages.push(
                            targetLanguageOptionsRef.current?.find(
                                (element) => element.id == job.target_language
                            )
                        );
                        restrictedLangIds.push(job.target_language);
                    }
                });
                let editSourceLanguage = targetLanguageOptionsRef.current?.find(
                    (element) => element.id == data.jobs[0].source_language
                );
                setTimeout(() => {
                    setSourceLabel(editSourceLanguage?.language);
                    setSourceLanguage(editSourceLanguage?.id);
                    setTargetLanguage(editTargetLanguages);
                    setRestrictedTargetLanguages(restrictedLangIds);
                    setSkeletonLoader(false);
                }, 80);
            },
        });
    }
    
    /**
     * This method used to close action for the target modal popup.
     * @param {*} e 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const handleTargetModalCloseBtn = (e) => {
        if(targetLanguage?.length < 1){
            Config.toast(t("at_least_language_selected"), 'warning');
            return;
        }
        setShowTarLangModal(false); 
        setSearchInput(''); 
        setOnFocusWrap(false);        
    }

    /**
     * This method used to handling the target language selection.
     * @param {*} value 
     * @param {*} e 
     * @returns 
     * 
     * @author Padamabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if(targetLanguage?.length === 2 && (targetLanguage?.find(each => each.id === value.id) ? false : true)){
            Config.toast('Maximum 2 languages can be added for better project management', 'warning')
            return
        }
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
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /**
     * This mehtod used to deleted the story project by id.
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const deleteStoryProject = () => {
        setIsStoryProjectDeleting(true);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/${storyProjectIdRef.current}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                Config.toast(t("proj_deleted"));
                let filteredArr = createdProjects?.filter(each => each.id !== storyProjectIdRef.current);
                deleteProject(storyProjectIdRef.current);
                setShowStoryProjDeleteModal(false);
                setEditInstantProjectModal(false);
                // setShowListingLoader(false);
                setIsStoryProjectDeleting(false);
                // if (filteredArr?.length === 0) setEmptyProjects(true);
                setCreatedProjects(filteredArr);
            },
            error: (err) => {
                if (err?.response?.data?.msg?.includes('assigned')) {
                    setShowStoryProjDeleteModal(false);
                    // SetShowAssignedProjectDeleteAlert(true);
                    setIsStoryProjectDeleting(false);
                }
                setIsStoryProjectDeleting(false);
            }
        });
    };

    const handleDeleteDesignerProj = (proj, selectedProjectFile) => {
    }

    return (
        <>
        <div className="header-align">
            <div className="header-project-setup-align-wrap assets">
                <div className="position-relative">
                    <div className={"project-list-search-box " + (fileListSearchEnlarge ? "active" : "")}>
                        <div className="img-box">
                            <img src={SearchBarIcon} alt="search-icon" />
                        </div>
                        <input
                            onClick={() => setFileListSearchEnlarge(true)}
                            value={projectSearchTerm}
                            onChange={(e) => setProjectSearchTerm(e.target.value)}
                            type="search"
                            placeholder={t("search") + "...."}
                            onKeyUp={(e) => SearchTermFilterEnter(e)}
                            onFocus={() => setFileListSearchEnlarge(true)}
                        />
                        <span className={"close " + ((fileListSearchEnlarge || projectSearchTerm !== "") ? "show " : " ")}
                            onClick={() => handleCloseSearchBox()}  >
                            <img src={SearchBarIcon} alt="search-bar-close" />
                        </span>
                    </div>
                    <div ref={searchTermCloseOutside} className={"search-results-bar project-list-search-bar " + (fileListSearchEnlarge ? "show" : "hide")}>
                        <div name="search-dropdown" onClick={(e) => (projectSearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (projectSearchTerm !== "" ? " " : "cursor-change")}>
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
                </div>
            </div>
        </div>
        <div className="upload-files-section">
            <div className="uploaded-files">
                <div className="file-edit-heading-table-row federal-news-wrap my-stories-wrap">
                    <div className="file-edit-list-table-cell">
                        <div className="listing-table-header-container">
                            <span>{'Project name'}</span>
                        </div>
                    </div>
                    <div className="file-edit-heading-table-cell">
                        <div className="status-name">{'Created on'}</div>
                    </div>
                </div>
                {createdProjects && createdProjects.length > 0 ? (
                    <div>
                        <StoryList
                            storyList={createdProjects}
                            targetLanguageOptionsRef={targetLanguageOptionsRef}
                            deleteProject={deleteProject}
                            openEditProjectModel={openEditProjectModel}
                        />
                    </div>
                ) :
                    <section className="ai-no-project-found">
                        <EmptyStory />
                    </section>
                }
            </div>
        </div>

        {/* modal for instant tranlation project edit */}
        {editInstantProjectModal && (
            <Rodal
                visible={editInstantProjectModal}
                showCloseButton={false}
                className={"edit-instant-project-box " + ((showTarLangModal || showStoryProjDeleteModal) ? "z-index-reduce" : "z-index-increase")}>
                <div className="header-wrapper">
                    <div className="header-text">
                        <EditOutlinedIcon style={{ fontSize: 22, color: "#5F6368" }} />
                        <h1>{t("edit_project")}</h1>
                    </div>
                    <span className="modal-close-btn" onClick={() => setEditInstantProjectModal(false)}>
                        <img src={BlackCloseIcon} alt="close_black" />
                    </span>
                </div>
                <div className="body-wrapper">
                    <div className="language-details mb-3">
                        <h2>{t("project_name")}</h2>
                        {skeletonLoader ?
                            <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                            :
                            <input
                                type='text'
                                value={storyProjectName}
                                placeholder={t("project_name")}
                                className="ai-sl-tl-btn input"
                                onChange={(e) => setStoryProjectName(e.target.value)}
                            />
                        }
                    </div>
                    <div className="language-details mb-3">
                        <h2>{t("source_language")}</h2>
                        {skeletonLoader ?
                            <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                            : <ButtonBase disabled={true}>
                                <div className="ai-sl-tl-btn">
                                    <span className="text">
                                        {sourceLabel !== "" ? `${sourceLabel}` : t("source_language")}
                                    </span>
                                </div>
                            </ButtonBase>
                        }
                    </div>
                    <div className="language-details">
                        <h2>{t("target_language")} <span className="asterik-symbol">*</span></h2>
                        {skeletonLoader ?
                            <Skeleton animation="wave" variant="text" width={"100%"} height={40} />
                            : <>
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
                                    title={`${targetLanguageListTooltip}`} placement="top" >
                                    <ButtonBase onClick={() => { setShowTarLangModal(true); }} ref={targetLangDivRef}>
                                        <div className="ai-sl-tl-btn">
                                            <span className="text">
                                                {targetLabel !== "" ? `${targetLabel}` :
                                                    targetLanguage?.length !== 0
                                                        ? (targetLanguage?.length +
                                                            " " +
                                                            (targetLanguage?.length > 1 ? t("languages") : t("language")) +
                                                            " " + t("selected"))
                                                        : t("target_language")
                                                }
                                            </span>
                                            <span className="icon">
                                                <i className="fas fa-caret-down"></i>
                                            </span>
                                        </div>
                                    </ButtonBase>
                                </Tooltip>
                                {targetLanguage?.length === 0 && <small className="asterik-symbol">{t("required")}</small>}
                            </>
                        }
                    </div>
                    <div className="edit-proj-button-row">
                        <ButtonBase className="instant-edit-delete-btn" onClick={() => setShowStoryProjDeleteModal(true)}>
                            <img src={DeleteBinIcon} alt="close_black" />{t("delete_project")}
                        </ButtonBase>
                        <ButtonBase className="instant-edit-update-btn"
                            onClick={() => { !isStoryProjUpdating && (targetLanguage?.length !== 0 ? updateStoryProject() : focusTargetLangDiv()) }}>
                            {isStoryProjUpdating ? t('updating') : t('update')}
                            {isStoryProjUpdating && <ButtonLoader />}
                        </ButtonBase>
                    </div>
                </div>
            </Rodal>
        )}
        
        {showTarLangModal && (<Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
            <div className="lang-modal-wrapper">
                <span className="modal-close-btn lang-close" onClick={(e) => handleTargetModalCloseBtn()}>
                    <img src={BlackCloseIcon} alt="close_black" />
                </span>
                <TargetLanguage
                    targetLanguage={targetLanguage}
                    targetLanguageOptions={targetLanguageOptions}
                    setTargetLanguageOptions={setTargetLanguageOptions}
                    handleTargetLangClick={handleTargetLangClick}
                    alreadySelectedTarLang={alreadySelectedTarLang}
                    showTarLangModal={showTarLangModal}
                    setshowTarLangModal={setShowTarLangModal}
                    filteredResults={filteredResults}
                    setFilteredResults={setFilteredResults}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onFocusWrap={onFocusWrap}
                    setOnFocusWrap={setOnFocusWrap}
                    searchAreaRef={searchAreaRef}
                    handleTargetModalCloseBtn={handleTargetModalCloseBtn}
                    restrictedTargetLanguages={restrictedTargetLanguages}
                />
            </div>
        </Rodal>)}
        
        {/* modal for express project delete */}
        {showStoryProjDeleteModal && (
            <Rodal
                visible={showStoryProjDeleteModal}
                {...modaloptions}
                showCloseButton={false}
                className="ai-mark-confirm-box" >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowStoryProjDeleteModal(false) }}><CloseIcon /></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{t("delete_project_note")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowStoryProjDeleteModal(false) }}>{t("discard")}</Button>
                            <Button
                                style={isStoryProjectDeleting ? { display: 'flex', alignItems: 'baseline' } : {}}
                                onClick={() => projectObject.current?.get_project_type == 6
                                    ? !isStoryProjectDeleting && handleDeleteDesignerProj(projectObject.current,null)
                                    : !isStoryProjectDeleting && deleteStoryProject()}
                                variant="contained"
                            >
                                {isStoryProjectDeleting ? (
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
            </Rodal>
        )}
        </>
    );
}
export default MyStories;
