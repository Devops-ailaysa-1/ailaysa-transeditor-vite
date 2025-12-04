import React, { useState, useEffect, createRef, useRef } from "react";
import { TextareaAutosize } from "@mui/material";
import Config from "../../../Config";
import SplitPane, { Pane } from 'split-pane-react';
import Select, { components } from 'react-select';
import { ArrowDropDown } from "@mui/icons-material";
import { Collapse } from "reactstrap";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from "react-i18next";
import $ from 'jquery';
import CircularProgress from '@mui/material/CircularProgress';
import ChatSentIcon from "../../../assets/images/chat/chat-sent-icon.svg";

const CoAuthorWriterFooter = (props) => {
    let { promptMainWrapper, setPromptMainWrapper, deskLeftSideBar, rightSideBar, setShowCreditAlertModal, setshowSrcLangModal, setshowTarLangModal, promptSrcLang,
         promptSrcLabel, promptTarLang, } = props;

    const promptInput = useRef(null);
    const { t } = useTranslation();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [promptText, setPromptText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const generatedPromptId = useRef(null);

    // check if the text contains rtl characters
    const containsRtlCharacters = (text) => {
        var rtlCharacters = /[\u0600-\u06FF\u0590-\u05FF\uFE70-\uFEFF]/;
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
    
    // to remove the background color of added prompt
    const removeBgColor = (e) => {
        // e.target.style = 'background: none;' ;
        // e.target.removeEventListener('click', removeBgColor);
        e.target.classList.remove('temp-color');
        e.target.removeEventListener('click', removeBgColor);
        // currentSummerNoteData.current = document.querySelector('.note-editable').innerHTML;
    }

    // onchange handler for text prompt box
    const handlePromptTextChange = (e) => {
        setPromptText(e.target.value);
    }
    
    // onkeydown handle for prompt box
    // send prompt request on ENTER
    const handlePromptBoxKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            if(promptText?.trim()?.length === 0) return;
            // try{
            //     let capturedWarnings = [];
            //     const rng = $('.summernote').summernote('editor.getLastRange');
            //     rng.select();
            // }catch(e){
            //     console.error(e);
            // }
            postAiPrompt();
        }
    }
    
    useEffect(() => {
        if(promptInput?.current !== null){
            /* Handle keydown eventHandler - start*/
            const handleKeyDown = (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    if (promptInput.current?.value?.trim() !== '') {
                        e.preventDefault();
                        if(promptText?.trim()?.length === 0) return;
                        postAiPrompt();
                    }
                }
            };
            /* Handle keydown eventHandler - start*/
            if (promptInput?.current) promptInput.current.addEventListener("keydown", handleKeyDown);
            return () => {
                if (promptInput?.current) promptInput.current.removeEventListener("keydown", handleKeyDown);
            };
        }
    });

    // check whether cursor/caret is in editor or not
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

    const postAiPrompt = () => {
        if(promptText?.trim()?.length === 0) return;
        promptInput.current.blur();
        let formdata = new FormData();
        let isCoAuthor = window.location.pathname.includes('book-writing');
        let bookId = URL_SEARCH_PARAMS.get("book");
        if (document.querySelector('.temp-color')) {
            document.querySelector('.temp-color').classList.remove('temp-color');
        }
        formdata.append("catagories", 9);   // for freestye the category is "9"
        if (isCoAuthor && bookId) {
            formdata.append("book", bookId);	
        }
        formdata.append("description", promptText?.trim());
        formdata.append("source_prompt_lang", 17);      // source language
        // // loop based on the number of target-language
        // targetLanguage?.map(each => {                               // target language
            // formdata.append("get_result_in", 38);
            // formdata.append("get_result_in", 32);
        // });
        setPromptText("");
        setIsGenerating(true);

        Config.axios({
            url: `${Config.BASE_URL}/writer/aiprompt/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                if (response.data?.id) {
                    generatedPromptId.current = response.data?.id;
                    getAiPromptResult(response.data?.id);
                }
            },
            error: (err) => {
                if (err.response.status === 400) {
                    if (err.response.data?.msg?.includes('Insufficient Credits')) {
                        setShowCreditAlertModal(true);
                        setIsGenerating(false);
                    }
                }
                if (err.response.status === 500) {
                    Config.toast(t("paraphrase_get_error_3"), 'error');
                    setIsGenerating(false);
                }
                setIsGenerating(false);
            }
        });
    }

    // get the ai prompt results with prompt ID
    const getAiPromptResult = (promptId) => {
        Config.axios({
            url: `${Config.BASE_URL}/writer/prompt_result/?prompt_id=${promptId}`,
            auth: true,
            success: (response) => {
                // setFreeStylePromptResultsList(response.data)
                setIsGenerating(false);
                let data = [];
                Object.values(response.data[0]?.prompt_results)?.map(item => {
                    data.push({
                        data: item
                    });
                })
                let dataList = data[0].data;
                const rng = $('.summernote').summernote('editor.getLastRange');
                const isCollapsed = rng.isCollapsed();
                if(!isCollapsed){
                    const newRng = rng.getWordRange(true);   // after cursor
                    newRng.select();
                }else rng.select()
                dataList?.forEach(result => {
                    let text = result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g);
                    insertResultInEditor(text);
                });                
            },
        });
    }

    // insert the generated text in editor
    const insertResultInEditor = (text) => {
        text.forEach((each) => {
            // var divNode = document.createElement('div');
            var pNode = document.createElement('p');
            var brNode = document.createElement('p');
            brNode.innerHTML = "<br />";
            pNode.innerHTML = each.trim();
            pNode.className = 'temp-color';
            // pNode.style = 'display: inline';
            if (containsRtlCharacters(each)) {
                pNode.classList.add('right-align-lang-style');
            } else {
                pNode.classList.remove('right-align-lang-style');
            }
            pNode?.addEventListener('click', removeBgColor);
            var caretPosition = getCaretCharacterOffsetWithin(document.querySelector('.note-editable'));
            if (caretPosition === 0) {
                document.querySelector('.note-editable').appendChild(pNode)?.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
                document.querySelector('.note-editable').appendChild(brNode);
            }else{
                $('.summernote')?.summernote('insertNode', pNode);
                $('.summernote')?.summernote('insertNode', brNode);
                pNode?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    } 
    
    return (
        <section className="global-footer-main-wrapper">
            {/* <div className="prompting-area-header">
                <p className="title">Prompt message</p>
                <div className="collapse-btn" onClick={() => setPromptMainWrapper(!promptMainWrapper)}>
                    <KeyboardArrowDownIcon className="close-icon" style={promptMainWrapper ? { transform: 'rotate(180deg)' } : { transform: 'rotate(360deg)' }} />
                </div>
            </div> */}
            <div className="prompting-main-wrapper" 
                // style={{ height: promptMainWrapper ? "calc(100% - 38px)" : "auto", display: promptMainWrapper ? "flex" : "none"}}
            >
                {/* <div className={"global-footer-options-wrapper " + (deskLeftSideBar ? "show " : (!deskLeftSideBar && !rightSideBar) && "hide")}></div> */}
                <div className="gloabl-footer-prompt-typing-wrapper">
                    <div className="prompt-typing-area">
                        <div className="prompt-typing-inner-area">
                            <div className="prompt-option-wrapper">
                                {/* <div className="languagemodal-button" onMouseUp={() => { setshowSrcLangModal(true) }}>
                                    <span className="value">{promptSrcLabel}</span>
                                    <span className="icon"><i className="fas fa-caret-down"></i></span>
                                </div> */}
                                {/* <div className="languagemodal-button" onMouseUp={() => { setshowTarLangModal(true) }}>
                                    {promptTarLang == "" ? (
                                        <span className="value">
                                            {t("result_in")}
                                        </span>
                                    ) : (
                                        <span className="value">
                                            {
                                                promptTarLang.length === 1 ? (
                                                    promptTarLang?.language
                                                ) : (
                                                    `${promptTarLang.length +
                                                    " " +
                                                    (promptTarLang.length > 1 ? t("languages") : t("language")) +
                                                    ""}`
                                                )
                                            }
                                        </span>
                                    )}
                                    <span className="icon"><i className="fas fa-caret-down"></i></span>
                                </div> */}
                            </div>
                            <div className="prompt-type-area-wrapper">
                                <div className="prompt-type-area">
                                    <div className="prompt-type-area-inner-wrapper">
                                        <TextareaAutosize
                                            ref={promptInput}
                                            className="sent-input" 
                                            placeholder="Ask something"
                                            value={promptText}
                                            maxLength={1000}
                                            onChange={handlePromptTextChange}
                                            onKeyDown={handlePromptBoxKeyDown}
                                        />
                                        <div className="prompt-send-icon-main">
                                            <button  className="prompt-send-icon" 
                                                style={promptText?.trim()?.length === 0 ? {pointerEvents: 'none', opacity: 0.5, backgroundColor: "#ebebeb"} : {}}
                                                onClick={postAiPrompt}  disabled={promptText?.trim()?.length === 0} >
                                                {isGenerating ? (
                                                    <CircularProgress sx={{ color: 'grey.500' }} style={{height: '22px', width: '22px'}} />
                                                ) : (
                                                    <img src={ChatSentIcon} alt="prompt-sent-icon" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="prompt-box-foot-notes" style={promptText?.trim()?.length === 0 ? {opacity: 0} : {opacity: 1}} >
                                        <small className="multiline-chat-help-text">{promptText?.trim()?.length}/1000</small>
                                        <span className="multiline-chat-help-text">
                                            <b>Shift + Enter</b> {t("multiline_text_box_help_text")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={"global-footer-customize-wrapper " + (rightSideBar ? "show " : (!deskLeftSideBar && !rightSideBar) ? "remove" : "hide")}></div> */}
            </div>
        </section>
    )
}

export default CoAuthorWriterFooter;    