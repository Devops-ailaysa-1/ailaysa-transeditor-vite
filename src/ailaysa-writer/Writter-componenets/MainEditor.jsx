import React, { useEffect, useLayoutEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'summernote/dist/summernote-bs4';

import 'summernote/dist/summernote-bs4.css';
import { FontFamilyList2 } from "./WritterData";
import Config from "../../vendor/Config";
import Radio from '@mui/material/Radio';
import Draggable from "react-draggable";
import CloseIcon from '@mui/icons-material/Close';
// import { PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import DescriptionIcon from '@mui/icons-material/Description';
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
// import DOMPurify from 'isomorphic-dompurify';
import VoiceEditorInstantTranslate from "../../project-setup-components/translate-component/text/VoiceEditorInstantTranslate";
// import  replaceTag  from 'replace-tags';
// import { TransliterationProvider } from "../google-input-tools/transliteration-provider";
// import "../google-input-tools/styles/style.scss";
// import Popover from '@mui/material/Popover';
// import Draggable, { DraggableCore } from 'react-draggable';
// import { DragIndicator } from '@mui/icons-material';
import { count } from 'letter-count';
import Cookies from "js-cookie";
import { ImageGeneratingLoader } from "../../loader/ImageGeneratingLoader";
import sanitizeHtml from 'sanitize-html-react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import { setDefaultSettings } from "../../features/CustomizationSettingsSlice";
import VoiceTyping from '../../vendor/custom-component/VoiceTyping'
import { setWriterWordCount } from "../../features/writer-slices/WriterWordCountSlice";
import { setWriterRangeObject } from "../../features/writer-slices/WriterRangeObjectSlice";
import generateKey from "../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import DiscardPopup from "../../assets/images/new-ui-icons/discard-popup.svg"
import DonePopup from "../../assets/images/new-ui-icons/done-popup.svg"
import ReplacePopup from "../../assets/images/new-ui-icons/replace-popup.svg"
import CopyPopup from "../../assets/images/new-ui-icons/copy-popup.svg"

const MainEditor = (props) => {
    let {
        setEditor,
        summerNoteEditorRef,
        popoverContentSwitch,
        selectedCustomization,
        customizationResult,
        handleCustomizationPopoverCloseBtn,
        replaceWithNewText,
        getAiCustomizationResult,
        popupLoading,
        enableTabFunctionRef,
        setNewline,
        newline,
        saveHtmlDataForDocument,
        checkSelection,
        debounce,
        isInitialHtmlDataLoaded,
        saveHtmlDataForPdf,
        createdDocumentId,
        transcriptionTaskId,
        pdfTaskId,
        saveTranscriptionData,
        createNewDocument,
        setMoreToolsContentSwitch,
        currentSummerNoteTextData,
        documentNameRef,
        setResetToNewDoc,
        setShowDocumentListModal,
        uploadImagesToServer,
        bookMatterItemSaveLogic,
        promptMainWrapper,
        isCopiedFromSummernoteRef,
        selectedCustomizationCategoryRef,
        moveToEditor,
        summernoteRangeRef
    } = props

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const defaultSettings = useSelector((state) => state.customizationSetting.value)

    const [state, setState] = useState({
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: -400, y: 200
        }
    });
    

    useEffect(() => {
        // Append div structure to the .note-editing-area
        const noteEditingArea = document.querySelector('.note-editable');
        if (noteEditingArea) {
            const wrapperDiv = document.createElement('div');
            const outerDiv = document.createElement('div');
            wrapperDiv.classList.add('note-editable-class-wrapper');
            outerDiv.classList.add('note-editable-backdrop');
            wrapperDiv.appendChild(outerDiv);
            noteEditingArea.parentNode.insertBefore(wrapperDiv, noteEditingArea);
            wrapperDiv.appendChild(noteEditingArea);

            $(".note-handle").appendTo(".note-editable-class-wrapper");
        }
    }, [document.querySelector('.note-editable')])

    // useEffect(() => {
    //     const noteEditingWrapper = document.querySelector('.note-editable-class-wrapper');
        
    //     if (noteEditingWrapper) {
    //         noteEditingWrapper.style.transform = 'scale(' + zoomLevel + ')';
    //         if(zoomLevel < 1) {
    //             noteEditingWrapper.style.transformOrigin = "top";
    //             if(leftSideBar && rightSideBar && deskLeftSideBar){
    //                 noteEditingWrapper.style.setProperty("width", "inherit", "important");
    //             }else{
    //                 noteEditingWrapper.style.setProperty("width", "920px", 'important');
    //             }
    //         } else {
    //             noteEditingWrapper.style.transformOrigin = "0 0";
    //             // reset to default width of the writing area
    //             noteEditingWrapper.style.setProperty("width", "920px", 'important');
    //         }
    //     }
    // }, [document.querySelector('.note-editable-class-wrapper'), zoomLevel, leftSideBar, rightSideBar, deskLeftSideBar])
   
    
    const onStart = () => {
        const { activeDrags } = state;
        setState({ ...state, activeDrags: activeDrags + 1 });
    };
    const onStop = () => {
        const { activeDrags } = state;
        setState({ ...state, activeDrags: activeDrags - 1 });
    };

    const dragHandlers = { onStart, onStop };

    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const history = useNavigate();
    const location = useLocation()

    const [voiceDictationLangState, setVoiceDictationState] = useState('en')
    const [voiceDictationLangStateLabel, setVoiceDictationStateLabel] = useState('English')
    const [isCopied, setIsCopied] = useState(false)
    const [specialCharacters, setSpecialCharacters] = useState([
        "؋",
        "฿",
        "₵",
        "₡",
        "¢",
        "$",
        "₫",
        "֏",
        "€",
        "ƒ",
        "₣",
        "₲",
        "₴",
        "₭",
        "₺",
        "₼",
        "₦",
        "₱",
        "£",
        "元",
        "圆",
        "圓",
        "﷼",
        "៛",
        "₽",
        "₹",
        "Rp",
        "රු",
        "૱",
        "௹",
        "₨",
        "₪",
        "৳",
        "₸",
        "₮",
        "₩",
        "¥",
        "円",
    ]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showSpecialCharacterModal, setShowSpecialCharacterModal] = useState(false)

    const [savedSelection, setSavedSelection] = useState(null)
    const [isTextSelected, setIsTextSelected] = useState(false)
    const [initialDragPosition, setInitialDragPosition] = useState({ x: 0, y: 0 })
    const [isListening, setIsListening] = useState(false);
    const [setAsDefault, setSetAsDefault] = useState(false);
    // const [defaultCustomizationSettings, setDefaultCustomizationSettings] = useState(defaultSettings)

    const [spellCheckWordsOptions, setSpellCheckWordsOptions] = useState([]);
    const [spellCheckSuggestion, setSpellCheckSuggestion] = useState([])
    const [rectElement, setRectElement] = useState(null);
    
    const [viewPortText, setviewPortText] = useState(null);

    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const selectedTextElement = useRef(null)
    const draggableEntity = useRef(null)
    const recognition = useRef(null)
    
    const spellCheckResponseRef = useRef([])
    const clickedWrongWordRef = useRef(null)
    const clickedMarkEleRef = useRef(null)
    const isSpellCheckEnableRef = useRef(true)
    const showSpecialCharacterModalRef = useRef(false)
    
    const directChildRef = useRef(null)
    
    const copiedContentRef = useRef(null)
    const contenteditableViewPortTextRef = useRef("")
    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAndOpen = (event) => {
        if (anchorEl == null) {
            setAnchorEl(event.currentTarget);
            setMoreToolsContentSwitch(false)

        }
        else {
            setAnchorEl(null);
            setMoreToolsContentSwitch(false)

        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const imgNode = useRef()

    const countWords = (count) => {
        if (count?.length === 0) {
            return 0;
        } else {
            count = count?.replace(/(^\s*)|(\s*$)/gi, "");
            count = count?.replace(/[ ]{2,}/gi, " ");
            count = count?.replace(/\n /, "\n");
            return count?.split(' ')?.length;
        }
    }


    function convertUnitsToPt(htmlString) {
        const pxToPtRatio = 0.75; // 1px = 0.75pt
        const remToPxRatio = 16; // 1rem = 16px
        const regexRem = /(\d*\.?\d+)rem/g; // matches any number followed by "rem"
        const regexPx = /(\d*\.?\d+)px/g; // matches any number followed by "px"
        return htmlString.replace(regexRem, (_, remValue) => `${remValue * remToPxRatio}pt`)
            .replace(regexPx, (_, pxValue) => `${pxValue * pxToPtRatio}pt`);
    }


    function convertFontSizeToPt(htmlString) {
        const pxToPtRatio = 0.75; // 1px = 0.75pt
        const remToPxRatio = 16; // 1rem = 16px
        const regex = /font-size:\s*(\d*\.?\d+)(rem|px)/g; // matches "font-size:", followed by a number and either "rem" or "px"
        return htmlString.replace(regex, (_, p1, p2) => `font-size:${parseFloat(p1) * (p2 === 'rem' ? remToPxRatio : 1) * pxToPtRatio}pt`);
    }

    function removeImgTags(htmlString) {
        // Create a temporary div element
        const tempDiv = document.createElement('div');
        // Set the HTML content of the div
        tempDiv.innerHTML = htmlString;
        // Remove all <img> elements
        tempDiv.querySelectorAll('img').forEach(img => img.remove());
        // Return the cleaned HTML content
        return tempDiv.innerHTML;
      }
    
      function removeFormElements(htmlString) {
        // Create a temporary div element
        const tempDiv = document.createElement('div');
        // Set the HTML content of the div
        tempDiv.innerHTML = htmlString;
        // Remove all form elements: input, checkbox, and button
        tempDiv.querySelectorAll('input, checkbox, button').forEach(element => element.remove());
        // Return the cleaned HTML content
        return tempDiv.innerHTML;
      }

      function unwrapDivAndKeepPTags(htmlString) {
        // Create a temporary element to parse the HTML string
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;
      
        // Unwrap div tags
        const divChildren = Array.from(tempElement.querySelectorAll('div'));
        divChildren.forEach(div => {
          while (div.firstChild) {
            div.parentNode.insertBefore(div.firstChild, div);
          }
          div.parentNode.removeChild(div);
        });
      
        // Get the innerHTML of the temporary element which now contains only p tags
        const resultHTML = tempElement.innerHTML;
      
        // Return the result
        return resultHTML;
      }

    useEffect(() => {
        // customFn()
        $('.summernote').summernote({
            callbacks: {
                onPaste: async function (e) {
            
                    var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                    var pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
                    const sanitizedHtml1 = copiedContentRef.current?.replace(/\s/g, '');
                    const sanitizedHtml2 = pastedData?.replace(/\s/g, '');
       
                    // if(sanitizedHtml1 != sanitizedHtml2){
                    //     isCopiedFromSummernoteRef.current = false
                    // }
                    // if(isCopiedFromSummernoteRef.current){
                        e.preventDefault()

                        // Get the pasted content as HTML
                        // below two line are very important it gets the clipboard value from noramlly and manually copied data
                        var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                        var pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
                        // // console.log(pastedData)
                        // // var pastedHTML = (e.originalEvent || e).clipboardData.getData('text/html');
    
                        // // Create a temporary div to parse and clean the pasted content
                        // var tempDiv = document.createElement('span');
                        // tempDiv.innerHTML = pastedData;
                        // // Remove inline styles and attributes from all elements
                        // var elementsWithStyles = tempDiv.querySelectorAll('*[style]');
                        // elementsWithStyles.forEach(function(element) {
                        //     element.removeAttribute('style');
                        // });

                        const clean = sanitizeHtml(pastedData, {
                            allowedTags: ["div","table", "tbody", "td", "tfoot", "th", "thead", "tr",'b', 'i','p','h1','h2','h3','h4','h5','h6','a','img','span','li','ul','ol'],
                            // allowedAttributes: {
                            //   'p': ["style"],
                            // },
                            allowedStyles: {
                              '*': {
                                // Match HEX and RGB
                                'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                                'text-align': [/^left$/, /^right$/, /^center$/],
                                // Match any number with px, em, or %
                                // 'font-size': [/^\d+(?:px|em|%)$/]
                              },
                              
                            }
                          });

                          console.log(clean)

                          const allowedDomain = 'https://aidev4.ailaysa.com';
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(clean, 'text/html');
                            const images = doc.querySelectorAll('img');

                            images.forEach(img => {
                            const src = img.getAttribute('src');
                            if (!src.startsWith(allowedDomain)) {
                                img.remove();
                            }
                            });

                            const sanitizedHtmlString = doc.body.innerHTML;
                            console.log(sanitizedHtmlString);
    
                        // Insert the cleaned HTML into the contenteditable div
                        // var cleanedHTML = tempDiv.innerHTML;
                        // var clean = removeFormElements(removeImgTags(cleanedHTML))
                        // console.log(unwrapDivAndKeepPTags(cleanedHTML))
                        document.execCommand('insertHTML', false, sanitizedHtmlString);
                        // $('summernote').summernote('pasteHTML', cleanedHTML)
                    // }
                    // if(sanitizedHtml1 != sanitizedHtml2){
                    //     isCopiedFromSummernoteRef.current = false
                    // }



                    // var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                    // var pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
                    // let plain_text = clipboardData.getData('text/plain')
                    // // Remove unwanted styles and retain basic formatting
                    // var tempDiv = document.createElement('div');
                    // tempDiv.innerHTML = pastedData;

                    // // console.log(plain_text)

                    // // Change <pre> tags to <p> tags
                    // var preTags = tempDiv.querySelectorAll('pre');
                    // for (var j = 0; j < preTags.length; j++) {
                    //     var preTag = preTags[j];
                    //     var pTag = document.createElement('p');
                    //     pTag.innerHTML = preTag.innerHTML;
                    //     preTag.parentNode.replaceChild(pTag, preTag);
                    // }

                    // // Remove any styles from the pasted content and retain basic formatting
                    // var cleanedContent = tempDiv.innerHTML.replace(/<div>/gi, '').replace(/<\/div>/gi, '');
                    // let p_tag = document.createElement('p')
                    // p_tag.innerHTML = cleanedContent
                    // // Insert the cleaned content into the Summernote editor
                    // $('.summernote').summernote('insertNode', p_tag);

                    // // Prevent default paste behavior
                    // e.preventDefault();

                    // setTimeout(() => {
                    //     // console.log(containsRtlCharacters(plain_text))
                    //     if (containsRtlCharacters(plain_text)) {
                    //         p_tag.classList.add('right-align-lang-style')
                    //     } else {
                    //         p_tag.classList.remove('right-align-lang-style')
                    //     }

                    // }, 100);



                    // var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData || window.clipboard).getData('text/html');
                    // var plain_text = ((e.originalEvent || e).clipboardData || window.clipboardData || window.clipboard).getData('text/plain');
                    // console.log(bufferText)
                    // e.preventDefault();
                    // if (bufferText !== '') {
                    //     var div = $('<p />');
                    //     div.append(bufferText);
                    //     div.find('*').removeAttr('style');
                    //     console.log(div)
                    //     setTimeout(function () {
                    //         document.execCommand('insertNode', false, div);
                    //     }, 10);

                    // } else {
                    //     navigator.clipboard.readText()
                    //         .then(text => {
                    //             setTimeout(function () {
                    //                 console.log(e.target)

                    //                 $('.summernote').summernote('insertText', text)
                    //             }, 10);
                    //         })
                    //         .catch(err => {
                    //             console.error('Failed to read clipboard contents: ', err);
                    //         });
                    // }
                },
                onEnter: function () {
                    if (document.querySelector('.temp-color')) {
                        document.querySelector('.temp-color').classList.remove('temp-color')
                    }

                    if (document.querySelector('.tab-to-write-more-tooltip')) {
                        document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden"

                    }

                },
                onChange: function (e) {
                    
                    currentSummerNoteTextData.current = count(document?.querySelector('.note-editable')?.innerText.replace(/\n/g, '')).chars
                    // console.log("char: "+currentSummerNoteTextData.current)
                    // console.log(document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== ''))
                    // console.log("word: "+document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length)
                    dispatch(setWriterWordCount({
                        char: (currentSummerNoteTextData.current !== null && currentSummerNoteTextData.current !== undefined) ? currentSummerNoteTextData.current : 0,
                        word: document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length !== undefined ? document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length : 0
                    }))
                    // console.log(currentSummerNoteTextData.current)
                    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

                    let isCoAuthor = window.location.pathname.includes('book-writing')
                    let item_id = URL_SEARCH_PARAMS.get('item')
                    let matter = URL_SEARCH_PARAMS.get('matter')
                    let isStreaming = URL_SEARCH_PARAMS.get('streaming') ? true : false

                    if(isCoAuthor && item_id && matter && !isStreaming){
                        debounce(bookMatterItemSaveLogic)
                    }
                    if (!isInitialHtmlDataLoaded.current && !isCoAuthor) {
                        // console.log(createdDocumentId.current);
                        console.log(window.location.pathname)
                        if ((window.location.pathname != '/word-processor/article/') && (window.location.pathname != '/book-writing')) {
                            if (URL_SEARCH_PARAMS.get("pdf-id") || URL_SEARCH_PARAMS.get("task")) {
                                debounce(saveHtmlDataForPdf)
                                // saveHtmlDataForPdf()
                            } else if (createdDocumentId.current) {
                                debounce(saveHtmlDataForDocument)
                                // saveHtmlDataForDocument()
                            } else if (URL_SEARCH_PARAMS.get("transcription-task")) {
                                debounce(saveTranscriptionData)
                                // saveTranscriptionData()
                            }
                            else {
                                debounce(createNewDocument)
                                // createNewDocument()
                            }
                        }
                    }

                    // Get the parent div element
                    const parentDiv = document.querySelector('.note-editable');

                    // Get direct child p tags within the parent div
                    const pTags = Array.from(parentDiv.children).filter(function (element) {
                        return element.tagName.toLowerCase() === 'p';
                    });
                    // console.log(pTags)
                    // Loop through the selected p tags and perform actions
                    pTags.forEach(function (pTag) {
                        // Access each p tag and perform actions
                        // console.log(pTag.textContent);
                        // console.log(pTag);
                        if (containsRtlCharacters(pTag.textContent)) {
                            pTag.classList.add('right-align-lang-style')
                        }
                        // else {
                        //     pTag.classList.remove('right-align-lang-style')
                        // }
                    });
                    // let range = window.getSelection().getRangeAt(0)
                    // let current_node = range?.commonAncestorContainer?.parentElement
                    // let current_text = range?.commonAncestorContainer?.parentElement?.innerText

                    // if (current_text?.trim() !== '' && current_text?.trim()?.length >= 3) debounce(() => detectLanguage(current_text, current_node))
                    let htmlContent = document.querySelector('.note-editable')?.innerHTML
                    // document.querySelector('.note-editable-backdrop').innerHTML = htmlContent
                    // Config.debounceApiCalls(symSpellCheck)

                },
                onScroll: function () {
                    // checkSelection()
                    props.debounceApiCall()
                },
                onFocus: function () {
                    var htmlContent = $('.summernote').summernote('code');
                    let clean = sanitizeHtml(htmlContent, {
                        allowedTags: false,
                        allowedAttributes: false,
                        transformTags: {
                            'font': function (tagName, attribs) {

                                let c = attribs?.color ? attribs?.color : ''
                                let s = attribs?.style ? attribs.style : ''


                                return {
                                    tagName: 'span',
                                    attribs: {
                                        style: "color:'" + c + "';" + s,
                                    }
                                };
                            }
                        }
                    });
                },
                onInit: function () {
                    document.querySelector('.word-count-number').innerHTML = 0
                },
                onImageUpload: async function (files) {

                    let name = files[0]?.name;
                    let img = new Image()
                    img.src = window.URL.createObjectURL(files[0])
                    img.onload = () => {
                        let loaderPTag = document.createElement('p')
                        loaderPTag.classList.add('skeleton-box', 'img-loader-tag')
                        let width = window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('width').replaceAll('px', '') - (window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('padding-left').replaceAll('px', '') * 2)

                        if (img.width > width) {
                            loaderPTag.style.setProperty('width', `100%`)
                            loaderPTag.style.setProperty('height', `${img.height*(width/img.width)}px`)
                        } else {
                            loaderPTag.style.setProperty('width', img.width)
                            loaderPTag.style.setProperty('height', img.height)
                        }


                        // console.log(img.width, img.height)
                        // $('.summernote').summernote("insertNode", loaderPTag);
                    }
                    let lastDot = name?.lastIndexOf(".");
                    let ext = "." + name?.substring(lastDot + 1);
                    if (ext?.toLowerCase() !== ".png" && ext?.toLowerCase() !== ".jpg" && ext?.toLowerCase() !== ".jpeg") {
                        Config.toast('Only .png, .jpg and .jpeg files are supported', 'warning')
                        return;
                    }
                    let isCoAuthor = window.location.pathname.includes('book-writing')

                    if (!isCoAuthor && createdDocumentId.current == null && URL_SEARCH_PARAMS.get("document-id") == null && transcriptionTaskId.current == null && pdfTaskId.current == null) {
                        createNewDocument('image-upload', files)
                    } else {
                        uploadImagesToServer(files)
                    }

                },
                onMediaDelete: async function (target) {
                    deleteImageFromServer(target[0])
                },
                onBlur: function () {

                },
                onKeyup: function (e) {
                    if (document.querySelector('.note-editable').innerHTML.length === 0) {
                        $('.summernote').summernote('formatPara');
                        
                    }
                    changeParagraphStyleDropDownLabel(e)
                    if ($('.summernote').summernote('isEmpty') === false && imgNode?.current?.nodeName === 'IMG') {
                        if (e.key === 'Delete') {
                            e.preventDefault()
                            deleteImageFromServer(imgNode?.current) // remove the image from server
                            imgNode?.current?.remove()  // remove the image from DOM
                            $('.summernote').summernote('focus');
                            $('.summernote').summernote('insertText', '');
                        }
                        if ((e.ctrlKey || e.metaKey) && e.keyCode == 67) {
                            // Do stuff.
                            e.preventDefault()
                            // navigator.clipboard.writeText(node);
                            copyImage(imgNode?.current?.src)
                        }
                        if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) {
                            e.preventDefault()
                            copyImage(imgNode?.current?.src)
                            setTimeout(() => {
                                imgNode?.current?.remove()
                                deleteImageFromServer(imgNode?.current) // remove the image from server
                                $('.summernote').summernote('focus');
                                $('.summernote').summernote('insertText', '');
                            }, 150);
                            // Do stuff.
                        }
                    }
                },
                


            },
            disableDragAndDrop: true,
            spellCheck: true,
            disableGrammar: false,
            // toolbar: true,
            // placeholder: URL_SEARCH_PARAMS.get('blog_creation') === null ? 'Write your content or prompt here.' : '',
            popatmouse: true,
            popover: {
                image: [
                    ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                    ['float', ['floatLeft', 'floatRight', 'floatNone']],
                    ['remove', ['removeMedia']]
                ],
                link: [
                    ['link', ['linkDialogShow', 'unlink']]
                ],
                table: [
                    ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                    ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
                ],
                air: [
                    ['color', ['color']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['para', ['ul', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture']]
                ]
            },
            focus: true,
            dialogsInBody: true,
            // fontNames: FontFamilyList2,
            // fontNamesIgnoreCheck: FontFamilyList2, 
            // fontSizeUnits: ['pt', 'px'],
            toolbar: [
                // ['mybutton', ['copy','paste','pasteFormat',]],
                Config.userState?.internal_member_team_detail?.role !== 'Editor' && ['document', ['newDoc', 'openDoc']],
                // ['style', ['style']],
                ['style', ['undo', 'redo']],
                ['style', ['styleDropdown']],
                ['style', ['bold', 'italic', 'underline']],
                ['font', ['superscript', 'subscript']],
                ['color', ['forecolor']],
                // ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['link']],
                ['para', ['specialChar']],
                ['style', ['clear']],
                // ['cleaner',['cleaner']], // The Button
                // ['dictation', ['voice', 'voiceLang']],

                // word supported highlighter colors
                // ['#008080', '#FFFF00', '#00FF00', '#30D5C8', '#FFC0CB', '#0000FF', '#808080', '#00008B', '#8F00FF', '#AAFF00', '#8B0000', '#8B8000', '#5A5A5A', '#000000']

                // ['fontname', ['fontname  ', 'fontsize']],
                // ['para', ['ul', 'ol', 'paragraph']],
                // ['height', ['height']],
                // ['table', ['table']],
                // ['transliterate', ['ime']]
                // ['more', ['more']]
                // ['view', ['fullscreen', 'codeview', 'help']],
                // ['help',['help']],
                // ['paperSize',['paperSize']],
                // ['pagebreak',['pagebreak']],
            ],
            icons: {
                eraser: 'fas fa-remove-format',
            },
            fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '82', '150'],
            buttons: {
                newDoc: newDocumentButton,
                openDoc: openDocumentButton,
                // // paste: PasteButton,
                // // copy: copyButton,
                // // pasteFormat: PasteButtonWithFormate,
                voice: voiceDictateButton,
                voiceLang: voiceLangDropDown,
                styleDropdown: styleDropdown,
                specialChar: showSpecialCharacters,
                // myIndent: indentButton,
                // myOutdent: outdentButton,
                // spellCheckBtn: spellCheckButton,
                // ime: transliterationButton,
                // more:moreDropDown
            },
            // cleaner: {
            //     action: 'both', // both|button|paste 'button' only cleans via toolbar button, 'paste' only clean when pasting content, both does both options.
            //     icon: '<i class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" id="libre-paintbrush" viewBox="0 0 14 14" width="14" height="14"><path d="m 11.821425,1 q 0.46875,0 0.82031,0.311384 0.35157,0.311384 0.35157,0.780134 0,0.421875 -0.30134,1.01116 -2.22322,4.212054 -3.11384,5.035715 -0.64956,0.609375 -1.45982,0.609375 -0.84375,0 -1.44978,-0.61942 -0.60603,-0.61942 -0.60603,-1.469866 0,-0.857143 0.61608,-1.419643 l 4.27232,-3.877232 Q 11.345985,1 11.821425,1 z m -6.08705,6.924107 q 0.26116,0.508928 0.71317,0.870536 0.45201,0.361607 1.00781,0.508928 l 0.007,0.475447 q 0.0268,1.426339 -0.86719,2.32366 Q 5.700895,13 4.261155,13 q -0.82366,0 -1.45982,-0.311384 -0.63616,-0.311384 -1.0212,-0.853795 -0.38505,-0.54241 -0.57924,-1.225446 -0.1942,-0.683036 -0.1942,-1.473214 0.0469,0.03348 0.27455,0.200893 0.22768,0.16741 0.41518,0.29799 0.1875,0.130581 0.39509,0.24442 0.20759,0.113839 0.30804,0.113839 0.27455,0 0.3683,-0.247767 0.16741,-0.441965 0.38505,-0.753349 0.21763,-0.311383 0.4654,-0.508928 0.24776,-0.197545 0.58928,-0.31808 0.34152,-0.120536 0.68974,-0.170759 0.34821,-0.05022 0.83705,-0.07031 z"/></svg></i>',
            //     keepHtml: true,
            //     webify: true,
            //     notStyle: 'position:absolute;top:0;left:0;right:0', // Position of Notification
            //     // newline: '',
            //     keepTagContents: ['a'], //Remove tags and keep the contents
            //     badTags: ['applet', 'col', 'colgroup', 'embed', 'noframes', 'noscript','svg', 'script', 'style', 'title', 'meta', 'link', 'head','input'], //Remove full tags with contents
            //     badAttributes: ['bgcolor', 'border', 'height', 'cellpadding', 'cellspacing', 'lang', 'style', 'start', 'valign', 'width', 'data-(.*?)'], //Remove attributes from remaining tags
            //     limitChars: 0, // 0|# 0 disables option
            //     limitDisplay: 'none', // none|text|html|both
            //     limitStop: false, // true/false
            //     limitType: 'text', // text|html
            //     notTimeOut: 850, //time before status message is hidden in miliseconds
            //     keepImages: true, // if false replace with imagePlaceholder
            //     imagePlaceholder: 'https://via.placeholder.com/200'
            //   }
        });
        $('.dropdown-toggle').dropdown();
        $('.summernote').summernote({
            disableResizeEditor: true
        });

        $('.note-statusbar').hide();
        setEditor($('.summernote'))
        summerNoteEditorRef.current = $('.summernote')
        $('.summernote').summernote('focus');
        $('.summernote').summernote('removeModule', 'autoLink');
        $('.summernote').summernote('fontsizeunit', 'pt');

    }, [])

    useEffect(() => {
        if (!showSpecialCharacterModalRef.current) {
            setShowSpecialCharacterModal(false)
            // document.querySelector('button[aria-label="Special characters"]')?.classList?.remove('active');
        } else {
            setShowSpecialCharacterModal(true)
            // document.querySelector('button[aria-label="Special characters"]')?.classList?.add('active');
        }
    }, [showSpecialCharacterModalRef.current])


    // Disable Drag and Drop of window event of Images
    $('.note-control-selection').on('dragstart', function (event) { event.preventDefault(); });
    $('img').on('dragstart', function (event) { event.preventDefault(); });


    const deleteImageFromServer = async (target) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer  ${token}`);

        // console.log(target[0].src.slice(Config.BASE_URL?.length, target[0].src.length))
        let imagePath = target ? target?.src.slice(Config.BASE_URL?.length, target?.src.length) : imgNode.current.src.slice(Config.BASE_URL?.length, target?.src.length)
        // console.log(target[0])
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: myHeaders,
        };
        if (URL_SEARCH_PARAMS.get("document-id") || createdDocumentId.current) {
            let data = await fetch(`${Config.BASE_URL}/workspace/doc_image/?image_url=${imagePath}&document=${URL_SEARCH_PARAMS.get("document-id") ? URL_SEARCH_PARAMS.get("document-id") : createdDocumentId.current}`, requestOptions)
        } else if (URL_SEARCH_PARAMS.get("transcription-task") || transcriptionTaskId.current) {
            let data = await fetch(`${Config.BASE_URL}/workspace/doc_image/?image_url=${imagePath}&task=${URL_SEARCH_PARAMS.get("transcription-task") ? URL_SEARCH_PARAMS.get("transcription-task") : transcriptionTaskId.current}`, requestOptions)
        } else if (URL_SEARCH_PARAMS.get("pdf-id") || pdfTaskId.current) {
            let data = await fetch(`${Config.BASE_URL}/workspace/doc_image/?image_url=${imagePath}&pdf=${URL_SEARCH_PARAMS.get("pdf-id") ? URL_SEARCH_PARAMS.get("pdf-id") : pdfTaskId.current}`, requestOptions)
        }
    }

    var indentButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<i class="fas fa-indent"></i>',
                tooltip: t("indent"),
                click: function () {
                    $('.summernote').summernote('indent');
                }
            });
            return button.render();   // return button as jquery object
        }catch(e){
            console.log(e)
        }
    }

    var outdentButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<i class="fas fa-outdent"></i>',
                tooltip: t("outdent"),
                click: function () {
                    $('.summernote').summernote('outdent');
                }
            });
            return button.render();   // return button as jquery object

        }catch(e){
            console.log(e)
        }
    }

    var newDocumentButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<i class="fas fa-file-alt"></i>',
                tooltip: t("new_docs"),
                click: function () {
                    window.open('/word-processor');
                    // history('/word-processor')
                    // resetDocument()
                    // something()
                }
            });
            return button.render();   // return button as jquery object
        }catch(e){
            console.log(e)
        }
    }

    var openDocumentButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<i class="fas fa-folder-open"></i> ',
                tooltip: t("open_docs"),
                click: function () {
                    setShowDocumentListModal(true)
                }
            });
            return button.render();   // return button as jquery object

        }catch(e){
            console.log(e)
        }
    }

    var showSpecialCharacters = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<span class="omega" style="display: block;"></span>',
                tooltip: t("special_characters"),
                click: function (e) {
                    if (!showSpecialCharacterModalRef.current) {
                        showSpecialCharacterModalRef.current = true
                        setShowSpecialCharacterModal(true)
                        e.currentTarget.classList.add('active')
                    } else {
                        showSpecialCharacterModalRef.current = false
                        e.currentTarget.classList.remove('active')
                        setShowSpecialCharacterModal(false)
                    }
                }
            });
            return button.render();   // return button as jquery object

        }catch(e){
            console.log(e)
        }
    }

    var spellCheckButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                className: 'active',
                contents: '<span class="spellcheck" style="display: block;"></span>',
                tooltip: t("spell_check"),
                click: function (e) {
                    if (!isSpellCheckEnableRef.current) {
                        e.currentTarget?.classList.add('active')
                        isSpellCheckEnableRef.current = true
                    } else {
                        e.currentTarget?.classList.remove('active')
                        isSpellCheckEnableRef.current = false
                    }
                }
            });
            return button.render();   // return button as jquery object

        }catch(e){
            console.log(e)
        }
    }


    // ===================================================== voice typing summernote button =====================================================
    var voiceDictateButton = function (context) {
        try{
            var ui = $.summernote.ui;
            // create button
            var button = ui.button({
                contents: '<i class="fa fa-microphone"></i>',
                tooltip: t('dictation'),
                class: 'btn-primary dict-button-writter',
                click: function (e) {
                    $('.summernote').summernote('saveRange')
    
                    document.querySelector('#dictate-btn')?.click()
                }
            });
            return button.render();   // return button as jquery object

        }catch(e){
            console.log(e)
        }
    }
    // ===============================================================================================================================================

    // ===================================================== voice typing on/off toggle function =====================================================
    const toggleListening = () => {
        if (recognition.current === null) {
            Config.toast(t("speech_not_support_this_browser"), 'warning')
            return
        }
        // console.log(isListening)
        if (!isListening) {
            document.querySelector('button[aria-label="Dictation"]')?.classList.add('active');
            recognition.current.start();
        } else {
            document.querySelector('button[aria-label="Dictation"]')?.classList.remove('active');
            recognition.current.stop();
        }
    };
    // ===============================================================================================================================================

    const resetDocument = () => {
        setResetToNewDoc(true)
        createdDocumentId.current = null
        documentNameRef.current.innerText = ''
        summerNoteEditorRef.current.summernote('code', '')
    }


    function imageToBlob(imageURL) {
        const img = new Image(imgNode?.current.clientWidth, imgNode?.current.clientHeight);
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        img.crossOrigin = "";
        img.src = imageURL;
        return new Promise(resolve => {
            img.onload = function () {
                c.width = imgNode?.current?.clientWidth;
                c.height = imgNode?.current?.clientHeight;
                ctx.drawImage(this, 0, 0, this.width, this.height);
                c.toBlob((blob) => {
                    // here the image is a blob
                    resolve(blob)
                }, "image/png", 1);
            };
        })
    }

    const { ClipboardItem } = window;
    async function copyImage(imageURL) {
        const blob = await imageToBlob(imageURL)
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
    }

    useEffect(() => {
        let node
        document.addEventListener('mouseup', (e) => {
            if ($('.summernote').summernote('isEmpty') === false) {
                node = $('.summernote').summernote('restoreTarget');
                imgNode.current = $('.summernote').summernote('restoreTarget');
            }
        })
    }, [])


    // ================================================== Voice language drop-down ===========================================================
    var voiceLangDropDown = function (context) {
        try{
            var ui = $.summernote.ui;

            var button = ui.buttonGroup([
                ui.button({
                    className: "dropdown-toggle lang-select-btn-voice-writter",
                    contents: voiceDictationLangStateLabel,
                    value: voiceDictationLangState,
                    tooltip: t("select_dict_lang"),
                    data: {
                        toggle: "dropdown",
                    },
                }),
                ui.dropdown({
                    className: "drop-default summernote-list voice-lang-writter-list",
                    contents:
                        '<ul class="lang-list-writter-voice-wrap">' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="bg"><i class="note-icon-menu-check"></i> Bulgarian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ca"><i class="note-icon-menu-check"></i> Catalan</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="cs"><i class="note-icon-menu-check"></i> Czech</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="da"><i class="note-icon-menu-check"></i> Danish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="nl"><i class="note-icon-menu-check"></i> Dutch</li>' +
                        '<li class="lang-list-writter-voice dropdown-item active-voice" aria-valuetext="en"><i class="note-icon-menu-check"></i> English</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="fil-PH"><i class="note-icon-menu-check"></i> Filipino</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="fi"><i class="note-icon-menu-check"></i> Finnish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="fr"> <i class="note-icon-menu-check"></i> French</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="de"> <i class="note-icon-menu-check"></i> German</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="el"> <i class="note-icon-menu-check"></i> Greek</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="gu"> <i class="note-icon-menu-check"></i> Gujarati</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="hi"><i class="note-icon-menu-check"></i> Hindi</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="hu"> <i class="note-icon-menu-check"></i> Hungarian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="is"> <i class="note-icon-menu-check"></i> Icelandic</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="id"><i class="note-icon-menu-check"></i> Indonesian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="it"><i class="note-icon-menu-check"></i> Italian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ja"><i class="note-icon-menu-check"></i> Japanese</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="kn"><i class="note-icon-menu-check"></i> Kannada</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ko"><i class="note-icon-menu-check"></i> Korean</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="lv"><i class="note-icon-menu-check"></i> Latvian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ms"><i class="note-icon-menu-check"></i> Malay</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ml"><i class="note-icon-menu-check"></i> Malayalam</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="pl"><i class="note-icon-menu-check"></i> Polish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="pt"><i class="note-icon-menu-check"></i> Portuguese</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="pa"><i class="note-icon-menu-check"></i> Punjabi</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ro"><i class="note-icon-menu-check"></i> Romanian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ru"><i class="note-icon-menu-check"></i> Russian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="sr"><i class="note-icon-menu-check"></i> Serbian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="sk"><i class="note-icon-menu-check"></i> Slovak</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="es"><i class="note-icon-menu-check"></i> Spanish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="sv"><i class="note-icon-menu-check"></i> Swedish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ta"><i class="note-icon-menu-check"></i> Tamil</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="te"><i class="note-icon-menu-check"></i> Telugu</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="th"><i class="note-icon-menu-check"></i> Thai</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="tr"><i class="note-icon-menu-check"></i> Turkish</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="uk"><i class="note-icon-menu-check"></i> Ukrainian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="vi"><i class="note-icon-menu-check"></i> Vietnamese</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="bn"><i class="note-icon-menu-check"></i> Bengali</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="no"><i class="note-icon-menu-check"></i> Norwegian</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="zh-TW"><i class="note-icon-menu-check"></i> Chinese (Traditional)</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="zh-CN"><i class="note-icon-menu-check"></i> Chinese (Simplified)</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="ar"><i class="note-icon-menu-check"></i> Arabic</li>' +
                        '<li class="lang-list-writter-voice dropdown-item" aria-valuetext="bg"><i class="note-icon-menu-check"></i> Afrikaans</li></ul>',
                    click: function (e) {
                        //   $dropdown.find(".lang-list-writter-voice dropdown-item").click(function (e) {
                        setVoiceDictationStateLabel(e.target.innerText)
                        setVoiceDictationState(e.target.ariaValueText)
                        // console.log()
                        // voiceDictationLang.current = e.target.ariaValueText
                        // voiceDictationLangLabel.current = e.target.innerText
                        if (document?.querySelector('.active-voice')) {
                            document?.querySelector('.active-voice')?.classList.remove('active-voice')
                        }
                        e.target.classList.add('active-voice')

                        // console.log(e.target.classList.add('active-voice'))
                        document.querySelector('.lang-select-btn-voice-writter').innerHTML = e.target.innerText
                        document.querySelector('.note-dictation').firstChild.setAttribute('aria-valuetext', e.target.ariaValueText);
                        // console.log( document.querySelector('.note-dictation').firstChild.ariaValueText)
                        //   });
                    },
                }),
            ]);

            return button.render(); // jquery object
        }catch(e){
            console.log(e)
        }
    }
    // =======================================================================================================================================

    const replaceSelectedHeadingWithParagraph = () => {
        const selection = window.getSelection();
      
        // Check if something is selected and if the selection range is valid
        if (!selection.isCollapsed && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
      
          // Create a new paragraph element
          const paragraph = document.querySelector('.note-editable')
      
          // Iterate over the nodes within the selection range and replace only heading nodes
        //   const nodes = range.cloneContents().childNodes;
          const nodes = range.commonAncestorContainer.nodeType === 3 // Text node
          ? range.commonAncestorContainer.parentElement
          : range.cloneContents().childNodes;
            // console.log(nodes)
    
        if(range.commonAncestorContainer.nodeType === 3){
    
            if (nodes && nodes.tagName && /^H[1-6]$/.test(nodes.tagName)) {
                const newParagraph = document.createElement('p');
          
                // Unwrap any nested <p> tags inside the heading
                const nestedParagraphs = nodes.querySelectorAll('p');
                nestedParagraphs.forEach(nestedParagraph => {
                  while (nestedParagraph.firstChild) {
                    nodes.insertBefore(nestedParagraph.firstChild, nestedParagraph);
                  }
                  nodes.removeChild(nestedParagraph);
                });
          
                newParagraph.innerText = nodes.innerText;
                nodes.replaceWith(newParagraph);
              } else {
                // If it's not a heading, append the original content
                paragraph.appendChild(range.cloneContents());
              }
          
              // Replace the selected content with the new paragraph
              range.deleteContents();
              range.insertNode(paragraph);
    
        }else{
            for (const node of nodes) {
                if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
                  const newParagraph = document.createElement('p');
          
                  // Unwrap any nested <p> tags inside the heading
                  const nestedParagraphs = node.querySelectorAll('p');
                  nestedParagraphs.forEach(nestedParagraph => {
                    while (nestedParagraph.firstChild) {
                      node.insertBefore(nestedParagraph.firstChild, nestedParagraph);
                    }
                    node.removeChild(nestedParagraph);
                  });
          
                  newParagraph.innerText = node.innerText;
                  paragraph.appendChild(newParagraph);
                } else {
                  // If it's not a heading, append the original node
                  paragraph.appendChild(node.cloneNode(true));
                }
              }
          
        }
         
          // Replace the selected content with the new paragraph
          range.deleteContents();
          range.insertNode(paragraph);
      
          // Update the state with the modified HTML content
        //   setHtmlContent(contentEditableRef.current.innerHTML);
        }
    };



    // ================================================== paragraph style dropdown ===========================================================
    var styleDropdown = function (context) {
        try{
            var ui = $.summernote.ui;
    
            var button = ui.buttonGroup([
                ui.button({
                    className: "dropdown-toggle style-select-btn",
                    contents: "Normal",
                    // value: "",
                    tooltip: t('styles'),
                    data: {
                        toggle: "dropdown",
                    },
                }),
    
                ui.dropdown({
                    className: "drop-default summernote-list summernote-style-list",
                    contents:
                        // '<ul class="lang-list-writter-voice-wrap">' +
                        '<a style="font-size: 16px" class="writer-style-list dropdown-item " aria-valuetext="normal"><i class="note-icon-menu-check"></i>Normal</a>' +
                        '<a style="font-size: 40px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h1"><i class="note-icon-menu-check"></i>Heading 1</a>' +
                        '<a style="font-size: 32px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h2"><i class="note-icon-menu-check"></i> Heading 2</a>' +
                        '<a style="font-size: 28px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h3"><i class="note-icon-menu-check"></i> Heading 3</a>',
                    click: function (e) {
    
                        try {
                            // let range = window.getSelection().getRangeAt(0)
                            // let current_node = range?.commonAncestorContainer?.parentElement
                            // let current_text = range?.commonAncestorContainer?.parentElement?.innerText
                            // console.log(current_text)
                            // console.log(current_node?.classList?.contains('note-editable'))
                            if (e.target.ariaValueText === 'normal') {
                                $('.summernote').summernote('formatPara');
                                // const rng = $('.summernote').summernote('editor.getLastRange');
                                // replaceSelectedHeadingWithParagraph()
                                // rng.select()
                                // $('.summernote').summernote('insertText', '');
    
                                // let ptag = document.createElement('p')
    
                                // console.log(window.getSelection().anchorNode)
                                // if (window.getSelection().anchorNode.innerText?.trim() !== '') {
                                //     if (window.getSelection().toString() !== '') {
                                //         ptag.innerText = window.getSelection().toString()
                                //         window.getSelection()?.deleteFromDocument()
                                //         $('.summernote').summernote('insertNode', ptag)
    
                                //     } else if (!current_node?.classList?.contains('note-editable')) {
                                //         ptag.innerText = current_text
                                //         // ptag.appendChild(document.createElement('br'))
                                //         current_node.remove()
                                //         $('.summernote').summernote('insertNode', ptag)
                                //     }
                                // }
    
                            } else if (e.target.ariaValueText === 'h1') {
                                $('.summernote').summernote('formatH1');
                                const rng = $('.summernote').summernote('editor.getLastRange');
                                // rng.select()
                                // $('.summernote').summernote('insertText', '');
    
                                // let h1tag = document.createElement('h1')
                                // if (window.getSelection().anchorNode.innerText?.trim() !== '') {
                                //     if (window.getSelection().toString() !== '') {
                                //         h1tag.innerText = window.getSelection().toString()
                                //         if (containsRtlCharacters(window.getSelection().toString())) {
                                //             h1tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h1tag.classList.remove('right-align-lang-style')
                                //         }
                                //         window.getSelection()?.deleteFromDocument()
                                //         $('.summernote').summernote('insertNode', h1tag)
                                //     } else if (!current_node?.classList?.contains('note-editable')) {
                                //         h1tag.innerText = current_text
                                //         if (containsRtlCharacters(current_text)) {
                                //             h1tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h1tag.classList.remove('right-align-lang-style')
                                //         }
                                //         // h1tag.appendChild(document.createElement('br'))
                                //         current_node.remove()
                                //         $('.summernote').summernote('insertNode', h1tag)
                                //     }
                                // }
    
                            } else if (e.target.ariaValueText === 'h2') {
                                $('.summernote').summernote('formatH2');
                                const rng = $('.summernote').summernote('editor.getLastRange');
                                // rng.select()
                                // $('.summernote').summernote('insertText', '');
    
                                // let h2tag = document.createElement('h2')
                                // if (window.getSelection().anchorNode.innerText?.trim() !== '') {
                                //     if (window.getSelection().toString() !== '') {
                                //         h2tag.innerText = window.getSelection().toString()
                                //         if (containsRtlCharacters(window.getSelection().toString())) {
                                //             h2tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h2tag.classList.remove('right-align-lang-style')
                                //         }
                                //         window.getSelection()?.deleteFromDocument()
                                //         $('.summernote').summernote('insertNode', h2tag)
                                //     } else if (!current_node?.classList?.contains('note-editable')) {
                                //         h2tag.innerText = current_text
                                //         // h2tag.appendChild(document.createElement('br'))
                                //         if (containsRtlCharacters(current_text)) {
                                //             h2tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h2tag.classList.remove('right-align-lang-style')
                                //         }
                                //         current_node.remove()
                                //         $('.summernote').summernote('insertNode', h2tag)
                                //     }
                                // }
    
                            } else if (e.target.ariaValueText === 'h3') {
                                $('.summernote').summernote('formatH3');
                                const rng = $('.summernote').summernote('editor.getLastRange');
                                // rng.select()
                                // $('.summernote').summernote('insertText', '');
    
                                // let h3tag = document.createElement('h3')
                                // if (window.getSelection().anchorNode.innerText?.trim() !== '') {
                                //     if (window.getSelection().toString() !== '') {
                                //         h3tag.innerText = window.getSelection().toString()
                                //         if (containsRtlCharacters(window.getSelection().toString())) {
                                //             h3tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h3tag.classList.remove('right-align-lang-style')
                                //         }
                                //         window.getSelection()?.deleteFromDocument()
                                //         $('.summernote').summernote('insertNode', h3tag)
                                //     } else if (!current_node?.classList?.contains('note-editable')) {
                                //         h3tag.innerText = current_text
                                //         if (containsRtlCharacters(current_text)) {
                                //             h3tag.classList.add('right-align-lang-style')
                                //         } else {
                                //             h3tag.classList.remove('right-align-lang-style')
                                //         }
                                //         // h3tag.appendChild(document.createElement('br'))
                                //         current_node.remove()
                                //         $('.summernote').summernote('insertNode', h3tag)
                                //     }
                                // }
                            }
                            // console.log(document?.querySelector('.active-voice'))
                            if (document?.querySelector('.active-voice')) {
                                document?.querySelector('.active-voice')?.classList.remove('active-voice')
                            }
                            e.target.classList.add('active-voice')
                            let styleListDiv = document.querySelector('.summernote-style-list')
                            if(e.target !== styleListDiv){
                                document.querySelector('.style-select-btn').innerHTML = e.target.innerText
                                document.querySelector('.note-dictation')?.firstChild.setAttribute('aria-valuetext', e.target.ariaValueText);
                            }
                            
                        } catch (e) {
                            console.log(e)
                        }
    
    
                    },
                }),
            ]);
    
            return button.render(); // jquery object

        }catch(e){
            console.log(e)
        }
    }
    // =======================================================================================================================================


    // var copyButton = function (context) {
    //     var ui = $.summernote.ui;

    //     // create button
    //     var button = ui.button({
    //         contents: '<i class="fa fa-copy"/> ',
    //         tooltip: 'Copy',
    //         click: function () {
    //             // invoke insertText method with 'hello' on editor module.
    //             range = context.invoke('editor.createRange')
    //             node = context.invoke('editor.createRange').nodes();
    //             var div = document.createElement('div');

    //             for (let i = 0; i < node.length; ++i) {
    //                 // console.log('ran');
    //                 div.appendChild(node[i].cloneNode(true));
    //             }
    //             html = div.innerHTML;
    //             // console.log(html);
    //         }
    //     });
    //     return button.render();   // return button as jquery object
    // }

    // var PasteButton = function (context) {
    //     var ui = $.summernote.ui;

    //     // create button
    //     var button = ui.button({
    //         contents: '<i class="fa fa-paste"/> ',
    //         tooltip: 'Paste',
    //         click: function () {
    //             // invoke insertText method with 'hello' on editor module.
    //             context.invoke('editor.insertText', range);
    //         }
    //     });
    //     return button.render();   // return button as jquery object
    // }

    // var PasteButtonWithFormate = function (context) {
    //     var ui = $.summernote.ui;

    //     // create button
    //     var button = ui.button({
    //         contents: '<i class="fa fa-paste"/> ',
    //         tooltip: 'PasteFormat',
    //         click: function () {
    //             // invoke insertText method with 'hello' on editor module.
    //             context.invoke('editor.pasteHTML', html);
    //         }
    //     });
    //     return button.render();   // return button as jquery object
    // }


    // Function to check if a string contains RTL characters
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


    const handleTextCopy = (text) => {
        navigator.clipboard.writeText(text)
        isCopiedFromSummernoteRef.current = true
        copiedContentRef.current = text
        setTimeout(() => {
            if(isCopiedFromSummernoteRef.current){
                isCopiedFromSummernoteRef.current = false
            }
        }, 8000);
        setIsCopied(true)
        // Config.toast("Text copied")
    }

    function getCaretPosition(editableDiv) {
        var caretPos = 0,
            sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode == editableDiv) {
                    caretPos = range.endOffset;
                }
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            if (range.parentElement() == editableDiv) {
                var tempEl = document.createElement("span");
                editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                var tempRange = range.duplicate();
                tempRange.moveToElementText(tempEl);
                tempRange.setEndPoint("EndToEnd", range);
                caretPos = tempRange.text.length;
            }
        }
        return caretPos;
    }

    function getCharacterPrecedingCaret(containerEl) {
        var precedingChar = "", sel, range, precedingRange;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount > 0) {
                range = sel.getRangeAt(0).cloneRange();
                range.collapse(true);
                range?.setStart(containerEl, 0);
                precedingChar = range.toString().slice(-600);
            }
        } else if ((sel = document.selection) && sel.type != "Control") {
            range = sel.createRange();
            precedingRange = range.duplicate();
            precedingRange.moveToElementText(containerEl);
            precedingRange.setEndPoint("EndToStart", range);
            precedingChar = precedingRange.text.slice(-600);
        }
        return precedingChar;
    }


    var handle = (event) => {
        try {
            if (document.querySelector('.temp-color')) {
                // console.log(document.querySelector('.temp-color'));
                const colorClassArray = document.querySelectorAll('.temp-color')

                colorClassArray.forEach((each) => {
                    each.classList.remove('temp-color')
                })
              
            }

            if (document.querySelector('.note-editable')) {

                // Chrome is wrapping line in span with styling upon deleting previous line break #3088 (reference)
                // $(document).on("DOMNodeInserted", '.note-editable', function (e) {
                //     if (e.target.tagName === "SPAN") {
                //         $(e.target).replaceWith($(e.target).contents());
                //     }
                // });

                var selection = window.getSelection(),
                    range = selection.getRangeAt(0) ? selection.getRangeAt(0) : '',
                    rect = range.getClientRects()[0] ? range.getClientRects()[0] : '';

                if (document.querySelector('.tab-to-write-more-tooltip')) {
                    // document.querySelector('.write-more-tab').remove()
                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'hidden'
                }

                // console.log(event.target.lastElementChild.text)
                // console.log(event.target.lastChild)

                // console.log(event.target.innerText.length)
                if (event.target.lastChild) {
                    if (event?.target?.firstChild) {
                        
                        // style select drop-down
                        changeParagraphStyleDropDownLabel(event)

                        // let styleSelect = document.querySelector('.style-select-btn')
                        // // console.log(document.querySelector('.summernote-style-list'))
                        // if (event?.target.tagName === 'H1') {
                        //     styleSelect.innerHTML = "Heading 1"
                        //     if (document?.querySelector('.active-voice')) {
                        //         document?.querySelector('.active-voice')?.classList.remove('active-voice')
                        //     }
                        //     document.querySelector('[aria-valuetext="h1"]').classList.add('active-voice')
                        // } else if (event?.target.tagName === 'H2') {
                        //     styleSelect.innerHTML = "Heading 2"
                        //     if (document?.querySelector('.active-voice')) {
                        //         document?.querySelector('.active-voice')?.classList.remove('active-voice')
                        //     }
                        //     document.querySelector('[aria-valuetext="h2"]').classList.add('active-voice')
                        // } else if (event?.target.tagName === 'H3') {
                        //     styleSelect.innerHTML = "Heading 3"
                        //     if (document?.querySelector('.active-voice')) {
                        //         document?.querySelector('.active-voice')?.classList.remove('active-voice')
                        //     }
                        //     document.querySelector('[aria-valuetext="h3"]').classList.add('active-voice')
                        // } else if (event?.target.tagName === 'P') {
                        //     styleSelect.innerHTML = "Normal"
                        //     if (document?.querySelector('.active-voice')) {
                        //         document?.querySelector('.active-voice')?.classList.remove('active-voice')
                        //     }
                        //     document.querySelector('[aria-valuetext="normal"]').classList.add('active-voice')
                        // }

                        if ((event?.target?.firstChild?.length == getCaretPosition(event?.target)) && (event?.target?.innerText?.length >= 30) && getCaretPosition(event?.target) != 0) {
                            if (window?.getSelection()?.toString()?.length === 0) {
                                // var HTMLstring = '<span class="write-more-tab" contenteditable="false">Press<span class="tab-write-more-inner">Tab</span> to write more...</span>';
                                // $('.summernote').summernote('pasteHTML', HTMLstring)
                                // $('.summernote').summernote("restoreRange")
                                if (document.querySelector('.tab-to-write-more-tooltip')) {
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('top', (rect.y - 46) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:638 ~ handle ~ event.pageY", rect.y)
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('left', (rect.x - 66) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:639 ~ handle ~ event.pageX", rect.x)
                                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                                }


                            }

                        }
                    }

                    if (event?.target?.lastChild?.length) {
                        // $('.summernote').summernote('restoreRange');

                        if ((event?.target?.lastChild?.length == getCaretPosition(event?.target)) && (event?.target?.innerText?.length >= 30) && getCaretPosition(event?.target) != 0) {
                            // enableTabFunctionRef.current = true
                            // var sNode = document.createElement('span');
                            // sNode.innerHTML = ' Press <span class="tab-write-more-inner">Tab</span> to write more...'
                            // sNode.className = 'write-more-tab'
                            // sNode.contentEditable = 'false'
                            // const rng = range.create()
                            // var nod = rng.sc
                            if (window?.getSelection()?.toString()?.length === 0) {
                                if (document.querySelector('.tab-to-write-more-tooltip')) {
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('top', (rect.y - 46) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:638 ~ handle ~ event.pageY", rect.y)
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('left', (rect.x - 66) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:639 ~ handle ~ event.pageX", rect.x)
                                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                                }


                                // var HTMLstring = '<span class="write-more-tab" contenteditable="false">Press<span class="tab-write-more-inner">Tab</span> to write more...</span>';
                                // $('.summernote').summernote('pasteHTML', HTMLstring)
                                // $('.summernote').summernote("restoreRange")

                            }
                            // nod.appendChild(sNode)
                            // setEnableTabFunction(true)
                        }


                    } else {


                        if ((event?.target?.lastChild?.innerText?.length == getCaretPosition(event?.target?.lastChild)) && (event?.target?.innerText?.length >= 30) && getCaretPosition(event?.target?.lastChild) != 0) {
                            // enableTabFunctionRef.current = true
                            // var sNode = document.createElement('span');
                            // sNode.innerHTML = ' Press <span class="tab-write-more-inner">Tab</span> to write more...'
                            // sNode.className = 'write-more-tab'
                            // sNode.contentEditable = 'false'
                            // const rng = range.create()
                            // var nod = rng.sc
                            if (window?.getSelection()?.toString()?.length === 0) {
                                // var HTMLstring = '<span class="write-more-tab" contenteditable="false">Press<span class="tab-write-more-inner">Tab</span> to write more...</span>';
                                // $('.summernote').summernote('pasteHTML', HTMLstring)
                                // $('.summernote').summernote("restoreRange")
                                if (document.querySelector('.tab-to-write-more-tooltip')) {
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('top', (rect.y - 46) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:638 ~ handle ~ event.pageY", rect.y)
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('left', (rect.x - 66) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:639 ~ handle ~ event.pageX", rect.x)
                                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                                }

                            }

                            // nod.appendChild(sNode)
                            // setEnableTabFunction(true)



                        } else if ((event?.target?.lastChild?.childNodes[event?.target?.lastChild?.childNodes?.length - 1]?.length === getCaretPosition(event?.target?.lastChild)) && (event?.target?.innerText?.length >= 30) && getCaretPosition(event?.target?.lastChild) != 0) {

                            if (window?.getSelection()?.toString()?.length === 0) {
                                // console.log('ran')
                                // var HTMLstring = '<span class="write-more-tab" contenteditable="false">Press<span class="tab-write-more-inner">Tab</span> to write more...</span>';
                                // $('.summernote').summernote('pasteHTML', HTMLstring)
                                document.querySelector('.tab-to-write-more-tooltip').style.setProperty('top', (rect.y - 46) + "px", 'important');
                                // console.log("🚀 ~ file: MainEditor.js:638 ~ handle ~ event.pageY", rect.y)
                                document.querySelector('.tab-to-write-more-tooltip').style.setProperty('left', (rect.x - 66) + "px", 'important');
                                // console.log("🚀 ~ file: MainEditor.js:639 ~ handle ~ event.pageX", rect.x)
                                document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                            }
                        } else if ((event?.target?.lastChild?.childNodes[event?.target?.lastChild?.childNodes?.length - 1]?.innerText?.length === getCaretPosition(event?.target?.lastChild?.childNodes[event?.target?.lastChild?.childNodes?.length - 1])) && (event?.target?.innerText?.length >= 30) && getCaretPosition(event?.target?.lastChild?.childNodes[event?.target?.lastChild?.childNodes?.length - 1]) != 0) {
                            // console.log('ran')
                            if (window?.getSelection()?.toString()?.length === 0) {
                                // console.log('ran')
                                if (document.querySelector('.tab-to-write-more-tooltip')) {
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('top', (rect.y - 46) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:638 ~ handle ~ event.pageY", rect.y)
                                    document.querySelector('.tab-to-write-more-tooltip').style.setProperty('left', (rect.x - 66) + "px", 'important');
                                    // console.log("🚀 ~ file: MainEditor.js:639 ~ handle ~ event.pageX", rect.x)
                                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                                }


                                // var HTMLstring = '<span class="write-more-tab" contenteditable="false">Press<span class="tab-write-more-inner">Tab</span> to write more...</span>';
                                // $('.summernote').summernote('pasteHTML', HTMLstring)
                                // $('.summernote').summernote("restoreRange")
                            }
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const searchParent = (node) => {
        if (!node) return null; // Return null if no node is found
        if (node.classList.contains('note-editable')) return node; // Return the element if class name is found
        directChildRef.current = node
        return searchParent(node.parentElement); // Recursively search the parent element
    };
    
    const changeParagraphStyleDropDownLabel = (event) => {
        // style select drop-down
        let styleSelect = document.querySelector('.style-select-btn')
        // console.log(document.querySelector('.summernote-style-list'))
        // console.log(window.getSelection())
        directChildRef.current = null
        const selection = window.getSelection();
        const parentElement = searchParent(selection.anchorNode.parentElement);

        let tag = directChildRef.current?.tagName
        // console.log(tag)

        if (tag === 'H1') {
            styleSelect.innerHTML = "Heading 1"
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice')
            }
            document.querySelector('[aria-valuetext="h1"]').classList.add('active-voice')
        } else if (tag === 'H2') {
            styleSelect.innerHTML = "Heading 2"
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice')
            }
            document.querySelector('[aria-valuetext="h2"]').classList.add('active-voice')
        } else if (tag === 'H3') {
            styleSelect.innerHTML = "Heading 3"
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice')
            }
            document.querySelector('[aria-valuetext="h3"]').classList.add('active-voice')
        } else if (tag === 'P') {
            styleSelect.innerHTML = "Normal"
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice')
            }
            document.querySelector('[aria-valuetext="normal"]').classList.add('active-voice')
        }else {
            styleSelect.innerHTML = "Normal"
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice')
            }
            document.querySelector('[aria-valuetext="normal"]').classList.add('active-voice')
        }
    }

    var newHandle = function (event) { handle(event) };


    useEffect(() => {
        try {
            if (document.querySelector('.note-editable')) {
                // Add event listener
                document.querySelector('.note-editable')?.addEventListener("click", newHandle, false);
                //   document.querySelector('.note-editable').addEventListener("click", newHandle, false);
                // document.querySelector('.note-editable').addEventListener("keydown", removeMe, false);
                document.querySelector('.note-editable')?.addEventListener("keydown", handleTab, false);
                
                document.querySelector('.note-editable')?.addEventListener("copy", handleCopyFromEditor);
                document.querySelector('.note-editable')?.addEventListener("cut", handleCopyFromEditor);
                
            }
            return () => {
                if (document.querySelector('.note-editable')){
                    document.querySelector('.note-editable')?.removeEventListener("click", newHandle);
                    //   document.querySelector('.note-editable').removeEventListener("click", newHandle, false);
                    // document.querySelector('.note-editable').removeEventListener("keydown", removeMe, false);
                    document.querySelector('.note-editable')?.removeEventListener("keydown", handleTab, false);
                    
                    document.querySelector('.note-editable')?.removeEventListener("copy", handleCopyFromEditor);
                    document.querySelector('.note-editable')?.removeEventListener("cut", handleCopyFromEditor);
                }
            }
        } catch (error) {
            console.log(error)
        }

        // return document.querySelector('.note-editable').removeEventListener("keydown", handleTab, false);
    }, []);

    function getSelectionHtml() {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

    function copyPlainHtml(e)
    {
        var html = '';
        var txt = '';
        var range;
        if (window.getSelection) 
        {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) 
        {
            range = selection.getRangeAt(0);
            var clonedSelection = range.cloneContents();
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            html = div.innerHTML;
        //     if (selection.baseNode && selection.baseNode.parentElement && selection.baseNode.parentElement.nodeName.toUpperCase() === "LI")
        //     {
        //         html = "<li>" + html + "</li>";
        // }
            txt = div.textContent;
        }
        }
        
        e.clipboardData.setData('text/html', html);
        e.clipboardData.setData('text/plain', txt);
        copiedContentRef.current = '<html>\n<body>\n<!--StartFragment-->' + html + '<!--EndFragment-->\n</body>\n</html>'

            console.log(e)
        if (e.type === 'cut') {
         
          }else{
            e.preventDefault();

          }
        // 
    }

    const handleCopyFromEditor =async(e) => {
        var editableDiv = document.querySelector('.note-editable');

        // copyPlainHtml(e)
        // Check if the active element is the contenteditable div
        var isFromContentEditable = document.activeElement === editableDiv;
       

        // console.log(document.activeElement)
        // console.log(editableDiv)
        // console.log(isFromContentEditable)
        if (isFromContentEditable) {
            isCopiedFromSummernoteRef.current = true
        } else {
            isCopiedFromSummernoteRef.current = false
        }
    } 


    const handleTab = (e) => {

        if (e.which === 9) {
            e.preventDefault();
            if ($(".tab-to-write-more-tooltip").css('visibility') == 'visible' && (enableTabFunctionRef.current)) {
                document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                // console.log(e.which)
                // console.log('handleTab')
                // console.log(e.target.innerText.length)
                // console.log(e.target.innerText)
                // console.log(getCharacterPrecedingCaret(document.querySelector('.note-editable'))
                var preceedingText = getCharacterPrecedingCaret(document.querySelector('.note-editable'))
                // console.log(preceedingText.length)
                if (preceedingText.length === 0) {
                    // $('.summernote').summernote('focus');
                    // $('.summernote').summernote('restoreRange');
                    // console.log('cursor is not focused')

                } else {
                    // document.querySelector('.write-more-tab').innerHTML = `<span class="writter-writting-loader-wrapper">
                    // <span class="save-btn-spinner-blue-writter">
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     </span>
                    //     <span class="writter-writting-loader">writting...</span>
                    // </span>`
                    //  setTabSelectionDisable(false)

                    // document.querySelector('.write-more-tab').classList.add("loader-115")
                    // var sNode = document.createElement('span');
                    // sNode.className = 'loader-45'
                    // document.querySelector('.write-more-tab').appendChild(sNode)
                    getAiCustomizationResult(22, 'Continue Writing', preceedingText)
                    document.querySelector('.tab-to-write-more-tooltip').style.visibility = 'visible'
                    // enableTabFunctionRef.current = false
                }
            } else {
                let noOfSpaces = 2
                $('.summernote').summernote('pasteHTML', '&emsp;'.repeat(noOfSpaces))
            }
        }
        else if (e.which === 32) {
            let inputSuggestionElements = document.querySelectorAll("div.ks-input-suggestions:not(.hidden)");
            // console.log("🚀 ~ file: MainEditor.js:822 ~ handleTab ~ inputSuggestionElements", inputSuggestionElements)

            if (inputSuggestionElements[0] != null) {
                let activeSuggestion = inputSuggestionElements[0].getElementsByClassName("suggestion-div active");
                // console.log('insert')
                if (activeSuggestion[0]?.innerText != null) {
                    e.preventDefault()
                    // console.log('insert')
                }
            }
        }
        else {
            if (document.querySelector('.write-more-tab')) {
                document.querySelector('.write-more-tab').remove()

            }
            if (document.querySelector('.tab-to-write-more-tooltip')) {
                document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden"

                // document.querySelector('.tab-to-write-more-tooltip').style.setProperty('display', "hidden", 'important');
            }
        }
    }

    useEffect(() => {
        if (!popoverContentSwitch) {
            if (document.querySelector('#pop')) {
                resetDraggable()
            }
        }
    }, [popoverContentSwitch])


    useEffect(() => {
        if(summerNoteEditorRef.current !== null){
            let workArea = document.querySelector('.note-editable')
            workArea?.addEventListener('mouseup', getRangeObjectFromSelection)

            return () => {
                workArea?.removeEventListener("mouseup", getRangeObjectFromSelection);
            };
        }
    }, [summerNoteEditorRef.current])


    const getRangeObjectFromSelection = () => {
        const selection = window.getSelection();
        summernoteRangeRef.current = $.summernote.range;
        setIsTextSelected(selection?.toString()?.length === 0 ? false : true)
        if (selection.toString()?.trim()?.length !== 0) {
            if (selection) {
                if (selection.rangeCount > 0) {
                    setSavedSelection(selection.getRangeAt(0));
                    // dispatch({
                    //     range: setWriterRangeObject(selection.getRangeAt(0))
                    // })
                }
            }
        }
    } 


    // Insert the special characters on the current focused contenteditable 
    const insertSpecialCharacter = (e) => {
        let specialCharacter = e.target.innerHTML;
        try{
            if (isTextSelected){
                let {startContainer, startOffset, endContainer, endOffset} = savedSelection
                const range = $.summernote.range;
                const rng = range.create(startContainer, startOffset, endContainer, endOffset)
                rng.select()
                $('.summernote').summernote('insertText', specialCharacter)
            } else {
                $('.summernote').summernote('insertText', specialCharacter)
            }
        } catch(e) {
            console.log(e)
        }
    };

    const dragStoped = () => {
        summerNoteEditorRef.current.summernote('focus')
        if (savedSelection) {
            setTimeout(() => {
                const rng = $('.summernote').summernote('editor.getLastRange');
                rng.select()
                // const selection = window.getSelection();
                // selection.removeAllRanges();
                // selection.addRange(savedSelection);
            }, 5);
        }
    }

    function resetDraggable() {
        try {
            draggableEntity.current.state.x = 0;
            draggableEntity.current.state.y = 0;
        } catch (err) {
            // Fail silently
        }
    }

    const saveCustomizationSettings = (e) => {
        let formdata = new FormData();

        if (!setAsDefault) {
            return
        }

        let action = e.target.getAttribute('name')

        formdata.append(
            'mt_engine', 
            defaultSettings?.mt_engine !== null ? defaultSettings?.mt_engine : 1
        )
        formdata.append('new_line', newline ? true : false)
        formdata.append('append', action === 'Accept' ? true : false)

        Config.axios({
            url: `${Config.BASE_URL}/openai/custom_settings/${defaultSettings?.id ? `${defaultSettings?.id}/` : ''}`,
            method: defaultSettings?.id !== null ? "PUT" : "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                Config.toast(t('settings_saved'))
                dispatch(setDefaultSettings({
                    ...defaultSettings,
                    mt_engine: response.data?.mt_engine,
                    newline: response.data?.new_line,
                    append: response.data?.append,
                    result_in_modal: false
                }))
                setSetAsDefault(false)
            },
            error: (err) => {
                // setIsDefaultSettingSaving(false)
            }
        })

        // dispatch(saveDefaultSettings({newline: newline, action: e.target.getAttribute('name')}))
    }


    //  useEffect(() => {
    //     if(spellCheckWordsOptions?.length !== 0){
    //         highlightSpellCheckWords()
    //     }
    // }, [spellCheckWordsOptions])
    
    useEffect(() => {
        window.addEventListener('mousemove', getMouseMoveCoordinates)
        document?.addEventListener('click', handleWrongWordClick)
        
        return () => {
            window.removeEventListener('mousemove', getMouseMoveCoordinates)
            document.removeEventListener('click', handleWrongWordClick)
            // window.removeEventListener('resize', handleWrongWordClick)
        }
    }, [])

    useEffect(() => {
        let noteEditingArea = document.querySelector('.note-editing-area')
        window.addEventListener('resize', setPopOnPosition)
        noteEditingArea.addEventListener('scroll', setPopOnPosition)
        
        return () => {
            window.removeEventListener('resize', setPopOnPosition)
            noteEditingArea.removeEventListener('scroll', setPopOnPosition)
        }
    }, [clickedWrongWordRef.current])    

    const arrow = document.querySelector('#arrow');
    const arrowTop = 'arrow-top';
    const arrowBottom = 'arrow-bottom';

    function changeArrow(dir) {
        if (!arrow) return;
        if (dir == 'up') {
            arrow.classList.remove(arrowTop)
            arrow.classList.add(arrowBottom);
        }
        else {
            arrow.classList.remove(arrowBottom)
            arrow.classList.add(arrowTop);
        }
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const highlightSpellCheckWords = () => {
        const noteEditingArea = document.querySelector('.note-editable');

        if (noteEditingArea?.innerText?.trim()?.length === 0) return
        // let content_editable_div = targetContentEditable.current[segment_id].current

        if(spellCheckWordsOptions?.length !== 0){
            let words_list = spellCheckWordsOptions?.map(each => {
                return each.word
            })

            var text = noteEditingArea?.innerHTML?.trim()
            var wordsToHighlight = words_list; // Array of words to highlight
            // console.log(wordsToHighlight)
            // console.log(text)

            try{
                // Generate regular expression pattern with all the words to highlight
            
                // working code
                var pattern = new RegExp('\\b(' + wordsToHighlight.map(escapeRegExp).join('|') + ')\\b', 'g');
                var highlightedHtml = text.replace(
                    pattern, (match) => {
                        // console.log(match)
                        let uid = generateKey()
                        return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`
                    }
                );
    
                document.querySelector('.note-editable-backdrop').innerHTML = highlightedHtml
            }catch(e){
                console.log(e)
            }
        }
    }

    // Function to check if the mouse pointer is within the bounding box of the <mark> element
    function isMouseOverMark(event, ele) {
        for (const markElement of ele) {
            const boundingBox = markElement.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if (
                mouseX >= boundingBox.left &&
                mouseX <= boundingBox.right &&
                mouseY >= boundingBox.top &&
                mouseY <= boundingBox.bottom
            ) {
                return {
                    element: markElement,
                    rect: boundingBox
                };
            }
        }

        return null;
    }    

    const getMouseMoveCoordinates = (e) => {
        const noteEditingArea = document.querySelector('.note-editable');

        const markTags = document.querySelector('.note-editable-backdrop')?.querySelectorAll('mark');

        let isSpellCheckPopOpen = document.querySelector('#spell-check-pop').style.visibility === 'visible' ? true : false

        const touchedMark = isMouseOverMark(e, markTags);
        // when spellcheck pop is open don't get the coordinates of other mark tags
        if (isMouseOverMark(e, markTags) && !isSpellCheckPopOpen) {
            // Mouse pointer is touching the bounding box of a <mark> element
            for (const markElement of markTags) {
                noteEditingArea.classList.add('spell-check-cursor')
            }
            // if(document.querySelector('#spell-check-pop').style.visibility === 'hidden'){
                clickedWrongWordRef.current = touchedMark
                clickedMarkEleRef.current = touchedMark 
                setRectElement(touchedMark)
            // }
            // console.log("Touched <mark> element:", touchedMark?.element?.innerText);
        } else {
            // Mouse pointer is not over any <mark> element
            for (const markElement of markTags) {
                clickedWrongWordRef.current = null
                noteEditingArea.classList.remove('spell-check-cursor')
                // noteEditingArea.style.cursor = 'text'
                // document.body.style.setProperty('cursor', 'default');
            }
        }
    } 

    const handleWrongWordClick = (e) => {
        // console.log(clickedWrongWordRef.current)
        let clickedOverPop = e.target.closest('#spell-check-pop') ? true : false

        if(clickedWrongWordRef.current !== null && !clickedOverPop){
            let {element} = clickedWrongWordRef.current
            
            setPopOnPosition()

            let suggestions = spellCheckResponseRef.current?.find(each => each.word === element.innerText)?.suggestion
            try{
                let options_list = suggestions?.slice(0, 100)?.map((value, ind) => {
                    return (
                        <p
                            key={value}
                            className={"corrected-word "}
                            onClick={(e) => replaceWithCorrectWord(e, value)}
                        >
                            {value}
                        </p>
                    )
                })
                setSpellCheckSuggestion(options_list)
            }catch(e){
                console.log(e)
            }
            
        }else{
            // console.log(e.target)
            // don't close when clicked inside the #pop div
            if(e.target instanceof Element && !e.target?.closest('#spell-check-pop')){
                document.querySelector('#spell-check-pop').style.visibility = 'hidden';
                document.querySelector('#spell-check-pop').style.opacity = '0';
                clickedWrongWordRef.current = null
                setRectElement(null)
            }
        }
    }

    const isElementOutOfViewport = (el, offset = 75) => {
        // Get the bounding rectangle of the element
        const rect = el.getBoundingClientRect();
      
        // Check if the element's top edge (adjusted by the offset) is above
        // the top of the viewport or if the element's bottom edge (adjusted by
        // the offset) is below the bottom of the viewport
        return (
          rect.top - offset < 0 || 
          rect.bottom + offset > window.innerHeight
        );
    }
      

    const setPopOnPosition = () => {
        if(rectElement !== null) clickedWrongWordRef.current = rectElement 
        if(clickedWrongWordRef.current !== null){
            let {element, rect} = clickedWrongWordRef.current
            rect = element?.getBoundingClientRect()
            if(isElementOutOfViewport(element)){
                // console.log("out of view")
                document.querySelector('#spell-check-pop').style.visibility = 'hidden';
                document.querySelector('#spell-check-pop').style.opacity = '0';
            }else{
                let pos = decidePopPosition(rect);
                let top = pos.y - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop;
                let left = pos.x - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
                if (top < 0)
                    top = document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 20;
                else if (top + document.querySelector('#spell-check-pop').clientHeight > document.querySelector('.ailaysa-writter-working-col-wrapper').clientHeight)
                    top = document.querySelector('.ailaysa-writter-working-col-wrapper').clientHeight - document.querySelector('#spell-check-pop').clientHeight + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop - 20;
                if (left < 0)
                    left = document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft + 20;
                else if (left + document.querySelector('#spell-check-pop').clientWidth > document.querySelector('.ailaysa-writter-working-col-wrapper').clientWidth)
                    left = document.querySelector('.ailaysa-writter-working-col-wrapper').clientWidth - document.querySelector('#spell-check-pop').clientWidth + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft - 20;
                if (true && (top != pos.y - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop || left != pos.x - document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft)) {
                    document.querySelector('#spell-check-pop').style.top = `${top}px`;
                    document.querySelector('#spell-check-pop').style.left = `${left}px`;
                }
                else
                    document.querySelector('#spell-check-pop').style.top = `${pos.y}px`;
                document.querySelector('#spell-check-pop').style.left = `${pos.x}px`;
    
                changeArrow(pos.dir);
                document.querySelector('#spell-check-pop').style.visibility = 'visible';
                document.querySelector('#spell-check-pop').style.opacity = '1';
            }
            
        }
    } 

    function decidePopPosition(rect) {
        // let x = rect.left + (rect.width) / 2 - document.querySelector('#pop').clientWidth / 2 + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
        let x = rect.left - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#spell-check-pop')?.clientWidth / 2 + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#spell-check-pop')?.clientWidth > document.querySelector('.ailaysa-writter-working-col-wrapper')?.clientWidth)
            x = document.querySelector('.ailaysa-writter-working-col-wrapper')?.clientWidth - document.querySelector('#spell-check-pop')?.clientWidth;

        let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {

            // y = rect.top - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop - document.querySelector('#pop').clientHeight - 8
            // dir = 'up';
            // if (y < 0) {
            // }
            y = rect.bottom - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 8
            dir = 'down';
        }
        else {
            y = rect.bottom - document.querySelector('.ailaysa-writter-working-col-wrapper')?.getBoundingClientRect().top + document.querySelector('.ailaysa-writter-working-col-wrapper').scrollTop + 8
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const replaceWithCorrectWord = (e, value) => {
        const noteEditingArea = document.querySelector('.note-editable');
        const backDropArea = document.querySelector('.note-editable-backdrop')
        const markTags = backDropArea.querySelectorAll('mark');

        // group the mark tags based on the innerText / it will give the order and occurance of each word
        const groups = {};
        // Iterate through each <mark> element
        markTags.forEach(markElement => {
        // Get the inner text of the <mark> element
        const innerText = markElement.innerText.trim();
        // Check if the inner text already exists in groups
        if (groups.hasOwnProperty(innerText)) {
            // If it exists, add the current <mark> element to the existing array
            groups[innerText].push(markElement);
        } else {
            // If it doesn't exist, create a new array with the current <mark> element
            groups[innerText] = [markElement];
        }
        });
        // console.log(groups);

        // console.log(groups[clickedMarkEleRef.current?.element.innerText?.trim()])

        let markArr = groups[clickedMarkEleRef.current?.element.innerText?.trim()]
        let index = markArr?.findIndex(each => each?.id === clickedMarkEleRef.current?.element.id)
        // console.log(index)

        // get the text from textarea 
        var text = noteEditingArea.innerHTML;

        var searchWord = clickedMarkEleRef.current?.element.innerText;
        var replacementText = value;

        // Specify the index (zero-based) of the word to replace
        var instanceToReplace = index; // Replace the index occurrence (index 0 means 1st occurance | index 1 means 2nd occurance)

        // Use a regular expression to find all instances of the word
        // var regex = new RegExp(searchWord, "g");
        var regex = new RegExp('\\b' + searchWord + '\\b', 'g');

        // var regex = new RegExp('(' + searchWord.map(escapeRegExp).join('|') + ')', 'g');
        var matches = text.match(regex);

        // Keep track of the current instance count
        var currentInstance = -1;

        // Use a custom replace function to replace the specific instance
        var newText = text.replace(regex, function(match) {
            currentInstance++;
            if (currentInstance === instanceToReplace) {
                return replacementText;
            } else {
                return match;
            }
        });

        // console.log(newText)
        // setTranslateResultText(newText)
        document.querySelector('#spell-check-pop').style.visibility = 'hidden';
        document.querySelector('#spell-check-pop').style.opacity = '0';

        noteEditingArea.innerHTML = newText
        backDropArea.innerHTML = newText

        $('.summernote').summernote('focus');
        $('.summernote').summernote('insertText', '');
       
    }

    
    const symSpellCheck = () => {
        const noteEditingArea = document.querySelector('.note-editable');
        // console.log(noteEditingArea?.innerText?.trim())
        // console.log(isSpellCheckEnableRef.current)
        if(noteEditingArea?.innerText?.trim()?.length !== 0 && isSpellCheckEnableRef.current){
            let formData = new FormData();
            // formData.append("task_id", taskId);
            formData.append("target", noteEditingArea?.innerText?.trim());
    
            Config.axios({
                url: `${Config.BASE_URL}/workspace_okapi/symspellcheck/`,
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    if(response.data?.result){
                        // console.log(response.data)
                        setSpellCheckWordsOptions(response.data.result)
                        spellCheckResponseRef.current = response.data.result
                    }
                },
                error: (err) => { }
            });
        }
    } 

    const handleSplCharacterModalCloseBtn = () => {
        document.querySelector('button[aria-label="Special characters"]')?.classList?.remove('active');
        showSpecialCharacterModalRef.current = false
        setShowSpecialCharacterModal(false)
    } 



    return (
        <>
            {/* =================================== Customization result popup modal ================================== */}            
            <Draggable handle="strong" ref={draggableEntity} onStop={dragStoped}>
                <div id="pop" style={!popoverContentSwitch ? {minWidth: 'auto'} : {}}>
                    <div className="popup" >
                        {popoverContentSwitch ? (
                                <div className="ai-writter-popover-modal" id="pop-content-modal">
                                    <strong>
                                        <div className="pop-header-bar ai-writter-popover-modal-header">
                                            <span>{selectedCustomization}</span>

                                            <button className="result-icon-single-item-popup close-pop-writter-drag-icon" onMouseUp={() => handleCustomizationPopoverCloseBtn()}>
                                                <img className="icons" src={DiscardPopup} alt="file_upload" />
                                            </button>

                                        </div>
                                    </strong>
                                    <strong className="ai-writter-popover-modal-content" >
                                        <div
                                            className="ai-writter-popover-modal-content-leaf"
                                            dangerouslySetInnerHTML={{ __html: customizationResult?.replace(/\n/g, "<br />") }}
                                        ></div>

                                    </strong>
                                    {selectedCustomizationCategoryRef.current !== 'Explore' && (
                                        <strong className="popup-footer">
                                            <div className="d-flex gap-5">
                                                <div className="btn-form-group">
                                                    <Radio
                                                        checked={newline}
                                                        className="cell-box-radio"
                                                        size="small"
                                                        id="new_line"
                                                        onChange={(e) => setNewline(current => true)}
                                                    />
                                                    <label className="customization-line-option-label" htmlFor="new_line">{t("new_line")}</label>
                                                </div>
                                                <div className="btn-form-group">
                                                    <Radio
                                                        checked={!newline}
                                                        className="cell-box-radio"
                                                        size="small"
                                                        id="same_line"
                                                        onChange={(e) => setNewline(current => false)}
                                                    />
                                                    <label className="customization-line-option-label" htmlFor="same_line">{t("same_line")}</label>
                                                </div>
                                            </div>
                                        </strong>
                                    )}
                                    <div className="writer-customize-main-wrapper">
                                        <strong className="writer-customize-set-as-default">
                                            <div style={selectedCustomizationCategoryRef.current === 'Explore' ? {opacity: 0, pointerEvents: 'none', width: '100%'} : {opacity: 1, width: '100%'}}>
                                                <Checkbox
                                                    id="set-default"
                                                    className="cell-box"
                                                    size="small"
                                                    checked={setAsDefault}
                                                    onChange={() => setSetAsDefault(!setAsDefault)}
                                                // disabled={!isSourceTextChanged}
                                                /> <label className="customization-save-defaul-label" htmlFor="set-default">{t("set_as_default")}</label>
                                            </div>
                                        </strong>
                                        <div className="action-toolbox-wrapper d-flex">
                                            <Tooltip title={t("accept")}>
                                                <button
                                                    className="result-icon-single-item-popup" 
                                                    data-id="Accept" name="Accept" 
                                                    onClick={(e) => { saveCustomizationSettings(e); replaceWithNewText(e, selectedCustomization) }}
                                                    style={selectedCustomizationCategoryRef.current === 'Explore' ? {opacity: 0, pointerEvents: 'none'} : {opacity: 1}}
                                                >
                                                    <img className="icons" name="Accept" src={DonePopup} alt="file_upload" />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title={t("replace")}>
                                                <button 
                                                    className="result-icon-single-item-popup" 
                                                    data-id="Replace" name="Replace" 
                                                    onClick={(e) => { saveCustomizationSettings(e); replaceWithNewText(e, selectedCustomization) }}
                                                    style={selectedCustomizationCategoryRef.current === 'Explore' ? {opacity: 0, pointerEvents: 'none'} : {opacity: 1}}
                                                >
                                                    <img className="icons" name="Replace" src={ReplacePopup} alt="file_upload" />
                                                </button>
                                            </Tooltip>
                                            {/* {selectedCustomizationCategoryRef.current === 'Explore' && (
                                                <Tooltip title={t("move_to_editor")}>
                                                    <button 
                                                        className="result-icon-single-item-popup" 
                                                        // data-id="Replace" name="Replace" 
                                                        onClick={(e) => { moveToEditor(e, selectedCustomization) }}
                                                    >
                                                        <img className="icons" name="Replace" src={Config.HOST_URL + "assets/images/new-ui-icons/replace-popup.svg"} alt="file_upload" />
                                                    </button>
                                                </Tooltip>
                                            )} */}
                                            <Tooltip title={isCopied ? t("txt_copied") : t("copy")}>
                                                <button 
                                                    className="result-icon-single-item-popup" 
                                                    onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)} 
                                                    onClick={() => { handleTextCopy(customizationResult) }}
                                                >
                                                    <img className="icons" src={CopyPopup} alt="file_upload" />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                        ) : (
                                <>
                                    {(popupLoading != 'none') &&
                                        <button
                                            className="pop-buttons"
                                            data-id="Others"
                                            disabled={popupLoading != 'none' ? true : false}
                                        >
                                            {/* {(popupLoading != 'none' && popupLoading != 'Rewrite' && popupLoading != 'Grammer check' && popupLoading != 'Continue Writing' && popupLoading != 'Translate') && */}
                                            {(popupLoading != 'none') && (popupLoading != `${t("turning_into_img")}...`) &&

                                                <div className="save-btn-spinner-blue">
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
                                                </div>}

                                            {(popupLoading == `${t("turning_into_img")}...`) &&
                                                <ImageGeneratingLoader />
                                            }
                                            <span
                                                className="popover-content">
                                                {popupLoading}
                                            </span>
                                        </button>}
                                </>
                            )}
                    </div>
                </div>
            </Draggable>
            {/* ======================================================================================================= */}            
            
            {/* =========================================== Spell-check popup ========================================= */}
            <div id="spell-check-pop" className="spellcheck-popover-box" style={{borderRadius: '5px', background: '#fff'}}>
                <div className="instant-popover">
                    <div className="popover-inner">
                        <span>{spellCheckSuggestion}</span>
                        <div id="arrow" className="arrow-top"></div>
                    </div>
                </div>    
            </div>
            {/* ======================================================================================================= */}            


            {/* ============================================= Voice typing ============================================ */}
            {/* <VoiceTyping
                recognition={recognition}
                isListening={isListening}
                setIsListening={setIsListening}
                // recognizedText={recognizedText}
                // setRecognizedText={setRecognizedText}
                fromWriter={true}
                targetLanguage={voiceDictationLangState}
            />
            <button id="dictate-btn" onClick={toggleListening} className="hidden"></button> */}
            {/* ======================================================================================================= */}



            {/* ========================================== summernote editor ========================================== */}
            <form className={"ailaysa-writer-form-main-wrapper " + (((window.location.pathname.includes("book-writing") && URL_SEARCH_PARAMS.get("matter") && URL_SEARCH_PARAMS.get("item")) ? "co-author-writer-form-wrapper " : " "))}>
                <textarea className="summernote" name="editordata"></textarea> 
            </form>
            {/* ======================================================================================================= */}



            {/* ======================================== Special character modal ====================================== */}
            {showSpecialCharacterModal && (
                <Draggable defaultPosition={{ x: 20, y: 150 }} >
                    <strong className="toolbar-parts writer-spl-char-modal" id="special-characters-section" >
                        <div className="close-spl-char">
                            <button type="button" onClick={handleSplCharacterModalCloseBtn} className="close-spl-char-btn">
                                &#x2715;
                            </button>
                        </div>
                        <div className="toolbar-part-container">
                            <h4 className="symbol-char-title">{t("symbols")}</h4>
                            <div className="symbol-char">
                                {specialCharacters.map((value, key) => {
                                    if ((key + 1) % 4 == 0) {
                                        return (
                                            <div className="special-char-box" key={value}>
                                                <button onClick={(e) => insertSpecialCharacter(e)} className="spl-char-cont">
                                                    {value}
                                                </button>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="special-char-box" key={value}>
                                            <button onClick={(e) => insertSpecialCharacter(e)} className="spl-char-cont">
                                                {value}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </strong>
                </Draggable>
            )}
            {/* ======================================================================================================= */}

        </>
    )


}

export default MainEditor;
