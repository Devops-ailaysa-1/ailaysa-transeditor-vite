import React, { useEffect, useState, useRef} from "react";
import Config from "../Config";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTranslation } from "react-i18next";
import CheckBlue from "../../assets/images/new-ui-icons/check_blue.svg"
import NoEditorFound from "../../assets/images/no-editors-found-2.svg"


function SourceLanguage(props) {
    const { t } = useTranslation();

    const {
        filteredResults,
        setFilteredResults,
        searchInput,
        setSearchInput,
        onFocusWrap,
        setOnFocusWrap,
        searchAreaRef,
        showSrcLangModal,
        setshowSrcLangModal,
        
    } = props;

    const langSearchOutsideClick = useRef();
    const [modalOpened, setModalOpened] = useState(showSrcLangModal ? true : false);


    useEffect(() => {
        if (searchInput !== '') {
            try{
                let re = new RegExp('^'+escapeRegExp(searchInput), 'i')
                let filteredData = props.sourceLanguageOptions?.filter((item) => {
                  return(
                    re?.test(item.language)
                  )
                })
                setFilteredResults(filteredData)
            }catch(e){
                // console.log(e)
            }
        }
        else{
            setFilteredResults(props.sourceLanguageOptions)
        }
    }, [searchInput])

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (langSearchOutsideClick.current && !langSearchOutsideClick.current.contains(e.target)) {
                setOnFocusWrap(false);
                setModalOpened(false);
            }
        };
        document.addEventListener("mousedown", handleSearchTermClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });

    const handleOnclick = (e) => {
        searchAreaRef.current?.focus();
        setOnFocusWrap(true)
    }
      

    useEffect(() => {
        // if(modalOpened){
            // console.log("pass")
            // console.log(searchAreaRef.current)
            setTimeout(() => {
                searchAreaRef.current?.focus();
                setOnFocusWrap(true)
            }, 200);
        // }
        document.addEventListener('keydown', (e)=>handleOnclick(e))
        return (()=>{ document.removeEventListener('keydown', (e)=>handleOnclick(e))})
        
        
    }, [showSrcLangModal, modalOpened])    

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    return (
        <React.Fragment>
            <div className="ai-source-language-cont">
                <div ref={langSearchOutsideClick} className={"lang-modal-search-area " + (onFocusWrap ? "focused" : "")}>
                    <input
                        value={searchInput}
                        ref={searchAreaRef}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onClick={(e) => handleOnclick(e)}
                        type="text"
                        placeholder={t("search_source_language")}
                        className="search-input"
                        autoFocus
                    />
                    {
                        onFocusWrap ?
                        <div onMouseUp={(e) => {setSearchInput(""); setOnFocusWrap(false)}} className="icon-wrap">
                            <CloseOutlinedIcon className="icon"/>
                        </div>
                        :
                        <div className="search-icon">
                            <SearchOutlinedIcon className="icon"/>
                        </div>
                    }
                </div>
                <div className="ai-src-language-part">
                    <ul className={searchInput?.length == 0 ? "ai-source-langs-list" : "ai-source-langs-list min-list"}>
                        { searchInput?.length >= 1 ?
                            (filteredResults?.length == 0 ?
                                (
                                    <div className="search-not-found-wrapper">
                                        <img src={NoEditorFound} alt="no-results"/>
                                        <h1>{t("no_results")}</h1>
                                    </div>
                                )
                                :
                                (filteredResults?.map((value) => (
                                    <li
                                        key={value.id}
                                        onClick={(e) => props.handleSourceLangClick(value.id, value.language, e)}
                                        className={value.id == props.sourceLanguage ? "list selected" : "list"}
                                    >
                                        <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                        {value.language}
                                    </li>
                                )))
                            )
                            :
                            (props.sourceLanguageOptions != null &&
                                props.sourceLanguageOptions.map((value) => (
                                    <li
                                        key={value.id}
                                        onClick={(e) => props.handleSourceLangClick(value.id, value.language, e)}
                                        className={value.id == props.sourceLanguage ? "list selected" : "list"}
                                    >
                                        <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                        {value.language}
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SourceLanguage;
