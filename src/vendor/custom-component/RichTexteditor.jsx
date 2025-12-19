import {useEffect, useRef} from 'react'
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'summernote/dist/summernote-bs4';
import 'summernote/dist/summernote-bs4.css';
import sanitizeHtml from 'sanitize-html-react';
import { useTranslation } from "react-i18next";

const RichTexteditor = (props) => {
    let {
        editorRef,
        triggerFocuseWritter,
        translation,
        handleChangeUpdate,
        contentEditableFocus,
        isWorkspace,
        // handleSynchronizedScrollWriter
    } = props;

    const { t } = useTranslation();

    const directChildRef = useRef(null);    

    useEffect(() => {
        // customFn()
        $('.summernote').summernote({
            callbacks: {
                onPaste: async function (e) {
                    e.preventDefault()
                    // Get the pasted content as HTML
                    // below two line are very important it gets the clipboard value from noramlly and manually copied data
                    var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                    var pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
                    // var pastedHTML = (e.originalEvent || e).clipboardData.getData('text/html');

                    // Create a temporary div to parse and clean the pasted content
                    var tempDiv = document.createElement('span');
                    tempDiv.innerHTML = pastedData;

                    // Remove inline styles and attributes from all elements
                    var elementsWithStyles = tempDiv.querySelectorAll('*[style]');
                    elementsWithStyles.forEach(function(element) {
                        element.removeAttribute('style');
                    });
                    // Insert the cleaned HTML into the contenteditable div
                    var cleanedHTML = tempDiv.innerHTML;
                    document.execCommand('insertHTML', false, cleanedHTML);
                    // var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                    // var pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
                    // let plain_text = clipboardData.getData('text/plain')
                    // // Remove unwanted styles and retain basic formatting
                    // var tempDiv = document.createElement('div');
                    // tempDiv.innerHTML = pastedData;

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
                    //     if (containsRtlCharacters(plain_text)) {
                    //         p_tag.classList.add('right-align-lang-style')
                    //     } else {
                    //         p_tag.classList.remove('right-align-lang-style')
                    //     }

                    // }, 100);

                    // var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData || window.clipboard).getData('text/html');
                    // var plain_text = ((e.originalEvent || e).clipboardData || window.clipboardData || window.clipboard).getData('text/plain');
                    // e.preventDefault();
                    // if (bufferText !== '') {
                    //     var div = $('<p />');
                    //     div.append(bufferText);
                    //     div.find('*').removeAttr('style');
                    //     setTimeout(function () {
                    //         document.execCommand('insertNode', false, div);
                    //     }, 10);

                    // } else {
                    //     navigator.clipboard.readText()
                    //         .then(text => {
                    //             setTimeout(function () {
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
                        document.querySelector('.temp-color').classList.remove('temp-color');
                    }
                    if (document.querySelector('.tab-to-write-more-tooltip')) {
                        document.querySelector('.tab-to-write-more-tooltip').style.visibility = "hidden";
                    }
                },
                onChange: function (e) {
                    if(isWorkspace){
                        handleChangeUpdate(true);
                    }
                    // currentSummerNoteTextData.current = count(document?.querySelector('.note-editable')?.innerText.replace(/\n/g, '')).chars
                    // dispatch(setWriterWordCount({
                    //     char: (currentSummerNoteTextData.current !== null && currentSummerNoteTextData.current !== undefined) ? currentSummerNoteTextData.current : 0,
                    //     word: document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length !== undefined ? document?.querySelector('.note-editable')?.innerText?.trim()?.split(/\s+/)?.filter(each => each?.trim() !== '')?.length : 0
                    // }))
                    // const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
                    // let isCoAuthor = window.location.pathname.includes('book-writing')
                    // let item_id = URL_SEARCH_PARAMS.get('item')
                    // let matter = URL_SEARCH_PARAMS.get('matter')
                    // let isStreaming = URL_SEARCH_PARAMS.get('streaming') ? true : false
                    // if(isCoAuthor && item_id && matter && !isStreaming){
                    //     debounce(bookMatterItemSaveLogic)
                    // }
                    // if (!isInitialHtmlDataLoaded.current && !isCoAuthor) {
                    //     if ((window.location.pathname != '/word-processor/article/') && (window.location.pathname != '/book-writing')) {
                    //         if (URL_SEARCH_PARAMS.get("pdf-id") || URL_SEARCH_PARAMS.get("task")) {
                    //             debounce(saveHtmlDataForPdf)
                    //             // saveHtmlDataForPdf()
                    //         } else if (createdDocumentId.current) {
                    //             debounce(saveHtmlDataForDocument)
                    //             // saveHtmlDataForDocument()
                    //         } else if (URL_SEARCH_PARAMS.get("transcription-task")) {
                    //             debounce(saveTranscriptionData)
                    //             // saveTranscriptionData()
                    //         }
                    //         else {
                    //             debounce(createNewDocument)
                    //             // createNewDocument()
                    //         }
                    //     }
                    // }

                    // Get the parent div element
                    const parentDiv = document.querySelector('.note-editable');
                    // Get direct child p tags within the parent div
                    let contentTags = [];
                    if (parentDiv?.children && parentDiv.children.length > 0) {
                        contentTags = Array.from(parentDiv.children).filter(function (element) {
                            return element.tagName.toLowerCase() === 'p';
                        }); 
                    } else {
                        contentTags = document.querySelectorAll('.note-editable');
                    }
                    // Loop through the selected p tags and perform actions
                    contentTags.forEach(function (pTag) {
                        // Access each p tag and perform actions
                        if (containsRtlCharacters(pTag.textContent)) {
                            pTag.classList.add('right-align-lang-style')
                        } else {
                            pTag.classList.remove('right-align-lang-style')
                        }
                    });
                    // // let range = window.getSelection().getRangeAt(0);
                    // // let current_node = range?.commonAncestorContainer?.parentElement;
                    // // let current_text = range?.commonAncestorContainer?.parentElement?.innerText;
                    // // if (current_text?.trim() !== '' && current_text?.trim()?.length >= 3) debounce(() => detectLanguage(current_text, current_node));
                    // let htmlContent = document.querySelector('.note-editable')?.innerHTML;
                    // // document.querySelector('.note-editable-backdrop').innerHTML = htmlContent;
                    // // Config.debounceApiCalls(symSpellCheck);
                },
                onScroll: function () {
                    // checkSelection();
                    // props.debounceApiCall();
                    // handleSynchronizedScrollWriter();
                },
                onFocus: function (e) {
                    if(isWorkspace){
                        contentEditableFocus(e,'editor');
                    }
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
                    // document.querySelector('.word-count-number').innerHTML = 0
                    $(".note-editable").on('click', function (e) {
                        if(isWorkspace){
                            triggerFocuseWritter();
                        }
                    });
                },
                onImageUpload: async function (files) {
                    // let name = files[0]?.name;
                    // let img = new Image()
                    // img.src = window.URL.createObjectURL(files[0])
                    // img.onload = () => {
                    //     let loaderPTag = document.createElement('p')
                    //     loaderPTag.classList.add('skeleton-box', 'img-loader-tag')
                    //     let width = window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('width').replaceAll('px', '') - (window.getComputedStyle(document.querySelector('.note-editable')).getPropertyValue('padding-left').replaceAll('px', '') * 2)

                    //     if (img.width > width) {
                    //         loaderPTag.style.setProperty('width', `100%`)
                    //         loaderPTag.style.setProperty('height', `${img.height*(width/img.width)}px`)
                    //     } else {
                    //         loaderPTag.style.setProperty('width', img.width)
                    //         loaderPTag.style.setProperty('height', img.height)
                    //     }
                    //     $('.summernote').summernote("insertNode", loaderPTag);
                    // }
                    // let lastDot = name?.lastIndexOf(".");
                    // let ext = "." + name?.substring(lastDot + 1);
                    // if (ext?.toLowerCase() !== ".png" && ext?.toLowerCase() !== ".jpg" && ext?.toLowerCase() !== ".jpeg") {
                    //     Config.toast('Only .png, .jpg and .jpeg files are supported', 'warning')
                    //     return;
                    // }
                    // let isCoAuthor = window.location.pathname.includes('book-writing')

                    // if (!isCoAuthor && createdDocumentId.current == null && URL_SEARCH_PARAMS.get("document-id") == null && transcriptionTaskId.current == null && pdfTaskId.current == null) {
                    //     createNewDocument('image-upload', files)
                    // } else {
                    //     uploadImagesToServer(files)
                    // }

                },
                onMediaDelete: async function (target) {
                    // deleteImageFromServer(target[0]);
                },
                onBlur: function () {
                },
                onKeyup: function (e) {
                    if (document.querySelector('.note-editable').innerHTML.length === 0) {
                        $('.summernote').summernote('formatPara');
                    }
                    changeParagraphStyleDropDownLabel(e);
                    // if ($('.summernote').summernote('isEmpty') === false && imgNode?.current?.nodeName === 'IMG') {
                    //     if (e.key === 'Delete') {
                    //         e.preventDefault()
                    //         deleteImageFromServer(imgNode?.current) // remove the image from server
                    //         imgNode?.current?.remove()  // remove the image from DOM
                    //         $('.summernote').summernote('focus');
                    //         $('.summernote').summernote('insertText', '');
                    //     }
                    //     if ((e.ctrlKey || e.metaKey) && e.keyCode == 67) {
                    //         // Do stuff.
                    //         e.preventDefault()
                    //         // navigator.clipboard.writeText(node);
                    //         copyImage(imgNode?.current?.src)
                    //     }
                    //     if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) {
                    //         e.preventDefault()
                    //         copyImage(imgNode?.current?.src)
                    //         setTimeout(() => {
                    //             imgNode?.current?.remove()
                    //             deleteImageFromServer(imgNode?.current) // remove the image from server
                    //             $('.summernote').summernote('focus');
                    //             $('.summernote').summernote('insertText', '');
                    //         }, 150);
                    //         // Do stuff.
                    //     }
                    // }
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
            dialogsInBody: isWorkspace ? true : false,
            // fontNames: FontFamilyList2,
            // fontNamesIgnoreCheck: FontFamilyList2, 
            // fontSizeUnits: ['pt', 'px'],
            toolbar: [
                // ['mybutton', ['copy','paste','pasteFormat',]],
                // Config.userState?.internal_member_team_detail?.role !== 'Editor' && ['document', ['newDoc', 'openDoc']],
                ['style', ['undo', 'redo']],
                ['style', ['styleDropdown']],
                ['style', ['bold', 'italic', 'underline']],
                ['font', ['superscript', 'subscript']],
                // ['color', ['forecolor']],
                // ['color', ['color']],
                ['para', [!isWorkspace ? 'ul' : '', !isWorkspace ? 'ol' : '', 'paragraph']],
                // 'indent', 'outdent'
                ['insert', ['link']],
                ['para', ['specialChar']],
                ['style', ['clear']],
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
                // newDoc: newDocumentButton,
                // openDoc: openDocumentButton,
                // // paste: PasteButton,
                // // copy: copyButton,
                // // pasteFormat: PasteButtonWithFormate,
                // voice: voiceDictateButton,
                // voiceLang: voiceLangDropDown,
                styleDropdown: styleDropdown,
                // specialChar: showSpecialCharacters,
                // spellCheckBtn: spellCheckButton,
                // ime: transliterationButton,
                // more:moreDropDown
            },
        });
        $('.dropdown-toggle').dropdown();
        $('.summernote').summernote({
            disableResizeEditor: true
        });

        $('.note-statusbar').hide();
        editorRef.current = $('.summernote')
        // $('.summernote').summernote('focus');
        $('.summernote').summernote('removeModule', 'autoLink');
        $('.summernote').summernote('fontsizeunit', 'pt');
        if(isWorkspace){
            $('.summernote').summernote('code', translation);
            $('.summernote').summernote('commit');
        }
    }, [])

    // useEffect(() => {
    //     if(translatedResponse.length >= 0){
    //     // $('.summernote').summernote('reset');
    //     $('.summernote').summernote('pasteHTML', translation);
    //     }
    // },[translatedResponse]);

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
            $('.summernote').summernote('focus');
        }
    }, [document.querySelector('.note-editable')]);


    var styleDropdown = function (context) {
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
                    '<a href="#" style="font-size: 16px" class="writer-style-list dropdown-item " aria-valuetext="normal"><i class="note-icon-menu-check"></i>Normal</a>' +
                    '<a href="#" style="font-size: 40px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h1"><i class="note-icon-menu-check"></i>Heading 1</a>' +
                    '<a href="#" style="font-size: 32px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h2"><i class="note-icon-menu-check"></i> Heading 2</a>' +
                    '<a href="#" style="font-size: 28px; font-weight: 500;" class="writer-style-list dropdown-item " aria-valuetext="h3"><i class="note-icon-menu-check"></i> Heading 3</a>',
                click: function (e) {

                    try {
                        if (e.target.ariaValueText === 'normal') {
                            $('.summernote').summernote('formatPara');
                        } else if (e.target.ariaValueText === 'h1') {
                            $('.summernote').summernote('formatH1');
                        } else if (e.target.ariaValueText === 'h2') {
                            $('.summernote').summernote('formatH2');
                        } else if (e.target.ariaValueText === 'h3') {
                            $('.summernote').summernote('formatH3');
                        }
                        if (document?.querySelector('.active-voice')) {
                            document?.querySelector('.active-voice')?.classList.remove('active-voice');
                        }
                        e.target.classList.add('active-voice')
                        let styleListDiv = document.querySelector('.summernote-style-list');
                        if(e.target !== styleListDiv){
                            document.querySelector('.style-select-btn').innerHTML = e.target.innerText;
                            document.querySelector('.note-dictation')?.firstChild.setAttribute('aria-valuetext', e.target.ariaValueText);
                        }                        
                    } catch (e) {
                        console.error(e);
                    }
                },
            }),
        ]);
        return button.render(); 
    }

    const searchParent = (node) => {
        if (!node) return null; 
        if (node.classList.contains('note-editable')) return node; 
        directChildRef.current = node
        return searchParent(node.parentElement);
    };

    const changeParagraphStyleDropDownLabel = (event) => {
        // style select drop-down
        let styleSelect = document.querySelector('.style-select-btn');
        directChildRef.current = null;
        const selection = window.getSelection();
        const parentElement = searchParent(selection.anchorNode.parentElement);
        let tag = directChildRef.current?.tagName;
        if (tag === 'H1') {
            styleSelect.innerHTML = "Heading 1";
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice');
            }
            document.querySelector('[aria-valuetext="h1"]').classList.add('active-voice');
        } else if (tag === 'H2') {
            styleSelect.innerHTML = "Heading 2";
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice');
            }
            document.querySelector('[aria-valuetext="h2"]').classList.add('active-voice');
        } else if (tag === 'H3') {
            styleSelect.innerHTML = "Heading 3";
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice');
            }
            document.querySelector('[aria-valuetext="h3"]').classList.add('active-voice');
        } else if (tag === 'P') {
            styleSelect.innerHTML = "Normal";
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice');
            }
            document.querySelector('[aria-valuetext="normal"]').classList.add('active-voice');
        }else {
            styleSelect.innerHTML = "Normal";
            if (document?.querySelector('.active-voice')) {
                document?.querySelector('.active-voice')?.classList.remove('active-voice');
            }
            document.querySelector('[aria-valuetext="normal"]').classList.add('active-voice');
        }
    }

    // Function to check if a string contains RTL characters
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

    return (
        <form  className="ailaysa-writer-form-main-wrapper writer-form-component">
            <textarea className="summernote" name="editordata"></textarea> 
        </form>
    )
}

export default RichTexteditor