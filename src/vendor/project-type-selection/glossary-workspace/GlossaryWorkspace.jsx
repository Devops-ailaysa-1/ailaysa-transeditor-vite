/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {useLocation } from "react-router-dom";
import Config from "../../Config";
import Navbar from "../../Navbar";
import { Collapse } from "reactstrap";
import Checkbox from '@mui/material/Checkbox';
import Select, { components } from "react-select";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AnimatePresence, motion } from "framer-motion";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ButtonBase from '@mui/material/ButtonBase';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import Tooltip from '@mui/material/Tooltip';

import CloseIcon from '@mui/icons-material/Close';
// import FadeInRight from "../../../animation-styles/FadeInRightSuggestion";
import FadeInLeft from "../../../animation-styles/FadeInLeftSuggestion";
import FadeInRightModal from "../../../animation-styles/FadeInRight";
import FadeInLeftModal from "../../../animation-styles/FadeInLeft";
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import Cookies from "js-cookie";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios";
import { useTranslation } from "react-i18next";
import ConfirmIcon from "../../../assets/images/new-ui-icons/confirm-icon.svg"
import TermDeleteIcon from "../../../assets/images/new-ui-icons/term_delete_icon.svg"
import WikitionaryIcon from "../../../assets/images/glossary-workspace/wiktionary.png"
import WikipediaIcon from "../../../assets/images/glossary-workspace/wikipedia.svg"
import TranslateBlack from "../../../assets/images/glossary-workspace/translate_black.svg"
import NoInfoAddedIcon from "../../../assets/images/no-info-added-icon.svg"
import NoTermsFoundIcon from "../../../assets/images/no-terms-found.svg"
import NoTermsFoundIconTwo from "../../../assets/images/no-editors-found-2.svg"
import ShowSuggestIcon from "../../../assets/images/new-ui-icons/show-suggest.svg"
import HideSuggestIcon from "../../../assets/images/new-ui-icons/show-suggest.svg"
import SearchBarClose from "../../../assets/images/assign-page/search-bar-close.svg"
import ChatSearch from "../../../assets/images/chat/chat-search.svg"
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from "../../../features/FileDownloadingListSlice";
import { useDispatch } from "react-redux";

