import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Config from "../../vendor/Config";
import { Checkbox, Tooltip, unstable_useEnhancedEffect } from "@mui/material";
import SimpleRodals from "../../project-setup-components/rodals/SimpleRodals";
import TargetLanguage from "../../vendor/lang-modal/Targetlanguage";
import Rodal from "rodal";
import Select, { components } from "react-select";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import { ConstructionOutlined } from "@mui/icons-material";
import { count } from 'letter-count';
import ButtonBase from '@mui/material/ButtonBase';
// import DOMPurify from 'isomorphic-dompurify';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSettings } from "../../features/CustomizationSettingsSlice";
import { setShowCustomSettingsModal } from "../../features/ShowCustomSettingsModalSlice";
import { useTranslation } from "react-i18next";
import $ from 'jquery';
import ImageGallery from "../../project-setup-components/image-gallery/ImageGallery";
import DiscardPopup from "../../assets/images/new-ui-icons/discard-popup.svg";
import ImpFileIcon from "../../assets/images/new-ui-icons/imp-icon-file.svg";

const CustomizationPanel = (props) => {
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const {
        setRightSideBar,
        aiCustomizationOptions,
        getAiCustomizationResult,
        translateWritterSwitch,
        setTranslateWritterSwitch,
        summerNoteEditorRef,
        getAiGeneratedImage,
        showSrcLangModal,
        setshowSrcLangModal,
        showTarLangModal,
        setshowTarLangModal,
        onImageClick,
        showDesigner,
        setShowDesigner,
        promptMainWrapper, 
        setPromptMainWrapper,
        showPlaceHolderDivForBook
    } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const defaultSettings = useSelector((state) => state.customizationSetting.value);
    const { t } = useTranslation();
    const [selectionString, setSelectionString] = useState('');
    const [targetLanguage, setTargetLanguage] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState();   // by default engligh is selected as source
    const [sourceLabel, setSourceLabel] = useState(t("select_source_language"));  // by default english source label is set 
    // const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    // const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedMTEngine, setSelectedMTEngine] = useState(1);
    const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
    const [targetLanguageAskCutomizationLabel, setTargetLanguageAskCutomizationLabel] = useState('English');
    const [mtpeEngines, setMtpeEngines] = useState([]);
    const [commonTarValue, setCommonTarValue] = useState(null);
    const [commonSrcValue, setCommonSrcValue] = useState(null);
    const [tempsrc, setTempsrc] = useState(null);
    const [tempsrclab, setTempsrclab] = useState(null);
    const [temptar, setTemptar] = useState(null);
    const [error, setError] = useState({ inputText: "", sourceLanguage: "", targetLanguage: "" });
    const [targetLabel, setTargetLabel] = useState(t("target_language"));
    const [autoDetectIndication, setAutoDetectIndication] = useState(false);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [sourceLanguageAsk, setSourceLanguageAsk] = useState(17);   // by default engligh is selected as source
    const [showGallery, setShowGallery] = useState(false);
    const [sidebarType, setSidebarType] = useState('');    
    const searchAreaRef = useRef(null);
    const mtEngineOptionRef = useRef(null);
    const mtEngineOptionsRef = useRef(null);
    const autoDetectFireEnable = useRef(true);
    const wordbytesize = useRef(false);
    const targetLanguageOptionsRef = useRef(null);
    const fromDefaultLang = useRef(false);
    const allLangDetailsListRef = useRef(null);
    const commonSrcValueRef = useRef(null);
    const commonTarValueRef = useRef(null);
    const commonMtpeEngineRef = useRef(null);
    
    const targetDiv = document.querySelector('.note-editable');

    const header = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
    };

    useEffect(() => {
        getMtEngines();
        getAllLangDetailsList();
        getLanguagesList();
    }, [])

    useEffect(() => {
        const sourceFilter = allLangDetailsListRef.current?.filter(
            (each) => each?.language === sourceLanguage
        );
        const srcTranslateFilterRes = sourceFilter?.filter(
            (each) => each?.translate === true
        );
        let sortedSrcMtpe = srcTranslateFilterRes?.map((each) => {
            return each?.mtpe_engines;
        });
        commonSrcValueRef.current = sortedSrcMtpe;
        // remove the source language from the target language list
        setTargetLanguageOptions(targetLanguageOptionsRef.current?.filter(each => each.id !== sourceLanguage));
        if (sourceLanguage == targetLanguage[0]) {
            setTargetLanguage([]);
        }
    }, [sourceLanguage]);

    useEffect(() => {
        let targetArr = [];
        for (let i = 0; i < targetLanguage?.length; i++) {
            targetArr?.push(
                allLangDetailsListRef.current?.filter(
                    (each) => each?.language === targetLanguage[i]?.id
                )
            );
        }
        const tarTranslateFilter = targetArr?.map((each) => {
            return each?.filter((eachTargetArr) => eachTargetArr?.translate === true);
        });
        let sortedTarMtpe = tarTranslateFilter?.map((each) => {
            return each?.map((each2) => {
                return each2?.mtpe_engines;
            });
        });
        let commonTarMtpeEngine = sortedTarMtpe?.shift()?.filter(function (v) {
            return sortedTarMtpe?.every(function (a) {
                return a?.indexOf(v) !== -1;
            });
        });
        commonTarValueRef.current = commonTarMtpeEngine;
        const common = commonSrcValueRef.current?.filter((value) =>
            commonTarValueRef.current?.includes(value)
        );
        commonMtpeEngineRef.current = common;
        let engines = [];
        const engine = mtEngineOptionRef.current?.filter((value) =>
            commonMtpeEngineRef.current?.includes(value?.id)
        );
        engine?.map((eachEngine) => {
            engines?.push({
                value: eachEngine?.id,
                label: eachEngine?.name?.replaceAll("_", " "),
            });
        }
        );
        setMtpeEngineOptions(engines);
        mtEngineOptionsRef.current = engines;        
        if (mtEngineOptionsRef.current.find(e => { return e.value == selectedMTEngine }) == undefined) {
            if (!fromDefaultLang.current) {
                setSelectedMTEngine(mtEngineOptionsRef.current[0]?.value);
            }
        }
    }, [targetLanguage]);
  
    useEffect(() => {
        setTempsrc(sourceLanguage);
        setTemptar(targetLanguage);
        setTempsrclab(sourceLabel);
    }, [translateWritterSwitch]);

    useEffect(() => {
        if (location.state?.aiWritingCateg) {
            if (isNaN(parseInt(location.state?.aiWritingCateg))) {
                setRightSideBar(true);
                setTimeout(() => {
                    if (document.querySelector(`#customize-${location.state?.aiWritingCateg}`)) {
                        document.querySelector(`#customize-${location.state?.aiWritingCateg}`)?.style.setProperty('animation', 'highlight 8s');
                        setTimeout(() => {
                            document.querySelector(`#customize-${location.state?.aiWritingCateg}`)?.style.setProperty('animation', '');
                        }, 10000);
                    }
                }, 1500);
            } else if (window.innerWidth <= 1300) {
                setRightSideBar(false);
            }
        } else if (window.innerWidth <= 1300) {
            setRightSideBar(false);
        }
    }, [window.innerWidth, location.state]);

    useEffect(() => {
        if (window.getSelection() && document?.querySelector(".note-editable.card-block")) {
            if (document?.querySelector(".note-editable.card-block")) {
                document?.querySelector(".note-editable.card-block").addEventListener('mouseup', () => { detectSourceLanguage(window.getSelection()?.toString().trim()) });
                return () => { document?.querySelector(".note-editable.card-block")?.removeEventListener('mouseup', () => { detectSourceLanguage(window.getSelection()?.toString().trim()) }); }
            }
        }
    }, []);

    // change the z-index of the spl character modal when lang modal is opened
    useEffect(() => {
        let splCharModal = document.querySelector('.writer-spl-char-modal');
        if(splCharModal){
            if(showSrcLangModal){
                splCharModal.style.zIndex = 0;
            }else{
                splCharModal.style.zIndex = 11;
            }
        }
    }, [showSrcLangModal]);

    // change the selectedMtEngine state when the default settings is changed
    useEffect(() => {
        if(defaultSettings?.mt_engine !== null){
            setSelectedMTEngine(defaultSettings?.mt_engine);
        }
    }, [defaultSettings?.mt_engine]);
      
    useEffect(() => {
        if(targetDiv !== null && targetDiv !== undefined){
            if (targetDiv) {
                targetDiv.addEventListener("selectstart", handleAddWorkingAreaListener);
                targetDiv.addEventListener("blur", handleRemoveWorkingAreaListener);                
                document.addEventListener('mouseup', handleSelectionListener);                
                return () => {
                    targetDiv.removeEventListener("selectstart", handleAddWorkingAreaListener);
                    targetDiv.removeEventListener("blur", handleRemoveWorkingAreaListener);  
                    document.removeEventListener("mouseup", handleSelectionListener);
                }
            }
        }
    }, [targetDiv]);
        
    const handleAddWorkingAreaListener = () => {
        document.addEventListener("selectionchange", logSelection);
    } 

    const handleRemoveWorkingAreaListener = () => {
        document.removeEventListener("selectionchange", logSelection);
    } 

    const logSelection = (e) => {
        setSelectionString(document.getSelection().toString());
    }

    const handleClearSelection = (e) => {
        setTimeout(() => {
            let sel = window.getSelection();
            let isSelectedInsideEditor = sel?.anchorNode?.parentElement?.closest('.note-editable') ? true : false;
            if(window.getSelection()?.toString()?.trim()?.length === 0 || !isSelectedInsideEditor) {
                setSelectionString('');
            }
        }, 80);
    }

    const handleSelectionListener = (e) => {
        let workingArea = e?.target?.closest('.note-editable') === null ? false : true;
        let toolbar = e?.target?.closest('.note-toolbar') === null ? false : true;
        let customizationPanel = e?.target?.closest('.customization-panel') === null ? false : true;        
        if(!workingArea && !toolbar && !customizationPanel){
            handleClearSelection(e);
        }
    } 

    const getSavedCustomSettings = () => {
        Config.axios({
            url: `${Config.BASE_URL}/writer/custom_settings/`,
            method: "GET",
            auth: true,
            success: (response) => {
                if (response?.status === 200 && ((response.data?.src !== null && response.data?.tar !== null) || response.data?.id)) {
                    fromDefaultLang.current = true;
                    setSourceLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.src)?.language);
                    setSourceLanguage(response.data.src);
                    setTargetLabel(targetLanguageOptionsRef.current?.find(each => each.id === response.data.tar)?.language);
                    setTargetLanguage([targetLanguageOptionsRef.current?.find(each => each.id === response.data.tar)]);
                    setSelectedMTEngine(response.data.mt_engine);
                    dispatch(setDefaultSettings({
                        id: response.data?.id ? response.data?.id : null,
                        mt_engine: response.data.mt_engine,
                        newline: response.data?.new_line,
                        append: response.data?.append,
                        result_in_modal: true
                    }));
                } else {
                    setSourceLabel(t("search_source_language"));
                    setTargetLabel(t("search_target_language"));
                    setSourceLanguage("");
                    setTargetLanguage([]);
                }
            },
        })
    }

    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setError({ ...error, sourceLanguage: "" });
        setSearchInput('');
        setOnFocusWrap(false);
        summerNoteEditorRef.current.summernote('restoreRange');
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, name, e) => {
        setTargetLanguage([value]);
        setshowTarLangModal(false);
        setTargetLabel(name);
        setError({ ...error, targetLanguage: "" });
        setSearchInput('');
        setOnFocusWrap(false);
        summerNoteEditorRef.current.summernote('restoreRange');
    };

    const getAllLangDetailsList = () => {
        let params = {
            url: Config.BASE_URL + "/app/mt-language-support/",
            auth: true,
            success: (response) => {
                allLangDetailsListRef.current = response.data;
                // setAllLangDetailsList(response.data);
            },
        };
        Config.axios(params);
    };

    /* Get language options list */
    const getLanguagesList = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setSourceLanguageOptions(response.data);
                setTargetLanguageOptions(response.data);
                getSavedCustomSettings();
            },
        };
        Config.axios(params);
    };

    const getMtEngines = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/mt_engines/`,
            auth: true,
            success: (response) => {
                mtEngineOptionRef.current = response?.data;
                setMtpeEngines(response?.data);
            },
        });
    };
   
    var toUtf8 = function (text) {
        var surrogate = encodeURIComponent(text);
        var result = '';
        for (var i = 0; i < surrogate.length;) {
            var character = surrogate[i];
            i += 1;
            if (character == '%') {
                var hex = surrogate.substring(i, i += 2);
                if (hex) {
                    result += String.fromCharCode(parseInt(hex, 16));
                }
            } else {
                result += character;
            }
        }
        return result;
    };

    function getSentencesContainingWords(paragraph, selectedWordsString) {
        // Split the selected words string into an array of individual words
        var selectedWords = selectedWordsString.split(" ");
        // Split the paragraph into sentences
        var sentences = paragraph.split(/[.!?]/);
        var resultSentences = [];
        // Loop through each sentence
        for (var i = 0; i < sentences.length; i++) {
            var sentence = sentences[i].trim();
            // Check if the sentence contains any of the selected words
            for (var j = 0; j < selectedWords.length; j++) {
                var selectedWord = selectedWords[j];
                // If the sentence contains the selected word, add it to the result
                if (sentence.toLowerCase().includes(selectedWord.toLowerCase())) {
                    resultSentences.push(sentence);
                    break; // Move to the next sentence
                }
            }
        }
        return resultSentences.length > 0 ? resultSentences : null;
    }

    const detectSourceLanguage = (text) => {
        if (window.getSelection().toString()) {
            if (text?.length >= 2 && text?.length < 5000) {
                let sel = window.getSelection().toString()?.slice(0, 150);
                if(sel?.split(' ')?.filter(each => each !== '')?.length < 6){
                    let sentence = getSentencesContainingWords(window.getSelection().anchorNode.textContent, window.getSelection()?.toString());
                    sel = sentence !== null ? sentence?.slice(0, 2) : sel;
                }

                Config.axios({
                    headers: header,
                    url: `${Config.BASE_URL}/auth/lang_detect/?text=${sel?.slice(0, 150)}`,
                    auth: true,
                    success: (response) => {
                        setSourceLanguageAsk(response.data?.lang_id);
                        let grammarCheckBtn = document.getElementById('customize-20');
                        if (grammarCheckBtn) {
                            if (response.data?.lang_id != 17) {
                                grammarCheckBtn.style.setProperty('opacity', '0.4');
                                grammarCheckBtn.style.setProperty('pointer-events', 'none');                            
                            } else {
                                if (((count(selectionString?.replace(/\n/g, ''))?.chars >= 5 * 4 && count(selectionString?.replace(/\n/g, ''))?.chars <= 500))) {
                                    grammarCheckBtn.style.setProperty('opacity', '1');
                                    grammarCheckBtn.style.setProperty('pointer-events', 'all');
                                }
                            }
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
            }
        }
    }

    const translatevalidation = (id, custom, catagory, src, tar, mtengin) => {
        if (sourceLanguage && targetLanguage && selectedMTEngine) {
            if (mtpeEngineOptions.length > 0 && !selectedMTEngine) {
                setTranslateWritterSwitch(true);
            }
            else if (mtpeEngineOptions.length > 0 && selectedMTEngine) {
                getAiCustomizationResult(id, custom, catagory, src, tar, mtengin);
            }
        }
        else {
            setTranslateWritterSwitch(true);
        }
    }

    const handleCopyPaste = (action) => {
        if(action === 'copy') document.execCommand("copy");
        if(action === 'cut') document.execCommand("cut");
        else document.execCommand("paste");
        // $('.summernote').summernote('createLink', {
        //     text: "This is the Summernote's Official Site",
        //     url: 'http://summernote.org',
        //     isNewWindow: true
        // });
    }

    // useEffect(() => {
    //     if(selectedMTEngine === undefined && sourceLanguage?.length !== 0 && targetLanguage?.length !== 0){
    //         setSelectedMTEngine(1);
    //     }
    // }, [selectedMTEngine, sourceLanguage, targetLanguage]);
    
    return (
        <React.Fragment>
            <div className={showGallery ? "prompt-bubble-header d-none" : "prompt-bubble-header"}>
                <div className="prompt-bubble-title" style={showPlaceHolderDivForBook ? {pointerEvents: 'none'} : {}}>
                    {t("content_builders")}
                    <Tooltip
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
                        title={t("settings")} placement="top" arrow
                    >
                        <span className="customize-settings-icon" style={{ marginLeft: '8px' }} onClick={() => dispatch(setShowCustomSettingsModal(true))} >
                            <SettingsOutlinedIcon style={{ fontSize: '19px' }} />
                        </span>
                    </Tooltip>
                    {/* <span onClick={() => handleCopyPaste('copy')}>Copy</span>
                    <span onClick={() => handleCopyPaste('paste')}>Paste</span>
                    <span onClick={() => handleCopyPaste('cut')}>Cut</span> */}
                </div>
                <div className="modal-close-btn" onClick={() => setRightSideBar(false)}>
                    <ArrowForwardIosIcon className="side-bar-arrow-ai-writter" />
                </div>
            </div>
            <div className={showGallery ? "prompt-bubble-header d-none" : "prompt-bubble-sugestion-wrapper"} style={showPlaceHolderDivForBook ? {pointerEvents: 'none'} : {}}>
                <div className="bubble-prompt-main-container">
                    {
                        aiCustomizationOptions?.map((item, index) => {
                            return (
                                <div key={index} className="category-group">
                                    <div>

                                    </div>
                                    <div className="side-bar-info-icon-wrap">
                                        <div className="cutomize-heading-inner-wrap-info">
                                            <p className="customization-options-category">{item.category}</p>
                                            <Tooltip
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
                                                title={(item.category === 'Edit' && t("select_between_20_to_500_char")) || ((item.category === 'Explore' || item.category == 'Refer') && t("select_between_4_to_50_char")) || (item.category === 'Convert' && t("select_60_char")) || (item.category === 'Change tone' && t("select_between_20_to_500_char"))} placement="top" arrow >
                                                <img
                                                    className="imp-icon-file"
                                                    src={ImpFileIcon}
                                                    alt="help"
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="prompt-bubble-container">
                                        <>
                                            {item?.values?.map(each => {
                                                return (
                                                    <button
                                                        key={each.id}
                                                        id={`customize-${item.category === 'Edit' ? each?.customize : each?.id}`}
                                                        className={"prompt-bubble " + ((item.category == 'Edit' && each.id == 24) ? "summerize-prompt-btn" : "")}
                                                        onClick={() => (each.id != 23 ? getAiCustomizationResult(each?.id, each?.customize, item.category, sourceLanguageAsk, targetLanguage) : translatevalidation(each?.id, each?.customize, item.category, sourceLanguage, targetLanguage, selectedMTEngine))}
                                                        // each.id === 24 - summerize option
                                                        disabled={(
                                                            (item.category == 'Edit' && each.id == 24) ? (!((count(selectionString?.replace(/\n/g, ''))?.chars >= 300 && count(selectionString?.replace(/\n/g, ''))?.chars <= 5000))) : (
                                                                (item.category == 'Edit' || item.category == 'Change tone') ? !((count(selectionString?.replace(/\n/g, ''))?.chars >= 5 * 4 && count(selectionString?.replace(/\n/g, ''))?.chars <= 500)) :
                                                                (item.category == 'Explore' || item.category == 'Refer') ? !(count(selectionString?.replace(/\n/g, ''))?.chars >= 1 * 4 && count(selectionString?.replace(/\n/g, ''))?.chars <= 50) : (item.category == 'Convert') && ((count(selectionString?.replace(/\n/g, ''))?.chars >= 15 * 4)) ? false : true
                                                            )
                                                        )}
                                                        style={
                                                            (
                                                                (item.category == 'Edit'  && each.id === 24) ? !((count(selectionString?.replace(/\n/g, ''))?.chars >= 300 && count(selectionString?.replace(/\n/g, ''))?.chars <= 5000)) :
                                                                (item.category == 'Edit' || item.category == 'Change tone') ? !((count(selectionString?.replace(/\n/g, ''))?.chars >= 5 * 4 && count(selectionString?.replace(/\n/g, ''))?.chars <= 500)) :
                                                                (item.category == 'Explore' || item.category == 'Refer') ? !(count(selectionString?.replace(/\n/g, ''))?.chars >= 1 * 4 && count(selectionString?.replace(/\n/g, ''))?.chars <= 50) : (item.category == 'Convert') && !((count(selectionString?.replace(/\n/g, ''))?.chars >= 15 * 4))
                                                            ) ? { opacity: '0.4', pointerEvents: 'none' } : { opacity: '1' }
                                                        }
                                                    >
                                                        {each?.customize}
                                                    </button>
                                                )
                                            })}
                                        </>
                                        {item.category === 'Refer' &&
                                            <>
                                                <div className="translate_customization_section_container" >
                                                    <p>{t("translate")}
                                                        <Tooltip
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
                                                            title={(item.category === 'Explore' && t("select_between_2_to_2000_char"))} placement="top" arrow
                                                        >
                                                            <img className="imp-icon-file" src={ImpFileIcon} alt="help" />
                                                        </Tooltip>
                                                    </p>

                                                    <div className="translate_customization"
                                                        style={(count(selectionString?.replace(/\n/g, ''))?.chars <= 2000 && count(selectionString?.replace(/\n/g, ''))?.chars > 1) ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0.5, pointerEvents: 'none' }}>
                                                        <div className="language-select-wrapper-cutomize-bar grid1">
                                                            <ButtonBase onClick={() => {
                                                                setshowSrcLangModal(true);
                                                                // sidebarTabControlHide();
                                                            }}>
                                                                <div className="ai-sl-tl-btn">
                                                                    <span className="text">{sourceLanguage ? targetLanguageOptionsRef.current?.find(each => each.id === sourceLanguage)?.language : t('source')}
                                                                        {/* <span className="asterik-symbol">*</span> */}
                                                                    </span>
                                                                    <span className="icon">
                                                                        <i className="fas fa-caret-down"></i>
                                                                    </span>
                                                                </div>
                                                            </ButtonBase>
                                                        </div>
                                                        <div className="language-select-wrapper-cutomize-bar grid2" >
                                                            <ButtonBase
                                                                onClick={() => {
                                                                    sourceLanguage &&
                                                                    setshowTarLangModal(true);
                                                                    // sidebarTabControlHide();
                                                                }}
                                                                style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                                            >
                                                                <div className="ai-sl-tl-btn">
                                                                    <span className="text">{targetLanguage?.length !== 0 ? targetLanguageOptionsRef.current?.find(eachlang => eachlang.id == targetLanguage[0]?.id)?.language : t('target')}
                                                                    </span>
                                                                    <span className="icon">
                                                                        <i className="fas fa-caret-down"></i>
                                                                    </span>
                                                                </div>
                                                            </ButtonBase>
                                                        </div>
                                                        {/* <div className="language-select-wrapper-cutomize-bar grid3" >
                                                            <UncontrolledDropdown style={{ opacity: targetLanguage.length > 0 ? 1 : 0.5, pointerEvents: targetLanguage.length > 0 ? '' : 'none', width: '100%' }}>
                                                                <DropdownToggle
                                                                    caret
                                                                    className="translate-writter-MT-dreopdown"
                                                                >
                                                                    {selectedMTEngine == 1 ? 'Google Translate' : selectedMTEngine == 2 ? 'Microsoft Translator' : selectedMTEngine == 3 ? 'Amazon Translate' : 'Select MT'}
                                                                </DropdownToggle>

                                                                <DropdownMenu className="mt-lang-selected-list ">
                                                                    {mtpeEngineOptions?.map((lang) => {
                                                                        return (
                                                                            <DropdownItem key={lang.value} style={{ display: toUtf8(window.getSelection()?.toString()).length > 5000 && lang?.value == 3 ? 'none' : 'block', backgroundColor: selectedMTEngine == lang?.value ? '#ededed' : selectedMTEngine == lang?.value ? '#ededed' : selectedMTEngine == lang?.value ? '#ededed' : '' }}
                                                                                onClick={(e) => {
                                                                                    setSelectedMTEngine(lang?.value)
                                                                                }} className={'ask-writter-lang-select ' + lang.label} id={lang?.value} value={lang?.value}>{lang.label}
                                                                            </DropdownItem>
                                                                        )
                                                                    })

                                                                    }

                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div> */}
                                                    </div>
                                                    <div className="language-select-wrapper-cutomize-bar translate-btn" style={{ opacity: sourceLanguage && targetLanguage && selectedMTEngine ? 1 : 0.5, pointerEvents: sourceLanguage && targetLanguage && selectedMTEngine ? 'all' : 'none' }}>
                                                        <button className='go-customization-lang-wrap'
                                                            style={(sourceLanguage && targetLanguage && selectedMTEngine && (count(selectionString?.replace(/\n/g, ''))?.chars <= 2000 && count(selectionString?.replace(/\n/g, ''))?.chars > 1)) ? { opacity: 1 } : { opacity: 0.5, pointerEvents: 'none' }}
                                                            disabled={(sourceLanguage && targetLanguage && selectedMTEngine && (count(selectionString?.replace(/\n/g, ''))?.chars <= 2000 && count(selectionString?.replace(/\n/g, ''))?.chars > 1)) ? false : true}
                                                            onClick={() => {
                                                                getAiCustomizationResult(23, 'Translate', 'Edit', sourceLanguage, targetLanguage, selectedMTEngine)
                                                                setTranslateWritterSwitch(false)
                                                            }}
                                                        >
                                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium writter-translate-icon css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TranslateIcon">
                                                                <path fill="#222222" d="m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z"></path>
                                                            </svg>
                                                            {t("translate")}
                                                        </button>
                                                    </div>
                                                </div>

                                            </>
                                        }
                                        {/* {item.category === 'Convert' && (
                                            <>
                                                <div className="side-bar-info-icon-wrap ai-customize-wrapper">
                                                    <div className="cutomize-heading-inner-wrap-info">
                                                        <p className="customization-options-category">{t("generate")}</p>
                                                        <Tooltip
                                                            className="tt"
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
                                                            title={<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${t("select_between_3_to_300_char")} <br/><span className="writter-tooltip-design-subhead" >(${t("consumes_70_credits_cost")})</span></span>`) }} />} placement="top" arrow >
                                                            <img
                                                                className="imp-icon-file"
                                                                src={
                                                                    Config.HOST_URL + "assets/images/new-ui-icons/imp-icon-file.svg"
                                                                }
                                                                alt="help"
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className="prompt-bubble-container">
                                                    <button
                                                        key="ai-image"
                                                        id={"ai_image"}
                                                        className="prompt-bubble"
                                                        onClick={() => (getAiGeneratedImage(1, `${t("turning_into_img")}...`, 1))}

                                                        disabled={(count(selectionString?.replace(/\n/g, ''))?.chars >= 3 && count(selectionString?.replace(/\n/g, ''))?.chars <= 300) ? false : true}
                                                        style={(count(selectionString?.replace(/\n/g, ''))?.chars >= 3 && count(selectionString?.replace(/\n/g, ''))?.chars <= 300) ? { opacity: '1' } : { opacity: '0.4', pointerEvents: 'none' }}
                                                    >
                                                        {t("ai_image")}

                                                    </button>
                                                </div>
                                            </>
                                        )} */}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div key={10} className="category-group">
                        <div>

                        </div>
                        <div className="side-bar-info-icon-wrap">
                            <div className="cutomize-heading-inner-wrap-info">
                                <p className="customization-options-category">Gallery</p>
                                <Tooltip
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
                                    title={'Assets from Ailaysa designer'} placement="top" arrow >
                                    <img className="imp-icon-file" src={ Config.HOST_URL + "assets/images/new-ui-icons/imp-icon-file.svg" } alt="help" />
                                </Tooltip>
                            </div>
                        </div>
                        <div className="prompt-bubble-container">
                                <>
                                    <button className="prompt-bubble" onClick={() => {setShowGallery(true);setSidebarType('Design')}} >
                                         My Designs
                                    </button>
                                    <button className="prompt-bubble" onClick={() => {setShowGallery(true);setSidebarType('Ai')}} >
                                        Ai Generated
                                    </button>
                                    <button className="prompt-bubble" onClick={() => {setShowGallery(true);setSidebarType('User')}} >
                                        Uploads
                                    </button>
                                </>

                        </div>
                        
                    </div> */}
                </div>
            </div>
            <div className={showGallery ? '' : 'd-none'}>
                <ImageGallery showDesigner={showDesigner} setShowDesigner={setShowDesigner} sidebarType={sidebarType} setOpen={setShowGallery} open={showGallery} click={onImageClick} />
            </div>
            <SimpleRodals
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                showSrcLangModal={showSrcLangModal}
                showTarLangModal={showTarLangModal}
                setshowSrcLangModal={setshowSrcLangModal}
                setshowTarLangModal={setshowTarLangModal}
                sourceLanguageOptions={sourceLanguageOptions}
                targetLanguageOptions={targetLanguageOptions}
                handleSourceLangClick={handleSourceLangClick}
                handleTargetLangClick={handleTargetLangClick}
                filteredResults={filteredResults}
                setFilteredResults={setFilteredResults}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onFocusWrap={onFocusWrap}
                setOnFocusWrap={setOnFocusWrap}
                searchAreaRef={searchAreaRef}
                summerNoteEditorRef={summerNoteEditorRef}
            />
        </React.Fragment>

    )
}

export default CustomizationPanel;