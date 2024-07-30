import React, { useState, useEffect, createRef, useRef } from "react";
import Config from '../Config';
import Navbar from '../Navbar'
import DragandDrop from "../../vendor/DragandDrop";
import { useTranslation } from 'react-i18next';
import Radio from '@mui/material/Radio';
import { TextareaAutosize, Tooltip } from "@mui/material";
import DeleteIcon from "../styles-svg/DeleteIcon";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { BlueButtonLoader } from "../../loader/BlueButtonLoader";
import ReplayIcon from '@mui/icons-material/Replay';
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ButtonBase from '@mui/material/ButtonBase'
import { useSelector } from "react-redux";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import InsuffientIcon from "../../assets/images/new-ui-icons/insuffient-icon.svg"
import RemoveCircleRed from "../../assets/images/new-ui-icons/remove_circle_red.svg"
import ChatSentIcon from "../../assets/images/chat/chat-sent-icon.svg"
import NoChatIcon from "../../assets/images/chat/no-chat-icon.svg"
import AiChatBookLogo from "../../assets/images/ai-chatbook.svg"
import UploadFolder from "../../assets/images/new-ui-icons/upload-folder.svg"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PDFViewer from "./PdfViewr";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import SidebarOutIcon from "../../assets/images/SidebarOutIcon";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const AIChat = () => {
    const { t } = useTranslation();
    const userDetails = useSelector((state) => state.userDetails.value)
    const [localFiles, setLocalFiles] = useState([]);
    const [chatFiles, setChatFiles] = useState([]);
    const [selectedChatFile, setSelectedChatFile] = useState(null);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [conversationList, setConversationList] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [messageText, setMessageText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [exampleFileQue, setExampleFileQue] = useState([])

    const inputFileUploadRef = useRef(null);
    const messageInput = useRef(null);
    const conversationListRef = useRef([]);
    const chatBoxScrollingDiv = useRef(null);
    const sendMessageBtnRef = useRef(null);
    const supportFileExtensionsRef = useRef([".pdf", ".docx", '.txt', '.epub']);
    const scrollingDivRef = useRef(null)    // scrolling pagination div 
    const lastPageRef = useRef(null)
    const fileUploadDiv = useRef(null)

    const convertmodaloption = {
        closeMaskOnClick: false,
        width: 528,
        height: 'auto',
        // onClose: () => setshowSettings(false),
    };
    const [showCreditAlertModal, setShowCreditAlertModal] = useState(false)

    const [showInsufficientCreditDiscription, setShowInsufficientCreditDiscription] = useState(false)


    const [customizationResult, setCustomizationResult] = useState(null)
    const [chatBookRemainingStatus, setChatBookRemainingStatus] = useState(null)
    // send the chat book remaining
    const getChatBookRemainingStatus = () => {        
     
      Config.axios({
          url: `${Config.BASE_URL}/nlp/chat-unit-remaining`,
          method: "GET",
          auth: true,
          success: (response) => {
             console.log(response.data)
             setChatBookRemainingStatus(response.data)
          },
          error: (err) => { }
      });
  } 

    useEffect(() => {
        // getChatBookRemainingStatus()
        getChatBook()
        document.title = '';
        setTimeout(() => {
            document.title = 'Ailaysa | Chatbooks';
        }, 10);
    }, [])
    
    // upload file to server then user select files from computer
    useEffect(() => {
        if(localFiles?.length !== 0){
            handleUploadFiles()
            inputFileUploadRef.current.value = ''
            console.log(localFiles)
        }
    }, [localFiles])

    console.log(exampleFileQue)
    

    useEffect(() => {
        if(messageInput?.current !== null){
            /* Handle keydown eventHandler - start*/
            const handleKeyDown = (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    if (messageInput.current?.value?.trim() !== '') {
                        e.preventDefault();
                        sendMessageBtnRef.current?.click()
                        // getChatBookRemainingStatus()
                    }
                }
            };
            /* Handle keydown eventHandler - start*/
            if (messageInput?.current) messageInput.current.addEventListener("keydown", handleKeyDown);
            return () => {
                if (messageInput?.current) messageInput.current.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [messageInput?.current]);

    // call the get chatbook api at intervals if any file is processing 
    useEffect(() => {
        if(chatFiles?.length !== 0) {
            let isFileProcessing = chatFiles?.find(each => each.status === "PENDING")
            let timeOut = null

            if(isFileProcessing){
                timeOut = setTimeout(() => {
                    getChatBook()
                }, 4000);
            }

            return () => {
                clearTimeout(timeOut)
            }   
        }
    }, [chatFiles])
    

  
    /* Check the file is a supprt file type */
    const isSupportedFile = (file, request = null) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (!request && supportFileExtensionsRef.current.indexOf(ext?.toLowerCase()) == -1) {
            Config.toast(t("file_format_not_support"), 'warning');
            return false;
        }
        return true;
    };

    const handleFileSelect = (file) => {
        if(file?.status !== 'SUCCESS') return
        
        let newArr = chatFiles?.map(obj => {
            return {
                ...obj,
                isDelete: false
            }
        })
        console.log(newArr)
        setChatFiles(newArr)

        setPageNumber(1)
        setSelectedChatFile(file)
        getChatBook(file?.id)
    };


    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        let fileList = [...localFiles];
        Object.keys(filesTemp).map((eachKey) => {
            if (!request && isSupportedFile(filesTemp[eachKey])) {
                fileList.push(filesTemp[eachKey]);
            }
        });
        setLocalFiles(fileList);
        setShowFileUpload(false);
    };


    /* Handling all the project creation form */
    const handleChange = (e) => {
        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;
                let fileList = [...localFiles];
                Object.keys(thisFiles).map((eachKey) => {
                    if (isSupportedFile(thisFiles[eachKey])) {
                        fileList.push(thisFiles[eachKey]);
                    }
                });
                setLocalFiles(fileList);
                break;
            }
            default: {
                break;
            }
        }
    };

    // send files to server
    const handleUploadFiles = () => {
        let formData = new FormData();
        
        formData.append("file", localFiles[0]);

     

        Config.axios({
            url: `${Config.BASE_URL}/nlp/pdf-chat-upload/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                getChatBook()
               
            },
            error: (err) => { 
                console.log(err.response.data.msg)
                getChatBook()
                if(err.response.data?.msg?.includes('buy')){
                    setShowInsufficientCreditDiscription('Need to buy add-on pack reached your file upload limit')
                    setShowCreditAlertModal(true)
                }
                if(err.response.data?.msg?.includes('less')){
                    Config.toast(err.response.data?.msg, 'warning')
                }
            }
        });
    } 

    // get book list - all and individual book data (if individual book selected set the conversation data)
    const getChatBook = (book_id, from) => {
        Config.axios({
            url: `${Config.BASE_URL}/nlp/pdf-chat-upload/${book_id !== undefined ? `${book_id}/` : '?page=1'}`,
            method: "GET",
            auth: true,
            success: (response) => {
                getChatBookRemainingStatus()
                if(book_id !== undefined){
                    setConversationList(response.data?.pdf_file_chat)
                    conversationListRef.current = response.data?.pdf_file_chat
                    setExampleFileQue(response.data?.pdf_file_question)
                    chatBoxScrollingDiv.current.scrollTop = chatBoxScrollingDiv.current.scrollHeight;
                    setSelectedChatFile(response.data)
                    messageInput.current.value = ''
                    setMessageText("")
                }else{
                    // when getting books list clear the localfiles 
                    setLocalFiles([])
                    inputFileUploadRef.current.value = ''
                    setChatFiles(response.data?.results)
                    setTotalPages(Math.ceil(response?.data.count / 20))
                    lastPageRef.current = 1
                    setPrevPage(1)
                    setCurrPage(1)
                    if(from === 'delete'){
                        setSelectedChatFile(null)
                        setIsDeleting(false)
                    }
                }
            },
            error: (err) => { }
        });
    } 

    // send the chat message to the server
    const sendMessage = () => {        
        let chatText = messageInput.current?.value
        messageInput.current.value = ''
        setMessageText("")
        setConversationList([...conversationListRef.current, {question: chatText, isLoading: true}])
        setTimeout(() => {
            chatBoxScrollingDiv.current.scrollTop = chatBoxScrollingDiv.current.scrollHeight;
        }, 10);
        Config.axios({
            url: `${Config.BASE_URL}/nlp/chat-with-pdf?file_id=${selectedChatFile?.id}&chat_text=${chatText}`,
            method: "GET",
            auth: true,
            success: (response) => {
                getChatBook(selectedChatFile?.id)
            },
            error: (err) => {
                if(err.response.status === 400){
                    if(err.response.data?.msg?.includes('buy')){
                        setShowInsufficientCreditDiscription('Need to buy add-on pack reached question limit')
                        setShowCreditAlertModal(true)
                    }
                    // if(err.response.data?.msg?.includes('buy')){
                    //     Config.toast(err.response.data?.msg, 'warning')
                    // }
                    setConversationList(conversationList?.filter(each => !each.isLoading))
                }
            }
        });
    } 

    // delete the book from server
    const handleDeleteFile = (e, file_id) => {
        e.stopPropagation()
        
        setIsDeleting(true)
        Config.axios({
            url: `${Config.BASE_URL}/nlp/pdf-chat-upload/${file_id}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                getChatBook(undefined, 'delete')
            },
            error: (err) => { }
        });
    }

    const toggleDeleteConfirm = (e, value, file_id) => {
        e.stopPropagation()
        console.log(value)
        console.log(file_id)
        let newArr = chatFiles?.map(obj => {
            if(obj?.id === file_id){
                return {
                    ...obj,
                    isDelete: value === 'open' ? true : false
                }
            }
            return obj;
        })
        console.log(newArr)
        setChatFiles(newArr)
    }

    const handleOnScroll = () => {
        if (scrollingDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollingDivRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
              // This will be triggered after hitting the last element.
              // API call should be made here while implementing pagination.
                setTimeout(() => {
                    setCurrPage(currPage + 1);
                }, 80);
            }
        }
    } 



    useEffect(() => {
        const fetchData = async () => {
            let userCacheData = JSON.parse(
                typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
            );
            let token = userCacheData != null ? userCacheData?.token : "";
            const response = await axios.get(
                `${Config.BASE_URL}/nlp/pdf-chat-upload/?page=${currPage}`,
                {
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            lastPageRef.current = currPage
            setPrevPage(currPage);
            setChatFiles([...chatFiles, ...response?.data?.results]);
        };
        if (currPage <= totalPages && prevPage !== currPage && lastPageRef.current !== currPage) {
          fetchData();
        }
    }, [currPage]);

    const focusUploadFilesSection = () => {
        console.log(fileUploadDiv.current)
        fileUploadDiv.current.style.border = "2px solid #0074d3"
        setTimeout(() => {
            fileUploadDiv.current.style.border = "2px dashed #d3d4d5"
        }, 2500);
    } 

    const msg = `<span className="chat-usage-main-details-wrapper" >
        <span>Remaining questions : ${chatBookRemainingStatus?.total_msgs_left} </span><br/>
        <span>Remaining files : ${chatBookRemainingStatus?.total_files_left} </span>
    </span>`

    
    const handleMouseUp = () => {

    }

    const [showSideBar, setShowSideBar] = useState(true)
    
    const handleSideBarClose = () => {
        if(selectedChatFile != null){
            setShowSideBar(false)
        }
    }

    const scroll = (element) => {
        document.querySelector(`.page-${element}`)?.scrollIntoView({ behavior: "smooth",block: 'start',
        inline: 'center' });
      }

    const [pageNumber, setPageNumber] = useState(1);
    const handleReference = (page) => {
        setPageNumber(page)
        scroll(page)
      
    }

    console.log(chatFiles)

  
    return (
        <>
            <Navbar isAiChatBook={true} />
            {/* {!showSideBar && <span className='sidebar-open' onClick={() => setShowSideBar(true)}>
                <SidebarOutIcon color='#FFFFFF' handleColor='#4F4F55'  />
            </span>} */}
            <section className="chat-book-main-wrapper">
                {/* {showSideBar &&  */}
                 {/* <ClickAwayListener onClickAway={handleSideBarClose}> */}
                {/* <div className={`chat-book-main-wrapper__upload-access-wrapper ${selectedChatFile != null ? 'absolute' : ''}`}> */}
                <div className={`chat-book-main-wrapper__upload-access-wrapper`}>

                {/* {selectedChatFile != null && <div className='close-sidebar' onClick={handleSideBarClose}>
                        <ArrowBackIosRoundedIcon fontSize='small' className='close-sidebar-icon' />
                        </div>} */}
                    <div className="chatbook-header-wrapper">
                    <p className="chat-book-label-title">Upload files</p>
                    {/* {selectedChatFile != null && <span className="close-icon-chatbook-sidebar" onClick={handleSideBarClose}>
                        <CloseIcon />
                    </span>} */}
                    {/* <span className="chat-book-label-title" onClick={getChatBookRemainingStatus}>Remaining files : {chatBookRemainingStatus?.total_files_left}</span> */}
                    </div>

                    <DragandDrop  handleDrop={handleDrop} isChatBook={true}>
                        <div className={"button-wrap sa"} ref={fileUploadDiv}>
                            <div className="draganddrop-align">
                                <img
                                    src={UploadFolder}
                                    alt="folder"
                                />
                                <div>
                                    <div className="file-upload-align">
                                        <p className="upload-text">
                                            {t("drop_your_files_here_or")}{" "}
                                        </p>
                                        <div className="upload-link-wrapper">
                                            <label htmlFor="files">{t("browse")}</label>
                                            <input
                                                ref={inputFileUploadRef}
                                                type="file"
                                                name="files"
                                                className="form-control-file"
                                                id="files"
                                                accept={supportFileExtensionsRef.current.join(",")}
                                                onChange={handleChange}
                                                hidden
                                            />
                                        </div>
                                    </div>
                                    <div className="file-upload-align">
                                        <p className="upload-text">Supported language: English</p>
                                    </div>
                                    <div className="file-upload-align">
                                        <p className="upload-text">Supported files: .epub | .docx | .pdf | .txt</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DragandDrop>
                    {/* <div className="col-xs-12 local-file-list-wrapper">
                        {Object.keys(localFiles).map((eachKey) => {
                            return (
                                <div
                                    key={eachKey + localFiles[eachKey].name}
                                    className="file-name-list"
                                >
                                    <div className="filename">
                                        {
                                            <img
                                            src={
                                                `${Config.BASE_URL}/app/extension-image/` +
                                                localFiles[eachKey].name
                                                    ?.split(".")
                                                    ?.pop()
                                                }
                                                alt="document"
                                            />
                                        }
                                        <span className="filename-length">
                                            {localFiles[eachKey].name?.split(".")
                                                ?.slice(0, -1)
                                                ?.join(".")
                                            }
                                        </span>
                                        <span className="extension">
                                            {"." + localFiles[eachKey].name
                                                ?.split(".")
                                                ?.pop()
                                            }
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className="col-xs-12 file-list-wrapper">
                    {(!showFileUpload && chatFiles.length == 0) ? "" : (
                        <div className="chat-title-wrapper">
                            <p className="chat-book-label-title">Uploaded files</p>
                            <span style={{cursor: 'pointer'}} onClick={() => getChatBook()}>
                                <small className="mr-1">Refresh</small><ReplayIcon style={{ fontSize: '16px' }} /> 
                            </span>
                        </div>
                    )}
                        {
                            (!showFileUpload && chatFiles.length == 0) ?
                            <div className="file-not-upload-wrapper">
                                <p>No files uploaded yet</p>
                            </div>
                            :
                            <div className="button-wrap-file-list" onScroll={handleOnScroll} ref={scrollingDivRef}>
                                <div className="file-list-align">
                                    <div className="file-list">
                                        {/* browsed localfiles from computer  */}
                                        {Object.keys(localFiles).map((file, ind) => {
                                            return(
                                                <Tooltip title="File is processing" placement="top" arrow>
                                                    <div>
                                                        <label
                                                            key={ind}
                                                            className="file-name-list disable"
                                                        >
                                                            <div className="filename">
                                                                <Radio
                                                                    size="small"
                                                                />
                                                                {
                                                                    <img
                                                                        src={
                                                                            `${Config.BASE_URL}/app/extension-image/` +
                                                                            localFiles[file].name
                                                                                ?.split(".")
                                                                                ?.pop()
                                                                        }
                                                                        alt="document"
                                                                    />
                                                                }
                                                                <span className="filename-length">
                                                                    {localFiles[file].name
                                                                        ?.split(".")
                                                                        ?.slice(0, -1)
                                                                        ?.join(".")
                                                                    }
                                                                </span>
                                                                <span className="extension">
                                                                    {"." + localFiles[file].name
                                                                        ?.split(".")
                                                                        ?.pop()
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span className="upload-file-delete">
                                                                <BlueButtonLoader />
                                                            </span>
                                                        </label>
                                                    </div>
                                                </Tooltip>
                                               
                                            )
                                        })}
                                        {/* actual files from api */}
                                        {chatFiles?.map(file => {
                                            return (
                                                <Tooltip title={file.status === 'PENDING' ? "File is processing" : ""} placement="top" arrow>
                                                    <div>
                                                        <label
                                                            key={file?.id}
                                                            className={"file-name-list " + ((selectedChatFile?.id === file?.id) ? "active " : "") + ((file?.status === 'PENDING' ) ? "disable" : "")}
                                                            htmlFor={`chat-book-${file?.id}`}
                                                            // onClick={() => handleFileSelect(file)}
                                                        >
                                                            <div className="filename">
                                                                <Radio
                                                                    checked={selectedChatFile?.id === file?.id}
                                                                    value={file?.id}
                                                                    onChange={() => handleFileSelect(file)}
                                                                    size="small"
                                                                    id={`chat-book-${file?.id}`}
                                                                />
                                                                {
                                                                    <img
                                                                        src={
                                                                            `${Config.BASE_URL}/app/extension-image/` +
                                                                            file?.file_name
                                                                                ?.split(".")
                                                                                ?.pop()
                                                                        }
                                                                        alt="document"
                                                                    />
                                                                }
                                                                <span className="filename-length">
                                                                    {file?.file_name
                                                                        ?.split(".")
                                                                        ?.slice(0, -1)
                                                                        ?.join(".")}
                                                                </span>
                                                                <span className="extension">
                                                                    {"." +
                                                                        file?.file_name
                                                                            ?.split(".")
                                                                            ?.pop()}
                                                                </span>
                                                            </div>
                                                            <div className="chat-tools-wrapper">
                                                                {file?.isDelete ? (
                                                                    <>
                                                                        <span
                                                                            className="upload-file-delete"
                                                                            data-file-index={file?.id}
                                                                            onClick={(e) =>
                                                                                !isDeleting && handleDeleteFile(e, file?.id)
                                                                            }
                                                                        >
                                                                            {isDeleting ? (
                                                                                <CircularProgress sx={{ color: 'grey.500' }} style={{height: '14px', width: '14px'}} />
                                                                            ) : (
                                                                                <DoneIcon />
                                                                            )}
                                                                        </span>
                                                                        <span
                                                                            className="upload-file-delete"
                                                                            data-file-index={file?.id}
                                                                            onClick={(e) =>
                                                                                toggleDeleteConfirm(e, 'close', file?.id)
                                                                            }
                                                                        >
                                                                            <CloseIcon />
                                                                        </span>
                                                                    </>
                                                                ) : 
                                                                (file.status !== 'PENDING' || (file?.status === "ERROR" || file?.status === null)) ? (
                                                                    <span
                                                                        className={"upload-file-delete " + ((selectedChatFile?.id === file?.id || (file?.status === "ERROR" || file?.status === null)) ? "" : "d-none")}
                                                                        data-file-index={file?.id}
                                                                        onClick={(e) =>
                                                                            toggleDeleteConfirm(e, 'open', file?.id)
                                                                        }
                                                                    >
                                                                        <DeleteIcon style="deleteIcon"/>
                                                                    </span>
                                                                ) : (   // show the loader for status: pending files
                                                                    <span className="upload-file-delete">
                                                                        <BlueButtonLoader />
                                                                    </span>
                                                                )}
                                                                {(file?.status === "ERROR" || file?.status === null) && (
                                                                    <span className="ai-chat-error-tag">{t("failed")}</span>
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>
                                                </Tooltip>
                                                
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    
                    </div>
                    <div className="view-usage-wrapper">
                        <Tooltip placement="top" title={<div dangerouslySetInnerHTML={{ __html: msg}}/>} enterTouchDelay={0}>
                            <small className="view-usage mob-view-usage">
                                <ErrorOutlineOutlinedIcon className="mob-imp-icon" />
                                {t("view_usage")}
                            </small>
                        </Tooltip>
                    </div>
                </div>
                 {/* </ClickAwayListener> */}
                {/* } */}
                <div className="chat-book-main-wrapper__chatting-wrapper">
                    <div className="chat-with-files-wrapper">
                        <div className="chatbook-header-wrapper">
                        {selectedChatFile !== null ? (
                            <h1 className="chat-file-title">Chat with {selectedChatFile?.file_name}</h1>
                        ) : (
                            <h1 className="chat-file-title">Chat with your uploaded books or files</h1>
                        )}  
                                                {/* <span onClick={getChatBookRemainingStatus}>Remaining messages : {chatBookRemainingStatus?.total_msgs_left}</span> */}
                                                {/* {selectedChatFile !== null && <span onClick={getChatBookRemainingStatus}>Remaining messages : {chatBookRemainingStatus?.total_msgs_left}</span>} */}
                                                </div>
                        <div style={{display:'flex', flexDirection:'row'}}>
                                                {/* {selectedChatFile != null && 
                                                
                                       <PDFViewer  handleMouseUp={handleMouseUp} page={pageNumber} setPage={setPageNumber} width={'669px'}  pdf={Config.BASE_URL + selectedChatFile?.file}/>
                                    } */}
                        <div className="chat-with-files-wrapper__working-area">
                            {selectedChatFile === null ? (
                                <>
                                    <section className="no-chat-available-container ai-chat-wrapper">
                                        <div className="no-chat-text-wrapper">
                                            <img src={NoChatIcon} alt="no-chat-icon" />
                                            <h3>{chatFiles?.length === 0 ? "No conversations done yet" : "Upload or select a book to start conversation"}</h3>
                                        </div>
                                        <div className="ai-chat-placeholder-chat">
                                            <div className="prompt-type-area-wrapper">
                                                <div className="prompt-type-area">
                                                    <div className="prompt-type-area-inner-wrapper ai-chat-no-focus" onClick={focusUploadFilesSection}>
                                                        <TextareaAutosize
                                                            className="sent-input" 
                                                            placeholder="Type a question"
                                                            readOnly
                                                        />
                                                        <div className="prompt-send-icon-main">
                                                            <button 
                                                                className="prompt-send-icon" 
                                                            >
                                                                <img src={ChatSentIcon} alt="prompt-sent-icon" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            ) : (

                                <>
                                    {/* <div className="chat-book-header-wrapper">
                                        <div className="chat-book-data">
                                            <span className="no-profile-header-chat">{selectedChatFile?.file_name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase()}</span>
                                            <div className="chat-book-name">
                                                <span className="name">{selectedChatFile?.file_name}</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="chat-book-body-wrapper" ref={chatBoxScrollingDiv}>
                                        <div className="chat-book-body-inner-wrapper">
                                            {conversationList?.length !== 0 ? (
                                                conversationList?.map((chat, index) => {
                                                    return(
                                                        <div key={index} className="chat-question-wrapper">
                                                            <div className="chat-sender-msg">
                                                                <div className="sender-msgs-cont">
                                                                    <div className="user-info-wrap">
                                                                        {(Config?.userState?.image_url != null && Config?.userState?.image_url !== undefined) ? (
                                                                            <>
                                                                                <img className="chat-book-profile-icon" src={Config.BASE_URL + Config.userState?.image_url} alt="prof-pic" />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="chat-book-no-profile-icon">
                                                                                    {
                                                                                        Config.userState?.name?.charAt(0)?.toUpperCase() !== '' ?
                                                                                            Config.userState?.name?.charAt(0)?.toUpperCase() :
                                                                                            Config.userState?.email?.charAt(0)?.toUpperCase()
                                                                                    }
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className="sender-msg-with-sender-details">
                                                                        <span className="msgs">{chat?.question}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="chat-receiver-msg">
                                                                <div className="receiver-msgs-cont">
                                                                    <div className="chat-book-profile-info">
                                                                        <div className="chat-book-profile-icon">
                                                                            <img src={AiChatBookLogo} alt="projects" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="receiver-msg">
                                                                        {chat?.isLoading ? (
                                                                            <span>
                                                                                <div className="loading">
                                                                                    <span className="loading__dot"></span>
                                                                                    <span className="loading__dot"></span>
                                                                                    <span className="loading__dot"></span>
                                                                                </div>
                                                                            </span>
                                                                        ) : (
                                                                            <span className="msgs">{chat?.answer}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="reference-bar">
                                                                <span className="reference-label">Reference:</span>
                                                                {chat?.pdf_chat_page_ref?.map((each) => {
                                                                    return(
                                                                        <span onClick={() => handleReference(each.page_no)} className="page-no" key={each?.page_no}>{each?.page_no},</span>
                                                                    )
                                                                })}
                                                            </div> */}
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <section className="no-chat-available-container">
                                                    <img src={NoChatIcon} alt="no-chat-icon" />
                                                    <h3>No conversations done yet</h3>
                                                </section>
                                            )}
                                        </div>
                                    </div>
                                    <div className="chat-book-footer-wrapper">
                                        {conversationList?.length === 0 &&
                                        <div className="pdf-example-que-wrapper">
                                            <div className="pdf-example-inner-wrapper">
                                                {exampleFileQue?.map(each => {
                                                    return (
                                                        <ButtonBase 
                                                            className="pdf-example-que-card"
                                                            onClick={() => {
                                                                messageInput.current.value = each.question
                                                                sendMessage()
                                                            }}
                                                        >
                                                            <QuestionAnswerIcon className="icon" />
                                                            <div className="question-wrap">
                                                                <p>{each.question}</p>
                                                                <ArrowForwardIosIcon className="arrow-icon" />
                                                            </div>
                                                        </ButtonBase>
                                                    )
                                                })}
                                            </div>
                                        </div>}
                                        <div className="chat-typing-area">
                                            <span className="chat-type-area">
                                                <TextareaAutosize
                                                    ref={messageInput} 
                                                    className="sent-input" 
                                                    placeholder="Type a question"
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                />
                                            </span>
                                            <span className="chat-send-icon-main">
                                                <button 
                                                    className="chat-send-icon" 
                                                    ref={sendMessageBtnRef} 
                                                    onClick={sendMessage}
                                                    style={messageText?.trim()?.length === 0 ? {pointerEvents: 'none', opacity: 0.5, backgroundColor: "#ebebeb"} : {}}
                                                    disabled={messageText?.trim()?.length === 0}
                                                >
                                                    <img src={ChatSentIcon} alt="chat-sent-icon" />
                                                </button>
                                            </span>
                                        </div>
                                        <div>
                                            {/* <div className="languagemodal-button" onMouseUp={() => { setshowSrcLangModal(true) }}>
                                                <span className="value">{sourceLabel}</span>
                                                <span className="icon"><i className="fas fa-caret-down"></i></span>
                                            </div> */}
                                            <span
                                                className="multiline-chat-help-text"
                                                style={messageText?.trim()?.length === 0 ? {opacity: 0} : {opacity: 1}}
                                            >
                                                <b>Shift + Enter</b> {t("multiline_text_box_help_text")}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
                {showCreditAlertModal && (
                <Rodal className="ts-rodal-mask" visible={showCreditAlertModal} onClose={() => console.log()} {...convertmodaloption} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowCreditAlertModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="credits-text-cont">
                        <React.Fragment>
                            <img src={InsuffientIcon} alt="insuffient-icon" />
                            <div className="insuffient-txt-align">
                                <span>
                                    <img src={RemoveCircleRed} alt="remove_circle" />
                                </span>
                                <p>{t("insufficient_credits")}</p>
                            </div>
                            <p className="insuffient-desc">
                                {showInsufficientCreditDiscription}
                            </p>
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
                </Rodal>
            )}
            </section>
        </>
    )
}

export default AIChat