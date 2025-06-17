/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, createRef, useRef } from "react";
import Config from '../../../vendor/Config';
import ButtonBase from '@mui/material/ButtonBase';
// import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Select, { components } from "react-select";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Radio from '@mui/material/Radio';
import SearchIcon from '@mui/icons-material/Search';
import usePagination from "./SearchTermPagination";
import Pagination from '@mui/material/Pagination';
import Cookies from "js-cookie";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from "react-i18next";
import ChatSearch from "../../../assets/images/chat/chat-search.svg";
import SearchBarClose from "../../../assets/images/assign-page/search-bar-close.svg";
import NoEditorsFoundTwo from "../../../assets/images/no-editors-found-2.svg";
import NoSearchTermsFound from "../../../assets/images/no-search-terms-found.svg";
import ArrowRightColor from "../../../assets/images/new-ui-icons/arrow_right_alt_color.svg";
import WikipediaIcon from "../../../assets/images/glossary-workspace/wikipedia.svg";
import WikitionaryIcon from "../../../assets/images/glossary-workspace/wiktionary.png";
import TranslateBlack from "../../../assets/images/glossary-workspace/translate_black.svg";
import TermDeleteIcon from "../../../assets/images/new-ui-icons/term_delete_icon.svg";

const SearchTerms = (props) => {
    const { t } = useTranslation();
    const [glossaryTermSearchList, setGlossaryTermSearchList] = useState(false);
    const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
    const [glossaryListId, setGlossaryListId] = useState("");
    const [termFilterSelect, setTermFilterSelect] = useState("all_terms");
    const [scrollAddClass, setScrollAddClass] = useState(false);
    const [creditsPromptClose, setCreditsPromptClose] = useState()
    const [showSearchTermLoader, setShowSearchTermLoader] = useState(false);
    const [globalSearchResult, setGlobalSearchResult] = useState([])
    const [taskId, setTaskId] = useState(null);
    const [glossaryList, setGlossaryList] = useState([]);
    const [glossaryListOptions, setGlossaryListOptions] = useState([]);
    let [termPage, setTermPage] = useState(1);
    const [sortEl, setSortEl] = useState(null);
    const [selectedValue, setSelectedValue] = useState();

    const PER_PAGE = 20;    
    const open = Boolean(sortEl);

    const searchTermScroll = useRef();
    const searchTermCloseOutside = useRef();
    const searchTermRef = useRef(null);

    const count = Math.ceil(globalSearchResult.length / PER_PAGE);
    const TermData = usePagination(globalSearchResult, PER_PAGE);

    const handlePageChange = (e, p) => {
        setTermPage(p);
        TermData.jump(p);
        searchTermScroll.current.scrollTo(0,0);
    };
    
    useEffect(() => {
        if (typeof Cookies.get("isCreditPromptSeen") == "undefined"){
            setCreditsPromptClose(true);
        }
    }, []);

    const handleCloseCreditsPrompt = () => {
         Cookies.set("isCreditPromptSeen", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
         setCreditsPromptClose(false);
    }

    const handleWikipediaCopyText = () => {
        navigator.clipboard.writeText(wikipediaData?.target);
    }

    const handleWikitionaryCopyText = () => {
        navigator.clipboard.writeText(wiktionaryData?.target);
    }

    const handleMtSuggestionCopyText = (text) => {
        navigator.clipboard.writeText(mtSuggestion);
    }

    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (searchTermCloseOutside.current && !searchTermCloseOutside.current.contains(e.target)) {
                setGlossaryTermSearchList(false);
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

    const handleSelectedMenuItem = (e, index) => {
        setSelectedValue(index);
        setSortEl(null);
    };

    const handleDrpDownClose = () => {
        setSortEl(null);
    };

    useEffect(() => {
        listGlossaryProjects();
    }, []);

    useEffect(() => {
        if(glossaryListId != "") {
            globalGlossarySearchTerm();
        }
    }, [glossaryListId]);

    const listGlossaryProjects = () => {
        let url = `${Config.BASE_URL}/glex/glossaries_list/`;
        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                setGlossaryList(response.data);
            },
        });
    }

    const handleGlossaryProjChange = (selected) => {
        setGlossaryListId(selected);
    }
    
    // set glossary name list as stepOptions for select
    useEffect(() => {
        let glossaryListWrap = []
        glossaryListWrap.push({
            value: "all_glossaries",
            label: t("all_glossaries"),
        }); 
        glossaryList.map(each => {
            glossaryListWrap.push({
                value: each.glossary_id,
                label: each.glossary_name,
            }); 
        }); 
        setGlossaryListOptions(glossaryListWrap);
    }, [glossaryList]);

    const customProjectTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
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
            marginBottom: "0.2rem",
            padding: "3px 6px",
            color: "#292929",
            fontFamily: "Roboto",
            fontSize: "13px",
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
            backgroundColor: "#F1F3F4",
            borderRadius: 4,
            transtion: 0.3,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px 10px",
            minWidth: 370,
            width: "100%",
            height: 48,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

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

    const termFilter = [
        { value: 'all_terms', label: t("all_terms") },
        { value: 'source', label: t("src_lang_terms") },
        { value: 'target', label: t("tar_lang_terms") }
    ];

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const handleTermFilter = (selected) => {
        setTermFilterSelect(selected);
        searchTermScroll.current.scrollTo(0,0);
    };

    const orderByOptions = [
        { value: 'project_name', label: t("a_to_z") },
        { value: '-project_name', label: t("z_to_a") },
        { value: '-id', label: t("most_recent") },
        { value: 'id', label: t("least_recent") },
    ];

    useEffect(() => {
        if(glossarySearchTerm !== ""){
            globalGlossarySearchTerm();
        }
    }, [termFilterSelect]);

    const globalGlossarySearchTerm = () => {
        searchTermRef.current = glossarySearchTerm;
        setGlossaryTermSearchList(false);
        setShowSearchTermLoader(true);
        let url = `${Config.BASE_URL}/glex/whole_glossary_term_search/?term=${glossarySearchTerm}`;
        if(termFilterSelect !== 'all_terms' && termFilterSelect !== undefined) url += `&search_in=${termFilterSelect}`;
        if(glossaryListId?.value !== "all_glossaries" && glossaryListId?.value !== undefined) url += `&glossary_id=${glossaryListId?.value}`;

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                setTimeout(() => {
                    setGlobalSearchResult(response.data?.results);
                }, 350);
                setShowSearchTermLoader(false);
            }
        });
    } 

    // ======================================================================================
    const [addNewTermModal, setAddNewTermModal] = useState(false);
    const [editTermForm, setEditTermForm] = useState(false);
    const [termCreateTabs, setTermCreateTabs] = useState(1);
    const [wikipediaData, setWikipediaData] = useState(null);
    const [wiktionaryData, setWiktionaryData] = useState(null);
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
    });
    const [glexTerms, setGlexTerms] = useState([]);
    const [mtSuggestion, setMtSuggestion] = useState(null);

    const sourceLangRef = useRef(null);
    const targetLangRef = useRef(null);
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

    // useEffect(() => {
    //     if (documentId.current !== null) getGlexTerms();
    // }, [documentId.current]);

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
                        globalGlossarySearchTerm();
                    } 
                    setTimeout(() => {
                        // getGlexTerms(term === 1 ? response?.data?.id : 0);
                    }, 80);
                    setAddNewTermModal(false);
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
        height:'auto',
        closeMaskOnClick: false,
    };

    const getWikipedia = (term, taskID) => {
        if(term !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/get_wikipedia/?task_id=${taskID}&term=${term}&term_type=source`,
                method: "GET",
                auth: true,
                success: (response) => {
                    setWikipediaData(response.data.out);
                },
            });
        } 
    } 
    
    const getWiktionary = (term, taskID) => {
        if(term !== ''){
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/get_wiktionary/?task_id=${taskID}&term=${term}&term_type=source`,
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
                setTargetLanguageTerm(response.data?.target_mt);
                // setMtSuggestion(response.data?.target_mt);
                // setWiktionaryData(response.data.out);
            },
            error: (err) => {
                if(err.response.status === 424){
                    err.response.data?.res && Config.toast(t("insufficient_credit"), 'warning');
                }
            }
        });
    } 

    const handleEachGlossaryTerms = (e, searchItem) => {
        documentId.current = searchItem?.task_id;
        e.stopPropagation();
        setAddNewTermModal(true);
        setEditTermForm(true);
        setTaskId(searchItem?.task_id);
        getWikipedia(searchItem?.sl_term, searchItem?.task_id);
        getWiktionary(searchItem?.sl_term, searchItem?.task_id);
        setSelectedItem(searchItem?.term_id);
        setSourceLanguageTerm(searchItem?.sl_term ? searchItem?.sl_term : "");
        setTargetLanguageTerm(searchItem?.tl_term ? searchItem?.tl_term : "");
        setSelectedPOS(partOfSpeechOptions?.find((pos) => pos.label === searchItem.pos));
        setMtSuggestion(null);
    }

    const handleAddNewTermModal = (e, id) => {
        documentId.current = id;
        addNewTerm();
        setWikipediaData(null);
        setEditTermForm(false);
        setAddNewTermModal(true);
        setTermCreateTabs(1);
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
        setSelectedPOS({});
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
        setWikipediaData(null);
        setWiktionaryData(null);
        setMtSuggestion(null);
    };

    // ======================================================================================

    // const CustomCellRadiobtn = withStyles({
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
    // })(Radio);

    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && glossarySearchTerm == ""){
            setGlossaryTermSearchList(false);
            e.target.blur();
        }else if(e.which === 13){
            searchTermRef.current = glossarySearchTerm 
            if(searchTermRef.current === ""){
                setGlobalSearchResult([]);
                setGlossarySearchTerm("");
                setGlossaryListId("");
                searchTermRef.current = null;
            }else{
                globalGlossarySearchTerm();
                setGlossaryTermSearchList(false);
                e.target.blur();
            }
        }
    }

    const handleCloseSearchBox = () => {
        setGlossarySearchTerm("");
        setGlobalSearchResult([]);
        setGlossaryListId("")
        searchTermRef.current = null;
    }

    // useEffect(() => {
    //     if(glossarySearchTerm === ""){
    //         searchTermRef.current = null;
    //     }
    // },[glossarySearchTerm]);
    
    return (
        <React.Fragment>
            <section className="glossaries-list-wrapper">
                <div className="glossaries-search-bar">
                    <div className="header-align glossary-header glossary-search-header">
                        <div className="header-project-setup-align-wrap">
                            <p className="section-header">{t('search_terms')}</p>
                        </div>
                    </div>
                {/* <div className="terms-search-header">
                        {globalSearchResult?.length !== 0 && <p>Terms found <span>({globalSearchResult?.length})</span></p>}
                    </div> */}
                    <div className="glossary-search-term-glb-wrapper">
                        <div className="glossary-search-row">
                            <div className="glossary-search-inner-row">
                                <div className="glossary-search-wrapper">
                                    <div className={"project-list-search-box " + (glossaryTermSearchList ? "active " : "") + (glossarySearchTerm === "" && "project-list-search-box-small")}>
                                        {/* <div className="search-bar-row"> */}
                                            <div className="img-box">
                                                <img src={ChatSearch} alt="search-icon" />
                                            </div>
                                            <input 
                                                onClick={() => setGlossaryTermSearchList(true)}
                                                value={glossarySearchTerm}
                                                // autoFocus={glossarySearchTerm ? true : false}
                                                onChange={(e) => setGlossarySearchTerm(e.target.value)}
                                                type="search"
                                                placeholder={`${t('search')}....`}
                                                onKeyUp={(e) => SearchTermFilterEnter(e)}
                                                onFocus={() => setGlossaryTermSearchList(true)}
                                                // onBlur={(e) => {
                                                //     setGlossaryTermSearchList(false);
                                                // }}
                                            />
                                            <span className={"close " + ((glossaryTermSearchList || glossarySearchTerm !== "") ? "show" : "")}
                                                onClick={() => handleCloseSearchBox()}
                                            >
                                                <img src={SearchBarClose} alt="search-bar-close" />
                                            </span>
                                        {/* </div> */}
                                    </div>
                                    <div ref={searchTermCloseOutside} className={"search-results-bar " + (glossaryTermSearchList ? "show" : "hide") + (glossarySearchTerm === "" ? " search-suggestion-box-small" : "")}>
                                        <div onClick={(e)=>(glossarySearchTerm !== "" ? globalGlossarySearchTerm(e) : "")} className={"search-results-item " + (glossarySearchTerm !== "" ? " " : "cursor-change")}>
                                            <SearchIcon className="search-icon" />
                                            <div className="searched-results-info">
                                                <p className="searched-term">{glossarySearchTerm}</p>
                                                {
                                                    glossarySearchTerm !== "" ?
                                                    <p className="results-link">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                                    :
                                                    <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_glossary_2")}</span></p>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    glossarySearchTerm &&
                                    <Select  
                                        options={glossaryListOptions}
                                        isSearchable={false}
                                        styles={customProjectTypeSelectStyles}
                                        classNamePrefix="project-type-list"
                                        defaultValue={{value: 0, label: t("all_glossaries")}}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                        onChange={handleGlossaryProjChange}
                                    />
                                }

                            </div>
                            <div className="glossary-radio-btn-row">
                                <div className="glossary-radio-btn-input">
                                    <Radio
                                        checked={termFilterSelect === "all_terms"}
                                        className="cell-box-radio"
                                        size="small"
                                        id="all_terms"
                                        onChange={() => handleTermFilter("all_terms")}
                                    />
                                    <label htmlFor="all_terms" className={termFilterSelect === "all_terms" ? "add-active" : ""}>{t("entries_note_1")}</label>
                                </div>
                                <div className="glossary-radio-btn-input">
                                    <Radio
                                        checked={termFilterSelect === "source"}
                                        className="cell-box-radio"
                                        size="small"
                                        id="source"
                                        onChange={() => handleTermFilter("source")}
                                    />
                                    <label htmlFor="source" className={termFilterSelect === "source" ? "add-active" : ""}>{t("entries_note_2")}</label>
                                </div>
                                <div className="glossary-radio-btn-input">
                                    <Radio
                                        checked={termFilterSelect === "target"}
                                        className="cell-box-radio"
                                        size="small"
                                        id="target"
                                        onChange={() => handleTermFilter("target")}
                                    />
                                    <label htmlFor="target" className={termFilterSelect === "target" ? "add-active" : ""}>{t("entries_note_3")}</label>
                                </div>
                            </div>
                        </div>
                        <div className="terms-search-found-wrapper">
                            <div ref={searchTermScroll} className="terms-search-results-wrapper">
                                {
                                    TermData?.currentData()?.length === 0 ?
                                    (
                                        (searchTermRef.current !== null && glossarySearchTerm !== "" ) ?
                                        <div className="no-created-terms-found-wrapper">
                                            <img src={NoEditorsFoundTwo} alt="no-terms-found"/>
                                            <h1>{t("term_not_found")}</h1>
                                        </div>
                                        :
                                        <div className="no-created-terms-found-wrapper">
                                            <img src={NoSearchTermsFound} alt="no-terms-found"/>
                                            <h1>{t("search_for_terms")}</h1>
                                        </div>
                                    )
                                    :
                                    (
                                        !showSearchTermLoader ?
                                        (
                                            TermData?.currentData()?.map((searchItem) => {
                                                return(
                                                    <div key={searchItem.term_id} className="terms-search-result-item">
                                                        <div className="search-term-info">
                                                            <h4>{searchItem.glossary_name}</h4>
                                                            <div className="lang-pair">
                                                                <span>{searchItem.job?.split('->')[0]}</span>
                                                                <img src={ArrowRightColor} />
                                                                <span>{searchItem.job?.split('->')[1]}</span>
                                                            </div>
                                                        </div>
                                                        <div className="search-term-translate-info">
                                                            <div className="search-term-inner-translate">
                                                                <p className="target-translate-txt">{searchItem.sl_term} {searchItem.pos !== null && <span>({searchItem.pos})</span>} </p>
                                                                <p className="src-translate-txt">{searchItem.tl_term}</p>  
                                                            </div>
                                                            <div className="edit-icon-wrap">
                                                                <span onClick={(e) => {e.stopPropagation(); handleEachGlossaryTerms(e, searchItem);}} className="edit-icon-box">
                                                                    <EditOutlinedIcon className="edit-icon" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                        :
                                        (
                                            Array(7).fill(null).map((value, key) => {
                                                return(
                                                    <div key={key} className="terms-search-result-item">
                                                        <div className="search-term-info">
                                                            <Skeleton animation="wave" variant="text" width={100} />
                                                            <div className="d-flex align-items-center gap-5">
                                                                <Skeleton
                                                                    animation="wave"
                                                                    variant="text"
                                                                    width={50}
                                                                />
                                                                <Skeleton
                                                                    animation="wave"
                                                                    variant="text"
                                                                    width={30}
                                                                    height={25}
                                                                />
                                                                <Skeleton
                                                                    animation="wave"
                                                                    variant="text"
                                                                    width={50}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="search-term-translate-info">
                                                            <div className="search-term-inner-translate">
                                                                <div className="d-flex align-items-center gap-5">
                                                                    <Skeleton animation="wave" variant="text" width={100} />
                                                                    <Skeleton animation="wave" variant="text" width={50} />
                                                                </div>
                                                                <Skeleton animation="wave" variant="text" width={115} />  
                                                            </div>
                                                            <div className="edit-icon-wrap">
                                                                <Skeleton
                                                                    animation="wave"
                                                                    variant="circle"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    )
                                }
                                {
                                    (count && count > 1) ?
                                    <div className="pagination-align">
                                        <Pagination
                                            count={count}
                                            size="small"
                                            page={termPage}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {addNewTermModal && (<Rodal visible={addNewTermModal} {...modaloption} showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                <div className="header-area-wrapper">
                    <div className="header-area">
                        <h1>{editTermForm ? "Edit term" : "Add new term"}</h1>
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
                            onBlur={(e) => {getWikipedia(e.target.value, taskId); getWiktionary(e.target.value, taskId)}}
                        />
                        {error?.slError != "" && !sourceLanguageTerm?.length && <span className="text-danger">{error.slError}</span>}
                        <div className={"wikipedia-wikitionary-info-row " + ((sourceLanguageTerm && wikipediaData) ? "wikipedia-wikitionary-info-row-show" : "")}>
                            {(wikipediaData?.source !== "" || wiktionaryData?.source !== "") && <span className="suggest-title">{t("reference")}:</span>}
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
                                            <p>{t('credits_consumed_notes')}</p>
                                        </div>
                                    </span>
                                }
                            </div>
                            <div className="get-mt-box">
                                {
                                    creditsPromptClose &&
                                    <div className="mt-disclaimer">
                                        <span onClick={handleCloseCreditsPrompt} className="small-close">&#x2715;</span>
                                        <p>{t('credits_consumed_notes')}</p>
                                    </div>
                                }
                                <ButtonBase className="trans-btn-box" onClick={() => validateForm() && getMTTranslation(sourceLanguageTerm)}>
                                    <img src={TranslateBlack} alt="translate" />
                                </ButtonBase>
                            </div>
                        </div>
                        {(wikipediaData?.target !== "" || mtSuggestion !== null || wiktionaryData?.targets) && <div className="wikipedia-wikitionary-info-row wikipedia-wikitionary-info-row-show">
                            {(wikipediaData?.target !== "" || mtSuggestion !== null || wiktionaryData?.targets) && <span className="suggest-title">{t("suggestions")}:</span>}
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
                            placeholder=""
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
                            <span className="gl-workspace-btn-txt-1">{t('cancel')}</span>
                        </button>
                        <button className="globalform-StepProcessButton" onClick={() => handleSaveButton()}>
                            <span className="gl-workspace-btn-txt-2">{editTermForm ? t('update') : t('save')}</span>
                        </button>
                    </div>
                </div>
            </Rodal>)}
        </React.Fragment>
    )
}

export default SearchTerms;