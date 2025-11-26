import React, { useEffect, useRef, useState } from 'react';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from '../../vendor/Config';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg";
import ChatSearch from "../../assets/images/chat/chat-search.svg";
import ChatSearchBarClose from "../../assets/images/assign-page/search-bar-close.svg";
import NoEditorsFoundTwo from "../../assets/images/no-editors-found-2.svg";
import EmptyProjectFolder from "../../assets/images/empty-projects-folder.svg";

const DocumentListModal = (props) => {
    let { showDocumentListModal, setShowDocumentListModal } = props;
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [openFileLoader, setOpenFileLoader] = useState(false);
    const [documentsList, setDocumentsList] = useState(null);
    const [isSearchDropDownShow, setIsSearchDropDownShow] = useState(false);
    const [showEmptyProjects, setEmptyProjects] = useState(false);
    const [isSearchTermDeleted, setIsSearchTermDeleted] = useState(false);
    const dropDownDivRef = useRef(null);
    const isDocNameSearchedRef = useRef(null);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        getMyDocumentList();
    }, []);

    // drop-down close listener when outside is clicked
    useEffect(() => {
        const handleDropDownClickOutside = (e) => {
            if (dropDownDivRef.current && !dropDownDivRef.current.contains(e.target)) {
                if(searchBoxRef.current?.value === ""){
                    setIsSearchDropDownShow(false);
                }
            }
        };
        document.addEventListener("mousedown", handleDropDownClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleDropDownClickOutside);
        };
    }, []);

    // call api only when param is changed or something is searched
    useEffect(() => {
        if(isSearchTermDeleted){
            if(isDocNameSearchedRef.current) getMyDocumentList();
            setIsSearchTermDeleted(false);
        }
    }, [isSearchTermDeleted]);

    const handleDocSearchTerm = ((e) => {
        setSearchTerm(e.target.value);
    })

    const handleKeyUp = (e) => {
        if (e.which === 13 && searchTerm?.trim() !== "") {
            getMyDocumentList();
            setIsSearchDropDownShow(false);
            e.target.blur();
        }
        if((e.key === 'Backspace' || e.key === 'Delete') && searchTerm?.trim() === ""){
            setIsSearchTermDeleted(true);
        }
    }

    const handleCloseSearchBox = () => {
        setSearchTerm("");
        setIsSearchDropDownShow(false);
        setIsSearchTermDeleted(true);
    }

    const handleDropDownClick = () => {
        getMyDocumentList();
        setIsSearchDropDownShow(false);
    } 

    const getMyDocumentList = () => {
        setOpenFileLoader(true);
        setDocumentsList([]);
        let list = [];
        let url = `${Config.BASE_URL}/workspace/mydocuments?pagination=False`;
        if (searchTerm) {
            url += `&doc_name=${searchTerm}`;
            isDocNameSearchedRef.current = true;
        }else isDocNameSearchedRef.current = false;

        Config.axios({
            url: url,
            method: "GET",
            auth: true,
            success: (response) => {
                list = response?.data;
                if (list.length === 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                setTimeout(() => {
                    setDocumentsList(list);
                }, 200);
                setOpenFileLoader(false);
            },
        });
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    const openDocument = (id) => {
        // window.location.href = `/word-processor?document-id=${id}`;
        openInNewTab(Config.TRANSEDITOR_HOST + `/word-processor?document-id=${id}`);
    }

    return (
        <Rodal visible={showDocumentListModal} showCloseButton={false} className="ai-open-doc-modal"  onClose={() => console.log()} >
            <span className="modal-close-btn lang-close" onClick={(e) => { setShowDocumentListModal(false) }}>
                <img src={CloseBlack} alt="close_black" />
            </span>
            <div className="modal-wrapper-file-manager">
                <div className="doc-file-open-header">
                    <div className="open-doc-title-container">
                        <div className="open-doc-title">
                            <DescriptionIcon className="doc-icon" />
                            <span>{t("open_a_file")}</span>
                        </div>
                        <div className="position-relative">
                            <div className={"project-list-search-box " + (isSearchDropDownShow ? "active" : "")}>
                                <div className="img-box">
                                    <img src={ChatSearch} alt="search-icon" />
                                </div>
                                <input type="search" ref={searchBoxRef} value={searchTerm} onChange={handleDocSearchTerm} placeholder={`${t("search")}....`}
                                    onKeyUp={(e) => handleKeyUp(e)} onFocus={() => setIsSearchDropDownShow(true)} />
                                <span className={"close " + (searchTerm !== '' ? "show " : " ")} onClick={() => handleCloseSearchBox()}>
                                    <img src={ChatSearchBarClose} alt="search-bar-close" />
                                </span>
                            </div>
                            <div ref={dropDownDivRef} className={"search-results-bar glossary-proj-list " + (isSearchDropDownShow ? "show" : "hide")}>
                                <div onClick={(e) => searchTerm !== "" && handleDropDownClick()} className={"search-results-item " + (searchTerm !== "" ? " " : "cursor-change")}>
                                    <SearchIcon className="search-icon" />
                                    <div className="searched-results-info">
                                        <p className="searched-term">{searchTerm}</p>
                                        {
                                            searchTerm?.trim() !== "" ?
                                                <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                :
                                                <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_convert_list_docs")}</span></p>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="doc-file-table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{t("doc_name")}</th>
                                <th>{t("created_at")}</th>
                                <th>{t("action")}</th>
                            </tr>
                        </thead>
                        <tbody className="doc-open-table-body">
                            {
                                documentsList?.length !== 0 && !openFileLoader ?
                                    (
                                        <React.Fragment>
                                            {
                                                (documentsList?.length !== 0 || searchTerm != "") ?
                                                    (
                                                        documentsList?.map(item => {
                                                            return (
                                                                <tr key={item?.id}>
                                                                    <td style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                        {item?.doc_name}
                                                                        {
                                                                            item.word_count > 0 &&
                                                                            <span className="word-count-capsule"><span >{item.word_count} W</span></span>
                                                                        }
                                                                    </td>
                                                                    <td>{Config.getProjectCreatedDate(item?.created_at)}</td>
                                                                    <td>
                                                                        <button className="openProjectButton" type="button" onMouseUp={() => { openDocument(item?.id) }}>
                                                                            <span className="fileopen-new-btn">{t("open")}</span>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <React.Fragment>
                                                            <section className="ai-no-project-found">
                                                                <div className="ai-no-project-cont">
                                                                    {
                                                                        searchTerm ?
                                                                            <img className="empty-folder-img" src={NoEditorsFoundTwo} alt="main-no-project-found" />
                                                                            :
                                                                            <img className="empty-folder-img" src={EmptyProjectFolder} alt="empty-folder-open" />
                                                                    }
                                                                    <h2>{t("pdf_not_found_note")}</h2>
                                                                </div>
                                                            </section>
                                                        </React.Fragment>
                                                    )
                                            }
                                        </React.Fragment>
                                    )
                                    :
                                    (
                                        !showEmptyProjects && (
                                            <>
                                                {
                                                    Array(10)
                                                        .fill(null)
                                                        .map((value, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td>
                                                                        <Skeleton  animation="wave" variant="text" width={100} />
                                                                    </td>
                                                                    <td>
                                                                        <Skeleton animation="wave" variant="text" width={120} />
                                                                    </td>
                                                                    <td>
                                                                        <Skeleton animation="wave" variant="text" style={{ width: 100, height: 40, marginLeft: "auto" }}  />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                }
                                            </>
                                        )
                                    )
                            }
                            {showEmptyProjects && (
                                <React.Fragment>
                                    <section className="ai-no-project-found">
                                        <div className="ai-no-project-cont">
                                            <img className="empty-folder-img" src={EmptyProjectFolder} alt="empty-folder-open" />
                                            <h2>{t("no_documents")}</h2>
                                        </div>
                                    </section>
                                </React.Fragment>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Rodal>
    )
}

export default DocumentListModal;