import React, { useEffect,useState, useRef } from "react";
import Config from "../Config";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTranslation } from "react-i18next";
import CheckBlue from "../../assets/images/new-ui-icons/check_blue.svg"
import NoEditorFound from "../../assets/images/no-editors-found-2.svg"

function TargetLanguage(props) {
    const { t } = useTranslation();

    const {
        // filteredResults,
        // setFilteredResults,
        // searchInput,
        // setSearchInput,
        // onFocusWrap,
        // setOnFocusWrap,
        alreadySelecetedTarLangID,
        alreadySelectedTarLang,
        showTarLangModal,
        setshowTarLangModal,
        handleTargetLangClick,
        hideAddOrUpdateBtn
    } = props;
    
    const [modalTarOpened, setModalTarOpened] = useState(showTarLangModal ? true : false);
    const searchAreaRef = useRef()

    let selectedTargetLanguages = useRef([]);
    const langSearchOutsideClick = useRef();
    const [searchInput,setSearchInput] = useState('')
    const [onFocusWrap, setOnFocusWrap] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        // console.log("target", modalTarOpened)
    }, [modalTarOpened])

    useEffect(() => {
        if (searchInput !== '') {
            try{
                let re = new RegExp('^'+escapeRegExp(searchInput), 'i')
                let filteredData = props.targetLanguageOptions?.filter((item) => {
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
            setFilteredResults(props.targetLanguageOptions)
        }
    }, [searchInput])

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (langSearchOutsideClick.current && !langSearchOutsideClick.current.contains(e.target)) {
                setOnFocusWrap(false);
                setModalTarOpened(false);
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
        if (props?.targetLanguage && typeof props?.targetLanguage == "Array") {
            props.targetLanguage?.map((target) => {
                selectedTargetLanguages.current.push(target?.id);
            });
        }
    }, [props.targetLanguage]);

    
    useEffect(() => {
        setTimeout(() => {
            handleOnclick()
        }, 200);
        // document.addEventListener('keydown', (e)=>handleOnclick(e))
        // return (()=>{ document.removeEventListener('keydown', (e)=>handleOnclick(e))})
    }, [showTarLangModal, modalTarOpened])

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    if (!props.quickProjectSetup) {
        return (
            <React.Fragment>
                <div className="ai-source-language-cont">
                    <div ref={langSearchOutsideClick} className={"lang-modal-search-area " + (onFocusWrap ? "focused" : null)}>
                        <input
                            value={searchInput}
                            ref={searchAreaRef}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onClick={(e) => handleOnclick(e)}
                            type="text"
                            placeholder={t("search_target_language")}
                            className="search-input"
                            autoFocus
                        />
                        <div className={onFocusWrap ? "icon-wrap" : "search-icon"}>
                            {
                                onFocusWrap ?
                                <CloseOutlinedIcon onClick={(e) => {setSearchInput(""); setOnFocusWrap(false)}} className="icon"/>
                                :
                                <SearchOutlinedIcon className="icon"/>
                            }
                        </div>
                    </div>
                    <div className="ai-src-language-part">
                        <ul className={searchInput?.length == 0 ? "ai-source-langs-list" : "ai-source-langs-list min-list"}>
                            {searchInput?.length >= 1 ?
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
                                            key={value?.id}
                                            onClick={(e) => props.handleTargetLangClick(value, e)}
                                            className={
                                                ((alreadySelecetedTarLangID?.includes(value?.id) || (props.targetLanguage != "" && props.targetLanguage?.some(each => each?.id === value?.id))) ? "list selected" : "list")  
                                            }
                                        >
                                            <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                            {value.language}
                                        </li>
    
                                    )))
                                )
                                :
                                (props.targetLanguageOptions != null) &&
                                    props.targetLanguageOptions?.map((value) => (
                                        <li
                                            key={value?.id}
                                            onClick={(e) => props.handleTargetLangClick(value, e)}
                                            className={
                                                ((alreadySelecetedTarLangID?.includes(value?.id) || (props.targetLanguage != "" && props.targetLanguage?.some(each => each?.id === value?.id))) ? "list selected" : "list")  
                                            }
                                        >
                                            <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                            {value.language}
                                        </li>
                                ))
                                // (
                                //     props.editFilteredTargetLang?.map((value) => (
                                //         <li
                                //             key={value.id}
                                //             onClick={(e) => props.handleTargetLangClick(value, e)}
                                //             className={selectedTargetLanguages.current.indexOf(value.id) != -1 ? "list selected" : "list"}
                                //         >
                                //             <img className="checked-icon" src={Config.HOST_URL + "assets/images/new-ui-icons/check_blue.svg"} alt="check_blue" />{" "}
                                //             {value.language}
                                //         </li>
                                //     ))
                                // )
                            }
                        </ul>
                        {/* <div style={{display:'inline'}}>
                            {
                                props?.alreadySelectedTarLang?.map((each, index)=>{
                                    return(
                                        <span>Selected {each}{index !== props.alreadySelectedTarLang?.length-1 ? ", " : ""}</span>
                                    )
                                })
                            }
                        </div> */}
                    </div>
                    {!props.hideAddOrUpdateBtn && 
                        <div className={"text-end mt-4 "+(props?.alreadySelectedTarLang?.length !== 0  ? "selected-lang-wrap" : "")} style={{display:alreadySelectedTarLang == 'hide' ? 'none' : null }}>
                            <button className="addAndUpdatebutton" onMouseUp={() => {props.handleTargetModalCloseBtn !== undefined ? props.handleTargetModalCloseBtn() : props.setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false);}}>
                                <span className="login-btn new-padd-style">{t("add_or_update")}</span>
                            </button>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <div className="ai-source-language-cont">
                    <div className={"lang-modal-search-area " + (onFocusWrap ? "focused" : null)}>
                        <input
                            value={searchInput}
                            ref={searchAreaRef}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onClick={(e) => handleOnclick(e)}
                            type="text"
                            placeholder={t("search_target_language")}
                            className="search-input"
                        />
                        <div className={onFocusWrap ? "icon-wrap" : "search-icon"}>
                            {
                                onFocusWrap ?
                                <CloseOutlinedIcon onClick={(e) => {setSearchInput(""); setOnFocusWrap(false)}} className="icon"/>
                                :
                                <SearchOutlinedIcon className="icon"/>
                            }
                        </div>
                    </div>
                    <div className="ai-src-language-part">
                        <ul className="ai-source-langs-list">
                            { searchInput?.length >= 1 ?
                                (filteredResults.length == 0 ?
                                    (
                                        <div className="search-not-found-wrapper">
                                            <img src={NoEditorFound} alt="no-results"/>
                                            <h1>{t("no_results")}</h1>
                                        </div>
                                    )
                                    :
                                    (filteredResults.map((value) => (
                                        <li
                                            key={value.id}
                                            onClick={(e) => props.handleTargetLangClick(value.id, value.language, e, props.quickProjectSetup)}
                                            className={value.id == props.targetLanguage ? "list selected" : "list"}
                                        >
                                        <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                        {value.language}
                                    </li>
    
                                    )))
                                )
                                :
                                (
                                    props.targetLanguageOptions != null &&
                                        props.targetLanguageOptions?.map((value) => (
                                            <li
                                                key={value.id}
                                                onClick={(e) => props.handleTargetLangClick(value.id, value.language, e, props.quickProjectSetup)}
                                                className={value.id == props.targetLanguage ? "list selected" : "list"}
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
}

export default TargetLanguage;
