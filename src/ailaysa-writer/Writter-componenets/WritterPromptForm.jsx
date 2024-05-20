import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import Config from "../../vendor/Config";
import { components } from 'react-select';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from "react-i18next";
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import VoiceEditorInstantTranslate from "../../project-setup-components/translate-component/text/VoiceEditorInstantTranslate";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowDropDown } from "@mui/icons-material";
import AnyText from "../../vendor/styles-svg/AnyText";
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import CoAuthorIcon from "../../vendor/styles-svg/CoAuthorIcon";
import CoAuthorPanel from "./co-author/CoAuthorPanel";
import ChapterPanel from "./co-author/ChapterPanel";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery';
import { setBookCreationResponse } from "../../features/writer-slices/BookCreationResponseSlice";
import ReloadIcon from "../../assets/images/reload.svg"
import DoubleArrowIcon from "../../assets/images/new-ui-icons/doubleArrow.svg"
import Box from '@mui/material/Box';
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';
import { PromptLibraryModal } from "../Prompt-library/PromptLibraryModal";
import { LangSelectorDropDown } from "../lang-select-drop-down/LangSelectorDropDown";

const WritterPromptForm = (props) => {

    let {
        editor,
        toneOptions,
        selectedTone,
        setSelectedTone,
        categoryOptions,
        createNewDocument,
        createdDocumentId,
        setshowSrcLangModal,
        setshowTarLangModal,
        targetLanguageOptionsRef,
        alreadySelecetedTarLangID,
        subCategoryRef,
        toggleWritingStateRef,
        setMobLeftSideBar,
        mobLeftSideBar,
        transcriptionTaskId,
        globalSaveLogic,
        setShowCreditAlertModal,
        resetToNewDoc,
        setResetToNewDoc,
        targetLanguage,
        sourceLanguage,
        setSourceLabel,
        setTargetLanguageListTooltip,
        setTargetLanguage,
        sourceLabel,
        targetLanguageListTooltip,
        bookLanguage,
        setBookLanguage,
        bookLanguageLabel,
        setBookLanguageLabel,
        closeOverlay,
        showOverlay,
        confirmedNavigation,
        lastLocation
    } = props

    const { t } = useTranslation();
    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()

    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [coAuthorPanelView, setCoAuthorPanelView] = useState(1)
    const [isBookDetailsLoading, setIsBookDetailsLoading] = useState(false)


    const descriptionTextRef = useRef(null)
    const freeStyleDescriptionTextRef = useRef(null)
    const keywordTextRef = useRef(null)

    const writterPromptWrapRef = useRef();



    // prompt form states
    let copiesOptions = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
    ]
    let copiesOptions2 = [
        { label: 3, value: 3 },
        { label: 5, value: 5 },
        { label: 10, value: 10 },
    ]

    const [description, setDescription] = useState('')
    const [aiWrittingKeywords, setAiWrittingKeywords] = useState('')
    const [freeStyleDescription, setFreeStyleDescription] = useState('')
    const [aiWrittingProductName, setAiWrittingProductName] = useState('')
    // const [toneOptions, setToneOptions] = useState([])
    // const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [seletctedMainCategory, setSeletctedMainCategory] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)
    const [selectedNumberOfCopies, setSelectedNumberOfCopies] = useState(null)    // default value
    const [promptResultsList, setPromptResultsList] = useState([])
    const [freeStylePromptResultsList, setFreeStylePromptResultsList] = useState([])
    const [isGenerateLoading, setIsGenerateLoading] = useState(false)
    const [isGenerateLoadingFreestyle, setIsGenerateLoadingFreestyle] = useState(false)
    // const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)
    const [toggleState, setToggleState] = useState(1);

    const [isListening, setIsListening] = useState(false)
    const [writterPromptHasScrollbar, setWritterPromptHasScrollbar] = useState(false);

    const generatedPromptId = useRef(null)
    
    const bookCreationPanelRef = useRef(null)
    const bookChapterPanelRef = useRef(null)
    const copiesOptions2Category = useRef([38, 41, 46, 47])
    const rightAlignLangId = [4, 83, 31, 60, 101, 88, 106]


    // ========================== Book Co-author =============================================
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const levelOptions = useSelector((state) => state.bookLevelOption.value)
    const genreOptions = useSelector((state) => state.bookGenreOption.value)

    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [authorIdentity, setAuthorIdentity] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookTitle, setBookTitle] = useState("");
    const [selectedTitle, setSelectedTitle] = useState({
        id: null, title: ''
    });
    const [bookTitleList, setBookTitleList] = useState([])
    const [isUpdatingText, setIsUpdatingText] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const createdBookIdRef = useRef(null)
    const chaptersCreatedRef = useRef(false)
    const bookCreationObjRef = useRef(null)

    
    // =======================================================================================
    
    function FacebookCircularProgress(props) {
        return (
          <Box sx={{ position: 'relative' }}>
            <CircularProgress
              variant="determinate"
              sx={{
                color: (theme) =>
                  theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
              }}
              size={40}
              thickness={4}
              {...props}
              value={100}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#0074d3' : '#0074d3'),
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              size={40}
              thickness={4}
              {...props}
            />
          </Box>
        );
      }



    const customProjectTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            zIndex: 1080
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            display: "flex",
            marginBottom: "0.2rem",
            padding: "4px 6px",
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
            border: state.isFocused ? "1px solid #0074D3" : "1px solid #D3D8DC",
            outline: state.isFocused ? "1px solid #0074D3" : "none",
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            transtion: 0.3,
            color: "#222222",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px",
            // width: 150,
            height: state.isFocused ? 42 : 42,
            "&:hover": {
                cursor: "pointer",
            },
        }),
        menuList: (base) => ({
            ...base,
            // height: "100px",

            "::-webkit-scrollbar": {
                width: "8px"
            },
            "::-webkit-scrollbar-track": {
                background: "transparent"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#DADDE0",
                border: "8px solid #DADDE0 !important",
                borderRadius: "50px",
            },

        }),
    };

    const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    {/* {props.selectProps.menuIsOpen ? <ArrowDropDown style={{ transform: "rotate(180deg)"}} className="arrow-icon-color" /> : <ArrowDropDown className="arrow-icon-color"/>} */}
                    <ArrowDropDown className="arrow-icon-color" />
                </components.DropdownIndicator>
            )
        );
    };

    useEffect(() => {
        if (resetToNewDoc) {
            setDescription('')
            setAiWrittingKeywords('')
            setFreeStyleDescription('')
            setAiWrittingProductName('')
            setToggleState(1)
            setSourceLabel(17)
            setSourceLabel("English")
            generatedPromptId.current = null
            setSeletctedMainCategory(categoryOptions[0])
            setSelectedSubCategory(subCategoryOptions[0])
            setResetToNewDoc(false)
            if (alreadySelecetedTarLangID) {
                setTargetLanguage(
                    targetLanguageOptionsRef.current?.filter(each => each.id === 17)   // by default english language is selected
                )
            }
        }

    }, [resetToNewDoc])

    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book')
        let from = location.state?.from
        // console.log(location)
        if(bookId && from === 'list') {
            setIsBookDetailsLoading(true)
        }
    }, [URL_SEARCH_PARAMS.get('book'), location.state])

    // get book details from book id
    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book')
        if(bookId && levelOptions?.length !== 0 && genreOptions?.length !== 0) {
            getBookDetails(bookId, 'param')
        }
    }, [URL_SEARCH_PARAMS.get('book'), levelOptions, genreOptions])
    

    useEffect(() => {
        if (targetLanguage) {
            let list = ""
            targetLanguage?.map((each, index) => {
                list += `${each?.language}${index !== targetLanguage?.length - 1 ? ", " : ""
                    }`;
            });
            setTargetLanguageListTooltip(list)
        }
    }, [targetLanguage, targetLanguageOptionsRef.current])


    useEffect(() => {
        if (targetLanguageOptionsRef.current) {
            setTargetLanguage(
                targetLanguageOptionsRef.current?.filter(each => each.id === 17)   // by default english language is selected
            )
        }
    }, [targetLanguageOptionsRef.current])

    useEffect(() => {
        if (categoryOptions && location.state?.aiWritingCateg && editor) {
            if (isNaN(parseInt(location.state?.aiWritingCateg))) {
                setSeletctedMainCategory(categoryOptions[0])
            } else {
                if (location.state?.aiWritingCateg == 9) {
                    setSeletctedMainCategory(categoryOptions[0])
                    setToggleState(2)
                    editor?.summernote('focus')
                    // freeStyleDescriptionTextRef.current?.focus()
                } else {
                    setSeletctedMainCategory(categoryOptions?.find(each => each.value === parseInt(location.state?.aiWritingCateg)))
                }
            }
        } else {
            setSeletctedMainCategory(categoryOptions[0])
        }
    }, [categoryOptions, editor])



    // filter sub-category based on selected main category
    useEffect(() => {
        if (seletctedMainCategory && subCategoryRef.current !== null) {
            let subOptions = []
            subCategoryRef.current?.map(each => {
                if (each.category === seletctedMainCategory?.value) {
                    subOptions.push({
                        value: each.id,
                        label: each.sub_category
                    })
                }
            })
            setSubCategoryOptions(subOptions)
            setSelectedSubCategory(subOptions[0])
        }
    }, [seletctedMainCategory, subCategoryRef.current])

    useEffect(() => {
        if (selectedSubCategory) {
            if (subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields?.length === 1) {
                setAiWrittingProductName('')
            }
        }
    }, [selectedSubCategory])

    useEffect(() => {
        // console.log(selectedSubCategory)
        // console.log(copiesOptions2Category.current)
        // console.log(copiesOptions2Category.current?.find(each => each === selectedSubCategory?.value))
        if (copiesOptions2Category.current?.find(each => each === selectedSubCategory?.value)) {
            setSelectedNumberOfCopies(copiesOptions2[0])
        } else {
            setSelectedNumberOfCopies(copiesOptions[0])
        }
    }, [selectedSubCategory])

    useEffect(() => {
        const checkWritterPromptScrollbar = () => {
            const divElement = writterPromptWrapRef.current;
            if (divElement) {
                const hasScrollbar = divElement.clientHeight < divElement.scrollHeight;
                setWritterPromptHasScrollbar(hasScrollbar);
            }
        };

        const divElement = writterPromptWrapRef.current;
        if (divElement) {
            checkWritterPromptScrollbar(); // Check scrollbar initially

            // Attach event listener to recheck when the content changes
            const observer = new MutationObserver(checkWritterPromptScrollbar);
            observer.observe(divElement, { childList: true, subtree: true });

            return () => {
                observer.disconnect(); // Disconnect the observer when component unmounts
            };
        }
    }, []);

    useEffect(() => {
        if(window.location.pathname.includes('book-writing')){
            setToggleState(4)
        }
    }, [window.location.pathname])
    
    useEffect(() => {
        if(confirmedNavigation){
            // setToggleState(toggleWritingStateRef.current)
            console.log("state: "+ toggleWritingStateRef.current)
            if(toggleWritingStateRef.current === 4){
                dispatch(setBookCreationResponse(null))
                window.location.href = '/book-writing'
            }else if(lastLocation.pathname?.includes('/word-processor')){
                dispatch(setBookCreationResponse(null))
                window.location.href = '/word-processor'
            }
            // setConfirmedNavigation(false)
            // resetBookStates()
            resetBookStates()
        }
    }, [confirmedNavigation])
    

    const toggleTab = (index) => {
        let bookId = URL_SEARCH_PARAMS.get('book')
        let docId = URL_SEARCH_PARAMS.get('document-id')
        if(index !== 3) toggleWritingStateRef.current = index
        
        if(index === 4){
            history('/book-writing')
            // window.location.href = '/co-author'
            if((toggleState === 1 || toggleState === 2) && docId && !confirmedNavigation) {
                return
            }
            setToggleState(index);
        } else if(index === 3){
            history('/writer-blog/create-title', {state: { prevPath: location.pathname + location.search }})
        }else{
            if((toggleState === 1 && index === 2) || (toggleState === 2 && index === 1)) {
                setToggleState(index);
                return
            }
            // opening writer from co-author
            else{
                history(`/word-processor`)
                // window.location.href = '/word-processor'
                if(toggleState === 4 && bookId && !confirmedNavigation) {
                    console.log(toggleState)
                    console.log(confirmedNavigation)
                    return
                }
                setToggleState(index);
            }
        }
    };

    const resetBookStates = () => {
        setCoAuthorPanelView(1)
        bookCreationPanelRef.current = null
        bookChapterPanelRef.current = null
        setBookDescription("")
        setBookTitle("")
        setBookTitleList([])
        createdBookIdRef.current = null
        bookCreationObjRef.current = null
        setAuthorIdentity("")
        setSelectedGenre(null)
        setSelectedLevel(null)
        setSelectedTitle({id: null, title: ''})
    } 


    const handleGenerateBtn = () => {

        if(toggleState === 4 && coAuthorPanelView === 1){
            bookCreationPanelRef.current.createBook()
            return
        }else if(toggleState === 4 && coAuthorPanelView === 2){
            console.log('create chapter')
            return
        }

        let docParam = URL_SEARCH_PARAMS.get("document-id")
        let transcribeParam = URL_SEARCH_PARAMS.get("transcription-task")
        let taskParam = URL_SEARCH_PARAMS.get("task")
        let pdfParam = URL_SEARCH_PARAMS.get("pdf-id")

        if (toggleState === 1 && description?.trim() === '') {
            descriptionTextRef.current?.focus()
        } else if (toggleState === 2 && freeStyleDescription?.trim() === '') {
            freeStyleDescriptionTextRef.current?.focus()
        } else {
            if (createdDocumentId.current === null && transcribeParam === null && taskParam === null && pdfParam === null) {
                createNewDocument()
            }
            postAiPrompt()
        }
    }

    const postAiPrompt = () => {
        let formdata = new FormData();

        if (document.querySelector('.temp-color')) {
            // console.log(document.querySelector('.temp-color'));
            document.querySelector('.temp-color').classList.remove('temp-color')
        }

        if (createdDocumentId.current !== null || URL_SEARCH_PARAMS.get("document-id")) {
            formdata.append("document_id", createdDocumentId.current);	// document id for prompt
        }

        if (transcriptionTaskId.current !== null || URL_SEARCH_PARAMS.get("transcription-task")) {
            formdata.append("task", transcriptionTaskId.current !== null ? transcriptionTaskId.current : URL_SEARCH_PARAMS.get("transcription-task"));	// transcriptiontask id for prompt
        }

        if (URL_SEARCH_PARAMS.get("task")) {
            formdata.append("task", URL_SEARCH_PARAMS.get("task"));	// pdf task id for prompt
        }

        if (toggleState === 1) {  // for copies tab
            setPromptResultsList([])
            setIsGenerateLoading(true)
            formdata.append("description", description);
            formdata.append("catagories", seletctedMainCategory?.value);
            formdata.append("sub_catagories", selectedSubCategory?.value);
            formdata.append("Tone", selectedTone?.value);

            if (aiWrittingProductName !== null && aiWrittingProductName?.trim() !== '') {
                formdata.append("product_name", aiWrittingProductName);
            }
            if (aiWrittingKeywords !== null && aiWrittingKeywords?.trim() !== '') {
                formdata.append("keywords", aiWrittingKeywords);
            }

            formdata.append("response_copies", selectedNumberOfCopies?.value);
        } else if (toggleState === 2) {    // for freestyle tab
            setFreeStylePromptResultsList([])
            formdata.append("catagories", 9);   // for freestye the category is "9"
            setIsGenerateLoadingFreestyle(true)
            if (createdDocumentId.current !== null || URL_SEARCH_PARAMS.get("document-id")) {
                formdata.append("document_id", createdDocumentId.current);	// document id for prompt
            }
            formdata.append("description", freeStyleDescription);
        }
        formdata.append("source_prompt_lang", sourceLanguage);      // source language
        // loop based on the number of target-language
        targetLanguage?.map(each => {                               // target language
            formdata.append("get_result_in", each.id);
        })

        Config.axios({
            url: `${Config.BASE_URL}/openai/aiprompt/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                if (response.data?.id) {
                    generatedPromptId.current = response.data?.id
                    getAiPromptResult(response.data?.id)
                    if (mobLeftSideBar === true) {
                        setMobLeftSideBar(false)
                    }
                }
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true)
                    }
                    setIsGenerateLoading(false)
                    setIsGenerateLoadingFreestyle(false)
                }
                if (err.response.status === 500) {
                    Config.toast(t("paraphrase_get_error_3"), 'error')
                    setIsGenerateLoading(false)
                    setIsGenerateLoadingFreestyle(false)
                }
                setIsGenerateLoading(false)
                setIsGenerateLoadingFreestyle(false)
            }
        });
    }

    // get the ai prompt results with prompt ID
    const getAiPromptResult = (promptId) => {
        Config.axios({
            url: `${Config.BASE_URL}/openai/prompt_result/?prompt_id=${promptId}`,
            auth: true,
            success: (response) => {
                if (toggleState === 1) {
                    setPromptResultsList(response.data)
                    // console.log(response.data[0]?.prompt_results)
                    let data = []
                    Object.values(response.data[0]?.prompt_results)?.map(item => {
                        data.push({
                            data: item
                        })
                    })
                    // console.log(data)
                    var caretPosition = getCaretCharacterOffsetWithin(document.querySelector('.note-editable'))
                    var node = document.createElement('p');
                    if (caretPosition === 0) {
                        data?.map(each => {
                            each.data?.map((result, index) => {
                                if (targetLanguage?.find(each => each.id === result?.result_lang)) {
                                    pasteTextonAiWritter(result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g), index, each.data?.length)
                                }
                            })
                        })
                    } else {
                        data?.map(each => {
                            each.data?.map((result, index) => {
                                if (targetLanguage?.find(each => each.id === result?.result_lang)) {
                                    pasteTextOnCursor(result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g), index, each.data?.length)
                                }
                            })
                        })
                    }
                    setIsGenerateLoading(false)
                } else if (toggleState === 2) {
                    setFreeStylePromptResultsList(response.data)
                    let data = []
                    Object.values(response.data[0]?.prompt_results)?.map(item => {
                        data.push({
                            data: item
                        })
                    })
                    var caretPosition = getCaretCharacterOffsetWithin(document.querySelector('.note-editable'))
                    if (caretPosition === 0) {
                        data?.map(each => {
                            each.data?.map((result, index) => {
                                if (targetLanguage?.find(each => each.id === result?.result_lang)) {
                                    pasteTextonAiWritter(result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g), index, each.data?.length)
                                }
                            })
                        })
                    } else {
                        data?.map(each => {
                            each.data?.map((result, index) => {
                                if (targetLanguage?.find(each => each.id === result?.result_lang)) {
                                    pasteTextOnCursor(result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g), index, each.data?.length)
                                }
                            })
                        })
                    }
                    setIsGenerateLoadingFreestyle(false)
                }

            },
        });
    }

    function getCaretCharacterOffsetWithin(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    const containsRtlCharacters = (text) => {
        var rtlCharacters = /[\u0600-\u06FF\u0590-\u05FF\uFE70-\uFEFF]/;

        // console.log('text : ' + text)
        // console.log('rtl : ' + rtlCharacters.test(text))
        // return rtlCharacters.test(text);
        // Count the number of RTL characters and non-RTL characters
        let rtlCount = 0;
        let nonRtlCount = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (rtlCharacters.test(char)) {
                rtlCount++;
            } else {
                nonRtlCount++;
            }
        }

        // Compare the counts and return the result
        return rtlCount > nonRtlCount;
    }

    // paste on the end of the page
    const pasteTextonAiWritter = (text, index, arrLength) => {
        console.log(text)
        // console.log(editor.summernote('isEmpty'))
        // console.log(document.querySelector('.note-editable')?.innerText?.trim()?.length)
        if (document.querySelector('.note-editable')?.innerText?.trim()?.length !== 0) {
            var brNode2 = document.createElement('p');
            brNode2.innerHTML = "<br />"
            document.querySelector('.note-editable').appendChild(brNode2)
        }
        text.forEach((each) => {
            var divNode = document.createElement('div');
            var pNode = document.createElement('p');
            var brNode = document.createElement('p');
            brNode.innerHTML = "<br />"

            pNode.innerHTML = each.trim()
            pNode.className = 'temp-color'

            if (containsRtlCharacters(each)) {
                pNode.classList.add('right-align-lang-style')
            } else {
                pNode.classList.remove('right-align-lang-style')
            }

            pNode?.addEventListener('click', removeBgColor)
            // divNode.appendChild(headNode)
            // divNode.appendChild(pNode)
            document.querySelector('.note-editable').appendChild(pNode)
            document.querySelector('.note-editable').appendChild(brNode)

            // currentSummerNoteData.current = document.querySelector('.note-editable').innerHTML 
            if (arrLength - 1 === index) {
                pNode.scrollIntoView({ behavior: "smooth", block: "end" })
            }

        })
        setTimeout(() => {
            globalSaveLogic()
        }, 2000);
    }

    // paste on the cursor position
    const pasteTextOnCursor = (text, index, arrLength) => {
        // console.log(editor.summernote('isEmpty'))
        console.log(text)
        if (document.querySelector('.note-editable')?.innerText?.trim()?.length !== 0) {
            var brNode2 = document.createElement('p');
            brNode2.innerHTML = "<br />"
            editor?.summernote('insertNode', brNode2)
        }
        text.forEach((each) => {
            // var divNode = document.createElement('div');
            var pNode = document.createElement('p');
            var brNode = document.createElement('p');
            brNode.innerHTML = "<br />"
            pNode.innerHTML = each.trim()
            pNode.className = 'temp-color'
            // pNode.style = 'display: inline;'

            if (containsRtlCharacters(each)) {
                pNode.classList.add('right-align-lang-style')
            } else {
                pNode.classList.remove('right-align-lang-style')
            }

            pNode?.addEventListener('click', removeBgColor)
            // divNode.appendChild(headNode)
            // divNode.appendChild(pNode)
            editor?.summernote('insertNode', pNode)
            editor?.summernote('insertNode', brNode)
            if (arrLength - 1 === index) {
                pNode.scrollIntoView({ behavior: "smooth", block: "end" })
            }
        })
        setTimeout(() => {
            globalSaveLogic()
        }, 2000);

    }

    // to remove the background color of added prompt
    const removeBgColor = (e) => {
        // e.target.style = 'background: none;' 
        // e.target.removeEventListener('click', removeBgColor)
        e.target.classList.remove('temp-color')
        e.target.removeEventListener('click', removeBgColor)
        // currentSummerNoteData.current = document.querySelector('.note-editable').innerHTML   
    }

    const handleDescriptionText = (e) => {
        if (e.target?.value?.length <= 600) {
            setDescription(e.target?.value)
        }
    }

    const resetPromptForm = () => {
        if (toggleState === 1) { // reset templates form
            setDescription("")
            setAiWrittingProductName("")
            setAiWrittingKeywords("")
        } else {	// reset any prompt form
            setFreeStyleDescription("")
        }
    }

    const getBookDetails = (book_id, from) => {
        if(book_id === undefined || book_id === null) return
        Config.axios({
            url: `${Config.BASE_URL}/openai/bookcreation/${book_id}/`,
            method: "GET",
            auth: true,
            success: (response) => {
                if(from === 'param'){
                    setIsBookDetailsLoading(false)
                }

                let data = response.data
                bookCreationObjRef.current = data
                dispatch(setBookCreationResponse(data))
                createdBookIdRef.current = data.id
                let bookLang = languageOptionsList?.find(each => each.id === data.book_language)
                setBookLanguage(bookLang?.id)
                setBookLanguageLabel(bookLang?.language)
                setSelectedLevel(levelOptions?.find(each => each.value === data.level))
                setSelectedGenre(genreOptions?.find(each => each.value === data.genre))
                let selected_title = data.book_title_create?.find(each => each.selected_field)
                setSelectedTitle({
                    id: selected_title?.id,
                    title: selected_title?.book_title
                })
                setAuthorIdentity(data.author_info)
                setBookDescription(data.description)
                setBookTitle(data.title)
                setBookTitleList(data.book_title_create)
                chaptersCreatedRef.current = data.body_matter?.length !== 0 ? true : false
                setIsUpdatingText(false)
                setIsDeleting(false)
                // setIsGenerateLoadingFreestyle(false)
                if(chaptersCreatedRef.current){
                    setCoAuthorPanelView(2)
                }
            },
        });
    } 


    return (
        <>
            <div className="prompt-generating-sidebar">
                <div className="bloc-tabs tab-heading">
                    <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(1) }}>
                        <span className="writter-icon">
                            <GridViewSharpIcon className="grid-icon" />
                        </span>
                        <span className="text">{t("templates")}</span>
                    </div>
                    <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(2) }}>
                        <span className="writter-icon">
                            <AnyText style="any-text-icon any-prompt" />
                        </span>
                        <span className="text">{t("any_prompt")}</span>
                    </div>
                    <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(3) }}>
                        <span className="writter-icon">
                            <FeedOutlinedIcon className="feed-icon" />
                        </span>
                        <span className="text">{t("blog")}</span>
                    </div>
                    <div className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(4) }}>
                        <span className="writter-icon">
                            <CoAuthorIcon style="any-text-icon" />
                        </span>
                        <span className="text">{t("book")}</span>
                    </div>
                    {/* <div className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(4) }}  >
					Book
					</div> */}
                </div>
                <div ref={writterPromptWrapRef} className={`gen-prop-main-wrap ${writterPromptHasScrollbar ? "writter-prompt-add-margin" : ""}`}>
                    <div className="propt-gernerating-content-wrapper">
                        <h2 className="writter-prompt-title">{toggleState === 1 ? t("templates") : toggleState === 2 ? t("any_prompt") : coAuthorPanelView === 1 && t("book")}</h2>
                        {
                            (toggleState === 1 || toggleState === 2) &&
                            <div className="language-generatint-form-options">
                                <div className="language-select-wrapper">
                                    <label className="lang-promt-form-label">{t("prompt_in")}</label>
                                    {/* <Tooltip
									 arrow
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
									title={`Write in: ${sourceLabel}`} placement="top"> */}
                                    <div className="languagemodal-button" onMouseUp={() => { setshowSrcLangModal(true) }}>
                                        <span className="value">{sourceLabel}</span>
                                        <span className="icon"><i className="fas fa-caret-down"></i></span>
                                    </div>
                                    {/* </Tooltip> */}
                                </div>
                                <ArrowForwardIosIcon className="arrow-lang-icon-writer-prompt" />
                                {/* <img className="arrow-lang-icon-writer-prompt" src={Config.HOST_URL + "assets/images/new-ui-icons/arrow-lang-icon.svg"} /> */}
                                <div className="language-select-wrapper">
                                    <label className="lang-promt-form-label">{t("result_in")}</label>
                                    {/* <Tooltip 
									arrow
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
									title={`Result in: ${targetLanguageListTooltip}`} placement="top"> */}
                                    <div className="languagemodal-button" onMouseUp={() => { setshowTarLangModal(true) }}>
                                        {targetLanguage == "" ? (
                                            <span className="value">
                                                {t("result_in")}
                                            </span>
                                        ) : (
                                            <span className="value">
                                                {
                                                    targetLanguage.length === 1 ? (
                                                        targetLanguageListTooltip
                                                    ) : (
                                                        `${targetLanguage.length +
                                                        " " +
                                                        (targetLanguage.length > 1 ? t("languages") : t("language")) +
                                                        ""}`
                                                    )
                                                }
                                            </span>
                                        )}
                                        <span className="icon"><i className="fas fa-caret-down"></i></span>
                                    </div>
                                    {/* </Tooltip> */}
                                </div>
                            </div>
                        }
                        {
                            toggleState === 1 &&
                            <div className="tone-generatint-form-options prompt-form">
                                <div className="content-generatint-form-options">
                                    <div>{t("categories")}</div>
                                    <Select
                                        menuPlacement="auto"
                                        components={{ DropdownIndicator, IndicatorSeparator:() => null }}
                                        value={seletctedMainCategory}
                                        styles={customProjectTypeSelectStyles}
                                        options={categoryOptions}
                                        onChange={(selected) => setSeletctedMainCategory(selected)}
                                    />
                                </div>
                                <div className="content-generatint-form-options">
                                    <div>{t("sub_categories")}</div>
                                    <Select
                                        menuPlacement="auto"
                                        components={{ DropdownIndicator, IndicatorSeparator:() => null}}
                                        // defaultValue={{ label: "Instagram Post", value: 6 }}
                                        value={selectedSubCategory}
                                        // placeholder="Instagram Post"
                                        styles={customProjectTypeSelectStyles}
                                        options={subCategoryOptions}
                                        onChange={(selected) => setSelectedSubCategory(selected)}
                                        isDisabled={seletctedMainCategory ? false : true}
                                    />
                                </div>
                            </div>
                        }
                        {
                            (toggleState === 1) ? (
                                <div className="content-generatint-form-options">
                                    {subCategoryRef.current !== null && (
                                        subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields?.length === 1 ? (
                                            <> 
                                                <div className="title">
                                                    <span>
                                                        {subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[0]?.fields}
                                                        <span className="asterik-symbol">*</span>
                                                    </span>
                                                    <span className="words-count">{description?.length ? description?.length : 0}/600</span>
                                                </div>
                                                <textarea
                                                    placeholder={subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[0]?.help_text}
                                                    ref={descriptionTextRef}
                                                    value={description}
                                                    onChange={handleDescriptionText}
                                                    className={"prompt-generating-textarea " + (rightAlignLangId?.find(lang => lang === sourceLanguage) ? 'right-align-lang-style' : '')}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="title">
                                                    <span>
                                                        {subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[0]?.fields}
                                                    </span>
                                                    <span className="words-count">{aiWrittingProductName?.length ? aiWrittingProductName?.length : 0}/150</span>
                                                </div>
                                                <input
                                                    placeholder={subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[0]?.help_text}
                                                    ref={keywordTextRef}
                                                    className={"prompt-generating-input-keywords " + (rightAlignLangId?.find(lang => lang === sourceLanguage) ? 'right-align-lang-style' : '')}
                                                    value={aiWrittingProductName}
                                                    onChange={(e) => { e.target?.value?.length <= 150 && setAiWrittingProductName(e.target.value) }}
                                                />
                                                <div className="title" style={{ marginTop: '20px', marginBottom: '9px' }}>
                                                    <span>
                                                        {subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[1]?.fields}
                                                        <span className="asterik-symbol">*</span>
                                                    </span>
                                                    <span className="words-count">{description?.length ? description?.length : 0}/600</span>
                                                </div>
                                                <textarea
                                                    placeholder={subCategoryRef.current?.find(each => each.id === selectedSubCategory?.value)?.sub_category_fields[1]?.help_text}
                                                    ref={descriptionTextRef}
                                                    value={description}
                                                    onChange={handleDescriptionText}
                                                    className={"prompt-generating-textarea " + (rightAlignLangId?.find(lang => lang === sourceLanguage) ? 'right-align-lang-style' : '')}
                                                />
                                            </>
                                        )
                                    )}
                                </div>
                            ) : (toggleState === 2) ? (
                                <div className="content-generatint-form-options">
                                    <div className="title"><span>{t("topic")}<span className="asterik-symbol">*</span></span> <span className="words-count">{freeStyleDescription?.length ? freeStyleDescription?.length : 0}/1000</span></div>
                                    <textarea
                                        placeholder={t("write_descriptive_create")}
                                        ref={freeStyleDescriptionTextRef}
                                        value={freeStyleDescription}
                                        onChange={(e) => { e.target?.value?.length <= 1000 && setFreeStyleDescription(e.target.value) }}
                                        className={"prompt-generating-textarea " + (rightAlignLangId?.find(lang => lang === sourceLanguage) ? 'right-align-lang-style' : '')}
                                    />
                                </div>
                            ) : null
                        }
                        {
                            toggleState === 1 &&
                            <div className="content-generatint-form-options">
                                <div className="title">{t("include_words")} <span className="words-count">{aiWrittingKeywords?.length ? aiWrittingKeywords?.length : 0}/200</span></div>
                                <input
                                    placeholder={t("keywords_placeholder")}
                                    ref={keywordTextRef}
                                    className={"prompt-generating-input-keywords " + (rightAlignLangId?.find(lang => lang === sourceLanguage) ? 'right-align-lang-style' : '')}
                                    value={aiWrittingKeywords}
                                    onChange={(e) => { e.target?.value?.length <= 200 && setAiWrittingKeywords(e.target.value) }}
                                />
                            </div>
                        }
                        {
                            toggleState === 1 &&
                            <div className="tone-generatint-form-options last-select-row prompt-form">
                                <div className="content-generatint-form-options">
                                    <div>{t("select_tone")}</div>
                                    <Select
                                        style={{ background: 'red' }}
                                        menuPlacement="auto"
                                        components={{ DropdownIndicator, IndicatorSeparator:() => null }}
                                        options={toneOptions}
                                        value={selectedTone}
                                        default={toneOptions[0]}
                                        styles={customProjectTypeSelectStyles}
                                        onChange={(selected) => setSelectedTone(selected)}
                                    />
                                </div>
                                <div className="content-generatint-form-options">
                                    <div>{t("copies")}</div>
                                    <Select
                                        menuPlacement="auto"
                                        components={{ DropdownIndicator, IndicatorSeparator:() => null }}
                                        value={selectedNumberOfCopies}
                                        default={copiesOptions[0]}
                                        options={copiesOptions2Category.current?.find(each => each === selectedSubCategory?.value) ? copiesOptions2 : copiesOptions}
                                        styles={customProjectTypeSelectStyles}
                                        onChange={(selected) => setSelectedNumberOfCopies(selected)}
                                    />
                                </div>
                            </div>
                        }
                        {(toggleState === 4 && isBookDetailsLoading) ? (
                            <>
                                <div className="panel-view-loader-wrapper">
                                    <div className="panel-view-inner-loader">
                                        <FacebookCircularProgress/>
                                    </div>
                                </div>
                            </>
                        )
                        : toggleState === 4 && (
                            coAuthorPanelView === 1 ? (
                                <CoAuthorPanel 
                                    getBookDetails={getBookDetails}
                                    createdBookIdRef={createdBookIdRef}
                                    selectedLevel={selectedLevel}
                                    setSelectedLevel={setSelectedLevel}
                                    selectedGenre={selectedGenre}
                                    setSelectedGenre={setSelectedGenre}
                                    authorIdentity={authorIdentity}
                                    setAuthorIdentity={setAuthorIdentity}
                                    bookDescription={bookDescription}
                                    setBookDescription={setBookDescription}
                                    bookTitle={bookTitle}
                                    setBookTitle={setBookTitle}
                                    selectedTitle={selectedTitle}
                                    setSelectedTitle={setSelectedTitle}
                                    bookTitleList={bookTitleList}
                                    setBookTitleList={setBookTitleList}
                                    chaptersCreatedRef={chaptersCreatedRef}

                                    setshowSrcLangModal={setshowSrcLangModal}
                                    bookLanguage={bookLanguage}
                                    setBookLanguage={setBookLanguage}
                                    bookLanguageLabel={bookLanguageLabel}
                                    setBookLanguageLabel={setBookLanguageLabel}
                                    bookCreationPanelRef={bookCreationPanelRef}
                                    setIsGenerateLoadingFreestyle={setIsGenerateLoadingFreestyle}
                                    setCoAuthorPanelView={setCoAuthorPanelView}
                                    setShowCreditAlertModal={setShowCreditAlertModal}
                                />
                            ) : (
                                <ChapterPanel 
                                    getBookDetails={getBookDetails}
                                    createdBookIdRef={createdBookIdRef}
                                    coAuthorPanelView={coAuthorPanelView}
                                    bookChapterPanelRef={bookChapterPanelRef}
                                    bookCreationObjRef={bookCreationObjRef}
                                    closeOverlay={closeOverlay}
                                    showOverlay={showOverlay}
                                    isUpdatingText={isUpdatingText}
                                    setIsUpdatingText={setIsUpdatingText}
                                    isDeleting={isDeleting}
                                    setIsDeleting={setIsDeleting}
                                    setShowCreditAlertModal={setShowCreditAlertModal}
                                />
                            )
                        )}
                    </div>
                    {(toggleState !== 4 || coAuthorPanelView !== 2) && (
                        <div className={`tone-generatint-form-options ${writterPromptHasScrollbar ? "sticky-bottom-button" : ""}`}>
                            {
                                toggleState !== 4 &&
                                <button className="prompt-reset-btn" onClick={resetPromptForm}>
                                    <img src={ReloadIcon} alt="reload" />
                                    <span className="text">{t("reset")}</span>
                                </button>
                            }
                            <button className="aiGeneratingButtonFull" onMouseUp={() => handleGenerateBtn() } disabled={toggleState === 1 ? isGenerateLoading : isGenerateLoadingFreestyle}>
                                <div className="generating-button paste-but" style={{ display: "flex", alignItem: "center", gap: "5px" }}>
                                    <div className="text-center">
                                        {(toggleState === 1 ? isGenerateLoading : isGenerateLoadingFreestyle) && (
                                            <div className="save-btn-spinner">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        )}
                                        {(toggleState === 1 ? isGenerateLoading : isGenerateLoadingFreestyle) ? t("generating") : toggleState === 4 ? t("generate_chapters") : t("generate")}
                                    </div>
                                    <img src={DoubleArrowIcon} className="generate-icon" alt="right-arrow" />
                                </div>
                            </button>
                         {/* <button onClick={() => moveResultToEditor()}>click</button> */}
                     </div>
                    )}
                   
                    {/* <VoiceEditorInstantTranslate 
						isListening={isListening}
						setIsListening={setIsListening}
						editor={editor}
						/> */}
                    {/* {(toggleState === 1 ? promptResultsList?.length : freeStylePromptResultsList?.length) !== 0 && 
						<div className="content-generatint-form-options">
							<div>Result</div>
							{Object.values(toggleState === 1 ? promptResultsList[0]?.prompt_results : freeStylePromptResultsList[0]?.prompt_results)?.map((item) => {
								return item?.map((result) => {
									return (
										<div className="result-textarea-wrapper">
											<p dangerouslySetInnerHTML={{__html: result?.api_result !== null ? result?.api_result?.replace(/\n/g, "<br />") : result?.translated_prompt_result?.replace(/\n/g, "<br />")}}></p>
											<div className="result-toolbar">
												<div className="word-container">{targetLanguageOptionsRef.current?.find(each => each.id === result?.result_lang)?.language}</div>
												<div className="word-container">{countWords(result?.api_result !== null ? result?.api_result : result?.translated_prompt_result) + " words"}</div>
												<div className="result-icon-innerWrap">
													<AilaysaTooltip title="Delete" placement="top">
														<div className="result-icon-single-item" onMouseUp={() => deleteAiWrittingPrompt('obj_id', result?.id, null, 'prompt-form')}>
															<img src={Config.HOST_URL + "assets/images/new-ui-icons/assets-delete-icon.svg"} />
														</div>
													</AilaysaTooltip>
													<AilaysaTooltip title="Copy" placement="top">
														<div className="result-icon-single-item" onMouseUp={() => handleTextCopy(result?.api_result !== null ? result?.api_result : result?.translated_prompt_result)}>
															<ContentCopyIcon className="icons" />
														</div>
													</AilaysaTooltip>
													<AilaysaTooltip title="Move to editor" placement="top">
														<div className="result-icon-single-item" onMouseUp={() => moveResultToEditor(result?.api_result !== null ? result?.api_result?.replace(/\n/g, "<br />") : result?.translated_prompt_result?.replace(/\n/g, "<br />"))}>
															<KeyboardDoubleArrowRightIcon className="icons"/>
														</div>
													</AilaysaTooltip>
												</div>
											</div>
										</div>
									)
								})
							})} 
						</div>
					}  */}

                    {/* <CustomBookTooltip /> */}
                    <PromptLibraryModal />
                    <LangSelectorDropDown langList={languageOptionsList} />
                </div>
            </div>
        </>
    )
}

export default WritterPromptForm;
