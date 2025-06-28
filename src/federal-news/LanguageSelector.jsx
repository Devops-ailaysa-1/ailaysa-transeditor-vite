import React, { useState, useEffect, createRef, useRef } from "react";
import { ButtonBase, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Sourcelanguage from "../vendor/lang-modal/Sourcelanguage";
import Targetlanguage from "../vendor/lang-modal/Targetlanguage";
import Config from "../vendor/Config";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import { BlueButtonLoader } from "../loader/BlueButtonLoader";
import BlackClose from "../assets/images/new-ui-icons/close_black.svg";

const LanguageSelector = (props) => {
    let {
        newsId,
        defaultPair,
        isStoryTranslating,
        isStoryIdTranslating,
        sourceLanguage,
        targetLanguage,
        setSourceLanguage,
        setTargetLanguage,
        handleClaimStoriesBtnClick,
        restrictedTargetLang,
        sourceLangSelectBoxRef,
        targetLangSelectBoxRef
    } = props;
    const { t } = useTranslation();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const [didMount, setDidMount] = useState(false);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(languageOptionsList);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(languageOptionsList);
    // const [sourceLanguage, setSourceLanguage] = useState("");
    // const [targetLanguage, setTargetLanguage] = useState("");
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [sourceLanguageError, setSourceLanguageError] = useState("");
    const [targetLanguageError, setTargetLanguageError] = useState("");
    const [sourceLanguageDisable, setSourceLanguageDisable] = useState(false);
    const [sourceLabel, setSourceLabel] = useState("");
    const [allLangDetailsList, setAllLangDetailsList] = useState(null);
    const [targetLabel, setTargetLabel] = useState("");
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [sourceTargetValidation, setSourceTargetValidation] = useState({
        source: false,
        target: false,
    });
    const [editProjectId, setEditProjectId] = useState(null);
    const [editJobs, setEditJobs] = useState([]);
    const deletedJobIds = useRef([]);
    const [isEdit, setIsEdit] = useState(false);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const targetLanguageOptionsRef = useRef(languageOptionsList);
    const searchAreaRef = useRef(null);

    useEffect(() => {
        setDidMount(true); //Component mounted
        // runs when the component is unmounted
        return () => {
            var id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
        };
    }, []);

    useEffect(() => {
        // remove the source language from the target language list
        setTargetLanguageOptions(targetLanguageOptions?.filter(each => each.id !== sourceLanguage));
        if (targetLanguage !== '') {
            setTargetLanguage(prevState => prevState?.filter(each => each?.id !== sourceLanguage));
        }
    }, [sourceLanguage]);

    useEffect(() => {
        let langParam = URL_SEARCH_PARAMS.get('lang') ? URL_SEARCH_PARAMS.get('lang') : "English";
        let langParamId = targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.id;       
        if(defaultPair && targetLanguageOptionsRef.current?.length !== 0){
            // setSourceLanguage(defaultPair.src);
            // setSourceLabel(targetLanguageOptionsRef.current?.find((each) => each.id === defaultPair.src)?.language);
            let tar = [];
            defaultPair.tar?.forEach((lang) => {
                if(lang != langParamId){
                    tar.push(targetLanguageOptionsRef.current?.find((each) => each.id == lang))
                }
            }) ;
            setTargetLanguage([...tar]);
        }

        if(targetLanguageOptionsRef.current?.length !== 0){
            setSourceLanguage(langParamId);
            setSourceLabel(targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.language)
        }
    },[targetLanguageOptionsRef.current, URL_SEARCH_PARAMS.get('lang')]);
    
    useEffect(() => {
        if(targetLanguage?.length !== 0 && targetLanguageOptionsRef.current?.length !== 0){
            let langParam = URL_SEARCH_PARAMS.get('lang') ? URL_SEARCH_PARAMS.get('lang') : "English";
            let langParamId = targetLanguageOptionsRef.current?.find((each) => each.language === langParam)?.id;    
            if(targetLanguage?.find(lang => lang.id == langParamId)){
                setTargetLanguage(targetLanguage?.filter(lang => lang.id != langParamId));
            }
        }
    }, [targetLanguage, targetLanguageOptionsRef.current]);
    
    const handleTargetModalCloseBtn = (e) => {
        // if(targetLanguage?.length < 1){
        //     Config.toast(t("at_least_language_selected"), 'warning')
        //     return;
        // }
        setshowTarLangModal(false); 
        setSearchInput(''); 
        setOnFocusWrap(false);        
    }

    /* Selected source language should not display on the target language options */
    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(
            targetLanguageOptionsRef.current.filter(
                (element) => element.id !== sourceLanguage
            )
        );
    };

    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    
    useEffect(() => {
        alreadySelecetedTarLangID.length !== 0 &&
            removeAlreadySelectedTargetlanguage();
    }, [alreadySelecetedTarLangID]);

    function getDifference() {
        return targetLanguageOptionsRef.current.filter((object1) => {
            return !alreadySelecetedTarLangID.some((object2) => {
                return object1.id === object2;
            });
        });
    }

    const removeErrorFieldClass = (element, select = false) => {
        element.classList.remove('error-field-style');
    }

    const removeAlreadySelectedTargetlanguage = () => {
        setEditFilteredTargetLang(getDifference());
    };

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        removeErrorFieldClass(sourceLangSelectBoxRef.current);
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            source: false,
        });
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {        
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if(restrictedTargetLang?.find(each => each === value.id)){
            Config.toast('This language has already been claimed', 'warning');
            return;
        }
        if(targetLanguage?.length === 2 && (targetLanguage?.find(each => each.id === value.id) ? false : true)){
            Config.toast('Maximum 2 languages can be added for better project management', 'warning');
            return;
        }
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
            targetLanguageTemp = targetLanguageTemp?.filter(each => each?.id !== value?.id);
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected");
            targetLanguageTemp.push(value);
        }
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            target: false,
        });
        setSearchInput('');
        setOnFocusWrap(false);
    };

    useEffect(() => {
        removeSelectedSourceFromTarget();
    }, [sourceLanguage]);

    /* Throw errors when there's no target language selected */
    useEffect(() => {
        if (didMount) {
            if (targetLanguage?.length > 0){
                removeErrorFieldClass(targetLangSelectBoxRef.current);
                setTargetLanguageError("");
            } 
            else setTargetLanguageError(t("target_validation_note"));
        }
    }, [targetLanguage]);

    useEffect(() => {
        if (targetLanguage) {
            let list = "";
            targetLanguage?.map((each, index) => {
                list += `${each?.language}${index !== targetLanguage?.length - 1 ? ", " : ""
                    }`;
            });
            setTargetLanguageListTooltip(list);
        }
    }, [targetLanguage, targetLanguageOptionsRef.current]);

    useEffect(() => {
        if (targetLanguage !== "") {
            let a = [];
            editJobs?.forEach((each) => {
                if (each?.target_language !== null) {
                    targetLanguage?.map((b) => {
                        if (b?.id === each?.target_language) {
                            a.push(each?.id);
                        }
                    });
                }
            });
            let targetLangToRemove = editJobs?.filter((each) => each?.target_language !== null && !a.includes(each.id));
            setTargetLangListToRemove(targetLangToRemove);
        }
    }, [targetLanguage]);

    const focusSourceLangDiv = () => {
        if (sourceLangSelectBoxRef.current !== null) sourceLangSelectBoxRef.current.style = 'border: 1px solid #E74C3C;';
        setTimeout(() => {
            if (sourceLangSelectBoxRef.current !== null) sourceLangSelectBoxRef.current.style = 'border: 1px solid #ced4da;';
        }, 1000);
    }

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        // onClose: hideSettingsModal,
    };

    return (
        <>
            <AnimatePresence>
                <motion.div   key="language" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}  exit={{ opacity: 0, y: -50, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.25 }} className="language-selector-wrapper" >
                    <div className="selected-value-wrapper">
                        <p>(<span>{newsId?.length}</span>) selected</p>
                    </div>  
                    <Tooltip title={`${t("source_language")}: ${sourceLabel}`} placement="top" arrow>
                        <div   ref={sourceLangSelectBoxRef}  className={sourceLanguageDisable ? 'src-language-selector disable' : 'src-language-selector'}
                            onClick={() => { sourceLanguageDisable ? setshowSrcLangModal(false) : setshowSrcLangModal(true) }}  >
                            {(sourceLabel === "") ? (
                                <span className="placeholder">{t("source_language")}</span>
                            ) : (
                                <span className="value">{sourceLabel}</span>
                            )}
                            <i style={{ color: "#ffffff" }}  className="fas fa-caret-down" />
                        </div>   
                    </Tooltip>
                    <Tooltip title={`${t("target_language")}: ${targetLanguage?.map(each => each?.language)?.join(', ')}`} placement="top" arrow>
                        <div  style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }} className='target-language-selector'  ref={targetLangSelectBoxRef}
                            onClick={() => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }}  >
                            {targetLanguage == "" ? (
                                <span className="placeholder">
                                    {t("target_language")}
                                </span>
                            ) : (
                                <span className="value">
                                    {targetLanguage.length +
                                        " " +
                                        (targetLanguage.length > 1 ? t("languages") : t("language")) +
                                        " " + t("selected")}
                                </span>
                            )}
                            <i style={{ color: "#ffffff" }} className="fas fa-caret-down" />
                        </div>  
                    </Tooltip>
                    <div className='add-to-translate-wrapper'>
                        <ButtonBase   className='add-to-translate-btn'  disabled={isStoryIdTranslating !== null}
                            onClick={(e) => {!isStoryTranslating && handleClaimStoriesBtnClick(e, null, true)}}  >
                            <span>
                                {isStoryTranslating && <BlueButtonLoader />}
                                Claim
                            </span>
                        </ButtonBase>
                    </div>     
                </motion.div>
            </AnimatePresence>
            {showSrcLangModal && (
                <Rodal  visible={showSrcLangModal}
                    {...modaloption} showCloseButton={false} className="ai-lang-select-modal" >
                    <div className="lang-modal-wrapper">
                        <span  className="modal-close-btn lang-close"  onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false) }} >
                            <img src={BlackClose} alt="close_black" />
                        </span>
                        { showSrcLangModal &&
                            <Sourcelanguage
                                sourceLanguage={sourceLanguage}
                                showSrcLangModal={showSrcLangModal}
                                setshowSrcLangModal={setshowSrcLangModal}
                                sourceLanguageOptions={sourceLanguageOptions}
                                handleSourceLangClick={handleSourceLangClick}
                                filteredResults={filteredResults}
                                setFilteredResults={setFilteredResults}
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                                onFocusWrap={onFocusWrap}
                                setOnFocusWrap={setOnFocusWrap}
                                searchAreaRef={searchAreaRef}
                            />}
                    </div>
                </Rodal>
            )}
            {showTarLangModal && (
                <Rodal
                    visible={showTarLangModal}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-tar-lang-select-modal" >
                    <div className="lang-modal-wrapper">
                        <span className="modal-close-btn lang-close" onClick={(e) => handleTargetModalCloseBtn()} >
                            <img  src={BlackClose}  alt="close_black" />
                        </span>
                        <Targetlanguage
                            targetLanguage={targetLanguage}
                            targetLanguageOptions={targetLanguageOptions}
                            setTargetLanguageOptions={setTargetLanguageOptions}
                            handleTargetLangClick={handleTargetLangClick}
                            showTarLangModal={showTarLangModal}
                            setshowTarLangModal={setshowTarLangModal}
                            alreadySelectedTarLang={alreadySelectedTarLang}
                            alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                            editFilteredTargetLang={editFilteredTargetLang}
                            isEdit={isEdit}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                            handleTargetModalCloseBtn={handleTargetModalCloseBtn} />
                    </div>
                </Rodal>
            )}
        </>
    )
}

export default LanguageSelector;