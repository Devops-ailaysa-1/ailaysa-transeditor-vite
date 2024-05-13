import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from "react-i18next";
import { Tooltip } from '@mui/material';
import axios from "axios";
import DeleteIcon from "../../../vendor/styles-svg/DeleteIcon";
import EditIcon from '@mui/icons-material/Edit';
import { Collapse } from "reactstrap";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import ButtonBase from '@mui/material/ButtonBase';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Cookies from "js-cookie";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import Config from "../../../vendor/Config";
import MarkdownIt from "markdown-it";
import $ from 'jquery';
import { BlueButtonLoader } from "../../../loader/BlueButtonLoader";
import generateKey from "../../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { setShowBookContentLossAlertModal } from "../../../features/writer-slices/BookContentLossAlertModalSlice";
import { setModalConfirmationUserDecision } from "../../../features/writer-slices/ModalConfirmationUserDecisionSlice";
import sanitizeHtml from 'sanitize-html-react';
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from "../../../features/FileDownloadingListSlice";

const ChapterPanel = (props) => {

    let { 
        getBookDetails,
        createdBookIdRef,
        coAuthorPanelView,
        bookCreationObjRef,
        isUpdatingText,
        setIsUpdatingText,
        isDeleting,
        setIsDeleting,
        setShowCreditAlertModal
     } = props
    const { t } = useTranslation();
    const history = useNavigate()
    const dispatch = useDispatch()

    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const frontMatterOptions = useSelector((state) => state.bookFrontMatterOption.value)
    const backMatterOptions = useSelector((state) => state.bookBackMatterOption.value)
    const modalConfirmationUserDecision = useSelector((state) => state.modalConfirmationUserDecision.value)
    const bookCreationResponseRedux = useSelector((state) => state.bookCreationResponse.value)

    const [frontMatterList, setFrontMatterList] = useState([])
    const [bodyMatterList, setBodyMatterList] = useState([])
    const [backMatterList, setBackMatterList] = useState([])
    const [frontMatterListCopy, setFrontMatterListCopy] = useState([])
    const [bodyMatterListCopy, setBodyMatterListCopy] = useState([])
    const [backMatterListCopy, setBackMatterListCopy] = useState([])

    const [frontMatterCollapse, setFrontMatterCollapse] = useState(true)
    const [bodyMatterCollapse, setBodyMatterCollapse] = useState(true)
    const [backMatterCollapse, setBackMatterCollapse] = useState(true)
    const [frontAddMoreTitleBox, setFrontAddMoreTitleBox] = useState(false)
    const [bodyAddMoreTitleBox, setBodyAddMoreTitleBox] = useState(false)
    const [backAddMoreTitleBox, setBackAddMoreTitleBox] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [titleFocus, setTitleFocus] = useState(false)
    
    const [selectedMatterItem, setSelectedMatterItem] = useState({
        matter: null,
        id: null,
    })
    const [isTranslateProceeding, setIsTranslateProceeding] = useState(false)

    const frontMatterReorderingRef = useRef([])
    const bodyMatterReorderingRef = useRef([])
    const backMatterReorderingRef = useRef([])

    const bookTitleRef = useRef();
    const frontAddMoreTitleBoxRef = useRef()
    const bodyAddMoreTitleBoxRef = useRef()
    const backAddMoreTitleBoxRef = useRef()
    const isStreamClosedRef = useRef(false)
    const tempStoredGenerateLinkParamRef = useRef(null)
    
    const isContentGenerateRef = useRef(false)
    const allDownloadedFilesArrRef = useRef([])
    
    const convert = new MarkdownIt({ html: true, });
    
    const bodyMatterOptions = [
        {
            id: 1,
            title: "Chapter"
        }
    ]



    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (frontAddMoreTitleBoxRef.current && !frontAddMoreTitleBoxRef.current.contains(e.target) && !e.target?.closest('.front-addon')) {
                setFrontAddMoreTitleBox(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (bodyAddMoreTitleBoxRef.current && !bodyAddMoreTitleBoxRef.current.contains(e.target) && !e.target?.closest('.body-addon')) {
                setBodyAddMoreTitleBox(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (backAddMoreTitleBoxRef.current && !backAddMoreTitleBoxRef.current.contains(e.target) && !e.target?.closest('.back-addon')) {
                setBackAddMoreTitleBox(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    
    // get the whole book data 
    useEffect(() => {
        let book_id = URL_SEARCH_PARAMS.get('book')
        let item_id = URL_SEARCH_PARAMS.get('item')
        if(bookCreationResponseRedux !== null && book_id){
            // console.log(bookCreationResponseRedux.front_matter)
            bookTitleRef.current.innerText = bookCreationResponseRedux.title
            setFrontMatterList(bookCreationResponseRedux.front_matter)
            setFrontMatterListCopy(bookCreationResponseRedux.front_matter)
            setBodyMatterList(bookCreationResponseRedux.body_matter)
            setBodyMatterListCopy(bookCreationResponseRedux.body_matter)
            
            setBackMatterList(bookCreationResponseRedux.back_matter)
            setBackMatterListCopy(bookCreationResponseRedux.back_matter)
        }
    }, [bookCreationResponseRedux, URL_SEARCH_PARAMS.get('book')])


    // useEffect(() => {
    //     if(bookCreationResponseRedux !== null){
    //         bookCreationObjRef.current = bookCreationResponseRedux
    //     }
    // },[bookCreationResponseRedux])


    // based on the item in search param open the matter item
    useEffect(() => {
        let bookId = URL_SEARCH_PARAMS.get('book')
        let item_id = URL_SEARCH_PARAMS.get('item')
        let matter = URL_SEARCH_PARAMS.get('matter')
        let isStreaming = URL_SEARCH_PARAMS.get('streaming') ? true : false

        if(selectedMatterItem?.id !== undefined && bookCreationObjRef.current !== null && bookId && item_id && !isStreaming){
            let item = {}
            if(matter === 'front'){
                item = bookCreationObjRef.current?.front_matter?.find(each => each.id === parseInt(item_id))
                if(item !== undefined && item?.generated_content !== null) handleFrontMatterOptionClick(item)
                else selectFirstChapterInBody()
            }else if(matter === 'body'){
                item = bookCreationObjRef.current?.body_matter?.find(each => each.id === parseInt(item_id))
                if(item !== undefined && item?.html_data !== null) handleBodyMatterOptionClick(item)
                else selectFirstChapterInBody()
            }else if(matter === 'back'){
                item = bookCreationObjRef.current?.back_matter?.find(each => each.id === parseInt(item_id))
                if(item !== undefined && item?.generated_content !== null) handleBackMatterOptionClick(item)
                else selectFirstChapterInBody()
            }
        }
        // by default open the first chapter in body matter
        else if(!isStreaming && bookId && bodyMatterList?.length !== 0 && bookCreationObjRef.current !== null && (item_id === null || item_id === undefined)){
            selectFirstChapterInBody()
        }
        else if(bookId === null){
            history('/book-writing')
        }
    }, [bookCreationObjRef.current])
    



    // store the matter and item whenever item is changed
    useEffect(() => {
        let item_id = URL_SEARCH_PARAMS.get('item')
        let matter = URL_SEARCH_PARAMS.get('matter')
        if(bookCreationObjRef.current !== null && item_id){
            setSelectedMatterItem({
                matter: matter,
                id: parseInt(item_id)
            })
            scrollToTop()
        } 
    }, [URL_SEARCH_PARAMS.get('item')])

    // if item ordering is changed update the new order in server
    useEffect(() => {
        if(frontMatterReorderingRef.current?.length !== 0){
            updateFrontOutlineOrder()
        }
    }, [frontMatterReorderingRef.current])

    useEffect(() => {
        if(bodyMatterReorderingRef.current?.length !== 0){
            updateBodyOutlineOrder()
        }
    }, [bodyMatterReorderingRef.current])

    useEffect(() => {
        if(backMatterReorderingRef.current?.length !== 0){
            updateBackOutlineOrder()
        }
    }, [backMatterReorderingRef.current])

    useEffect(() => {
        if(modalConfirmationUserDecision !== null){
            // close the content loss alert modal
            dispatch(setShowBookContentLossAlertModal(false))
            let {item, matter} = tempStoredGenerateLinkParamRef.current
            $('.summernote').summernote('code', '');
            if(matter === 'front'){
                getMatterItemData(item, 'front')
            }else if(matter === 'body'){
                getChapterDataInStream(item?.id, item)
            }else if(matter === 'back'){
                getMatterItemData(item, 'back')
            }
            // reset the user decision state to null 
            dispatch(setModalConfirmationUserDecision(null))
        }
    }, [modalConfirmationUserDecision])

    useEffect(() => {
        if(bodyMatterCollapse || frontMatterCollapse || backMatterCollapse){
            setRerender(!rerender)
        }
    }, [bodyMatterCollapse, frontMatterCollapse, backMatterCollapse])


    // remove break

    const removeBreakParagraphs = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const paragraphs = doc.querySelectorAll('p.break');
        paragraphs.forEach(paragraph => {
          paragraph.parentNode.removeChild(paragraph);
        });
        return doc.body.innerHTML;
      };

    

    // scroll the summernote editor to bottom
    const scrollToBottom = () => {
        const element = document.querySelector('.note-editing-area');
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
    };

    // scroll the summernote editor to top
    const scrollToTop = () => {
        const element = document.querySelector('.note-editing-area');
        element.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // close the isEdit and isDelete mode whenever user changes the selected item
    const closeEditAndDeleteMode = (list) => {
        let newArr = list?.map(obj => {
            return {
                ...obj,
                isDelete : false,
                isEdit: false
            }
        })
        return newArr
    }

    // rearrange the list items in the list
    const rearrangeTheListItems = (result, list) => {
        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        return items
    } 

    // handle matter item reordering drag
    function handleItemOnDragEnd(result, matter) {
        if (!result.destination) return;
        let items = []
        if(matter === 'front'){
            items = rearrangeTheListItems(result, frontMatterList)
            frontMatterReorderingRef.current = items
            setFrontMatterList(items);
            setFrontMatterListCopy(items)
        }else if(matter === 'body'){
            items = rearrangeTheListItems(result, bodyMatterList)
            bodyMatterReorderingRef.current = items
            setBodyMatterList(items);
            setBodyMatterListCopy(items)
        }else if(matter === 'back'){
            items = rearrangeTheListItems(result, backMatterList)
            backMatterReorderingRef.current = items
            setBackMatterList(items);
            setBackMatterListCopy(items)
        }
    }
   
    // selects and opens the first chapter in body matter
    const selectFirstChapterInBody = () => {
        let itemId = bookCreationObjRef.current?.body_matter?.find((each, ind) => ind === 0)?.id
        updateSearchParamInURL('body', itemId)
    } 

    // update matter and item_id in URL as search param
    const updateSearchParamInURL = (matter, id) => {
        URL_SEARCH_PARAMS.set('matter', matter)
        URL_SEARCH_PARAMS.set('item', id)
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
    } 

    // focuses the textarea when edit mode is open
    const focusCurrentEditingTextarea = (id) => {
        let textarea = document.getElementById(id)
        textarea.focus()
    } 

    // update the isEdit/isDelete (any specific) key in the list for operation
    const updateSpecificKeyInList = (list, id, key, value) => {
        let newArr = list?.map(obj => {
            if(obj?.id === id){
                return {
                    ...obj,
                    [key]: value
                }
            }else{
                if(value){
                    return {
                        ...obj,
                        [key]: !value
                    }
                }
                return obj   
            }
        })
        return newArr
    } 

    // update processing key in list for showing loader
    const updateProcessingKeyInList = (list, id, isProcessing) => {
        let newArr = list?.map(obj => {
            if(obj.id === id){
                return {
                    ...obj,
                    processing: isProcessing
                }
            }
            return obj
        })
        return newArr
    } 

    // update text in textarea in item
    const updateTitleTextInList = (list, id, key, value) => {
        let newArr = list?.map(obj => {
            if(obj.id === id){
                return {
                    ...obj,
                    [key]: value
                }
            }
            return obj
        })
        return newArr
    } 

    
    // insert the text in editor and commit
    const insertContentInEditor = (text, heading) => {
        // before inserting text in editor reset the editor
        // creates an illusion of new working space
        // $('.summernote').summernote('code', '');
        
        if(text?.length === 0) return;
        
       
        let final = ''
        let preProcessedhtml = ''
        let html = convert.render(text)

        if(isContentGenerateRef.current){

            // let final = html.replace(/(?:\r\n|\r|\n)/g, '<p><br></p>');
            preProcessedhtml = html.replace(/(<li>[^]*?<\/li>)|(\r\n|\r|\n)/g, (match, liTag, lineBreak) => {
                if (liTag) {
                    return liTag; // Keep <li> tags unchanged
                } else {
                    return ""; // Replace line breaks with <p><br></p>
                }
            });
           final =  preProcessedhtml
            // console.log(final)
        }else{
            console.log(text)
            final = html
        }
        console.log(final)
        $('.summernote').summernote('code', final)
        $('.summernote').summernote('commit');

        isContentGenerateRef.current = false
    }

    // functions for more options drop-down in each matter section
    const handleAddItemDrpVisibility = (e, show = true, matter) => {
        e?.stopPropagation();
        if(matter === 'front') setFrontAddMoreTitleBox(show);
        else if(matter === 'body')setBodyAddMoreTitleBox(show);
        else if(matter === 'back')setBackAddMoreTitleBox(show);
    };
  
    // onchange handler for textarea - the changes made in textarea store in copy
    const handleTextareaOnChange = (e, item, matter) => {
        let {value} = e.target
        if(matter === 'front'){
            let newArr = updateTitleTextInList(frontMatterListCopy, item?.id, 'name', value)
            setFrontMatterListCopy(newArr)
        }else if(matter === 'body'){
            let newArr = updateTitleTextInList(bodyMatterListCopy, item?.id, 'generated_content', value)
            setBodyMatterListCopy(newArr)

        }else if(matter === 'back'){
            let newArr = updateTitleTextInList(backMatterListCopy, item?.id, 'name', value)
            setBackMatterListCopy(newArr)
        }
    } 

    // function to toggle in delete mode
    const handleDeleteToggleBtnClick = (e, item_id, matter, value) => {
        e?.stopPropagation()
        if(matter === 'front'){
            let newArr = updateSpecificKeyInList(frontMatterList, item_id, 'isDelete', value)
            // console.log(newArr)
            setFrontMatterList(newArr)
        }if(matter === 'body'){
            // console.log(item_id)
            // console.log("value" + value)
            let newArr = updateSpecificKeyInList(bodyMatterList, item_id, 'isDelete', value)
            // console.log(newArr)
            setBodyMatterList(newArr)
        }else if(matter === 'back'){
            let newArr = updateSpecificKeyInList(backMatterList, item_id, 'isDelete', value)
            // console.log(newArr)
            setBackMatterList(newArr)
        }
    } 

    // toggle edit mode for matter section items
    const toggleEditMode = (e, item_id, matter, open = true) => {
        e?.stopPropagation()
        if(matter === 'front'){
            let newArr = updateSpecificKeyInList(frontMatterList, item_id, 'isEdit', open)
            // console.log(newArr)
            setFrontMatterList(newArr)
            setFrontMatterListCopy(newArr)
            if(open){
                setTimeout(() => {
                    focusCurrentEditingTextarea(`front-mat-textarea-${item_id}`)
                }, 10);
            }
        }else if(matter === 'body'){
            let newArr = updateSpecificKeyInList(bodyMatterList, item_id, 'isEdit', open)
            let removeLocalBox = newArr?.filter(each => !each?.local)
            setBodyMatterList(removeLocalBox)
            setBodyMatterListCopy(removeLocalBox)
            if(open){
                setTimeout(() => {
                    focusCurrentEditingTextarea(`body-mat-textarea-${item_id}`)
                }, 10);
            }
        }else if(matter === 'back'){
            let newArr = updateSpecificKeyInList(backMatterList, item_id, 'isEdit', open)
            // console.log(newArr)
            setBackMatterList(newArr)
            setBackMatterListCopy(newArr)
            if(open){
                setTimeout(() => {
                    focusCurrentEditingTextarea(`back-mat-textarea-${item_id}`)
                }, 10);
            }
        }
    } 

    // close isEdit mode when textarea is blured
    const handleTextAreaBlur = (e, item, matter) => {
        if(matter === 'front'){
            let newArr = updateSpecificKeyInList(frontMatterList, item?.id, 'isEdit', false)
            setFrontMatterList(newArr)
            setFrontMatterListCopy(newArr)
        }else if(matter === 'body'){
            let newArr = updateSpecificKeyInList(bodyMatterList, item?.id, 'isEdit', false)
            setBodyMatterList(newArr)
            setBodyMatterListCopy(newArr)
        }else if(matter === 'back'){
            let newArr = updateSpecificKeyInList(backMatterList, item?.id, 'isEdit', false)
            setBackMatterList(newArr)
            setBackMatterListCopy(newArr)
        }
    } 


    // handle when front matter item is clicked
    const handleFrontMatterOptionClick = (item) => {
        $('.summernote').summernote('code', '');
        let newArr = closeEditAndDeleteMode(bookCreationResponseRedux?.front_matter)
        setFrontMatterList(newArr)
        // let item = {}
        // item = bookCreationResponseRedux?.front_matter?.find(each => each?.id === itemObj?.id)
        if(item?.generated_content){
            insertContentInEditor(item?.generated_content, item?.name)
        }else{
            // comment the below line to stop the auto generation of chapter when the particular chapter is clicked 
            if(item?.name?.toLowerCase() === 'preface'){
                getMatterItemData(item, 'front')
            }
        }
        updateSearchParamInURL('front', item?.id)
    } 

    // handle when body matter item is clicked
    const handleBodyMatterOptionClick = (item) => {
        let newArr = closeEditAndDeleteMode(bookCreationResponseRedux?.body_matter)
        setBodyMatterList(newArr)
        $('.summernote').summernote('code', '');
        // let item = {}
        // item = bookCreationResponseRedux?.body_matter?.find(each => each?.id === itemObj?.id)
        if(item?.html_data){
            insertContentInEditor(item?.html_data, item?.generated_content)
        }else {
            // comment the below line to stop the auto generation of chapter when the particular chapter is clicked 
            getChapterDataInStream(item.id)
        }
        updateSearchParamInURL('body', item?.id)
    } 

    // handle when back matter item is clicked
    const handleBackMatterOptionClick = (item) => {
        let newArr = closeEditAndDeleteMode(bookCreationResponseRedux?.back_matter)
        setBackMatterList(newArr)
        $('.summernote').summernote('code', '');
       
        if(item?.generated_content){
            insertContentInEditor(item?.generated_content, item?.name)
        }else{
            // comment the below line to stop the auto generation of chapter when the particular chapter is clicked 
            // getMatterItemData(item, 'back')
        }
        updateSearchParamInURL('back', item?.id)
    } 

    // get generated data when particular matter item is clicked 
    const getMatterItemData = (item, matter) => {
        let formdata = new FormData();

        if(matter === 'front'){
            let newArr = updateProcessingKeyInList(frontMatterList, item?.id, true)
            // console.log(newArr)
            setFrontMatterList(newArr)
            setFrontMatterListCopy(newArr)
        }else if(matter === 'back'){
            let newArr = updateProcessingKeyInList(backMatterList, item?.id, true)
            // console.log(newArr)
            setBackMatterList(newArr)
            setBackMatterListCopy(newArr)
        }

        
        if(matter === 'body') {
            let newCreatedItemObj = bodyMatterListCopy?.find(each => each?.id === item?.id)
            formdata.append("generated_content", newCreatedItemObj?.generated_content);
        }
        else formdata.append("obj", item?.id);
        
        formdata.append("book_creation", createdBookIdRef.current);

        let url = ''
        if(matter === 'front') url = `${Config.BASE_URL}/openai/bookfrontmatter/`
        else if (matter === 'body') url = `${Config.BASE_URL}/openai/bookbodymatter/`
        else if (matter === 'back') url = `${Config.BASE_URL}/openai/bookbackmatter/`
        
        if(matter !== 'body'){
            document.querySelector('.note-editable').classList.add('note-editable-loader')
            document.querySelector('.note-editable').classList.add('cursor-hide')
            document.querySelector('.ailaysa-writter-main-wrapper').style.pointerEvents = 'none'
            props.showOverlay()
        }


        Config.axios({
            url: url,
            body:formdata,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                document.querySelector('.note-editable').classList.remove('note-editable-loader')
                document.querySelector('.note-editable').classList.remove('cursor-hide')
                props.closeOverlay()
                document.querySelector('.pop-overlay').style.pointerEvents = 'all';

                // console.log(response.data)

                getBookDetails(createdBookIdRef.current)

                setTimeout(() => {
                    // once the new chapter/matter-item is saved in list : then generate data for chapter/item
                    if(matter === 'front'){
                        isContentGenerateRef.current = true
                        updateSearchParamInURL('front', response.data?.id)
                        // handleFrontMatterOptionClick(response.data)
                    }else if(matter === 'body'){
                        // handleBodyMatterOptionClick(response.data)
                        updateSearchParamInURL('body', response.data?.id)
                    }else if(matter === 'back'){
                        isContentGenerateRef.current = true
                        // handleBackMatterOptionClick(response.data)
                        updateSearchParamInURL('back', response.data?.id)
                    }
                }, 80);
            },
            error: (err) => {
                // console.log('inside error')
                if (err?.response.status === 400) {
                    setShowCreditAlertModal(true)
                    document.querySelector('.note-editable').classList.remove('note-editable-loader')
                    document.querySelector('.note-editable').classList.remove('cursor-hide')
                    document.querySelector('.pop-overlay').style.pointerEvents = 'all';
                    props.closeOverlay()
                }else{
                    document.querySelector('.note-editable').classList.remove('note-editable-loader')
                    document.querySelector('.note-editable').classList.remove('cursor-hide')
                    document.querySelector('.pop-overlay').style.pointerEvents = 'all';
                    props.closeOverlay()
                }
                getBookDetails(createdBookIdRef.current)
            }
        });
    } 

    // get particular chapter data when chapter item is clicked
    const getChapterDataInStream = async(id, item) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        
        // URL_SEARCH_PARAMS.set('streaming', true)
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());

        document.querySelector('.ailaysa-writter-main-wrapper').style.pointerEvents = 'none'
        props.showOverlay()

        document.querySelector('.note-editable').classList.add('note-editable-loader')
        document.querySelector('.note-editable').classList.add('cursor-hide')
        try{
            await fetchEventSource(`${Config.AI_GEN_URL}/openai/book_chapter_generate/?bookbody_id=${id}`, {
                openWhenHidden: true,
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                onopen(res) {
                    if(res.status == 400){
                        // console.log('ran erron')
                        setShowCreditAlertModal(true)
                        document.querySelector('.note-editable').classList.remove('note-editable-loader')
                        document.querySelector('.note-editable').classList.remove('cursor-hide')
                        isStreamClosedRef.current = true
                        URL_SEARCH_PARAMS.delete('streaming')
                        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
        
                        setTimeout(() => {
                            updateHTMLInMatterItem(id)
                            props.closeOverlay()
                            document.querySelector('.pop-overlay').style.pointerEvents = 'all';
                            getBookDetails(createdBookIdRef.current)
                        }, 500);
                    }
                    if (res.ok && res.status === 200) {
                        // console.log("Connection made ", res);
                        // blogAricleUpdate(createdDocumentId.current, blogCreatedId.current)
    
                    } else if (
                        res.status >= 400 &&
                        res.status < 500 &&
                        res.status !== 429
                    ) {
                        // console.log("Client side error ", res);
                       
                    }
                },
                onmessage(event) {
                    
                    scrollToBottom()
                    const text = event.data.slice(7, -2)
                    // console.log(text)
                    if (text.includes('\\n')) {
                        updateHTMLInMatterItem(id)
                    } else {
                    
                    }
    
                    let final = text.replace(/\\n/g, `<p class="break"><br/></p>`)
                    // let final = text.replace(/\\n/g, " ")
                    let update = final.replace('/\u200c/g', " ")
                    document.querySelector('.note-editable').innerHTML += final
                   
                    scrollToBottom()
                },
                onclose() {
                    // console.log("Connection closed by the server");
                    try{
                        scrollToBottom()
                        isStreamClosedRef.current = true
                        URL_SEARCH_PARAMS.delete('streaming')
                        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
                        
                        handleFormatGenerateData(id, item)
                        document.querySelector('.note-editable').classList.remove('note-editable-loader')
                        document.querySelector('.note-editable').classList.remove('cursor-hide')
                        props.closeOverlay()
                    }catch(e){
                        console.log(e)
                    }
                },
                onerror(err) {
                    // console.log('ran erron')
                    // console.log(err)
                    Config.toast("Streaming failed", 'warning')
                    // console.log("There was an error from server", err);
                    document.querySelector('.note-editable').classList.remove('note-editable-loader')
                    document.querySelector('.note-editable').classList.remove('cursor-hide')
                    isStreamClosedRef.current = true
                    URL_SEARCH_PARAMS.delete('streaming')
                    history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
    
                    setTimeout(() => {
                        updateHTMLInMatterItem(id)
                        props.closeOverlay()
                        document.querySelector('.pop-overlay').style.pointerEvents = 'all';
                        getBookDetails(createdBookIdRef.current)
                    }, 500);
                    // exit the stream if any error occurs
                    throw new Error(); 
                },
            });
        }catch(e){
            console.log(e)
        }
        
    };


    // convert the generated data (From .md format to html format)
    const handleFormatGenerateData = (id, item) => {
        document.querySelector('.note-editable').classList.remove('note-editable-loader')

        let data = document.querySelector('.note-editable').innerText
        // console.log(data)

        let html = convert.render(data)
        // let final = html.replace(/(?:\r\n|\r|\n)/g, '<p><br></p>');
        let final = html.replace(/(<li>[^]*?<\/li>)|(\r\n|\r|\n)/g, (match, liTag, lineBreak) => {
            if (liTag) {
                return liTag; // Keep <li> tags unchanged
            } else {
                return ``; // Replace line breaks with <p><br></p>
            }
        });

       
        document.querySelector('.note-editable').innerHTML = final
        document.querySelector('.note-editable-backdrop').innerHTML = document.querySelector('.note-editable').innerHTML
       
        scrollToTop()
        setTimeout(() => {
            updateHTMLInMatterItem(id,'last',final)
            document.querySelector('.pop-overlay').style.pointerEvents = 'all';
            props.closeOverlay()
      
    
            // $('.summernote').summernote('commit');
        }, 500);
    }


    // update the generated content in the html_data field
    const updateHTMLInMatterItem = (id,isLast,htmlaData) => {
        let formdata = new FormData();

        let data = document.querySelector('.note-editable').innerText
        let html = convert.render(data)
        let final = html.replace(/(?:\r\n|\r|\n)/g, '');
        let spaceRemovedHtml = final
        formdata.append("html_data", isLast ? htmlaData : spaceRemovedHtml);

        Config.axios({
            url: `${Config.BASE_URL}/openai/bookbodymatter/${id}/`,
            body:formdata,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response)
                if(isLast){
                if(isStreamClosedRef){
                    getBookDetails(createdBookIdRef.current)
                    isStreamClosedRef.current = false
                }
                }
               
            },
        });
    }

    // more option item is clicked 
    const handleMoreOptionsItemClick = (e, option, matter) => {
        e.stopPropagation()
        if(matter === 'front'){
            addMatterItems(option, matter)
        }else if(matter === 'body'){
            addMatterItems(option, matter)
        }else if(matter === 'back'){
            addMatterItems(option, matter)
        }
    } 

    const getMatterItemAddedArr = (list, key, option) => {
        return [
            ...list,
            {
                id: generateKey(), 
                [key]: (key === 'generated_content') ? '' : option.label, 
                local: true,
                ...((key === 'generated_content') && {isEdit: true})
            }
        ]
    } 

    // add new/additional items from more options in selected matter 
    const addMatterItems = (option, matter) => {
        let formdata = new FormData();
        let newArr = []
        if(matter === 'front'){
            newArr = getMatterItemAddedArr(frontMatterList, 'name', option)
            setFrontMatterList(newArr)
            setFrontMatterListCopy(newArr)
            handleAddItemDrpVisibility(null, false, 'front')
            formdata.append("front_matter", option.value);
        }else if(matter === 'body'){
            newArr = getMatterItemAddedArr(bodyMatterList, 'generated_content', option)
            setBodyMatterList(newArr)
            setBodyMatterListCopy(newArr)
            handleAddItemDrpVisibility(null, false, 'body')
            // scroll to the added custom chapter and have it focus
            setTimeout(() => {
                let focusingEleId = newArr?.find(each => each.local)?.id
                let scrollingDiv = document.querySelector('.gen-prop-main-wrap')
                scrollingDiv.scrollTo({
                    top: scrollingDiv.scrollHeight,
                    behavior: 'smooth',
                  });
                focusCurrentEditingTextarea(`body-mat-textarea-${focusingEleId}`)
            }, 15);
            return;
        }else if(matter === 'back'){
            newArr = getMatterItemAddedArr(backMatterList, 'name', option)
            setBackMatterList(newArr)
            setBackMatterListCopy(newArr)
            handleAddItemDrpVisibility(null, false, 'back')
            formdata.append("back_matter", option.value);
        }
        formdata.append("book_creation", createdBookIdRef.current);
        
        let url = ''
        if(matter === 'front') url = `${Config.BASE_URL}/openai/bookfrontmatter/`
        else if (matter === 'back') url = `${Config.BASE_URL}/openai/bookbackmatter/`

        Config.axios({
            url: url,
            body:formdata,
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                getBookDetails(createdBookIdRef.current)
            }
        });
    } 

    const handleConfirmDoneBtnClick = (e, item, matter) => {
        e?.stopPropagation()
        
        // save the local chapter in the server list first 
        if(item?.local){
            setIsUpdatingText(true)
            getMatterItemData(item, 'body')
        }
        // for non-local files - update the text in the server
        else{
            setIsUpdatingText(true)
            updateMatterItemText(e, item, matter, 'PUT')
        }
    } 

    // update new new textarea value in the server
    const updateMatterItemText = (e = null, item, matter, method) => {
        e?.stopPropagation();
        
        let formdata = new FormData();
        if(method === 'PUT'){
            let textareaValue = ''
            if(matter === 'front'){
                 textareaValue = frontMatterListCopy?.find(each => each?.id === item?.id)?.name
                //  console.log(textareaValue)
                formdata.append("name", textareaValue);
            }else if(matter === 'body'){
                textareaValue = bodyMatterListCopy?.find(each => each?.id === item?.id)?.generated_content
                formdata.append("generated_content", textareaValue);
            }else if(matter === 'back'){
                textareaValue = backMatterListCopy?.find(each => each?.id === item?.id)?.name
                formdata.append("name", textareaValue);
            }
            formdata.append("book_creation", createdBookIdRef.current);
        }else if(method === 'DELETE'){
            setIsDeleting(true)
        }

        let url = ''
        if(matter === 'front') url = `${Config.BASE_URL}/openai/bookfrontmatter/${item?.id}/`
        else if (matter === 'body') url = `${Config.BASE_URL}/openai/bookbodymatter/${item?.id}/`
        else if (matter === 'back') url = `${Config.BASE_URL}/openai/bookbackmatter/${item?.id}/`

        Config.axios({
            url: url,
            body:formdata,
            method: method,
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                getBookDetails(createdBookIdRef.current)
            }
        });
    }

    // update the reordering list for front matter list
    const updateFrontOutlineOrder = () => {
        let formdata = new FormData();
        let reorder_list = ''
        // console.log(outlineReorderingRef.current)
        frontMatterReorderingRef.current?.filter(each => each.temp_order !== undefined)?.map((each, index) => {
            reorder_list += `${each.temp_order}${
                index !== frontMatterReorderingRef.current.length - 1 ? "," : ""
            }`;
        });
        // console.log(reorder_list)
        formdata.append("order_list", reorder_list);

        Config.axios({
            url: `${Config.BASE_URL}/openai/bookfrontmatter/${frontMatterList[0]?.id}/`,
            body:formdata,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                getBookDetails(createdBookIdRef.current)
            }
        });
        
    } 

    // update the reordering list for body matter list
    const updateBodyOutlineOrder = () => {
        let formdata = new FormData();
        let reorder_list = ''
        
        bodyMatterReorderingRef.current?.filter(each => each.temp_order !== undefined)?.map((each, index) => {
            reorder_list += `${each.temp_order}${
                index !== bodyMatterReorderingRef.current.length - 1 ? "," : ""
            }`;
        });
        // console.log(reorder_list)
        
        formdata.append("order_list", reorder_list);

        Config.axios({
            url: `${Config.BASE_URL}/openai/bookbodymatter/${bodyMatterList[0]?.id}/`,
            body:formdata,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                getBookDetails(createdBookIdRef.current)
            }
        });
    } 

    // update the reordering list for back matter list
    const updateBackOutlineOrder = () => {
        let formdata = new FormData();
        let reorder_list = ''
        // console.log(outlineReorderingRef.current)
        backMatterReorderingRef.current?.filter(each => each.temp_order !== undefined)?.map((each, index) => {
            reorder_list += `${each.temp_order}${
                index !== backMatterReorderingRef.current.length - 1 ? "," : ""
            }`;
        });
        // console.log(reorder_list)
        formdata.append("order_list", reorder_list);

        Config.axios({
            url: `${Config.BASE_URL}/openai/bookbackmatter/${backMatterList[0]?.id}/`,
            body:formdata,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
            },
            error: (err) => {
                getBookDetails(createdBookIdRef.current)
            }
        });
    } 

    // check if editor is empty or not: if empty generate the content otherwise show the content loss alert
    const generateItemContentBtn = (e, item, matter) => {
        tempStoredGenerateLinkParamRef.current = {item, matter}
        let isEditorEmpty = $('.summernote').summernote('isEmpty')

        if(matter === 'front'){
            if(item?.generated_content && !isEditorEmpty){
                dispatch(setShowBookContentLossAlertModal(true))
            }else{
                document.querySelector('.note-editable').classList.add('note-editable-loader')
                document.querySelector('.note-editable').classList.add('cursor-hide')
        
                getMatterItemData(item, 'front')
            }
        }else if(matter === 'body'){
            if(item?.html_data && !isEditorEmpty){
                dispatch(setShowBookContentLossAlertModal(true))
            }else{
                getChapterDataInStream(item?.id, item)
                isContentGenerateRef.current = true
            }
        }else if(matter === 'back'){
            if(item?.generated_content && !isEditorEmpty){
                dispatch(setShowBookContentLossAlertModal(true))
            }else{
                getMatterItemData(item, 'back')
            }
        }
    } 
    
    // update the book title on blur
    const handleBookTitleChange = () => {
        let formdata = new FormData();
        let book_title = bookTitleRef.current?.value?.trim()
        if(book_title?.length === 0) {
            bookTitleRef.current.focus()
            return;
        }
        if(bookCreationResponseRedux?.title === book_title){
            setTitleFocus(false)
            return
        } 

        formdata.append("title", book_title);

        Config.axios({
            url: `${Config.BASE_URL}/openai/bookcreation/${createdBookIdRef.current}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getBookDetails(createdBookIdRef.current)
                setTitleFocus(false)
            },
            error: (err) => {
                if (err?.response.status === 400) {
                    getBookDetails(createdBookIdRef.current)
                }
                setTitleFocus(false)
            }
        });
    } 

    const toggleTitleFocus = () => {
        setTitleFocus(true)
        bookTitleRef.current.focus()
    } 

    const filesDownload = async(html_data, item) => {
        var summerNoteData = html_data

        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    // console.log(attribs)

                    // console.log(attribs.style)
                    // console.log(attribs.style)
                    let c = attribs?.color ? attribs?.color : ''
                    let s = attribs?.style ? attribs.style : ''


                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });

        // regex to replace all <p><br /></p>
        let cleaned = clean?.replace(/<p><br \/><\/p>/g, '<br />')
        let removedPandH1 = cleaned?.replace(/<(p|h1|h2|h3)>\s*<\/\1>/g, '')

        let removedStyleAttribFromImg = removedPandH1.replace(/<img(.*?)\s+style\s*(=\s*["'][^"']*["'])?(\s.*?)?>/gi, '<img$1$3>');

        // formData.append("name", documentNameRef.current.innerText);
        var myHeaders = new Headers();
        var formdata = new FormData();

        formdata.append("html", removedStyleAttribFromImg);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };
       

        try{
            let data = await fetch(`https://apinodestaging.ailaysa.com/docx-generator`, requestOptions)
            if (data.status === 200) {
                let response = await data.blob()
    
                let fileObj = new File([response], `${(item.hasOwnProperty('front_matter') || item.hasOwnProperty('back_matter')) ? item.name : item.generated_content}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
                // console.log(fileObj);
                return fileObj;
            }else {
                console.error('Failed to download file');
                return null;
            }
        }catch(e) {
            dispatch(deleteDownloadingFile({ id: bookCreationResponseRedux?.id }))
        }
    } 

    const handleDownloadAll = () => {
        allDownloadedFilesArrRef.current = []
        let arr = []
        bookCreationResponseRedux?.front_matter?.forEach(each => {
            arr.push(each)
        })
        bookCreationResponseRedux?.body_matter?.forEach(each => {
            arr.push(each)
        })
        bookCreationResponseRedux?.back_matter?.forEach(each => {
            arr.push(each)
        })
        dispatch(addDownloadingFiles({ id: bookCreationResponseRedux?.id, file_name: bookCreationResponseRedux?.name, ext: '.docx', status: 1 }))

        downloadFilesInOrder(arr).then(() => {
            // console.log(allDownloadedFilesArrRef.current)
            mergeFile()
        })
    } 

    const downloadFilesInOrder = async (arr) => {
        for (const each of arr) {
            let html = (each.hasOwnProperty('front_matter') || each.hasOwnProperty('back_matter')) ? each.generated_content : each.html_data;
            if (html !== null && html.trim().length !== 0) {
                const fileObj = await filesDownload(html, each);
                if (fileObj) {
                    allDownloadedFilesArrRef.current = [...allDownloadedFilesArrRef.current, fileObj];
                }
            }
        }
    };

    const mergeFile = async() => {
        let formData = new FormData();
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
        let token = userCacheData != null ? userCacheData?.token : "";
        
        // console.log(allDownloadedFilesArrRef.current)

        allDownloadedFilesArrRef.current?.forEach(each => {
            formData.append("docx_files", each);
        })
        formData.append("book_name", bookCreationResponseRedux?.name);
        
        axios({
            method: "POST",
            url: `${Config.BASE_URL}/openai/docx_merger/`,
            data: formData,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
            //handle success
            // console.log(response.data)
            const filename = response.headers['content-disposition']?.split('filename*=')[1];
            let bookName = decodeURIComponent(filename?.replace(`UTF-8''`, ''))
            const url = URL.createObjectURL(new Blob([response.data]));

            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            // fileDownload.href = URL.createObjectURL(response.data);
            fileDownload.href = url
            fileDownload.download = Config.unescape(`${bookName}`);
            fileDownload?.click();
            document.body.removeChild(fileDownload);
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: bookCreationResponseRedux?.id, status: 2 }))

            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: bookCreationResponseRedux?.id }))
            }, 8000);


        }).catch((e) =>{
            console.log(e)
            Config.toast('Failed to download file', 'error')
            dispatch(deleteDownloadingFile({ id: bookCreationResponseRedux?.id }))
        })
    } 

    const currentFileDownload = async() => {
        var summerNoteData = document.querySelector('.note-editable').innerHTML
        if($('.summernote').summernote('isEmpty')) {
            Config.toast('Nothing to download', 'warning')
            return
        }

        let clean = sanitizeHtml(summerNoteData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    // console.log(attribs)

                    // console.log(attribs.style)
                    // console.log(attribs.style)
                    let c = attribs?.color ? attribs?.color : ''
                    let s = attribs?.style ? attribs.style : ''


                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });

        // regex to replace all <p><br /></p>
        let cleaned = clean?.replace(/<p><br \/><\/p>/g, '<br />')
        let removedPandH1 = cleaned?.replace(/<(p|h1|h2|h3)>\s*<\/\1>/g, '')

        let removedStyleAttribFromImg = removedPandH1.replace(/<img(.*?)\s+style\s*(=\s*["'][^"']*["'])?(\s.*?)?>/gi, '<img$1$3>');

        // formData.append("name", documentNameRef.current.innerText);
        var myHeaders = new Headers();
        var formdata = new FormData();

        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
        let token = userCacheData != null ? userCacheData?.token : "";

        formdata.append("html_str", removedStyleAttribFromImg);
        formdata.append("name", "name");
        let item_id = URL_SEARCH_PARAMS.get('item')
        let matter = URL_SEARCH_PARAMS.get('matter')
        let item = {}

        if(matter === 'front'){
            item = bookCreationObjRef.current?.front_matter?.find(each => each.id === parseInt(item_id))
        }else if(matter === 'body'){
            item = bookCreationObjRef.current?.body_matter?.find(each => each.id === parseInt(item_id))
        }else if(matter === 'back'){
            item = bookCreationObjRef.current?.back_matter?.find(each => each.id === parseInt(item_id))
        }
        // console.log(item)

        let file_name = (item.hasOwnProperty('front_matter') || item.hasOwnProperty('back_matter')) ? item.name : item.generated_content

        dispatch(addDownloadingFiles({ id: item?.id, file_name: file_name, ext: '.docx', status: 1 }))


        axios({
            method: "POST",
            // url: "https://apinode.ailaysa.com/docx-generator",
            // url: "https://apinodestaging.ailaysa.com/docx-generator",
            // url: "http://localhost:8000/docx-generator",
            // url: `${Config.BASE_URL}/workspace/docx_convertor/`,
            url: `${Config.BASE_URL}/workspace/html2docx`,

            data: formdata,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
            // headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = URL.createObjectURL(response.data);
            fileDownload.download = Config.unescape(`${file_name}.docx`);
            fileDownload?.click();
            document.body.removeChild(fileDownload);

            // update the list once download completed
            dispatch(updateDownloadingFile({ id: item?.id, status: 2 }))


            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: item?.id }))
            }, 8000);
        })
        .catch(function (response) {
            //handle error
            // console.log(response);
        });
    } 

    
    return (
        <>
            {
                coAuthorPanelView === 2 && (
                    <motion.div
                        key={`${coAuthorPanelView}`}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 30 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="chapter-panel-view"
                    >
                        <div className="chapter-title-wrapper">
                            {/* <div
                                ref={bookTitleRef}
                                suppressContentEditableWarning={true}
                                contentEditable={true}
                                data-placeholder={t("untitled_project")}
                                className="book-name"
                                tabIndex={0}
                            ></div> */}
                            {/* <button onClick={handleDownloadAll}>click</button>
                            <button onClick={() => {mergeFile()}}>click</button> */}
                            <TextareaAutosize
                                ref={bookTitleRef}
                                readOnly={!titleFocus ? true : false}
                                placeholder={t("untitled_project")}
                                maxLength={200}
                                rowsMin={3}
                                className="book-name"
                                // onClick={() => !item?.isEdit && handleFrontMatterOptionClick(item)}
                                onBlur={handleBookTitleChange}
                            />
                            <div className="edit-icon">
                                <EditIcon onClick={toggleTitleFocus} />
                            </div>
                            {/* <p className="author-name">John doe</p> */}
                        </div>
                        <div className="chapter-main-wrapper">
                            <div className="chapter-titles-wrapper">
                                <div className={"chapter-title-header-wrapper " + (frontMatterCollapse ? "active" : "")} onClick={() =>  setFrontMatterCollapse(!frontMatterCollapse)}>
                                    <div className="chapter-title-wrap">
                                        <KeyboardArrowDownIcon className="close-icon" style={frontMatterCollapse ? { transform: 'rotate(360deg)' } : {}} />
                                        <p className="title">Front matter</p>
                                    </div>
                                    <div className="add-more-title-wrapper">
                                        <Tooltip title="Add more title" arrow placement="top">
                                            <ButtonBase className="chapter-addon-btn front-addon" onClick={(e) => handleAddItemDrpVisibility(e, !frontAddMoreTitleBox, 'front')}>
                                                <AddIcon className="plus" />
                                            </ButtonBase>
                                        </Tooltip>
                                        <AnimatePresence initial={false}>
                                            {frontAddMoreTitleBox &&
                                                (<motion.div 
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0}}
                                                    animate={{ height: "auto", opacity: 1}}
                                                    exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                                    transition={{ duration: 0.15 }} 
                                                    className="add-more-title-list-wrap"
                                                    ref={frontAddMoreTitleBoxRef}
                                                > 
                                                <ul className="add-more-list">
                                                    {
                                                        frontMatterOptions?.map((item) => {
                                                            return(
                                                                <li key={item.value} onClick={(e) => handleMoreOptionsItemClick(e, item, 'front')}>
                                                                    <span>{item.label}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                </motion.div>)
                                            }
                                        </AnimatePresence>
                                            
                                    </div>
                                </div>
                                <Collapse isOpen={frontMatterCollapse}>
                                    <div className="book-titles-list">
                                        <div className="book-titles-list-wrapper">
                                            <div className="book-titles-list-item">
                                                <div className="book-title-info-main-wrap outline-lists">
                                                    <div className="book-title-info-wrap">
                                                    <DragDropContext onDragEnd={(result) => handleItemOnDragEnd(result, 'front')}>
                                                            <Droppable droppableId="characters">
                                                                {(provided) => (
                                                                    <ol className="edited-titles-list" {...provided.droppableProps} ref={provided.innerRef}>
                                                                        {
                                                                            frontMatterList?.map((item, index) => {
                                                                                let textareaValue = frontMatterListCopy?.find(each => each?.id === item?.id)?.name
                                                                                let isActive = (selectedMatterItem?.matter === 'front' && selectedMatterItem?.id === item?.id) ? true : false
                                                                                return (
                                                                                    <Draggable key={item.id} draggableId={item?.id?.toString()} index={index}>
                                                                                        {(provided) => (
                                                                                            <li 
                                                                                                ref={provided.innerRef} 
                                                                                                {...provided.draggableProps} 
                                                                                                className={
                                                                                                    "" + ((item?.local || item?.processing) ? "disable" : "")
                                                                                                    + (isActive ? " active-item" : "")
                                                                                                }
                                                                                            >
                                                                                                <div 
                                                                                                    {...provided.dragHandleProps}
                                                                                                    className="drag-ui"
                                                                                                    style={item?.local ? {pointerEvents: 'none', display: 'none'} : {}}  
                                                                                                >
                                                                                                    <DragIndicatorIcon className="drag-icon" />
                                                                                                </div>
                                                                                                <div 
                                                                                                    onClick={() => !item?.isEdit && handleFrontMatterOptionClick(item)}
                                                                                                    className={"inner-row " + (item?.isEdit ? "editable" : "")} 
                                                                                                    draggable
                                                                                                >
                                                                                                    <div className="textarea-gen-wrapper">
                                                                                                        <TextareaAutosize
                                                                                                            id={`front-mat-textarea-${item?.id}`}
                                                                                                            readOnly={!item?.isEdit}
                                                                                                            value={item?.isEdit ? textareaValue : item.name}
                                                                                                            maxLength={200}
                                                                                                            onChange={(e) => item?.isEdit && handleTextareaOnChange(e, item, 'front')}
                                                                                                            // onBlur={(e) => handleTextAreaBlur(e, item, 'front')}
                                                                                                            // onClick={() => !item?.isEdit && handleFrontMatterOptionClick(item)}
                                                                                                        />
                                                                                                        {(!item?.local && !item?.processing && item?.name?.toLowerCase() === 'preface' && item?.id === selectedMatterItem?.id) && (
                                                                                                            <span className="small-generate-link" onClick={(e) => generateItemContentBtn(e, item, 'front')}>Regenerate</span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    {(item?.local || item?.processing) && (
                                                                                                        <BlueButtonLoader />
                                                                                                    )}

                                                                                                    <div className={"tools-box-wrapper " + (item?.isEdit ? "active" : "")}>
                                                                                                        {item?.isEdit ? (
                                                                                                            <>
                                                                                                                <div className="tools-box edit-icon" onClick={(e)=> !isUpdatingText && handleConfirmDoneBtnClick(e, item, 'front')}>
                                                                                                                    {isUpdatingText ? (
                                                                                                                        <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                    ): (
                                                                                                                        <DoneIcon className="title-done-icon" />
                                                                                                                    )}
                                                                                                                </div>
                                                                                                                <div className="tools-box delet-icon" onClick={(e)=> !isUpdatingText && toggleEditMode(e, item?.id, 'front', false)}>
                                                                                                                    <CloseIcon className="title-close-icon" />
                                                                                                                </div>
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            item?.isDelete ? (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> !isDeleting && updateMatterItemText(e, item, 'front', 'DELETE')}>
                                                                                                                        {isDeleting ? (
                                                                                                                            <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                        ): (
                                                                                                                            <DoneIcon className="title-done-icon" />
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e)=> !isDeleting && handleDeleteToggleBtnClick(e, item?.id, 'front', false)}>
                                                                                                                        <CloseIcon className="title-close-icon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            ) : (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> toggleEditMode(e, item?.id, 'front', true)}>
                                                                                                                        <EditIcon className="title-edit-icon" />
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e) => handleDeleteToggleBtnClick(e, item?.id, 'front', true)}>
                                                                                                                        <DeleteIcon style="deleteIcon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            )
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </li>
                                                                                        )}
                                                                                    </Draggable>
                                                                                )
                                                                            })
                                                                        }
                                                                        {/* {provided.placeholder} */}
                                                                    </ol>
                                                                )}
                                                            </Droppable>
                                                    </DragDropContext>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="chapter-titles-wrapper">
                                <div className={"chapter-title-header-wrapper " + (bodyMatterCollapse ? "active" : "")} onClick={() =>  setBodyMatterCollapse(!bodyMatterCollapse)}>
                                    <div className="chapter-title-wrap">
                                        <KeyboardArrowDownIcon className="close-icon" style={bodyMatterCollapse ? { transform: 'rotate(360deg)' } : {}} />
                                        <p className="title">Body matter</p>
                                    </div>
                                    <div className="add-more-title-wrapper">
                                        <Tooltip title="Add more title" arrow placement="top">
                                            <ButtonBase className="chapter-addon-btn body-addon" onClick={(e) => handleAddItemDrpVisibility(e, !bodyAddMoreTitleBox, 'body')}>
                                                <AddIcon className="plus" />
                                            </ButtonBase>
                                        </Tooltip>
                                        <AnimatePresence initial={false}>
                                            {bodyAddMoreTitleBox &&
                                                (<motion.div 
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0}}
                                                    animate={{ height: "auto", opacity: 1}}
                                                    exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                                    transition={{ duration: 0.15 }} 
                                                    className="add-more-title-list-wrap"
                                                    ref={bodyAddMoreTitleBoxRef}
                                                > 
                                                <ul className="add-more-list">
                                                    {
                                                        bodyMatterOptions.map((item) => {
                                                            return(
                                                                <li key={item.id} onClick={(e) => handleMoreOptionsItemClick(e, item, 'body')}>
                                                                    <span>{item.title}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                </motion.div>)
                                            }
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <Collapse isOpen={bodyMatterCollapse}>
                                    <div className="book-titles-list">
                                        <div className="book-titles-list-wrapper">
                                            <div className="book-titles-list-item">
                                                <div className="book-title-info-main-wrap outline-lists">
                                                    <div className="book-title-info-wrap">
                                                        <DragDropContext onDragEnd={(result) => handleItemOnDragEnd(result, 'body')}>
                                                            <Droppable droppableId="characters">
                                                                {(provided) => (
                                                                    <ol className="edited-titles-list" {...provided.droppableProps} ref={provided.innerRef}>
                                                                        {
                                                                            bodyMatterList?.map((item, index) => {
                                                                                let textareaValue = bodyMatterListCopy?.find(each => each?.id === item?.id)?.generated_content
                                                                                let isActive = (selectedMatterItem?.matter === 'body' && selectedMatterItem?.id === item?.id) ? true : false
                                                                                return (
                                                                                    <Draggable key={item.id} draggableId={item?.id?.toString()} index={index}>
                                                                                        {(provided) => (
                                                                                            <li 
                                                                                                ref={provided.innerRef} 
                                                                                                {...provided.draggableProps} 
                                                                                                className={
                                                                                                    "" + ((item?.processing) ? "disable" : "")
                                                                                                    + (isActive ? " active-item" : "")
                                                                                                }
                                                                                            >
                                                                                                <div 
                                                                                                    {...provided.dragHandleProps}
                                                                                                    className="drag-ui" 
                                                                                                    style={item?.local ? {pointerEvents: 'none', display: 'none'} : {}} 
                                                                                                >
                                                                                                    <DragIndicatorIcon className="drag-icon" />
                                                                                                </div>
                                                                                                <div 
                                                                                                    onClick={() => !item?.isEdit && handleBodyMatterOptionClick(item)} 
                                                                                                    className={"inner-row " + (item?.isEdit ? "editable" : "")} 
                                                                                                    draggable
                                                                                                >
                                                                                                    <div className="textarea-gen-wrapper">
                                                                                                        <TextareaAutosize
                                                                                                            id={`body-mat-textarea-${item?.id}`}
                                                                                                            readOnly={!item?.isEdit}
                                                                                                            value={item?.isEdit ? textareaValue : item.generated_content}
                                                                                                            maxLength={200}
                                                                                                            onChange={(e) => item?.isEdit && handleTextareaOnChange(e, item, 'body')}
                                                                                                            // onClick={() => !item?.isEdit && handleBodyMatterOptionClick(item)}
                                                                                                        />
                                                                                                        {(!item?.local && !item?.processing && selectedMatterItem?.id === item?.id) && (
                                                                                                            <span className="small-generate-link" onClick={(e) => generateItemContentBtn(e, item, 'body')}>Regenerate</span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    <div className={"tools-box-wrapper " + (item?.isEdit ? "active" : "")}>
                                                                                                        {item?.isEdit ? (
                                                                                                            <>
                                                                                                                <div className="tools-box edit-icon" onClick={(e)=> !isUpdatingText && handleConfirmDoneBtnClick(e, item, 'body')}>
                                                                                                                    {isUpdatingText ? (
                                                                                                                        <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                    ): (
                                                                                                                        <DoneIcon className="title-done-icon" />
                                                                                                                    )}
                                                                                                                </div>
                                                                                                                <div className="tools-box delet-icon" onClick={(e)=> !isUpdatingText && toggleEditMode(e, item?.id, 'body', false)}>
                                                                                                                    <CloseIcon className="title-close-icon" />
                                                                                                                </div>
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            item?.isDelete ? (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> !isDeleting && updateMatterItemText(e, item, 'body', 'DELETE')}>
                                                                                                                        {isDeleting ? (
                                                                                                                            <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                        ): (
                                                                                                                            <DoneIcon className="title-done-icon" />
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e)=> !isDeleting && handleDeleteToggleBtnClick(e, item?.id, 'body', false)}>
                                                                                                                        <CloseIcon className="title-close-icon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            ) : (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> toggleEditMode(e, item?.id, 'body', true)}>
                                                                                                                        <EditIcon className="title-edit-icon" />
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e) => handleDeleteToggleBtnClick(e, item?.id, 'body', true)}>
                                                                                                                        <DeleteIcon style="deleteIcon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            )
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </li>
                                                                                        )}
                                                                                    </Draggable>
                                                                                )
                                                                            })
                                                                        }
                                                                        {/* {provided.placeholder} */}
                                                                    </ol>
                                                                )}
                                                            </Droppable>
                                                        </DragDropContext>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="chapter-titles-wrapper">
                                <div className={"chapter-title-header-wrapper " + (backMatterCollapse ? "active" : "")} onClick={() =>  setBackMatterCollapse(!backMatterCollapse)}>
                                    <div className="chapter-title-wrap">
                                        <KeyboardArrowDownIcon className="close-icon" style={backMatterCollapse ? { transform: 'rotate(360deg)' } : {}} />
                                        <p className="title">Back matter</p>
                                    </div>
                                    <div className="add-more-title-wrapper">
                                        <Tooltip title="Add more title" arrow placement="top">
                                            <ButtonBase className="chapter-addon-btn back-addon" onClick={(e) => handleAddItemDrpVisibility(e, !backAddMoreTitleBox, 'back')}>
                                                <AddIcon className="plus" />
                                            </ButtonBase>
                                        </Tooltip>
                                        <AnimatePresence initial={false}>
                                            {backAddMoreTitleBox &&
                                                (<motion.div 
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0}}
                                                    animate={{ height: "auto", opacity: 1}}
                                                    exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                                    transition={{ duration: 0.15 }} 
                                                    className="add-more-title-list-wrap"
                                                    ref={backAddMoreTitleBoxRef}
                                                > 
                                                <ul className="add-more-list">
                                                    {
                                                        backMatterOptions.map((item) => {
                                                            return(
                                                                <li key={item.value} onClick={(e) => handleMoreOptionsItemClick(e, item, 'back')}>
                                                                    <span>{item.label}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                </motion.div>)
                                            }
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <Collapse isOpen={backMatterCollapse}>
                                    <div className="book-titles-list">
                                        <div className="book-titles-list-wrapper">
                                            <div className="book-titles-list-item">
                                                <div className="book-title-info-main-wrap outline-lists">
                                                    <div className="book-title-info-wrap">
                                                        <DragDropContext onDragEnd={(result) => handleItemOnDragEnd(result, 'back')}>
                                                            <Droppable droppableId="characters">
                                                                {(provided) => (
                                                                    <ol className="edited-titles-list" {...provided.droppableProps} ref={provided.innerRef}>
                                                                        {
                                                                            backMatterList?.map((item, index) => {
                                                                                let textareaValue = backMatterListCopy?.find(each => each?.id === item?.id)?.name
                                                                                let isActive = (selectedMatterItem?.matter === 'back' && selectedMatterItem?.id === item?.id) ? true : false
                                                                                return (
                                                                                    <Draggable key={item.id} draggableId={item?.id?.toString()} index={index}>
                                                                                        {(provided) => (
                                                                                            <li 
                                                                                                ref={provided.innerRef} 
                                                                                                {...provided.draggableProps} 
                                                                                                className={
                                                                                                    "" + ((item?.local || item?.processing) ? "disable" : "")
                                                                                                    + (isActive ? " active-item" : "")
                                                                                                }
                                                                                            >
                                                                                                <div 
                                                                                                    {...provided.dragHandleProps}
                                                                                                    className="drag-ui"
                                                                                                    style={item?.local ? {pointerEvents: 'none', display: 'none'} : {}}  
                                                                                                >
                                                                                                    <DragIndicatorIcon className="drag-icon" />
                                                                                                </div>
                                                                                                <div 
                                                                                                    onClick={() => !item?.isEdit && handleBackMatterOptionClick(item)} 
                                                                                                    className={"inner-row " + (item?.isEdit ? "editable" : "")} 
                                                                                                    draggable
                                                                                                >
                                                                                                    <div className="textarea-gen-wrapper">
                                                                                                        <TextareaAutosize
                                                                                                            id={`back-mat-textarea-${item?.id}`}
                                                                                                            readOnly={!item?.isEdit}
                                                                                                            value={item?.isEdit ? textareaValue : item.name}
                                                                                                            maxLength={200}
                                                                                                            onChange={(e) => item?.isEdit && handleTextareaOnChange(e, item, 'back')}
                                                                                                            // onClick={() => !item?.isEdit && handleBackMatterOptionClick(item)}
                                                                                                        />
                                                                                                        {/* {(!item?.local && !item?.processing && selectedMatterItem?.id === item?.id) && (
                                                                                                            <span className="small-generate-link" onClick={(e) => generateItemContentBtn(e, item, 'back')}>Regenerate</span>
                                                                                                        )} */}
                                                                                                    </div>
                                                                                                    {(item?.local || item?.processing) && (
                                                                                                        <BlueButtonLoader />
                                                                                                    )}
                                                                                                    <div className={"tools-box-wrapper " + (item?.isEdit ? "active" : "")}>
                                                                                                        {item?.isEdit ? (
                                                                                                            <>
                                                                                                                <div className="tools-box edit-icon" onClick={(e)=> !isUpdatingText && handleConfirmDoneBtnClick(e, item, 'back')}>
                                                                                                                    {isUpdatingText ? (
                                                                                                                        <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                    ): (
                                                                                                                        <DoneIcon className="title-done-icon" />
                                                                                                                    )}
                                                                                                                </div>
                                                                                                                <div className="tools-box delet-icon" onClick={(e)=> !isUpdatingText && toggleEditMode(e, item?.id, 'back', false)}>
                                                                                                                    <CloseIcon className="title-close-icon" />
                                                                                                                </div>
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            item?.isDelete ? (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> !isDeleting && updateMatterItemText(e, item, 'back', 'DELETE')}>
                                                                                                                        {isDeleting ? (
                                                                                                                            <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                                                                        ): (
                                                                                                                            <DoneIcon className="title-done-icon" />
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e)=> !isDeleting && handleDeleteToggleBtnClick(e, item?.id, 'back', false)}>
                                                                                                                        <CloseIcon className="title-close-icon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            ) : (
                                                                                                                <>
                                                                                                                    <div className="tools-box edit-icon" onClick={(e)=> toggleEditMode(e, item?.id, 'back', true)}>
                                                                                                                        <EditIcon className="title-edit-icon" />
                                                                                                                    </div>
                                                                                                                    <div className="tools-box delet-icon" onClick={(e) => handleDeleteToggleBtnClick(e, item?.id, 'back', true)}>
                                                                                                                        <DeleteIcon style="deleteIcon" />
                                                                                                                    </div>
                                                                                                                </>
                                                                                                            )
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </li>
                                                                                        )}
                                                                                    </Draggable>
                                                                                )
                                                                            })
                                                                        }
                                                                        {/* {provided.placeholder} */}
                                                                    </ol>
                                                                )}
                                                            </Droppable>
                                                        </DragDropContext>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </motion.div>
                )
            }
            <button id="download-all-book" onClick={handleDownloadAll} hidden></button>
            <button id="download-current-chapter" onClick={currentFileDownload} hidden></button>
        </>
    )
}

export default ChapterPanel
