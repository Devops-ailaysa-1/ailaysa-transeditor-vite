import React, { useState, useEffect, useRef } from 'react'
import Config from '../Config';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Navbar from '../Navbar';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ChatSearch from "../../assets/images/chat/chat-search.svg"
import SearchBarClose from "../../assets/images/assign-page/search-bar-close.svg"
import ConfirmIcon from "../../assets/images/new-ui-icons/confirm-icon.svg"

const ChoiceListWorkspace = (props) => {
    const { t } = useTranslation();
    const { choiceListId } = props.match.params
    const location = useLocation()

    const [searchBox, setSearchBox] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [termsList, setTermsList] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [termsListCopy, setTermsListCopy] = useState([])
    const [showTermDeletModal, setShowTermDeletModal] = useState(false)
    const [newTerm, setNewTerm] = useState({
        source_word: "",
        edited_word: ""
    })

    // states for term pagination
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [lastList, setLastList] = useState(false);
    const [totalPages, setTotalPages] = useState(0)


    const termIdToDeleteRef = useRef(null)
    const searchTermRef = useRef(null);
    const searchTermCloseOutside = useRef();
    const prevPathRef = useRef(null)

    const newSourceTermRef = useRef(null)
    const newReplaceTermRef = useRef(null)
    const editSourceTermRef = useRef(null)
    const editReplaceTermRef = useRef(null)
    const scrollingDivRef = useRef(null)    // scrolling pagination div 
    const lastPageRef = useRef(null)

    const flexStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid grey'
    }

    useEffect(() => {
        if (choiceListId) {
            getTermsList()
        }
    }, [choiceListId])

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
    });

    useEffect(() => {
        const fetchData = async () => {
            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );
            let token = userCacheData != null ? userCacheData?.token : "";
            const response = await axios.get(
                `${Config.BASE_URL}/workspace_okapi/selflearn/?choice_list_id=${choiceListId}&page=${currPage}${searchTerm !== '' ? `&search=${searchTerm}` : ''}`,
                {
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            lastPageRef.current = currPage
            setPrevPage(currPage);
            setTermsList([...termsList, ...response?.data?.results]);
        };
        if (currPage <= totalPages && prevPage !== currPage && lastPageRef.current !== currPage) {
            fetchData();
        }
    }, [currPage]);

    useEffect(() => {
        if (searchTerm == "" && isSearchTermDelete) {
            searchTermRef.current = null
            getTermsList()
            setIsSearchTermDelete(false)
        }
    }, [searchTerm, isSearchTermDelete])

    const getTermsList = () => {
        setSearchBox(false)
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/selflearn/?choice_list_id=${choiceListId}&page=1${searchTerm !== '' ? `&search=${searchTerm}` : ''}`,
            method: "GET",
            auth: true,
            success: (response) => {
                // console.log(response.data)
                setTermsList(response.data.results)
                setTermsListCopy(response.data.results)
                setTotalPages(Math.ceil(response?.data.count / 20))
                setCurrPage(1)
            },
        });
    }

    

    const toggleEditMode = (term_id, action, isFromEdit) => {
        let termCopy = termsListCopy?.find(each => each.id === term_id)

        let newArr = termsList.map(obj => {
            if (obj.id === term_id) {
                return {
                    ...obj,
                    isEdit: action === 'open' ? true : false,
                    ...(isFromEdit && { source_word: termCopy?.source_word?.trim() }),
                    ...(isFromEdit && { edited_word: termCopy?.edited_word?.trim() })
                }
            }
            return obj
        })
        setTermsList(newArr)
        if (isFromEdit) setTermsListCopy(newArr)
        if (action === 'close') setIsEditMode(false)
        else setIsEditMode(true)
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

        if (name === "source_word" && value?.trim() !== '') editSourceTermRef.current.style.border = defaultFieldStyle.border
        if (name === "edited_word" && value?.trim() !== '') editReplaceTermRef.current.style.border = defaultFieldStyle.border
        // console.log(newArr);
        setTermsListCopy(newArr)
    }

    const handleTermDelete = (term_id) => {
        termIdToDeleteRef.current = term_id

        if (!showTermDeletModal) {
            setShowTermDeletModal(true)
            return;
        }

        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/selflearn/${termIdToDeleteRef.current}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                // console.log(response.data)
                let listAfterDeletion = termsList?.filter(each => each.id !== term_id)
                setTermsList(listAfterDeletion)
                setTermsListCopy(listAfterDeletion)
                setShowTermDeletModal(false)
            },
            error: (err) => { setShowTermDeletModal(false) }
        });
    }


    const handleTermUpdate = (term_id) => {
        let formData = new FormData();
        let term = termsList?.find(each => each.id === term_id)
        let termCopy = termsListCopy?.find(each => each.id === term_id)

        if (termCopy?.source_word?.trim() === '' || termCopy?.edited_word?.trim() === '') {
            if (termCopy?.source_word?.trim() === '') editSourceTermRef.current.style.border = errorFieldStyle.border
            if (termCopy?.edited_word?.trim() === '') editReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        if (term?.source_word !== termCopy?.source_word?.trim()) {
            formData.append('source_word', termCopy?.source_word?.trim());
        }
        if (term?.edited_word !== termCopy?.edited_word?.trim()) {
            formData.append('edited_word', termCopy?.edited_word?.trim());
        }


        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/selflearn/${term_id}/`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                console.log(response.data)
                toggleEditMode(term.id, 'close', true)

                // let newArr = termsList?.map(obj => {
                //     if (obj.id === term_id) {
                //         return {
                //             ...obj,
                //             source_word: termCopy?.edited_word?.trim(),
                //             edited_word: termCopy?.edited_word?.trim()
                //         }
                //     }
                //     return obj
                // })
                // setTermsList(newArr)
                // getTermsList()
            },
        });
    }

    const errorFieldStyle = {
        border: '1px solid #e74c3c'
    }
    const defaultFieldStyle = {
        border: '1px solid #AFCEF7'
    }


    const handleNewTermOnChange = (e) => {
        let { name, value } = e.target
        if (name === 'source_word' && e.target.value?.trim() !== '') newSourceTermRef.current.style.border = defaultFieldStyle.border
        if (name === 'edited_word' && e.target.value?.trim() !== '') newReplaceTermRef.current.style.border = defaultFieldStyle.border

        setNewTerm({
            ...newTerm,
            [name]: value
        })
    }

    const addNewTerm = () => {
        let formData = new FormData();

        if (newTerm?.source_word?.trim() === '' || newTerm?.edited_word?.trim() === '') {
            if (newTerm?.source_word?.trim() === '') newSourceTermRef.current.style.border = errorFieldStyle.border
            if (newTerm?.edited_word?.trim() === '') newReplaceTermRef.current.style.border = errorFieldStyle.border
            return
        }

        formData.append('source_word', newTerm?.source_word);
        formData.append('edited_word', newTerm?.edited_word);
        formData.append('choice_list_id', choiceListId);

        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/selflearn/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                setNewTerm({
                    source_word: "",
                    edited_word: ""
                })
                scrollingDivRef.current.scrollTop = 0
                setTimeout(() => {
                    getTermsList()
                }, 100);
                newSourceTermRef.current.focus()
            },
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
            if (scrollTop + clientHeight === scrollHeight) {
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

    return (
        <React.Fragment>
            <Navbar
                isWhite={true}
                prevPathRef={prevPathRef}
                isChoiceList={true}
            />
            <section className="padding-correction">
                <div className="choicelist-main-header-wrapper">
                    <h2 className="title">{t("choice_list")}</h2>
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
                                <img src={SearchBarClose} alt="search-bar-close" />
                            </span>
                        </div>
                        <div ref={searchTermCloseOutside} className={"search-results-bar " + (searchBox ? "show" : "hide")}>
                            <div
                                onClick={(e) => (searchTerm !== "" ? getTermsList(e) : "")}
                                className={"search-results-item " + (searchTerm !== "" ? " " : "cursor-change")}
                            >
                                <SearchIcon className="search-icon" />
                                <div className="searched-results-info">
                                    <p className="searched-term">{searchTerm}</p>
                                    {
                                        searchTerm !== "" ?
                                            <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                            :
                                            <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_choicelist")}</span></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="choicelist-wrapper-container">
                    <div className="choicelist-wrap-list">
                        <div className="choiclist-wrap-header">
                            <div className="choicelist-left-wrap">
                                <p className="title-header">{t("src_term")}</p>
                            </div>
                            <div className="choicelist-right-wrap">
                                <p className="title-header">{t("replaced_with")}</p>
                                {/* <p className="title-header">Actions</p> */}
                            </div>
                        </div>
                        <div className="choicelist-item-main-wrapper" onScroll={handleOnScroll} ref={scrollingDivRef}>
                            {
                                termsList?.map(term => {
                                    return (
                                        <div onDoubleClick={(e) => { e.stopPropagation(); toggleEditMode(term.id, 'open') }} className={`choicelist-list-item ${(isEditMode && !term?.isEdit) ? "disabled-choicelist" : term?.isEdit ? "blue-bg" : ""}`}>
                                            <div className="choice-list-source-term-wrap">
                                                {term?.isEdit ? (
                                                    <input
                                                        ref={editSourceTermRef}
                                                        type="text"
                                                        name="source_word"
                                                        value={termsListCopy?.find(each => each.id === term.id)?.source_word}
                                                        onChange={(e) => handleTermEdit(e, term.id)}
                                                        onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                    />
                                                ) : (
                                                    <p className="choicelist-item-text">
                                                        <span className="text-icon">{term.source_word?.charAt(0)?.toUpperCase()}</span>
                                                        {term.source_word}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="choice-list-replace-term-wrap">
                                                {term?.isEdit ? (
                                                    <input
                                                        ref={editReplaceTermRef}
                                                        type="text"
                                                        name="edited_word"
                                                        value={termsListCopy?.find(each => each.id === term.id)?.edited_word}
                                                        onChange={(e) => handleTermEdit(e, term.id)}
                                                        onKeyUp={(e) => handleEditTermEnter(e, term.id)}
                                                    />
                                                ) : (
                                                    <p className="choicelist-item-text">{term.edited_word}</p>
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
                            }
                        </div>
                    </div>
                    <div className="choiclist-create-main-wrapper">
                        <div className="choice-list-create-source-term-wrap">
                            <input
                                type="text"
                                ref={newSourceTermRef}
                                name="source_word"
                                placeholder={t("src_term")}
                                value={newTerm?.source_word}
                                onChange={handleNewTermOnChange}
                                onKeyUp={handleEnterKey}
                            />
                        </div>
                        <div className="choice-list-create-replace-term-wrap">
                            <input
                                type="text"
                                ref={newReplaceTermRef}
                                name="edited_word"
                                placeholder={t("replaced_with")}
                                value={newTerm?.edited_word}
                                onChange={handleNewTermOnChange}
                                onKeyUp={handleEnterKey}
                            />
                            <button
                                className="add-term-btn"
                                onClick={() => addNewTerm()}
                            >
                                <span className="fileopen-new-btn">{t("add_term")}</span>
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
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-wrapper">
                        <img
                            src={ConfirmIcon}
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

export default ChoiceListWorkspace;