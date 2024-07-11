import { useEffect, useRef, useState } from 'react'
import useStateWithHistory from '../../vendor/custom-component/useStateWithHistory'
import { TextareaAutosize } from '@mui/material'
import generateKey from '../speech-component/speech-to-text/recorder-components/utils/GenerateKey'
import Config from '../../vendor/Config'
import { useDispatch } from 'react-redux'
import { setSpellCheckHtmlData } from '../../features/SpellCheckHtmlDataSlice'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import SpellCheckDocumentListModal from "./SpellCheckDocumentListModal";
import { useNavigate } from 'react-router-dom'


const SpellCheckRichTextNormalEditor = (props) => {

    let {
     
        isSpellCheckEnable,
        setIsLoading,
        setReferenceDocument,
        setProject
    } = props

    const copyTarDivRef = useRef(null)
    const spellCheckResponseRef = useRef([])

    const navigate = useNavigate()

    const [historyArrState, setHistoryArrState, { historyArr, pointer, back, forward, go }] = useStateWithHistory("")
    const [isTarTextEmpty, setIsTarTextEmpty] = useState(false)
    const [changesSaved, setChangesSaved] = useState(true)
    const clickedWrongWordRef = useRef(null)
    const clickedMarkEleRef = useRef(null)
    const tarDivRef = useRef(null)
    const [rectElement, setRectElement] = useState(null);
    const [translateResultText, setTranslateResultText] = useState('')
    const [spellCheckWordsOptions, setSpellCheckWordsOptions] = useState([]);
    const [spellCheckSuggestion, setSpellCheckSuggestion] = useState()
    const [showDocumentListModal, setShowDocumentListModal] = useState(true)
    const supportFileExtensions = useRef([".docx"]);
    const [docx, setDocx] = useState(null)

    const dispatch = useDispatch()
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);


    const handleSave = () => {
        let formData = new FormData();
        formData.append("html_data", copyTarDivRef.current.innerHTML);


        Config.axios({
            url: `${Config.BASE_URL}/openai/ocr-proof-reading/${URL_SEARCH_PARAMS.get('id')}/`,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                console.log(response)
               
            },
            error: (err) => {
                console.log(err)

            }
        });
    }

    const [isFileLoading, setIsFileLoading] = useState(false)

    const handleCreateSpellCheckProject = (docx) => {
        let formData = new FormData();
        setProject(null)
        setTranslateResultText(null)    
        setIsFileLoading(true)
        formData.append("ocr_result", docx);
        setShowDocumentListModal(false)



        Config.axios({
            url: `${Config.BASE_URL}/openai/ocr-proof-reading/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {

                navigate(`/spell-check?id=${response?.data?.id}`)
                setProject(response.data)
                setTranslateResultText(response.data.html_data)
                setIsFileLoading(false)
            },
            error: (err) => {
                setDocx(null)
                setIsFileLoading(false)
                console.log(err)

            }
        });
    }

    const getDocument = (id) => {


        setIsLoading(true)
        let url = `${Config.BASE_URL}/openai/ocr-proof-reading/${id}`;
        Config.axios({
            url: url,
            method: "GET",
            auth: true,
            success: (response) => {
              setProject(response.data)
              setReferenceDocument(response?.data?.main_document)
              setTranslateResultText(response.data.html_data)
              dispatch(setSpellCheckHtmlData(response.data.html_data))
              setIsLoading(false)

            },
        });
    }


    useEffect(() => {
        if(window.location.pathname.includes('spell-check') && URL_SEARCH_PARAMS.get('id')){
            setShowDocumentListModal(false)
            getDocument(URL_SEARCH_PARAMS.get('id'))
        }
    },[])


       /* Check the file is a supprt file type */
       const isSupportedFile = (file) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (supportFileExtensions.current.indexOf(ext) == -1) {
            Config.showToast(t("file_format_not_support"), 'warning')
            return false;
        }
        return true;
    };




    const handleInputFile = (e) => {
        let thisFiles = e.target.files[0];
        if (isSupportedFile(thisFiles)) {
            setDocx(thisFiles)
            handleCreateSpellCheckProject(thisFiles)
        }

    }


    const handleTargetKeyDown = (e) => {
        if (e.ctrlKey) {
            if (e.which === 90) {
                console.log("pointer: " + pointer)
                console.log(historyArr)
                console.log('undo')
                back()

                if (historyArrState !== '') {
                    setTranslateResultText(historyArrState)
                    copyTarDivRef.current.innerHTML = historyArrState
                }
            }
            if (e.which === 89) {
                console.log("pointer: " + pointer)
                console.log(historyArr)
                console.log('redo')
                forward()
                if (historyArrState !== '') {
                    setTranslateResultText(historyArrState)
                    copyTarDivRef.current.innerHTML = historyArrState
                }
            }
        }
    }


    const handleTargetChange = (e) => {
        // setTargetInputBox(e.target.innerText)
        console.log('target change')

        setTranslateResultText(e.target.value)
        copyTarDivRef.current.innerHTML = e.target.value
        console.log('target change')
        dispatch(setSpellCheckHtmlData(copyTarDivRef.current.innerHTML))
     
        if (e.target.value?.trim()?.length === 0) {
            setIsTarTextEmpty(true)
        } else {
            setIsTarTextEmpty(false)
        }
        if (e.target.innerText?.replace(/\n/g, "")?.replace(/\r/g, "") === savedTargetData?.replace(/\n/g, "")?.replace(/\r/g, "")) {
            setChangesSaved(true)
        } else {
            setChangesSaved(false)
        }
    }


    useEffect(() => {
        if (spellCheckWordsOptions?.length !== 0) {
            highlightSpellCheckWords()
        }
    }, [spellCheckWordsOptions])


    const removeSpecificTag = (text, tags = []) => {
        if (typeof tags == "string") tags = [tags];
        let regExp = "";
        tags.map((tag) => {
            regExp = new RegExp("<" + tag + "[^>]*>", "g");
            if (text != null) text = text.replace(regExp, "");
            regExp = new RegExp("</" + tag + ">", "g");
            if (text != null) text = text.replace(regExp, "");
        });
        return text;
    };





    const highlightSpellCheckWords = () => {

        if (translateResultText?.length === 0) return
        // let content_editable_div = targetContentEditable.current[segment_id].current

        if (spellCheckWordsOptions?.length !== 0) {
            let words_list = spellCheckWordsOptions?.map(each => {
                return each.word
            })

            var text = translateResultText
            var wordsToHighlight = words_list; // Array of words to highlight
            // console.log(text)

            try {
                // Generate regular expression pattern with all the words to highlight
                function escapeRegExp(text) {
                    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }

                // Generate regular expression pattern with all the words to highlight
                var pattern = new RegExp('(' + wordsToHighlight.map(escapeRegExp).join('|') + ')', 'gu');
                var highlightedHtml = text.replace(
                    pattern, (match) => {
                        let uid = generateKey()
                        return `<mark data-word=${`"${match}"`} id=${`"spell-check-${uid}"`} class="spellcheck-highlight" >${match}</mark>`
                    }
                );

                copyTarDivRef.current.innerHTML = removeSpecificTag(highlightedHtml, 'font');
            } catch (e) {
                console.log(e)
            }
            // restoreCursorPositionWithinContenteditable(content_editable_div);


        }
    }


    const symSpellCheck = (forceOn = false) => {



        if (tarDivRef.current.value?.length !== 0 && isSpellCheckEnable) {

            let formData = new FormData();
            formData.append("text", tarDivRef.current.value);
            formData.append("lang_code", 'ta');

            Config.axios({
                url: `${Config.BASE_URL}/openai/spelling_correction_tamil`,
                method: "POST",
                auth: true,
                data: formData,
                success: (response) => {
                    if (response.data?.result) {
                        spellCheckResponseRef.current = response.data?.result
                        setSpellCheckWordsOptions(response.data?.result)
                    }
                },
                error: (err) => { }
            });


        }

    }
    const typing = useRef(false);
    const typingTimeout = useRef(0);

    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            // projectSearchTerm?.length && callback();
            callback();
        }, 500);
    };

    useEffect(() => {
        if (translateResultText) {
            // debounce(symSpellCheck())
            Config.debounceApiCalls(symSpellCheck)
            Config.debounceApiCalls(handleSave)
            // based on the target content length decide whether it should be stick or not
        }
    }, [translateResultText])


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
        const markTags = copyTarDivRef.current.querySelectorAll('mark');
        let isSpellCheckPopOpen = document.querySelector('#pop').style.visibility === 'visible' ? true : false

        const touchedMark = isMouseOverMark(e, markTags);
        if (isMouseOverMark(e, markTags) && !isSpellCheckPopOpen) {
            // Mouse pointer is touching the bounding box of a <mark> element
            for (const markElement of markTags) {
                tarDivRef.current.style.cursor = 'pointer'
            }
            // if(document.querySelector('#pop').style.visibility === 'hidden'){
            clickedWrongWordRef.current = touchedMark
            clickedMarkEleRef.current = touchedMark
            setRectElement(touchedMark)
            // }
            // console.log("Touched <mark> element:", touchedMarkText);
        } else {
            // Mouse pointer is not over any <mark> element
            for (const markElement of markTags) {
                clickedWrongWordRef.current = null
                tarDivRef.current.style.cursor = 'text'
            }
        }
    }

    const setPopOnPosition = () => {
        // console.log("rect element "+rectElement)
        console.log(clickedWrongWordRef.current)

        if (rectElement !== null) clickedWrongWordRef.current = rectElement
        if (clickedWrongWordRef.current !== null) {
            let { element, rect } = clickedWrongWordRef.current
            rect = element?.getBoundingClientRect()
            let pos = decidePopPosition(rect);
            let top = pos.y - document.querySelector('.text-area-wizard-wrapper').scrollTop;
            let left = pos.x - document.querySelector('.text-area-wizard-wrapper').scrollLeft;
            if (top < 0)
                top = document.querySelector('.text-area-wizard-wrapper').scrollTop + 20;
            else if (top + document.querySelector('#pop').clientHeight > document.querySelector('.text-area-wizard-wrapper').clientHeight)
                top = document.querySelector('.text-area-wizard-wrapper').clientHeight - document.querySelector('#pop').clientHeight + document.querySelector('.text-area-wizard-wrapper').scrollTop - 20;
            if (left < 0)
                left = document.querySelector('.text-area-wizard-wrapper').scrollLeft + 20;
            else if (left + document.querySelector('#pop').clientWidth > document.querySelector('.text-area-wizard-wrapper').clientWidth)
                left = document.querySelector('.text-area-wizard-wrapper').clientWidth - document.querySelector('#pop').clientWidth + document.querySelector('.text-area-wizard-wrapper').scrollLeft - 20;
            if (true && (top != pos.y - document.querySelector('.text-area-wizard-wrapper').scrollTop || left != pos.x - document.querySelector('.text-area-wizard-wrapper').scrollLeft)) {
                document.querySelector('#pop').style.top = `${top}px`;
                document.querySelector('#pop').style.left = `${left}px`;
            }
            else
                document.querySelector('#pop').style.top = `${pos.y}px`;
            document.querySelector('#pop').style.left = `${pos.x}px`;

            changeArrow(pos.dir);
            document.querySelector('#pop').style.visibility = 'visible';
            document.querySelector('#pop').style.opacity = '1';

        }
    }

    const decidePopPosition = (rect) => {
        // let x = rect.left + (rect.width) / 2 - document.querySelector('#pop').clientWidth / 2 + document.querySelector('.text-area-wizard-wrapper').scrollLeft;
        let x = rect.left - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().left + (rect.width) / 2 - document.querySelector('#pop')?.clientWidth / 2 + document.querySelector('.text-area-wizard-wrapper').scrollLeft;
        if (x < 0)
            x = 0;
        else if (x + document.querySelector('#pop')?.clientWidth > document.querySelector('.text-area-wizard-wrapper')?.clientWidth)
            x = document.querySelector('.text-area-wizard-wrapper')?.clientWidth - document.querySelector('#pop')?.clientWidth;

        let y, dir;
        if (rect.top > window.innerHeight - rect.bottom) {

            y = rect.bottom - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().top + document.querySelector('.text-area-wizard-wrapper').scrollTop + 8
            dir = 'down';
        }
        else {
            y = rect.bottom - document.querySelector('.text-area-wizard-wrapper')?.getBoundingClientRect().top + document.querySelector('.text-area-wizard-wrapper').scrollTop + 8
            dir = 'down';
        }
        return { x: x, y: y, dir: dir };
    }

    const handleWrongWordClick = (e) => {
        // console.log(clickedWrongWordRef.current)        
        let clickedOverPop = e.target.closest('#pop') ? true : false


        if (clickedWrongWordRef.current !== null && !clickedOverPop) {
            let { element } = clickedWrongWordRef.current
            console.log(element)

            setPopOnPosition()
            console.log(element)

            let suggestions = spellCheckResponseRef.current?.find(each => each.word === element.innerText)?.suggestion
            try {
                let options_list = suggestions?.map((value, ind) => {
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
            } catch (e) {
                console.log(e)
            }

        } else {
            // console.log(e.target)
            // don't close when clicked inside the #pop div
            if (e.target instanceof Element && !e.target?.closest('#pop')) {
                document.querySelector('#pop').style.visibility = 'hidden';
                document.querySelector('#pop').style.opacity = '0';
                setRectElement(null)
                clickedWrongWordRef.current = null
            }
        }
    }

    // useEffect(() => {
    //   console.log("rect element "+rectElement)
    // }, [rectElement])



    const replaceWithCorrectWord = (e, value) => {
        const markTags = copyTarDivRef.current.querySelectorAll('mark');

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
        var text = tarDivRef.current.value;

        var searchWord = clickedMarkEleRef.current?.element.innerText;
        var replacementText = value;

        // Specify the index (zero-based) of the word to replace
        var instanceToReplace = index; // Replace the index occurrence (index 0 means 1st occurance | index 1 means 2nd occurance)

        // Use a regular expression to find all instances of the word
        // var regex = new RegExp(searchWord, "g");
        var regex = new RegExp('' + searchWord + '', 'g');
        var matches = text.match(regex);

        // Keep track of the current instance count
        var currentInstance = -1;

        // Use a custom replace function to replace the specific instance
        setHistoryArrState(prevState => { return text })

        var newText = text.replace(regex, function (match) {
            currentInstance++;
            if (currentInstance === instanceToReplace) {
                return replacementText;
            } else {
                return match;
            }
        });

        document.querySelector('#pop').style.visibility = 'hidden';
        document.querySelector('#pop').style.opacity = '0';

        setTranslateResultText(newText)
        setHistoryArrState(prevState => { return newText })
        copyTarDivRef.current.innerHTML = newText
    }


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
        if (clickedWrongWordRef.current !== null) {
            window.addEventListener('resize', setPopOnPosition)

            return () => {
                window.removeEventListener('resize', setPopOnPosition)
            }
        }
    }, [clickedWrongWordRef.current])





    return (
        <>
         <div className="spell-check-editor-options">
                        <span className="open-folder-icon" onClick={() => setShowDocumentListModal(!showDocumentListModal)}>
                            <i class="fas fa-folder-open"></i>
                        </span>
                        {/* <span className="open-folder-icon" onClick={handleSpellCheck}>
                            <SpellcheckIcon />
                        </span> */}
                        <span className={isSpellCheckEnable ? "open-folder-icon active" : "open-folder-icon"}>
                            <SpellcheckIcon />
                        </span>
                    </div>
                    <div className='target-normal-wrapper'>
            <div className={`instant-translate-box-main-wrapper text-area-wizard-wrapper ${isFileLoading ? "loading-json-blur" :  ""}`}>
                <div className="copy-target-text-backdrop">
                    <div
                        ref={copyTarDivRef}
                        contentEditable={true}
                        className="copy-of-translated-text"
                    >
                    </div>
                </div>
                <TextareaAutosize
                    ref={tarDivRef}
                    className="ai-text-area"
                    value={translateResultText}
                    spellCheck="false"
                    onChange={(e) => {handleTargetChange(e)}}
                    onKeyDown={handleTargetKeyDown}
                />
                <div id="pop" className="spellcheck-popover-box instant-spell-check-pop" style={{ borderRadius: '5px', background: '#fff' }}>
                    <div className="instant-popover">
                        <div className="popover-inner">
                            <span>{spellCheckSuggestion}</span>
                            <div id="arrow" className="arrow-top"></div>
                        </div>
                    </div>
                </div>
            </div>
            {showDocumentListModal && (
                    <SpellCheckDocumentListModal
                        showDocumentListModal={showDocumentListModal}
                        setShowDocumentListModal={setShowDocumentListModal}
                        handleNewFile={handleInputFile}
                        getDocument={getDocument}
                    />
                )}

        </div>
        {isFileLoading && <div id="loading-wrapper">
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>}
        </>
        
    )
}

export default SpellCheckRichTextNormalEditor