function GlossaryWorkspace(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [searchBox, setSearchBox] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [advSearchBox, setAdvSearchBox] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [glexTerms, setGlexTerms] = useState([]);
    const [suggestAreaBox, setSuggestAreaBox] = useState(false);
    const [addNewTermModal, setAddNewTermModal] = useState(false);
    const [termCreateTabs, setTermCreateTabs] = useState(1);
    const [termAdvBox, setTermAdvBox] = useState({
        note: false,
        context: false,
        sl_definition: false,
        tl_definition: false,
        src_sl_term: false,
        src_tl_term: false
    })
    const [editTermForm, setEditTermForm] = useState(false);
    const [termSuggestionTabs, setTermSuggestionTabs] = useState(2);
    const [termdownload, setTermDownload] = useState(true)

    const [selectedItem, setSelectedItem] = useState(null);
    const [sourceLanguageTerm, setSourceLanguageTerm] = useState("");
    const [targetLanguageTerm, setTargetLanguageTerm] = useState("");
    const [sourceLanguageDefinition, setSourceLanguageDefinition] = useState("");
    const [targetLanguageDefinition, setTargetLanguageDefinition] = useState("");
    const [termNote, setTermNote] = useState("");
    const [termContext, setTermContext] = useState("");
    const [sourceOfSourceLanguageTerm, setSourceOfSourceLanguageTerm] = useState("");
    const [sourceOfTargetLanguageTerm, setSourceOfTargetLanguageTerm] = useState("");
    const [geographyUsage, setGeographyUsage] = useState("");
    const [termLocation, setTermLocation] = useState("");
    const [glossaryWorkspaceListLoading, setGlossaryWorkspaceListLoading] = useState(false)
    const [creditsPromptClose, setCreditsPromptClose] = useState()

    const [selectedPOS, setSelectedPOS] = useState(null);
    const [selectedTermType, setSelectedTermType] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedUsageStatus, setSelectedUsageStatus] = useState(null);
    const [error, setError] = useState({ slError: "" });
    const [wikipediaData, setWikipediaData] = useState(null)
    const [wiktionaryData, setWiktionaryData] = useState(null)
    const [orderByToggle, setOrderByToggle] = useState(true)
    const [orderBySrcToggle, setOrderBySrcToggle] = useState(null)
    const [orderByTarToggle, setOrderByTarToggle] = useState(null)
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)
    const [termToDeleteId, setTermToDeleteId] = useState(null)
    const [termtoDelete, setTermtoDelete] = useState(null)
    const [checkedTerms, setCheckedTerms] = useState([])
    const [languagePairObject, setLanguagePairObject] = useState(null)
    const [termDataFromApi, setTermDataFromApi] = useState(null)
    const [mtSuggestion, setMtSuggestion] = useState(null)
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)
    const [isTbxDownloading, setisTbxDownloading] = useState(false)

    // states for term pagination
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [lastList, setLastList] = useState(false);
    const [totalPages, setTotalPages] = useState(0)



    const projectId = useRef(null);
    const documentId = useRef(null);
    const sourceLangRef = useRef(null)
    const targetLangRef = useRef(null)
    const srcSortUp = useRef(null)
    const srcSortDown = useRef(null)
    const tarSortUp = useRef(null)
    const tarSortDown = useRef(null)
    const searchTermCloseOutside = useRef();
    const searchTermRef = useRef(null);
    const prevPageInfo = useRef(null)
    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)

    const prevPathRef = useRef(null)
    const scrollingDivRef = useRef(null)    // scrolling pagination div 
    const lastPageRef = useRef(null)
    const orderByRef = useRef(null)

    const location = useLocation();

    const modaloption = {
        closeMaskOnClick: false,
        height:'auto'
    };

    useEffect(() => {
        if (typeof Cookies.get("isCreditPromptSeen") == "undefined"){
            setCreditsPromptClose(true)
        }
    }, []);


    const handleCloseCreditsPrompt = () => {
         Cookies.set("isCreditPromptSeen", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
         setCreditsPromptClose(false)
    } 
    
    const collapseToggle = () => setIsOpen(!isOpen);

    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
            // fontSize: "12px",
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

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setSearchBox(false);
            }
        };

        document.addEventListener("mousedown", handleSearchTermClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });


    const termTypeOptions = [
        { value: "fullForm", label: t("term_type_full_form") },
        { value: "acronym", label: t("term_type_acronym") },
        { value: "abbreviation", label: t("term_type_abbreviation") },
        { value: "shortForm", label: t("term_type_shortForm") },
        { value: "varient", label: t("term_type_varient") },
        { value: "phrase", label: t("term_type_phrase") },
    ];

    const genderOptions = [
        { value: 1, label: t("gender_male") },
        { value: 2, label: t("gender_female") },
        { value: 3, label: t("gender_neutral") },
        { value: 4, label: t("gender_other") },
    ];

    const usageStatusOptions = [
        { value: "preferred", label: t("usageStatus_preferred") },
        { value: "admitted", label: t("usageStatus_admitted") },
        { value: "notRecommended", label: t("usageStatus_notRecommended") },
        { value: "obsolete", label: t("usageStatus_obsolete") },
    ];

    const partOfSpeechOptions = [
        { value: 1, label: t("partsSpeech_verb") },
        { value: 2, label: t("partsSpeech_noun") },
        { value: 3, label: t("partsSpeech_adjective") },
        { value: 4, label: t("partsSpeech_adverb") },
        { value: 5, label: t("partsSpeech_pronoun") },
        { value: 6, label: t("partsSpeech_other") },
        { value: "",label: t("partsSpeech_none") }
    ];


    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down-new"></span>
            </components.DropdownIndicator>
        );
    };


    useEffect(() => {
      if(URL_SEARCH_PARAMS.get("document-id") !== null){
        documentId.current = URL_SEARCH_PARAMS.get("document-id")
        getGlexTerms();
      }
    }, [URL_SEARCH_PARAMS.get("document-id")])
    

    useEffect(() => {
        if(location.state?.prevPath){
            prevPathRef.current = location.state.prevPath
        }
    }, [location.state])

    const handleTermType = (selected) => {
        setSelectedTermType(selected);
    };

    const handleGenderOptions = (selected) => {
        setSelectedGender(selected);
    };

    const handleUsageOptions = (selected) => {
        setSelectedUsageStatus(selected);
    };

    const handlepartOfSpeechOptions = (selected) => {
        setSelectedPOS(selected);
    };
    

    const getGlexTerms = (value = 0) => {
        setGlossaryWorkspaceListLoading(true)
        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/?task=${documentId.current}&page=1`,
            method: "GET",
            auth: true,
            success: (response) => {
                setGlossaryWorkspaceListLoading(false)
                setTotalPages(Math.ceil(response?.data.count / 20))
                setGlexTerms(response?.data?.results);
                setLanguagePairObject(response?.data.additional_info[0])
                setCurrPage(1)
            },
        });
        // if (value !== 0) setSelectedItem(value);
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



    const handleShowSuggestTerms = (item) => {
        setSuggestAreaBox(true)
        // setTermSuggestionTabs(2)
        getWikipedia(item?.sl_term)
        getWiktionary(item?.sl_term)
        setSelectedItem(item?.id);
        setSourceLanguageTerm(item?.sl_term ? item?.sl_term : "");
        setTargetLanguageTerm(item?.tl_term ? item?.tl_term : "");
        setSelectedPOS(partOfSpeechOptions?.find((pos) => pos.label === item.pos) !== undefined ? partOfSpeechOptions?.find((pos) => pos.label === item.pos) : null);
        setTermNote(item?.note ? item?.note : "");
        setTermContext(item?.context ? item?.context : "");
        setSourceOfSourceLanguageTerm(item?.sl_source ? item?.sl_source : "");
        setSourceOfTargetLanguageTerm(item?.tl_source ? item?.tl_source : "");
        setSourceLanguageDefinition(item?.sl_definition ? item?.sl_definition : "");
        setTargetLanguageDefinition(item?.tl_definition ? item?.tl_definition : "");
        setSelectedTermType(termTypeOptions?.find((type) => type.value === item.termtype) !== undefined ? termTypeOptions?.find((type) => type.value === item.termtype) : null);
        setSelectedGender(genderOptions.find((gender) => gender.label === item.gender) !== undefined ? genderOptions.find((gender) => gender.label === item.gender) : null);
        setSelectedUsageStatus(usageStatusOptions.find((us) => us.value === item.usage_status) !== undefined ? usageStatusOptions.find((us) => us.value === item.usage_status) : null);
        setGeographyUsage(item?.geographical_usage ? item?.geographical_usage : "");
        setTermLocation(item?.term_location ? item?.term_location : "");
    }

    const handleEachGlossaryTerms = (e, item) => {
        setTermDataFromApi({
            note: item?.note,
            context: item?.context,
            slTerm: item?.sl_term,
            tlTerm: item?.tl_term,
            slDefination: item?.sl_definition,
            tlDefination: item?.tl_definition,
            sourceSl: item?.sl_source,
            sourceTl: item?.tl_source,
            termType: termTypeOptions?.find((type) => type.value === item.termtype),
            gender: genderOptions.find((gender) => gender.label === item.gender),
            usage: usageStatusOptions.find((us) => us.value === item.usage_status),
            geographyUsage: item?.geographical_usage,
            termLocation: item?.term_location 
        })
        setTermAdvBox({ 
            note: termNote !== "" ? true : false,
            context: termContext !== "" ? true : false,
            sl_definition: sourceLanguageDefinition !== "" ? true : false,
            tl_definition: targetLanguageDefinition !== "" ? true : false,
            src_sl_term: sourceOfSourceLanguageTerm !== "" ? true : false,
            src_tl_term: sourceOfTargetLanguageTerm !== "" ? true : false
        })
        e.stopPropagation();
        setAddNewTermModal(true);
        setEditTermForm(true);
        setTermCreateTabs(1)
        getWikipedia(item?.sl_term)
        getWiktionary(item?.sl_term)
        setSelectedItem(item?.id);
        setSourceLanguageTerm(item?.sl_term ? item?.sl_term : "");
        setTargetLanguageTerm(item?.tl_term ? item?.tl_term : "");
        setSelectedPOS(partOfSpeechOptions?.find((pos) => pos.label === item.pos) !== undefined ? partOfSpeechOptions?.find((pos) => pos.label === item.pos) : null);
        setTermNote(item?.note ? item?.note : "");
        setTermContext(item?.context ? item?.context : "");
        setSourceOfSourceLanguageTerm(item?.sl_source ? item?.sl_source : "");
        setSourceOfTargetLanguageTerm(item?.tl_source ? item?.tl_source : "");
        setSourceLanguageDefinition(item?.sl_definition ? item?.sl_definition : "");
        setTargetLanguageDefinition(item?.tl_definition ? item?.tl_definition : "");
        setSelectedTermType(termTypeOptions?.find((type) => type.value === item.termtype) !== undefined ? termTypeOptions?.find((type) => type.value === item.termtype) : null);
        setSelectedGender(genderOptions.find((gender) => gender.label === item.gender) !== undefined ? genderOptions.find((gender) => gender.label === item.gender) : null);
        setSelectedUsageStatus(usageStatusOptions.find((us) => us.value === item.usage_status) !== undefined ? usageStatusOptions.find((us) => us.value === item.usage_status) : null);
        setGeographyUsage(item?.geographical_usage ? item?.geographical_usage : "");
        setTermLocation(item?.term_location ? item?.term_location : "");
        setMtSuggestion(null)
    };


    // This function has to be encountered when add new button is added Modal
    const handleAddNewTermModal = (e) => {
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


    const deleteTerm = () => {

        let deleteTermIdsList = "";
        checkedTerms?.map((each, index) => {
            deleteTermIdsList += `${each}${index !== checkedTerms.length - 1 ? "," : ""}`;
        });

        let deleteUrl = ""
        if(deleteTermIdsList !== "" && termToDeleteId === null){
            deleteUrl = `${Config.BASE_URL}/glex/term_upload/0/?term_delete_ids=${deleteTermIdsList}`
        }else{
            deleteUrl = `${Config.BASE_URL}/glex/term_upload/0/?term_delete_ids=${termToDeleteId}`
        }


        Config.axios({
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
            },
            url: deleteUrl, 
            method: "DELETE",
            auth: true,
            success: (response) => {
                if(deleteTermIdsList !== "" && termToDeleteId === null){
                    Config.toast(`${checkedTerms.length} terms deleted.`);
                }else{
                    // Config.toast(`The term ${termtoDelete} deleted.`);
                    Config.toast(`${t("term_delete_success")}`);
                }
                setShowDeleteConfirmationModal(false)
                setTimeout(() => {
                    getGlexTerms();
                    clearAll(1);
                }, 80);
                setCheckedTerms([])
            },
        });
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
        setSelectedTermType(null);
        setSelectedGender(null);
        setSelectedUsageStatus(null);
        setGeographyUsage("");
        setTermLocation("");
        setWikipediaData(null)
        setWiktionaryData(null)
        setMtSuggestion(null)
    };

    const validateForm = () => {
        setError(!sourceLanguageTerm?.length ? { slError: t("required") } : { slError: "" });
        if (!sourceLanguageTerm?.length) return false;
        else return true;
    };

    const handleFormData = (formdata) => {
        if(sourceLanguageTerm !== termDataFromApi?.slTerm){
            formdata.append("sl_term", sourceLanguageTerm);
        }
        // if(targetLanguageTerm !== ""){
            formdata.append("tl_term", targetLanguageTerm);
        // }
        if(selectedPOS !== null){
            formdata.append("pos", selectedPOS?.label);
        }
        if(termNote !== termDataFromApi?.note){
            formdata.append("note", termNote);
        }
        if(termContext !== termDataFromApi?.context){
            formdata.append("context", termContext);
        }
        if(sourceLanguageDefinition !== termDataFromApi?.slDefination){
            formdata.append("sl_definition", sourceLanguageDefinition);
        }
        if(targetLanguageDefinition !== termDataFromApi?.tlDefination){
            formdata.append("tl_definition", targetLanguageDefinition);
        }
        if(sourceOfSourceLanguageTerm !== termDataFromApi?.sourceSl){
            formdata.append("sl_source", sourceOfSourceLanguageTerm);
        }
        if(sourceOfTargetLanguageTerm !== termDataFromApi?.sourceTl){
            formdata.append("tl_source", sourceOfTargetLanguageTerm);
        }
        if(selectedTermType?.value !== null){
            formdata.append("termtype", selectedTermType?.value);
        }
        if(selectedGender?.value !== null){
            formdata.append("gender", selectedGender?.label);
        }
        if(selectedUsageStatus?.value !== null){
            formdata.append("usage_status", selectedUsageStatus?.value);
        }
        if(geographyUsage !== termDataFromApi?.geographyUsage){
            formdata.append("geographical_usage", geographyUsage);
        }
        if(termLocation !== termDataFromApi?.location){
            formdata.append("term_location", termLocation);
        }
        formdata.append("task", documentId?.current);
        return formdata;
    };

    // useEffect(() => {
    // }, [geographyUsage])
    
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
                            Config.toast(t("src_of_sl_err_note"), 'warning');
                            setSourceOfSourceLanguageTerm('')
                            // return;
                        }
                        if(err.response.data?.tl_source){
                            Config.toast(t("src_of_tl_err_note"), 'warning');
                            setSourceOfTargetLanguageTerm('')
                            // return;
                        }
                        if(err.response.data?.note){
                            Config.toast(t("new_term_err_note_1"), 'warning');
                            // return;
                            setTermNote('')
                        }
                        if(err.response.data?.context){
                            Config.toast(t("new_term_err_note_2"), 'warning');
                            // return;
                            setTermContext('')
                        }
                        if(err.response.data?.sl_definition){
                            Config.toast(t("new_term_err_note_3"), 'warning');
                            // return;
                            setSourceLanguageDefinition('')
                        }
                        if(err.response.data?.tl_definition){
                            Config.toast(t("new_term_err_note_4"), 'warning');
                            // return;
                            setTargetLanguageDefinition('')
                        }
                        if(err.response.data?.geographical_usage){
                            Config.toast(t("new_term_err_note_5"), 'warning');
                            // return;
                            setGeographyUsage('')
                        }
                        if(err.response.data?.term_location){
                            Config.toast(t("new_term_err_note_6"), 'warning');
                            // return;
                            setTermLocation('')
                        }
                    }
                }
            });
            clearAll(1);
        }
    };


    const handleDownloadFile = async() => {
        try{
            // add in download list
            dispatch(addDownloadingFiles({ id: documentId.current, file_name: languagePairObject?.project_name, ext: '.tbx', status: 1 }))
            setisTbxDownloading(true)
            
            let url = `${Config.BASE_URL}/glex/tbx_write/${documentId.current}/`
            const response = await Config.downloadFileFromApi(url);
            
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: documentId.current, status: 2 }))

            Config.downloadFileInBrowser(response)
            
            setisTbxDownloading(false)

            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: documentId.current }))
            }, 8000);
            
        }catch(e) {
            console.error(e);
            Config.toast(t("no_terms_gloss"), 'warning');
            dispatch(deleteDownloadingFile({ id: documentId.current }));
            setisTbxDownloading(false);
        }
    }
    
    const getWikipedia = (term) => {
        if(term !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/get_wikipedia/?task_id=${documentId.current}&term=${term}&term_type=source`,
                method: "GET",
                auth: true,
                success: (response) => {
                    setWikipediaData(response.data.out);
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
                    setWiktionaryData(response.data.out);
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
                setTargetLanguageTerm(response.data.target_mt)
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

    const searchFunctionality = () => {
        setGlossaryWorkspaceListLoading(true)
        setSearchBox(false); 
        scrollingDivRef.current.scrollTop = 0
        setCheckedTerms([])
        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/?task=${documentId.current}&search=${searchTerm}`,
            method: "GET",
            auth: true,
            success: (response) => {
                setGlossaryWorkspaceListLoading(false)
                setTotalPages(Math.ceil(response?.data.count / 20))
                setGlexTerms(response?.data?.results);
                lastPageRef.current = 1
                setPrevPage(1)
                setCurrPage(1)
            },
        });
    } 


    useEffect(() => {
        if(glexTerms?.length === 0){
            setSuggestAreaBox(true)
        }else{
            setSuggestAreaBox(false)
        }
    }, [glexTerms?.length === 0])
   
    
    // problem here
    useEffect(() => {
        if(termNote !== ""){
            setTermAdvBox({...termAdvBox, 
                note: true,
            });
        }else if(termContext !== ""){
            setTermAdvBox({...termAdvBox, 
                context: true,
            });
        }else if(sourceLanguageDefinition !== ""){
            setTermAdvBox({...termAdvBox, 
                sl_definition: true,
            });
        }else if(targetLanguageDefinition !== ""){
            setTermAdvBox({...termAdvBox, 
                tl_definition: true,
            });
        }else if(sourceOfSourceLanguageTerm !== ""){
            setTermAdvBox({...termAdvBox, 
                src_sl_term: true,
            });
        }else if(sourceOfTargetLanguageTerm !== ""){
            setTermAdvBox({...termAdvBox, 
                src_tl_term: true,
            });
        }else{
            setTermAdvBox({...termAdvBox, 
                note: false,
                context: false,
                sl_definition: false,
                tl_definition: false,
                src_sl_term: false,
                src_tl_term: false
            });
        }

    }, [termNote, termContext, sourceLanguageDefinition, targetLanguageDefinition, sourceOfSourceLanguageTerm, sourceOfTargetLanguageTerm]);
    
    // const CustomCellCheckbox = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         "&:hover": {
    //             backgroundColor: "#EBEBEB",
    //             color: "#5F6368",
    //         },
    //         "&$checked": {
    //             color: "#0078D4",
    //             "&:hover": {
    //                 backgroundColor: "#E5F1FB",
    //             },
    //         },
    //     },
    //     checked: {},
    // })(Checkbox);
    
    useEffect(() => {
        if(orderBySrcToggle !== null){
            // reset target up nad down arrow class
            tarSortUp.current.classList.remove("arrow-up-active")
            tarSortDown.current.classList.remove("arrow-down-active")
            tarSortUp.current.classList.add("arrow-up-inactive")
            tarSortDown.current.classList.add("arrow-down-inactive")

            orderByFunctionality('sl_term')
        }
    }, [orderBySrcToggle])
    
    useEffect(() => {
        if(orderByTarToggle !== null){
            // reset source up nad down arrow class
            srcSortUp.current.classList.remove("arrow-up-active")
            srcSortDown.current.classList.remove("arrow-down-active")
            srcSortUp.current.classList.add("arrow-up-inactive")
            srcSortDown.current.classList.add("arrow-down-inactive")
            orderByFunctionality('tl_term')
        }
    }, [orderByTarToggle])
    
    const orderByFunctionality = (orderType) => {
        orderByRef.current = orderType
        scrollingDivRef.current.scrollTop = 0
        setCheckedTerms([])
        Config.axios({
            url: `${Config.BASE_URL}/glex/term_upload/?task=${documentId.current}&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) 
                ? `${orderType}` : `-${orderType}`}`,
            method: "GET",
            auth: true,
            success: (response) => {
                setTotalPages(Math.ceil(response?.data.count / 20))
                setGlexTerms(response?.data?.results);
                lastPageRef.current = 1
                setPrevPage(1)
                setCurrPage(1)
                if(orderBySrcToggle){
                    srcSortUp.current.classList.remove("arrow-up-inactive")
                    srcSortUp.current.classList.add("arrow-up-active")
                    srcSortDown.current.classList.remove("arrow-down-active")
                    srcSortDown.current.classList.add("arrow-down-inactive")
                }
                if(orderBySrcToggle === false){
                    srcSortUp.current.classList.remove("arrow-up-active")
                    srcSortUp.current.classList.add("arrow-up-inactive")
                    srcSortDown.current.classList.remove("arrow-down-inactive")
                    srcSortDown.current.classList.add("arrow-down-active")
                }
                if(orderByTarToggle){
                    tarSortUp.current.classList.remove("arrow-up-inactive")
                    tarSortUp.current.classList.add("arrow-up-active")
                    tarSortDown.current.classList.remove("arrow-down-active")
                    tarSortDown.current.classList.add("arrow-down-inactive")
                }
                if(orderByTarToggle === false){
                    tarSortUp.current.classList.remove("arrow-up-active")
                    tarSortUp.current.classList.add("arrow-up-inactive")
                    tarSortDown.current.classList.remove("arrow-down-inactive")
                    tarSortDown.current.classList.add("arrow-down-active")
                }
            },
        });
    }

    const handleDeleteTermBtn = (termId, termName) => {
        setTermToDeleteId(termId)
        setTermtoDelete(termName)
        setShowDeleteConfirmationModal(true)
    } 

    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false)

    const handleSelectAllTerms = (e) => {
        if(e.target.checked){
            let allTermList = [];
            glexTerms?.map(each => allTermList.push(each?.id));
            setCheckedTerms(allTermList);
            setSelectAllCheckbox(true);
        }else if(e.target.checked === false){
            setCheckedTerms([]);
            setSelectAllCheckbox(false);
        }
    } 

    const handleGlossaryTermSelect = (event, termIDs) => {
        if(event.target.checked){
            setCheckedTerms([...checkedTerms, termIDs]);       
        }else if(event.target.checked === false){
            let newCheckedTerms = checkedTerms.filter(id => id !== termIDs)
            setCheckedTerms(newCheckedTerms);
        }
    } 

    useEffect(() => {
        if(checkedTerms?.length === glexTerms?.length){
            setSelectAllCheckbox(true);
        }else{
            setSelectAllCheckbox(false);
        }
    }, [checkedTerms, glexTerms]);    

    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && searchTerm == ""){
            setSearchBox(false);
            e.target.blur() 
        }else if(e.which === 13){
            searchTermRef.current = searchTerm
            searchFunctionality();
            setSearchBox(false);
            e.target.blur();
        }
    }
    
    useEffect(() => {
        if(searchTerm == "" && isSearchTermDelete) {
            getGlexTerms();
            searchTermRef.current = null;
            setIsSearchTermDelete(false);
        }
    }, [searchTerm, isSearchTermDelete]);

    const handleCloseSearchBox = () => {
        setSearchTerm("");
        setSearchBox(false);
        setIsSearchTermDelete(true);
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
    
    useEffect(() => {
        const fetchData = async () => {
            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );
            let token = userCacheData != null ? userCacheData?.token : "";
            const response = await axios.get(
                `${Config.BASE_URL}/glex/term_upload/?task=${documentId.current}&page=${currPage}${searchTerm !== '' ? `&search=${searchTerm}` : ''}${(orderBySrcToggle !== null || orderByTarToggle !== null) ?  `&ordering=${(orderBySrcToggle !== null ? orderBySrcToggle : orderByTarToggle) ? `${orderByRef.current}` : `-${orderByRef.current}`}` : ''}`,
                {
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            lastPageRef.current = currPage
            setPrevPage(currPage);
            setGlexTerms([...glexTerms, ...response?.data?.results]);
        };
        if (currPage <= totalPages && prevPage !== currPage && lastPageRef.current !== currPage) {
          fetchData();
        }
    }, [currPage]);

    return (
        <React.Fragment>
            <Navbar 
                isWhite={true} 
                isGlossary={true} 
                glossaryProjectName={projectName} 
                languagePairObject={languagePairObject} 
                termdownload={termdownload} 
                handleDownloadFile={handleDownloadFile}
                prevPathRef={prevPathRef}
                isTbxDownloading={isTbxDownloading}/>
            <section className="padding-correction">
                <div className="glossary-workspace-wrapper">
                    <div className="glossary-workspace-container">
                        <div className="glossary-workspace-header header-align pb-3">
                            <div className="glossary-header-sub-container">
                                <p className="section-header">{t("terms_list")}</p>
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
                                            // onBlur={(e) => {
                                            //     setSearchBox(false); 
                                            // }}
                                        />
                                        <span
                                            className={"close " + ((searchBox || searchTerm !== "") ? "show" : "")}
                                            onClick={() => handleCloseSearchBox()}
                                        >
                                            <img src={SearchBarClose} alt="search-bar-close" />
                                        </span>
                                    </div>
                                    <div ref={searchTermCloseOutside} className={"search-results-bar " + (searchBox ? "show" : "hide")}>
                                        <div onClick={(e) => (searchTerm !== "" ? searchFunctionality(e) : "")} className={"search-results-item " + (searchTerm !== "" ? " " : "cursor-change")}>
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
                            </div>
                            <div className="gl-workspace-wrap">
                                {checkedTerms.length !== 0 && <button className="delete-btn glossaryworkshop-DeleteTermButton" onClick={(e) => handleDeleteTermBtn(null, checkedTerms?.length?.toString())}>
                                    <span className="add-new-term-btn-txt-1">
                                        <DeleteOutlineIcon className="plus-icon"/>
                                        <span>{t("delete_terms")}</span>
                                    </span>
                                </button>}
                                <button className="glossaryworkshop-AddTermButton" onClick={(e) => {handleAddNewTermModal(e); setSuggestAreaBox(false)}}>
                                    <span className="add-new-term-btn-txt">
                                        <AddIcon className="plus-icon"/>
                                        <span>{t("add_a_term")}</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="glossary-workspace-area-list-wrapper">
                            <div className="glossary-workspace-header-title">
                                <div className="glossary-workspace-header-col">
                                    <div className={"glossary-tit-header-wrap " + (!suggestAreaBox && "suggest-header")}>
                                        <div className="title">
                                            <Checkbox
                                                // disabled={(index === 0 && stepOne === 1) || (index === 1 && stepTwo === 2)}
                                                className={"cell-box"}
                                                size="small"
                                                onChange={(e) => handleSelectAllTerms(e)}
                                                checked={selectAllCheckbox}
                                                // checked={isCheckBoxChecked}
                                            />
                                            <div className="d-flex align-items-center" style={{cursor:'pointer'}} onClick={() => {setOrderBySrcToggle(!orderBySrcToggle); setOrderByTarToggle(null)}}>
                                                <p>{t("source_language_term")}</p>
                                                <div className="sorting-container">
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
                                        </div>
                                        <div className="title d-flex align-items-center">
                                            <div className="d-flex align-items-center" style={{cursor:'pointer'}} onClick={() => {setOrderByTarToggle(!orderByTarToggle); setOrderBySrcToggle(null)}}>
                                                <p>{t("target_language_term")}</p>
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
                                    </div>
                                </div>
                                <div className={"glossary-workspace-toggle-col " + (!suggestAreaBox ? "glossary-workspace-toggle-col-sidebar-hide" : "")}>
                                    <ButtonBase className="suggest-hide-toggle" onClick={() => setSuggestAreaBox(!suggestAreaBox)}>
                                        <AnimatePresence>
                                            {
                                                !suggestAreaBox ? 
                                                <motion.img 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    src={HideSuggestIcon} 
                                                    alt="hide-suggest"
                                                />
                                                :
                                                <motion.img 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    src={ShowSuggestIcon} 
                                                    alt="show-suggest"
                                                />
                                            }
                                        </AnimatePresence>
                                        {/* <ArrowDropDownIcon className="arrow-icon"/> */}
                                    </ButtonBase>
                                </div>
                            </div>
                            <div className="gl-work-row">
                                <div className="gl-work-col-1">
                                    <div className="search-term-wrapper">
                                        <div className="glossary-term-list-wrapper" onScroll={handleOnScroll} ref={scrollingDivRef}>
                                            <ul className={glexTerms?.length === 0 ? "no-terms-list" : "term-list"}>
                                                { 
                                                    searchTermRef.current !== null && glexTerms?.length === 0 ? 
                                                    (
                                                        <div className="no-terms-added-wrapper">
                                                            <img src={NoTermsFoundIconTwo} alt="no-terms-found"/>
                                                            <h1>{t("term_not_found")}</h1>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        (glexTerms?.length !== 0 || !glossaryWorkspaceListLoading) ?
                                                        (
                                                            glexTerms?.length === 0 ?
                                                            <div className="no-terms-added-wrapper">
                                                                <img src={NoTermsFoundIcon} alt="no-terms-found"/>
                                                                <h1>{t("term_not_added_note")}</h1>
                                                            </div>
                                                            :
                                                            (    
                                                                glexTerms.map((item) => {
                                                                    return (
                                                                        <li
                                                                            key={item.id}
                                                                            className={selectedItem === item?.id ? "selected" : ""}
                                                                            onClick={() => handleShowSuggestTerms(item)}
                                                                        >
                                                                            <div className="avatar-name-wrap">
                                                                                <Checkbox
                                                                                    className={"cell-box"}
                                                                                    size="small"
                                                                                    checked={checkedTerms?.find(each => each === item?.id) ? true : false}
                                                                                    onChange={(e) => handleGlossaryTermSelect(e, item?.id)}
                                                                                />
                                                                                <span className="avatar">{item?.sl_term?.toUpperCase().charAt(0)}</span>
                                                                                <span className="name">{item.sl_term}</span>
                                                                            </div>
                                                                            <div className="tar-lang-name-wrap">
                                                                                <span className="name">{item.tl_term}</span>
                                                                                <div className="action-wrapper">
                                                                                    <div onClick={(e) => {handleEachGlossaryTerms(e, item); setSuggestAreaBox(false);}} className="term-list-del">
                                                                                        <EditOutlinedIcon className="delete-glossary-icon"/>
                                                                                    </div>
                                                                                    <div className="term-list-del" onClick={(e) => {e.stopPropagation(); handleDeleteTermBtn(item.id, item.sl_term)}}>
                                                                                        <DeleteOutlineIcon className="delete-glossary-icon"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                })
                                                            )
                                                        )
                                                        : 
                                                        (
                                                            Array(10).fill(null).map((index) => {
                                                                return(
                                                                    <>
                                                                        <div key={index} className="d-flex align-items-center mb-3 skeleton-padd" >
                                                                            <div className="source-term-align">
                                                                                <div className="d-flex align-items-center">
                                                                                    <Skeleton animation="wave" variant="rect" width={19} height={19} />
                                                                                    <Skeleton animation="wave" variant="circle" width={19} height={19} />
                                                                                    <Skeleton animation="wave" style={{ marginLeft: "0.4rem" }} variant="text" width={100} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="target-term-align">
                                                                                <div className="d-flex align-items-center">
                                                                                    <Skeleton animation="wave" variant="text" width={120} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        )
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={"gl-work-col-2 " + (suggestAreaBox ? "suggest-show" : "")}>
                                    {
                                        glexTerms?.length === 0 ?
                                        <div className="no-terms-added-wrapper">
                                        </div>
                                        :
                                        <div className="term-edit-suggestion-wrapper">
                                            <div className="term-edit-suggestion-header">
                                                {/* <ButtonBase className={"tab-link " + (termSuggestionTabs === 1 && "active")} onClick={(e) => setTermSuggestionTabs(1)}>Dictionary</ButtonBase> */}
                                                <p className="tab-link">Info</p>
                                            </div>
                                            <AnimatePresence>
                                                    <FadeInLeft>
                                                        {
                                                            (selectedPOS === null && termNote?.length === 0 && termContext?.length === 0 && sourceLanguageDefinition?.length === 0 && targetLanguageDefinition?.length === 0 && 
                                                            sourceOfSourceLanguageTerm?.length === 0 && sourceOfTargetLanguageTerm?.length === 0 && selectedTermType === null && selectedGender === null && selectedUsageStatus === null
                                                            && geographyUsage === "" && termLocation === "") ?
                                                            <>
                                                                <div className="no-info-added-wrapp">
                                                                    <img src={NoInfoAddedIcon} alt="no-info"/>
                                                                    <h2>{t("no_info_added")}</h2>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    selectedPOS !== null &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("parts_of_speech")}</p>
                                                                        <div className="text-content-box">{selectedPOS?.label}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    termNote?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("note")}</p>
                                                                        <div className="text-content-box">{termNote}</div>
                                                                    </div>
                                                                }


                                                                {
                                                                    termContext?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("context")}</p>
                                                                        <div className="text-content-box">{termContext}</div>
                                                                    </div>
                                                                }


                                                                {
                                                                    sourceLanguageDefinition?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("source_language_definition")}</p>
                                                                        <div className="text-content-box">{sourceLanguageDefinition}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    targetLanguageDefinition?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("target_language_definition")}</p>
                                                                        <div className="text-content-box">{targetLanguageDefinition}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    sourceOfSourceLanguageTerm?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("source_of_source_language_term")}</p>
                                                                        <div className="text-content-box">{sourceOfSourceLanguageTerm}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    sourceOfTargetLanguageTerm?.length !== 0 &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("source_of_target_language_term")}</p>
                                                                        <div className="text-content-box">{sourceOfTargetLanguageTerm}</div>
                                                                    </div>
                                                                }


                                                                {
                                                                   selectedTermType !== null &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("term_type")}</p>
                                                                        <div className="text-content-box font-weight-bold">{selectedTermType?.label}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    selectedGender !== null &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("gender")}</p>
                                                                        <div className="text-content-box font-weight-bold">{selectedGender?.label}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    selectedUsageStatus !== null &&       
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("usage_status")}</p>
                                                                        <div className="text-content-box font-weight-bold">{selectedUsageStatus?.label}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    geographyUsage !== "" &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("locale_usage")}</p>
                                                                        <div className="text-content-box font-weight-bold">{geographyUsage}</div>
                                                                    </div>
                                                                }

                                                                {
                                                                    termLocation !== "" &&
                                                                    <div className="term-textbox-textarea border-add">
                                                                        <p className="title">{t("term_location")}</p>
                                                                        <div className="text-content-box font-weight-bold">{termLocation}</div>
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                        
                                                    </FadeInLeft>
                                            </AnimatePresence>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
            </section>
            {addNewTermModal &&
            (<Rodal visible={addNewTermModal} {...modaloption} showCloseButton={false} className="add-edit-new-term-modal-wrapper">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>{editTermForm ? t("edit_term") : t("add_new_term")}</h1>
                        <span onClick={(e) => setAddNewTermModal(false)}><CloseIcon className="close-icon"/></span>
                    </div>
                    <div className="terms-add-list-area">
                        <ButtonBase className={"tab-item " + (termCreateTabs === 1 && "active")} onClick={(e) => setTermCreateTabs(1)}>
                            {t("basic")}
                        </ButtonBase>
                        <ButtonBase className={"tab-item " + (termCreateTabs === 2 && "active")} onClick={(e) => {validateForm() && setTermCreateTabs(2)}}>
                            {t("advanced")}
                        </ButtonBase>
                    </div>
                </div>
                <AnimatePresence>
                {
                    termCreateTabs === 1 &&
                    <FadeInRightModal>
                        <div className="term-edit-form">
                            <div className="term-edit-form-control">
                                <label htmlFor="src-term">{t("src_lang_terms")}</label>
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
                                <label htmlFor="tar-term">{t("tar_lang_terms")}</label>
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
                                                    <p>{t("credits_consumed_notes")}</p>
                                                </div>
                                            </span>
                                        }
                                    </div>
                                    <div className="get-mt-box">
                                        {
                                            creditsPromptClose &&
                                            <div className="mt-disclaimer">
                                                <span onClick={handleCloseCreditsPrompt} className="small-close">&#x2715;</span>
                                                <p>{t("credits_consumed_notes")}</p>
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
                                    isSearchable={false}
                                    classNamePrefix="steps-select"
                                    hideSelectedOptions={false}
                                    placeholder={t("select")}
                                    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                    onChange={handlepartOfSpeechOptions}
                                />
                            </div>
                        </div>
                    </FadeInRightModal>
                }
                {
                    termCreateTabs === 2 &&
                    <FadeInLeftModal>
                        <div className="advanced-section-form-row-block">
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    note: !termAdvBox?.note
                                })}>
                                    <AddIcon className="plus-icon"/> {t("note")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.note}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="note">Note</label> */}
                                        <textarea
                                            id="note"
                                            placeholder=""
                                            name="term-note"
                                            value={termNote}
                                            maxLength={900}
                                            onChange={(e) => setTermNote(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{termNote.length}/1000</small>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    context: !termAdvBox?.context
                                })}>
                                    <AddIcon className="plus-icon"/> {t("context")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.context}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="context">Context</label> */}
                                        <textarea
                                            id="context"
                                            placeholder=""
                                            name="context"
                                            value={termContext}
                                            maxLength={900}
                                            onChange={(e) => setTermContext(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{termContext.length}/1000</small>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="advanced-section-form-row-block">
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    sl_definition: !termAdvBox?.sl_definition
                                })}>
                                    <AddIcon className="plus-icon"/> {t("source_language_definition")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.sl_definition}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="sl-definition">Source language definition</label> */}
                                        <textarea
                                            id="sl-definition"
                                            placeholder=""
                                            name="sl-definition"
                                            value={sourceLanguageDefinition}
                                            maxLength={900}
                                            onChange={(e) => setSourceLanguageDefinition(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{sourceLanguageDefinition.length }/1000</small>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    tl_definition: !termAdvBox?.tl_definition
                                })}>
                                    <AddIcon className="plus-icon"/> {t("target_language_definition")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.tl_definition}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="tl-definition">Target language definition</label> */}
                                        <textarea
                                            id="tl-definition"
                                            placeholder=""
                                            name="tl-definition"
                                            value={targetLanguageDefinition}
                                            maxLength={900}
                                            onChange={(e) => setTargetLanguageDefinition(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{targetLanguageDefinition.length}/1000</small>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="advanced-section-form-row-block mb-4">
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    src_sl_term: !termAdvBox?.src_sl_term
                                })}>
                                    <AddIcon className="plus-icon"/>  {t("source_of_source_language_term")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.src_sl_term}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="src-of-sl-term">Source of source language term</label> */}
                                        <textarea
                                            id="src-of-sl-term"
                                            placeholder=""
                                            name="sl-term-source"
                                            value={sourceOfSourceLanguageTerm}
                                            maxLength={200}
                                            onChange={(e) => setSourceOfSourceLanguageTerm(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{sourceOfSourceLanguageTerm.length}/200</small>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="adv-sec-col">
                                <ButtonBase className="add-textarea" onClick={() => setTermAdvBox({...termAdvBox, 
                                    src_tl_term: !termAdvBox?.src_tl_term
                                })}>
                                    <AddIcon className="plus-icon"/> {t("source_of_target_language_term")}
                                </ButtonBase>
                                <Collapse isOpen={termAdvBox?.src_tl_term}>
                                    <div className="term-edit-form-control">
                                        {/* <label htmlFor="src-of-tl-term">Source of target language term</label> */}
                                        <textarea
                                            id="src-of-tl-term"
                                            placeholder=""
                                            name="tl-term-target"
                                            value={sourceOfTargetLanguageTerm}
                                            maxLength={200}
                                            onChange={(e) => setSourceOfTargetLanguageTerm(e.target.value)}
                                        ></textarea>
                                        <small className="glossary-text-limit">{sourceOfTargetLanguageTerm.length}/200</small>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="advanced-section-form-row flex-row">
                            <div className="adv-sec-col">
                                <div className="term-edit-form-control">
                                    {/* <label>Term type</label> */}
                                    <Select
                                        options={termTypeOptions}
                                        styles={customStepSelectStyles}
                                        hideSelectedOptions={false}
                                        value={selectedTermType}
                                        classNamePrefix="steps-select"
                                        placeholder={t("term_type")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleTermType}
                                    />
                                </div>
                            </div>
                            <div className="adv-sec-col">
                                <div className="term-edit-form-control">
                                    {/* <label>Gender</label> */}
                                    <Select
                                        options={genderOptions}
                                        styles={customStepSelectStyles}
                                        hideSelectedOptions={false}
                                        classNamePrefix="steps-select"
                                        value={selectedGender}
                                        placeholder={t("gender")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleGenderOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="advanced-section-form-row flex-row">
                            <div className="adv-sec-col">
                                <div className="term-edit-form-control">
                                    {/* <label>Usage status</label> */}
                                    <Select
                                        options={usageStatusOptions}
                                        styles={customStepSelectStyles}
                                        hideSelectedOptions={false}
                                        classNamePrefix="steps-select"
                                        value={selectedUsageStatus}
                                        placeholder={t("usage_status")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleUsageOptions}
                                    />
                                </div>
                            </div>
                            <div className="adv-sec-col">
                                <div className="term-edit-form-control">
                                    {/* <label>Locale usage</label> */}
                                    <input
                                        className="gl-worksp-input"
                                        type="text"
                                        id="tar-term"
                                        name="targetLanguageTerm"
                                        value={geographyUsage}
                                        placeholder={t("locale_usage")}
                                        maxLength={200}
                                        onChange={(e) => setGeographyUsage(e.target.value)}
                                    />
                                    <small className="glossary-text-limit">{geographyUsage.length}/200</small>
                                </div>
                            </div>
                        </div>
                        <div className="advanced-section-form-row">
                            <div className="adv-sec-col">
                                <div className="term-edit-form-control">
                                    {/* <label>Term location</label> */}
                                    <input
                                        className="gl-worksp-input"
                                        type="text"
                                        id="tar-term"
                                        name="term-location"
                                        value={termLocation}
                                        maxLength={200}
                                        placeholder={t("term_location")}
                                        onChange={(e) => setTermLocation(e.target.value)}
                                    />
                                    <small className="glossary-text-limit">{termLocation.length }/200</small>
                                </div>
                            </div>
                            <div className="adv-sec-col"></div>
                        </div>
                    </FadeInLeftModal>
                }
                </AnimatePresence>
                <div className="footer-area-wrapper">
                    <ButtonBase className="clear-all-button" style={editTermForm ? {opacity: 0, pointerEvents: 'none'} : {}} onClick={() => clearAll(1)}>
                        <img src={TermDeleteIcon} alt="term_delet_icon"/>
                        <span>{t("clear_all")}</span>
                    </ButtonBase>
                    <div className="term-edit-btn-row">
                        <button className="searchterm-ClearAllButton" onClick={() => {setAddNewTermModal(false); clearAll(1);}}>
                            <span className="gl-workspace-btn-txt-1">{t("cancel")}</span>
                        </button>
                        <button className="globalform-StepProcessButton" onClick={() => handleSaveButton()}>
                            <span className="gl-workspace-btn-txt-2">{editTermForm ? t("update") : t("save")}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}
            {showDeleteConfirmationModal &&
            (<Rodal
                visible={showDeleteConfirmationModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-wrapper">
                    <img
                        src={ConfirmIcon}
                        alt="confirm-icon"
                    />
                    {
                        termToDeleteId !== null ? 
                            <h2>{`${t("delete_the_term")} ${termtoDelete}?`}</h2> : 
                            // <h2>{termtoDelete} terms are selected <br/> Are you sure want to delete?</h2>   
                            <h2>{t("delete_term_alert_note")}</h2>   
                    }
                    <div className="button-row">
                        <button className="mydocument-AiMarkCancel" onClick={() => setShowDeleteConfirmationModal(false)}>
                        <span className="cancel-txt">{t("cancel")}</span>
                        </button>
                        <button className="mydocument-AiMarkSubmit" onClick={() => deleteTerm()}>
                        <span className="submit-txt">{t("delete")}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}
        </React.Fragment>
    );
}

export default GlossaryWorkspace;
