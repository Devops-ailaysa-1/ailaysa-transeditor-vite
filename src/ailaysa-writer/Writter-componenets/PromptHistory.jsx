import React, { useState, useEffect, useRef } from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
//import { historyDetailDump, historyDump } from './HistoryCardDump';
import Config from '../../vendor/Config';
import Tooltip from '@mui/material/Tooltip';
// import DOMPurify from 'isomorphic-dompurify';
import sanitizeHtml from 'sanitize-html-react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from "react-i18next";
import AssetsDeleteIcon from "../../assets/images/new-ui-icons/assets-delete-icon.svg"

export const PromptHistory = (props) => {
    let {
        mainCategoryRef,
        subCategoryRef,
        targetLanguageOptionsRef,
        toneOptionsRef,
        moveToEditorFromHistory,
        historyTab,
        getSummerNotePlainText,
        summerNoteEditorRef,
        setHistoryTab,
        saveHtmlDataForDocument,
        isCopiedFromSummernoteRef
    } = props

    const [promptHistoryList, setPromptHistoryList] = useState(null)
    const [customizationHistoryList, setCustomizationHistoryList] = useState(null)
    const [aiImageHistoryList, setAiImageHistoryList] = useState([])
    const [promptCardIndex, setPromptCardIndex] = useState(null)
    const [customizeCardIndex, setCustomizeCardIndex] = useState(null)
    const [imageCardIndex, setImageCardIndex] = useState(null)
    const [toggleState, setToggleState] = useState(1)
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const [promptSearchText, setPromptSearchText] = useState('')
    const [customizeSearchText, setCustomizeSearchText] = useState('')

    const [isCopied, setIsCopied] = useState(false)

    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const searchPromptTextRef = useRef('')
    const searchCustomizeTextRef = useRef('')
    const langSearchOutsideClick = useRef();

    const { t } = useTranslation();


    const rightAlignLangId = [4, 83, 31, 60, 101, 88, 106]

    useEffect(() => {
        if (historyTab) {
            getPromptHistory()
            getCustomizationHistory()
            getAIImageHistory()
        }
    }, [historyTab])


    useEffect(() => {
        if (promptHistoryList !== null && promptHistoryList?.length !== 0) {
            setPromptCardIndex(promptHistoryList[0]?.id)
        }
    }, [promptHistoryList])

    useEffect(() => {
        if (customizationHistoryList !== null && customizationHistoryList?.length !== 0) {
            setCustomizeCardIndex(customizationHistoryList[0]?.id)
        }
    }, [customizationHistoryList])

    useEffect(() => {
        if (aiImageHistoryList !== null && aiImageHistoryList?.length !== 0) {
            setImageCardIndex(aiImageHistoryList[0]?.id)
        }
    }, [aiImageHistoryList])

    // handle click outside the search input box
    useEffect(() => {
        const handleSearchTermClickOutside = (e) => {
            if (langSearchOutsideClick.current && !langSearchOutsideClick.current.contains(e.target)) {
                setOnFocusWrap(false);
            }
        };
        document.addEventListener("mousedown", handleSearchTermClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleSearchTermClickOutside);
        };
    });

    // get total prompt history list
    const getPromptHistory = (target, promptId) => {
        Config.axios({
            url: `${Config.BASE_URL}/openai/prompt_result/${(searchPromptTextRef.current?.value !== '' && searchPromptTextRef.current?.value !== undefined) ? `?search=${searchPromptTextRef.current?.value}` : ''}`,
            auth: true,
            success: (response) => {
                setPromptHistoryList(response.data)
                if (target === 'from-delete') {
                    let found = response.data?.find(each => each?.id === promptId)
                    found !== undefined ? setPromptCardIndex(promptId) : setPromptCardIndex(response.data[0]?.id)
                }
            },
        });
    }

    const getCustomizationHistory = (target) => {
        Config.axios({
            url: `${Config.BASE_URL}/openai/customize_history/${(searchCustomizeTextRef.current?.value !== '' && searchCustomizeTextRef.current?.value !== undefined) ? `?search=${searchCustomizeTextRef.current?.value}` : ''}`,
            auth: true,
            success: (response) => {
                setCustomizationHistoryList(response.data)
                if (target === 'from-delete') {
                    setCustomizeCardIndex(response.data[0]?.id)
                    // let found = response.data?.find(each => each?.id === customizeId)
                    // found !== undefined ? setCustomizeCardIndex(customizeId) : setCustomizeCardIndex(response.data[0]?.id)
                }
            },
        });
    }

    const getAIImageHistory = () => {
        Config.axios({
            url: `${Config.BASE_URL}/openai/image_history/`,
            auth: true,
            success: (response) => {
                setAiImageHistoryList(response.data)
            },
        });
    }

    // delete function for both deleting total prompt result and deleting individual prompt result
    const deleteAiWrittingPrompt = (target, id, promptId, from) => {
        Config.axios({
            url: `${Config.BASE_URL}/openai/history/?${target}=${id}`,
            auth: true,
            method: 'DELETE',
            success: (response) => {
                Config.toast(t("deleted_success"))
                if (from === 'prompt-history') {
                    if (target === 'prompt_id') {     // remove the prompt object dynamically from list and active & scroll to the first item in list
                        setPromptHistoryList(promptHistoryList?.filter(each => each.id !== id))
                        setTimeout(() => {
                            let activeItem = document.querySelector('.history-leaf.active')
                            activeItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                        }, 50);
                    } else if (target === 'obj_id') {  // remove the individual prompt object and get the new prompt history list from API
                        getPromptHistory('from-delete', promptId)
                    }
                }
                if (target === 'customize_obj_id') {      // remove the customization object dynamically from list and active & scroll to the first item in list
                    setCustomizationHistoryList(customizationHistoryList?.filter(each => each.id !== id))
                    setTimeout(() => {
                        let activeItem = document.querySelector('.history-leaf.active')
                        activeItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                    }, 50);
                }
            },
        });
    }

    const openPromptHistoryData = (id) => {
        setPromptCardIndex(id)
    }

    const openCustomizeHistoryData = (id) => {
        setCustomizeCardIndex(id)
    }
    const openAiImageHistoryData = (id) => {
        setImageCardIndex(id)
    }


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


    const handleTextCopy = (text) => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
        isCopiedFromSummernoteRef.current = true
        setTimeout(() => {
            if(isCopiedFromSummernoteRef.current){
                isCopiedFromSummernoteRef.current = false
            }
        }, 8000);
    }
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const debounce = (callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            callback();
        }, 400);
    };

    const handleOnclick = (e) => {
        searchPromptTextRef.current?.focus();
        setOnFocusWrap(true)
    }

    const handleCloseIconPress = () => {
        if (toggleState === 1) {
            setPromptSearchText('')
            searchPromptTextRef.current.value = ''
            getPromptHistory()
        }
        else {
            setCustomizeSearchText('')
            searchCustomizeTextRef.current.value = ''
            getCustomizationHistory()
        }
        setOnFocusWrap(false)
    }

    const handleSearchBoxChange = (e) => {
        if (toggleState === 1) {
            debounce(getPromptHistory)
            setPromptSearchText(e.target.value)
        } else {
            debounce(getCustomizationHistory)
            setCustomizeSearchText(e.target.value)
        }
    }

    const moveImageToWriter = (imageUrl) => {
        setHistoryTab(false)
        // summerNoteEditorRef.current?.summernote('focus');
        const rng = summerNoteEditorRef.current.summernote('editor.getLastRange');
        setTimeout(() => {
            // place the cursor on old position and insert the image
            rng.select()
            var imgNode = document.createElement('img');
            imgNode.src = imageUrl
            summerNoteEditorRef.current.summernote("insertNode", imgNode);
            imgNode?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            // document.querySelector('.note-editable').appendChild(imgNode)?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 600);
    }

    function imageToBlob(imageURL) {
        const img = new Image();
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        img.crossOrigin = "";
        img.src = imageURL;
        return new Promise(resolve => {
            img.onload = function () {
                c.width = this.naturalWidth;
                c.height = this.naturalHeight;
                ctx.drawImage(this, 0, 0);
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
        setIsCopied(true)
        // Config.toast('Image copied')
    }

    return (
        <React.Fragment>
            <section className="prompt-generating-sidebar-history" style={{ display: historyTab ? '' : 'none' }} >
                <div className="prompt-sidebar-ui ">
                    <div className="sticky__history__tab">
                        <div className="bloc-tabs tab-heading ">
                            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(1) }}>
                                {t("generated")}
                            </div>
                            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(2) }}  >
                                {t("customized")}
                            </div>
                            <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => { toggleTab(3) }}  >
                                {t("ai_image")}
                            </div>
                        </div>
                        {toggleState != 3 &&
                            <div ref={langSearchOutsideClick} className={"lang-modal-search-area prompt__history_search " + (onFocusWrap ? "focused" : null)}>
                                <input
                                    ref={toggleState === 1 ? searchPromptTextRef : searchCustomizeTextRef}
                                    value={toggleState === 1 ? promptSearchText : customizeSearchText}
                                    onClick={(e) => handleOnclick(e)}
                                    type="text"
                                    placeholder={t("search")}
                                    onChange={handleSearchBoxChange}
                                    className="search-input"
                                    autoFocus
                                />
                                <div className={(onFocusWrap || promptSearchText !== '' || customizeSearchText !== '') ? "icon-wrap" : "search-icon"}>
                                    {
                                        (onFocusWrap || promptSearchText !== '' || customizeSearchText !== '') ?
                                            <CloseOutlinedIcon
                                                onClick={handleCloseIconPress}
                                                className="icon"
                                            />
                                            :
                                            <SearchOutlinedIcon className="icon" />
                                    }
                                </div>
                            </div>
                        }
                    </div>


                    <div className='prompt__history'>
                        {(promptHistoryList === null && toggleState == 1) && Array(4).fill(null)?.map((item, index) => {
                            return (
                                <div key={index} className={"history-leaf "}>
                                    <div className="catogory-container">
                                        {
                                            <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        }
                                    </div>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '12px' }} width={100} />

                                </div>
                            )
                        })}
                        {customizationHistoryList === null && toggleState == 2 && Array(4).fill(null)?.map((item, index) => {
                            return (
                                <div key={index} className={"history-leaf "}>
                                    <div className="catogory-container">
                                        {
                                            <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        }
                                    </div>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '12px' }} width={100} />

                                </div>
                            )
                        })}
                        {aiImageHistoryList === null && toggleState == 3 && Array(5).fill(null)?.map((item, index) => {
                            return (
                                <div key={index} className={"history-leaf "}>
                                    <div className="catogory-container" style={{ display: 'block' }}>
                                        {
                                            <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        }
                                    </div>
                                    <Skeleton variant="text" sx={{ fontSize: '12px' }} width={100} />

                                </div>
                            )
                        })}
                        {toggleState == 1 ? (
                            promptHistoryList?.length !== 0 ? (
                                promptHistoryList?.map((eachPrompt) => {
                                    return (
                                        <>
                                            <div key={eachPrompt?.id} className={"history-leaf " + (promptCardIndex === eachPrompt?.id ? "active" : "")} onClick={() => openPromptHistoryData(eachPrompt.id)}>
                                                <div className="catogory-container">
                                                    {
                                                        eachPrompt.catagories !== 9 ? (
                                                            <h4 className="catogory">{mainCategoryRef.current?.find(each => each.value === eachPrompt.catagories)?.label}</h4>
                                                        ) : (
                                                            <h4 className="catogory">{t("any_text")}</h4>
                                                        )
                                                    }

                                                    {
                                                        eachPrompt.sub_catagories !== null && (
                                                            <span className="sub-catogory">{subCategoryRef.current?.find(each => each.id === eachPrompt.sub_catagories)?.sub_category}</span>
                                                        )
                                                    }
                                                </div>
                                                <p className="category-desc-cont">{eachPrompt?.description}</p>
                                                <span className="history-timing">{Config.getProjectCreatedDate(eachPrompt?.created_at)}</span>
                                            </div>
                                        </>
                                    )
                                })
                            ) : (
                                <p className='prompt-history-no-prompt'>{t("no_prompt")}</p>

                            )
                        ) : toggleState == 2 ? (
                            // tab2 content
                            customizationHistoryList?.length !== 0 ? (
                                customizationHistoryList?.map(eachCust => {
                                    return (
                                        <div key={eachCust?.id} className={"history-leaf " + (customizeCardIndex === eachCust?.id ? "active" : "")} onClick={() => openCustomizeHistoryData(eachCust.id)}>
                                            <div className="catogory-container">
                                                <h4 className="catogory">{eachCust.customize_name}</h4>
                                            </div>
                                            <p className="category-desc-cont">{eachCust?.user_text}</p>
                                            <span className="history-timing">{Config.getProjectCreatedDate(eachCust?.created_at)}</span>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className='prompt-history-no-prompt'>{t("no_customization")}</p>

                            )
                        ) : toggleState == 3 ? (
                            aiImageHistoryList?.length !== 0 ? (
                                aiImageHistoryList?.map(eachImage => {
                                    return (
                                        <div key={eachImage?.id} className={"history-leaf " + (imageCardIndex === eachImage?.id ? "active" : "")} onClick={() => openAiImageHistoryData(eachImage.id)}>
                                            <div className="catogory-container">
                                                <h4 className="catogory">{eachImage.prompt}</h4>
                                            </div>
                                            {/* <p className="category-desc-cont">{eachImage?.user_text}</p> */}
                                            <span className="history-timing">{Config.getProjectCreatedDate(eachImage?.created_at)}</span>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className='prompt-history-no-prompt'>{t("no_ai_image")}</p>


                            )
                        ) : null}
                    </div>
                </div>
                <div className='history-main-wrap'>
                    {promptHistoryList === null && toggleState == 1 &&
                        <div className="history-details-wrapper">
                            <div className='history-primary-wrap'>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                    </p>
                                </div>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                </div>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                    </p>
                                </div>

                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />

                                    </p>
                                </div>
                                {
                                    Array(3).fill(null)?.map((item, index) => {
                                        return (
                                            <div key={index} className='history-detail-lines'>
                                                <p className='title'>
                                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                                    <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                                </p>
                                                <p className="value">
                                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width={100} />
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width={125} />
                                </div>
                            </div>
                            <div className='history-secondary-wrap'>
                                <h4 className='history-seconday-wrap-header'><Skeleton variant="text" sx={{ fontSize: '16px' }} width={75} /></h4>

                                <div className='history-content-details'>
                                    <p>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={300} />

                                    </p>
                                    <div className="result-toolbar">
                                        <div className="word-box-wrapper">
                                            <Skeleton variant="rectangular" width={75} height={25} />
                                            <Skeleton variant="rectangular" width={75} height={25} />
                                        </div>
                                        <div className="result-icon-innerWrap " style={{ gap: "5px" }}>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Skeleton variant="rectangular" width={125} height={50} />
                            </div>
                        </div>
                    }
                    {customizationHistoryList === null && toggleState == 2 &&
                        <div className="history-details-wrapper">
                            <div className='history-primary-wrap'>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={100} />
                                    </p>
                                </div>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={150} />
                                    </p>
                                </div>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} height={20} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={500} />
                                    </p>
                                </div>
                            </div>
                            <div className='history-secondary-wrap'>
                                <h4 className='history-seconday-wrap-header'><Skeleton variant="text" sx={{ fontSize: '16px' }} width={75} /></h4>

                                <div className='history-content-details'>
                                    <p>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={300} />

                                    </p>
                                    <div className="result-toolbar">
                                        <div className="word-box-wrapper">
                                            {/* <div className="word-container"> */}
                                            <Skeleton variant="rectangular" width={75} height={25} />

                                            {/* </div> */}
                                            {/* <div className="word-container"> */}
                                            <Skeleton variant="rectangular" width={75} height={25} />

                                            {/* </div> */}
                                        </div>
                                        <div className="result-icon-innerWrap " style={{ gap: "5px" }}>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Skeleton variant="rectangular" width={125} height={50} />
                            </div>
                        </div>
                    }
                    {aiImageHistoryList === null && toggleState == 3 &&
                        <div className="history-details-wrapper">
                            <div className='history-primary-wrap'>
                                <div className='history-detail-lines'>
                                    <p className='title'>
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={75} />
                                        <span><Skeleton variant="text" sx={{ fontSize: '14px' }} width={5} /></span>
                                    </p>
                                    <p className="value">
                                        <Skeleton variant="text" sx={{ fontSize: '14px' }} width={100} />
                                    </p>
                                </div>
                            </div>
                            <div className='history-secondary-wrap'>
                                <h4 className='history-seconday-wrap-header'><Skeleton variant="text" sx={{ fontSize: '16px' }} width={75} /></h4>

                                <div className='history-content-details'>
                                    <p>
                                        <Skeleton variant="rectangular" width={300} height={300} />
                                    </p>
                                    <div className="result-toolbar" style={{ justifyContent: 'end' }}>
                                        <div className="result-icon-innerWrap " style={{ gap: "5px" }}>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>

                                            <div className="result-icon-single-item" >
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Skeleton variant="rectangular" width={125} height={50} />
                            </div>
                        </div>
                    }

                    {toggleState == 1 ? (
                        promptHistoryList?.length !== 0 ? (
                            promptHistoryList?.map((eachPrompt) => {
                                if (promptCardIndex === eachPrompt?.id) {
                                    return (
                                        <div key={eachPrompt?.id} className="history-details-wrapper">
                                            <div className='history-primary-wrap'>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("prompt_in")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">{targetLanguageOptionsRef.current?.find(each => each.id === eachPrompt?.source_prompt_lang)?.language}</p>
                                                </div>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("result_in")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">{eachPrompt?.target_langs?.join(', ')}</p>
                                                </div>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("category")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">
                                                        {
                                                            eachPrompt.catagories !== 9 ?
                                                                mainCategoryRef.current?.find(each => each.value === eachPrompt.catagories)?.label :
                                                                t("any_text")
                                                        }
                                                    </p>
                                                </div>
                                                {eachPrompt.catagories !== 9 &&
                                                    <div className='history-detail-lines'>
                                                        <p className='title'>
                                                            {t("sub_category")}
                                                            <span>:</span>
                                                        </p>
                                                        <p className="value">{eachPrompt.sub_catagories !== null ? subCategoryRef.current?.find(each => each.id === eachPrompt.sub_catagories)?.sub_category : '-'}</p>
                                                    </div>
                                                }
                                                {
                                                    subCategoryRef.current?.find(each => each.id === eachPrompt.sub_catagories)?.sub_category_fields?.map((each, index) => {
                                                        return (
                                                            <div key={index} className='history-detail-lines'>
                                                                <p className='title'>
                                                                    {each?.fields}
                                                                    <span>:</span>
                                                                </p>
                                                                <p className="value">
                                                                    {
                                                                        (subCategoryRef.current?.find(each => each.id === eachPrompt.sub_catagories)?.sub_category_fields?.length === 1)
                                                                            ? eachPrompt?.description : (index === 0 ? (eachPrompt?.product_name !== null ? eachPrompt?.product_name : '-') : (eachPrompt?.description !== null ? eachPrompt?.description : '-'))
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {eachPrompt.catagories === 9 &&
                                                    <div className='history-detail-lines'>
                                                        <p className='title'>
                                                            {t("input_text")}
                                                            <span>:</span>
                                                        </p>
                                                        <p className={'value ' + (rightAlignLangId?.find(lang => lang === eachPrompt?.source_prompt_lang) ? 'right-align-lang-style' : '')}>{eachPrompt?.description}</p>
                                                    </div>
                                                }
                                                {eachPrompt.catagories !== 9 &&
                                                    <div className='history-detail-lines'>
                                                        <p className='title'>
                                                            {t("keywords")}
                                                            <span>:</span>
                                                        </p>
                                                        <p className="value">{eachPrompt?.keywords !== null ? eachPrompt?.keywords : '-'}</p>
                                                    </div>
                                                }
                                                {eachPrompt.catagories !== 9 &&
                                                    <div className='history-detail-lines'>
                                                        <p className='title'>
                                                            {t("sentence_tone")}
                                                            <span>:</span>
                                                        </p>
                                                        <p className="value">{toneOptionsRef.current?.find(each => each.value === eachPrompt?.Tone)?.label}</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className='history-secondary-wrap'>
                                                <h4 className='history-seconday-wrap-header'>{t("results")}</h4>
                                                {
                                                    Object.values(eachPrompt?.prompt_results)?.map((item) => {
                                                        return item?.map((result) => {
                                                            return (
                                                                <div key={result.id} className='history-content-details'>
                                                                    <p className={rightAlignLangId?.find(lang => lang === result?.result_lang) ? 'right-align-lang-style' : ''} dangerouslySetInnerHTML={{ __html: sanitizeHtml(result?.api_result !== null ? result?.api_result?.replace(/\n/g, "<br />") : result?.translated_prompt_result?.replace(/\n/g, "<br />")) }}></p>
                                                                    <div className="result-toolbar">
                                                                        <div className="word-box-wrapper">
                                                                            <div className="word-container">{targetLanguageOptionsRef.current?.find(each => each.id === result?.result_lang)?.language}</div>
                                                                            <div className="word-container">{(result?.api_result !== null ? result?.api_result : result?.translated_prompt_result)?.split(/\s+/).length + ` ${t("words")}`}</div>
                                                                        </div>
                                                                        <div className="result-icon-innerWrap">
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
                                                                                title={t("delete")} placement="top">
                                                                                <div className="result-icon-single-item" onMouseUp={() => deleteAiWrittingPrompt('obj_id', result?.id, eachPrompt?.id, 'prompt-history')}>
                                                                                    <img src={AssetsDeleteIcon} />
                                                                                </div>
                                                                            </Tooltip>
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
                                                                                title={isCopied ? t("txt_copied") : t("copy")} placement="top">
                                                                                <div className="result-icon-single-item" onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)} onMouseUp={() => handleTextCopy(result?.api_result !== null ? result?.api_result : result?.translated_prompt_result)}>
                                                                                    <ContentCopyIcon className="icons" />
                                                                                </div>
                                                                            </Tooltip>
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
                                                                                title={t("move_to_editor")} placement="top">
                                                                                <div className="result-icon-single-item" onMouseUp={() => moveToEditorFromHistory(result?.api_result !== null ? result?.api_result?.match(/[^\r\n]+/g) : result?.translated_prompt_result?.match(/[^\r\n]+/g))}>
                                                                                    <KeyboardDoubleArrowRightIcon className="icons" />
                                                                                </div>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    })
                                                }
                                                <button className='deletebutton-history-writter' onMouseUp={() => deleteAiWrittingPrompt('prompt_id', eachPrompt?.id, null, 'prompt-history')}>
                                                    <span className="fileupload-new-btn">
                                                        {t("delete_all")}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <p className='prompt-history-no-prompt'>{t("no_prompt_has_been_given")}</p>
                        )
                    ) : toggleState == 2 ? (
                        customizationHistoryList?.length !== 0 ? (
                            customizationHistoryList?.map(eachCustom => {
                                if (customizeCardIndex === eachCustom?.id) {
                                    return (
                                        <div key={eachCustom?.id} className="history-details-wrapper">
                                            <div className='history-primary-wrap'>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("customization_name")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">
                                                        {eachCustom.customize_name}
                                                    </p>
                                                </div>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("doc_name")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">{(eachCustom?.doc_name !== undefined && eachCustom?.doc_name !== null) ? eachCustom?.doc_name : '-'}</p>
                                                </div>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("input_text")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className={"value " + (rightAlignLangId?.find(lang => lang === eachCustom?.user_text_lang) ? 'right-align-lang-style' : '')}>{eachCustom.user_text}</p>
                                                </div>
                                                {/* <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        Sentence tone
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">{toneOptionsRef.current?.find(each => each.value === eachCustom?.Tone)?.label}</p>
                                                </div> */}
                                            </div>
                                            <div className='history-secondary-wrap'>
                                                <h4 className='history-seconday-wrap-header'>{t("results")}</h4>

                                                <div key={eachCustom?.id} className='history-content-details'>
                                                    {
                                                        (eachCustom.customize !== 23) ? (   //if customization option is not Translate
                                                            <p className={rightAlignLangId?.find(lang => lang === eachCustom?.user_text_lang) ? 'right-align-lang-style' : ''} dangerouslySetInnerHTML={{ __html: sanitizeHtml(eachCustom?.user_text_lang === 17 ? eachCustom?.api_result?.replace(/\n/g, "<br />") : eachCustom?.prompt_result?.replace(/\n/g, "<br />")) }}></p>
                                                        ) : (
                                                            <p className={rightAlignLangId?.find(lang => lang === eachCustom?.user_text_lang) ? 'right-align-lang-style' : ''} dangerouslySetInnerHTML={{ __html: sanitizeHtml(eachCustom?.customization[0]?.result?.replace(/\n/g, "<br />")) }}></p>
                                                        )
                                                    }

                                                    <div className="result-toolbar">
                                                        <div className="word-box-wrapper">
                                                            {/* <div className="word-container">{targetLanguageOptionsRef.current?.find(each => each.id === result?.result_lang)?.language}</div> */}
                                                            {
                                                                eachCustom.customize !== 23 ? ( //if customization option is not Translate
                                                                    <div className="word-container">{(eachCustom?.user_text_lang === 17 ? eachCustom?.api_result : eachCustom?.prompt_result)?.split(/\s+/).length + " words"}</div>
                                                                ) : (
                                                                    <div className="word-container">{eachCustom?.customization[0]?.result?.split(/\s+/).length + ` ${t("words")}`}</div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="result-icon-innerWrap">
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
                                                                title={isCopied ? t("txt_copied") : t("copy")} placement="top">
                                                                <div className="result-icon-single-item"
                                                                    onMouseUp={() => handleTextCopy(
                                                                        eachCustom.customize !== 23 ?   //if customization option is not Translate
                                                                            eachCustom?.user_text_lang === 17 ? eachCustom?.api_result : eachCustom?.prompt_result
                                                                            :
                                                                            eachCustom?.customization[0]?.result
                                                                    )}
                                                                    onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)}
                                                                >
                                                                    <ContentCopyIcon className="icons" />
                                                                </div>
                                                            </Tooltip>
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
                                                                title={t("move_to_editor")} placement="top">
                                                                <div className="result-icon-single-item"
                                                                    onMouseUp={() => moveToEditorFromHistory(
                                                                        eachCustom.customize !== 23 ?   //if customization option is not Translate
                                                                            eachCustom?.user_text_lang === 17 ? eachCustom?.api_result?.match(/[^\r\n]+/g) : eachCustom?.prompt_result?.match(/[^\r\n]+/g)
                                                                            :
                                                                            eachCustom?.customization[0]?.result?.match(/[^\r\n]+/g)
                                                                    )}
                                                                >
                                                                    <KeyboardDoubleArrowRightIcon className="icons" />
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className='deletebutton-history-writter' onMouseUp={() => deleteAiWrittingPrompt('customize_obj_id', eachCustom?.id, null, 'cust-history')}>
                                                    <span className="fileupload-new-btn">
                                                        {t("delete")}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <p className='prompt-history-no-prompt'>{t("no_text_customization_done_yet")}</p>
                        )
                    ) : toggleState == 3 ? (
                        aiImageHistoryList?.length !== 0 ? (
                            aiImageHistoryList?.map(eachImage => {
                                if (imageCardIndex === eachImage?.id) {
                                    return (
                                        <div key={eachImage?.id} className="history-details-wrapper">
                                            <div className='history-primary-wrap'>
                                                <div className='history-detail-lines'>
                                                    <p className='title'>
                                                        {t("input_text")}
                                                        <span>:</span>
                                                    </p>
                                                    <p className="value">{eachImage.prompt}</p>
                                                </div>
                                            </div>
                                            <div className='history-secondary-wrap'>
                                                <h4 className='history-seconday-wrap-header'>{t("results")}</h4>
                                                {
                                                    eachImage?.gen_img?.map(imageItem => {
                                                        return (
                                                            <div key={imageItem?.id} className='history-content-details'>
                                                                <div style={{ padding: '5px' }}>
                                                                    <img src={imageItem?.generated_image} alt="ai-generated" />
                                                                </div>

                                                                <div className="result-toolbar">
                                                                    <div className="word-box-wrapper">
                                                                        <div className="word-container" style={{ opacity: 0 }}>{t("word")}</div>
                                                                    </div>
                                                                    <div className="result-icon-innerWrap">
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
                                                                            title={isCopied ? t("img_copied") : t("copy")} placement="top">
                                                                            <div className="result-icon-single-item"
                                                                                onMouseUp={() => copyImage(imageItem?.generated_image)}
                                                                                onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)}
                                                                            >
                                                                                <ContentCopyIcon className="icons" />
                                                                            </div>
                                                                        </Tooltip>
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
                                                                            title={t("move_to_editor")} placement="top">
                                                                            <div className="result-icon-single-item"
                                                                                onMouseUp={() => moveImageToWriter(imageItem?.generated_image)}
                                                                            >
                                                                                <KeyboardDoubleArrowRightIcon className="icons" />
                                                                            </div>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <p className='prompt-history-no-prompt'>{t("no_ai_image_generated_yet")}</p>
                        )
                    ) : null}
                </div>
            </section>

        </React.Fragment>
    )
}

