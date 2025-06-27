import React, { useState, useEffect, useRef } from 'react'
import Config from '../../Config';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Navbar from '../../Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { ButtonLoader } from '../../../loader/CommonBtnLoader';
import ChatSearch from "../../../assets/images/chat/chat-search.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import NoEditor from '../../../assets/images/no-editors-found-2.svg'
import NoTermFound from '../../../assets/images/no-terms-found.svg'
import WarningIcon from '../../../assets/images/new-ui-icons/confirm-icon.svg'
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from '../../../features/FileDownloadingListSlice';
import { useDispatch } from 'react-redux';
import generateKey from '../../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';

const DefaultGlossaryWorkspace = (props) => {
    const { t } = useTranslation();
    const location = useLocation()
    const dispatch = useDispatch()

    const [searchBox, setSearchBox] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [termsList, setTermsList] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [termsListCopy, setTermsListCopy] = useState([])
    const [showTermDeletModal, setShowTermDeletModal] = useState(false)
    const [newTerm, setNewTerm] = useState({
        sl_term: "",
        tl_term: ""
    })
    const [isTermAdding, setIsTermAdding] = useState(false)
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
    const prevPathRef = useRef(null)

    const newSourceTermRef = useRef(null)
    const newReplaceTermRef = useRef(null)
    const editSourceTermRef = useRef(null)
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


    const flexStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid grey'
    }

    const errorFieldStyle = {
        border: '1px solid #e74c3c'
    }
    const defaultFieldStyle = {
        border: '1px solid #AFCEF7'
    }

    useEffect(() => {
        getTermsList()
    }, [])

    useEffect(() => {
        if (location.state?.prevPath) {
            prevPathRef.current = location.state.prevPath
        }
    }, [location.state])

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

            let url = `${Config.BASE_URL}/glex/default_glossary/?page=${currPage}${searchTerm !== '' ? `&search=${searchTerm}` : ''}`
            if(orderBySrcToggle !== null || orderByTarToggle !== null) url += `&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) ? `${orderByRef.current}` : `-${orderByRef.current}`}`

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
            setPrevPage(currPage);
            setTermsList([...termsList, ...response?.data?.results]);
            setTermsListCopy([...termsList, ...response?.data?.results])
        };
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

            getTermsList('sl_term')
        }
    }, [orderBySrcToggle])

    useEffect(() => {
        if(orderByTarToggle !== null){
            // reset source up and down arrow class
            srcSortUp.current.classList.remove("arrow-up-active")
            srcSortDown.current.classList.remove("arrow-down-active")
            srcSortUp.current.classList.add("arrow-up-inactive")
            srcSortDown.current.classList.add("arrow-down-inactive")
            getTermsList('tl_term')
        }
    }, [orderByTarToggle]) 

    const getTermsList = (orderType) => {
        setSearchBox(false)
        if (axiosTermListAbortControllerRef.current) {
            axiosTermListAbortControllerRef.current.abort()
        }
    
        const controller = new AbortController();
        axiosTermListAbortControllerRef.current = controller

        if(orderType) orderByRef.current = orderType

        let url = `${Config.BASE_URL}/glex/default_glossary/?page=1${searchTerm !== '' ? `&search=${searchTerm}` : ''}`
        if(orderType) url += `&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) 
            ? `${orderType}` : `-${orderType}`}`


        scrollingDivRef.current.scrollTop = 0
        
        Config.axios({
            url: url,
            method: "GET",
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                setTermsList(response.data.results);
                setTermsListCopy(response.data.results);
                setTotalPages(Math.ceil(response?.data.count / 20));
                setCurrPage(1);
                setPrevPage(0);
                setTotalTerms(response.data.count);
                lastPageRef.current = null;
                if(orderBySrcToggle){
                    srcSortUp.current.classList.add("arrow-up-inactive");
                    srcSortUp.current.classList.remove("arrow-up-active");
                    srcSortDown.current.classList.add("arrow-down-active");
                    srcSortDown.current.classList.remove("arrow-down-inactive");
                }
                if(orderBySrcToggle === false){
                    srcSortUp.current.classList.add("arrow-up-active");
                    srcSortUp.current.classList.remove("arrow-up-inactive");
                    srcSortDown.current.classList.add("arrow-down-inactive");
                    srcSortDown.current.classList.remove("arrow-down-active");
                }
                if(orderByTarToggle){
                    tarSortUp.current.classList.add("arrow-up-inactive");
                    tarSortUp.current.classList.remove("arrow-up-active");
                    tarSortDown.current.classList.add("arrow-down-active");
                    tarSortDown.current.classList.remove("arrow-down-inactive");
                }
                if(orderByTarToggle === false){
                    tarSortUp.current.classList.add("arrow-up-active");
                    tarSortUp.current.classList.remove("arrow-up-inactive");
                    tarSortDown.current.classList.add("arrow-down-inactive");
                    tarSortDown.current.classList.remove("arrow-down-active");
                }
            },
        });
    }    

    const toggleEditMode = (term_id, action, isFromEdit) => {
        let termCopy = termsListCopy?.find(each => each.id === term_id);
        let newArr = termsList.map(obj => {
            if (obj.id === term_id) {
                return {
                    ...obj,
                    isEdit: action === 'open' ? true : false,
                    ...(isFromEdit && { sl_term: termCopy?.sl_term?.trim() }),
                    ...(isFromEdit && { tl_term: termCopy?.tl_term?.trim() })
                }
            }
            return obj;
        })
        setTermsList(newArr);
        if (isFromEdit) setTermsListCopy(newArr);
        if (action === 'close') setIsEditMode(false);
        else setIsEditMode(true);
    }

    const handleTermEdit = (e, term_id) => {
        let { name, value } = e.target;
        let newArr = termsListCopy.map(obj => {
            if (obj.id === term_id) {
                return {
                    ...obj,
                    [name]: value
                }
            }
            return obj;
        });
        if (name === "sl_term" && value?.trim() !== '') editSourceTermRef.current.style.border = defaultFieldStyle.border;
        if (name === "tl_term" && value?.trim() !== '') editReplaceTermRef.current.style.border = defaultFieldStyle.border;
        setTermsListCopy(newArr);
    }

    const handleTermDelete = (term_id) => {
        termIdToDeleteRef.current = term_id;
        if (!showTermDeletModal) {
            setShowTermDeletModal(true)
            return;
        }

        Config.axios({
            url: `${Config.BASE_URL}/glex/default_glossary/${termIdToDeleteRef.current}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                let listAfterDeletion = termsList?.filter(each => each.id !== term_id);
                setTermsList(listAfterDeletion);
                setTermsListCopy(listAfterDeletion);
                setShowTermDeletModal(false);
                setTotalTerms(totalTerms - 1);
            },
            error: (err) => { setShowTermDeletModal(false); }
        });
    }


    const handleTermUpdate = (term_id) => {
        let formData = new FormData();
        let term = termsList?.find(each => each.id === term_id)
        let termCopy = termsListCopy?.find(each => each.id === term_id)

        if (termCopy?.sl_term?.trim() === '' || termCopy?.tl_term?.trim() === '') {
            if (termCopy?.sl_term?.trim() === '') editSourceTermRef.current.style.border = errorFieldStyle.border
            if (termCopy?.tl_term?.trim() === '') editReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        if (term?.sl_term !== termCopy?.sl_term?.trim()) {
            formData.append('sl_term', termCopy?.sl_term?.trim());
        }
        if (term?.tl_term !== termCopy?.tl_term?.trim()) {
            formData.append('tl_term', termCopy?.tl_term?.trim());
        }
        Config.axios({
            url: `${Config.BASE_URL}/glex/default_glossary/${term_id}/`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                toggleEditMode(term.id, 'close', true);
            },
            error: (err) => {
                if(err?.response?.status == 400){
                    Config.toast(t("term_already_exist"),'warning');
                }else{
                    Config.toast("Failed to add term!", "error");
                }
            }
        });
    }

    const handleNewTermOnChange = (e) => {
        let { name, value } = e.target;
        if (name === 'sl_term' && e.target.value?.trim() !== '') newSourceTermRef.current.style.border = defaultFieldStyle.border;
        if (name === 'tl_term' && e.target.value?.trim() !== '') newReplaceTermRef.current.style.border = defaultFieldStyle.border;
        setNewTerm({
            ...newTerm,
            [name]: value
        });
    }

    const addNewTerm = () => {
        let formData = new FormData();

        if (newTerm?.sl_term?.trim() === '' || newTerm?.tl_term?.trim() === '') {
            if (newTerm?.sl_term?.trim() === '') newSourceTermRef.current.style.border = errorFieldStyle.border
            if (newTerm?.tl_term?.trim() === '') newReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        formData.append('sl_term', newTerm?.sl_term);
        formData.append('tl_term', newTerm?.tl_term);
        setIsTermAdding(true)

        Config.axios({
            url: `${Config.BASE_URL}/glex/default_glossary/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setNewTerm({
                    sl_term: "",
                    tl_term: ""
                })
                scrollingDivRef.current.scrollTop = 0
                setTimeout(() => {
                    setIsTermAdding(false)
                    getTermsList()
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
            if (Math.abs((Math.round(scrollTop) + Math.round(clientHeight)) - Math.round(scrollHeight)) <= 4) {
                // This will be triggered after hitting the last element.
                // API call should be made here while implementing pagination.
                setTimeout(() => {
                    setCurrPage(currPage + 1);
                }, 80);
            }
        }
    }

    // useEffect(() => {
    // }, [currPage])
    
    const handleEditTermEnter = (e, term_id) => {
        if (e.which === 13) {
            handleTermUpdate(term_id)
        }
    }

    const handleDefaultGlossDownload = async() => {
        let uniqueId = generateKey()

        try{
            // add in download list
            dispatch(addDownloadingFiles({ id: uniqueId, file_name: 'glossary terms', ext: '.xlsx', status: 1 }))
            
            let url = `${Config.BASE_URL}/glex/default_glossary_download`
            const response = await Config.downloadFileFromApi(url);
            
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: uniqueId, status: 2 }))

            Config.downloadFileInBrowser(response)
            
            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: uniqueId }))
            }, 8000);
            
        }catch(e) {
            console.error(e);
            Config.toast(t("no_terms_gloss"), 'warning');
            dispatch(deleteDownloadingFile({ id: uniqueId }))
        }
    } 

    return (
        <React.Fragment>
            <Navbar
                isWhite={true}
                prevPathRef={prevPathRef}
                defaultGlossDownload={true}
                handleDefaultGlossDownload={handleDefaultGlossDownload}
            />
            <section className="padding-correction wordchoice-workspace-container">
                <div className="choicelist-main-header-wrapper">
                    <h2 className="title">{ t("glossary_list")}</h2>
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
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={(e) => SearchTermFilterEnter(e)}
                                onFocus={() => setSearchBox(true)}
                            />
                            <span
                                className={"close " + ((searchBox || searchTerm !== "") ? "show" : "")}
                                onClick={() => handleCloseSearchBox()}
                            >
                                <img src={CloseBlack} alt="search-bar-close" />
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
                                            <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_glossary_2")}</span></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='glossary-word-count'>
                        <span>{t("tot_terms")}: {totalTerms}</span>
                    </div>
                </div>
                <div className="choicelist-wrapper-container">
                    <div className="choicelist-wrap-list">
                        <div className="choiclist-wrap-header">
                            <div className="choicelist-left-wrap" style={{cursor:'pointer'}} onClick={() => {setOrderBySrcToggle(!orderBySrcToggle); setOrderByTarToggle(null)}}>
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
                            <div className="choicelist-right-wrap" style={{cursor:'pointer', justifyContent: 'unset'}} onClick={() => {setOrderByTarToggle(!orderByTarToggle); setOrderBySrcToggle(null)}}>
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
                        <div className="choicelist-item-main-wrapper" onScroll={handleOnScroll} ref={scrollingDivRef}>
                            {termsList?.length !== 0 ? (
                                termsList?.map(term => {
                                    return (
                                        <div onDoubleClick={(e) => { e.stopPropagation(); toggleEditMode(term.id, 'open') }} className={`choicelist-list-item ${(isEditMode && !term?.isEdit) ? "disabled-choicelist" : term?.isEdit ? "blue-bg" : ""}`}>
                                            <div className="choice-list-source-term-wrap">
                                                {term?.isEdit ? (
                                                    <input
                                                        ref={editSourceTermRef}
                                                        type="text"
                                                        name="sl_term"
                                                        value={termsListCopy?.find(each => each.id === term.id)?.sl_term}
                                                        onChange={(e) => handleTermEdit(e, term.id)}
                                                        onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                    />
                                                ) : (
                                                    <p className="choicelist-item-text">
                                                        <span className="text-icon">{term.sl_term?.charAt(0)?.toUpperCase()}</span>
                                                        {term.sl_term}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="choice-list-replace-term-wrap">
                                                {term?.isEdit ? (
                                                    <input
                                                        ref={editReplaceTermRef}
                                                        type="text"
                                                        name="tl_term"
                                                        value={termsListCopy?.find(each => each.id === term.id)?.tl_term}
                                                        onChange={(e) => handleTermEdit(e, term.id)}
                                                        onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                    />
                                                ) : (
                                                    <p className="choicelist-item-text">{term.tl_term}</p>
                                                )}

                                                {term?.isEdit ? (
                                                    <div className="choicelist-action-wrapper">
                                                        <span className="action-list-item" onClick={() => handleTermUpdate(term.id)}>
                                                            <DoneIcon className="list-update-icon" />
                                                        </span>
                                                        <span className="action-list-item" onClick={() => toggleEditMode(term.id, 'close')}>
                                                            <CloseIcon className="list-cancel-icon" />
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="choicelist-action-wrapper">
                                                        <span className="action-list-item" onClick={() => toggleEditMode(term.id, 'open')}>
                                                            <EditOutlinedIcon className="list-edit-icon" />
                                                        </span>
                                                        <span className="action-list-item" onClick={() => handleTermDelete(term.id)}>
                                                            <DeleteOutlineIcon className="list-delete-icon" />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : searchTermRef.current?.trim()?.length !== 0 ? (
                                <div className="no-terms-added-wrapper">
                                    <img src={NoEditor} alt="no-terms-found"/>
                                    <h1>{t("term_not_found")}</h1>
                                </div>
                            ) : (
                                <div className="no-terms-added-wrapper">
                                    <img src={NoTermFound} alt="no-terms-found"/>
                                    <h1>{t("term_not_added_note")}</h1>
                                </div>
                            )}
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
            </section>

            {/* Term delete confirmation modal */}
            {showTermDeletModal && (
                <Rodal
                    visible={showTermDeletModal}
                    showCloseButton={false}
                    onClose={() => console.log()}
                    className="ai-mark-confirm-box">
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
        </React.Fragment>
    )
}

export default DefaultGlossaryWorkspace