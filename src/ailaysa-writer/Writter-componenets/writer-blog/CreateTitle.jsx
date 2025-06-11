import React, { useState, useEffect, useRef, createFactory } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Sourcelanguage from "../../../vendor/lang-modal/Sourcelanguage";
import Config from "../../../vendor/Config";
import { ButtonBase, Tooltip } from '@mui/material';
import Select, { components } from "react-select";
import { Collapse } from "reactstrap";
import { motion } from "framer-motion";
import Radio from '@mui/material/Radio';
import EditIcon from "../../../vendor/styles-svg/EditIcon";
import DeleteIcon from "../../../vendor/styles-svg/DeleteIcon";
import CopyIcon from "../../../vendor/styles-svg/CopyIcon";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { BlueButtonLoader } from './../../../loader/BlueButtonLoader';
import TextareaAutosize from 'react-textarea-autosize';
import { ButtonLoader } from './../../../loader/CommonBtnLoader';
import { useTranslation } from "react-i18next";
import AutoFixIcon from "../../../vendor/styles-svg/AutoFix";
import { ChipInputField } from "../../../vendor/custom-component/ChipInputField";
import generateKey from './../../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DoubleArrow from "../../../assets/images/double_arrow.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import InsufficientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg"

const CreateTitle = (props) => {
    const {
        toneOptions,
        selectedTone,
        setSelectedTone,
        sourceLanguage,
        setSourceLanguage,
        showSrcLangModal,
        setshowSrcLangModal,
        sourceLanguageOptions,
        handleSourceLangClick,
        filteredResults,
        setFilteredResults,
        searchInput,
        setSearchInput,
        onFocusWrap,
        setOnFocusWrap,
        searchAreaRef,
        sourceLabel,
        setSourceLabel,
        setStepWizard,
        stepWizard,
        setStepWizardComplete,
        stepWizardComplete,
        setBlogOutlineList,
        blogCreationResponseRef,
        blogOutlineGenResponseRef,
        getTotalBlogCreationObject,
        totalBlogResponseObj,
        saveBlogWizardLastStep,
        isNavigatedInternally,
        createTitleCollapse,
        setCreateTitleCollapse,
        isEnableCollapse,
        setIsEnableCollapse,
        groupByKey,
        flattenObject
    } = props;
    const location = useLocation();
    const history = useNavigate();
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const { t } = useTranslation();
    const [keywordSuggestions, setKeywordSuggestions] = useState(false);
    // const [isEnableCollapse, setIsEnableCollapse] = useState(false);
    const [blogKeywords, setBlogKeywords] = useState("");
    const [titleEdit, setTitleEdit] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [isEditItem, setIsEditItem] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    // Create title step states
    const [blogTopic, setBlogTopic] = useState('');
    const [createdBlogId, setCreatedBlogId] = useState(null);
    const [blogKeywordsList, setBlogKeywordsList] = useState([]);
    const [isKeywordGenerating, setIsKeywordGenerating] = useState({ main: false, createMore: false });
    const [isTitleGenerating, setIsTitleGenerating] = useState(false);
    const [blogTitlesList, setBlogTitlesList] = useState([]);
    const [isTitleEditMode, setIsTitleEditMode] = useState(false);
    const [titleListCopy, setTitleListCopy] = useState([]);
    const [isOutlineGenerating, setIsOutlineGenerating] = useState(false);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false);
    const [selectedTitleText, setSelectedTitleText] = useState('');
    const [chipsArray, setChipsArray] = useState([]);
    const [chipsCopyArray, setChipsCopyArray] = useState([]);
    const createdBlogIdRef = useRef(null);
    const blogCreationResponse = useRef(null);
    const selectedTitleTextRef = useRef(null);
    const blogTopicRef = useRef(null);
    const blogKeywordsRef = useRef(null);
    const blogTopicInputRef = useRef(null);
    const blogKeywordInputRef = useRef(null);
    const blogKeywordsListRef = useRef([]);

    const variants = {
        hidden: {
            opacity: 0,
            onanimationend: {
                display: "none"
            }
        },
        shown: {
            opacity: 1,
            display: "flex"
        }
    };

    const Newvariants = {
        hidden: {
            opacity: 0,
            onanimationend: {
                display: "none"
            }
        },
        shown: {
            opacity: 1,
            display: "block"
        }
    };

    const customMtSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#A4A8AA" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",

        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "max-content",
            minWidth: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "2px solid #0074D3" : "1px solid #D3D8DC",
            borderRadius: 3,
            transtion: 0.3,
            background: state.isFocused ? "#transparent" : "transparent",
            color: state.isFocused ? "#222222" : "#222222",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "normal",
            lineHeight: "24px",
            boxShadow: 0,
            height: 42,
            width: "100%",
            // minWidth: "100%",
            "&:hover": {
                color: "#0078D4",
                cursor: 'pointer'
            },
        }),
    };

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span className="select-mt-icon" style={{ color: "#5F6368" }}>
                    <i className="fas fa-caret-down"></i>
                </span>
            </components.DropdownIndicator>
        );
    };

    const handleSelectedTitle = (id, titleText) => {
        selectedTitleTextRef.current = titleText;
        setSelectedTitleText(titleText);
        setSelectedTitle(id);
    };

    const handleCreateTileCollapse = () => {
        setCreateTitleCollapse(!createTitleCollapse);
    };

    const handleGenerateOutlines = () => {
        setStepWizard("select-outline");
        setStepWizardComplete(1);
    }

    const handleSelectToneChange = (selectedOption) => {
        setSelectedTone(selectedOption);
    }

    const handleTextCopy = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
    }

    // useEffect(() => {
    //     if(URL_SEARCH_PARAMS.get("blog")){
    //         saveBlogWizardLastStep(URL_SEARCH_PARAMS.get("blog"), location.pathname)
    //     }
    // }, [blogCreationResponse.current])

    useEffect(() => {
        if (stepWizard === "create-title") {
            if (URL_SEARCH_PARAMS.get("blog")) {
                setTimeout(() => {
                    if (URL_SEARCH_PARAMS.get("blog")) {
                        // console.log(location.pathname)
                        saveBlogWizardLastStep(URL_SEARCH_PARAMS.get("blog"), window.location.pathname);
                    }
                }, 500);
            }
        }
    }, [stepWizard]);

    useEffect(() => {
        if (totalBlogResponseObj !== null) {
            setBlogTopic(totalBlogResponseObj.user_title);
            blogTopicRef.current = totalBlogResponseObj.user_title;
            // setBlogKeywords((totalBlogResponseObj.keywords_mt !== null && totalBlogResponseObj.keywords_mt !== '') ? totalBlogResponseObj.keywords_mt : totalBlogResponseObj.keywords)
            // setBlogKeywords(totalBlogResponseObj.keywords)
            let a = totalBlogResponseObj.keywords?.split(',')?.filter(each => each !== '');
            let keywordList = [...new Map(totalBlogResponseObj?.blog_key_create?.map(item => [item['blog_keyword'], item])).values()];
            let inGeneratedList = keywordList?.filter(each => a?.some(item => item?.trim()?.toLowerCase() === each.blog_keyword?.toLowerCase()));
            let notInGeneratedList = a?.filter(each => !totalBlogResponseObj.blog_key_create?.some(item => each?.trim()?.toLowerCase() === item.blog_keyword?.toLowerCase()));
            let chip_arr = [];
            inGeneratedList?.forEach(element => {
                chip_arr.push({
                    id: element.id,
                    name: element.blog_keyword
                });
            });
            notInGeneratedList?.forEach(element => {
                chip_arr.push({
                    id: generateKey(),
                    name: element
                });
            });
            if (chipsArray?.length === 0) {
                setChipsArray(chip_arr);
            }
            setBlogKeywordsList(keywordList?.filter(each => !inGeneratedList.some(item => item.id === each.id)));
            // setBlogKeywordsList(totalBlogResponseObj.blog_key_create)
            blogKeywordsListRef.current = totalBlogResponseObj.blog_key_create;
            // blogKeywordsRef.current = totalBlogResponseObj.keywords
            // blogKeywordsRef.current = (totalBlogResponseObj.keywords_mt !== null && totalBlogResponseObj.keywords_mt !== '') ? totalBlogResponseObj.keywords_mt : totalBlogResponseObj.keywords
            setSelectedTone(toneOptions?.find(each => each.value === totalBlogResponseObj.tone));
            setCreatedBlogId(totalBlogResponseObj.id);
            setBlogTitlesList(totalBlogResponseObj.blog_title_create);
            setSelectedTitle(totalBlogResponseObj.blog_title_create?.find(each => each.selected_field)?.id);
            setSourceLanguage(totalBlogResponseObj?.user_language);
            setSourceLabel(languageOptionsList?.find(each => each.id == totalBlogResponseObj?.user_language)?.language);
            selectedTitleTextRef.current = totalBlogResponseObj.blog_title_create?.find(each => each.selected_field)?.blog_title;
            setSelectedTitleText(totalBlogResponseObj.blog_title_create?.find(each => each.selected_field)?.blog_title);
            blogCreationResponseRef.current = totalBlogResponseObj;
            createdBlogIdRef.current = totalBlogResponseObj.id;
            blogCreationResponse.current = totalBlogResponseObj;
        }
    }, [totalBlogResponseObj]);

    useEffect(() => {
        if (blogTitlesList?.length !== 0) {
            if (blogTitlesList?.find(each => each.selected_field)) {
                selectedTitleTextRef.current = blogTitlesList?.find(each => each.selected_field)?.blog_title;
                setSelectedTitleText(blogTitlesList?.find(each => each.selected_field)?.blog_title);
            } else {
                setSelectedTitleText(blogTitlesList[0]?.blog_title);
                setSelectedTitle(blogTitlesList[0]?.id);
            }
        }
    }, [blogTitlesList]);

    // automatically update the user-language when source language is changed
    useEffect(() => {
        if (blogCreationResponseRef.current !== null && (sourceLanguage != blogCreationResponseRef.current?.user_language)) {
            updateBlog();
        }
    }, [sourceLanguage]);

    // automatically update the user-tone when tone is changed
    useEffect(() => {
        if (blogCreationResponseRef.current !== null && (selectedTone?.value != blogCreationResponseRef.current?.tone)) {
            updateBlog();
        }
    }, [selectedTone]);

    const handleKeywordsClick = (keywordText, keywordId) => {
        let keywordLength = getKeywordStringList(chipsArray)?.trim()?.length + keywordText?.trim()?.length + (chipsArray?.length === 0 ? 0 : 1);
        if (keywordLength > 200) {
            toast.clearWaitingQueue();
            Config.toast(t("keyword_warn_note"), 'warning');
            // blogKeywordInputRef.current.style.border = fieldErrorStyle.border
            return;
        }
        blogKeywordInputRef.current.style.border = fieldDefaultStyle.border;
        setChipsArray(prevState => [...prevState, { id: keywordId, name: keywordText?.trim() }]);
        setBlogKeywordsList(blogKeywordsList?.filter(item => item.id !== keywordId));
    };

    const deleteChip = (chip_id) => {
        setChipsArray(prevState => prevState.filter((chip) => chip.id !== chip_id));
        let isBlogKeywordChip = blogKeywordsListRef.current?.find(item => item.id === chip_id);
        if (isBlogKeywordChip) setBlogKeywordsList(prevState => [...prevState, isBlogKeywordChip]);
    }

    const getKeywordStringList = (list) => {
        let keyword_list = '';
        list?.forEach((each, index) => {
            keyword_list += `${each.name}${index !== list?.length - 1 ? "," : ""}`;
        })
        return keyword_list;
    }

    const createBlog = (from) => {
        let formdata = new FormData();
        formdata.append("user_title", blogTopic);
        formdata.append("user_language", sourceLanguage);
        formdata.append("tone", selectedTone?.value);
        formdata.append("keywords", getKeywordStringList(chipsArray));
        // number of keywords by default is 10, for now its given 5 but later this can be get from user
        formdata.append("response_copies_keyword", 5);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                setCreatedBlogId(response.data.id);
                blogCreationResponseRef.current = response.data;
                createdBlogIdRef.current = response.data.id;
                blogCreationResponse.current = response.data;
                blogTopicRef.current = blogTopic;
                blogKeywordsRef.current = blogKeywords;
                history(`${window.location.pathname}?blog=${response.data.id}`, {state: { prevPath: location.state?.prevPath }});
                if (from === 'gen-keyword') generateBlogKeywords('main');
                if (from === 'gen-titles') generateBlogTitles('gen');
            },
            error: (err) => {
                if (err?.response.status === 400) {
                    setCreatedBlogId(err?.response?.data.blog_id);
                    createdBlogIdRef.current = err?.response?.data.blog_id;
                    if (err?.response?.data?.msg?.includes('Insufficient')) {    // this error comes when the pre-translate is enabled in create flow
                        setShowCreditAlertModal(true);
                    }
                }
                setIsKeywordGenerating({ main: false, createMore: false });
                setIsTitleGenerating(false);
            }
        });
    }


    const updateBlog = (from) => {
        let formdata = new FormData();
        if (blogCreationResponse.current?.user_title?.trim() !== blogTopic?.trim()) {
            formdata.append("user_title", blogTopic);
        }
        if (blogCreationResponse.current?.keywords?.trim() !== getKeywordStringList(chipsArray)) {
            formdata.append("keywords", getKeywordStringList(chipsArray));
        }
        if (blogCreationResponse.current?.user_language !== sourceLanguage) {
            formdata.append("user_language", sourceLanguage);
        }
        if (blogCreationResponse.current?.tone !== selectedTone?.value) {
            formdata.append("tone", selectedTone?.value);
        }
        // number of keywords by default is 10, for now its given 5 but later this can be get from user
        // formdata.append("response_copies_keyword", 5);  

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/${createdBlogIdRef.current}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // setCreatedBlogId(response.data.id);
                createdBlogIdRef.current = response.data.id;
                blogCreationResponse.current = response.data;
                if (from === 'gen-keyword') generateBlogKeywords('main');
                if (from === 'gen-titles') generateBlogTitles('gen');
            },
            error: (err) => {
                setShowCreditAlertModal(true);
                setIsTitleGenerating(false);
                setIsKeywordGenerating({ main: false, createMore: false });
            }
        });
    }

    // generate, regenerate or create more keywords all have same functionality
    const generateBlogKeywords = (from) => {
        if (from === 'main') setIsKeywordGenerating({ ...isKeywordGenerating, main: true });
        if (from === 'create-more') setIsKeywordGenerating({ ...isKeywordGenerating, createMore: true });
        if (createdBlogIdRef.current == null) {
            createBlog('gen-keyword');
            return;
        }
        if (createdBlogIdRef.current !== null && (
            blogCreationResponse.current?.user_title?.trim() !== blogTopic?.trim() ||
            blogCreationResponse.current?.tone !== selectedTone?.value ||
            blogCreationResponse.current?.user_language !== sourceLanguage)
        ) {
            updateBlog('gen-keyword');
            return;
        }
        let formdata = new FormData();
        formdata.append("blog_creation", createdBlogIdRef.current);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogkeyword/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                if (from === 'main') setIsKeywordGenerating({ ...isKeywordGenerating, main: false });
                if (from === 'create-more') setIsKeywordGenerating({ ...isKeywordGenerating, createMore: false });
                blogKeywordsListRef.current = response.data;
                // filter only the distinct keywords
                let keywordList = [...new Map(response.data?.map(item => [item['blog_keyword'], item])).values()];
                setBlogKeywordsList(keywordList);
                setKeywordSuggestions(true);
                saveBlogWizardLastStep(createdBlogIdRef.current, window.location.pathname);
            },
            error: (err) => {
                if (from === 'main') setIsKeywordGenerating({ ...isKeywordGenerating, main: false });
                if (from === 'create-more') setIsKeywordGenerating({ ...isKeywordGenerating, createMore: false });
                if (err?.response.status === 400) {
                    if (err?.response?.data?.msg?.includes('Insufficient')) {    // this error comes when the pre-translate is enabled in create flow
                        setShowCreditAlertModal(true);
                    }
                } else if (err?.response.status === 500) {
                    Config.toast(t("too_many_requests"));
                }
            }
        });
    }

    const fieldErrorStyle = {
        border: '1px solid #e74c3c'
    }
    const fieldDefaultStyle = {
        border: '1px solid #D3D8DC'
    }

    const createTitleformValidation = () => {
        if (blogTopic?.trim() === '') {
            // console.log('both are empty');
            blogTopicInputRef.current.style.border = fieldErrorStyle.border;
            // blogKeywordInputRef.current.style.border = fieldErrorStyle.border
            return true;
        } else if (blogTopic?.trim() === '') {
            // console.log('topic empty');
            blogTopicInputRef.current.style.border = fieldErrorStyle.border;
            return true;
        }
        // else if(chipsArray?.length === 0){
        //     // console.log('keyword empty');
        //     blogKeywordInputRef.current.style.border = fieldErrorStyle.border
        //     return true 
        // }
    }

    useEffect(() => {
        if (blogTopicInputRef.current.style.border) {
            if (blogTopic?.trim() !== '') blogTopicInputRef.current.style.border = fieldDefaultStyle.border;
        }
        if (blogKeywordInputRef.current.style.border) {
            if (blogKeywords?.trim() !== '') blogKeywordInputRef.current.style.border = fieldDefaultStyle.border;
        }
    }, [blogTopic, blogKeywords]);

    const generateBlogTitles = () => {
        if (createTitleformValidation()) return;
        setIsTitleGenerating(true);
        if (createdBlogIdRef.current == null) {
            createBlog('gen-titles');
            return;
        }
        if (createdBlogIdRef.current !== null && (
            blogCreationResponse.current?.keywords?.trim() !== getKeywordStringList(chipsArray) ||
            blogCreationResponse.current?.user_title?.trim() !== blogTopic?.trim() ||
            blogCreationResponse.current?.tone !== selectedTone?.value ||
            blogCreationResponse.current?.user_language !== sourceLanguage)
        ) {
            updateBlog('gen-titles');
            return;
        }
        let formdata = new FormData();
        formdata.append("blog_creation_gen", createdBlogIdRef.current);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogtitle/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                setIsTitleGenerating(false);
                // setBlogTitlesList(response.data)
                // setTitleListCopy(response.data)
                setIsEnableCollapse(true);
                setCreateTitleCollapse(false);
                getTotalBlogCreationObject(URL_SEARCH_PARAMS.get('blog') ? URL_SEARCH_PARAMS.get('blog') : blogCreationResponse.current?.id);
                // saveBlogWizardLastStep(createdBlogIdRef.current, window.location.pathname)
            },
            error: (err) => {
                setIsTitleGenerating(false);
                if (err?.response.status === 400) {
                    if (err?.response?.data?.msg?.includes('Insufficient')) {    // this error comes when the pre-translate is enabled in create flow
                        setShowCreditAlertModal(true);
                    }
                } else if (err?.response.status === 500) {
                    Config.toast(t("too_many_requests"));
                }
            }
        });
    }

    // onchange handler
    const handleTitleChange = (e, itemId) => {
        const newArr = blogTitlesList?.map(obj => {
            if (obj.id === itemId) {
                return {
                    ...obj,
                    blog_title: e.target.value,
                };
            }
            return obj;
        });
        setBlogTitlesList(newArr);
    };

    const handleTitleEditModeToggle = (itemId, action) => {
        const newArr = blogTitlesList?.map(obj => {
            if (obj.id === itemId) {
                return {
                    ...obj,
                    isEdit: action === 'close' ? false : true,
                };
            }
            return obj;
        });
        if (action === 'close') setIsTitleEditMode(false)
        else setIsTitleEditMode(true);
        setTitleListCopy(newArr);
        setBlogTitlesList(newArr);
    }

    const updateBlogTitle = (itemId, blogTitle) => {
        let formdata = new FormData();
        formdata.append("blog_title", blogTitle);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogtitle/${itemId}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                const newArr = blogTitlesList?.map(obj => {
                    if (obj.id === itemId) {
                        return {
                            ...obj,
                            isEdit: false,
                            blog_title: blogTitle
                        };
                    }
                    return obj;
                });
                setIsTitleEditMode(false);
                setBlogTitlesList(newArr);
            },
        });
    }

    const generateBlogOutLine = () => {
        setIsOutlineGenerating(true);
        // for blog title update
        let formData = new FormData();
        // for generating blog outline
        let formdata = new FormData();
        formData.append("user_title", selectedTitleText);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/${createdBlogIdRef.current}/`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                formdata.append("blog_title_gen", selectedTitle);

                Config.axios({
                    url: `${Config.BASE_URL}/writer/blogoutline/`,
                    method: "POST",
                    data: formdata,
                    auth: true,
                    success: (response) => {
                        isNavigatedInternally.current = true;
                        getTotalBlogCreationObject(URL_SEARCH_PARAMS.get('blog') ? URL_SEARCH_PARAMS.get('blog') : blogCreationResponse.current?.id);
                        blogOutlineGenResponseRef.current = response.data;
                        let groupedRes = groupByKey(response.data?.blog_outline_session, 'group');
                        setBlogOutlineList(flattenObject(groupedRes));
                        setIsOutlineGenerating(false);
                        handleGenerateOutlines();
                        history(`/writer-blog/select-outline${window.location.search}`, {state: { prevPath: location.state?.prevPath }});
                    },
                    error: (err) => {
                        setIsOutlineGenerating(false);
                        if (err?.response.status === 400) {
                            if (err?.response?.data?.msg?.includes('Insufficient')) {    // this error comes when the pre-translate is enabled in create flow
                                setShowCreditAlertModal(true);
                            }
                        } else if (err?.response.status === 500) {
                            Config.toast(t("too_many_requests"));
                        }
                    }
                });
            },
            error: (err) => {
                setShowCreditAlertModal(true);
                setIsTitleGenerating(false);
                setIsKeywordGenerating({ main: false, createMore: false });
                setIsOutlineGenerating(false);
            }
        });
    }

    const deleteTitleObj = (titleId) => {

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogtitle/${titleId}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                setBlogTitlesList(blogTitlesList?.filter(each => each.id != titleId));
            },
        });
    }

    return (
        <>
            <div className="blog-create-box-wrap">
                <div className="blog-create-header">
                    <h1>Create blog title</h1>
                    <div className="arrow-wrapper">
                        <div
                            className="keyboard-icon"
                            onClick={() => { isEnableCollapse && handleCreateTileCollapse() }}
                            style={blogCreationResponseRef.current === null ? { opacity: 0 } : {}}
                        >
                            <KeyboardArrowDownIcon className="close-icon" style={createTitleCollapse ? { transform: 'rotate(180deg)' } : {}} />
                        </div>
                        <motion.div variants={variants} initial="hidden" animate={!createTitleCollapse ? "shown" : "hidden"} className="auto-fix-wrap">
                            <AutoFixIcon />
                        </motion.div>
                    </div>
                </div>
                <Collapse isOpen={createTitleCollapse}>
                    <div className="blog-create-body" style={(isOutlineGenerating || isTitleGenerating) ? { pointerEvents: 'none' } : {}}>
                        <div className="blog-form-wrapper">
                            <div className="blog-forms-row">
                                <div className="blog-forms-col">
                                    <label>{t("output_lang")}</label>
                                    <ButtonBase onClick={() => { setshowSrcLangModal(true); }}>
                                        <div className="ailay-lang-btn">
                                            <span className={"text " + (sourceLabel === "Select Output language" && "placeholder")}>{sourceLabel}</span>
                                            <span className="icon">
                                                <i className="fas fa-caret-down"></i>
                                            </span>
                                        </div>
                                    </ButtonBase>
                                </div>
                                <div className="blog-forms-col">
                                    <label>{t("tone")}</label>
                                    <Select
                                        options={toneOptions}
                                        isSearchable={false}
                                        classNamePrefix="mt-select"
                                        value={selectedTone}
                                        styles={customMtSelectStyles}
                                        onChange={handleSelectToneChange}
                                        placeholder={t("select_tone")}
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                    />
                                </div>
                            </div>
                            <div className="blog-forms-plain-row">
                                <div className="label-wrapper">

                                    <label htmlFor="topic">{t("topic")}<span className="asterik-symbol">*</span></label><small style={{ opacity: 0.7 }}>{blogTopic?.length}/200</small>
                                </div>
                                <input
                                    className="blog-form-input"
                                    id="topic"
                                    value={blogTopic}
                                    maxLength={200}
                                    ref={blogTopicInputRef}
                                    // onBlur={handleBlogTitleBlur}
                                    onChange={(e) => setBlogTopic(e.target.value)}
                                />
                            </div>
                            <div className="blog-forms-plain-row keyword">
                                <div className="label-wrapper">
                                    <label htmlFor="keywords">{t("keywords")}</label>
                                    {(blogTopic?.trim() !== '' && blogKeywordsList?.length === 0) ? (
                                        <span>
                                            {isKeywordGenerating.main && <BlueButtonLoader />}
                                            <span onClick={() => !isKeywordGenerating.main && generateBlogKeywords('main')} className="link">
                                                {(blogCreationResponse.current !== null && (blogCreationResponse.current?.user_title?.trim() !== blogTopic?.trim())) ? t("regenerate_with_ai") : t("generate_with_ai")}
                                            </span>
                                        </span>
                                    ) : ((blogCreationResponse.current !== null && blogTopic?.trim() !== '') && (
                                        blogCreationResponse.current?.user_title?.trim() !== blogTopic?.trim() ||
                                        blogCreationResponse.current?.tone !== selectedTone?.value ||
                                        blogCreationResponse.current?.user_language !== sourceLanguage || isKeywordGenerating.main)
                                    ) && (
                                        <span>
                                            {isKeywordGenerating.main && <BlueButtonLoader />}
                                            <span onClick={() => !isKeywordGenerating.main && generateBlogKeywords('main')} className="link">
                                                {t("regenerate_with_ai")}
                                            </span>
                                        </span>
                                    )}
                                </div>
                                <ChipInputField
                                    input={blogKeywords}
                                    setInput={setBlogKeywords}
                                    chipsArray={chipsArray}
                                    setChipsArray={setChipsArray}
                                    chipsCopyArray={chipsCopyArray}
                                    setChipsCopyArray={setChipsCopyArray}
                                    deleteChip={deleteChip}
                                    placeHolder={t("keywords_placeholder")}
                                    refs={blogKeywordInputRef}
                                    getKeywordStringList={getKeywordStringList}
                                />
                                <div className="d-flex justify-content-between w-100" style={{ marginTop: '8px' }}>
                                    <span style={{ fontSize: '13px', opacity: 0.7 }}><span style={{ fontWeight: 'bold' }}>{t("note")}:</span>{t("separate_wrds_press_comma")}</span>
                                    <div>
                                        <small style={{ opacity: 0.7 }}>{getKeywordStringList(chipsCopyArray)?.trim()?.length + blogKeywords?.trim()?.length}/200</small>
                                        {/* <small 
                                        style={
                                            getKeywordStringList(chipsCopyArray)?.trim()?.length + blogKeywords?.trim()?.length === 200 ? 
                                            {display: 'inline', color: '#E74C3C', } : {display: 'none'}
                                        }>
                                            Chars exceeded
                                        </small> */}
                                    </div>
                                </div>

                                <Collapse isOpen={blogKeywordsList?.length !== 0}>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <ul className="suggestion-capsule-wrapper">
                                            {
                                                blogKeywordsList?.map((item, index) => {
                                                    return (
                                                        // <li key={item?.id} onClick={() => handleKeywordsClick((item?.blog_keyword_mt !== null && item?.blog_keyword_mt !== '') ? item?.blog_keyword_mt : item?.blog_keyword)}>
                                                        //     {(item?.blog_keyword_mt !== null && item?.blog_keyword_mt !== '') ? item?.blog_keyword_mt : item?.blog_keyword}
                                                        // </li>
                                                        <li key={item?.id} onClick={() => handleKeywordsClick(item?.blog_keyword, item?.id)}>
                                                            {item?.blog_keyword}
                                                        </li>
                                                    )
                                                })
                                            }
                                            <li onClick={() => !isKeywordGenerating.createMore && generateBlogKeywords('create-more')} className="create-more-link">{isKeywordGenerating.createMore && <BlueButtonLoader />}{t("create_more")}</li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="blog-form-button-wrap">
                            {
                                blogTitlesList?.length === 0 ? (
                                    <ButtonBase
                                        className="generate-blog-btn"
                                        onClick={() => !isTitleGenerating && generateBlogTitles()}
                                    // disabled={(selectedTone === null || blogTopic?.trim() === '' || blogKeywords?.trim() === '') ? true : false}
                                    // style={(selectedTone === null || blogTopic?.trim() === '' || blogKeywords?.trim() === '') ? {opacity: 0.7} : {}}
                                    >
                                        {isTitleGenerating && <ButtonLoader />}
                                        <span>{t("generate_titles")}</span>
                                        <span><AutoFixIcon className={isTitleGenerating ? "wand-animation" : ''} /></span>
                                    </ButtonBase>
                                ) : blogCreationResponse.current !== null && (
                                    <ButtonBase
                                        className="generate-blog-btn"
                                        onClick={() => (!isTitleGenerating && !isOutlineGenerating) && generateBlogTitles()}
                                    // disabled={(blogCreationResponse.current?.user_title?.trim() === blogTopic?.trim() && blogCreationResponse.current?.tone === selectedTone?.value) ? true : false}
                                    // style={(blogCreationResponse.current?.user_title?.trim() === blogTopic?.trim() && blogCreationResponse.current?.tone === selectedTone?.value && blogCreationResponse.current?.keywords === blogKeywords) ? {opacity: 0.7} : {}}
                                    >
                                        {isTitleGenerating && <ButtonLoader />}
                                        <span>{(blogCreationResponse.current?.user_title?.trim() === blogTopic?.trim() && blogCreationResponse.current?.tone === selectedTone?.value && blogCreationResponse.current?.keywords === blogKeywords) ? t("generate_titles") : t("regenerate_titles")}</span>
                                        <span><AutoFixIcon className={isTitleGenerating ? "wand-animation" : ''} /></span>
                                    </ButtonBase>
                                )
                            }
                        </div>
                    </div>
                </Collapse>
            </div>
            <motion.div variants={Newvariants} initial="hidden" animate={blogTitlesList?.length !== 0 ? "shown" : "hidden"}>
                <div className="blog-create-box-wrap select-title" style={isOutlineGenerating ? { pointerEvents: 'none' } : {}}>
                    <div className="blog-create-header">
                        <h1>{t("select_title")}</h1>
                        {/* hide generate more title when create title section is opened */}
                        {!createTitleCollapse &&
                            (blogCreationResponse.current?.user_title?.trim() === blogTopic?.trim() && blogCreationResponse.current?.tone === selectedTone?.value && blogCreationResponse.current?.keywords === blogKeywords) &&
                            <span onClick={() => (!isTitleGenerating && !isOutlineGenerating) && generateBlogTitles()} className="create-more-link">
                                {isTitleGenerating && <BlueButtonLoader />}{t("Generate more titles")}
                            </span>
                        }
                    </div>
                    <div className="blog-create-body">
                        <div className="title-lists-wrapper">
                            {
                                blogTitlesList?.map((titleItem) => {
                                    return (
                                        <div style={(isTitleEditMode && !titleItem?.isEdit) ? { pointerEvents: 'none' } : {}} key={titleItem.id} onClick={() => handleSelectedTitle(titleItem.id, titleItem.blog_title)} className={"title-list-item " + (selectedTitle === titleItem.id ? "active " : "") + (titleItem?.isEdit ? "edit-wrap" : "")}>
                                            <div className="radio-btn-wrap">
                                                <Radio
                                                    checked={selectedTitle === titleItem.id}
                                                    onChange={() => handleSelectedTitle(titleItem.id, titleItem.blog_title)}
                                                    name="title-radio-button"
                                                    inputProps={{ 'aria-label': titleItem.id }}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="title-info-main-wrap">
                                                <div className="title-info-wrap" >
                                                    <TextareaAutosize
                                                        className="editable-title"
                                                        value={titleItem.blog_title}
                                                        onChange={(e) => handleTitleChange(e, titleItem.id)}
                                                        maxLength={200}
                                                        onBlur={() => updateBlogTitle(titleItem?.id, titleItem.blog_title)}
                                                    // value={titleListCopy?.find(each => each.id === titleItem?.id)?.blog_title}
                                                    />
                                                    <div className="d-flex justify-content-end">
                                                        {/* <span className="capsule-card">{`${titleItem.blog_title?.split(" ").length} words / ${titleItem.blog_title?.length} characters`}</span> */}
                                                        <div className="text-end">
                                                            <small style={{ opacity: 0.7 }}>{titleItem.blog_title?.length}/200</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title-info-tools">
                                                    <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top" arrow>
                                                        <div className="tools-box" onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 300)} onClick={() => handleTextCopy(titleItem.blog_title)}>
                                                            <CopyIcon style="copy-icon" />
                                                        </div>
                                                    </Tooltip>
                                                    {!titleItem?.selected_field && <Tooltip title={t("delete")} placement="top" arrow>
                                                        <div className="tools-box" onClick={() => deleteTitleObj(titleItem.id)}>
                                                            <DeleteIcon style="deleteIcon" />
                                                        </div>
                                                    </Tooltip>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="blog-form-button-wrap">
                            <ButtonBase className={"generate-blog-btn " + (isOutlineGenerating ? "btn-spacer" : "")} onClick={() => (!isOutlineGenerating && !isTitleGenerating) && generateBlogOutLine()}>
                                <span>{isOutlineGenerating && <ButtonLoader />} {t("generate_outlines")}</span>
                                <span><img src={DoubleArrow} /></span>
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            </motion.div>
            {showSrcLangModal && (
                <Rodal
                    visible={showSrcLangModal}
                    showCloseButton={false}
                    className="ai-lang-select-modal"
                >
                    <div className="lang-modal-wrapper">
                        <span
                            className="modal-close-btn lang-close"
                            onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false); }}
                        >
                            <img
                                src={CloseBlack}
                                alt="close_black"
                            />
                        </span>

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
                        />
                    </div>
                </Rodal>
            )}

            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} onClose={() => console.log()} {...convertmodaloption} showCloseButton={false}>
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false) }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="credits-text-cont">
                    <React.Fragment>
                        <img src={InsufficientIcon} alt="insuffient-icon" />
                        <div className="insuffient-txt-align">
                            <span>
                                <img src={RemoveCircleRed} alt="remove_circle" />
                            </span>
                            <p>{t("insufficient_credits")}</p>
                        </div>
                        <p className="insuffient-desc">{t("insufficient_credits_note")}</p>
                        {!Config.userState?.is_internal_member && (
                            <div className="mt-3">
                                <ButtonBase>
                                    <a className="ai-alert-btn" target="_blank" href={Config.USER_PORTAL_HOST + "/add-ons"}>
                                        {t("buy_credits")}
                                    </a>
                                </ButtonBase>
                            </div>
                        )}
                    </React.Fragment>
                </div>
            </Rodal>)}
        </>
    )
}

export default CreateTitle;