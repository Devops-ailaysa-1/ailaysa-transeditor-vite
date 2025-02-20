import React, { useState, useEffect, useRef, createFactory } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Targetlanguage from "../../../vendor/lang-modal/Targetlanguage";
import Config from "../../../vendor/Config";
import { ButtonBase, Tooltip } from '@mui/material';
import Select, { components } from "react-select";
import EditIcon from "../../../vendor/styles-svg/EditIcon";
import DeleteIcon from "../../../vendor/styles-svg/DeleteIcon";
import CopyIcon from "../../../vendor/styles-svg/CopyIcon";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import SourceLanguage from './../../../vendor/lang-modal/Sourcelanguage';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import generateKey from './../../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import TextareaAutosize from 'react-textarea-autosize';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ButtonLoader } from './../../../loader/CommonBtnLoader';
import AutoFixIcon from "../../../vendor/styles-svg/AutoFix";
import { ChipInputField } from "../../../vendor/custom-component/ChipInputField";
import { useDispatch } from 'react-redux';
import { setBlogCreationResponse } from "../../../features/BlogCreationSlice";
import { useTranslation } from "react-i18next";
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import InsufficientIcon from "../../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../../assets/images/new-ui-icons/remove_circle_red.svg"

const GenerateArticle = (props) => {
    const {
        toneOptions,
        selectedTone,
        setSelectedTone,
        sourceLanguage,
        showSrcLangModal,
        setshowSrcLangModal,
        sourceLanguageOptions,
        handleSourceLangClick,
        targetLanguage,
        targetLanguageOptions,
        setTargetLanguageOptions,
        handleTargetLangClick,
        showTarLangModal,
        setshowTarLangModal,
        targetLabel,
        setTargetLabel,
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
        totalBlogResponseObj,
        getTotalBlogCreationObject,
        blogOutlineGenResponseRef,
        blogCreationResponseRef,
        saveBlogWizardLastStep,
        isNavigatedInternally
    } = props

    const location = useLocation();
    const history = useNavigate();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const dispatch = useDispatch()

    const [keywordSuggestions, setKeywordSuggestions] = useState(false);
    const [blogTopic, setBlogTopic] = useState('')
    const [blogKeywords, setBlogKeywords] = useState("");
    const [blogOutlineList, setBlogOutlineList] = useState([])
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [isEditItem, setIsEditItem] = useState([]);
    const [isArticleGenerating, setIsArticleGenerating] = useState(false)
    const [chipsArray, setChipsArray] = useState([])
    const [chipsCopyArray, setChipsCopyArray] = useState([]);
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const blogTopicRef = useRef(null)
    const blogKeywordsRef = useRef(null)

    const blogTopicInputRef = useRef(null)
    const blogKeywordsInputRef = useRef(null)
    const { t } = useTranslation();

    const typing = useRef(false);
    const typingTimeout = useRef(0);
    const titlesWrapper = useRef(null)

    const handleEditTitle = (id) => {
        const newSelectedItems = [...isEditItem]; // Create a copy of the selectedItems array
        newSelectedItems[id] = !newSelectedItems[id]; // Toggle the selected state of the clicked item
        setIsEditItem(newSelectedItems); // Update the selectedItems state
    };
    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        // onClose: () => setshowSettings(false),
    };
    const handleSelectedTitle = (id) => {
        setSelectedTitle(id);
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
            fontWeight: "500",
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

    const fieldErrorStyle = {
        border: '1px solid #e74c3c'
    }
    const fieldDefaultStyle = {
        border: '1px solid #D3D8DC'
    }

    const handleSelectToneChange = (selectedOption) => {
        setSelectedTone(selectedOption);
    }

    const handleGenerateArticles = () => {
        setStepWizardComplete(3)
    }

    useEffect(() => {
        if (stepWizard === "generate-article") {
            console.log(window.location)
            if (URL_SEARCH_PARAMS.get("blog")) {
                setTimeout(() => {
                    if (URL_SEARCH_PARAMS.get("blog")) {
                        saveBlogWizardLastStep(URL_SEARCH_PARAMS.get("blog"), window.location.pathname)
                    }
                }, 200);
            }
        }
    }, [stepWizard])

    useEffect(() => {
        let blogParam = URL_SEARCH_PARAMS.get("blog")
        if (blogParam && totalBlogResponseObj === null) {
            getTotalBlogCreationObject(blogParam)
        }
    }, [URL_SEARCH_PARAMS.get("blog")])

    useEffect(() => {
        if (totalBlogResponseObj !== null) {
            setBlogTopic(totalBlogResponseObj.user_title)
            blogTopicRef.current = totalBlogResponseObj.user_title

            let a = totalBlogResponseObj.keywords?.split(',')?.filter(each => each !== '')
            let keywordList = [...new Map(totalBlogResponseObj?.blog_key_create?.map(item => [item['blog_keyword'], item])).values()];
            let inGeneratedList = keywordList?.filter(each => a?.some(item => item?.trim()?.toLowerCase() === each.blog_keyword?.toLowerCase()))
            let notInGeneratedList = a?.filter(each => !totalBlogResponseObj.blog_key_create?.some(item => each?.trim()?.toLowerCase() === item.blog_keyword?.toLowerCase()))

            let chip_arr = []
            inGeneratedList?.forEach(element => {
                chip_arr.push({
                    id: element.id,
                    name: element.blog_keyword
                })
            });
            notInGeneratedList?.forEach(element => {
                chip_arr.push({
                    id: generateKey(),
                    name: element
                })
            });

            // console.log(a);
            // console.log(chip_arr);
            setChipsArray(chip_arr);

            // setBlogKeywords((totalBlogResponseObj.keywords_mt !== null && totalBlogResponseObj.keywords_mt !== '') ? totalBlogResponseObj.keywords_mt : totalBlogResponseObj.keywords)
            // blogKeywordsRef.current = (totalBlogResponseObj.keywords_mt !== null && totalBlogResponseObj.keywords_mt !== '') ? totalBlogResponseObj.keywords_mt : totalBlogResponseObj.keywords

            setSelectedTone(toneOptions?.find(each => each.value === totalBlogResponseObj.tone))
            let selected_title_obj = totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
            setBlogOutlineList(selected_title_obj?.blogoutline_title[0].blog_outline_session?.filter(each => each.selected_field))
        }
    }, [totalBlogResponseObj])

    // automatically update the user-language when source language is changed
    useEffect(() => {
        if (blogCreationResponseRef.current !== null && (sourceLanguage != blogCreationResponseRef.current?.user_language)) {
            updateBlog()
        }
    }, [sourceLanguage])

    // automatically update the user-tone when tone is changed
    useEffect(() => {
        if (blogCreationResponseRef.current !== null && (selectedTone?.value != blogCreationResponseRef.current?.tone)) {
            updateBlog()
        }
    }, [selectedTone])

    // automatically update the keywords when added or removed
    useEffect(() => {
        if (blogCreationResponseRef.current !== null && (blogCreationResponseRef.current?.keywords?.trim() !== getKeywordStringList(chipsArray)) && chipsArray?.length !== 0) {
            debounce(null, () => updateBlog('keyword'))
        }
    }, [chipsArray])

    const debounce = (e, callback) => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typing.current = false;
        typingTimeout.current = setTimeout(() => {
            callback(e);
        }, 1500);
    };

    // changes the input field color to default once somthing is typed
    useEffect(() => {
        if (blogTopicInputRef.current.style.border) {
            if (blogTopic?.trim() !== '') blogTopicInputRef.current.style.border = fieldDefaultStyle.border
        }
        if (blogKeywordsInputRef.current.style.border) {
            if (blogKeywords?.trim() !== '') blogKeywordsInputRef.current.style.border = fieldDefaultStyle.border
        }
    }, [blogTopic, blogKeywords])

    const getKeywordStringList = (list) => {
        let keyword_list = ''
        list?.forEach((each, index) => {
            keyword_list += `${each.name}${index !== list?.length - 1 ? "," : ""}`
        })
        // console.log(keyword_list);
        return keyword_list
    }

    // handle outline textarea onchange event 
    const handleOutlineChange = (e, outlineId) => {
        const newArr = blogOutlineList?.map(obj => {
            if (obj.id === outlineId) {
                return {
                    ...obj,
                    blog_outline: e.target.value,
                };
            }
            return obj;
        });
        setBlogOutlineList(newArr)
    }

    // locally create a outline box for new blog outline entering the outline
    const addNewOutlineBox = () => {
        const newArr = [...blogOutlineList, {
            id: generateKey(),
            group: 0,
            blog_outline: "",
            blog_outline_mt: "",
            localOutline: true
        }]
        setBlogOutlineList(newArr)
    }

    // create a new outline for a particular group
    const createNewOutline = (outlineId, blog_outline) => {
        let formdata = new FormData();
        let selected_title_obj = totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
        formdata.append("blog_outline_gen", blogOutlineGenResponseRef.current?.id ? blogOutlineGenResponseRef.current?.id : selected_title_obj?.blogoutline_title[0].id);
        formdata.append("blog_outline", blog_outline);
        formdata.append("group", 0);	// by default add the new created outline to group-0
        formdata.append("blog_title", blogOutlineGenResponseRef.current?.blog_title_gen ? blogOutlineGenResponseRef.current?.blog_title_gen : selected_title_obj?.blogoutline_title[0]?.blog_title_gen);

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                const newArr = blogOutlineList?.map(obj => {
                    if (obj.id === outlineId) {
                        return {
                            ...obj,
                            isEdit: false,
                            id: response.data.id,
                            localOutline: false,
                            blog_outline: response.data.blog_outline
                        };
                    }
                    return obj;
                });
                // console.log(newArr)
                setBlogOutlineList(newArr)
            },
        });
    }


    const updateIndividualOutline = (itemId, blogOutline, callAPI) => {
        let formdata = new FormData();

        if (!callAPI) {
            let selected_title_obj = totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
            let outline_list = selected_title_obj?.blogoutline_title[0]?.blog_outline_session
            console.log(outline_list);
            console.log(outline_list?.find(each => each.id === itemId));
            const newArr = blogOutlineList?.map(obj => {
                if (obj.id === itemId) {
                    return {
                        ...obj,
                        isEdit: false,
                        blog_outline: outline_list?.find(each => each.id === itemId)?.blog_outline
                    };
                }
                return obj;
            });
            // setIsIndividualEditMode(false)
            setBlogOutlineList(newArr)
            return
        }

        formdata.append("blog_outline", blogOutline);
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${itemId}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                const newArr = blogOutlineList?.map(obj => {
                    if (obj.id === itemId) {
                        return {
                            ...obj,
                            blog_outline: response.data.blog_outline
                        };
                    }
                    return obj;
                });
                setBlogOutlineList(newArr)
            },
        });
    }

    // delete the created local outline box
    const deleteLocalOutline = (e, itemId) => {
        setBlogOutlineList(blogOutlineList?.filter(each => each.id !== itemId))
    }

    const deleteIndividualOutline = (outlineId) => {
        if (blogOutlineList?.length <= 4) {
            Config.toast(t("minimum_outline_note"), 'warning')
            return;
        }
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${outlineId}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                setBlogOutlineList(blogOutlineList?.filter(each => each.id != outlineId))
                getTotalBlogCreationObject(URL_SEARCH_PARAMS.get('blog'))
                // console.log(response)
            },
        });
    }

    const deleteChip = (chip_id) => {
        setChipsArray(prevState => prevState.filter((chip) => chip.id !== chip_id))
        // let isBlogKeywordChip = blogKeywordsListRef.current?.find(item => item.id === chip_id)
        // if(isBlogKeywordChip) setBlogKeywordsList(prevState => [...prevState, isBlogKeywordChip])
    }

    useEffect(() => {
        console.log(blogCreationResponseRef.current);
    }, [blogCreationResponseRef.current])

    const updateBlog = (from) => {
        let formdata = new FormData();
        if (from === 'topic') {
            if (blogTopic?.trim() === '') {
                blogTopicInputRef.current.style.border = fieldErrorStyle.border
                return;
            }
            formdata.append("user_title", blogTopic);
        }
        if (from === 'keyword') {
            console.log(chipsArray?.length);
            if (chipsArray?.length === 0) {
                console.log('from keyword inside if');
                blogKeywordsInputRef.current.style.border = fieldErrorStyle.border
                return;
            }
            formdata.append("keywords", getKeywordStringList(chipsArray));
        }
        if (blogCreationResponseRef.current?.user_language != sourceLanguage) {
            formdata.append("user_language", sourceLanguage);
        }
        if (blogCreationResponseRef.current?.tone != selectedTone?.value) {
            formdata.append("tone", selectedTone?.value);
        }

        // number of keywords by default is 10, for now its given 5 but later this can be get from user
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/${blogCreationResponseRef.current?.id}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getTotalBlogCreationObject(totalBlogResponseObj.id)
                if (from === 'gen-article') {
                    generateBlogArticle()
                }

                // console.log(response.data)
                // setCreatedBlogId(response.data.id)
                // createdBlogIdRef.current = response.data.id
                // blogCreationResponse.current = response.data

                // if(from === 'gen-keyword') generateBlogKeywords('main')

                // if(from === 'gen-titles') generateBlogTitles('gen')

            },
        });
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(blogOutlineList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setBlogOutlineList(items);
    }

    const generateBlogArticle = () => {
        // let formdata = new FormData();
        setIsArticleGenerating(true)
        // if(blogCreationResponseRef.current?.tone !== selectedTone?.value || 
        //     blogCreationResponseRef.current?.user_language !== sourceLanguage
        // ){
        //     updateBlog('gen-article')
        //     return;
        // }
        // history( // no need
        // 	`/word-processor/article?outline_section_list=${outline_list}&blog_creation=${blogCreationResponseRef.current?.id}`,
        // 	{state: [{ out_list: outline_list },{ blog_id: blogCreationResponseRef.current?.id }]}
        //   );

        Config.axios({
            url: `${Config.BASE_URL}/writer/credit_blog_check/?blog_id=${blogCreationResponseRef.current?.id}`,
            method: "GET",
            auth: true,
            success: (response) => {
                // console.log(response)
                let outline_list = ''
                blogOutlineList?.map((each, index) => {
                    outline_list += `${each.id}${index !== blogOutlineList.length - 1 ? "," : ""
                        }`;
                });
                console.log(outline_list);
                console.log(blogCreationResponseRef.current?.id);
                dispatch(setBlogCreationResponse(null))
                history(`/word-processor/article/?outline_section_list=${outline_list}&blog_creation=${blogCreationResponseRef.current?.id}&lang=${sourceLanguage}&title=${blogTopicRef.current}`)
            },
            error: (err) => {
                if (err.response.status == 400) {
                    setShowCreditAlertModal(true)
                }
                setIsArticleGenerating(false)
            }
        });


        // formdata.append("outline_section_list", outline_list);  

        // formdata.append("blog_creation", blogCreationResponseRef.current?.id);  
        // Config.axios({
        //     url: `${Config.BASE_URL}/openai/blogarticle/`, 
        //     method: "POST",
        //     data: formdata,
        //     auth: true,
        //     success: (response) => {
        //         console.log(response.data)
        // 		isNavigatedInternally.current = true
        // 		handleGenerateArticles()
        // 		setIsArticleGenerating(false)
        // 		history(`/word-processor?document-id=${response.data?.document}`)
        //     },
        // 	error: (err) => {
        // 		setIsArticleGenerating(false)
        // 	}
        // });
    }




    return (
        <>
            <div className="blog-create-box-wrap generate-articles">
                <div className="blog-create-header">
                    <h1>{t("generate_blog")}</h1>
                </div>
                <div className="blog-create-body">
                    <div className="blog-form-wrapper">
                        <div className="blog-forms-plain-row">
                            <label htmlFor="topic">{t("blog_title")}<span className="asterik-symbol">*</span></label>
                            <input
                                id="topic"
                                ref={blogTopicInputRef}
                                className="blog-form-input"
                                value={blogTopic}
                                maxLength={200}
                                onChange={(e) => setBlogTopic(e.target.value)}
                                onBlur={() => updateBlog('topic')}
                            />
                        </div>
                        <div className="blog-forms-plain-row keyword">
                            <label htmlFor="keywords">{t("keywords")}</label>
                            <ChipInputField
                                input={blogKeywords}
                                setInput={setBlogKeywords}
                                chipsArray={chipsArray}
                                setChipsArray={setChipsArray}
                                chipsCopyArray={chipsCopyArray}
                                setChipsCopyArray={setChipsCopyArray}
                                deleteChip={deleteChip}
                                placeHolder={t("keywords_placeholder")}
                                refs={blogKeywordsInputRef}
                                getKeywordStringList={getKeywordStringList}
                            />
                            <div className="d-flex justify-content-between w-100" style={{ marginTop: '8px' }}>
                                <span style={{ fontSize: '13px', opacity: 0.7 }}><span style={{ fontWeight: 'bold' }}>{t("note")}:</span> {t("separate_wrds_press_comma")}</span>
                                <small style={{ opacity: 0.7 }}>{getKeywordStringList(chipsCopyArray)?.trim()?.length + blogKeywords?.trim()?.length}/200</small>
                            </div>
                            {/* <input 
								id="keywords"
								ref={blogKeywordsInputRef}
								className="blog-form-input" 
								placeholder="e.g. Writing, AI, Typing" 
								value={blogKeywords}
								maxLength={500}
								onChange={(e) => setBlogKeywords(e.target.value)}  
								onBlur={() => updateBlog('keyword')}
							/> */}
                        </div>
                        <div className="blog-forms-plain-row blog-section">
                            <label htmlFor="keywords">{t("blog_sections")}<span className="asterik-symbol">*</span></label>
                            <div className="title-lists-wrapper">
                                <div className={"title-list-item edit-wrap "}>
                                    <div className="title-info-main-wrap outline-lists">
                                        <div className="title-info-wrap">
                                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                                <Droppable droppableId="characters">
                                                    {(provided) => (
                                                        <ol className="edited-titles-list"  {...provided.droppableProps} ref={provided.innerRef}>
                                                            {
                                                                blogOutlineList?.map((outline, index) => {
                                                                    return (
                                                                        <Draggable key={outline.id} draggableId={outline.id.toString()} index={index}>
                                                                            {(provided) => (
                                                                                <li ref={provided.innerRef} {...provided.draggableProps}>
                                                                                    <div className="drag-ui" {...provided.dragHandleProps}>
                                                                                        <DragIndicatorIcon className="drag-icon" />
                                                                                    </div>
                                                                                    <div className="inner-row">
                                                                                        <TextareaAutosize
                                                                                            value={outline.blog_outline}
                                                                                            onChange={(e) => handleOutlineChange(e, outline?.id)}
                                                                                            maxLength={200}
                                                                                            onBlur={(e) => {
                                                                                                e.target.value?.trim() !== '' ? (outline?.localOutline ? createNewOutline(outline.id, e.target.value) : updateIndividualOutline(outline?.id, outline.blog_outline, true))
                                                                                                    : !outline?.localOutline && updateIndividualOutline(outline?.id, outline.blog_outline, false)
                                                                                            }}
                                                                                        />
                                                                                        <div className="tools-box delet-icon" onClick={(e) => { outline?.localOutline ? deleteLocalOutline(e, outline?.id) : deleteIndividualOutline(outline?.id) }}>
                                                                                            <DeleteIcon style="deleteIcon" />
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            )}
                                                                        </Draggable>
                                                                    )
                                                                })
                                                            }
                                                            {provided.placeholder}
                                                        </ol>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                            {/* { !isEditItem[outline.id] && <span className="capsule-card">9 words / 10 characters</span>} */}
                                        </div>
                                        <div className="title-info-tools">
                                            <div className="outline-tool-box-wrapper">
                                                <div className="add-outline-box" onClick={() => addNewOutlineBox()}>
                                                    <span className="add-outline-link">
                                                        <AddCircleOutlineOutlinedIcon className="add-icon" />
                                                        {t("add_outline")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-forms-row">
                            <div className="blog-forms-col">
                                <label>{t("select_tone")}</label>
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
                            <div className="blog-forms-col">
                                <label>{t("output_lang")}</label>
                                <ButtonBase onClick={() => { setshowSrcLangModal(true); }}>
                                    <div className="ailay-lang-btn">
                                        <span className={"text " + (sourceLabel === t("select_output_lang") && "placeholder")}>{sourceLabel}</span>
                                        <span className="icon">
                                            <i className="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                                </ButtonBase>
                                {/* <ButtonBase onClick={() => { setshowTarLangModal(true);}}>
									<div className="ailay-lang-btn">
										<span className={"text " + (targetLabel === "Select Output language" && "placeholder")}>
										{targetLanguage == "" ? targetLabel :
														targetLanguage.length !== 0
															? (targetLanguage.length +
																" language" +
																(targetLanguage.length > 1 ? "s" : "") +
																" selected")
															: targetLabel
													} 
												
										</span>
										<span className="icon">
											<i className="fas fa-caret-down"></i>
										</span>
									</div>
								</ButtonBase> */}
                                {/* <span className="note-content">
									<ErrorOutlineOutlinedIcon className="imp-icon" />
									Add more languages for multiligual results
								</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="blog-form-button-wrap">
                        <ButtonBase className="generate-blog-btn" onClick={() => !isArticleGenerating && generateBlogArticle()}>
                            {isArticleGenerating && <ButtonLoader />}
                            <span>{t("generate")}</span>
                            <span><AutoFixIcon className={isArticleGenerating ? "wand-animation" : ''} /> </span>
                        </ButtonBase>
                    </div>
                </div>
            </div>
            {showSrcLangModal && (<Rodal
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

                    <SourceLanguage
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
            </Rodal>)}
            {showCreditAlertModal && (<Rodal className="ts-rodal-mask" visible={showCreditAlertModal} leaveAnimation onClose={() => console.log()} {...convertmodaloption} showCloseButton={false}>
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
            {/* <Rodal
				visible={showTarLangModal}
				showCloseButton={false}
				className="ai-tar-lang-select-modal"
			>
				<div className="lang-modal-wrapper">
				<span
					className="modal-close-btn lang-close"
					onClick={(e) => {setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false);}}
				>
					<img
					src={
						Config.HOST_URL + "assets/images/new-ui-icons/close_black.svg"
					}
					alt="close_black"
					/>
				</span>
				<Targetlanguage
					targetLanguage={targetLanguage}
					targetLanguageOptions={targetLanguageOptions}
					setTargetLanguageOptions={setTargetLanguageOptions}
					handleTargetLangClick={handleTargetLangClick}
					showTarLangModal={showTarLangModal}
					setshowTarLangModal={setshowTarLangModal}
					filteredResults={filteredResults} 
					setFilteredResults={setFilteredResults}
					searchInput={searchInput} 
					setSearchInput={setSearchInput}
					onFocusWrap={onFocusWrap} 
					setOnFocusWrap={setOnFocusWrap}
					searchAreaRef={searchAreaRef}
				/>
				</div>
			</Rodal> */}
        </>
    )
}

export default GenerateArticle