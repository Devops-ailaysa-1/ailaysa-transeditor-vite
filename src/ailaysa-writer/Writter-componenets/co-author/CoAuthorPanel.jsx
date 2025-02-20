import React, { useEffect, useLayoutEffect, useState, useRef, useCallback, useImperativeHandle } from "react";
import Select, { components } from 'react-select';
import { useTranslation } from "react-i18next";
import { ArrowDropDown } from "@mui/icons-material";
import { motion } from "framer-motion";
import TextareaAutosize from 'react-textarea-autosize';
import Radio from '@mui/material/Radio';
import { Tooltip } from '@mui/material';
import DeleteIcon from "../../../vendor/styles-svg/DeleteIcon";
import { useSelector } from "react-redux";
import Config from "../../../vendor/Config";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { BlueButtonLoader } from "../../../loader/BlueButtonLoader";
import { useNavigate } from "react-router-dom";

const CoAuthorPanel = (props, ref) => {

    let { 
        getBookDetails,
        createdBookIdRef,
        selectedLevel,
        setSelectedLevel,
        selectedGenre,
        setSelectedGenre,
        authorIdentity,
        setAuthorIdentity,
        bookDescription,
        setBookDescription,
        bookTitle,
        setBookTitle,
        selectedTitle,
        setSelectedTitle,
        bookTitleList,
        setBookTitleList,
        chaptersCreatedRef,
        setshowSrcLangModal,
        bookLanguage,
        setBookLanguage,
        bookLanguageLabel,
        setBookLanguageLabel,
        bookCreationPanelRef,
        setIsGenerateLoadingFreestyle,
        setCoAuthorPanelView,
        setShowCreditAlertModal
    } = props

    const { t } = useTranslation();
    const history = useNavigate()
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const userDetails = useSelector((state) => state.userDetails.value)
    const levelOptions = useSelector((state) => state.bookLevelOption.value)
    const genreOptions = useSelector((state) => state.bookGenreOption.value)

    // const [selectedLevel, setSelectedLevel] = useState(null);
    // const [selectedGenre, setSelectedGenre] = useState(null);
    // const [authorIdentity, setAuthorIdentity] = useState("");
    // const [bookDescription, setBookDescription] = useState("");
    // const [bookTitle, setBookTitle] = useState("");
    
    // const [selectedTitle, setSelectedTitle] = useState({
    //     id: null, title: ''
    // });
    // const [bookTitleList, setBookTitleList] = useState([])
    const [isGenerating, setIsGenerating] = useState({
        title: false,
        chapter: false
    });

    const authorIdentityInputRef = useRef(null)
    const bookDescriptionInputRef = useRef(null)
    const bookTitleInputRef = useRef(null)
    const bookLevelSelectRef = useRef(null)
    const bookGenreSelectRef = useRef(null)
    const updateTitleManuallyRef = useRef(true)
    // const chaptersCreatedRef = useRef(false)
    

    const Newvariants = {
        hidden: {
            opacity: 0,
            display: "none",
            onanimationend: {
                display: "none"
            }
        },
        shown: {
            opacity: 1,
            display: "block"
        }
    };

    const customProjectTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#9B9FA2",
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
            fontSize: "14px",
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
        valueContainer: (provided, state) => ({
            ...provided,
            padding: '2px 7px'
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

    // get book details from api
    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book')
        if(bookId) {
            getBookDetails(bookId)
        }
    }, [URL_SEARCH_PARAMS.get('book')])
    

    // this hook is used to expose the child function to parent in a form of a "ref"
    useImperativeHandle(bookCreationPanelRef, () => {
        return {
            createBook: () => {
                if(isFromValidated()){
                    if(createdBookIdRef.current === null){
                        createBook('create-chapter')
                    }else{
                        // console.log('create chapters')
                        createChapters()
                    }
                }
            }
        }
    })

    const addErrorFieldClass = (element, select = false) => {
        if(!select){
            element.classList.add('error-field-style')
        }else{
            element.classList.add('error-select-style')
        }
    }
    
    const removeErrorFieldClass = (element, select = false) => {
        if(!select){
            element.classList.remove('error-field-style')
        }else{
            element.classList.remove('error-select-style')
        }
    }

    const handleAuthorIdentityChange = (e) => {
        let value = e.target.value
        setAuthorIdentity(value)
        if(value?.trim()?.length !== 0){
            removeErrorFieldClass(authorIdentityInputRef.current)
        }
    } 
    const handleBookDescriptionChange = (e) => {
        let value = e.target.value
        setBookDescription(value)
        if(value?.trim()?.length !== 0){
            removeErrorFieldClass(bookDescriptionInputRef.current)
        }
    } 
    const handleBookTitleChange = (e) => {
        let value = e.target.value
        setBookTitle(value)
        if(value?.trim()?.length !== 0){
            removeErrorFieldClass(bookTitleInputRef.current)
        }else{
            setSelectedTitle({
                id: null, title: ''
            })
        }
    } 

    const handleBookLevelSelect = (selected) => {
        setSelectedLevel(selected)
        removeErrorFieldClass(bookLevelSelectRef.current, true)
    } 

    const handleBookGenreSelect = (selected) => {
        setSelectedGenre(selected)
        removeErrorFieldClass(bookGenreSelectRef.current, true)
    } 

    const handleTitleSelect = (id, titleText) => {
        setSelectedTitle({
            id,
            title: titleText
        });
        setBookTitle(titleText)
        removeErrorFieldClass(bookTitleInputRef.current)
        bookTitleInputRef.current.focus()
    }

    
    
    const isFromValidated = (direct = true) => {
        if(
            authorIdentity?.trim()?.length === 0 || bookDescription?.trim()?.length === 0 || (direct && bookTitle?.trim()?.length === 0) 
            || selectedLevel?.value === undefined || selectedGenre?.value === undefined
        ){
            if(authorIdentity?.trim()?.length === 0){
                addErrorFieldClass(authorIdentityInputRef.current)
            }
            if(bookDescription?.trim()?.length === 0){
                addErrorFieldClass(bookDescriptionInputRef.current)
            }
            if(direct && bookTitle?.trim()?.length === 0){
                addErrorFieldClass(bookTitleInputRef.current)
            }
            if(selectedLevel?.value === undefined){
                addErrorFieldClass(bookLevelSelectRef.current, true)
            }
            if(selectedGenre?.value === undefined){
                addErrorFieldClass(bookGenreSelectRef.current, true)
            }
            return false
        }
        return true
    } 

    const createBook = (from) => {
        let formdata = new FormData();

        formdata.append("description", bookDescription);
        formdata.append("book_language", bookLanguage);
        formdata.append("level", selectedLevel?.value);
        formdata.append("genre", selectedGenre?.value);
        formdata.append("author_info", authorIdentity);

        if(bookTitle?.trim()?.length !== 0) formdata.append("title", bookTitle);

        
        if (from === 'gen-title'){
            setIsGenerating({...isGenerating, title: true})
        } else {
            setIsGenerateLoadingFreestyle(true)
        }
        

        Config.axios({
            url: `${Config.BASE_URL}/writer/bookcreation/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                let data = response.data
                createdBookIdRef.current = data?.id
                
                if(data?.id === undefined) return

                history(`/book-writing?book=${data.id}`)

                if(from === 'create-chapter') createChapters()
                
                if (from === 'gen-title') generateBookTitles()
            },
            error: (err) => {
                if (err?.response.status === 400) {
                    setIsGenerateLoadingFreestyle(false)
                    Config.toast('Please try again!!!', 'error')
                }
            }
        });
    } 

    const updateBook = (update) => {
        let formdata = new FormData();
        // console.log(bookTitle)
        if(bookTitle === null || bookTitle === undefined || bookTitle?.trim()?.length === 0){
            addErrorFieldClass(bookTitleInputRef.current)
            bookTitleInputRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            return;
        }

        if(update === 'title'){
            formdata.append("title", bookTitle);
        }

        Config.axios({
            url: `${Config.BASE_URL}/writer/bookcreation/${createdBookIdRef.current}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                if(update === 'title') {
                    updateTitleManuallyRef.current = false
                    createChapters()
                }
                // let data = response.data
                // createdBookIdRef.current = data.id
            },
            error: (err) => {
                if (err?.response.status === 400) {
                    
                }
            }
        });
    } 

    const generateBookTitles = () => {

        if (createdBookIdRef.current === null) {
            if(isFromValidated(false)){
                createBook('gen-title')
            }
            return;
        }
        
        setIsGenerating({...isGenerating, title: true})

        let formdata = new FormData();
        formdata.append("book_creation", createdBookIdRef.current);
        Config.axios({
            url: `${Config.BASE_URL}/writer/booktitle/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                // let leftSideBarScrollingDiv = document.querySelector('.gen-prop-main-wrap')
                // leftSideBarScrollingDiv.scrollTo({
                //     top: leftSideBarScrollingDiv.scrollHeight,
                //     behavior: 'smooth'
                // }); 
                setBookTitleList(response.data)
                // getBookDetails(createdBookIdRef.current)
                
                setIsGenerating({...isGenerating, title: false})
            },
            error: (err) => {
                setIsGenerating({...isGenerating, title: false})
                if (err?.response?.status === 400) {
                    if (err?.response?.data?.msg?.includes('Insufficient')) {    // this error comes when the pre-translate is enabled in create flow
                        setShowCreditAlertModal(true)
                    }
                } else if (err?.response?.status === 500) {
                    Config.toast(t("too_many_requests"))
                }
            }
        });
    } 

    const createChapters = () => {
        let formdata = new FormData();

        // if generated title is selected then send book_title_id and creation id
        // console.log(selectedTitle?.title?.trim())
        // console.log(bookTitle?.trim())
        // console.log(selectedTitle?.title?.trim() === bookTitle?.trim())

        if(selectedTitle?.id !== undefined && selectedTitle?.title?.trim() === bookTitle?.trim()){
            formdata.append("book_title", selectedTitle?.id);
            formdata.append("book_creation", createdBookIdRef.current);
        }
        // if not selected the generated id then send book creation id
        else{
            if(updateTitleManuallyRef.current){
                updateBook('title')
                return
            }
            formdata.append("book_creation", createdBookIdRef.current); 
        }
        
        setIsGenerateLoadingFreestyle(true)

        Config.axios({
            url: `${Config.BASE_URL}/writer/bookbodymatter/`,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                chaptersCreatedRef.current = true
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                if (err?.response.status === 400) {
                    setShowCreditAlertModal(true)
                    setIsGenerateLoadingFreestyle(false)
                    Config.toast('Please try again!!!', 'error')
                }
            }
        });
    } 

    return (
        <>
            <div className="co-author-main-wrapper">
                <div className="tone-generatint-form-options prompt-form">
                    <div className="content-generatint-form-options">
                        {/* <div>{t("language_l")}</div> */}
                        <div className="languagemodal-button" onMouseUp={() => { setshowSrcLangModal(true) }}>
                            {bookLanguageLabel === "" ? <span className="placeholder">{t("select_language")}</span> : <span className="value">{bookLanguageLabel}</span>}
                            <span className="icon"><i className="fas fa-caret-down"></i></span>
                        </div>
                    </div>
                    <div className="content-generatint-form-options">
                    {/* <div>{t("level")}</div> */}
                        <div className="" ref={bookLevelSelectRef}>
                            <Select
                                menuPlacement="auto"
                                components={{ DropdownIndicator, IndicatorSeparator:() => null}}
                                options={levelOptions}
                                value={selectedLevel}
                                styles={customProjectTypeSelectStyles}
                                placeholder="Target audience"
                                onChange={(selected) => handleBookLevelSelect(selected)}
                            />
                        </div>
                    </div>
                </div>
                <div className="co-author-main-row">
                    <div className="content-generatint-form-options">
                        {/* <div>{t("genre")}</div> */}
                        <div className="" ref={bookGenreSelectRef}>
                            <Select
                                menuPlacement="auto"
                                options={genreOptions}
                                styles={customProjectTypeSelectStyles}
                                placeholder="Select genre"
                                value={selectedGenre}
                                onChange={(selected) => handleBookGenreSelect(selected)}
                                components={{ DropdownIndicator, IndicatorSeparator:() => null }}
                            />
                        </div>
                    </div>
                </div>
                <div className="co-author-main-row input-box">
                    {/* <div className="title">
                        <span>Identity<span className="asterik-symbol">*</span></span>
                        <small style={{ opacity: 0.7 }}>{authorIdentity?.trim()?.length}/200</small>
                    </div> */}
                    <input 
                        ref={authorIdentityInputRef}
                        className="prompt-generating-input-keywords" 
                        placeholder="Author persona (e.g historian, business consultant, sportsman, tech blogger, expert in climate change..)"
                        value={authorIdentity}
                        maxLength={200}
                        onChange={handleAuthorIdentityChange}
                    />
                    <div className="character-count-wrapper">
                        <small style={{ opacity: 0.7 }}>{authorIdentity?.trim()?.length}/200</small>
                    </div>
                </div>
                <div className="co-author-main-row input-box">
                    {/* <div className="title">
                        <span>Description<span className="asterik-symbol">*</span></span>
                        <small style={{ opacity: 0.7 }}>{bookDescription?.trim()?.length}/500</small>
                    </div> */}
                    <textarea 
                        ref={bookDescriptionInputRef}
                        className="prompt-generating-textarea" 
                        placeholder="What is the book about?"
                        value={bookDescription}
                        maxLength={500}
                        onChange={handleBookDescriptionChange}
                    ></textarea>
                    <div className="character-count-wrapper" style={{ marginTop: 0 }}>
                        <small style={{ opacity: 0.7 }}>{bookDescription?.trim()?.length}/500</small>
                    </div>
                </div>
                <div className="co-author-main-row input-box">
                    {/* <div className="title">
                        <span>Book title<span className="asterik-symbol">*</span></span>
                        <span className="generate-title-link" onClick={() => generateBookTitles()}>
                            {isGenerating.title && <BlueButtonLoader />}{t("generate_book_title")}
                        </span>
                        <small style={{ opacity: 0.7 }}>{bookTitle?.trim()?.length}/200</small>
                    </div> */}
                    <input 
                        ref={bookTitleInputRef} 
                        className="prompt-generating-input-keywords" 
                        placeholder="Add a book title *"
                        value={bookTitle} 
                        maxLength={200}
                        onChange={handleBookTitleChange} 
                    />
                    <div className="character-count-wrapper">
                        <small style={{ opacity: 0.7 }}>{bookTitle?.trim()?.length}/200</small>
                    </div>
                    <div className="d-flex justify-content-between w-100" style={{ marginTop: '8px' }}>
                        <span style={{ fontSize: '14px', opacity: 0.7 , paddingLeft: 5 }}>
                            or <span className="generate-title-link" onClick={() => generateBookTitles()}>suggest some titles</span> {isGenerating.title && <BlueButtonLoader />}
                        </span>
                        
                    </div>
                </div>
                <motion.div variants={Newvariants} initial="hidden" animate={bookTitleList?.length !== 0 ? "shown" : "hidden"}>
                    <div className="book-titles">
                        <span>Generated book title</span>
                    </div>
                    <div className="book-titles-list">
                        <div className="book-titles-list-wrapper">
                        {
                                bookTitleList?.map((titleItem) => {
                                    return (
                                        <div 
                                            key={titleItem.id} 
                                            onClick={() => handleTitleSelect(titleItem.id, titleItem.book_title)} 
                                            className={"book-titles-list-item " + (selectedTitle?.id === titleItem.id ? "active " : "")}>
                                            <div className="radio-btn-wrap">
                                                <Radio
                                                    checked={selectedTitle?.id === titleItem.id}
                                                    onChange={() => handleTitleSelect(titleItem.id, titleItem.book_title)}
                                                    name="title-radio-button"
                                                    inputProps={{ 'aria-label': titleItem.id }}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="book-title-info-main-wrap">
                                                <div className="book-title-info-wrap" >
                                                    <p className="editable-title">{titleItem.book_title}</p>
                                                    {/* <TextareaAutosize
                                                        className="editable-title"
                                                        value={titleItem.book_title}
                                                        maxLength={200}
                                                    /> */}
                                                    {/* <Tooltip title={t("delete")} placement="top" arrow>
                                                        <div className="tools-box">
                                                            <DeleteIcon style="deleteIcon" />
                                                        </div>
                                                    </Tooltip> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default React.forwardRef(CoAuthorPanel) 